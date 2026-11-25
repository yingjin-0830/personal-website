const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { pathToFileURL } = require('node:url');

const file = name => path.join(__dirname, '..', name);
const moduleAt = name => import(pathToFileURL(file(name)).href);
const model = moduleAt('components/arc-model.mjs');
const routes = moduleAt('components/routes.mjs');
const near = (actual, expected, message) => assert.ok(Math.abs(actual - expected) < 1e-8, `${message}: ${actual} vs ${expected}`);

test('eight touching sectors cover the complete 186° to −6° bowl, meeting at 90°', async () => {
  const { ARC, tileGeometry } = await model;
  const tiles = Array.from({ length: 8 }, (_, i) => tileGeometry(i));
  assert.equal(tiles[0].start, 186);
  assert.equal(tiles.at(-1).end, -6);
  assert.equal(tiles.reduce((sum, tile) => sum + tile.start - tile.end, 0), 192);
  for (let i = 0; i < tiles.length; i++) {
    assert.equal(tiles[i].start - tiles[i].end, 24);
    if (i) assert.equal(tiles[i - 1].end, tiles[i].start, 'Adjacent sectors must not leave angular gaps');
  }
  assert.deepEqual(tiles.map(t => t.side), ['pro', 'pro', 'pro', 'pro', 'per', 'per', 'per', 'per']);
  assert.equal(tiles[3].end, 90);
  assert.equal(tiles[4].start, 90);
  assert.ok(ARC.outer > ARC.inner && ARC.inner > 0);
});

test('sector bounds contain their curved edges and every background canvas covers its clip', async () => {
  const { ARC, tileGeometry } = await model;
  for (let i = 0; i < 8; i++) {
    const { start, end, box, image, center } = tileGeometry(i);
    near(image.width / image.height, 2 / 3, `Tile ${i} approved scene and cutout canvas ratio`);
    assert.ok(Number.isFinite(image.x) && Number.isFinite(image.y));
    near(center[0], ARC.cx + (ARC.outer + ARC.inner) / 2 * Math.cos((start + end) / 2 * Math.PI / 180), 'Dock center x');
    near(center[1], ARC.cy + (ARC.outer + ARC.inner) / 2 * Math.sin((start + end) / 2 * Math.PI / 180), 'Dock center y');
    for (let step = 0; step <= 96; step++) {
      const angle = (end + (start - end) * step / 96) * Math.PI / 180;
      for (const radius of [ARC.inner, ARC.outer]) {
        const x = ARC.cx + radius * Math.cos(angle), y = ARC.cy + radius * Math.sin(angle);
        assert.ok(x >= box.x - 1e-8 && x <= box.x + box.width + 1e-8, `Tile ${i} curve escapes horizontal bounds`);
        assert.ok(y >= box.y - 1e-8 && y <= box.y + box.height + 1e-8, `Tile ${i} curve escapes vertical bounds`);
        assert.ok(x >= image.x - 1e-8 && x <= image.x + image.width + 1e-8, `Tile ${i} image leaves an unpainted horizontal gap`);
        assert.ok(y >= image.y - 1e-8 && y <= image.y + image.height + 1e-8, `Tile ${i} image leaves an unpainted vertical gap`);
      }
    }
  }
});

test('neighboring paths share both radial endpoints and invalid tile indices are rejected', async () => {
  const { ARC, point, tileGeometry } = await model;
  for (let i = 0; i < 7; i++) {
    const a = tileGeometry(i), b = tileGeometry(i + 1);
    for (const radius of [ARC.inner, ARC.outer]) {
      assert.deepEqual(point(a.end, radius), point(b.start, radius));
    }
  }
  for (const invalid of [-1, 8, 1.2, NaN, Infinity, '0', undefined]) {
    assert.throws(() => tileGeometry(invalid), RangeError);
  }
});

test('both sides paint inner characters above their outer neighbors', async () => {
  const { ARC } = await model;
  const order = ARC.figureOrder;
  assert.ok(Array.isArray(order), 'Full-body overlays need an explicit resting stack order');
  assert.deepEqual([...order].sort((a, b) => a - b), Array.from({ length: 8 }, (_, i) => i));
  for (let outer = 0; outer < 3; outer++) {
    assert.ok(order.indexOf(outer + 1) > order.indexOf(outer), 'Left inner face must stay above the outer figure');
  }
  for (let outer = 7; outer > 4; outer--) {
    assert.ok(order.indexOf(outer - 1) > order.indexOf(outer), 'Right inner face must stay above the outer figure');
  }
});

test('Dock magnification is bounded, distance-based and absent on the inactive half', async () => {
  const { magnification } = await model;
  near(magnification(0), 1.28, 'Pointer at tile center');
  near(magnification(150), 1.16, 'Pointer halfway through radius');
  near(magnification(300), 1.04, 'Pointer at influence boundary');
  near(magnification(1200), 1.04, 'Distant active tile baseline');
  near(magnification(-50), 1.28, 'Negative distance clamp');
  let previous = Infinity;
  for (let distance = 0; distance <= 600; distance += 5) {
    const scale = magnification(distance);
    assert.ok(scale >= 1.04 && scale <= 1.28);
    assert.ok(scale <= previous, 'Magnification must decrease continuously with distance');
    assert.equal(magnification(distance, false), 1, 'Inactive half must not magnify');
    previous = scale;
  }
});

test('all eight real homepage links resolve to the intended Work or Life anchor', async () => {
  const { HOME_TILES } = await moduleAt('home.js');
  const { parseRoute } = await routes;
  const expected = [
    ['real-estate', 'work', 'real-estate'],
    ['sales-marketing', 'work', 'sales-marketing'],
    ['data-analytics', 'work', 'data-analytics'],
    ['education', 'work', 'education'],
    ['coffee', 'life', 'coffee'],
    ['cooking', 'life', 'cooking'],
    ['photography', 'life', 'photography'],
    ['travel', 'life', 'travel'],
  ];
  assert.equal(HOME_TILES.length, expected.length);
  HOME_TILES.forEach((tile, i) => {
    assert.equal(tile.name, expected[i][0]);
    assert.deepEqual(parseRoute(tile.href), { page: expected[i][1], anchor: expected[i][2], collection: false });
  });
});

test('hash routing retains legacy page aliases and separates the Travel collection', async () => {
  const { parseRoute, routeKey } = await routes;
  for (const prefix of ['#work', '#/work', '#professional']) {
    assert.deepEqual(parseRoute(`${prefix}/education`), { page: 'work', anchor: 'education', collection: false });
  }
  assert.deepEqual(parseRoute('#professional/work/sunlight'), { page: 'work', anchor: 'experience', collection: false });
  assert.deepEqual(parseRoute('#personal/travel'), { page: 'life', anchor: 'travel', collection: false });
  const collection = parseRoute('#life/travel/collection');
  assert.deepEqual(collection, { page: 'life', anchor: 'travel', collection: true });
  assert.notEqual(routeKey(collection), routeKey(parseRoute('#life/travel')));
  assert.equal(routeKey(parseRoute('#work/education')), routeKey(parseRoute('#work/projects')), 'Section links should not rebuild their shared page');
});

test('unknown, malformed and query-like hashes never expose an unapproved anchor', async () => {
  const { parseRoute } = await routes;
  for (const hash of ['', '#home', '#missing', '#https://example.com', '#%E0%A4%A', null, undefined]) {
    assert.deepEqual(parseRoute(hash), { page: 'home', anchor: '', collection: false });
  }
  for (const hash of ['#work/education?x=1', '#work/%E0%A4%A', '#work/<script>', '#work/../../outside']) {
    assert.deepEqual(parseRoute(hash), { page: 'work', anchor: '', collection: false });
  }
  assert.deepEqual(parseRoute('#life/travel/collection?preview=1'), { page: 'life', anchor: 'travel', collection: false });
});

function runMode(storage) {
  const document = { documentElement: { dataset: {} } };
  vm.runInNewContext(fs.readFileSync(file('components/mode.js'), 'utf8'), { document, localStorage: storage });
  return document.documentElement.dataset.mode;
}

test('the synchronous prepaint bootstrap honors only saved light/dark mode values', () => {
  for (const value of ['light', 'dark']) {
    assert.equal(runMode({ getItem(key) { assert.equal(key, 'yj-mode'); return value; } }), value);
  }
  for (const invalid of [null, undefined, '', 'Light', 'auto', 'undefined', '{}']) {
    assert.equal(runMode({ getItem: () => invalid }), 'dark');
  }
  assert.equal(runMode({ getItem() { throw new Error('Storage denied'); } }), 'dark');
});

test('mode bootstrap is parser-blocking and precedes the first stylesheet', () => {
  const html = fs.readFileSync(file('index.html'), 'utf8');
  const bootstrap = html.match(/<script\b[^>]*src="components\/mode\.js[^">]*"[^>]*>/);
  assert.ok(bootstrap, 'Prepaint bootstrap must be loaded');
  assert.doesNotMatch(bootstrap[0], /\b(?:async|defer)\b|type\s*=\s*["']module["']/i);
  assert.ok(bootstrap.index < html.search(/<link\b[^>]*rel="stylesheet"/), 'Theme must be resolved before styled content paints');
});
