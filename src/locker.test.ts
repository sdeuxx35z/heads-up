import { test, expect } from "bun:test";
import { teammateNumbers, gazeAmount, SIGNS, SIGN_TEXT, signCapHeight } from "./locker.js";

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

test("every sign has letters of at least 8 cm (1 degree at 4.5 m)", () => {
  for (const key of Object.keys(SIGNS)) {
    const cap = signCapHeight(key);
    expect(cap).toBeGreaterThanOrEqual(0.08);
    // the plate itself holds the letters with room to spare
    expect(SIGNS[key as keyof typeof SIGNS].h).toBeGreaterThan(cap);
  }
  // the door sign: cap height as seen from the spawn, 4.5 m away
  const deg = (Math.atan2(signCapHeight("continue"), 4.5) * 180) / Math.PI;
  expect(deg).toBeGreaterThanOrEqual(1);
  // header plates and the door label keep readable letters even for the longest label
  expect(signCapHeight("continue", "CAREER COMPLETE")).toBeGreaterThanOrEqual(0.08);
  expect(signCapHeight("continue", "PLAY")).toBeCloseTo(SIGNS.continue.cap, 6);
});

test("the SETTINGS plate fits the gap between the door frame and the first locker", () => {
  // gap beside the door is 0.59 m wide
  expect(SIGNS.settings.w).toBeLessThanOrEqual(0.57);
  expect(Object.keys(SIGN_TEXT).sort()).toEqual(["career", "practice", "settings", "stats", "today"]);
});
