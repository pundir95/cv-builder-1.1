var w;
(function(n) {
  n.assertEqual = (s) => s;
  function e(s) {
  }
  n.assertIs = e;
  function t(s) {
    throw new Error();
  }
  n.assertNever = t, n.arrayToEnum = (s) => {
    const a = {};
    for (const o of s)
      a[o] = o;
    return a;
  }, n.getValidEnumValues = (s) => {
    const a = n.objectKeys(s).filter((c) => typeof s[s[c]] != "number"), o = {};
    for (const c of a)
      o[c] = s[c];
    return n.objectValues(o);
  }, n.objectValues = (s) => n.objectKeys(s).map(function(a) {
    return s[a];
  }), n.objectKeys = typeof Object.keys == "function" ? (s) => Object.keys(s) : (s) => {
    const a = [];
    for (const o in s)
      Object.prototype.hasOwnProperty.call(s, o) && a.push(o);
    return a;
  }, n.find = (s, a) => {
    for (const o of s)
      if (a(o))
        return o;
  }, n.isInteger = typeof Number.isInteger == "function" ? (s) => Number.isInteger(s) : (s) => typeof s == "number" && isFinite(s) && Math.floor(s) === s;
  function r(s, a = " | ") {
    return s.map((o) => typeof o == "string" ? `'${o}'` : o).join(a);
  }
  n.joinValues = r, n.jsonStringifyReplacer = (s, a) => typeof a == "bigint" ? a.toString() : a;
})(w || (w = {}));
var Je;
(function(n) {
  n.mergeShapes = (e, t) => ({
    ...e,
    ...t
    // second overwrites first
  });
})(Je || (Je = {}));
const p = w.arrayToEnum([
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
]), X = (n) => {
  switch (typeof n) {
    case "undefined":
      return p.undefined;
    case "string":
      return p.string;
    case "number":
      return isNaN(n) ? p.nan : p.number;
    case "boolean":
      return p.boolean;
    case "function":
      return p.function;
    case "bigint":
      return p.bigint;
    case "symbol":
      return p.symbol;
    case "object":
      return Array.isArray(n) ? p.array : n === null ? p.null : n.then && typeof n.then == "function" && n.catch && typeof n.catch == "function" ? p.promise : typeof Map < "u" && n instanceof Map ? p.map : typeof Set < "u" && n instanceof Set ? p.set : typeof Date < "u" && n instanceof Date ? p.date : p.object;
    default:
      return p.unknown;
  }
}, d = w.arrayToEnum([
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
]), _n = (n) => JSON.stringify(n, null, 2).replace(/"([^"]+)":/g, "$1:");
class D extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(), this.issues = [], this.addIssue = (r) => {
      this.issues = [...this.issues, r];
    }, this.addIssues = (r = []) => {
      this.issues = [...this.issues, ...r];
    };
    const t = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const t = e || function(a) {
      return a.message;
    }, r = { _errors: [] }, s = (a) => {
      for (const o of a.issues)
        if (o.code === "invalid_union")
          o.unionErrors.map(s);
        else if (o.code === "invalid_return_type")
          s(o.returnTypeError);
        else if (o.code === "invalid_arguments")
          s(o.argumentsError);
        else if (o.path.length === 0)
          r._errors.push(t(o));
        else {
          let c = r, f = 0;
          for (; f < o.path.length; ) {
            const l = o.path[f];
            f === o.path.length - 1 ? (c[l] = c[l] || { _errors: [] }, c[l]._errors.push(t(o))) : c[l] = c[l] || { _errors: [] }, c = c[l], f++;
          }
        }
    };
    return s(this), r;
  }
  static assert(e) {
    if (!(e instanceof D))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, w.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (t) => t.message) {
    const t = {}, r = [];
    for (const s of this.issues)
      s.path.length > 0 ? (t[s.path[0]] = t[s.path[0]] || [], t[s.path[0]].push(e(s))) : r.push(e(s));
    return { formErrors: r, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
D.create = (n) => new D(n);
const he = (n, e) => {
  let t;
  switch (n.code) {
    case d.invalid_type:
      n.received === p.undefined ? t = "Required" : t = `Expected ${n.expected}, received ${n.received}`;
      break;
    case d.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(n.expected, w.jsonStringifyReplacer)}`;
      break;
    case d.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${w.joinValues(n.keys, ", ")}`;
      break;
    case d.invalid_union:
      t = "Invalid input";
      break;
    case d.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${w.joinValues(n.options)}`;
      break;
    case d.invalid_enum_value:
      t = `Invalid enum value. Expected ${w.joinValues(n.options)}, received '${n.received}'`;
      break;
    case d.invalid_arguments:
      t = "Invalid function arguments";
      break;
    case d.invalid_return_type:
      t = "Invalid function return type";
      break;
    case d.invalid_date:
      t = "Invalid date";
      break;
    case d.invalid_string:
      typeof n.validation == "object" ? "includes" in n.validation ? (t = `Invalid input: must include "${n.validation.includes}"`, typeof n.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${n.validation.position}`)) : "startsWith" in n.validation ? t = `Invalid input: must start with "${n.validation.startsWith}"` : "endsWith" in n.validation ? t = `Invalid input: must end with "${n.validation.endsWith}"` : w.assertNever(n.validation) : n.validation !== "regex" ? t = `Invalid ${n.validation}` : t = "Invalid";
      break;
    case d.too_small:
      n.type === "array" ? t = `Array must contain ${n.exact ? "exactly" : n.inclusive ? "at least" : "more than"} ${n.minimum} element(s)` : n.type === "string" ? t = `String must contain ${n.exact ? "exactly" : n.inclusive ? "at least" : "over"} ${n.minimum} character(s)` : n.type === "number" ? t = `Number must be ${n.exact ? "exactly equal to " : n.inclusive ? "greater than or equal to " : "greater than "}${n.minimum}` : n.type === "date" ? t = `Date must be ${n.exact ? "exactly equal to " : n.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(n.minimum))}` : t = "Invalid input";
      break;
    case d.too_big:
      n.type === "array" ? t = `Array must contain ${n.exact ? "exactly" : n.inclusive ? "at most" : "less than"} ${n.maximum} element(s)` : n.type === "string" ? t = `String must contain ${n.exact ? "exactly" : n.inclusive ? "at most" : "under"} ${n.maximum} character(s)` : n.type === "number" ? t = `Number must be ${n.exact ? "exactly" : n.inclusive ? "less than or equal to" : "less than"} ${n.maximum}` : n.type === "bigint" ? t = `BigInt must be ${n.exact ? "exactly" : n.inclusive ? "less than or equal to" : "less than"} ${n.maximum}` : n.type === "date" ? t = `Date must be ${n.exact ? "exactly" : n.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(n.maximum))}` : t = "Invalid input";
      break;
    case d.custom:
      t = "Invalid input";
      break;
    case d.invalid_intersection_types:
      t = "Intersection results could not be merged";
      break;
    case d.not_multiple_of:
      t = `Number must be a multiple of ${n.multipleOf}`;
      break;
    case d.not_finite:
      t = "Number must be finite";
      break;
    default:
      t = e.defaultError, w.assertNever(n);
  }
  return { message: t };
};
let ht = he;
function vn(n) {
  ht = n;
}
function Pe() {
  return ht;
}
const Be = (n) => {
  const { data: e, path: t, errorMaps: r, issueData: s } = n, a = [...t, ...s.path || []], o = {
    ...s,
    path: a
  };
  if (s.message !== void 0)
    return {
      ...s,
      path: a,
      message: s.message
    };
  let c = "";
  const f = r.filter((l) => !!l).slice().reverse();
  for (const l of f)
    c = l(o, { data: e, defaultError: c }).message;
  return {
    ...s,
    path: a,
    message: c
  };
}, bn = [];
function h(n, e) {
  const t = Pe(), r = Be({
    issueData: e,
    data: n.data,
    path: n.path,
    errorMaps: [
      n.common.contextualErrorMap,
      // contextual error map is first priority
      n.schemaErrorMap,
      // then schema-bound map if available
      t,
      // then global override map
      t === he ? void 0 : he
      // then global default map
    ].filter((s) => !!s)
  });
  n.common.issues.push(r);
}
class Z {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, t) {
    const r = [];
    for (const s of t) {
      if (s.status === "aborted")
        return _;
      s.status === "dirty" && e.dirty(), r.push(s.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, t) {
    const r = [];
    for (const s of t) {
      const a = await s.key, o = await s.value;
      r.push({
        key: a,
        value: o
      });
    }
    return Z.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, t) {
    const r = {};
    for (const s of t) {
      const { key: a, value: o } = s;
      if (a.status === "aborted" || o.status === "aborted")
        return _;
      a.status === "dirty" && e.dirty(), o.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof o.value < "u" || s.alwaysSet) && (r[a.value] = o.value);
    }
    return { status: e.value, value: r };
  }
}
const _ = Object.freeze({
  status: "aborted"
}), le = (n) => ({ status: "dirty", value: n }), L = (n) => ({ status: "valid", value: n }), Xe = (n) => n.status === "aborted", Ye = (n) => n.status === "dirty", ae = (n) => n.status === "valid", be = (n) => typeof Promise < "u" && n instanceof Promise;
function $e(n, e, t, r) {
  if (typeof e == "function" ? n !== e || !0 : !e.has(n)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e.get(n);
}
function pt(n, e, t, r, s) {
  if (typeof e == "function" ? n !== e || !0 : !e.has(n)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return e.set(n, t), t;
}
var m;
(function(n) {
  n.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, n.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(m || (m = {}));
var ye, _e;
class F {
  constructor(e, t, r, s) {
    this._cachedPath = [], this.parent = e, this.data = t, this._path = r, this._key = s;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const ot = (n, e) => {
  if (ae(e))
    return { success: !0, data: e.value };
  if (!n.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const t = new D(n.common.issues);
      return this._error = t, this._error;
    }
  };
};
function x(n) {
  if (!n)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: r, description: s } = n;
  if (e && (t || r))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: s } : { errorMap: (o, c) => {
    var f, l;
    const { message: g } = n;
    return o.code === "invalid_enum_value" ? { message: g ?? c.defaultError } : typeof c.data > "u" ? { message: (f = g ?? r) !== null && f !== void 0 ? f : c.defaultError } : o.code !== "invalid_type" ? { message: c.defaultError } : { message: (l = g ?? t) !== null && l !== void 0 ? l : c.defaultError };
  }, description: s };
}
class k {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return X(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: X(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new Z(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: X(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (be(t))
      throw new Error("Synchronous parse encountered promise.");
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const r = this.safeParse(e, t);
    if (r.success)
      return r.data;
    throw r.error;
  }
  safeParse(e, t) {
    var r;
    const s = {
      common: {
        issues: [],
        async: (r = t == null ? void 0 : t.async) !== null && r !== void 0 ? r : !1,
        contextualErrorMap: t == null ? void 0 : t.errorMap
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: X(e)
    }, a = this._parseSync({ data: e, path: s.path, parent: s });
    return ot(s, a);
  }
  "~validate"(e) {
    var t, r;
    const s = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: X(e)
    };
    if (!this["~standard"].async)
      try {
        const a = this._parseSync({ data: e, path: [], parent: s });
        return ae(a) ? {
          value: a.value
        } : {
          issues: s.common.issues
        };
      } catch (a) {
        !((r = (t = a == null ? void 0 : a.message) === null || t === void 0 ? void 0 : t.toLowerCase()) === null || r === void 0) && r.includes("encountered") && (this["~standard"].async = !0), s.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: s }).then((a) => ae(a) ? {
      value: a.value
    } : {
      issues: s.common.issues
    });
  }
  async parseAsync(e, t) {
    const r = await this.safeParseAsync(e, t);
    if (r.success)
      return r.data;
    throw r.error;
  }
  async safeParseAsync(e, t) {
    const r = {
      common: {
        issues: [],
        contextualErrorMap: t == null ? void 0 : t.errorMap,
        async: !0
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: X(e)
    }, s = this._parse({ data: e, path: r.path, parent: r }), a = await (be(s) ? s : Promise.resolve(s));
    return ot(r, a);
  }
  refine(e, t) {
    const r = (s) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(s) : t;
    return this._refinement((s, a) => {
      const o = e(s), c = () => a.addIssue({
        code: d.custom,
        ...r(s)
      });
      return typeof Promise < "u" && o instanceof Promise ? o.then((f) => f ? !0 : (c(), !1)) : o ? !0 : (c(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((r, s) => e(r) ? !0 : (s.addIssue(typeof t == "function" ? t(r, s) : t), !1));
  }
  _refinement(e) {
    return new z({
      schema: this,
      typeName: y.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (t) => this["~validate"](t)
    };
  }
  optional() {
    return H.create(this, this._def);
  }
  nullable() {
    return ee.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return $.create(this);
  }
  promise() {
    return me.create(this, this._def);
  }
  or(e) {
    return Se.create([this, e], this._def);
  }
  and(e) {
    return Te.create(this, e, this._def);
  }
  transform(e) {
    return new z({
      ...x(this._def),
      schema: this,
      typeName: y.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new Ie({
      ...x(this._def),
      innerType: this,
      defaultValue: t,
      typeName: y.ZodDefault
    });
  }
  brand() {
    return new tt({
      typeName: y.ZodBranded,
      type: this,
      ...x(this._def)
    });
  }
  catch(e) {
    const t = typeof e == "function" ? e : () => e;
    return new Ze({
      ...x(this._def),
      innerType: this,
      catchValue: t,
      typeName: y.ZodCatch
    });
  }
  describe(e) {
    const t = this.constructor;
    return new t({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return Re.create(this, e);
  }
  readonly() {
    return Ee.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const xn = /^c[^\s-]{8,}$/i, kn = /^[0-9a-z]+$/, wn = /^[0-9A-HJKMNP-TV-Z]{26}$/i, Sn = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, Tn = /^[a-z0-9_-]{21}$/i, An = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Cn = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, jn = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, On = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let qe;
const In = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Zn = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, En = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Ln = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Rn = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Nn = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, mt = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Dn = new RegExp(`^${mt}$`);
function gt(n) {
  let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return n.precision ? e = `${e}\\.\\d{${n.precision}}` : n.precision == null && (e = `${e}(\\.\\d+)?`), e;
}
function Mn(n) {
  return new RegExp(`^${gt(n)}$`);
}
function yt(n) {
  let e = `${mt}T${gt(n)}`;
  const t = [];
  return t.push(n.local ? "Z?" : "Z"), n.offset && t.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${t.join("|")})`, new RegExp(`^${e}$`);
}
function Pn(n, e) {
  return !!((e === "v4" || !e) && In.test(n) || (e === "v6" || !e) && En.test(n));
}
function Bn(n, e) {
  if (!An.test(n))
    return !1;
  try {
    const [t] = n.split("."), r = t.replace(/-/g, "+").replace(/_/g, "/").padEnd(t.length + (4 - t.length % 4) % 4, "="), s = JSON.parse(atob(r));
    return !(typeof s != "object" || s === null || !s.typ || !s.alg || e && s.alg !== e);
  } catch {
    return !1;
  }
}
function $n(n, e) {
  return !!((e === "v4" || !e) && Zn.test(n) || (e === "v6" || !e) && Ln.test(n));
}
class B extends k {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== p.string) {
      const a = this._getOrReturnCtx(e);
      return h(a, {
        code: d.invalid_type,
        expected: p.string,
        received: a.parsedType
      }), _;
    }
    const r = new Z();
    let s;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (s = this._getOrReturnCtx(e, s), h(s, {
          code: d.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), r.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (s = this._getOrReturnCtx(e, s), h(s, {
          code: d.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), r.dirty());
      else if (a.kind === "length") {
        const o = e.data.length > a.value, c = e.data.length < a.value;
        (o || c) && (s = this._getOrReturnCtx(e, s), o ? h(s, {
          code: d.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : c && h(s, {
          code: d.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), r.dirty());
      } else if (a.kind === "email")
        jn.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "email",
          code: d.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "emoji")
        qe || (qe = new RegExp(On, "u")), qe.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "emoji",
          code: d.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "uuid")
        Sn.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "uuid",
          code: d.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "nanoid")
        Tn.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "nanoid",
          code: d.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "cuid")
        xn.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "cuid",
          code: d.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "cuid2")
        kn.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "cuid2",
          code: d.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "ulid")
        wn.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "ulid",
          code: d.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), h(s, {
            validation: "url",
            code: d.invalid_string,
            message: a.message
          }), r.dirty();
        }
      else a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "regex",
        code: d.invalid_string,
        message: a.message
      }), r.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: d.invalid_string,
        validation: { includes: a.value, position: a.position },
        message: a.message
      }), r.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: d.invalid_string,
        validation: { startsWith: a.value },
        message: a.message
      }), r.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: d.invalid_string,
        validation: { endsWith: a.value },
        message: a.message
      }), r.dirty()) : a.kind === "datetime" ? yt(a).test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: d.invalid_string,
        validation: "datetime",
        message: a.message
      }), r.dirty()) : a.kind === "date" ? Dn.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: d.invalid_string,
        validation: "date",
        message: a.message
      }), r.dirty()) : a.kind === "time" ? Mn(a).test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: d.invalid_string,
        validation: "time",
        message: a.message
      }), r.dirty()) : a.kind === "duration" ? Cn.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "duration",
        code: d.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "ip" ? Pn(e.data, a.version) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "ip",
        code: d.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "jwt" ? Bn(e.data, a.alg) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "jwt",
        code: d.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "cidr" ? $n(e.data, a.version) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "cidr",
        code: d.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "base64" ? Rn.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "base64",
        code: d.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "base64url" ? Nn.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "base64url",
        code: d.invalid_string,
        message: a.message
      }), r.dirty()) : w.assertNever(a);
    return { status: r.value, value: e.data };
  }
  _regex(e, t, r) {
    return this.refinement((s) => e.test(s), {
      validation: t,
      code: d.invalid_string,
      ...m.errToObj(r)
    });
  }
  _addCheck(e) {
    return new B({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...m.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...m.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...m.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...m.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...m.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...m.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...m.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...m.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...m.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...m.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...m.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...m.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...m.errToObj(e) });
  }
  datetime(e) {
    var t, r;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (t = e == null ? void 0 : e.offset) !== null && t !== void 0 ? t : !1,
      local: (r = e == null ? void 0 : e.local) !== null && r !== void 0 ? r : !1,
      ...m.errToObj(e == null ? void 0 : e.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      ...m.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...m.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...m.errToObj(t)
    });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t == null ? void 0 : t.position,
      ...m.errToObj(t == null ? void 0 : t.message)
    });
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...m.errToObj(t)
    });
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...m.errToObj(t)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...m.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...m.errToObj(t)
    });
  }
  length(e, t) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...m.errToObj(t)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, m.errToObj(e));
  }
  trim() {
    return new B({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new B({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new B({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === "base64url");
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
B.create = (n) => {
  var e;
  return new B({
    checks: [],
    typeName: y.ZodString,
    coerce: (e = n == null ? void 0 : n.coerce) !== null && e !== void 0 ? e : !1,
    ...x(n)
  });
};
function zn(n, e) {
  const t = (n.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, s = t > r ? t : r, a = parseInt(n.toFixed(s).replace(".", "")), o = parseInt(e.toFixed(s).replace(".", ""));
  return a % o / Math.pow(10, s);
}
class G extends k {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== p.number) {
      const a = this._getOrReturnCtx(e);
      return h(a, {
        code: d.invalid_type,
        expected: p.number,
        received: a.parsedType
      }), _;
    }
    let r;
    const s = new Z();
    for (const a of this._def.checks)
      a.kind === "int" ? w.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), h(r, {
        code: d.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), s.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (r = this._getOrReturnCtx(e, r), h(r, {
        code: d.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (r = this._getOrReturnCtx(e, r), h(r, {
        code: d.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? zn(e.data, a.value) !== 0 && (r = this._getOrReturnCtx(e, r), h(r, {
        code: d.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), h(r, {
        code: d.not_finite,
        message: a.message
      }), s.dirty()) : w.assertNever(a);
    return { status: s.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, m.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, m.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, m.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, m.toString(t));
  }
  setLimit(e, t, r, s) {
    return new G({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: r,
          message: m.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new G({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: m.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: m.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: m.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: m.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: m.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: m.toString(t)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: m.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: m.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: m.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && w.isInteger(e.value));
  }
  get isFinite() {
    let e = null, t = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
        return !0;
      r.kind === "min" ? (t === null || r.value > t) && (t = r.value) : r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
}
G.create = (n) => new G({
  checks: [],
  typeName: y.ZodNumber,
  coerce: (n == null ? void 0 : n.coerce) || !1,
  ...x(n)
});
class K extends k {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== p.bigint)
      return this._getInvalidInput(e);
    let r;
    const s = new Z();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (r = this._getOrReturnCtx(e, r), h(r, {
        code: d.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (r = this._getOrReturnCtx(e, r), h(r, {
        code: d.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), h(r, {
        code: d.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : w.assertNever(a);
    return { status: s.value, value: e.data };
  }
  _getInvalidInput(e) {
    const t = this._getOrReturnCtx(e);
    return h(t, {
      code: d.invalid_type,
      expected: p.bigint,
      received: t.parsedType
    }), _;
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, m.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, m.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, m.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, m.toString(t));
  }
  setLimit(e, t, r, s) {
    return new K({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: r,
          message: m.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new K({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: m.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: m.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: m.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: m.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: m.toString(t)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
K.create = (n) => {
  var e;
  return new K({
    checks: [],
    typeName: y.ZodBigInt,
    coerce: (e = n == null ? void 0 : n.coerce) !== null && e !== void 0 ? e : !1,
    ...x(n)
  });
};
class xe extends k {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== p.boolean) {
      const r = this._getOrReturnCtx(e);
      return h(r, {
        code: d.invalid_type,
        expected: p.boolean,
        received: r.parsedType
      }), _;
    }
    return L(e.data);
  }
}
xe.create = (n) => new xe({
  typeName: y.ZodBoolean,
  coerce: (n == null ? void 0 : n.coerce) || !1,
  ...x(n)
});
class ie extends k {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== p.date) {
      const a = this._getOrReturnCtx(e);
      return h(a, {
        code: d.invalid_type,
        expected: p.date,
        received: a.parsedType
      }), _;
    }
    if (isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return h(a, {
        code: d.invalid_date
      }), _;
    }
    const r = new Z();
    let s;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (s = this._getOrReturnCtx(e, s), h(s, {
        code: d.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), r.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (s = this._getOrReturnCtx(e, s), h(s, {
        code: d.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), r.dirty()) : w.assertNever(a);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new ie({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: m.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: m.toString(t)
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
}
ie.create = (n) => new ie({
  checks: [],
  coerce: (n == null ? void 0 : n.coerce) || !1,
  typeName: y.ZodDate,
  ...x(n)
});
class ze extends k {
  _parse(e) {
    if (this._getType(e) !== p.symbol) {
      const r = this._getOrReturnCtx(e);
      return h(r, {
        code: d.invalid_type,
        expected: p.symbol,
        received: r.parsedType
      }), _;
    }
    return L(e.data);
  }
}
ze.create = (n) => new ze({
  typeName: y.ZodSymbol,
  ...x(n)
});
class ke extends k {
  _parse(e) {
    if (this._getType(e) !== p.undefined) {
      const r = this._getOrReturnCtx(e);
      return h(r, {
        code: d.invalid_type,
        expected: p.undefined,
        received: r.parsedType
      }), _;
    }
    return L(e.data);
  }
}
ke.create = (n) => new ke({
  typeName: y.ZodUndefined,
  ...x(n)
});
class we extends k {
  _parse(e) {
    if (this._getType(e) !== p.null) {
      const r = this._getOrReturnCtx(e);
      return h(r, {
        code: d.invalid_type,
        expected: p.null,
        received: r.parsedType
      }), _;
    }
    return L(e.data);
  }
}
we.create = (n) => new we({
  typeName: y.ZodNull,
  ...x(n)
});
class pe extends k {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return L(e.data);
  }
}
pe.create = (n) => new pe({
  typeName: y.ZodAny,
  ...x(n)
});
class se extends k {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return L(e.data);
  }
}
se.create = (n) => new se({
  typeName: y.ZodUnknown,
  ...x(n)
});
class Y extends k {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return h(t, {
      code: d.invalid_type,
      expected: p.never,
      received: t.parsedType
    }), _;
  }
}
Y.create = (n) => new Y({
  typeName: y.ZodNever,
  ...x(n)
});
class Ve extends k {
  _parse(e) {
    if (this._getType(e) !== p.undefined) {
      const r = this._getOrReturnCtx(e);
      return h(r, {
        code: d.invalid_type,
        expected: p.void,
        received: r.parsedType
      }), _;
    }
    return L(e.data);
  }
}
Ve.create = (n) => new Ve({
  typeName: y.ZodVoid,
  ...x(n)
});
class $ extends k {
  _parse(e) {
    const { ctx: t, status: r } = this._processInputParams(e), s = this._def;
    if (t.parsedType !== p.array)
      return h(t, {
        code: d.invalid_type,
        expected: p.array,
        received: t.parsedType
      }), _;
    if (s.exactLength !== null) {
      const o = t.data.length > s.exactLength.value, c = t.data.length < s.exactLength.value;
      (o || c) && (h(t, {
        code: o ? d.too_big : d.too_small,
        minimum: c ? s.exactLength.value : void 0,
        maximum: o ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), r.dirty());
    }
    if (s.minLength !== null && t.data.length < s.minLength.value && (h(t, {
      code: d.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), r.dirty()), s.maxLength !== null && t.data.length > s.maxLength.value && (h(t, {
      code: d.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), r.dirty()), t.common.async)
      return Promise.all([...t.data].map((o, c) => s.type._parseAsync(new F(t, o, t.path, c)))).then((o) => Z.mergeArray(r, o));
    const a = [...t.data].map((o, c) => s.type._parseSync(new F(t, o, t.path, c)));
    return Z.mergeArray(r, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new $({
      ...this._def,
      minLength: { value: e, message: m.toString(t) }
    });
  }
  max(e, t) {
    return new $({
      ...this._def,
      maxLength: { value: e, message: m.toString(t) }
    });
  }
  length(e, t) {
    return new $({
      ...this._def,
      exactLength: { value: e, message: m.toString(t) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
$.create = (n, e) => new $({
  type: n,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: y.ZodArray,
  ...x(e)
});
function ue(n) {
  if (n instanceof A) {
    const e = {};
    for (const t in n.shape) {
      const r = n.shape[t];
      e[t] = H.create(ue(r));
    }
    return new A({
      ...n._def,
      shape: () => e
    });
  } else return n instanceof $ ? new $({
    ...n._def,
    type: ue(n.element)
  }) : n instanceof H ? H.create(ue(n.unwrap())) : n instanceof ee ? ee.create(ue(n.unwrap())) : n instanceof W ? W.create(n.items.map((e) => ue(e))) : n;
}
class A extends k {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), t = w.objectKeys(e);
    return this._cached = { shape: e, keys: t };
  }
  _parse(e) {
    if (this._getType(e) !== p.object) {
      const l = this._getOrReturnCtx(e);
      return h(l, {
        code: d.invalid_type,
        expected: p.object,
        received: l.parsedType
      }), _;
    }
    const { status: r, ctx: s } = this._processInputParams(e), { shape: a, keys: o } = this._getCached(), c = [];
    if (!(this._def.catchall instanceof Y && this._def.unknownKeys === "strip"))
      for (const l in s.data)
        o.includes(l) || c.push(l);
    const f = [];
    for (const l of o) {
      const g = a[l], I = s.data[l];
      f.push({
        key: { status: "valid", value: l },
        value: g._parse(new F(s, I, s.path, l)),
        alwaysSet: l in s.data
      });
    }
    if (this._def.catchall instanceof Y) {
      const l = this._def.unknownKeys;
      if (l === "passthrough")
        for (const g of c)
          f.push({
            key: { status: "valid", value: g },
            value: { status: "valid", value: s.data[g] }
          });
      else if (l === "strict")
        c.length > 0 && (h(s, {
          code: d.unrecognized_keys,
          keys: c
        }), r.dirty());
      else if (l !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const l = this._def.catchall;
      for (const g of c) {
        const I = s.data[g];
        f.push({
          key: { status: "valid", value: g },
          value: l._parse(
            new F(s, I, s.path, g)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: g in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const l = [];
      for (const g of f) {
        const I = await g.key, ce = await g.value;
        l.push({
          key: I,
          value: ce,
          alwaysSet: g.alwaysSet
        });
      }
      return l;
    }).then((l) => Z.mergeObjectSync(r, l)) : Z.mergeObjectSync(r, f);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return m.errToObj, new A({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, r) => {
          var s, a, o, c;
          const f = (o = (a = (s = this._def).errorMap) === null || a === void 0 ? void 0 : a.call(s, t, r).message) !== null && o !== void 0 ? o : r.defaultError;
          return t.code === "unrecognized_keys" ? {
            message: (c = m.errToObj(e).message) !== null && c !== void 0 ? c : f
          } : {
            message: f
          };
        }
      } : {}
    });
  }
  strip() {
    return new A({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new A({
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
  extend(e) {
    return new A({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new A({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: y.ZodObject
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
  setKey(e, t) {
    return this.augment({ [e]: t });
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
  catchall(e) {
    return new A({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const t = {};
    return w.objectKeys(e).forEach((r) => {
      e[r] && this.shape[r] && (t[r] = this.shape[r]);
    }), new A({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    return w.objectKeys(this.shape).forEach((r) => {
      e[r] || (t[r] = this.shape[r]);
    }), new A({
      ...this._def,
      shape: () => t
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return ue(this);
  }
  partial(e) {
    const t = {};
    return w.objectKeys(this.shape).forEach((r) => {
      const s = this.shape[r];
      e && !e[r] ? t[r] = s : t[r] = s.optional();
    }), new A({
      ...this._def,
      shape: () => t
    });
  }
  required(e) {
    const t = {};
    return w.objectKeys(this.shape).forEach((r) => {
      if (e && !e[r])
        t[r] = this.shape[r];
      else {
        let a = this.shape[r];
        for (; a instanceof H; )
          a = a._def.innerType;
        t[r] = a;
      }
    }), new A({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return _t(w.objectKeys(this.shape));
  }
}
A.create = (n, e) => new A({
  shape: () => n,
  unknownKeys: "strip",
  catchall: Y.create(),
  typeName: y.ZodObject,
  ...x(e)
});
A.strictCreate = (n, e) => new A({
  shape: () => n,
  unknownKeys: "strict",
  catchall: Y.create(),
  typeName: y.ZodObject,
  ...x(e)
});
A.lazycreate = (n, e) => new A({
  shape: n,
  unknownKeys: "strip",
  catchall: Y.create(),
  typeName: y.ZodObject,
  ...x(e)
});
class Se extends k {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = this._def.options;
    function s(a) {
      for (const c of a)
        if (c.result.status === "valid")
          return c.result;
      for (const c of a)
        if (c.result.status === "dirty")
          return t.common.issues.push(...c.ctx.common.issues), c.result;
      const o = a.map((c) => new D(c.ctx.common.issues));
      return h(t, {
        code: d.invalid_union,
        unionErrors: o
      }), _;
    }
    if (t.common.async)
      return Promise.all(r.map(async (a) => {
        const o = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: t.data,
            path: t.path,
            parent: o
          }),
          ctx: o
        };
      })).then(s);
    {
      let a;
      const o = [];
      for (const f of r) {
        const l = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, g = f._parseSync({
          data: t.data,
          path: t.path,
          parent: l
        });
        if (g.status === "valid")
          return g;
        g.status === "dirty" && !a && (a = { result: g, ctx: l }), l.common.issues.length && o.push(l.common.issues);
      }
      if (a)
        return t.common.issues.push(...a.ctx.common.issues), a.result;
      const c = o.map((f) => new D(f));
      return h(t, {
        code: d.invalid_union,
        unionErrors: c
      }), _;
    }
  }
  get options() {
    return this._def.options;
  }
}
Se.create = (n, e) => new Se({
  options: n,
  typeName: y.ZodUnion,
  ...x(e)
});
const q = (n) => n instanceof Ce ? q(n.schema) : n instanceof z ? q(n.innerType()) : n instanceof je ? [n.value] : n instanceof Q ? n.options : n instanceof Oe ? w.objectValues(n.enum) : n instanceof Ie ? q(n._def.innerType) : n instanceof ke ? [void 0] : n instanceof we ? [null] : n instanceof H ? [void 0, ...q(n.unwrap())] : n instanceof ee ? [null, ...q(n.unwrap())] : n instanceof tt || n instanceof Ee ? q(n.unwrap()) : n instanceof Ze ? q(n._def.innerType) : [];
class Fe extends k {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== p.object)
      return h(t, {
        code: d.invalid_type,
        expected: p.object,
        received: t.parsedType
      }), _;
    const r = this.discriminator, s = t.data[r], a = this.optionsMap.get(s);
    return a ? t.common.async ? a._parseAsync({
      data: t.data,
      path: t.path,
      parent: t
    }) : a._parseSync({
      data: t.data,
      path: t.path,
      parent: t
    }) : (h(t, {
      code: d.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [r]
    }), _);
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
  static create(e, t, r) {
    const s = /* @__PURE__ */ new Map();
    for (const a of t) {
      const o = q(a.shape[e]);
      if (!o.length)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const c of o) {
        if (s.has(c))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(c)}`);
        s.set(c, a);
      }
    }
    return new Fe({
      typeName: y.ZodDiscriminatedUnion,
      discriminator: e,
      options: t,
      optionsMap: s,
      ...x(r)
    });
  }
}
function Ge(n, e) {
  const t = X(n), r = X(e);
  if (n === e)
    return { valid: !0, data: n };
  if (t === p.object && r === p.object) {
    const s = w.objectKeys(e), a = w.objectKeys(n).filter((c) => s.indexOf(c) !== -1), o = { ...n, ...e };
    for (const c of a) {
      const f = Ge(n[c], e[c]);
      if (!f.valid)
        return { valid: !1 };
      o[c] = f.data;
    }
    return { valid: !0, data: o };
  } else if (t === p.array && r === p.array) {
    if (n.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let a = 0; a < n.length; a++) {
      const o = n[a], c = e[a], f = Ge(o, c);
      if (!f.valid)
        return { valid: !1 };
      s.push(f.data);
    }
    return { valid: !0, data: s };
  } else return t === p.date && r === p.date && +n == +e ? { valid: !0, data: n } : { valid: !1 };
}
class Te extends k {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e), s = (a, o) => {
      if (Xe(a) || Xe(o))
        return _;
      const c = Ge(a.value, o.value);
      return c.valid ? ((Ye(a) || Ye(o)) && t.dirty(), { status: t.value, value: c.data }) : (h(r, {
        code: d.invalid_intersection_types
      }), _);
    };
    return r.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      }),
      this._def.right._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      })
    ]).then(([a, o]) => s(a, o)) : s(this._def.left._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }), this._def.right._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }));
  }
}
Te.create = (n, e, t) => new Te({
  left: n,
  right: e,
  typeName: y.ZodIntersection,
  ...x(t)
});
class W extends k {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== p.array)
      return h(r, {
        code: d.invalid_type,
        expected: p.array,
        received: r.parsedType
      }), _;
    if (r.data.length < this._def.items.length)
      return h(r, {
        code: d.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), _;
    !this._def.rest && r.data.length > this._def.items.length && (h(r, {
      code: d.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), t.dirty());
    const a = [...r.data].map((o, c) => {
      const f = this._def.items[c] || this._def.rest;
      return f ? f._parse(new F(r, o, r.path, c)) : null;
    }).filter((o) => !!o);
    return r.common.async ? Promise.all(a).then((o) => Z.mergeArray(t, o)) : Z.mergeArray(t, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new W({
      ...this._def,
      rest: e
    });
  }
}
W.create = (n, e) => {
  if (!Array.isArray(n))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new W({
    items: n,
    typeName: y.ZodTuple,
    rest: null,
    ...x(e)
  });
};
class Ae extends k {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== p.object)
      return h(r, {
        code: d.invalid_type,
        expected: p.object,
        received: r.parsedType
      }), _;
    const s = [], a = this._def.keyType, o = this._def.valueType;
    for (const c in r.data)
      s.push({
        key: a._parse(new F(r, c, r.path, c)),
        value: o._parse(new F(r, r.data[c], r.path, c)),
        alwaysSet: c in r.data
      });
    return r.common.async ? Z.mergeObjectAsync(t, s) : Z.mergeObjectSync(t, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, t, r) {
    return t instanceof k ? new Ae({
      keyType: e,
      valueType: t,
      typeName: y.ZodRecord,
      ...x(r)
    }) : new Ae({
      keyType: B.create(),
      valueType: e,
      typeName: y.ZodRecord,
      ...x(t)
    });
  }
}
class Ue extends k {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== p.map)
      return h(r, {
        code: d.invalid_type,
        expected: p.map,
        received: r.parsedType
      }), _;
    const s = this._def.keyType, a = this._def.valueType, o = [...r.data.entries()].map(([c, f], l) => ({
      key: s._parse(new F(r, c, r.path, [l, "key"])),
      value: a._parse(new F(r, f, r.path, [l, "value"]))
    }));
    if (r.common.async) {
      const c = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const f of o) {
          const l = await f.key, g = await f.value;
          if (l.status === "aborted" || g.status === "aborted")
            return _;
          (l.status === "dirty" || g.status === "dirty") && t.dirty(), c.set(l.value, g.value);
        }
        return { status: t.value, value: c };
      });
    } else {
      const c = /* @__PURE__ */ new Map();
      for (const f of o) {
        const l = f.key, g = f.value;
        if (l.status === "aborted" || g.status === "aborted")
          return _;
        (l.status === "dirty" || g.status === "dirty") && t.dirty(), c.set(l.value, g.value);
      }
      return { status: t.value, value: c };
    }
  }
}
Ue.create = (n, e, t) => new Ue({
  valueType: e,
  keyType: n,
  typeName: y.ZodMap,
  ...x(t)
});
class oe extends k {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== p.set)
      return h(r, {
        code: d.invalid_type,
        expected: p.set,
        received: r.parsedType
      }), _;
    const s = this._def;
    s.minSize !== null && r.data.size < s.minSize.value && (h(r, {
      code: d.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), t.dirty()), s.maxSize !== null && r.data.size > s.maxSize.value && (h(r, {
      code: d.too_big,
      maximum: s.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.maxSize.message
    }), t.dirty());
    const a = this._def.valueType;
    function o(f) {
      const l = /* @__PURE__ */ new Set();
      for (const g of f) {
        if (g.status === "aborted")
          return _;
        g.status === "dirty" && t.dirty(), l.add(g.value);
      }
      return { status: t.value, value: l };
    }
    const c = [...r.data.values()].map((f, l) => a._parse(new F(r, f, r.path, l)));
    return r.common.async ? Promise.all(c).then((f) => o(f)) : o(c);
  }
  min(e, t) {
    return new oe({
      ...this._def,
      minSize: { value: e, message: m.toString(t) }
    });
  }
  max(e, t) {
    return new oe({
      ...this._def,
      maxSize: { value: e, message: m.toString(t) }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
oe.create = (n, e) => new oe({
  valueType: n,
  minSize: null,
  maxSize: null,
  typeName: y.ZodSet,
  ...x(e)
});
class fe extends k {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== p.function)
      return h(t, {
        code: d.invalid_type,
        expected: p.function,
        received: t.parsedType
      }), _;
    function r(c, f) {
      return Be({
        data: c,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          Pe(),
          he
        ].filter((l) => !!l),
        issueData: {
          code: d.invalid_arguments,
          argumentsError: f
        }
      });
    }
    function s(c, f) {
      return Be({
        data: c,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          Pe(),
          he
        ].filter((l) => !!l),
        issueData: {
          code: d.invalid_return_type,
          returnTypeError: f
        }
      });
    }
    const a = { errorMap: t.common.contextualErrorMap }, o = t.data;
    if (this._def.returns instanceof me) {
      const c = this;
      return L(async function(...f) {
        const l = new D([]), g = await c._def.args.parseAsync(f, a).catch((j) => {
          throw l.addIssue(r(f, j)), l;
        }), I = await Reflect.apply(o, this, g);
        return await c._def.returns._def.type.parseAsync(I, a).catch((j) => {
          throw l.addIssue(s(I, j)), l;
        });
      });
    } else {
      const c = this;
      return L(function(...f) {
        const l = c._def.args.safeParse(f, a);
        if (!l.success)
          throw new D([r(f, l.error)]);
        const g = Reflect.apply(o, this, l.data), I = c._def.returns.safeParse(g, a);
        if (!I.success)
          throw new D([s(g, I.error)]);
        return I.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new fe({
      ...this._def,
      args: W.create(e).rest(se.create())
    });
  }
  returns(e) {
    return new fe({
      ...this._def,
      returns: e
    });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, t, r) {
    return new fe({
      args: e || W.create([]).rest(se.create()),
      returns: t || se.create(),
      typeName: y.ZodFunction,
      ...x(r)
    });
  }
}
class Ce extends k {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
Ce.create = (n, e) => new Ce({
  getter: n,
  typeName: y.ZodLazy,
  ...x(e)
});
class je extends k {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return h(t, {
        received: t.data,
        code: d.invalid_literal,
        expected: this._def.value
      }), _;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
je.create = (n, e) => new je({
  value: n,
  typeName: y.ZodLiteral,
  ...x(e)
});
function _t(n, e) {
  return new Q({
    values: n,
    typeName: y.ZodEnum,
    ...x(e)
  });
}
class Q extends k {
  constructor() {
    super(...arguments), ye.set(this, void 0);
  }
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), r = this._def.values;
      return h(t, {
        expected: w.joinValues(r),
        received: t.parsedType,
        code: d.invalid_type
      }), _;
    }
    if ($e(this, ye) || pt(this, ye, new Set(this._def.values)), !$e(this, ye).has(e.data)) {
      const t = this._getOrReturnCtx(e), r = this._def.values;
      return h(t, {
        received: t.data,
        code: d.invalid_enum_value,
        options: r
      }), _;
    }
    return L(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  extract(e, t = this._def) {
    return Q.create(e, {
      ...this._def,
      ...t
    });
  }
  exclude(e, t = this._def) {
    return Q.create(this.options.filter((r) => !e.includes(r)), {
      ...this._def,
      ...t
    });
  }
}
ye = /* @__PURE__ */ new WeakMap();
Q.create = _t;
class Oe extends k {
  constructor() {
    super(...arguments), _e.set(this, void 0);
  }
  _parse(e) {
    const t = w.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== p.string && r.parsedType !== p.number) {
      const s = w.objectValues(t);
      return h(r, {
        expected: w.joinValues(s),
        received: r.parsedType,
        code: d.invalid_type
      }), _;
    }
    if ($e(this, _e) || pt(this, _e, new Set(w.getValidEnumValues(this._def.values))), !$e(this, _e).has(e.data)) {
      const s = w.objectValues(t);
      return h(r, {
        received: r.data,
        code: d.invalid_enum_value,
        options: s
      }), _;
    }
    return L(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
_e = /* @__PURE__ */ new WeakMap();
Oe.create = (n, e) => new Oe({
  values: n,
  typeName: y.ZodNativeEnum,
  ...x(e)
});
class me extends k {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== p.promise && t.common.async === !1)
      return h(t, {
        code: d.invalid_type,
        expected: p.promise,
        received: t.parsedType
      }), _;
    const r = t.parsedType === p.promise ? t.data : Promise.resolve(t.data);
    return L(r.then((s) => this._def.type.parseAsync(s, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
}
me.create = (n, e) => new me({
  type: n,
  typeName: y.ZodPromise,
  ...x(e)
});
class z extends k {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === y.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e), s = this._def.effect || null, a = {
      addIssue: (o) => {
        h(r, o), o.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), s.type === "preprocess") {
      const o = s.transform(r.data, a);
      if (r.common.async)
        return Promise.resolve(o).then(async (c) => {
          if (t.value === "aborted")
            return _;
          const f = await this._def.schema._parseAsync({
            data: c,
            path: r.path,
            parent: r
          });
          return f.status === "aborted" ? _ : f.status === "dirty" || t.value === "dirty" ? le(f.value) : f;
        });
      {
        if (t.value === "aborted")
          return _;
        const c = this._def.schema._parseSync({
          data: o,
          path: r.path,
          parent: r
        });
        return c.status === "aborted" ? _ : c.status === "dirty" || t.value === "dirty" ? le(c.value) : c;
      }
    }
    if (s.type === "refinement") {
      const o = (c) => {
        const f = s.refinement(c, a);
        if (r.common.async)
          return Promise.resolve(f);
        if (f instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return c;
      };
      if (r.common.async === !1) {
        const c = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return c.status === "aborted" ? _ : (c.status === "dirty" && t.dirty(), o(c.value), { status: t.value, value: c.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((c) => c.status === "aborted" ? _ : (c.status === "dirty" && t.dirty(), o(c.value).then(() => ({ status: t.value, value: c.value }))));
    }
    if (s.type === "transform")
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!ae(o))
          return o;
        const c = s.transform(o.value, a);
        if (c instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: c };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => ae(o) ? Promise.resolve(s.transform(o.value, a)).then((c) => ({ status: t.value, value: c })) : o);
    w.assertNever(s);
  }
}
z.create = (n, e, t) => new z({
  schema: n,
  typeName: y.ZodEffects,
  effect: e,
  ...x(t)
});
z.createWithPreprocess = (n, e, t) => new z({
  schema: e,
  effect: { type: "preprocess", transform: n },
  typeName: y.ZodEffects,
  ...x(t)
});
class H extends k {
  _parse(e) {
    return this._getType(e) === p.undefined ? L(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
H.create = (n, e) => new H({
  innerType: n,
  typeName: y.ZodOptional,
  ...x(e)
});
class ee extends k {
  _parse(e) {
    return this._getType(e) === p.null ? L(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ee.create = (n, e) => new ee({
  innerType: n,
  typeName: y.ZodNullable,
  ...x(e)
});
class Ie extends k {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let r = t.data;
    return t.parsedType === p.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
      data: r,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Ie.create = (n, e) => new Ie({
  innerType: n,
  typeName: y.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...x(e)
});
class Ze extends k {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = {
      ...t,
      common: {
        ...t.common,
        issues: []
      }
    }, s = this._def.innerType._parse({
      data: r.data,
      path: r.path,
      parent: {
        ...r
      }
    });
    return be(s) ? s.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new D(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new D(r.common.issues);
        },
        input: r.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Ze.create = (n, e) => new Ze({
  innerType: n,
  typeName: y.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...x(e)
});
class He extends k {
  _parse(e) {
    if (this._getType(e) !== p.nan) {
      const r = this._getOrReturnCtx(e);
      return h(r, {
        code: d.invalid_type,
        expected: p.nan,
        received: r.parsedType
      }), _;
    }
    return { status: "valid", value: e.data };
  }
}
He.create = (n) => new He({
  typeName: y.ZodNaN,
  ...x(n)
});
const Vn = Symbol("zod_brand");
class tt extends k {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = t.data;
    return this._def.type._parse({
      data: r,
      path: t.path,
      parent: t
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class Re extends k {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? _ : a.status === "dirty" ? (t.dirty(), le(a.value)) : this._def.out._parseAsync({
          data: a.value,
          path: r.path,
          parent: r
        });
      })();
    {
      const s = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      });
      return s.status === "aborted" ? _ : s.status === "dirty" ? (t.dirty(), {
        status: "dirty",
        value: s.value
      }) : this._def.out._parseSync({
        data: s.value,
        path: r.path,
        parent: r
      });
    }
  }
  static create(e, t) {
    return new Re({
      in: e,
      out: t,
      typeName: y.ZodPipeline
    });
  }
}
class Ee extends k {
  _parse(e) {
    const t = this._def.innerType._parse(e), r = (s) => (ae(s) && (s.value = Object.freeze(s.value)), s);
    return be(t) ? t.then((s) => r(s)) : r(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Ee.create = (n, e) => new Ee({
  innerType: n,
  typeName: y.ZodReadonly,
  ...x(e)
});
function vt(n, e = {}, t) {
  return n ? pe.create().superRefine((r, s) => {
    var a, o;
    if (!n(r)) {
      const c = typeof e == "function" ? e(r) : typeof e == "string" ? { message: e } : e, f = (o = (a = c.fatal) !== null && a !== void 0 ? a : t) !== null && o !== void 0 ? o : !0, l = typeof c == "string" ? { message: c } : c;
      s.addIssue({ code: "custom", ...l, fatal: f });
    }
  }) : pe.create();
}
const Un = {
  object: A.lazycreate
};
var y;
(function(n) {
  n.ZodString = "ZodString", n.ZodNumber = "ZodNumber", n.ZodNaN = "ZodNaN", n.ZodBigInt = "ZodBigInt", n.ZodBoolean = "ZodBoolean", n.ZodDate = "ZodDate", n.ZodSymbol = "ZodSymbol", n.ZodUndefined = "ZodUndefined", n.ZodNull = "ZodNull", n.ZodAny = "ZodAny", n.ZodUnknown = "ZodUnknown", n.ZodNever = "ZodNever", n.ZodVoid = "ZodVoid", n.ZodArray = "ZodArray", n.ZodObject = "ZodObject", n.ZodUnion = "ZodUnion", n.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", n.ZodIntersection = "ZodIntersection", n.ZodTuple = "ZodTuple", n.ZodRecord = "ZodRecord", n.ZodMap = "ZodMap", n.ZodSet = "ZodSet", n.ZodFunction = "ZodFunction", n.ZodLazy = "ZodLazy", n.ZodLiteral = "ZodLiteral", n.ZodEnum = "ZodEnum", n.ZodEffects = "ZodEffects", n.ZodNativeEnum = "ZodNativeEnum", n.ZodOptional = "ZodOptional", n.ZodNullable = "ZodNullable", n.ZodDefault = "ZodDefault", n.ZodCatch = "ZodCatch", n.ZodPromise = "ZodPromise", n.ZodBranded = "ZodBranded", n.ZodPipeline = "ZodPipeline", n.ZodReadonly = "ZodReadonly";
})(y || (y = {}));
const Hn = (n, e = {
  message: `Input not instance of ${n.name}`
}) => vt((t) => t instanceof n, e), bt = B.create, xt = G.create, Fn = He.create, Wn = K.create, kt = xe.create, qn = ie.create, Jn = ze.create, Xn = ke.create, Yn = we.create, Gn = pe.create, Kn = se.create, Qn = Y.create, er = Ve.create, tr = $.create, nr = A.create, rr = A.strictCreate, sr = Se.create, ar = Fe.create, ir = Te.create, or = W.create, cr = Ae.create, dr = Ue.create, ur = oe.create, lr = fe.create, fr = Ce.create, hr = je.create, pr = Q.create, mr = Oe.create, gr = me.create, ct = z.create, yr = H.create, _r = ee.create, vr = z.createWithPreprocess, br = Re.create, xr = () => bt().optional(), kr = () => xt().optional(), wr = () => kt().optional(), Sr = {
  string: (n) => B.create({ ...n, coerce: !0 }),
  number: (n) => G.create({ ...n, coerce: !0 }),
  boolean: (n) => xe.create({
    ...n,
    coerce: !0
  }),
  bigint: (n) => K.create({ ...n, coerce: !0 }),
  date: (n) => ie.create({ ...n, coerce: !0 })
}, Tr = _;
var i = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: he,
  setErrorMap: vn,
  getErrorMap: Pe,
  makeIssue: Be,
  EMPTY_PATH: bn,
  addIssueToContext: h,
  ParseStatus: Z,
  INVALID: _,
  DIRTY: le,
  OK: L,
  isAborted: Xe,
  isDirty: Ye,
  isValid: ae,
  isAsync: be,
  get util() {
    return w;
  },
  get objectUtil() {
    return Je;
  },
  ZodParsedType: p,
  getParsedType: X,
  ZodType: k,
  datetimeRegex: yt,
  ZodString: B,
  ZodNumber: G,
  ZodBigInt: K,
  ZodBoolean: xe,
  ZodDate: ie,
  ZodSymbol: ze,
  ZodUndefined: ke,
  ZodNull: we,
  ZodAny: pe,
  ZodUnknown: se,
  ZodNever: Y,
  ZodVoid: Ve,
  ZodArray: $,
  ZodObject: A,
  ZodUnion: Se,
  ZodDiscriminatedUnion: Fe,
  ZodIntersection: Te,
  ZodTuple: W,
  ZodRecord: Ae,
  ZodMap: Ue,
  ZodSet: oe,
  ZodFunction: fe,
  ZodLazy: Ce,
  ZodLiteral: je,
  ZodEnum: Q,
  ZodNativeEnum: Oe,
  ZodPromise: me,
  ZodEffects: z,
  ZodTransformer: z,
  ZodOptional: H,
  ZodNullable: ee,
  ZodDefault: Ie,
  ZodCatch: Ze,
  ZodNaN: He,
  BRAND: Vn,
  ZodBranded: tt,
  ZodPipeline: Re,
  ZodReadonly: Ee,
  custom: vt,
  Schema: k,
  ZodSchema: k,
  late: Un,
  get ZodFirstPartyTypeKind() {
    return y;
  },
  coerce: Sr,
  any: Gn,
  array: tr,
  bigint: Wn,
  boolean: kt,
  date: qn,
  discriminatedUnion: ar,
  effect: ct,
  enum: pr,
  function: lr,
  instanceof: Hn,
  intersection: ir,
  lazy: fr,
  literal: hr,
  map: dr,
  nan: Fn,
  nativeEnum: mr,
  never: Qn,
  null: Yn,
  nullable: _r,
  number: xt,
  object: nr,
  oboolean: wr,
  onumber: kr,
  optional: yr,
  ostring: xr,
  pipeline: br,
  preprocess: vr,
  promise: gr,
  record: cr,
  set: ur,
  strictObject: rr,
  string: bt,
  symbol: Jn,
  transformer: ct,
  tuple: or,
  undefined: Xn,
  union: sr,
  unknown: Kn,
  void: er,
  NEVER: Tr,
  ZodIssueCode: d,
  quotelessJson: _n,
  ZodError: D
}), dt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, te = {}, S = {}, ne = {};
Object.defineProperty(ne, "__esModule", { value: !0 });
ne.anumber = Ke;
ne.abytes = wt;
ne.ahash = Cr;
ne.aexists = jr;
ne.aoutput = Or;
function Ke(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function Ar(n) {
  return n instanceof Uint8Array || ArrayBuffer.isView(n) && n.constructor.name === "Uint8Array";
}
function wt(n, ...e) {
  if (!Ar(n))
    throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(n.length))
    throw new Error("Uint8Array expected of length " + e + ", got length=" + n.length);
}
function Cr(n) {
  if (typeof n != "function" || typeof n.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Ke(n.outputLen), Ke(n.blockLen);
}
function jr(n, e = !0) {
  if (n.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (e && n.finished)
    throw new Error("Hash#digest() has already been called");
}
function Or(n, e) {
  wt(n);
  const t = e.outputLen;
  if (n.length < t)
    throw new Error("digestInto() expects output buffer of length at least " + t);
}
var v = {};
Object.defineProperty(v, "__esModule", { value: !0 });
v.add5L = v.add5H = v.add4H = v.add4L = v.add3H = v.add3L = v.rotlBL = v.rotlBH = v.rotlSL = v.rotlSH = v.rotr32L = v.rotr32H = v.rotrBL = v.rotrBH = v.rotrSL = v.rotrSH = v.shrSL = v.shrSH = v.toBig = void 0;
v.fromBig = nt;
v.split = St;
v.add = Pt;
const Me = /* @__PURE__ */ BigInt(2 ** 32 - 1), Qe = /* @__PURE__ */ BigInt(32);
function nt(n, e = !1) {
  return e ? { h: Number(n & Me), l: Number(n >> Qe & Me) } : { h: Number(n >> Qe & Me) | 0, l: Number(n & Me) | 0 };
}
function St(n, e = !1) {
  let t = new Uint32Array(n.length), r = new Uint32Array(n.length);
  for (let s = 0; s < n.length; s++) {
    const { h: a, l: o } = nt(n[s], e);
    [t[s], r[s]] = [a, o];
  }
  return [t, r];
}
const Tt = (n, e) => BigInt(n >>> 0) << Qe | BigInt(e >>> 0);
v.toBig = Tt;
const At = (n, e, t) => n >>> t;
v.shrSH = At;
const Ct = (n, e, t) => n << 32 - t | e >>> t;
v.shrSL = Ct;
const jt = (n, e, t) => n >>> t | e << 32 - t;
v.rotrSH = jt;
const Ot = (n, e, t) => n << 32 - t | e >>> t;
v.rotrSL = Ot;
const It = (n, e, t) => n << 64 - t | e >>> t - 32;
v.rotrBH = It;
const Zt = (n, e, t) => n >>> t - 32 | e << 64 - t;
v.rotrBL = Zt;
const Et = (n, e) => e;
v.rotr32H = Et;
const Lt = (n, e) => n;
v.rotr32L = Lt;
const Rt = (n, e, t) => n << t | e >>> 32 - t;
v.rotlSH = Rt;
const Nt = (n, e, t) => e << t | n >>> 32 - t;
v.rotlSL = Nt;
const Dt = (n, e, t) => e << t - 32 | n >>> 64 - t;
v.rotlBH = Dt;
const Mt = (n, e, t) => n << t - 32 | e >>> 64 - t;
v.rotlBL = Mt;
function Pt(n, e, t, r) {
  const s = (e >>> 0) + (r >>> 0);
  return { h: n + t + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const Bt = (n, e, t) => (n >>> 0) + (e >>> 0) + (t >>> 0);
v.add3L = Bt;
const $t = (n, e, t, r) => e + t + r + (n / 2 ** 32 | 0) | 0;
v.add3H = $t;
const zt = (n, e, t, r) => (n >>> 0) + (e >>> 0) + (t >>> 0) + (r >>> 0);
v.add4L = zt;
const Vt = (n, e, t, r, s) => e + t + r + s + (n / 2 ** 32 | 0) | 0;
v.add4H = Vt;
const Ut = (n, e, t, r, s) => (n >>> 0) + (e >>> 0) + (t >>> 0) + (r >>> 0) + (s >>> 0);
v.add5L = Ut;
const Ht = (n, e, t, r, s, a) => e + t + r + s + a + (n / 2 ** 32 | 0) | 0;
v.add5H = Ht;
const Ir = {
  fromBig: nt,
  split: St,
  toBig: Tt,
  shrSH: At,
  shrSL: Ct,
  rotrSH: jt,
  rotrSL: Ot,
  rotrBH: It,
  rotrBL: Zt,
  rotr32H: Et,
  rotr32L: Lt,
  rotlSH: Rt,
  rotlSL: Nt,
  rotlBH: Dt,
  rotlBL: Mt,
  add: Pt,
  add3L: Bt,
  add3H: $t,
  add4L: zt,
  add4H: Vt,
  add5H: Ht,
  add5L: Ut
};
v.default = Ir;
var Ft = {}, We = {};
Object.defineProperty(We, "__esModule", { value: !0 });
We.crypto = void 0;
We.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
(function(n) {
  /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  Object.defineProperty(n, "__esModule", { value: !0 }), n.Hash = n.nextTick = n.byteSwapIfBE = n.isLE = void 0, n.isBytes = r, n.u8 = s, n.u32 = a, n.createView = o, n.rotr = c, n.rotl = f, n.byteSwap = l, n.byteSwap32 = g, n.bytesToHex = ce, n.hexToBytes = on, n.asyncLoop = dn, n.utf8ToBytes = st, n.toBytes = De, n.concatBytes = un, n.checkOpts = fn, n.wrapConstructor = hn, n.wrapConstructorWithOpts = pn, n.wrapXOFConstructorWithOpts = mn, n.randomBytes = gn;
  const e = We, t = ne;
  function r(u) {
    return u instanceof Uint8Array || ArrayBuffer.isView(u) && u.constructor.name === "Uint8Array";
  }
  function s(u) {
    return new Uint8Array(u.buffer, u.byteOffset, u.byteLength);
  }
  function a(u) {
    return new Uint32Array(u.buffer, u.byteOffset, Math.floor(u.byteLength / 4));
  }
  function o(u) {
    return new DataView(u.buffer, u.byteOffset, u.byteLength);
  }
  function c(u, b) {
    return u << 32 - b | u >>> b;
  }
  function f(u, b) {
    return u << b | u >>> 32 - b >>> 0;
  }
  n.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
  function l(u) {
    return u << 24 & 4278190080 | u << 8 & 16711680 | u >>> 8 & 65280 | u >>> 24 & 255;
  }
  n.byteSwapIfBE = n.isLE ? (u) => u : (u) => l(u);
  function g(u) {
    for (let b = 0; b < u.length; b++)
      u[b] = l(u[b]);
  }
  const I = /* @__PURE__ */ Array.from({ length: 256 }, (u, b) => b.toString(16).padStart(2, "0"));
  function ce(u) {
    (0, t.abytes)(u);
    let b = "";
    for (let C = 0; C < u.length; C++)
      b += I[u[C]];
    return b;
  }
  const j = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
  function rt(u) {
    if (u >= j._0 && u <= j._9)
      return u - j._0;
    if (u >= j.A && u <= j.F)
      return u - (j.A - 10);
    if (u >= j.a && u <= j.f)
      return u - (j.a - 10);
  }
  function on(u) {
    if (typeof u != "string")
      throw new Error("hex string expected, got " + typeof u);
    const b = u.length, C = b / 2;
    if (b % 2)
      throw new Error("hex string expected, got unpadded hex of length " + b);
    const T = new Uint8Array(C);
    for (let O = 0, N = 0; O < C; O++, N += 2) {
      const at = rt(u.charCodeAt(N)), it = rt(u.charCodeAt(N + 1));
      if (at === void 0 || it === void 0) {
        const yn = u[N] + u[N + 1];
        throw new Error('hex string expected, got non-hex character "' + yn + '" at index ' + N);
      }
      T[O] = at * 16 + it;
    }
    return T;
  }
  const cn = async () => {
  };
  n.nextTick = cn;
  async function dn(u, b, C) {
    let T = Date.now();
    for (let O = 0; O < u; O++) {
      C(O);
      const N = Date.now() - T;
      N >= 0 && N < b || (await (0, n.nextTick)(), T += N);
    }
  }
  function st(u) {
    if (typeof u != "string")
      throw new Error("utf8ToBytes expected string, got " + typeof u);
    return new Uint8Array(new TextEncoder().encode(u));
  }
  function De(u) {
    return typeof u == "string" && (u = st(u)), (0, t.abytes)(u), u;
  }
  function un(...u) {
    let b = 0;
    for (let T = 0; T < u.length; T++) {
      const O = u[T];
      (0, t.abytes)(O), b += O.length;
    }
    const C = new Uint8Array(b);
    for (let T = 0, O = 0; T < u.length; T++) {
      const N = u[T];
      C.set(N, O), O += N.length;
    }
    return C;
  }
  class ln {
    // Safe version that clones internal state
    clone() {
      return this._cloneInto();
    }
  }
  n.Hash = ln;
  function fn(u, b) {
    if (b !== void 0 && {}.toString.call(b) !== "[object Object]")
      throw new Error("Options should be object or undefined");
    return Object.assign(u, b);
  }
  function hn(u) {
    const b = (T) => u().update(De(T)).digest(), C = u();
    return b.outputLen = C.outputLen, b.blockLen = C.blockLen, b.create = () => u(), b;
  }
  function pn(u) {
    const b = (T, O) => u(O).update(De(T)).digest(), C = u({});
    return b.outputLen = C.outputLen, b.blockLen = C.blockLen, b.create = (T) => u(T), b;
  }
  function mn(u) {
    const b = (T, O) => u(O).update(De(T)).digest(), C = u({});
    return b.outputLen = C.outputLen, b.blockLen = C.blockLen, b.create = (T) => u(T), b;
  }
  function gn(u = 32) {
    if (e.crypto && typeof e.crypto.getRandomValues == "function")
      return e.crypto.getRandomValues(new Uint8Array(u));
    if (e.crypto && typeof e.crypto.randomBytes == "function")
      return e.crypto.randomBytes(u);
    throw new Error("crypto.getRandomValues must be defined");
  }
})(Ft);
Object.defineProperty(S, "__esModule", { value: !0 });
S.shake256 = S.shake128 = S.keccak_512 = S.keccak_384 = S.keccak_256 = S.keccak_224 = S.sha3_512 = S.sha3_384 = S.sha3_256 = S.sha3_224 = S.Keccak = void 0;
S.keccakP = Xt;
const de = ne, Le = v, J = Ft, Wt = [], qt = [], Jt = [], Zr = /* @__PURE__ */ BigInt(0), ge = /* @__PURE__ */ BigInt(1), Er = /* @__PURE__ */ BigInt(2), Lr = /* @__PURE__ */ BigInt(7), Rr = /* @__PURE__ */ BigInt(256), Nr = /* @__PURE__ */ BigInt(113);
for (let n = 0, e = ge, t = 1, r = 0; n < 24; n++) {
  [t, r] = [r, (2 * t + 3 * r) % 5], Wt.push(2 * (5 * r + t)), qt.push((n + 1) * (n + 2) / 2 % 64);
  let s = Zr;
  for (let a = 0; a < 7; a++)
    e = (e << ge ^ (e >> Lr) * Nr) % Rr, e & Er && (s ^= ge << (ge << /* @__PURE__ */ BigInt(a)) - ge);
  Jt.push(s);
}
const [Dr, Mr] = /* @__PURE__ */ (0, Le.split)(Jt, !0), ut = (n, e, t) => t > 32 ? (0, Le.rotlBH)(n, e, t) : (0, Le.rotlSH)(n, e, t), lt = (n, e, t) => t > 32 ? (0, Le.rotlBL)(n, e, t) : (0, Le.rotlSL)(n, e, t);
function Xt(n, e = 24) {
  const t = new Uint32Array(10);
  for (let r = 24 - e; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      t[o] = n[o] ^ n[o + 10] ^ n[o + 20] ^ n[o + 30] ^ n[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, f = (o + 2) % 10, l = t[f], g = t[f + 1], I = ut(l, g, 1) ^ t[c], ce = lt(l, g, 1) ^ t[c + 1];
      for (let j = 0; j < 50; j += 10)
        n[o + j] ^= I, n[o + j + 1] ^= ce;
    }
    let s = n[2], a = n[3];
    for (let o = 0; o < 24; o++) {
      const c = qt[o], f = ut(s, a, c), l = lt(s, a, c), g = Wt[o];
      s = n[g], a = n[g + 1], n[g] = f, n[g + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        t[c] = n[o + c];
      for (let c = 0; c < 10; c++)
        n[o + c] ^= ~t[(c + 2) % 10] & t[(c + 4) % 10];
    }
    n[0] ^= Dr[r], n[1] ^= Mr[r];
  }
  t.fill(0);
}
class Ne extends J.Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(e, t, r, s = !1, a = 24) {
    if (super(), this.blockLen = e, this.suffix = t, this.outputLen = r, this.enableXOF = s, this.rounds = a, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, (0, de.anumber)(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = (0, J.u32)(this.state);
  }
  keccak() {
    J.isLE || (0, J.byteSwap32)(this.state32), Xt(this.state32, this.rounds), J.isLE || (0, J.byteSwap32)(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(e) {
    (0, de.aexists)(this);
    const { blockLen: t, state: r } = this;
    e = (0, J.toBytes)(e);
    const s = e.length;
    for (let a = 0; a < s; ) {
      const o = Math.min(t - this.pos, s - a);
      for (let c = 0; c < o; c++)
        r[this.pos++] ^= e[a++];
      this.pos === t && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: e, suffix: t, pos: r, blockLen: s } = this;
    e[r] ^= t, t & 128 && r === s - 1 && this.keccak(), e[s - 1] ^= 128, this.keccak();
  }
  writeInto(e) {
    (0, de.aexists)(this, !1), (0, de.abytes)(e), this.finish();
    const t = this.state, { blockLen: r } = this;
    for (let s = 0, a = e.length; s < a; ) {
      this.posOut >= r && this.keccak();
      const o = Math.min(r - this.posOut, a - s);
      e.set(t.subarray(this.posOut, this.posOut + o), s), this.posOut += o, s += o;
    }
    return e;
  }
  xofInto(e) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(e);
  }
  xof(e) {
    return (0, de.anumber)(e), this.xofInto(new Uint8Array(e));
  }
  digestInto(e) {
    if ((0, de.aoutput)(e, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(e), this.destroy(), e;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, this.state.fill(0);
  }
  _cloneInto(e) {
    const { blockLen: t, suffix: r, outputLen: s, rounds: a, enableXOF: o } = this;
    return e || (e = new Ne(t, r, s, o, a)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = a, e.suffix = r, e.outputLen = s, e.enableXOF = o, e.destroyed = this.destroyed, e;
  }
}
S.Keccak = Ne;
const re = (n, e, t) => (0, J.wrapConstructor)(() => new Ne(e, n, t));
S.sha3_224 = re(6, 144, 224 / 8);
S.sha3_256 = re(6, 136, 256 / 8);
S.sha3_384 = re(6, 104, 384 / 8);
S.sha3_512 = re(6, 72, 512 / 8);
S.keccak_224 = re(1, 144, 224 / 8);
S.keccak_256 = re(1, 136, 256 / 8);
S.keccak_384 = re(1, 104, 384 / 8);
S.keccak_512 = re(1, 72, 512 / 8);
const Yt = (n, e, t) => (0, J.wrapXOFConstructorWithOpts)((r = {}) => new Ne(e, n, r.dkLen === void 0 ? t : r.dkLen, !0));
S.shake128 = Yt(31, 168, 128 / 8);
S.shake256 = Yt(31, 136, 256 / 8);
const { sha3_512: Pr } = S, Gt = 24, ve = 32, et = (n = 4, e = Math.random) => {
  let t = "";
  for (; t.length < n; )
    t = t + Math.floor(e() * 36).toString(36);
  return t;
};
function Kt(n) {
  let e = 8n, t = 0n;
  for (const r of n.values()) {
    const s = BigInt(r);
    t = (t << e) + s;
  }
  return t;
}
const Qt = (n = "") => Kt(Pr(n)).toString(36).slice(1), ft = Array.from(
  { length: 26 },
  (n, e) => String.fromCharCode(e + 97)
), Br = (n) => ft[Math.floor(n() * ft.length)], en = ({
  globalObj: n = typeof dt < "u" ? dt : typeof window < "u" ? window : {},
  random: e = Math.random
} = {}) => {
  const t = Object.keys(n).toString(), r = t.length ? t + et(ve, e) : et(ve, e);
  return Qt(r).substring(0, ve);
}, tn = (n) => () => n++, $r = 476782367, nn = ({
  // Fallback if the user does not pass in a CSPRNG. This should be OK
  // because we don't rely solely on the random number generator for entropy.
  // We also use the host fingerprint, current time, and a session counter.
  random: n = Math.random,
  counter: e = tn(Math.floor(n() * $r)),
  length: t = Gt,
  fingerprint: r = en({ random: n })
} = {}) => function() {
  const a = Br(n), o = Date.now().toString(36), c = e().toString(36), f = et(t, n), l = `${o + f + c + r}`;
  return `${a + Qt(l).substring(1, t)}`;
}, zr = nn(), Vr = (n, { minLength: e = 2, maxLength: t = ve } = {}) => {
  const r = n.length, s = /^[0-9a-z]+$/;
  try {
    if (typeof n == "string" && r >= e && r <= t && s.test(n))
      return !0;
  } finally {
  }
  return !1;
};
te.getConstants = () => ({ defaultLength: Gt, bigLength: ve });
te.init = nn;
te.createId = zr;
te.bufToBigInt = Kt;
te.createCounter = tn;
te.createFingerprint = en;
te.isCuid = Vr;
const { createId: Ur, init: ls, getConstants: fs, isCuid: hs } = te;
var Hr = Ur;
const rn = i.string().cuid2().default(Hr()).describe("Unique identifier for the item in Cuid2 format"), M = i.object({
  id: rn,
  visible: i.boolean()
}), P = {
  id: "",
  visible: !0
}, V = i.object({
  label: i.string(),
  href: i.literal("").or(i.string().url())
}), U = {
  label: "",
  href: ""
}, Fr = i.object({
  id: i.string().cuid2(),
  icon: i.string(),
  name: i.string(),
  value: i.string()
}), Wr = i.object({
  name: i.string(),
  profession: i.string(),
  headline: i.string(),
  email: i.literal("").or(i.string().email()),
  phone: i.string(),
  location: i.string(),
  url: V,
  customFields: i.array(Fr),
  picture: i.object({
    url: i.string(),
    size: i.number().default(64),
    aspectRatio: i.number().default(1),
    borderRadius: i.number().default(0),
    effects: i.object({
      hidden: i.boolean().default(!1),
      border: i.boolean().default(!1),
      grayscale: i.boolean().default(!1)
    })
  })
}), qr = {
  name: "",
  profession: "",
  headline: "",
  email: "",
  phone: "",
  location: "",
  url: U,
  customFields: [],
  picture: {
    url: "",
    size: 64,
    aspectRatio: 1,
    borderRadius: 0,
    effects: {
      hidden: !1,
      border: !1,
      grayscale: !1
    }
  }
}, sn = [
  [
    ["profiles", "summary", "experience", "education", "projects", "volunteer", "references"],
    ["skills", "interests", "certifications", "awards", "publications", "languages"]
  ]
], Jr = i.object({
  template: i.object({
    name: i.string().default("cv_template_2"),
    id: i.number().default(2),
    withPhoto: i.boolean().default(!1),
    withoutPhoto: i.boolean().default(!0),
    oneColumn: i.boolean().default(!0),
    twoColumn: i.boolean().default(!1),
    progress: i.number().default(0)
  }),
  layout: i.array(i.array(i.array(i.string()))).default(sn),
  // pages -> columns -> sections
  css: i.object({
    value: i.string().default(`* {
	outline: 1px solid #000;
	outline-offset: 4px;
}`),
    visible: i.boolean().default(!1)
  }),
  page: i.object({
    margin: i.number().default(18),
    format: i.enum(["a4", "letter"]).default("a4"),
    options: i.object({
      breakLine: i.boolean().default(!0),
      pageNumbers: i.boolean().default(!0)
    })
  }),
  theme: i.object({
    background: i.string().default("#ffffff"),
    text: i.string().default("#000000"),
    primary: i.string().default("#dc2626")
  }),
  typography: i.object({
    font: i.object({
      family: i.string().default("IBM Plex Serif"),
      subset: i.string().default("latin"),
      variants: i.array(i.string()).default(["regular"]),
      size: i.number().default(14)
    }),
    lineHeight: i.number().default(1.5),
    hideIcons: i.boolean().default(!1),
    underlineLinks: i.boolean().default(!0)
  }),
  notes: i.string().default("")
}), Xr = {
  template: {
    name: "cv_template_2",
    id: 2,
    withPhoto: !1,
    withoutPhoto: !0,
    oneColumn: !0,
    twoColumn: !1,
    progress: 0
  },
  layout: sn,
  css: {
    value: `* {
	outline: 1px solid #000;
	outline-offset: 4px;
}`,
    visible: !1
  },
  page: {
    margin: 18,
    format: "a4",
    options: {
      breakLine: !0,
      pageNumbers: !0
    }
  },
  theme: {
    background: "#ffffff",
    text: "#000000",
    primary: "#dc2626"
  },
  typography: {
    font: {
      family: "IBM Plex Serif",
      subset: "latin",
      variants: ["regular", "italic", "600"],
      size: 14
    },
    lineHeight: 1.5,
    hideIcons: !1,
    underlineLinks: !0
  },
  notes: ""
}, Yr = M.extend({
  title: i.string().min(1),
  awarder: i.string(),
  date: i.string(),
  summary: i.string(),
  url: V
}), ps = {
  ...P,
  title: "",
  awarder: "",
  date: "",
  summary: "",
  url: U
}, Gr = M.extend({
  name: i.string().min(1),
  issuer: i.string(),
  date: i.string(),
  summary: i.string(),
  url: V
}), ms = {
  ...P,
  name: "",
  issuer: "",
  date: "",
  summary: "",
  url: U
}, an = M.extend({
  name: i.string(),
  description: i.string(),
  date: i.string(),
  location: i.string(),
  summary: i.string(),
  keywords: i.array(i.string()).default([]),
  url: V
}), gs = {
  ...P,
  name: "",
  description: "",
  date: "",
  location: "",
  summary: "",
  keywords: [],
  url: U
}, Kr = M.extend({
  institution: i.string().min(1),
  studyType: i.string(),
  area: i.string(),
  score: i.string(),
  date: i.string(),
  summary: i.string(),
  url: V
}), ys = {
  ...P,
  id: "",
  institution: "",
  studyType: "",
  area: "",
  score: "",
  date: "",
  summary: "",
  url: U
}, Qr = M.extend({
  company: i.string().min(1),
  position: i.string(),
  location: i.string(),
  date: i.string(),
  summary: i.string(),
  url: V
}), _s = {
  ...P,
  company: "",
  position: "",
  location: "",
  date: "",
  summary: "",
  url: U
}, es = M.extend({
  name: i.string().min(1),
  keywords: i.array(i.string()).default([])
}), vs = {
  ...P,
  name: "",
  keywords: []
}, ts = M.extend({
  name: i.string().min(1),
  description: i.string(),
  level: i.coerce.number().min(0).max(5).default(1)
}), bs = {
  ...P,
  name: "",
  description: "",
  level: 1
}, ns = M.extend({
  network: i.string().min(1),
  username: i.string().min(1),
  icon: i.string().describe(
    'Slug for the icon from https://simpleicons.org. For example, "github", "linkedin", etc.'
  ),
  url: V
}), xs = {
  ...P,
  network: "",
  username: "",
  icon: "",
  url: U
}, rs = M.extend({
  name: i.string().min(1),
  description: i.string(),
  date: i.string(),
  summary: i.string(),
  keywords: i.array(i.string()).default([]),
  url: V
}), ks = {
  ...P,
  name: "",
  description: "",
  date: "",
  summary: "",
  keywords: [],
  url: U
}, ss = M.extend({
  name: i.string().min(1),
  publisher: i.string(),
  date: i.string(),
  summary: i.string(),
  url: V
}), ws = {
  ...P,
  name: "",
  publisher: "",
  date: "",
  summary: "",
  url: U
}, as = M.extend({
  name: i.string().min(1),
  description: i.string(),
  summary: i.string(),
  url: V
}), Ss = {
  ...P,
  name: "",
  description: "",
  summary: "",
  url: U
}, is = M.extend({
  name: i.string(),
  description: i.string(),
  level: i.coerce.number().min(0).max(5).default(1),
  keywords: i.array(i.string()).default([])
}), Ts = {
  ...P,
  name: "",
  description: "",
  level: 1,
  keywords: []
}, os = M.extend({
  organization: i.string().min(1),
  position: i.string(),
  location: i.string(),
  date: i.string(),
  summary: i.string(),
  url: V
}), As = {
  ...P,
  organization: "",
  position: "",
  location: "",
  date: "",
  summary: "",
  url: U
}, E = i.object({
  name: i.string(),
  columns: i.number().min(1).max(5).default(1),
  separateLinks: i.boolean().default(!0),
  visible: i.boolean().default(!0)
}), cs = E.extend({
  id: rn,
  items: i.array(an)
}), ds = i.object({
  collapse: E.extend({
    id: i.literal("collapse"),
    items: i.array(an),
    extraDescription: i.string().default("")
  }),
  summary: E.extend({
    id: i.literal("summary"),
    content: i.string().default(""),
    extraDescription: i.string().default("")
  }),
  awards: E.extend({
    id: i.literal("awards"),
    items: i.array(Yr),
    extraDescription: i.string().default("")
  }),
  certifications: E.extend({
    id: i.literal("certifications"),
    items: i.array(Gr),
    extraDescription: i.string().default("")
  }),
  education: E.extend({
    id: i.literal("education"),
    items: i.array(Kr),
    extraDescription: i.string().default("")
  }),
  experience: E.extend({
    id: i.literal("experience"),
    items: i.array(Qr),
    extraDescription: i.string().default("")
  }),
  volunteer: E.extend({
    id: i.literal("volunteer"),
    items: i.array(os),
    extraDescription: i.string().default("")
  }),
  interests: E.extend({
    id: i.literal("interests"),
    items: i.array(es),
    extraDescription: i.string().default("")
  }),
  languages: E.extend({
    id: i.literal("languages"),
    items: i.array(ts),
    extraDescription: i.string().default("")
  }),
  profiles: E.extend({
    id: i.literal("profiles"),
    items: i.array(ns),
    extraDescription: i.string().default("")
  }),
  projects: E.extend({
    id: i.literal("projects"),
    items: i.array(rs),
    extraDescription: i.string().default("")
  }),
  publications: E.extend({
    id: i.literal("publications"),
    items: i.array(ss),
    extraDescription: i.string().default("")
  }),
  references: E.extend({
    id: i.literal("references"),
    items: i.array(as),
    extraDescription: i.string().default("")
  }),
  skills: E.extend({
    id: i.literal("skills"),
    items: i.array(is),
    extraDescription: i.string().default("")
  }),
  custom: i.record(i.string(), cs)
}), R = {
  name: "",
  columns: 1,
  separateLinks: !0,
  visible: !0
}, us = {
  collapse: {
    ...R,
    id: "collapse",
    name: "Collapse",
    items: [],
    extraDescription: ""
  },
  summary: { ...R, id: "summary", name: "Summary", content: "", extraDescription: "" },
  awards: { ...R, id: "awards", name: "Awards", items: [], extraDescription: "" },
  certifications: { ...R, id: "certifications", name: "Certifications", items: [], extraDescription: "" },
  education: { ...R, id: "education", name: "Education", items: [], extraDescription: "" },
  experience: { ...R, id: "experience", name: "Experience", items: [], extraDescription: "" },
  volunteer: { ...R, id: "volunteer", name: "Volunteering", items: [], extraDescription: "" },
  interests: { ...R, id: "interests", name: "Interests", items: [], extraDescription: "" },
  languages: { ...R, id: "languages", name: "Languages", items: [], extraDescription: "" },
  profiles: { ...R, id: "profiles", name: "Profiles", items: [], extraDescription: "" },
  projects: { ...R, id: "projects", name: "Projects", items: [], extraDescription: "" },
  publications: { ...R, id: "publications", name: "Publications", items: [], extraDescription: "" },
  references: { ...R, id: "references", name: "References", items: [], extraDescription: "" },
  skills: { ...R, id: "skills", name: "Skills", items: [], extraDescription: "" },
  custom: {}
}, Cs = {
  id: 1,
  basics: {
    name: "John Doe",
    profession: "Web Developer",
    headline: "Creative and Innovative Web Developer",
    email: "john.doe@gmail.com",
    phone: "(555) 123-4567",
    location: "Pleasantville, CA 94588",
    url: {
      label: "",
      href: "https://johndoe.me/"
    },
    customFields: [],
    picture: {
      url: "https://i.imgur.com/HgwyOuJ.jpg",
      size: 120,
      aspectRatio: 1,
      borderRadius: 0,
      effects: {
        hidden: !1,
        border: !1,
        grayscale: !1
      }
    }
  },
  sections: {
    collapse: {
      name: "Collapse",
      columns: 1,
      separateLinks: !0,
      visible: !0,
      id: "collapse",
      items: [],
      extraDescription: ""
    },
    summary: {
      name: "Summary",
      columns: 1,
      separateLinks: !0,
      visible: !0,
      id: "summary",
      content: "<p>Innovative Web Developer with 5 years of experience in building impactful and user-friendly websites and applications. Specializes in <strong>front-end technologies</strong> and passionate about modern web standards and cutting-edge development techniques. Proven track record of leading successful projects from concept to deployment.</p>",
      extraDescription: ""
    },
    awards: {
      name: "Awards",
      columns: 1,
      separateLinks: !0,
      visible: !0,
      id: "awards",
      items: [],
      extraDescription: ""
    },
    certifications: {
      name: "Certifications",
      columns: 1,
      separateLinks: !0,
      visible: !0,
      id: "certifications",
      items: [
        {
          id: "spdhh9rrqi1gvj0yqnbqunlo",
          visible: !0,
          name: "Full-Stack Web Development",
          issuer: "CodeAcademy",
          date: "2020",
          summary: "",
          url: {
            label: "",
            href: ""
          }
        },
        {
          id: "n838rddyqv47zexn6cxauwqp",
          visible: !0,
          name: "AWS Certified Developer",
          issuer: "Amazon Web Services",
          date: "2019",
          summary: "",
          url: {
            label: "",
            href: ""
          }
        }
      ],
      extraDescription: ""
    },
    education: {
      name: "Education",
      columns: 1,
      separateLinks: !0,
      visible: !0,
      id: "education",
      items: [
        {
          id: "yo3p200zo45c6cdqc6a2vtt3",
          visible: !0,
          institution: "University of California",
          studyType: "Bachelor's in Computer Science",
          area: "Berkeley, CA",
          score: "",
          date: "August 2012 to May 2016",
          summary: "",
          url: {
            label: "",
            href: ""
          }
        }
      ],
      extraDescription: ""
    },
    experience: {
      name: "Experience",
      columns: 1,
      separateLinks: !0,
      visible: !0,
      id: "experience",
      items: [
        {
          id: "lhw25d7gf32wgdfpsktf6e0x",
          visible: !0,
          company: "Creative Solutions Inc.",
          position: "Senior Web Developer",
          location: "San Francisco, CA",
          date: "January 2019 to Present",
          summary: "<ul><li><p>Spearheaded the redesign of the main product website, resulting in a 40% increase in user engagement.</p></li><li><p>Developed and implemented a new responsive framework, improving cross-device compatibility.</p></li><li><p>Mentored a team of four junior developers, fostering a culture of technical excellence.</p></li></ul>",
          url: {
            label: "",
            href: "https://creativesolutions.inc/"
          }
        },
        {
          id: "r6543lil53ntrxmvel53gbtm",
          visible: !0,
          company: "TechAdvancers",
          position: "Web Developer",
          location: "San Jose, CA",
          date: "June 2016 to December 2018",
          summary: "<ul><li><p>Collaborated in a team of 10 to develop high-quality web applications using React.js and Node.js.</p></li><li><p>Managed the integration of third-party services such as Stripe for payments and Twilio for SMS services.</p></li><li><p>Optimized application performance, achieving a 30% reduction in load times.</p></li></ul>",
          url: {
            label: "",
            href: "https://techadvancers.com/"
          }
        }
      ],
      extraDescription: ""
    },
    volunteer: {
      name: "Volunteering",
      columns: 1,
      separateLinks: !0,
      visible: !0,
      id: "volunteer",
      items: [],
      extraDescription: ""
    },
    interests: {
      name: "Interests",
      columns: 1,
      separateLinks: !0,
      visible: !0,
      id: "interests",
      items: [],
      extraDescription: ""
    },
    languages: {
      name: "Languages",
      columns: 1,
      separateLinks: !0,
      visible: !0,
      id: "languages",
      items: [],
      extraDescription: ""
    },
    profiles: {
      name: "Profiles",
      columns: 1,
      separateLinks: !0,
      visible: !0,
      id: "profiles",
      items: [
        {
          id: "cnbk5f0aeqvhx69ebk7hktwd",
          visible: !0,
          network: "LinkedIn",
          username: "johndoe",
          icon: "linkedin",
          url: {
            label: "",
            href: "https://linkedin.com/in/johndoe"
          }
        },
        {
          id: "ukl0uecvzkgm27mlye0wazlb",
          visible: !0,
          network: "GitHub",
          username: "johndoe",
          icon: "github",
          url: {
            label: "",
            href: "https://github.com/johndoe"
          }
        }
      ],
      extraDescription: ""
    },
    projects: {
      name: "Projects",
      columns: 1,
      separateLinks: !0,
      visible: !0,
      id: "projects",
      items: [
        {
          id: "yw843emozcth8s1ubi1ubvlf",
          visible: !0,
          name: "E-Commerce Platform",
          description: "Project Lead",
          date: "",
          summary: "<p>Led the development of a full-stack e-commerce platform, improving sales conversion by 25%.</p>",
          keywords: [],
          url: {
            label: "",
            href: ""
          }
        },
        {
          id: "ncxgdjjky54gh59iz2t1xi1v",
          visible: !0,
          name: "Interactive Dashboard",
          description: "Frontend Developer",
          date: "",
          summary: "<p>Created an interactive analytics dashboard for a SaaS application, enhancing data visualization for clients.</p>",
          keywords: [],
          url: {
            label: "",
            href: ""
          }
        }
      ],
      extraDescription: ""
    },
    publications: {
      name: "Publications",
      columns: 1,
      separateLinks: !0,
      visible: !0,
      id: "publications",
      items: [],
      extraDescription: ""
    },
    references: {
      name: "References",
      columns: 1,
      separateLinks: !0,
      visible: !1,
      id: "references",
      items: [
        {
          id: "f2sv5z0cce6ztjl87yuk8fak",
          visible: !0,
          name: "Available upon request",
          description: "",
          summary: "",
          url: {
            label: "",
            href: ""
          }
        }
      ],
      extraDescription: ""
    },
    skills: {
      name: "Skills",
      columns: 1,
      separateLinks: !0,
      visible: !0,
      id: "skills",
      items: [
        {
          id: "hn0keriukh6c0ojktl9gsgjm",
          visible: !0,
          name: "Web Technologies",
          description: "Advanced",
          level: 0,
          keywords: ["HTML5", "JavaScript", "PHP", "Python"]
        },
        {
          id: "r8c3y47vykausqrgmzwg5pur",
          visible: !0,
          name: "Web Frameworks",
          description: "Intermediate",
          level: 0,
          keywords: ["React.js", "Angular", "Vue.js", "Laravel", "Django"]
        },
        {
          id: "b5l75aseexqv17quvqgh73fe",
          visible: !0,
          name: "Tools",
          description: "Intermediate",
          level: 0,
          keywords: ["Webpack", "Git", "Jenkins", "Docker", "JIRA"]
        }
      ],
      extraDescription: ""
    },
    custom: {}
  },
  metadata: {
    template: {
      name: "glalie",
      id: 1,
      withPhoto: !0,
      withoutPhoto: !1,
      oneColumn: !0,
      twoColumn: !1,
      progress: 0
    },
    layout: [
      [
        ["summary", "experience", "education", "projects", "references"],
        [
          "profiles",
          "skills",
          "certifications",
          "interests",
          "languages",
          "awards",
          "volunteer",
          "publications"
        ]
      ]
    ],
    css: {
      value: `* {
	outline: 1px solid #000;
	outline-offset: 4px;
}`,
      visible: !1
    },
    page: {
      margin: 14,
      format: "a4",
      options: {
        breakLine: !0,
        pageNumbers: !0
      }
    },
    theme: {
      background: "#ffffff",
      text: "#000000",
      primary: "#ca8a04"
    },
    typography: {
      font: {
        family: "Merriweather",
        subset: "latin",
        variants: ["regular"],
        size: 13
      },
      lineHeight: 1.75,
      hideIcons: !1,
      underlineLinks: !0
    },
    notes: ""
  }
}, js = i.object({
  basics: Wr,
  sections: ds,
  metadata: Jr,
  id: i.number().optional() || i.number()
}), Os = {
  basics: qr,
  sections: us,
  metadata: Xr,
  id: void 0
};
export {
  Yr as awardSchema,
  Wr as basicsSchema,
  Gr as certificationSchema,
  Fr as customFieldSchema,
  cs as customSchema,
  an as customSectionSchema,
  ps as defaultAward,
  qr as defaultBasics,
  ms as defaultCertification,
  gs as defaultCustomSection,
  ys as defaultEducation,
  _s as defaultExperience,
  vs as defaultInterest,
  P as defaultItem,
  bs as defaultLanguage,
  sn as defaultLayout,
  Xr as defaultMetadata,
  xs as defaultProfile,
  ks as defaultProject,
  ws as defaultPublication,
  Ss as defaultReference,
  Os as defaultResumeData,
  R as defaultSection,
  us as defaultSections,
  Ts as defaultSkill,
  U as defaultUrl,
  As as defaultVolunteer,
  Kr as educationSchema,
  Qr as experienceSchema,
  rn as idSchema,
  es as interestSchema,
  M as itemSchema,
  ts as languageSchema,
  Jr as metadataSchema,
  ns as profileSchema,
  rs as projectSchema,
  ss as publicationSchema,
  as as referenceSchema,
  js as resumeDataSchema,
  Cs as sampleResume,
  E as sectionSchema,
  ds as sectionsSchema,
  is as skillSchema,
  V as urlSchema,
  os as volunteerSchema
};
