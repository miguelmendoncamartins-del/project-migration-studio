import { describe, expect, it } from 'vitest';
// @ts-expect-error Static game module intentionally remains JavaScript.
import { fighterFrame, joystickVector, usesTouchControls, skillSoundProfile } from '../../public/game/animation-rules.js';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('Character motion and mobile controls', () => {
  it('repeats walk frames during held movement without selecting attack frames', () => {
    expect(fighterFrame({ moving: true, elapsed: 0 })).toEqual({ action: 'walk', index: 0 });
    expect(fighterFrame({ moving: true, elapsed: 1 / 9 })).toEqual({ action: 'walk', index: 1 });
    expect(fighterFrame({ moving: true, elapsed: 4 / 9 })).toEqual({ action: 'walk', index: 0 });
  });
  it('returns to character idle frames when movement stops', () => {
    expect(fighterFrame({ moving: false, elapsed: 0.25 })).toEqual({ action: 'idle', index: 1 });
  });
  it('selects a separate pose for each special skill', () => {
    for (let slot = 0; slot < 4; slot++) expect(fighterFrame({ attacking: true, moving: true, slot })).toEqual({ action: 'special', index: slot });
  });
  it('uses touch controls on phones including landscape, and keyboard on desktop', () => {
    expect(usesTouchControls(390, 844, true)).toBe(true);
    expect(usesTouchControls(844, 390, true)).toBe(true);
    expect(usesTouchControls(1366, 768, false)).toBe(false);
  });
  it('normalizes joystick travel and stops at its center', () => {
    expect(joystickVector(0, 0)).toEqual({ x: 0, y: 0 });
    expect(joystickVector(100, 0)).toEqual({ x: 1, y: 0 });
    const v = joystickVector(100, 100); expect(Math.hypot(v.x, v.y)).toBeCloseTo(1);
  });
  it('provides distinct SFX profiles for characters and their skills', () => {
    expect(skillSoundProfile('jotaro', 0)).not.toEqual(skillSoundProfile('giorno', 0));
    expect(skillSoundProfile('jotaro', 0)).not.toEqual(skillSoundProfile('jotaro', 1));
  });
  it('provides separate four-frame strips for all 57 original characters', () => {
    const root = join(process.cwd(), 'public/game/pixel-sprites');
    let count = 0;
    for (const category of ['Protagonista', 'Boss-Secundário', 'Chefe-Final', 'Chefe-Secreto']) {
      for (const file of readdirSync(join(root, category)).filter(f => f.endsWith('.png'))) {
        count++;
        for (const action of ['idle', 'walk', 'special', 'skill-0', 'skill-1', 'skill-2', 'skill-3']) {
          const path = join(root, 'animations', category, file.slice(0, -4), `${action}.png`);
          expect(existsSync(path)).toBe(true);
          const bytes = readFileSync(path); expect(bytes.readUInt32BE(16)).toBe(1024); expect(bytes.readUInt32BE(20)).toBe(320);
        }
      }
    }
    expect(count).toBe(57);
  });
});