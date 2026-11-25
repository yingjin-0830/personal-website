export const ARC = Object.freeze({ cx: 600, cy: 210, outer: 588, inner: 382, start: 186, end: -6, count: 8, imageRatio: 2 / 3, figureOrder: Object.freeze([0, 7, 1, 6, 2, 5, 3, 4]) });
export const point = (angle, radius) => [ARC.cx + radius * Math.cos(angle * Math.PI / 180), ARC.cy + radius * Math.sin(angle * Math.PI / 180)];
export function tileGeometry(index) {
  if (!Number.isInteger(index) || index < 0 || index >= ARC.count) throw new RangeError('Tile index must be 0–7');
  const start = ARC.start - index * 24, end = start - 24;
  const p = [point(start, ARC.outer), point(end, ARC.outer), point(end, ARC.inner), point(start, ARC.inner)];
  const d = `M${p[0]} A${ARC.outer} ${ARC.outer} 0 0 0 ${p[1]} L${p[2]} A${ARC.inner} ${ARC.inner} 0 0 1 ${p[3]}Z`;
  const extrema = [...p];
  for (const angle of [-90, 0, 90, 180, 270]) if (angle > end && angle < start) extrema.push(point(angle, ARC.outer), point(angle, ARC.inner));
  const xs = extrema.map(p => p[0]), ys = extrema.map(p => p[1]);
  const box = { x: Math.min(...xs), y: Math.min(...ys), width: Math.max(...xs) - Math.min(...xs), height: Math.max(...ys) - Math.min(...ys) };
  // The approved scene/cut pairs share a portrait 2:3 canvas.
  const height = Math.max(box.height, box.width / ARC.imageRatio), width = height * ARC.imageRatio;
  const image = { x: box.x + box.width / 2 - width / 2, y: box.y + box.height / 2 - height * .46, width, height };
  return { start, end, d, box, image, center: point((start + end) / 2, (ARC.outer + ARC.inner) / 2), side: index < 4 ? 'pro' : 'per' };
}
export function magnification(distance, active = true) { return active ? 1.04 + .24 * Math.max(0, 1 - Math.max(0, distance) / 300) : 1; }
