import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const game = join(process.cwd(), 'public/game');
const categories = ['Protagonista', 'Boss-Secundário', 'Chefe-Final', 'Chefe-Secreto'];

describe('Original character sprite coverage', () => {
  for (const category of categories) {
    it(`provides a two-pose PNG for every ${category} reference`, () => {
      const references = readdirSync(join(game, 'Jojo-Sprite', category));
      expect(references.length).toBeGreaterThan(0);
      for (const reference of references) {
        const path = join(game, 'pixel-sprites', category, reference.replace(/\.[^.]+$/, '.png'));
        expect(existsSync(path), reference).toBe(true);
        const png = readFileSync(path);
        expect(png.subarray(1, 4).toString()).toBe('PNG');
        const width = png.readUInt32BE(16);
        const height = png.readUInt32BE(20);
        expect(width % 2, reference).toBe(0);
        expect(width, reference).toBeGreaterThan(height);
        expect(png[25], 'RGBA transparency').toBe(6);
      }
    });
  }
});
