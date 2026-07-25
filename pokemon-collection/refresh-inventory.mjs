import fs from "node:fs/promises";
import vm from "node:vm";

const dataSource = await fs.readFile(new URL("./collection-data.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(dataSource, sandbox);

const cards = sandbox.window.POKEMON_CARDS;
const sets = sandbox.window.POKEMON_SETS;
const englishCards = cards.filter((card) => card.language !== "Japanese");
const recordsById = new Map();

function marketPrice(priceGroups) {
    for (const key of ["holofoil", "reverseHolofoil", "normal"]) {
        const market = priceGroups?.[key]?.market;
        if (Number.isFinite(market)) {
            return market;
        }
    }
    for (const group of Object.values(priceGroups || {})) {
        if (Number.isFinite(group?.market)) {
            return group.market;
        }
    }
    return 0;
}

for (let index = 0; index < englishCards.length; index += 4) {
    const batch = englishCards.slice(index, index + 4);
    const params = new URLSearchParams({
        q: batch.map((card) => `id:${card.setId}-${card.image}`).join(" OR "),
        select: "id,name,number,tcgplayer",
        pageSize: "250"
    });
    let response;
    for (let attempt = 0; attempt < 4; attempt += 1) {
        response = await fetch(`https://api.pokemontcg.io/v2/cards?${params}`);
        if (response.ok) {
            break;
        }
        await new Promise((resolve) => setTimeout(resolve, 600 * (attempt + 1)));
    }
    if (!response?.ok) {
        throw new Error(`Pokémon TCG API request failed with ${response?.status || "no response"}`);
    }
    const payload = await response.json();
    for (const record of payload.data || []) {
        recordsById.set(record.id, record);
    }
}

const missing = englishCards.filter((card) => !recordsById.has(`${card.setId}-${card.image}`));
if (missing.length) {
    throw new Error(`Missing API records: ${missing.map((card) => `${card.name} (${card.setId}-${card.image})`).join(", ")}`);
}

const normalizeName = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, "");
const nameMismatches = englishCards.filter((card) => {
    const record = recordsById.get(`${card.setId}-${card.image}`);
    return normalizeName(card.name) !== normalizeName(record.name);
});

const japanesePrices = {
    "Cutiefly|078/071": 2.98,
    "Miraidon|052/071": 0.19,
    "Salvatore|091/071": 1.49
};

const inventory = cards.map((card) => {
    const isJapanese = card.language === "Japanese";
    const apiRecord = isJapanese ? null : recordsById.get(`${card.setId}-${card.image}`);
    const unitPrice = isJapanese
        ? japanesePrices[`${card.name}|${card.number}`]
        : marketPrice(apiRecord?.tcgplayer?.prices);
    return {
        quantity: card.quantity,
        name: card.name,
        set: sets[card.setId].name,
        number: card.number,
        language: isJapanese ? "Japanese" : "English",
        variant: isJapanese ? "Holofoil — Japanese" : "Holofoil",
        unitPrice: Math.round(unitPrice * 100) / 100,
        lineValue: Math.round(unitPrice * card.quantity * 100) / 100
    };
});

const output = `window.POKEMON_INVENTORY = ${JSON.stringify(inventory, null, 4)};\n`;
await fs.writeFile(new URL("./inventory.js", import.meta.url), output, "utf8");

const zeroPrices = inventory.filter((entry) => entry.unitPrice === 0);
console.log(JSON.stringify({
    uniqueCards: inventory.length,
    totalCards: inventory.reduce((total, entry) => total + entry.quantity, 0),
    apiRecords: recordsById.size,
    nameMismatches: nameMismatches.map((card) => {
        const record = recordsById.get(`${card.setId}-${card.image}`);
        return `${card.name} ${card.number} → ${record.name} ${record.number}`;
    }),
    zeroPrices: zeroPrices.map((entry) => `${entry.name} ${entry.number}`)
}, null, 2));
