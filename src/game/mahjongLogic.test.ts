import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialGameState,
  selectTile,
  resolveMismatch,
  triggerGentleHint,
  computeBoundedRecommendation
} from './mahjongLogic';

test('initializes correct number of tiles for easy, medium, and hard levels', () => {
  const easy = createInitialGameState('easy', 42);
  const medium = createInitialGameState('medium', 42);
  const hard = createInitialGameState('hard', 42);

  assert.equal(easy.tiles.length, 8);
  assert.equal(easy.totalPairs, 4);
  assert.equal(medium.tiles.length, 12);
  assert.equal(medium.totalPairs, 6);
  assert.equal(hard.tiles.length, 16);
  assert.equal(hard.totalPairs, 8);
});

test('prevents duplicate click on the same tile and matches identical symbols', () => {
  let state = createInitialGameState('easy', 101);
  const firstTile = state.tiles[0];
  const partnerTile = state.tiles.find(
    (t) => t.symbolId === firstTile.symbolId && t.uid !== firstTile.uid
  )!;

  // Flip first tile
  state = selectTile(state, firstTile.uid);
  assert.equal(state.selectedUids.length, 1);

  // Clicking the exact same tile again should be ignored
  const duplicateClickState = selectTile(state, firstTile.uid);
  assert.equal(duplicateClickState.selectedUids.length, 1);

  // Clicking the matching partner resolves immediately
  state = selectTile(state, partnerTile.uid);
  assert.equal(state.matchesFound, 1);
  assert.equal(state.attempts, 1);
  assert.equal(state.selectedUids.length, 0);
  assert.equal(state.isLocked, false);
});

test('triggers supportive adaptive prompt after 2 consecutive mismatches and allows gentle hint', () => {
  let state = createInitialGameState('medium', 202);
  const tileA = state.tiles[0];
  const tileB = state.tiles.find((t) => t.symbolId !== tileA.symbolId)!;

  // First mismatch
  state = selectTile(state, tileA.uid);
  state = selectTile(state, tileB.uid);
  assert.equal(state.isLocked, true);
  state = resolveMismatch(state);
  assert.equal(state.consecutiveMistakes, 1);
  assert.equal(state.adaptivePromptVisible, false);

  // Second consecutive mismatch -> triggers supportive adaptive prompt
  state = selectTile(state, tileA.uid);
  state = selectTile(state, tileB.uid);
  state = resolveMismatch(state);
  assert.equal(state.consecutiveMistakes, 2);
  assert.equal(state.adaptivePromptVisible, true);

  // Triggering a gentle hint highlights a matching pair and dismisses prompt
  state = triggerGentleHint(state);
  assert.equal(state.hintsUsed, 1);
  assert.equal(state.adaptivePromptVisible, false);
  const hintedCount = state.tiles.filter((t) => t.isHinted).length;
  assert.equal(hintedCount, 2);
});

test('completes full game when all pairs are matched and generates bounded recommendation', () => {
  let state = createInitialGameState('easy', 303);
  const symbolIds = Array.from(new Set(state.tiles.map((t) => t.symbolId)));

  for (const symId of symbolIds) {
    const pair = state.tiles.filter((t) => t.symbolId === symId);
    state = selectTile(state, pair[0].uid);
    state = selectTile(state, pair[1].uid);
  }

  assert.equal(state.isCompleted, true);
  assert.equal(state.matchesFound, 4);
  assert.equal(state.attempts, 4);

  const rec = computeBoundedRecommendation(state);
  assert.equal(rec.suggestedNextLevel, 'medium');
  assert.equal(rec.accuracyRatePercent, 100);
  assert.ok(rec.boundarySafeguardNote.includes('Simulated Rule-Based Prototype'));
});
