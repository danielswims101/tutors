// Renders the app icon to PNG at several sizes with no dependencies (used for the PWA / home-screen icons).
const fs = require('fs'); const zlib = require('zlib'); const path = require('path');
const out = path.join(__dirname, '..', 'public', 'icons'); fs.mkdirSync(out, { recursive: true });
function crc32(buf) { let c, crc = 0xffffffff; for (let n = 0; n < buf.length; n++) { c = (crc ^ buf[n]) & 0xff; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; crc = (crc >>> 8) ^ c; } return (crc ^ 0xffffffff) >>> 0; }
function chunk(type, data) { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td)); return Buffer.concat([len, td, crc]); }
function png(w, h, rgba) { const raw = Buffer.alloc((w * 4 + 1) * h); for (let y = 0; y < h; y++) { raw[y * (w * 4 + 1)] = 0; rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4); } const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0; return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]); }
function inPoly(x, y, pts) { let inside = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside; } return inside; }
function render(size, { maskable = false } = {}) {
  const S = 512, ss = 3; const px = Buffer.alloc(size * size * 4);
  const A = [[256, 92], [404, 404], [340, 404], [256, 232], [172, 404], [108, 404]].map(([x, y]) => maskable ? [256 + (x - 256) * 0.72, 256 + (y - 256) * 0.72] : [x, y]);
  const bar = maskable ? [212, 310, 88, 22] : [196, 318, 120, 30];
  const r = maskable ? 0 : 112;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    let R = 0, G = 0, B = 0, Al = 0;
    for (let sy = 0; sy < ss; sy++) for (let sx = 0; sx < ss; sx++) {
      const u = (x + (sx + .5) / ss) / size * S, v = (y + (sy + .5) / ss) / size * S;
      const dx = Math.max(r - u, 0, u - (S - r)), dy = Math.max(r - v, 0, v - (S - r));
      if (dx * dx + dy * dy > r * r) continue;
      const t = (u + v) / (2 * S); let cr = 214 + (110 - 214) * t, cg = 58 + (16 - 58) * t, cb = 73 + (28 - 73) * t;
      if (inPoly(u, v, A)) { cr = 255; cg = 255; cb = 255; }
      if (u >= bar[0] && u <= bar[0] + bar[2] && v >= bar[1] && v <= bar[1] + bar[3]) { cr = 243; cg = 210; cb = 122; }
      R += cr; G += cg; B += cb; Al += 255;
    }
    const n = ss * ss; const i = (y * size + x) * 4; const a = Al / n; px[i] = Al ? Math.round(R / (Al / 255)) : 0; px[i + 1] = Al ? Math.round(G / (Al / 255)) : 0; px[i + 2] = Al ? Math.round(B / (Al / 255)) : 0; px[i + 3] = Math.round(a);
  }
  return png(size, size, px);
}
for (const [name, size, opts] of [['icon-512.png', 512], ['icon-192.png', 192], ['apple-touch-icon.png', 180, { maskable: true }], ['icon-maskable-512.png', 512, { maskable: true }], ['icon-maskable-192.png', 192, { maskable: true }]]) { fs.writeFileSync(path.join(out, name), render(size, opts)); console.log('wrote', name); }
