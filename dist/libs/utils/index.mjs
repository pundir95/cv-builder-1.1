const Ar = (a, t) => {
  for (const [e, s] of t.entries())
    for (const [i, n] of s.entries())
      for (const [r, o] of n.entries())
        if (o === a)
          return { page: e, column: i, section: r };
  return null;
}, Kl = (a, t) => {
  const e = Ar(a, t);
  return e && t[e.page][e.column].splice(e.section, 1), e;
}, zl = (a, t, e) => {
  try {
    const s = JSON.parse(JSON.stringify(e)), i = s[a.page][a.column][a.section];
    return s[a.page][a.column].splice(a.section, 1), s[t.page][t.column].splice(t.section, 0, i), s;
  } catch {
    return e;
  }
}, Gl = (a, t = 0) => {
  const e = Number.parseInt(a.slice(1, 3), 16), s = Number.parseInt(a.slice(3, 5), 16), i = Number.parseInt(a.slice(5, 7), 16);
  return t ? `rgba(${e}, ${s}, ${i}, ${t})` : `rgb(${e}, ${s}, ${i})`;
};
var X = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Qa(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
function Er(a) {
  if (a.__esModule) return a;
  var t = a.default;
  if (typeof t == "function") {
    var e = function s() {
      return this instanceof s ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    e.prototype = t.prototype;
  } else e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(a).forEach(function(s) {
    var i = Object.getOwnPropertyDescriptor(a, s);
    Object.defineProperty(e, s, i.get ? i : {
      enumerable: !0,
      get: function() {
        return a[s];
      }
    });
  }), e;
}
var zi = { exports: {} };
/* @license
Papa Parse
v5.5.2
https://github.com/mholt/PapaParse
License: MIT
*/
(function(a, t) {
  ((e, s) => {
    a.exports = s();
  })(X, function e() {
    var s = typeof self < "u" ? self : typeof window < "u" ? window : s !== void 0 ? s : {}, i, n = !s.document && !!s.postMessage, r = s.IS_PAPA_WORKER || !1, o = {}, c = 0, u = {};
    function d(p) {
      this._handle = null, this._finished = !1, this._completed = !1, this._halted = !1, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = !0, this._completeResults = { data: [], errors: [], meta: {} }, (function(v) {
        var w = G(v);
        w.chunkSize = parseInt(w.chunkSize), v.step || v.chunk || (w.chunkSize = null), this._handle = new F(w), (this._handle.streamer = this)._config = w;
      }).call(this, p), this.parseChunk = function(v, w) {
        var h = parseInt(this._config.skipFirstNLines) || 0;
        if (this.isFirstChunk && 0 < h) {
          let E = this._config.newline;
          E || (y = this._config.quoteChar || '"', E = this._handle.guessLineEndings(v, y)), v = [...v.split(E).slice(h)].join(E);
        }
        this.isFirstChunk && z(this._config.beforeFirstChunk) && (y = this._config.beforeFirstChunk(v)) !== void 0 && (v = y), this.isFirstChunk = !1, this._halted = !1;
        var h = this._partialLine + v, y = (this._partialLine = "", this._handle.parse(h, this._baseIndex, !this._finished));
        if (!this._handle.paused() && !this._handle.aborted()) {
          if (v = y.meta.cursor, h = (this._finished || (this._partialLine = h.substring(v - this._baseIndex), this._baseIndex = v), y && y.data && (this._rowCount += y.data.length), this._finished || this._config.preview && this._rowCount >= this._config.preview), r) s.postMessage({ results: y, workerId: u.WORKER_ID, finished: h });
          else if (z(this._config.chunk) && !w) {
            if (this._config.chunk(y, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = !0);
            this._completeResults = y = void 0;
          }
          return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(y.data), this._completeResults.errors = this._completeResults.errors.concat(y.errors), this._completeResults.meta = y.meta), this._completed || !h || !z(this._config.complete) || y && y.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = !0), h || y && y.meta.paused || this._nextChunk(), y;
        }
        this._halted = !0;
      }, this._sendError = function(v) {
        z(this._config.error) ? this._config.error(v) : r && this._config.error && s.postMessage({ workerId: u.WORKER_ID, error: v, finished: !1 });
      };
    }
    function _(p) {
      var v;
      (p = p || {}).chunkSize || (p.chunkSize = u.RemoteChunkSize), d.call(this, p), this._nextChunk = n ? function() {
        this._readChunk(), this._chunkLoaded();
      } : function() {
        this._readChunk();
      }, this.stream = function(w) {
        this._input = w, this._nextChunk();
      }, this._readChunk = function() {
        if (this._finished) this._chunkLoaded();
        else {
          if (v = new XMLHttpRequest(), this._config.withCredentials && (v.withCredentials = this._config.withCredentials), n || (v.onload = it(this._chunkLoaded, this), v.onerror = it(this._chunkError, this)), v.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !n), this._config.downloadRequestHeaders) {
            var w, h = this._config.downloadRequestHeaders;
            for (w in h) v.setRequestHeader(w, h[w]);
          }
          var y;
          this._config.chunkSize && (y = this._start + this._config.chunkSize - 1, v.setRequestHeader("Range", "bytes=" + this._start + "-" + y));
          try {
            v.send(this._config.downloadRequestBody);
          } catch (E) {
            this._chunkError(E.message);
          }
          n && v.status === 0 && this._chunkError();
        }
      }, this._chunkLoaded = function() {
        v.readyState === 4 && (v.status < 200 || 400 <= v.status ? this._chunkError() : (this._start += this._config.chunkSize || v.responseText.length, this._finished = !this._config.chunkSize || this._start >= ((w) => (w = w.getResponseHeader("Content-Range")) !== null ? parseInt(w.substring(w.lastIndexOf("/") + 1)) : -1)(v), this.parseChunk(v.responseText)));
      }, this._chunkError = function(w) {
        w = v.statusText || w, this._sendError(new Error(w));
      };
    }
    function l(p) {
      (p = p || {}).chunkSize || (p.chunkSize = u.LocalChunkSize), d.call(this, p);
      var v, w, h = typeof FileReader < "u";
      this.stream = function(y) {
        this._input = y, w = y.slice || y.webkitSlice || y.mozSlice, h ? ((v = new FileReader()).onload = it(this._chunkLoaded, this), v.onerror = it(this._chunkError, this)) : v = new FileReaderSync(), this._nextChunk();
      }, this._nextChunk = function() {
        this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
      }, this._readChunk = function() {
        var y = this._input, E = (this._config.chunkSize && (E = Math.min(this._start + this._config.chunkSize, this._input.size), y = w.call(y, this._start, E)), v.readAsText(y, this._config.encoding));
        h || this._chunkLoaded({ target: { result: E } });
      }, this._chunkLoaded = function(y) {
        this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(y.target.result);
      }, this._chunkError = function() {
        this._sendError(v.error);
      };
    }
    function f(p) {
      var v;
      d.call(this, p = p || {}), this.stream = function(w) {
        return v = w, this._nextChunk();
      }, this._nextChunk = function() {
        var w, h;
        if (!this._finished) return w = this._config.chunkSize, v = w ? (h = v.substring(0, w), v.substring(w)) : (h = v, ""), this._finished = !v, this.parseChunk(h);
      };
    }
    function N(p) {
      d.call(this, p = p || {});
      var v = [], w = !0, h = !1;
      this.pause = function() {
        d.prototype.pause.apply(this, arguments), this._input.pause();
      }, this.resume = function() {
        d.prototype.resume.apply(this, arguments), this._input.resume();
      }, this.stream = function(y) {
        this._input = y, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
      }, this._checkIsFinished = function() {
        h && v.length === 1 && (this._finished = !0);
      }, this._nextChunk = function() {
        this._checkIsFinished(), v.length ? this.parseChunk(v.shift()) : w = !0;
      }, this._streamData = it(function(y) {
        try {
          v.push(typeof y == "string" ? y : y.toString(this._config.encoding)), w && (w = !1, this._checkIsFinished(), this.parseChunk(v.shift()));
        } catch (E) {
          this._streamError(E);
        }
      }, this), this._streamError = it(function(y) {
        this._streamCleanUp(), this._sendError(y);
      }, this), this._streamEnd = it(function() {
        this._streamCleanUp(), h = !0, this._streamData("");
      }, this), this._streamCleanUp = it(function() {
        this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
      }, this);
    }
    function F(p) {
      var v, w, h, y, E = Math.pow(2, 53), A = -E, g = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, b = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/, m = this, x = 0, S = 0, M = !1, C = !1, T = [], j = { data: [], errors: [], meta: {} };
      function L(B) {
        return p.skipEmptyLines === "greedy" ? B.join("").trim() === "" : B.length === 1 && B[0].length === 0;
      }
      function Z() {
        if (j && h && (ct("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + u.DefaultDelimiter + "'"), h = !1), p.skipEmptyLines && (j.data = j.data.filter(function(V) {
          return !L(V);
        })), ot()) {
          let V = function(lt, pt) {
            z(p.transformHeader) && (lt = p.transformHeader(lt, pt)), T.push(lt);
          };
          if (j) if (Array.isArray(j.data[0])) {
            for (var B = 0; ot() && B < j.data.length; B++) j.data[B].forEach(V);
            j.data.splice(0, 1);
          } else j.data.forEach(V);
        }
        function H(V, lt) {
          for (var pt = p.header ? {} : [], dt = 0; dt < V.length; dt++) {
            var gt = dt, nt = V[dt], nt = ((St, et) => ((mt) => (p.dynamicTypingFunction && p.dynamicTyping[mt] === void 0 && (p.dynamicTyping[mt] = p.dynamicTypingFunction(mt)), (p.dynamicTyping[mt] || p.dynamicTyping) === !0))(St) ? et === "true" || et === "TRUE" || et !== "false" && et !== "FALSE" && (((mt) => {
              if (g.test(mt) && (mt = parseFloat(mt), A < mt && mt < E))
                return 1;
            })(et) ? parseFloat(et) : b.test(et) ? new Date(et) : et === "" ? null : et) : et)(gt = p.header ? dt >= T.length ? "__parsed_extra" : T[dt] : gt, nt = p.transform ? p.transform(nt, gt) : nt);
            gt === "__parsed_extra" ? (pt[gt] = pt[gt] || [], pt[gt].push(nt)) : pt[gt] = nt;
          }
          return p.header && (dt > T.length ? ct("FieldMismatch", "TooManyFields", "Too many fields: expected " + T.length + " fields but parsed " + dt, S + lt) : dt < T.length && ct("FieldMismatch", "TooFewFields", "Too few fields: expected " + T.length + " fields but parsed " + dt, S + lt)), pt;
        }
        var tt;
        j && (p.header || p.dynamicTyping || p.transform) && (tt = 1, !j.data.length || Array.isArray(j.data[0]) ? (j.data = j.data.map(H), tt = j.data.length) : j.data = H(j.data, 0), p.header && j.meta && (j.meta.fields = T), S += tt);
      }
      function ot() {
        return p.header && T.length === 0;
      }
      function ct(B, H, tt, V) {
        B = { type: B, code: H, message: tt }, V !== void 0 && (B.row = V), j.errors.push(B);
      }
      z(p.step) && (y = p.step, p.step = function(B) {
        j = B, ot() ? Z() : (Z(), j.data.length !== 0 && (x += B.data.length, p.preview && x > p.preview ? w.abort() : (j.data = j.data[0], y(j, m))));
      }), this.parse = function(B, H, tt) {
        var V = p.quoteChar || '"', V = (p.newline || (p.newline = this.guessLineEndings(B, V)), h = !1, p.delimiter ? z(p.delimiter) && (p.delimiter = p.delimiter(B), j.meta.delimiter = p.delimiter) : ((V = ((lt, pt, dt, gt, nt) => {
          var St, et, mt, Wt;
          nt = nt || [",", "	", "|", ";", u.RECORD_SEP, u.UNIT_SEP];
          for (var ye = 0; ye < nt.length; ye++) {
            for (var Ft, Le = nt[ye], yt = 0, Ot = 0, bt = 0, kt = (mt = void 0, new O({ comments: gt, delimiter: Le, newline: pt, preview: 10 }).parse(lt)), Vt = 0; Vt < kt.data.length; Vt++) dt && L(kt.data[Vt]) ? bt++ : (Ft = kt.data[Vt].length, Ot += Ft, mt === void 0 ? mt = Ft : 0 < Ft && (yt += Math.abs(Ft - mt), mt = Ft));
            0 < kt.data.length && (Ot /= kt.data.length - bt), (et === void 0 || yt <= et) && (Wt === void 0 || Wt < Ot) && 1.99 < Ot && (et = yt, St = Le, Wt = Ot);
          }
          return { successful: !!(p.delimiter = St), bestDelimiter: St };
        })(B, p.newline, p.skipEmptyLines, p.comments, p.delimitersToGuess)).successful ? p.delimiter = V.bestDelimiter : (h = !0, p.delimiter = u.DefaultDelimiter), j.meta.delimiter = p.delimiter), G(p));
        return p.preview && p.header && V.preview++, v = B, w = new O(V), j = w.parse(v, H, tt), Z(), M ? { meta: { paused: !0 } } : j || { meta: { paused: !1 } };
      }, this.paused = function() {
        return M;
      }, this.pause = function() {
        M = !0, w.abort(), v = z(p.chunk) ? "" : v.substring(w.getCharIndex());
      }, this.resume = function() {
        m.streamer._halted ? (M = !1, m.streamer.parseChunk(v, !0)) : setTimeout(m.resume, 3);
      }, this.aborted = function() {
        return C;
      }, this.abort = function() {
        C = !0, w.abort(), j.meta.aborted = !0, z(p.complete) && p.complete(j), v = "";
      }, this.guessLineEndings = function(lt, V) {
        lt = lt.substring(0, 1048576);
        var V = new RegExp(k(V) + "([^]*?)" + k(V), "gm"), tt = (lt = lt.replace(V, "")).split("\r"), V = lt.split(`
`), lt = 1 < V.length && V[0].length < tt[0].length;
        if (tt.length === 1 || lt) return `
`;
        for (var pt = 0, dt = 0; dt < tt.length; dt++) tt[dt][0] === `
` && pt++;
        return pt >= tt.length / 2 ? `\r
` : "\r";
      };
    }
    function k(p) {
      return p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function O(p) {
      var v = (p = p || {}).delimiter, w = p.newline, h = p.comments, y = p.step, E = p.preview, A = p.fastMode, g = null, b = !1, m = p.quoteChar == null ? '"' : p.quoteChar, x = m;
      if (p.escapeChar !== void 0 && (x = p.escapeChar), (typeof v != "string" || -1 < u.BAD_DELIMITERS.indexOf(v)) && (v = ","), h === v) throw new Error("Comment character same as delimiter");
      h === !0 ? h = "#" : (typeof h != "string" || -1 < u.BAD_DELIMITERS.indexOf(h)) && (h = !1), w !== `
` && w !== "\r" && w !== `\r
` && (w = `
`);
      var S = 0, M = !1;
      this.parse = function(C, T, j) {
        if (typeof C != "string") throw new Error("Input must be a string");
        var L = C.length, Z = v.length, ot = w.length, ct = h.length, B = z(y), H = [], tt = [], V = [], lt = S = 0;
        if (!C) return yt();
        if (A || A !== !1 && C.indexOf(m) === -1) {
          for (var pt = C.split(w), dt = 0; dt < pt.length; dt++) {
            if (V = pt[dt], S += V.length, dt !== pt.length - 1) S += w.length;
            else if (j) return yt();
            if (!h || V.substring(0, ct) !== h) {
              if (B) {
                if (H = [], Wt(V.split(v)), Ot(), M) return yt();
              } else Wt(V.split(v));
              if (E && E <= dt) return H = H.slice(0, E), yt(!0);
            }
          }
          return yt();
        }
        for (var gt = C.indexOf(v, S), nt = C.indexOf(w, S), St = new RegExp(k(x) + k(m), "g"), et = C.indexOf(m, S); ; ) if (C[S] === m) for (et = S, S++; ; ) {
          if ((et = C.indexOf(m, et + 1)) === -1) return j || tt.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: H.length, index: S }), Ft();
          if (et === L - 1) return Ft(C.substring(S, et).replace(St, m));
          if (m === x && C[et + 1] === x) et++;
          else if (m === x || et === 0 || C[et - 1] !== x) {
            gt !== -1 && gt < et + 1 && (gt = C.indexOf(v, et + 1));
            var mt = ye((nt = nt !== -1 && nt < et + 1 ? C.indexOf(w, et + 1) : nt) === -1 ? gt : Math.min(gt, nt));
            if (C.substr(et + 1 + mt, Z) === v) {
              V.push(C.substring(S, et).replace(St, m)), C[S = et + 1 + mt + Z] !== m && (et = C.indexOf(m, S)), gt = C.indexOf(v, S), nt = C.indexOf(w, S);
              break;
            }
            if (mt = ye(nt), C.substring(et + 1 + mt, et + 1 + mt + ot) === w) {
              if (V.push(C.substring(S, et).replace(St, m)), Le(et + 1 + mt + ot), gt = C.indexOf(v, S), et = C.indexOf(m, S), B && (Ot(), M)) return yt();
              if (E && H.length >= E) return yt(!0);
              break;
            }
            tt.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: H.length, index: S }), et++;
          }
        }
        else if (h && V.length === 0 && C.substring(S, S + ct) === h) {
          if (nt === -1) return yt();
          S = nt + ot, nt = C.indexOf(w, S), gt = C.indexOf(v, S);
        } else if (gt !== -1 && (gt < nt || nt === -1)) V.push(C.substring(S, gt)), S = gt + Z, gt = C.indexOf(v, S);
        else {
          if (nt === -1) break;
          if (V.push(C.substring(S, nt)), Le(nt + ot), B && (Ot(), M)) return yt();
          if (E && H.length >= E) return yt(!0);
        }
        return Ft();
        function Wt(bt) {
          H.push(bt), lt = S;
        }
        function ye(bt) {
          var kt = 0;
          return kt = bt !== -1 && (bt = C.substring(et + 1, bt)) && bt.trim() === "" ? bt.length : kt;
        }
        function Ft(bt) {
          return j || (bt === void 0 && (bt = C.substring(S)), V.push(bt), S = L, Wt(V), B && Ot()), yt();
        }
        function Le(bt) {
          S = bt, Wt(V), V = [], nt = C.indexOf(w, S);
        }
        function yt(bt) {
          if (p.header && !T && H.length && !b) {
            var kt = H[0], Vt = {}, ca = new Set(kt);
            let ui = !1;
            for (let xe = 0; xe < kt.length; xe++) {
              let jt = kt[xe];
              if (Vt[jt = z(p.transformHeader) ? p.transformHeader(jt, xe) : jt]) {
                let Re, li = Vt[jt];
                for (; Re = jt + "_" + li, li++, ca.has(Re); ) ;
                ca.add(Re), kt[xe] = Re, Vt[jt]++, ui = !0, (g = g === null ? {} : g)[Re] = jt;
              } else Vt[jt] = 1, kt[xe] = jt;
              ca.add(jt);
            }
            ui && console.warn("Duplicate headers found and renamed."), b = !0;
          }
          return { data: H, errors: tt, meta: { delimiter: v, linebreak: w, aborted: M, truncated: !!bt, cursor: lt + (T || 0), renamedHeaders: g } };
        }
        function Ot() {
          y(yt()), H = [], tt = [];
        }
      }, this.abort = function() {
        M = !0;
      }, this.getCharIndex = function() {
        return S;
      };
    }
    function R(p) {
      var v = p.data, w = o[v.workerId], h = !1;
      if (v.error) w.userError(v.error, v.file);
      else if (v.results && v.results.data) {
        var y = { abort: function() {
          h = !0, U(v.workerId, { data: [], errors: [], meta: { aborted: !0 } });
        }, pause: q, resume: q };
        if (z(w.userStep)) {
          for (var E = 0; E < v.results.data.length && (w.userStep({ data: v.results.data[E], errors: v.results.errors, meta: v.results.meta }, y), !h); E++) ;
          delete v.results;
        } else z(w.userChunk) && (w.userChunk(v.results, y, v.file), delete v.results);
      }
      v.finished && !h && U(v.workerId, v.results);
    }
    function U(p, v) {
      var w = o[p];
      z(w.userComplete) && w.userComplete(v), w.terminate(), delete o[p];
    }
    function q() {
      throw new Error("Not implemented.");
    }
    function G(p) {
      if (typeof p != "object" || p === null) return p;
      var v, w = Array.isArray(p) ? [] : {};
      for (v in p) w[v] = G(p[v]);
      return w;
    }
    function it(p, v) {
      return function() {
        p.apply(v, arguments);
      };
    }
    function z(p) {
      return typeof p == "function";
    }
    return u.parse = function(p, v) {
      var w = (v = v || {}).dynamicTyping || !1;
      if (z(w) && (v.dynamicTypingFunction = w, w = {}), v.dynamicTyping = w, v.transform = !!z(v.transform) && v.transform, !v.worker || !u.WORKERS_SUPPORTED) return w = null, u.NODE_STREAM_INPUT, typeof p == "string" ? (p = ((h) => h.charCodeAt(0) !== 65279 ? h : h.slice(1))(p), w = new (v.download ? _ : f)(v)) : p.readable === !0 && z(p.read) && z(p.on) ? w = new N(v) : (s.File && p instanceof File || p instanceof Object) && (w = new l(v)), w.stream(p);
      (w = (() => {
        var h;
        return !!u.WORKERS_SUPPORTED && (h = (() => {
          var y = s.URL || s.webkitURL || null, E = e.toString();
          return u.BLOB_URL || (u.BLOB_URL = y.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ", "(", E, ")();"], { type: "text/javascript" })));
        })(), (h = new s.Worker(h)).onmessage = R, h.id = c++, o[h.id] = h);
      })()).userStep = v.step, w.userChunk = v.chunk, w.userComplete = v.complete, w.userError = v.error, v.step = z(v.step), v.chunk = z(v.chunk), v.complete = z(v.complete), v.error = z(v.error), delete v.worker, w.postMessage({ input: p, config: v, workerId: w.id });
    }, u.unparse = function(p, v) {
      var w = !1, h = !0, y = ",", E = `\r
`, A = '"', g = A + A, b = !1, m = null, x = !1, S = ((() => {
        if (typeof v == "object") {
          if (typeof v.delimiter != "string" || u.BAD_DELIMITERS.filter(function(T) {
            return v.delimiter.indexOf(T) !== -1;
          }).length || (y = v.delimiter), typeof v.quotes != "boolean" && typeof v.quotes != "function" && !Array.isArray(v.quotes) || (w = v.quotes), typeof v.skipEmptyLines != "boolean" && typeof v.skipEmptyLines != "string" || (b = v.skipEmptyLines), typeof v.newline == "string" && (E = v.newline), typeof v.quoteChar == "string" && (A = v.quoteChar), typeof v.header == "boolean" && (h = v.header), Array.isArray(v.columns)) {
            if (v.columns.length === 0) throw new Error("Option columns is empty");
            m = v.columns;
          }
          v.escapeChar !== void 0 && (g = v.escapeChar + A), v.escapeFormulae instanceof RegExp ? x = v.escapeFormulae : typeof v.escapeFormulae == "boolean" && v.escapeFormulae && (x = /^[=+\-@\t\r].*$/);
        }
      })(), new RegExp(k(A), "g"));
      if (typeof p == "string" && (p = JSON.parse(p)), Array.isArray(p)) {
        if (!p.length || Array.isArray(p[0])) return M(null, p, b);
        if (typeof p[0] == "object") return M(m || Object.keys(p[0]), p, b);
      } else if (typeof p == "object") return typeof p.data == "string" && (p.data = JSON.parse(p.data)), Array.isArray(p.data) && (p.fields || (p.fields = p.meta && p.meta.fields || m), p.fields || (p.fields = Array.isArray(p.data[0]) ? p.fields : typeof p.data[0] == "object" ? Object.keys(p.data[0]) : []), Array.isArray(p.data[0]) || typeof p.data[0] == "object" || (p.data = [p.data])), M(p.fields || [], p.data || [], b);
      throw new Error("Unable to serialize unrecognized input");
      function M(T, j, L) {
        var Z = "", ot = (typeof T == "string" && (T = JSON.parse(T)), typeof j == "string" && (j = JSON.parse(j)), Array.isArray(T) && 0 < T.length), ct = !Array.isArray(j[0]);
        if (ot && h) {
          for (var B = 0; B < T.length; B++) 0 < B && (Z += y), Z += C(T[B], B);
          0 < j.length && (Z += E);
        }
        for (var H = 0; H < j.length; H++) {
          var tt = (ot ? T : j[H]).length, V = !1, lt = ot ? Object.keys(j[H]).length === 0 : j[H].length === 0;
          if (L && !ot && (V = L === "greedy" ? j[H].join("").trim() === "" : j[H].length === 1 && j[H][0].length === 0), L === "greedy" && ot) {
            for (var pt = [], dt = 0; dt < tt; dt++) {
              var gt = ct ? T[dt] : dt;
              pt.push(j[H][gt]);
            }
            V = pt.join("").trim() === "";
          }
          if (!V) {
            for (var nt = 0; nt < tt; nt++) {
              0 < nt && !lt && (Z += y);
              var St = ot && ct ? T[nt] : nt;
              Z += C(j[H][St], nt);
            }
            H < j.length - 1 && (!L || 0 < tt && !lt) && (Z += E);
          }
        }
        return Z;
      }
      function C(T, j) {
        var L, Z;
        return T == null ? "" : T.constructor === Date ? JSON.stringify(T).slice(1, 25) : (Z = !1, x && typeof T == "string" && x.test(T) && (T = "'" + T, Z = !0), L = T.toString().replace(S, g), (Z = Z || w === !0 || typeof w == "function" && w(T, j) || Array.isArray(w) && w[j] || ((ot, ct) => {
          for (var B = 0; B < ct.length; B++) if (-1 < ot.indexOf(ct[B])) return !0;
          return !1;
        })(L, u.BAD_DELIMITERS) || -1 < L.indexOf(y) || L.charAt(0) === " " || L.charAt(L.length - 1) === " ") ? A + L + A : L);
      }
    }, u.RECORD_SEP = "", u.UNIT_SEP = "", u.BYTE_ORDER_MARK = "\uFEFF", u.BAD_DELIMITERS = ["\r", `
`, '"', u.BYTE_ORDER_MARK], u.WORKERS_SUPPORTED = !n && !!s.Worker, u.NODE_STREAM_INPUT = 1, u.LocalChunkSize = 10485760, u.RemoteChunkSize = 5242880, u.DefaultDelimiter = ",", u.Parser = O, u.ParserHandle = F, u.NetworkStreamer = _, u.FileStreamer = l, u.StringStreamer = f, u.ReadableStreamStreamer = N, s.jQuery && ((i = s.jQuery).fn.parse = function(p) {
      var v = p.config || {}, w = [];
      return this.each(function(E) {
        if (!(i(this).prop("tagName").toUpperCase() === "INPUT" && i(this).attr("type").toLowerCase() === "file" && s.FileReader) || !this.files || this.files.length === 0) return !0;
        for (var A = 0; A < this.files.length; A++) w.push({ file: this.files[A], inputElem: this, instanceConfig: i.extend({}, v) });
      }), h(), this;
      function h() {
        if (w.length === 0) z(p.complete) && p.complete();
        else {
          var E, A, g, b, m = w[0];
          if (z(p.before)) {
            var x = p.before(m.file, m.inputElem);
            if (typeof x == "object") {
              if (x.action === "abort") return E = "AbortError", A = m.file, g = m.inputElem, b = x.reason, void (z(p.error) && p.error({ name: E }, A, g, b));
              if (x.action === "skip") return void y();
              typeof x.config == "object" && (m.instanceConfig = i.extend(m.instanceConfig, x.config));
            } else if (x === "skip") return void y();
          }
          var S = m.instanceConfig.complete;
          m.instanceConfig.complete = function(M) {
            z(S) && S(M, m.file, m.inputElem), y();
          }, u.parse(m.file, m.instanceConfig);
        }
      }
      function y() {
        w.splice(0, 1), h();
      }
    }), r && (s.onmessage = function(p) {
      p = p.data, u.WORKER_ID === void 0 && p && (u.WORKER_ID = p.workerId), typeof p.input == "string" ? s.postMessage({ workerId: u.WORKER_ID, results: u.parse(p.input, p.config), finished: !0 }) : (s.File && p.input instanceof File || p.input instanceof Object) && (p = u.parse(p.input, p.config)) && s.postMessage({ workerId: u.WORKER_ID, results: p, finished: !0 });
    }), (_.prototype = Object.create(d.prototype)).constructor = _, (l.prototype = Object.create(d.prototype)).constructor = l, (f.prototype = Object.create(f.prototype)).constructor = f, (N.prototype = Object.create(d.prototype)).constructor = N, u;
  });
})(zi);
var Sr = zi.exports;
const Os = /* @__PURE__ */ Qa(Sr), Jl = async (a) => new Promise((t, e) => {
  Os.parse(a, {
    header: !0,
    skipEmptyLines: !0,
    complete: (s) => {
      t(s.data);
    },
    error: (s) => {
      e(s);
    }
  });
}), Hl = (a) => a.replace(/^\[/, "").replace(/$]/, "").split(","), Wl = {
  parse: (a, t) => Os.parse(a, t),
  unparse: (a, t) => Os.unparse(a, t),
  parseFile: (a, t) => new Promise((e, s) => {
    Os.parse(a, {
      ...t,
      complete: (i) => e(i),
      error: (i) => s(i)
    });
  })
};
var Gi = { exports: {} };
(function(a, t) {
  (function(e, s) {
    a.exports = s();
  })(X, function() {
    var e = 1e3, s = 6e4, i = 36e5, n = "millisecond", r = "second", o = "minute", c = "hour", u = "day", d = "week", _ = "month", l = "quarter", f = "year", N = "date", F = "Invalid Date", k = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, O = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, R = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(A) {
      var g = ["th", "st", "nd", "rd"], b = A % 100;
      return "[" + A + (g[(b - 20) % 10] || g[b] || g[0]) + "]";
    } }, U = function(A, g, b) {
      var m = String(A);
      return !m || m.length >= g ? A : "" + Array(g + 1 - m.length).join(b) + A;
    }, q = { s: U, z: function(A) {
      var g = -A.utcOffset(), b = Math.abs(g), m = Math.floor(b / 60), x = b % 60;
      return (g <= 0 ? "+" : "-") + U(m, 2, "0") + ":" + U(x, 2, "0");
    }, m: function A(g, b) {
      if (g.date() < b.date()) return -A(b, g);
      var m = 12 * (b.year() - g.year()) + (b.month() - g.month()), x = g.clone().add(m, _), S = b - x < 0, M = g.clone().add(m + (S ? -1 : 1), _);
      return +(-(m + (b - x) / (S ? x - M : M - x)) || 0);
    }, a: function(A) {
      return A < 0 ? Math.ceil(A) || 0 : Math.floor(A);
    }, p: function(A) {
      return { M: _, y: f, w: d, d: u, D: N, h: c, m: o, s: r, ms: n, Q: l }[A] || String(A || "").toLowerCase().replace(/s$/, "");
    }, u: function(A) {
      return A === void 0;
    } }, G = "en", it = {};
    it[G] = R;
    var z = "$isDayjsObject", p = function(A) {
      return A instanceof y || !(!A || !A[z]);
    }, v = function A(g, b, m) {
      var x;
      if (!g) return G;
      if (typeof g == "string") {
        var S = g.toLowerCase();
        it[S] && (x = S), b && (it[S] = b, x = S);
        var M = g.split("-");
        if (!x && M.length > 1) return A(M[0]);
      } else {
        var C = g.name;
        it[C] = g, x = C;
      }
      return !m && x && (G = x), x || !m && G;
    }, w = function(A, g) {
      if (p(A)) return A.clone();
      var b = typeof g == "object" ? g : {};
      return b.date = A, b.args = arguments, new y(b);
    }, h = q;
    h.l = v, h.i = p, h.w = function(A, g) {
      return w(A, { locale: g.$L, utc: g.$u, x: g.$x, $offset: g.$offset });
    };
    var y = function() {
      function A(b) {
        this.$L = v(b.locale, null, !0), this.parse(b), this.$x = this.$x || b.x || {}, this[z] = !0;
      }
      var g = A.prototype;
      return g.parse = function(b) {
        this.$d = function(m) {
          var x = m.date, S = m.utc;
          if (x === null) return /* @__PURE__ */ new Date(NaN);
          if (h.u(x)) return /* @__PURE__ */ new Date();
          if (x instanceof Date) return new Date(x);
          if (typeof x == "string" && !/Z$/i.test(x)) {
            var M = x.match(k);
            if (M) {
              var C = M[2] - 1 || 0, T = (M[7] || "0").substring(0, 3);
              return S ? new Date(Date.UTC(M[1], C, M[3] || 1, M[4] || 0, M[5] || 0, M[6] || 0, T)) : new Date(M[1], C, M[3] || 1, M[4] || 0, M[5] || 0, M[6] || 0, T);
            }
          }
          return new Date(x);
        }(b), this.init();
      }, g.init = function() {
        var b = this.$d;
        this.$y = b.getFullYear(), this.$M = b.getMonth(), this.$D = b.getDate(), this.$W = b.getDay(), this.$H = b.getHours(), this.$m = b.getMinutes(), this.$s = b.getSeconds(), this.$ms = b.getMilliseconds();
      }, g.$utils = function() {
        return h;
      }, g.isValid = function() {
        return this.$d.toString() !== F;
      }, g.isSame = function(b, m) {
        var x = w(b);
        return this.startOf(m) <= x && x <= this.endOf(m);
      }, g.isAfter = function(b, m) {
        return w(b) < this.startOf(m);
      }, g.isBefore = function(b, m) {
        return this.endOf(m) < w(b);
      }, g.$g = function(b, m, x) {
        return h.u(b) ? this[m] : this.set(x, b);
      }, g.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, g.valueOf = function() {
        return this.$d.getTime();
      }, g.startOf = function(b, m) {
        var x = this, S = !!h.u(m) || m, M = h.p(b), C = function(H, tt) {
          var V = h.w(x.$u ? Date.UTC(x.$y, tt, H) : new Date(x.$y, tt, H), x);
          return S ? V : V.endOf(u);
        }, T = function(H, tt) {
          return h.w(x.toDate()[H].apply(x.toDate("s"), (S ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(tt)), x);
        }, j = this.$W, L = this.$M, Z = this.$D, ot = "set" + (this.$u ? "UTC" : "");
        switch (M) {
          case f:
            return S ? C(1, 0) : C(31, 11);
          case _:
            return S ? C(1, L) : C(0, L + 1);
          case d:
            var ct = this.$locale().weekStart || 0, B = (j < ct ? j + 7 : j) - ct;
            return C(S ? Z - B : Z + (6 - B), L);
          case u:
          case N:
            return T(ot + "Hours", 0);
          case c:
            return T(ot + "Minutes", 1);
          case o:
            return T(ot + "Seconds", 2);
          case r:
            return T(ot + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, g.endOf = function(b) {
        return this.startOf(b, !1);
      }, g.$set = function(b, m) {
        var x, S = h.p(b), M = "set" + (this.$u ? "UTC" : ""), C = (x = {}, x[u] = M + "Date", x[N] = M + "Date", x[_] = M + "Month", x[f] = M + "FullYear", x[c] = M + "Hours", x[o] = M + "Minutes", x[r] = M + "Seconds", x[n] = M + "Milliseconds", x)[S], T = S === u ? this.$D + (m - this.$W) : m;
        if (S === _ || S === f) {
          var j = this.clone().set(N, 1);
          j.$d[C](T), j.init(), this.$d = j.set(N, Math.min(this.$D, j.daysInMonth())).$d;
        } else C && this.$d[C](T);
        return this.init(), this;
      }, g.set = function(b, m) {
        return this.clone().$set(b, m);
      }, g.get = function(b) {
        return this[h.p(b)]();
      }, g.add = function(b, m) {
        var x, S = this;
        b = Number(b);
        var M = h.p(m), C = function(L) {
          var Z = w(S);
          return h.w(Z.date(Z.date() + Math.round(L * b)), S);
        };
        if (M === _) return this.set(_, this.$M + b);
        if (M === f) return this.set(f, this.$y + b);
        if (M === u) return C(1);
        if (M === d) return C(7);
        var T = (x = {}, x[o] = s, x[c] = i, x[r] = e, x)[M] || 1, j = this.$d.getTime() + b * T;
        return h.w(j, this);
      }, g.subtract = function(b, m) {
        return this.add(-1 * b, m);
      }, g.format = function(b) {
        var m = this, x = this.$locale();
        if (!this.isValid()) return x.invalidDate || F;
        var S = b || "YYYY-MM-DDTHH:mm:ssZ", M = h.z(this), C = this.$H, T = this.$m, j = this.$M, L = x.weekdays, Z = x.months, ot = x.meridiem, ct = function(tt, V, lt, pt) {
          return tt && (tt[V] || tt(m, S)) || lt[V].slice(0, pt);
        }, B = function(tt) {
          return h.s(C % 12 || 12, tt, "0");
        }, H = ot || function(tt, V, lt) {
          var pt = tt < 12 ? "AM" : "PM";
          return lt ? pt.toLowerCase() : pt;
        };
        return S.replace(O, function(tt, V) {
          return V || function(lt) {
            switch (lt) {
              case "YY":
                return String(m.$y).slice(-2);
              case "YYYY":
                return h.s(m.$y, 4, "0");
              case "M":
                return j + 1;
              case "MM":
                return h.s(j + 1, 2, "0");
              case "MMM":
                return ct(x.monthsShort, j, Z, 3);
              case "MMMM":
                return ct(Z, j);
              case "D":
                return m.$D;
              case "DD":
                return h.s(m.$D, 2, "0");
              case "d":
                return String(m.$W);
              case "dd":
                return ct(x.weekdaysMin, m.$W, L, 2);
              case "ddd":
                return ct(x.weekdaysShort, m.$W, L, 3);
              case "dddd":
                return L[m.$W];
              case "H":
                return String(C);
              case "HH":
                return h.s(C, 2, "0");
              case "h":
                return B(1);
              case "hh":
                return B(2);
              case "a":
                return H(C, T, !0);
              case "A":
                return H(C, T, !1);
              case "m":
                return String(T);
              case "mm":
                return h.s(T, 2, "0");
              case "s":
                return String(m.$s);
              case "ss":
                return h.s(m.$s, 2, "0");
              case "SSS":
                return h.s(m.$ms, 3, "0");
              case "Z":
                return M;
            }
            return null;
          }(tt) || M.replace(":", "");
        });
      }, g.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, g.diff = function(b, m, x) {
        var S, M = this, C = h.p(m), T = w(b), j = (T.utcOffset() - this.utcOffset()) * s, L = this - T, Z = function() {
          return h.m(M, T);
        };
        switch (C) {
          case f:
            S = Z() / 12;
            break;
          case _:
            S = Z();
            break;
          case l:
            S = Z() / 3;
            break;
          case d:
            S = (L - j) / 6048e5;
            break;
          case u:
            S = (L - j) / 864e5;
            break;
          case c:
            S = L / i;
            break;
          case o:
            S = L / s;
            break;
          case r:
            S = L / e;
            break;
          default:
            S = L;
        }
        return x ? S : h.a(S);
      }, g.daysInMonth = function() {
        return this.endOf(_).$D;
      }, g.$locale = function() {
        return it[this.$L];
      }, g.locale = function(b, m) {
        if (!b) return this.$L;
        var x = this.clone(), S = v(b, m, !0);
        return S && (x.$L = S), x;
      }, g.clone = function() {
        return h.w(this.$d, this);
      }, g.toDate = function() {
        return new Date(this.valueOf());
      }, g.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, g.toISOString = function() {
        return this.$d.toISOString();
      }, g.toString = function() {
        return this.$d.toUTCString();
      }, A;
    }(), E = y.prototype;
    return w.prototype = E, [["$ms", n], ["$s", r], ["$m", o], ["$H", c], ["$W", u], ["$M", _], ["$y", f], ["$D", N]].forEach(function(A) {
      E[A[1]] = function(g) {
        return this.$g(g, A[0], A[1]);
      };
    }), w.extend = function(A, g) {
      return A.$i || (A(g, y, w), A.$i = !0), w;
    }, w.locale = v, w.isDayjs = p, w.unix = function(A) {
      return w(1e3 * A);
    }, w.en = it[G], w.Ls = it, w.p = {}, w;
  });
})(Gi);
var Cr = Gi.exports;
const ue = /* @__PURE__ */ Qa(Cr);
var rt;
(function(a) {
  a.assertEqual = (i) => i;
  function t(i) {
  }
  a.assertIs = t;
  function e(i) {
    throw new Error();
  }
  a.assertNever = e, a.arrayToEnum = (i) => {
    const n = {};
    for (const r of i)
      n[r] = r;
    return n;
  }, a.getValidEnumValues = (i) => {
    const n = a.objectKeys(i).filter((o) => typeof i[i[o]] != "number"), r = {};
    for (const o of n)
      r[o] = i[o];
    return a.objectValues(r);
  }, a.objectValues = (i) => a.objectKeys(i).map(function(n) {
    return i[n];
  }), a.objectKeys = typeof Object.keys == "function" ? (i) => Object.keys(i) : (i) => {
    const n = [];
    for (const r in i)
      Object.prototype.hasOwnProperty.call(i, r) && n.push(r);
    return n;
  }, a.find = (i, n) => {
    for (const r of i)
      if (n(r))
        return r;
  }, a.isInteger = typeof Number.isInteger == "function" ? (i) => Number.isInteger(i) : (i) => typeof i == "number" && isFinite(i) && Math.floor(i) === i;
  function s(i, n = " | ") {
    return i.map((r) => typeof r == "string" ? `'${r}'` : r).join(n);
  }
  a.joinValues = s, a.jsonStringifyReplacer = (i, n) => typeof n == "bigint" ? n.toString() : n;
})(rt || (rt = {}));
var va;
(function(a) {
  a.mergeShapes = (t, e) => ({
    ...t,
    ...e
    // second overwrites first
  });
})(va || (va = {}));
const D = rt.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), Yt = (a) => {
  switch (typeof a) {
    case "undefined":
      return D.undefined;
    case "string":
      return D.string;
    case "number":
      return isNaN(a) ? D.nan : D.number;
    case "boolean":
      return D.boolean;
    case "function":
      return D.function;
    case "bigint":
      return D.bigint;
    case "symbol":
      return D.symbol;
    case "object":
      return Array.isArray(a) ? D.array : a === null ? D.null : a.then && typeof a.then == "function" && a.catch && typeof a.catch == "function" ? D.promise : typeof Map < "u" && a instanceof Map ? D.map : typeof Set < "u" && a instanceof Set ? D.set : typeof Date < "u" && a instanceof Date ? D.date : D.object;
    default:
      return D.unknown;
  }
}, I = rt.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), Ir = (a) => JSON.stringify(a, null, 2).replace(/"([^"]+)":/g, "$1:");
class Et extends Error {
  get errors() {
    return this.issues;
  }
  constructor(t) {
    super(), this.issues = [], this.addIssue = (s) => {
      this.issues = [...this.issues, s];
    }, this.addIssues = (s = []) => {
      this.issues = [...this.issues, ...s];
    };
    const e = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, e) : this.__proto__ = e, this.name = "ZodError", this.issues = t;
  }
  format(t) {
    const e = t || function(n) {
      return n.message;
    }, s = { _errors: [] }, i = (n) => {
      for (const r of n.issues)
        if (r.code === "invalid_union")
          r.unionErrors.map(i);
        else if (r.code === "invalid_return_type")
          i(r.returnTypeError);
        else if (r.code === "invalid_arguments")
          i(r.argumentsError);
        else if (r.path.length === 0)
          s._errors.push(e(r));
        else {
          let o = s, c = 0;
          for (; c < r.path.length; ) {
            const u = r.path[c];
            c === r.path.length - 1 ? (o[u] = o[u] || { _errors: [] }, o[u]._errors.push(e(r))) : o[u] = o[u] || { _errors: [] }, o = o[u], c++;
          }
        }
    };
    return i(this), s;
  }
  static assert(t) {
    if (!(t instanceof Et))
      throw new Error(`Not a ZodError: ${t}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, rt.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(t = (e) => e.message) {
    const e = {}, s = [];
    for (const i of this.issues)
      i.path.length > 0 ? (e[i.path[0]] = e[i.path[0]] || [], e[i.path[0]].push(t(i))) : s.push(t(i));
    return { formErrors: s, fieldErrors: e };
  }
  get formErrors() {
    return this.flatten();
  }
}
Et.create = (a) => new Et(a);
const Ce = (a, t) => {
  let e;
  switch (a.code) {
    case I.invalid_type:
      a.received === D.undefined ? e = "Required" : e = `Expected ${a.expected}, received ${a.received}`;
      break;
    case I.invalid_literal:
      e = `Invalid literal value, expected ${JSON.stringify(a.expected, rt.jsonStringifyReplacer)}`;
      break;
    case I.unrecognized_keys:
      e = `Unrecognized key(s) in object: ${rt.joinValues(a.keys, ", ")}`;
      break;
    case I.invalid_union:
      e = "Invalid input";
      break;
    case I.invalid_union_discriminator:
      e = `Invalid discriminator value. Expected ${rt.joinValues(a.options)}`;
      break;
    case I.invalid_enum_value:
      e = `Invalid enum value. Expected ${rt.joinValues(a.options)}, received '${a.received}'`;
      break;
    case I.invalid_arguments:
      e = "Invalid function arguments";
      break;
    case I.invalid_return_type:
      e = "Invalid function return type";
      break;
    case I.invalid_date:
      e = "Invalid date";
      break;
    case I.invalid_string:
      typeof a.validation == "object" ? "includes" in a.validation ? (e = `Invalid input: must include "${a.validation.includes}"`, typeof a.validation.position == "number" && (e = `${e} at one or more positions greater than or equal to ${a.validation.position}`)) : "startsWith" in a.validation ? e = `Invalid input: must start with "${a.validation.startsWith}"` : "endsWith" in a.validation ? e = `Invalid input: must end with "${a.validation.endsWith}"` : rt.assertNever(a.validation) : a.validation !== "regex" ? e = `Invalid ${a.validation}` : e = "Invalid";
      break;
    case I.too_small:
      a.type === "array" ? e = `Array must contain ${a.exact ? "exactly" : a.inclusive ? "at least" : "more than"} ${a.minimum} element(s)` : a.type === "string" ? e = `String must contain ${a.exact ? "exactly" : a.inclusive ? "at least" : "over"} ${a.minimum} character(s)` : a.type === "number" ? e = `Number must be ${a.exact ? "exactly equal to " : a.inclusive ? "greater than or equal to " : "greater than "}${a.minimum}` : a.type === "date" ? e = `Date must be ${a.exact ? "exactly equal to " : a.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(a.minimum))}` : e = "Invalid input";
      break;
    case I.too_big:
      a.type === "array" ? e = `Array must contain ${a.exact ? "exactly" : a.inclusive ? "at most" : "less than"} ${a.maximum} element(s)` : a.type === "string" ? e = `String must contain ${a.exact ? "exactly" : a.inclusive ? "at most" : "under"} ${a.maximum} character(s)` : a.type === "number" ? e = `Number must be ${a.exact ? "exactly" : a.inclusive ? "less than or equal to" : "less than"} ${a.maximum}` : a.type === "bigint" ? e = `BigInt must be ${a.exact ? "exactly" : a.inclusive ? "less than or equal to" : "less than"} ${a.maximum}` : a.type === "date" ? e = `Date must be ${a.exact ? "exactly" : a.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(a.maximum))}` : e = "Invalid input";
      break;
    case I.custom:
      e = "Invalid input";
      break;
    case I.invalid_intersection_types:
      e = "Intersection results could not be merged";
      break;
    case I.not_multiple_of:
      e = `Number must be a multiple of ${a.multipleOf}`;
      break;
    case I.not_finite:
      e = "Number must be finite";
      break;
    default:
      e = t.defaultError, rt.assertNever(a);
  }
  return { message: e };
};
let Ji = Ce;
function Nr(a) {
  Ji = a;
}
function Rs() {
  return Ji;
}
const Zs = (a) => {
  const { data: t, path: e, errorMaps: s, issueData: i } = a, n = [...e, ...i.path || []], r = {
    ...i,
    path: n
  };
  if (i.message !== void 0)
    return {
      ...i,
      path: n,
      message: i.message
    };
  let o = "";
  const c = s.filter((u) => !!u).slice().reverse();
  for (const u of c)
    o = u(r, { data: t, defaultError: o }).message;
  return {
    ...i,
    path: n,
    message: o
  };
}, Tr = [];
function P(a, t) {
  const e = Rs(), s = Zs({
    issueData: t,
    data: a.data,
    path: a.path,
    errorMaps: [
      a.common.contextualErrorMap,
      // contextual error map is first priority
      a.schemaErrorMap,
      // then schema-bound map if available
      e,
      // then global override map
      e === Ce ? void 0 : Ce
      // then global default map
    ].filter((i) => !!i)
  });
  a.common.issues.push(s);
}
class xt {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(t, e) {
    const s = [];
    for (const i of e) {
      if (i.status === "aborted")
        return K;
      i.status === "dirty" && t.dirty(), s.push(i.value);
    }
    return { status: t.value, value: s };
  }
  static async mergeObjectAsync(t, e) {
    const s = [];
    for (const i of e) {
      const n = await i.key, r = await i.value;
      s.push({
        key: n,
        value: r
      });
    }
    return xt.mergeObjectSync(t, s);
  }
  static mergeObjectSync(t, e) {
    const s = {};
    for (const i of e) {
      const { key: n, value: r } = i;
      if (n.status === "aborted" || r.status === "aborted")
        return K;
      n.status === "dirty" && t.dirty(), r.status === "dirty" && t.dirty(), n.value !== "__proto__" && (typeof r.value < "u" || i.alwaysSet) && (s[n.value] = r.value);
    }
    return { status: t.value, value: s };
  }
}
const K = Object.freeze({
  status: "aborted"
}), _e = (a) => ({ status: "dirty", value: a }), wt = (a) => ({ status: "valid", value: a }), ba = (a) => a.status === "aborted", ya = (a) => a.status === "dirty", de = (a) => a.status === "valid", Ge = (a) => typeof Promise < "u" && a instanceof Promise;
function Qs(a, t, e, s) {
  if (typeof t == "function" ? a !== t || !0 : !t.has(a)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return t.get(a);
}
function Hi(a, t, e, s, i) {
  if (typeof t == "function" ? a !== t || !0 : !t.has(a)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return t.set(a, e), e;
}
var Q;
(function(a) {
  a.errToObj = (t) => typeof t == "string" ? { message: t } : t || {}, a.toString = (t) => typeof t == "string" ? t : t == null ? void 0 : t.message;
})(Q || (Q = {}));
var Xe, Ye;
class Rt {
  constructor(t, e, s, i) {
    this._cachedPath = [], this.parent = t, this.data = e, this._path = s, this._key = i;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const fi = (a, t) => {
  if (de(t))
    return { success: !0, data: t.value };
  if (!a.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const e = new Et(a.common.issues);
      return this._error = e, this._error;
    }
  };
};
function J(a) {
  if (!a)
    return {};
  const { errorMap: t, invalid_type_error: e, required_error: s, description: i } = a;
  if (t && (e || s))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return t ? { errorMap: t, description: i } : { errorMap: (r, o) => {
    var c, u;
    const { message: d } = a;
    return r.code === "invalid_enum_value" ? { message: d ?? o.defaultError } : typeof o.data > "u" ? { message: (c = d ?? s) !== null && c !== void 0 ? c : o.defaultError } : r.code !== "invalid_type" ? { message: o.defaultError } : { message: (u = d ?? e) !== null && u !== void 0 ? u : o.defaultError };
  }, description: i };
}
class st {
  get description() {
    return this._def.description;
  }
  _getType(t) {
    return Yt(t.data);
  }
  _getOrReturnCtx(t, e) {
    return e || {
      common: t.parent.common,
      data: t.data,
      parsedType: Yt(t.data),
      schemaErrorMap: this._def.errorMap,
      path: t.path,
      parent: t.parent
    };
  }
  _processInputParams(t) {
    return {
      status: new xt(),
      ctx: {
        common: t.parent.common,
        data: t.data,
        parsedType: Yt(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent
      }
    };
  }
  _parseSync(t) {
    const e = this._parse(t);
    if (Ge(e))
      throw new Error("Synchronous parse encountered promise.");
    return e;
  }
  _parseAsync(t) {
    const e = this._parse(t);
    return Promise.resolve(e);
  }
  parse(t, e) {
    const s = this.safeParse(t, e);
    if (s.success)
      return s.data;
    throw s.error;
  }
  safeParse(t, e) {
    var s;
    const i = {
      common: {
        issues: [],
        async: (s = e == null ? void 0 : e.async) !== null && s !== void 0 ? s : !1,
        contextualErrorMap: e == null ? void 0 : e.errorMap
      },
      path: (e == null ? void 0 : e.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: Yt(t)
    }, n = this._parseSync({ data: t, path: i.path, parent: i });
    return fi(i, n);
  }
  "~validate"(t) {
    var e, s;
    const i = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: Yt(t)
    };
    if (!this["~standard"].async)
      try {
        const n = this._parseSync({ data: t, path: [], parent: i });
        return de(n) ? {
          value: n.value
        } : {
          issues: i.common.issues
        };
      } catch (n) {
        !((s = (e = n == null ? void 0 : n.message) === null || e === void 0 ? void 0 : e.toLowerCase()) === null || s === void 0) && s.includes("encountered") && (this["~standard"].async = !0), i.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: t, path: [], parent: i }).then((n) => de(n) ? {
      value: n.value
    } : {
      issues: i.common.issues
    });
  }
  async parseAsync(t, e) {
    const s = await this.safeParseAsync(t, e);
    if (s.success)
      return s.data;
    throw s.error;
  }
  async safeParseAsync(t, e) {
    const s = {
      common: {
        issues: [],
        contextualErrorMap: e == null ? void 0 : e.errorMap,
        async: !0
      },
      path: (e == null ? void 0 : e.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: Yt(t)
    }, i = this._parse({ data: t, path: s.path, parent: s }), n = await (Ge(i) ? i : Promise.resolve(i));
    return fi(s, n);
  }
  refine(t, e) {
    const s = (i) => typeof e == "string" || typeof e > "u" ? { message: e } : typeof e == "function" ? e(i) : e;
    return this._refinement((i, n) => {
      const r = t(i), o = () => n.addIssue({
        code: I.custom,
        ...s(i)
      });
      return typeof Promise < "u" && r instanceof Promise ? r.then((c) => c ? !0 : (o(), !1)) : r ? !0 : (o(), !1);
    });
  }
  refinement(t, e) {
    return this._refinement((s, i) => t(s) ? !0 : (i.addIssue(typeof e == "function" ? e(s, i) : e), !1));
  }
  _refinement(t) {
    return new Tt({
      schema: this,
      typeName: Y.ZodEffects,
      effect: { type: "refinement", refinement: t }
    });
  }
  superRefine(t) {
    return this._refinement(t);
  }
  constructor(t) {
    this.spa = this.safeParseAsync, this._def = t, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (e) => this["~validate"](e)
    };
  }
  optional() {
    return Dt.create(this, this._def);
  }
  nullable() {
    return ne.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Nt.create(this);
  }
  promise() {
    return Ne.create(this, this._def);
  }
  or(t) {
    return $e.create([this, t], this._def);
  }
  and(t) {
    return ts.create(this, t, this._def);
  }
  transform(t) {
    return new Tt({
      ...J(this._def),
      schema: this,
      typeName: Y.ZodEffects,
      effect: { type: "transform", transform: t }
    });
  }
  default(t) {
    const e = typeof t == "function" ? t : () => t;
    return new ns({
      ...J(this._def),
      innerType: this,
      defaultValue: e,
      typeName: Y.ZodDefault
    });
  }
  brand() {
    return new Va({
      typeName: Y.ZodBranded,
      type: this,
      ...J(this._def)
    });
  }
  catch(t) {
    const e = typeof t == "function" ? t : () => t;
    return new rs({
      ...J(this._def),
      innerType: this,
      catchValue: e,
      typeName: Y.ZodCatch
    });
  }
  describe(t) {
    const e = this.constructor;
    return new e({
      ...this._def,
      description: t
    });
  }
  pipe(t) {
    return ms.create(this, t);
  }
  readonly() {
    return os.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Mr = /^c[^\s-]{8,}$/i, Fr = /^[0-9a-z]+$/, Or = /^[0-9A-HJKMNP-TV-Z]{26}$/i, jr = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, Pr = /^[a-z0-9_-]{21}$/i, Dr = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Lr = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Rr = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Zr = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let ua;
const Qr = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Vr = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Br = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, qr = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Ur = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Xr = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, Wi = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Yr = new RegExp(`^${Wi}$`);
function $i(a) {
  let t = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return a.precision ? t = `${t}\\.\\d{${a.precision}}` : a.precision == null && (t = `${t}(\\.\\d+)?`), t;
}
function Kr(a) {
  return new RegExp(`^${$i(a)}$`);
}
function tn(a) {
  let t = `${Wi}T${$i(a)}`;
  const e = [];
  return e.push(a.local ? "Z?" : "Z"), a.offset && e.push("([+-]\\d{2}:?\\d{2})"), t = `${t}(${e.join("|")})`, new RegExp(`^${t}$`);
}
function zr(a, t) {
  return !!((t === "v4" || !t) && Qr.test(a) || (t === "v6" || !t) && Br.test(a));
}
function Gr(a, t) {
  if (!Dr.test(a))
    return !1;
  try {
    const [e] = a.split("."), s = e.replace(/-/g, "+").replace(/_/g, "/").padEnd(e.length + (4 - e.length % 4) % 4, "="), i = JSON.parse(atob(s));
    return !(typeof i != "object" || i === null || !i.typ || !i.alg || t && i.alg !== t);
  } catch {
    return !1;
  }
}
function Jr(a, t) {
  return !!((t === "v4" || !t) && Vr.test(a) || (t === "v6" || !t) && qr.test(a));
}
class It extends st {
  _parse(t) {
    if (this._def.coerce && (t.data = String(t.data)), this._getType(t) !== D.string) {
      const n = this._getOrReturnCtx(t);
      return P(n, {
        code: I.invalid_type,
        expected: D.string,
        received: n.parsedType
      }), K;
    }
    const s = new xt();
    let i;
    for (const n of this._def.checks)
      if (n.kind === "min")
        t.data.length < n.value && (i = this._getOrReturnCtx(t, i), P(i, {
          code: I.too_small,
          minimum: n.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: n.message
        }), s.dirty());
      else if (n.kind === "max")
        t.data.length > n.value && (i = this._getOrReturnCtx(t, i), P(i, {
          code: I.too_big,
          maximum: n.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: n.message
        }), s.dirty());
      else if (n.kind === "length") {
        const r = t.data.length > n.value, o = t.data.length < n.value;
        (r || o) && (i = this._getOrReturnCtx(t, i), r ? P(i, {
          code: I.too_big,
          maximum: n.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: n.message
        }) : o && P(i, {
          code: I.too_small,
          minimum: n.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: n.message
        }), s.dirty());
      } else if (n.kind === "email")
        Rr.test(t.data) || (i = this._getOrReturnCtx(t, i), P(i, {
          validation: "email",
          code: I.invalid_string,
          message: n.message
        }), s.dirty());
      else if (n.kind === "emoji")
        ua || (ua = new RegExp(Zr, "u")), ua.test(t.data) || (i = this._getOrReturnCtx(t, i), P(i, {
          validation: "emoji",
          code: I.invalid_string,
          message: n.message
        }), s.dirty());
      else if (n.kind === "uuid")
        jr.test(t.data) || (i = this._getOrReturnCtx(t, i), P(i, {
          validation: "uuid",
          code: I.invalid_string,
          message: n.message
        }), s.dirty());
      else if (n.kind === "nanoid")
        Pr.test(t.data) || (i = this._getOrReturnCtx(t, i), P(i, {
          validation: "nanoid",
          code: I.invalid_string,
          message: n.message
        }), s.dirty());
      else if (n.kind === "cuid")
        Mr.test(t.data) || (i = this._getOrReturnCtx(t, i), P(i, {
          validation: "cuid",
          code: I.invalid_string,
          message: n.message
        }), s.dirty());
      else if (n.kind === "cuid2")
        Fr.test(t.data) || (i = this._getOrReturnCtx(t, i), P(i, {
          validation: "cuid2",
          code: I.invalid_string,
          message: n.message
        }), s.dirty());
      else if (n.kind === "ulid")
        Or.test(t.data) || (i = this._getOrReturnCtx(t, i), P(i, {
          validation: "ulid",
          code: I.invalid_string,
          message: n.message
        }), s.dirty());
      else if (n.kind === "url")
        try {
          new URL(t.data);
        } catch {
          i = this._getOrReturnCtx(t, i), P(i, {
            validation: "url",
            code: I.invalid_string,
            message: n.message
          }), s.dirty();
        }
      else n.kind === "regex" ? (n.regex.lastIndex = 0, n.regex.test(t.data) || (i = this._getOrReturnCtx(t, i), P(i, {
        validation: "regex",
        code: I.invalid_string,
        message: n.message
      }), s.dirty())) : n.kind === "trim" ? t.data = t.data.trim() : n.kind === "includes" ? t.data.includes(n.value, n.position) || (i = this._getOrReturnCtx(t, i), P(i, {
        code: I.invalid_string,
        validation: { includes: n.value, position: n.position },
        message: n.message
      }), s.dirty()) : n.kind === "toLowerCase" ? t.data = t.data.toLowerCase() : n.kind === "toUpperCase" ? t.data = t.data.toUpperCase() : n.kind === "startsWith" ? t.data.startsWith(n.value) || (i = this._getOrReturnCtx(t, i), P(i, {
        code: I.invalid_string,
        validation: { startsWith: n.value },
        message: n.message
      }), s.dirty()) : n.kind === "endsWith" ? t.data.endsWith(n.value) || (i = this._getOrReturnCtx(t, i), P(i, {
        code: I.invalid_string,
        validation: { endsWith: n.value },
        message: n.message
      }), s.dirty()) : n.kind === "datetime" ? tn(n).test(t.data) || (i = this._getOrReturnCtx(t, i), P(i, {
        code: I.invalid_string,
        validation: "datetime",
        message: n.message
      }), s.dirty()) : n.kind === "date" ? Yr.test(t.data) || (i = this._getOrReturnCtx(t, i), P(i, {
        code: I.invalid_string,
        validation: "date",
        message: n.message
      }), s.dirty()) : n.kind === "time" ? Kr(n).test(t.data) || (i = this._getOrReturnCtx(t, i), P(i, {
        code: I.invalid_string,
        validation: "time",
        message: n.message
      }), s.dirty()) : n.kind === "duration" ? Lr.test(t.data) || (i = this._getOrReturnCtx(t, i), P(i, {
        validation: "duration",
        code: I.invalid_string,
        message: n.message
      }), s.dirty()) : n.kind === "ip" ? zr(t.data, n.version) || (i = this._getOrReturnCtx(t, i), P(i, {
        validation: "ip",
        code: I.invalid_string,
        message: n.message
      }), s.dirty()) : n.kind === "jwt" ? Gr(t.data, n.alg) || (i = this._getOrReturnCtx(t, i), P(i, {
        validation: "jwt",
        code: I.invalid_string,
        message: n.message
      }), s.dirty()) : n.kind === "cidr" ? Jr(t.data, n.version) || (i = this._getOrReturnCtx(t, i), P(i, {
        validation: "cidr",
        code: I.invalid_string,
        message: n.message
      }), s.dirty()) : n.kind === "base64" ? Ur.test(t.data) || (i = this._getOrReturnCtx(t, i), P(i, {
        validation: "base64",
        code: I.invalid_string,
        message: n.message
      }), s.dirty()) : n.kind === "base64url" ? Xr.test(t.data) || (i = this._getOrReturnCtx(t, i), P(i, {
        validation: "base64url",
        code: I.invalid_string,
        message: n.message
      }), s.dirty()) : rt.assertNever(n);
    return { status: s.value, value: t.data };
  }
  _regex(t, e, s) {
    return this.refinement((i) => t.test(i), {
      validation: e,
      code: I.invalid_string,
      ...Q.errToObj(s)
    });
  }
  _addCheck(t) {
    return new It({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  email(t) {
    return this._addCheck({ kind: "email", ...Q.errToObj(t) });
  }
  url(t) {
    return this._addCheck({ kind: "url", ...Q.errToObj(t) });
  }
  emoji(t) {
    return this._addCheck({ kind: "emoji", ...Q.errToObj(t) });
  }
  uuid(t) {
    return this._addCheck({ kind: "uuid", ...Q.errToObj(t) });
  }
  nanoid(t) {
    return this._addCheck({ kind: "nanoid", ...Q.errToObj(t) });
  }
  cuid(t) {
    return this._addCheck({ kind: "cuid", ...Q.errToObj(t) });
  }
  cuid2(t) {
    return this._addCheck({ kind: "cuid2", ...Q.errToObj(t) });
  }
  ulid(t) {
    return this._addCheck({ kind: "ulid", ...Q.errToObj(t) });
  }
  base64(t) {
    return this._addCheck({ kind: "base64", ...Q.errToObj(t) });
  }
  base64url(t) {
    return this._addCheck({
      kind: "base64url",
      ...Q.errToObj(t)
    });
  }
  jwt(t) {
    return this._addCheck({ kind: "jwt", ...Q.errToObj(t) });
  }
  ip(t) {
    return this._addCheck({ kind: "ip", ...Q.errToObj(t) });
  }
  cidr(t) {
    return this._addCheck({ kind: "cidr", ...Q.errToObj(t) });
  }
  datetime(t) {
    var e, s;
    return typeof t == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: t
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (t == null ? void 0 : t.precision) > "u" ? null : t == null ? void 0 : t.precision,
      offset: (e = t == null ? void 0 : t.offset) !== null && e !== void 0 ? e : !1,
      local: (s = t == null ? void 0 : t.local) !== null && s !== void 0 ? s : !1,
      ...Q.errToObj(t == null ? void 0 : t.message)
    });
  }
  date(t) {
    return this._addCheck({ kind: "date", message: t });
  }
  time(t) {
    return typeof t == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: t
    }) : this._addCheck({
      kind: "time",
      precision: typeof (t == null ? void 0 : t.precision) > "u" ? null : t == null ? void 0 : t.precision,
      ...Q.errToObj(t == null ? void 0 : t.message)
    });
  }
  duration(t) {
    return this._addCheck({ kind: "duration", ...Q.errToObj(t) });
  }
  regex(t, e) {
    return this._addCheck({
      kind: "regex",
      regex: t,
      ...Q.errToObj(e)
    });
  }
  includes(t, e) {
    return this._addCheck({
      kind: "includes",
      value: t,
      position: e == null ? void 0 : e.position,
      ...Q.errToObj(e == null ? void 0 : e.message)
    });
  }
  startsWith(t, e) {
    return this._addCheck({
      kind: "startsWith",
      value: t,
      ...Q.errToObj(e)
    });
  }
  endsWith(t, e) {
    return this._addCheck({
      kind: "endsWith",
      value: t,
      ...Q.errToObj(e)
    });
  }
  min(t, e) {
    return this._addCheck({
      kind: "min",
      value: t,
      ...Q.errToObj(e)
    });
  }
  max(t, e) {
    return this._addCheck({
      kind: "max",
      value: t,
      ...Q.errToObj(e)
    });
  }
  length(t, e) {
    return this._addCheck({
      kind: "length",
      value: t,
      ...Q.errToObj(e)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(t) {
    return this.min(1, Q.errToObj(t));
  }
  trim() {
    return new It({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new It({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new It({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((t) => t.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((t) => t.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((t) => t.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((t) => t.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((t) => t.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((t) => t.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((t) => t.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((t) => t.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((t) => t.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((t) => t.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((t) => t.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((t) => t.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((t) => t.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((t) => t.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((t) => t.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((t) => t.kind === "base64url");
  }
  get minLength() {
    let t = null;
    for (const e of this._def.checks)
      e.kind === "min" && (t === null || e.value > t) && (t = e.value);
    return t;
  }
  get maxLength() {
    let t = null;
    for (const e of this._def.checks)
      e.kind === "max" && (t === null || e.value < t) && (t = e.value);
    return t;
  }
}
It.create = (a) => {
  var t;
  return new It({
    checks: [],
    typeName: Y.ZodString,
    coerce: (t = a == null ? void 0 : a.coerce) !== null && t !== void 0 ? t : !1,
    ...J(a)
  });
};
function Hr(a, t) {
  const e = (a.toString().split(".")[1] || "").length, s = (t.toString().split(".")[1] || "").length, i = e > s ? e : s, n = parseInt(a.toFixed(i).replace(".", "")), r = parseInt(t.toFixed(i).replace(".", ""));
  return n % r / Math.pow(10, i);
}
class se extends st {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(t) {
    if (this._def.coerce && (t.data = Number(t.data)), this._getType(t) !== D.number) {
      const n = this._getOrReturnCtx(t);
      return P(n, {
        code: I.invalid_type,
        expected: D.number,
        received: n.parsedType
      }), K;
    }
    let s;
    const i = new xt();
    for (const n of this._def.checks)
      n.kind === "int" ? rt.isInteger(t.data) || (s = this._getOrReturnCtx(t, s), P(s, {
        code: I.invalid_type,
        expected: "integer",
        received: "float",
        message: n.message
      }), i.dirty()) : n.kind === "min" ? (n.inclusive ? t.data < n.value : t.data <= n.value) && (s = this._getOrReturnCtx(t, s), P(s, {
        code: I.too_small,
        minimum: n.value,
        type: "number",
        inclusive: n.inclusive,
        exact: !1,
        message: n.message
      }), i.dirty()) : n.kind === "max" ? (n.inclusive ? t.data > n.value : t.data >= n.value) && (s = this._getOrReturnCtx(t, s), P(s, {
        code: I.too_big,
        maximum: n.value,
        type: "number",
        inclusive: n.inclusive,
        exact: !1,
        message: n.message
      }), i.dirty()) : n.kind === "multipleOf" ? Hr(t.data, n.value) !== 0 && (s = this._getOrReturnCtx(t, s), P(s, {
        code: I.not_multiple_of,
        multipleOf: n.value,
        message: n.message
      }), i.dirty()) : n.kind === "finite" ? Number.isFinite(t.data) || (s = this._getOrReturnCtx(t, s), P(s, {
        code: I.not_finite,
        message: n.message
      }), i.dirty()) : rt.assertNever(n);
    return { status: i.value, value: t.data };
  }
  gte(t, e) {
    return this.setLimit("min", t, !0, Q.toString(e));
  }
  gt(t, e) {
    return this.setLimit("min", t, !1, Q.toString(e));
  }
  lte(t, e) {
    return this.setLimit("max", t, !0, Q.toString(e));
  }
  lt(t, e) {
    return this.setLimit("max", t, !1, Q.toString(e));
  }
  setLimit(t, e, s, i) {
    return new se({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: t,
          value: e,
          inclusive: s,
          message: Q.toString(i)
        }
      ]
    });
  }
  _addCheck(t) {
    return new se({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  int(t) {
    return this._addCheck({
      kind: "int",
      message: Q.toString(t)
    });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: Q.toString(t)
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: Q.toString(t)
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: Q.toString(t)
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: Q.toString(t)
    });
  }
  multipleOf(t, e) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: Q.toString(e)
    });
  }
  finite(t) {
    return this._addCheck({
      kind: "finite",
      message: Q.toString(t)
    });
  }
  safe(t) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: Q.toString(t)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: Q.toString(t)
    });
  }
  get minValue() {
    let t = null;
    for (const e of this._def.checks)
      e.kind === "min" && (t === null || e.value > t) && (t = e.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const e of this._def.checks)
      e.kind === "max" && (t === null || e.value < t) && (t = e.value);
    return t;
  }
  get isInt() {
    return !!this._def.checks.find((t) => t.kind === "int" || t.kind === "multipleOf" && rt.isInteger(t.value));
  }
  get isFinite() {
    let t = null, e = null;
    for (const s of this._def.checks) {
      if (s.kind === "finite" || s.kind === "int" || s.kind === "multipleOf")
        return !0;
      s.kind === "min" ? (e === null || s.value > e) && (e = s.value) : s.kind === "max" && (t === null || s.value < t) && (t = s.value);
    }
    return Number.isFinite(e) && Number.isFinite(t);
  }
}
se.create = (a) => new se({
  checks: [],
  typeName: Y.ZodNumber,
  coerce: (a == null ? void 0 : a.coerce) || !1,
  ...J(a)
});
class ae extends st {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(t) {
    if (this._def.coerce)
      try {
        t.data = BigInt(t.data);
      } catch {
        return this._getInvalidInput(t);
      }
    if (this._getType(t) !== D.bigint)
      return this._getInvalidInput(t);
    let s;
    const i = new xt();
    for (const n of this._def.checks)
      n.kind === "min" ? (n.inclusive ? t.data < n.value : t.data <= n.value) && (s = this._getOrReturnCtx(t, s), P(s, {
        code: I.too_small,
        type: "bigint",
        minimum: n.value,
        inclusive: n.inclusive,
        message: n.message
      }), i.dirty()) : n.kind === "max" ? (n.inclusive ? t.data > n.value : t.data >= n.value) && (s = this._getOrReturnCtx(t, s), P(s, {
        code: I.too_big,
        type: "bigint",
        maximum: n.value,
        inclusive: n.inclusive,
        message: n.message
      }), i.dirty()) : n.kind === "multipleOf" ? t.data % n.value !== BigInt(0) && (s = this._getOrReturnCtx(t, s), P(s, {
        code: I.not_multiple_of,
        multipleOf: n.value,
        message: n.message
      }), i.dirty()) : rt.assertNever(n);
    return { status: i.value, value: t.data };
  }
  _getInvalidInput(t) {
    const e = this._getOrReturnCtx(t);
    return P(e, {
      code: I.invalid_type,
      expected: D.bigint,
      received: e.parsedType
    }), K;
  }
  gte(t, e) {
    return this.setLimit("min", t, !0, Q.toString(e));
  }
  gt(t, e) {
    return this.setLimit("min", t, !1, Q.toString(e));
  }
  lte(t, e) {
    return this.setLimit("max", t, !0, Q.toString(e));
  }
  lt(t, e) {
    return this.setLimit("max", t, !1, Q.toString(e));
  }
  setLimit(t, e, s, i) {
    return new ae({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: t,
          value: e,
          inclusive: s,
          message: Q.toString(i)
        }
      ]
    });
  }
  _addCheck(t) {
    return new ae({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: Q.toString(t)
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: Q.toString(t)
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: Q.toString(t)
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: Q.toString(t)
    });
  }
  multipleOf(t, e) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: Q.toString(e)
    });
  }
  get minValue() {
    let t = null;
    for (const e of this._def.checks)
      e.kind === "min" && (t === null || e.value > t) && (t = e.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const e of this._def.checks)
      e.kind === "max" && (t === null || e.value < t) && (t = e.value);
    return t;
  }
}
ae.create = (a) => {
  var t;
  return new ae({
    checks: [],
    typeName: Y.ZodBigInt,
    coerce: (t = a == null ? void 0 : a.coerce) !== null && t !== void 0 ? t : !1,
    ...J(a)
  });
};
class Je extends st {
  _parse(t) {
    if (this._def.coerce && (t.data = !!t.data), this._getType(t) !== D.boolean) {
      const s = this._getOrReturnCtx(t);
      return P(s, {
        code: I.invalid_type,
        expected: D.boolean,
        received: s.parsedType
      }), K;
    }
    return wt(t.data);
  }
}
Je.create = (a) => new Je({
  typeName: Y.ZodBoolean,
  coerce: (a == null ? void 0 : a.coerce) || !1,
  ...J(a)
});
class ge extends st {
  _parse(t) {
    if (this._def.coerce && (t.data = new Date(t.data)), this._getType(t) !== D.date) {
      const n = this._getOrReturnCtx(t);
      return P(n, {
        code: I.invalid_type,
        expected: D.date,
        received: n.parsedType
      }), K;
    }
    if (isNaN(t.data.getTime())) {
      const n = this._getOrReturnCtx(t);
      return P(n, {
        code: I.invalid_date
      }), K;
    }
    const s = new xt();
    let i;
    for (const n of this._def.checks)
      n.kind === "min" ? t.data.getTime() < n.value && (i = this._getOrReturnCtx(t, i), P(i, {
        code: I.too_small,
        message: n.message,
        inclusive: !0,
        exact: !1,
        minimum: n.value,
        type: "date"
      }), s.dirty()) : n.kind === "max" ? t.data.getTime() > n.value && (i = this._getOrReturnCtx(t, i), P(i, {
        code: I.too_big,
        message: n.message,
        inclusive: !0,
        exact: !1,
        maximum: n.value,
        type: "date"
      }), s.dirty()) : rt.assertNever(n);
    return {
      status: s.value,
      value: new Date(t.data.getTime())
    };
  }
  _addCheck(t) {
    return new ge({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  min(t, e) {
    return this._addCheck({
      kind: "min",
      value: t.getTime(),
      message: Q.toString(e)
    });
  }
  max(t, e) {
    return this._addCheck({
      kind: "max",
      value: t.getTime(),
      message: Q.toString(e)
    });
  }
  get minDate() {
    let t = null;
    for (const e of this._def.checks)
      e.kind === "min" && (t === null || e.value > t) && (t = e.value);
    return t != null ? new Date(t) : null;
  }
  get maxDate() {
    let t = null;
    for (const e of this._def.checks)
      e.kind === "max" && (t === null || e.value < t) && (t = e.value);
    return t != null ? new Date(t) : null;
  }
}
ge.create = (a) => new ge({
  checks: [],
  coerce: (a == null ? void 0 : a.coerce) || !1,
  typeName: Y.ZodDate,
  ...J(a)
});
class Vs extends st {
  _parse(t) {
    if (this._getType(t) !== D.symbol) {
      const s = this._getOrReturnCtx(t);
      return P(s, {
        code: I.invalid_type,
        expected: D.symbol,
        received: s.parsedType
      }), K;
    }
    return wt(t.data);
  }
}
Vs.create = (a) => new Vs({
  typeName: Y.ZodSymbol,
  ...J(a)
});
class He extends st {
  _parse(t) {
    if (this._getType(t) !== D.undefined) {
      const s = this._getOrReturnCtx(t);
      return P(s, {
        code: I.invalid_type,
        expected: D.undefined,
        received: s.parsedType
      }), K;
    }
    return wt(t.data);
  }
}
He.create = (a) => new He({
  typeName: Y.ZodUndefined,
  ...J(a)
});
class We extends st {
  _parse(t) {
    if (this._getType(t) !== D.null) {
      const s = this._getOrReturnCtx(t);
      return P(s, {
        code: I.invalid_type,
        expected: D.null,
        received: s.parsedType
      }), K;
    }
    return wt(t.data);
  }
}
We.create = (a) => new We({
  typeName: Y.ZodNull,
  ...J(a)
});
class Ie extends st {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(t) {
    return wt(t.data);
  }
}
Ie.create = (a) => new Ie({
  typeName: Y.ZodAny,
  ...J(a)
});
class fe extends st {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(t) {
    return wt(t.data);
  }
}
fe.create = (a) => new fe({
  typeName: Y.ZodUnknown,
  ...J(a)
});
class Kt extends st {
  _parse(t) {
    const e = this._getOrReturnCtx(t);
    return P(e, {
      code: I.invalid_type,
      expected: D.never,
      received: e.parsedType
    }), K;
  }
}
Kt.create = (a) => new Kt({
  typeName: Y.ZodNever,
  ...J(a)
});
class Bs extends st {
  _parse(t) {
    if (this._getType(t) !== D.undefined) {
      const s = this._getOrReturnCtx(t);
      return P(s, {
        code: I.invalid_type,
        expected: D.void,
        received: s.parsedType
      }), K;
    }
    return wt(t.data);
  }
}
Bs.create = (a) => new Bs({
  typeName: Y.ZodVoid,
  ...J(a)
});
class Nt extends st {
  _parse(t) {
    const { ctx: e, status: s } = this._processInputParams(t), i = this._def;
    if (e.parsedType !== D.array)
      return P(e, {
        code: I.invalid_type,
        expected: D.array,
        received: e.parsedType
      }), K;
    if (i.exactLength !== null) {
      const r = e.data.length > i.exactLength.value, o = e.data.length < i.exactLength.value;
      (r || o) && (P(e, {
        code: r ? I.too_big : I.too_small,
        minimum: o ? i.exactLength.value : void 0,
        maximum: r ? i.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: i.exactLength.message
      }), s.dirty());
    }
    if (i.minLength !== null && e.data.length < i.minLength.value && (P(e, {
      code: I.too_small,
      minimum: i.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: i.minLength.message
    }), s.dirty()), i.maxLength !== null && e.data.length > i.maxLength.value && (P(e, {
      code: I.too_big,
      maximum: i.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: i.maxLength.message
    }), s.dirty()), e.common.async)
      return Promise.all([...e.data].map((r, o) => i.type._parseAsync(new Rt(e, r, e.path, o)))).then((r) => xt.mergeArray(s, r));
    const n = [...e.data].map((r, o) => i.type._parseSync(new Rt(e, r, e.path, o)));
    return xt.mergeArray(s, n);
  }
  get element() {
    return this._def.type;
  }
  min(t, e) {
    return new Nt({
      ...this._def,
      minLength: { value: t, message: Q.toString(e) }
    });
  }
  max(t, e) {
    return new Nt({
      ...this._def,
      maxLength: { value: t, message: Q.toString(e) }
    });
  }
  length(t, e) {
    return new Nt({
      ...this._def,
      exactLength: { value: t, message: Q.toString(e) }
    });
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
Nt.create = (a, t) => new Nt({
  type: a,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: Y.ZodArray,
  ...J(t)
});
function ke(a) {
  if (a instanceof vt) {
    const t = {};
    for (const e in a.shape) {
      const s = a.shape[e];
      t[e] = Dt.create(ke(s));
    }
    return new vt({
      ...a._def,
      shape: () => t
    });
  } else return a instanceof Nt ? new Nt({
    ...a._def,
    type: ke(a.element)
  }) : a instanceof Dt ? Dt.create(ke(a.unwrap())) : a instanceof ne ? ne.create(ke(a.unwrap())) : a instanceof Zt ? Zt.create(a.items.map((t) => ke(t))) : a;
}
class vt extends st {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const t = this._def.shape(), e = rt.objectKeys(t);
    return this._cached = { shape: t, keys: e };
  }
  _parse(t) {
    if (this._getType(t) !== D.object) {
      const u = this._getOrReturnCtx(t);
      return P(u, {
        code: I.invalid_type,
        expected: D.object,
        received: u.parsedType
      }), K;
    }
    const { status: s, ctx: i } = this._processInputParams(t), { shape: n, keys: r } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof Kt && this._def.unknownKeys === "strip"))
      for (const u in i.data)
        r.includes(u) || o.push(u);
    const c = [];
    for (const u of r) {
      const d = n[u], _ = i.data[u];
      c.push({
        key: { status: "valid", value: u },
        value: d._parse(new Rt(i, _, i.path, u)),
        alwaysSet: u in i.data
      });
    }
    if (this._def.catchall instanceof Kt) {
      const u = this._def.unknownKeys;
      if (u === "passthrough")
        for (const d of o)
          c.push({
            key: { status: "valid", value: d },
            value: { status: "valid", value: i.data[d] }
          });
      else if (u === "strict")
        o.length > 0 && (P(i, {
          code: I.unrecognized_keys,
          keys: o
        }), s.dirty());
      else if (u !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const u = this._def.catchall;
      for (const d of o) {
        const _ = i.data[d];
        c.push({
          key: { status: "valid", value: d },
          value: u._parse(
            new Rt(i, _, i.path, d)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: d in i.data
        });
      }
    }
    return i.common.async ? Promise.resolve().then(async () => {
      const u = [];
      for (const d of c) {
        const _ = await d.key, l = await d.value;
        u.push({
          key: _,
          value: l,
          alwaysSet: d.alwaysSet
        });
      }
      return u;
    }).then((u) => xt.mergeObjectSync(s, u)) : xt.mergeObjectSync(s, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(t) {
    return Q.errToObj, new vt({
      ...this._def,
      unknownKeys: "strict",
      ...t !== void 0 ? {
        errorMap: (e, s) => {
          var i, n, r, o;
          const c = (r = (n = (i = this._def).errorMap) === null || n === void 0 ? void 0 : n.call(i, e, s).message) !== null && r !== void 0 ? r : s.defaultError;
          return e.code === "unrecognized_keys" ? {
            message: (o = Q.errToObj(t).message) !== null && o !== void 0 ? o : c
          } : {
            message: c
          };
        }
      } : {}
    });
  }
  strip() {
    return new vt({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new vt({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(t) {
    return new vt({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...t
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(t) {
    return new vt({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...t._def.shape()
      }),
      typeName: Y.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(t, e) {
    return this.augment({ [t]: e });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(t) {
    return new vt({
      ...this._def,
      catchall: t
    });
  }
  pick(t) {
    const e = {};
    return rt.objectKeys(t).forEach((s) => {
      t[s] && this.shape[s] && (e[s] = this.shape[s]);
    }), new vt({
      ...this._def,
      shape: () => e
    });
  }
  omit(t) {
    const e = {};
    return rt.objectKeys(this.shape).forEach((s) => {
      t[s] || (e[s] = this.shape[s]);
    }), new vt({
      ...this._def,
      shape: () => e
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return ke(this);
  }
  partial(t) {
    const e = {};
    return rt.objectKeys(this.shape).forEach((s) => {
      const i = this.shape[s];
      t && !t[s] ? e[s] = i : e[s] = i.optional();
    }), new vt({
      ...this._def,
      shape: () => e
    });
  }
  required(t) {
    const e = {};
    return rt.objectKeys(this.shape).forEach((s) => {
      if (t && !t[s])
        e[s] = this.shape[s];
      else {
        let n = this.shape[s];
        for (; n instanceof Dt; )
          n = n._def.innerType;
        e[s] = n;
      }
    }), new vt({
      ...this._def,
      shape: () => e
    });
  }
  keyof() {
    return en(rt.objectKeys(this.shape));
  }
}
vt.create = (a, t) => new vt({
  shape: () => a,
  unknownKeys: "strip",
  catchall: Kt.create(),
  typeName: Y.ZodObject,
  ...J(t)
});
vt.strictCreate = (a, t) => new vt({
  shape: () => a,
  unknownKeys: "strict",
  catchall: Kt.create(),
  typeName: Y.ZodObject,
  ...J(t)
});
vt.lazycreate = (a, t) => new vt({
  shape: a,
  unknownKeys: "strip",
  catchall: Kt.create(),
  typeName: Y.ZodObject,
  ...J(t)
});
class $e extends st {
  _parse(t) {
    const { ctx: e } = this._processInputParams(t), s = this._def.options;
    function i(n) {
      for (const o of n)
        if (o.result.status === "valid")
          return o.result;
      for (const o of n)
        if (o.result.status === "dirty")
          return e.common.issues.push(...o.ctx.common.issues), o.result;
      const r = n.map((o) => new Et(o.ctx.common.issues));
      return P(e, {
        code: I.invalid_union,
        unionErrors: r
      }), K;
    }
    if (e.common.async)
      return Promise.all(s.map(async (n) => {
        const r = {
          ...e,
          common: {
            ...e.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await n._parseAsync({
            data: e.data,
            path: e.path,
            parent: r
          }),
          ctx: r
        };
      })).then(i);
    {
      let n;
      const r = [];
      for (const c of s) {
        const u = {
          ...e,
          common: {
            ...e.common,
            issues: []
          },
          parent: null
        }, d = c._parseSync({
          data: e.data,
          path: e.path,
          parent: u
        });
        if (d.status === "valid")
          return d;
        d.status === "dirty" && !n && (n = { result: d, ctx: u }), u.common.issues.length && r.push(u.common.issues);
      }
      if (n)
        return e.common.issues.push(...n.ctx.common.issues), n.result;
      const o = r.map((c) => new Et(c));
      return P(e, {
        code: I.invalid_union,
        unionErrors: o
      }), K;
    }
  }
  get options() {
    return this._def.options;
  }
}
$e.create = (a, t) => new $e({
  options: a,
  typeName: Y.ZodUnion,
  ...J(t)
});
const Ut = (a) => a instanceof ss ? Ut(a.schema) : a instanceof Tt ? Ut(a.innerType()) : a instanceof as ? [a.value] : a instanceof ie ? a.options : a instanceof is ? rt.objectValues(a.enum) : a instanceof ns ? Ut(a._def.innerType) : a instanceof He ? [void 0] : a instanceof We ? [null] : a instanceof Dt ? [void 0, ...Ut(a.unwrap())] : a instanceof ne ? [null, ...Ut(a.unwrap())] : a instanceof Va || a instanceof os ? Ut(a.unwrap()) : a instanceof rs ? Ut(a._def.innerType) : [];
class $s extends st {
  _parse(t) {
    const { ctx: e } = this._processInputParams(t);
    if (e.parsedType !== D.object)
      return P(e, {
        code: I.invalid_type,
        expected: D.object,
        received: e.parsedType
      }), K;
    const s = this.discriminator, i = e.data[s], n = this.optionsMap.get(i);
    return n ? e.common.async ? n._parseAsync({
      data: e.data,
      path: e.path,
      parent: e
    }) : n._parseSync({
      data: e.data,
      path: e.path,
      parent: e
    }) : (P(e, {
      code: I.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [s]
    }), K);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(t, e, s) {
    const i = /* @__PURE__ */ new Map();
    for (const n of e) {
      const r = Ut(n.shape[t]);
      if (!r.length)
        throw new Error(`A discriminator value for key \`${t}\` could not be extracted from all schema options`);
      for (const o of r) {
        if (i.has(o))
          throw new Error(`Discriminator property ${String(t)} has duplicate value ${String(o)}`);
        i.set(o, n);
      }
    }
    return new $s({
      typeName: Y.ZodDiscriminatedUnion,
      discriminator: t,
      options: e,
      optionsMap: i,
      ...J(s)
    });
  }
}
function xa(a, t) {
  const e = Yt(a), s = Yt(t);
  if (a === t)
    return { valid: !0, data: a };
  if (e === D.object && s === D.object) {
    const i = rt.objectKeys(t), n = rt.objectKeys(a).filter((o) => i.indexOf(o) !== -1), r = { ...a, ...t };
    for (const o of n) {
      const c = xa(a[o], t[o]);
      if (!c.valid)
        return { valid: !1 };
      r[o] = c.data;
    }
    return { valid: !0, data: r };
  } else if (e === D.array && s === D.array) {
    if (a.length !== t.length)
      return { valid: !1 };
    const i = [];
    for (let n = 0; n < a.length; n++) {
      const r = a[n], o = t[n], c = xa(r, o);
      if (!c.valid)
        return { valid: !1 };
      i.push(c.data);
    }
    return { valid: !0, data: i };
  } else return e === D.date && s === D.date && +a == +t ? { valid: !0, data: a } : { valid: !1 };
}
class ts extends st {
  _parse(t) {
    const { status: e, ctx: s } = this._processInputParams(t), i = (n, r) => {
      if (ba(n) || ba(r))
        return K;
      const o = xa(n.value, r.value);
      return o.valid ? ((ya(n) || ya(r)) && e.dirty(), { status: e.value, value: o.data }) : (P(s, {
        code: I.invalid_intersection_types
      }), K);
    };
    return s.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      }),
      this._def.right._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      })
    ]).then(([n, r]) => i(n, r)) : i(this._def.left._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }), this._def.right._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }));
  }
}
ts.create = (a, t, e) => new ts({
  left: a,
  right: t,
  typeName: Y.ZodIntersection,
  ...J(e)
});
class Zt extends st {
  _parse(t) {
    const { status: e, ctx: s } = this._processInputParams(t);
    if (s.parsedType !== D.array)
      return P(s, {
        code: I.invalid_type,
        expected: D.array,
        received: s.parsedType
      }), K;
    if (s.data.length < this._def.items.length)
      return P(s, {
        code: I.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), K;
    !this._def.rest && s.data.length > this._def.items.length && (P(s, {
      code: I.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), e.dirty());
    const n = [...s.data].map((r, o) => {
      const c = this._def.items[o] || this._def.rest;
      return c ? c._parse(new Rt(s, r, s.path, o)) : null;
    }).filter((r) => !!r);
    return s.common.async ? Promise.all(n).then((r) => xt.mergeArray(e, r)) : xt.mergeArray(e, n);
  }
  get items() {
    return this._def.items;
  }
  rest(t) {
    return new Zt({
      ...this._def,
      rest: t
    });
  }
}
Zt.create = (a, t) => {
  if (!Array.isArray(a))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Zt({
    items: a,
    typeName: Y.ZodTuple,
    rest: null,
    ...J(t)
  });
};
class es extends st {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: e, ctx: s } = this._processInputParams(t);
    if (s.parsedType !== D.object)
      return P(s, {
        code: I.invalid_type,
        expected: D.object,
        received: s.parsedType
      }), K;
    const i = [], n = this._def.keyType, r = this._def.valueType;
    for (const o in s.data)
      i.push({
        key: n._parse(new Rt(s, o, s.path, o)),
        value: r._parse(new Rt(s, s.data[o], s.path, o)),
        alwaysSet: o in s.data
      });
    return s.common.async ? xt.mergeObjectAsync(e, i) : xt.mergeObjectSync(e, i);
  }
  get element() {
    return this._def.valueType;
  }
  static create(t, e, s) {
    return e instanceof st ? new es({
      keyType: t,
      valueType: e,
      typeName: Y.ZodRecord,
      ...J(s)
    }) : new es({
      keyType: It.create(),
      valueType: t,
      typeName: Y.ZodRecord,
      ...J(e)
    });
  }
}
class qs extends st {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: e, ctx: s } = this._processInputParams(t);
    if (s.parsedType !== D.map)
      return P(s, {
        code: I.invalid_type,
        expected: D.map,
        received: s.parsedType
      }), K;
    const i = this._def.keyType, n = this._def.valueType, r = [...s.data.entries()].map(([o, c], u) => ({
      key: i._parse(new Rt(s, o, s.path, [u, "key"])),
      value: n._parse(new Rt(s, c, s.path, [u, "value"]))
    }));
    if (s.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const c of r) {
          const u = await c.key, d = await c.value;
          if (u.status === "aborted" || d.status === "aborted")
            return K;
          (u.status === "dirty" || d.status === "dirty") && e.dirty(), o.set(u.value, d.value);
        }
        return { status: e.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const c of r) {
        const u = c.key, d = c.value;
        if (u.status === "aborted" || d.status === "aborted")
          return K;
        (u.status === "dirty" || d.status === "dirty") && e.dirty(), o.set(u.value, d.value);
      }
      return { status: e.value, value: o };
    }
  }
}
qs.create = (a, t, e) => new qs({
  valueType: t,
  keyType: a,
  typeName: Y.ZodMap,
  ...J(e)
});
class he extends st {
  _parse(t) {
    const { status: e, ctx: s } = this._processInputParams(t);
    if (s.parsedType !== D.set)
      return P(s, {
        code: I.invalid_type,
        expected: D.set,
        received: s.parsedType
      }), K;
    const i = this._def;
    i.minSize !== null && s.data.size < i.minSize.value && (P(s, {
      code: I.too_small,
      minimum: i.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: i.minSize.message
    }), e.dirty()), i.maxSize !== null && s.data.size > i.maxSize.value && (P(s, {
      code: I.too_big,
      maximum: i.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: i.maxSize.message
    }), e.dirty());
    const n = this._def.valueType;
    function r(c) {
      const u = /* @__PURE__ */ new Set();
      for (const d of c) {
        if (d.status === "aborted")
          return K;
        d.status === "dirty" && e.dirty(), u.add(d.value);
      }
      return { status: e.value, value: u };
    }
    const o = [...s.data.values()].map((c, u) => n._parse(new Rt(s, c, s.path, u)));
    return s.common.async ? Promise.all(o).then((c) => r(c)) : r(o);
  }
  min(t, e) {
    return new he({
      ...this._def,
      minSize: { value: t, message: Q.toString(e) }
    });
  }
  max(t, e) {
    return new he({
      ...this._def,
      maxSize: { value: t, message: Q.toString(e) }
    });
  }
  size(t, e) {
    return this.min(t, e).max(t, e);
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
he.create = (a, t) => new he({
  valueType: a,
  minSize: null,
  maxSize: null,
  typeName: Y.ZodSet,
  ...J(t)
});
class Ee extends st {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(t) {
    const { ctx: e } = this._processInputParams(t);
    if (e.parsedType !== D.function)
      return P(e, {
        code: I.invalid_type,
        expected: D.function,
        received: e.parsedType
      }), K;
    function s(o, c) {
      return Zs({
        data: o,
        path: e.path,
        errorMaps: [
          e.common.contextualErrorMap,
          e.schemaErrorMap,
          Rs(),
          Ce
        ].filter((u) => !!u),
        issueData: {
          code: I.invalid_arguments,
          argumentsError: c
        }
      });
    }
    function i(o, c) {
      return Zs({
        data: o,
        path: e.path,
        errorMaps: [
          e.common.contextualErrorMap,
          e.schemaErrorMap,
          Rs(),
          Ce
        ].filter((u) => !!u),
        issueData: {
          code: I.invalid_return_type,
          returnTypeError: c
        }
      });
    }
    const n = { errorMap: e.common.contextualErrorMap }, r = e.data;
    if (this._def.returns instanceof Ne) {
      const o = this;
      return wt(async function(...c) {
        const u = new Et([]), d = await o._def.args.parseAsync(c, n).catch((f) => {
          throw u.addIssue(s(c, f)), u;
        }), _ = await Reflect.apply(r, this, d);
        return await o._def.returns._def.type.parseAsync(_, n).catch((f) => {
          throw u.addIssue(i(_, f)), u;
        });
      });
    } else {
      const o = this;
      return wt(function(...c) {
        const u = o._def.args.safeParse(c, n);
        if (!u.success)
          throw new Et([s(c, u.error)]);
        const d = Reflect.apply(r, this, u.data), _ = o._def.returns.safeParse(d, n);
        if (!_.success)
          throw new Et([i(d, _.error)]);
        return _.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...t) {
    return new Ee({
      ...this._def,
      args: Zt.create(t).rest(fe.create())
    });
  }
  returns(t) {
    return new Ee({
      ...this._def,
      returns: t
    });
  }
  implement(t) {
    return this.parse(t);
  }
  strictImplement(t) {
    return this.parse(t);
  }
  static create(t, e, s) {
    return new Ee({
      args: t || Zt.create([]).rest(fe.create()),
      returns: e || fe.create(),
      typeName: Y.ZodFunction,
      ...J(s)
    });
  }
}
class ss extends st {
  get schema() {
    return this._def.getter();
  }
  _parse(t) {
    const { ctx: e } = this._processInputParams(t);
    return this._def.getter()._parse({ data: e.data, path: e.path, parent: e });
  }
}
ss.create = (a, t) => new ss({
  getter: a,
  typeName: Y.ZodLazy,
  ...J(t)
});
class as extends st {
  _parse(t) {
    if (t.data !== this._def.value) {
      const e = this._getOrReturnCtx(t);
      return P(e, {
        received: e.data,
        code: I.invalid_literal,
        expected: this._def.value
      }), K;
    }
    return { status: "valid", value: t.data };
  }
  get value() {
    return this._def.value;
  }
}
as.create = (a, t) => new as({
  value: a,
  typeName: Y.ZodLiteral,
  ...J(t)
});
function en(a, t) {
  return new ie({
    values: a,
    typeName: Y.ZodEnum,
    ...J(t)
  });
}
class ie extends st {
  constructor() {
    super(...arguments), Xe.set(this, void 0);
  }
  _parse(t) {
    if (typeof t.data != "string") {
      const e = this._getOrReturnCtx(t), s = this._def.values;
      return P(e, {
        expected: rt.joinValues(s),
        received: e.parsedType,
        code: I.invalid_type
      }), K;
    }
    if (Qs(this, Xe) || Hi(this, Xe, new Set(this._def.values)), !Qs(this, Xe).has(t.data)) {
      const e = this._getOrReturnCtx(t), s = this._def.values;
      return P(e, {
        received: e.data,
        code: I.invalid_enum_value,
        options: s
      }), K;
    }
    return wt(t.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const t = {};
    for (const e of this._def.values)
      t[e] = e;
    return t;
  }
  get Values() {
    const t = {};
    for (const e of this._def.values)
      t[e] = e;
    return t;
  }
  get Enum() {
    const t = {};
    for (const e of this._def.values)
      t[e] = e;
    return t;
  }
  extract(t, e = this._def) {
    return ie.create(t, {
      ...this._def,
      ...e
    });
  }
  exclude(t, e = this._def) {
    return ie.create(this.options.filter((s) => !t.includes(s)), {
      ...this._def,
      ...e
    });
  }
}
Xe = /* @__PURE__ */ new WeakMap();
ie.create = en;
class is extends st {
  constructor() {
    super(...arguments), Ye.set(this, void 0);
  }
  _parse(t) {
    const e = rt.getValidEnumValues(this._def.values), s = this._getOrReturnCtx(t);
    if (s.parsedType !== D.string && s.parsedType !== D.number) {
      const i = rt.objectValues(e);
      return P(s, {
        expected: rt.joinValues(i),
        received: s.parsedType,
        code: I.invalid_type
      }), K;
    }
    if (Qs(this, Ye) || Hi(this, Ye, new Set(rt.getValidEnumValues(this._def.values))), !Qs(this, Ye).has(t.data)) {
      const i = rt.objectValues(e);
      return P(s, {
        received: s.data,
        code: I.invalid_enum_value,
        options: i
      }), K;
    }
    return wt(t.data);
  }
  get enum() {
    return this._def.values;
  }
}
Ye = /* @__PURE__ */ new WeakMap();
is.create = (a, t) => new is({
  values: a,
  typeName: Y.ZodNativeEnum,
  ...J(t)
});
class Ne extends st {
  unwrap() {
    return this._def.type;
  }
  _parse(t) {
    const { ctx: e } = this._processInputParams(t);
    if (e.parsedType !== D.promise && e.common.async === !1)
      return P(e, {
        code: I.invalid_type,
        expected: D.promise,
        received: e.parsedType
      }), K;
    const s = e.parsedType === D.promise ? e.data : Promise.resolve(e.data);
    return wt(s.then((i) => this._def.type.parseAsync(i, {
      path: e.path,
      errorMap: e.common.contextualErrorMap
    })));
  }
}
Ne.create = (a, t) => new Ne({
  type: a,
  typeName: Y.ZodPromise,
  ...J(t)
});
class Tt extends st {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === Y.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(t) {
    const { status: e, ctx: s } = this._processInputParams(t), i = this._def.effect || null, n = {
      addIssue: (r) => {
        P(s, r), r.fatal ? e.abort() : e.dirty();
      },
      get path() {
        return s.path;
      }
    };
    if (n.addIssue = n.addIssue.bind(n), i.type === "preprocess") {
      const r = i.transform(s.data, n);
      if (s.common.async)
        return Promise.resolve(r).then(async (o) => {
          if (e.value === "aborted")
            return K;
          const c = await this._def.schema._parseAsync({
            data: o,
            path: s.path,
            parent: s
          });
          return c.status === "aborted" ? K : c.status === "dirty" || e.value === "dirty" ? _e(c.value) : c;
        });
      {
        if (e.value === "aborted")
          return K;
        const o = this._def.schema._parseSync({
          data: r,
          path: s.path,
          parent: s
        });
        return o.status === "aborted" ? K : o.status === "dirty" || e.value === "dirty" ? _e(o.value) : o;
      }
    }
    if (i.type === "refinement") {
      const r = (o) => {
        const c = i.refinement(o, n);
        if (s.common.async)
          return Promise.resolve(c);
        if (c instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (s.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return o.status === "aborted" ? K : (o.status === "dirty" && e.dirty(), r(o.value), { status: e.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((o) => o.status === "aborted" ? K : (o.status === "dirty" && e.dirty(), r(o.value).then(() => ({ status: e.value, value: o.value }))));
    }
    if (i.type === "transform")
      if (s.common.async === !1) {
        const r = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        if (!de(r))
          return r;
        const o = i.transform(r.value, n);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: e.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((r) => de(r) ? Promise.resolve(i.transform(r.value, n)).then((o) => ({ status: e.value, value: o })) : r);
    rt.assertNever(i);
  }
}
Tt.create = (a, t, e) => new Tt({
  schema: a,
  typeName: Y.ZodEffects,
  effect: t,
  ...J(e)
});
Tt.createWithPreprocess = (a, t, e) => new Tt({
  schema: t,
  effect: { type: "preprocess", transform: a },
  typeName: Y.ZodEffects,
  ...J(e)
});
class Dt extends st {
  _parse(t) {
    return this._getType(t) === D.undefined ? wt(void 0) : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Dt.create = (a, t) => new Dt({
  innerType: a,
  typeName: Y.ZodOptional,
  ...J(t)
});
class ne extends st {
  _parse(t) {
    return this._getType(t) === D.null ? wt(null) : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ne.create = (a, t) => new ne({
  innerType: a,
  typeName: Y.ZodNullable,
  ...J(t)
});
class ns extends st {
  _parse(t) {
    const { ctx: e } = this._processInputParams(t);
    let s = e.data;
    return e.parsedType === D.undefined && (s = this._def.defaultValue()), this._def.innerType._parse({
      data: s,
      path: e.path,
      parent: e
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ns.create = (a, t) => new ns({
  innerType: a,
  typeName: Y.ZodDefault,
  defaultValue: typeof t.default == "function" ? t.default : () => t.default,
  ...J(t)
});
class rs extends st {
  _parse(t) {
    const { ctx: e } = this._processInputParams(t), s = {
      ...e,
      common: {
        ...e.common,
        issues: []
      }
    }, i = this._def.innerType._parse({
      data: s.data,
      path: s.path,
      parent: {
        ...s
      }
    });
    return Ge(i) ? i.then((n) => ({
      status: "valid",
      value: n.status === "valid" ? n.value : this._def.catchValue({
        get error() {
          return new Et(s.common.issues);
        },
        input: s.data
      })
    })) : {
      status: "valid",
      value: i.status === "valid" ? i.value : this._def.catchValue({
        get error() {
          return new Et(s.common.issues);
        },
        input: s.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
rs.create = (a, t) => new rs({
  innerType: a,
  typeName: Y.ZodCatch,
  catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
  ...J(t)
});
class Us extends st {
  _parse(t) {
    if (this._getType(t) !== D.nan) {
      const s = this._getOrReturnCtx(t);
      return P(s, {
        code: I.invalid_type,
        expected: D.nan,
        received: s.parsedType
      }), K;
    }
    return { status: "valid", value: t.data };
  }
}
Us.create = (a) => new Us({
  typeName: Y.ZodNaN,
  ...J(a)
});
const Wr = Symbol("zod_brand");
class Va extends st {
  _parse(t) {
    const { ctx: e } = this._processInputParams(t), s = e.data;
    return this._def.type._parse({
      data: s,
      path: e.path,
      parent: e
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ms extends st {
  _parse(t) {
    const { status: e, ctx: s } = this._processInputParams(t);
    if (s.common.async)
      return (async () => {
        const n = await this._def.in._parseAsync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return n.status === "aborted" ? K : n.status === "dirty" ? (e.dirty(), _e(n.value)) : this._def.out._parseAsync({
          data: n.value,
          path: s.path,
          parent: s
        });
      })();
    {
      const i = this._def.in._parseSync({
        data: s.data,
        path: s.path,
        parent: s
      });
      return i.status === "aborted" ? K : i.status === "dirty" ? (e.dirty(), {
        status: "dirty",
        value: i.value
      }) : this._def.out._parseSync({
        data: i.value,
        path: s.path,
        parent: s
      });
    }
  }
  static create(t, e) {
    return new ms({
      in: t,
      out: e,
      typeName: Y.ZodPipeline
    });
  }
}
class os extends st {
  _parse(t) {
    const e = this._def.innerType._parse(t), s = (i) => (de(i) && (i.value = Object.freeze(i.value)), i);
    return Ge(e) ? e.then((i) => s(i)) : s(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
os.create = (a, t) => new os({
  innerType: a,
  typeName: Y.ZodReadonly,
  ...J(t)
});
function sn(a, t = {}, e) {
  return a ? Ie.create().superRefine((s, i) => {
    var n, r;
    if (!a(s)) {
      const o = typeof t == "function" ? t(s) : typeof t == "string" ? { message: t } : t, c = (r = (n = o.fatal) !== null && n !== void 0 ? n : e) !== null && r !== void 0 ? r : !0, u = typeof o == "string" ? { message: o } : o;
      i.addIssue({ code: "custom", ...u, fatal: c });
    }
  }) : Ie.create();
}
const $r = {
  object: vt.lazycreate
};
var Y;
(function(a) {
  a.ZodString = "ZodString", a.ZodNumber = "ZodNumber", a.ZodNaN = "ZodNaN", a.ZodBigInt = "ZodBigInt", a.ZodBoolean = "ZodBoolean", a.ZodDate = "ZodDate", a.ZodSymbol = "ZodSymbol", a.ZodUndefined = "ZodUndefined", a.ZodNull = "ZodNull", a.ZodAny = "ZodAny", a.ZodUnknown = "ZodUnknown", a.ZodNever = "ZodNever", a.ZodVoid = "ZodVoid", a.ZodArray = "ZodArray", a.ZodObject = "ZodObject", a.ZodUnion = "ZodUnion", a.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", a.ZodIntersection = "ZodIntersection", a.ZodTuple = "ZodTuple", a.ZodRecord = "ZodRecord", a.ZodMap = "ZodMap", a.ZodSet = "ZodSet", a.ZodFunction = "ZodFunction", a.ZodLazy = "ZodLazy", a.ZodLiteral = "ZodLiteral", a.ZodEnum = "ZodEnum", a.ZodEffects = "ZodEffects", a.ZodNativeEnum = "ZodNativeEnum", a.ZodOptional = "ZodOptional", a.ZodNullable = "ZodNullable", a.ZodDefault = "ZodDefault", a.ZodCatch = "ZodCatch", a.ZodPromise = "ZodPromise", a.ZodBranded = "ZodBranded", a.ZodPipeline = "ZodPipeline", a.ZodReadonly = "ZodReadonly";
})(Y || (Y = {}));
const to = (a, t = {
  message: `Input not instance of ${a.name}`
}) => sn((e) => e instanceof a, t), an = It.create, nn = se.create, eo = Us.create, so = ae.create, rn = Je.create, ao = ge.create, io = Vs.create, no = He.create, ro = We.create, oo = Ie.create, co = fe.create, uo = Kt.create, lo = Bs.create, fo = Nt.create, go = vt.create, ho = vt.strictCreate, po = $e.create, mo = $s.create, vo = ts.create, bo = Zt.create, yo = es.create, xo = qs.create, wo = he.create, ko = Ee.create, _o = ss.create, Ao = as.create, Eo = ie.create, So = is.create, Co = Ne.create, di = Tt.create, Io = Dt.create, No = ne.create, To = Tt.createWithPreprocess, Mo = ms.create, Fo = () => an().optional(), Oo = () => nn().optional(), jo = () => rn().optional(), Po = {
  string: (a) => It.create({ ...a, coerce: !0 }),
  number: (a) => se.create({ ...a, coerce: !0 }),
  boolean: (a) => Je.create({
    ...a,
    coerce: !0
  }),
  bigint: (a) => ae.create({ ...a, coerce: !0 }),
  date: (a) => ge.create({ ...a, coerce: !0 })
}, Do = K;
var la = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: Ce,
  setErrorMap: Nr,
  getErrorMap: Rs,
  makeIssue: Zs,
  EMPTY_PATH: Tr,
  addIssueToContext: P,
  ParseStatus: xt,
  INVALID: K,
  DIRTY: _e,
  OK: wt,
  isAborted: ba,
  isDirty: ya,
  isValid: de,
  isAsync: Ge,
  get util() {
    return rt;
  },
  get objectUtil() {
    return va;
  },
  ZodParsedType: D,
  getParsedType: Yt,
  ZodType: st,
  datetimeRegex: tn,
  ZodString: It,
  ZodNumber: se,
  ZodBigInt: ae,
  ZodBoolean: Je,
  ZodDate: ge,
  ZodSymbol: Vs,
  ZodUndefined: He,
  ZodNull: We,
  ZodAny: Ie,
  ZodUnknown: fe,
  ZodNever: Kt,
  ZodVoid: Bs,
  ZodArray: Nt,
  ZodObject: vt,
  ZodUnion: $e,
  ZodDiscriminatedUnion: $s,
  ZodIntersection: ts,
  ZodTuple: Zt,
  ZodRecord: es,
  ZodMap: qs,
  ZodSet: he,
  ZodFunction: Ee,
  ZodLazy: ss,
  ZodLiteral: as,
  ZodEnum: ie,
  ZodNativeEnum: is,
  ZodPromise: Ne,
  ZodEffects: Tt,
  ZodTransformer: Tt,
  ZodOptional: Dt,
  ZodNullable: ne,
  ZodDefault: ns,
  ZodCatch: rs,
  ZodNaN: Us,
  BRAND: Wr,
  ZodBranded: Va,
  ZodPipeline: ms,
  ZodReadonly: os,
  custom: sn,
  Schema: st,
  ZodSchema: st,
  late: $r,
  get ZodFirstPartyTypeKind() {
    return Y;
  },
  coerce: Po,
  any: oo,
  array: fo,
  bigint: so,
  boolean: rn,
  date: ao,
  discriminatedUnion: mo,
  effect: di,
  enum: Eo,
  function: ko,
  instanceof: to,
  intersection: vo,
  lazy: _o,
  literal: Ao,
  map: xo,
  nan: eo,
  nativeEnum: So,
  never: uo,
  null: ro,
  nullable: No,
  number: nn,
  object: go,
  oboolean: jo,
  onumber: Oo,
  optional: Io,
  ostring: Fo,
  pipeline: Mo,
  preprocess: To,
  promise: Co,
  record: yo,
  set: wo,
  strictObject: ho,
  string: an,
  symbol: io,
  transformer: di,
  tuple: bo,
  undefined: no,
  union: po,
  unknown: co,
  void: lo,
  NEVER: Do,
  ZodIssueCode: I,
  quotelessJson: Ir,
  ZodError: Et
});
const $l = la.union([la.date(), la.string().datetime()]).transform((a) => typeof a == "string" ? ue(a).toDate() : a), tf = (a, t, e, s = !0) => !a[e] || !t[e] || !(a[e] instanceof Date) || !(t[e] instanceof Date) || ue(a[e]).isSame(ue(t[e])) ? 0 : s ? ue(a[e]).isBefore(ue(t[e])) ? 1 : -1 : ue(a[e]).isBefore(ue(t[e])) ? -1 : 1, Lo = (a, t) => {
  if (typeof a != "object" || a === null)
    return a;
  const e = Object.keys(a);
  if (e.length === 0)
    return a;
  for (const s of e) {
    let i = a[s];
    if (t.includes(s) && typeof i == "string") {
      const n = new Date(i);
      Number.isNaN(n.getTime()) || (i = n);
    }
    a[s] = Lo(i, t);
  }
  return a;
};
var Ro = /* @__PURE__ */ ((a) => (a.InvalidCredentials = "InvalidCredentials", a.UserAlreadyExists = "UserAlreadyExists", a.SecretsNotFound = "SecretsNotFound", a.OAuthUser = "OAuthUser", a.InvalidResetToken = "InvalidResetToken", a.InvalidVerificationToken = "InvalidVerificationToken", a.EmailAlreadyVerified = "EmailAlreadyVerified", a.TwoFactorNotEnabled = "TwoFactorNotEnabled", a.TwoFactorAlreadyEnabled = "TwoFactorAlreadyEnabled", a.InvalidTwoFactorCode = "InvalidTwoFactorCode", a.InvalidTwoFactorBackupCode = "InvalidTwoFactorBackupCode", a.InvalidBrowserConnection = "InvalidBrowserConnection", a.ResumeSlugAlreadyExists = "ResumeSlugAlreadyExists", a.ResumeNotFound = "ResumeNotFound", a.ResumeLocked = "ResumeLocked", a.ResumePrinterError = "ResumePrinterError", a.ResumePreviewError = "ResumePreviewError", a.SomethingWentWrong = "SomethingWentWrong", a))(Ro || {});
const Zo = [
  {
    family: "Roboto",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "700",
      "700italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1MmgWxPKTM1K9nz.ttf",
      300: "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5vAx05IsDqlA.ttf",
      500: "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9vAx05IsDqlA.ttf",
      700: "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf",
      900: "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmYUtvAx05IsDqlA.ttf",
      "100italic": "http://fonts.gstatic.com/s/roboto/v30/KFOiCnqEu92Fr1Mu51QrIzcXLsnzjYk.ttf",
      "300italic": "http://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu51TjARc9AMX6lJBP.ttf",
      regular: "http://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",
      italic: "http://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1Mu52xPKTM1K9nz.ttf",
      "500italic": "http://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu51S7ABc9AMX6lJBP.ttf",
      "700italic": "http://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu51TzBhc9AMX6lJBP.ttf",
      "900italic": "http://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu51TLBBc9AMX6lJBP.ttf"
    }
  },
  {
    family: "Open Sans",
    category: "sans-serif",
    subsets: [
      "cyrillic",
      "cyrillic-ext",
      "greek",
      "greek-ext",
      "hebrew",
      "latin",
      "latin-ext",
      "vietnamese"
    ],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic"
    ],
    files: {
      300: "http://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsiH0C4nY1M2xLER.ttf",
      500: "http://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjr0C4nY1M2xLER.ttf",
      600: "http://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsgH1y4nY1M2xLER.ttf",
      700: "http://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1y4nY1M2xLER.ttf",
      800: "http://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgshZ1y4nY1M2xLER.ttf",
      regular: "http://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf",
      "300italic": "http://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk5hkaVcUwaERZjA.ttf",
      italic: "http://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk8ZkaVcUwaERZjA.ttf",
      "500italic": "http://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk_RkaVcUwaERZjA.ttf",
      "600italic": "http://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0RkxhjaVcUwaERZjA.ttf",
      "700italic": "http://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0RkyFjaVcUwaERZjA.ttf",
      "800italic": "http://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk0ZjaVcUwaERZjA.ttf"
    }
  },
  {
    family: "Noto Sans JP",
    category: "sans-serif",
    subsets: ["cyrillic", "japanese", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEi75vY0rw-oME.ttf",
      200: "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFJEj75vY0rw-oME.ttf",
      300: "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFE8j75vY0rw-oME.ttf",
      500: "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFCMj75vY0rw-oME.ttf",
      600: "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFM8k75vY0rw-oME.ttf",
      700: "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFPYk75vY0rw-oME.ttf",
      800: "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFJEk75vY0rw-oME.ttf",
      900: "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFLgk75vY0rw-oME.ttf",
      regular: "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75vY0rw-oME.ttf"
    }
  },
  {
    family: "Montserrat",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Uw-Y3tcoqK5.ttf",
      200: "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr6Ew-Y3tcoqK5.ttf",
      300: "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Ew-Y3tcoqK5.ttf",
      500: "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Ew-Y3tcoqK5.ttf",
      600: "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu170w-Y3tcoqK5.ttf",
      700: "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM70w-Y3tcoqK5.ttf",
      800: "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr70w-Y3tcoqK5.ttf",
      900: "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvC70w-Y3tcoqK5.ttf",
      regular: "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-Y3tcoqK5.ttf",
      "100italic": "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq6R8aX9-p7K5ILg.ttf",
      "200italic": "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqyR9aX9-p7K5ILg.ttf",
      "300italic": "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq_p9aX9-p7K5ILg.ttf",
      italic: "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq6R9aX9-p7K5ILg.ttf",
      "500italic": "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq5Z9aX9-p7K5ILg.ttf",
      "600italic": "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq3p6aX9-p7K5ILg.ttf",
      "700italic": "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq0N6aX9-p7K5ILg.ttf",
      "800italic": "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqyR6aX9-p7K5ILg.ttf",
      "900italic": "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqw16aX9-p7K5ILg.ttf"
    }
  },
  {
    family: "Lato",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "100",
      "100italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "700",
      "700italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHh30wWyWrFCbw7A.ttf",
      300: "http://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh7USew-FGC_p9dw.ttf",
      700: "http://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVew-FGC_p9dw.ttf",
      900: "http://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh50Xew-FGC_p9dw.ttf",
      "100italic": "http://fonts.gstatic.com/s/lato/v24/S6u-w4BMUTPHjxsIPy-vNiPg7MU0.ttf",
      "300italic": "http://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI9w2PHA3s5dwt7w.ttf",
      regular: "http://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHvxk6XweuBCY.ttf",
      italic: "http://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHjxswWyWrFCbw7A.ttf",
      "700italic": "http://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI5wqPHA3s5dwt7w.ttf",
      "900italic": "http://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI3wiPHA3s5dwt7w.ttf"
    }
  },
  {
    family: "Poppins",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/poppins/v20/pxiGyp8kv8JHgFVrLPTed3FBGPaTSQ.ttf",
      200: "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLFj_V1tvFP-KUEg.ttf",
      300: "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDz8V1tvFP-KUEg.ttf",
      500: "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9V1tvFP-KUEg.ttf",
      600: "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6V1tvFP-KUEg.ttf",
      700: "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7V1tvFP-KUEg.ttf",
      800: "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDD4V1tvFP-KUEg.ttf",
      900: "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLBT5V1tvFP-KUEg.ttf",
      "100italic": "http://fonts.gstatic.com/s/poppins/v20/pxiAyp8kv8JHgFVrJJLmE3tFOvODSVFF.ttf",
      "200italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmv1plEN2PQEhcqw.ttf",
      "300italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm21llEN2PQEhcqw.ttf",
      regular: "http://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrFJDUc1NECPY.ttf",
      italic: "http://fonts.gstatic.com/s/poppins/v20/pxiGyp8kv8JHgFVrJJLed3FBGPaTSQ.ttf",
      "500italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmg1hlEN2PQEhcqw.ttf",
      "600italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmr19lEN2PQEhcqw.ttf",
      "700italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmy15lEN2PQEhcqw.ttf",
      "800italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm111lEN2PQEhcqw.ttf",
      "900italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm81xlEN2PQEhcqw.ttf"
    }
  },
  {
    family: "Roboto Condensed",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["300", "300italic", "regular", "italic", "700", "700italic"],
    files: {
      300: "http://fonts.gstatic.com/s/robotocondensed/v25/ieVi2ZhZI2eCN5jzbjEETS9weq8-33mZKCMSbvtdYyQ.ttf",
      700: "http://fonts.gstatic.com/s/robotocondensed/v25/ieVi2ZhZI2eCN5jzbjEETS9weq8-32meKCMSbvtdYyQ.ttf",
      "300italic": "http://fonts.gstatic.com/s/robotocondensed/v25/ieVg2ZhZI2eCN5jzbjEETS9weq8-19eDpCEYatlYcyRi4A.ttf",
      regular: "http://fonts.gstatic.com/s/robotocondensed/v25/ieVl2ZhZI2eCN5jzbjEETS9weq8-59WxDCs5cvI.ttf",
      italic: "http://fonts.gstatic.com/s/robotocondensed/v25/ieVj2ZhZI2eCN5jzbjEETS9weq8-19e7CAk8YvJEeg.ttf",
      "700italic": "http://fonts.gstatic.com/s/robotocondensed/v25/ieVg2ZhZI2eCN5jzbjEETS9weq8-19eDtCYYatlYcyRi4A.ttf"
    }
  },
  {
    family: "Inter",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf",
      200: "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf",
      300: "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf",
      500: "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf",
      600: "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
      700: "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
      800: "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf",
      900: "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf",
      regular: "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
    }
  },
  {
    family: "Roboto Mono",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vuPQ--5Ip2sSQ.ttf",
      200: "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_XvqPQ--5Ip2sSQ.ttf",
      300: "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_gPqPQ--5Ip2sSQ.ttf",
      500: "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_7PqPQ--5Ip2sSQ.ttf",
      600: "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_AP2PQ--5Ip2sSQ.ttf",
      700: "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_Of2PQ--5Ip2sSQ.ttf",
      regular: "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vqPQ--5Ip2sSQ.ttf",
      "100italic": "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrlnAeW9AJi8SZwt.ttf",
      "200italic": "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrnnAOW9AJi8SZwt.ttf",
      "300italic": "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrk5AOW9AJi8SZwt.ttf",
      italic: "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrlnAOW9AJi8SZwt.ttf",
      "500italic": "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrlVAOW9AJi8SZwt.ttf",
      "600italic": "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrm5B-W9AJi8SZwt.ttf",
      "700italic": "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrmAB-W9AJi8SZwt.ttf"
    }
  },
  {
    family: "Oswald",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700"],
    files: {
      200: "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs13FvgUFoZAaRliE.ttf",
      300: "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs169vgUFoZAaRliE.ttf",
      500: "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs18NvgUFoZAaRliE.ttf",
      600: "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1y9ogUFoZAaRliE.ttf",
      700: "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1xZogUFoZAaRliE.ttf",
      regular: "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvgUFoZAaRliE.ttf"
    }
  },
  {
    family: "Noto Sans",
    category: "sans-serif",
    subsets: [
      "cyrillic",
      "cyrillic-ext",
      "devanagari",
      "greek",
      "greek-ext",
      "latin",
      "latin-ext",
      "vietnamese"
    ],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/notosans/v30/o-0OIpQlx3QUlC5A4PNjhjRFSfiM7HBj.ttf",
      200: "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjKhVlY9aA5Wl6PQ.ttf",
      300: "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjThZlY9aA5Wl6PQ.ttf",
      500: "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjFhdlY9aA5Wl6PQ.ttf",
      600: "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjOhBlY9aA5Wl6PQ.ttf",
      700: "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjXhFlY9aA5Wl6PQ.ttf",
      800: "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjQhJlY9aA5Wl6PQ.ttf",
      900: "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjZhNlY9aA5Wl6PQ.ttf",
      "100italic": "http://fonts.gstatic.com/s/notosans/v30/o-0MIpQlx3QUlC5A4PNr4AwhQ_yu6WBjJLE.ttf",
      "200italic": "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4AyNYtyEx2xqPaif.ttf",
      "300italic": "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4AzpYdyEx2xqPaif.ttf",
      regular: "http://fonts.gstatic.com/s/notosans/v30/o-0IIpQlx3QUlC5A4PNb4j5Ba_2c7A.ttf",
      italic: "http://fonts.gstatic.com/s/notosans/v30/o-0OIpQlx3QUlC5A4PNr4DRFSfiM7HBj.ttf",
      "500italic": "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4AyxYNyEx2xqPaif.ttf",
      "600italic": "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4AydZ9yEx2xqPaif.ttf",
      "700italic": "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4Az5ZtyEx2xqPaif.ttf",
      "800italic": "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4AzlZdyEx2xqPaif.ttf",
      "900italic": "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4AzBZNyEx2xqPaif.ttf"
    }
  },
  {
    family: "Raleway",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao4CPNLA3JC9c.ttf",
      200: "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVtaooCPNLA3JC9c.ttf",
      300: "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVuEooCPNLA3JC9c.ttf",
      500: "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvoooCPNLA3JC9c.ttf",
      600: "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVsEpYCPNLA3JC9c.ttf",
      700: "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVs9pYCPNLA3JC9c.ttf",
      800: "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVtapYCPNLA3JC9c.ttf",
      900: "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVtzpYCPNLA3JC9c.ttf",
      regular: "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaooCPNLA3JC9c.ttf",
      "100italic": "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4WjNPrQVIT9c2c8.ttf",
      "200italic": "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4ejMPrQVIT9c2c8.ttf",
      "300italic": "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4TbMPrQVIT9c2c8.ttf",
      italic: "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4WjMPrQVIT9c2c8.ttf",
      "500italic": "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4VrMPrQVIT9c2c8.ttf",
      "600italic": "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4bbLPrQVIT9c2c8.ttf",
      "700italic": "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4Y_LPrQVIT9c2c8.ttf",
      "800italic": "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4ejLPrQVIT9c2c8.ttf",
      "900italic": "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4cHLPrQVIT9c2c8.ttf"
    }
  },
  {
    family: "Nunito Sans",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      200: "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GVilntF8kA_Ykqw.ttf",
      300: "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GiClntF8kA_Ykqw.ttf",
      500: "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4G5ClntF8kA_Ykqw.ttf",
      600: "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GCC5ntF8kA_Ykqw.ttf",
      700: "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GMS5ntF8kA_Ykqw.ttf",
      800: "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GVi5ntF8kA_Ykqw.ttf",
      900: "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4Gfy5ntF8kA_Ykqw.ttf",
      regular: "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4G1ilntF8kA_Ykqw.ttf",
      "200italic": "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmoP91UgIfM0qxVd.ttf",
      "300italic": "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmrR91UgIfM0qxVd.ttf",
      italic: "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmqP91UgIfM0qxVd.ttf",
      "500italic": "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmq991UgIfM0qxVd.ttf",
      "600italic": "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmpR8FUgIfM0qxVd.ttf",
      "700italic": "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmpo8FUgIfM0qxVd.ttf",
      "800italic": "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmoP8FUgIfM0qxVd.ttf",
      "900italic": "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmom8FUgIfM0qxVd.ttf"
    }
  },
  {
    family: "Roboto Slab",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojIWWaG5iddG-1A.ttf",
      200: "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjoDISWaG5iddG-1A.ttf",
      300: "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjo0oSWaG5iddG-1A.ttf",
      500: "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjovoSWaG5iddG-1A.ttf",
      600: "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjoUoOWaG5iddG-1A.ttf",
      700: "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjoa4OWaG5iddG-1A.ttf",
      800: "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjoDIOWaG5iddG-1A.ttf",
      900: "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjoJYOWaG5iddG-1A.ttf",
      regular: "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISWaG5iddG-1A.ttf"
    }
  },
  {
    family: "Ubuntu",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext"],
    variants: ["300", "300italic", "regular", "italic", "500", "500italic", "700", "700italic"],
    files: {
      300: "http://fonts.gstatic.com/s/ubuntu/v20/4iCv6KVjbNBYlgoC1CzTt2aMH4V_gg.ttf",
      500: "http://fonts.gstatic.com/s/ubuntu/v20/4iCv6KVjbNBYlgoCjC3Tt2aMH4V_gg.ttf",
      700: "http://fonts.gstatic.com/s/ubuntu/v20/4iCv6KVjbNBYlgoCxCvTt2aMH4V_gg.ttf",
      "300italic": "http://fonts.gstatic.com/s/ubuntu/v20/4iCp6KVjbNBYlgoKejZftWyIPYBvgpUI.ttf",
      regular: "http://fonts.gstatic.com/s/ubuntu/v20/4iCs6KVjbNBYlgo6eAT3v02QFg.ttf",
      italic: "http://fonts.gstatic.com/s/ubuntu/v20/4iCu6KVjbNBYlgoKeg7znUiAFpxm.ttf",
      "500italic": "http://fonts.gstatic.com/s/ubuntu/v20/4iCp6KVjbNBYlgoKejYHtGyIPYBvgpUI.ttf",
      "700italic": "http://fonts.gstatic.com/s/ubuntu/v20/4iCp6KVjbNBYlgoKejZPsmyIPYBvgpUI.ttf"
    }
  },
  {
    family: "Nunito",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      200: "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDDshRTM9jo7eTWk.ttf",
      300: "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDOUhRTM9jo7eTWk.ttf",
      500: "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhRTM9jo7eTWk.ttf",
      600: "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDGUmRTM9jo7eTWk.ttf",
      700: "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDFwmRTM9jo7eTWk.ttf",
      800: "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDDsmRTM9jo7eTWk.ttf",
      900: "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDBImRTM9jo7eTWk.ttf",
      regular: "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDLshRTM9jo7eTWk.ttf",
      "200italic": "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNiLXA3iqzbXWnoeg.ttf",
      "300italic": "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNi83A3iqzbXWnoeg.ttf",
      italic: "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNirXA3iqzbXWnoeg.ttf",
      "500italic": "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNin3A3iqzbXWnoeg.ttf",
      "600italic": "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNic3c3iqzbXWnoeg.ttf",
      "700italic": "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNiSnc3iqzbXWnoeg.ttf",
      "800italic": "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNiLXc3iqzbXWnoeg.ttf",
      "900italic": "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNiBHc3iqzbXWnoeg.ttf"
    }
  },
  {
    family: "Playfair Display",
    category: "serif",
    subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
    variants: [
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      500: "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKd3vUDQZNLo_U2r.ttf",
      600: "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKebukDQZNLo_U2r.ttf",
      700: "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiukDQZNLo_U2r.ttf",
      800: "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKfFukDQZNLo_U2r.ttf",
      900: "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKfsukDQZNLo_U2r.ttf",
      regular: "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQZNLo_U2r.ttf",
      italic: "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTbtbK-F2rA0s.ttf",
      "500italic": "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_pqTbtbK-F2rA0s.ttf",
      "600italic": "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_naUbtbK-F2rA0s.ttf",
      "700italic": "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_k-UbtbK-F2rA0s.ttf",
      "800italic": "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_iiUbtbK-F2rA0s.ttf",
      "900italic": "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_gGUbtbK-F2rA0s.ttf"
    }
  },
  {
    family: "Rubik",
    category: "sans-serif",
    subsets: ["arabic", "cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      300: "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-WYi1UE80V4bVkA.ttf",
      500: "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-NYi1UE80V4bVkA.ttf",
      600: "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-2Y-1UE80V4bVkA.ttf",
      700: "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-4I-1UE80V4bVkA.ttf",
      800: "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-h4-1UE80V4bVkA.ttf",
      900: "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-ro-1UE80V4bVkA.ttf",
      regular: "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-B4i1UE80V4bVkA.ttf",
      "300italic": "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8sDE0UwdYPFkJ1O.ttf",
      italic: "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8tdE0UwdYPFkJ1O.ttf",
      "500italic": "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8tvE0UwdYPFkJ1O.ttf",
      "600italic": "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8uDFEUwdYPFkJ1O.ttf",
      "700italic": "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8u6FEUwdYPFkJ1O.ttf",
      "800italic": "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8vdFEUwdYPFkJ1O.ttf",
      "900italic": "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8v0FEUwdYPFkJ1O.ttf"
    }
  },
  {
    family: "Merriweather",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["300", "300italic", "regular", "italic", "700", "700italic", "900", "900italic"],
    files: {
      300: "http://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l521wRpX837pvjxPA.ttf",
      700: "http://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l52xwNpX837pvjxPA.ttf",
      900: "http://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l52_wFpX837pvjxPA.ttf",
      "300italic": "http://fonts.gstatic.com/s/merriweather/v30/u-4l0qyriQwlOrhSvowK_l5-eR7lXcf_hP3hPGWH.ttf",
      regular: "http://fonts.gstatic.com/s/merriweather/v30/u-440qyriQwlOrhSvowK_l5OeyxNV-bnrw.ttf",
      italic: "http://fonts.gstatic.com/s/merriweather/v30/u-4m0qyriQwlOrhSvowK_l5-eSZJdeP3r-Ho.ttf",
      "700italic": "http://fonts.gstatic.com/s/merriweather/v30/u-4l0qyriQwlOrhSvowK_l5-eR71Wsf_hP3hPGWH.ttf",
      "900italic": "http://fonts.gstatic.com/s/merriweather/v30/u-4l0qyriQwlOrhSvowK_l5-eR7NWMf_hP3hPGWH.ttf"
    }
  },
  {
    family: "PT Sans",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/ptsans/v17/jizfRExUiTo99u79B_mh4OmnLD0Z4zM.ttf",
      regular: "http://fonts.gstatic.com/s/ptsans/v17/jizaRExUiTo99u79P0WOxOGMMDQ.ttf",
      italic: "http://fonts.gstatic.com/s/ptsans/v17/jizYRExUiTo99u79D0eEwMOJIDQA-g.ttf",
      "700italic": "http://fonts.gstatic.com/s/ptsans/v17/jizdRExUiTo99u79D0e8fOytKB8c8zMrig.ttf"
    }
  },
  {
    family: "Noto Sans KR",
    category: "sans-serif",
    subsets: ["cyrillic", "korean", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuozeLTq8H4hfeE.ttf",
      200: "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzmoyeLTq8H4hfeE.ttf",
      300: "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzrQyeLTq8H4hfeE.ttf",
      500: "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzztgyeLTq8H4hfeE.ttf",
      600: "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzjQ1eLTq8H4hfeE.ttf",
      700: "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzg01eLTq8H4hfeE.ttf",
      800: "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzmo1eLTq8H4hfeE.ttf",
      900: "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzkM1eLTq8H4hfeE.ttf",
      regular: "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuoyeLTq8H4hfeE.ttf"
    }
  },
  {
    family: "Kanit",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/kanit/v15/nKKX-Go6G5tXcr72GwWKcaxALFs.ttf",
      200: "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5aOiWgX6BJNUJy.ttf",
      300: "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4-OSWgX6BJNUJy.ttf",
      500: "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5mOCWgX6BJNUJy.ttf",
      600: "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5KPyWgX6BJNUJy.ttf",
      700: "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4uPiWgX6BJNUJy.ttf",
      800: "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4yPSWgX6BJNUJy.ttf",
      900: "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4WPCWgX6BJNUJy.ttf",
      "100italic": "http://fonts.gstatic.com/s/kanit/v15/nKKV-Go6G5tXcraQI2GAdY5FPFtrGw.ttf",
      "200italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI82hVaRrMFJyAu4.ttf",
      "300italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI6miVaRrMFJyAu4.ttf",
      regular: "http://fonts.gstatic.com/s/kanit/v15/nKKZ-Go6G5tXcoaSEQGodLxA.ttf",
      italic: "http://fonts.gstatic.com/s/kanit/v15/nKKX-Go6G5tXcraQGwWKcaxALFs.ttf",
      "500italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI_GjVaRrMFJyAu4.ttf",
      "600italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI92kVaRrMFJyAu4.ttf",
      "700italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI7mlVaRrMFJyAu4.ttf",
      "800italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI6WmVaRrMFJyAu4.ttf",
      "900italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI4GnVaRrMFJyAu4.ttf"
    }
  },
  {
    family: "Work Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K0nWNigDp6_cOyA.ttf",
      200: "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K8nXNigDp6_cOyA.ttf",
      300: "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32KxfXNigDp6_cOyA.ttf",
      500: "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K3vXNigDp6_cOyA.ttf",
      600: "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K5fQNigDp6_cOyA.ttf",
      700: "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K67QNigDp6_cOyA.ttf",
      800: "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K8nQNigDp6_cOyA.ttf",
      900: "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K-DQNigDp6_cOyA.ttf",
      regular: "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K0nXNigDp6_cOyA.ttf",
      "100italic": "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGU3moJo43ZKyDSQQ.ttf",
      "200italic": "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGUXmsJo43ZKyDSQQ.ttf",
      "300italic": "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGUgGsJo43ZKyDSQQ.ttf",
      italic: "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGU3msJo43ZKyDSQQ.ttf",
      "500italic": "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGU7GsJo43ZKyDSQQ.ttf",
      "600italic": "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGUAGwJo43ZKyDSQQ.ttf",
      "700italic": "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGUOWwJo43ZKyDSQQ.ttf",
      "800italic": "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGUXmwJo43ZKyDSQQ.ttf",
      "900italic": "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGUd2wJo43ZKyDSQQ.ttf"
    }
  },
  {
    family: "Lora",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
    files: {
      500: "http://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787wsuyJGmKxemMeZ.ttf",
      600: "http://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787zAvCJGmKxemMeZ.ttf",
      700: "http://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787z5vCJGmKxemMeZ.ttf",
      regular: "http://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787weuyJGmKxemMeZ.ttf",
      italic: "http://fonts.gstatic.com/s/lora/v32/0QI8MX1D_JOuMw_hLdO6T2wV9KnW-MoFkqh8ndeZzZ0.ttf",
      "500italic": "http://fonts.gstatic.com/s/lora/v32/0QI8MX1D_JOuMw_hLdO6T2wV9KnW-PgFkqh8ndeZzZ0.ttf",
      "600italic": "http://fonts.gstatic.com/s/lora/v32/0QI8MX1D_JOuMw_hLdO6T2wV9KnW-BQCkqh8ndeZzZ0.ttf",
      "700italic": "http://fonts.gstatic.com/s/lora/v32/0QI8MX1D_JOuMw_hLdO6T2wV9KnW-C0Ckqh8ndeZzZ0.ttf"
    }
  },
  {
    family: "Mukta",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["200", "300", "regular", "500", "600", "700", "800"],
    files: {
      200: "http://fonts.gstatic.com/s/mukta/v14/iJWHBXyXfDDVXbEOjFma-2HW7ZB_.ttf",
      300: "http://fonts.gstatic.com/s/mukta/v14/iJWHBXyXfDDVXbFqj1ma-2HW7ZB_.ttf",
      500: "http://fonts.gstatic.com/s/mukta/v14/iJWHBXyXfDDVXbEyjlma-2HW7ZB_.ttf",
      600: "http://fonts.gstatic.com/s/mukta/v14/iJWHBXyXfDDVXbEeiVma-2HW7ZB_.ttf",
      700: "http://fonts.gstatic.com/s/mukta/v14/iJWHBXyXfDDVXbF6iFma-2HW7ZB_.ttf",
      800: "http://fonts.gstatic.com/s/mukta/v14/iJWHBXyXfDDVXbFmi1ma-2HW7ZB_.ttf",
      regular: "http://fonts.gstatic.com/s/mukta/v14/iJWKBXyXfDDVXYnGp32S0H3f.ttf"
    }
  },
  {
    family: "Noto Sans TC",
    category: "sans-serif",
    subsets: ["chinese-traditional", "cyrillic", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz76Cz_CpOtma3uNQ.ttf",
      200: "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz7yCy_CpOtma3uNQ.ttf",
      300: "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz7_6y_CpOtma3uNQ.ttf",
      500: "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz75Ky_CpOtma3uNQ.ttf",
      600: "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz7361_CpOtma3uNQ.ttf",
      700: "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz70e1_CpOtma3uNQ.ttf",
      800: "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz7yC1_CpOtma3uNQ.ttf",
      900: "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz7wm1_CpOtma3uNQ.ttf",
      regular: "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz76Cy_CpOtma3uNQ.ttf"
    }
  },
  {
    family: "Fira Sans",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/firasans/v17/va9C4kDNxMZdWfMOD5Vn9IjOazP3dUTP.ttf",
      200: "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnWKnuQR37fF3Wlg.ttf",
      300: "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnPKruQR37fF3Wlg.ttf",
      500: "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKvuQR37fF3Wlg.ttf",
      600: "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnSKzuQR37fF3Wlg.ttf",
      700: "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3uQR37fF3Wlg.ttf",
      800: "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnMK7uQR37fF3Wlg.ttf",
      900: "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnFK_uQR37fF3Wlg.ttf",
      "100italic": "http://fonts.gstatic.com/s/firasans/v17/va9A4kDNxMZdWfMOD5VvkrCqYTfVcFTPj0s.ttf",
      "200italic": "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrAGQBf_XljGllLX.ttf",
      "300italic": "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBiQxf_XljGllLX.ttf",
      regular: "http://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VfkILKSTbndQ.ttf",
      italic: "http://fonts.gstatic.com/s/firasans/v17/va9C4kDNxMZdWfMOD5VvkojOazP3dUTP.ttf",
      "500italic": "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrA6Qhf_XljGllLX.ttf",
      "600italic": "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrAWRRf_XljGllLX.ttf",
      "700italic": "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrByRBf_XljGllLX.ttf",
      "800italic": "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBuRxf_XljGllLX.ttf",
      "900italic": "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBKRhf_XljGllLX.ttf"
    }
  },
  {
    family: "Quicksand",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkKEo18G0wx40QDw.ttf",
      500: "http://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkM0o18G0wx40QDw.ttf",
      600: "http://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkCEv18G0wx40QDw.ttf",
      700: "http://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkBgv18G0wx40QDw.ttf",
      regular: "http://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o18G0wx40QDw.ttf"
    }
  },
  {
    family: "Barlow",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/barlow/v12/7cHrv4kjgoGqM7E3b8s8yn4hnCci.ttf",
      200: "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3w-oc4FAtlT47dw.ttf",
      300: "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3p-kc4FAtlT47dw.ttf",
      500: "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3_-gc4FAtlT47dw.ttf",
      600: "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E30-8c4FAtlT47dw.ttf",
      700: "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3t-4c4FAtlT47dw.ttf",
      800: "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3q-0c4FAtlT47dw.ttf",
      900: "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3j-wc4FAtlT47dw.ttf",
      "100italic": "http://fonts.gstatic.com/s/barlow/v12/7cHtv4kjgoGqM7E_CfNYwHoDmTcibrA.ttf",
      "200italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfP04Voptzsrd6m9.ttf",
      "300italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfOQ4loptzsrd6m9.ttf",
      regular: "http://fonts.gstatic.com/s/barlow/v12/7cHpv4kjgoGqM7EPC8E46HsxnA.ttf",
      italic: "http://fonts.gstatic.com/s/barlow/v12/7cHrv4kjgoGqM7E_Ccs8yn4hnCci.ttf",
      "500italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfPI41optzsrd6m9.ttf",
      "600italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfPk5Foptzsrd6m9.ttf",
      "700italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfOA5Voptzsrd6m9.ttf",
      "800italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfOc5loptzsrd6m9.ttf",
      "900italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfO451optzsrd6m9.ttf"
    }
  },
  {
    family: "Inconsolata",
    category: "monospace",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      200: "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7LppwU8aRr8lleY2co.ttf",
      300: "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp9s8aRr8lleY2co.ttf",
      500: "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp7c8aRr8lleY2co.ttf",
      600: "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp1s7aRr8lleY2co.ttf",
      700: "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp2I7aRr8lleY2co.ttf",
      800: "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7LppwU7aRr8lleY2co.ttf",
      900: "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lppyw7aRr8lleY2co.ttf",
      regular: "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp4U8aRr8lleY2co.ttf"
    }
  },
  {
    family: "IBM Plex Sans",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX-KVElMYYaJe8bpLHnCwDKjbLeEKxIedbzDw.ttf",
      200: "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjR7_MIZmdd_qFmo.ttf",
      300: "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjXr8MIZmdd_qFmo.ttf",
      500: "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjSL9MIZmdd_qFmo.ttf",
      600: "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjQ76MIZmdd_qFmo.ttf",
      700: "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjWr7MIZmdd_qFmo.ttf",
      "100italic": "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX8KVElMYYaJe8bpLHnCwDKhdTmdKZMW9PjD3N8.ttf",
      "200italic": "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX7KVElMYYaJe8bpLHnCwDKhdTm2Idscf3vBmpl8A.ttf",
      "300italic": "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRscf3vBmpl8A.ttf",
      regular: "http://fonts.gstatic.com/s/ibmplexsans/v19/zYXgKVElMYYaJe8bpLHnCwDKtdbUFI5NadY.ttf",
      italic: "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX-KVElMYYaJe8bpLHnCwDKhdTeEKxIedbzDw.ttf",
      "500italic": "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX7KVElMYYaJe8bpLHnCwDKhdTm5IVscf3vBmpl8A.ttf",
      "600italic": "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJscf3vBmpl8A.ttf",
      "700italic": "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX7KVElMYYaJe8bpLHnCwDKhdTmrINscf3vBmpl8A.ttf"
    }
  },
  {
    family: "Mulish",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      200: "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexRNRwaClGrw-PTY.ttf",
      300: "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexc1RwaClGrw-PTY.ttf",
      500: "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexaFRwaClGrw-PTY.ttf",
      600: "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexU1WwaClGrw-PTY.ttf",
      700: "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexXRWwaClGrw-PTY.ttf",
      800: "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexRNWwaClGrw-PTY.ttf",
      900: "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexTpWwaClGrw-PTY.ttf",
      regular: "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexZNRwaClGrw-PTY.ttf",
      "200italic": "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSqeOvHp47LTZFwA.ttf",
      "300italic": "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSd-OvHp47LTZFwA.ttf",
      italic: "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSKeOvHp47LTZFwA.ttf",
      "500italic": "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSG-OvHp47LTZFwA.ttf",
      "600italic": "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsS9-SvHp47LTZFwA.ttf",
      "700italic": "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSzuSvHp47LTZFwA.ttf",
      "800italic": "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSqeSvHp47LTZFwA.ttf",
      "900italic": "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSgOSvHp47LTZFwA.ttf"
    }
  },
  {
    family: "PT Serif",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/ptserif/v18/EJRSQgYoZZY2vCFuvAnt65qVXSr3pNNB.ttf",
      regular: "http://fonts.gstatic.com/s/ptserif/v18/EJRVQgYoZZY2vCFuvDFRxL6ddjb-.ttf",
      italic: "http://fonts.gstatic.com/s/ptserif/v18/EJRTQgYoZZY2vCFuvAFTzrq_cyb-vco.ttf",
      "700italic": "http://fonts.gstatic.com/s/ptserif/v18/EJRQQgYoZZY2vCFuvAFT9gaQVy7VocNB6Iw.ttf"
    }
  },
  {
    family: "DM Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAop1hTmf3ZGMZpg.ttf",
      200: "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAIpxhTmf3ZGMZpg.ttf",
      300: "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwA_JxhTmf3ZGMZpg.ttf",
      500: "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAkJxhTmf3ZGMZpg.ttf",
      600: "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAfJthTmf3ZGMZpg.ttf",
      700: "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZthTmf3ZGMZpg.ttf",
      800: "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAIpthTmf3ZGMZpg.ttf",
      900: "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAC5thTmf3ZGMZpg.ttf",
      regular: "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTmf3ZGMZpg.ttf",
      "100italic": "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDG3zRmYJpso5.ttf",
      "200italic": "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8JDW3zRmYJpso5.ttf",
      "300italic": "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat_XDW3zRmYJpso5.ttf",
      italic: "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDW3zRmYJpso5.ttf",
      "500italic": "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-7DW3zRmYJpso5.ttf",
      "600italic": "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9XCm3zRmYJpso5.ttf",
      "700italic": "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9uCm3zRmYJpso5.ttf",
      "800italic": "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8JCm3zRmYJpso5.ttf",
      "900italic": "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8gCm3zRmYJpso5.ttf"
    }
  },
  {
    family: "Heebo",
    category: "sans-serif",
    subsets: ["hebrew", "latin"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EiS2cckOnz02SXQ.ttf",
      200: "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1ECSycckOnz02SXQ.ttf",
      300: "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1E1yycckOnz02SXQ.ttf",
      500: "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EuyycckOnz02SXQ.ttf",
      600: "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EVyucckOnz02SXQ.ttf",
      700: "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EbiucckOnz02SXQ.ttf",
      800: "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1ECSucckOnz02SXQ.ttf",
      900: "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EICucckOnz02SXQ.ttf",
      regular: "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EiSycckOnz02SXQ.ttf"
    }
  },
  {
    family: "Noto Serif",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZqFGjwM0Lhq_Szw.ttf",
      200: "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZKFCjwM0Lhq_Szw.ttf",
      300: "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZ9lCjwM0Lhq_Szw.ttf",
      500: "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZmlCjwM0Lhq_Szw.ttf",
      600: "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZdlejwM0Lhq_Szw.ttf",
      700: "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZT1ejwM0Lhq_Szw.ttf",
      800: "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZKFejwM0Lhq_Szw.ttf",
      900: "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZAVejwM0Lhq_Szw.ttf",
      regular: "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZqFCjwM0Lhq_Szw.ttf",
      "100italic": "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBNLgscPpKrCzyUi.ttf",
      "200italic": "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBPLg8cPpKrCzyUi.ttf",
      "300italic": "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBMVg8cPpKrCzyUi.ttf",
      italic: "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBNLg8cPpKrCzyUi.ttf",
      "500italic": "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBN5g8cPpKrCzyUi.ttf",
      "600italic": "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBOVhMcPpKrCzyUi.ttf",
      "700italic": "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBOshMcPpKrCzyUi.ttf",
      "800italic": "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBPLhMcPpKrCzyUi.ttf",
      "900italic": "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBPihMcPpKrCzyUi.ttf"
    }
  },
  {
    family: "Titillium Web",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "900"
    ],
    files: {
      200: "http://fonts.gstatic.com/s/titilliumweb/v17/NaPDcZTIAOhVxoMyOr9n_E7ffAzHKIx5YrSYqWM.ttf",
      300: "http://fonts.gstatic.com/s/titilliumweb/v17/NaPDcZTIAOhVxoMyOr9n_E7ffGjEKIx5YrSYqWM.ttf",
      600: "http://fonts.gstatic.com/s/titilliumweb/v17/NaPDcZTIAOhVxoMyOr9n_E7ffBzCKIx5YrSYqWM.ttf",
      700: "http://fonts.gstatic.com/s/titilliumweb/v17/NaPDcZTIAOhVxoMyOr9n_E7ffHjDKIx5YrSYqWM.ttf",
      900: "http://fonts.gstatic.com/s/titilliumweb/v17/NaPDcZTIAOhVxoMyOr9n_E7ffEDBKIx5YrSYqWM.ttf",
      "200italic": "http://fonts.gstatic.com/s/titilliumweb/v17/NaPFcZTIAOhVxoMyOr9n_E7fdMbewI1zZpaduWMmxA.ttf",
      "300italic": "http://fonts.gstatic.com/s/titilliumweb/v17/NaPFcZTIAOhVxoMyOr9n_E7fdMbepI5zZpaduWMmxA.ttf",
      regular: "http://fonts.gstatic.com/s/titilliumweb/v17/NaPecZTIAOhVxoMyOr9n_E7fRMTsDIRSfr0.ttf",
      italic: "http://fonts.gstatic.com/s/titilliumweb/v17/NaPAcZTIAOhVxoMyOr9n_E7fdMbmCKZXbr2BsA.ttf",
      "600italic": "http://fonts.gstatic.com/s/titilliumweb/v17/NaPFcZTIAOhVxoMyOr9n_E7fdMbe0IhzZpaduWMmxA.ttf",
      "700italic": "http://fonts.gstatic.com/s/titilliumweb/v17/NaPFcZTIAOhVxoMyOr9n_E7fdMbetIlzZpaduWMmxA.ttf"
    }
  },
  {
    family: "Manrope",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700", "800"],
    files: {
      200: "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk59FO_F87jxeN7B.ttf",
      300: "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk6jFO_F87jxeN7B.ttf",
      500: "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk7PFO_F87jxeN7B.ttf",
      600: "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4jE-_F87jxeN7B.ttf",
      700: "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4aE-_F87jxeN7B.ttf",
      800: "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk59E-_F87jxeN7B.ttf",
      regular: "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FO_F87jxeN7B.ttf"
    }
  },
  {
    family: "Hind Siliguri",
    category: "sans-serif",
    subsets: ["bengali", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/hindsiliguri/v12/ijwOs5juQtsyLLR5jN4cxBEoRDf44uEfKiGvxts.ttf",
      500: "http://fonts.gstatic.com/s/hindsiliguri/v12/ijwOs5juQtsyLLR5jN4cxBEoRG_54uEfKiGvxts.ttf",
      600: "http://fonts.gstatic.com/s/hindsiliguri/v12/ijwOs5juQtsyLLR5jN4cxBEoREP-4uEfKiGvxts.ttf",
      700: "http://fonts.gstatic.com/s/hindsiliguri/v12/ijwOs5juQtsyLLR5jN4cxBEoRCf_4uEfKiGvxts.ttf",
      regular: "http://fonts.gstatic.com/s/hindsiliguri/v12/ijwTs5juQtsyLLR5jN4cxBEofJvQxuk0Nig.ttf"
    }
  },
  {
    family: "Libre Franklin",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhLsSUB9rIb-JH1g.ttf",
      200: "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhrsWUB9rIb-JH1g.ttf",
      300: "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhcMWUB9rIb-JH1g.ttf",
      500: "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhHMWUB9rIb-JH1g.ttf",
      600: "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduh8MKUB9rIb-JH1g.ttf",
      700: "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhycKUB9rIb-JH1g.ttf",
      800: "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhrsKUB9rIb-JH1g.ttf",
      900: "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhh8KUB9rIb-JH1g.ttf",
      regular: "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhLsWUB9rIb-JH1g.ttf",
      "100italic": "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05oZ8RdDMTedX1sGE.ttf",
      "200italic": "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05ob8RNDMTedX1sGE.ttf",
      "300italic": "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05oYiRNDMTedX1sGE.ttf",
      italic: "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05oZ8RNDMTedX1sGE.ttf",
      "500italic": "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05oZORNDMTedX1sGE.ttf",
      "600italic": "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05oaiQ9DMTedX1sGE.ttf",
      "700italic": "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05oabQ9DMTedX1sGE.ttf",
      "800italic": "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05ob8Q9DMTedX1sGE.ttf",
      "900italic": "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05obVQ9DMTedX1sGE.ttf"
    }
  },
  {
    family: "Karla",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic"
    ],
    files: {
      200: "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTDeJqqFENLR7fHGw.ttf",
      300: "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTDppqqFENLR7fHGw.ttf",
      500: "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTDypqqFENLR7fHGw.ttf",
      600: "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTDJp2qFENLR7fHGw.ttf",
      700: "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTDH52qFENLR7fHGw.ttf",
      800: "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTDeJ2qFENLR7fHGw.ttf",
      regular: "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTD-JqqFENLR7fHGw.ttf",
      "200italic": "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNnCV0lPZbLXGxGR.ttf",
      "300italic": "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNkcV0lPZbLXGxGR.ttf",
      italic: "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNlCV0lPZbLXGxGR.ttf",
      "500italic": "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNlwV0lPZbLXGxGR.ttf",
      "600italic": "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNmcUElPZbLXGxGR.ttf",
      "700italic": "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNmlUElPZbLXGxGR.ttf",
      "800italic": "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNnCUElPZbLXGxGR.ttf"
    }
  },
  {
    family: "Nanum Gothic",
    category: "sans-serif",
    subsets: ["korean", "latin"],
    variants: ["regular", "700", "800"],
    files: {
      700: "http://fonts.gstatic.com/s/nanumgothic/v23/PN_oRfi-oW3hYwmKDpxS7F_LQv37zlEn14YEUQ.ttf",
      800: "http://fonts.gstatic.com/s/nanumgothic/v23/PN_oRfi-oW3hYwmKDpxS7F_LXv77zlEn14YEUQ.ttf",
      regular: "http://fonts.gstatic.com/s/nanumgothic/v23/PN_3Rfi-oW3hYwmKDpxS7F_z_tLfxno73g.ttf"
    }
  },
  {
    family: "Material Icons Outlined",
    category: "monospace",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/materialiconsoutlined/v109/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUcdl5GuI2Ze.otf"
    }
  },
  {
    family: "Josefin Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_DjRXMFrLgTsQV0.ttf",
      200: "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_LjQXMFrLgTsQV0.ttf",
      300: "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_GbQXMFrLgTsQV0.ttf",
      500: "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_ArQXMFrLgTsQV0.ttf",
      600: "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_ObXXMFrLgTsQV0.ttf",
      700: "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_N_XXMFrLgTsQV0.ttf",
      regular: "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_DjQXMFrLgTsQV0.ttf",
      "100italic": "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCTtINhKibpUV3MEQ.ttf",
      "200italic": "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCTNIJhKibpUV3MEQ.ttf",
      "300italic": "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCT6oJhKibpUV3MEQ.ttf",
      italic: "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCTtIJhKibpUV3MEQ.ttf",
      "500italic": "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCThoJhKibpUV3MEQ.ttf",
      "600italic": "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCTaoVhKibpUV3MEQ.ttf",
      "700italic": "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCTU4VhKibpUV3MEQ.ttf"
    }
  },
  {
    family: "Arimo",
    category: "sans-serif",
    subsets: [
      "cyrillic",
      "cyrillic-ext",
      "greek",
      "greek-ext",
      "hebrew",
      "latin",
      "latin-ext",
      "vietnamese"
    ],
    variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
    files: {
      500: "http://fonts.gstatic.com/s/arimo/v29/P5sfzZCDf9_T_3cV7NCUECyoxNk338xsBxDAVQI4aA.ttf",
      600: "http://fonts.gstatic.com/s/arimo/v29/P5sfzZCDf9_T_3cV7NCUECyoxNk3M8tsBxDAVQI4aA.ttf",
      700: "http://fonts.gstatic.com/s/arimo/v29/P5sfzZCDf9_T_3cV7NCUECyoxNk3CstsBxDAVQI4aA.ttf",
      regular: "http://fonts.gstatic.com/s/arimo/v29/P5sfzZCDf9_T_3cV7NCUECyoxNk37cxsBxDAVQI4aA.ttf",
      italic: "http://fonts.gstatic.com/s/arimo/v29/P5sdzZCDf9_T_10c3i9MeUcyat4iJY-ERBrEdwcoaKww.ttf",
      "500italic": "http://fonts.gstatic.com/s/arimo/v29/P5sdzZCDf9_T_10c3i9MeUcyat4iJY-2RBrEdwcoaKww.ttf",
      "600italic": "http://fonts.gstatic.com/s/arimo/v29/P5sdzZCDf9_T_10c3i9MeUcyat4iJY9aQxrEdwcoaKww.ttf",
      "700italic": "http://fonts.gstatic.com/s/arimo/v29/P5sdzZCDf9_T_10c3i9MeUcyat4iJY9jQxrEdwcoaKww.ttf"
    }
  },
  {
    family: "Noto Color Emoji",
    category: "sans-serif",
    subsets: ["emoji"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/notocoloremoji/v25/Yq6P-KqIXTD0t4D9z1ESnKM3-HpFab5s79iz64w.ttf"
    }
  },
  {
    family: "Libre Baskerville",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/librebaskerville/v14/kmKiZrc3Hgbbcjq75U4uslyuy4kn0qviTjYwI8Gcw6Oi.ttf",
      regular: "http://fonts.gstatic.com/s/librebaskerville/v14/kmKnZrc3Hgbbcjq75U4uslyuy4kn0pNeYRI4CN2V.ttf",
      italic: "http://fonts.gstatic.com/s/librebaskerville/v14/kmKhZrc3Hgbbcjq75U4uslyuy4kn0qNcaxYaDc2V2ro.ttf"
    }
  },
  {
    family: "Dosis",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700", "800"],
    files: {
      200: "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJt7MV3BkFTq4EPw.ttf",
      300: "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJabMV3BkFTq4EPw.ttf",
      500: "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJBbMV3BkFTq4EPw.ttf",
      600: "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJ6bQV3BkFTq4EPw.ttf",
      700: "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJ0LQV3BkFTq4EPw.ttf",
      800: "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJt7QV3BkFTq4EPw.ttf",
      regular: "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJN7MV3BkFTq4EPw.ttf"
    }
  },
  {
    family: "PT Sans Narrow",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/ptsansnarrow/v18/BngSUXNadjH0qYEzV7ab-oWlsbg95DiCUfzgRd-3.ttf",
      regular: "http://fonts.gstatic.com/s/ptsansnarrow/v18/BngRUXNadjH0qYEzV7ab-oWlsYCByxyKeuDp.ttf"
    }
  },
  {
    family: "Source Code Pro",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      200: "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DEyQhM5hTXUcdJg.ttf",
      300: "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DJKQhM5hTXUcdJg.ttf",
      500: "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DP6QhM5hTXUcdJg.ttf",
      600: "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DBKXhM5hTXUcdJg.ttf",
      700: "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DCuXhM5hTXUcdJg.ttf",
      800: "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DEyXhM5hTXUcdJg.ttf",
      900: "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DGWXhM5hTXUcdJg.ttf",
      regular: "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DMyQhM5hTXUcdJg.ttf",
      "200italic": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTT7I1rSVcZZJiGpw.ttf",
      "300italic": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTTMo1rSVcZZJiGpw.ttf",
      italic: "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTTbI1rSVcZZJiGpw.ttf",
      "500italic": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTTXo1rSVcZZJiGpw.ttf",
      "600italic": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTTsoprSVcZZJiGpw.ttf",
      "700italic": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTTi4prSVcZZJiGpw.ttf",
      "800italic": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTT7IprSVcZZJiGpw.ttf",
      "900italic": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTTxYprSVcZZJiGpw.ttf"
    }
  },
  {
    family: "Bitter",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbeCL_EXFh2reU.ttf",
      200: "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8XbfCL_EXFh2reU.ttf",
      300: "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8ajfCL_EXFh2reU.ttf",
      500: "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8cTfCL_EXFh2reU.ttf",
      600: "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8SjYCL_EXFh2reU.ttf",
      700: "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8RHYCL_EXFh2reU.ttf",
      800: "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8XbYCL_EXFh2reU.ttf",
      900: "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8V_YCL_EXFh2reU.ttf",
      regular: "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbfCL_EXFh2reU.ttf",
      "100italic": "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6c4P3OWHpzveWxBw.ttf",
      "200italic": "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6cYPzOWHpzveWxBw.ttf",
      "300italic": "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6cvvzOWHpzveWxBw.ttf",
      italic: "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6c4PzOWHpzveWxBw.ttf",
      "500italic": "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6c0vzOWHpzveWxBw.ttf",
      "600italic": "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6cPvvOWHpzveWxBw.ttf",
      "700italic": "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6cB_vOWHpzveWxBw.ttf",
      "800italic": "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6cYPvOWHpzveWxBw.ttf",
      "900italic": "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6cSfvOWHpzveWxBw.ttf"
    }
  },
  {
    family: "Cabin",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
    files: {
      500: "http://fonts.gstatic.com/s/cabin/v27/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkW-EL7Gvxm7rE_s.ttf",
      600: "http://fonts.gstatic.com/s/cabin/v27/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkYODL7Gvxm7rE_s.ttf",
      700: "http://fonts.gstatic.com/s/cabin/v27/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkbqDL7Gvxm7rE_s.ttf",
      regular: "http://fonts.gstatic.com/s/cabin/v27/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkV2EL7Gvxm7rE_s.ttf",
      italic: "http://fonts.gstatic.com/s/cabin/v27/u-4V0qWljRw-Pd815fNqc8T_wAFcX-c37MPiNYlWniJ2hJXHx_KlwkzuA_u1Bg.ttf",
      "500italic": "http://fonts.gstatic.com/s/cabin/v27/u-4V0qWljRw-Pd815fNqc8T_wAFcX-c37MPiNYlWniJ2hJXH9fKlwkzuA_u1Bg.ttf",
      "600italic": "http://fonts.gstatic.com/s/cabin/v27/u-4V0qWljRw-Pd815fNqc8T_wAFcX-c37MPiNYlWniJ2hJXHGfWlwkzuA_u1Bg.ttf",
      "700italic": "http://fonts.gstatic.com/s/cabin/v27/u-4V0qWljRw-Pd815fNqc8T_wAFcX-c37MPiNYlWniJ2hJXHIPWlwkzuA_u1Bg.ttf"
    }
  },
  {
    family: "Assistant",
    category: "sans-serif",
    subsets: ["hebrew", "latin", "latin-ext"],
    variants: ["200", "300", "regular", "500", "600", "700", "800"],
    files: {
      200: "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQtmZnEGGf3qGuvM4.ttf",
      300: "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQtrhnEGGf3qGuvM4.ttf",
      500: "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQttRnEGGf3qGuvM4.ttf",
      600: "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQtjhgEGGf3qGuvM4.ttf",
      700: "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQtgFgEGGf3qGuvM4.ttf",
      800: "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQtmZgEGGf3qGuvM4.ttf",
      regular: "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQtuZnEGGf3qGuvM4.ttf"
    }
  },
  {
    family: "Oxygen",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["300", "regular", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/oxygen/v15/2sDcZG1Wl4LcnbuCJW8Db2-4C7wFZQ.ttf",
      700: "http://fonts.gstatic.com/s/oxygen/v15/2sDcZG1Wl4LcnbuCNWgDb2-4C7wFZQ.ttf",
      regular: "http://fonts.gstatic.com/s/oxygen/v15/2sDfZG1Wl4Lcnbu6iUcnZ0SkAg.ttf"
    }
  },
  {
    family: "Bebas Neue",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg69CK48gW7PXooxW5rygbi49c.ttf"
    }
  },
  {
    family: "EB Garamond",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "regular",
      "500",
      "600",
      "700",
      "800",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic"
    ],
    files: {
      500: "http://fonts.gstatic.com/s/ebgaramond/v27/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-2fRUA4V-e6yHgQ.ttf",
      600: "http://fonts.gstatic.com/s/ebgaramond/v27/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-NfNUA4V-e6yHgQ.ttf",
      700: "http://fonts.gstatic.com/s/ebgaramond/v27/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-DPNUA4V-e6yHgQ.ttf",
      800: "http://fonts.gstatic.com/s/ebgaramond/v27/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-a_NUA4V-e6yHgQ.ttf",
      regular: "http://fonts.gstatic.com/s/ebgaramond/v27/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-6_RUA4V-e6yHgQ.ttf",
      italic: "http://fonts.gstatic.com/s/ebgaramond/v27/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7e8QI96WamXgXFI.ttf",
      "500italic": "http://fonts.gstatic.com/s/ebgaramond/v27/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7eOQI96WamXgXFI.ttf",
      "600italic": "http://fonts.gstatic.com/s/ebgaramond/v27/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7diR496WamXgXFI.ttf",
      "700italic": "http://fonts.gstatic.com/s/ebgaramond/v27/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7dbR496WamXgXFI.ttf",
      "800italic": "http://fonts.gstatic.com/s/ebgaramond/v27/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7c8R496WamXgXFI.ttf"
    }
  },
  {
    family: "Cairo",
    category: "sans-serif",
    subsets: ["arabic", "latin", "latin-ext"],
    variants: ["200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      200: "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hGA-W1ToLQ-HmkA.ttf",
      300: "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hL4-W1ToLQ-HmkA.ttf",
      500: "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hNI-W1ToLQ-HmkA.ttf",
      600: "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hD45W1ToLQ-HmkA.ttf",
      700: "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hAc5W1ToLQ-HmkA.ttf",
      800: "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hGA5W1ToLQ-HmkA.ttf",
      900: "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hEk5W1ToLQ-HmkA.ttf",
      regular: "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hOA-W1ToLQ-HmkA.ttf"
    }
  },
  {
    family: "Anton",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/anton/v25/1Ptgg87LROyAm0K08i4gS7lu.ttf"
    }
  },
  {
    family: "Abel",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/abel/v18/MwQ5bhbm2POE6VhLPJp6qGI.ttf"
    }
  },
  {
    family: "Dancing Script",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700"],
    files: {
      500: "http://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BAyoHTeB9ptDqpw.ttf",
      600: "http://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7B7y0HTeB9ptDqpw.ttf",
      700: "http://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7B1i0HTeB9ptDqpw.ttf",
      regular: "http://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSoHTeB9ptDqpw.ttf"
    }
  },
  {
    family: "Barlow Condensed",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxxL3I-JCGChYJ8VI-L6OO_au7B43LT31vytKgbaw.ttf",
      200: "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B497y_3HcuKECcrs.ttf",
      300: "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B47rx_3HcuKECcrs.ttf",
      500: "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B4-Lw_3HcuKECcrs.ttf",
      600: "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B4873_3HcuKECcrs.ttf",
      700: "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B46r2_3HcuKECcrs.ttf",
      800: "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B47b1_3HcuKECcrs.ttf",
      900: "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B45L0_3HcuKECcrs.ttf",
      "100italic": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxzL3I-JCGChYJ8VI-L6OO_au7B6xTru1H2lq0La6JN.ttf",
      "200italic": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrF3DWvIMHYrtUxg.ttf",
      "300italic": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrc3PWvIMHYrtUxg.ttf",
      regular: "http://fonts.gstatic.com/s/barlowcondensed/v12/HTx3L3I-JCGChYJ8VI-L6OO_au7B2xbZ23n3pKg.ttf",
      italic: "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxxL3I-JCGChYJ8VI-L6OO_au7B6xTT31vytKgbaw.ttf",
      "500italic": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrK3LWvIMHYrtUxg.ttf",
      "600italic": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrB3XWvIMHYrtUxg.ttf",
      "700italic": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrY3TWvIMHYrtUxg.ttf",
      "800italic": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrf3fWvIMHYrtUxg.ttf",
      "900italic": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrW3bWvIMHYrtUxg.ttf"
    }
  },
  {
    family: "Hind",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/hind/v16/5aU19_a8oxmIfMJaIRuYjDpf5Vw.ttf",
      500: "http://fonts.gstatic.com/s/hind/v16/5aU19_a8oxmIfJpbIRuYjDpf5Vw.ttf",
      600: "http://fonts.gstatic.com/s/hind/v16/5aU19_a8oxmIfLZcIRuYjDpf5Vw.ttf",
      700: "http://fonts.gstatic.com/s/hind/v16/5aU19_a8oxmIfNJdIRuYjDpf5Vw.ttf",
      regular: "http://fonts.gstatic.com/s/hind/v16/5aU69_a8oxmIRG5yBROzkDM.ttf"
    }
  },
  {
    family: "Material Symbols Outlined",
    category: "monospace",
    subsets: ["latin"],
    variants: ["100", "200", "300", "regular", "500", "600", "700"],
    files: {
      100: "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDCvHeembd5zrTgt.ttf",
      200: "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDAvHOembd5zrTgt.ttf",
      300: "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDDxHOembd5zrTgt.ttf",
      500: "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDCdHOembd5zrTgt.ttf",
      600: "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDBxG-embd5zrTgt.ttf",
      700: "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDBIG-embd5zrTgt.ttf",
      regular: "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDCvHOembd5zrTgt.ttf"
    }
  },
  {
    family: "Space Grotesk",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj62UUsjNsFjTDJK.ttf",
      500: "http://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7aUUsjNsFjTDJK.ttf",
      600: "http://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj42VksjNsFjTDJK.ttf",
      700: "http://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksjNsFjTDJK.ttf",
      regular: "http://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUUsjNsFjTDJK.ttf"
    }
  },
  {
    family: "Noto Sans SC",
    category: "sans-serif",
    subsets: ["chinese-simplified", "cyrillic", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_EnYxNbPzS5HE.ttf",
      200: "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG1_FnYxNbPzS5HE.ttf",
      300: "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG4HFnYxNbPzS5HE.ttf",
      500: "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG-3FnYxNbPzS5HE.ttf",
      600: "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaGwHCnYxNbPzS5HE.ttf",
      700: "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaGzjCnYxNbPzS5HE.ttf",
      800: "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG1_CnYxNbPzS5HE.ttf",
      900: "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG3bCnYxNbPzS5HE.ttf",
      regular: "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_FnYxNbPzS5HE.ttf"
    }
  },
  {
    family: "Jost",
    category: "sans-serif",
    subsets: ["cyrillic", "latin", "latin-ext"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7myjJAVGPokMmuHL.ttf",
      200: "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7mwjJQVGPokMmuHL.ttf",
      300: "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7mz9JQVGPokMmuHL.ttf",
      500: "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7myRJQVGPokMmuHL.ttf",
      600: "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7mx9IgVGPokMmuHL.ttf",
      700: "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7mxEIgVGPokMmuHL.ttf",
      800: "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7mwjIgVGPokMmuHL.ttf",
      900: "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7mwKIgVGPokMmuHL.ttf",
      regular: "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7myjJQVGPokMmuHL.ttf",
      "100italic": "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZu0ENI0un_HLMEo.ttf",
      "200italic": "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZm0FNI0un_HLMEo.ttf",
      "300italic": "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZrMFNI0un_HLMEo.ttf",
      italic: "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZu0FNI0un_HLMEo.ttf",
      "500italic": "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZt8FNI0un_HLMEo.ttf",
      "600italic": "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZjMCNI0un_HLMEo.ttf",
      "700italic": "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZgoCNI0un_HLMEo.ttf",
      "800italic": "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZm0CNI0un_HLMEo.ttf",
      "900italic": "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZkQCNI0un_HLMEo.ttf"
    }
  },
  {
    family: "Noto Serif JP",
    category: "serif",
    subsets: ["japanese", "latin"],
    variants: ["200", "300", "regular", "500", "600", "700", "900"],
    files: {
      200: "http://fonts.gstatic.com/s/notoserifjp/v21/xn77YHs72GKoTvER4Gn3b5eMZBaPRkgfU8fEwb0.otf",
      300: "http://fonts.gstatic.com/s/notoserifjp/v21/xn77YHs72GKoTvER4Gn3b5eMZHKMRkgfU8fEwb0.otf",
      500: "http://fonts.gstatic.com/s/notoserifjp/v21/xn77YHs72GKoTvER4Gn3b5eMZCqNRkgfU8fEwb0.otf",
      600: "http://fonts.gstatic.com/s/notoserifjp/v21/xn77YHs72GKoTvER4Gn3b5eMZAaKRkgfU8fEwb0.otf",
      700: "http://fonts.gstatic.com/s/notoserifjp/v21/xn77YHs72GKoTvER4Gn3b5eMZGKLRkgfU8fEwb0.otf",
      900: "http://fonts.gstatic.com/s/notoserifjp/v21/xn77YHs72GKoTvER4Gn3b5eMZFqJRkgfU8fEwb0.otf",
      regular: "http://fonts.gstatic.com/s/notoserifjp/v21/xn7mYHs72GKoTvER4Gn3b5eMXNikYkY0T84.otf"
    }
  },
  {
    family: "Crimson Text",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "italic", "600", "600italic", "700", "700italic"],
    files: {
      600: "http://fonts.gstatic.com/s/crimsontext/v19/wlppgwHKFkZgtmSR3NB0oRJXsCx2C9lR1LFffg.ttf",
      700: "http://fonts.gstatic.com/s/crimsontext/v19/wlppgwHKFkZgtmSR3NB0oRJX1C12C9lR1LFffg.ttf",
      regular: "http://fonts.gstatic.com/s/crimsontext/v19/wlp2gwHKFkZgtmSR3NB0oRJvaAJSA_JN3Q.ttf",
      italic: "http://fonts.gstatic.com/s/crimsontext/v19/wlpogwHKFkZgtmSR3NB0oRJfaghWIfdd3ahG.ttf",
      "600italic": "http://fonts.gstatic.com/s/crimsontext/v19/wlprgwHKFkZgtmSR3NB0oRJfajCOD9NV9rRPfrKu.ttf",
      "700italic": "http://fonts.gstatic.com/s/crimsontext/v19/wlprgwHKFkZgtmSR3NB0oRJfajDqDtNV9rRPfrKu.ttf"
    }
  },
  {
    family: "Lobster",
    category: "display",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/lobster/v30/neILzCirqoswsqX9_oWsMqEzSJQ.ttf"
    }
  },
  {
    family: "Pacifico",
    category: "handwriting",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ96A4sijpFu_.ttf"
    }
  },
  {
    family: "Exo 2",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jvvOcPtq-rpvLpQ.ttf",
      200: "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jPvKcPtq-rpvLpQ.ttf",
      300: "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8j4PKcPtq-rpvLpQ.ttf",
      500: "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jjPKcPtq-rpvLpQ.ttf",
      600: "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jYPWcPtq-rpvLpQ.ttf",
      700: "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jWfWcPtq-rpvLpQ.ttf",
      800: "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jPvWcPtq-rpvLpQ.ttf",
      900: "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jF_WcPtq-rpvLpQ.ttf",
      regular: "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jvvKcPtq-rpvLpQ.ttf",
      "100italic": "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drF0fNC6jJ7bpQBL.ttf",
      "200italic": "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drH0fdC6jJ7bpQBL.ttf",
      "300italic": "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drEqfdC6jJ7bpQBL.ttf",
      italic: "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drF0fdC6jJ7bpQBL.ttf",
      "500italic": "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drFGfdC6jJ7bpQBL.ttf",
      "600italic": "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drGqetC6jJ7bpQBL.ttf",
      "700italic": "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drGTetC6jJ7bpQBL.ttf",
      "800italic": "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drH0etC6jJ7bpQBL.ttf",
      "900italic": "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drHdetC6jJ7bpQBL.ttf"
    }
  },
  {
    family: "Teko",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/teko/v20/LYjYdG7kmE0gV69VVPPdFl06VN9JG7Sy3TKEvkCF.ttf",
      500: "http://fonts.gstatic.com/s/teko/v20/LYjYdG7kmE0gV69VVPPdFl06VN8lG7Sy3TKEvkCF.ttf",
      600: "http://fonts.gstatic.com/s/teko/v20/LYjYdG7kmE0gV69VVPPdFl06VN_JHLSy3TKEvkCF.ttf",
      700: "http://fonts.gstatic.com/s/teko/v20/LYjYdG7kmE0gV69VVPPdFl06VN_wHLSy3TKEvkCF.ttf",
      regular: "http://fonts.gstatic.com/s/teko/v20/LYjYdG7kmE0gV69VVPPdFl06VN8XG7Sy3TKEvkCF.ttf"
    }
  },
  {
    family: "Prompt",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/prompt/v10/-W_9XJnvUD7dzB2CA9oYREcjeo0k.ttf",
      200: "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cr_s4bmkvc5Q9dw.ttf",
      300: "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cy_g4bmkvc5Q9dw.ttf",
      500: "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Ck_k4bmkvc5Q9dw.ttf",
      600: "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cv_44bmkvc5Q9dw.ttf",
      700: "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2C2_84bmkvc5Q9dw.ttf",
      800: "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cx_w4bmkvc5Q9dw.ttf",
      900: "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2C4_04bmkvc5Q9dw.ttf",
      "100italic": "http://fonts.gstatic.com/s/prompt/v10/-W_7XJnvUD7dzB2KZeJ8TkMBf50kbiM.ttf",
      "200italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLQb2MrUZEtdzow.ttf",
      "300italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeK0bGMrUZEtdzow.ttf",
      regular: "http://fonts.gstatic.com/s/prompt/v10/-W__XJnvUD7dzB26Z9AcZkIzeg.ttf",
      italic: "http://fonts.gstatic.com/s/prompt/v10/-W_9XJnvUD7dzB2KZdoYREcjeo0k.ttf",
      "500italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLsbWMrUZEtdzow.ttf",
      "600italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLAamMrUZEtdzow.ttf",
      "700italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeKka2MrUZEtdzow.ttf",
      "800italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeK4aGMrUZEtdzow.ttf",
      "900italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeKcaWMrUZEtdzow.ttf"
    }
  },
  {
    family: "Comfortaa",
    category: "display",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/comfortaa/v45/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4TbMPrQVIT9c2c8.ttf",
      500: "http://fonts.gstatic.com/s/comfortaa/v45/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4VrMPrQVIT9c2c8.ttf",
      600: "http://fonts.gstatic.com/s/comfortaa/v45/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4bbLPrQVIT9c2c8.ttf",
      700: "http://fonts.gstatic.com/s/comfortaa/v45/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LPrQVIT9c2c8.ttf",
      regular: "http://fonts.gstatic.com/s/comfortaa/v45/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMPrQVIT9c2c8.ttf"
    }
  },
  {
    family: "Material Icons Round",
    category: "monospace",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/materialiconsround/v108/LDItaoyNOAY6Uewc665JcIzCKsKc_M9flwmMq_fTTvg-.otf"
    }
  },
  {
    family: "Maven Pro",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700", "800", "900"],
    files: {
      500: "http://fonts.gstatic.com/s/mavenpro/v33/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8Rf25nCpozp5GvU.ttf",
      600: "http://fonts.gstatic.com/s/mavenpro/v33/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8fvx5nCpozp5GvU.ttf",
      700: "http://fonts.gstatic.com/s/mavenpro/v33/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8cLx5nCpozp5GvU.ttf",
      800: "http://fonts.gstatic.com/s/mavenpro/v33/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8aXx5nCpozp5GvU.ttf",
      900: "http://fonts.gstatic.com/s/mavenpro/v33/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8Yzx5nCpozp5GvU.ttf",
      regular: "http://fonts.gstatic.com/s/mavenpro/v33/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8SX25nCpozp5GvU.ttf"
    }
  },
  {
    family: "Archivo",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTNDJp8B1oJ0vyVQ.ttf",
      200: "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTtDNp8B1oJ0vyVQ.ttf",
      300: "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTajNp8B1oJ0vyVQ.ttf",
      500: "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTBjNp8B1oJ0vyVQ.ttf",
      600: "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTT6jRp8B1oJ0vyVQ.ttf",
      700: "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTT0zRp8B1oJ0vyVQ.ttf",
      800: "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTtDRp8B1oJ0vyVQ.ttf",
      900: "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTnTRp8B1oJ0vyVQ.ttf",
      regular: "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTNDNp8B1oJ0vyVQ.ttf",
      "100italic": "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HCBshdsBU7iVdxQ.ttf",
      "200italic": "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HABsxdsBU7iVdxQ.ttf",
      "300italic": "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HDfsxdsBU7iVdxQ.ttf",
      italic: "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HCBsxdsBU7iVdxQ.ttf",
      "500italic": "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HCzsxdsBU7iVdxQ.ttf",
      "600italic": "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HBftBdsBU7iVdxQ.ttf",
      "700italic": "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HBmtBdsBU7iVdxQ.ttf",
      "800italic": "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HABtBdsBU7iVdxQ.ttf",
      "900italic": "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HAotBdsBU7iVdxQ.ttf"
    }
  },
  {
    family: "Fjalla One",
    category: "sans-serif",
    subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/fjallaone/v15/Yq6R-LCAWCX3-6Ky7FAFnOZwkxgtUb8.ttf"
    }
  },
  {
    family: "Signika Negative",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/signikanegative/v21/E21x_cfngu7HiRpPX3ZpNE4kY5zKSPmJXkF0VDD2RAr5S73st9hiuEq8.ttf",
      500: "http://fonts.gstatic.com/s/signikanegative/v21/E21x_cfngu7HiRpPX3ZpNE4kY5zKSPmJXkF0VDD2RAqVS73st9hiuEq8.ttf",
      600: "http://fonts.gstatic.com/s/signikanegative/v21/E21x_cfngu7HiRpPX3ZpNE4kY5zKSPmJXkF0VDD2RAp5TL3st9hiuEq8.ttf",
      700: "http://fonts.gstatic.com/s/signikanegative/v21/E21x_cfngu7HiRpPX3ZpNE4kY5zKSPmJXkF0VDD2RApATL3st9hiuEq8.ttf",
      regular: "http://fonts.gstatic.com/s/signikanegative/v21/E21x_cfngu7HiRpPX3ZpNE4kY5zKSPmJXkF0VDD2RAqnS73st9hiuEq8.ttf"
    }
  },
  {
    family: "Varela Round",
    category: "sans-serif",
    subsets: ["hebrew", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/varelaround/v20/w8gdH283Tvk__Lua32TysjIvoMGOD9gxZw.ttf"
    }
  },
  {
    family: "Rajdhani",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pasEcOsc-bGkqIw.ttf",
      500: "http://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pb0EMOsc-bGkqIw.ttf",
      600: "http://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pbYF8Osc-bGkqIw.ttf",
      700: "http://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pa8FsOsc-bGkqIw.ttf",
      regular: "http://fonts.gstatic.com/s/rajdhani/v15/LDIxapCSOBg7S-QT7q4AOeekWPrP.ttf"
    }
  },
  {
    family: "IBM Plex Mono",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6pfjptAgt5VM-kVkqdyU8n3kwq0n1hj-sNFQ.ttf",
      200: "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3uAL8ldPg-IUDNg.ttf",
      300: "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3oQI8ldPg-IUDNg.ttf",
      500: "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3twJ8ldPg-IUDNg.ttf",
      600: "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3vAO8ldPg-IUDNg.ttf",
      700: "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3pQP8ldPg-IUDNg.ttf",
      "100italic": "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6rfjptAgt5VM-kVkqdyU8n1ioStndlre4dFcFh.ttf",
      "200italic": "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n1ioSGlZFh8ARHNh4zg.ttf",
      "300italic": "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n1ioSflVFh8ARHNh4zg.ttf",
      regular: "http://fonts.gstatic.com/s/ibmplexmono/v19/-F63fjptAgt5VM-kVkqdyU8n5igg1l9kn-s.ttf",
      italic: "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6pfjptAgt5VM-kVkqdyU8n1ioq0n1hj-sNFQ.ttf",
      "500italic": "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n1ioSJlRFh8ARHNh4zg.ttf",
      "600italic": "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n1ioSClNFh8ARHNh4zg.ttf",
      "700italic": "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n1ioSblJFh8ARHNh4zg.ttf"
    }
  },
  {
    family: "Outfit",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC0C4G-EiAou6Y.ttf",
      200: "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4bC1C4G-EiAou6Y.ttf",
      300: "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4W61C4G-EiAou6Y.ttf",
      500: "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4QK1C4G-EiAou6Y.ttf",
      600: "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4e6yC4G-EiAou6Y.ttf",
      700: "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4deyC4G-EiAou6Y.ttf",
      800: "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4bCyC4G-EiAou6Y.ttf",
      900: "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4ZmyC4G-EiAou6Y.ttf",
      regular: "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.ttf"
    }
  },
  {
    family: "DM Serif Display",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/dmserifdisplay/v15/-nFnOHM81r4j6k0gjAW3mujVU2B2K_d709jy92k.ttf",
      italic: "http://fonts.gstatic.com/s/dmserifdisplay/v15/-nFhOHM81r4j6k0gjAW3mujVU2B2G_Vx1_r352np3Q.ttf"
    }
  },
  {
    family: "Arvo",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/arvo/v22/tDbM2oWUg0MKoZw1yLTA8vL7lAE.ttf",
      regular: "http://fonts.gstatic.com/s/arvo/v22/tDbD2oWUg0MKmSAa7Lzr7vs.ttf",
      italic: "http://fonts.gstatic.com/s/arvo/v22/tDbN2oWUg0MKqSIQ6J7u_vvijQ.ttf",
      "700italic": "http://fonts.gstatic.com/s/arvo/v22/tDbO2oWUg0MKqSIoVLHK9tD-hAHkGg.ttf"
    }
  },
  {
    family: "Overpass",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6_PLrOZCLtce-og.ttf",
      200: "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6fPPrOZCLtce-og.ttf",
      300: "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6ovPrOZCLtce-og.ttf",
      500: "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6zvPrOZCLtce-og.ttf",
      600: "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6IvTrOZCLtce-og.ttf",
      700: "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6G_TrOZCLtce-og.ttf",
      800: "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6fPTrOZCLtce-og.ttf",
      900: "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6VfTrOZCLtce-og.ttf",
      regular: "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6_PPrOZCLtce-og.ttf",
      "100italic": "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLADe5qPl8Kuosgz.ttf",
      "200italic": "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLCDepqPl8Kuosgz.ttf",
      "300italic": "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLBdepqPl8Kuosgz.ttf",
      italic: "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLADepqPl8Kuosgz.ttf",
      "500italic": "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLAxepqPl8Kuosgz.ttf",
      "600italic": "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLDdfZqPl8Kuosgz.ttf",
      "700italic": "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLDkfZqPl8Kuosgz.ttf",
      "800italic": "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLCDfZqPl8Kuosgz.ttf",
      "900italic": "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLCqfZqPl8Kuosgz.ttf"
    }
  },
  {
    family: "Caveat",
    category: "handwriting",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular", "500", "600", "700"],
    files: {
      500: "http://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjcB9SIKjYBxPigs.ttf",
      600: "http://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjSx6SIKjYBxPigs.ttf",
      700: "http://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjRV6SIKjYBxPigs.ttf",
      regular: "http://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9SIKjYBxPigs.ttf"
    }
  },
  {
    family: "Public Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuFpi5ww0pX189fg.ttf",
      200: "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymulpm5ww0pX189fg.ttf",
      300: "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuSJm5ww0pX189fg.ttf",
      500: "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuJJm5ww0pX189fg.ttf",
      600: "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuyJ65ww0pX189fg.ttf",
      700: "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymu8Z65ww0pX189fg.ttf",
      800: "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymulp65ww0pX189fg.ttf",
      900: "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuv565ww0pX189fg.ttf",
      regular: "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuFpm5ww0pX189fg.ttf",
      "100italic": "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tpRgQctfVotfj7j.ttf",
      "200italic": "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673trRgActfVotfj7j.ttf",
      "300italic": "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673toPgActfVotfj7j.ttf",
      italic: "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tpRgActfVotfj7j.ttf",
      "500italic": "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tpjgActfVotfj7j.ttf",
      "600italic": "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tqPhwctfVotfj7j.ttf",
      "700italic": "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tq2hwctfVotfj7j.ttf",
      "800italic": "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673trRhwctfVotfj7j.ttf",
      "900italic": "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tr4hwctfVotfj7j.ttf"
    }
  },
  {
    family: "Cormorant Garamond",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic"
    ],
    files: {
      300: "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQAllvuQWJ5heb_w.ttf",
      500: "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQWlhvuQWJ5heb_w.ttf",
      600: "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQdl9vuQWJ5heb_w.ttf",
      700: "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQEl5vuQWJ5heb_w.ttf",
      "300italic": "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3WmX5slCNuHLi8bLeY9MK7whWMhyjYrEPjuw-NxBKL_y94.ttf",
      regular: "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjornFLsS6V7w.ttf",
      italic: "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrHtPkyuF7w6C.ttf",
      "500italic": "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3WmX5slCNuHLi8bLeY9MK7whWMhyjYrEO7ug-NxBKL_y94.ttf",
      "600italic": "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3WmX5slCNuHLi8bLeY9MK7whWMhyjYrEOXvQ-NxBKL_y94.ttf",
      "700italic": "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3WmX5slCNuHLi8bLeY9MK7whWMhyjYrEPzvA-NxBKL_y94.ttf"
    }
  },
  {
    family: "M PLUS Rounded 1c",
    category: "sans-serif",
    subsets: [
      "cyrillic",
      "cyrillic-ext",
      "greek",
      "greek-ext",
      "hebrew",
      "japanese",
      "latin",
      "latin-ext",
      "vietnamese"
    ],
    variants: ["100", "300", "regular", "500", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGCAYIAV6gnpUpoWwNkYvrugw9RuM3ixLsg6-av1x0.ttf",
      300: "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGBAYIAV6gnpUpoWwNkYvrugw9RuM0q5psKxeqmzgRK.ttf",
      500: "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGBAYIAV6gnpUpoWwNkYvrugw9RuM1y55sKxeqmzgRK.ttf",
      700: "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGBAYIAV6gnpUpoWwNkYvrugw9RuM064ZsKxeqmzgRK.ttf",
      800: "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGBAYIAV6gnpUpoWwNkYvrugw9RuM0m4psKxeqmzgRK.ttf",
      900: "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGBAYIAV6gnpUpoWwNkYvrugw9RuM0C45sKxeqmzgRK.ttf",
      regular: "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGEAYIAV6gnpUpoWwNkYvrugw9RuPWGzr8C7vav.ttf"
    }
  },
  {
    family: "Slabo 27px",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/slabo27px/v14/mFT0WbgBwKPR_Z4hGN2qsxgJ1EJ7i90.ttf"
    }
  },
  {
    family: "Abril Fatface",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/abrilfatface/v23/zOL64pLDlL1D99S8g8PtiKchm-BsjOLhZBY.ttf"
    }
  },
  {
    family: "Satisfy",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/satisfy/v21/rP2Hp2yn6lkG50LoOZSCHBeHFl0.ttf"
    }
  },
  {
    family: "Asap",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYkqQsLmOXoA7Glw.ttf",
      200: "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYEqUsLmOXoA7Glw.ttf",
      300: "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYzKUsLmOXoA7Glw.ttf",
      500: "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYoKUsLmOXoA7Glw.ttf",
      600: "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYTKIsLmOXoA7Glw.ttf",
      700: "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYdaIsLmOXoA7Glw.ttf",
      800: "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYEqIsLmOXoA7Glw.ttf",
      900: "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYO6IsLmOXoA7Glw.ttf",
      regular: "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYkqUsLmOXoA7Glw.ttf",
      "100italic": "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWubEbGmTggvWl0Qn.ttf",
      "200italic": "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWuZEbWmTggvWl0Qn.ttf",
      "300italic": "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWuaabWmTggvWl0Qn.ttf",
      italic: "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWubEbWmTggvWl0Qn.ttf",
      "500italic": "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWub2bWmTggvWl0Qn.ttf",
      "600italic": "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWuYaammTggvWl0Qn.ttf",
      "700italic": "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWuYjammTggvWl0Qn.ttf",
      "800italic": "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWuZEammTggvWl0Qn.ttf",
      "900italic": "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWuZtammTggvWl0Qn.ttf"
    }
  },
  {
    family: "Red Hat Display",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      300: "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbjKWckg5-Xecg3w.ttf",
      500: "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbl6Wckg5-Xecg3w.ttf",
      600: "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbrKRckg5-Xecg3w.ttf",
      700: "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbouRckg5-Xecg3w.ttf",
      800: "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbuyRckg5-Xecg3w.ttf",
      900: "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbsWRckg5-Xecg3w.ttf",
      regular: "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbmyWckg5-Xecg3w.ttf",
      "300italic": "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVxAsz_VWZk3zJGg.ttf",
      italic: "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVmgsz_VWZk3zJGg.ttf",
      "500italic": "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVqAsz_VWZk3zJGg.ttf",
      "600italic": "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVRAwz_VWZk3zJGg.ttf",
      "700italic": "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVfQwz_VWZk3zJGg.ttf",
      "800italic": "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVGgwz_VWZk3zJGg.ttf",
      "900italic": "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVMwwz_VWZk3zJGg.ttf"
    }
  },
  {
    family: "Shadows Into Light",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/shadowsintolight/v19/UqyNK9UOIntux_czAvDQx_ZcHqZXBNQDcsr4xzSMYA.ttf"
    }
  },
  {
    family: "Noto Sans Arabic",
    category: "sans-serif",
    subsets: ["arabic"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfyG2vu3CBFQLaig.ttf",
      200: "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfSGyvu3CBFQLaig.ttf",
      300: "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCflmyvu3CBFQLaig.ttf",
      500: "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCf-myvu3CBFQLaig.ttf",
      600: "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfFmuvu3CBFQLaig.ttf",
      700: "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfL2uvu3CBFQLaig.ttf",
      800: "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfSGuvu3CBFQLaig.ttf",
      900: "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfYWuvu3CBFQLaig.ttf",
      regular: "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfyGyvu3CBFQLaig.ttf"
    }
  },
  {
    family: "Merriweather Sans",
    category: "sans-serif",
    subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic"
    ],
    files: {
      300: "http://fonts.gstatic.com/s/merriweathersans/v26/2-cO9IRs1JiJN1FRAMjTN5zd9vgsFF_5asQTb6hZ2JKZ_O4ljuEG7xFHnQ.ttf",
      500: "http://fonts.gstatic.com/s/merriweathersans/v26/2-cO9IRs1JiJN1FRAMjTN5zd9vgsFF_5asQTb6hZ2JKZkO4ljuEG7xFHnQ.ttf",
      600: "http://fonts.gstatic.com/s/merriweathersans/v26/2-cO9IRs1JiJN1FRAMjTN5zd9vgsFF_5asQTb6hZ2JKZfOkljuEG7xFHnQ.ttf",
      700: "http://fonts.gstatic.com/s/merriweathersans/v26/2-cO9IRs1JiJN1FRAMjTN5zd9vgsFF_5asQTb6hZ2JKZRekljuEG7xFHnQ.ttf",
      800: "http://fonts.gstatic.com/s/merriweathersans/v26/2-cO9IRs1JiJN1FRAMjTN5zd9vgsFF_5asQTb6hZ2JKZIukljuEG7xFHnQ.ttf",
      regular: "http://fonts.gstatic.com/s/merriweathersans/v26/2-cO9IRs1JiJN1FRAMjTN5zd9vgsFF_5asQTb6hZ2JKZou4ljuEG7xFHnQ.ttf",
      "300italic": "http://fonts.gstatic.com/s/merriweathersans/v26/2-cM9IRs1JiJN1FRAMjTN5zd9vgsFHXwWDvLBsPDdpWMaq2TzesCzRRXnaur.ttf",
      italic: "http://fonts.gstatic.com/s/merriweathersans/v26/2-cM9IRs1JiJN1FRAMjTN5zd9vgsFHXwWDvLBsPDdpWMaq3NzesCzRRXnaur.ttf",
      "500italic": "http://fonts.gstatic.com/s/merriweathersans/v26/2-cM9IRs1JiJN1FRAMjTN5zd9vgsFHXwWDvLBsPDdpWMaq3_zesCzRRXnaur.ttf",
      "600italic": "http://fonts.gstatic.com/s/merriweathersans/v26/2-cM9IRs1JiJN1FRAMjTN5zd9vgsFHXwWDvLBsPDdpWMaq0TyusCzRRXnaur.ttf",
      "700italic": "http://fonts.gstatic.com/s/merriweathersans/v26/2-cM9IRs1JiJN1FRAMjTN5zd9vgsFHXwWDvLBsPDdpWMaq0qyusCzRRXnaur.ttf",
      "800italic": "http://fonts.gstatic.com/s/merriweathersans/v26/2-cM9IRs1JiJN1FRAMjTN5zd9vgsFHXwWDvLBsPDdpWMaq1NyusCzRRXnaur.ttf"
    }
  },
  {
    family: "Fira Sans Condensed",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOjEADFm8hSaQTFG18FErVhsC9x-tarWZXtqOlQfx9CjA.ttf",
      200: "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWTnMiMN-cxZblY4.ttf",
      300: "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWV3PiMN-cxZblY4.ttf",
      500: "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWQXOiMN-cxZblY4.ttf",
      600: "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWSnJiMN-cxZblY4.ttf",
      700: "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWU3IiMN-cxZblY4.ttf",
      800: "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWVHLiMN-cxZblY4.ttf",
      900: "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWXXKiMN-cxZblY4.ttf",
      "100italic": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOtEADFm8hSaQTFG18FErVhsC9x-tarUfPVzONUXRpSjJcu.ttf",
      "200italic": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVYMJ0dzRehY43EA.ttf",
      "300italic": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVBMF0dzRehY43EA.ttf",
      regular: "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOhEADFm8hSaQTFG18FErVhsC9x-tarYfHnrMtVbx8.ttf",
      italic: "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOjEADFm8hSaQTFG18FErVhsC9x-tarUfPtqOlQfx9CjA.ttf",
      "500italic": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVXMB0dzRehY43EA.ttf",
      "600italic": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVcMd0dzRehY43EA.ttf",
      "700italic": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVFMZ0dzRehY43EA.ttf",
      "800italic": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVCMV0dzRehY43EA.ttf",
      "900italic": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVLMR0dzRehY43EA.ttf"
    }
  },
  {
    family: "Material Icons Sharp",
    category: "monospace",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/materialiconssharp/v109/oPWQ_lt5nv4pWNJpghLP75WiFR4kLh3kvmvSImEyc0vd.otf"
    }
  },
  {
    family: "Zilla Slab",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic"
    ],
    files: {
      300: "http://fonts.gstatic.com/s/zillaslab/v11/dFa5ZfeM_74wlPZtksIFYpEY2HSjWlhzbaw.ttf",
      500: "http://fonts.gstatic.com/s/zillaslab/v11/dFa5ZfeM_74wlPZtksIFYskZ2HSjWlhzbaw.ttf",
      600: "http://fonts.gstatic.com/s/zillaslab/v11/dFa5ZfeM_74wlPZtksIFYuUe2HSjWlhzbaw.ttf",
      700: "http://fonts.gstatic.com/s/zillaslab/v11/dFa5ZfeM_74wlPZtksIFYoEf2HSjWlhzbaw.ttf",
      "300italic": "http://fonts.gstatic.com/s/zillaslab/v11/dFanZfeM_74wlPZtksIFaj8CVHapXnp2fazkfg.ttf",
      regular: "http://fonts.gstatic.com/s/zillaslab/v11/dFa6ZfeM_74wlPZtksIFWj0w_HyIRlE.ttf",
      italic: "http://fonts.gstatic.com/s/zillaslab/v11/dFa4ZfeM_74wlPZtksIFaj86-F6NVlFqdA.ttf",
      "500italic": "http://fonts.gstatic.com/s/zillaslab/v11/dFanZfeM_74wlPZtksIFaj8CDHepXnp2fazkfg.ttf",
      "600italic": "http://fonts.gstatic.com/s/zillaslab/v11/dFanZfeM_74wlPZtksIFaj8CIHCpXnp2fazkfg.ttf",
      "700italic": "http://fonts.gstatic.com/s/zillaslab/v11/dFanZfeM_74wlPZtksIFaj8CRHGpXnp2fazkfg.ttf"
    }
  },
  {
    family: "Tajawal",
    category: "sans-serif",
    subsets: ["arabic", "latin"],
    variants: ["200", "300", "regular", "500", "700", "800", "900"],
    files: {
      200: "http://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l_6gLrZjiLlJ-G0.ttf",
      300: "http://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l5qjLrZjiLlJ-G0.ttf",
      500: "http://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l8KiLrZjiLlJ-G0.ttf",
      700: "http://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l4qkLrZjiLlJ-G0.ttf",
      800: "http://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l5anLrZjiLlJ-G0.ttf",
      900: "http://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l7KmLrZjiLlJ-G0.ttf",
      regular: "http://fonts.gstatic.com/s/tajawal/v9/Iura6YBj_oCad4k1rzaLCr5IlLA.ttf"
    }
  },
  {
    family: "Material Symbols Rounded",
    category: "monospace",
    subsets: ["latin"],
    variants: ["100", "200", "300", "regular", "500", "600", "700"],
    files: {
      100: "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rIekXxKJKJBjAa8.ttf",
      200: "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rAelXxKJKJBjAa8.ttf",
      300: "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rNmlXxKJKJBjAa8.ttf",
      500: "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rLWlXxKJKJBjAa8.ttf",
      600: "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rFmiXxKJKJBjAa8.ttf",
      700: "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rGCiXxKJKJBjAa8.ttf",
      regular: "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rIelXxKJKJBjAa8.ttf"
    }
  },
  {
    family: "Play",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/play/v19/6ae84K2oVqwItm4TOpc423nTJTM.ttf",
      regular: "http://fonts.gstatic.com/s/play/v19/6aez4K2oVqwIjtI8Hp8Tx3A.ttf"
    }
  },
  {
    family: "Hind Madurai",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "tamil"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/hindmadurai/v11/f0Xu0e2p98ZvDXdZQIOcpqjfXaUnecsoMJ0b_g.ttf",
      500: "http://fonts.gstatic.com/s/hindmadurai/v11/f0Xu0e2p98ZvDXdZQIOcpqjfBaQnecsoMJ0b_g.ttf",
      600: "http://fonts.gstatic.com/s/hindmadurai/v11/f0Xu0e2p98ZvDXdZQIOcpqjfKaMnecsoMJ0b_g.ttf",
      700: "http://fonts.gstatic.com/s/hindmadurai/v11/f0Xu0e2p98ZvDXdZQIOcpqjfTaInecsoMJ0b_g.ttf",
      regular: "http://fonts.gstatic.com/s/hindmadurai/v11/f0Xx0e2p98ZvDXdZQIOcpqjn8Y0DceA0OQ.ttf"
    }
  },
  {
    family: "Indie Flower",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/indieflower/v21/m8JVjfNVeKWVnh3QMuKkFcZlbkGG1dKEDw.ttf"
    }
  },
  {
    family: "Barlow Semi Condensed",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlphgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRfG4qvKk8ogoSP.ttf",
      200: "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRft6uPAGEki52WfA.ttf",
      300: "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRf06iPAGEki52WfA.ttf",
      500: "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRfi6mPAGEki52WfA.ttf",
      600: "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRfp66PAGEki52WfA.ttf",
      700: "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRfw6-PAGEki52WfA.ttf",
      800: "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRf36yPAGEki52WfA.ttf",
      900: "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRf-62PAGEki52WfA.ttf",
      "100italic": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpjgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbLLIEsKh5SPZWs.ttf",
      "200italic": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbJnAWsgqZiGfHK5.ttf",
      "300italic": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbIDAmsgqZiGfHK5.ttf",
      regular: "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpvgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRnf4CrCEo4gg.ttf",
      italic: "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlphgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfYqvKk8ogoSP.ttf",
      "500italic": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbJbA2sgqZiGfHK5.ttf",
      "600italic": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbJ3BGsgqZiGfHK5.ttf",
      "700italic": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbITBWsgqZiGfHK5.ttf",
      "800italic": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbIPBmsgqZiGfHK5.ttf",
      "900italic": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbIrB2sgqZiGfHK5.ttf"
    }
  },
  {
    family: "Chakra Petch",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic"
    ],
    files: {
      300: "http://fonts.gstatic.com/s/chakrapetch/v11/cIflMapbsEk7TDLdtEz1BwkeNIhFQJXE3AY00g.ttf",
      500: "http://fonts.gstatic.com/s/chakrapetch/v11/cIflMapbsEk7TDLdtEz1BwkebIlFQJXE3AY00g.ttf",
      600: "http://fonts.gstatic.com/s/chakrapetch/v11/cIflMapbsEk7TDLdtEz1BwkeQI5FQJXE3AY00g.ttf",
      700: "http://fonts.gstatic.com/s/chakrapetch/v11/cIflMapbsEk7TDLdtEz1BwkeJI9FQJXE3AY00g.ttf",
      "300italic": "http://fonts.gstatic.com/s/chakrapetch/v11/cIfnMapbsEk7TDLdtEz1BwkWmpLJQp_A_gMk0izH.ttf",
      regular: "http://fonts.gstatic.com/s/chakrapetch/v11/cIf6MapbsEk7TDLdtEz1BwkmmKBhSL7Y1Q.ttf",
      italic: "http://fonts.gstatic.com/s/chakrapetch/v11/cIfkMapbsEk7TDLdtEz1BwkWmqplarvI1R8t.ttf",
      "500italic": "http://fonts.gstatic.com/s/chakrapetch/v11/cIfnMapbsEk7TDLdtEz1BwkWmpKRQ5_A_gMk0izH.ttf",
      "600italic": "http://fonts.gstatic.com/s/chakrapetch/v11/cIfnMapbsEk7TDLdtEz1BwkWmpK9RJ_A_gMk0izH.ttf",
      "700italic": "http://fonts.gstatic.com/s/chakrapetch/v11/cIfnMapbsEk7TDLdtEz1BwkWmpLZRZ_A_gMk0izH.ttf"
    }
  },
  {
    family: "Nanum Myeongjo",
    category: "serif",
    subsets: ["korean", "latin"],
    variants: ["regular", "700", "800"],
    files: {
      700: "http://fonts.gstatic.com/s/nanummyeongjo/v22/9Bty3DZF0dXLMZlywRbVRNhxy2pXV1A0pfCs5Kos.ttf",
      800: "http://fonts.gstatic.com/s/nanummyeongjo/v22/9Bty3DZF0dXLMZlywRbVRNhxy2pLVFA0pfCs5Kos.ttf",
      regular: "http://fonts.gstatic.com/s/nanummyeongjo/v22/9Btx3DZF0dXLMZlywRbVRNhxy1LreHQ8juyl.ttf"
    }
  },
  {
    family: "IBM Plex Sans Arabic",
    category: "sans-serif",
    subsets: ["arabic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700"],
    files: {
      100: "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3MZRtWPQCuHme67tEYUIx3Kh0PHR9N6YNe3PC5eMlAMg0.ttf",
      200: "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3NZRtWPQCuHme67tEYUIx3Kh0PHR9N6YPy_dCTVsVJKxTs.ttf",
      300: "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3NZRtWPQCuHme67tEYUIx3Kh0PHR9N6YOW_tCTVsVJKxTs.ttf",
      500: "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3NZRtWPQCuHme67tEYUIx3Kh0PHR9N6YPO_9CTVsVJKxTs.ttf",
      600: "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3NZRtWPQCuHme67tEYUIx3Kh0PHR9N6YPi-NCTVsVJKxTs.ttf",
      700: "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3NZRtWPQCuHme67tEYUIx3Kh0PHR9N6YOG-dCTVsVJKxTs.ttf",
      regular: "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3CZRtWPQCuHme67tEYUIx3Kh0PHR9N6bs61vSbfdlA.ttf"
    }
  },
  {
    family: "Material Icons Two Tone",
    category: "monospace",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/materialiconstwotone/v112/hESh6WRmNCxEqUmNyh3JDeGxjVVyMg4tHGctNCu3NjDrH_77.otf"
    }
  },
  {
    family: "Archivo Black",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/archivoblack/v21/HTxqL289NzCGg4MzN6KJ7eW6OYuP_x7yx3A.ttf"
    }
  },
  {
    family: "Noto Sans HK",
    category: "sans-serif",
    subsets: ["chinese-hongkong", "cyrillic", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qHB_-oWTiYjNvVA.ttf",
      200: "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qPB--oWTiYjNvVA.ttf",
      300: "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qC5--oWTiYjNvVA.ttf",
      500: "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qEJ--oWTiYjNvVA.ttf",
      600: "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qK55-oWTiYjNvVA.ttf",
      700: "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qJd5-oWTiYjNvVA.ttf",
      800: "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qPB5-oWTiYjNvVA.ttf",
      900: "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qNl5-oWTiYjNvVA.ttf",
      regular: "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qHB--oWTiYjNvVA.ttf"
    }
  },
  {
    family: "Catamaran",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "tamil"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPHjc1anXuluiLyw.ttf",
      200: "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPPjd1anXuluiLyw.ttf",
      300: "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPCbd1anXuluiLyw.ttf",
      500: "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPErd1anXuluiLyw.ttf",
      600: "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPKba1anXuluiLyw.ttf",
      700: "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPJ_a1anXuluiLyw.ttf",
      800: "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPPja1anXuluiLyw.ttf",
      900: "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPNHa1anXuluiLyw.ttf",
      regular: "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPHjd1anXuluiLyw.ttf"
    }
  },
  {
    family: "Asap Condensed",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic"
    ],
    files: {
      200: "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO9DSWlEgGqgp-pO.ttf",
      300: "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO8nSmlEgGqgp-pO.ttf",
      500: "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO9_S2lEgGqgp-pO.ttf",
      600: "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO9TTGlEgGqgp-pO.ttf",
      700: "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO83TWlEgGqgp-pO.ttf",
      800: "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO8rTmlEgGqgp-pO.ttf",
      900: "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO8PT2lEgGqgp-pO.ttf",
      "200italic": "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUIFFim6CovpOkXA.ttf",
      "300italic": "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUOVGim6CovpOkXA.ttf",
      regular: "http://fonts.gstatic.com/s/asapcondensed/v17/pxidypY1o9NHyXh3WvSbGSggdNeLYk1Mq3ap.ttf",
      italic: "http://fonts.gstatic.com/s/asapcondensed/v17/pxifypY1o9NHyXh3WvSbGSggdOeJaElurmapvvM.ttf",
      "500italic": "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUL1Him6CovpOkXA.ttf",
      "600italic": "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUJFAim6CovpOkXA.ttf",
      "700italic": "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUPVBim6CovpOkXA.ttf",
      "800italic": "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUOlCim6CovpOkXA.ttf",
      "900italic": "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUM1Dim6CovpOkXA.ttf"
    }
  },
  {
    family: "Black Ops One",
    category: "display",
    subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/blackopsone/v20/qWcsB6-ypo7xBdr6Xshe96H3WDzRtjkho4M.ttf"
    }
  },
  {
    family: "Yanone Kaffeesatz",
    category: "sans-serif",
    subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700"],
    files: {
      200: "http://fonts.gstatic.com/s/yanonekaffeesatz/v29/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIftodtWpcGuLCnXkVA.ttf",
      300: "http://fonts.gstatic.com/s/yanonekaffeesatz/v29/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIftoqNWpcGuLCnXkVA.ttf",
      500: "http://fonts.gstatic.com/s/yanonekaffeesatz/v29/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIftoxNWpcGuLCnXkVA.ttf",
      600: "http://fonts.gstatic.com/s/yanonekaffeesatz/v29/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIftoKNKpcGuLCnXkVA.ttf",
      700: "http://fonts.gstatic.com/s/yanonekaffeesatz/v29/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIftoEdKpcGuLCnXkVA.ttf",
      regular: "http://fonts.gstatic.com/s/yanonekaffeesatz/v29/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIfto9tWpcGuLCnXkVA.ttf"
    }
  },
  {
    family: "Lilita One",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/lilitaone/v15/i7dPIFZ9Zz-WBtRtedDbUEZ2RFq7AwU.ttf"
    }
  },
  {
    family: "IBM Plex Serif",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/ibmplexserif/v19/jizBREVNn1dOx-zrZ2X3pZvkTi182zIZj1bIkNo.ttf",
      200: "http://fonts.gstatic.com/s/ibmplexserif/v19/jizAREVNn1dOx-zrZ2X3pZvkTi3Q-hIzoVrBicOg.ttf",
      300: "http://fonts.gstatic.com/s/ibmplexserif/v19/jizAREVNn1dOx-zrZ2X3pZvkTi20-RIzoVrBicOg.ttf",
      500: "http://fonts.gstatic.com/s/ibmplexserif/v19/jizAREVNn1dOx-zrZ2X3pZvkTi3s-BIzoVrBicOg.ttf",
      600: "http://fonts.gstatic.com/s/ibmplexserif/v19/jizAREVNn1dOx-zrZ2X3pZvkTi3A_xIzoVrBicOg.ttf",
      700: "http://fonts.gstatic.com/s/ibmplexserif/v19/jizAREVNn1dOx-zrZ2X3pZvkTi2k_hIzoVrBicOg.ttf",
      "100italic": "http://fonts.gstatic.com/s/ibmplexserif/v19/jizHREVNn1dOx-zrZ2X3pZvkTiUa41YTi3TNgNq55w.ttf",
      "200italic": "http://fonts.gstatic.com/s/ibmplexserif/v19/jizGREVNn1dOx-zrZ2X3pZvkTiUa4_oyq17jjNOg_oc.ttf",
      "300italic": "http://fonts.gstatic.com/s/ibmplexserif/v19/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xq17jjNOg_oc.ttf",
      regular: "http://fonts.gstatic.com/s/ibmplexserif/v19/jizDREVNn1dOx-zrZ2X3pZvkThUY0TY7ikbI.ttf",
      italic: "http://fonts.gstatic.com/s/ibmplexserif/v19/jizBREVNn1dOx-zrZ2X3pZvkTiUa2zIZj1bIkNo.ttf",
      "500italic": "http://fonts.gstatic.com/s/ibmplexserif/v19/jizGREVNn1dOx-zrZ2X3pZvkTiUa48Ywq17jjNOg_oc.ttf",
      "600italic": "http://fonts.gstatic.com/s/ibmplexserif/v19/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3q17jjNOg_oc.ttf",
      "700italic": "http://fonts.gstatic.com/s/ibmplexserif/v19/jizGREVNn1dOx-zrZ2X3pZvkTiUa4442q17jjNOg_oc.ttf"
    }
  },
  {
    family: "Plus Jakarta Sans",
    category: "sans-serif",
    subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic"
    ],
    files: {
      200: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      300: "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_907NShXUEKi4Rw.ttf",
      500: "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_m07NShXUEKi4Rw.ttf",
      600: "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_d0nNShXUEKi4Rw.ttf",
      700: "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_TknNShXUEKi4Rw.ttf",
      800: "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_KUnNShXUEKi4Rw.ttf",
      regular: "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_qU7NShXUEKi4Rw.ttf",
      "200italic": "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ2lCR_QMq2oR82k.ttf",
      "300italic": "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ17CR_QMq2oR82k.ttf",
      italic: "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ0lCR_QMq2oR82k.ttf",
      "500italic": "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ0XCR_QMq2oR82k.ttf",
      "600italic": "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ37Dh_QMq2oR82k.ttf",
      "700italic": "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ3CDh_QMq2oR82k.ttf",
      "800italic": "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ2lDh_QMq2oR82k.ttf"
    }
  },
  
  {
    family: "Montserrat",
    category: "sans-serif",
    subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic"
    ],
    files: {
      200: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      300: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      500: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      600: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      700: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      800: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      regular: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      "200italic": "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      "300italic": "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      italic: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      "500italic": "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      "600italic": "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      "700italic": "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      "800italic": "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
    }
  },
  {
    family: "Questrial",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/questrial/v18/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf"
    }
  },
  {
    family: "Domine",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "500", "600", "700"],
    files: {
      500: "http://fonts.gstatic.com/s/domine/v20/L0xhDFMnlVwD4h3Lt9JWnbX3jG-2X0DAI10VErGuW8Q.ttf",
      600: "http://fonts.gstatic.com/s/domine/v20/L0xhDFMnlVwD4h3Lt9JWnbX3jG-2X6zHI10VErGuW8Q.ttf",
      700: "http://fonts.gstatic.com/s/domine/v20/L0xhDFMnlVwD4h3Lt9JWnbX3jG-2X5XHI10VErGuW8Q.ttf",
      regular: "http://fonts.gstatic.com/s/domine/v20/L0xhDFMnlVwD4h3Lt9JWnbX3jG-2X3LAI10VErGuW8Q.ttf"
    }
  },
  {
    family: "Permanent Marker",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/permanentmarker/v16/Fh4uPib9Iyv2ucM6pGQMWimMp004HaqIfrT5nlk.ttf"
    }
  },
  {
    family: "Signika",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/signika/v25/vEF72_JTCgwQ5ejvMV0Ox_Kg1UwJ0tKfX4zNpD8E4ASzH1r93zuYzTMngt4xjw.ttf",
      500: "http://fonts.gstatic.com/s/signika/v25/vEF72_JTCgwQ5ejvMV0Ox_Kg1UwJ0tKfX4zNpD8E4ASzH1r9szuYzTMngt4xjw.ttf",
      600: "http://fonts.gstatic.com/s/signika/v25/vEF72_JTCgwQ5ejvMV0Ox_Kg1UwJ0tKfX4zNpD8E4ASzH1r9XzyYzTMngt4xjw.ttf",
      700: "http://fonts.gstatic.com/s/signika/v25/vEF72_JTCgwQ5ejvMV0Ox_Kg1UwJ0tKfX4zNpD8E4ASzH1r9ZjyYzTMngt4xjw.ttf",
      regular: "http://fonts.gstatic.com/s/signika/v25/vEF72_JTCgwQ5ejvMV0Ox_Kg1UwJ0tKfX4zNpD8E4ASzH1r9gTuYzTMngt4xjw.ttf"
    }
  },
  {
    family: "Frank Ruhl Libre",
    category: "serif",
    subsets: ["hebrew", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700", "800", "900"],
    files: {
      300: "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw6bYVqQPxR2EUR_.ttf",
      500: "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw73YVqQPxR2EUR_.ttf",
      600: "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw4bZlqQPxR2EUR_.ttf",
      700: "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw4iZlqQPxR2EUR_.ttf",
      800: "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw5FZlqQPxR2EUR_.ttf",
      900: "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw5sZlqQPxR2EUR_.ttf",
      regular: "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw7FYVqQPxR2EUR_.ttf"
    }
  },
  {
    family: "M PLUS 1p",
    category: "sans-serif",
    subsets: [
      "cyrillic",
      "cyrillic-ext",
      "greek",
      "greek-ext",
      "hebrew",
      "japanese",
      "latin",
      "latin-ext",
      "vietnamese"
    ],
    variants: ["100", "300", "regular", "500", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/mplus1p/v28/e3tleuShHdiFyPFzBRrQnDQAUW3aq-5N.ttf",
      300: "http://fonts.gstatic.com/s/mplus1p/v28/e3tmeuShHdiFyPFzBRrQVBYge0PWovdU4w.ttf",
      500: "http://fonts.gstatic.com/s/mplus1p/v28/e3tmeuShHdiFyPFzBRrQDBcge0PWovdU4w.ttf",
      700: "http://fonts.gstatic.com/s/mplus1p/v28/e3tmeuShHdiFyPFzBRrQRBEge0PWovdU4w.ttf",
      800: "http://fonts.gstatic.com/s/mplus1p/v28/e3tmeuShHdiFyPFzBRrQWBIge0PWovdU4w.ttf",
      900: "http://fonts.gstatic.com/s/mplus1p/v28/e3tmeuShHdiFyPFzBRrQfBMge0PWovdU4w.ttf",
      regular: "http://fonts.gstatic.com/s/mplus1p/v28/e3tjeuShHdiFyPFzBRro-D4Ec2jKqw.ttf"
    }
  },
  {
    family: "Acme",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/acme/v25/RrQfboBx-C5_bx3Lb23lzLk.ttf"
    }
  },
  {
    family: "Almarai",
    category: "sans-serif",
    subsets: ["arabic"],
    variants: ["300", "regular", "700", "800"],
    files: {
      300: "http://fonts.gstatic.com/s/almarai/v12/tssoApxBaigK_hnnS_anhnicoq72sXg.ttf",
      700: "http://fonts.gstatic.com/s/almarai/v12/tssoApxBaigK_hnnS-aghnicoq72sXg.ttf",
      800: "http://fonts.gstatic.com/s/almarai/v12/tssoApxBaigK_hnnS_qjhnicoq72sXg.ttf",
      regular: "http://fonts.gstatic.com/s/almarai/v12/tsstApxBaigK_hnnc1qPonC3vqc.ttf"
    }
  },
  {
    family: "Chivo",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_vB7ul2DSFXjQiQ.ttf",
      200: "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_PB_ul2DSFXjQiQ.ttf",
      300: "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_4h_ul2DSFXjQiQ.ttf",
      500: "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_jh_ul2DSFXjQiQ.ttf",
      600: "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_Yhjul2DSFXjQiQ.ttf",
      700: "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_Wxjul2DSFXjQiQ.ttf",
      800: "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_PBjul2DSFXjQiQ.ttf",
      900: "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_FRjul2DSFXjQiQ.ttf",
      regular: "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_vB_ul2DSFXjQiQ.ttf",
      "100italic": "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFwG1WrWN33AiasJ.ttf",
      "200italic": "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFyG1GrWN33AiasJ.ttf",
      "300italic": "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFxY1GrWN33AiasJ.ttf",
      italic: "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFwG1GrWN33AiasJ.ttf",
      "500italic": "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFw01GrWN33AiasJ.ttf",
      "600italic": "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFzY02rWN33AiasJ.ttf",
      "700italic": "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFzh02rWN33AiasJ.ttf",
      "800italic": "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFyG02rWN33AiasJ.ttf",
      "900italic": "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFyv02rWN33AiasJ.ttf"
    }
  },
  {
    family: "Bree Serif",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/breeserif/v17/4UaHrEJCrhhnVA3DgluAx63j5pN1MwI.ttf"
    }
  },
  {
    family: "Sarabun",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/sarabun/v15/DtVhJx26TKEr37c9YHZJmnYI5gnOpg.ttf",
      200: "http://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YNpoulwm6gDXvwE.ttf",
      300: "http://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YL5rulwm6gDXvwE.ttf",
      500: "http://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YOZqulwm6gDXvwE.ttf",
      600: "http://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YMptulwm6gDXvwE.ttf",
      700: "http://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YK5sulwm6gDXvwE.ttf",
      800: "http://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YLJvulwm6gDXvwE.ttf",
      "100italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVnJx26TKEr37c9aBBx_nwMxAzephhN.ttf",
      "200italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVkJx26TKEr37c9aBBxUl0s7iLSrwFUlw.ttf",
      "300italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVkJx26TKEr37c9aBBxNl4s7iLSrwFUlw.ttf",
      regular: "http://fonts.gstatic.com/s/sarabun/v15/DtVjJx26TKEr37c9WBJDnlQN9gk.ttf",
      italic: "http://fonts.gstatic.com/s/sarabun/v15/DtVhJx26TKEr37c9aBBJmnYI5gnOpg.ttf",
      "500italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVkJx26TKEr37c9aBBxbl8s7iLSrwFUlw.ttf",
      "600italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVkJx26TKEr37c9aBBxQlgs7iLSrwFUlw.ttf",
      "700italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVkJx26TKEr37c9aBBxJlks7iLSrwFUlw.ttf",
      "800italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVkJx26TKEr37c9aBBxOlos7iLSrwFUlw.ttf"
    }
  },
  {
    family: "Didact Gothic",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/didactgothic/v20/ahcfv8qz1zt6hCC5G4F_P4ASpUySp0LlcyQ.ttf"
    }
  },
  {
    family: "Russo One",
    category: "sans-serif",
    subsets: ["cyrillic", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/russoone/v16/Z9XUDmZRWg6M1LvRYsH-yMOInrib9Q.ttf"
    }
  },
  {
    family: "Lexend",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WCzsX_LBte6KuGEo.ttf",
      200: "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WC7sW_LBte6KuGEo.ttf",
      300: "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WC2UW_LBte6KuGEo.ttf",
      500: "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WCwkW_LBte6KuGEo.ttf",
      600: "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WC-UR_LBte6KuGEo.ttf",
      700: "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WC9wR_LBte6KuGEo.ttf",
      800: "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WC7sR_LBte6KuGEo.ttf",
      900: "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WC5IR_LBte6KuGEo.ttf",
      regular: "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WCzsW_LBte6KuGEo.ttf"
    }
  },
  {
    family: "Urbanist",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDyx8fFpOrS8SlKw.ttf",
      200: "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDSx4fFpOrS8SlKw.ttf",
      300: "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDlR4fFpOrS8SlKw.ttf",
      500: "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqD-R4fFpOrS8SlKw.ttf",
      600: "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDFRkfFpOrS8SlKw.ttf",
      700: "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDLBkfFpOrS8SlKw.ttf",
      800: "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDSxkfFpOrS8SlKw.ttf",
      900: "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDYhkfFpOrS8SlKw.ttf",
      regular: "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDyx4fFpOrS8SlKw.ttf",
      "100italic": "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA133VJmvacG1K4S1.ttf",
      "200italic": "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA113VZmvacG1K4S1.ttf",
      "300italic": "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA12pVZmvacG1K4S1.ttf",
      italic: "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA133VZmvacG1K4S1.ttf",
      "500italic": "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA13FVZmvacG1K4S1.ttf",
      "600italic": "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA10pUpmvacG1K4S1.ttf",
      "700italic": "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA10QUpmvacG1K4S1.ttf",
      "800italic": "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA113UpmvacG1K4S1.ttf",
      "900italic": "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA11eUpmvacG1K4S1.ttf"
    }
  },
  {
    family: "Amatic SC",
    category: "handwriting",
    subsets: ["cyrillic", "hebrew", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/amaticsc/v26/TUZ3zwprpvBS1izr_vOMscG6eb8D3WTy-A.ttf",
      regular: "http://fonts.gstatic.com/s/amaticsc/v26/TUZyzwprpvBS1izr_vO0De6ecZQf1A.ttf"
    }
  },
  {
    family: "Alegreya",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      500: "http://fonts.gstatic.com/s/alegreya/v35/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNGxBUI_KCisSGVrw.ttf",
      600: "http://fonts.gstatic.com/s/alegreya/v35/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNGKBII_KCisSGVrw.ttf",
      700: "http://fonts.gstatic.com/s/alegreya/v35/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNGERII_KCisSGVrw.ttf",
      800: "http://fonts.gstatic.com/s/alegreya/v35/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNGdhII_KCisSGVrw.ttf",
      900: "http://fonts.gstatic.com/s/alegreya/v35/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNGXxII_KCisSGVrw.ttf",
      regular: "http://fonts.gstatic.com/s/alegreya/v35/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNG9hUI_KCisSGVrw.ttf",
      italic: "http://fonts.gstatic.com/s/alegreya/v35/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlbgv6qmkySFr9V9.ttf",
      "500italic": "http://fonts.gstatic.com/s/alegreya/v35/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlbSv6qmkySFr9V9.ttf",
      "600italic": "http://fonts.gstatic.com/s/alegreya/v35/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlY-uKqmkySFr9V9.ttf",
      "700italic": "http://fonts.gstatic.com/s/alegreya/v35/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlYHuKqmkySFr9V9.ttf",
      "800italic": "http://fonts.gstatic.com/s/alegreya/v35/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlZguKqmkySFr9V9.ttf",
      "900italic": "http://fonts.gstatic.com/s/alegreya/v35/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlZJuKqmkySFr9V9.ttf"
    }
  },
  {
    family: "Archivo Narrow",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
    files: {
      500: "http://fonts.gstatic.com/s/archivonarrow/v30/tss5ApVBdCYD5Q7hcxTE1ArZ0Zz8oY2KRmwvKhhvHlGKpHOtFCQ76Q.ttf",
      600: "http://fonts.gstatic.com/s/archivonarrow/v30/tss5ApVBdCYD5Q7hcxTE1ArZ0Zz8oY2KRmwvKhhv8laKpHOtFCQ76Q.ttf",
      700: "http://fonts.gstatic.com/s/archivonarrow/v30/tss5ApVBdCYD5Q7hcxTE1ArZ0Zz8oY2KRmwvKhhvy1aKpHOtFCQ76Q.ttf",
      regular: "http://fonts.gstatic.com/s/archivonarrow/v30/tss5ApVBdCYD5Q7hcxTE1ArZ0Zz8oY2KRmwvKhhvLFGKpHOtFCQ76Q.ttf",
      italic: "http://fonts.gstatic.com/s/archivonarrow/v30/tss7ApVBdCYD5Q7hcxTE1ArZ0bb1k3JSLwe1hB965BJi53mpNiEr6T6Y.ttf",
      "500italic": "http://fonts.gstatic.com/s/archivonarrow/v30/tss7ApVBdCYD5Q7hcxTE1ArZ0bb1k3JSLwe1hB965BJQ53mpNiEr6T6Y.ttf",
      "600italic": "http://fonts.gstatic.com/s/archivonarrow/v30/tss7ApVBdCYD5Q7hcxTE1ArZ0bb1k3JSLwe1hB965BK84HmpNiEr6T6Y.ttf",
      "700italic": "http://fonts.gstatic.com/s/archivonarrow/v30/tss7ApVBdCYD5Q7hcxTE1ArZ0bb1k3JSLwe1hB965BKF4HmpNiEr6T6Y.ttf"
    }
  },
  {
    family: "Cinzel",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "500", "600", "700", "800", "900"],
    files: {
      500: "http://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-uTnTYrvDE5ZdqU.ttf",
      600: "http://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-gjgTYrvDE5ZdqU.ttf",
      700: "http://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-jHgTYrvDE5ZdqU.ttf",
      800: "http://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-lbgTYrvDE5ZdqU.ttf",
      900: "http://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-n_gTYrvDE5ZdqU.ttf",
      regular: "http://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-tbnTYrvDE5ZdqU.ttf"
    }
  },
  {
    family: "ABeeZee",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/abeezee/v22/esDR31xSG-6AGleN6tKukbcHCpE.ttf",
      italic: "http://fonts.gstatic.com/s/abeezee/v22/esDT31xSG-6AGleN2tCklZUCGpG-GQ.ttf"
    }
  },
  {
    family: "Rowdies",
    category: "display",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/rowdies/v17/ptRMTieMYPNBAK219hth5O7yKQNute8.ttf",
      700: "http://fonts.gstatic.com/s/rowdies/v17/ptRMTieMYPNBAK219gtm5O7yKQNute8.ttf",
      regular: "http://fonts.gstatic.com/s/rowdies/v17/ptRJTieMYPNBAK21zrdJwObZNQo.ttf"
    }
  },
  {
    family: "Vollkorn",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: [
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      500: "http://fonts.gstatic.com/s/vollkorn/v23/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df2AnGuGWOdEbD63w.ttf",
      600: "http://fonts.gstatic.com/s/vollkorn/v23/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df27nauGWOdEbD63w.ttf",
      700: "http://fonts.gstatic.com/s/vollkorn/v23/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df213auGWOdEbD63w.ttf",
      800: "http://fonts.gstatic.com/s/vollkorn/v23/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df2sHauGWOdEbD63w.ttf",
      900: "http://fonts.gstatic.com/s/vollkorn/v23/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df2mXauGWOdEbD63w.ttf",
      regular: "http://fonts.gstatic.com/s/vollkorn/v23/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df2MHGuGWOdEbD63w.ttf",
      italic: "http://fonts.gstatic.com/s/vollkorn/v23/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DJGWmmZM7Xq34g9.ttf",
      "500italic": "http://fonts.gstatic.com/s/vollkorn/v23/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DJ0WmmZM7Xq34g9.ttf",
      "600italic": "http://fonts.gstatic.com/s/vollkorn/v23/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DKYXWmZM7Xq34g9.ttf",
      "700italic": "http://fonts.gstatic.com/s/vollkorn/v23/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DKhXWmZM7Xq34g9.ttf",
      "800italic": "http://fonts.gstatic.com/s/vollkorn/v23/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DLGXWmZM7Xq34g9.ttf",
      "900italic": "http://fonts.gstatic.com/s/vollkorn/v23/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DLvXWmZM7Xq34g9.ttf"
    }
  },
  {
    family: "Sora",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800"],
    files: {
      100: "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSdSn3-KIwNhBti0.ttf",
      200: "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSfSnn-KIwNhBti0.ttf",
      300: "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmScMnn-KIwNhBti0.ttf",
      500: "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSdgnn-KIwNhBti0.ttf",
      600: "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSeMmX-KIwNhBti0.ttf",
      700: "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSe1mX-KIwNhBti0.ttf",
      800: "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSfSmX-KIwNhBti0.ttf",
      regular: "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSdSnn-KIwNhBti0.ttf"
    }
  },
  {
    family: "Saira Condensed",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/sairacondensed/v11/EJRMQgErUN8XuHNEtX81i9TmEkrnwetA2omSrzS8.ttf",
      200: "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnbcpg8Keepi2lHw.ttf",
      300: "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnCclg8Keepi2lHw.ttf",
      500: "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnUchg8Keepi2lHw.ttf",
      600: "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnfc9g8Keepi2lHw.ttf",
      700: "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnGc5g8Keepi2lHw.ttf",
      800: "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnBc1g8Keepi2lHw.ttf",
      900: "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnIcxg8Keepi2lHw.ttf",
      regular: "http://fonts.gstatic.com/s/sairacondensed/v11/EJROQgErUN8XuHNEtX81i9TmEkrfpeFE-IyCrw.ttf"
    }
  },
  {
    family: "Exo",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4lM2CwNsOl4p5Is.ttf",
      200: "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4tM3CwNsOl4p5Is.ttf",
      300: "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4g03CwNsOl4p5Is.ttf",
      500: "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4mE3CwNsOl4p5Is.ttf",
      600: "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4o0wCwNsOl4p5Is.ttf",
      700: "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4rQwCwNsOl4p5Is.ttf",
      800: "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4tMwCwNsOl4p5Is.ttf",
      900: "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4vowCwNsOl4p5Is.ttf",
      regular: "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4lM3CwNsOl4p5Is.ttf",
      "100italic": "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t040FmPnws9Iu-uA.ttf",
      "200italic": "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t0Y0BmPnws9Iu-uA.ttf",
      "300italic": "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t0vUBmPnws9Iu-uA.ttf",
      italic: "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t040BmPnws9Iu-uA.ttf",
      "500italic": "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t00UBmPnws9Iu-uA.ttf",
      "600italic": "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t0PUdmPnws9Iu-uA.ttf",
      "700italic": "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t0BEdmPnws9Iu-uA.ttf",
      "800italic": "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t0Y0dmPnws9Iu-uA.ttf",
      "900italic": "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t0SkdmPnws9Iu-uA.ttf"
    }
  },
  {
    family: "Orbitron",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular", "500", "600", "700", "800", "900"],
    files: {
      500: "http://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyKS6xpmIyXjU1pg.ttf",
      600: "http://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyxSmxpmIyXjU1pg.ttf",
      700: "http://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1ny_CmxpmIyXjU1pg.ttf",
      800: "http://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nymymxpmIyXjU1pg.ttf",
      900: "http://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nysimxpmIyXjU1pg.ttf",
      regular: "http://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6xpmIyXjU1pg.ttf"
    }
  },
  {
    family: "Kalam",
    category: "handwriting",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["300", "regular", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/kalam/v16/YA9Qr0Wd4kDdMtD6GgLLmCUItqGt.ttf",
      700: "http://fonts.gstatic.com/s/kalam/v16/YA9Qr0Wd4kDdMtDqHQLLmCUItqGt.ttf",
      regular: "http://fonts.gstatic.com/s/kalam/v16/YA9dr0Wd4kDdMuhWMibDszkB.ttf"
    }
  },
  {
    family: "Figtree",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      300: "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_chQF5ewkEU4HTy.ttf",
      500: "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_dNQF5ewkEU4HTy.ttf",
      600: "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_ehR15ewkEU4HTy.ttf",
      700: "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_eYR15ewkEU4HTy.ttf",
      800: "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_f_R15ewkEU4HTy.ttf",
      900: "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_fWR15ewkEU4HTy.ttf",
      regular: "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_d_QF5ewkEU4HTy.ttf",
      "300italic": "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3A-gdyEU25WTybO8.ttf",
      italic: "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3A7YdyEU25WTybO8.ttf",
      "500italic": "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3A4QdyEU25WTybO8.ttf",
      "600italic": "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3A2gayEU25WTybO8.ttf",
      "700italic": "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3A1EayEU25WTybO8.ttf",
      "800italic": "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3AzYayEU25WTybO8.ttf",
      "900italic": "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3Ax8ayEU25WTybO8.ttf"
    }
  },
  {
    family: "Montserrat Alternates",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/montserratalternates/v17/mFThWacfw6zH4dthXcyms1lPpC8I_b0juU0xiKfVKphL03l4.ttf",
      200: "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xJIb1ALZH2mBhkw.ttf",
      300: "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xQIX1ALZH2mBhkw.ttf",
      500: "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xGIT1ALZH2mBhkw.ttf",
      600: "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xNIP1ALZH2mBhkw.ttf",
      700: "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xUIL1ALZH2mBhkw.ttf",
      800: "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xTIH1ALZH2mBhkw.ttf",
      900: "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xaID1ALZH2mBhkw.ttf",
      "100italic": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTjWacfw6zH4dthXcyms1lPpC8I_b0juU057p-xIJxp1ml4imo.ttf",
      "200italic": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p8dAbxD-GVxk3Nd.ttf",
      "300italic": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p95ArxD-GVxk3Nd.ttf",
      regular: "http://fonts.gstatic.com/s/montserratalternates/v17/mFTvWacfw6zH4dthXcyms1lPpC8I_b0juU0J7K3RCJ1b0w.ttf",
      italic: "http://fonts.gstatic.com/s/montserratalternates/v17/mFThWacfw6zH4dthXcyms1lPpC8I_b0juU057qfVKphL03l4.ttf",
      "500italic": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p8hA7xD-GVxk3Nd.ttf",
      "600italic": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p8NBLxD-GVxk3Nd.ttf",
      "700italic": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p9pBbxD-GVxk3Nd.ttf",
      "800italic": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p91BrxD-GVxk3Nd.ttf",
      "900italic": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p9RB7xD-GVxk3Nd.ttf"
    }
  },
  {
    family: "Yantramanav",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["100", "300", "regular", "500", "700", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/yantramanav/v13/flU-Rqu5zY00QEpyWJYWN5-QXeNzDB41rZg.ttf",
      300: "http://fonts.gstatic.com/s/yantramanav/v13/flUhRqu5zY00QEpyWJYWN59Yf8NZIhI8tIHh.ttf",
      500: "http://fonts.gstatic.com/s/yantramanav/v13/flUhRqu5zY00QEpyWJYWN58AfsNZIhI8tIHh.ttf",
      700: "http://fonts.gstatic.com/s/yantramanav/v13/flUhRqu5zY00QEpyWJYWN59IeMNZIhI8tIHh.ttf",
      900: "http://fonts.gstatic.com/s/yantramanav/v13/flUhRqu5zY00QEpyWJYWN59wesNZIhI8tIHh.ttf",
      regular: "http://fonts.gstatic.com/s/yantramanav/v13/flU8Rqu5zY00QEpyWJYWN6f0V-dRCQ41.ttf"
    }
  },
  {
    family: "Source Serif 4",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      200: "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjipdqrhxXD-wGvjU.ttf",
      300: "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjiklqrhxXD-wGvjU.ttf",
      500: "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjiiVqrhxXD-wGvjU.ttf",
      600: "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjisltrhxXD-wGvjU.ttf",
      700: "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjivBtrhxXD-wGvjU.ttf",
      800: "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjipdtrhxXD-wGvjU.ttf",
      900: "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjir5trhxXD-wGvjU.ttf",
      regular: "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjihdqrhxXD-wGvjU.ttf",
      "200italic": "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98pxl9dC84DrjXEXw.ttf",
      "300italic": "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98pGF9dC84DrjXEXw.ttf",
      italic: "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98pRl9dC84DrjXEXw.ttf",
      "500italic": "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98pdF9dC84DrjXEXw.ttf",
      "600italic": "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98pmFhdC84DrjXEXw.ttf",
      "700italic": "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98poVhdC84DrjXEXw.ttf",
      "800italic": "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98pxlhdC84DrjXEXw.ttf",
      "900italic": "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98p71hdC84DrjXEXw.ttf"
    }
  },
  {
    family: "Alfa Slab One",
    category: "display",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/alfaslabone/v19/6NUQ8FmMKwSEKjnm5-4v-4Jh6dVretWvYmE.ttf"
    }
  },
  {
    family: "Alegreya Sans",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/alegreyasans/v24/5aUt9_-1phKLFgshYDvh6Vwt5TltuGdShm5bsg.ttf",
      300: "http://fonts.gstatic.com/s/alegreyasans/v24/5aUu9_-1phKLFgshYDvh6Vwt5fFPmE18imdCqxI.ttf",
      500: "http://fonts.gstatic.com/s/alegreyasans/v24/5aUu9_-1phKLFgshYDvh6Vwt5alOmE18imdCqxI.ttf",
      700: "http://fonts.gstatic.com/s/alegreyasans/v24/5aUu9_-1phKLFgshYDvh6Vwt5eFImE18imdCqxI.ttf",
      800: "http://fonts.gstatic.com/s/alegreyasans/v24/5aUu9_-1phKLFgshYDvh6Vwt5f1LmE18imdCqxI.ttf",
      900: "http://fonts.gstatic.com/s/alegreyasans/v24/5aUu9_-1phKLFgshYDvh6Vwt5dlKmE18imdCqxI.ttf",
      "100italic": "http://fonts.gstatic.com/s/alegreyasans/v24/5aUv9_-1phKLFgshYDvh6Vwt7V9V3G1WpGtLsgu7.ttf",
      "300italic": "http://fonts.gstatic.com/s/alegreyasans/v24/5aUo9_-1phKLFgshYDvh6Vwt7V9VFE92jkVHuxKiBA.ttf",
      regular: "http://fonts.gstatic.com/s/alegreyasans/v24/5aUz9_-1phKLFgshYDvh6Vwt3V1nvEVXlm4.ttf",
      italic: "http://fonts.gstatic.com/s/alegreyasans/v24/5aUt9_-1phKLFgshYDvh6Vwt7V9tuGdShm5bsg.ttf",
      "500italic": "http://fonts.gstatic.com/s/alegreyasans/v24/5aUo9_-1phKLFgshYDvh6Vwt7V9VTE52jkVHuxKiBA.ttf",
      "700italic": "http://fonts.gstatic.com/s/alegreyasans/v24/5aUo9_-1phKLFgshYDvh6Vwt7V9VBEh2jkVHuxKiBA.ttf",
      "800italic": "http://fonts.gstatic.com/s/alegreyasans/v24/5aUo9_-1phKLFgshYDvh6Vwt7V9VGEt2jkVHuxKiBA.ttf",
      "900italic": "http://fonts.gstatic.com/s/alegreyasans/v24/5aUo9_-1phKLFgshYDvh6Vwt7V9VPEp2jkVHuxKiBA.ttf"
    }
  },
  {
    family: "Zeyada",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/zeyada/v19/11hAGpPTxVPUbgZDNGatWKaZ3g.ttf"
    }
  },
  {
    family: "Source Sans 3",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      200: "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kw461EN_io6npfB.ttf",
      300: "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kzm61EN_io6npfB.ttf",
      500: "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8KyK61EN_io6npfB.ttf",
      600: "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kxm7FEN_io6npfB.ttf",
      700: "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kxf7FEN_io6npfB.ttf",
      800: "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kw47FEN_io6npfB.ttf",
      900: "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8KwR7FEN_io6npfB.ttf",
      regular: "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Ky461EN_io6npfB.ttf",
      "200italic": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqDlO9C4Ym4fB3Ts.ttf",
      "300italic": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqOdO9C4Ym4fB3Ts.ttf",
      italic: "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqLlO9C4Ym4fB3Ts.ttf",
      "500italic": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqItO9C4Ym4fB3Ts.ttf",
      "600italic": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqGdJ9C4Ym4fB3Ts.ttf",
      "700italic": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqF5J9C4Ym4fB3Ts.ttf",
      "800italic": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqDlJ9C4Ym4fB3Ts.ttf",
      "900italic": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqBBJ9C4Ym4fB3Ts.ttf"
    }
  },
  {
    family: "Righteous",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/righteous/v17/1cXxaUPXBpj2rGoU7C9mj3uEicG01A.ttf"
    }
  },
  {
    family: "Cormorant",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic"
    ],
    files: {
      300: "http://fonts.gstatic.com/s/cormorant/v21/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFk9TQ7Rg7A2uwYs.ttf",
      500: "http://fonts.gstatic.com/s/cormorant/v21/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFiNTQ7Rg7A2uwYs.ttf",
      600: "http://fonts.gstatic.com/s/cormorant/v21/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFs9UQ7Rg7A2uwYs.ttf",
      700: "http://fonts.gstatic.com/s/cormorant/v21/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFvZUQ7Rg7A2uwYs.ttf",
      regular: "http://fonts.gstatic.com/s/cormorant/v21/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFhFTQ7Rg7A2uwYs.ttf",
      "300italic": "http://fonts.gstatic.com/s/cormorant/v21/H4c0BXOCl9bbnla_nHIq6oGzilJm9otsA9kQ9fdq6C-r0YvxdA.ttf",
      italic: "http://fonts.gstatic.com/s/cormorant/v21/H4c0BXOCl9bbnla_nHIq6oGzilJm9otsA9kQq_dq6C-r0YvxdA.ttf",
      "500italic": "http://fonts.gstatic.com/s/cormorant/v21/H4c0BXOCl9bbnla_nHIq6oGzilJm9otsA9kQmfdq6C-r0YvxdA.ttf",
      "600italic": "http://fonts.gstatic.com/s/cormorant/v21/H4c0BXOCl9bbnla_nHIq6oGzilJm9otsA9kQdfBq6C-r0YvxdA.ttf",
      "700italic": "http://fonts.gstatic.com/s/cormorant/v21/H4c0BXOCl9bbnla_nHIq6oGzilJm9otsA9kQTPBq6C-r0YvxdA.ttf"
    }
  },
  {
    family: "Neuton",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["200", "300", "regular", "italic", "700", "800"],
    files: {
      200: "http://fonts.gstatic.com/s/neuton/v22/UMBQrPtMoH62xUZKAKkfegD5Drog6Q.ttf",
      300: "http://fonts.gstatic.com/s/neuton/v22/UMBQrPtMoH62xUZKZKofegD5Drog6Q.ttf",
      700: "http://fonts.gstatic.com/s/neuton/v22/UMBQrPtMoH62xUZKdK0fegD5Drog6Q.ttf",
      800: "http://fonts.gstatic.com/s/neuton/v22/UMBQrPtMoH62xUZKaK4fegD5Drog6Q.ttf",
      regular: "http://fonts.gstatic.com/s/neuton/v22/UMBTrPtMoH62xUZyyII7civlBw.ttf",
      italic: "http://fonts.gstatic.com/s/neuton/v22/UMBRrPtMoH62xUZCyog_UC71B6M5.ttf"
    }
  },
  {
    family: "Noticia Text",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/noticiatext/v15/VuJpdNDF2Yv9qppOePKYRP1-3R59v2HRrDH0eA.ttf",
      regular: "http://fonts.gstatic.com/s/noticiatext/v15/VuJ2dNDF2Yv9qppOePKYRP1GYTFZt0rNpQ.ttf",
      italic: "http://fonts.gstatic.com/s/noticiatext/v15/VuJodNDF2Yv9qppOePKYRP12YztdlU_dpSjt.ttf",
      "700italic": "http://fonts.gstatic.com/s/noticiatext/v15/VuJrdNDF2Yv9qppOePKYRP12YwPhumvVjjTkeMnz.ttf"
    }
  },
  {
    family: "Noto Kufi Arabic",
    category: "sans-serif",
    subsets: ["arabic"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh5v3obPnLSmf5yD.ttf",
      200: "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh7v34bPnLSmf5yD.ttf",
      300: "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh4x34bPnLSmf5yD.ttf",
      500: "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh5d34bPnLSmf5yD.ttf",
      600: "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh6x2IbPnLSmf5yD.ttf",
      700: "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh6I2IbPnLSmf5yD.ttf",
      800: "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh7v2IbPnLSmf5yD.ttf",
      900: "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh7G2IbPnLSmf5yD.ttf",
      regular: "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh5v34bPnLSmf5yD.ttf"
    }
  },
  {
    family: "Great Vibes",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/greatvibes/v18/RWmMoKWR9v4ksMfaWd_JN-XCg6UKDXlq.ttf"
    }
  },
  {
    family: "Cantarell",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/cantarell/v17/B50IF7ZDq37KMUvlO01xN4dOFISeJY8GgQ.ttf",
      regular: "http://fonts.gstatic.com/s/cantarell/v17/B50NF7ZDq37KMUvlO01Ji6hqHK-CLA.ttf",
      italic: "http://fonts.gstatic.com/s/cantarell/v17/B50LF7ZDq37KMUvlO015iaJuPqqSLJYf.ttf",
      "700italic": "http://fonts.gstatic.com/s/cantarell/v17/B50WF7ZDq37KMUvlO015iZrSEY6aB4oWgWHB.ttf"
    }
  },
  {
    family: "Cardo",
    category: "serif",
    subsets: ["greek", "greek-ext", "latin", "latin-ext"],
    variants: ["regular", "italic", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/cardo/v19/wlpygwjKBV1pqhND-aQR82JHaTBX.ttf",
      regular: "http://fonts.gstatic.com/s/cardo/v19/wlp_gwjKBV1pqiv_1oAZ2H5O.ttf",
      italic: "http://fonts.gstatic.com/s/cardo/v19/wlpxgwjKBV1pqhv93IQ73W5OcCk.ttf"
    }
  },
  {
    family: "Martel",
    category: "serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["200", "300", "regular", "600", "700", "800", "900"],
    files: {
      200: "http://fonts.gstatic.com/s/martel/v10/PN_yRfK9oXHga0XVqekahRbX9vnDzw.ttf",
      300: "http://fonts.gstatic.com/s/martel/v10/PN_yRfK9oXHga0XVzeoahRbX9vnDzw.ttf",
      600: "http://fonts.gstatic.com/s/martel/v10/PN_yRfK9oXHga0XVuewahRbX9vnDzw.ttf",
      700: "http://fonts.gstatic.com/s/martel/v10/PN_yRfK9oXHga0XV3e0ahRbX9vnDzw.ttf",
      800: "http://fonts.gstatic.com/s/martel/v10/PN_yRfK9oXHga0XVwe4ahRbX9vnDzw.ttf",
      900: "http://fonts.gstatic.com/s/martel/v10/PN_yRfK9oXHga0XV5e8ahRbX9vnDzw.ttf",
      regular: "http://fonts.gstatic.com/s/martel/v10/PN_xRfK9oXHga0XtYcI-jT3L_w.ttf"
    }
  },
  {
    family: "Passion One",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "700", "900"],
    files: {
      700: "http://fonts.gstatic.com/s/passionone/v18/Pby6FmL8HhTPqbjUzux3JEMq037owpYcuH8y.ttf",
      900: "http://fonts.gstatic.com/s/passionone/v18/Pby6FmL8HhTPqbjUzux3JEMS0X7owpYcuH8y.ttf",
      regular: "http://fonts.gstatic.com/s/passionone/v18/PbynFmL8HhTPqbjUzux3JHuW_Frg6YoV.ttf"
    }
  },
  {
    family: "Courgette",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/courgette/v17/wEO_EBrAnc9BLjLQAUkFUfAL3EsHiA.ttf"
    }
  },
  {
    family: "Spectral",
    category: "serif",
    subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic"
    ],
    files: {
      200: "http://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9v2s13GY_etWWIJ.ttf",
      300: "http://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9uSsF3GY_etWWIJ.ttf",
      500: "http://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9vKsV3GY_etWWIJ.ttf",
      600: "http://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9vmtl3GY_etWWIJ.ttf",
      700: "http://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9uCt13GY_etWWIJ.ttf",
      800: "http://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9uetF3GY_etWWIJ.ttf",
      "200italic": "http://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M8qrXHafOPXHIJErY.ttf",
      "300italic": "http://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M8qtHEafOPXHIJErY.ttf",
      regular: "http://fonts.gstatic.com/s/spectral/v13/rnCr-xNNww_2s0amA-M-mHnOSOuk.ttf",
      italic: "http://fonts.gstatic.com/s/spectral/v13/rnCt-xNNww_2s0amA9M8kn3sTfukQHs.ttf",
      "500italic": "http://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M8qonFafOPXHIJErY.ttf",
      "600italic": "http://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M8qqXCafOPXHIJErY.ttf",
      "700italic": "http://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M8qsHDafOPXHIJErY.ttf",
      "800italic": "http://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M8qt3AafOPXHIJErY.ttf"
    }
  },
  {
    family: "Yellowtail",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/yellowtail/v22/OZpGg_pnoDtINPfRIlLotlzNwED-b4g.ttf"
    }
  },
  {
    family: "Space Mono",
    category: "monospace",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/spacemono/v13/i7dMIFZifjKcF5UAWdDRaPpZYFKQHwyVd3U.ttf",
      regular: "http://fonts.gstatic.com/s/spacemono/v13/i7dPIFZifjKcF5UAWdDRUEZ2RFq7AwU.ttf",
      italic: "http://fonts.gstatic.com/s/spacemono/v13/i7dNIFZifjKcF5UAWdDRYER8QHi-EwWMbg.ttf",
      "700italic": "http://fonts.gstatic.com/s/spacemono/v13/i7dSIFZifjKcF5UAWdDRYERE_FeaGy6QZ3WfYg.ttf"
    }
  },
  {
    family: "Amiri",
    category: "serif",
    subsets: ["arabic", "latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/amiri/v27/J7acnpd8CGxBHp2VkZY4xJ9CGyAa.ttf",
      regular: "http://fonts.gstatic.com/s/amiri/v27/J7aRnpd8CGxBHqUpvrIw74NL.ttf",
      italic: "http://fonts.gstatic.com/s/amiri/v27/J7afnpd8CGxBHpUrtLYS6pNLAjk.ttf",
      "700italic": "http://fonts.gstatic.com/s/amiri/v27/J7aanpd8CGxBHpUrjAo9zptgHjAavCA.ttf"
    }
  },
  {
    family: "Tinos",
    category: "serif",
    subsets: [
      "cyrillic",
      "cyrillic-ext",
      "greek",
      "greek-ext",
      "hebrew",
      "latin",
      "latin-ext",
      "vietnamese"
    ],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/tinos/v24/buE1poGnedXvwj1AW0Fp2i43-cxL.ttf",
      regular: "http://fonts.gstatic.com/s/tinos/v24/buE4poGnedXvwgX8dGVh8TI-.ttf",
      italic: "http://fonts.gstatic.com/s/tinos/v24/buE2poGnedXvwjX-fmFD9CI-4NU.ttf",
      "700italic": "http://fonts.gstatic.com/s/tinos/v24/buEzpoGnedXvwjX-Rt1s0CoV_NxLeiw.ttf"
    }
  },
  {
    family: "Philosopher",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "vietnamese"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/philosopher/v19/vEFI2_5QCwIS4_Dhez5jcWjVamgc-NaXXq7H.ttf",
      regular: "http://fonts.gstatic.com/s/philosopher/v19/vEFV2_5QCwIS4_Dhez5jcVBpRUwU08qe.ttf",
      italic: "http://fonts.gstatic.com/s/philosopher/v19/vEFX2_5QCwIS4_Dhez5jcWBrT0g21tqeR7c.ttf",
      "700italic": "http://fonts.gstatic.com/s/philosopher/v19/vEFK2_5QCwIS4_Dhez5jcWBrd_QZ8tK1W77HtMo.ttf"
    }
  },
  {
    family: "Lobster Two",
    category: "display",
    subsets: ["latin"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/lobstertwo/v20/BngRUXZGTXPUvIoyV6yN5-92w4CByxyKeuDp.ttf",
      regular: "http://fonts.gstatic.com/s/lobstertwo/v20/BngMUXZGTXPUvIoyV6yN59fK7KSJ4ACD.ttf",
      italic: "http://fonts.gstatic.com/s/lobstertwo/v20/BngOUXZGTXPUvIoyV6yN5-fI5qCr5RCDY_k.ttf",
      "700italic": "http://fonts.gstatic.com/s/lobstertwo/v20/BngTUXZGTXPUvIoyV6yN5-fI3hyEwRiof_DpXMY.ttf"
    }
  },
  {
    family: "Titan One",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/titanone/v15/mFTzWbsGxbbS_J5cQcjykzIn2Etikg.ttf"
    }
  },
  {
    family: "Patua One",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/patuaone/v20/ZXuke1cDvLCKLDcimxBI5PNvNA9LuA.ttf"
    }
  },
  {
    family: "Changa",
    category: "sans-serif",
    subsets: ["arabic", "latin", "latin-ext"],
    variants: ["200", "300", "regular", "500", "600", "700", "800"],
    files: {
      200: "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZy2xQjDp9htf1ZM.ttf",
      300: "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZ_OxQjDp9htf1ZM.ttf",
      500: "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZ5-xQjDp9htf1ZM.ttf",
      600: "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZ3O2QjDp9htf1ZM.ttf",
      700: "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZ0q2QjDp9htf1ZM.ttf",
      800: "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZy22QjDp9htf1ZM.ttf",
      regular: "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZ62xQjDp9htf1ZM.ttf"
    }
  },
  {
    family: "Roboto Flex",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/robotoflex/v9/NaN4epOXO_NexZs0b5QrzlOHb8wCikXpYqmZsWI-__OGfttPZktqc2VdZ80KvCLZaPcSBZtOx2MifRuWR28sPJtUMbsFEK6cRrleUx9Xgbm3WLHa_F4Ep4Fm0PN19Ik5Dntczx0wZGzhPlL1YNMYKbv9_1IQXOw7AiUJVXpRJ6cXW4O8TNGoXjC79QRyaLshNDUf3e0O-gn5rrZCu20YNYG0EACUTNK-QKavMlxGIY8dxef0jQ.ttf"
    }
  },
  {
    family: "Ubuntu Condensed",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/ubuntucondensed/v16/u-4k0rCzjgs5J7oXnJcM_0kACGMtf-fVqvHoJXw.ttf"
    }
  },
  {
    family: "Paytone One",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/paytoneone/v23/0nksC9P7MfYHj2oFtYm2CiTqivr9iBq_.ttf"
    }
  },
  {
    family: "PT Sans Caption",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/ptsanscaption/v19/0FlJVP6Hrxmt7-fsUFhlFXNIlpcSwSrUSwWuz38Tgg.ttf",
      regular: "http://fonts.gstatic.com/s/ptsanscaption/v19/0FlMVP6Hrxmt7-fsUFhlFXNIlpcqfQXwQy6yxg.ttf"
    }
  },
  {
    family: "Noto Serif TC",
    category: "serif",
    subsets: ["chinese-traditional", "latin"],
    variants: ["200", "300", "regular", "500", "600", "700", "900"],
    files: {
      200: "http://fonts.gstatic.com/s/notoseriftc/v23/XLY9IZb5bJNDGYxLBibeHZ0Bvr8vbX9GTsoOAX4.otf",
      300: "http://fonts.gstatic.com/s/notoseriftc/v23/XLY9IZb5bJNDGYxLBibeHZ0BvtssbX9GTsoOAX4.otf",
      500: "http://fonts.gstatic.com/s/notoseriftc/v23/XLY9IZb5bJNDGYxLBibeHZ0BvoMtbX9GTsoOAX4.otf",
      600: "http://fonts.gstatic.com/s/notoseriftc/v23/XLY9IZb5bJNDGYxLBibeHZ0Bvq8qbX9GTsoOAX4.otf",
      700: "http://fonts.gstatic.com/s/notoseriftc/v23/XLY9IZb5bJNDGYxLBibeHZ0BvssrbX9GTsoOAX4.otf",
      900: "http://fonts.gstatic.com/s/notoseriftc/v23/XLY9IZb5bJNDGYxLBibeHZ0BvvMpbX9GTsoOAX4.otf",
      regular: "http://fonts.gstatic.com/s/notoseriftc/v23/XLYgIZb5bJNDGYxLBibeHZ0BhnEESXFtUsM.otf"
    }
  },
  {
    family: "Crete Round",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/creteround/v14/55xoey1sJNPjPiv1ZZZrxJ1827zAKnxN.ttf",
      italic: "http://fonts.gstatic.com/s/creteround/v14/55xqey1sJNPjPiv1ZZZrxK1-0bjiL2xNhKc.ttf"
    }
  },
  {
    family: "Encode Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGGHiZtWP7FJCt2c.ttf",
      200: "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGOHjZtWP7FJCt2c.ttf",
      300: "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGD_jZtWP7FJCt2c.ttf",
      500: "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGFPjZtWP7FJCt2c.ttf",
      600: "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGL_kZtWP7FJCt2c.ttf",
      700: "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGIbkZtWP7FJCt2c.ttf",
      800: "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGOHkZtWP7FJCt2c.ttf",
      900: "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGMjkZtWP7FJCt2c.ttf",
      regular: "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGGHjZtWP7FJCt2c.ttf"
    }
  },
  {
    family: "Eczar",
    category: "serif",
    subsets: ["devanagari", "greek", "greek-ext", "latin", "latin-ext"],
    variants: ["regular", "500", "600", "700", "800"],
    files: {
      500: "http://fonts.gstatic.com/s/eczar/v22/BXR2vF3Pi-DLmxcpJB-qbNTyTMDXL96WqTIVKWJKWg.ttf",
      600: "http://fonts.gstatic.com/s/eczar/v22/BXR2vF3Pi-DLmxcpJB-qbNTyTMDXw9mWqTIVKWJKWg.ttf",
      700: "http://fonts.gstatic.com/s/eczar/v22/BXR2vF3Pi-DLmxcpJB-qbNTyTMDX-tmWqTIVKWJKWg.ttf",
      800: "http://fonts.gstatic.com/s/eczar/v22/BXR2vF3Pi-DLmxcpJB-qbNTyTMDXndmWqTIVKWJKWg.ttf",
      regular: "http://fonts.gstatic.com/s/eczar/v22/BXR2vF3Pi-DLmxcpJB-qbNTyTMDXHd6WqTIVKWJKWg.ttf"
    }
  },
  {
    family: "Prata",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/prata/v20/6xKhdSpbNNCT-vWIAG_5LWwJ.ttf"
    }
  },
  {
    family: "Noto Serif KR",
    category: "serif",
    subsets: ["korean", "latin"],
    variants: ["200", "300", "regular", "500", "600", "700", "900"],
    files: {
      200: "http://fonts.gstatic.com/s/notoserifkr/v20/3JnmSDn90Gmq2mr3blnHaTZXTihC8O1ZNH1ahck.otf",
      300: "http://fonts.gstatic.com/s/notoserifkr/v20/3JnmSDn90Gmq2mr3blnHaTZXTkxB8O1ZNH1ahck.otf",
      500: "http://fonts.gstatic.com/s/notoserifkr/v20/3JnmSDn90Gmq2mr3blnHaTZXThRA8O1ZNH1ahck.otf",
      600: "http://fonts.gstatic.com/s/notoserifkr/v20/3JnmSDn90Gmq2mr3blnHaTZXTjhH8O1ZNH1ahck.otf",
      700: "http://fonts.gstatic.com/s/notoserifkr/v20/3JnmSDn90Gmq2mr3blnHaTZXTlxG8O1ZNH1ahck.otf",
      900: "http://fonts.gstatic.com/s/notoserifkr/v20/3JnmSDn90Gmq2mr3blnHaTZXTmRE8O1ZNH1ahck.otf",
      regular: "http://fonts.gstatic.com/s/notoserifkr/v20/3Jn7SDn90Gmq2mr3blnHaTZXduZp1ONyKHQ.otf"
    }
  },
  {
    family: "Kaushan Script",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/kaushanscript/v16/vm8vdRfvXFLG3OLnsO15WYS5DF7_ytN3M48a.ttf"
    }
  },
  {
    family: "Francois One",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/francoisone/v21/_Xmr-H4zszafZw3A-KPSZutNxgKQu_avAg.ttf"
    }
  },
  {
    family: "Sawarabi Mincho",
    category: "serif",
    subsets: ["japanese", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/sawarabimincho/v17/8QIRdiDaitzr7brc8ahpxt6GcIJTLahP46UDUw.ttf"
    }
  },
  {
    family: "Macondo",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/macondo/v25/RrQQboN9-iB1IXmOS2XO0LBBd4Y.ttf"
    }
  },
  {
    family: "Sacramento",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/sacramento/v15/buEzpo6gcdjy0EiZMBUG0CoV_NxLeiw.ttf"
    }
  },
  {
    family: "Alice",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/alice/v20/OpNCnoEEmtHa6FcJpA_chzJ0.ttf"
    }
  },
  {
    family: "Marcellus",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/marcellus/v13/wEO_EBrOk8hQLDvIAF8FUfAL3EsHiA.ttf"
    }
  },
  {
    family: "Arsenal",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/arsenal/v12/wXKuE3kQtZQ4pF3D7-P5JeQAmX8yrdk.ttf",
      regular: "http://fonts.gstatic.com/s/arsenal/v12/wXKrE3kQtZQ4pF3D11_WAewrhXY.ttf",
      italic: "http://fonts.gstatic.com/s/arsenal/v12/wXKpE3kQtZQ4pF3D513cBc4ulXYrtA.ttf",
      "700italic": "http://fonts.gstatic.com/s/arsenal/v12/wXKsE3kQtZQ4pF3D513kueEKnV03vdnKjw.ttf"
    }
  },
  {
    family: "Architects Daughter",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/architectsdaughter/v18/KtkxAKiDZI_td1Lkx62xHZHDtgO_Y-bvfY5q4szgE-Q.ttf"
    }
  },
  {
    family: "El Messiri",
    category: "sans-serif",
    subsets: ["arabic", "cyrillic", "latin", "latin-ext"],
    variants: ["regular", "500", "600", "700"],
    files: {
      500: "http://fonts.gstatic.com/s/elmessiri/v22/K2FhfZBRmr9vQ1pHEey6GIGo8_pv3myYjuXCe65ghj3OoapG.ttf",
      600: "http://fonts.gstatic.com/s/elmessiri/v22/K2FhfZBRmr9vQ1pHEey6GIGo8_pv3myYjuUufK5ghj3OoapG.ttf",
      700: "http://fonts.gstatic.com/s/elmessiri/v22/K2FhfZBRmr9vQ1pHEey6GIGo8_pv3myYjuUXfK5ghj3OoapG.ttf",
      regular: "http://fonts.gstatic.com/s/elmessiri/v22/K2FhfZBRmr9vQ1pHEey6GIGo8_pv3myYjuXwe65ghj3OoapG.ttf"
    }
  },
  {
    family: "Noto Sans Display",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_3cLVTGQ2iHrvWM.ttf",
      200: "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp__cKVTGQ2iHrvWM.ttf",
      300: "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_ykKVTGQ2iHrvWM.ttf",
      500: "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_0UKVTGQ2iHrvWM.ttf",
      600: "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_6kNVTGQ2iHrvWM.ttf",
      700: "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_5ANVTGQ2iHrvWM.ttf",
      800: "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp__cNVTGQ2iHrvWM.ttf",
      900: "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_94NVTGQ2iHrvWM.ttf",
      regular: "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_3cKVTGQ2iHrvWM.ttf",
      "100italic": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JvXOa3gPurWM9uQ.ttf",
      "200italic": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JPXKa3gPurWM9uQ.ttf",
      "300italic": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9J43Ka3gPurWM9uQ.ttf",
      italic: "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JvXKa3gPurWM9uQ.ttf",
      "500italic": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9Jj3Ka3gPurWM9uQ.ttf",
      "600italic": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JY3Wa3gPurWM9uQ.ttf",
      "700italic": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JWnWa3gPurWM9uQ.ttf",
      "800italic": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JPXWa3gPurWM9uQ.ttf",
      "900italic": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JFHWa3gPurWM9uQ.ttf"
    }
  },
  {
    family: "Gloria Hallelujah",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/gloriahallelujah/v21/LYjYdHv3kUk9BMV96EIswT9DIbW-MLSy3TKEvkCF.ttf"
    }
  },
  {
    family: "Alata",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/alata/v9/PbytFmztEwbIofe6xKcRQEOX.ttf"
    }
  },
  {
    family: "Bodoni Moda",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      500: "http://fonts.gstatic.com/s/bodonimoda/v23/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oXzawIBytVjMYwE.ttf",
      600: "http://fonts.gstatic.com/s/bodonimoda/v23/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oZDdwIBytVjMYwE.ttf",
      700: "http://fonts.gstatic.com/s/bodonimoda/v23/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oandwIBytVjMYwE.ttf",
      800: "http://fonts.gstatic.com/s/bodonimoda/v23/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oc7dwIBytVjMYwE.ttf",
      900: "http://fonts.gstatic.com/s/bodonimoda/v23/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oefdwIBytVjMYwE.ttf",
      regular: "http://fonts.gstatic.com/s/bodonimoda/v23/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oU7awIBytVjMYwE.ttf",
      italic: "http://fonts.gstatic.com/s/bodonimoda/v23/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZKMN4sXrJcwHqoQ.ttf",
      "500italic": "http://fonts.gstatic.com/s/bodonimoda/v23/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZGsN4sXrJcwHqoQ.ttf",
      "600italic": "http://fonts.gstatic.com/s/bodonimoda/v23/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZ9sR4sXrJcwHqoQ.ttf",
      "700italic": "http://fonts.gstatic.com/s/bodonimoda/v23/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZz8R4sXrJcwHqoQ.ttf",
      "800italic": "http://fonts.gstatic.com/s/bodonimoda/v23/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZqMR4sXrJcwHqoQ.ttf",
      "900italic": "http://fonts.gstatic.com/s/bodonimoda/v23/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZgcR4sXrJcwHqoQ.ttf"
    }
  },
  {
    family: "Cookie",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/cookie/v21/syky-y18lb0tSbfNlQCT9tPdpw.ttf"
    }
  },
  {
    family: "Lexend Deca",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U48MxArBPCqLNflg.ttf",
      200: "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4cM1ArBPCqLNflg.ttf",
      300: "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4rs1ArBPCqLNflg.ttf",
      500: "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4ws1ArBPCqLNflg.ttf",
      600: "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4LspArBPCqLNflg.ttf",
      700: "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4F8pArBPCqLNflg.ttf",
      800: "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4cMpArBPCqLNflg.ttf",
      900: "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4WcpArBPCqLNflg.ttf",
      regular: "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U48M1ArBPCqLNflg.ttf"
    }
  },
  {
    family: "Gruppo",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/gruppo/v21/WwkfxPmzE06v_ZWFWXDAOIEQUQ.ttf"
    }
  },
  {
    family: "Creepster",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/creepster/v13/AlZy_zVUqJz4yMrniH4hdXf4XB0Tow.ttf"
    }
  },
  {
    family: "Alegreya Sans SC",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGn4-RGJqfMvt7P8FUr0Q1j-Hf1Dipl8g5FPYtmMg.ttf",
      300: "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGm4-RGJqfMvt7P8FUr0Q1j-Hf1DuJH0iRrMYJ_K-4.ttf",
      500: "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGm4-RGJqfMvt7P8FUr0Q1j-Hf1DrpG0iRrMYJ_K-4.ttf",
      700: "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGm4-RGJqfMvt7P8FUr0Q1j-Hf1DvJA0iRrMYJ_K-4.ttf",
      800: "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGm4-RGJqfMvt7P8FUr0Q1j-Hf1Du5D0iRrMYJ_K-4.ttf",
      900: "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGm4-RGJqfMvt7P8FUr0Q1j-Hf1DspC0iRrMYJ_K-4.ttf",
      "100italic": "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGl4-RGJqfMvt7P8FUr0Q1j-Hf1BkxdlgRBH452Mvds.ttf",
      "300italic": "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGk4-RGJqfMvt7P8FUr0Q1j-Hf1BkxdXiZhNaB6O-51OA.ttf",
      regular: "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGh4-RGJqfMvt7P8FUr0Q1j-Hf1Nk5v9ixALYs.ttf",
      italic: "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGn4-RGJqfMvt7P8FUr0Q1j-Hf1Bkxl8g5FPYtmMg.ttf",
      "500italic": "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGk4-RGJqfMvt7P8FUr0Q1j-Hf1BkxdBidhNaB6O-51OA.ttf",
      "700italic": "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGk4-RGJqfMvt7P8FUr0Q1j-Hf1BkxdTiFhNaB6O-51OA.ttf",
      "800italic": "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGk4-RGJqfMvt7P8FUr0Q1j-Hf1BkxdUiJhNaB6O-51OA.ttf",
      "900italic": "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGk4-RGJqfMvt7P8FUr0Q1j-Hf1BkxddiNhNaB6O-51OA.ttf"
    }
  },
  {
    family: "Pathway Gothic One",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/pathwaygothicone/v15/MwQrbgD32-KAvjkYGNUUxAtW7pEBwx-dTFxeb80flQ.ttf"
    }
  },
  {
    family: "Concert One",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/concertone/v21/VEM1Ro9xs5PjtzCu-srDqRTlhv-CuVAQ.ttf"
    }
  },
  {
    family: "Old Standard TT",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "italic", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/oldstandardtt/v20/MwQrbh3o1vLImiwAVvYawgcf2eVWEX-dTFxeb80flQ.ttf",
      regular: "http://fonts.gstatic.com/s/oldstandardtt/v20/MwQubh3o1vLImiwAVvYawgcf2eVurVC5RHdCZg.ttf",
      italic: "http://fonts.gstatic.com/s/oldstandardtt/v20/MwQsbh3o1vLImiwAVvYawgcf2eVer1q9ZnJSZtQG.ttf"
    }
  },
  {
    family: "Advent Pro",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLQyJPTJoonw1aBA.ttf",
      200: "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLwyNPTJoonw1aBA.ttf",
      300: "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLHSNPTJoonw1aBA.ttf",
      500: "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLcSNPTJoonw1aBA.ttf",
      600: "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLnSRPTJoonw1aBA.ttf",
      700: "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLpCRPTJoonw1aBA.ttf",
      800: "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLwyRPTJoonw1aBA.ttf",
      900: "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpL6iRPTJoonw1aBA.ttf",
      regular: "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLQyNPTJoonw1aBA.ttf",
      "100italic": "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2CnDpAsvQhKBH4C.ttf",
      "200italic": "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2AnD5AsvQhKBH4C.ttf",
      "300italic": "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2D5D5AsvQhKBH4C.ttf",
      italic: "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2CnD5AsvQhKBH4C.ttf",
      "500italic": "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2CVD5AsvQhKBH4C.ttf",
      "600italic": "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2B5CJAsvQhKBH4C.ttf",
      "700italic": "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2BACJAsvQhKBH4C.ttf",
      "800italic": "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2AnCJAsvQhKBH4C.ttf",
      "900italic": "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2AOCJAsvQhKBH4C.ttf"
    }
  },
  {
    family: "Rokkitt",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1rydpDLE76HvN6n.ttf",
      200: "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1pyd5DLE76HvN6n.ttf",
      300: "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1qsd5DLE76HvN6n.ttf",
      500: "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1rAd5DLE76HvN6n.ttf",
      600: "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1oscJDLE76HvN6n.ttf",
      700: "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1oVcJDLE76HvN6n.ttf",
      800: "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1pycJDLE76HvN6n.ttf",
      900: "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1pbcJDLE76HvN6n.ttf",
      regular: "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1ryd5DLE76HvN6n.ttf",
      "100italic": "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NHiJGbqluc6nu9E.ttf",
      "200italic": "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NPiIGbqluc6nu9E.ttf",
      "300italic": "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NCaIGbqluc6nu9E.ttf",
      italic: "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NHiIGbqluc6nu9E.ttf",
      "500italic": "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NEqIGbqluc6nu9E.ttf",
      "600italic": "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NKaPGbqluc6nu9E.ttf",
      "700italic": "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NJ-PGbqluc6nu9E.ttf",
      "800italic": "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NPiPGbqluc6nu9E.ttf",
      "900italic": "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NNGPGbqluc6nu9E.ttf"
    }
  },
  {
    family: "Luckiest Guy",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/luckiestguy/v22/_gP_1RrxsjcxVyin9l9n_j2RStR3qDpraA.ttf"
    }
  },
  {
    family: "Gothic A1",
    category: "sans-serif",
    subsets: ["korean", "latin"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/gothica1/v13/CSR74z5ZnPydRjlCCwlCCMcqYtd2vfwk.ttf",
      200: "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlCpOYKSPl6tOU9Eg.ttf",
      300: "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlCwOUKSPl6tOU9Eg.ttf",
      500: "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlCmOQKSPl6tOU9Eg.ttf",
      600: "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlCtOMKSPl6tOU9Eg.ttf",
      700: "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlC0OIKSPl6tOU9Eg.ttf",
      800: "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlCzOEKSPl6tOU9Eg.ttf",
      900: "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlC6OAKSPl6tOU9Eg.ttf",
      regular: "http://fonts.gstatic.com/s/gothica1/v13/CSR94z5ZnPydRjlCCwl6bM0uQNJmvQ.ttf"
    }
  },
  {
    family: "Sanchez",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/sanchez/v15/Ycm2sZJORluHnXbITm5b_BwE1l0.ttf",
      italic: "http://fonts.gstatic.com/s/sanchez/v15/Ycm0sZJORluHnXbIfmxR-D4Bxl3gkw.ttf"
    }
  },
  {
    family: "Mate",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/mate/v17/m8JdjftRd7WZ2z28WoXSaLU.ttf",
      italic: "http://fonts.gstatic.com/s/mate/v17/m8JTjftRd7WZ6z-2XqfXeLVdbw.ttf"
    }
  },
  {
    family: "Quattrocento Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/quattrocentosans/v18/va9Z4lja2NVIDdIAAoMR5MfuElaRB0RykmrWN33AiasJ.ttf",
      regular: "http://fonts.gstatic.com/s/quattrocentosans/v18/va9c4lja2NVIDdIAAoMR5MfuElaRB3zOvU7eHGHJ.ttf",
      italic: "http://fonts.gstatic.com/s/quattrocentosans/v18/va9a4lja2NVIDdIAAoMR5MfuElaRB0zMt0r8GXHJkLI.ttf",
      "700italic": "http://fonts.gstatic.com/s/quattrocentosans/v18/va9X4lja2NVIDdIAAoMR5MfuElaRB0zMj_bTPXnijLsJV7E.ttf"
    }
  },
  {
    family: "Crimson Pro",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      200: "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZTm18OJE_VNWoyQ.ttf",
      300: "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZkG18OJE_VNWoyQ.ttf",
      500: "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZ_G18OJE_VNWoyQ.ttf",
      600: "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZEGp8OJE_VNWoyQ.ttf",
      700: "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZKWp8OJE_VNWoyQ.ttf",
      800: "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZTmp8OJE_VNWoyQ.ttf",
      900: "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZZ2p8OJE_VNWoyQ.ttf",
      regular: "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZzm18OJE_VNWoyQ.ttf",
      "200italic": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi4Ue5s7dtC4yZNE.ttf",
      "300italic": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi7Ke5s7dtC4yZNE.ttf",
      italic: "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi6Ue5s7dtC4yZNE.ttf",
      "500italic": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi6me5s7dtC4yZNE.ttf",
      "600italic": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi5KfJs7dtC4yZNE.ttf",
      "700italic": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi5zfJs7dtC4yZNE.ttf",
      "800italic": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi4UfJs7dtC4yZNE.ttf",
      "900italic": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi49fJs7dtC4yZNE.ttf"
    }
  },
  {
    family: "Antic Slab",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/anticslab/v16/bWt97fPFfRzkCa9Jlp6IWcJWXW5p5Qo.ttf"
    }
  },
  {
    family: "Khand",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/khand/v17/TwMN-IINQlQQ0bL5cFE3ZwaH__-C.ttf",
      500: "http://fonts.gstatic.com/s/khand/v17/TwMN-IINQlQQ0bKhcVE3ZwaH__-C.ttf",
      600: "http://fonts.gstatic.com/s/khand/v17/TwMN-IINQlQQ0bKNdlE3ZwaH__-C.ttf",
      700: "http://fonts.gstatic.com/s/khand/v17/TwMN-IINQlQQ0bLpd1E3ZwaH__-C.ttf",
      regular: "http://fonts.gstatic.com/s/khand/v17/TwMA-IINQlQQ0YpVWHU_TBqO.ttf"
    }
  },
  {
    family: "Press Start 2P",
    category: "display",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK0nSgPJE4580.ttf"
    }
  },
  {
    family: "Sawarabi Gothic",
    category: "sans-serif",
    subsets: ["cyrillic", "japanese", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/sawarabigothic/v12/x3d4ckfVaqqa-BEj-I9mE65u3k3NBSk3E2YljQ.ttf"
    }
  },
  {
    family: "Saira",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA71rDosg7lwYmUVY.ttf",
      200: "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA79rCosg7lwYmUVY.ttf",
      300: "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA7wTCosg7lwYmUVY.ttf",
      500: "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA72jCosg7lwYmUVY.ttf",
      600: "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA74TFosg7lwYmUVY.ttf",
      700: "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA773Fosg7lwYmUVY.ttf",
      800: "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA79rFosg7lwYmUVY.ttf",
      900: "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA7_PFosg7lwYmUVY.ttf",
      regular: "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA71rCosg7lwYmUVY.ttf",
      "100italic": "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKBSooxkyQjQVYmxA.ttf",
      "200italic": "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKByosxkyQjQVYmxA.ttf",
      "300italic": "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKBFIsxkyQjQVYmxA.ttf",
      italic: "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKBSosxkyQjQVYmxA.ttf",
      "500italic": "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKBeIsxkyQjQVYmxA.ttf",
      "600italic": "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKBlIwxkyQjQVYmxA.ttf",
      "700italic": "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKBrYwxkyQjQVYmxA.ttf",
      "800italic": "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKByowxkyQjQVYmxA.ttf",
      "900italic": "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKB44wxkyQjQVYmxA.ttf"
    }
  },
  {
    family: "Ubuntu Mono",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/ubuntumono/v17/KFO-CneDtsqEr0keqCMhbC-BL-Hyv4xGemO1.ttf",
      regular: "http://fonts.gstatic.com/s/ubuntumono/v17/KFOjCneDtsqEr0keqCMhbBc9AMX6lJBP.ttf",
      italic: "http://fonts.gstatic.com/s/ubuntumono/v17/KFOhCneDtsqEr0keqCMhbCc_CsHYkYBPY3o.ttf",
      "700italic": "http://fonts.gstatic.com/s/ubuntumono/v17/KFO8CneDtsqEr0keqCMhbCc_Mn33tYhkf3O1GVg.ttf"
    }
  },
  {
    family: "Yeseva One",
    category: "display",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/yesevaone/v22/OpNJno4ck8vc-xYpwWWxpipfWhXD00c.ttf"
    }
  },
  {
    family: "Josefin Slab",
    category: "serif",
    subsets: ["latin"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W71mtd3k3K6CcEyI.ttf",
      200: "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W79msd3k3K6CcEyI.ttf",
      300: "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W7wesd3k3K6CcEyI.ttf",
      500: "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W72usd3k3K6CcEyI.ttf",
      600: "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W74erd3k3K6CcEyI.ttf",
      700: "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W776rd3k3K6CcEyI.ttf",
      regular: "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W71msd3k3K6CcEyI.ttf",
      "100italic": "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHvnzs9L4KZAyK43w.ttf",
      "200italic": "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHvHzo9L4KZAyK43w.ttf",
      "300italic": "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHvwTo9L4KZAyK43w.ttf",
      italic: "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHvnzo9L4KZAyK43w.ttf",
      "500italic": "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHvrTo9L4KZAyK43w.ttf",
      "600italic": "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHvQT09L4KZAyK43w.ttf",
      "700italic": "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHveD09L4KZAyK43w.ttf"
    }
  },
  {
    family: "Unna",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/unna/v23/AYCLpXzofN0NMiQusGnpRFpr3vc.ttf",
      regular: "http://fonts.gstatic.com/s/unna/v23/AYCEpXzofN0NCpgBlGHCWFM.ttf",
      italic: "http://fonts.gstatic.com/s/unna/v23/AYCKpXzofN0NOpoLkEPHSFNyxw.ttf",
      "700italic": "http://fonts.gstatic.com/s/unna/v23/AYCJpXzofN0NOpozLGzjQHhuzvef5Q.ttf"
    }
  },
  {
    family: "Patrick Hand",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/patrickhand/v23/LDI1apSQOAYtSuYWp8ZhfYeMWcjKm7sp8g.ttf"
    }
  },
  {
    family: "Quattrocento",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/quattrocento/v21/OZpbg_xvsDZQL_LKIF7q4jP_eE3fd6PZsXcM9w.ttf",
      regular: "http://fonts.gstatic.com/s/quattrocento/v21/OZpEg_xvsDZQL_LKIF7q4jPHxGL7f4jFuA.ttf"
    }
  },
  {
    family: "Handlee",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/handlee/v18/-F6xfjBsISg9aMakDmr6oilJ3ik.ttf"
    }
  },
  {
    family: "IBM Plex Sans Condensed",
    category: "sans-serif",
    subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8nN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY7KyKvBgYsMDhM.ttf",
      200: "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8gN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY5m6Yvrr4cFFwq5.ttf",
      300: "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8gN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY4C6ovrr4cFFwq5.ttf",
      500: "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8gN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY5a64vrr4cFFwq5.ttf",
      600: "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8gN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY527Ivrr4cFFwq5.ttf",
      700: "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8gN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY4S7Yvrr4cFFwq5.ttf",
      "100italic": "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8hN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYas8M_LhakJHhOgBg.ttf",
      "200italic": "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8iN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYas8GPqpYMnEhq5H1w.ttf",
      "300italic": "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8iN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYas8AfppYMnEhq5H1w.ttf",
      regular: "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8lN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHbauwq_jhJsM.ttf",
      italic: "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8nN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYasyKvBgYsMDhM.ttf",
      "500italic": "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8iN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYas8F_opYMnEhq5H1w.ttf",
      "600italic": "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8iN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYas8HPvpYMnEhq5H1w.ttf",
      "700italic": "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8iN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYas8BfupYMnEhq5H1w.ttf"
    }
  },
  {
    family: "Gelasio",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "italic", "500", "500italic", "600", "600italic", "700", "700italic"],
    files: {
      500: "http://fonts.gstatic.com/s/gelasio/v10/cIf4MaFfvUQxTTqS_N2CRGEsnIJkWL4.ttf",
      600: "http://fonts.gstatic.com/s/gelasio/v10/cIf4MaFfvUQxTTqS_PGFRGEsnIJkWL4.ttf",
      700: "http://fonts.gstatic.com/s/gelasio/v10/cIf4MaFfvUQxTTqS_JWERGEsnIJkWL4.ttf",
      regular: "http://fonts.gstatic.com/s/gelasio/v10/cIf9MaFfvUQxTTqSxCmrYGkHgIs.ttf",
      italic: "http://fonts.gstatic.com/s/gelasio/v10/cIf_MaFfvUQxTTqS9CuhZEsCkIt9QQ.ttf",
      "500italic": "http://fonts.gstatic.com/s/gelasio/v10/cIf6MaFfvUQxTTqS9CuZkGImmKBhSL7Y1Q.ttf",
      "600italic": "http://fonts.gstatic.com/s/gelasio/v10/cIf6MaFfvUQxTTqS9CuZvGUmmKBhSL7Y1Q.ttf",
      "700italic": "http://fonts.gstatic.com/s/gelasio/v10/cIf6MaFfvUQxTTqS9CuZ2GQmmKBhSL7Y1Q.ttf"
    }
  },
  {
    family: "Poiret One",
    category: "display",
    subsets: ["cyrillic", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/poiretone/v16/UqyVK80NJXN4zfRgbdfbk5lWVscxdKE.ttf"
    }
  },
  {
    family: "Staatliches",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/staatliches/v13/HI_OiY8KO6hCsQSoAPmtMbectJG9O9PS.ttf"
    }
  },
  {
    family: "Mate SC",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/matesc/v22/-nF8OGQ1-uoVr2wKyiXZ95OkJwA.ttf"
    }
  },
  {
    family: "Noto Sans Thai",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU5RspzF-QRvzzXg.ttf",
      200: "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdUxRtpzF-QRvzzXg.ttf",
      300: "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU8ptpzF-QRvzzXg.ttf",
      500: "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU6ZtpzF-QRvzzXg.ttf",
      600: "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU0pqpzF-QRvzzXg.ttf",
      700: "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU3NqpzF-QRvzzXg.ttf",
      800: "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdUxRqpzF-QRvzzXg.ttf",
      900: "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdUz1qpzF-QRvzzXg.ttf",
      regular: "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU5RtpzF-QRvzzXg.ttf"
    }
  },
  {
    family: "Cuprum",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
    files: {
      500: "http://fonts.gstatic.com/s/cuprum/v25/dg45_pLmvrkcOkBnKsOzXyGWTBcmg9f6ZjzSJjQjgnU.ttf",
      600: "http://fonts.gstatic.com/s/cuprum/v25/dg45_pLmvrkcOkBnKsOzXyGWTBcmgzv9ZjzSJjQjgnU.ttf",
      700: "http://fonts.gstatic.com/s/cuprum/v25/dg45_pLmvrkcOkBnKsOzXyGWTBcmgwL9ZjzSJjQjgnU.ttf",
      regular: "http://fonts.gstatic.com/s/cuprum/v25/dg45_pLmvrkcOkBnKsOzXyGWTBcmg-X6ZjzSJjQjgnU.ttf",
      italic: "http://fonts.gstatic.com/s/cuprum/v25/dg47_pLmvrkcOkBNI_FMh0j91rkhli25jn_YIhYmknUPEA.ttf",
      "500italic": "http://fonts.gstatic.com/s/cuprum/v25/dg47_pLmvrkcOkBNI_FMh0j91rkhli25vH_YIhYmknUPEA.ttf",
      "600italic": "http://fonts.gstatic.com/s/cuprum/v25/dg47_pLmvrkcOkBNI_FMh0j91rkhli25UHjYIhYmknUPEA.ttf",
      "700italic": "http://fonts.gstatic.com/s/cuprum/v25/dg47_pLmvrkcOkBNI_FMh0j91rkhli25aXjYIhYmknUPEA.ttf"
    }
  },
  {
    family: "Encode Sans Condensed",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_76_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-5a-JLQoFI2KR.ttf",
      200: "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-SY6pByQJKnuIFA.ttf",
      300: "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-LY2pByQJKnuIFA.ttf",
      500: "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-dYypByQJKnuIFA.ttf",
      600: "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-WYupByQJKnuIFA.ttf",
      700: "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-PYqpByQJKnuIFA.ttf",
      800: "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-IYmpByQJKnuIFA.ttf",
      900: "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-BYipByQJKnuIFA.ttf",
      regular: "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_16_LD37rqfuwxyIuaZhE6cRXOLtm2gfTGgaWNDw8VIw.ttf"
    }
  },
  {
    family: "Rubik Mono One",
    category: "sans-serif",
    subsets: ["cyrillic", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/rubikmonoone/v18/UqyJK8kPP3hjw6ANTdfRk9YSN-8wRqQrc_j9.ttf"
    }
  },
  {
    family: "Yatra One",
    category: "display",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/yatraone/v14/C8ch4copsHzj8p7NaF0xw1OBbRDvXw.ttf"
    }
  },
  {
    family: "Bangers",
    category: "display",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/bangers/v24/FeVQS0BTqb0h60ACL5la2bxii28.ttf"
    }
  },
  {
    family: "Special Elite",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/specialelite/v18/XLYgIZbkc4JPUL5CVArUVL0nhncESXFtUsM.ttf"
    }
  },
  {
    family: "Readex Pro",
    category: "sans-serif",
    subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700"],
    files: {
      200: "http://fonts.gstatic.com/s/readexpro/v21/SLXnc1bJ7HE5YDoGPuzj_dh8uc7wUy8ZQQyX2KY8TL0kGZN6blTCYUSmgmsglvjkag.ttf",
      300: "http://fonts.gstatic.com/s/readexpro/v21/SLXnc1bJ7HE5YDoGPuzj_dh8uc7wUy8ZQQyX2KY8TL0kGZN6blTCv0Smgmsglvjkag.ttf",
      500: "http://fonts.gstatic.com/s/readexpro/v21/SLXnc1bJ7HE5YDoGPuzj_dh8uc7wUy8ZQQyX2KY8TL0kGZN6blTC00Smgmsglvjkag.ttf",
      600: "http://fonts.gstatic.com/s/readexpro/v21/SLXnc1bJ7HE5YDoGPuzj_dh8uc7wUy8ZQQyX2KY8TL0kGZN6blTCP0Omgmsglvjkag.ttf",
      700: "http://fonts.gstatic.com/s/readexpro/v21/SLXnc1bJ7HE5YDoGPuzj_dh8uc7wUy8ZQQyX2KY8TL0kGZN6blTCBkOmgmsglvjkag.ttf",
      regular: "http://fonts.gstatic.com/s/readexpro/v21/SLXnc1bJ7HE5YDoGPuzj_dh8uc7wUy8ZQQyX2KY8TL0kGZN6blTC4USmgmsglvjkag.ttf"
    }
  },
  {
    family: "Vidaloka",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/vidaloka/v18/7cHrv4c3ipenMKlEass8yn4hnCci.ttf"
    }
  },
  {
    family: "Roboto Serif",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcEliosp6d2Af5fR4k.ttf",
      200: "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcElqotp6d2Af5fR4k.ttf",
      300: "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcElnQtp6d2Af5fR4k.ttf",
      500: "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcElhgtp6d2Af5fR4k.ttf",
      600: "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcElvQqp6d2Af5fR4k.ttf",
      700: "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcEls0qp6d2Af5fR4k.ttf",
      800: "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcElqoqp6d2Af5fR4k.ttf",
      900: "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcEloMqp6d2Af5fR4k.ttf",
      regular: "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcEliotp6d2Af5fR4k.ttf",
      "100italic": "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-JuT-V8BdxaV4nUFw.ttf",
      "200italic": "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-Juz-R8BdxaV4nUFw.ttf",
      "300italic": "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-JuEeR8BdxaV4nUFw.ttf",
      italic: "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-JuT-R8BdxaV4nUFw.ttf",
      "500italic": "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-JufeR8BdxaV4nUFw.ttf",
      "600italic": "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-JukeN8BdxaV4nUFw.ttf",
      "700italic": "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-JuqON8BdxaV4nUFw.ttf",
      "800italic": "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-Juz-N8BdxaV4nUFw.ttf",
      "900italic": "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-Ju5uN8BdxaV4nUFw.ttf"
    }
  },
  {
    family: "Fira Sans Extra Condensed",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPMcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3Zyuv1WarE9ncg.ttf",
      200: "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3TCPn3-0oEZ-a2Q.ttf",
      300: "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3VSMn3-0oEZ-a2Q.ttf",
      500: "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3QyNn3-0oEZ-a2Q.ttf",
      600: "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3SCKn3-0oEZ-a2Q.ttf",
      700: "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3USLn3-0oEZ-a2Q.ttf",
      800: "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3ViIn3-0oEZ-a2Q.ttf",
      900: "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3XyJn3-0oEZ-a2Q.ttf",
      "100italic": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPOcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqW21-ejkp3cn22.ttf",
      "200italic": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWd36-pGR7e2SvJQ.ttf",
      "300italic": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWE32-pGR7e2SvJQ.ttf",
      regular: "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPKcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda5fiku3efvE8.ttf",
      italic: "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPMcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fquv1WarE9ncg.ttf",
      "500italic": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWS3y-pGR7e2SvJQ.ttf",
      "600italic": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWZ3u-pGR7e2SvJQ.ttf",
      "700italic": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWA3q-pGR7e2SvJQ.ttf",
      "800italic": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWH3m-pGR7e2SvJQ.ttf",
      "900italic": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWO3i-pGR7e2SvJQ.ttf"
    }
  },
  {
    family: "News Cycle",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/newscycle/v23/CSR54z1Qlv-GDxkbKVQ_dFsvaNNUuOwkC2s.ttf",
      regular: "http://fonts.gstatic.com/s/newscycle/v23/CSR64z1Qlv-GDxkbKVQ_TOcATNt_pOU.ttf"
    }
  },
  {
    family: "Commissioner",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTMNcGPe7Fu0jUdk.ttf",
      200: "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTENdGPe7Fu0jUdk.ttf",
      300: "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTJ1dGPe7Fu0jUdk.ttf",
      500: "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTPFdGPe7Fu0jUdk.ttf",
      600: "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTB1aGPe7Fu0jUdk.ttf",
      700: "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTCRaGPe7Fu0jUdk.ttf",
      800: "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTENaGPe7Fu0jUdk.ttf",
      900: "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTGpaGPe7Fu0jUdk.ttf",
      regular: "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTMNdGPe7Fu0jUdk.ttf"
    }
  },
  {
    family: "Unbounded",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      200: "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG65jx043HgP6LR0Y.ttf",
      300: "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG60bx043HgP6LR0Y.ttf",
      500: "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6yrx043HgP6LR0Y.ttf",
      600: "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG68b2043HgP6LR0Y.ttf",
      700: "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6__2043HgP6LR0Y.ttf",
      800: "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG65j2043HgP6LR0Y.ttf",
      900: "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG67H2043HgP6LR0Y.ttf",
      regular: "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6xjx043HgP6LR0Y.ttf"
    }
  },
  {
    family: "Tangerine",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/tangerine/v17/Iurd6Y5j_oScZZow4VO5srNpjJtM6G0t9w.ttf",
      regular: "http://fonts.gstatic.com/s/tangerine/v17/IurY6Y5j_oScZZow4VOBDpxNhLBQ4Q.ttf"
    }
  },
  {
    family: "Sen",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "500", "600", "700", "800"],
    files: {
      500: "http://fonts.gstatic.com/s/sen/v9/6xK0dSxYI9_dkN18-vZKK2EISBi5H47KlD9q78A.ttf",
      600: "http://fonts.gstatic.com/s/sen/v9/6xK0dSxYI9_dkN18-vZKK2EISPS-H47KlD9q78A.ttf",
      700: "http://fonts.gstatic.com/s/sen/v9/6xK0dSxYI9_dkN18-vZKK2EISM2-H47KlD9q78A.ttf",
      800: "http://fonts.gstatic.com/s/sen/v9/6xK0dSxYI9_dkN18-vZKK2EISKq-H47KlD9q78A.ttf",
      regular: "http://fonts.gstatic.com/s/sen/v9/6xK0dSxYI9_dkN18-vZKK2EISCq5H47KlD9q78A.ttf"
    }
  },
  {
    family: "Be Vietnam Pro",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/bevietnampro/v11/QdVNSTAyLFyeg_IDWvOJmVES_HRUBX8YYbAiah8.ttf",
      200: "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HT4JF8yT7wrcwap.ttf",
      300: "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HScJ18yT7wrcwap.ttf",
      500: "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HTEJl8yT7wrcwap.ttf",
      600: "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HToIV8yT7wrcwap.ttf",
      700: "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HSMIF8yT7wrcwap.ttf",
      800: "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HSQI18yT7wrcwap.ttf",
      900: "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HS0Il8yT7wrcwap.ttf",
      "100italic": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVLSTAyLFyeg_IDWvOJmVES_HwyPRsSZZIneh-waA.ttf",
      "200italic": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPbczRbgJdhapcUU.ttf",
      "300italic": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPdMwRbgJdhapcUU.ttf",
      regular: "http://fonts.gstatic.com/s/bevietnampro/v11/QdVPSTAyLFyeg_IDWvOJmVES_EwwD3s6ZKAi.ttf",
      italic: "http://fonts.gstatic.com/s/bevietnampro/v11/QdVNSTAyLFyeg_IDWvOJmVES_HwyBX8YYbAiah8.ttf",
      "500italic": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPYsxRbgJdhapcUU.ttf",
      "600italic": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPac2RbgJdhapcUU.ttf",
      "700italic": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPcM3RbgJdhapcUU.ttf",
      "800italic": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPd80RbgJdhapcUU.ttf",
      "900italic": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPfs1RbgJdhapcUU.ttf"
    }
  },
  {
    family: "Caladea",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/caladea/v7/kJE2BugZ7AAjhybUtaNY39oYqO52FZ0.ttf",
      regular: "http://fonts.gstatic.com/s/caladea/v7/kJEzBugZ7AAjhybUjR93-9IztOc.ttf",
      italic: "http://fonts.gstatic.com/s/caladea/v7/kJExBugZ7AAjhybUvR19__A2pOdvDA.ttf",
      "700italic": "http://fonts.gstatic.com/s/caladea/v7/kJE0BugZ7AAjhybUvR1FQ98SrMxzBZ2lDA.ttf"
    }
  },
  {
    family: "Aleo",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KJ3G2P9HI4qCBtJ.ttf",
      200: "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KL3GmP9HI4qCBtJ.ttf",
      300: "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KIpGmP9HI4qCBtJ.ttf",
      500: "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KJFGmP9HI4qCBtJ.ttf",
      600: "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KKpHWP9HI4qCBtJ.ttf",
      700: "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KKQHWP9HI4qCBtJ.ttf",
      800: "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KL3HWP9HI4qCBtJ.ttf",
      900: "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KLeHWP9HI4qCBtJ.ttf",
      regular: "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KJ3GmP9HI4qCBtJ.ttf",
      "100italic": "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WYu_FooIDQtJbok.ttf",
      "200italic": "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WQu-FooIDQtJbok.ttf",
      "300italic": "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WdW-FooIDQtJbok.ttf",
      italic: "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WYu-FooIDQtJbok.ttf",
      "500italic": "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_Wbm-FooIDQtJbok.ttf",
      "600italic": "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WVW5FooIDQtJbok.ttf",
      "700italic": "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WWy5FooIDQtJbok.ttf",
      "800italic": "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WQu5FooIDQtJbok.ttf",
      "900italic": "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WSK5FooIDQtJbok.ttf"
    }
  },
  {
    family: "Mukta Malar",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "tamil"],
    variants: ["200", "300", "regular", "500", "600", "700", "800"],
    files: {
      200: "http://fonts.gstatic.com/s/muktamalar/v12/MCoKzAXyz8LOE2FpJMxZqIMwBtAB62ruoAZW.ttf",
      300: "http://fonts.gstatic.com/s/muktamalar/v12/MCoKzAXyz8LOE2FpJMxZqINUBdAB62ruoAZW.ttf",
      500: "http://fonts.gstatic.com/s/muktamalar/v12/MCoKzAXyz8LOE2FpJMxZqIMMBNAB62ruoAZW.ttf",
      600: "http://fonts.gstatic.com/s/muktamalar/v12/MCoKzAXyz8LOE2FpJMxZqIMgA9AB62ruoAZW.ttf",
      700: "http://fonts.gstatic.com/s/muktamalar/v12/MCoKzAXyz8LOE2FpJMxZqINEAtAB62ruoAZW.ttf",
      800: "http://fonts.gstatic.com/s/muktamalar/v12/MCoKzAXyz8LOE2FpJMxZqINYAdAB62ruoAZW.ttf",
      regular: "http://fonts.gstatic.com/s/muktamalar/v12/MCoXzAXyz8LOE2FpJMxZqLv4LfQJwHbn.ttf"
    }
  },
  {
    family: "Secular One",
    category: "sans-serif",
    subsets: ["hebrew", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/secularone/v12/8QINdiTajsj_87rMuMdKypDlMul7LJpK.ttf"
    }
  },
  {
    family: "Playfair Display SC",
    category: "serif",
    subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "italic", "700", "700italic", "900", "900italic"],
    files: {
      700: "http://fonts.gstatic.com/s/playfairdisplaysc/v15/ke80OhoaMkR6-hSn7kbHVoFf7ZfgMPr_nQIpNcsdL4IUMyE.ttf",
      900: "http://fonts.gstatic.com/s/playfairdisplaysc/v15/ke80OhoaMkR6-hSn7kbHVoFf7ZfgMPr_nTorNcsdL4IUMyE.ttf",
      regular: "http://fonts.gstatic.com/s/playfairdisplaysc/v15/ke85OhoaMkR6-hSn7kbHVoFf7ZfgMPr_pb4GEcM2M4s.ttf",
      italic: "http://fonts.gstatic.com/s/playfairdisplaysc/v15/ke87OhoaMkR6-hSn7kbHVoFf7ZfgMPr_lbwMFeEzI4sNKg.ttf",
      "700italic": "http://fonts.gstatic.com/s/playfairdisplaysc/v15/ke82OhoaMkR6-hSn7kbHVoFf7ZfgMPr_lbw0qc4XK6ARIyH5IA.ttf",
      "900italic": "http://fonts.gstatic.com/s/playfairdisplaysc/v15/ke82OhoaMkR6-hSn7kbHVoFf7ZfgMPr_lbw0kcwXK6ARIyH5IA.ttf"
    }
  },
  {
    family: "Noto Naskh Arabic",
    category: "serif",
    subsets: ["arabic", "latin", "latin-ext"],
    variants: ["regular", "500", "600", "700"],
    files: {
      500: "http://fonts.gstatic.com/s/notonaskharabic/v33/RrQ5bpV-9Dd1b1OAGA6M9PkyDuVBePeKNaxcsss0Y7bwj85krK0z9_Mnuw.ttf",
      600: "http://fonts.gstatic.com/s/notonaskharabic/v33/RrQ5bpV-9Dd1b1OAGA6M9PkyDuVBePeKNaxcsss0Y7bwY8lkrK0z9_Mnuw.ttf",
      700: "http://fonts.gstatic.com/s/notonaskharabic/v33/RrQ5bpV-9Dd1b1OAGA6M9PkyDuVBePeKNaxcsss0Y7bwWslkrK0z9_Mnuw.ttf",
      regular: "http://fonts.gstatic.com/s/notonaskharabic/v33/RrQ5bpV-9Dd1b1OAGA6M9PkyDuVBePeKNaxcsss0Y7bwvc5krK0z9_Mnuw.ttf"
    }
  },
  {
    family: "Baloo 2",
    category: "display",
    subsets: ["devanagari", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700", "800"],
    files: {
      500: "http://fonts.gstatic.com/s/baloo2/v21/wXK0E3kTposypRydzVT08TS3JnAmtdgozapv9Fat7WcN.ttf",
      600: "http://fonts.gstatic.com/s/baloo2/v21/wXK0E3kTposypRydzVT08TS3JnAmtdjEyqpv9Fat7WcN.ttf",
      700: "http://fonts.gstatic.com/s/baloo2/v21/wXK0E3kTposypRydzVT08TS3JnAmtdj9yqpv9Fat7WcN.ttf",
      800: "http://fonts.gstatic.com/s/baloo2/v21/wXK0E3kTposypRydzVT08TS3JnAmtdiayqpv9Fat7WcN.ttf",
      regular: "http://fonts.gstatic.com/s/baloo2/v21/wXK0E3kTposypRydzVT08TS3JnAmtdgazapv9Fat7WcN.ttf"
    }
  },
  {
    family: "Faustina",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic"
    ],
    files: {
      300: "http://fonts.gstatic.com/s/faustina/v20/XLY4IZPxYpJfTbZAFXWzNT2SO8wpWHls3IEvGVWWe8tbEg.ttf",
      500: "http://fonts.gstatic.com/s/faustina/v20/XLY4IZPxYpJfTbZAFXWzNT2SO8wpWHlssIEvGVWWe8tbEg.ttf",
      600: "http://fonts.gstatic.com/s/faustina/v20/XLY4IZPxYpJfTbZAFXWzNT2SO8wpWHlsXIYvGVWWe8tbEg.ttf",
      700: "http://fonts.gstatic.com/s/faustina/v20/XLY4IZPxYpJfTbZAFXWzNT2SO8wpWHlsZYYvGVWWe8tbEg.ttf",
      800: "http://fonts.gstatic.com/s/faustina/v20/XLY4IZPxYpJfTbZAFXWzNT2SO8wpWHlsAoYvGVWWe8tbEg.ttf",
      regular: "http://fonts.gstatic.com/s/faustina/v20/XLY4IZPxYpJfTbZAFXWzNT2SO8wpWHlsgoEvGVWWe8tbEg.ttf",
      "300italic": "http://fonts.gstatic.com/s/faustina/v20/XLY2IZPxYpJfTbZAFV-6B8JKUqez9n55SsKZWl-SWc5LEnoF.ttf",
      italic: "http://fonts.gstatic.com/s/faustina/v20/XLY2IZPxYpJfTbZAFV-6B8JKUqez9n55SsLHWl-SWc5LEnoF.ttf",
      "500italic": "http://fonts.gstatic.com/s/faustina/v20/XLY2IZPxYpJfTbZAFV-6B8JKUqez9n55SsL1Wl-SWc5LEnoF.ttf",
      "600italic": "http://fonts.gstatic.com/s/faustina/v20/XLY2IZPxYpJfTbZAFV-6B8JKUqez9n55SsIZXV-SWc5LEnoF.ttf",
      "700italic": "http://fonts.gstatic.com/s/faustina/v20/XLY2IZPxYpJfTbZAFV-6B8JKUqez9n55SsIgXV-SWc5LEnoF.ttf",
      "800italic": "http://fonts.gstatic.com/s/faustina/v20/XLY2IZPxYpJfTbZAFV-6B8JKUqez9n55SsJHXV-SWc5LEnoF.ttf"
    }
  },
  {
    family: "Mitr",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700"],
    files: {
      200: "http://fonts.gstatic.com/s/mitr/v11/pxiEypw5ucZF8fMZFJDUc1NECPY.ttf",
      300: "http://fonts.gstatic.com/s/mitr/v11/pxiEypw5ucZF8ZcaFJDUc1NECPY.ttf",
      500: "http://fonts.gstatic.com/s/mitr/v11/pxiEypw5ucZF8c8bFJDUc1NECPY.ttf",
      600: "http://fonts.gstatic.com/s/mitr/v11/pxiEypw5ucZF8eMcFJDUc1NECPY.ttf",
      700: "http://fonts.gstatic.com/s/mitr/v11/pxiEypw5ucZF8YcdFJDUc1NECPY.ttf",
      regular: "http://fonts.gstatic.com/s/mitr/v11/pxiLypw5ucZFyTsyMJj_b1o.ttf"
    }
  },
  {
    family: "Allura",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/allura/v21/9oRPNYsQpS4zjuAPjAIXPtrrGA.ttf"
    }
  },
  {
    family: "Literata",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      200: "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbJG_F_bcTWCWp8g.ttf",
      300: "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbE-_F_bcTWCWp8g.ttf",
      500: "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbCO_F_bcTWCWp8g.ttf",
      600: "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbM-4F_bcTWCWp8g.ttf",
      700: "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbPa4F_bcTWCWp8g.ttf",
      800: "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbJG4F_bcTWCWp8g.ttf",
      900: "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbLi4F_bcTWCWp8g.ttf",
      regular: "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbBG_F_bcTWCWp8g.ttf",
      "200italic": "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8f7XWSUKTt8iVow.ttf",
      "300italic": "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8obXWSUKTt8iVow.ttf",
      italic: "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8_7XWSUKTt8iVow.ttf",
      "500italic": "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8zbXWSUKTt8iVow.ttf",
      "600italic": "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8IbLWSUKTt8iVow.ttf",
      "700italic": "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8GLLWSUKTt8iVow.ttf",
      "800italic": "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8f7LWSUKTt8iVow.ttf",
      "900italic": "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8VrLWSUKTt8iVow.ttf"
    }
  },
  {
    family: "Volkhov",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/volkhov/v17/SlGVmQieoJcKemNeeY4hoHRYbDQUego.ttf",
      regular: "http://fonts.gstatic.com/s/volkhov/v17/SlGQmQieoJcKemNeQTIOhHxzcD0.ttf",
      italic: "http://fonts.gstatic.com/s/volkhov/v17/SlGSmQieoJcKemNecTAEgF52YD0NYw.ttf",
      "700italic": "http://fonts.gstatic.com/s/volkhov/v17/SlGXmQieoJcKemNecTA8PHFSaBYRagrQrA.ttf"
    }
  },
  {
    family: "DM Serif Text",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/dmseriftext/v12/rnCu-xZa_krGokauCeNq1wWyafOPXHIJErY.ttf",
      italic: "http://fonts.gstatic.com/s/dmseriftext/v12/rnCw-xZa_krGokauCeNq1wWyWfGFWFAMArZKqQ.ttf"
    }
  },
  {
    family: "Kosugi Maru",
    category: "sans-serif",
    subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/kosugimaru/v14/0nksC9PgP_wGh21A2KeqGiTqivr9iBq_.ttf"
    }
  },
  {
    family: "Ultra",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/ultra/v23/zOLy4prXmrtY-tT6yLOD6NxF.ttf"
    }
  },
  {
    family: "PT Mono",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/ptmono/v13/9oRONYoBnWILk-9ArCg5MtPyAcg.ttf"
    }
  },
  {
    family: "Carter One",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/carterone/v17/q5uCsoe5IOB2-pXv9UcNIxR2hYxREMs.ttf"
    }
  },
  {
    family: "Nanum Gothic Coding",
    category: "handwriting",
    subsets: ["korean", "latin"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/nanumgothiccoding/v21/8QIYdjzHisX_8vv59_xMxtPFW4IXROws8xgecsV88t5V9r4.ttf",
      regular: "http://fonts.gstatic.com/s/nanumgothiccoding/v21/8QIVdjzHisX_8vv59_xMxtPFW4IXROwsy6QxVs1X7tc.ttf"
    }
  },
  {
    family: "Viga",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/viga/v14/xMQbuFFdSaiX_QIjD4e2OX8.ttf"
    }
  },
  {
    family: "Libre Caslon Text",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/librecaslontext/v5/DdT578IGsGw1aF1JU10PUbTvNNaDMfID8sdjNR-8ssPt.ttf",
      regular: "http://fonts.gstatic.com/s/librecaslontext/v5/DdT878IGsGw1aF1JU10PUbTvNNaDMcq_3eNrHgO1.ttf",
      italic: "http://fonts.gstatic.com/s/librecaslontext/v5/DdT678IGsGw1aF1JU10PUbTvNNaDMfq91-dJGxO1q9o.ttf"
    }
  },
  {
    family: "Tenor Sans",
    category: "sans-serif",
    subsets: ["cyrillic", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/tenorsans/v19/bx6ANxqUneKx06UkIXISr3JyC22IyqI.ttf"
    }
  },
  {
    family: "Ropa Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/ropasans/v15/EYqxmaNOzLlWtsZSScyKWjloU5KP2g.ttf",
      italic: "http://fonts.gstatic.com/s/ropasans/v15/EYq3maNOzLlWtsZSScy6WDNscZef2mNE.ttf"
    }
  },
  {
    family: "Voltaire",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/voltaire/v20/1Pttg8PcRfSblAvGvQooYKVnBOif.ttf"
    }
  },
  {
    family: "Red Hat Text",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic"
    ],
    files: {
      300: "http://fonts.gstatic.com/s/redhattext/v14/RrQCbohi_ic6B3yVSzGBrMx6ZI_cy1A6Ok2ML-ZwVrbacYVFtIY.ttf",
      500: "http://fonts.gstatic.com/s/redhattext/v14/RrQCbohi_ic6B3yVSzGBrMx6ZI_cy1A6Ok2ML4pwVrbacYVFtIY.ttf",
      600: "http://fonts.gstatic.com/s/redhattext/v14/RrQCbohi_ic6B3yVSzGBrMx6ZI_cy1A6Ok2ML2Z3VrbacYVFtIY.ttf",
      700: "http://fonts.gstatic.com/s/redhattext/v14/RrQCbohi_ic6B3yVSzGBrMx6ZI_cy1A6Ok2ML193VrbacYVFtIY.ttf",
      regular: "http://fonts.gstatic.com/s/redhattext/v14/RrQCbohi_ic6B3yVSzGBrMx6ZI_cy1A6Ok2ML7hwVrbacYVFtIY.ttf",
      "300italic": "http://fonts.gstatic.com/s/redhattext/v14/RrQEbohi_ic6B3yVSzGBrMxQbb0jEzlRoOOLOnAz4PXQdadApIYv_g.ttf",
      italic: "http://fonts.gstatic.com/s/redhattext/v14/RrQEbohi_ic6B3yVSzGBrMxQbb0jEzlRoOOLOnAzvvXQdadApIYv_g.ttf",
      "500italic": "http://fonts.gstatic.com/s/redhattext/v14/RrQEbohi_ic6B3yVSzGBrMxQbb0jEzlRoOOLOnAzjPXQdadApIYv_g.ttf",
      "600italic": "http://fonts.gstatic.com/s/redhattext/v14/RrQEbohi_ic6B3yVSzGBrMxQbb0jEzlRoOOLOnAzYPLQdadApIYv_g.ttf",
      "700italic": "http://fonts.gstatic.com/s/redhattext/v14/RrQEbohi_ic6B3yVSzGBrMxQbb0jEzlRoOOLOnAzWfLQdadApIYv_g.ttf"
    }
  },
  {
    family: "Marck Script",
    category: "handwriting",
    subsets: ["cyrillic", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/marckscript/v20/nwpTtK2oNgBA3Or78gapdwuCzyI-aMPF7Q.ttf"
    }
  },
  {
    family: "Fugaz One",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/fugazone/v19/rax_HiWKp9EAITukFslMBBJek0vA8A.ttf"
    }
  },
  {
    family: "Baskervville",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/baskervville/v16/YA9Ur0yU4l_XOrogbkun3kQgt5OohvbJ9A.ttf",
      italic: "http://fonts.gstatic.com/s/baskervville/v16/YA9Kr0yU4l_XOrogbkun3kQQtZmspPPZ9Mlt.ttf"
    }
  },
  {
    family: "Bungee",
    category: "display",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/bungee/v13/N0bU2SZBIuF2PU_ECn50Kd_PmA.ttf"
    }
  },
  {
    family: "League Spartan",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvM_oXpBMdcFguczA.ttf",
      200: "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMfoTpBMdcFguczA.ttf",
      300: "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMoITpBMdcFguczA.ttf",
      500: "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMzITpBMdcFguczA.ttf",
      600: "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMIIPpBMdcFguczA.ttf",
      700: "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMGYPpBMdcFguczA.ttf",
      800: "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMfoPpBMdcFguczA.ttf",
      900: "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMV4PpBMdcFguczA.ttf",
      regular: "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvM_oTpBMdcFguczA.ttf"
    }
  },
  {
    family: "Inter Tight",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjDw6qXCRToK8EPg.ttf",
      200: "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjjw-qXCRToK8EPg.ttf",
      300: "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjUQ-qXCRToK8EPg.ttf",
      500: "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjPQ-qXCRToK8EPg.ttf",
      600: "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mj0QiqXCRToK8EPg.ttf",
      700: "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mj6AiqXCRToK8EPg.ttf",
      800: "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjjwiqXCRToK8EPg.ttf",
      900: "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjpgiqXCRToK8EPg.ttf",
      regular: "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjDw-qXCRToK8EPg.ttf",
      "100italic": "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0xCHi5XgqoUPvi5.ttf",
      "200italic": "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0zCHy5XgqoUPvi5.ttf",
      "300italic": "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0wcHy5XgqoUPvi5.ttf",
      italic: "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0xCHy5XgqoUPvi5.ttf",
      "500italic": "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0xwHy5XgqoUPvi5.ttf",
      "600italic": "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0ycGC5XgqoUPvi5.ttf",
      "700italic": "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0ylGC5XgqoUPvi5.ttf",
      "800italic": "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0zCGC5XgqoUPvi5.ttf",
      "900italic": "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0zrGC5XgqoUPvi5.ttf"
    }
  },
  {
    family: "Antonio",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700"],
    files: {
      100: "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVxx8BtIY2DwSXlM.ttf",
      200: "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVzx8RtIY2DwSXlM.ttf",
      300: "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVwv8RtIY2DwSXlM.ttf",
      500: "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVxD8RtIY2DwSXlM.ttf",
      600: "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVyv9htIY2DwSXlM.ttf",
      700: "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVyW9htIY2DwSXlM.ttf",
      regular: "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVxx8RtIY2DwSXlM.ttf"
    }
  },
  {
    family: "Gudea",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/gudea/v15/neIIzCqgsI0mp9gz26WGHK06UY30.ttf",
      regular: "http://fonts.gstatic.com/s/gudea/v15/neIFzCqgsI0mp-CP9IGON7Ez.ttf",
      italic: "http://fonts.gstatic.com/s/gudea/v15/neILzCqgsI0mp9CN_oWsMqEzSJQ.ttf"
    }
  },
  {
    family: "Parisienne",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/parisienne/v13/E21i_d3kivvAkxhLEVZpcy96DuKuavM.ttf"
    }
  },
  {
    family: "Adamina",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/adamina/v21/j8_r6-DH1bjoc-dwu-reETl4Bno.ttf"
    }
  },
  {
    family: "Taviraj",
    category: "serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/taviraj/v13/ahcbv8Cj3ylylTXzRIorV8N1jU2gog.ttf",
      200: "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzRCYKd-lbgUS5u0s.ttf",
      300: "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzREIJd-lbgUS5u0s.ttf",
      500: "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzRBoId-lbgUS5u0s.ttf",
      600: "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzRDYPd-lbgUS5u0s.ttf",
      700: "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzRFIOd-lbgUS5u0s.ttf",
      800: "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzRE4Nd-lbgUS5u0s.ttf",
      900: "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzRGoMd-lbgUS5u0s.ttf",
      "100italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcdv8Cj3ylylTXzTOwTM8lxr0iwolLl.ttf",
      "200italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwTn-hRhWa8q0v8ag.ttf",
      "300italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwT--tRhWa8q0v8ag.ttf",
      regular: "http://fonts.gstatic.com/s/taviraj/v13/ahcZv8Cj3ylylTXzfO4hU-FwnU0.ttf",
      italic: "http://fonts.gstatic.com/s/taviraj/v13/ahcbv8Cj3ylylTXzTOwrV8N1jU2gog.ttf",
      "500italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwTo-pRhWa8q0v8ag.ttf",
      "600italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwTj-1RhWa8q0v8ag.ttf",
      "700italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwT6-xRhWa8q0v8ag.ttf",
      "800italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwT9-9RhWa8q0v8ag.ttf",
      "900italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwT0-5RhWa8q0v8ag.ttf"
    }
  },
  {
    family: "Sriracha",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/sriracha/v14/0nkrC9D4IuYBgWcI9ObYRQDioeb0.ttf"
    }
  },
  {
    family: "Blinker",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/blinker/v13/cIf_MaFatEE-VTaP_E2hZEsCkIt9QQ.ttf",
      200: "http://fonts.gstatic.com/s/blinker/v13/cIf4MaFatEE-VTaP_OGARGEsnIJkWL4.ttf",
      300: "http://fonts.gstatic.com/s/blinker/v13/cIf4MaFatEE-VTaP_IWDRGEsnIJkWL4.ttf",
      600: "http://fonts.gstatic.com/s/blinker/v13/cIf4MaFatEE-VTaP_PGFRGEsnIJkWL4.ttf",
      700: "http://fonts.gstatic.com/s/blinker/v13/cIf4MaFatEE-VTaP_JWERGEsnIJkWL4.ttf",
      800: "http://fonts.gstatic.com/s/blinker/v13/cIf4MaFatEE-VTaP_ImHRGEsnIJkWL4.ttf",
      900: "http://fonts.gstatic.com/s/blinker/v13/cIf4MaFatEE-VTaP_K2GRGEsnIJkWL4.ttf",
      regular: "http://fonts.gstatic.com/s/blinker/v13/cIf9MaFatEE-VTaPxCmrYGkHgIs.ttf"
    }
  },
  {
    family: "Rock Salt",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/rocksalt/v22/MwQ0bhv11fWD6QsAVOZbsEk7hbBWrA.ttf"
    }
  },
  {
    family: "Hind Vadodara",
    category: "sans-serif",
    subsets: ["gujarati", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/hindvadodara/v13/neIQzCKvrIcn5pbuuuriV9tTSDn3iXM0oSOL2Yw.ttf",
      500: "http://fonts.gstatic.com/s/hindvadodara/v13/neIQzCKvrIcn5pbuuuriV9tTSGH2iXM0oSOL2Yw.ttf",
      600: "http://fonts.gstatic.com/s/hindvadodara/v13/neIQzCKvrIcn5pbuuuriV9tTSE3xiXM0oSOL2Yw.ttf",
      700: "http://fonts.gstatic.com/s/hindvadodara/v13/neIQzCKvrIcn5pbuuuriV9tTSCnwiXM0oSOL2Yw.ttf",
      regular: "http://fonts.gstatic.com/s/hindvadodara/v13/neINzCKvrIcn5pbuuuriV9tTcJXfrXsfvSo.ttf"
    }
  },
  {
    family: "Kumbh Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "math"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQkZcA8bTuUkqaLg.ttf",
      200: "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQEZYA8bTuUkqaLg.ttf",
      300: "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQz5YA8bTuUkqaLg.ttf",
      500: "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQo5YA8bTuUkqaLg.ttf",
      600: "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQT5EA8bTuUkqaLg.ttf",
      700: "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQdpEA8bTuUkqaLg.ttf",
      800: "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQEZEA8bTuUkqaLg.ttf",
      900: "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQOJEA8bTuUkqaLg.ttf",
      regular: "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQkZYA8bTuUkqaLg.ttf"
    }
  },
  {
    family: "Amaranth",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/amaranth/v18/KtkpALODe433f0j1zMF-OPWi6WDfFpuc.ttf",
      regular: "http://fonts.gstatic.com/s/amaranth/v18/KtkuALODe433f0j1zPnCF9GqwnzW.ttf",
      italic: "http://fonts.gstatic.com/s/amaranth/v18/KtkoALODe433f0j1zMnAHdWIx2zWD4I.ttf",
      "700italic": "http://fonts.gstatic.com/s/amaranth/v18/KtkrALODe433f0j1zMnAJWmn42T9E4ucRY8.ttf"
    }
  },
  {
    family: "Mada",
    category: "sans-serif",
    subsets: ["arabic", "latin", "latin-ext"],
    variants: ["200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      200: "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFlOkHkw2-m9x2iC.ttf",
      300: "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFmQkHkw2-m9x2iC.ttf",
      500: "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFn8kHkw2-m9x2iC.ttf",
      600: "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFkQl3kw2-m9x2iC.ttf",
      700: "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFkpl3kw2-m9x2iC.ttf",
      800: "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFlOl3kw2-m9x2iC.ttf",
      900: "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFlnl3kw2-m9x2iC.ttf",
      regular: "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFnOkHkw2-m9x2iC.ttf"
    }
  },
  {
    family: "Neucha",
    category: "handwriting",
    subsets: ["cyrillic", "latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/neucha/v17/q5uGsou0JOdh94bvugNsCxVEgA.ttf"
    }
  },
  {
    family: "Homemade Apple",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/homemadeapple/v22/Qw3EZQFXECDrI2q789EKQZJob3x9Vnksi4M7.ttf"
    }
  },
  {
    family: "Epilogue",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXMDLiDJXVigHPVA.ttf",
      200: "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXsDPiDJXVigHPVA.ttf",
      300: "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXbjPiDJXVigHPVA.ttf",
      500: "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXAjPiDJXVigHPVA.ttf",
      600: "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OX7jTiDJXVigHPVA.ttf",
      700: "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OX1zTiDJXVigHPVA.ttf",
      800: "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXsDTiDJXVigHPVA.ttf",
      900: "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXmTTiDJXVigHPVA.ttf",
      regular: "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXMDPiDJXVigHPVA.ttf",
      "100italic": "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HAKTp_RqATfVHNU.ttf",
      "200italic": "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HCKT5_RqATfVHNU.ttf",
      "300italic": "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HBUT5_RqATfVHNU.ttf",
      italic: "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HAKT5_RqATfVHNU.ttf",
      "500italic": "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HA4T5_RqATfVHNU.ttf",
      "600italic": "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HDUSJ_RqATfVHNU.ttf",
      "700italic": "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HDtSJ_RqATfVHNU.ttf",
      "800italic": "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HCKSJ_RqATfVHNU.ttf",
      "900italic": "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HCjSJ_RqATfVHNU.ttf"
    }
  },
  {
    family: "Cabin Condensed",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700"],
    files: {
      500: "http://fonts.gstatic.com/s/cabincondensed/v20/nwpJtK6mNhBK2err_hqkYhHRqmwilMH97F15-K1oqQ.ttf",
      600: "http://fonts.gstatic.com/s/cabincondensed/v20/nwpJtK6mNhBK2err_hqkYhHRqmwiuMb97F15-K1oqQ.ttf",
      700: "http://fonts.gstatic.com/s/cabincondensed/v20/nwpJtK6mNhBK2err_hqkYhHRqmwi3Mf97F15-K1oqQ.ttf",
      regular: "http://fonts.gstatic.com/s/cabincondensed/v20/nwpMtK6mNhBK2err_hqkYhHRqmwaYOjZ5HZl8Q.ttf"
    }
  },
  {
    family: "Abhaya Libre",
    category: "serif",
    subsets: ["latin", "latin-ext", "sinhala"],
    variants: ["regular", "500", "600", "700", "800"],
    files: {
      500: "http://fonts.gstatic.com/s/abhayalibre/v14/e3t5euGtX-Co5MNzeAOqinEYj2ryqtxI6oYtBA.ttf",
      600: "http://fonts.gstatic.com/s/abhayalibre/v14/e3t5euGtX-Co5MNzeAOqinEYo23yqtxI6oYtBA.ttf",
      700: "http://fonts.gstatic.com/s/abhayalibre/v14/e3t5euGtX-Co5MNzeAOqinEYx2zyqtxI6oYtBA.ttf",
      800: "http://fonts.gstatic.com/s/abhayalibre/v14/e3t5euGtX-Co5MNzeAOqinEY22_yqtxI6oYtBA.ttf",
      regular: "http://fonts.gstatic.com/s/abhayalibre/v14/e3tmeuGtX-Co5MNzeAOqinEge0PWovdU4w.ttf"
    }
  },
  {
    family: "Istok Web",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/istokweb/v24/3qTqojGmgSyUukBzKslhvU5a_mkUYBfcMw.ttf",
      regular: "http://fonts.gstatic.com/s/istokweb/v24/3qTvojGmgSyUukBzKslZAWF-9kIIaQ.ttf",
      italic: "http://fonts.gstatic.com/s/istokweb/v24/3qTpojGmgSyUukBzKslpA2t61EcYaQ7F.ttf",
      "700italic": "http://fonts.gstatic.com/s/istokweb/v24/3qT0ojGmgSyUukBzKslpA1PG-2MQQhLMMygN.ttf"
    }
  },
  {
    family: "Noto Sans Devanagari",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlXQky-AzoFoW4Ow.ttf",
      200: "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlfQly-AzoFoW4Ow.ttf",
      300: "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlSoly-AzoFoW4Ow.ttf",
      500: "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlUYly-AzoFoW4Ow.ttf",
      600: "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08Alaoiy-AzoFoW4Ow.ttf",
      700: "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlZMiy-AzoFoW4Ow.ttf",
      800: "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlfQiy-AzoFoW4Ow.ttf",
      900: "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08Ald0iy-AzoFoW4Ow.ttf",
      regular: "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlXQly-AzoFoW4Ow.ttf"
    }
  },
  {
    family: "Zen Kaku Gothic New",
    category: "sans-serif",
    subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "700", "900"],
    files: {
      300: "http://fonts.gstatic.com/s/zenkakugothicnew/v15/gNMVW2drQpDw0GjzrVNFf_valaDBcznOqpdKaWTSTGlMyd8.ttf",
      500: "http://fonts.gstatic.com/s/zenkakugothicnew/v15/gNMVW2drQpDw0GjzrVNFf_valaDBcznOqs9LaWTSTGlMyd8.ttf",
      700: "http://fonts.gstatic.com/s/zenkakugothicnew/v15/gNMVW2drQpDw0GjzrVNFf_valaDBcznOqodNaWTSTGlMyd8.ttf",
      900: "http://fonts.gstatic.com/s/zenkakugothicnew/v15/gNMVW2drQpDw0GjzrVNFf_valaDBcznOqr9PaWTSTGlMyd8.ttf",
      regular: "http://fonts.gstatic.com/s/zenkakugothicnew/v15/gNMYW2drQpDw0GjzrVNFf_valaDBcznOkjtiTWz5UGA.ttf"
    }
  },
  {
    family: "Alex Brush",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/alexbrush/v22/SZc83FzrJKuqFbwMKk6EtUL57DtOmCc.ttf"
    }
  },
  {
    family: "Itim",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/itim/v14/0nknC9ziJOYewARKkc7ZdwU.ttf"
    }
  },
  {
    family: "Albert Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHq5L_rI32TxAj1g.ttf",
      200: "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHK5P_rI32TxAj1g.ttf",
      300: "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSH9ZP_rI32TxAj1g.ttf",
      500: "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHmZP_rI32TxAj1g.ttf",
      600: "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHdZT_rI32TxAj1g.ttf",
      700: "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHTJT_rI32TxAj1g.ttf",
      800: "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHK5T_rI32TxAj1g.ttf",
      900: "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHApT_rI32TxAj1g.ttf",
      regular: "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHq5P_rI32TxAj1g.ttf",
      "100italic": "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9AX7ofybRUz1r5t.ttf",
      "200italic": "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9CX74fybRUz1r5t.ttf",
      "300italic": "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9BJ74fybRUz1r5t.ttf",
      italic: "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9AX74fybRUz1r5t.ttf",
      "500italic": "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9Al74fybRUz1r5t.ttf",
      "600italic": "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9DJ6IfybRUz1r5t.ttf",
      "700italic": "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9Dw6IfybRUz1r5t.ttf",
      "800italic": "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9CX6IfybRUz1r5t.ttf",
      "900italic": "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9C-6IfybRUz1r5t.ttf"
    }
  },
  {
    family: "Cousine",
    category: "monospace",
    subsets: [
      "cyrillic",
      "cyrillic-ext",
      "greek",
      "greek-ext",
      "hebrew",
      "latin",
      "latin-ext",
      "vietnamese"
    ],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/cousine/v27/d6lNkaiiRdih4SpP9Z8K6T7G09BlnmQ.ttf",
      regular: "http://fonts.gstatic.com/s/cousine/v27/d6lIkaiiRdih4SpPzSMlzTbtz9k.ttf",
      italic: "http://fonts.gstatic.com/s/cousine/v27/d6lKkaiiRdih4SpP_SEvyRTo39l8hw.ttf",
      "700italic": "http://fonts.gstatic.com/s/cousine/v27/d6lPkaiiRdih4SpP_SEXdTvM1_JgjmRpOA.ttf"
    }
  },
  {
    family: "Courier Prime",
    category: "monospace",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/courierprime/v9/u-4k0q2lgwslOqpF_6gQ8kELY7pMf-fVqvHoJXw.ttf",
      regular: "http://fonts.gstatic.com/s/courierprime/v9/u-450q2lgwslOqpF_6gQ8kELWwZjW-_-tvg.ttf",
      italic: "http://fonts.gstatic.com/s/courierprime/v9/u-4n0q2lgwslOqpF_6gQ8kELawRpX837pvjxPA.ttf",
      "700italic": "http://fonts.gstatic.com/s/courierprime/v9/u-4i0q2lgwslOqpF_6gQ8kELawRR4-LfrtPtNXyeAg.ttf"
    }
  },
  {
    family: "Mr Dafoe",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/mrdafoe/v14/lJwE-pIzkS5NXuMMrGiqg7MCxz_C.ttf"
    }
  },
  {
    family: "Playball",
    category: "display",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/playball/v20/TK3gWksYAxQ7jbsKcj8Dl-tPKo2t.ttf"
    }
  },
  {
    family: "Anonymous Pro",
    category: "monospace",
    subsets: ["cyrillic", "greek", "latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/anonymouspro/v21/rP2cp2a15UIB7Un-bOeISG3pFuAT0CnW7KOywKo.ttf",
      regular: "http://fonts.gstatic.com/s/anonymouspro/v21/rP2Bp2a15UIB7Un-bOeISG3pLlw89CH98Ko.ttf",
      italic: "http://fonts.gstatic.com/s/anonymouspro/v21/rP2fp2a15UIB7Un-bOeISG3pHl428AP44Kqr2Q.ttf",
      "700italic": "http://fonts.gstatic.com/s/anonymouspro/v21/rP2ap2a15UIB7Un-bOeISG3pHl4OTCzc6IG30KqB9Q.ttf"
    }
  },
  {
    family: "Bad Script",
    category: "handwriting",
    subsets: ["cyrillic", "latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/badscript/v16/6NUT8F6PJgbFWQn47_x7lOwuzd1AZtw.ttf"
    }
  },
  {
    family: "Nanum Pen Script",
    category: "handwriting",
    subsets: ["korean", "latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/nanumpenscript/v19/daaDSSYiLGqEal3MvdA_FOL_3FkN2z7-aMFCcTU.ttf"
    }
  },
  {
    family: "Merienda",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "500", "600", "700", "800", "900"],
    files: {
      300: "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5JHhoSU78QGBV0A.ttf",
      500: "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5SHhoSU78QGBV0A.ttf",
      600: "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5pH9oSU78QGBV0A.ttf",
      700: "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5nX9oSU78QGBV0A.ttf",
      800: "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5-n9oSU78QGBV0A.ttf",
      900: "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5039oSU78QGBV0A.ttf",
      regular: "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5enhoSU78QGBV0A.ttf"
    }
  },
  {
    family: "Hammersmith One",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/hammersmithone/v17/qWcyB624q4L_C4jGQ9IK0O_dFlnbshsks4MRXw.ttf"
    }
  },
  {
    family: "Ruda",
    category: "sans-serif",
    subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700", "800", "900"],
    files: {
      500: "http://fonts.gstatic.com/s/ruda/v28/k3kKo8YQJOpFgHQ1mQ5VkEbUKaJ3si_-2KiSGg-H.ttf",
      600: "http://fonts.gstatic.com/s/ruda/v28/k3kKo8YQJOpFgHQ1mQ5VkEbUKaKbtS_-2KiSGg-H.ttf",
      700: "http://fonts.gstatic.com/s/ruda/v28/k3kKo8YQJOpFgHQ1mQ5VkEbUKaKitS_-2KiSGg-H.ttf",
      800: "http://fonts.gstatic.com/s/ruda/v28/k3kKo8YQJOpFgHQ1mQ5VkEbUKaLFtS_-2KiSGg-H.ttf",
      900: "http://fonts.gstatic.com/s/ruda/v28/k3kKo8YQJOpFgHQ1mQ5VkEbUKaLstS_-2KiSGg-H.ttf",
      regular: "http://fonts.gstatic.com/s/ruda/v28/k3kKo8YQJOpFgHQ1mQ5VkEbUKaJFsi_-2KiSGg-H.ttf"
    }
  },
  {
    family: "Monoton",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/monoton/v19/5h1aiZUrOngCibe4fkbBQ2S7FU8.ttf"
    }
  },
  {
    family: "Lusitana",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/lusitana/v13/CSR74z9ShvucWzsMKyDmaccqYtd2vfwk.ttf",
      regular: "http://fonts.gstatic.com/s/lusitana/v13/CSR84z9ShvucWzsMKxhaRuMiSct_.ttf"
    }
  },
  {
    family: "Comic Neue",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["300", "300italic", "regular", "italic", "700", "700italic"],
    files: {
      300: "http://fonts.gstatic.com/s/comicneue/v8/4UaErEJDsxBrF37olUeD_wHLwpteLwtHJlc.ttf",
      700: "http://fonts.gstatic.com/s/comicneue/v8/4UaErEJDsxBrF37olUeD_xHMwpteLwtHJlc.ttf",
      "300italic": "http://fonts.gstatic.com/s/comicneue/v8/4UaarEJDsxBrF37olUeD96_RTplUKylCNlcw_Q.ttf",
      regular: "http://fonts.gstatic.com/s/comicneue/v8/4UaHrEJDsxBrF37olUeDx63j5pN1MwI.ttf",
      italic: "http://fonts.gstatic.com/s/comicneue/v8/4UaFrEJDsxBrF37olUeD96_p4rFwIwJePw.ttf",
      "700italic": "http://fonts.gstatic.com/s/comicneue/v8/4UaarEJDsxBrF37olUeD96_RXp5UKylCNlcw_Q.ttf"
    }
  },
  {
    family: "Bai Jamjuree",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic"
    ],
    files: {
      200: "http://fonts.gstatic.com/s/baijamjuree/v11/LDIqapSCOBt_aeQQ7ftydoa0kePuk5A1-yiSgA.ttf",
      300: "http://fonts.gstatic.com/s/baijamjuree/v11/LDIqapSCOBt_aeQQ7ftydoa09eDuk5A1-yiSgA.ttf",
      500: "http://fonts.gstatic.com/s/baijamjuree/v11/LDIqapSCOBt_aeQQ7ftydoa0reHuk5A1-yiSgA.ttf",
      600: "http://fonts.gstatic.com/s/baijamjuree/v11/LDIqapSCOBt_aeQQ7ftydoa0gebuk5A1-yiSgA.ttf",
      700: "http://fonts.gstatic.com/s/baijamjuree/v11/LDIqapSCOBt_aeQQ7ftydoa05efuk5A1-yiSgA.ttf",
      "200italic": "http://fonts.gstatic.com/s/baijamjuree/v11/LDIoapSCOBt_aeQQ7ftydoa8W_oGkpox2S2CgOva.ttf",
      "300italic": "http://fonts.gstatic.com/s/baijamjuree/v11/LDIoapSCOBt_aeQQ7ftydoa8W_pikZox2S2CgOva.ttf",
      regular: "http://fonts.gstatic.com/s/baijamjuree/v11/LDI1apSCOBt_aeQQ7ftydoaMWcjKm7sp8g.ttf",
      italic: "http://fonts.gstatic.com/s/baijamjuree/v11/LDIrapSCOBt_aeQQ7ftydoa8W8LOub458jGL.ttf",
      "500italic": "http://fonts.gstatic.com/s/baijamjuree/v11/LDIoapSCOBt_aeQQ7ftydoa8W_o6kJox2S2CgOva.ttf",
      "600italic": "http://fonts.gstatic.com/s/baijamjuree/v11/LDIoapSCOBt_aeQQ7ftydoa8W_oWl5ox2S2CgOva.ttf",
      "700italic": "http://fonts.gstatic.com/s/baijamjuree/v11/LDIoapSCOBt_aeQQ7ftydoa8W_pylpox2S2CgOva.ttf"
    }
  },
  {
    family: "Pragati Narrow",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/pragatinarrow/v13/vm8sdRf0T0bS1ffgsPB7WZ-mD2ZD5fd_GJMTlo_4.ttf",
      regular: "http://fonts.gstatic.com/s/pragatinarrow/v13/vm8vdRf0T0bS1ffgsPB7WZ-mD17_ytN3M48a.ttf"
    }
  },
  {
    family: "BIZ UDPGothic",
    category: "sans-serif",
    subsets: ["cyrillic", "greek-ext", "japanese", "latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/bizudpgothic/v9/hESq6X5pHAIBjmS84VL0Bue85skjZWEnTABCSQo.ttf",
      regular: "http://fonts.gstatic.com/s/bizudpgothic/v9/hES36X5pHAIBjmS84VL0Bue83nUMQWkMUAk.ttf"
    }
  },
  {
    family: "Noto Sans Malayalam",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "malayalam"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_RuH9BFzEr6HxEA.ttf",
      200: "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_xuD9BFzEr6HxEA.ttf",
      300: "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_GOD9BFzEr6HxEA.ttf",
      500: "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_dOD9BFzEr6HxEA.ttf",
      600: "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_mOf9BFzEr6HxEA.ttf",
      700: "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_oef9BFzEr6HxEA.ttf",
      800: "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_xuf9BFzEr6HxEA.ttf",
      900: "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_7-f9BFzEr6HxEA.ttf",
      regular: "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_RuD9BFzEr6HxEA.ttf"
    }
  },
  {
    family: "Varela",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/varela/v16/DPEtYwqExx0AWHXJBBQFfvzDsQ.ttf"
    }
  },
  {
    family: "Lalezar",
    category: "display",
    subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/lalezar/v14/zrfl0HLVx-HwTP82UaDyIiL0RCg.ttf"
    }
  },
  {
    family: "Noto Serif SC",
    category: "serif",
    subsets: ["chinese-simplified", "latin"],
    variants: ["200", "300", "regular", "500", "600", "700", "900"],
    files: {
      200: "http://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7mm63SzZBEtERe7U.otf",
      300: "http://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7mgq0SzZBEtERe7U.otf",
      500: "http://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7mlK1SzZBEtERe7U.otf",
      600: "http://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7mn6ySzZBEtERe7U.otf",
      700: "http://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7mhqzSzZBEtERe7U.otf",
      900: "http://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7miKxSzZBEtERe7U.otf",
      regular: "http://fonts.gstatic.com/s/notoserifsc/v22/H4chBXePl9DZ0Xe7gG9cyOj7oqCcbzhqDtg.otf"
    }
  },
  {
    family: "Saira Semi Condensed",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MN6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXdvaOM8rXT-8V8.ttf",
      200: "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXfDScMWg3j36Ebz.ttf",
      300: "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXenSsMWg3j36Ebz.ttf",
      500: "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXf_S8MWg3j36Ebz.ttf",
      600: "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXfTTMMWg3j36Ebz.ttf",
      700: "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXe3TcMWg3j36Ebz.ttf",
      800: "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXerTsMWg3j36Ebz.ttf",
      900: "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXePT8MWg3j36Ebz.ttf",
      regular: "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MD6c-2-nnJkHxyCjRcnMHcWVWV1cWRRU8LYuceqGT-.ttf"
    }
  },
  {
    family: "Alexandria",
    category: "sans-serif",
    subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9r7T6bHHJ8BRq0b.ttf",
      200: "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9p7TqbHHJ8BRq0b.ttf",
      300: "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9qlTqbHHJ8BRq0b.ttf",
      500: "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9rJTqbHHJ8BRq0b.ttf",
      600: "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9olSabHHJ8BRq0b.ttf",
      700: "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9ocSabHHJ8BRq0b.ttf",
      800: "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9p7SabHHJ8BRq0b.ttf",
      900: "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9pSSabHHJ8BRq0b.ttf",
      regular: "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9r7TqbHHJ8BRq0b.ttf"
    }
  },
  {
    family: "Mandali",
    category: "sans-serif",
    subsets: ["latin", "telugu"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/mandali/v14/LhWlMVbYOfASNfNUVFk1ZPdcKtA.ttf"
    }
  },
  {
    family: "Calistoga",
    category: "display",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/calistoga/v15/6NUU8F2OJg6MeR7l4e0vtMYAwdRZfw.ttf"
    }
  },
  {
    family: "Jura",
    category: "sans-serif",
    subsets: [
      "cyrillic",
      "cyrillic-ext",
      "greek",
      "greek-ext",
      "kayah-li",
      "latin",
      "latin-ext",
      "vietnamese"
    ],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP0D7auhTfmrH_rt.ttf",
      500: "http://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP1v7auhTfmrH_rt.ttf",
      600: "http://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP2D6quhTfmrH_rt.ttf",
      700: "http://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP266quhTfmrH_rt.ttf",
      regular: "http://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP1d7auhTfmrH_rt.ttf"
    }
  },
  {
    family: "Audiowide",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/audiowide/v20/l7gdbjpo0cum0ckerWCtkQXPExpQBw.ttf"
    }
  },
  {
    family: "Unica One",
    category: "display",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/unicaone/v18/DPEuYwWHyAYGVTSmalshdtffuEY7FA.ttf"
    }
  },
  {
    family: "Fira Mono",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext"],
    variants: ["regular", "500", "700"],
    files: {
      500: "http://fonts.gstatic.com/s/firamono/v14/N0bS2SlFPv1weGeLZDto1d33mf3VaZBRBQ.ttf",
      700: "http://fonts.gstatic.com/s/firamono/v14/N0bS2SlFPv1weGeLZDtondv3mf3VaZBRBQ.ttf",
      regular: "http://fonts.gstatic.com/s/firamono/v14/N0bX2SlFPv1weGeLZDtQIfTTkdbJYA.ttf"
    }
  },
  {
    family: "Zen Maru Gothic",
    category: "sans-serif",
    subsets: ["cyrillic", "greek", "japanese", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "700", "900"],
    files: {
      300: "http://fonts.gstatic.com/s/zenmarugothic/v16/o-0XIpIxzW5b-RxT-6A8jWAtCp-cQWpCPJqa_ajlvw.ttf",
      500: "http://fonts.gstatic.com/s/zenmarugothic/v16/o-0XIpIxzW5b-RxT-6A8jWAtCp-cGWtCPJqa_ajlvw.ttf",
      700: "http://fonts.gstatic.com/s/zenmarugothic/v16/o-0XIpIxzW5b-RxT-6A8jWAtCp-cUW1CPJqa_ajlvw.ttf",
      900: "http://fonts.gstatic.com/s/zenmarugothic/v16/o-0XIpIxzW5b-RxT-6A8jWAtCp-caW9CPJqa_ajlvw.ttf",
      regular: "http://fonts.gstatic.com/s/zenmarugothic/v16/o-0SIpIxzW5b-RxT-6A8jWAtCp-k7UJmNLGG9A.ttf"
    }
  },
  {
    family: "Reem Kufi",
    category: "sans-serif",
    subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700"],
    files: {
      500: "http://fonts.gstatic.com/s/reemkufi/v21/2sDPZGJLip7W2J7v7wQZZE1I0yCmYzzQttRnEGGf3qGuvM4.ttf",
      600: "http://fonts.gstatic.com/s/reemkufi/v21/2sDPZGJLip7W2J7v7wQZZE1I0yCmYzzQtjhgEGGf3qGuvM4.ttf",
      700: "http://fonts.gstatic.com/s/reemkufi/v21/2sDPZGJLip7W2J7v7wQZZE1I0yCmYzzQtgFgEGGf3qGuvM4.ttf",
      regular: "http://fonts.gstatic.com/s/reemkufi/v21/2sDPZGJLip7W2J7v7wQZZE1I0yCmYzzQtuZnEGGf3qGuvM4.ttf"
    }
  },
  {
    family: "Castoro",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/castoro/v19/1q2GY5yMCld3-O4cHYhEzOYenEU.ttf",
      italic: "http://fonts.gstatic.com/s/castoro/v19/1q2EY5yMCld3-O4cLYpOyMQbjEX5fw.ttf"
    }
  },
  {
    family: "Petrona",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk6NsARBH452Mvds.ttf",
      200: "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk4NsQRBH452Mvds.ttf",
      300: "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk7TsQRBH452Mvds.ttf",
      500: "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk6_sQRBH452Mvds.ttf",
      600: "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk5TtgRBH452Mvds.ttf",
      700: "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk5qtgRBH452Mvds.ttf",
      800: "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk4NtgRBH452Mvds.ttf",
      900: "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk4ktgRBH452Mvds.ttf",
      regular: "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk6NsQRBH452Mvds.ttf",
      "100italic": "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8uwDFYpUN-dsIWs.ttf",
      "200italic": "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8mwCFYpUN-dsIWs.ttf",
      "300italic": "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8rICFYpUN-dsIWs.ttf",
      italic: "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8uwCFYpUN-dsIWs.ttf",
      "500italic": "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8t4CFYpUN-dsIWs.ttf",
      "600italic": "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8jIFFYpUN-dsIWs.ttf",
      "700italic": "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8gsFFYpUN-dsIWs.ttf",
      "800italic": "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8mwFFYpUN-dsIWs.ttf",
      "900italic": "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8kUFFYpUN-dsIWs.ttf"
    }
  },
  {
    family: "BenchNine",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["300", "regular", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/benchnine/v16/ahcev8612zF4jxrwMosT--tRhWa8q0v8ag.ttf",
      700: "http://fonts.gstatic.com/s/benchnine/v16/ahcev8612zF4jxrwMosT6-xRhWa8q0v8ag.ttf",
      regular: "http://fonts.gstatic.com/s/benchnine/v16/ahcbv8612zF4jxrwMosrV8N1jU2gog.ttf"
    }
  },
  {
    family: "Niramit",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic"
    ],
    files: {
      200: "http://fonts.gstatic.com/s/niramit/v10/I_urMpWdvgLdNxVLVXx7tiiEr5_BdZ8.ttf",
      300: "http://fonts.gstatic.com/s/niramit/v10/I_urMpWdvgLdNxVLVRh4tiiEr5_BdZ8.ttf",
      500: "http://fonts.gstatic.com/s/niramit/v10/I_urMpWdvgLdNxVLVUB5tiiEr5_BdZ8.ttf",
      600: "http://fonts.gstatic.com/s/niramit/v10/I_urMpWdvgLdNxVLVWx-tiiEr5_BdZ8.ttf",
      700: "http://fonts.gstatic.com/s/niramit/v10/I_urMpWdvgLdNxVLVQh_tiiEr5_BdZ8.ttf",
      "200italic": "http://fonts.gstatic.com/s/niramit/v10/I_upMpWdvgLdNxVLXbZiXimOq73EZZ_f6w.ttf",
      "300italic": "http://fonts.gstatic.com/s/niramit/v10/I_upMpWdvgLdNxVLXbZiOiqOq73EZZ_f6w.ttf",
      regular: "http://fonts.gstatic.com/s/niramit/v10/I_uuMpWdvgLdNxVLbbRQkiCvs5Y.ttf",
      italic: "http://fonts.gstatic.com/s/niramit/v10/I_usMpWdvgLdNxVLXbZalgKqo5bYbA.ttf",
      "500italic": "http://fonts.gstatic.com/s/niramit/v10/I_upMpWdvgLdNxVLXbZiYiuOq73EZZ_f6w.ttf",
      "600italic": "http://fonts.gstatic.com/s/niramit/v10/I_upMpWdvgLdNxVLXbZiTiyOq73EZZ_f6w.ttf",
      "700italic": "http://fonts.gstatic.com/s/niramit/v10/I_upMpWdvgLdNxVLXbZiKi2Oq73EZZ_f6w.ttf"
    }
  },
  {
    family: "Krub",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic"
    ],
    files: {
      200: "http://fonts.gstatic.com/s/krub/v9/sZlEdRyC6CRYZo47KLF4R6gWaf8.ttf",
      300: "http://fonts.gstatic.com/s/krub/v9/sZlEdRyC6CRYZuo4KLF4R6gWaf8.ttf",
      500: "http://fonts.gstatic.com/s/krub/v9/sZlEdRyC6CRYZrI5KLF4R6gWaf8.ttf",
      600: "http://fonts.gstatic.com/s/krub/v9/sZlEdRyC6CRYZp4-KLF4R6gWaf8.ttf",
      700: "http://fonts.gstatic.com/s/krub/v9/sZlEdRyC6CRYZvo_KLF4R6gWaf8.ttf",
      "200italic": "http://fonts.gstatic.com/s/krub/v9/sZlGdRyC6CRYbkQiwLByQ4oTef_6gQ.ttf",
      "300italic": "http://fonts.gstatic.com/s/krub/v9/sZlGdRyC6CRYbkQipLNyQ4oTef_6gQ.ttf",
      regular: "http://fonts.gstatic.com/s/krub/v9/sZlLdRyC6CRYXkYQDLlTW6E.ttf",
      italic: "http://fonts.gstatic.com/s/krub/v9/sZlFdRyC6CRYbkQaCJtWS6EPcA.ttf",
      "500italic": "http://fonts.gstatic.com/s/krub/v9/sZlGdRyC6CRYbkQi_LJyQ4oTef_6gQ.ttf",
      "600italic": "http://fonts.gstatic.com/s/krub/v9/sZlGdRyC6CRYbkQi0LVyQ4oTef_6gQ.ttf",
      "700italic": "http://fonts.gstatic.com/s/krub/v9/sZlGdRyC6CRYbkQitLRyQ4oTef_6gQ.ttf"
    }
  },
  {
    family: "Jaldi",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/jaldi/v12/or3hQ67z0_CI33voSbT3LLQ1niPn.ttf",
      regular: "http://fonts.gstatic.com/s/jaldi/v12/or3sQ67z0_CI30NUZpD_B6g8.ttf"
    }
  },
  {
    family: "Big Shoulders Display",
    category: "display",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdY86JF46SRP4yZQ.ttf",
      200: "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdQ87JF46SRP4yZQ.ttf",
      300: "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YddE7JF46SRP4yZQ.ttf",
      500: "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0Ydb07JF46SRP4yZQ.ttf",
      600: "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdVE8JF46SRP4yZQ.ttf",
      700: "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdWg8JF46SRP4yZQ.ttf",
      800: "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdQ88JF46SRP4yZQ.ttf",
      900: "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdSY8JF46SRP4yZQ.ttf",
      regular: "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdY87JF46SRP4yZQ.ttf"
    }
  },
  {
    family: "Monda",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/monda/v16/TK3gWkYFABsmjsLaGz8Dl-tPKo2t.ttf",
      regular: "http://fonts.gstatic.com/s/monda/v16/TK3tWkYFABsmjvpmNBsLvPdG.ttf"
    }
  },
  {
    family: "Days One",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/daysone/v18/mem9YaCnxnKRiYZOCLYVeLkWVNBt.ttf"
    }
  },
  {
    family: "Actor",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/actor/v17/wEOzEBbCkc5cO3ekXygtUMIO.ttf"
    }
  },
  {
    family: "Laila",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/laila/v15/LYjBdG_8nE8jDLzxogNAh14nVcfe.ttf",
      500: "http://fonts.gstatic.com/s/laila/v15/LYjBdG_8nE8jDLypowNAh14nVcfe.ttf",
      600: "http://fonts.gstatic.com/s/laila/v15/LYjBdG_8nE8jDLyFpANAh14nVcfe.ttf",
      700: "http://fonts.gstatic.com/s/laila/v15/LYjBdG_8nE8jDLzhpQNAh14nVcfe.ttf",
      regular: "http://fonts.gstatic.com/s/laila/v15/LYjMdG_8nE8jDIRdiidIrEIu.ttf"
    }
  },
  {
    family: "Reenie Beanie",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/reeniebeanie/v20/z7NSdR76eDkaJKZJFkkjuvWxbP2_qoOgf_w.ttf"
    }
  },
  {
    family: "Julius Sans One",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/juliussansone/v18/1Pt2g8TAX_SGgBGUi0tGOYEga5W-xXEW6aGXHw.ttf"
    }
  },
  {
    family: "Shippori Mincho",
    category: "serif",
    subsets: ["japanese", "latin", "latin-ext"],
    variants: ["regular", "500", "600", "700", "800"],
    files: {
      500: "http://fonts.gstatic.com/s/shipporimincho/v14/VdGDAZweH5EbgHY6YExcZfDoj0B4L9am5JEO5--2zg.ttf",
      600: "http://fonts.gstatic.com/s/shipporimincho/v14/VdGDAZweH5EbgHY6YExcZfDoj0B4A9Gm5JEO5--2zg.ttf",
      700: "http://fonts.gstatic.com/s/shipporimincho/v14/VdGDAZweH5EbgHY6YExcZfDoj0B4Z9Cm5JEO5--2zg.ttf",
      800: "http://fonts.gstatic.com/s/shipporimincho/v14/VdGDAZweH5EbgHY6YExcZfDoj0B4e9Om5JEO5--2zg.ttf",
      regular: "http://fonts.gstatic.com/s/shipporimincho/v14/VdGGAZweH5EbgHY6YExcZfDoj0BA2_-C7LoS7g.ttf"
    }
  },
  {
    family: "Economica",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/economica/v15/Qw3aZQZaHCLgIWa29ZBTjeckCnZ5dHw8iw.ttf",
      regular: "http://fonts.gstatic.com/s/economica/v15/Qw3fZQZaHCLgIWa29ZBrMcgAAl1lfQ.ttf",
      italic: "http://fonts.gstatic.com/s/economica/v15/Qw3ZZQZaHCLgIWa29ZBbM8IEIFh1fWUl.ttf",
      "700italic": "http://fonts.gstatic.com/s/economica/v15/Qw3EZQZaHCLgIWa29ZBbM_q4D3x9Vnksi4M7.ttf"
    }
  },
  {
    family: "Pridi",
    category: "serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700"],
    files: {
      200: "http://fonts.gstatic.com/s/pridi/v13/2sDdZG5JnZLfkc1SiE0jRUG0AqUc.ttf",
      300: "http://fonts.gstatic.com/s/pridi/v13/2sDdZG5JnZLfkc02i00jRUG0AqUc.ttf",
      500: "http://fonts.gstatic.com/s/pridi/v13/2sDdZG5JnZLfkc1uik0jRUG0AqUc.ttf",
      600: "http://fonts.gstatic.com/s/pridi/v13/2sDdZG5JnZLfkc1CjU0jRUG0AqUc.ttf",
      700: "http://fonts.gstatic.com/s/pridi/v13/2sDdZG5JnZLfkc0mjE0jRUG0AqUc.ttf",
      regular: "http://fonts.gstatic.com/s/pridi/v13/2sDQZG5JnZLfkfWao2krbl29.ttf"
    }
  },
  {
    family: "Fraunces",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIctxqjDvTShUtWNg.ttf",
      200: "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcNxujDvTShUtWNg.ttf",
      300: "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIc6RujDvTShUtWNg.ttf",
      500: "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIchRujDvTShUtWNg.ttf",
      600: "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcaRyjDvTShUtWNg.ttf",
      700: "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcUByjDvTShUtWNg.ttf",
      800: "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcNxyjDvTShUtWNg.ttf",
      900: "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcHhyjDvTShUtWNg.ttf",
      regular: "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIctxujDvTShUtWNg.ttf",
      "100italic": "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1hLTP7Wp05GNi3k.ttf",
      "200italic": "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1jLTf7Wp05GNi3k.ttf",
      "300italic": "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1gVTf7Wp05GNi3k.ttf",
      italic: "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1hLTf7Wp05GNi3k.ttf",
      "500italic": "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1h5Tf7Wp05GNi3k.ttf",
      "600italic": "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1iVSv7Wp05GNi3k.ttf",
      "700italic": "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1isSv7Wp05GNi3k.ttf",
      "800italic": "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1jLSv7Wp05GNi3k.ttf",
      "900italic": "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1jiSv7Wp05GNi3k.ttf"
    }
  },
  {
    family: "Rufina",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/rufina/v15/Yq6W-LyURyLy-aKKHztAvMxenxE0SA.ttf",
      regular: "http://fonts.gstatic.com/s/rufina/v15/Yq6V-LyURyLy-aKyoxRktOdClg.ttf"
    }
  },
  {
    family: "Gochi Hand",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/gochihand/v23/hES06XlsOjtJsgCkx1PkTo71-n0nXWA.ttf"
    }
  },
  {
    family: "Forum",
    category: "display",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/forum/v18/6aey4Ky-Vb8Ew_IWMJMa3mnT.ttf"
    }
  },
  {
    family: "Newsreader",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic"
    ],
    files: {
      200: "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438w-I_ADOxEPjCggA.ttf",
      300: "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438wJo_ADOxEPjCggA.ttf",
      500: "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438wSo_ADOxEPjCggA.ttf",
      600: "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438wpojADOxEPjCggA.ttf",
      700: "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438wn4jADOxEPjCggA.ttf",
      800: "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438w-IjADOxEPjCggA.ttf",
      regular: "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438weI_ADOxEPjCggA.ttf",
      "200italic": "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMyoT-ZAHDWwgECi.ttf",
      "300italic": "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMx2T-ZAHDWwgECi.ttf",
      italic: "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMwoT-ZAHDWwgECi.ttf",
      "500italic": "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMwaT-ZAHDWwgECi.ttf",
      "600italic": "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMz2SOZAHDWwgECi.ttf",
      "700italic": "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMzPSOZAHDWwgECi.ttf",
      "800italic": "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMyoSOZAHDWwgECi.ttf"
    }
  },
  {
    family: "Allerta Stencil",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/allertastencil/v22/HTx0L209KT-LmIE9N7OR6eiycOeF-zz313DuvQ.ttf"
    }
  },
  {
    family: "Sorts Mill Goudy",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/sortsmillgoudy/v15/Qw3GZR9MED_6PSuS_50nEaVrfzgEXH0OjpM75PE.ttf",
      italic: "http://fonts.gstatic.com/s/sortsmillgoudy/v15/Qw3AZR9MED_6PSuS_50nEaVrfzgEbH8EirE-9PGLfQ.ttf"
    }
  },
  {
    family: "Pontano Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/pontanosans/v16/qFdW35GdgYR8EzR6oBLDHa3wyRf8W8eBM6XLOSzMncaMp9gzWsE.ttf",
      500: "http://fonts.gstatic.com/s/pontanosans/v16/qFdW35GdgYR8EzR6oBLDHa3wyRf8W8eBM6XLOUDMncaMp9gzWsE.ttf",
      600: "http://fonts.gstatic.com/s/pontanosans/v16/qFdW35GdgYR8EzR6oBLDHa3wyRf8W8eBM6XLOazLncaMp9gzWsE.ttf",
      700: "http://fonts.gstatic.com/s/pontanosans/v16/qFdW35GdgYR8EzR6oBLDHa3wyRf8W8eBM6XLOZXLncaMp9gzWsE.ttf",
      regular: "http://fonts.gstatic.com/s/pontanosans/v16/qFdW35GdgYR8EzR6oBLDHa3wyRf8W8eBM6XLOXLMncaMp9gzWsE.ttf"
    }
  },
  {
    family: "Martel Sans",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["200", "300", "regular", "600", "700", "800", "900"],
    files: {
      200: "http://fonts.gstatic.com/s/martelsans/v12/h0GxssGi7VdzDgKjM-4d8hAX5suHFUknqMxQ.ttf",
      300: "http://fonts.gstatic.com/s/martelsans/v12/h0GxssGi7VdzDgKjM-4d8hBz5cuHFUknqMxQ.ttf",
      600: "http://fonts.gstatic.com/s/martelsans/v12/h0GxssGi7VdzDgKjM-4d8hAH48uHFUknqMxQ.ttf",
      700: "http://fonts.gstatic.com/s/martelsans/v12/h0GxssGi7VdzDgKjM-4d8hBj4suHFUknqMxQ.ttf",
      800: "http://fonts.gstatic.com/s/martelsans/v12/h0GxssGi7VdzDgKjM-4d8hB_4cuHFUknqMxQ.ttf",
      900: "http://fonts.gstatic.com/s/martelsans/v12/h0GxssGi7VdzDgKjM-4d8hBb4MuHFUknqMxQ.ttf",
      regular: "http://fonts.gstatic.com/s/martelsans/v12/h0GsssGi7VdzDgKjM-4d8ijfze-PPlUu.ttf"
    }
  },
  {
    family: "Alef",
    category: "sans-serif",
    subsets: ["hebrew", "latin"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/alef/v21/FeVQS0NQpLYglo50L5la2bxii28.ttf",
      regular: "http://fonts.gstatic.com/s/alef/v21/FeVfS0NQpLYgrjJbC5FxxbU.ttf"
    }
  },
  {
    family: "Londrina Solid",
    category: "display",
    subsets: ["latin"],
    variants: ["100", "300", "regular", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/londrinasolid/v17/flUjRq6sw40kQEJxWNgkLuudGfs9KBYesZHhV64.ttf",
      300: "http://fonts.gstatic.com/s/londrinasolid/v17/flUiRq6sw40kQEJxWNgkLuudGfv1CjY0n53oTrcL.ttf",
      900: "http://fonts.gstatic.com/s/londrinasolid/v17/flUiRq6sw40kQEJxWNgkLuudGfvdDzY0n53oTrcL.ttf",
      regular: "http://fonts.gstatic.com/s/londrinasolid/v17/flUhRq6sw40kQEJxWNgkLuudGcNZIhI8tIHh.ttf"
    }
  },
  {
    family: "Noto Serif Bengali",
    category: "serif",
    subsets: ["bengali", "latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfcAH3qn4LjQH8yD.ttf",
      200: "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfeAHnqn4LjQH8yD.ttf",
      300: "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfdeHnqn4LjQH8yD.ttf",
      500: "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfcyHnqn4LjQH8yD.ttf",
      600: "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JffeGXqn4LjQH8yD.ttf",
      700: "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JffnGXqn4LjQH8yD.ttf",
      800: "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfeAGXqn4LjQH8yD.ttf",
      900: "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfepGXqn4LjQH8yD.ttf",
      regular: "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfcAHnqn4LjQH8yD.ttf"
    }
  },
  {
    family: "Squada One",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/squadaone/v18/BCasqZ8XsOrx4mcOk6MtWaA8WDBkHgs.ttf"
    }
  },
  {
    family: "Pangolin",
    category: "handwriting",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/pangolin/v11/cY9GfjGcW0FPpi-tWPfK5d3aiLBG.ttf"
    }
  },
  {
    family: "Palanquin",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700"],
    files: {
      100: "http://fonts.gstatic.com/s/palanquin/v13/9XUhlJ90n1fBFg7ceXwUEltI7rWmZzTH.ttf",
      200: "http://fonts.gstatic.com/s/palanquin/v13/9XUilJ90n1fBFg7ceXwUvnpoxJuqbi3ezg.ttf",
      300: "http://fonts.gstatic.com/s/palanquin/v13/9XUilJ90n1fBFg7ceXwU2nloxJuqbi3ezg.ttf",
      500: "http://fonts.gstatic.com/s/palanquin/v13/9XUilJ90n1fBFg7ceXwUgnhoxJuqbi3ezg.ttf",
      600: "http://fonts.gstatic.com/s/palanquin/v13/9XUilJ90n1fBFg7ceXwUrn9oxJuqbi3ezg.ttf",
      700: "http://fonts.gstatic.com/s/palanquin/v13/9XUilJ90n1fBFg7ceXwUyn5oxJuqbi3ezg.ttf",
      regular: "http://fonts.gstatic.com/s/palanquin/v13/9XUnlJ90n1fBFg7ceXwsdlFMzLC2Zw.ttf"
    }
  },
  {
    family: "Nothing You Could Do",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/nothingyoucoulddo/v19/oY1B8fbBpaP5OX3DtrRYf_Q2BPB1SnfZb0OJl1ol2Ymo.ttf"
    }
  },
  {
    family: "Sarala",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/sarala/v12/uK_x4riEZv4o1w9ptjI3OtWYVkMpXA.ttf",
      regular: "http://fonts.gstatic.com/s/sarala/v12/uK_y4riEZv4o1w9RCh0TMv6EXw.ttf"
    }
  },
  {
    family: "Khula",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["300", "regular", "600", "700", "800"],
    files: {
      300: "http://fonts.gstatic.com/s/khula/v12/OpNPnoEOns3V7G-ljCvUrC59XwXD.ttf",
      600: "http://fonts.gstatic.com/s/khula/v12/OpNPnoEOns3V7G_RiivUrC59XwXD.ttf",
      700: "http://fonts.gstatic.com/s/khula/v12/OpNPnoEOns3V7G-1iyvUrC59XwXD.ttf",
      800: "http://fonts.gstatic.com/s/khula/v12/OpNPnoEOns3V7G-piCvUrC59XwXD.ttf",
      regular: "http://fonts.gstatic.com/s/khula/v12/OpNCnoEOns3V7FcJpA_chzJ0.ttf"
    }
  },
  {
    family: "Electrolize",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/electrolize/v18/cIf5Ma1dtE0zSiGSiED7AUEGso5tQafB.ttf"
    }
  },
  {
    family: "Sansita",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic", "800", "800italic", "900", "900italic"],
    files: {
      700: "http://fonts.gstatic.com/s/sansita/v11/QldLNTRRphEb_-V7JKWUaXl0wqVv3_g.ttf",
      800: "http://fonts.gstatic.com/s/sansita/v11/QldLNTRRphEb_-V7JLmXaXl0wqVv3_g.ttf",
      900: "http://fonts.gstatic.com/s/sansita/v11/QldLNTRRphEb_-V7JJ2WaXl0wqVv3_g.ttf",
      regular: "http://fonts.gstatic.com/s/sansita/v11/QldONTRRphEb_-V7HBm7TXFf3qw.ttf",
      italic: "http://fonts.gstatic.com/s/sansita/v11/QldMNTRRphEb_-V7LBuxSVNazqx2xg.ttf",
      "700italic": "http://fonts.gstatic.com/s/sansita/v11/QldJNTRRphEb_-V7LBuJ9Xx-xodqz_joDQ.ttf",
      "800italic": "http://fonts.gstatic.com/s/sansita/v11/QldJNTRRphEb_-V7LBuJ6X9-xodqz_joDQ.ttf",
      "900italic": "http://fonts.gstatic.com/s/sansita/v11/QldJNTRRphEb_-V7LBuJzX5-xodqz_joDQ.ttf"
    }
  },
  {
    family: "Gilda Display",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/gildadisplay/v18/t5tmIRoYMoaYG0WEOh7HwMeR7TnFrpOHYh4.ttf"
    }
  },
  {
    family: "Damion",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/damion/v14/hv-XlzJ3KEUe_YZUbWY3MTFgVg.ttf"
    }
  },
  {
    family: "Italianno",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/italianno/v17/dg4n_p3sv6gCJkwzT6Rnj5YpQwM-gg.ttf"
    }
  },
  {
    family: "Oleo Script",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/oleoscript/v14/raxkHieDvtMOe0iICsUccCDmnmrY2zqUKafv.ttf",
      regular: "http://fonts.gstatic.com/s/oleoscript/v14/rax5HieDvtMOe0iICsUccBhasU7Q8Cad.ttf"
    }
  },
  {
    family: "Noto Sans Tamil",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "tamil"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7vGor0RqKDt_EvT.ttf",
      200: "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7tGo70RqKDt_EvT.ttf",
      300: "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7uYo70RqKDt_EvT.ttf",
      500: "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7v0o70RqKDt_EvT.ttf",
      600: "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7sYpL0RqKDt_EvT.ttf",
      700: "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7shpL0RqKDt_EvT.ttf",
      800: "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7tGpL0RqKDt_EvT.ttf",
      900: "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7tvpL0RqKDt_EvT.ttf",
      regular: "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7vGo70RqKDt_EvT.ttf"
    }
  },
  {
    family: "Share Tech Mono",
    category: "monospace",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/sharetechmono/v15/J7aHnp1uDWRBEqV98dVQztYldFc7pAsEIc3Xew.ttf"
    }
  },
  {
    family: "Syne",
    category: "sans-serif",
    subsets: ["greek", "latin", "latin-ext"],
    variants: ["regular", "500", "600", "700", "800"],
    files: {
      500: "http://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjBZRjr0FKM_0KuT6kR47NCV5Z.ttf",
      600: "http://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjBZRjr0FKM_3mvj6kR47NCV5Z.ttf",
      700: "http://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjBZRjr0FKM_3fvj6kR47NCV5Z.ttf",
      800: "http://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjBZRjr0FKM_24vj6kR47NCV5Z.ttf",
      regular: "http://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjBZRjr0FKM_04uT6kR47NCV5Z.ttf"
    }
  },
  {
    family: "Shrikhand",
    category: "display",
    subsets: ["gujarati", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/shrikhand/v15/a8IbNovtLWfR7T7bMJwbBIiQ0zhMtA.ttf"
    }
  },
  {
    family: "DM Mono",
    category: "monospace",
    subsets: ["latin", "latin-ext"],
    variants: ["300", "300italic", "regular", "italic", "500", "500italic"],
    files: {
      300: "http://fonts.gstatic.com/s/dmmono/v14/aFTR7PB1QTsUX8KYvrGyIYSnbKX9Rlk.ttf",
      500: "http://fonts.gstatic.com/s/dmmono/v14/aFTR7PB1QTsUX8KYvumzIYSnbKX9Rlk.ttf",
      "300italic": "http://fonts.gstatic.com/s/dmmono/v14/aFTT7PB1QTsUX8KYth-orYataIf4VllXuA.ttf",
      regular: "http://fonts.gstatic.com/s/dmmono/v14/aFTU7PB1QTsUX8KYhh2aBYyMcKw.ttf",
      italic: "http://fonts.gstatic.com/s/dmmono/v14/aFTW7PB1QTsUX8KYth-QAa6JYKzkXw.ttf",
      "500italic": "http://fonts.gstatic.com/s/dmmono/v14/aFTT7PB1QTsUX8KYth-o9YetaIf4VllXuA.ttf"
    }
  },
  {
    family: "Cabin Sketch",
    category: "display",
    subsets: ["latin"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/cabinsketch/v21/QGY2z_kZZAGCONcK2A4bGOj0I_1o4dLyI4CMFw.ttf",
      regular: "http://fonts.gstatic.com/s/cabinsketch/v21/QGYpz_kZZAGCONcK2A4bGOjMn9JM6fnuKg.ttf"
    }
  },
  {
    family: "Black Han Sans",
    category: "sans-serif",
    subsets: ["korean", "latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/blackhansans/v17/ea8Aad44WunzF9a-dL6toA8r8nqVIXSkH-Hc.ttf"
    }
  },
  {
    family: "Ramabhadra",
    category: "sans-serif",
    subsets: ["latin", "telugu"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/ramabhadra/v15/EYq2maBOwqRW9P1SQ83LehNGX5uWw3o.ttf"
    }
  },
  {
    family: "Armata",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/armata/v20/gokvH63_HV5jQ-E9lD53Q2u_mQ.ttf"
    }
  },
  {
    family: "Six Caps",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/sixcaps/v20/6ae_4KGrU7VR7bNmabcS9XXaPCop.ttf"
    }
  },
  {
    family: "Cutive Mono",
    category: "monospace",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/cutivemono/v20/m8JWjfRfY7WVjVi2E-K9H5RFRG-K3Mud.ttf"
    }
  },
  {
    family: "Pinyon Script",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/pinyonscript/v21/6xKpdSJbL9-e9LuoeQiDRQR8aOLQO4bhiDY.ttf"
    }
  },
  {
    family: "Quantico",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/quantico/v17/rax5HiSdp9cPL3KIF7TQARhasU7Q8Cad.ttf",
      regular: "http://fonts.gstatic.com/s/quantico/v17/rax-HiSdp9cPL3KIF4xsLjxSmlLZ.ttf",
      italic: "http://fonts.gstatic.com/s/quantico/v17/rax4HiSdp9cPL3KIF7xuJDhwn0LZ6T8.ttf",
      "700italic": "http://fonts.gstatic.com/s/quantico/v17/rax7HiSdp9cPL3KIF7xuHIRfu0ry9TadML4.ttf"
    }
  },
  {
    family: "Libre Barcode 39",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/librebarcode39/v21/-nFnOHM08vwC6h8Li1eQnP_AHzI2K_d709jy92k.ttf"
    }
  },
  {
    family: "Glegoo",
    category: "serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/glegoo/v16/_Xmu-HQyrTKWaw2xN4a9CKRpzimMsg.ttf",
      regular: "http://fonts.gstatic.com/s/glegoo/v16/_Xmt-HQyrTKWaw2Ji6mZAI91xw.ttf"
    }
  },
  {
    family: "Sintony",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/sintony/v15/XoHj2YDqR7-98cVUGYgIn9cDkjLp6C8.ttf",
      regular: "http://fonts.gstatic.com/s/sintony/v15/XoHm2YDqR7-98cVUITQnu98ojjs.ttf"
    }
  },
  {
    family: "Chewy",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/chewy/v18/uK_94ruUb-k-wk5xIDMfO-ed.ttf"
    }
  },
  {
    family: "Antic",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/antic/v19/TuGfUVB8XY5DRaZLodgzydtk.ttf"
    }
  },
  {
    family: "Noto Sans Bengali",
    category: "sans-serif",
    subsets: ["bengali", "latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsolKudCk8izI0lc.ttf",
      200: "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsglLudCk8izI0lc.ttf",
      300: "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmstdLudCk8izI0lc.ttf",
      500: "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsrtLudCk8izI0lc.ttf",
      600: "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsldMudCk8izI0lc.ttf",
      700: "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6Kmsm5MudCk8izI0lc.ttf",
      800: "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsglMudCk8izI0lc.ttf",
      900: "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsiBMudCk8izI0lc.ttf",
      regular: "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsolLudCk8izI0lc.ttf"
    }
  },
  {
    family: "VT323",
    category: "monospace",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/vt323/v17/pxiKyp0ihIEF2hsYHpT2dkNE.ttf"
    }
  },
  {
    family: "Short Stack",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/shortstack/v15/bMrzmS2X6p0jZC6EcmPFX-SScX8D0nq6.ttf"
    }
  },
  {
    family: "Leckerli One",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/leckerlione/v20/V8mCoQH8VCsNttEnxnGQ-1itLZxcBtItFw.ttf"
    }
  },
  {
    family: "Karma",
    category: "serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/karma/v16/va9F4kzAzMZRGLjDY8Z_uqzGQC_-.ttf",
      500: "http://fonts.gstatic.com/s/karma/v16/va9F4kzAzMZRGLibYsZ_uqzGQC_-.ttf",
      600: "http://fonts.gstatic.com/s/karma/v16/va9F4kzAzMZRGLi3ZcZ_uqzGQC_-.ttf",
      700: "http://fonts.gstatic.com/s/karma/v16/va9F4kzAzMZRGLjTZMZ_uqzGQC_-.ttf",
      regular: "http://fonts.gstatic.com/s/karma/v16/va9I4kzAzMZRGIBvS-J3kbDP.ttf"
    }
  },
  {
    family: "Koulen",
    category: "display",
    subsets: ["khmer", "latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/koulen/v27/AMOQz46as3KIBPeWgnA9kuYMUg.ttf"
    }
  },
  {
    family: "Holtwood One SC",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/holtwoodonesc/v20/yYLx0hLR0P-3vMFSk1TCq3Txg5B3cbb6LZttyg.ttf"
    }
  },
  {
    family: "Aclonica",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/aclonica/v22/K2FyfZJVlfNNSEBXGb7TCI6oBjLz.ttf"
    }
  },
  {
    family: "Oxanium",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["200", "300", "regular", "500", "600", "700", "800"],
    files: {
      200: "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G83JfniMBXQ7d67x.ttf",
      300: "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G80XfniMBXQ7d67x.ttf",
      500: "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G817fniMBXQ7d67x.ttf",
      600: "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G82XeXiMBXQ7d67x.ttf",
      700: "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G82ueXiMBXQ7d67x.ttf",
      800: "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G83JeXiMBXQ7d67x.ttf",
      regular: "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G81JfniMBXQ7d67x.ttf"
    }
  },
  {
    family: "Basic",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/basic/v17/xfu_0WLxV2_XKQN34lDVyR7D.ttf"
    }
  },
  {
    family: "K2D",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/k2d/v11/J7aRnpF2V0ErE6UpvrIw74NL.ttf",
      200: "http://fonts.gstatic.com/s/k2d/v11/J7aenpF2V0Erv4QJlJw85ppSGw.ttf",
      300: "http://fonts.gstatic.com/s/k2d/v11/J7aenpF2V0Er24cJlJw85ppSGw.ttf",
      500: "http://fonts.gstatic.com/s/k2d/v11/J7aenpF2V0Erg4YJlJw85ppSGw.ttf",
      600: "http://fonts.gstatic.com/s/k2d/v11/J7aenpF2V0Err4EJlJw85ppSGw.ttf",
      700: "http://fonts.gstatic.com/s/k2d/v11/J7aenpF2V0Ery4AJlJw85ppSGw.ttf",
      800: "http://fonts.gstatic.com/s/k2d/v11/J7aenpF2V0Er14MJlJw85ppSGw.ttf",
      "100italic": "http://fonts.gstatic.com/s/k2d/v11/J7afnpF2V0EjdZ1NtLYS6pNLAjk.ttf",
      "200italic": "http://fonts.gstatic.com/s/k2d/v11/J7acnpF2V0EjdZ3hlZY4xJ9CGyAa.ttf",
      "300italic": "http://fonts.gstatic.com/s/k2d/v11/J7acnpF2V0EjdZ2FlpY4xJ9CGyAa.ttf",
      regular: "http://fonts.gstatic.com/s/k2d/v11/J7aTnpF2V0ETd68tnLcg7w.ttf",
      italic: "http://fonts.gstatic.com/s/k2d/v11/J7aRnpF2V0EjdaUpvrIw74NL.ttf",
      "500italic": "http://fonts.gstatic.com/s/k2d/v11/J7acnpF2V0EjdZ3dl5Y4xJ9CGyAa.ttf",
      "600italic": "http://fonts.gstatic.com/s/k2d/v11/J7acnpF2V0EjdZ3xkJY4xJ9CGyAa.ttf",
      "700italic": "http://fonts.gstatic.com/s/k2d/v11/J7acnpF2V0EjdZ2VkZY4xJ9CGyAa.ttf",
      "800italic": "http://fonts.gstatic.com/s/k2d/v11/J7acnpF2V0EjdZ2JkpY4xJ9CGyAa.ttf"
    }
  },
  {
    family: "JetBrains Mono",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yK1jPVmUsaaDhw.ttf",
      200: "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8SKxjPVmUsaaDhw.ttf",
      300: "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8lqxjPVmUsaaDhw.ttf",
      500: "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8-qxjPVmUsaaDhw.ttf",
      600: "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8FqtjPVmUsaaDhw.ttf",
      700: "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8L6tjPVmUsaaDhw.ttf",
      800: "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8SKtjPVmUsaaDhw.ttf",
      regular: "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.ttf",
      "100italic": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO-Lf1OQk6OThxPA.ttf",
      "200italic": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO8LflOQk6OThxPA.ttf",
      "300italic": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO_VflOQk6OThxPA.ttf",
      italic: "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO-LflOQk6OThxPA.ttf",
      "500italic": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO-5flOQk6OThxPA.ttf",
      "600italic": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO9VeVOQk6OThxPA.ttf",
      "700italic": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO9seVOQk6OThxPA.ttf",
      "800italic": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO8LeVOQk6OThxPA.ttf"
    }
  },
  {
    family: "Arapey",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/arapey/v16/-W__XJn-UDDA2RC6Z9AcZkIzeg.ttf",
      italic: "http://fonts.gstatic.com/s/arapey/v16/-W_9XJn-UDDA2RCKZdoYREcjeo0k.ttf"
    }
  },
  {
    family: "Alatsi",
    category: "sans-serif",
    subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/alatsi/v11/TK3iWkUJAxQ2nLNGHjUHte5fKg.ttf"
    }
  },
  {
    family: "Playfair",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      300: "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPlKetgdoSMw5ifm.ttf",
      500: "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPkmetgdoSMw5ifm.ttf",
      600: "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPnKfdgdoSMw5ifm.ttf",
      700: "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPnzfdgdoSMw5ifm.ttf",
      800: "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPmUfdgdoSMw5ifm.ttf",
      900: "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPm9fdgdoSMw5ifm.ttf",
      regular: "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPkUetgdoSMw5ifm.ttf",
      "300italic": "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcOW5eqycS4zfmNrE.ttf",
      italic: "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcOTBeqycS4zfmNrE.ttf",
      "500italic": "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcOQJeqycS4zfmNrE.ttf",
      "600italic": "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcOe5ZqycS4zfmNrE.ttf",
      "700italic": "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcOddZqycS4zfmNrE.ttf",
      "800italic": "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcObBZqycS4zfmNrE.ttf",
      "900italic": "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcOZlZqycS4zfmNrE.ttf"
    }
  },
  {
    family: "Athiti",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700"],
    files: {
      200: "http://fonts.gstatic.com/s/athiti/v12/pe0sMISdLIZIv1wAxDNyAv2-C99ycg.ttf",
      300: "http://fonts.gstatic.com/s/athiti/v12/pe0sMISdLIZIv1wAoDByAv2-C99ycg.ttf",
      500: "http://fonts.gstatic.com/s/athiti/v12/pe0sMISdLIZIv1wA-DFyAv2-C99ycg.ttf",
      600: "http://fonts.gstatic.com/s/athiti/v12/pe0sMISdLIZIv1wA1DZyAv2-C99ycg.ttf",
      700: "http://fonts.gstatic.com/s/athiti/v12/pe0sMISdLIZIv1wAsDdyAv2-C99ycg.ttf",
      regular: "http://fonts.gstatic.com/s/athiti/v12/pe0vMISdLIZIv1w4DBhWCtaiAg.ttf"
    }
  },
  {
    family: "Rammetto One",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/rammettoone/v18/LhWiMV3HOfMbMetJG3lQDpp9Mvuciu-_SQ.ttf"
    }
  },
  {
    family: "Berkshire Swash",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/berkshireswash/v20/ptRRTi-cavZOGqCvnNJDl5m5XmNPrcQybX4pQA.ttf"
    }
  },
  {
    family: "Noto Sans Mono",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_FNI49rXVEQQL8Y.ttf",
      200: "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_NNJ49rXVEQQL8Y.ttf",
      300: "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_A1J49rXVEQQL8Y.ttf",
      500: "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_GFJ49rXVEQQL8Y.ttf",
      600: "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_I1O49rXVEQQL8Y.ttf",
      700: "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_LRO49rXVEQQL8Y.ttf",
      800: "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_NNO49rXVEQQL8Y.ttf",
      900: "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_PpO49rXVEQQL8Y.ttf",
      regular: "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_FNJ49rXVEQQL8Y.ttf"
    }
  },
  {
    family: "Saira Extra Condensed",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFsOHYr-vcC7h8MklGBkrvmUG9rbpkisrTri0jx9i5ss3a3.ttf",
      200: "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrJ2nR3ABgum-uoQ.ttf",
      300: "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrQ2rR3ABgum-uoQ.ttf",
      500: "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrG2vR3ABgum-uoQ.ttf",
      600: "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrN2zR3ABgum-uoQ.ttf",
      700: "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrU23R3ABgum-uoQ.ttf",
      800: "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrT27R3ABgum-uoQ.ttf",
      900: "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTra2_R3ABgum-uoQ.ttf",
      regular: "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFiOHYr-vcC7h8MklGBkrvmUG9rbpkisrTT70L11Ct8sw.ttf"
    }
  },
  {
    family: "Kreon",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/kreon/v37/t5t9IRIUKY-TFF_LW5lnMR3v2DnvPNimejUfp2dWNg.ttf",
      500: "http://fonts.gstatic.com/s/kreon/v37/t5t9IRIUKY-TFF_LW5lnMR3v2DnvUNimejUfp2dWNg.ttf",
      600: "http://fonts.gstatic.com/s/kreon/v37/t5t9IRIUKY-TFF_LW5lnMR3v2DnvvN-mejUfp2dWNg.ttf",
      700: "http://fonts.gstatic.com/s/kreon/v37/t5t9IRIUKY-TFF_LW5lnMR3v2Dnvhd-mejUfp2dWNg.ttf",
      regular: "http://fonts.gstatic.com/s/kreon/v37/t5t9IRIUKY-TFF_LW5lnMR3v2DnvYtimejUfp2dWNg.ttf"
    }
  },
  {
    family: "Hind Guntur",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "telugu"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/hindguntur/v12/wXKyE3UZrok56nvamSuJd_yGn1czn9zaj5Ju.ttf",
      500: "http://fonts.gstatic.com/s/hindguntur/v12/wXKyE3UZrok56nvamSuJd_zenlczn9zaj5Ju.ttf",
      600: "http://fonts.gstatic.com/s/hindguntur/v12/wXKyE3UZrok56nvamSuJd_zymVczn9zaj5Ju.ttf",
      700: "http://fonts.gstatic.com/s/hindguntur/v12/wXKyE3UZrok56nvamSuJd_yWmFczn9zaj5Ju.ttf",
      regular: "http://fonts.gstatic.com/s/hindguntur/v12/wXKvE3UZrok56nvamSuJd8Qqt3M7tMDT.ttf"
    }
  },
  {
    family: "STIX Two Text",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
    files: {
      500: "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Gr02F12Xkf5whdwKf11l0jbKkeidMTtZ5YihS2SOYWxFMN1WD.ttf",
      600: "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Gr02F12Xkf5whdwKf11l0jbKkeidMTtZ5Yii-3iOYWxFMN1WD.ttf",
      700: "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Gr02F12Xkf5whdwKf11l0jbKkeidMTtZ5YiiH3iOYWxFMN1WD.ttf",
      regular: "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Gr02F12Xkf5whdwKf11l0jbKkeidMTtZ5Yihg2SOYWxFMN1WD.ttf",
      italic: "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Er02F12Xkf5whdwKf11l0p7uWhf8lJUzXZT2omsvbURVuMkWDmSo.ttf",
      "500italic": "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Er02F12Xkf5whdwKf11l0p7uWhf8lJUzXZT2omvnbURVuMkWDmSo.ttf",
      "600italic": "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Er02F12Xkf5whdwKf11l0p7uWhf8lJUzXZT2omhXcURVuMkWDmSo.ttf",
      "700italic": "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Er02F12Xkf5whdwKf11l0p7uWhf8lJUzXZT2omizcURVuMkWDmSo.ttf"
    }
  },
  {
    family: "Amita",
    category: "handwriting",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/amita/v18/HhyXU5si9Om7PTHTLtCCOopCTKkI.ttf",
      regular: "http://fonts.gstatic.com/s/amita/v18/HhyaU5si9Om7PQlvAfSKEZZL.ttf"
    }
  },
  {
    family: "PT Serif Caption",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/ptserifcaption/v17/ieVl2ZhbGCW-JoW6S34pSDpqYKU059WxDCs5cvI.ttf",
      italic: "http://fonts.gstatic.com/s/ptserifcaption/v17/ieVj2ZhbGCW-JoW6S34pSDpqYKU019e7CAk8YvJEeg.ttf"
    }
  },
  {
    family: "Caveat Brush",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/caveatbrush/v11/EYq0maZfwr9S9-ETZc3fKXtMW7mT03pdQw.ttf"
    }
  },
  {
    family: "Lemonada",
    category: "display",
    subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/lemonada/v28/0QI-MXFD9oygTWy_R-FFlwV-bgfR7QJGJOt2mfWc3Z2pTg.ttf",
      500: "http://fonts.gstatic.com/s/lemonada/v28/0QI-MXFD9oygTWy_R-FFlwV-bgfR7QJGSOt2mfWc3Z2pTg.ttf",
      600: "http://fonts.gstatic.com/s/lemonada/v28/0QI-MXFD9oygTWy_R-FFlwV-bgfR7QJGpOx2mfWc3Z2pTg.ttf",
      700: "http://fonts.gstatic.com/s/lemonada/v28/0QI-MXFD9oygTWy_R-FFlwV-bgfR7QJGnex2mfWc3Z2pTg.ttf",
      regular: "http://fonts.gstatic.com/s/lemonada/v28/0QI-MXFD9oygTWy_R-FFlwV-bgfR7QJGeut2mfWc3Z2pTg.ttf"
    }
  },
  {
    family: "Racing Sans One",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/racingsansone/v15/sykr-yRtm7EvTrXNxkv5jfKKyDCwL3rmWpIBtA.ttf"
    }
  },
  {
    family: "Atkinson Hyperlegible",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/atkinsonhyperlegible/v11/9Bt73C1KxNDXMspQ1lPyU89-1h6ONRlW45G8WbcNcy-OZFy-FA.ttf",
      regular: "http://fonts.gstatic.com/s/atkinsonhyperlegible/v11/9Bt23C1KxNDXMspQ1lPyU89-1h6ONRlW45GE5ZgpewSSbQ.ttf",
      italic: "http://fonts.gstatic.com/s/atkinsonhyperlegible/v11/9Bt43C1KxNDXMspQ1lPyU89-1h6ONRlW45G055ItWQGCbUWn.ttf",
      "700italic": "http://fonts.gstatic.com/s/atkinsonhyperlegible/v11/9Bt93C1KxNDXMspQ1lPyU89-1h6ONRlW45G056qRdiWKRlmuFH24.ttf"
    }
  },
  {
    family: "Markazi Text",
    category: "serif",
    subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700"],
    files: {
      500: "http://fonts.gstatic.com/s/markazitext/v23/sykh-ydym6AtQaiEtX7yhqb_rV1k_81ZVYYZtcaQT4MlBekmJLo.ttf",
      600: "http://fonts.gstatic.com/s/markazitext/v23/sykh-ydym6AtQaiEtX7yhqb_rV1k_81ZVYYZtSqXT4MlBekmJLo.ttf",
      700: "http://fonts.gstatic.com/s/markazitext/v23/sykh-ydym6AtQaiEtX7yhqb_rV1k_81ZVYYZtROXT4MlBekmJLo.ttf",
      regular: "http://fonts.gstatic.com/s/markazitext/v23/sykh-ydym6AtQaiEtX7yhqb_rV1k_81ZVYYZtfSQT4MlBekmJLo.ttf"
    }
  },
  {
    family: "GFS Didot",
    category: "serif",
    subsets: ["greek"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/gfsdidot/v15/Jqzh5TybZ9vZMWFssvwiF-fGFSCGAA.ttf"
    }
  },
  {
    family: "Charm",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/charm/v11/7cHrv4oii5K0Md6TDss8yn4hnCci.ttf",
      regular: "http://fonts.gstatic.com/s/charm/v11/7cHmv4oii5K0MeYvIe804WIo.ttf"
    }
  },
  {
    family: "Changa One",
    category: "display",
    subsets: ["latin"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/changaone/v20/xfu00W3wXn3QLUJXhzq46AbouLfbK64.ttf",
      italic: "http://fonts.gstatic.com/s/changaone/v20/xfu20W3wXn3QLUJXhzq42ATivJXeO67ISw.ttf"
    }
  },
  {
    family: "Boogaloo",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/boogaloo/v23/kmK-Zq45GAvOdnaW6x1F_SrQo_1K.ttf"
    }
  },
  {
    family: "Julee",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/julee/v25/TuGfUVB3RpZPQ6ZLodgzydtk.ttf"
    }
  },
  {
    family: "Covered By Your Grace",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/coveredbyyourgrace/v15/QGYwz-AZahWOJJI9kykWW9mD6opopoqXSOS0FgItq6bFIg.ttf"
    }
  },
  {
    family: "Cantata One",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/cantataone/v15/PlI5Fl60Nb5obNzNe2jslVxEt8CwfGaD.ttf"
    }
  },
  {
    family: "Yrsa",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic"
    ],
    files: {
      300: "http://fonts.gstatic.com/s/yrsa/v20/wlprgwnQFlxs_wD3CFSMYmFaaCjASNNV9rRPfrKu.ttf",
      500: "http://fonts.gstatic.com/s/yrsa/v20/wlprgwnQFlxs_wD3CFSMYmFaaCisSNNV9rRPfrKu.ttf",
      600: "http://fonts.gstatic.com/s/yrsa/v20/wlprgwnQFlxs_wD3CFSMYmFaaChAT9NV9rRPfrKu.ttf",
      700: "http://fonts.gstatic.com/s/yrsa/v20/wlprgwnQFlxs_wD3CFSMYmFaaCh5T9NV9rRPfrKu.ttf",
      regular: "http://fonts.gstatic.com/s/yrsa/v20/wlprgwnQFlxs_wD3CFSMYmFaaCieSNNV9rRPfrKu.ttf",
      "300italic": "http://fonts.gstatic.com/s/yrsa/v20/wlptgwnQFlxs1QnF94zlCfv0bz1WC2UW_LBte6KuGEo.ttf",
      italic: "http://fonts.gstatic.com/s/yrsa/v20/wlptgwnQFlxs1QnF94zlCfv0bz1WCzsW_LBte6KuGEo.ttf",
      "500italic": "http://fonts.gstatic.com/s/yrsa/v20/wlptgwnQFlxs1QnF94zlCfv0bz1WCwkW_LBte6KuGEo.ttf",
      "600italic": "http://fonts.gstatic.com/s/yrsa/v20/wlptgwnQFlxs1QnF94zlCfv0bz1WC-UR_LBte6KuGEo.ttf",
      "700italic": "http://fonts.gstatic.com/s/yrsa/v20/wlptgwnQFlxs1QnF94zlCfv0bz1WC9wR_LBte6KuGEo.ttf"
    }
  },
  {
    family: "Nanum Brush Script",
    category: "handwriting",
    subsets: ["korean", "latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/nanumbrushscript/v22/wXK2E2wfpokopxzthSqPbcR5_gVaxazyjqBr1lO97Q.ttf"
    }
  },
  {
    family: "Trirong",
    category: "serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/trirong/v15/7r3EqXNgp8wxdOdOl-go3YRl6ujngw.ttf",
      200: "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOl0QJ_a5L5uH-mts.ttf",
      300: "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOlyAK_a5L5uH-mts.ttf",
      500: "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOl3gL_a5L5uH-mts.ttf",
      600: "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOl1QM_a5L5uH-mts.ttf",
      700: "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOlzAN_a5L5uH-mts.ttf",
      800: "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOlywO_a5L5uH-mts.ttf",
      900: "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOlwgP_a5L5uH-mts.ttf",
      "100italic": "http://fonts.gstatic.com/s/trirong/v15/7r3CqXNgp8wxdOdOn44QuY5hyO33g8IY.ttf",
      "200italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QFa9B4sP7itsB5g.ttf",
      "300italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QcaxB4sP7itsB5g.ttf",
      regular: "http://fonts.gstatic.com/s/trirong/v15/7r3GqXNgp8wxdOdOr4wi2aZg-ug.ttf",
      italic: "http://fonts.gstatic.com/s/trirong/v15/7r3EqXNgp8wxdOdOn44o3YRl6ujngw.ttf",
      "500italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QKa1B4sP7itsB5g.ttf",
      "600italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QBapB4sP7itsB5g.ttf",
      "700italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QYatB4sP7itsB5g.ttf",
      "800italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QfahB4sP7itsB5g.ttf",
      "900italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QWalB4sP7itsB5g.ttf"
    }
  },
  {
    family: "Mali",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic"
    ],
    files: {
      200: "http://fonts.gstatic.com/s/mali/v10/N0bV2SRONuN4QOLlKlRaJdbWgdY.ttf",
      300: "http://fonts.gstatic.com/s/mali/v10/N0bV2SRONuN4QIbmKlRaJdbWgdY.ttf",
      500: "http://fonts.gstatic.com/s/mali/v10/N0bV2SRONuN4QN7nKlRaJdbWgdY.ttf",
      600: "http://fonts.gstatic.com/s/mali/v10/N0bV2SRONuN4QPLgKlRaJdbWgdY.ttf",
      700: "http://fonts.gstatic.com/s/mali/v10/N0bV2SRONuN4QJbhKlRaJdbWgdY.ttf",
      "200italic": "http://fonts.gstatic.com/s/mali/v10/N0bX2SRONuN4SCj8wlVQIfTTkdbJYA.ttf",
      "300italic": "http://fonts.gstatic.com/s/mali/v10/N0bX2SRONuN4SCj8plZQIfTTkdbJYA.ttf",
      regular: "http://fonts.gstatic.com/s/mali/v10/N0ba2SRONuN4eCrODlxxOd8.ttf",
      italic: "http://fonts.gstatic.com/s/mali/v10/N0bU2SRONuN4SCjECn50Kd_PmA.ttf",
      "500italic": "http://fonts.gstatic.com/s/mali/v10/N0bX2SRONuN4SCj8_ldQIfTTkdbJYA.ttf",
      "600italic": "http://fonts.gstatic.com/s/mali/v10/N0bX2SRONuN4SCj80lBQIfTTkdbJYA.ttf",
      "700italic": "http://fonts.gstatic.com/s/mali/v10/N0bX2SRONuN4SCj8tlFQIfTTkdbJYA.ttf"
    }
  },
  {
    family: "Quintessential",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/quintessential/v22/fdNn9sOGq31Yjnh3qWU14DdtjY5wS7kmAyxM.ttf"
    }
  },
  {
    family: "Cinzel Decorative",
    category: "display",
    subsets: ["latin"],
    variants: ["regular", "700", "900"],
    files: {
      700: "http://fonts.gstatic.com/s/cinzeldecorative/v16/daaHSScvJGqLYhG8nNt8KPPswUAPniZoaelDQzCLlQXE.ttf",
      900: "http://fonts.gstatic.com/s/cinzeldecorative/v16/daaHSScvJGqLYhG8nNt8KPPswUAPniZQa-lDQzCLlQXE.ttf",
      regular: "http://fonts.gstatic.com/s/cinzeldecorative/v16/daaCSScvJGqLYhG8nNt8KPPswUAPnh7URs1LaCyC.ttf"
    }
  },
  {
    family: "Carrois Gothic",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/carroisgothic/v16/Z9XPDmFATg-N1PLtLOOxvIHl9ZmD3i7ajcJ-.ttf"
    }
  },
  {
    family: "Just Another Hand",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/justanotherhand/v19/845CNN4-AJyIGvIou-6yJKyptyOpOcr_BmmlS5aw.ttf"
    }
  },
  {
    family: "La Belle Aurore",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/labelleaurore/v20/RrQIbot8-mNYKnGNDkWlocovHeIIG-eFNVmULg.ttf"
    }
  },
  {
    family: "Candal",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/candal/v15/XoHn2YH6T7-t_8cNAR4Jt9Yxlw.ttf"
    }
  },
  {
    family: "Fredericka the Great",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/frederickathegreat/v21/9Bt33CxNwt7aOctW2xjbCstzwVKsIBVV-9Skz7Ylch2L.ttf"
    }
  },
  {
    family: "Syncopate",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/syncopate/v21/pe0pMIuPIYBCpEV5eFdKvtKaA_Rue1UwVg.ttf",
      regular: "http://fonts.gstatic.com/s/syncopate/v21/pe0sMIuPIYBCpEV5eFdyAv2-C99ycg.ttf"
    }
  },
  {
    family: "Aldrich",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/aldrich/v21/MCoTzAn-1s3IGyJMZaAS3pP5H_E.ttf"
    }
  },
  {
    family: "Libre Bodoni",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
    files: {
      500: "http://fonts.gstatic.com/s/librebodoni/v5/_Xm--H45qDWDYULr5OfyZudXzSBgY2oMBGte6L9fwWzZcOb3U3s.ttf",
      600: "http://fonts.gstatic.com/s/librebodoni/v5/_Xm--H45qDWDYULr5OfyZudXzSBgY2oMBGte6FNYwWzZcOb3U3s.ttf",
      700: "http://fonts.gstatic.com/s/librebodoni/v5/_Xm--H45qDWDYULr5OfyZudXzSBgY2oMBGte6GpYwWzZcOb3U3s.ttf",
      regular: "http://fonts.gstatic.com/s/librebodoni/v5/_Xm--H45qDWDYULr5OfyZudXzSBgY2oMBGte6I1fwWzZcOb3U3s.ttf",
      italic: "http://fonts.gstatic.com/s/librebodoni/v5/_Xm4-H45qDWDYULr5OfyZud9xBKfuwNnnsVZ_UUcKS_TdMTyQ3syLg.ttf",
      "500italic": "http://fonts.gstatic.com/s/librebodoni/v5/_Xm4-H45qDWDYULr5OfyZud9xBKfuwNnnsVZ_UUcGy_TdMTyQ3syLg.ttf",
      "600italic": "http://fonts.gstatic.com/s/librebodoni/v5/_Xm4-H45qDWDYULr5OfyZud9xBKfuwNnnsVZ_UUc9yjTdMTyQ3syLg.ttf",
      "700italic": "http://fonts.gstatic.com/s/librebodoni/v5/_Xm4-H45qDWDYULr5OfyZud9xBKfuwNnnsVZ_UUczijTdMTyQ3syLg.ttf"
    }
  },
  {
    family: "Michroma",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/michroma/v19/PN_zRfy9qWD8fEagAMg6rzjb_-Da.ttf"
    }
  },
  {
    family: "Palanquin Dark",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["regular", "500", "600", "700"],
    files: {
      500: "http://fonts.gstatic.com/s/palanquindark/v14/xn76YHgl1nqmANMB-26xC7yuF8Z6ZW41fcvN2KT4.ttf",
      600: "http://fonts.gstatic.com/s/palanquindark/v14/xn76YHgl1nqmANMB-26xC7yuF8ZWYm41fcvN2KT4.ttf",
      700: "http://fonts.gstatic.com/s/palanquindark/v14/xn76YHgl1nqmANMB-26xC7yuF8YyY241fcvN2KT4.ttf",
      regular: "http://fonts.gstatic.com/s/palanquindark/v14/xn75YHgl1nqmANMB-26xC7yuF_6OTEo9VtfE.ttf"
    }
  },
  {
    family: "Fira Code",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_GNsFVfxN87gsj0.ttf",
      500: "http://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_A9sFVfxN87gsj0.ttf",
      600: "http://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_ONrFVfxN87gsj0.ttf",
      700: "http://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_NprFVfxN87gsj0.ttf",
      regular: "http://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_D1sFVfxN87gsj0.ttf"
    }
  },
  {
    family: "Capriola",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/capriola/v14/wXKoE3YSppcvo1PDln_8L-AinG8y.ttf"
    }
  },
  {
    family: "Mrs Saint Delafield",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/mrssaintdelafield/v13/v6-IGZDIOVXH9xtmTZfRagunqBw5WC62cK4tLsubB2w.ttf"
    }
  },
  {
    family: "Averia Serif Libre",
    category: "display",
    subsets: ["latin"],
    variants: ["300", "300italic", "regular", "italic", "700", "700italic"],
    files: {
      300: "http://fonts.gstatic.com/s/averiaseriflibre/v18/neIVzD2ms4wxr6GvjeD0X88SHPyX2xYGCSmqwacqdrKvbQ.ttf",
      700: "http://fonts.gstatic.com/s/averiaseriflibre/v18/neIVzD2ms4wxr6GvjeD0X88SHPyX2xYGGS6qwacqdrKvbQ.ttf",
      "300italic": "http://fonts.gstatic.com/s/averiaseriflibre/v18/neIbzD2ms4wxr6GvjeD0X88SHPyX2xYOpzMmw60uVLe_bXHq.ttf",
      regular: "http://fonts.gstatic.com/s/averiaseriflibre/v18/neIWzD2ms4wxr6GvjeD0X88SHPyX2xY-pQGOyYw2fw.ttf",
      italic: "http://fonts.gstatic.com/s/averiaseriflibre/v18/neIUzD2ms4wxr6GvjeD0X88SHPyX2xYOpwuK64kmf6u2.ttf",
      "700italic": "http://fonts.gstatic.com/s/averiaseriflibre/v18/neIbzD2ms4wxr6GvjeD0X88SHPyX2xYOpzM2xK0uVLe_bXHq.ttf"
    }
  },
  {
    family: "Herr Von Muellerhoff",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/herrvonmuellerhoff/v21/WBL6rFjRZkREW8WqmCWYLgCkQKXb4CAft3c6_qJY3QPQ.ttf"
    }
  },
  {
    family: "Coda",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "800"],
    files: {
      800: "http://fonts.gstatic.com/s/coda/v21/SLXIc1jY5nQ8HeIgTp6mw9t1cX8.ttf",
      regular: "http://fonts.gstatic.com/s/coda/v21/SLXHc1jY5nQ8JUIMapaN39I.ttf"
    }
  },
  {
    family: "Krona One",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/kronaone/v14/jAnEgHdjHcjgfIb1ZcUCMY-h3cWkWg.ttf"
    }
  },
  {
    family: "Balsamiq Sans",
    category: "display",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/balsamiqsans/v14/P5sZzZiAbNrN8SB3lQQX7PncyWUyBY9mAzLFRQI.ttf",
      regular: "http://fonts.gstatic.com/s/balsamiqsans/v14/P5sEzZiAbNrN8SB3lQQX7Pnc8dkdIYdNHzs.ttf",
      italic: "http://fonts.gstatic.com/s/balsamiqsans/v14/P5sazZiAbNrN8SB3lQQX7PncwdsXJaVIDzvcXA.ttf",
      "700italic": "http://fonts.gstatic.com/s/balsamiqsans/v14/P5sfzZiAbNrN8SB3lQQX7PncwdsvmYpsBxDAVQI4aA.ttf"
    }
  },
  {
    family: "Livvic",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "900",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/livvic/v14/rnCr-x1S2hzjrlffC-M-mHnOSOuk.ttf",
      200: "http://fonts.gstatic.com/s/livvic/v14/rnCq-x1S2hzjrlffp8IeslfCQfK9WQ.ttf",
      300: "http://fonts.gstatic.com/s/livvic/v14/rnCq-x1S2hzjrlffw8EeslfCQfK9WQ.ttf",
      500: "http://fonts.gstatic.com/s/livvic/v14/rnCq-x1S2hzjrlffm8AeslfCQfK9WQ.ttf",
      600: "http://fonts.gstatic.com/s/livvic/v14/rnCq-x1S2hzjrlfft8ceslfCQfK9WQ.ttf",
      700: "http://fonts.gstatic.com/s/livvic/v14/rnCq-x1S2hzjrlff08YeslfCQfK9WQ.ttf",
      900: "http://fonts.gstatic.com/s/livvic/v14/rnCq-x1S2hzjrlff68QeslfCQfK9WQ.ttf",
      "100italic": "http://fonts.gstatic.com/s/livvic/v14/rnCt-x1S2hzjrlfXbdtakn3sTfukQHs.ttf",
      "200italic": "http://fonts.gstatic.com/s/livvic/v14/rnCs-x1S2hzjrlfXbdv2s13GY_etWWIJ.ttf",
      "300italic": "http://fonts.gstatic.com/s/livvic/v14/rnCs-x1S2hzjrlfXbduSsF3GY_etWWIJ.ttf",
      regular: "http://fonts.gstatic.com/s/livvic/v14/rnCp-x1S2hzjrlfnb-k6unzeSA.ttf",
      italic: "http://fonts.gstatic.com/s/livvic/v14/rnCr-x1S2hzjrlfXbeM-mHnOSOuk.ttf",
      "500italic": "http://fonts.gstatic.com/s/livvic/v14/rnCs-x1S2hzjrlfXbdvKsV3GY_etWWIJ.ttf",
      "600italic": "http://fonts.gstatic.com/s/livvic/v14/rnCs-x1S2hzjrlfXbdvmtl3GY_etWWIJ.ttf",
      "700italic": "http://fonts.gstatic.com/s/livvic/v14/rnCs-x1S2hzjrlfXbduCt13GY_etWWIJ.ttf",
      "900italic": "http://fonts.gstatic.com/s/livvic/v14/rnCs-x1S2hzjrlfXbdu6tV3GY_etWWIJ.ttf"
    }
  },
  {
    family: "Scada",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/scada/v15/RLp8K5Pv5qumeVrU6BEgRVfmZOE5.ttf",
      regular: "http://fonts.gstatic.com/s/scada/v15/RLpxK5Pv5qumeWJoxzUobkvv.ttf",
      italic: "http://fonts.gstatic.com/s/scada/v15/RLp_K5Pv5qumeVJqzTEKa1vvffg.ttf",
      "700italic": "http://fonts.gstatic.com/s/scada/v15/RLp6K5Pv5qumeVJq9Y0lT1PEYfE5p6g.ttf"
    }
  },
  {
    family: "Shadows Into Light Two",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/shadowsintolighttwo/v17/4iC86LVlZsRSjQhpWGedwyOoW-0A6_kpsyNmlAvNGLNnIF0.ttf"
    }
  },
  {
    family: "Telex",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/telex/v17/ieVw2Y1fKWmIO9fTB1piKFIf.ttf"
    }
  },
  {
    family: "Rancho",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/rancho/v21/46kulbzmXjLaqZRlbWXgd0RY1g.ttf"
    }
  },
  {
    family: "Bowlby One SC",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/bowlbyonesc/v25/DtVlJxerQqQm37tzN3wMug9Pzgj8owhNjuE.ttf"
    }
  },
  {
    family: "Graduate",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/graduate/v17/C8cg4cs3o2n15t_2YxgR6X2NZAn2.ttf"
    }
  },
  {
    family: "Oranienbaum",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/oranienbaum/v15/OZpHg_txtzZKMuXLIVrx-3zn7kz3dpHc.ttf"
    }
  },
  {
    family: "Miriam Libre",
    category: "sans-serif",
    subsets: ["hebrew", "latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/miriamlibre/v14/DdT-798HsHwubBAqfkcBTL_X3LbbRcC7_-Z7Hg.ttf",
      regular: "http://fonts.gstatic.com/s/miriamlibre/v14/DdTh798HsHwubBAqfkcBTL_vYJn_Teun9g.ttf"
    }
  },
  {
    family: "Vazirmatn",
    category: "sans-serif",
    subsets: ["arabic", "latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklWgyOReZ72DF_QY.ttf",
      200: "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklegzOReZ72DF_QY.ttf",
      300: "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklTYzOReZ72DF_QY.ttf",
      500: "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklVozOReZ72DF_QY.ttf",
      600: "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklbY0OReZ72DF_QY.ttf",
      700: "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklY80OReZ72DF_QY.ttf",
      800: "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRkleg0OReZ72DF_QY.ttf",
      900: "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklcE0OReZ72DF_QY.ttf",
      regular: "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklWgzOReZ72DF_QY.ttf"
    }
  },
  {
    family: "Corben",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/corben/v21/LYjAdGzzklQtCMpFHCZgrXArXN7HWQ.ttf",
      regular: "http://fonts.gstatic.com/s/corben/v21/LYjDdGzzklQtCMp9oAlEpVs3VQ.ttf"
    }
  },
  {
    family: "Cormorant Infant",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic"
    ],
    files: {
      300: "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyIU44g9vKiM1sORYSiWeAsLN9951w3_DMrQqcdJrk.ttf",
      500: "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyIU44g9vKiM1sORYSiWeAsLN995wQ2_DMrQqcdJrk.ttf",
      600: "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyIU44g9vKiM1sORYSiWeAsLN995ygx_DMrQqcdJrk.ttf",
      700: "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyIU44g9vKiM1sORYSiWeAsLN9950ww_DMrQqcdJrk.ttf",
      "300italic": "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyKU44g9vKiM1sORYSiWeAsLN997_ItcDEhRoUYNrn_Ig.ttf",
      regular: "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyPU44g9vKiM1sORYSiWeAsLN993_Af2DsAXq4.ttf",
      italic: "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyJU44g9vKiM1sORYSiWeAsLN997_IV3BkFTq4EPw.ttf",
      "500italic": "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyKU44g9vKiM1sORYSiWeAsLN997_ItKDAhRoUYNrn_Ig.ttf",
      "600italic": "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyKU44g9vKiM1sORYSiWeAsLN997_ItBDchRoUYNrn_Ig.ttf",
      "700italic": "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyKU44g9vKiM1sORYSiWeAsLN997_ItYDYhRoUYNrn_Ig.ttf"
    }
  },
  {
    family: "Belleza",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/belleza/v17/0nkoC9_pNeMfhX4BtcbyawzruP8.ttf"
    }
  },
  {
    family: "Annie Use Your Telescope",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/annieuseyourtelescope/v18/daaLSS4tI2qYYl3Jq9s_Hu74xwktnlKxH6osGVGjlDfB3UUVZA.ttf"
    }
  },
  {
    family: "Jua",
    category: "sans-serif",
    subsets: ["korean", "latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/jua/v15/co3KmW9ljjAjc-DZCsKgsg.ttf"
    }
  },
  {
    family: "Bevan",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/bevan/v24/4iCj6KZ0a9NXjF8aUir7tlSJ.ttf",
      italic: "http://fonts.gstatic.com/s/bevan/v24/4iCt6KZ0a9NXjG8YWC7Zs0SJD4U.ttf"
    }
  },
  {
    family: "BioRhyme",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["200", "300", "regular", "700", "800"],
    files: {
      200: "http://fonts.gstatic.com/s/biorhyme/v16/1cX3aULHBpDMsHYW_ESOjnGAq8Sk1PoH.ttf",
      300: "http://fonts.gstatic.com/s/biorhyme/v16/1cX3aULHBpDMsHYW_ETqjXGAq8Sk1PoH.ttf",
      700: "http://fonts.gstatic.com/s/biorhyme/v16/1cX3aULHBpDMsHYW_ET6inGAq8Sk1PoH.ttf",
      800: "http://fonts.gstatic.com/s/biorhyme/v16/1cX3aULHBpDMsHYW_ETmiXGAq8Sk1PoH.ttf",
      regular: "http://fonts.gstatic.com/s/biorhyme/v16/1cXwaULHBpDMsHYW_HxGpVWIgNit.ttf"
    }
  },
  {
    family: "Kiwi Maru",
    category: "serif",
    subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
    variants: ["300", "regular", "500"],
    files: {
      300: "http://fonts.gstatic.com/s/kiwimaru/v14/R70djykGkuuDep-hRg6gNCi0Vxn9R5ShnA.ttf",
      500: "http://fonts.gstatic.com/s/kiwimaru/v14/R70djykGkuuDep-hRg6gbCm0Vxn9R5ShnA.ttf",
      regular: "http://fonts.gstatic.com/s/kiwimaru/v14/R70YjykGkuuDep-hRg6YmACQXzLhTg.ttf"
    }
  },
  {
    family: "Average Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/averagesans/v16/1Ptpg8fLXP2dlAXR-HlJJNJPBdqazVoK4A.ttf"
    }
  },
  {
    family: "Overpass Mono",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      300: "http://fonts.gstatic.com/s/overpassmono/v16/_Xm5-H86tzKDdAPa-KPQZ-AC_COcRycquHlL6EWKokzzXur-SmIr.ttf",
      500: "http://fonts.gstatic.com/s/overpassmono/v16/_Xm5-H86tzKDdAPa-KPQZ-AC_COcRycquHlL6EXmokzzXur-SmIr.ttf",
      600: "http://fonts.gstatic.com/s/overpassmono/v16/_Xm5-H86tzKDdAPa-KPQZ-AC_COcRycquHlL6EUKpUzzXur-SmIr.ttf",
      700: "http://fonts.gstatic.com/s/overpassmono/v16/_Xm5-H86tzKDdAPa-KPQZ-AC_COcRycquHlL6EUzpUzzXur-SmIr.ttf",
      regular: "http://fonts.gstatic.com/s/overpassmono/v16/_Xm5-H86tzKDdAPa-KPQZ-AC_COcRycquHlL6EXUokzzXur-SmIr.ttf"
    }
  },
  {
    family: "Noto Sans Hebrew",
    category: "sans-serif",
    subsets: ["hebrew", "latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXd4utoiJltutR2g.ttf",
      200: "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiX94qtoiJltutR2g.ttf",
      300: "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXKYqtoiJltutR2g.ttf",
      500: "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXRYqtoiJltutR2g.ttf",
      600: "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXqY2toiJltutR2g.ttf",
      700: "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXkI2toiJltutR2g.ttf",
      800: "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiX942toiJltutR2g.ttf",
      900: "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiX3o2toiJltutR2g.ttf",
      regular: "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXd4qtoiJltutR2g.ttf"
    }
  },
  {
    family: "Bellefair",
    category: "serif",
    subsets: ["hebrew", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/bellefair/v14/kJExBuYY6AAuhiXUxG19__A2pOdvDA.ttf"
    }
  },
  {
    family: "Bubblegum Sans",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/bubblegumsans/v20/AYCSpXb_Z9EORv1M5QTjEzMEtdaHzoPPb7R4.ttf"
    }
  },
  {
    family: "Marvel",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/marvel/v16/nwpWtKeoNgBV0qawLXHgB1WmxwkiYQ.ttf",
      regular: "http://fonts.gstatic.com/s/marvel/v16/nwpVtKeoNgBV0qaIkV7ED366zg.ttf",
      italic: "http://fonts.gstatic.com/s/marvel/v16/nwpXtKeoNgBV0qa4k1TALXuqzhA7.ttf",
      "700italic": "http://fonts.gstatic.com/s/marvel/v16/nwpQtKeoNgBV0qa4k2x8Al-i5QwyYdrc.ttf"
    }
  },
  {
    family: "Noto Serif Devanagari",
    category: "serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTA-og-HMUe1u_dv.ttf",
      200: "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTC-ow-HMUe1u_dv.ttf",
      300: "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTBgow-HMUe1u_dv.ttf",
      500: "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTAMow-HMUe1u_dv.ttf",
      600: "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTDgpA-HMUe1u_dv.ttf",
      700: "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTDZpA-HMUe1u_dv.ttf",
      800: "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTC-pA-HMUe1u_dv.ttf",
      900: "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTCXpA-HMUe1u_dv.ttf",
      regular: "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTA-ow-HMUe1u_dv.ttf"
    }
  },
  {
    family: "Rozha One",
    category: "serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/rozhaone/v15/AlZy_zVFtYP12Zncg2khdXf4XB0Tow.ttf"
    }
  },
  {
    family: "Knewave",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/knewave/v14/sykz-yx0lLcxQaSItSq9-trEvlQ.ttf"
    }
  },
  {
    family: "Pattaya",
    category: "sans-serif",
    subsets: ["cyrillic", "latin", "latin-ext", "thai", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/pattaya/v16/ea8ZadcqV_zkHY-XNdCn92ZEmVs.ttf"
    }
  },
  {
    family: "Enriqueta",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "500", "600", "700"],
    files: {
      500: "http://fonts.gstatic.com/s/enriqueta/v17/gokpH6L7AUFrRvV44HVrv2mHmNZEq6TTFw.ttf",
      600: "http://fonts.gstatic.com/s/enriqueta/v17/gokpH6L7AUFrRvV44HVrk26HmNZEq6TTFw.ttf",
      700: "http://fonts.gstatic.com/s/enriqueta/v17/gokpH6L7AUFrRvV44HVr92-HmNZEq6TTFw.ttf",
      regular: "http://fonts.gstatic.com/s/enriqueta/v17/goksH6L7AUFrRvV44HVTS0CjkP1Yog.ttf"
    }
  },
  {
    family: "Lustria",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/lustria/v13/9oRONYodvDEyjuhOrCg5MtPyAcg.ttf"
    }
  },
  {
    family: "Rambla",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      700: "http://fonts.gstatic.com/s/rambla/v13/snfos0ip98hx6mrMn50qPvN4yJuDYQ.ttf",
      regular: "http://fonts.gstatic.com/s/rambla/v13/snfrs0ip98hx6mr0I7IONthkwQ.ttf",
      italic: "http://fonts.gstatic.com/s/rambla/v13/snfps0ip98hx6mrEIbgKFN10wYKa.ttf",
      "700italic": "http://fonts.gstatic.com/s/rambla/v13/snfus0ip98hx6mrEIYC2O_l86p6TYS-Y.ttf"
    }
  },
  {
    family: "Darker Grotesque",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "500", "600", "700", "800", "900"],
    files: {
      300: "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXxpqn7y-XFyZFUB.ttf",
      500: "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXwFqn7y-XFyZFUB.ttf",
      600: "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXzprX7y-XFyZFUB.ttf",
      700: "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXzQrX7y-XFyZFUB.ttf",
      800: "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXy3rX7y-XFyZFUB.ttf",
      900: "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXyerX7y-XFyZFUB.ttf",
      regular: "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXw3qn7y-XFyZFUB.ttf"
    }
  },
  {
    family: "Overlock",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic", "900", "900italic"],
    files: {
      700: "http://fonts.gstatic.com/s/overlock/v17/Z9XSDmdMWRiN1_T9Z7xizcmMvL2L9TLT.ttf",
      900: "http://fonts.gstatic.com/s/overlock/v17/Z9XSDmdMWRiN1_T9Z7xaz8mMvL2L9TLT.ttf",
      regular: "http://fonts.gstatic.com/s/overlock/v17/Z9XVDmdMWRiN1_T9Z4Te4u2El6GC.ttf",
      italic: "http://fonts.gstatic.com/s/overlock/v17/Z9XTDmdMWRiN1_T9Z7Tc6OmmkrGC7Cs.ttf",
      "700italic": "http://fonts.gstatic.com/s/overlock/v17/Z9XQDmdMWRiN1_T9Z7Tc0FWJtrmp8CLTlNs.ttf",
      "900italic": "http://fonts.gstatic.com/s/overlock/v17/Z9XQDmdMWRiN1_T9Z7Tc0G2Ltrmp8CLTlNs.ttf"
    }
  },
  {
    family: "Arizonia",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/arizonia/v21/neIIzCemt4A5qa7mv6WGHK06UY30.ttf"
    }
  },
  {
    family: "Arbutus Slab",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/arbutusslab/v16/oY1Z8e7OuLXkJGbXtr5ba7ZVa68dJlaFAQ.ttf"
    }
  },
  {
    family: "Headland One",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/headlandone/v16/yYLu0hHR2vKnp89Tk1TCq3Tx0PlTeZ3mJA.ttf"
    }
  },
  {
    family: "Noto Serif Display",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic"
    ],
    files: {
      100: "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVpd49gKaDU9hvzC.ttf",
      200: "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVrd4tgKaDU9hvzC.ttf",
      300: "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVoD4tgKaDU9hvzC.ttf",
      500: "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVpv4tgKaDU9hvzC.ttf",
      600: "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVqD5dgKaDU9hvzC.ttf",
      700: "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVq65dgKaDU9hvzC.ttf",
      800: "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVrd5dgKaDU9hvzC.ttf",
      900: "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVr05dgKaDU9hvzC.ttf",
      regular: "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVpd4tgKaDU9hvzC.ttf",
      "100italic": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VoTBIYjEfg-zCmf4.ttf",
      "200italic": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VobBJYjEfg-zCmf4.ttf",
      "300italic": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VoW5JYjEfg-zCmf4.ttf",
      italic: "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VoTBJYjEfg-zCmf4.ttf",
      "500italic": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VoQJJYjEfg-zCmf4.ttf",
      "600italic": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-Voe5OYjEfg-zCmf4.ttf",
      "700italic": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VoddOYjEfg-zCmf4.ttf",
      "800italic": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VobBOYjEfg-zCmf4.ttf",
      "900italic": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VoZlOYjEfg-zCmf4.ttf"
    }
  },
  {
    family: "Do Hyeon",
    category: "sans-serif",
    subsets: ["korean", "latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/dohyeon/v18/TwMN-I8CRRU2zM86HFE3ZwaH__-C.ttf"
    }
  },
  {
    family: "Alike",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/alike/v20/HI_EiYEYI6BIoEjBSZXAQ4-d.ttf"
    }
  },
  {
    family: "Coming Soon",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/comingsoon/v19/qWcuB6mzpYL7AJ2VfdQR1u-SUjjzsykh.ttf"
    }
  },
  {
    family: "Cedarville Cursive",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/cedarvillecursive/v17/yYL00g_a2veiudhUmxjo5VKkoqA-B_neJbBxw8BeTg.ttf"
    }
  },
  {
    family: "Marcellus SC",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/marcellussc/v13/ke8iOgUHP1dg-Rmi6RWjbLEPgdydGKikhA.ttf"
    }
  },
  {
    family: "Rubik Moonrocks",
    category: "display",
    subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/rubikmoonrocks/v5/845ANMAmAI2VUZMLu_W0M7HqlDHnXcD7JGy1Sw.ttf"
    }
  },
  {
    family: "Niconne",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/niconne/v15/w8gaH2QvRug1_rTfrQut2F4OuOo.ttf"
    }
  },
  {
    family: "Padauk",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "myanmar"],
    variants: ["regular", "700"],
    files: {
      700: "http://fonts.gstatic.com/s/padauk/v16/RrQSboJg-id7Onb512DE1JJEZ4YwGg.ttf",
      regular: "http://fonts.gstatic.com/s/padauk/v16/RrQRboJg-id7OnbBa0_g3LlYbg.ttf"
    }
  },
  {
    family: "Biryani",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["200", "300", "regular", "600", "700", "800", "900"],
    files: {
      200: "http://fonts.gstatic.com/s/biryani/v13/hv-TlzNxIFoO84YddYQyGTBSU-J-RxQ.ttf",
      300: "http://fonts.gstatic.com/s/biryani/v13/hv-TlzNxIFoO84YddeAxGTBSU-J-RxQ.ttf",
      600: "http://fonts.gstatic.com/s/biryani/v13/hv-TlzNxIFoO84YddZQ3GTBSU-J-RxQ.ttf",
      700: "http://fonts.gstatic.com/s/biryani/v13/hv-TlzNxIFoO84YddfA2GTBSU-J-RxQ.ttf",
      800: "http://fonts.gstatic.com/s/biryani/v13/hv-TlzNxIFoO84Yddew1GTBSU-J-RxQ.ttf",
      900: "http://fonts.gstatic.com/s/biryani/v13/hv-TlzNxIFoO84Yddcg0GTBSU-J-RxQ.ttf",
      regular: "http://fonts.gstatic.com/s/biryani/v13/hv-WlzNxIFoO84YdTUwZPTh5T-s.ttf"
    }
  },
  {
    family: "Hanuman",
    category: "serif",
    subsets: ["khmer", "latin"],
    variants: ["100", "300", "regular", "700", "900"],
    files: {
      100: "http://fonts.gstatic.com/s/hanuman/v22/VuJzdNvD15HhpJJBQMLdPKNiaRpFvg.ttf",
      300: "http://fonts.gstatic.com/s/hanuman/v22/VuJ0dNvD15HhpJJBQAr_HIlMZRNcp0o.ttf",
      700: "http://fonts.gstatic.com/s/hanuman/v22/VuJ0dNvD15HhpJJBQBr4HIlMZRNcp0o.ttf",
      900: "http://fonts.gstatic.com/s/hanuman/v22/VuJ0dNvD15HhpJJBQCL6HIlMZRNcp0o.ttf",
      regular: "http://fonts.gstatic.com/s/hanuman/v22/VuJxdNvD15HhpJJBeKbXOIFneRo.ttf"
    }
  }
], ef = (a, t) => {
  const e = Zo.find((s) => s.family === a);
  return e ? Object.entries(e.files).filter(([s]) => t.includes(s)).map(([, s]) => s) : [];
}, sf = [
  {
    id: "af",
    name: "Afrikaans",
    editorCode: "af",
    locale: "af-ZA"
  },
  {
    id: "sq",
    name: "Albanian",
    editorCode: "sq",
    locale: "sq-AL"
  },
  {
    id: "am",
    name: "Amharic",
    editorCode: "am",
    locale: "am-ET"
  },
  {
    id: "ar",
    name: "Arabic",
    editorCode: "ar",
    locale: "ar-SA"
  },
  {
    id: "bn",
    name: "Bengali",
    editorCode: "bn",
    locale: "bn-BD"
  },
  {
    id: "bg",
    name: "Bulgarian",
    editorCode: "bg",
    locale: "bg-BG"
  },
  {
    id: "ca",
    name: "Catalan",
    editorCode: "ca",
    locale: "ca-ES"
  },
  {
    id: "zh-CN",
    name: "Chinese Simplified",
    editorCode: "zhcn",
    locale: "zh-CN"
  },
  {
    id: "zh-TW",
    name: "Chinese Traditional",
    editorCode: "zhtw",
    locale: "zh-TW"
  },
  {
    id: "cs",
    name: "Czech",
    editorCode: "cs",
    locale: "cs-CZ"
  },
  {
    id: "da",
    name: "Danish",
    editorCode: "da",
    locale: "da-DK"
  },
  {
    id: "nl",
    name: "Dutch",
    editorCode: "nl",
    locale: "nl-NL"
  },
  {
    id: "en-US",
    name: "English",
    editorCode: "en",
    locale: "en-US"
  },
  {
    id: "fi",
    name: "Finnish",
    editorCode: "fi",
    locale: "fi-FI"
  },
  {
    id: "fr",
    name: "French",
    editorCode: "fr",
    locale: "fr-FR"
  },
  {
    id: "de",
    name: "German",
    editorCode: "de",
    locale: "de-DE"
  },
  {
    id: "el",
    name: "Greek",
    editorCode: "el",
    locale: "el-GR"
  },
  {
    id: "he",
    name: "Hebrew",
    editorCode: "he",
    locale: "he-IL"
  },
  {
    id: "hi",
    name: "Hindi",
    editorCode: "hi",
    locale: "hi-IN"
  },
  {
    id: "hu",
    name: "Hungarian",
    editorCode: "hu",
    locale: "hu-HU"
  },
  {
    id: "id",
    name: "Indonesian",
    editorCode: "id",
    locale: "id-ID"
  },
  {
    id: "it",
    name: "Italian",
    editorCode: "it",
    locale: "it-IT"
  },
  {
    id: "ja",
    name: "Japanese",
    editorCode: "ja",
    locale: "ja-JP"
  },
  {
    id: "kn",
    name: "Kannada",
    editorCode: "kn",
    locale: "kn-IN"
  },
  {
    id: "km",
    name: "Khmer",
    editorCode: "km",
    locale: "km-KH"
  },
  {
    id: "ko",
    name: "Korean",
    editorCode: "ko",
    locale: "ko-KR"
  },
  {
    id: "lv",
    name: "Latvian",
    editorCode: "lv",
    locale: "lv-LV"
  },
  {
    id: "lt",
    name: "Lithuanian",
    editorCode: "lt",
    locale: "lt-LT"
  },
  {
    id: "ms",
    name: "Malay",
    editorCode: "ms",
    locale: "ms-MY"
  },
  {
    id: "ml-IN",
    name: "Malayalam",
    editorCode: "mlin",
    locale: "ml-IN"
  },
  {
    id: "mr",
    name: "Marathi",
    editorCode: "mr",
    locale: "mr-IN"
  },
  {
    id: "ne-NP",
    name: "Nepali",
    editorCode: "nenp",
    locale: "ne-NP"
  },
  {
    id: "no",
    name: "Norwegian",
    editorCode: "no",
    locale: "no-NO"
  },
  {
    id: "or",
    name: "Odia",
    editorCode: "or",
    locale: "or-IN"
  },
  {
    id: "fa",
    name: "Persian",
    editorCode: "fa",
    locale: "fa-IR"
  },
  {
    id: "pl",
    name: "Polish",
    editorCode: "pl",
    locale: "pl-PL"
  },
  {
    id: "pt-PT",
    name: "Portuguese",
    editorCode: "pt",
    locale: "pt-PT"
  },
  {
    id: "pt-BR",
    name: "Portuguese, Brazilian",
    editorCode: "ptbr",
    locale: "pt-BR"
  },
  {
    id: "ro",
    name: "Romanian",
    editorCode: "ro",
    locale: "ro-RO"
  },
  {
    id: "ru",
    name: "Russian",
    editorCode: "ru",
    locale: "ru-RU"
  },
  {
    id: "sr",
    name: "Serbian (Cyrillic)",
    editorCode: "sr",
    locale: "sr-SP"
  },
  {
    id: "es-ES",
    name: "Spanish",
    editorCode: "es",
    locale: "es-ES"
  },
  {
    id: "sv-SE",
    name: "Swedish",
    editorCode: "sv",
    locale: "sv-SE"
  },
  {
    id: "ta",
    name: "Tamil",
    editorCode: "ta",
    locale: "ta-IN"
  },
  {
    id: "te",
    name: "Telugu",
    editorCode: "te",
    locale: "te-IN"
  },
  {
    id: "th",
    name: "Thai",
    editorCode: "th",
    locale: "th-TH"
  },
  {
    id: "tr",
    name: "Turkish",
    editorCode: "tr",
    locale: "tr-TR"
  },
  {
    id: "uk",
    name: "Ukrainian",
    editorCode: "uk",
    locale: "uk-UA"
  },
  {
    id: "uz",
    name: "Uzbek",
    editorCode: "uz",
    locale: "uz-UZ"
  },
  {
    id: "vi",
    name: "Vietnamese",
    editorCode: "vi",
    locale: "vi-VN"
  }
], af = (a, t, e, s, i) => e === t ? a === e ? s : Number.NaN : (a - t) * (i - s) / (e - t) + s, nf = (a, t) => a && Object.fromEntries(
  Object.entries(a).filter(([e]) => !t.includes(e))
), rf = {
  a4: {
    width: 210,
    height: 297
  },
  letter: {
    width: 216,
    height: 279
  }
}, of = (a) => new Promise((t) => setTimeout(t, a));
var on = {}, cs = {}, Ba = {}, us = {}, qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
qa.default = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(function(a) {
    return a.charCodeAt(0);
  })
);
var Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
Ua.default = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(function(a) {
    return a.charCodeAt(0);
  })
);
var wa = {};
(function(a) {
  var t;
  Object.defineProperty(a, "__esModule", { value: !0 }), a.replaceCodePoint = a.fromCodePoint = void 0;
  var e = /* @__PURE__ */ new Map([
    [0, 65533],
    // C1 Unicode control character reference replacements
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376]
  ]);
  a.fromCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (t = String.fromCodePoint) !== null && t !== void 0 ? t : function(n) {
    var r = "";
    return n > 65535 && (n -= 65536, r += String.fromCharCode(n >>> 10 & 1023 | 55296), n = 56320 | n & 1023), r += String.fromCharCode(n), r;
  };
  function s(n) {
    var r;
    return n >= 55296 && n <= 57343 || n > 1114111 ? 65533 : (r = e.get(n)) !== null && r !== void 0 ? r : n;
  }
  a.replaceCodePoint = s;
  function i(n) {
    return (0, a.fromCodePoint)(s(n));
  }
  a.default = i;
})(wa);
(function(a) {
  var t = X && X.__createBinding || (Object.create ? function(h, y, E, A) {
    A === void 0 && (A = E);
    var g = Object.getOwnPropertyDescriptor(y, E);
    (!g || ("get" in g ? !y.__esModule : g.writable || g.configurable)) && (g = { enumerable: !0, get: function() {
      return y[E];
    } }), Object.defineProperty(h, A, g);
  } : function(h, y, E, A) {
    A === void 0 && (A = E), h[A] = y[E];
  }), e = X && X.__setModuleDefault || (Object.create ? function(h, y) {
    Object.defineProperty(h, "default", { enumerable: !0, value: y });
  } : function(h, y) {
    h.default = y;
  }), s = X && X.__importStar || function(h) {
    if (h && h.__esModule) return h;
    var y = {};
    if (h != null) for (var E in h) E !== "default" && Object.prototype.hasOwnProperty.call(h, E) && t(y, h, E);
    return e(y, h), y;
  }, i = X && X.__importDefault || function(h) {
    return h && h.__esModule ? h : { default: h };
  };
  Object.defineProperty(a, "__esModule", { value: !0 }), a.decodeXML = a.decodeHTMLStrict = a.decodeHTMLAttribute = a.decodeHTML = a.determineBranch = a.EntityDecoder = a.DecodingMode = a.BinTrieFlags = a.fromCodePoint = a.replaceCodePoint = a.decodeCodePoint = a.xmlDecodeTree = a.htmlDecodeTree = void 0;
  var n = i(qa);
  a.htmlDecodeTree = n.default;
  var r = i(Ua);
  a.xmlDecodeTree = r.default;
  var o = s(wa);
  a.decodeCodePoint = o.default;
  var c = wa;
  Object.defineProperty(a, "replaceCodePoint", { enumerable: !0, get: function() {
    return c.replaceCodePoint;
  } }), Object.defineProperty(a, "fromCodePoint", { enumerable: !0, get: function() {
    return c.fromCodePoint;
  } });
  var u;
  (function(h) {
    h[h.NUM = 35] = "NUM", h[h.SEMI = 59] = "SEMI", h[h.EQUALS = 61] = "EQUALS", h[h.ZERO = 48] = "ZERO", h[h.NINE = 57] = "NINE", h[h.LOWER_A = 97] = "LOWER_A", h[h.LOWER_F = 102] = "LOWER_F", h[h.LOWER_X = 120] = "LOWER_X", h[h.LOWER_Z = 122] = "LOWER_Z", h[h.UPPER_A = 65] = "UPPER_A", h[h.UPPER_F = 70] = "UPPER_F", h[h.UPPER_Z = 90] = "UPPER_Z";
  })(u || (u = {}));
  var d = 32, _;
  (function(h) {
    h[h.VALUE_LENGTH = 49152] = "VALUE_LENGTH", h[h.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", h[h.JUMP_TABLE = 127] = "JUMP_TABLE";
  })(_ = a.BinTrieFlags || (a.BinTrieFlags = {}));
  function l(h) {
    return h >= u.ZERO && h <= u.NINE;
  }
  function f(h) {
    return h >= u.UPPER_A && h <= u.UPPER_F || h >= u.LOWER_A && h <= u.LOWER_F;
  }
  function N(h) {
    return h >= u.UPPER_A && h <= u.UPPER_Z || h >= u.LOWER_A && h <= u.LOWER_Z || l(h);
  }
  function F(h) {
    return h === u.EQUALS || N(h);
  }
  var k;
  (function(h) {
    h[h.EntityStart = 0] = "EntityStart", h[h.NumericStart = 1] = "NumericStart", h[h.NumericDecimal = 2] = "NumericDecimal", h[h.NumericHex = 3] = "NumericHex", h[h.NamedEntity = 4] = "NamedEntity";
  })(k || (k = {}));
  var O;
  (function(h) {
    h[h.Legacy = 0] = "Legacy", h[h.Strict = 1] = "Strict", h[h.Attribute = 2] = "Attribute";
  })(O = a.DecodingMode || (a.DecodingMode = {}));
  var R = (
    /** @class */
    function() {
      function h(y, E, A) {
        this.decodeTree = y, this.emitCodePoint = E, this.errors = A, this.state = k.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = O.Strict;
      }
      return h.prototype.startEntity = function(y) {
        this.decodeMode = y, this.state = k.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
      }, h.prototype.write = function(y, E) {
        switch (this.state) {
          case k.EntityStart:
            return y.charCodeAt(E) === u.NUM ? (this.state = k.NumericStart, this.consumed += 1, this.stateNumericStart(y, E + 1)) : (this.state = k.NamedEntity, this.stateNamedEntity(y, E));
          case k.NumericStart:
            return this.stateNumericStart(y, E);
          case k.NumericDecimal:
            return this.stateNumericDecimal(y, E);
          case k.NumericHex:
            return this.stateNumericHex(y, E);
          case k.NamedEntity:
            return this.stateNamedEntity(y, E);
        }
      }, h.prototype.stateNumericStart = function(y, E) {
        return E >= y.length ? -1 : (y.charCodeAt(E) | d) === u.LOWER_X ? (this.state = k.NumericHex, this.consumed += 1, this.stateNumericHex(y, E + 1)) : (this.state = k.NumericDecimal, this.stateNumericDecimal(y, E));
      }, h.prototype.addToNumericResult = function(y, E, A, g) {
        if (E !== A) {
          var b = A - E;
          this.result = this.result * Math.pow(g, b) + parseInt(y.substr(E, b), g), this.consumed += b;
        }
      }, h.prototype.stateNumericHex = function(y, E) {
        for (var A = E; E < y.length; ) {
          var g = y.charCodeAt(E);
          if (l(g) || f(g))
            E += 1;
          else
            return this.addToNumericResult(y, A, E, 16), this.emitNumericEntity(g, 3);
        }
        return this.addToNumericResult(y, A, E, 16), -1;
      }, h.prototype.stateNumericDecimal = function(y, E) {
        for (var A = E; E < y.length; ) {
          var g = y.charCodeAt(E);
          if (l(g))
            E += 1;
          else
            return this.addToNumericResult(y, A, E, 10), this.emitNumericEntity(g, 2);
        }
        return this.addToNumericResult(y, A, E, 10), -1;
      }, h.prototype.emitNumericEntity = function(y, E) {
        var A;
        if (this.consumed <= E)
          return (A = this.errors) === null || A === void 0 || A.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
        if (y === u.SEMI)
          this.consumed += 1;
        else if (this.decodeMode === O.Strict)
          return 0;
        return this.emitCodePoint((0, o.replaceCodePoint)(this.result), this.consumed), this.errors && (y !== u.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
      }, h.prototype.stateNamedEntity = function(y, E) {
        for (var A = this.decodeTree, g = A[this.treeIndex], b = (g & _.VALUE_LENGTH) >> 14; E < y.length; E++, this.excess++) {
          var m = y.charCodeAt(E);
          if (this.treeIndex = q(A, g, this.treeIndex + Math.max(1, b), m), this.treeIndex < 0)
            return this.result === 0 || // If we are parsing an attribute
            this.decodeMode === O.Attribute && // We shouldn't have consumed any characters after the entity,
            (b === 0 || // And there should be no invalid characters.
            F(m)) ? 0 : this.emitNotTerminatedNamedEntity();
          if (g = A[this.treeIndex], b = (g & _.VALUE_LENGTH) >> 14, b !== 0) {
            if (m === u.SEMI)
              return this.emitNamedEntityData(this.treeIndex, b, this.consumed + this.excess);
            this.decodeMode !== O.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
          }
        }
        return -1;
      }, h.prototype.emitNotTerminatedNamedEntity = function() {
        var y, E = this, A = E.result, g = E.decodeTree, b = (g[A] & _.VALUE_LENGTH) >> 14;
        return this.emitNamedEntityData(A, b, this.consumed), (y = this.errors) === null || y === void 0 || y.missingSemicolonAfterCharacterReference(), this.consumed;
      }, h.prototype.emitNamedEntityData = function(y, E, A) {
        var g = this.decodeTree;
        return this.emitCodePoint(E === 1 ? g[y] & ~_.VALUE_LENGTH : g[y + 1], A), E === 3 && this.emitCodePoint(g[y + 2], A), A;
      }, h.prototype.end = function() {
        var y;
        switch (this.state) {
          case k.NamedEntity:
            return this.result !== 0 && (this.decodeMode !== O.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
          case k.NumericDecimal:
            return this.emitNumericEntity(0, 2);
          case k.NumericHex:
            return this.emitNumericEntity(0, 3);
          case k.NumericStart:
            return (y = this.errors) === null || y === void 0 || y.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
          case k.EntityStart:
            return 0;
        }
      }, h;
    }()
  );
  a.EntityDecoder = R;
  function U(h) {
    var y = "", E = new R(h, function(A) {
      return y += (0, o.fromCodePoint)(A);
    });
    return function(g, b) {
      for (var m = 0, x = 0; (x = g.indexOf("&", x)) >= 0; ) {
        y += g.slice(m, x), E.startEntity(b);
        var S = E.write(
          g,
          // Skip the "&"
          x + 1
        );
        if (S < 0) {
          m = x + E.end();
          break;
        }
        m = x + S, x = S === 0 ? m + 1 : m;
      }
      var M = y + g.slice(m);
      return y = "", M;
    };
  }
  function q(h, y, E, A) {
    var g = (y & _.BRANCH_LENGTH) >> 7, b = y & _.JUMP_TABLE;
    if (g === 0)
      return b !== 0 && A === b ? E : -1;
    if (b) {
      var m = A - b;
      return m < 0 || m >= g ? -1 : h[E + m] - 1;
    }
    for (var x = E, S = x + g - 1; x <= S; ) {
      var M = x + S >>> 1, C = h[M];
      if (C < A)
        x = M + 1;
      else if (C > A)
        S = M - 1;
      else
        return h[M + g];
    }
    return -1;
  }
  a.determineBranch = q;
  var G = U(n.default), it = U(r.default);
  function z(h, y) {
    return y === void 0 && (y = O.Legacy), G(h, y);
  }
  a.decodeHTML = z;
  function p(h) {
    return G(h, O.Attribute);
  }
  a.decodeHTMLAttribute = p;
  function v(h) {
    return G(h, O.Strict);
  }
  a.decodeHTMLStrict = v;
  function w(h) {
    return it(h, O.Strict);
  }
  a.decodeXML = w;
})(us);
(function(a) {
  Object.defineProperty(a, "__esModule", { value: !0 }), a.QuoteType = void 0;
  var t = us, e;
  (function(l) {
    l[l.Tab = 9] = "Tab", l[l.NewLine = 10] = "NewLine", l[l.FormFeed = 12] = "FormFeed", l[l.CarriageReturn = 13] = "CarriageReturn", l[l.Space = 32] = "Space", l[l.ExclamationMark = 33] = "ExclamationMark", l[l.Number = 35] = "Number", l[l.Amp = 38] = "Amp", l[l.SingleQuote = 39] = "SingleQuote", l[l.DoubleQuote = 34] = "DoubleQuote", l[l.Dash = 45] = "Dash", l[l.Slash = 47] = "Slash", l[l.Zero = 48] = "Zero", l[l.Nine = 57] = "Nine", l[l.Semi = 59] = "Semi", l[l.Lt = 60] = "Lt", l[l.Eq = 61] = "Eq", l[l.Gt = 62] = "Gt", l[l.Questionmark = 63] = "Questionmark", l[l.UpperA = 65] = "UpperA", l[l.LowerA = 97] = "LowerA", l[l.UpperF = 70] = "UpperF", l[l.LowerF = 102] = "LowerF", l[l.UpperZ = 90] = "UpperZ", l[l.LowerZ = 122] = "LowerZ", l[l.LowerX = 120] = "LowerX", l[l.OpeningSquareBracket = 91] = "OpeningSquareBracket";
  })(e || (e = {}));
  var s;
  (function(l) {
    l[l.Text = 1] = "Text", l[l.BeforeTagName = 2] = "BeforeTagName", l[l.InTagName = 3] = "InTagName", l[l.InSelfClosingTag = 4] = "InSelfClosingTag", l[l.BeforeClosingTagName = 5] = "BeforeClosingTagName", l[l.InClosingTagName = 6] = "InClosingTagName", l[l.AfterClosingTagName = 7] = "AfterClosingTagName", l[l.BeforeAttributeName = 8] = "BeforeAttributeName", l[l.InAttributeName = 9] = "InAttributeName", l[l.AfterAttributeName = 10] = "AfterAttributeName", l[l.BeforeAttributeValue = 11] = "BeforeAttributeValue", l[l.InAttributeValueDq = 12] = "InAttributeValueDq", l[l.InAttributeValueSq = 13] = "InAttributeValueSq", l[l.InAttributeValueNq = 14] = "InAttributeValueNq", l[l.BeforeDeclaration = 15] = "BeforeDeclaration", l[l.InDeclaration = 16] = "InDeclaration", l[l.InProcessingInstruction = 17] = "InProcessingInstruction", l[l.BeforeComment = 18] = "BeforeComment", l[l.CDATASequence = 19] = "CDATASequence", l[l.InSpecialComment = 20] = "InSpecialComment", l[l.InCommentLike = 21] = "InCommentLike", l[l.BeforeSpecialS = 22] = "BeforeSpecialS", l[l.SpecialStartSequence = 23] = "SpecialStartSequence", l[l.InSpecialTag = 24] = "InSpecialTag", l[l.BeforeEntity = 25] = "BeforeEntity", l[l.BeforeNumericEntity = 26] = "BeforeNumericEntity", l[l.InNamedEntity = 27] = "InNamedEntity", l[l.InNumericEntity = 28] = "InNumericEntity", l[l.InHexEntity = 29] = "InHexEntity";
  })(s || (s = {}));
  function i(l) {
    return l === e.Space || l === e.NewLine || l === e.Tab || l === e.FormFeed || l === e.CarriageReturn;
  }
  function n(l) {
    return l === e.Slash || l === e.Gt || i(l);
  }
  function r(l) {
    return l >= e.Zero && l <= e.Nine;
  }
  function o(l) {
    return l >= e.LowerA && l <= e.LowerZ || l >= e.UpperA && l <= e.UpperZ;
  }
  function c(l) {
    return l >= e.UpperA && l <= e.UpperF || l >= e.LowerA && l <= e.LowerF;
  }
  var u;
  (function(l) {
    l[l.NoValue = 0] = "NoValue", l[l.Unquoted = 1] = "Unquoted", l[l.Single = 2] = "Single", l[l.Double = 3] = "Double";
  })(u = a.QuoteType || (a.QuoteType = {}));
  var d = {
    Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
    CdataEnd: new Uint8Array([93, 93, 62]),
    CommentEnd: new Uint8Array([45, 45, 62]),
    ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
    StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
    TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101])
    // `</title`
  }, _ = (
    /** @class */
    function() {
      function l(f, N) {
        var F = f.xmlMode, k = F === void 0 ? !1 : F, O = f.decodeEntities, R = O === void 0 ? !0 : O;
        this.cbs = N, this.state = s.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = s.Text, this.isSpecial = !1, this.running = !0, this.offset = 0, this.currentSequence = void 0, this.sequenceIndex = 0, this.trieIndex = 0, this.trieCurrent = 0, this.entityResult = 0, this.entityExcess = 0, this.xmlMode = k, this.decodeEntities = R, this.entityTrie = k ? t.xmlDecodeTree : t.htmlDecodeTree;
      }
      return l.prototype.reset = function() {
        this.state = s.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = s.Text, this.currentSequence = void 0, this.running = !0, this.offset = 0;
      }, l.prototype.write = function(f) {
        this.offset += this.buffer.length, this.buffer = f, this.parse();
      }, l.prototype.end = function() {
        this.running && this.finish();
      }, l.prototype.pause = function() {
        this.running = !1;
      }, l.prototype.resume = function() {
        this.running = !0, this.index < this.buffer.length + this.offset && this.parse();
      }, l.prototype.getIndex = function() {
        return this.index;
      }, l.prototype.getSectionStart = function() {
        return this.sectionStart;
      }, l.prototype.stateText = function(f) {
        f === e.Lt || !this.decodeEntities && this.fastForwardTo(e.Lt) ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = s.BeforeTagName, this.sectionStart = this.index) : this.decodeEntities && f === e.Amp && (this.state = s.BeforeEntity);
      }, l.prototype.stateSpecialStartSequence = function(f) {
        var N = this.sequenceIndex === this.currentSequence.length, F = N ? (
          // If we are at the end of the sequence, make sure the tag name has ended
          n(f)
        ) : (
          // Otherwise, do a case-insensitive comparison
          (f | 32) === this.currentSequence[this.sequenceIndex]
        );
        if (!F)
          this.isSpecial = !1;
        else if (!N) {
          this.sequenceIndex++;
          return;
        }
        this.sequenceIndex = 0, this.state = s.InTagName, this.stateInTagName(f);
      }, l.prototype.stateInSpecialTag = function(f) {
        if (this.sequenceIndex === this.currentSequence.length) {
          if (f === e.Gt || i(f)) {
            var N = this.index - this.currentSequence.length;
            if (this.sectionStart < N) {
              var F = this.index;
              this.index = N, this.cbs.ontext(this.sectionStart, N), this.index = F;
            }
            this.isSpecial = !1, this.sectionStart = N + 2, this.stateInClosingTagName(f);
            return;
          }
          this.sequenceIndex = 0;
        }
        (f | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === d.TitleEnd ? this.decodeEntities && f === e.Amp && (this.state = s.BeforeEntity) : this.fastForwardTo(e.Lt) && (this.sequenceIndex = 1) : this.sequenceIndex = +(f === e.Lt);
      }, l.prototype.stateCDATASequence = function(f) {
        f === d.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === d.Cdata.length && (this.state = s.InCommentLike, this.currentSequence = d.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = s.InDeclaration, this.stateInDeclaration(f));
      }, l.prototype.fastForwardTo = function(f) {
        for (; ++this.index < this.buffer.length + this.offset; )
          if (this.buffer.charCodeAt(this.index - this.offset) === f)
            return !0;
        return this.index = this.buffer.length + this.offset - 1, !1;
      }, l.prototype.stateInCommentLike = function(f) {
        f === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === d.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index, 2) : this.cbs.oncomment(this.sectionStart, this.index, 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = s.Text) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : f !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
      }, l.prototype.isTagStartChar = function(f) {
        return this.xmlMode ? !n(f) : o(f);
      }, l.prototype.startSpecial = function(f, N) {
        this.isSpecial = !0, this.currentSequence = f, this.sequenceIndex = N, this.state = s.SpecialStartSequence;
      }, l.prototype.stateBeforeTagName = function(f) {
        if (f === e.ExclamationMark)
          this.state = s.BeforeDeclaration, this.sectionStart = this.index + 1;
        else if (f === e.Questionmark)
          this.state = s.InProcessingInstruction, this.sectionStart = this.index + 1;
        else if (this.isTagStartChar(f)) {
          var N = f | 32;
          this.sectionStart = this.index, !this.xmlMode && N === d.TitleEnd[2] ? this.startSpecial(d.TitleEnd, 3) : this.state = !this.xmlMode && N === d.ScriptEnd[2] ? s.BeforeSpecialS : s.InTagName;
        } else f === e.Slash ? this.state = s.BeforeClosingTagName : (this.state = s.Text, this.stateText(f));
      }, l.prototype.stateInTagName = function(f) {
        n(f) && (this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = s.BeforeAttributeName, this.stateBeforeAttributeName(f));
      }, l.prototype.stateBeforeClosingTagName = function(f) {
        i(f) || (f === e.Gt ? this.state = s.Text : (this.state = this.isTagStartChar(f) ? s.InClosingTagName : s.InSpecialComment, this.sectionStart = this.index));
      }, l.prototype.stateInClosingTagName = function(f) {
        (f === e.Gt || i(f)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = s.AfterClosingTagName, this.stateAfterClosingTagName(f));
      }, l.prototype.stateAfterClosingTagName = function(f) {
        (f === e.Gt || this.fastForwardTo(e.Gt)) && (this.state = s.Text, this.baseState = s.Text, this.sectionStart = this.index + 1);
      }, l.prototype.stateBeforeAttributeName = function(f) {
        f === e.Gt ? (this.cbs.onopentagend(this.index), this.isSpecial ? (this.state = s.InSpecialTag, this.sequenceIndex = 0) : this.state = s.Text, this.baseState = this.state, this.sectionStart = this.index + 1) : f === e.Slash ? this.state = s.InSelfClosingTag : i(f) || (this.state = s.InAttributeName, this.sectionStart = this.index);
      }, l.prototype.stateInSelfClosingTag = function(f) {
        f === e.Gt ? (this.cbs.onselfclosingtag(this.index), this.state = s.Text, this.baseState = s.Text, this.sectionStart = this.index + 1, this.isSpecial = !1) : i(f) || (this.state = s.BeforeAttributeName, this.stateBeforeAttributeName(f));
      }, l.prototype.stateInAttributeName = function(f) {
        (f === e.Eq || n(f)) && (this.cbs.onattribname(this.sectionStart, this.index), this.sectionStart = -1, this.state = s.AfterAttributeName, this.stateAfterAttributeName(f));
      }, l.prototype.stateAfterAttributeName = function(f) {
        f === e.Eq ? this.state = s.BeforeAttributeValue : f === e.Slash || f === e.Gt ? (this.cbs.onattribend(u.NoValue, this.index), this.state = s.BeforeAttributeName, this.stateBeforeAttributeName(f)) : i(f) || (this.cbs.onattribend(u.NoValue, this.index), this.state = s.InAttributeName, this.sectionStart = this.index);
      }, l.prototype.stateBeforeAttributeValue = function(f) {
        f === e.DoubleQuote ? (this.state = s.InAttributeValueDq, this.sectionStart = this.index + 1) : f === e.SingleQuote ? (this.state = s.InAttributeValueSq, this.sectionStart = this.index + 1) : i(f) || (this.sectionStart = this.index, this.state = s.InAttributeValueNq, this.stateInAttributeValueNoQuotes(f));
      }, l.prototype.handleInAttributeValue = function(f, N) {
        f === N || !this.decodeEntities && this.fastForwardTo(N) ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(N === e.DoubleQuote ? u.Double : u.Single, this.index), this.state = s.BeforeAttributeName) : this.decodeEntities && f === e.Amp && (this.baseState = this.state, this.state = s.BeforeEntity);
      }, l.prototype.stateInAttributeValueDoubleQuotes = function(f) {
        this.handleInAttributeValue(f, e.DoubleQuote);
      }, l.prototype.stateInAttributeValueSingleQuotes = function(f) {
        this.handleInAttributeValue(f, e.SingleQuote);
      }, l.prototype.stateInAttributeValueNoQuotes = function(f) {
        i(f) || f === e.Gt ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(u.Unquoted, this.index), this.state = s.BeforeAttributeName, this.stateBeforeAttributeName(f)) : this.decodeEntities && f === e.Amp && (this.baseState = this.state, this.state = s.BeforeEntity);
      }, l.prototype.stateBeforeDeclaration = function(f) {
        f === e.OpeningSquareBracket ? (this.state = s.CDATASequence, this.sequenceIndex = 0) : this.state = f === e.Dash ? s.BeforeComment : s.InDeclaration;
      }, l.prototype.stateInDeclaration = function(f) {
        (f === e.Gt || this.fastForwardTo(e.Gt)) && (this.cbs.ondeclaration(this.sectionStart, this.index), this.state = s.Text, this.sectionStart = this.index + 1);
      }, l.prototype.stateInProcessingInstruction = function(f) {
        (f === e.Gt || this.fastForwardTo(e.Gt)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = s.Text, this.sectionStart = this.index + 1);
      }, l.prototype.stateBeforeComment = function(f) {
        f === e.Dash ? (this.state = s.InCommentLike, this.currentSequence = d.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = s.InDeclaration;
      }, l.prototype.stateInSpecialComment = function(f) {
        (f === e.Gt || this.fastForwardTo(e.Gt)) && (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = s.Text, this.sectionStart = this.index + 1);
      }, l.prototype.stateBeforeSpecialS = function(f) {
        var N = f | 32;
        N === d.ScriptEnd[3] ? this.startSpecial(d.ScriptEnd, 4) : N === d.StyleEnd[3] ? this.startSpecial(d.StyleEnd, 4) : (this.state = s.InTagName, this.stateInTagName(f));
      }, l.prototype.stateBeforeEntity = function(f) {
        this.entityExcess = 1, this.entityResult = 0, f === e.Number ? this.state = s.BeforeNumericEntity : f === e.Amp || (this.trieIndex = 0, this.trieCurrent = this.entityTrie[0], this.state = s.InNamedEntity, this.stateInNamedEntity(f));
      }, l.prototype.stateInNamedEntity = function(f) {
        if (this.entityExcess += 1, this.trieIndex = (0, t.determineBranch)(this.entityTrie, this.trieCurrent, this.trieIndex + 1, f), this.trieIndex < 0) {
          this.emitNamedEntity(), this.index--;
          return;
        }
        this.trieCurrent = this.entityTrie[this.trieIndex];
        var N = this.trieCurrent & t.BinTrieFlags.VALUE_LENGTH;
        if (N) {
          var F = (N >> 14) - 1;
          if (!this.allowLegacyEntity() && f !== e.Semi)
            this.trieIndex += F;
          else {
            var k = this.index - this.entityExcess + 1;
            k > this.sectionStart && this.emitPartial(this.sectionStart, k), this.entityResult = this.trieIndex, this.trieIndex += F, this.entityExcess = 0, this.sectionStart = this.index + 1, F === 0 && this.emitNamedEntity();
          }
        }
      }, l.prototype.emitNamedEntity = function() {
        if (this.state = this.baseState, this.entityResult !== 0) {
          var f = (this.entityTrie[this.entityResult] & t.BinTrieFlags.VALUE_LENGTH) >> 14;
          switch (f) {
            case 1: {
              this.emitCodePoint(this.entityTrie[this.entityResult] & ~t.BinTrieFlags.VALUE_LENGTH);
              break;
            }
            case 2: {
              this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
              break;
            }
            case 3:
              this.emitCodePoint(this.entityTrie[this.entityResult + 1]), this.emitCodePoint(this.entityTrie[this.entityResult + 2]);
          }
        }
      }, l.prototype.stateBeforeNumericEntity = function(f) {
        (f | 32) === e.LowerX ? (this.entityExcess++, this.state = s.InHexEntity) : (this.state = s.InNumericEntity, this.stateInNumericEntity(f));
      }, l.prototype.emitNumericEntity = function(f) {
        var N = this.index - this.entityExcess - 1, F = N + 2 + +(this.state === s.InHexEntity);
        F !== this.index && (N > this.sectionStart && this.emitPartial(this.sectionStart, N), this.sectionStart = this.index + Number(f), this.emitCodePoint((0, t.replaceCodePoint)(this.entityResult))), this.state = this.baseState;
      }, l.prototype.stateInNumericEntity = function(f) {
        f === e.Semi ? this.emitNumericEntity(!0) : r(f) ? (this.entityResult = this.entityResult * 10 + (f - e.Zero), this.entityExcess++) : (this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state = this.baseState, this.index--);
      }, l.prototype.stateInHexEntity = function(f) {
        f === e.Semi ? this.emitNumericEntity(!0) : r(f) ? (this.entityResult = this.entityResult * 16 + (f - e.Zero), this.entityExcess++) : c(f) ? (this.entityResult = this.entityResult * 16 + ((f | 32) - e.LowerA + 10), this.entityExcess++) : (this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state = this.baseState, this.index--);
      }, l.prototype.allowLegacyEntity = function() {
        return !this.xmlMode && (this.baseState === s.Text || this.baseState === s.InSpecialTag);
      }, l.prototype.cleanup = function() {
        this.running && this.sectionStart !== this.index && (this.state === s.Text || this.state === s.InSpecialTag && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === s.InAttributeValueDq || this.state === s.InAttributeValueSq || this.state === s.InAttributeValueNq) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
      }, l.prototype.shouldContinue = function() {
        return this.index < this.buffer.length + this.offset && this.running;
      }, l.prototype.parse = function() {
        for (; this.shouldContinue(); ) {
          var f = this.buffer.charCodeAt(this.index - this.offset);
          switch (this.state) {
            case s.Text: {
              this.stateText(f);
              break;
            }
            case s.SpecialStartSequence: {
              this.stateSpecialStartSequence(f);
              break;
            }
            case s.InSpecialTag: {
              this.stateInSpecialTag(f);
              break;
            }
            case s.CDATASequence: {
              this.stateCDATASequence(f);
              break;
            }
            case s.InAttributeValueDq: {
              this.stateInAttributeValueDoubleQuotes(f);
              break;
            }
            case s.InAttributeName: {
              this.stateInAttributeName(f);
              break;
            }
            case s.InCommentLike: {
              this.stateInCommentLike(f);
              break;
            }
            case s.InSpecialComment: {
              this.stateInSpecialComment(f);
              break;
            }
            case s.BeforeAttributeName: {
              this.stateBeforeAttributeName(f);
              break;
            }
            case s.InTagName: {
              this.stateInTagName(f);
              break;
            }
            case s.InClosingTagName: {
              this.stateInClosingTagName(f);
              break;
            }
            case s.BeforeTagName: {
              this.stateBeforeTagName(f);
              break;
            }
            case s.AfterAttributeName: {
              this.stateAfterAttributeName(f);
              break;
            }
            case s.InAttributeValueSq: {
              this.stateInAttributeValueSingleQuotes(f);
              break;
            }
            case s.BeforeAttributeValue: {
              this.stateBeforeAttributeValue(f);
              break;
            }
            case s.BeforeClosingTagName: {
              this.stateBeforeClosingTagName(f);
              break;
            }
            case s.AfterClosingTagName: {
              this.stateAfterClosingTagName(f);
              break;
            }
            case s.BeforeSpecialS: {
              this.stateBeforeSpecialS(f);
              break;
            }
            case s.InAttributeValueNq: {
              this.stateInAttributeValueNoQuotes(f);
              break;
            }
            case s.InSelfClosingTag: {
              this.stateInSelfClosingTag(f);
              break;
            }
            case s.InDeclaration: {
              this.stateInDeclaration(f);
              break;
            }
            case s.BeforeDeclaration: {
              this.stateBeforeDeclaration(f);
              break;
            }
            case s.BeforeComment: {
              this.stateBeforeComment(f);
              break;
            }
            case s.InProcessingInstruction: {
              this.stateInProcessingInstruction(f);
              break;
            }
            case s.InNamedEntity: {
              this.stateInNamedEntity(f);
              break;
            }
            case s.BeforeEntity: {
              this.stateBeforeEntity(f);
              break;
            }
            case s.InHexEntity: {
              this.stateInHexEntity(f);
              break;
            }
            case s.InNumericEntity: {
              this.stateInNumericEntity(f);
              break;
            }
            default:
              this.stateBeforeNumericEntity(f);
          }
          this.index++;
        }
        this.cleanup();
      }, l.prototype.finish = function() {
        this.state === s.InNamedEntity && this.emitNamedEntity(), this.sectionStart < this.index && this.handleTrailingData(), this.cbs.onend();
      }, l.prototype.handleTrailingData = function() {
        var f = this.buffer.length + this.offset;
        this.state === s.InCommentLike ? this.currentSequence === d.CdataEnd ? this.cbs.oncdata(this.sectionStart, f, 0) : this.cbs.oncomment(this.sectionStart, f, 0) : this.state === s.InNumericEntity && this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state === s.InHexEntity && this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state === s.InTagName || this.state === s.BeforeAttributeName || this.state === s.BeforeAttributeValue || this.state === s.AfterAttributeName || this.state === s.InAttributeName || this.state === s.InAttributeValueSq || this.state === s.InAttributeValueDq || this.state === s.InAttributeValueNq || this.state === s.InClosingTagName || this.cbs.ontext(this.sectionStart, f);
      }, l.prototype.emitPartial = function(f, N) {
        this.baseState !== s.Text && this.baseState !== s.InSpecialTag ? this.cbs.onattribdata(f, N) : this.cbs.ontext(f, N);
      }, l.prototype.emitCodePoint = function(f) {
        this.baseState !== s.Text && this.baseState !== s.InSpecialTag ? this.cbs.onattribentity(f) : this.cbs.ontextentity(f);
      }, l;
    }()
  );
  a.default = _;
})(Ba);
var Qo = X && X.__createBinding || (Object.create ? function(a, t, e, s) {
  s === void 0 && (s = e);
  var i = Object.getOwnPropertyDescriptor(t, e);
  (!i || ("get" in i ? !t.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function() {
    return t[e];
  } }), Object.defineProperty(a, s, i);
} : function(a, t, e, s) {
  s === void 0 && (s = e), a[s] = t[e];
}), Vo = X && X.__setModuleDefault || (Object.create ? function(a, t) {
  Object.defineProperty(a, "default", { enumerable: !0, value: t });
} : function(a, t) {
  a.default = t;
}), Bo = X && X.__importStar || function(a) {
  if (a && a.__esModule) return a;
  var t = {};
  if (a != null) for (var e in a) e !== "default" && Object.prototype.hasOwnProperty.call(a, e) && Qo(t, a, e);
  return Vo(t, a), t;
};
Object.defineProperty(cs, "__esModule", { value: !0 });
cs.Parser = void 0;
var _s = Bo(Ba), gi = us, we = /* @__PURE__ */ new Set([
  "input",
  "option",
  "optgroup",
  "select",
  "button",
  "datalist",
  "textarea"
]), ft = /* @__PURE__ */ new Set(["p"]), hi = /* @__PURE__ */ new Set(["thead", "tbody"]), pi = /* @__PURE__ */ new Set(["dd", "dt"]), mi = /* @__PURE__ */ new Set(["rt", "rp"]), qo = /* @__PURE__ */ new Map([
  ["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])],
  ["th", /* @__PURE__ */ new Set(["th"])],
  ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])],
  ["body", /* @__PURE__ */ new Set(["head", "link", "script"])],
  ["li", /* @__PURE__ */ new Set(["li"])],
  ["p", ft],
  ["h1", ft],
  ["h2", ft],
  ["h3", ft],
  ["h4", ft],
  ["h5", ft],
  ["h6", ft],
  ["select", we],
  ["input", we],
  ["output", we],
  ["button", we],
  ["datalist", we],
  ["textarea", we],
  ["option", /* @__PURE__ */ new Set(["option"])],
  ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
  ["dd", pi],
  ["dt", pi],
  ["address", ft],
  ["article", ft],
  ["aside", ft],
  ["blockquote", ft],
  ["details", ft],
  ["div", ft],
  ["dl", ft],
  ["fieldset", ft],
  ["figcaption", ft],
  ["figure", ft],
  ["footer", ft],
  ["form", ft],
  ["header", ft],
  ["hr", ft],
  ["main", ft],
  ["nav", ft],
  ["ol", ft],
  ["pre", ft],
  ["section", ft],
  ["table", ft],
  ["ul", ft],
  ["rt", mi],
  ["rp", mi],
  ["tbody", hi],
  ["tfoot", hi]
]), Uo = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]), vi = /* @__PURE__ */ new Set(["math", "svg"]), bi = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignobject",
  "desc",
  "title"
]), Xo = /\s|\//, Yo = (
  /** @class */
  function() {
    function a(t, e) {
      e === void 0 && (e = {});
      var s, i, n, r, o;
      this.options = e, this.startIndex = 0, this.endIndex = 0, this.openTagStart = 0, this.tagname = "", this.attribname = "", this.attribvalue = "", this.attribs = null, this.stack = [], this.foreignContext = [], this.buffers = [], this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1, this.cbs = t ?? {}, this.lowerCaseTagNames = (s = e.lowerCaseTags) !== null && s !== void 0 ? s : !e.xmlMode, this.lowerCaseAttributeNames = (i = e.lowerCaseAttributeNames) !== null && i !== void 0 ? i : !e.xmlMode, this.tokenizer = new ((n = e.Tokenizer) !== null && n !== void 0 ? n : _s.default)(this.options, this), (o = (r = this.cbs).onparserinit) === null || o === void 0 || o.call(r, this);
    }
    return a.prototype.ontext = function(t, e) {
      var s, i, n = this.getSlice(t, e);
      this.endIndex = e - 1, (i = (s = this.cbs).ontext) === null || i === void 0 || i.call(s, n), this.startIndex = e;
    }, a.prototype.ontextentity = function(t) {
      var e, s, i = this.tokenizer.getSectionStart();
      this.endIndex = i - 1, (s = (e = this.cbs).ontext) === null || s === void 0 || s.call(e, (0, gi.fromCodePoint)(t)), this.startIndex = i;
    }, a.prototype.isVoidElement = function(t) {
      return !this.options.xmlMode && Uo.has(t);
    }, a.prototype.onopentagname = function(t, e) {
      this.endIndex = e;
      var s = this.getSlice(t, e);
      this.lowerCaseTagNames && (s = s.toLowerCase()), this.emitOpenTag(s);
    }, a.prototype.emitOpenTag = function(t) {
      var e, s, i, n;
      this.openTagStart = this.startIndex, this.tagname = t;
      var r = !this.options.xmlMode && qo.get(t);
      if (r)
        for (; this.stack.length > 0 && r.has(this.stack[this.stack.length - 1]); ) {
          var o = this.stack.pop();
          (s = (e = this.cbs).onclosetag) === null || s === void 0 || s.call(e, o, !0);
        }
      this.isVoidElement(t) || (this.stack.push(t), vi.has(t) ? this.foreignContext.push(!0) : bi.has(t) && this.foreignContext.push(!1)), (n = (i = this.cbs).onopentagname) === null || n === void 0 || n.call(i, t), this.cbs.onopentag && (this.attribs = {});
    }, a.prototype.endOpenTag = function(t) {
      var e, s;
      this.startIndex = this.openTagStart, this.attribs && ((s = (e = this.cbs).onopentag) === null || s === void 0 || s.call(e, this.tagname, this.attribs, t), this.attribs = null), this.cbs.onclosetag && this.isVoidElement(this.tagname) && this.cbs.onclosetag(this.tagname, !0), this.tagname = "";
    }, a.prototype.onopentagend = function(t) {
      this.endIndex = t, this.endOpenTag(!1), this.startIndex = t + 1;
    }, a.prototype.onclosetag = function(t, e) {
      var s, i, n, r, o, c;
      this.endIndex = e;
      var u = this.getSlice(t, e);
      if (this.lowerCaseTagNames && (u = u.toLowerCase()), (vi.has(u) || bi.has(u)) && this.foreignContext.pop(), this.isVoidElement(u))
        !this.options.xmlMode && u === "br" && ((i = (s = this.cbs).onopentagname) === null || i === void 0 || i.call(s, "br"), (r = (n = this.cbs).onopentag) === null || r === void 0 || r.call(n, "br", {}, !0), (c = (o = this.cbs).onclosetag) === null || c === void 0 || c.call(o, "br", !1));
      else {
        var d = this.stack.lastIndexOf(u);
        if (d !== -1)
          if (this.cbs.onclosetag)
            for (var _ = this.stack.length - d; _--; )
              this.cbs.onclosetag(this.stack.pop(), _ !== 0);
          else
            this.stack.length = d;
        else !this.options.xmlMode && u === "p" && (this.emitOpenTag("p"), this.closeCurrentTag(!0));
      }
      this.startIndex = e + 1;
    }, a.prototype.onselfclosingtag = function(t) {
      this.endIndex = t, this.options.xmlMode || this.options.recognizeSelfClosing || this.foreignContext[this.foreignContext.length - 1] ? (this.closeCurrentTag(!1), this.startIndex = t + 1) : this.onopentagend(t);
    }, a.prototype.closeCurrentTag = function(t) {
      var e, s, i = this.tagname;
      this.endOpenTag(t), this.stack[this.stack.length - 1] === i && ((s = (e = this.cbs).onclosetag) === null || s === void 0 || s.call(e, i, !t), this.stack.pop());
    }, a.prototype.onattribname = function(t, e) {
      this.startIndex = t;
      var s = this.getSlice(t, e);
      this.attribname = this.lowerCaseAttributeNames ? s.toLowerCase() : s;
    }, a.prototype.onattribdata = function(t, e) {
      this.attribvalue += this.getSlice(t, e);
    }, a.prototype.onattribentity = function(t) {
      this.attribvalue += (0, gi.fromCodePoint)(t);
    }, a.prototype.onattribend = function(t, e) {
      var s, i;
      this.endIndex = e, (i = (s = this.cbs).onattribute) === null || i === void 0 || i.call(s, this.attribname, this.attribvalue, t === _s.QuoteType.Double ? '"' : t === _s.QuoteType.Single ? "'" : t === _s.QuoteType.NoValue ? void 0 : null), this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname) && (this.attribs[this.attribname] = this.attribvalue), this.attribvalue = "";
    }, a.prototype.getInstructionName = function(t) {
      var e = t.search(Xo), s = e < 0 ? t : t.substr(0, e);
      return this.lowerCaseTagNames && (s = s.toLowerCase()), s;
    }, a.prototype.ondeclaration = function(t, e) {
      this.endIndex = e;
      var s = this.getSlice(t, e);
      if (this.cbs.onprocessinginstruction) {
        var i = this.getInstructionName(s);
        this.cbs.onprocessinginstruction("!".concat(i), "!".concat(s));
      }
      this.startIndex = e + 1;
    }, a.prototype.onprocessinginstruction = function(t, e) {
      this.endIndex = e;
      var s = this.getSlice(t, e);
      if (this.cbs.onprocessinginstruction) {
        var i = this.getInstructionName(s);
        this.cbs.onprocessinginstruction("?".concat(i), "?".concat(s));
      }
      this.startIndex = e + 1;
    }, a.prototype.oncomment = function(t, e, s) {
      var i, n, r, o;
      this.endIndex = e, (n = (i = this.cbs).oncomment) === null || n === void 0 || n.call(i, this.getSlice(t, e - s)), (o = (r = this.cbs).oncommentend) === null || o === void 0 || o.call(r), this.startIndex = e + 1;
    }, a.prototype.oncdata = function(t, e, s) {
      var i, n, r, o, c, u, d, _, l, f;
      this.endIndex = e;
      var N = this.getSlice(t, e - s);
      this.options.xmlMode || this.options.recognizeCDATA ? ((n = (i = this.cbs).oncdatastart) === null || n === void 0 || n.call(i), (o = (r = this.cbs).ontext) === null || o === void 0 || o.call(r, N), (u = (c = this.cbs).oncdataend) === null || u === void 0 || u.call(c)) : ((_ = (d = this.cbs).oncomment) === null || _ === void 0 || _.call(d, "[CDATA[".concat(N, "]]")), (f = (l = this.cbs).oncommentend) === null || f === void 0 || f.call(l)), this.startIndex = e + 1;
    }, a.prototype.onend = function() {
      var t, e;
      if (this.cbs.onclosetag) {
        this.endIndex = this.startIndex;
        for (var s = this.stack.length; s > 0; this.cbs.onclosetag(this.stack[--s], !0))
          ;
      }
      (e = (t = this.cbs).onend) === null || e === void 0 || e.call(t);
    }, a.prototype.reset = function() {
      var t, e, s, i;
      (e = (t = this.cbs).onreset) === null || e === void 0 || e.call(t), this.tokenizer.reset(), this.tagname = "", this.attribname = "", this.attribs = null, this.stack.length = 0, this.startIndex = 0, this.endIndex = 0, (i = (s = this.cbs).onparserinit) === null || i === void 0 || i.call(s, this), this.buffers.length = 0, this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1;
    }, a.prototype.parseComplete = function(t) {
      this.reset(), this.end(t);
    }, a.prototype.getSlice = function(t, e) {
      for (; t - this.bufferOffset >= this.buffers[0].length; )
        this.shiftBuffer();
      for (var s = this.buffers[0].slice(t - this.bufferOffset, e - this.bufferOffset); e - this.bufferOffset > this.buffers[0].length; )
        this.shiftBuffer(), s += this.buffers[0].slice(0, e - this.bufferOffset);
      return s;
    }, a.prototype.shiftBuffer = function() {
      this.bufferOffset += this.buffers[0].length, this.writeIndex--, this.buffers.shift();
    }, a.prototype.write = function(t) {
      var e, s;
      if (this.ended) {
        (s = (e = this.cbs).onerror) === null || s === void 0 || s.call(e, new Error(".write() after done!"));
        return;
      }
      this.buffers.push(t), this.tokenizer.running && (this.tokenizer.write(t), this.writeIndex++);
    }, a.prototype.end = function(t) {
      var e, s;
      if (this.ended) {
        (s = (e = this.cbs).onerror) === null || s === void 0 || s.call(e, new Error(".end() after done!"));
        return;
      }
      t && this.write(t), this.ended = !0, this.tokenizer.end();
    }, a.prototype.pause = function() {
      this.tokenizer.pause();
    }, a.prototype.resume = function() {
      for (this.tokenizer.resume(); this.tokenizer.running && this.writeIndex < this.buffers.length; )
        this.tokenizer.write(this.buffers[this.writeIndex++]);
      this.ended && this.tokenizer.end();
    }, a.prototype.parseChunk = function(t) {
      this.write(t);
    }, a.prototype.done = function(t) {
      this.end(t);
    }, a;
  }()
);
cs.Parser = Yo;
var zt = {}, Pe = {};
(function(a) {
  Object.defineProperty(a, "__esModule", { value: !0 }), a.Doctype = a.CDATA = a.Tag = a.Style = a.Script = a.Comment = a.Directive = a.Text = a.Root = a.isTag = a.ElementType = void 0;
  var t;
  (function(s) {
    s.Root = "root", s.Text = "text", s.Directive = "directive", s.Comment = "comment", s.Script = "script", s.Style = "style", s.Tag = "tag", s.CDATA = "cdata", s.Doctype = "doctype";
  })(t = a.ElementType || (a.ElementType = {}));
  function e(s) {
    return s.type === t.Tag || s.type === t.Script || s.type === t.Style;
  }
  a.isTag = e, a.Root = t.Root, a.Text = t.Text, a.Directive = t.Directive, a.Comment = t.Comment, a.Script = t.Script, a.Style = t.Style, a.Tag = t.Tag, a.CDATA = t.CDATA, a.Doctype = t.Doctype;
})(Pe);
var at = {}, re = X && X.__extends || /* @__PURE__ */ function() {
  var a = function(t, e) {
    return a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(s, i) {
      s.__proto__ = i;
    } || function(s, i) {
      for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (s[n] = i[n]);
    }, a(t, e);
  };
  return function(t, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
    a(t, e);
    function s() {
      this.constructor = t;
    }
    t.prototype = e === null ? Object.create(e) : (s.prototype = e.prototype, new s());
  };
}(), ze = X && X.__assign || function() {
  return ze = Object.assign || function(a) {
    for (var t, e = 1, s = arguments.length; e < s; e++) {
      t = arguments[e];
      for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (a[i] = t[i]);
    }
    return a;
  }, ze.apply(this, arguments);
};
Object.defineProperty(at, "__esModule", { value: !0 });
at.cloneNode = at.hasChildren = at.isDocument = at.isDirective = at.isComment = at.isText = at.isCDATA = at.isTag = at.Element = at.Document = at.CDATA = at.NodeWithChildren = at.ProcessingInstruction = at.Comment = at.Text = at.DataNode = at.Node = void 0;
var At = Pe, Xa = (
  /** @class */
  function() {
    function a() {
      this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;
    }
    return Object.defineProperty(a.prototype, "parentNode", {
      // Read-write aliases for properties
      /**
       * Same as {@link parent}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.parent;
      },
      set: function(t) {
        this.parent = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "previousSibling", {
      /**
       * Same as {@link prev}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.prev;
      },
      set: function(t) {
        this.prev = t;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(a.prototype, "nextSibling", {
      /**
       * Same as {@link next}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.next;
      },
      set: function(t) {
        this.next = t;
      },
      enumerable: !1,
      configurable: !0
    }), a.prototype.cloneNode = function(t) {
      return t === void 0 && (t = !1), Ya(this, t);
    }, a;
  }()
);
at.Node = Xa;
var ta = (
  /** @class */
  function(a) {
    re(t, a);
    function t(e) {
      var s = a.call(this) || this;
      return s.data = e, s;
    }
    return Object.defineProperty(t.prototype, "nodeValue", {
      /**
       * Same as {@link data}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.data;
      },
      set: function(e) {
        this.data = e;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(Xa)
);
at.DataNode = ta;
var cn = (
  /** @class */
  function(a) {
    re(t, a);
    function t() {
      var e = a !== null && a.apply(this, arguments) || this;
      return e.type = At.ElementType.Text, e;
    }
    return Object.defineProperty(t.prototype, "nodeType", {
      get: function() {
        return 3;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(ta)
);
at.Text = cn;
var un = (
  /** @class */
  function(a) {
    re(t, a);
    function t() {
      var e = a !== null && a.apply(this, arguments) || this;
      return e.type = At.ElementType.Comment, e;
    }
    return Object.defineProperty(t.prototype, "nodeType", {
      get: function() {
        return 8;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(ta)
);
at.Comment = un;
var ln = (
  /** @class */
  function(a) {
    re(t, a);
    function t(e, s) {
      var i = a.call(this, s) || this;
      return i.name = e, i.type = At.ElementType.Directive, i;
    }
    return Object.defineProperty(t.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(ta)
);
at.ProcessingInstruction = ln;
var ea = (
  /** @class */
  function(a) {
    re(t, a);
    function t(e) {
      var s = a.call(this) || this;
      return s.children = e, s;
    }
    return Object.defineProperty(t.prototype, "firstChild", {
      // Aliases
      /** First child of the node. */
      get: function() {
        var e;
        return (e = this.children[0]) !== null && e !== void 0 ? e : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "lastChild", {
      /** Last child of the node. */
      get: function() {
        return this.children.length > 0 ? this.children[this.children.length - 1] : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "childNodes", {
      /**
       * Same as {@link children}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.children;
      },
      set: function(e) {
        this.children = e;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(Xa)
);
at.NodeWithChildren = ea;
var fn = (
  /** @class */
  function(a) {
    re(t, a);
    function t() {
      var e = a !== null && a.apply(this, arguments) || this;
      return e.type = At.ElementType.CDATA, e;
    }
    return Object.defineProperty(t.prototype, "nodeType", {
      get: function() {
        return 4;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(ea)
);
at.CDATA = fn;
var dn = (
  /** @class */
  function(a) {
    re(t, a);
    function t() {
      var e = a !== null && a.apply(this, arguments) || this;
      return e.type = At.ElementType.Root, e;
    }
    return Object.defineProperty(t.prototype, "nodeType", {
      get: function() {
        return 9;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(ea)
);
at.Document = dn;
var gn = (
  /** @class */
  function(a) {
    re(t, a);
    function t(e, s, i, n) {
      i === void 0 && (i = []), n === void 0 && (n = e === "script" ? At.ElementType.Script : e === "style" ? At.ElementType.Style : At.ElementType.Tag);
      var r = a.call(this, i) || this;
      return r.name = e, r.attribs = s, r.type = n, r;
    }
    return Object.defineProperty(t.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "tagName", {
      // DOM Level 1 aliases
      /**
       * Same as {@link name}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.name;
      },
      set: function(e) {
        this.name = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "attributes", {
      get: function() {
        var e = this;
        return Object.keys(this.attribs).map(function(s) {
          var i, n;
          return {
            name: s,
            value: e.attribs[s],
            namespace: (i = e["x-attribsNamespace"]) === null || i === void 0 ? void 0 : i[s],
            prefix: (n = e["x-attribsPrefix"]) === null || n === void 0 ? void 0 : n[s]
          };
        });
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }(ea)
);
at.Element = gn;
function hn(a) {
  return (0, At.isTag)(a);
}
at.isTag = hn;
function pn(a) {
  return a.type === At.ElementType.CDATA;
}
at.isCDATA = pn;
function mn(a) {
  return a.type === At.ElementType.Text;
}
at.isText = mn;
function vn(a) {
  return a.type === At.ElementType.Comment;
}
at.isComment = vn;
function bn(a) {
  return a.type === At.ElementType.Directive;
}
at.isDirective = bn;
function yn(a) {
  return a.type === At.ElementType.Root;
}
at.isDocument = yn;
function Ko(a) {
  return Object.prototype.hasOwnProperty.call(a, "children");
}
at.hasChildren = Ko;
function Ya(a, t) {
  t === void 0 && (t = !1);
  var e;
  if (mn(a))
    e = new cn(a.data);
  else if (vn(a))
    e = new un(a.data);
  else if (hn(a)) {
    var s = t ? fa(a.children) : [], i = new gn(a.name, ze({}, a.attribs), s);
    s.forEach(function(c) {
      return c.parent = i;
    }), a.namespace != null && (i.namespace = a.namespace), a["x-attribsNamespace"] && (i["x-attribsNamespace"] = ze({}, a["x-attribsNamespace"])), a["x-attribsPrefix"] && (i["x-attribsPrefix"] = ze({}, a["x-attribsPrefix"])), e = i;
  } else if (pn(a)) {
    var s = t ? fa(a.children) : [], n = new fn(s);
    s.forEach(function(u) {
      return u.parent = n;
    }), e = n;
  } else if (yn(a)) {
    var s = t ? fa(a.children) : [], r = new dn(s);
    s.forEach(function(u) {
      return u.parent = r;
    }), a["x-mode"] && (r["x-mode"] = a["x-mode"]), e = r;
  } else if (bn(a)) {
    var o = new ln(a.name, a.data);
    a["x-name"] != null && (o["x-name"] = a["x-name"], o["x-publicId"] = a["x-publicId"], o["x-systemId"] = a["x-systemId"]), e = o;
  } else
    throw new Error("Not implemented yet: ".concat(a.type));
  return e.startIndex = a.startIndex, e.endIndex = a.endIndex, a.sourceCodeLocation != null && (e.sourceCodeLocation = a.sourceCodeLocation), e;
}
at.cloneNode = Ya;
function fa(a) {
  for (var t = a.map(function(s) {
    return Ya(s, !0);
  }), e = 1; e < t.length; e++)
    t[e].prev = t[e - 1], t[e - 1].next = t[e];
  return t;
}
(function(a) {
  var t = X && X.__createBinding || (Object.create ? function(o, c, u, d) {
    d === void 0 && (d = u);
    var _ = Object.getOwnPropertyDescriptor(c, u);
    (!_ || ("get" in _ ? !c.__esModule : _.writable || _.configurable)) && (_ = { enumerable: !0, get: function() {
      return c[u];
    } }), Object.defineProperty(o, d, _);
  } : function(o, c, u, d) {
    d === void 0 && (d = u), o[d] = c[u];
  }), e = X && X.__exportStar || function(o, c) {
    for (var u in o) u !== "default" && !Object.prototype.hasOwnProperty.call(c, u) && t(c, o, u);
  };
  Object.defineProperty(a, "__esModule", { value: !0 }), a.DomHandler = void 0;
  var s = Pe, i = at;
  e(at, a);
  var n = {
    withStartIndices: !1,
    withEndIndices: !1,
    xmlMode: !1
  }, r = (
    /** @class */
    function() {
      function o(c, u, d) {
        this.dom = [], this.root = new i.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof u == "function" && (d = u, u = n), typeof c == "object" && (u = c, c = void 0), this.callback = c ?? null, this.options = u ?? n, this.elementCB = d ?? null;
      }
      return o.prototype.onparserinit = function(c) {
        this.parser = c;
      }, o.prototype.onreset = function() {
        this.dom = [], this.root = new i.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
      }, o.prototype.onend = function() {
        this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
      }, o.prototype.onerror = function(c) {
        this.handleCallback(c);
      }, o.prototype.onclosetag = function() {
        this.lastNode = null;
        var c = this.tagStack.pop();
        this.options.withEndIndices && (c.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(c);
      }, o.prototype.onopentag = function(c, u) {
        var d = this.options.xmlMode ? s.ElementType.Tag : void 0, _ = new i.Element(c, u, void 0, d);
        this.addNode(_), this.tagStack.push(_);
      }, o.prototype.ontext = function(c) {
        var u = this.lastNode;
        if (u && u.type === s.ElementType.Text)
          u.data += c, this.options.withEndIndices && (u.endIndex = this.parser.endIndex);
        else {
          var d = new i.Text(c);
          this.addNode(d), this.lastNode = d;
        }
      }, o.prototype.oncomment = function(c) {
        if (this.lastNode && this.lastNode.type === s.ElementType.Comment) {
          this.lastNode.data += c;
          return;
        }
        var u = new i.Comment(c);
        this.addNode(u), this.lastNode = u;
      }, o.prototype.oncommentend = function() {
        this.lastNode = null;
      }, o.prototype.oncdatastart = function() {
        var c = new i.Text(""), u = new i.CDATA([c]);
        this.addNode(u), c.parent = u, this.lastNode = c;
      }, o.prototype.oncdataend = function() {
        this.lastNode = null;
      }, o.prototype.onprocessinginstruction = function(c, u) {
        var d = new i.ProcessingInstruction(c, u);
        this.addNode(d);
      }, o.prototype.handleCallback = function(c) {
        if (typeof this.callback == "function")
          this.callback(c, this.dom);
        else if (c)
          throw c;
      }, o.prototype.addNode = function(c) {
        var u = this.tagStack[this.tagStack.length - 1], d = u.children[u.children.length - 1];
        this.options.withStartIndices && (c.startIndex = this.parser.startIndex), this.options.withEndIndices && (c.endIndex = this.parser.endIndex), u.children.push(c), d && (c.prev = d, d.next = c), c.parent = u, this.lastNode = null;
      }, o;
    }()
  );
  a.DomHandler = r, a.default = r;
})(zt);
var js = {}, oe = {}, vs = {}, xn = {}, pe = {}, Ka = {};
Object.defineProperty(Ka, "__esModule", { value: !0 });
function As(a) {
  for (var t = 1; t < a.length; t++)
    a[t][0] += a[t - 1][0] + 1;
  return a;
}
Ka.default = new Map(/* @__PURE__ */ As([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: new Map(/* @__PURE__ */ As([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: new Map(/* @__PURE__ */ As([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: new Map(/* @__PURE__ */ As([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));
var Xs = {};
(function(a) {
  Object.defineProperty(a, "__esModule", { value: !0 }), a.escapeText = a.escapeAttribute = a.escapeUTF8 = a.escape = a.encodeXML = a.getCodePoint = a.xmlReplacer = void 0, a.xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
  var t = /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"]
  ]);
  a.getCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? function(i, n) {
    return i.codePointAt(n);
  } : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    function(i, n) {
      return (i.charCodeAt(n) & 64512) === 55296 ? (i.charCodeAt(n) - 55296) * 1024 + i.charCodeAt(n + 1) - 56320 + 65536 : i.charCodeAt(n);
    }
  );
  function e(i) {
    for (var n = "", r = 0, o; (o = a.xmlReplacer.exec(i)) !== null; ) {
      var c = o.index, u = i.charCodeAt(c), d = t.get(u);
      d !== void 0 ? (n += i.substring(r, c) + d, r = c + 1) : (n += "".concat(i.substring(r, c), "&#x").concat((0, a.getCodePoint)(i, c).toString(16), ";"), r = a.xmlReplacer.lastIndex += +((u & 64512) === 55296));
    }
    return n + i.substr(r);
  }
  a.encodeXML = e, a.escape = e;
  function s(i, n) {
    return function(o) {
      for (var c, u = 0, d = ""; c = i.exec(o); )
        u !== c.index && (d += o.substring(u, c.index)), d += n.get(c[0].charCodeAt(0)), u = c.index + 1;
      return d + o.substring(u);
    };
  }
  a.escapeUTF8 = s(/[&<>'"]/g, t), a.escapeAttribute = s(/["&\u00A0]/g, /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [160, "&nbsp;"]
  ])), a.escapeText = s(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
    [38, "&amp;"],
    [60, "&lt;"],
    [62, "&gt;"],
    [160, "&nbsp;"]
  ]));
})(Xs);
var zo = X && X.__importDefault || function(a) {
  return a && a.__esModule ? a : { default: a };
};
Object.defineProperty(pe, "__esModule", { value: !0 });
pe.encodeNonAsciiHTML = pe.encodeHTML = void 0;
var Go = zo(Ka), wn = Xs, Jo = /[\t\n!-,./:-@[-`\f{-}$\x80-\uFFFF]/g;
function Ho(a) {
  return kn(Jo, a);
}
pe.encodeHTML = Ho;
function Wo(a) {
  return kn(wn.xmlReplacer, a);
}
pe.encodeNonAsciiHTML = Wo;
function kn(a, t) {
  for (var e = "", s = 0, i; (i = a.exec(t)) !== null; ) {
    var n = i.index;
    e += t.substring(s, n);
    var r = t.charCodeAt(n), o = Go.default.get(r);
    if (typeof o == "object") {
      if (n + 1 < t.length) {
        var c = t.charCodeAt(n + 1), u = typeof o.n == "number" ? o.n === c ? o.o : void 0 : o.n.get(c);
        if (u !== void 0) {
          e += u, s = a.lastIndex += 1;
          continue;
        }
      }
      o = o.v;
    }
    if (o !== void 0)
      e += o, s = n + 1;
    else {
      var d = (0, wn.getCodePoint)(t, n);
      e += "&#x".concat(d.toString(16), ";"), s = a.lastIndex += +(d !== r);
    }
  }
  return e + t.substr(s);
}
(function(a) {
  Object.defineProperty(a, "__esModule", { value: !0 }), a.decodeXMLStrict = a.decodeHTML5Strict = a.decodeHTML4Strict = a.decodeHTML5 = a.decodeHTML4 = a.decodeHTMLAttribute = a.decodeHTMLStrict = a.decodeHTML = a.decodeXML = a.DecodingMode = a.EntityDecoder = a.encodeHTML5 = a.encodeHTML4 = a.encodeNonAsciiHTML = a.encodeHTML = a.escapeText = a.escapeAttribute = a.escapeUTF8 = a.escape = a.encodeXML = a.encode = a.decodeStrict = a.decode = a.EncodingMode = a.EntityLevel = void 0;
  var t = us, e = pe, s = Xs, i;
  (function(l) {
    l[l.XML = 0] = "XML", l[l.HTML = 1] = "HTML";
  })(i = a.EntityLevel || (a.EntityLevel = {}));
  var n;
  (function(l) {
    l[l.UTF8 = 0] = "UTF8", l[l.ASCII = 1] = "ASCII", l[l.Extensive = 2] = "Extensive", l[l.Attribute = 3] = "Attribute", l[l.Text = 4] = "Text";
  })(n = a.EncodingMode || (a.EncodingMode = {}));
  function r(l, f) {
    f === void 0 && (f = i.XML);
    var N = typeof f == "number" ? f : f.level;
    if (N === i.HTML) {
      var F = typeof f == "object" ? f.mode : void 0;
      return (0, t.decodeHTML)(l, F);
    }
    return (0, t.decodeXML)(l);
  }
  a.decode = r;
  function o(l, f) {
    var N;
    f === void 0 && (f = i.XML);
    var F = typeof f == "number" ? { level: f } : f;
    return (N = F.mode) !== null && N !== void 0 || (F.mode = t.DecodingMode.Strict), r(l, F);
  }
  a.decodeStrict = o;
  function c(l, f) {
    f === void 0 && (f = i.XML);
    var N = typeof f == "number" ? { level: f } : f;
    return N.mode === n.UTF8 ? (0, s.escapeUTF8)(l) : N.mode === n.Attribute ? (0, s.escapeAttribute)(l) : N.mode === n.Text ? (0, s.escapeText)(l) : N.level === i.HTML ? N.mode === n.ASCII ? (0, e.encodeNonAsciiHTML)(l) : (0, e.encodeHTML)(l) : (0, s.encodeXML)(l);
  }
  a.encode = c;
  var u = Xs;
  Object.defineProperty(a, "encodeXML", { enumerable: !0, get: function() {
    return u.encodeXML;
  } }), Object.defineProperty(a, "escape", { enumerable: !0, get: function() {
    return u.escape;
  } }), Object.defineProperty(a, "escapeUTF8", { enumerable: !0, get: function() {
    return u.escapeUTF8;
  } }), Object.defineProperty(a, "escapeAttribute", { enumerable: !0, get: function() {
    return u.escapeAttribute;
  } }), Object.defineProperty(a, "escapeText", { enumerable: !0, get: function() {
    return u.escapeText;
  } });
  var d = pe;
  Object.defineProperty(a, "encodeHTML", { enumerable: !0, get: function() {
    return d.encodeHTML;
  } }), Object.defineProperty(a, "encodeNonAsciiHTML", { enumerable: !0, get: function() {
    return d.encodeNonAsciiHTML;
  } }), Object.defineProperty(a, "encodeHTML4", { enumerable: !0, get: function() {
    return d.encodeHTML;
  } }), Object.defineProperty(a, "encodeHTML5", { enumerable: !0, get: function() {
    return d.encodeHTML;
  } });
  var _ = us;
  Object.defineProperty(a, "EntityDecoder", { enumerable: !0, get: function() {
    return _.EntityDecoder;
  } }), Object.defineProperty(a, "DecodingMode", { enumerable: !0, get: function() {
    return _.DecodingMode;
  } }), Object.defineProperty(a, "decodeXML", { enumerable: !0, get: function() {
    return _.decodeXML;
  } }), Object.defineProperty(a, "decodeHTML", { enumerable: !0, get: function() {
    return _.decodeHTML;
  } }), Object.defineProperty(a, "decodeHTMLStrict", { enumerable: !0, get: function() {
    return _.decodeHTMLStrict;
  } }), Object.defineProperty(a, "decodeHTMLAttribute", { enumerable: !0, get: function() {
    return _.decodeHTMLAttribute;
  } }), Object.defineProperty(a, "decodeHTML4", { enumerable: !0, get: function() {
    return _.decodeHTML;
  } }), Object.defineProperty(a, "decodeHTML5", { enumerable: !0, get: function() {
    return _.decodeHTML;
  } }), Object.defineProperty(a, "decodeHTML4Strict", { enumerable: !0, get: function() {
    return _.decodeHTMLStrict;
  } }), Object.defineProperty(a, "decodeHTML5Strict", { enumerable: !0, get: function() {
    return _.decodeHTMLStrict;
  } }), Object.defineProperty(a, "decodeXMLStrict", { enumerable: !0, get: function() {
    return _.decodeXML;
  } });
})(xn);
var Te = {};
Object.defineProperty(Te, "__esModule", { value: !0 });
Te.attributeNames = Te.elementNames = void 0;
Te.elementNames = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map(function(a) {
  return [a.toLowerCase(), a];
}));
Te.attributeNames = new Map([
  "definitionURL",
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map(function(a) {
  return [a.toLowerCase(), a];
}));
var Ae = X && X.__assign || function() {
  return Ae = Object.assign || function(a) {
    for (var t, e = 1, s = arguments.length; e < s; e++) {
      t = arguments[e];
      for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (a[i] = t[i]);
    }
    return a;
  }, Ae.apply(this, arguments);
}, $o = X && X.__createBinding || (Object.create ? function(a, t, e, s) {
  s === void 0 && (s = e);
  var i = Object.getOwnPropertyDescriptor(t, e);
  (!i || ("get" in i ? !t.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function() {
    return t[e];
  } }), Object.defineProperty(a, s, i);
} : function(a, t, e, s) {
  s === void 0 && (s = e), a[s] = t[e];
}), tc = X && X.__setModuleDefault || (Object.create ? function(a, t) {
  Object.defineProperty(a, "default", { enumerable: !0, value: t });
} : function(a, t) {
  a.default = t;
}), ec = X && X.__importStar || function(a) {
  if (a && a.__esModule) return a;
  var t = {};
  if (a != null) for (var e in a) e !== "default" && Object.prototype.hasOwnProperty.call(a, e) && $o(t, a, e);
  return tc(t, a), t;
};
Object.defineProperty(vs, "__esModule", { value: !0 });
vs.render = void 0;
var Bt = ec(Pe), Ys = xn, _n = Te, sc = /* @__PURE__ */ new Set([
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
]);
function ac(a) {
  return a.replace(/"/g, "&quot;");
}
function ic(a, t) {
  var e;
  if (a) {
    var s = ((e = t.encodeEntities) !== null && e !== void 0 ? e : t.decodeEntities) === !1 ? ac : t.xmlMode || t.encodeEntities !== "utf8" ? Ys.encodeXML : Ys.escapeAttribute;
    return Object.keys(a).map(function(i) {
      var n, r, o = (n = a[i]) !== null && n !== void 0 ? n : "";
      return t.xmlMode === "foreign" && (i = (r = _n.attributeNames.get(i)) !== null && r !== void 0 ? r : i), !t.emptyAttrs && !t.xmlMode && o === "" ? i : "".concat(i, '="').concat(s(o), '"');
    }).join(" ");
  }
}
var yi = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function sa(a, t) {
  t === void 0 && (t = {});
  for (var e = ("length" in a) ? a : [a], s = "", i = 0; i < e.length; i++)
    s += nc(e[i], t);
  return s;
}
vs.render = sa;
vs.default = sa;
function nc(a, t) {
  switch (a.type) {
    case Bt.Root:
      return sa(a.children, t);
    case Bt.Doctype:
    case Bt.Directive:
      return uc(a);
    case Bt.Comment:
      return dc(a);
    case Bt.CDATA:
      return fc(a);
    case Bt.Script:
    case Bt.Style:
    case Bt.Tag:
      return cc(a, t);
    case Bt.Text:
      return lc(a, t);
  }
}
var rc = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]), oc = /* @__PURE__ */ new Set(["svg", "math"]);
function cc(a, t) {
  var e;
  t.xmlMode === "foreign" && (a.name = (e = _n.elementNames.get(a.name)) !== null && e !== void 0 ? e : a.name, a.parent && rc.has(a.parent.name) && (t = Ae(Ae({}, t), { xmlMode: !1 }))), !t.xmlMode && oc.has(a.name) && (t = Ae(Ae({}, t), { xmlMode: "foreign" }));
  var s = "<".concat(a.name), i = ic(a.attribs, t);
  return i && (s += " ".concat(i)), a.children.length === 0 && (t.xmlMode ? (
    // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
    t.selfClosingTags !== !1
  ) : (
    // User explicitly asked for self-closing tags, even in HTML mode
    t.selfClosingTags && yi.has(a.name)
  )) ? (t.xmlMode || (s += " "), s += "/>") : (s += ">", a.children.length > 0 && (s += sa(a.children, t)), (t.xmlMode || !yi.has(a.name)) && (s += "</".concat(a.name, ">"))), s;
}
function uc(a) {
  return "<".concat(a.data, ">");
}
function lc(a, t) {
  var e, s = a.data || "";
  return ((e = t.encodeEntities) !== null && e !== void 0 ? e : t.decodeEntities) !== !1 && !(!t.xmlMode && a.parent && sc.has(a.parent.name)) && (s = t.xmlMode || t.encodeEntities !== "utf8" ? (0, Ys.encodeXML)(s) : (0, Ys.escapeText)(s)), s;
}
function fc(a) {
  return "<![CDATA[".concat(a.children[0].data, "]]>");
}
function dc(a) {
  return "<!--".concat(a.data, "-->");
}
var gc = X && X.__importDefault || function(a) {
  return a && a.__esModule ? a : { default: a };
};
Object.defineProperty(oe, "__esModule", { value: !0 });
oe.getOuterHTML = An;
oe.getInnerHTML = mc;
oe.getText = Ps;
oe.textContent = ka;
oe.innerText = _a;
var Lt = zt, hc = gc(vs), pc = Pe;
function An(a, t) {
  return (0, hc.default)(a, t);
}
function mc(a, t) {
  return (0, Lt.hasChildren)(a) ? a.children.map(function(e) {
    return An(e, t);
  }).join("") : "";
}
function Ps(a) {
  return Array.isArray(a) ? a.map(Ps).join("") : (0, Lt.isTag)(a) ? a.name === "br" ? `
` : Ps(a.children) : (0, Lt.isCDATA)(a) ? Ps(a.children) : (0, Lt.isText)(a) ? a.data : "";
}
function ka(a) {
  return Array.isArray(a) ? a.map(ka).join("") : (0, Lt.hasChildren)(a) && !(0, Lt.isComment)(a) ? ka(a.children) : (0, Lt.isText)(a) ? a.data : "";
}
function _a(a) {
  return Array.isArray(a) ? a.map(_a).join("") : (0, Lt.hasChildren)(a) && (a.type === pc.ElementType.Tag || (0, Lt.isCDATA)(a)) ? _a(a.children) : (0, Lt.isText)(a) ? a.data : "";
}
var Qt = {};
Object.defineProperty(Qt, "__esModule", { value: !0 });
Qt.getChildren = En;
Qt.getParent = Sn;
Qt.getSiblings = vc;
Qt.getAttributeValue = bc;
Qt.hasAttrib = yc;
Qt.getName = xc;
Qt.nextElementSibling = wc;
Qt.prevElementSibling = kc;
var za = zt;
function En(a) {
  return (0, za.hasChildren)(a) ? a.children : [];
}
function Sn(a) {
  return a.parent || null;
}
function vc(a) {
  var t, e, s = Sn(a);
  if (s != null)
    return En(s);
  for (var i = [a], n = a.prev, r = a.next; n != null; )
    i.unshift(n), t = n, n = t.prev;
  for (; r != null; )
    i.push(r), e = r, r = e.next;
  return i;
}
function bc(a, t) {
  var e;
  return (e = a.attribs) === null || e === void 0 ? void 0 : e[t];
}
function yc(a, t) {
  return a.attribs != null && Object.prototype.hasOwnProperty.call(a.attribs, t) && a.attribs[t] != null;
}
function xc(a) {
  return a.name;
}
function wc(a) {
  for (var t, e = a.next; e !== null && !(0, za.isTag)(e); )
    t = e, e = t.next;
  return e;
}
function kc(a) {
  for (var t, e = a.prev; e !== null && !(0, za.isTag)(e); )
    t = e, e = t.prev;
  return e;
}
var ce = {};
Object.defineProperty(ce, "__esModule", { value: !0 });
ce.removeElement = bs;
ce.replaceElement = _c;
ce.appendChild = Ac;
ce.append = Ec;
ce.prependChild = Sc;
ce.prepend = Cc;
function bs(a) {
  if (a.prev && (a.prev.next = a.next), a.next && (a.next.prev = a.prev), a.parent) {
    var t = a.parent.children, e = t.lastIndexOf(a);
    e >= 0 && t.splice(e, 1);
  }
  a.next = null, a.prev = null, a.parent = null;
}
function _c(a, t) {
  var e = t.prev = a.prev;
  e && (e.next = t);
  var s = t.next = a.next;
  s && (s.prev = t);
  var i = t.parent = a.parent;
  if (i) {
    var n = i.children;
    n[n.lastIndexOf(a)] = t, a.parent = null;
  }
}
function Ac(a, t) {
  if (bs(t), t.next = null, t.parent = a, a.children.push(t) > 1) {
    var e = a.children[a.children.length - 2];
    e.next = t, t.prev = e;
  } else
    t.prev = null;
}
function Ec(a, t) {
  bs(t);
  var e = a.parent, s = a.next;
  if (t.next = s, t.prev = a, a.next = t, t.parent = e, s) {
    if (s.prev = t, e) {
      var i = e.children;
      i.splice(i.lastIndexOf(s), 0, t);
    }
  } else e && e.children.push(t);
}
function Sc(a, t) {
  if (bs(t), t.parent = a, t.prev = null, a.children.unshift(t) !== 1) {
    var e = a.children[1];
    e.prev = t, t.next = e;
  } else
    t.next = null;
}
function Cc(a, t) {
  bs(t);
  var e = a.parent;
  if (e) {
    var s = e.children;
    s.splice(s.indexOf(a), 0, t);
  }
  a.prev && (a.prev.next = t), t.parent = e, t.prev = a.prev, t.next = a, a.prev = t;
}
var Jt = {};
Object.defineProperty(Jt, "__esModule", { value: !0 });
Jt.filter = Ic;
Jt.find = Cn;
Jt.findOneChild = Nc;
Jt.findOne = In;
Jt.existsOne = Nn;
Jt.findAll = Tc;
var me = zt;
function Ic(a, t, e, s) {
  return e === void 0 && (e = !0), s === void 0 && (s = 1 / 0), Cn(a, Array.isArray(t) ? t : [t], e, s);
}
function Cn(a, t, e, s) {
  for (var i = [], n = [Array.isArray(t) ? t : [t]], r = [0]; ; ) {
    if (r[0] >= n[0].length) {
      if (r.length === 1)
        return i;
      n.shift(), r.shift();
      continue;
    }
    var o = n[0][r[0]++];
    if (a(o) && (i.push(o), --s <= 0))
      return i;
    e && (0, me.hasChildren)(o) && o.children.length > 0 && (r.unshift(0), n.unshift(o.children));
  }
}
function Nc(a, t) {
  return t.find(a);
}
function In(a, t, e) {
  e === void 0 && (e = !0);
  for (var s = Array.isArray(t) ? t : [t], i = 0; i < s.length; i++) {
    var n = s[i];
    if ((0, me.isTag)(n) && a(n))
      return n;
    if (e && (0, me.hasChildren)(n) && n.children.length > 0) {
      var r = In(a, n.children, !0);
      if (r)
        return r;
    }
  }
  return null;
}
function Nn(a, t) {
  return (Array.isArray(t) ? t : [t]).some(function(e) {
    return (0, me.isTag)(e) && a(e) || (0, me.hasChildren)(e) && Nn(a, e.children);
  });
}
function Tc(a, t) {
  for (var e = [], s = [Array.isArray(t) ? t : [t]], i = [0]; ; ) {
    if (i[0] >= s[0].length) {
      if (s.length === 1)
        return e;
      s.shift(), i.shift();
      continue;
    }
    var n = s[0][i[0]++];
    (0, me.isTag)(n) && a(n) && e.push(n), (0, me.hasChildren)(n) && n.children.length > 0 && (i.unshift(0), s.unshift(n.children));
  }
}
var Ht = {};
Object.defineProperty(Ht, "__esModule", { value: !0 });
Ht.testElement = Fc;
Ht.getElements = Oc;
Ht.getElementById = jc;
Ht.getElementsByTagName = Pc;
Ht.getElementsByClassName = Dc;
Ht.getElementsByTagType = Lc;
var le = zt, ys = Jt, Ks = {
  tag_name: function(a) {
    return typeof a == "function" ? function(t) {
      return (0, le.isTag)(t) && a(t.name);
    } : a === "*" ? le.isTag : function(t) {
      return (0, le.isTag)(t) && t.name === a;
    };
  },
  tag_type: function(a) {
    return typeof a == "function" ? function(t) {
      return a(t.type);
    } : function(t) {
      return t.type === a;
    };
  },
  tag_contains: function(a) {
    return typeof a == "function" ? function(t) {
      return (0, le.isText)(t) && a(t.data);
    } : function(t) {
      return (0, le.isText)(t) && t.data === a;
    };
  }
};
function Ga(a, t) {
  return typeof t == "function" ? function(e) {
    return (0, le.isTag)(e) && t(e.attribs[a]);
  } : function(e) {
    return (0, le.isTag)(e) && e.attribs[a] === t;
  };
}
function Mc(a, t) {
  return function(e) {
    return a(e) || t(e);
  };
}
function Tn(a) {
  var t = Object.keys(a).map(function(e) {
    var s = a[e];
    return Object.prototype.hasOwnProperty.call(Ks, e) ? Ks[e](s) : Ga(e, s);
  });
  return t.length === 0 ? null : t.reduce(Mc);
}
function Fc(a, t) {
  var e = Tn(a);
  return e ? e(t) : !0;
}
function Oc(a, t, e, s) {
  s === void 0 && (s = 1 / 0);
  var i = Tn(a);
  return i ? (0, ys.filter)(i, t, e, s) : [];
}
function jc(a, t, e) {
  return e === void 0 && (e = !0), Array.isArray(t) || (t = [t]), (0, ys.findOne)(Ga("id", a), t, e);
}
function Pc(a, t, e, s) {
  return e === void 0 && (e = !0), s === void 0 && (s = 1 / 0), (0, ys.filter)(Ks.tag_name(a), t, e, s);
}
function Dc(a, t, e, s) {
  return e === void 0 && (e = !0), s === void 0 && (s = 1 / 0), (0, ys.filter)(Ga("class", a), t, e, s);
}
function Lc(a, t, e, s) {
  return e === void 0 && (e = !0), s === void 0 && (s = 1 / 0), (0, ys.filter)(Ks.tag_type(a), t, e, s);
}
var ve = {};
Object.defineProperty(ve, "__esModule", { value: !0 });
ve.DocumentPosition = void 0;
ve.removeSubsets = Rc;
ve.compareDocumentPosition = Mn;
ve.uniqueSort = Zc;
var xi = zt;
function Rc(a) {
  for (var t = a.length; --t >= 0; ) {
    var e = a[t];
    if (t > 0 && a.lastIndexOf(e, t - 1) >= 0) {
      a.splice(t, 1);
      continue;
    }
    for (var s = e.parent; s; s = s.parent)
      if (a.includes(s)) {
        a.splice(t, 1);
        break;
      }
  }
  return a;
}
var Ct;
(function(a) {
  a[a.DISCONNECTED = 1] = "DISCONNECTED", a[a.PRECEDING = 2] = "PRECEDING", a[a.FOLLOWING = 4] = "FOLLOWING", a[a.CONTAINS = 8] = "CONTAINS", a[a.CONTAINED_BY = 16] = "CONTAINED_BY";
})(Ct || (ve.DocumentPosition = Ct = {}));
function Mn(a, t) {
  var e = [], s = [];
  if (a === t)
    return 0;
  for (var i = (0, xi.hasChildren)(a) ? a : a.parent; i; )
    e.unshift(i), i = i.parent;
  for (i = (0, xi.hasChildren)(t) ? t : t.parent; i; )
    s.unshift(i), i = i.parent;
  for (var n = Math.min(e.length, s.length), r = 0; r < n && e[r] === s[r]; )
    r++;
  if (r === 0)
    return Ct.DISCONNECTED;
  var o = e[r - 1], c = o.children, u = e[r], d = s[r];
  return c.indexOf(u) > c.indexOf(d) ? o === t ? Ct.FOLLOWING | Ct.CONTAINED_BY : Ct.FOLLOWING : o === a ? Ct.PRECEDING | Ct.CONTAINS : Ct.PRECEDING;
}
function Zc(a) {
  return a = a.filter(function(t, e, s) {
    return !s.includes(t, e + 1);
  }), a.sort(function(t, e) {
    var s = Mn(t, e);
    return s & Ct.PRECEDING ? -1 : s & Ct.FOLLOWING ? 1 : 0;
  }), a;
}
var Ja = {};
Object.defineProperty(Ja, "__esModule", { value: !0 });
Ja.getFeed = Vc;
var Qc = oe, xs = Ht;
function Vc(a) {
  var t = zs(Yc, a);
  return t ? t.name === "feed" ? Bc(t) : qc(t) : null;
}
function Bc(a) {
  var t, e = a.children, s = {
    type: "atom",
    items: (0, xs.getElementsByTagName)("entry", e).map(function(r) {
      var o, c = r.children, u = { media: Fn(c) };
      _t(u, "id", "id", c), _t(u, "title", "title", c);
      var d = (o = zs("link", c)) === null || o === void 0 ? void 0 : o.attribs.href;
      d && (u.link = d);
      var _ = ee("summary", c) || ee("content", c);
      _ && (u.description = _);
      var l = ee("updated", c);
      return l && (u.pubDate = new Date(l)), u;
    })
  };
  _t(s, "id", "id", e), _t(s, "title", "title", e);
  var i = (t = zs("link", e)) === null || t === void 0 ? void 0 : t.attribs.href;
  i && (s.link = i), _t(s, "description", "subtitle", e);
  var n = ee("updated", e);
  return n && (s.updated = new Date(n)), _t(s, "author", "email", e, !0), s;
}
function qc(a) {
  var t, e, s = (e = (t = zs("channel", a.children)) === null || t === void 0 ? void 0 : t.children) !== null && e !== void 0 ? e : [], i = {
    type: a.name.substr(0, 3),
    id: "",
    items: (0, xs.getElementsByTagName)("item", a.children).map(function(r) {
      var o = r.children, c = { media: Fn(o) };
      _t(c, "id", "guid", o), _t(c, "title", "title", o), _t(c, "link", "link", o), _t(c, "description", "description", o);
      var u = ee("pubDate", o) || ee("dc:date", o);
      return u && (c.pubDate = new Date(u)), c;
    })
  };
  _t(i, "title", "title", s), _t(i, "link", "link", s), _t(i, "description", "description", s);
  var n = ee("lastBuildDate", s);
  return n && (i.updated = new Date(n)), _t(i, "author", "managingEditor", s, !0), i;
}
var Uc = ["url", "type", "lang"], Xc = [
  "fileSize",
  "bitrate",
  "framerate",
  "samplingrate",
  "channels",
  "duration",
  "height",
  "width"
];
function Fn(a) {
  return (0, xs.getElementsByTagName)("media:content", a).map(function(t) {
    for (var e = t.attribs, s = {
      medium: e.medium,
      isDefault: !!e.isDefault
    }, i = 0, n = Uc; i < n.length; i++) {
      var r = n[i];
      e[r] && (s[r] = e[r]);
    }
    for (var o = 0, c = Xc; o < c.length; o++) {
      var r = c[o];
      e[r] && (s[r] = parseInt(e[r], 10));
    }
    return e.expression && (s.expression = e.expression), s;
  });
}
function zs(a, t) {
  return (0, xs.getElementsByTagName)(a, t, !0, 1)[0];
}
function ee(a, t, e) {
  return e === void 0 && (e = !1), (0, Qc.textContent)((0, xs.getElementsByTagName)(a, t, e, 1)).trim();
}
function _t(a, t, e, s, i) {
  i === void 0 && (i = !1);
  var n = ee(e, s, i);
  n && (a[t] = n);
}
function Yc(a) {
  return a === "rss" || a === "feed" || a === "rdf:RDF";
}
(function(a) {
  var t = X && X.__createBinding || (Object.create ? function(i, n, r, o) {
    o === void 0 && (o = r);
    var c = Object.getOwnPropertyDescriptor(n, r);
    (!c || ("get" in c ? !n.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
      return n[r];
    } }), Object.defineProperty(i, o, c);
  } : function(i, n, r, o) {
    o === void 0 && (o = r), i[o] = n[r];
  }), e = X && X.__exportStar || function(i, n) {
    for (var r in i) r !== "default" && !Object.prototype.hasOwnProperty.call(n, r) && t(n, i, r);
  };
  Object.defineProperty(a, "__esModule", { value: !0 }), a.hasChildren = a.isDocument = a.isComment = a.isText = a.isCDATA = a.isTag = void 0, e(oe, a), e(Qt, a), e(ce, a), e(Jt, a), e(Ht, a), e(ve, a), e(Ja, a);
  var s = zt;
  Object.defineProperty(a, "isTag", { enumerable: !0, get: function() {
    return s.isTag;
  } }), Object.defineProperty(a, "isCDATA", { enumerable: !0, get: function() {
    return s.isCDATA;
  } }), Object.defineProperty(a, "isText", { enumerable: !0, get: function() {
    return s.isText;
  } }), Object.defineProperty(a, "isComment", { enumerable: !0, get: function() {
    return s.isComment;
  } }), Object.defineProperty(a, "isDocument", { enumerable: !0, get: function() {
    return s.isDocument;
  } }), Object.defineProperty(a, "hasChildren", { enumerable: !0, get: function() {
    return s.hasChildren;
  } });
})(js);
(function(a) {
  var t = X && X.__createBinding || (Object.create ? function(O, R, U, q) {
    q === void 0 && (q = U);
    var G = Object.getOwnPropertyDescriptor(R, U);
    (!G || ("get" in G ? !R.__esModule : G.writable || G.configurable)) && (G = { enumerable: !0, get: function() {
      return R[U];
    } }), Object.defineProperty(O, q, G);
  } : function(O, R, U, q) {
    q === void 0 && (q = U), O[q] = R[U];
  }), e = X && X.__setModuleDefault || (Object.create ? function(O, R) {
    Object.defineProperty(O, "default", { enumerable: !0, value: R });
  } : function(O, R) {
    O.default = R;
  }), s = X && X.__importStar || function(O) {
    if (O && O.__esModule) return O;
    var R = {};
    if (O != null) for (var U in O) U !== "default" && Object.prototype.hasOwnProperty.call(O, U) && t(R, O, U);
    return e(R, O), R;
  }, i = X && X.__importDefault || function(O) {
    return O && O.__esModule ? O : { default: O };
  };
  Object.defineProperty(a, "__esModule", { value: !0 }), a.DomUtils = a.parseFeed = a.getFeed = a.ElementType = a.Tokenizer = a.createDomStream = a.parseDOM = a.parseDocument = a.DefaultHandler = a.DomHandler = a.Parser = void 0;
  var n = cs, r = cs;
  Object.defineProperty(a, "Parser", { enumerable: !0, get: function() {
    return r.Parser;
  } });
  var o = zt, c = zt;
  Object.defineProperty(a, "DomHandler", { enumerable: !0, get: function() {
    return c.DomHandler;
  } }), Object.defineProperty(a, "DefaultHandler", { enumerable: !0, get: function() {
    return c.DomHandler;
  } });
  function u(O, R) {
    var U = new o.DomHandler(void 0, R);
    return new n.Parser(U, R).end(O), U.root;
  }
  a.parseDocument = u;
  function d(O, R) {
    return u(O, R).children;
  }
  a.parseDOM = d;
  function _(O, R, U) {
    var q = new o.DomHandler(O, R, U);
    return new n.Parser(q, R);
  }
  a.createDomStream = _;
  var l = Ba;
  Object.defineProperty(a, "Tokenizer", { enumerable: !0, get: function() {
    return i(l).default;
  } }), a.ElementType = s(Pe);
  var f = js, N = js;
  Object.defineProperty(a, "getFeed", { enumerable: !0, get: function() {
    return N.getFeed;
  } });
  var F = { xmlMode: !0 };
  function k(O, R) {
    return R === void 0 && (R = F), (0, f.getFeed)(d(O, R));
  }
  a.parseFeed = k, a.DomUtils = s(js);
})(on);
var Kc = (a) => {
  if (typeof a != "string")
    throw new TypeError("Expected a string");
  return a.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}, Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
function wi(a) {
  return Object.prototype.toString.call(a) === "[object Object]";
}
function zc(a) {
  var t, e;
  return wi(a) === !1 ? !1 : (t = a.constructor, t === void 0 ? !0 : (e = t.prototype, !(wi(e) === !1 || e.hasOwnProperty("isPrototypeOf") === !1)));
}
Ha.isPlainObject = zc;
var Gc = function(t) {
  return Jc(t) && !Hc(t);
};
function Jc(a) {
  return !!a && typeof a == "object";
}
function Hc(a) {
  var t = Object.prototype.toString.call(a);
  return t === "[object RegExp]" || t === "[object Date]" || t0(a);
}
var Wc = typeof Symbol == "function" && Symbol.for, $c = Wc ? Symbol.for("react.element") : 60103;
function t0(a) {
  return a.$$typeof === $c;
}
function e0(a) {
  return Array.isArray(a) ? [] : {};
}
function ls(a, t) {
  return t.clone !== !1 && t.isMergeableObject(a) ? Me(e0(a), a, t) : a;
}
function s0(a, t, e) {
  return a.concat(t).map(function(s) {
    return ls(s, e);
  });
}
function a0(a, t) {
  if (!t.customMerge)
    return Me;
  var e = t.customMerge(a);
  return typeof e == "function" ? e : Me;
}
function i0(a) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(a).filter(function(t) {
    return Object.propertyIsEnumerable.call(a, t);
  }) : [];
}
function ki(a) {
  return Object.keys(a).concat(i0(a));
}
function On(a, t) {
  try {
    return t in a;
  } catch {
    return !1;
  }
}
function n0(a, t) {
  return On(a, t) && !(Object.hasOwnProperty.call(a, t) && Object.propertyIsEnumerable.call(a, t));
}
function r0(a, t, e) {
  var s = {};
  return e.isMergeableObject(a) && ki(a).forEach(function(i) {
    s[i] = ls(a[i], e);
  }), ki(t).forEach(function(i) {
    n0(a, i) || (On(a, i) && e.isMergeableObject(t[i]) ? s[i] = a0(i, e)(a[i], t[i], e) : s[i] = ls(t[i], e));
  }), s;
}
function Me(a, t, e) {
  e = e || {}, e.arrayMerge = e.arrayMerge || s0, e.isMergeableObject = e.isMergeableObject || Gc, e.cloneUnlessOtherwiseSpecified = ls;
  var s = Array.isArray(t), i = Array.isArray(a), n = s === i;
  return n ? s ? e.arrayMerge(a, t, e) : r0(a, t, e) : ls(t, e);
}
Me.all = function(t, e) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(s, i) {
    return Me(s, i, e);
  }, {});
};
var o0 = Me, c0 = o0, jn = { exports: {} };
(function(a) {
  (function(t, e) {
    a.exports ? a.exports = e() : t.parseSrcset = e();
  })(X, function() {
    return function(t) {
      function e(q) {
        return q === " " || // space
        q === "	" || // horizontal tab
        q === `
` || // new line
        q === "\f" || // form feed
        q === "\r";
      }
      function s(q) {
        var G, it = q.exec(t.substring(k));
        if (it)
          return G = it[0], k += G.length, G;
      }
      for (var i = t.length, n = /^[ \t\n\r\u000c]+/, r = /^[, \t\n\r\u000c]+/, o = /^[^ \t\n\r\u000c]+/, c = /[,]+$/, u = /^\d+$/, d = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/, _, l, f, N, F, k = 0, O = []; ; ) {
        if (s(r), k >= i)
          return O;
        _ = s(o), l = [], _.slice(-1) === "," ? (_ = _.replace(c, ""), U()) : R();
      }
      function R() {
        for (s(n), f = "", N = "in descriptor"; ; ) {
          if (F = t.charAt(k), N === "in descriptor")
            if (e(F))
              f && (l.push(f), f = "", N = "after descriptor");
            else if (F === ",") {
              k += 1, f && l.push(f), U();
              return;
            } else if (F === "(")
              f = f + F, N = "in parens";
            else if (F === "") {
              f && l.push(f), U();
              return;
            } else
              f = f + F;
          else if (N === "in parens")
            if (F === ")")
              f = f + F, N = "in descriptor";
            else if (F === "") {
              l.push(f), U();
              return;
            } else
              f = f + F;
          else if (N === "after descriptor" && !e(F))
            if (F === "") {
              U();
              return;
            } else
              N = "in descriptor", k -= 1;
          k += 1;
        }
      }
      function U() {
        var q = !1, G, it, z, p, v = {}, w, h, y, E, A;
        for (p = 0; p < l.length; p++)
          w = l[p], h = w[w.length - 1], y = w.substring(0, w.length - 1), E = parseInt(y, 10), A = parseFloat(y), u.test(y) && h === "w" ? ((G || it) && (q = !0), E === 0 ? q = !0 : G = E) : d.test(y) && h === "x" ? ((G || it || z) && (q = !0), A < 0 ? q = !0 : it = A) : u.test(y) && h === "h" ? ((z || it) && (q = !0), E === 0 ? q = !0 : z = E) : q = !0;
        q ? console && console.log && console.log("Invalid srcset descriptor found in '" + t + "' at '" + w + "'.") : (v.url = _, G && (v.w = G), it && (v.d = it), z && (v.h = z), O.push(v));
      }
    };
  });
})(jn);
var u0 = jn.exports, Wa = { exports: {} }, W = String, Pn = function() {
  return { isColorSupported: !1, reset: W, bold: W, dim: W, italic: W, underline: W, inverse: W, hidden: W, strikethrough: W, black: W, red: W, green: W, yellow: W, blue: W, magenta: W, cyan: W, white: W, gray: W, bgBlack: W, bgRed: W, bgGreen: W, bgYellow: W, bgBlue: W, bgMagenta: W, bgCyan: W, bgWhite: W, blackBright: W, redBright: W, greenBright: W, yellowBright: W, blueBright: W, magentaBright: W, cyanBright: W, whiteBright: W, bgBlackBright: W, bgRedBright: W, bgGreenBright: W, bgYellowBright: W, bgBlueBright: W, bgMagentaBright: W, bgCyanBright: W, bgWhiteBright: W };
};
Wa.exports = Pn();
Wa.exports.createColors = Pn;
var l0 = Wa.exports;
const f0 = {}, d0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: f0
}, Symbol.toStringTag, { value: "Module" })), Mt = /* @__PURE__ */ Er(d0);
let _i = l0, Ai = Mt, Aa = class Dn extends Error {
  constructor(t, e, s, i, n, r) {
    super(t), this.name = "CssSyntaxError", this.reason = t, n && (this.file = n), i && (this.source = i), r && (this.plugin = r), typeof e < "u" && typeof s < "u" && (typeof e == "number" ? (this.line = e, this.column = s) : (this.line = e.line, this.column = e.column, this.endLine = s.line, this.endColumn = s.column)), this.setMessage(), Error.captureStackTrace && Error.captureStackTrace(this, Dn);
  }
  setMessage() {
    this.message = this.plugin ? this.plugin + ": " : "", this.message += this.file ? this.file : "<css input>", typeof this.line < "u" && (this.message += ":" + this.line + ":" + this.column), this.message += ": " + this.reason;
  }
  showSourceCode(t) {
    if (!this.source) return "";
    let e = this.source;
    t == null && (t = _i.isColorSupported);
    let s = (d) => d, i = (d) => d, n = (d) => d;
    if (t) {
      let { bold: d, gray: _, red: l } = _i.createColors(!0);
      i = (f) => d(l(f)), s = (f) => _(f), Ai && (n = (f) => Ai(f));
    }
    let r = e.split(/\r?\n/), o = Math.max(this.line - 3, 0), c = Math.min(this.line + 2, r.length), u = String(c).length;
    return r.slice(o, c).map((d, _) => {
      let l = o + 1 + _, f = " " + (" " + l).slice(-u) + " | ";
      if (l === this.line) {
        if (d.length > 160) {
          let F = 20, k = Math.max(0, this.column - F), O = Math.max(
            this.column + F,
            this.endColumn + F
          ), R = d.slice(k, O), U = s(f.replace(/\d/g, " ")) + d.slice(0, Math.min(this.column - 1, F - 1)).replace(/[^\t]/g, " ");
          return i(">") + s(f) + n(R) + `
 ` + U + i("^");
        }
        let N = s(f.replace(/\d/g, " ")) + d.slice(0, this.column - 1).replace(/[^\t]/g, " ");
        return i(">") + s(f) + n(d) + `
 ` + N + i("^");
      }
      return " " + s(f) + n(d);
    }).join(`
`);
  }
  toString() {
    let t = this.showSourceCode();
    return t && (t = `

` + t + `
`), this.name + ": " + this.message + t;
  }
};
var $a = Aa;
Aa.default = Aa;
const Ei = {
  after: `
`,
  beforeClose: `
`,
  beforeComment: `
`,
  beforeDecl: `
`,
  beforeOpen: " ",
  beforeRule: `
`,
  colon: ": ",
  commentLeft: " ",
  commentRight: " ",
  emptyBody: "",
  indent: "    ",
  semicolon: !1
};
function g0(a) {
  return a[0].toUpperCase() + a.slice(1);
}
let Ea = class {
  constructor(t) {
    this.builder = t;
  }
  atrule(t, e) {
    let s = "@" + t.name, i = t.params ? this.rawValue(t, "params") : "";
    if (typeof t.raws.afterName < "u" ? s += t.raws.afterName : i && (s += " "), t.nodes)
      this.block(t, s + i);
    else {
      let n = (t.raws.between || "") + (e ? ";" : "");
      this.builder(s + i + n, t);
    }
  }
  beforeAfter(t, e) {
    let s;
    t.type === "decl" ? s = this.raw(t, null, "beforeDecl") : t.type === "comment" ? s = this.raw(t, null, "beforeComment") : e === "before" ? s = this.raw(t, null, "beforeRule") : s = this.raw(t, null, "beforeClose");
    let i = t.parent, n = 0;
    for (; i && i.type !== "root"; )
      n += 1, i = i.parent;
    if (s.includes(`
`)) {
      let r = this.raw(t, null, "indent");
      if (r.length)
        for (let o = 0; o < n; o++) s += r;
    }
    return s;
  }
  block(t, e) {
    let s = this.raw(t, "between", "beforeOpen");
    this.builder(e + s + "{", t, "start");
    let i;
    t.nodes && t.nodes.length ? (this.body(t), i = this.raw(t, "after")) : i = this.raw(t, "after", "emptyBody"), i && this.builder(i), this.builder("}", t, "end");
  }
  body(t) {
    let e = t.nodes.length - 1;
    for (; e > 0 && t.nodes[e].type === "comment"; )
      e -= 1;
    let s = this.raw(t, "semicolon");
    for (let i = 0; i < t.nodes.length; i++) {
      let n = t.nodes[i], r = this.raw(n, "before");
      r && this.builder(r), this.stringify(n, e !== i || s);
    }
  }
  comment(t) {
    let e = this.raw(t, "left", "commentLeft"), s = this.raw(t, "right", "commentRight");
    this.builder("/*" + e + t.text + s + "*/", t);
  }
  decl(t, e) {
    let s = this.raw(t, "between", "colon"), i = t.prop + s + this.rawValue(t, "value");
    t.important && (i += t.raws.important || " !important"), e && (i += ";"), this.builder(i, t);
  }
  document(t) {
    this.body(t);
  }
  raw(t, e, s) {
    let i;
    if (s || (s = e), e && (i = t.raws[e], typeof i < "u"))
      return i;
    let n = t.parent;
    if (s === "before" && (!n || n.type === "root" && n.first === t || n && n.type === "document"))
      return "";
    if (!n) return Ei[s];
    let r = t.root();
    if (r.rawCache || (r.rawCache = {}), typeof r.rawCache[s] < "u")
      return r.rawCache[s];
    if (s === "before" || s === "after")
      return this.beforeAfter(t, s);
    {
      let o = "raw" + g0(s);
      this[o] ? i = this[o](r, t) : r.walk((c) => {
        if (i = c.raws[e], typeof i < "u") return !1;
      });
    }
    return typeof i > "u" && (i = Ei[s]), r.rawCache[s] = i, i;
  }
  rawBeforeClose(t) {
    let e;
    return t.walk((s) => {
      if (s.nodes && s.nodes.length > 0 && typeof s.raws.after < "u")
        return e = s.raws.after, e.includes(`
`) && (e = e.replace(/[^\n]+$/, "")), !1;
    }), e && (e = e.replace(/\S/g, "")), e;
  }
  rawBeforeComment(t, e) {
    let s;
    return t.walkComments((i) => {
      if (typeof i.raws.before < "u")
        return s = i.raws.before, s.includes(`
`) && (s = s.replace(/[^\n]+$/, "")), !1;
    }), typeof s > "u" ? s = this.raw(e, null, "beforeDecl") : s && (s = s.replace(/\S/g, "")), s;
  }
  rawBeforeDecl(t, e) {
    let s;
    return t.walkDecls((i) => {
      if (typeof i.raws.before < "u")
        return s = i.raws.before, s.includes(`
`) && (s = s.replace(/[^\n]+$/, "")), !1;
    }), typeof s > "u" ? s = this.raw(e, null, "beforeRule") : s && (s = s.replace(/\S/g, "")), s;
  }
  rawBeforeOpen(t) {
    let e;
    return t.walk((s) => {
      if (s.type !== "decl" && (e = s.raws.between, typeof e < "u"))
        return !1;
    }), e;
  }
  rawBeforeRule(t) {
    let e;
    return t.walk((s) => {
      if (s.nodes && (s.parent !== t || t.first !== s) && typeof s.raws.before < "u")
        return e = s.raws.before, e.includes(`
`) && (e = e.replace(/[^\n]+$/, "")), !1;
    }), e && (e = e.replace(/\S/g, "")), e;
  }
  rawColon(t) {
    let e;
    return t.walkDecls((s) => {
      if (typeof s.raws.between < "u")
        return e = s.raws.between.replace(/[^\s:]/g, ""), !1;
    }), e;
  }
  rawEmptyBody(t) {
    let e;
    return t.walk((s) => {
      if (s.nodes && s.nodes.length === 0 && (e = s.raws.after, typeof e < "u"))
        return !1;
    }), e;
  }
  rawIndent(t) {
    if (t.raws.indent) return t.raws.indent;
    let e;
    return t.walk((s) => {
      let i = s.parent;
      if (i && i !== t && i.parent && i.parent === t && typeof s.raws.before < "u") {
        let n = s.raws.before.split(`
`);
        return e = n[n.length - 1], e = e.replace(/\S/g, ""), !1;
      }
    }), e;
  }
  rawSemicolon(t) {
    let e;
    return t.walk((s) => {
      if (s.nodes && s.nodes.length && s.last.type === "decl" && (e = s.raws.semicolon, typeof e < "u"))
        return !1;
    }), e;
  }
  rawValue(t, e) {
    let s = t[e], i = t.raws[e];
    return i && i.value === s ? i.raw : s;
  }
  root(t) {
    this.body(t), t.raws.after && this.builder(t.raws.after);
  }
  rule(t) {
    this.block(t, this.rawValue(t, "selector")), t.raws.ownSemicolon && this.builder(t.raws.ownSemicolon, t, "end");
  }
  stringify(t, e) {
    if (!this[t.type])
      throw new Error(
        "Unknown AST node type " + t.type + ". Maybe you need to change PostCSS stringifier."
      );
    this[t.type](t, e);
  }
};
var Ln = Ea;
Ea.default = Ea;
let h0 = Ln;
function Sa(a, t) {
  new h0(t).stringify(a);
}
var aa = Sa;
Sa.default = Sa;
var ws = {};
ws.isClean = Symbol("isClean");
ws.my = Symbol("my");
let p0 = $a, m0 = Ln, v0 = aa, { isClean: Ze, my: b0 } = ws;
function Ca(a, t) {
  let e = new a.constructor();
  for (let s in a) {
    if (!Object.prototype.hasOwnProperty.call(a, s) || s === "proxyCache") continue;
    let i = a[s], n = typeof i;
    s === "parent" && n === "object" ? t && (e[s] = t) : s === "source" ? e[s] = i : Array.isArray(i) ? e[s] = i.map((r) => Ca(r, e)) : (n === "object" && i !== null && (i = Ca(i)), e[s] = i);
  }
  return e;
}
function Qe(a, t) {
  if (t && typeof t.offset < "u")
    return t.offset;
  let e = 1, s = 1, i = 0;
  for (let n = 0; n < a.length; n++) {
    if (s === t.line && e === t.column) {
      i = n;
      break;
    }
    a[n] === `
` ? (e = 1, s += 1) : e += 1;
  }
  return i;
}
let Ia = class {
  constructor(t = {}) {
    this.raws = {}, this[Ze] = !1, this[b0] = !0;
    for (let e in t)
      if (e === "nodes") {
        this.nodes = [];
        for (let s of t[e])
          typeof s.clone == "function" ? this.append(s.clone()) : this.append(s);
      } else
        this[e] = t[e];
  }
  addToError(t) {
    if (t.postcssNode = this, t.stack && this.source && /\n\s{4}at /.test(t.stack)) {
      let e = this.source;
      t.stack = t.stack.replace(
        /\n\s{4}at /,
        `$&${e.input.from}:${e.start.line}:${e.start.column}$&`
      );
    }
    return t;
  }
  after(t) {
    return this.parent.insertAfter(this, t), this;
  }
  assign(t = {}) {
    for (let e in t)
      this[e] = t[e];
    return this;
  }
  before(t) {
    return this.parent.insertBefore(this, t), this;
  }
  cleanRaws(t) {
    delete this.raws.before, delete this.raws.after, t || delete this.raws.between;
  }
  clone(t = {}) {
    let e = Ca(this);
    for (let s in t)
      e[s] = t[s];
    return e;
  }
  cloneAfter(t = {}) {
    let e = this.clone(t);
    return this.parent.insertAfter(this, e), e;
  }
  cloneBefore(t = {}) {
    let e = this.clone(t);
    return this.parent.insertBefore(this, e), e;
  }
  error(t, e = {}) {
    if (this.source) {
      let { end: s, start: i } = this.rangeBy(e);
      return this.source.input.error(
        t,
        { column: i.column, line: i.line },
        { column: s.column, line: s.line },
        e
      );
    }
    return new p0(t);
  }
  getProxyProcessor() {
    return {
      get(t, e) {
        return e === "proxyOf" ? t : e === "root" ? () => t.root().toProxy() : t[e];
      },
      set(t, e, s) {
        return t[e] === s || (t[e] = s, (e === "prop" || e === "value" || e === "name" || e === "params" || e === "important" || /* c8 ignore next */
        e === "text") && t.markDirty()), !0;
      }
    };
  }
  /* c8 ignore next 3 */
  markClean() {
    this[Ze] = !0;
  }
  markDirty() {
    if (this[Ze]) {
      this[Ze] = !1;
      let t = this;
      for (; t = t.parent; )
        t[Ze] = !1;
    }
  }
  next() {
    if (!this.parent) return;
    let t = this.parent.index(this);
    return this.parent.nodes[t + 1];
  }
  positionBy(t) {
    let e = this.source.start;
    if (t.index)
      e = this.positionInside(t.index);
    else if (t.word) {
      let s = "document" in this.source.input ? this.source.input.document : this.source.input.css, n = s.slice(
        Qe(s, this.source.start),
        Qe(s, this.source.end)
      ).indexOf(t.word);
      n !== -1 && (e = this.positionInside(n));
    }
    return e;
  }
  positionInside(t) {
    let e = this.source.start.column, s = this.source.start.line, i = "document" in this.source.input ? this.source.input.document : this.source.input.css, n = Qe(i, this.source.start), r = n + t;
    for (let o = n; o < r; o++)
      i[o] === `
` ? (e = 1, s += 1) : e += 1;
    return { column: e, line: s };
  }
  prev() {
    if (!this.parent) return;
    let t = this.parent.index(this);
    return this.parent.nodes[t - 1];
  }
  rangeBy(t) {
    let e = {
      column: this.source.start.column,
      line: this.source.start.line
    }, s = this.source.end ? {
      column: this.source.end.column + 1,
      line: this.source.end.line
    } : {
      column: e.column + 1,
      line: e.line
    };
    if (t.word) {
      let i = "document" in this.source.input ? this.source.input.document : this.source.input.css, r = i.slice(
        Qe(i, this.source.start),
        Qe(i, this.source.end)
      ).indexOf(t.word);
      r !== -1 && (e = this.positionInside(r), s = this.positionInside(
        r + t.word.length
      ));
    } else
      t.start ? e = {
        column: t.start.column,
        line: t.start.line
      } : t.index && (e = this.positionInside(t.index)), t.end ? s = {
        column: t.end.column,
        line: t.end.line
      } : typeof t.endIndex == "number" ? s = this.positionInside(t.endIndex) : t.index && (s = this.positionInside(t.index + 1));
    return (s.line < e.line || s.line === e.line && s.column <= e.column) && (s = { column: e.column + 1, line: e.line }), { end: s, start: e };
  }
  raw(t, e) {
    return new m0().raw(this, t, e);
  }
  remove() {
    return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
  }
  replaceWith(...t) {
    if (this.parent) {
      let e = this, s = !1;
      for (let i of t)
        i === this ? s = !0 : s ? (this.parent.insertAfter(e, i), e = i) : this.parent.insertBefore(e, i);
      s || this.remove();
    }
    return this;
  }
  root() {
    let t = this;
    for (; t.parent && t.parent.type !== "document"; )
      t = t.parent;
    return t;
  }
  toJSON(t, e) {
    let s = {}, i = e == null;
    e = e || /* @__PURE__ */ new Map();
    let n = 0;
    for (let r in this) {
      if (!Object.prototype.hasOwnProperty.call(this, r) || r === "parent" || r === "proxyCache") continue;
      let o = this[r];
      if (Array.isArray(o))
        s[r] = o.map((c) => typeof c == "object" && c.toJSON ? c.toJSON(null, e) : c);
      else if (typeof o == "object" && o.toJSON)
        s[r] = o.toJSON(null, e);
      else if (r === "source") {
        let c = e.get(o.input);
        c == null && (c = n, e.set(o.input, n), n++), s[r] = {
          end: o.end,
          inputId: c,
          start: o.start
        };
      } else
        s[r] = o;
    }
    return i && (s.inputs = [...e.keys()].map((r) => r.toJSON())), s;
  }
  toProxy() {
    return this.proxyCache || (this.proxyCache = new Proxy(this, this.getProxyProcessor())), this.proxyCache;
  }
  toString(t = v0) {
    t.stringify && (t = t.stringify);
    let e = "";
    return t(this, (s) => {
      e += s;
    }), e;
  }
  warn(t, e, s) {
    let i = { node: this };
    for (let n in s) i[n] = s[n];
    return t.warn(e, i);
  }
  get proxyOf() {
    return this;
  }
};
var ia = Ia;
Ia.default = Ia;
let y0 = ia, Na = class extends y0 {
  constructor(t) {
    super(t), this.type = "comment";
  }
};
var na = Na;
Na.default = Na;
let x0 = ia, Ta = class extends x0 {
  constructor(t) {
    t && typeof t.value < "u" && typeof t.value != "string" && (t = { ...t, value: String(t.value) }), super(t), this.type = "decl";
  }
  get variable() {
    return this.prop.startsWith("--") || this.prop[0] === "$";
  }
};
var ra = Ta;
Ta.default = Ta;
let Rn = na, Zn = ra, w0 = ia, { isClean: Qn, my: Vn } = ws, ti, Bn, qn, ei;
function Un(a) {
  return a.map((t) => (t.nodes && (t.nodes = Un(t.nodes)), delete t.source, t));
}
function Xn(a) {
  if (a[Qn] = !1, a.proxyOf.nodes)
    for (let t of a.proxyOf.nodes)
      Xn(t);
}
let Gt = class Yn extends w0 {
  append(...t) {
    for (let e of t) {
      let s = this.normalize(e, this.last);
      for (let i of s) this.proxyOf.nodes.push(i);
    }
    return this.markDirty(), this;
  }
  cleanRaws(t) {
    if (super.cleanRaws(t), this.nodes)
      for (let e of this.nodes) e.cleanRaws(t);
  }
  each(t) {
    if (!this.proxyOf.nodes) return;
    let e = this.getIterator(), s, i;
    for (; this.indexes[e] < this.proxyOf.nodes.length && (s = this.indexes[e], i = t(this.proxyOf.nodes[s], s), i !== !1); )
      this.indexes[e] += 1;
    return delete this.indexes[e], i;
  }
  every(t) {
    return this.nodes.every(t);
  }
  getIterator() {
    this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach += 1;
    let t = this.lastEach;
    return this.indexes[t] = 0, t;
  }
  getProxyProcessor() {
    return {
      get(t, e) {
        return e === "proxyOf" ? t : t[e] ? e === "each" || typeof e == "string" && e.startsWith("walk") ? (...s) => t[e](
          ...s.map((i) => typeof i == "function" ? (n, r) => i(n.toProxy(), r) : i)
        ) : e === "every" || e === "some" ? (s) => t[e](
          (i, ...n) => s(i.toProxy(), ...n)
        ) : e === "root" ? () => t.root().toProxy() : e === "nodes" ? t.nodes.map((s) => s.toProxy()) : e === "first" || e === "last" ? t[e].toProxy() : t[e] : t[e];
      },
      set(t, e, s) {
        return t[e] === s || (t[e] = s, (e === "name" || e === "params" || e === "selector") && t.markDirty()), !0;
      }
    };
  }
  index(t) {
    return typeof t == "number" ? t : (t.proxyOf && (t = t.proxyOf), this.proxyOf.nodes.indexOf(t));
  }
  insertAfter(t, e) {
    let s = this.index(t), i = this.normalize(e, this.proxyOf.nodes[s]).reverse();
    s = this.index(t);
    for (let r of i) this.proxyOf.nodes.splice(s + 1, 0, r);
    let n;
    for (let r in this.indexes)
      n = this.indexes[r], s < n && (this.indexes[r] = n + i.length);
    return this.markDirty(), this;
  }
  insertBefore(t, e) {
    let s = this.index(t), i = s === 0 ? "prepend" : !1, n = this.normalize(
      e,
      this.proxyOf.nodes[s],
      i
    ).reverse();
    s = this.index(t);
    for (let o of n) this.proxyOf.nodes.splice(s, 0, o);
    let r;
    for (let o in this.indexes)
      r = this.indexes[o], s <= r && (this.indexes[o] = r + n.length);
    return this.markDirty(), this;
  }
  normalize(t, e) {
    if (typeof t == "string")
      t = Un(Bn(t).nodes);
    else if (typeof t > "u")
      t = [];
    else if (Array.isArray(t)) {
      t = t.slice(0);
      for (let i of t)
        i.parent && i.parent.removeChild(i, "ignore");
    } else if (t.type === "root" && this.type !== "document") {
      t = t.nodes.slice(0);
      for (let i of t)
        i.parent && i.parent.removeChild(i, "ignore");
    } else if (t.type)
      t = [t];
    else if (t.prop) {
      if (typeof t.value > "u")
        throw new Error("Value field is missed in node creation");
      typeof t.value != "string" && (t.value = String(t.value)), t = [new Zn(t)];
    } else if (t.selector || t.selectors)
      t = [new ei(t)];
    else if (t.name)
      t = [new ti(t)];
    else if (t.text)
      t = [new Rn(t)];
    else
      throw new Error("Unknown node type in node creation");
    return t.map((i) => (i[Vn] || Yn.rebuild(i), i = i.proxyOf, i.parent && i.parent.removeChild(i), i[Qn] && Xn(i), i.raws || (i.raws = {}), typeof i.raws.before > "u" && e && typeof e.raws.before < "u" && (i.raws.before = e.raws.before.replace(/\S/g, "")), i.parent = this.proxyOf, i));
  }
  prepend(...t) {
    t = t.reverse();
    for (let e of t) {
      let s = this.normalize(e, this.first, "prepend").reverse();
      for (let i of s) this.proxyOf.nodes.unshift(i);
      for (let i in this.indexes)
        this.indexes[i] = this.indexes[i] + s.length;
    }
    return this.markDirty(), this;
  }
  push(t) {
    return t.parent = this, this.proxyOf.nodes.push(t), this;
  }
  removeAll() {
    for (let t of this.proxyOf.nodes) t.parent = void 0;
    return this.proxyOf.nodes = [], this.markDirty(), this;
  }
  removeChild(t) {
    t = this.index(t), this.proxyOf.nodes[t].parent = void 0, this.proxyOf.nodes.splice(t, 1);
    let e;
    for (let s in this.indexes)
      e = this.indexes[s], e >= t && (this.indexes[s] = e - 1);
    return this.markDirty(), this;
  }
  replaceValues(t, e, s) {
    return s || (s = e, e = {}), this.walkDecls((i) => {
      e.props && !e.props.includes(i.prop) || e.fast && !i.value.includes(e.fast) || (i.value = i.value.replace(t, s));
    }), this.markDirty(), this;
  }
  some(t) {
    return this.nodes.some(t);
  }
  walk(t) {
    return this.each((e, s) => {
      let i;
      try {
        i = t(e, s);
      } catch (n) {
        throw e.addToError(n);
      }
      return i !== !1 && e.walk && (i = e.walk(t)), i;
    });
  }
  walkAtRules(t, e) {
    return e ? t instanceof RegExp ? this.walk((s, i) => {
      if (s.type === "atrule" && t.test(s.name))
        return e(s, i);
    }) : this.walk((s, i) => {
      if (s.type === "atrule" && s.name === t)
        return e(s, i);
    }) : (e = t, this.walk((s, i) => {
      if (s.type === "atrule")
        return e(s, i);
    }));
  }
  walkComments(t) {
    return this.walk((e, s) => {
      if (e.type === "comment")
        return t(e, s);
    });
  }
  walkDecls(t, e) {
    return e ? t instanceof RegExp ? this.walk((s, i) => {
      if (s.type === "decl" && t.test(s.prop))
        return e(s, i);
    }) : this.walk((s, i) => {
      if (s.type === "decl" && s.prop === t)
        return e(s, i);
    }) : (e = t, this.walk((s, i) => {
      if (s.type === "decl")
        return e(s, i);
    }));
  }
  walkRules(t, e) {
    return e ? t instanceof RegExp ? this.walk((s, i) => {
      if (s.type === "rule" && t.test(s.selector))
        return e(s, i);
    }) : this.walk((s, i) => {
      if (s.type === "rule" && s.selector === t)
        return e(s, i);
    }) : (e = t, this.walk((s, i) => {
      if (s.type === "rule")
        return e(s, i);
    }));
  }
  get first() {
    if (this.proxyOf.nodes)
      return this.proxyOf.nodes[0];
  }
  get last() {
    if (this.proxyOf.nodes)
      return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
  }
};
Gt.registerParse = (a) => {
  Bn = a;
};
Gt.registerRule = (a) => {
  ei = a;
};
Gt.registerAtRule = (a) => {
  ti = a;
};
Gt.registerRoot = (a) => {
  qn = a;
};
var be = Gt;
Gt.default = Gt;
Gt.rebuild = (a) => {
  a.type === "atrule" ? Object.setPrototypeOf(a, ti.prototype) : a.type === "rule" ? Object.setPrototypeOf(a, ei.prototype) : a.type === "decl" ? Object.setPrototypeOf(a, Zn.prototype) : a.type === "comment" ? Object.setPrototypeOf(a, Rn.prototype) : a.type === "root" && Object.setPrototypeOf(a, qn.prototype), a[Vn] = !0, a.nodes && a.nodes.forEach((t) => {
    Gt.rebuild(t);
  });
};
let Kn = be, Gs = class extends Kn {
  constructor(t) {
    super(t), this.type = "atrule";
  }
  append(...t) {
    return this.proxyOf.nodes || (this.nodes = []), super.append(...t);
  }
  prepend(...t) {
    return this.proxyOf.nodes || (this.nodes = []), super.prepend(...t);
  }
};
var si = Gs;
Gs.default = Gs;
Kn.registerAtRule(Gs);
let k0 = be, zn, Gn, fs = class extends k0 {
  constructor(t) {
    super({ type: "document", ...t }), this.nodes || (this.nodes = []);
  }
  toResult(t = {}) {
    return new zn(new Gn(), this, t).stringify();
  }
};
fs.registerLazyResult = (a) => {
  zn = a;
};
fs.registerProcessor = (a) => {
  Gn = a;
};
var ai = fs;
fs.default = fs;
let _0 = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", A0 = (a, t = 21) => (e = t) => {
  let s = "", i = e | 0;
  for (; i--; )
    s += a[Math.random() * a.length | 0];
  return s;
}, E0 = (a = 21) => {
  let t = "", e = a | 0;
  for (; e--; )
    t += _0[Math.random() * 64 | 0];
  return t;
};
var S0 = { nanoid: E0, customAlphabet: A0 };
let { existsSync: C0, readFileSync: I0 } = Mt, { dirname: da, join: N0 } = Mt, { SourceMapConsumer: Si, SourceMapGenerator: Ci } = Mt;
function T0(a) {
  return Buffer ? Buffer.from(a, "base64").toString() : window.atob(a);
}
let Ma = class {
  constructor(t, e) {
    if (e.map === !1) return;
    this.loadAnnotation(t), this.inline = this.startWith(this.annotation, "data:");
    let s = e.map ? e.map.prev : void 0, i = this.loadMap(e.from, s);
    !this.mapFile && e.from && (this.mapFile = e.from), this.mapFile && (this.root = da(this.mapFile)), i && (this.text = i);
  }
  consumer() {
    return this.consumerCache || (this.consumerCache = new Si(this.text)), this.consumerCache;
  }
  decodeInline(t) {
    let e = /^data:application\/json;charset=utf-?8;base64,/, s = /^data:application\/json;base64,/, i = /^data:application\/json;charset=utf-?8,/, n = /^data:application\/json,/, r = t.match(i) || t.match(n);
    if (r)
      return decodeURIComponent(t.substr(r[0].length));
    let o = t.match(e) || t.match(s);
    if (o)
      return T0(t.substr(o[0].length));
    let c = t.match(/data:application\/json;([^,]+),/)[1];
    throw new Error("Unsupported source map encoding " + c);
  }
  getAnnotationURL(t) {
    return t.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
  }
  isMap(t) {
    return typeof t != "object" ? !1 : typeof t.mappings == "string" || typeof t._mappings == "string" || Array.isArray(t.sections);
  }
  loadAnnotation(t) {
    let e = t.match(/\/\*\s*# sourceMappingURL=/g);
    if (!e) return;
    let s = t.lastIndexOf(e.pop()), i = t.indexOf("*/", s);
    s > -1 && i > -1 && (this.annotation = this.getAnnotationURL(t.substring(s, i)));
  }
  loadFile(t) {
    if (this.root = da(t), C0(t))
      return this.mapFile = t, I0(t, "utf-8").toString().trim();
  }
  loadMap(t, e) {
    if (e === !1) return !1;
    if (e) {
      if (typeof e == "string")
        return e;
      if (typeof e == "function") {
        let s = e(t);
        if (s) {
          let i = this.loadFile(s);
          if (!i)
            throw new Error(
              "Unable to load previous source map: " + s.toString()
            );
          return i;
        }
      } else {
        if (e instanceof Si)
          return Ci.fromSourceMap(e).toString();
        if (e instanceof Ci)
          return e.toString();
        if (this.isMap(e))
          return JSON.stringify(e);
        throw new Error(
          "Unsupported previous source map format: " + e.toString()
        );
      }
    } else {
      if (this.inline)
        return this.decodeInline(this.annotation);
      if (this.annotation) {
        let s = this.annotation;
        return t && (s = N0(da(t), s)), this.loadFile(s);
      }
    }
  }
  startWith(t, e) {
    return t ? t.substr(0, e.length) === e : !1;
  }
  withContent() {
    return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
  }
};
var Jn = Ma;
Ma.default = Ma;
let { nanoid: M0 } = S0, { isAbsolute: Fa, resolve: Oa } = Mt, { SourceMapConsumer: F0, SourceMapGenerator: O0 } = Mt, { fileURLToPath: Ii, pathToFileURL: Es } = Mt, Ni = $a, j0 = Jn, ga = Mt, ha = Symbol("fromOffsetCache"), P0 = !!(F0 && O0), Ti = !!(Oa && Fa), Js = class {
  constructor(t, e = {}) {
    if (t === null || typeof t > "u" || typeof t == "object" && !t.toString)
      throw new Error(`PostCSS received ${t} instead of CSS string`);
    if (this.css = t.toString(), this.css[0] === "\uFEFF" || this.css[0] === "￾" ? (this.hasBOM = !0, this.css = this.css.slice(1)) : this.hasBOM = !1, this.document = this.css, e.document && (this.document = e.document.toString()), e.from && (!Ti || /^\w+:\/\//.test(e.from) || Fa(e.from) ? this.file = e.from : this.file = Oa(e.from)), Ti && P0) {
      let s = new j0(this.css, e);
      if (s.text) {
        this.map = s;
        let i = s.consumer().file;
        !this.file && i && (this.file = this.mapResolve(i));
      }
    }
    this.file || (this.id = "<input css " + M0(6) + ">"), this.map && (this.map.file = this.from);
  }
  error(t, e, s, i = {}) {
    let n, r, o;
    if (e && typeof e == "object") {
      let u = e, d = s;
      if (typeof u.offset == "number") {
        let _ = this.fromOffset(u.offset);
        e = _.line, s = _.col;
      } else
        e = u.line, s = u.column;
      if (typeof d.offset == "number") {
        let _ = this.fromOffset(d.offset);
        r = _.line, n = _.col;
      } else
        r = d.line, n = d.column;
    } else if (!s) {
      let u = this.fromOffset(e);
      e = u.line, s = u.col;
    }
    let c = this.origin(e, s, r, n);
    return c ? o = new Ni(
      t,
      c.endLine === void 0 ? c.line : { column: c.column, line: c.line },
      c.endLine === void 0 ? c.column : { column: c.endColumn, line: c.endLine },
      c.source,
      c.file,
      i.plugin
    ) : o = new Ni(
      t,
      r === void 0 ? e : { column: s, line: e },
      r === void 0 ? s : { column: n, line: r },
      this.css,
      this.file,
      i.plugin
    ), o.input = { column: s, endColumn: n, endLine: r, line: e, source: this.css }, this.file && (Es && (o.input.url = Es(this.file).toString()), o.input.file = this.file), o;
  }
  fromOffset(t) {
    let e, s;
    if (this[ha])
      s = this[ha];
    else {
      let n = this.css.split(`
`);
      s = new Array(n.length);
      let r = 0;
      for (let o = 0, c = n.length; o < c; o++)
        s[o] = r, r += n[o].length + 1;
      this[ha] = s;
    }
    e = s[s.length - 1];
    let i = 0;
    if (t >= e)
      i = s.length - 1;
    else {
      let n = s.length - 2, r;
      for (; i < n; )
        if (r = i + (n - i >> 1), t < s[r])
          n = r - 1;
        else if (t >= s[r + 1])
          i = r + 1;
        else {
          i = r;
          break;
        }
    }
    return {
      col: t - s[i] + 1,
      line: i + 1
    };
  }
  mapResolve(t) {
    return /^\w+:\/\//.test(t) ? t : Oa(this.map.consumer().sourceRoot || this.map.root || ".", t);
  }
  origin(t, e, s, i) {
    if (!this.map) return !1;
    let n = this.map.consumer(), r = n.originalPositionFor({ column: e, line: t });
    if (!r.source) return !1;
    let o;
    typeof s == "number" && (o = n.originalPositionFor({ column: i, line: s }));
    let c;
    Fa(r.source) ? c = Es(r.source) : c = new URL(
      r.source,
      this.map.consumer().sourceRoot || Es(this.map.mapFile)
    );
    let u = {
      column: r.column,
      endColumn: o && o.column,
      endLine: o && o.line,
      line: r.line,
      url: c.toString()
    };
    if (c.protocol === "file:")
      if (Ii)
        u.file = Ii(c);
      else
        throw new Error("file: protocol is not available in this PostCSS build");
    let d = n.sourceContentFor(r.source);
    return d && (u.source = d), u;
  }
  toJSON() {
    let t = {};
    for (let e of ["hasBOM", "css", "file", "id"])
      this[e] != null && (t[e] = this[e]);
    return this.map && (t.map = { ...this.map }, t.map.consumerCache && (t.map.consumerCache = void 0)), t;
  }
  get from() {
    return this.file || this.id;
  }
};
var oa = Js;
Js.default = Js;
ga && ga.registerInput && ga.registerInput(Js);
let Hn = be, Wn, $n, Fe = class extends Hn {
  constructor(t) {
    super(t), this.type = "root", this.nodes || (this.nodes = []);
  }
  normalize(t, e, s) {
    let i = super.normalize(t);
    if (e) {
      if (s === "prepend")
        this.nodes.length > 1 ? e.raws.before = this.nodes[1].raws.before : delete e.raws.before;
      else if (this.first !== e)
        for (let n of i)
          n.raws.before = e.raws.before;
    }
    return i;
  }
  removeChild(t, e) {
    let s = this.index(t);
    return !e && s === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[s].raws.before), super.removeChild(t);
  }
  toResult(t = {}) {
    return new Wn(new $n(), this, t).stringify();
  }
};
Fe.registerLazyResult = (a) => {
  Wn = a;
};
Fe.registerProcessor = (a) => {
  $n = a;
};
var ks = Fe;
Fe.default = Fe;
Hn.registerRoot(Fe);
let ds = {
  comma(a) {
    return ds.split(a, [","], !0);
  },
  space(a) {
    let t = [" ", `
`, "	"];
    return ds.split(a, t);
  },
  split(a, t, e) {
    let s = [], i = "", n = !1, r = 0, o = !1, c = "", u = !1;
    for (let d of a)
      u ? u = !1 : d === "\\" ? u = !0 : o ? d === c && (o = !1) : d === '"' || d === "'" ? (o = !0, c = d) : d === "(" ? r += 1 : d === ")" ? r > 0 && (r -= 1) : r === 0 && t.includes(d) && (n = !0), n ? (i !== "" && s.push(i.trim()), i = "", n = !1) : i += d;
    return (e || i !== "") && s.push(i.trim()), s;
  }
};
var tr = ds;
ds.default = ds;
let er = be, D0 = tr, Hs = class extends er {
  constructor(t) {
    super(t), this.type = "rule", this.nodes || (this.nodes = []);
  }
  get selectors() {
    return D0.comma(this.selector);
  }
  set selectors(t) {
    let e = this.selector ? this.selector.match(/,\s*/) : null, s = e ? e[0] : "," + this.raw("between", "beforeOpen");
    this.selector = t.join(s);
  }
};
var ii = Hs;
Hs.default = Hs;
er.registerRule(Hs);
let L0 = si, R0 = na, Z0 = ra, Q0 = oa, V0 = Jn, B0 = ks, q0 = ii;
function gs(a, t) {
  if (Array.isArray(a)) return a.map((i) => gs(i));
  let { inputs: e, ...s } = a;
  if (e) {
    t = [];
    for (let i of e) {
      let n = { ...i, __proto__: Q0.prototype };
      n.map && (n.map = {
        ...n.map,
        __proto__: V0.prototype
      }), t.push(n);
    }
  }
  if (s.nodes && (s.nodes = a.nodes.map((i) => gs(i, t))), s.source) {
    let { inputId: i, ...n } = s.source;
    s.source = n, i != null && (s.source.input = t[i]);
  }
  if (s.type === "root")
    return new B0(s);
  if (s.type === "decl")
    return new Z0(s);
  if (s.type === "rule")
    return new q0(s);
  if (s.type === "comment")
    return new R0(s);
  if (s.type === "atrule")
    return new L0(s);
  throw new Error("Unknown node type: " + a.type);
}
var U0 = gs;
gs.default = gs;
let { dirname: Ds, relative: sr, resolve: ar, sep: ir } = Mt, { SourceMapConsumer: nr, SourceMapGenerator: Ls } = Mt, { pathToFileURL: Mi } = Mt, X0 = oa, Y0 = !!(nr && Ls), K0 = !!(Ds && ar && sr && ir), z0 = class {
  constructor(t, e, s, i) {
    this.stringify = t, this.mapOpts = s.map || {}, this.root = e, this.opts = s, this.css = i, this.originalCSS = i, this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute, this.memoizedFileURLs = /* @__PURE__ */ new Map(), this.memoizedPaths = /* @__PURE__ */ new Map(), this.memoizedURLs = /* @__PURE__ */ new Map();
  }
  addAnnotation() {
    let t;
    this.isInline() ? t = "data:application/json;base64," + this.toBase64(this.map.toString()) : typeof this.mapOpts.annotation == "string" ? t = this.mapOpts.annotation : typeof this.mapOpts.annotation == "function" ? t = this.mapOpts.annotation(this.opts.to, this.root) : t = this.outputFile() + ".map";
    let e = `
`;
    this.css.includes(`\r
`) && (e = `\r
`), this.css += e + "/*# sourceMappingURL=" + t + " */";
  }
  applyPrevMaps() {
    for (let t of this.previous()) {
      let e = this.toUrl(this.path(t.file)), s = t.root || Ds(t.file), i;
      this.mapOpts.sourcesContent === !1 ? (i = new nr(t.text), i.sourcesContent && (i.sourcesContent = null)) : i = t.consumer(), this.map.applySourceMap(i, e, this.toUrl(this.path(s)));
    }
  }
  clearAnnotation() {
    if (this.mapOpts.annotation !== !1)
      if (this.root) {
        let t;
        for (let e = this.root.nodes.length - 1; e >= 0; e--)
          t = this.root.nodes[e], t.type === "comment" && t.text.startsWith("# sourceMappingURL=") && this.root.removeChild(e);
      } else this.css && (this.css = this.css.replace(/\n*\/\*#[\S\s]*?\*\/$/gm, ""));
  }
  generate() {
    if (this.clearAnnotation(), K0 && Y0 && this.isMap())
      return this.generateMap();
    {
      let t = "";
      return this.stringify(this.root, (e) => {
        t += e;
      }), [t];
    }
  }
  generateMap() {
    if (this.root)
      this.generateString();
    else if (this.previous().length === 1) {
      let t = this.previous()[0].consumer();
      t.file = this.outputFile(), this.map = Ls.fromSourceMap(t, {
        ignoreInvalidMapping: !0
      });
    } else
      this.map = new Ls({
        file: this.outputFile(),
        ignoreInvalidMapping: !0
      }), this.map.addMapping({
        generated: { column: 0, line: 1 },
        original: { column: 0, line: 1 },
        source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
      });
    return this.isSourcesContent() && this.setSourcesContent(), this.root && this.previous().length > 0 && this.applyPrevMaps(), this.isAnnotation() && this.addAnnotation(), this.isInline() ? [this.css] : [this.css, this.map];
  }
  generateString() {
    this.css = "", this.map = new Ls({
      file: this.outputFile(),
      ignoreInvalidMapping: !0
    });
    let t = 1, e = 1, s = "<no source>", i = {
      generated: { column: 0, line: 0 },
      original: { column: 0, line: 0 },
      source: ""
    }, n, r;
    this.stringify(this.root, (o, c, u) => {
      if (this.css += o, c && u !== "end" && (i.generated.line = t, i.generated.column = e - 1, c.source && c.source.start ? (i.source = this.sourcePath(c), i.original.line = c.source.start.line, i.original.column = c.source.start.column - 1, this.map.addMapping(i)) : (i.source = s, i.original.line = 1, i.original.column = 0, this.map.addMapping(i))), r = o.match(/\n/g), r ? (t += r.length, n = o.lastIndexOf(`
`), e = o.length - n) : e += o.length, c && u !== "start") {
        let d = c.parent || { raws: {} };
        (!(c.type === "decl" || c.type === "atrule" && !c.nodes) || c !== d.last || d.raws.semicolon) && (c.source && c.source.end ? (i.source = this.sourcePath(c), i.original.line = c.source.end.line, i.original.column = c.source.end.column - 1, i.generated.line = t, i.generated.column = e - 2, this.map.addMapping(i)) : (i.source = s, i.original.line = 1, i.original.column = 0, i.generated.line = t, i.generated.column = e - 1, this.map.addMapping(i)));
      }
    });
  }
  isAnnotation() {
    return this.isInline() ? !0 : typeof this.mapOpts.annotation < "u" ? this.mapOpts.annotation : this.previous().length ? this.previous().some((t) => t.annotation) : !0;
  }
  isInline() {
    if (typeof this.mapOpts.inline < "u")
      return this.mapOpts.inline;
    let t = this.mapOpts.annotation;
    return typeof t < "u" && t !== !0 ? !1 : this.previous().length ? this.previous().some((e) => e.inline) : !0;
  }
  isMap() {
    return typeof this.opts.map < "u" ? !!this.opts.map : this.previous().length > 0;
  }
  isSourcesContent() {
    return typeof this.mapOpts.sourcesContent < "u" ? this.mapOpts.sourcesContent : this.previous().length ? this.previous().some((t) => t.withContent()) : !0;
  }
  outputFile() {
    return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : "to.css";
  }
  path(t) {
    if (this.mapOpts.absolute || t.charCodeAt(0) === 60 || /^\w+:\/\//.test(t)) return t;
    let e = this.memoizedPaths.get(t);
    if (e) return e;
    let s = this.opts.to ? Ds(this.opts.to) : ".";
    typeof this.mapOpts.annotation == "string" && (s = Ds(ar(s, this.mapOpts.annotation)));
    let i = sr(s, t);
    return this.memoizedPaths.set(t, i), i;
  }
  previous() {
    if (!this.previousMaps)
      if (this.previousMaps = [], this.root)
        this.root.walk((t) => {
          if (t.source && t.source.input.map) {
            let e = t.source.input.map;
            this.previousMaps.includes(e) || this.previousMaps.push(e);
          }
        });
      else {
        let t = new X0(this.originalCSS, this.opts);
        t.map && this.previousMaps.push(t.map);
      }
    return this.previousMaps;
  }
  setSourcesContent() {
    let t = {};
    if (this.root)
      this.root.walk((e) => {
        if (e.source) {
          let s = e.source.input.from;
          if (s && !t[s]) {
            t[s] = !0;
            let i = this.usesFileUrls ? this.toFileUrl(s) : this.toUrl(this.path(s));
            this.map.setSourceContent(i, e.source.input.css);
          }
        }
      });
    else if (this.css) {
      let e = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
      this.map.setSourceContent(e, this.css);
    }
  }
  sourcePath(t) {
    return this.mapOpts.from ? this.toUrl(this.mapOpts.from) : this.usesFileUrls ? this.toFileUrl(t.source.input.from) : this.toUrl(this.path(t.source.input.from));
  }
  toBase64(t) {
    return Buffer ? Buffer.from(t).toString("base64") : window.btoa(unescape(encodeURIComponent(t)));
  }
  toFileUrl(t) {
    let e = this.memoizedFileURLs.get(t);
    if (e) return e;
    if (Mi) {
      let s = Mi(t).toString();
      return this.memoizedFileURLs.set(t, s), s;
    } else
      throw new Error(
        "`map.absolute` option is not available in this PostCSS build"
      );
  }
  toUrl(t) {
    let e = this.memoizedURLs.get(t);
    if (e) return e;
    ir === "\\" && (t = t.replace(/\\/g, "/"));
    let s = encodeURI(t).replace(/[#?]/g, encodeURIComponent);
    return this.memoizedURLs.set(t, s), s;
  }
};
var rr = z0;
const pa = 39, Fi = 34, Ss = 92, Oi = 47, Cs = 10, Ve = 32, Is = 12, Ns = 9, Ts = 13, G0 = 91, J0 = 93, H0 = 40, W0 = 41, $0 = 123, tu = 125, eu = 59, su = 42, au = 58, iu = 64, Ms = /[\t\n\f\r "#'()/;[\\\]{}]/g, Fs = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g, nu = /.[\r\n"'(/\\]/, ji = /[\da-f]/i;
var ru = function(t, e = {}) {
  let s = t.css.valueOf(), i = e.ignoreErrors, n, r, o, c, u, d, _, l, f, N, F = s.length, k = 0, O = [], R = [];
  function U() {
    return k;
  }
  function q(p) {
    throw t.error("Unclosed " + p, k);
  }
  function G() {
    return R.length === 0 && k >= F;
  }
  function it(p) {
    if (R.length) return R.pop();
    if (k >= F) return;
    let v = p ? p.ignoreUnclosed : !1;
    switch (n = s.charCodeAt(k), n) {
      case Cs:
      case Ve:
      case Ns:
      case Ts:
      case Is: {
        c = k;
        do
          c += 1, n = s.charCodeAt(c);
        while (n === Ve || n === Cs || n === Ns || n === Ts || n === Is);
        d = ["space", s.slice(k, c)], k = c - 1;
        break;
      }
      case G0:
      case J0:
      case $0:
      case tu:
      case au:
      case eu:
      case W0: {
        let w = String.fromCharCode(n);
        d = [w, w, k];
        break;
      }
      case H0: {
        if (N = O.length ? O.pop()[1] : "", f = s.charCodeAt(k + 1), N === "url" && f !== pa && f !== Fi && f !== Ve && f !== Cs && f !== Ns && f !== Is && f !== Ts) {
          c = k;
          do {
            if (_ = !1, c = s.indexOf(")", c + 1), c === -1)
              if (i || v) {
                c = k;
                break;
              } else
                q("bracket");
            for (l = c; s.charCodeAt(l - 1) === Ss; )
              l -= 1, _ = !_;
          } while (_);
          d = ["brackets", s.slice(k, c + 1), k, c], k = c;
        } else
          c = s.indexOf(")", k + 1), r = s.slice(k, c + 1), c === -1 || nu.test(r) ? d = ["(", "(", k] : (d = ["brackets", r, k, c], k = c);
        break;
      }
      case pa:
      case Fi: {
        u = n === pa ? "'" : '"', c = k;
        do {
          if (_ = !1, c = s.indexOf(u, c + 1), c === -1)
            if (i || v) {
              c = k + 1;
              break;
            } else
              q("string");
          for (l = c; s.charCodeAt(l - 1) === Ss; )
            l -= 1, _ = !_;
        } while (_);
        d = ["string", s.slice(k, c + 1), k, c], k = c;
        break;
      }
      case iu: {
        Ms.lastIndex = k + 1, Ms.test(s), Ms.lastIndex === 0 ? c = s.length - 1 : c = Ms.lastIndex - 2, d = ["at-word", s.slice(k, c + 1), k, c], k = c;
        break;
      }
      case Ss: {
        for (c = k, o = !0; s.charCodeAt(c + 1) === Ss; )
          c += 1, o = !o;
        if (n = s.charCodeAt(c + 1), o && n !== Oi && n !== Ve && n !== Cs && n !== Ns && n !== Ts && n !== Is && (c += 1, ji.test(s.charAt(c)))) {
          for (; ji.test(s.charAt(c + 1)); )
            c += 1;
          s.charCodeAt(c + 1) === Ve && (c += 1);
        }
        d = ["word", s.slice(k, c + 1), k, c], k = c;
        break;
      }
      default: {
        n === Oi && s.charCodeAt(k + 1) === su ? (c = s.indexOf("*/", k + 2) + 1, c === 0 && (i || v ? c = s.length : q("comment")), d = ["comment", s.slice(k, c + 1), k, c], k = c) : (Fs.lastIndex = k + 1, Fs.test(s), Fs.lastIndex === 0 ? c = s.length - 1 : c = Fs.lastIndex - 2, d = ["word", s.slice(k, c + 1), k, c], O.push(d), k = c);
        break;
      }
    }
    return k++, d;
  }
  function z(p) {
    R.push(p);
  }
  return {
    back: z,
    endOfFile: G,
    nextToken: it,
    position: U
  };
};
let ou = si, cu = na, uu = ra, lu = ks, Pi = ii, fu = ru;
const Di = {
  empty: !0,
  space: !0
};
function du(a) {
  for (let t = a.length - 1; t >= 0; t--) {
    let e = a[t], s = e[3] || e[2];
    if (s) return s;
  }
}
let gu = class {
  constructor(t) {
    this.input = t, this.root = new lu(), this.current = this.root, this.spaces = "", this.semicolon = !1, this.createTokenizer(), this.root.source = { input: t, start: { column: 1, line: 1, offset: 0 } };
  }
  atrule(t) {
    let e = new ou();
    e.name = t[1].slice(1), e.name === "" && this.unnamedAtrule(e, t), this.init(e, t[2]);
    let s, i, n, r = !1, o = !1, c = [], u = [];
    for (; !this.tokenizer.endOfFile(); ) {
      if (t = this.tokenizer.nextToken(), s = t[0], s === "(" || s === "[" ? u.push(s === "(" ? ")" : "]") : s === "{" && u.length > 0 ? u.push("}") : s === u[u.length - 1] && u.pop(), u.length === 0)
        if (s === ";") {
          e.source.end = this.getPosition(t[2]), e.source.end.offset++, this.semicolon = !0;
          break;
        } else if (s === "{") {
          o = !0;
          break;
        } else if (s === "}") {
          if (c.length > 0) {
            for (n = c.length - 1, i = c[n]; i && i[0] === "space"; )
              i = c[--n];
            i && (e.source.end = this.getPosition(i[3] || i[2]), e.source.end.offset++);
          }
          this.end(t);
          break;
        } else
          c.push(t);
      else
        c.push(t);
      if (this.tokenizer.endOfFile()) {
        r = !0;
        break;
      }
    }
    e.raws.between = this.spacesAndCommentsFromEnd(c), c.length ? (e.raws.afterName = this.spacesAndCommentsFromStart(c), this.raw(e, "params", c), r && (t = c[c.length - 1], e.source.end = this.getPosition(t[3] || t[2]), e.source.end.offset++, this.spaces = e.raws.between, e.raws.between = "")) : (e.raws.afterName = "", e.params = ""), o && (e.nodes = [], this.current = e);
  }
  checkMissedSemicolon(t) {
    let e = this.colon(t);
    if (e === !1) return;
    let s = 0, i;
    for (let n = e - 1; n >= 0 && (i = t[n], !(i[0] !== "space" && (s += 1, s === 2))); n--)
      ;
    throw this.input.error(
      "Missed semicolon",
      i[0] === "word" ? i[3] + 1 : i[2]
    );
  }
  colon(t) {
    let e = 0, s, i, n;
    for (let [r, o] of t.entries()) {
      if (i = o, n = i[0], n === "(" && (e += 1), n === ")" && (e -= 1), e === 0 && n === ":")
        if (!s)
          this.doubleColon(i);
        else {
          if (s[0] === "word" && s[1] === "progid")
            continue;
          return r;
        }
      s = i;
    }
    return !1;
  }
  comment(t) {
    let e = new cu();
    this.init(e, t[2]), e.source.end = this.getPosition(t[3] || t[2]), e.source.end.offset++;
    let s = t[1].slice(2, -2);
    if (/^\s*$/.test(s))
      e.text = "", e.raws.left = s, e.raws.right = "";
    else {
      let i = s.match(/^(\s*)([^]*\S)(\s*)$/);
      e.text = i[2], e.raws.left = i[1], e.raws.right = i[3];
    }
  }
  createTokenizer() {
    this.tokenizer = fu(this.input);
  }
  decl(t, e) {
    let s = new uu();
    this.init(s, t[0][2]);
    let i = t[t.length - 1];
    for (i[0] === ";" && (this.semicolon = !0, t.pop()), s.source.end = this.getPosition(
      i[3] || i[2] || du(t)
    ), s.source.end.offset++; t[0][0] !== "word"; )
      t.length === 1 && this.unknownWord(t), s.raws.before += t.shift()[1];
    for (s.source.start = this.getPosition(t[0][2]), s.prop = ""; t.length; ) {
      let u = t[0][0];
      if (u === ":" || u === "space" || u === "comment")
        break;
      s.prop += t.shift()[1];
    }
    s.raws.between = "";
    let n;
    for (; t.length; )
      if (n = t.shift(), n[0] === ":") {
        s.raws.between += n[1];
        break;
      } else
        n[0] === "word" && /\w/.test(n[1]) && this.unknownWord([n]), s.raws.between += n[1];
    (s.prop[0] === "_" || s.prop[0] === "*") && (s.raws.before += s.prop[0], s.prop = s.prop.slice(1));
    let r = [], o;
    for (; t.length && (o = t[0][0], !(o !== "space" && o !== "comment")); )
      r.push(t.shift());
    this.precheckMissedSemicolon(t);
    for (let u = t.length - 1; u >= 0; u--) {
      if (n = t[u], n[1].toLowerCase() === "!important") {
        s.important = !0;
        let d = this.stringFrom(t, u);
        d = this.spacesFromEnd(t) + d, d !== " !important" && (s.raws.important = d);
        break;
      } else if (n[1].toLowerCase() === "important") {
        let d = t.slice(0), _ = "";
        for (let l = u; l > 0; l--) {
          let f = d[l][0];
          if (_.trim().startsWith("!") && f !== "space")
            break;
          _ = d.pop()[1] + _;
        }
        _.trim().startsWith("!") && (s.important = !0, s.raws.important = _, t = d);
      }
      if (n[0] !== "space" && n[0] !== "comment")
        break;
    }
    t.some((u) => u[0] !== "space" && u[0] !== "comment") && (s.raws.between += r.map((u) => u[1]).join(""), r = []), this.raw(s, "value", r.concat(t), e), s.value.includes(":") && !e && this.checkMissedSemicolon(t);
  }
  doubleColon(t) {
    throw this.input.error(
      "Double colon",
      { offset: t[2] },
      { offset: t[2] + t[1].length }
    );
  }
  emptyRule(t) {
    let e = new Pi();
    this.init(e, t[2]), e.selector = "", e.raws.between = "", this.current = e;
  }
  end(t) {
    this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.semicolon = !1, this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.spaces = "", this.current.parent ? (this.current.source.end = this.getPosition(t[2]), this.current.source.end.offset++, this.current = this.current.parent) : this.unexpectedClose(t);
  }
  endFile() {
    this.current.parent && this.unclosedBlock(), this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.root.source.end = this.getPosition(this.tokenizer.position());
  }
  freeSemicolon(t) {
    if (this.spaces += t[1], this.current.nodes) {
      let e = this.current.nodes[this.current.nodes.length - 1];
      e && e.type === "rule" && !e.raws.ownSemicolon && (e.raws.ownSemicolon = this.spaces, this.spaces = "");
    }
  }
  // Helpers
  getPosition(t) {
    let e = this.input.fromOffset(t);
    return {
      column: e.col,
      line: e.line,
      offset: t
    };
  }
  init(t, e) {
    this.current.push(t), t.source = {
      input: this.input,
      start: this.getPosition(e)
    }, t.raws.before = this.spaces, this.spaces = "", t.type !== "comment" && (this.semicolon = !1);
  }
  other(t) {
    let e = !1, s = null, i = !1, n = null, r = [], o = t[1].startsWith("--"), c = [], u = t;
    for (; u; ) {
      if (s = u[0], c.push(u), s === "(" || s === "[")
        n || (n = u), r.push(s === "(" ? ")" : "]");
      else if (o && i && s === "{")
        n || (n = u), r.push("}");
      else if (r.length === 0)
        if (s === ";")
          if (i) {
            this.decl(c, o);
            return;
          } else
            break;
        else if (s === "{") {
          this.rule(c);
          return;
        } else if (s === "}") {
          this.tokenizer.back(c.pop()), e = !0;
          break;
        } else s === ":" && (i = !0);
      else s === r[r.length - 1] && (r.pop(), r.length === 0 && (n = null));
      u = this.tokenizer.nextToken();
    }
    if (this.tokenizer.endOfFile() && (e = !0), r.length > 0 && this.unclosedBracket(n), e && i) {
      if (!o)
        for (; c.length && (u = c[c.length - 1][0], !(u !== "space" && u !== "comment")); )
          this.tokenizer.back(c.pop());
      this.decl(c, o);
    } else
      this.unknownWord(c);
  }
  parse() {
    let t;
    for (; !this.tokenizer.endOfFile(); )
      switch (t = this.tokenizer.nextToken(), t[0]) {
        case "space":
          this.spaces += t[1];
          break;
        case ";":
          this.freeSemicolon(t);
          break;
        case "}":
          this.end(t);
          break;
        case "comment":
          this.comment(t);
          break;
        case "at-word":
          this.atrule(t);
          break;
        case "{":
          this.emptyRule(t);
          break;
        default:
          this.other(t);
          break;
      }
    this.endFile();
  }
  precheckMissedSemicolon() {
  }
  raw(t, e, s, i) {
    let n, r, o = s.length, c = "", u = !0, d, _;
    for (let l = 0; l < o; l += 1)
      n = s[l], r = n[0], r === "space" && l === o - 1 && !i ? u = !1 : r === "comment" ? (_ = s[l - 1] ? s[l - 1][0] : "empty", d = s[l + 1] ? s[l + 1][0] : "empty", !Di[_] && !Di[d] ? c.slice(-1) === "," ? u = !1 : c += n[1] : u = !1) : c += n[1];
    if (!u) {
      let l = s.reduce((f, N) => f + N[1], "");
      t.raws[e] = { raw: l, value: c };
    }
    t[e] = c;
  }
  rule(t) {
    t.pop();
    let e = new Pi();
    this.init(e, t[0][2]), e.raws.between = this.spacesAndCommentsFromEnd(t), this.raw(e, "selector", t), this.current = e;
  }
  spacesAndCommentsFromEnd(t) {
    let e, s = "";
    for (; t.length && (e = t[t.length - 1][0], !(e !== "space" && e !== "comment")); )
      s = t.pop()[1] + s;
    return s;
  }
  // Errors
  spacesAndCommentsFromStart(t) {
    let e, s = "";
    for (; t.length && (e = t[0][0], !(e !== "space" && e !== "comment")); )
      s += t.shift()[1];
    return s;
  }
  spacesFromEnd(t) {
    let e, s = "";
    for (; t.length && (e = t[t.length - 1][0], e === "space"); )
      s = t.pop()[1] + s;
    return s;
  }
  stringFrom(t, e) {
    let s = "";
    for (let i = e; i < t.length; i++)
      s += t[i][1];
    return t.splice(e, t.length - e), s;
  }
  unclosedBlock() {
    let t = this.current.source.start;
    throw this.input.error("Unclosed block", t.line, t.column);
  }
  unclosedBracket(t) {
    throw this.input.error(
      "Unclosed bracket",
      { offset: t[2] },
      { offset: t[2] + 1 }
    );
  }
  unexpectedClose(t) {
    throw this.input.error(
      "Unexpected }",
      { offset: t[2] },
      { offset: t[2] + 1 }
    );
  }
  unknownWord(t) {
    throw this.input.error(
      "Unknown word",
      { offset: t[0][2] },
      { offset: t[0][2] + t[0][1].length }
    );
  }
  unnamedAtrule(t, e) {
    throw this.input.error(
      "At-rule without name",
      { offset: e[2] },
      { offset: e[2] + e[1].length }
    );
  }
};
var hu = gu;
let pu = be, mu = oa, vu = hu;
function Ws(a, t) {
  let e = new mu(a, t), s = new vu(e);
  try {
    s.parse();
  } catch (i) {
    throw process.env.NODE_ENV !== "production" && i.name === "CssSyntaxError" && t && t.from && (/\.scss$/i.test(t.from) ? i.message += `
You tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser` : /\.sass/i.test(t.from) ? i.message += `
You tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser` : /\.less$/i.test(t.from) && (i.message += `
You tried to parse Less with the standard CSS parser; try again with the postcss-less parser`)), i;
  }
  return s.root;
}
var ni = Ws;
Ws.default = Ws;
pu.registerParse(Ws);
let ja = class {
  constructor(t, e = {}) {
    if (this.type = "warning", this.text = t, e.node && e.node.source) {
      let s = e.node.rangeBy(e);
      this.line = s.start.line, this.column = s.start.column, this.endLine = s.end.line, this.endColumn = s.end.column;
    }
    for (let s in e) this[s] = e[s];
  }
  toString() {
    return this.node ? this.node.error(this.text, {
      index: this.index,
      plugin: this.plugin,
      word: this.word
    }).message : this.plugin ? this.plugin + ": " + this.text : this.text;
  }
};
var or = ja;
ja.default = ja;
let bu = or, Pa = class {
  constructor(t, e, s) {
    this.processor = t, this.messages = [], this.root = e, this.opts = s, this.css = void 0, this.map = void 0;
  }
  toString() {
    return this.css;
  }
  warn(t, e = {}) {
    e.plugin || this.lastPlugin && this.lastPlugin.postcssPlugin && (e.plugin = this.lastPlugin.postcssPlugin);
    let s = new bu(t, e);
    return this.messages.push(s), s;
  }
  warnings() {
    return this.messages.filter((t) => t.type === "warning");
  }
  get content() {
    return this.css;
  }
};
var ri = Pa;
Pa.default = Pa;
let Li = {};
var cr = function(t) {
  Li[t] || (Li[t] = !0, typeof console < "u" && console.warn && console.warn(t));
};
let yu = be, xu = ai, wu = rr, ku = ni, Ri = ri, _u = ks, Au = aa, { isClean: Pt, my: Eu } = ws, Su = cr;
const Cu = {
  atrule: "AtRule",
  comment: "Comment",
  decl: "Declaration",
  document: "Document",
  root: "Root",
  rule: "Rule"
}, Iu = {
  AtRule: !0,
  AtRuleExit: !0,
  Comment: !0,
  CommentExit: !0,
  Declaration: !0,
  DeclarationExit: !0,
  Document: !0,
  DocumentExit: !0,
  Once: !0,
  OnceExit: !0,
  postcssPlugin: !0,
  prepare: !0,
  Root: !0,
  RootExit: !0,
  Rule: !0,
  RuleExit: !0
}, Nu = {
  Once: !0,
  postcssPlugin: !0,
  prepare: !0
}, Oe = 0;
function Be(a) {
  return typeof a == "object" && typeof a.then == "function";
}
function ur(a) {
  let t = !1, e = Cu[a.type];
  return a.type === "decl" ? t = a.prop.toLowerCase() : a.type === "atrule" && (t = a.name.toLowerCase()), t && a.append ? [
    e,
    e + "-" + t,
    Oe,
    e + "Exit",
    e + "Exit-" + t
  ] : t ? [e, e + "-" + t, e + "Exit", e + "Exit-" + t] : a.append ? [e, Oe, e + "Exit"] : [e, e + "Exit"];
}
function Zi(a) {
  let t;
  return a.type === "document" ? t = ["Document", Oe, "DocumentExit"] : a.type === "root" ? t = ["Root", Oe, "RootExit"] : t = ur(a), {
    eventIndex: 0,
    events: t,
    iterator: 0,
    node: a,
    visitorIndex: 0,
    visitors: []
  };
}
function Da(a) {
  return a[Pt] = !1, a.nodes && a.nodes.forEach((t) => Da(t)), a;
}
let La = {}, je = class lr {
  constructor(t, e, s) {
    this.stringified = !1, this.processed = !1;
    let i;
    if (typeof e == "object" && e !== null && (e.type === "root" || e.type === "document"))
      i = Da(e);
    else if (e instanceof lr || e instanceof Ri)
      i = Da(e.root), e.map && (typeof s.map > "u" && (s.map = {}), s.map.inline || (s.map.inline = !1), s.map.prev = e.map);
    else {
      let n = ku;
      s.syntax && (n = s.syntax.parse), s.parser && (n = s.parser), n.parse && (n = n.parse);
      try {
        i = n(e, s);
      } catch (r) {
        this.processed = !0, this.error = r;
      }
      i && !i[Eu] && yu.rebuild(i);
    }
    this.result = new Ri(t, i, s), this.helpers = { ...La, postcss: La, result: this.result }, this.plugins = this.processor.plugins.map((n) => typeof n == "object" && n.prepare ? { ...n, ...n.prepare(this.result) } : n);
  }
  async() {
    return this.error ? Promise.reject(this.error) : this.processed ? Promise.resolve(this.result) : (this.processing || (this.processing = this.runAsync()), this.processing);
  }
  catch(t) {
    return this.async().catch(t);
  }
  finally(t) {
    return this.async().then(t, t);
  }
  getAsyncError() {
    throw new Error("Use process(css).then(cb) to work with async plugins");
  }
  handleError(t, e) {
    let s = this.result.lastPlugin;
    try {
      if (e && e.addToError(t), this.error = t, t.name === "CssSyntaxError" && !t.plugin)
        t.plugin = s.postcssPlugin, t.setMessage();
      else if (s.postcssVersion && process.env.NODE_ENV !== "production") {
        let i = s.postcssPlugin, n = s.postcssVersion, r = this.result.processor.version, o = n.split("."), c = r.split(".");
        (o[0] !== c[0] || parseInt(o[1]) > parseInt(c[1])) && console.error(
          "Unknown error from PostCSS plugin. Your current PostCSS version is " + r + ", but " + i + " uses " + n + ". Perhaps this is the source of the error below."
        );
      }
    } catch (i) {
      console && console.error && console.error(i);
    }
    return t;
  }
  prepareVisitors() {
    this.listeners = {};
    let t = (e, s, i) => {
      this.listeners[s] || (this.listeners[s] = []), this.listeners[s].push([e, i]);
    };
    for (let e of this.plugins)
      if (typeof e == "object")
        for (let s in e) {
          if (!Iu[s] && /^[A-Z]/.test(s))
            throw new Error(
              `Unknown event ${s} in ${e.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
            );
          if (!Nu[s])
            if (typeof e[s] == "object")
              for (let i in e[s])
                i === "*" ? t(e, s, e[s][i]) : t(
                  e,
                  s + "-" + i.toLowerCase(),
                  e[s][i]
                );
            else typeof e[s] == "function" && t(e, s, e[s]);
        }
    this.hasListener = Object.keys(this.listeners).length > 0;
  }
  async runAsync() {
    this.plugin = 0;
    for (let t = 0; t < this.plugins.length; t++) {
      let e = this.plugins[t], s = this.runOnRoot(e);
      if (Be(s))
        try {
          await s;
        } catch (i) {
          throw this.handleError(i);
        }
    }
    if (this.prepareVisitors(), this.hasListener) {
      let t = this.result.root;
      for (; !t[Pt]; ) {
        t[Pt] = !0;
        let e = [Zi(t)];
        for (; e.length > 0; ) {
          let s = this.visitTick(e);
          if (Be(s))
            try {
              await s;
            } catch (i) {
              let n = e[e.length - 1].node;
              throw this.handleError(i, n);
            }
        }
      }
      if (this.listeners.OnceExit)
        for (let [e, s] of this.listeners.OnceExit) {
          this.result.lastPlugin = e;
          try {
            if (t.type === "document") {
              let i = t.nodes.map(
                (n) => s(n, this.helpers)
              );
              await Promise.all(i);
            } else
              await s(t, this.helpers);
          } catch (i) {
            throw this.handleError(i);
          }
        }
    }
    return this.processed = !0, this.stringify();
  }
  runOnRoot(t) {
    this.result.lastPlugin = t;
    try {
      if (typeof t == "object" && t.Once) {
        if (this.result.root.type === "document") {
          let e = this.result.root.nodes.map(
            (s) => t.Once(s, this.helpers)
          );
          return Be(e[0]) ? Promise.all(e) : e;
        }
        return t.Once(this.result.root, this.helpers);
      } else if (typeof t == "function")
        return t(this.result.root, this.result);
    } catch (e) {
      throw this.handleError(e);
    }
  }
  stringify() {
    if (this.error) throw this.error;
    if (this.stringified) return this.result;
    this.stringified = !0, this.sync();
    let t = this.result.opts, e = Au;
    t.syntax && (e = t.syntax.stringify), t.stringifier && (e = t.stringifier), e.stringify && (e = e.stringify);
    let i = new wu(e, this.result.root, this.result.opts).generate();
    return this.result.css = i[0], this.result.map = i[1], this.result;
  }
  sync() {
    if (this.error) throw this.error;
    if (this.processed) return this.result;
    if (this.processed = !0, this.processing)
      throw this.getAsyncError();
    for (let t of this.plugins) {
      let e = this.runOnRoot(t);
      if (Be(e))
        throw this.getAsyncError();
    }
    if (this.prepareVisitors(), this.hasListener) {
      let t = this.result.root;
      for (; !t[Pt]; )
        t[Pt] = !0, this.walkSync(t);
      if (this.listeners.OnceExit)
        if (t.type === "document")
          for (let e of t.nodes)
            this.visitSync(this.listeners.OnceExit, e);
        else
          this.visitSync(this.listeners.OnceExit, t);
    }
    return this.result;
  }
  then(t, e) {
    return process.env.NODE_ENV !== "production" && ("from" in this.opts || Su(
      "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
    )), this.async().then(t, e);
  }
  toString() {
    return this.css;
  }
  visitSync(t, e) {
    for (let [s, i] of t) {
      this.result.lastPlugin = s;
      let n;
      try {
        n = i(e, this.helpers);
      } catch (r) {
        throw this.handleError(r, e.proxyOf);
      }
      if (e.type !== "root" && e.type !== "document" && !e.parent)
        return !0;
      if (Be(n))
        throw this.getAsyncError();
    }
  }
  visitTick(t) {
    let e = t[t.length - 1], { node: s, visitors: i } = e;
    if (s.type !== "root" && s.type !== "document" && !s.parent) {
      t.pop();
      return;
    }
    if (i.length > 0 && e.visitorIndex < i.length) {
      let [r, o] = i[e.visitorIndex];
      e.visitorIndex += 1, e.visitorIndex === i.length && (e.visitors = [], e.visitorIndex = 0), this.result.lastPlugin = r;
      try {
        return o(s.toProxy(), this.helpers);
      } catch (c) {
        throw this.handleError(c, s);
      }
    }
    if (e.iterator !== 0) {
      let r = e.iterator, o;
      for (; o = s.nodes[s.indexes[r]]; )
        if (s.indexes[r] += 1, !o[Pt]) {
          o[Pt] = !0, t.push(Zi(o));
          return;
        }
      e.iterator = 0, delete s.indexes[r];
    }
    let n = e.events;
    for (; e.eventIndex < n.length; ) {
      let r = n[e.eventIndex];
      if (e.eventIndex += 1, r === Oe) {
        s.nodes && s.nodes.length && (s[Pt] = !0, e.iterator = s.getIterator());
        return;
      } else if (this.listeners[r]) {
        e.visitors = this.listeners[r];
        return;
      }
    }
    t.pop();
  }
  walkSync(t) {
    t[Pt] = !0;
    let e = ur(t);
    for (let s of e)
      if (s === Oe)
        t.nodes && t.each((i) => {
          i[Pt] || this.walkSync(i);
        });
      else {
        let i = this.listeners[s];
        if (i && this.visitSync(i, t.toProxy()))
          return;
      }
  }
  warnings() {
    return this.sync().warnings();
  }
  get content() {
    return this.stringify().content;
  }
  get css() {
    return this.stringify().css;
  }
  get map() {
    return this.stringify().map;
  }
  get messages() {
    return this.sync().messages;
  }
  get opts() {
    return this.result.opts;
  }
  get processor() {
    return this.result.processor;
  }
  get root() {
    return this.sync().root;
  }
  get [Symbol.toStringTag]() {
    return "LazyResult";
  }
};
je.registerPostcss = (a) => {
  La = a;
};
var fr = je;
je.default = je;
_u.registerLazyResult(je);
xu.registerLazyResult(je);
let Tu = rr, Mu = ni;
const Fu = ri;
let Ou = aa, ju = cr, Ra = class {
  constructor(t, e, s) {
    e = e.toString(), this.stringified = !1, this._processor = t, this._css = e, this._opts = s, this._map = void 0;
    let i, n = Ou;
    this.result = new Fu(this._processor, i, this._opts), this.result.css = e;
    let r = this;
    Object.defineProperty(this.result, "root", {
      get() {
        return r.root;
      }
    });
    let o = new Tu(n, i, this._opts, e);
    if (o.isMap()) {
      let [c, u] = o.generate();
      c && (this.result.css = c), u && (this.result.map = u);
    } else
      o.clearAnnotation(), this.result.css = o.css;
  }
  async() {
    return this.error ? Promise.reject(this.error) : Promise.resolve(this.result);
  }
  catch(t) {
    return this.async().catch(t);
  }
  finally(t) {
    return this.async().then(t, t);
  }
  sync() {
    if (this.error) throw this.error;
    return this.result;
  }
  then(t, e) {
    return process.env.NODE_ENV !== "production" && ("from" in this._opts || ju(
      "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
    )), this.async().then(t, e);
  }
  toString() {
    return this._css;
  }
  warnings() {
    return [];
  }
  get content() {
    return this.result.css;
  }
  get css() {
    return this.result.css;
  }
  get map() {
    return this.result.map;
  }
  get messages() {
    return [];
  }
  get opts() {
    return this.result.opts;
  }
  get processor() {
    return this.result.processor;
  }
  get root() {
    if (this._root)
      return this._root;
    let t, e = Mu;
    try {
      t = e(this._css, this._opts);
    } catch (s) {
      this.error = s;
    }
    if (this.error)
      throw this.error;
    return this._root = t, t;
  }
  get [Symbol.toStringTag]() {
    return "NoWorkResult";
  }
};
var Pu = Ra;
Ra.default = Ra;
let Du = ai, Lu = fr, Ru = Pu, Zu = ks, hs = class {
  constructor(t = []) {
    this.version = "8.5.1", this.plugins = this.normalize(t);
  }
  normalize(t) {
    let e = [];
    for (let s of t)
      if (s.postcss === !0 ? s = s() : s.postcss && (s = s.postcss), typeof s == "object" && Array.isArray(s.plugins))
        e = e.concat(s.plugins);
      else if (typeof s == "object" && s.postcssPlugin)
        e.push(s);
      else if (typeof s == "function")
        e.push(s);
      else if (typeof s == "object" && (s.parse || s.stringify)) {
        if (process.env.NODE_ENV !== "production")
          throw new Error(
            "PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation."
          );
      } else
        throw new Error(s + " is not a PostCSS plugin");
    return e;
  }
  process(t, e = {}) {
    return !this.plugins.length && !e.parser && !e.stringifier && !e.syntax ? new Ru(this, t, e) : new Lu(this, t, e);
  }
  use(t) {
    return this.plugins = this.plugins.concat(this.normalize([t])), this;
  }
};
var Qu = hs;
hs.default = hs;
Zu.registerProcessor(hs);
Du.registerProcessor(hs);
let dr = si, gr = na, Vu = be, Bu = $a, hr = ra, pr = ai, qu = U0, Uu = oa, Xu = fr, Yu = tr, Ku = ia, zu = ni, oi = Qu, Gu = ri, mr = ks, vr = ii, Ju = aa, Hu = or;
function ut(...a) {
  return a.length === 1 && Array.isArray(a[0]) && (a = a[0]), new oi(a);
}
ut.plugin = function(t, e) {
  let s = !1;
  function i(...r) {
    console && console.warn && !s && (s = !0, console.warn(
      t + `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`
    ), process.env.LANG && process.env.LANG.startsWith("cn") && console.warn(
      t + `: 里面 postcss.plugin 被弃用. 迁移指南:
https://www.w3ctech.com/topic/2226`
    ));
    let o = e(...r);
    return o.postcssPlugin = t, o.postcssVersion = new oi().version, o;
  }
  let n;
  return Object.defineProperty(i, "postcss", {
    get() {
      return n || (n = i()), n;
    }
  }), i.process = function(r, o, c) {
    return ut([i(c)]).process(r, o);
  }, i;
};
ut.stringify = Ju;
ut.parse = zu;
ut.fromJSON = qu;
ut.list = Yu;
ut.comment = (a) => new gr(a);
ut.atRule = (a) => new dr(a);
ut.decl = (a) => new hr(a);
ut.rule = (a) => new vr(a);
ut.root = (a) => new mr(a);
ut.document = (a) => new pr(a);
ut.CssSyntaxError = Bu;
ut.Declaration = hr;
ut.Container = Vu;
ut.Processor = oi;
ut.Document = pr;
ut.Comment = gr;
ut.Warning = Hu;
ut.AtRule = dr;
ut.Result = Gu;
ut.Input = Uu;
ut.Rule = vr;
ut.Root = mr;
ut.Node = Ku;
Xu.registerPostcss(ut);
var Wu = ut;
ut.default = ut;
const $u = on, Qi = Kc, { isPlainObject: tl } = Ha, Vi = c0, el = u0, { parse: sl } = Wu, al = [
  "img",
  "audio",
  "video",
  "picture",
  "svg",
  "object",
  "map",
  "iframe",
  "embed"
], il = ["script", "style"];
function Ke(a, t) {
  a && Object.keys(a).forEach(function(e) {
    t(a[e], e);
  });
}
function Xt(a, t) {
  return {}.hasOwnProperty.call(a, t);
}
function Bi(a, t) {
  const e = [];
  return Ke(a, function(s) {
    t(s) && e.push(s);
  }), e;
}
function nl(a) {
  for (const t in a)
    if (Xt(a, t))
      return !1;
  return !0;
}
function rl(a) {
  return a.map(function(t) {
    if (!t.url)
      throw new Error("URL missing");
    return t.url + (t.w ? ` ${t.w}w` : "") + (t.h ? ` ${t.h}h` : "") + (t.d ? ` ${t.d}x` : "");
  }).join(", ");
}
var ol = ps;
const cl = /^[^\0\t\n\f\r /<=>]+$/;
function ps(a, t, e) {
  if (a == null)
    return "";
  typeof a == "number" && (a = a.toString());
  let s = "", i = "";
  function n(g, b) {
    const m = this;
    this.tag = g, this.attribs = b || {}, this.tagPosition = s.length, this.text = "", this.mediaChildren = [], this.updateParentNodeText = function() {
      if (k.length) {
        const x = k[k.length - 1];
        x.text += m.text;
      }
    }, this.updateParentNodeMediaChildren = function() {
      k.length && al.includes(this.tag) && k[k.length - 1].mediaChildren.push(this.tag);
    };
  }
  t = Object.assign({}, ps.defaults, t), t.parser = Object.assign({}, ul, t.parser);
  const r = function(g) {
    return t.allowedTags === !1 || (t.allowedTags || []).indexOf(g) > -1;
  };
  il.forEach(function(g) {
    r(g) && !t.allowVulnerableTags && console.warn(`

⚠️ Your \`allowedTags\` option includes, \`${g}\`, which is inherently
vulnerable to XSS attacks. Please remove it from \`allowedTags\`.
Or, to disable this warning, add the \`allowVulnerableTags\` option
and ensure you are accounting for this risk.

`);
  });
  const o = t.nonTextTags || [
    "script",
    "style",
    "textarea",
    "option"
  ];
  let c, u;
  t.allowedAttributes && (c = {}, u = {}, Ke(t.allowedAttributes, function(g, b) {
    c[b] = [];
    const m = [];
    g.forEach(function(x) {
      typeof x == "string" && x.indexOf("*") >= 0 ? m.push(Qi(x).replace(/\\\*/g, ".*")) : c[b].push(x);
    }), m.length && (u[b] = new RegExp("^(" + m.join("|") + ")$"));
  }));
  const d = {}, _ = {}, l = {};
  Ke(t.allowedClasses, function(g, b) {
    if (c && (Xt(c, b) || (c[b] = []), c[b].push("class")), d[b] = g, Array.isArray(g)) {
      const m = [];
      d[b] = [], l[b] = [], g.forEach(function(x) {
        typeof x == "string" && x.indexOf("*") >= 0 ? m.push(Qi(x).replace(/\\\*/g, ".*")) : x instanceof RegExp ? l[b].push(x) : d[b].push(x);
      }), m.length && (_[b] = new RegExp("^(" + m.join("|") + ")$"));
    }
  });
  const f = {};
  let N;
  Ke(t.transformTags, function(g, b) {
    let m;
    typeof g == "function" ? m = g : typeof g == "string" && (m = ps.simpleTransform(g)), b === "*" ? N = m : f[b] = m;
  });
  let F, k, O, R, U, q, G = !1;
  z();
  const it = new $u.Parser({
    onopentag: function(g, b) {
      if (t.enforceHtmlBoundary && g === "html" && z(), U) {
        q++;
        return;
      }
      const m = new n(g, b);
      k.push(m);
      let x = !1;
      const S = !!m.text;
      let M;
      if (Xt(f, g) && (M = f[g](g, b), m.attribs = b = M.attribs, M.text !== void 0 && (m.innerText = M.text), g !== M.tagName && (m.name = g = M.tagName, R[F] = M.tagName)), N && (M = N(g, b), m.attribs = b = M.attribs, g !== M.tagName && (m.name = g = M.tagName, R[F] = M.tagName)), (!r(g) || t.disallowedTagsMode === "recursiveEscape" && !nl(O) || t.nestingLimit != null && F >= t.nestingLimit) && (x = !0, O[F] = !0, (t.disallowedTagsMode === "discard" || t.disallowedTagsMode === "completelyDiscard") && o.indexOf(g) !== -1 && (U = !0, q = 1), O[F] = !0), F++, x) {
        if (t.disallowedTagsMode === "discard" || t.disallowedTagsMode === "completelyDiscard") {
          if (m.innerText && !S) {
            const C = p(m.innerText);
            t.textFilter ? s += t.textFilter(C, g) : s += p(m.innerText), G = !0;
          }
          return;
        }
        i = s, s = "";
      }
      s += "<" + g, g === "script" && (t.allowedScriptHostnames || t.allowedScriptDomains) && (m.innerText = ""), (!c || Xt(c, g) || c["*"]) && Ke(b, function(C, T) {
        if (!cl.test(T)) {
          delete m.attribs[T];
          return;
        }
        if (C === "" && !t.allowedEmptyAttributes.includes(T) && (t.nonBooleanAttributes.includes(T) || t.nonBooleanAttributes.includes("*"))) {
          delete m.attribs[T];
          return;
        }
        let j = !1;
        if (!c || Xt(c, g) && c[g].indexOf(T) !== -1 || c["*"] && c["*"].indexOf(T) !== -1 || Xt(u, g) && u[g].test(T) || u["*"] && u["*"].test(T))
          j = !0;
        else if (c && c[g]) {
          for (const L of c[g])
            if (tl(L) && L.name && L.name === T) {
              j = !0;
              let Z = "";
              if (L.multiple === !0) {
                const ot = C.split(" ");
                for (const ct of ot)
                  L.values.indexOf(ct) !== -1 && (Z === "" ? Z = ct : Z += " " + ct);
              } else L.values.indexOf(C) >= 0 && (Z = C);
              C = Z;
            }
        }
        if (j) {
          if (t.allowedSchemesAppliedToAttributes.indexOf(T) !== -1 && v(g, C)) {
            delete m.attribs[T];
            return;
          }
          if (g === "script" && T === "src") {
            let L = !0;
            try {
              const Z = w(C);
              if (t.allowedScriptHostnames || t.allowedScriptDomains) {
                const ot = (t.allowedScriptHostnames || []).find(function(B) {
                  return B === Z.url.hostname;
                }), ct = (t.allowedScriptDomains || []).find(function(B) {
                  return Z.url.hostname === B || Z.url.hostname.endsWith(`.${B}`);
                });
                L = ot || ct;
              }
            } catch {
              L = !1;
            }
            if (!L) {
              delete m.attribs[T];
              return;
            }
          }
          if (g === "iframe" && T === "src") {
            let L = !0;
            try {
              const Z = w(C);
              if (Z.isRelativeUrl)
                L = Xt(t, "allowIframeRelativeUrls") ? t.allowIframeRelativeUrls : !t.allowedIframeHostnames && !t.allowedIframeDomains;
              else if (t.allowedIframeHostnames || t.allowedIframeDomains) {
                const ot = (t.allowedIframeHostnames || []).find(function(B) {
                  return B === Z.url.hostname;
                }), ct = (t.allowedIframeDomains || []).find(function(B) {
                  return Z.url.hostname === B || Z.url.hostname.endsWith(`.${B}`);
                });
                L = ot || ct;
              }
            } catch {
              L = !1;
            }
            if (!L) {
              delete m.attribs[T];
              return;
            }
          }
          if (T === "srcset")
            try {
              let L = el(C);
              if (L.forEach(function(Z) {
                v("srcset", Z.url) && (Z.evil = !0);
              }), L = Bi(L, function(Z) {
                return !Z.evil;
              }), L.length)
                C = rl(Bi(L, function(Z) {
                  return !Z.evil;
                })), m.attribs[T] = C;
              else {
                delete m.attribs[T];
                return;
              }
            } catch {
              delete m.attribs[T];
              return;
            }
          if (T === "class") {
            const L = d[g], Z = d["*"], ot = _[g], ct = l[g], B = l["*"], H = _["*"], tt = [
              ot,
              H
            ].concat(ct, B).filter(function(V) {
              return V;
            });
            if (L && Z ? C = A(C, Vi(L, Z), tt) : C = A(C, L || Z, tt), !C.length) {
              delete m.attribs[T];
              return;
            }
          }
          if (T === "style") {
            if (t.parseStyleAttributes)
              try {
                const L = sl(g + " {" + C + "}", { map: !1 }), Z = h(L, t.allowedStyles);
                if (C = y(Z), C.length === 0) {
                  delete m.attribs[T];
                  return;
                }
              } catch {
                typeof window < "u" && console.warn('Failed to parse "' + g + " {" + C + `}", If you're running this in a browser, we recommend to disable style parsing: options.parseStyleAttributes: false, since this only works in a node environment due to a postcss dependency, More info: https://github.com/apostrophecms/sanitize-html/issues/547`), delete m.attribs[T];
                return;
              }
            else if (t.allowedStyles)
              throw new Error("allowedStyles option cannot be used together with parseStyleAttributes: false.");
          }
          s += " " + T, C && C.length ? s += '="' + p(C, !0) + '"' : t.allowedEmptyAttributes.includes(T) && (s += '=""');
        } else
          delete m.attribs[T];
      }), t.selfClosing.indexOf(g) !== -1 ? s += " />" : (s += ">", m.innerText && !S && !t.textFilter && (s += p(m.innerText), G = !0)), x && (s = i + p(s), i = "");
    },
    ontext: function(g) {
      if (U)
        return;
      const b = k[k.length - 1];
      let m;
      if (b && (m = b.tag, g = b.innerText !== void 0 ? b.innerText : g), t.disallowedTagsMode === "completelyDiscard" && !r(m))
        g = "";
      else if ((t.disallowedTagsMode === "discard" || t.disallowedTagsMode === "completelyDiscard") && (m === "script" || m === "style"))
        s += g;
      else {
        const x = p(g, !1);
        t.textFilter && !G ? s += t.textFilter(x, m) : G || (s += x);
      }
      if (k.length) {
        const x = k[k.length - 1];
        x.text += g;
      }
    },
    onclosetag: function(g, b) {
      if (U)
        if (q--, !q)
          U = !1;
        else
          return;
      const m = k.pop();
      if (!m)
        return;
      if (m.tag !== g) {
        k.push(m);
        return;
      }
      U = t.enforceHtmlBoundary ? g === "html" : !1, F--;
      const x = O[F];
      if (x) {
        if (delete O[F], t.disallowedTagsMode === "discard" || t.disallowedTagsMode === "completelyDiscard") {
          m.updateParentNodeText();
          return;
        }
        i = s, s = "";
      }
      if (R[F] && (g = R[F], delete R[F]), t.exclusiveFilter && t.exclusiveFilter(m)) {
        s = s.substr(0, m.tagPosition);
        return;
      }
      if (m.updateParentNodeMediaChildren(), m.updateParentNodeText(), // Already output />
      t.selfClosing.indexOf(g) !== -1 || // Escaped tag, closing tag is implied
      b && !r(g) && ["escape", "recursiveEscape"].indexOf(t.disallowedTagsMode) >= 0) {
        x && (s = i, i = "");
        return;
      }
      s += "</" + g + ">", x && (s = i + p(s), i = ""), G = !1;
    }
  }, t.parser);
  return it.write(a), it.end(), s;
  function z() {
    s = "", F = 0, k = [], O = {}, R = {}, U = !1, q = 0;
  }
  function p(g, b) {
    return typeof g != "string" && (g = g + ""), t.parser.decodeEntities && (g = g.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), b && (g = g.replace(/"/g, "&quot;"))), g = g.replace(/&(?![a-zA-Z0-9#]{1,20};)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), b && (g = g.replace(/"/g, "&quot;")), g;
  }
  function v(g, b) {
    for (b = b.replace(/[\x00-\x20]+/g, ""); ; ) {
      const S = b.indexOf("<!--");
      if (S === -1)
        break;
      const M = b.indexOf("-->", S + 4);
      if (M === -1)
        break;
      b = b.substring(0, S) + b.substring(M + 3);
    }
    const m = b.match(/^([a-zA-Z][a-zA-Z0-9.\-+]*):/);
    if (!m)
      return b.match(/^[/\\]{2}/) ? !t.allowProtocolRelative : !1;
    const x = m[1].toLowerCase();
    return Xt(t.allowedSchemesByTag, g) ? t.allowedSchemesByTag[g].indexOf(x) === -1 : !t.allowedSchemes || t.allowedSchemes.indexOf(x) === -1;
  }
  function w(g) {
    if (g = g.replace(/^(\w+:)?\s*[\\/]\s*[\\/]/, "$1//"), g.startsWith("relative:"))
      throw new Error("relative: exploit attempt");
    let b = "relative://relative-site";
    for (let S = 0; S < 100; S++)
      b += `/${S}`;
    const m = new URL(g, b);
    return {
      isRelativeUrl: m && m.hostname === "relative-site" && m.protocol === "relative:",
      url: m
    };
  }
  function h(g, b) {
    if (!b)
      return g;
    const m = g.nodes[0];
    let x;
    return b[m.selector] && b["*"] ? x = Vi(
      b[m.selector],
      b["*"]
    ) : x = b[m.selector] || b["*"], x && (g.nodes[0].nodes = m.nodes.reduce(E(x), [])), g;
  }
  function y(g) {
    return g.nodes[0].nodes.reduce(function(b, m) {
      return b.push(
        `${m.prop}:${m.value}${m.important ? " !important" : ""}`
      ), b;
    }, []).join(";");
  }
  function E(g) {
    return function(b, m) {
      return Xt(g, m.prop) && g[m.prop].some(function(S) {
        return S.test(m.value);
      }) && b.push(m), b;
    };
  }
  function A(g, b, m) {
    return b ? (g = g.split(/\s+/), g.filter(function(x) {
      return b.indexOf(x) !== -1 || m.some(function(S) {
        return S.test(x);
      });
    }).join(" ")) : g;
  }
}
const ul = {
  decodeEntities: !0
};
ps.defaults = {
  allowedTags: [
    // Sections derived from MDN element categories and limited to the more
    // benign categories.
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element
    // Content sectioning
    "address",
    "article",
    "aside",
    "footer",
    "header",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hgroup",
    "main",
    "nav",
    "section",
    // Text content
    "blockquote",
    "dd",
    "div",
    "dl",
    "dt",
    "figcaption",
    "figure",
    "hr",
    "li",
    "main",
    "ol",
    "p",
    "pre",
    "ul",
    // Inline text semantics
    "a",
    "abbr",
    "b",
    "bdi",
    "bdo",
    "br",
    "cite",
    "code",
    "data",
    "dfn",
    "em",
    "i",
    "kbd",
    "mark",
    "q",
    "rb",
    "rp",
    "rt",
    "rtc",
    "ruby",
    "s",
    "samp",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
    "time",
    "u",
    "var",
    "wbr",
    // Table content
    "caption",
    "col",
    "colgroup",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "tr"
  ],
  // Tags that cannot be boolean
  nonBooleanAttributes: [
    "abbr",
    "accept",
    "accept-charset",
    "accesskey",
    "action",
    "allow",
    "alt",
    "as",
    "autocapitalize",
    "autocomplete",
    "blocking",
    "charset",
    "cite",
    "class",
    "color",
    "cols",
    "colspan",
    "content",
    "contenteditable",
    "coords",
    "crossorigin",
    "data",
    "datetime",
    "decoding",
    "dir",
    "dirname",
    "download",
    "draggable",
    "enctype",
    "enterkeyhint",
    "fetchpriority",
    "for",
    "form",
    "formaction",
    "formenctype",
    "formmethod",
    "formtarget",
    "headers",
    "height",
    "hidden",
    "high",
    "href",
    "hreflang",
    "http-equiv",
    "id",
    "imagesizes",
    "imagesrcset",
    "inputmode",
    "integrity",
    "is",
    "itemid",
    "itemprop",
    "itemref",
    "itemtype",
    "kind",
    "label",
    "lang",
    "list",
    "loading",
    "low",
    "max",
    "maxlength",
    "media",
    "method",
    "min",
    "minlength",
    "name",
    "nonce",
    "optimum",
    "pattern",
    "ping",
    "placeholder",
    "popover",
    "popovertarget",
    "popovertargetaction",
    "poster",
    "preload",
    "referrerpolicy",
    "rel",
    "rows",
    "rowspan",
    "sandbox",
    "scope",
    "shape",
    "size",
    "sizes",
    "slot",
    "span",
    "spellcheck",
    "src",
    "srcdoc",
    "srclang",
    "srcset",
    "start",
    "step",
    "style",
    "tabindex",
    "target",
    "title",
    "translate",
    "type",
    "usemap",
    "value",
    "width",
    "wrap",
    // Event handlers
    "onauxclick",
    "onafterprint",
    "onbeforematch",
    "onbeforeprint",
    "onbeforeunload",
    "onbeforetoggle",
    "onblur",
    "oncancel",
    "oncanplay",
    "oncanplaythrough",
    "onchange",
    "onclick",
    "onclose",
    "oncontextlost",
    "oncontextmenu",
    "oncontextrestored",
    "oncopy",
    "oncuechange",
    "oncut",
    "ondblclick",
    "ondrag",
    "ondragend",
    "ondragenter",
    "ondragleave",
    "ondragover",
    "ondragstart",
    "ondrop",
    "ondurationchange",
    "onemptied",
    "onended",
    "onerror",
    "onfocus",
    "onformdata",
    "onhashchange",
    "oninput",
    "oninvalid",
    "onkeydown",
    "onkeypress",
    "onkeyup",
    "onlanguagechange",
    "onload",
    "onloadeddata",
    "onloadedmetadata",
    "onloadstart",
    "onmessage",
    "onmessageerror",
    "onmousedown",
    "onmouseenter",
    "onmouseleave",
    "onmousemove",
    "onmouseout",
    "onmouseover",
    "onmouseup",
    "onoffline",
    "ononline",
    "onpagehide",
    "onpageshow",
    "onpaste",
    "onpause",
    "onplay",
    "onplaying",
    "onpopstate",
    "onprogress",
    "onratechange",
    "onreset",
    "onresize",
    "onrejectionhandled",
    "onscroll",
    "onscrollend",
    "onsecuritypolicyviolation",
    "onseeked",
    "onseeking",
    "onselect",
    "onslotchange",
    "onstalled",
    "onstorage",
    "onsubmit",
    "onsuspend",
    "ontimeupdate",
    "ontoggle",
    "onunhandledrejection",
    "onunload",
    "onvolumechange",
    "onwaiting",
    "onwheel"
  ],
  disallowedTagsMode: "discard",
  allowedAttributes: {
    a: ["href", "name", "target"],
    // We don't currently allow img itself by default, but
    // these attributes would make sense if we did.
    img: ["src", "srcset", "alt", "title", "width", "height", "loading"]
  },
  allowedEmptyAttributes: [
    "alt"
  ],
  // Lots of these won't come up by default because we don't allow them
  selfClosing: ["img", "br", "hr", "area", "base", "basefont", "input", "link", "meta"],
  // URL schemes we permit
  allowedSchemes: ["http", "https", "ftp", "mailto", "tel"],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
  allowProtocolRelative: !0,
  enforceHtmlBoundary: !1,
  parseStyleAttributes: !0
};
ps.simpleTransform = function(a, t, e) {
  return e = e === void 0 ? !0 : e, t = t || {}, function(s, i) {
    let n;
    if (e)
      for (n in t)
        i[n] = t[n];
    else
      i = t;
    return {
      tagName: a,
      attribs: i
    };
  };
};
const ll = /* @__PURE__ */ Qa(ol), qi = (a) => {
  a = 1831565813 + (a |= 0) | 0;
  let t = Math.imul(a ^ a >>> 15, 1 | a);
  return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
};
class fl {
  constructor(t) {
    this.dictionaries = void 0, this.length = void 0, this.separator = void 0, this.style = void 0, this.seed = void 0;
    const { length: e, separator: s, dictionaries: i, style: n, seed: r } = t;
    this.dictionaries = i, this.separator = s, this.length = e, this.style = n, this.seed = r;
  }
  generate() {
    if (!this.dictionaries) throw new Error('Cannot find any dictionary. Please provide at least one, or leave the "dictionary" field empty in the config object');
    if (this.length <= 0) throw new Error("Invalid length provided");
    if (this.length > this.dictionaries.length) throw new Error(`The length cannot be bigger than the number of dictionaries.
Length provided: ${this.length}. Number of dictionaries provided: ${this.dictionaries.length}`);
    let t = this.seed;
    return this.dictionaries.slice(0, this.length).reduce((e, s) => {
      let i;
      t ? (i = ((r) => {
        if (typeof r == "string") {
          const o = r.split("").map((u) => u.charCodeAt(0)).reduce((u, d) => u + d, 1), c = Math.floor(Number(o));
          return qi(c);
        }
        return qi(r);
      })(t), t = 4294967296 * i) : i = Math.random();
      let n = s[Math.floor(i * s.length)] || "";
      if (this.style === "lowerCase") n = n.toLowerCase();
      else if (this.style === "capital") {
        const [r, ...o] = n.split("");
        n = r.toUpperCase() + o.join("");
      } else this.style === "upperCase" && (n = n.toUpperCase());
      return e ? `${e}${this.separator}${n}` : `${n}`;
    }, "");
  }
}
const Ui = { separator: "_", dictionaries: [] }, dl = (a) => {
  const t = [...a.dictionaries || Ui.dictionaries], e = { ...Ui, ...a, length: a.length || t.length, dictionaries: t };
  if (!a || !a.dictionaries || !a.dictionaries.length) throw new Error('A "dictionaries" array must be provided. This is a breaking change introduced starting from Unique Name Generator v4. Read more about the breaking change here: https://github.com/andreasonny83/unique-names-generator#migration-guide');
  return new fl(e).generate();
};
var Xi = ["able", "above", "absent", "absolute", "abstract", "abundant", "academic", "acceptable", "accepted", "accessible", "accurate", "accused", "active", "actual", "acute", "added", "additional", "adequate", "adjacent", "administrative", "adorable", "advanced", "adverse", "advisory", "aesthetic", "afraid", "aggregate", "aggressive", "agreeable", "agreed", "agricultural", "alert", "alive", "alleged", "allied", "alone", "alright", "alternative", "amateur", "amazing", "ambitious", "amused", "ancient", "angry", "annoyed", "annual", "anonymous", "anxious", "appalling", "apparent", "applicable", "appropriate", "arbitrary", "architectural", "armed", "arrogant", "artificial", "artistic", "ashamed", "asleep", "assistant", "associated", "atomic", "attractive", "automatic", "autonomous", "available", "average", "awake", "aware", "awful", "awkward", "back", "bad", "balanced", "bare", "basic", "beautiful", "beneficial", "better", "bewildered", "big", "binding", "biological", "bitter", "bizarre", "blank", "blind", "blonde", "bloody", "blushing", "boiling", "bold", "bored", "boring", "bottom", "brainy", "brave", "breakable", "breezy", "brief", "bright", "brilliant", "broad", "broken", "bumpy", "burning", "busy", "calm", "capable", "capitalist", "careful", "casual", "causal", "cautious", "central", "certain", "changing", "characteristic", "charming", "cheap", "cheerful", "chemical", "chief", "chilly", "chosen", "christian", "chronic", "chubby", "circular", "civic", "civil", "civilian", "classic", "classical", "clean", "clear", "clever", "clinical", "close", "closed", "cloudy", "clumsy", "coastal", "cognitive", "coherent", "cold", "collective", "colonial", "colorful", "colossal", "coloured", "colourful", "combative", "combined", "comfortable", "coming", "commercial", "common", "communist", "compact", "comparable", "comparative", "compatible", "competent", "competitive", "complete", "complex", "complicated", "comprehensive", "compulsory", "conceptual", "concerned", "concrete", "condemned", "confident", "confidential", "confused", "conscious", "conservation", "conservative", "considerable", "consistent", "constant", "constitutional", "contemporary", "content", "continental", "continued", "continuing", "continuous", "controlled", "controversial", "convenient", "conventional", "convinced", "convincing", "cooing", "cool", "cooperative", "corporate", "correct", "corresponding", "costly", "courageous", "crazy", "creative", "creepy", "criminal", "critical", "crooked", "crowded", "crucial", "crude", "cruel", "cuddly", "cultural", "curious", "curly", "current", "curved", "cute", "daily", "damaged", "damp", "dangerous", "dark", "dead", "deaf", "deafening", "dear", "decent", "decisive", "deep", "defeated", "defensive", "defiant", "definite", "deliberate", "delicate", "delicious", "delighted", "delightful", "democratic", "dependent", "depressed", "desirable", "desperate", "detailed", "determined", "developed", "developing", "devoted", "different", "difficult", "digital", "diplomatic", "direct", "dirty", "disabled", "disappointed", "disastrous", "disciplinary", "disgusted", "distant", "distinct", "distinctive", "distinguished", "disturbed", "disturbing", "diverse", "divine", "dizzy", "domestic", "dominant", "double", "doubtful", "drab", "dramatic", "dreadful", "driving", "drunk", "dry", "dual", "due", "dull", "dusty", "dutch", "dying", "dynamic", "eager", "early", "eastern", "easy", "economic", "educational", "eerie", "effective", "efficient", "elaborate", "elated", "elderly", "eldest", "electoral", "electric", "electrical", "electronic", "elegant", "eligible", "embarrassed", "embarrassing", "emotional", "empirical", "empty", "enchanting", "encouraging", "endless", "energetic", "enormous", "enthusiastic", "entire", "entitled", "envious", "environmental", "equal", "equivalent", "essential", "established", "estimated", "ethical", "ethnic", "eventual", "everyday", "evident", "evil", "evolutionary", "exact", "excellent", "exceptional", "excess", "excessive", "excited", "exciting", "exclusive", "existing", "exotic", "expected", "expensive", "experienced", "experimental", "explicit", "extended", "extensive", "external", "extra", "extraordinary", "extreme", "exuberant", "faint", "fair", "faithful", "familiar", "famous", "fancy", "fantastic", "far", "fascinating", "fashionable", "fast", "fat", "fatal", "favourable", "favourite", "federal", "fellow", "female", "feminist", "few", "fierce", "filthy", "final", "financial", "fine", "firm", "fiscal", "fit", "fixed", "flaky", "flat", "flexible", "fluffy", "fluttering", "flying", "following", "fond", "foolish", "foreign", "formal", "formidable", "forthcoming", "fortunate", "forward", "fragile", "frail", "frantic", "free", "frequent", "fresh", "friendly", "frightened", "front", "frozen", "full", "fun", "functional", "fundamental", "funny", "furious", "future", "fuzzy", "gastric", "gay", "general", "generous", "genetic", "gentle", "genuine", "geographical", "giant", "gigantic", "given", "glad", "glamorous", "gleaming", "global", "glorious", "golden", "good", "gorgeous", "gothic", "governing", "graceful", "gradual", "grand", "grateful", "greasy", "great", "grieving", "grim", "gross", "grotesque", "growing", "grubby", "grumpy", "guilty", "handicapped", "handsome", "happy", "hard", "harsh", "head", "healthy", "heavy", "helpful", "helpless", "hidden", "high", "hilarious", "hissing", "historic", "historical", "hollow", "holy", "homeless", "homely", "hon", "honest", "horizontal", "horrible", "hostile", "hot", "huge", "human", "hungry", "hurt", "hushed", "husky", "icy", "ideal", "identical", "ideological", "ill", "illegal", "imaginative", "immediate", "immense", "imperial", "implicit", "important", "impossible", "impressed", "impressive", "improved", "inadequate", "inappropriate", "inc", "inclined", "increased", "increasing", "incredible", "independent", "indirect", "individual", "industrial", "inevitable", "influential", "informal", "inherent", "initial", "injured", "inland", "inner", "innocent", "innovative", "inquisitive", "instant", "institutional", "insufficient", "intact", "integral", "integrated", "intellectual", "intelligent", "intense", "intensive", "interested", "interesting", "interim", "interior", "intermediate", "internal", "international", "intimate", "invisible", "involved", "irrelevant", "isolated", "itchy", "jealous", "jittery", "joint", "jolly", "joyous", "judicial", "juicy", "junior", "just", "keen", "key", "kind", "known", "labour", "large", "late", "latin", "lazy", "leading", "left", "legal", "legislative", "legitimate", "lengthy", "lesser", "level", "lexical", "liable", "liberal", "light", "like", "likely", "limited", "linear", "linguistic", "liquid", "literary", "little", "live", "lively", "living", "local", "logical", "lonely", "long", "loose", "lost", "loud", "lovely", "low", "loyal", "ltd", "lucky", "mad", "magic", "magnetic", "magnificent", "main", "major", "male", "mammoth", "managerial", "managing", "manual", "many", "marginal", "marine", "marked", "married", "marvellous", "marxist", "mass", "massive", "mathematical", "mature", "maximum", "mean", "meaningful", "mechanical", "medical", "medieval", "melodic", "melted", "mental", "mere", "metropolitan", "mid", "middle", "mighty", "mild", "military", "miniature", "minimal", "minimum", "ministerial", "minor", "miserable", "misleading", "missing", "misty", "mixed", "moaning", "mobile", "moderate", "modern", "modest", "molecular", "monetary", "monthly", "moral", "motionless", "muddy", "multiple", "mushy", "musical", "mute", "mutual", "mysterious", "naked", "narrow", "nasty", "national", "native", "natural", "naughty", "naval", "near", "nearby", "neat", "necessary", "negative", "neighbouring", "nervous", "net", "neutral", "new", "nice", "noble", "noisy", "normal", "northern", "nosy", "notable", "novel", "nuclear", "numerous", "nursing", "nutritious", "nutty", "obedient", "objective", "obliged", "obnoxious", "obvious", "occasional", "occupational", "odd", "official", "ok", "okay", "old", "olympic", "only", "open", "operational", "opposite", "optimistic", "oral", "ordinary", "organic", "organisational", "original", "orthodox", "other", "outdoor", "outer", "outrageous", "outside", "outstanding", "overall", "overseas", "overwhelming", "painful", "pale", "panicky", "parallel", "parental", "parliamentary", "partial", "particular", "passing", "passive", "past", "patient", "payable", "peaceful", "peculiar", "perfect", "permanent", "persistent", "personal", "petite", "philosophical", "physical", "plain", "planned", "plastic", "pleasant", "pleased", "poised", "polite", "political", "poor", "popular", "positive", "possible", "potential", "powerful", "practical", "precious", "precise", "preferred", "pregnant", "preliminary", "premier", "prepared", "present", "presidential", "pretty", "previous", "prickly", "primary", "prime", "primitive", "principal", "printed", "prior", "private", "probable", "productive", "professional", "profitable", "profound", "progressive", "prominent", "promising", "proper", "proposed", "prospective", "protective", "protestant", "proud", "provincial", "psychiatric", "psychological", "public", "puny", "pure", "purring", "puzzled", "quaint", "qualified", "quarrelsome", "querulous", "quick", "quickest", "quiet", "quintessential", "quixotic", "racial", "radical", "rainy", "random", "rapid", "rare", "raspy", "rational", "ratty", "raw", "ready", "real", "realistic", "rear", "reasonable", "recent", "reduced", "redundant", "regional", "registered", "regular", "regulatory", "related", "relative", "relaxed", "relevant", "reliable", "relieved", "religious", "reluctant", "remaining", "remarkable", "remote", "renewed", "representative", "repulsive", "required", "resident", "residential", "resonant", "respectable", "respective", "responsible", "resulting", "retail", "retired", "revolutionary", "rich", "ridiculous", "right", "rigid", "ripe", "rising", "rival", "roasted", "robust", "rolling", "romantic", "rotten", "rough", "round", "royal", "rubber", "rude", "ruling", "running", "rural", "sacred", "sad", "safe", "salty", "satisfactory", "satisfied", "scared", "scary", "scattered", "scientific", "scornful", "scrawny", "screeching", "secondary", "secret", "secure", "select", "selected", "selective", "selfish", "semantic", "senior", "sensible", "sensitive", "separate", "serious", "severe", "sexual", "shaggy", "shaky", "shallow", "shared", "sharp", "sheer", "shiny", "shivering", "shocked", "short", "shrill", "shy", "sick", "significant", "silent", "silky", "silly", "similar", "simple", "single", "skilled", "skinny", "sleepy", "slight", "slim", "slimy", "slippery", "slow", "small", "smart", "smiling", "smoggy", "smooth", "social", "socialist", "soft", "solar", "sole", "solid", "sophisticated", "sore", "sorry", "sound", "sour", "southern", "soviet", "spare", "sparkling", "spatial", "special", "specific", "specified", "spectacular", "spicy", "spiritual", "splendid", "spontaneous", "sporting", "spotless", "spotty", "square", "squealing", "stable", "stale", "standard", "static", "statistical", "statutory", "steady", "steep", "sticky", "stiff", "still", "stingy", "stormy", "straight", "straightforward", "strange", "strategic", "strict", "striking", "striped", "strong", "structural", "stuck", "stupid", "subjective", "subsequent", "substantial", "subtle", "successful", "successive", "sudden", "sufficient", "suitable", "sunny", "super", "superb", "superior", "supporting", "supposed", "supreme", "sure", "surprised", "surprising", "surrounding", "surviving", "suspicious", "sweet", "swift", "symbolic", "sympathetic", "systematic", "tall", "tame", "tart", "tasteless", "tasty", "technical", "technological", "teenage", "temporary", "tender", "tense", "terrible", "territorial", "testy", "then", "theoretical", "thick", "thin", "thirsty", "thorough", "thoughtful", "thoughtless", "thundering", "tight", "tiny", "tired", "top", "tory", "total", "tough", "toxic", "traditional", "tragic", "tremendous", "tricky", "tropical", "troubled", "typical", "ugliest", "ugly", "ultimate", "unable", "unacceptable", "unaware", "uncertain", "unchanged", "uncomfortable", "unconscious", "underground", "underlying", "unemployed", "uneven", "unexpected", "unfair", "unfortunate", "unhappy", "uniform", "uninterested", "unique", "united", "universal", "unknown", "unlikely", "unnecessary", "unpleasant", "unsightly", "unusual", "unwilling", "upper", "upset", "uptight", "urban", "urgent", "used", "useful", "useless", "usual", "vague", "valid", "valuable", "variable", "varied", "various", "varying", "vast", "verbal", "vertical", "very", "vicarious", "vicious", "victorious", "violent", "visible", "visiting", "visual", "vital", "vitreous", "vivacious", "vivid", "vocal", "vocational", "voiceless", "voluminous", "voluntary", "vulnerable", "wandering", "warm", "wasteful", "watery", "weak", "wealthy", "weary", "wee", "weekly", "weird", "welcome", "well", "western", "wet", "whispering", "whole", "wicked", "wide", "widespread", "wild", "wilful", "willing", "willowy", "wily", "wise", "wispy", "wittering", "witty", "wonderful", "wooden", "working", "worldwide", "worried", "worrying", "worthwhile", "worthy", "written", "wrong", "xenacious", "xenial", "xenogeneic", "xenophobic", "xeric", "xerothermic", "yabbering", "yammering", "yappiest", "yappy", "yawning", "yearling", "yearning", "yeasty", "yelling", "yelping", "yielding", "yodelling", "young", "youngest", "youthful", "ytterbic", "yucky", "yummy", "zany", "zealous", "zeroth", "zestful", "zesty", "zippy", "zonal", "zoophagous", "zygomorphic", "zygotic"], gl = ["aardvark", "aardwolf", "albatross", "alligator", "alpaca", "amphibian", "anaconda", "angelfish", "anglerfish", "ant", "anteater", "antelope", "antlion", "ape", "aphid", "armadillo", "asp", "baboon", "badger", "bandicoot", "barnacle", "barracuda", "basilisk", "bass", "bat", "bear", "beaver", "bedbug", "bee", "beetle", "bird", "bison", "blackbird", "boa", "boar", "bobcat", "bobolink", "bonobo", "booby", "bovid", "bug", "butterfly", "buzzard", "camel", "canid", "canidae", "capybara", "cardinal", "caribou", "carp", "cat", "caterpillar", "catfish", "catshark", "cattle", "centipede", "cephalopod", "chameleon", "cheetah", "chickadee", "chicken", "chimpanzee", "chinchilla", "chipmunk", "cicada", "clam", "clownfish", "cobra", "cockroach", "cod", "condor", "constrictor", "coral", "cougar", "cow", "coyote", "crab", "crane", "crawdad", "crayfish", "cricket", "crocodile", "crow", "cuckoo", "damselfly", "deer", "dingo", "dinosaur", "dog", "dolphin", "donkey", "dormouse", "dove", "dragon", "dragonfly", "duck", "eagle", "earthworm", "earwig", "echidna", "eel", "egret", "elephant", "elk", "emu", "ermine", "falcon", "felidae", "ferret", "finch", "firefly", "fish", "flamingo", "flea", "fly", "flyingfish", "fowl", "fox", "frog", "galliform", "gamefowl", "gayal", "gazelle", "gecko", "gerbil", "gibbon", "giraffe", "goat", "goldfish", "goose", "gopher", "gorilla", "grasshopper", "grouse", "guan", "guanaco", "guineafowl", "gull", "guppy", "haddock", "halibut", "hamster", "hare", "harrier", "hawk", "hedgehog", "heron", "herring", "hippopotamus", "hookworm", "hornet", "horse", "hoverfly", "hummingbird", "hyena", "iguana", "impala", "jackal", "jaguar", "jay", "jellyfish", "junglefowl", "kangaroo", "kingfisher", "kite", "kiwi", "koala", "koi", "krill", "ladybug", "lamprey", "landfowl", "lark", "leech", "lemming", "lemur", "leopard", "leopon", "limpet", "lion", "lizard", "llama", "lobster", "locust", "loon", "louse", "lungfish", "lynx", "macaw", "mackerel", "magpie", "mammal", "manatee", "mandrill", "marlin", "marmoset", "marmot", "marsupial", "marten", "mastodon", "meadowlark", "meerkat", "mink", "minnow", "mite", "mockingbird", "mole", "mollusk", "mongoose", "monkey", "moose", "mosquito", "moth", "mouse", "mule", "muskox", "narwhal", "newt", "nightingale", "ocelot", "octopus", "opossum", "orangutan", "orca", "ostrich", "otter", "owl", "ox", "panda", "panther", "parakeet", "parrot", "parrotfish", "partridge", "peacock", "peafowl", "pelican", "penguin", "perch", "pheasant", "pig", "pigeon", "pike", "pinniped", "piranha", "planarian", "platypus", "pony", "porcupine", "porpoise", "possum", "prawn", "primate", "ptarmigan", "puffin", "puma", "python", "quail", "quelea", "quokka", "rabbit", "raccoon", "rat", "rattlesnake", "raven", "reindeer", "reptile", "rhinoceros", "roadrunner", "rodent", "rook", "rooster", "roundworm", "sailfish", "salamander", "salmon", "sawfish", "scallop", "scorpion", "seahorse", "shark", "sheep", "shrew", "shrimp", "silkworm", "silverfish", "skink", "skunk", "sloth", "slug", "smelt", "snail", "snake", "snipe", "sole", "sparrow", "spider", "spoonbill", "squid", "squirrel", "starfish", "stingray", "stoat", "stork", "sturgeon", "swallow", "swan", "swift", "swordfish", "swordtail", "tahr", "takin", "tapir", "tarantula", "tarsier", "termite", "tern", "thrush", "tick", "tiger", "tiglon", "toad", "tortoise", "toucan", "trout", "tuna", "turkey", "turtle", "tyrannosaurus", "unicorn", "urial", "vicuna", "viper", "vole", "vulture", "wallaby", "walrus", "warbler", "wasp", "weasel", "whale", "whippet", "whitefish", "wildcat", "wildebeest", "wildfowl", "wolf", "wolverine", "wombat", "woodpecker", "worm", "wren", "xerinae", "yak", "zebra"];
const Af = (a) => {
  var s, i;
  const t = new RegExp(new RegExp("(\\p{L}{1})\\p{L}+", "gu")), e = [...a.matchAll(t)];
  return ((((s = e.shift()) == null ? void 0 : s[1]) ?? "") + (((i = e.pop()) == null ? void 0 : i[1]) ?? "")).toUpperCase();
}, Ef = (a) => a ? /https?:\/\/[^\n ]+/i.test(a) : !1, Sf = (a) => a === "<p></p>" ? !0 : a.trim().length === 0, Cf = (a) => {
  const e = /https?:\/\/[^\n ]+/i.exec(a);
  return e ? e[0] : null;
}, If = (a) => dl({
  dictionaries: [Xi, Xi, gl],
  style: "capital",
  separator: " ",
  length: 3,
  ...a
}), Nf = (a) => a ? a.replace(/[^\d.A-Za-z-]/g, "").toLowerCase() : "", Tf = (a) => {
  if (!a) return { page: 0, column: 0, section: 0 };
  const t = a.index, [e, s] = a.containerId.split(".").map(Number);
  return { page: e, column: s, section: t };
}, Mf = (a, t) => {
  const e = (t == null ? void 0 : t.allowedTags) ?? [];
  return ll(a, {
    ...t,
    allowedTags: [
      ...e,
      "a",
      "abbr",
      "address",
      "article",
      "aside",
      "b",
      "bdi",
      "bdo",
      "blockquote",
      "br",
      "caption",
      "cite",
      "code",
      "col",
      "colgroup",
      "data",
      "dd",
      "dfn",
      "div",
      "dl",
      "dt",
      "em",
      "figcaption",
      "figure",
      "footer",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "header",
      "hgroup",
      "hr",
      "i",
      "img",
      "kbd",
      "li",
      "main",
      "main",
      "mark",
      "nav",
      "ol",
      "p",
      "pre",
      "q",
      "rb",
      "rp",
      "rt",
      "rtc",
      "ruby",
      "s",
      "samp",
      "section",
      "small",
      "span",
      "strong",
      "sub",
      "sup",
      "table",
      "tbody",
      "td",
      "tfoot",
      "th",
      "thead",
      "time",
      "tr",
      "u",
      "ul",
      "var",
      "wbr"
    ],
    allowedAttributes: {
      ...t == null ? void 0 : t.allowedAttributes,
      "*": ["class", "style"],
      a: ["href", "target"],
      img: ["src", "alt"]
    },
    allowedStyles: {
      ...t == null ? void 0 : t.allowedStyles,
      "*": { "text-align": [/^left$/, /^right$/, /^center$/, /^justify$/] }
    }
  });
};
function br(a) {
  var t, e, s = "";
  if (typeof a == "string" || typeof a == "number") s += a;
  else if (typeof a == "object") if (Array.isArray(a)) {
    var i = a.length;
    for (t = 0; t < i; t++) a[t] && (e = br(a[t])) && (s && (s += " "), s += e);
  } else for (e in a) a[e] && (s && (s += " "), s += e);
  return s;
}
function hl() {
  for (var a, t, e = 0, s = "", i = arguments.length; e < i; e++) (a = arguments[e]) && (t = br(a)) && (s && (s += " "), s += t);
  return s;
}
const ci = "-", pl = (a) => {
  const t = vl(a), {
    conflictingClassGroups: e,
    conflictingClassGroupModifiers: s
  } = a;
  return {
    getClassGroupId: (r) => {
      const o = r.split(ci);
      return o[0] === "" && o.length !== 1 && o.shift(), yr(o, t) || ml(r);
    },
    getConflictingClassGroupIds: (r, o) => {
      const c = e[r] || [];
      return o && s[r] ? [...c, ...s[r]] : c;
    }
  };
}, yr = (a, t) => {
  var r;
  if (a.length === 0)
    return t.classGroupId;
  const e = a[0], s = t.nextPart.get(e), i = s ? yr(a.slice(1), s) : void 0;
  if (i)
    return i;
  if (t.validators.length === 0)
    return;
  const n = a.join(ci);
  return (r = t.validators.find(({
    validator: o
  }) => o(n))) == null ? void 0 : r.classGroupId;
}, Yi = /^\[(.+)\]$/, ml = (a) => {
  if (Yi.test(a)) {
    const t = Yi.exec(a)[1], e = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (e)
      return "arbitrary.." + e;
  }
}, vl = (a) => {
  const {
    theme: t,
    prefix: e
  } = a, s = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return yl(Object.entries(a.classGroups), e).forEach(([n, r]) => {
    Za(r, s, n, t);
  }), s;
}, Za = (a, t, e, s) => {
  a.forEach((i) => {
    if (typeof i == "string") {
      const n = i === "" ? t : Ki(t, i);
      n.classGroupId = e;
      return;
    }
    if (typeof i == "function") {
      if (bl(i)) {
        Za(i(s), t, e, s);
        return;
      }
      t.validators.push({
        validator: i,
        classGroupId: e
      });
      return;
    }
    Object.entries(i).forEach(([n, r]) => {
      Za(r, Ki(t, n), e, s);
    });
  });
}, Ki = (a, t) => {
  let e = a;
  return t.split(ci).forEach((s) => {
    e.nextPart.has(s) || e.nextPart.set(s, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), e = e.nextPart.get(s);
  }), e;
}, bl = (a) => a.isThemeGetter, yl = (a, t) => t ? a.map(([e, s]) => {
  const i = s.map((n) => typeof n == "string" ? t + n : typeof n == "object" ? Object.fromEntries(Object.entries(n).map(([r, o]) => [t + r, o])) : n);
  return [e, i];
}) : a, xl = (a) => {
  if (a < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, e = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  const i = (n, r) => {
    e.set(n, r), t++, t > a && (t = 0, s = e, e = /* @__PURE__ */ new Map());
  };
  return {
    get(n) {
      let r = e.get(n);
      if (r !== void 0)
        return r;
      if ((r = s.get(n)) !== void 0)
        return i(n, r), r;
    },
    set(n, r) {
      e.has(n) ? e.set(n, r) : i(n, r);
    }
  };
}, xr = "!", wl = (a) => {
  const {
    separator: t,
    experimentalParseClassName: e
  } = a, s = t.length === 1, i = t[0], n = t.length, r = (o) => {
    const c = [];
    let u = 0, d = 0, _;
    for (let k = 0; k < o.length; k++) {
      let O = o[k];
      if (u === 0) {
        if (O === i && (s || o.slice(k, k + n) === t)) {
          c.push(o.slice(d, k)), d = k + n;
          continue;
        }
        if (O === "/") {
          _ = k;
          continue;
        }
      }
      O === "[" ? u++ : O === "]" && u--;
    }
    const l = c.length === 0 ? o : o.substring(d), f = l.startsWith(xr), N = f ? l.substring(1) : l, F = _ && _ > d ? _ - d : void 0;
    return {
      modifiers: c,
      hasImportantModifier: f,
      baseClassName: N,
      maybePostfixModifierPosition: F
    };
  };
  return e ? (o) => e({
    className: o,
    parseClassName: r
  }) : r;
}, kl = (a) => {
  if (a.length <= 1)
    return a;
  const t = [];
  let e = [];
  return a.forEach((s) => {
    s[0] === "[" ? (t.push(...e.sort(), s), e = []) : e.push(s);
  }), t.push(...e.sort()), t;
}, _l = (a) => ({
  cache: xl(a.cacheSize),
  parseClassName: wl(a),
  ...pl(a)
}), Al = /\s+/, El = (a, t) => {
  const {
    parseClassName: e,
    getClassGroupId: s,
    getConflictingClassGroupIds: i
  } = t, n = [], r = a.trim().split(Al);
  let o = "";
  for (let c = r.length - 1; c >= 0; c -= 1) {
    const u = r[c], {
      modifiers: d,
      hasImportantModifier: _,
      baseClassName: l,
      maybePostfixModifierPosition: f
    } = e(u);
    let N = !!f, F = s(N ? l.substring(0, f) : l);
    if (!F) {
      if (!N) {
        o = u + (o.length > 0 ? " " + o : o);
        continue;
      }
      if (F = s(l), !F) {
        o = u + (o.length > 0 ? " " + o : o);
        continue;
      }
      N = !1;
    }
    const k = kl(d).join(":"), O = _ ? k + xr : k, R = O + F;
    if (n.includes(R))
      continue;
    n.push(R);
    const U = i(F, N);
    for (let q = 0; q < U.length; ++q) {
      const G = U[q];
      n.push(O + G);
    }
    o = u + (o.length > 0 ? " " + o : o);
  }
  return o;
};
function Sl() {
  let a = 0, t, e, s = "";
  for (; a < arguments.length; )
    (t = arguments[a++]) && (e = wr(t)) && (s && (s += " "), s += e);
  return s;
}
const wr = (a) => {
  if (typeof a == "string")
    return a;
  let t, e = "";
  for (let s = 0; s < a.length; s++)
    a[s] && (t = wr(a[s])) && (e && (e += " "), e += t);
  return e;
};
function Cl(a, ...t) {
  let e, s, i, n = r;
  function r(c) {
    const u = t.reduce((d, _) => _(d), a());
    return e = _l(u), s = e.cache.get, i = e.cache.set, n = o, o(c);
  }
  function o(c) {
    const u = s(c);
    if (u)
      return u;
    const d = El(c, e);
    return i(c, d), d;
  }
  return function() {
    return n(Sl.apply(null, arguments));
  };
}
const ht = (a) => {
  const t = (e) => e[a] || [];
  return t.isThemeGetter = !0, t;
}, kr = /^\[(?:([a-z-]+):)?(.+)\]$/i, Il = /^\d+\/\d+$/, Nl = /* @__PURE__ */ new Set(["px", "full", "screen"]), Tl = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Ml = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Fl = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Ol = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, jl = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, qt = (a) => Se(a) || Nl.has(a) || Il.test(a), $t = (a) => De(a, "length", Bl), Se = (a) => !!a && !Number.isNaN(Number(a)), ma = (a) => De(a, "number", Se), qe = (a) => !!a && Number.isInteger(Number(a)), Pl = (a) => a.endsWith("%") && Se(a.slice(0, -1)), $ = (a) => kr.test(a), te = (a) => Tl.test(a), Dl = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Ll = (a) => De(a, Dl, _r), Rl = (a) => De(a, "position", _r), Zl = /* @__PURE__ */ new Set(["image", "url"]), Ql = (a) => De(a, Zl, Ul), Vl = (a) => De(a, "", ql), Ue = () => !0, De = (a, t, e) => {
  const s = kr.exec(a);
  return s ? s[1] ? typeof t == "string" ? s[1] === t : t.has(s[1]) : e(s[2]) : !1;
}, Bl = (a) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Ml.test(a) && !Fl.test(a)
), _r = () => !1, ql = (a) => Ol.test(a), Ul = (a) => jl.test(a), Xl = () => {
  const a = ht("colors"), t = ht("spacing"), e = ht("blur"), s = ht("brightness"), i = ht("borderColor"), n = ht("borderRadius"), r = ht("borderSpacing"), o = ht("borderWidth"), c = ht("contrast"), u = ht("grayscale"), d = ht("hueRotate"), _ = ht("invert"), l = ht("gap"), f = ht("gradientColorStops"), N = ht("gradientColorStopPositions"), F = ht("inset"), k = ht("margin"), O = ht("opacity"), R = ht("padding"), U = ht("saturate"), q = ht("scale"), G = ht("sepia"), it = ht("skew"), z = ht("space"), p = ht("translate"), v = () => ["auto", "contain", "none"], w = () => ["auto", "hidden", "clip", "visible", "scroll"], h = () => ["auto", $, t], y = () => [$, t], E = () => ["", qt, $t], A = () => ["auto", Se, $], g = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], b = () => ["solid", "dashed", "dotted", "double", "none"], m = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], x = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], S = () => ["", "0", $], M = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], C = () => [Se, $];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Ue],
      spacing: [qt, $t],
      blur: ["none", "", te, $],
      brightness: C(),
      borderColor: [a],
      borderRadius: ["none", "", "full", te, $],
      borderSpacing: y(),
      borderWidth: E(),
      contrast: C(),
      grayscale: S(),
      hueRotate: C(),
      invert: S(),
      gap: y(),
      gradientColorStops: [a],
      gradientColorStopPositions: [Pl, $t],
      inset: h(),
      margin: h(),
      opacity: C(),
      padding: y(),
      saturate: C(),
      scale: C(),
      sepia: S(),
      skew: C(),
      space: y(),
      translate: y()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", $]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [te]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": M()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": M()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...g(), $]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: w()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": w()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": w()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: v()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": v()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": v()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [F]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [F]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [F]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [F]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [F]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [F]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [F]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [F]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [F]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", qe, $]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: h()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", $]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: S()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: S()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", qe, $]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Ue]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", qe, $]
        }, $]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": A()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": A()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [Ue]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [qe, $]
        }, $]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": A()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": A()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", $]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", $]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [l]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [l]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [l]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...x()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...x(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...x(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [R]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [R]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [R]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [R]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [R]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [R]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [R]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [R]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [R]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [k]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [k]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [k]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [k]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [k]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [k]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [k]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [k]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [k]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [z]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [z]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", $, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [$, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [$, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [te]
        }, te]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [$, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [$, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [$, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [$, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", te, $t]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", ma]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Ue]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", $]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Se, ma]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", qt, $]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", $]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", $]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [a]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [O]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [a]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [O]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...b(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", qt, $t]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", qt, $]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [a]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: y()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", $]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", $]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [O]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...g(), Rl]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", Ll]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Ql]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [a]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [N]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [N]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [N]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [f]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [f]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [f]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [n]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [n]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [n]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [n]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [n]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [n]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [n]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [n]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [n]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [n]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [n]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [n]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [n]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [n]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [n]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [o]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [o]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [o]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [o]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [o]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [o]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [o]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [o]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [o]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [O]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...b(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [o]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [o]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [O]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: b()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [i]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [i]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [i]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [i]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [i]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [i]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [i]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [i]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [i]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [i]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...b()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [qt, $]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [qt, $t]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [a]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: E()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [a]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [O]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [qt, $t]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [a]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", te, Vl]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Ue]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [O]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...m(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": m()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [e]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [s]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [c]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", te, $]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [u]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [d]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [_]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [U]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [G]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [e]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [s]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [c]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [u]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [d]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [_]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [O]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [U]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [G]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [r]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [r]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [r]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", $]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: C()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", $]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: C()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", $]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [q]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [q]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [q]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [qe, $]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [p]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [p]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [it]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [it]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", $]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", a]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", $]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [a]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": y()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": y()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": y()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": y()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": y()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": y()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": y()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": y()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": y()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": y()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": y()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": y()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": y()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": y()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": y()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": y()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": y()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": y()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", $]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [a, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [qt, $t, ma]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [a, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, Yl = /* @__PURE__ */ Cl(Xl), Ff = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1400
}, Of = (...a) => Yl(hl(a)), jf = [
  // {name:"cv_template_1",id:1,withPhoto:true,withoutPhoto:false,oneColumn:true,twoColumn:false },
  { name: "cv_template_2", id: 2, withPhoto: !0, withoutPhoto: !1, oneColumn: !1, twoColumn: !0, progress: 10 },
  // {name:"cv_template_3",id:3,withPhoto:false,withoutPhoto:true,oneColumn:true,twoColumn:false,progress:10},
  { name: "cv_template_4", id: 4, withPhoto: !0, withoutPhoto: !1, oneColumn: !1, twoColumn: !0, progress: 10 },
  // {name:"cv_template_5",id:5,withPhoto:true,withoutPhoto:false,oneColumn:false,twoColumn:true,progress:10},
  { name: "cv_template_6", id: 6, withPhoto: !0, withoutPhoto: !1, oneColumn: !1, twoColumn: !0, progress: 10 },
  { name: "cv_template_14", id: 14, withPhoto: !0, withoutPhoto: !1, oneColumn: !1, twoColumn: !0, progress: 10 },
  { name: "cv_template_7", id: 7, withPhoto: !0, withoutPhoto: !1, oneColumn: !1, twoColumn: !0, progress: 10 },
  { name: "cv_template_8", id: 8, withPhoto: !0, withoutPhoto: !1, oneColumn: !1, twoColumn: !0, progress: 10 },
  { name: "cv_template_9", id: 9, withPhoto: !0, withoutPhoto: !1, oneColumn: !0, twoColumn: !1, progress: 10 },
  { name: "cv_template_10", id: 10, withPhoto: !0, withoutPhoto: !1, oneColumn: !1, twoColumn: !0, progress: 10 },
  { name: "cv_template_11", id: 11, withPhoto: !0, withoutPhoto: !1, oneColumn: !0, twoColumn: !1, progress: 10 },
  { name: "cv_template_12", id: 12, withPhoto: !0, withoutPhoto: !1, oneColumn: !0, twoColumn: !1, progress: 10 },
  { name: "cv_template_13", id: 13, withPhoto: !0, withoutPhoto: !1, oneColumn: !1, twoColumn: !0, progress: 10 }
];
export {
  Ro as ErrorMessage,
  Ff as breakpoints,
  Of as cn,
  Wl as csv,
  $l as dateSchema,
  Lo as deepSearchAndParseDates,
  of as delay,
  nf as exclude,
  Cf as extractUrl,
  Ar as findItemInLayout,
  Zo as fonts,
  If as generateRandomName,
  ef as getFontUrls,
  Af as getInitials,
  Gl as hexToRgb,
  Sf as isEmptyString,
  Ef as isUrl,
  sf as languages,
  af as linearTransform,
  zl as moveItemInLayout,
  rf as pageSizeMap,
  Hl as parseArrayLikeCSVEntry,
  Jl as parseCSV,
  Tf as parseLayoutLocator,
  Nf as processUsername,
  Kl as removeItemInLayout,
  Mf as sanitize,
  tf as sortByDate,
  jf as templatesList
};
