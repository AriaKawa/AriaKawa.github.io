export type VisibleDraftDeckId = "weapon" | "body" | "wheel";

// Card motion deliberately runs at half of the original speed. Keep the
// JavaScript lifecycle and CSS custom properties sourced from these values so
// a card cannot become interactive before its animation has finished.
export const DRAFT_DEAL_DURATION_MS = 840;
export const DRAFT_DEAL_LEAD_MS = 80;
export const DRAFT_DEAL_STAGGER_MS = 70;
export const DRAFT_RETURN_DURATION_MS = 680;
export const DRAFT_RETURN_STAGGER_MS = 48;

const DRAFT_DEAL_SETTLE_MS = 140;
const DRAFT_RETURN_SETTLE_MS = 180;
const DRAFT_PICKED_RETURN_DELAY_MS = 140;

const CARD_SELECTOR = ".starter-card,.upgrade-card,.vehicle-card";
const VISIBLE_DECKS: VisibleDraftDeckId[] = ["weapon", "body", "wheel"];
let motionVersion = 0;

function dealTotalDuration(cardCount: number): number {
  return DRAFT_DEAL_LEAD_MS
    + DRAFT_DEAL_DURATION_MS
    + Math.max(0, cardCount - 1) * DRAFT_DEAL_STAGGER_MS
    + DRAFT_DEAL_SETTLE_MS;
}

export function draftReturnTotalDuration(cardCount: number): number {
  return DRAFT_RETURN_DURATION_MS
    + Math.max(0, cardCount) * DRAFT_RETURN_STAGGER_MS
    + DRAFT_RETURN_SETTLE_MS;
}

function visibleCards(grid: HTMLElement): HTMLElement[] {
  return Array.from(grid.querySelectorAll<HTMLElement>(CARD_SELECTOR)).filter(card => !card.hidden);
}

function sourceDeckForCard(card: HTMLElement, index: number, deckRoot?: HTMLElement): VisibleDraftDeckId {
  const category = card.dataset.category;
  if (category === "weapon" || category === "turret") return "weapon";
  if (category === "body") return "body";
  if (category === "wheel") return "wheel";
  const activeDeck=deckRoot?.dataset.activeDeck as VisibleDraftDeckId|undefined;
  if(activeDeck&&VISIBLE_DECKS.includes(activeDeck))return activeDeck;
  const optionId=card.dataset.optionId??String(index);
  const hash=Array.from(optionId).reduce((total,character)=>total+character.charCodeAt(0),0);
  return VISIBLE_DECKS[hash%VISIBLE_DECKS.length];
}

function sourceElementForCard(card: HTMLElement, index: number, deckRoot: HTMLElement): HTMLElement {
  const deckId = sourceDeckForCard(card, index, deckRoot);
  return deckRoot.matches(".deck-stack")
    ? deckRoot
    : deckRoot.querySelector<HTMLElement>(`[data-deck-pile="${deckId}"] .deck-cards`)
      ?? deckRoot.querySelector<HTMLElement>(".deck-cards")
      ?? deckRoot;
}

function positionCardsAtSourceDeck(cards: HTMLElement[], deckRoot: HTMLElement): void {
  // Batch layout reads ahead of all writes. The old read/write loop forced a
  // synchronous layout for every card during both deal and collection.
  const measurements = cards.map((card, index) => ({
    card,
    index,
    deckId: sourceDeckForCard(card, index, deckRoot),
    sourceRect: sourceElementForCard(card, index, deckRoot).getBoundingClientRect(),
    cardRect: card.getBoundingClientRect(),
  }));
  measurements.forEach(({ card, index, deckId, sourceRect, cardRect }) => {
    card.dataset.sourceDeck = card.dataset.category === "ability" ? "wildcard" : deckId;
    card.style.setProperty("--deck-x", `${sourceRect.left + sourceRect.width / 2 - cardRect.left - cardRect.width / 2}px`);
    card.style.setProperty("--deck-y", `${sourceRect.top + sourceRect.height / 2 - cardRect.top - cardRect.height / 2}px`);
    card.style.setProperty("--deal-rotate", `${(index - 1) * 5.5}deg`);
  });
}

function startMotionOnNextFrame(version: number, grid: HTMLElement, start: () => void): void {
  grid.classList.add("draft-motion-pending");
  window.requestAnimationFrame(() => {
    if (version !== motionVersion) return;
    grid.classList.remove("draft-motion-pending");
    start();
  });
}

function markActiveDrawDeck(deckRoot:HTMLElement,cards:HTMLElement[]):void{
  const active=cards[0]?sourceDeckForCard(cards[0],0):"weapon";
  deckRoot.dataset.activeDeck=active;
  deckRoot.querySelectorAll<HTMLElement>("[data-deck-pile]").forEach(pile=>pile.classList.toggle("is-active-draw",pile.dataset.deckPile===active));
}

function applyDraftTiming(deckRoot: HTMLElement): void {
  const shell = deckRoot.closest<HTMLElement>(".draft-shell") ?? deckRoot;
  shell.style.setProperty("--draft-deal-duration", `${DRAFT_DEAL_DURATION_MS}ms`);
  shell.style.setProperty("--draft-return-duration", `${DRAFT_RETURN_DURATION_MS}ms`);
}

export function dealDraftCards(grid: HTMLElement, telemetry: HTMLElement): void {
  const version = ++motionVersion;
  const deckRoot = grid.closest(".draft-shell")?.querySelector<HTMLElement>(".deck-stack,.deck-rack");
  if (!deckRoot) return;
  const cards = visibleCards(grid);
  deckRoot.classList.remove("is-collecting", "is-dealing");
  applyDraftTiming(deckRoot);
  markActiveDrawDeck(deckRoot,cards);
  cards.forEach((card, index) => {
    card.classList.remove("is-picked", "is-pending", "is-shuffling-in", "is-dealing", "is-revealed");
    card.style.setProperty("--deal-delay", `${DRAFT_DEAL_LEAD_MS + index * DRAFT_DEAL_STAGGER_MS}ms`);
  });
  grid.classList.remove("is-pick-pending");
  positionCardsAtSourceDeck(cards, deckRoot);
  startMotionOnNextFrame(version, grid, () => {
    deckRoot.classList.add("is-dealing");
    cards.forEach(card => card.classList.add("is-dealing"));
  });
  telemetry.dataset.deckAnimation = "shuffling-and-dealing";
  window.setTimeout(() => {
    if (version !== motionVersion) return;
    cards.forEach(card => {
      card.classList.remove("is-dealing");
      card.classList.add("is-revealed");
    });
    deckRoot.classList.remove("is-dealing");
    telemetry.dataset.deckAnimation = "ready";
  }, dealTotalDuration(cards.length));
}

export function collectDraftCards(grid: HTMLElement, pickedId: string, telemetry: HTMLElement): number {
  const version = ++motionVersion;
  const deckRoot = grid.closest(".draft-shell")?.querySelector<HTMLElement>(".deck-stack,.deck-rack");
  if (!deckRoot) return 0;
  const cards = visibleCards(grid);
  deckRoot.classList.remove("is-dealing", "is-collecting");
  applyDraftTiming(deckRoot);
  markActiveDrawDeck(deckRoot,cards);
  cards.forEach((card, index) => {
    const picked = card.dataset.optionId === pickedId;
    card.classList.remove("is-dealing", "is-pending", "is-shuffling-in");
    card.classList.toggle("is-picked", picked);
    card.style.setProperty("--shuffle-delay", `${picked ? DRAFT_PICKED_RETURN_DELAY_MS : (cards.length - 1 - index) * DRAFT_RETURN_STAGGER_MS}ms`);
    card.querySelectorAll<HTMLButtonElement>("button").forEach(button => { button.disabled = true; });
  });
  grid.classList.remove("is-pick-pending");
  positionCardsAtSourceDeck(cards, deckRoot);
  startMotionOnNextFrame(version, grid, () => {
    deckRoot.classList.add("is-collecting");
    cards.forEach(card => card.classList.add("is-shuffling-in"));
  });
  telemetry.dataset.deckAnimation = "applying-pick";
  const totalDuration = draftReturnTotalDuration(cards.length);
  window.setTimeout(() => {
    if (version === motionVersion) telemetry.dataset.deckAnimation = "stacked";
  }, totalDuration);
  return totalDuration;
}

export function markDraftCardPending(grid: HTMLElement, pickedId: string, telemetry: HTMLElement): void {
  const cards = visibleCards(grid);
  grid.classList.add("is-pick-pending");
  cards.forEach(card => {
    card.classList.toggle("is-pending", card.dataset.optionId === pickedId);
    const button = card.matches("button") ? card as HTMLButtonElement : card.querySelector<HTMLButtonElement>("button");
    if (button) button.disabled = true;
  });
  telemetry.dataset.deckAnimation = "pick-pending";
}

export function updateVisibleDeckCounts(
  overlay: HTMLElement,
  counts: Partial<Record<VisibleDraftDeckId, number>>,
): void {
  const changedPiles: HTMLElement[] = [];
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
      changedPiles.push(pile);
    }
  }
  // Restart every changed counter animation with one layout read instead of
  // forcing a separate synchronous layout for every deck.
  if (changedPiles.length) {
    void overlay.offsetWidth;
    changedPiles.forEach(pile => pile.classList.add("count-changed"));
  }
}

export function isDraftDealActive(grid: HTMLElement): boolean {
  return grid.classList.contains("draft-motion-pending") || visibleCards(grid).some(card => card.classList.contains("is-dealing"));
}
