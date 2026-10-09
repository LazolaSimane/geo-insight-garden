import { describe, test, expect } from 'bun:test';
import { BASE_WEIGHTS, BAND_SCORE, SCENARIOS, computeR, categorise } from '../scoring';
import { scoreSites } from '../model';
describe('Report 2 rehabilitation model', () => {
  test('base weights are 0.40L + 0.40F + 0.20G', () => expect(BASE_WEIGHTS).toEqual({ L: 0.4, F: 0.4, G: 0.2 }));
  test('worked example L80 F60 G40 equals 64', () => expect(computeR({L:80,F:60,G:40})).toBe(64));
  test('five normalisation bands equal 0,25,50,75,100', () => expect(Object.values(BAND_SCORE)).toEqual([0,25,50,75,100]));
  test('all four scenarios conserve total weight', () => { expect(SCENARIOS).toHaveLength(4); SCENARIOS.forEach(s => expect(s.weights.L+s.weights.F+s.weights.G).toBeCloseTo(1,10)); });
  test('priority boundaries at 45 and 70', () => { expect(categorise(44.9)).toBe('low'); expect(categorise(45)).toBe('medium'); expect(categorise(69.9)).toBe('medium'); expect(categorise(70)).toBe('high'); });
  test('base ranking orders descending and preserves equal-score alphabetical tie break', () => { const sites=scoreSites(BASE_WEIGHTS); expect(sites[0]?.id).toBe('tower-ballroom'); expect(sites[0]?.R).toBe(85); for(let i=1;i<sites.length;i++){const prev=sites[i-1]; const next=sites[i]; if(!prev || !next) throw new Error('missing site'); expect(prev.R).toBeGreaterThanOrEqual(next.R); expect(next.rank).toBe(i+1); if(prev.R===next.R) expect(prev.name.localeCompare(next.name)).toBeLessThanOrEqual(0); }});
});
