import { test, expect } from 'bun:test';
import { nearestScore, countScore, freeScore } from './quiz.js';

test('nearest: error is judged against the true distance, so clicking your own marker scores 0', () => {
  // your own marker is off by exactly how far the presser really was
  for (const d of [1.2, 2, 2.5, 4, 8, 15, 30]) {
    expect(nearestScore(d, d)).toBe(0);
    expect(nearestScore(d * 1.4, d)).toBe(0);
  }
  // close enough: inside 25% of the distance, never less than 2 m allowed (but always short of the whole distance)
  expect(nearestScore(0, 8)).toBe(100);
  expect(nearestScore(2, 8)).toBe(100);
  expect(nearestScore(4.4, 20)).toBe(100);     // 25% of 20 m is 5 m
  expect(nearestScore(5, 20)).toBe(100);
  // falling away to zero at the whole distance
  expect(nearestScore(5, 8)).toBe(50);
  expect(nearestScore(7, 8)).toBe(17);
  expect(nearestScore(8, 8)).toBe(0);
  expect(nearestScore(12.5, 20)).toBe(50);
  let prev = 101;
  for (let e = 0; e <= 12; e += 0.5) { const sc = nearestScore(e, 10); expect(sc).toBeLessThanOrEqual(prev); prev = sc; }
  // a close presser: only a click near him counts, and the tolerance is short of the distance
  expect(nearestScore(1.0, 2.5)).toBe(100);
  expect(nearestScore(2.0, 2.5)).toBeLessThanOrEqual(50);
  expect(nearestScore(2.5, 2.5)).toBe(0);
});

test('count: exact 100, one out 25, further 0; 5+ is the cap', () => {
  expect(countScore(3, 3)).toBe(100);
  expect(countScore(2, 3)).toBe(25);
  expect(countScore(4, 3)).toBe(25);
  expect(countScore(0, 3)).toBe(0);
  expect(countScore(5, 9)).toBe(100);
  expect(countScore(4, 9)).toBe(25);
  expect(countScore(1, 5)).toBe(0);
});

test('free: the freest man 100, any other man at most 20', () => {
  const a = { space: 12 }, b = { space: 11.5 }, c = { space: 3 }, d = { space: 0 };
  expect(freeScore(a, a)).toBe(100);
  expect(freeScore(b, a)).toBe(19);
  expect(freeScore(c, a)).toBe(5);
  expect(freeScore(d, a)).toBe(0);
  for (const m of [b, c, d]) expect(freeScore(m, a)).toBeLessThanOrEqual(20);
});
