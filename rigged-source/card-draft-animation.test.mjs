import assert from "node:assert/strict";
import {
  DRAFT_DEAL_DURATION_MS,
  DRAFT_DEAL_LEAD_MS,
  DRAFT_DEAL_STAGGER_MS,
  DRAFT_RETURN_DURATION_MS,
  DRAFT_RETURN_STAGGER_MS,
  draftReturnTotalDuration,
} from "./src/game/rigged/CardDraftAnimation.ts";

assert.equal(DRAFT_DEAL_DURATION_MS, 840, "card deals run at half of their original speed");
assert.equal(DRAFT_DEAL_LEAD_MS, 80, "the deal lead-in follows the half-speed cadence");
assert.equal(DRAFT_DEAL_STAGGER_MS, 70, "deal staggering is slowed with the cards");
assert.equal(DRAFT_RETURN_DURATION_MS, 680, "card returns run at half of their original speed");
assert.equal(DRAFT_RETURN_STAGGER_MS, 48, "return staggering is slowed with the cards");
assert.equal(draftReturnTotalDuration(3), 1004, "three-card picks remain locked until every return settles");
assert.equal(draftReturnTotalDuration(9), 1292, "larger vehicle drafts receive enough time to settle");

console.log("Card draft timing tests passed (half-speed deal and return lifecycle). ");
