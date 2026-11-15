import { test, expect } from "bun:test";
import { teammateNumbers, gazeAmount } from "./locker.js";

test("teammate numbers skip the player's own and stay unique", () => {
  for (const n of [1, 8, 11, 0, 23]) {
    const nums = teammateNumbers(n);
    expect(nums.length).toBe(10);
    expect(new Set(nums).size).toBe(10);
    expect(nums.includes(n)).toBe(false);
  }
  expect(teammateNumbers(8)).toEqual([1, 2, 3, 4, 5, 6, 7, 9, 10, 11]);
});

test("door gaze is 1 when looking straight at it and 0 when turned away", () => {
  const from = { x: 0, y: 1.65, z: 0 };
  const door = { x: -4.4, y: 1.2, z: 0 };
  expect(gazeAmount(from, { x: -1, y: 0, z: 0 }, door)).toBeGreaterThan(0.99);
  expect(gazeAmount(from, { x: 1, y: 0, z: 0 }, door)).toBe(0);
  expect(gazeAmount(from, { x: 0, y: 0, z: 1 }, door)).toBe(0);
  // about 30 degrees off is partway
  const a = (30 * Math.PI) / 180;
  const mid = gazeAmount(from, { x: -Math.cos(a), y: 0, z: Math.sin(a) }, door);
  expect(mid).toBeGreaterThan(0.05);
  expect(mid).toBeLessThan(0.7);
});
