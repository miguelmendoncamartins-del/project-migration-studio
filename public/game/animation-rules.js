export const MOBILE_BREAKPOINT = 760;
export function usesTouchControls(width, height, coarse = false) {
  return width <= MOBILE_BREAKPOINT || (coarse && Math.min(width, height) <= MOBILE_BREAKPOINT);
}
export function fighterFrame({ attacking = false, moving = false, elapsed = 0, slot = -1 }) {
  if (attacking && slot >= 0) return { action: 'special', index: Math.min(slot, 3) };
  return { action: attacking ? 'attack' : moving ? 'walk' : 'idle', index: Math.floor(elapsed * (attacking ? 14 : moving ? 9 : 4)) % 4 };
}
export function joystickVector(dx, dy, radius = 38) {
  const distance = Math.hypot(dx, dy);
  if (distance < 6) return { x: 0, y: 0 };
  const scale = Math.max(radius, distance);
  return { x: dx / scale, y: dy / scale };
}
export function skillSoundProfile(character, slot) {
  const bases = { jonathan: 196, joseph: 247, jotaro: 110, josuke4: 330, giorno: 440, jolyne: 294, johnny: 147, gappy: 392, jodio: 82 };
  return { frequency: (bases[character] || 220) * (1 + slot * 0.37), pulses: 3 + slot, wave: ['triangle', 'sawtooth', 'square'][slot % 3] };
}