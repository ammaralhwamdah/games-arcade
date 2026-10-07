/* Tank Blitz - Phaser 3 tank battle for PlayKrux */
(function () {
  "use strict";

  var CELL = 32, GRID = 20, FIELD = CELL * GRID;
  var EMPTY = 0, BRICK = 1, STEEL = 2, WATER = 3, TREE = 4, BASE = 5;

  // Artwork: Kenney "Top-down Tanks Remastered" (CC0) - see assets/kenney-license-cc0.txt
  var TEX = {
    ground: "ground.png",
    "tile-brick": "tile-brick.png",
    "tile-steel": "tile-steel.png",
    "tile-water": "tile-water.png",
    "tile-tree": "tile-tree.png",
    base: "base.png",
    "base-broken": "base-broken.png",
    "tank-player": "tank-player.png",
    "tank-enemy-basic": "tank-enemy-basic.png",
    "tank-enemy-fast": "tank-enemy-fast.png",
    "tank-enemy-heavy": "tank-enemy-heavy.png",
    "tank-enemy-power": "tank-enemy-power.png",
    bullet: "bullet.png",
    "bullet-enemy": "bullet-enemy.png"
  };
  var BOOM = ["boom1", "boom2", "boom3", "boom4", "boom5"];

  var DIRS = {
    up: { x: 0, y: -1, a: 0 },
    right: { x: 1, y: 0, a: 90 },
    down: { x: 0, y: 1, a: 180 },
    left: { x: -1, y: 0, a: 270 }
  };
  var DK = ["up", "right", "down", "left"];

  var TYPES = {
    basic: { tex: "tank-enemy-basic", hp: 1, speed: 74, score: 100, cool: 1500, bs: 235 },
    fast: { tex: "tank-enemy-fast", hp: 1, speed: 122, score: 200, cool: 1050, bs: 265 },
    heavy: { tex: "tank-enemy-heavy", hp: 3, speed: 58, score: 300, cool: 1800, bs: 225 },
    power: { tex: "tank-enemy-power", hp: 1, speed: 104, score: 400, cool: 1300, bs: 250 }
  };

  var POWERS = ["shield", "rapid", "bomb", "life", "star"];
  var STAGES = [
    {
      name: "OUTPOST",
      bricks: [[2, 2, 4, 1], [2, 4, 1, 3], [7, 4, 1, 3], [2, 9, 4, 1], [5, 6, 2, 1], [2, 12, 1, 3], [7, 12, 1, 3], [2, 16, 4, 1]],
      steel: [[9, 3, 2, 1], [9, 8, 2, 2], [3, 14, 3, 1]],
      water: [[6, 10, 2, 1]],
      trees: [[4, 7, 2, 2], [4, 15, 2, 2]]
    },
    {
      name: "RIVER CROSSING",
      bricks: [[2, 2, 1, 5], [2, 8, 5, 1], [6, 3, 3, 1], [2, 13, 3, 1], [7, 15, 2, 1], [2, 17, 5, 1]],
      steel: [[9, 6, 2, 2], [3, 10, 1, 2], [5, 13, 2, 2]],
      water: [[1, 11, 8, 1]],
      trees: [[3, 5, 2, 2], [4, 18, 2, 1]]
    },
    {
      name: "IRON WORKS",
      bricks: [[2, 3, 6, 1], [2, 5, 1, 4], [2, 11, 6, 1], [3, 13, 3, 1], [2, 16, 4, 1], [6, 18, 3, 1]],
      steel: [[8, 4, 4, 1], [5, 7, 2, 2], [9, 14, 2, 2], [3, 19, 2, 1]],
      water: [[6, 9, 1, 4]],
      trees: [[2, 16, 2, 1], [5, 15, 2, 2]]
    }
  ];

  var SPAWNS = [{ x: 0, y: 0 }, { x: 9, y: 0 }, { x: 19, y: 0 }];
  var PSPAWN = { x: 9, y: 18 }, BASE_CELL = { x: 9, y: 19 };

  var Sfx = {
    ctx: null, on: true,
    boot: function () {
      if (this.ctx) return;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      try { this.ctx = new AC(); } catch (e) { this.ctx = null; }
    },
    tone: function (f1, f2, dur, type, vol) {
      if (!this.on || !this.ctx) return;
      try {
        var t = this.ctx.currentTime;
        var o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.connect(g); g.connect(this.ctx.destination);
        o.type = type || "square";
        o.frequency.setValueAtTime(f1, t);
        o.frequency.exponentialRampToValueAtTime(Math.max(1, f2), t + dur);
        g.gain.setValueAtTime(vol || 0.07, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.start(t); o.stop(t + dur);
      } catch (e) {}
    },
    shoot: function () { this.tone(760, 180, 0.09, "square", 0.06); },
    eshoot: function () { this.tone(300, 120, 0.1, "sawtooth", 0.04); },
    brick: function () { this.tone(220, 90, 0.07, "triangle", 0.05); },
    boom: function () { this.tone(200, 30, 0.35, "sawtooth", 0.1); this.tone(90, 25, 0.4, "square", 0.05); },
    bigBoom: function () { this.tone(150, 20, 0.55, "sawtooth", 0.13); },
    power: function () { this.tone(520, 1300, 0.18, "sine", 0.08); },
    die: function () { this.tone(420, 60, 0.6, "square", 0.09); },
    over: function () { this.tone(300, 60, 0.9, "sawtooth", 0.11); }
  };

// ------------------------------------------------------------ helpers
  function cx(c) { return c * CELL + CELL / 2; }
  function colOf(v) { return Math.floor(v / CELL); }
  function solid(t) { return t === BRICK || t === STEEL || t === WATER || t === BASE; }
  function fit(img, maxPx) {
    var m = maxPx || CELL * 0.94;
    img.setScale(Math.min(m / img.width, m / img.height));
    return img;
  }

  var Battle = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function BattleScene() { Phaser.Scene.call(this, { key: "battle" }); },

    preload: function () {
      var k, i;
      window.__preloadRan = (window.__preloadRan || 0) + 1;
      for (k in TEX) this.load.image(k, "assets/" + TEX[k]);
      for (i = 0; i < BOOM.length; i++) this.load.image(BOOM[i], "assets/boom" + (i + 1) + ".png");
      for (i = 0; i < POWERS.length; i++) this.load.image("power-" + POWERS[i], "assets/power-" + POWERS[i] + ".png");
    },

    create: function () {
      this.state = "ready";
      this.paused = false;
      this.score = 0; this.wave = 0; this.lives = 3;
      this.star = 0; this.rapidT = 0; this.shieldT = 0;
      this.respawnT = 0;
      this.tanks = []; this.bullets = []; this.pickups = []; this.fx = [];
      this.player = null; this.baseOk = true;
      this.waveState = "idle"; this.waveTimer = 0;
      this.pending = []; this.spawnTimer = 0; this.respawnT = 0;

      this.bg = this.add.tileSprite(0, 0, FIELD, FIELD, "ground").setOrigin(0).setDepth(0);
      this.bg.setTileScale(1);

      this.buildStage(0);
      this.spawnPlayer(true);

      var kb = this.input.keyboard;
      this.keys = kb.addKeys({
        up: "UP", down: "DOWN", left: "LEFT", right: "RIGHT",
        w: "W", a: "A", s: "S", d: "D", fire: "SPACE", p: "P", m: "M"
      });
      kb.addCapture("SPACE,UP,DOWN,LEFT,RIGHT,W,A,S,D,P,M");
      kb.on("keydown-P", function () { api.togglePause(); });
      kb.on("keydown-M", function () { api.toggleSound(); });

      this.events.once("shutdown", function () {
        window.removeEventListener("resize", this.layout, this);
      }, this);
      window.addEventListener("resize", this.layout, this);
      this.layout();
    },

    layout: function () {
      var w = window.innerWidth, h = window.innerHeight;
      var s = Math.max(0.4, Math.min((w - 12) / FIELD, (h - 92) / FIELD));
      if (s > 2) s = 2;
      this.scale.setZoom(s);
      var cv = this.game.canvas;
      cv.style.position = "absolute";
      cv.style.left = Math.max(0, Math.round((w - FIELD * s) / 2)) + "px";
      cv.style.top = Math.max(0, Math.round((h - FIELD * s) / 2)) + "px";
    },

// ---------------------------------------------------------- terrain
    put: function (c, r, type) {
      if (c < 0 || r < 0 || c >= GRID || r >= GRID) return;
      this.grid[r * GRID + c] = type;
      var tex = type === BRICK ? "tile-brick" : type === STEEL ? "tile-steel"
        : type === WATER ? "tile-water" : type === TREE ? "tile-tree"
          : type === BASE ? (this.baseOk ? "base" : "base-broken") : null;
      var ex = this.tileSprites[r * GRID + c];
      if (!tex) { if (ex) { ex.destroy(); this.tileSprites[r * GRID + c] = null; } return; }
      if (!ex) {
        ex = this.add.image(c * CELL + CELL / 2, r * CELL + CELL / 2, tex);
        this.tileSprites[r * GRID + c] = ex;
      } else {
        ex.setTexture(tex);
      }
      ex.setDepth(type === TREE ? 8 : 1);
      ex.clearTint();
      if (type === WATER) ex.setTint(0x3f83c5);
      fit(ex, CELL * 0.99);
    },

    buildStage: function (idx) {
      var i;
      if (this.tileSprites) {
        for (i = 0; i < this.tileSprites.length; i++) {
          if (this.tileSprites[i]) this.tileSprites[i].destroy();
        }
      }
      this.grid = [];
      this.tileSprites = [];
      for (var i = 0; i < GRID * GRID; i++) { this.grid.push(EMPTY); this.tileSprites.push(null); }
      var st = STAGES[idx % STAGES.length];
      this.stageName = st.name;

      for (var r = 0; r < GRID; r++) {
        for (var c = 0; c < GRID; c++) {
          if (c === 0 || r === 0 || c === GRID - 1 || r === GRID - 1) this.put(c, r, STEEL);
        }
      }
      var self = this;
      function block(rects, type) {
        (rects || []).forEach(function (rc) {
          var x = rc[0], y = rc[1], w = rc[2], h = rc[3], i, j;
          for (j = 0; j < h; j++) for (i = 0; i < w; i++) self.put(x + i, y + j, type);
          var mx = GRID - x - w;
          if (mx !== x) for (j = 0; j < h; j++) for (i = 0; i < w; i++) self.put(mx + i, y + j, type);
        });
      }
      block(st.steel, STEEL);
      block(st.bricks, BRICK);
      block(st.water, WATER);
      block(st.trees, TREE);

      // clear spawn pads and base yard
      SPAWNS.forEach(function (s) {
        self.put(s.x, s.y, EMPTY);
        self.put(s.x + (s.x === 0 ? 1 : s.x === 9 ? -1 : -1), s.y, EMPTY);
        self.put(s.x, s.y + 1, EMPTY);
      });
      for (var rr = 17; rr <= 19; rr++) for (var cc = 8; cc <= 10; cc++) self.put(cc, rr, EMPTY);
      this.put(BASE_CELL.x, BASE_CELL.y, BASE);
      this.baseOk = true;
    },

// ------------------------------------------------------------ tanks
    makeTank: function (tex, x, y, angle) {
      var s = this.add.image(x, y, tex).setDepth(5).setAngle(angle);
      fit(s, CELL * 0.86);
      s.hw = Math.max(9, Math.round((s.width * s.scaleX) / 2 - 2));
      s.hh = Math.max(9, Math.round((s.height * s.scaleY) / 2 - 2));
      s.dir = "up";
      return s;
    },

    setDir: function (t, d) {
      t.dir = d;
      t.setAngle(DIRS[d].a);
    },

    spawnPlayer: function (fresh) {
      var p = this.makeTank("tank-player", cx(PSPAWN.x), cx(PSPAWN.y), 0);
      p.isPlayer = true; p.hp = 1; p.cool = 0; p.spawnT = 42;
      p.invuln = fresh ? 90 : 150;
      this.player = p;
      this.tanks.push(p);
      if (!fresh) this.hud();
      return p;
    },

    spawnEnemy: function (key) {
      var slot = SPAWNS[Math.floor(Math.random() * SPAWNS.length)];
      for (var tries = 0; tries < SPAWNS.length; tries++) {
        var ok = true;
        for (var i = 0; i < this.tanks.length; i++) {
          var t = this.tanks[i];
          if (Math.abs(t.x - cx(slot.x)) < 34 && Math.abs(t.y - cx(slot.y)) < 34) { ok = false; break; }
        }
        if (ok) break;
        slot = SPAWNS[(SPAWNS.indexOf(slot) + 1) % SPAWNS.length];
      }
      var d = TYPES[key];
      var e = this.makeTank(d.tex, cx(slot.x), cx(slot.y), 180);
      e.typeKey = key; e.cfg = d; e.hp = d.hp; e.isPlayer = false;
      e.cool = 700 + Math.random() * 900; e.think = Math.random() * 600;
      e.spawnT = 40; e.targetBase = Math.random() < 0.45;
      this.tanks.push(e);
      return e;
    },

    free: function (x, y) {
      var c = colOf(x), r = colOf(y);
      if (c < 0 || r < 0 || c >= GRID || r >= GRID) return false;
      if (solid(this.grid[r * GRID + c])) return false;
      for (var i = 0; i < this.tanks.length; i++) {
        var t = this.tanks[i];
        if (t.spawnT > 0) continue;
        if (Math.abs(t.x - x) < t.hw + 16 && Math.abs(t.y - y) < t.hh + 16) return false;
      }
      return true;
    },

    step: function (t, dir, dist) {
      var v = DIRS[dir], nx = t.x, ny = t.y, i;
      if (v.x) {
        nx += v.x * dist;
        var hx = nx + v.x * (t.hw - 1), hy = t.y;
        if (this.free(hx, hy) && this.free(hx, hy - t.hh + 4) && this.free(hx, hy + t.hh - 4)) t.x = nx;
      } else {
        ny += v.y * dist;
        var vx = t.x, vy = ny + v.y * (t.hh - 1);
        if (this.free(vx, vy) && this.free(vx - t.hw + 4, vy) && this.free(vx + t.hw - 4, vy)) t.y = ny;
      }
      var mx = t.hw, my = t.hh;
      if (t.x < mx) t.x = mx;
      if (t.x > FIELD - mx) t.x = FIELD - mx;
      if (t.y < my) t.y = my;
      if (t.y > FIELD - my) t.y = FIELD - my;
      return Math.abs(nx - t.x) + Math.abs(ny - t.y) > 0.01;
    },

// ---------------------------------------------------------- shooting
    bulletSpeed: function (t) {
      if (t.isPlayer) return 300 + this.star * 55;
      return t.cfg.bs;
    },

    maxBullets: function (t) {
      if (!t.isPlayer) return 1;
      return 1 + this.star;
    },

    fire: function (t) {
      var mine = 0, i;
      for (i = 0; i < this.bullets.length; i++) if (this.bullets[i].owner === t) mine++;
      if (mine >= this.maxBullets(t) || t.cool > 0) return;
      var d = DIRS[t.dir];
      var sp = this.add.image(t.x + d.x * 20, t.y + d.y * 20, t.isPlayer ? "bullet" : "bullet-enemy")
        .setDepth(6).setAngle(DIRS[t.dir].a);
      fit(sp, CELL * 0.62);
      sp.dx = d.x; sp.dy = d.y; sp.speed = this.bulletSpeed(t);
      sp.owner = t; sp.life = 2600; sp.pow = t.isPlayer && this.star >= 3;
      this.bullets.push(sp);
      t.cool = t.isPlayer ? (this.rapidT > 0 ? 190 : 340) : t.cfg.cool;
      if (t.isPlayer) Sfx.shoot(); else Sfx.eshoot();
      this.recoil(sp);
    },

    recoil: function (sp) {
      var o = sp.owner, d = DIRS[o.dir];
      this.tweens.add({
        targets: o, x: o.x - d.x * 2.5, y: o.y - d.y * 2.5, duration: 55,
        yoyo: true, ease: "Quad.easeOut"
      });
    },

    boom: function (x, y, big) {
      var steps = big ? BOOM.length : 4;
      var self = this;
      var target = big ? CELL * 1.7 : CELL * 1.05;
      var img = this.add.image(x, y, BOOM[0]).setDepth(7);
      img.setScale((target * 0.4) / img.width);
      this.tweens.add({
        targets: img,
        scaleX: target / img.width,
        scaleY: target / img.height,
        duration: big ? 430 : 260,
        ease: "Quad.easeOut",
        onComplete: function () { img.destroy(); }
      });
      for (var i = 1; i < steps; i++) {
        (function (k) {
          self.time.delayedCall(k * (big ? 70 : 55), function () {
            if (img.active) img.setTexture(BOOM[k]);
          });
        })(i);
      }
      this.fx.push({ o: img, t: big ? 520 : 340, big: big });
      if (big) Sfx.bigBoom(); else Sfx.boom();
      if (!big) return;
      for (var j = 0; j < 10; j++) {
        var an = Math.random() * Math.PI * 2, sp = 50 + Math.random() * 110;
        var p = this.add.circle(x, y, 2 + Math.random() * 3, 0xffffff, 0.9).setDepth(7);
        this.tweens.add({
          targets: p, x: x + Math.cos(an) * sp, y: y + Math.sin(an) * sp,
          alpha: 0, duration: 380 + Math.random() * 220, onComplete: function () { this.destroy(); }.bind(p)
        });
      }
    },

    killTank: function (t, byPlayer) {
      var i = this.tanks.indexOf(t);
      if (i < 0) return;
      this.tanks.splice(i, 1);
      var big = t.isPlayer || (t.cfg && t.cfg.hp > 1);
      this.boom(t.x, t.y, big);
      t.destroy();
      if (t.isPlayer) {
        this.player = null;
        this.lives--;
        this.hud();
        if (this.lives <= 0) this.endGame(false);
        else this.respawnT = 110;
      } else {
        this.score += t.cfg.score;
        if (t.typeKey === "power") this.dropPower(t.x, t.y);
        this.hud();
      }
    },

    dropPower: function (x, y) {
      var kind = POWERS[Math.floor(Math.random() * POWERS.length)];
      var s = this.add.image(x, y, "power-" + kind).setDepth(4);
      fit(s, CELL * 0.7);
      s.kind = kind; s.life = 15000;
      this.pickups.push(s);
      this.tweens.add({ targets: s, scale: 1.12, duration: 320, yoyo: true, repeat: -1 });
    },

    takePower: function (s) {
      var self = this;
      Sfx.power();
      if (s.kind === "shield") {
        this.shieldT = 14000;
        if (this.player) this.player.invuln = Math.max(this.player.invuln || 0, 260);
      }
      else if (s.kind === "rapid") this.rapidT = 13000;
      else if (s.kind === "bomb") {
        this.boom(cx(BASE_CELL.x), cx(BASE_CELL.y), true);
        this.tanks.slice().forEach(function (t) { if (!t.isPlayer && t.spawnT <= 0) self.killTank(t, true); });
      } else if (s.kind === "life") this.lives = Math.min(5, this.lives + 1);
      else if (s.kind === "star") this.star = Math.min(3, this.star + 1);
      this.hud();
      this.boom(s.x, s.y, false);
      s.destroy();
    },

// ------------------------------------------------------------ update
    update: function (time, delta) {
      var dt = Math.min(delta, 50) / 16.667;
      var i, t;

      for (i = this.fx.length - 1; i >= 0; i--) {
        this.fx[i].t -= delta;
        if (this.fx[i].t <= 0) { this.fx[i].o.destroy(); this.fx.splice(i, 1); }
      }

      if (this.paused || this.state !== "play") { this.drawInput(); return; }

      if (this.shieldT > 0) {
        this.shieldT -= delta;
        if (this.player && this.player.spawnT <= 0) {
          this.player.invuln = Math.max(this.player.invuln || 0, 2);
          this.player.setTint(0x7dd3fc);
        }
        if (this.shieldT <= 0 && this.player) this.player.clearTint();
      }
      if (this.rapidT > 0) {
        this.rapidT -= delta;
        if (this.rapidT <= 0) this.hud();
      }

      this.thinkPlayer(dt);
      this.thinkEnemies(dt, time);
      this.moveBullets(dt);

      for (i = this.pickups.length - 1; i >= 0; i--) {
        var s = this.pickups[i];
        s.life -= delta;
        if (s.life <= 0) { s.destroy(); this.pickups.splice(i, 1); continue; }
        if (s.life < 3000 && Math.floor(s.life / 160) % 2 === 0) s.setAlpha(0.35);
        else s.setAlpha(1);
        if (this.player && this.player.spawnT <= 0 &&
          Math.abs(this.player.x - s.x) < 26 && Math.abs(this.player.y - s.y) < 26) {
          this.takePower(s);
          this.pickups.splice(i, 1);
        }
      }

      if (this.respawnT > 0) {
        this.respawnT -= delta / 16.667;
        if (this.respawnT <= 0 && this.lives > 0) this.spawnPlayer(false);
      }

      this.runWave(delta);
      this.drawInput();
    },

    drawInput: function () {
      var k = this.keys, i = api.input;
      this.inUp = k.up.isDown || k.w.isDown || i.up;
      this.inDown = k.down.isDown || k.s.isDown || i.down;
      this.inLeft = k.left.isDown || k.a.isDown || i.left;
      this.inRight = k.right.isDown || k.d.isDown || i.right;
      this.inFire = k.fire.isDown || i.fire;
    },

    thinkPlayer: function (dt) {
      var p = this.player;
      if (!p || p.spawnT > 0) return;
      if (this.inUp) this.setDir(p, "up");
      else if (this.inDown) this.setDir(p, "down");
      else if (this.inLeft) this.setDir(p, "left");
      else if (this.inRight) this.setDir(p, "right");

      var moved = this.step(p, p.dir, 108 * dt);
      if (moved) {
        var c = cx(colOf(p.x)), r = cx(colOf(p.y));
        if (p.dir === "left" || p.dir === "right") {
          if (Math.abs(p.y - r) < 10 && this.free(p.x, r)) this.tweens.add({ targets: p, y: r, duration: 70 });
        } else if (Math.abs(p.x - c) < 10 && this.free(c, p.y)) {
          this.tweens.add({ targets: p, x: c, duration: 70 });
        }
      }
      if (p.cool > 0) p.cool -= dt;
      if (this.inFire) this.fire(p);
      if (p.invuln > 0) {
        p.invuln -= dt;
        if (this.shieldT <= 0) {
          p.setAlpha(Math.floor(p.invuln / 3) % 2 === 0 ? 0.35 : 1);
          if (p.invuln <= 0) p.setAlpha(1);
        }
      }
    },

// -------------------------------------------------------- enemy brain
    thinkEnemies: function (dt, time) {
      for (var i = 0; i < this.tanks.length; i++) {
        var e = this.tanks[i];
        if (e.isPlayer) continue;
        if (e.spawnT > 0) {
          e.spawnT -= dt;
          e.setAlpha(Math.floor(e.spawnT / 3) % 2 === 0 ? 0.3 : 1);
          if (e.spawnT <= 0) e.setAlpha(1);
          continue;
        }
        if (e.typeKey === "power") {
          e.setAlpha(Math.floor(time / 90) % 2 === 0 ? 1 : 0.45);
        }

        var p = this.player;
        var tx = p && p.spawnT <= 0 ? p.x : cx(BASE_CELL.x);
        var ty = p && p.spawnT <= 0 ? p.y : cx(BASE_CELL.y);
        if (e.typeKey === "power" && p) { tx = p.x; ty = p.y; }

        e.think -= dt * 10;
        if (e.think <= 0) {
          e.think = 220 + Math.random() * 260;
          e.targetBase = Math.random() < (e.typeKey === "power" ? 0.05 : 0.45);
          if (e.targetBase) { tx = cx(BASE_CELL.x); ty = cx(BASE_CELL.y); }
          var d = this.pickDir(e, tx, ty);
          if (d) this.setDir(e, d);
        }

        var moved = this.step(e, e.dir, e.cfg.speed * dt * (1 + Math.min(this.wave, 12) * 0.015));
        if (!moved) {
          var alt = this.pickDir(e, tx, ty, true);
          this.setDir(e, alt || DK[(DK.indexOf(e.dir) + 1 + Math.floor(Math.random() * 3)) % 4]);
        }

        if (e.cool > 0) e.cool -= dt;
        else {
          var aligned = Math.abs(e.x - tx) < 24 || Math.abs(e.y - ty) < 24;
          if (aligned || Math.random() < 0.35) {
            var d2 = this.pickDir(e, tx, ty);
            if (d2) this.setDir(e, d2);
            this.fire(e);
            if (e.cfg.hp > 1) e.cool = e.cfg.cool * 0.34;
          }
        }
      }
    },

    pickDir: function (e, tx, ty, avoidBack) {
      var dx = tx - e.x, dy = ty - e.y, opts = [], i;
      var horiz = Math.abs(dx) > Math.abs(dy) * 0.7;
      var vert = Math.abs(dy) > Math.abs(dx) * 0.7;
      if (horiz) opts.push(dx > 0 ? "right" : "left");
      if (vert) opts.push(dy > 0 ? "down" : "up");
      while (opts.length < 2) {
        var r = DK[Math.floor(Math.random() * 4)];
        if (opts.indexOf(r) < 0) opts.push(r);
      }
      for (i = 0; i < opts.length; i++) {
        var d = opts[i];
        if (avoidBack && d === e.dir) continue;
        var v = DIRS[d];
        if (this.free(e.x + v.x * 34, e.y + v.y * 34)) return d;
      }
      return null;
    },

// ---------------------------------------------------------- bullet step
    moveBullets: function (dt) {
      for (var i = this.bullets.length - 1; i >= 0; i--) {
        var b = this.bullets[i];
        b.life -= dt * 16;
        var steps = 4, s;
        var adv = (b.speed / 60) * dt;
        for (s = 0; s < steps; s++) {
          var nx = b.x + (b.dx * adv) / steps;
          var ny = b.y + (b.dy * adv) / steps;
          var hx = nx + b.dx * 5, hy = ny + b.dy * 5;

          if (hx < 2 || hy < 2 || hx > FIELD - 2 || hy > FIELD - 2) { this.popBullet(i); break; }

          var c = colOf(hx), r = colOf(hy);
          var tile = this.grid[r * GRID + c];
          if (tile === BRICK) { this.put(c, r, EMPTY); Sfx.brick(); this.popBullet(i); break; }
          if (tile === WATER || tile === TREE) { this.popBullet(i); break; }
          if (tile === STEEL) {
            if (b.pow) { this.put(c, r, EMPTY); Sfx.brick(); }
            this.popBullet(i);
            break;
          }
          if (tile === BASE && !b.owner.isPlayer) {
            this.put(c, r, EMPTY);
            this.baseOk = false;
            this.baseSpriteBoom();
            this.popBullet(i);
            break;
          }

          var hit = null;
          for (var j = 0; j < this.tanks.length; j++) {
            var t = this.tanks[j];
            if (t === b.owner || t.spawnT > 0) continue;
            if (t.invuln > 0) continue;
            if (t.isPlayer && this.shieldT > 0) continue;
            if (Math.abs(t.x - hx) < t.hw && Math.abs(t.y - hy) < t.hh) { hit = t; break; }
          }
          if (hit) {
            var byPlayer = b.owner.isPlayer;
            hit.hp -= 1;
            this.boom(hx, hy, false);
            if (hit.hp <= 0) this.killTank(hit, byPlayer);
            this.popBullet(i);
            break;
          }

          var gone = false;
          for (var k = 0; k < this.bullets.length; k++) {
            var o = this.bullets[k];
            if (o === b || o.owner === b.owner) continue;
            if (Math.abs(o.x - hx) < 7 && Math.abs(o.y - hy) < 7) {
              this.popBullet(k);
              gone = true;
              break;
            }
          }
          if (gone || this.bullets.indexOf(b) < 0) { this.popBullet(i); break; }
          b.x = nx; b.y = ny;
        }
        if (b.life <= 0 && this.bullets.indexOf(b) >= 0) this.popBullet(i);
      }
    },

    popBullet: function (i) {
      var b = this.bullets[i];
      if (!b) return;
      this.bullets.splice(i, 1);
      b.destroy();
    },

    baseSpriteBoom: function () {
      this.boom(cx(BASE_CELL.x), cx(BASE_CELL.y), true);
      this.endGame(false);
    },

// ------------------------------------------------------------ waves
    waveComp: function (w) {
      var out = [], i;
      var total = Math.min(4 + Math.floor(w / 2), 10);
      for (i = 0; i < total; i++) {
        var r = Math.random();
        if (w >= 6 && r < 0.14) out.push("power");
        else if (w >= 4 && r < 0.32) out.push("heavy");
        else if (w >= 2 && r < 0.62) out.push("fast");
        else out.push("basic");
      }
      if (w >= 8 && w % 4 === 0) { for (i = 0; i < 3; i++) out.push("heavy"); }
      return out;
    },

    runWave: function (delta) {
      if (this.waveState === "idle") {
        this.waveTimer -= delta;
        if (this.waveTimer <= 0) this.nextWave();
        return;
      }
      var alive = 0, i;
      for (i = 0; i < this.tanks.length; i++) if (!this.tanks[i].isPlayer) alive++;
      if (this.waveState === "spawning") {
        this.spawnTimer -= delta;
        if (this.spawnTimer <= 0 && this.pending.length && alive < this.maxAlive()) {
          this.spawnEnemy(this.pending.shift());
          this.spawnTimer = 780;
          this.hud();
        }
        if (!this.pending.length) this.waveState = "fighting";
        return;
      }
      if (this.waveState === "fighting") {
        if (alive === 0 && !this.pending.length) {
          this.waveState = "clear";
          this.waveTimer = 1500;
          this.score += 250 * this.wave;
          this.hud();
        }
      } else if (this.waveState === "clear") {
        this.waveTimer -= delta;
        if (this.waveTimer <= 0) {
          var idx = (this.wave - 1) % STAGES.length;
          this.buildStage(idx);
          this.boom(cx(BASE_CELL.x), cx(BASE_CELL.y), true);
          this.nextWave();
        }
      }
    },

    maxAlive: function () {
      return Math.min(4 + Math.floor(this.wave / 3), 7);
    },

    nextWave: function () {
      this.wave++;
      this.waveState = "spawning";
      this.pending = this.waveComp(this.wave);
      this.spawnTimer = 400;
      this.hud();
    },

    hud: function () {
      var left = 0, i;
      for (i = 0; i < this.tanks.length; i++) if (!this.tanks[i].isPlayer) left++;
      left += this.pending ? this.pending.length : 0;
      var set = function (id, v) { var el = document.getElementById(id); if (el) el.textContent = v; };
      set("uiScore", this.score);
      set("uiWave", this.wave);
      set("uiLeft", left);
      set("uiLives", Math.max(0, this.lives));
      var pw = document.getElementById("pow");
      if (!pw) return;
      var html = "";
      if (this.shieldT > 0) html += '<span class="pw shield">SHIELD ' + Math.ceil(this.shieldT / 1000) + "s</span>";
      if (this.rapidT > 0) html += '<span class="pw rapid">RAPID ' + Math.ceil(this.rapidT / 1000) + "s</span>";
      if (this.star > 0) html += '<span class="pw star">CANNON ' + this.star + "</span>";
      pw.innerHTML = html;
    },

    endGame: function (won) {
      if (this.state !== "play") return;
      this.state = "over";
      Sfx.over();
      this.hud();
      if (api.onGameOver) api.onGameOver(this.score, this.wave, won);
    },

    reset: function () {
      var i;
      for (i = 0; i < this.tanks.length; i++) this.tanks[i].destroy();
      for (i = 0; i < this.bullets.length; i++) this.bullets[i].destroy();
      for (i = 0; i < this.pickups.length; i++) this.pickups[i].destroy();
      for (i = 0; i < this.fx.length; i++) this.fx[i].o.destroy();
      this.tweens.killAll();
      this.time.removeAllEvents();
      this.tanks = []; this.bullets = []; this.pickups = []; this.fx = [];
      this.player = null;
      api.input.up = api.input.down = api.input.left = api.input.right = api.input.fire = false;
      this.score = 0; this.wave = 0; this.lives = 3; this.star = 0;
      this.rapidT = 0; this.shieldT = 0; this.respawnT = 0;
      this.waveState = "idle"; this.waveTimer = 900; this.pending = [];
      this.buildStage(0);
      this.spawnPlayer(true);
      this.state = "play";
      this.hud();
    }
  });

// ------------------------------------------------------------ boot
  var scene = null;
  var booted = false;
  var api = {
    input: { up: false, down: false, left: false, right: false, fire: false },
    onGameOver: null,
    onPauseChange: null,
    isReady: function () { return booted; },
    start: function () {
      if (!booted || !scene) return;
      Sfx.boot();
      if (Sfx.ctx && Sfx.ctx.state === "suspended") Sfx.ctx.resume();
      scene.reset();
    },
    setPaused: function (v) { if (scene) scene.paused = v; },
    isPaused: function () { return scene ? !!scene.paused : false; },
    togglePause: function () {
      if (!scene || scene.state !== "play") return;
      scene.paused = !scene.paused;
      if (api.onPauseChange) api.onPauseChange(scene.paused);
    },
    toggleSound: function () {
      Sfx.on = !Sfx.on;
      return Sfx.on;
    }
  };

  function boot() {
    new Phaser.Game({
      type: Phaser.AUTO,
      parent: "stage",
      width: FIELD,
      height: FIELD,
      backgroundColor: "#0b0e14",
      pixelArt: false,
      roundPixels: true,
      antialias: true,
      scale: { mode: Phaser.Scale.NONE, autoCenter: Phaser.Scale.NO_CENTER },
      audio: { noAudio: true },
      scene: [Battle],
      callbacks: {
        postBoot: function (g) {
          scene = g.scene.getScene("battle");
          booted = true;
          if (api.onReady) api.onReady();
        }
      }
    });
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(boot, 0);
  } else {
    window.addEventListener("DOMContentLoaded", boot);
  }

  window.TankBlitz = api;
})();
