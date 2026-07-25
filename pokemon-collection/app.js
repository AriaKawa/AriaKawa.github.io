const SETS = {
    swsh1: { code: "SWSH01", name: "Sword & Shield" },
    swsh3: { code: "SWSH03", name: "Darkness Ablaze" },
    swsh4: { code: "SWSH04", name: "Vivid Voltage" },
    swsh5: { code: "SWSH05", name: "Battle Styles" },
    swsh6: { code: "SWSH06", name: "Chilling Reign" },
    swsh7: { code: "SWSH07", name: "Evolving Skies" },
    swsh8: { code: "SWSH08", name: "Fusion Strike" },
    swsh9: { code: "SWSH09", name: "Brilliant Stars" },
    swsh9tg: { code: "SWSH09:TG", name: "Brilliant Stars Trainer Gallery" },
    swsh10: { code: "SWSH10", name: "Astral Radiance" },
    swsh11: { code: "SWSH11", name: "Lost Origin" },
    swsh11tg: { code: "SWSH11:TG", name: "Lost Origin Trainer Gallery" },
    swsh12: { code: "SWSH12", name: "Silver Tempest" },
    swsh12tg: { code: "SWSH12:TG", name: "Silver Tempest Trainer Gallery" },
    swsh12pt5: { code: "CRZ", name: "Crown Zenith" },
    swsh12pt5gg: { code: "CRZ:GG", name: "Crown Zenith Galarian Gallery" },
    swshp: { code: "SWSH", name: "Sword & Shield Promos" },
    swsh35: { code: "SWSH35", name: "Champion's Path" },
    swsh45: { code: "SWSH45", name: "Shining Fates" },
    swsh45sv: { code: "SHFSV", name: "Shining Fates Shiny Vault" },
    xy12: { code: "XY12", name: "XY Evolutions" },
    sm10: { code: "SM10", name: "Unbroken Bonds" },
    pogo: { code: "PGO", name: "Pokémon GO" },
    mcd22: { code: "MCD22", name: "McDonald's Collection 2022" },
    sv1: { code: "SV01", name: "Scarlet & Violet" },
    sv2: { code: "SV02", name: "Paldea Evolved" },
    sv3: { code: "SV03", name: "Obsidian Flames" },
    sv6: { code: "SV06", name: "Twilight Masquerade" }
};

const cards = [
    { name: "Garbodor V", number: "100/203", setId: "swsh7", image: "100", quantity: 1 },
    { name: "Garbodor VMAX", number: "101/203", setId: "swsh7", image: "101", quantity: 2 },
    { name: "Galarian Perrserker V", number: "129/196", setId: "swsh11", image: "129", quantity: 1 },
    { name: "Aegislash V", number: "126/185", setId: "swsh4", image: "126", quantity: 1 },
    { name: "Dodrio V", number: "201/264", setId: "swsh8", image: "201", quantity: 1 },
    { name: "Duraludon V", number: "122/203", setId: "swsh7", image: "122", quantity: 2 },
    { name: "Duraludon VMAX", number: "123/203", setId: "swsh7", image: "123", quantity: 1 },
    { name: "Rotom V", number: "058/196", setId: "swsh11", image: "58", quantity: 1 },
    { name: "Kyurem V", number: "048/196", setId: "swsh11", image: "48", quantity: 1 },
    { name: "Shaymin VSTAR", number: "014/172", setId: "swsh9", image: "14", quantity: 1 },
    { name: "Galarian Articuno", number: "SWSH282", setId: "swshp", image: "SWSH282", quantity: 1 },
    { name: "Toy Catcher", number: "233/203", setId: "swsh7", image: "233", quantity: 1 },
    { name: "Suicune V", number: "031/203", setId: "swsh7", image: "31", quantity: 1 },
    { name: "Giratina V", number: "130/196", setId: "swsh11", image: "130", quantity: 1 },
    { name: "Hisuian Zoroark VSTAR", number: "147/196", setId: "swsh11", image: "147", quantity: 1 },
    { name: "Victini V", number: "SWSH104", setId: "swshp", image: "SWSH104", quantity: 1 },
    { name: "Mawile V", number: "070/195", setId: "swsh12", image: "70", quantity: 1 },
    { name: "Lucario V", number: "146/264", setId: "swsh8", image: "146", quantity: 1 },
    { name: "Tyranitar V", number: "158/264", setId: "swsh8", image: "158", quantity: 2 },
    { name: "Gyarados V", number: "028/203", setId: "swsh7", image: "28", quantity: 2 },
    { name: "Galarian Darmanitan V", number: "036/185", setId: "swsh4", image: "36", quantity: 1 },
    { name: "Simisear V", number: "027/172", setId: "swsh9", image: "27", quantity: 1 },
    { name: "Dracozolt VMAX", number: "059/203", setId: "swsh7", image: "59", quantity: 1 },
    { name: "Kleavor V", number: "087/189", setId: "swsh10", image: "87", quantity: 1 },
    { name: "M Charizard EX", number: "013/108", setId: "xy12", image: "13", quantity: 1 },
    { name: "Charizard", number: "010/078", setId: "pogo", image: "10", quantity: 1 },
    { name: "Charizard EX", number: "012/108", setId: "xy12", image: "12", quantity: 1 },
    { name: "Charizard V", number: "019/189", setId: "swsh3", image: "19", quantity: 1 },
    { name: "Delphox V", number: "173/196", setId: "swsh11", image: "173", quantity: 1 },
    { name: "Delphox V", number: "027/196", setId: "swsh11", image: "27", quantity: 1 },
    { name: "Aerodactyl VSTAR", number: "093/196", setId: "swsh11", image: "93", quantity: 1 },
    { name: "Hisuian Goodra VSTAR", number: "136/196", setId: "swsh11", image: "136", quantity: 1 },
    { name: "Alcremie VMAX", number: "073/072", setId: "swsh45", image: "73", quantity: 1 },
    { name: "Drednaw V", number: "069/073", setId: "swsh35", image: "69", quantity: 1 },
    { name: "Stonjourner V", number: "115/202", setId: "swsh1", image: "115", quantity: 1 },
    { name: "Greedent V", number: "217/264", setId: "swsh8", image: "217", quantity: 1 },
    { name: "Galarian Sirfetch'd V", number: "SWSH043", setId: "swshp", image: "SWSH043", quantity: 1 },
    { name: "Alcremie V", number: "022/073", setId: "swsh35", image: "22", quantity: 1 },
    { name: "Medicham V", number: "083/203", setId: "swsh7", image: "83", quantity: 1 },
    { name: "Torkoal V", number: "188/202", setId: "swsh1", image: "188", quantity: 1 },
    { name: "Metagross V", number: "112/198", setId: "swsh6", image: "112", quantity: 1 },
    { name: "Dracozolt V", number: "058/203", setId: "swsh7", image: "58", quantity: 1 },
    { name: "Flareon VMAX", number: "018/203", setId: "swsh7", image: "18", quantity: 1 },
    { name: "Sylveon V", number: "074/203", setId: "swsh7", image: "74", quantity: 1 },
    { name: "Gardevoir & Sylveon-GX", number: "130/214", setId: "sm10", image: "130", quantity: 1 },
    { name: "Flareon V", number: "169/203", setId: "swsh7", image: "169", quantity: 1 },
    { name: "Hisuian Arcanine V", number: "090/195", setId: "swsh12", image: "90", quantity: 1 },
    { name: "Boltund VMAX", number: "267/264", setId: "swsh8", image: "267", quantity: 1 },
    { name: "Vaporeon VMAX", number: "SWSH182", setId: "swshp", image: "SWSH182", quantity: 1 },
    { name: "Lycanroc V", number: "091/203", setId: "swsh7", image: "91", quantity: 1 },
    { name: "Lycanroc VMAX", number: "213/203", setId: "swsh7", image: "213", quantity: 1 },
    { name: "Charizard ex", number: "228/197", setId: "sv3", image: "228", quantity: 1 },
    { name: "Sylveon V", number: "TG14/TG30", setId: "swsh9tg", image: "TG14", quantity: 1 },
    { name: "Eevee", number: "TG11/TG30", setId: "swsh9tg", image: "TG11", quantity: 1 },
    { name: "Adventurer's Discovery", number: "TG23/TG30", setId: "swsh11tg", image: "TG23", quantity: 1 },
    { name: "Roserade", number: "TG02/TG30", setId: "swsh11tg", image: "TG02", quantity: 1 },
    { name: "Snorlax", number: "TG10/TG30", setId: "swsh11tg", image: "TG10", quantity: 1 },
    { name: "Castform", number: "TG11/TG30", setId: "swsh11tg", image: "TG11", quantity: 1 },
    { name: "Copycat", number: "200/203", setId: "swsh7", image: "200", quantity: 1 },
    { name: "Flaaffy", number: "TG03/TG30", setId: "swsh12tg", image: "TG03", quantity: 1 },
    { name: "Basic Lightning Energy", number: "257/198", setId: "sv1", image: "257", quantity: 1 },
    { name: "Grusha", number: "268/193", setId: "sv2", image: "268", quantity: 1 },
    { name: "Wo-Chien ex", number: "257/193", setId: "sv2", image: "257", quantity: 1 },
    { name: "Cinderace", number: "SV017/SV122", setId: "swsh45sv", image: "SV017", quantity: 1 },
    { name: "Fuecoco", number: "201/193", setId: "sv2", image: "201", quantity: 1 },
    { name: "Paldean Clodsire ex", number: "130/193", setId: "sv2", image: "130", quantity: 1 },
    { name: "Smeargle", number: "15/15", setId: "mcd22", image: "15", quantity: 2 },
    { name: "Bellibolt ex", number: "237/193", setId: "sv2", image: "237", quantity: 1 },
    { name: "Revavroom ex", number: "224/197", setId: "sv3", image: "224", quantity: 1 },
    { name: "Comfey", number: "079/196", setId: "swsh11", image: "79", quantity: 1 },
    { name: "Jubilife Village", number: "212/189", setId: "swsh10", image: "212", quantity: 1 },
    { name: "Regieleki V", number: "175/195", setId: "swsh12", image: "175", quantity: 1 },
    { name: "Pawmot ex", number: "073/197", setId: "sv3", image: "73", quantity: 1 },
    { name: "Sordward & Shielbert", number: "TG28/TG30", setId: "swsh12tg", image: "TG28", quantity: 1 },
    { name: "Pidgeot ex", number: "225/197", setId: "sv3", image: "225", quantity: 1 },
    { name: "Mimikyu V", number: "TG16/TG30", setId: "swsh9tg", image: "TG16", quantity: 1 },
    { name: "Alolan Vulpix V", number: "033/195", setId: "swsh12", image: "33", quantity: 1 },
    { name: "Blissey ex", number: "201/167", setId: "sv6", image: "201", quantity: 1 },
    { name: "Lucario V", number: "078/189", setId: "swsh10", image: "78", quantity: 1 },
    { name: "Kieran", number: "218/167", setId: "sv6", image: "218", quantity: 1 },
    { name: "Rockruff", number: "TG07/TG30", setId: "swsh12tg", image: "TG07", quantity: 1 },
    { name: "Tyranitar V", number: "097/163", setId: "swsh5", image: "97", quantity: 1 },
    { name: "Kindler", number: "179/172", setId: "swsh9", image: "179", quantity: 1 },
    { name: "Alolan Vulpix VSTAR", number: "034/195", setId: "swsh12", image: "34", quantity: 1 },
    { name: "Radiant Greninja", number: "046/189", setId: "swsh10", image: "46", quantity: 1 },
    { name: "Kyogre V", number: "037/159", setId: "swsh12pt5", image: "37", quantity: 1 },
    { name: "Kyogre", number: "036/159", setId: "swsh12pt5", image: "36", quantity: 1 },
    { name: "Duraludon VMAX", number: "104/159", setId: "swsh12pt5", image: "104", quantity: 1 },
    { name: "Rayquaza V", number: "100/159", setId: "swsh12pt5", image: "100", quantity: 1 },
    { name: "Rayquaza", number: "SWSH029", setId: "swshp", image: "SWSH029", quantity: 1 },
    { name: "Bea", number: "123/159", setId: "swsh12pt5", image: "123", quantity: 1 },
    { name: "Swablu", number: "GG27/GG70", setId: "swsh12pt5gg", image: "GG27", quantity: 1 },
    { name: "Adaman", number: "GG57/GG70", setId: "swsh12pt5gg", image: "GG57", quantity: 1 },
    { name: "Radiant Charizard", number: "020/159", setId: "swsh12pt5", image: "20", quantity: 1 },
    { name: "Hatterene V", number: "065/159", setId: "swsh12pt5", image: "65", quantity: 1 },
    { name: "Roxanne", number: "GG66/GG70", setId: "swsh12pt5gg", image: "GG66", quantity: 1 },
    { name: "Lapras", number: "GG05/GG70", setId: "swsh12pt5gg", image: "GG05", quantity: 1 },
    { name: "Elesa's Sparkle", number: "147/159", setId: "swsh12pt5", image: "147", quantity: 1 }
];

const grid = document.querySelector("#card-grid");
const searchInput = document.querySelector("#card-search");
const setFilter = document.querySelector("#set-filter");
const sortSelect = document.querySelector("#sort-cards");
const resultsCopy = document.querySelector("#results-copy");
const emptyState = document.querySelector("#empty-state");
const clearFilters = document.querySelector("#clear-filters");
const dialog = document.querySelector("#card-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogName = document.querySelector("#dialog-card-name");
const dialogSet = document.querySelector("#dialog-set");
const dialogNumber = document.querySelector("#dialog-number");
const dialogQuantity = document.querySelector("#dialog-quantity");

let visibleCards = cards.map((card, index) => ({ ...card, collectionIndex: index }));
let activeIndex = 0;

function imageUrl(card, highResolution = false) {
    return `https://images.pokemontcg.io/${card.setId}/${card.image}${highResolution ? "_hires" : ""}.png`;
}

function setDetails(card) {
    return SETS[card.setId] || { code: card.setId.toUpperCase(), name: card.setId.toUpperCase() };
}

function populateSetFilter() {
    const usedSetIds = [...new Set(cards.map((card) => card.setId))];
    usedSetIds
        .sort((left, right) => setDetails({ setId: left }).name.localeCompare(setDetails({ setId: right }).name))
        .forEach((setId) => {
            const set = SETS[setId];
            const option = document.createElement("option");
            option.value = setId;
            option.textContent = `${set.name} · ${set.code}`;
            setFilter.append(option);
        });
}

function createCardTile(card, index) {
    const set = setDetails(card);
    const item = document.createElement("article");
    item.className = "card-tile";
    item.setAttribute("role", "listitem");
    item.style.setProperty("--card-index", index);

    const button = document.createElement("button");
    button.className = "card-button";
    button.type = "button";
    button.dataset.index = index;
    button.setAttribute(
        "aria-label",
        `View ${card.name}, ${card.number}, ${set.name}${card.quantity > 1 ? `, ${card.quantity} copies` : ""}`
    );

    const image = document.createElement("img");
    image.src = imageUrl(card);
    image.srcset = `${imageUrl(card)} 245w, ${imageUrl(card, true)} 734w`;
    image.sizes = "(max-width: 640px) 48vw, (max-width: 900px) 31vw, (max-width: 1250px) 23vw, 18vw";
    image.alt = `${card.name} ${card.number}`;
    image.decoding = "async";
    image.loading = index < 10 ? "eager" : "lazy";
    if (index < 5) {
        image.fetchPriority = "high";
    }

    image.addEventListener("error", () => {
        image.remove();
        button.classList.add("image-missing");
        const fallback = document.createElement("span");
        fallback.className = "fallback-copy";
        fallback.innerHTML = `<strong>${card.name}</strong><span>${card.number} · ${set.code}</span>`;
        button.prepend(fallback);
    }, { once: true });

    button.append(image);

    if (card.quantity > 1) {
        const badge = document.createElement("span");
        badge.className = "quantity-badge";
        badge.textContent = `×${card.quantity}`;
        badge.setAttribute("aria-hidden", "true");
        button.append(badge);
    }

    item.append(button);
    return item;
}

function compareSetAndNumber(left, right) {
    const setDifference = setDetails(left).name.localeCompare(setDetails(right).name);
    if (setDifference !== 0) {
        return setDifference;
    }

    return left.image.localeCompare(right.image, undefined, { numeric: true });
}

function updateCollection() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    const selectedSet = setFilter.value;

    visibleCards = cards
        .map((card, index) => ({ ...card, collectionIndex: index }))
        .filter((card) => {
            const set = setDetails(card);
            const searchable = `${card.name} ${card.number} ${set.code} ${set.name}`.toLocaleLowerCase();
            return (selectedSet === "all" || card.setId === selectedSet) && searchable.includes(query);
        });

    if (sortSelect.value === "name") {
        visibleCards.sort((left, right) => left.name.localeCompare(right.name) || compareSetAndNumber(left, right));
    } else if (sortSelect.value === "set") {
        visibleCards.sort(compareSetAndNumber);
    }

    grid.replaceChildren(...visibleCards.map(createCardTile));
    emptyState.hidden = visibleCards.length !== 0;
    grid.hidden = visibleCards.length === 0;

    const visibleCopies = visibleCards.reduce((sum, card) => sum + card.quantity, 0);
    if (visibleCards.length === cards.length) {
        resultsCopy.textContent = `${visibleCards.length} cards · ${visibleCopies} copies`;
    } else {
        resultsCopy.textContent = `${visibleCards.length} matching ${visibleCards.length === 1 ? "card" : "cards"}`;
    }
}

function showCard(index) {
    const card = visibleCards[index];
    if (!card) {
        return;
    }

    activeIndex = index;
    const set = setDetails(card);
    dialogImage.src = imageUrl(card, true);
    dialogImage.alt = `${card.name} ${card.number}`;
    dialogName.textContent = card.name;
    dialogSet.textContent = `${set.name} · ${set.code}`;
    dialogNumber.textContent = `Collector number ${card.number}`;
    dialogQuantity.textContent = card.quantity === 1 ? "1 copy in the collection" : `${card.quantity} copies in the collection`;

    if (!dialog.open) {
        dialog.showModal();
    }
}

function moveDialog(direction) {
    if (visibleCards.length < 2) {
        return;
    }

    const nextIndex = (activeIndex + direction + visibleCards.length) % visibleCards.length;
    showCard(nextIndex);
}

grid.addEventListener("click", (event) => {
    const button = event.target.closest(".card-button");
    if (!button) {
        return;
    }

    showCard(Number(button.dataset.index));
});

searchInput.addEventListener("input", updateCollection);
setFilter.addEventListener("change", updateCollection);
sortSelect.addEventListener("change", updateCollection);

clearFilters.addEventListener("click", () => {
    searchInput.value = "";
    setFilter.value = "all";
    sortSelect.value = "collection";
    updateCollection();
    searchInput.focus();
});

document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
document.querySelector("#dialog-previous").addEventListener("click", () => moveDialog(-1));
document.querySelector("#dialog-next").addEventListener("click", () => moveDialog(1));

dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});

document.addEventListener("keydown", (event) => {
    if (!dialog.open) {
        return;
    }

    if (event.key === "ArrowLeft") {
        moveDialog(-1);
    } else if (event.key === "ArrowRight") {
        moveDialog(1);
    }
});

document.querySelector("#unique-count").textContent = cards.length;
document.querySelector("#copy-count").textContent = cards.reduce((sum, card) => sum + card.quantity, 0);
document.querySelector("#set-count").textContent = new Set(cards.map((card) => card.setId)).size;

populateSetFilter();
updateCollection();
