export type VisibleDraftDeckId = "weapon" | "body" | "wheel";

export const DRAFT_DEAL_DURATION_MS = 860;
export const DRAFT_DEAL_LEAD_MS = 120;
export const DRAFT_DEAL_STAGGER_MS = 65;
export const DRAFT_RETURN_DURATION_MS = 760;
export const DRAFT_RETURN_STAGGER_MS = 45;

const CARD_SELECTOR = ".starter-card,.upgrade-card,.vehicle-card";
const VISIBLE_DECKS: VisibleDraftDeckId[] = ["weapon", "body", "wheel"];
let motionVersion = 0;

function visibleCards(grid: HTMLElement): HTMLElement[] {
  return Array.from(grid.querySelectorAll<HTMLElement>(CARD_SELECTOR)).filter(card => !card.hidden);
}

function sourceDeckForCard(card: HTMLElement, index: number): VisibleDraftDeckId {
  const category = card.dataset.category;
  if (category === "weapon" || category === "turret") return "weapon";
  if (category === "body") return "body";
  if (category === "wheel") return "wheel";
  return VISIBLE_DECKS[index % VISIBLE_DECKS.length];
}

function positionCardAtSourceDeck(card: HTMLElement, index: number, deckRoot: HTMLElement): void {
  const deckId = sourceDeckForCard(card, index);
  const source = deckRoot.matches(".deck-stack")
    ? deckRoot
    : deckRoot.querySelector<HTMLElement>(`[data-deck-pile="${deckId}"] .deck-cards`)
      ?? deckRoot.querySelector<HTMLElement>(".deck-cards")
      ?? deckRoot;
  const sourceRect = source.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  card.dataset.sourceDeck = card.dataset.category === "ability" ? "wildcard" : deckId;
  card.style.setProperty("--deck-x", `${sourceRect.left + sourceRect.width / 2 - cardRect.left - cardRect.width / 2}px`);
  card.style.setProperty("--deck-y", `${sourceRect.top + sourceRect.height / 2 - cardRect.top - cardRect.height / 2}px`);
  card.style.setProperty("--deal-rotate", `${(index - 1) * 5.5}deg`);
}

export function dealDraftCards(grid: HTMLElement, telemetry: HTMLElement): void {
  const version = ++motionVersion;
  const deckRoot = grid.closest(".draft-shell")?.querySelector<HTMLElement>(".deck-stack,.deck-rack");
  if (!deckRoot) return;
  const cards = visibleCards(grid);
  deckRoot.classList.remove("is-collecting", "is-dealing");
  cards.forEach((card, index) => {
    card.classList.remove("is-picked", "is-shuffling-in", "is-dealing", "is-revealed");
    positionCardAtSourceDeck(card, index, deckRoot);
    card.style.setProperty("--deal-delay", `${DRAFT_DEAL_LEAD_MS + index * DRAFT_DEAL_STAGGER_MS}ms`);
  });
  void grid.offsetWidth;
  deckRoot.classList.add("is-dealing");
  cards.forEach(card => card.classList.add("is-dealing"));
  telemetry.dataset.deckAnimation = "shuffling-and-dealing";
  window.setTimeout(() => {
    if (version !== motionVersion) return;
    cards.forEach(card => {
      card.classList.remove("is-dealing");
      card.classList.add("is-revealed");
    });
    deckRoot.classList.remove("is-dealing");
    telemetry.dataset.deckAnimation = "ready";
  }, DRAFT_DEAL_LEAD_MS + DRAFT_DEAL_DURATION_MS + Math.max(0, cards.length - 1) * DRAFT_DEAL_STAGGER_MS + 70);
}

export function collectDraftCards(grid: HTMLElement, pickedId: string, telemetry: HTMLElement): void {
  const version = ++motionVersion;
  const deckRoot = grid.closest(".draft-shell")?.querySelector<HTMLElement>(".deck-stack,.deck-rack");
  if (!deckRoot) return;
  const cards = visibleCards(grid);
  deckRoot.classList.remove("is-dealing", "is-collecting");
  cards.forEach((card, index) => {
    const picked = card.dataset.optionId === pickedId;
    card.classList.remove("is-dealing", "is-shuffling-in");
    positionCardAtSourceDeck(card, index, deckRoot);
    card.classList.toggle("is-picked", picked);
    card.style.setProperty("--shuffle-delay", `${picked ? 70 : (cards.length - 1 - index) * DRAFT_RETURN_STAGGER_MS}ms`);
    card.querySelectorAll<HTMLButtonElement>("button").forEach(button => { button.disabled = true; });
  });
  void grid.offsetWidth;
  deckRoot.classList.add("is-collecting");
  cards.forEach(card => card.classList.add("is-shuffling-in"));
  telemetry.dataset.deckAnimation = "applying-pick";
  window.setTimeout(() => {
    if (version === motionVersion) telemetry.dataset.deckAnimation = "stacked";
  }, DRAFT_RETURN_DURATION_MS + cards.length * DRAFT_RETURN_STAGGER_MS + 90);
}

export function updateVisibleDeckCounts(
  overlay: HTMLElement,
  counts: Partial<Record<VisibleDraftDeckId, number>>,
): void {
  for (const deckId of VISIBLE_DECKS) {
    const pile = overlay.querySelector<HTMLElement>(`[data-deck-pile="${deckId}"]`);
    const count = counts[deckId];
    if (!pile || count === undefined) continue;
    const total = Number(pile.dataset.deckTotal) || Math.max(1, count);
    const previous = pile.dataset.remaining;
    const ratio = Math.max(0, Math.min(1, count / total));
    pile.dataset.remaining = String(count);
    pile.style.setProperty("--deck-fill", String(ratio));
    pile.classList.toggle("is-low", ratio <= .25);
    pile.classList.toggle("is-empty", count === 0);
    const label = pile.querySelector<HTMLElement>("small");
    if (label) label.textContent = `×${count}`;
    pile.querySelectorAll<HTMLElement>(".deck-cards i").forEach((back, index, backs) => {
      const visibleLayers = count === 0 ? 0 : Math.max(1, Math.ceil(ratio * backs.length));
      back.style.opacity = index < visibleLayers ? "1" : ".12";
    });
    if (previous !== undefined && previous !== String(count)) {
      pile.classList.remove("count-changed");
      void pile.offsetWidth;
      pile.classList.add("count-changed");
    }
  }
}

export function isDraftDealActive(grid: HTMLElement): boolean {
  return visibleCards(grid).some(card => card.classList.contains("is-dealing"));
}
