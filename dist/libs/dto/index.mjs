function te(t) {
  class e {
    static create(r) {
      return this.schema.parse(r);
    }
  }
  return e.isZodDto = !0, e.schema = t, e;
}
var V;
(function(t) {
  t.assertEqual = (s) => s;
  function e(s) {
  }
  t.assertIs = e;
  function n(s) {
    throw new Error();
  }
  t.assertNever = n, t.arrayToEnum = (s) => {
    const a = {};
    for (const o of s)
      a[o] = o;
    return a;
  }, t.getValidEnumValues = (s) => {
    const a = t.objectKeys(s).filter((d) => typeof s[s[d]] != "number"), o = {};
    for (const d of a)
      o[d] = s[d];
    return t.objectValues(o);
  }, t.objectValues = (s) => t.objectKeys(s).map(function(a) {
    return s[a];
  }), t.objectKeys = typeof Object.keys == "function" ? (s) => Object.keys(s) : (s) => {
    const a = [];
    for (const o in s)
      Object.prototype.hasOwnProperty.call(s, o) && a.push(o);
    return a;
  }, t.find = (s, a) => {
    for (const o of s)
      if (a(o))
        return o;
  }, t.isInteger = typeof Number.isInteger == "function" ? (s) => Number.isInteger(s) : (s) => typeof s == "number" && isFinite(s) && Math.floor(s) === s;
  function r(s, a = " | ") {
    return s.map((o) => typeof o == "string" ? `'${o}'` : o).join(a);
  }
  t.joinValues = r, t.jsonStringifyReplacer = (s, a) => typeof a == "bigint" ? a.toString() : a;
})(V || (V = {}));
var Wt;
(function(t) {
  t.mergeShapes = (e, n) => ({
    ...e,
    ...n
    // second overwrites first
  });
})(Wt || (Wt = {}));
const O = V.arrayToEnum([
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
]), Le = (t) => {
  switch (typeof t) {
    case "undefined":
      return O.undefined;
    case "string":
      return O.string;
    case "number":
      return isNaN(t) ? O.nan : O.number;
    case "boolean":
      return O.boolean;
    case "function":
      return O.function;
    case "bigint":
      return O.bigint;
    case "symbol":
      return O.symbol;
    case "object":
      return Array.isArray(t) ? O.array : t === null ? O.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? O.promise : typeof Map < "u" && t instanceof Map ? O.map : typeof Set < "u" && t instanceof Set ? O.set : typeof Date < "u" && t instanceof Date ? O.date : O.object;
    default:
      return O.unknown;
  }
}, y = V.arrayToEnum([
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
]), or = (t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:");
class me extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(), this.issues = [], this.addIssue = (r) => {
      this.issues = [...this.issues, r];
    }, this.addIssues = (r = []) => {
      this.issues = [...this.issues, ...r];
    };
    const n = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, n) : this.__proto__ = n, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const n = e || function(a) {
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
          r._errors.push(n(o));
        else {
          let d = r, k = 0;
          for (; k < o.path.length; ) {
            const f = o.path[k];
            k === o.path.length - 1 ? (d[f] = d[f] || { _errors: [] }, d[f]._errors.push(n(o))) : d[f] = d[f] || { _errors: [] }, d = d[f], k++;
          }
        }
    };
    return s(this), r;
  }
  static assert(e) {
    if (!(e instanceof me))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, V.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (n) => n.message) {
    const n = {}, r = [];
    for (const s of this.issues)
      s.path.length > 0 ? (n[s.path[0]] = n[s.path[0]] || [], n[s.path[0]].push(e(s))) : r.push(e(s));
    return { formErrors: r, fieldErrors: n };
  }
  get formErrors() {
    return this.flatten();
  }
}
me.create = (t) => new me(t);
const it = (t, e) => {
  let n;
  switch (t.code) {
    case y.invalid_type:
      t.received === O.undefined ? n = "Required" : n = `Expected ${t.expected}, received ${t.received}`;
      break;
    case y.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(t.expected, V.jsonStringifyReplacer)}`;
      break;
    case y.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${V.joinValues(t.keys, ", ")}`;
      break;
    case y.invalid_union:
      n = "Invalid input";
      break;
    case y.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${V.joinValues(t.options)}`;
      break;
    case y.invalid_enum_value:
      n = `Invalid enum value. Expected ${V.joinValues(t.options)}, received '${t.received}'`;
      break;
    case y.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case y.invalid_return_type:
      n = "Invalid function return type";
      break;
    case y.invalid_date:
      n = "Invalid date";
      break;
    case y.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (n = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? n = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? n = `Invalid input: must end with "${t.validation.endsWith}"` : V.assertNever(t.validation) : t.validation !== "regex" ? n = `Invalid ${t.validation}` : n = "Invalid";
      break;
    case y.too_small:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : n = "Invalid input";
      break;
    case y.too_big:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? n = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : n = "Invalid input";
      break;
    case y.custom:
      n = "Invalid input";
      break;
    case y.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case y.not_multiple_of:
      n = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case y.not_finite:
      n = "Number must be finite";
      break;
    default:
      n = e.defaultError, V.assertNever(t);
  }
  return { message: n };
};
let ln = it;
function ur(t) {
  ln = t;
}
function jt() {
  return ln;
}
const Lt = (t) => {
  const { data: e, path: n, errorMaps: r, issueData: s } = t, a = [...n, ...s.path || []], o = {
    ...s,
    path: a
  };
  if (s.message !== void 0)
    return {
      ...s,
      path: a,
      message: s.message
    };
  let d = "";
  const k = r.filter((f) => !!f).slice().reverse();
  for (const f of k)
    d = f(o, { data: e, defaultError: d }).message;
  return {
    ...s,
    path: a,
    message: d
  };
}, cr = [];
function w(t, e) {
  const n = jt(), r = Lt({
    issueData: e,
    data: t.data,
    path: t.path,
    errorMaps: [
      t.common.contextualErrorMap,
      // contextual error map is first priority
      t.schemaErrorMap,
      // then schema-bound map if available
      n,
      // then global override map
      n === it ? void 0 : it
      // then global default map
    ].filter((s) => !!s)
  });
  t.common.issues.push(r);
}
class ue {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, n) {
    const r = [];
    for (const s of n) {
      if (s.status === "aborted")
        return L;
      s.status === "dirty" && e.dirty(), r.push(s.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, n) {
    const r = [];
    for (const s of n) {
      const a = await s.key, o = await s.value;
      r.push({
        key: a,
        value: o
      });
    }
    return ue.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, n) {
    const r = {};
    for (const s of n) {
      const { key: a, value: o } = s;
      if (a.status === "aborted" || o.status === "aborted")
        return L;
      a.status === "dirty" && e.dirty(), o.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof o.value < "u" || s.alwaysSet) && (r[a.value] = o.value);
    }
    return { status: e.value, value: r };
  }
}
const L = Object.freeze({
  status: "aborted"
}), st = (t) => ({ status: "dirty", value: t }), de = (t) => ({ status: "valid", value: t }), Yt = (t) => t.status === "aborted", qt = (t) => t.status === "dirty", Ke = (t) => t.status === "valid", gt = (t) => typeof Promise < "u" && t instanceof Promise;
function $t(t, e, n, r) {
  if (typeof e == "function" ? t !== e || !0 : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e.get(t);
}
function fn(t, e, n, r, s) {
  if (typeof e == "function" ? t !== e || !0 : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return e.set(t, n), n;
}
var C;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(C || (C = {}));
var ht, pt;
class Ae {
  constructor(e, n, r, s) {
    this._cachedPath = [], this.parent = e, this.data = n, this._path = r, this._key = s;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const an = (t, e) => {
  if (Ke(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const n = new me(t.common.issues);
      return this._error = n, this._error;
    }
  };
};
function Z(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: n, required_error: r, description: s } = t;
  if (e && (n || r))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: s } : { errorMap: (o, d) => {
    var k, f;
    const { message: T } = t;
    return o.code === "invalid_enum_value" ? { message: T ?? d.defaultError } : typeof d.data > "u" ? { message: (k = T ?? r) !== null && k !== void 0 ? k : d.defaultError } : o.code !== "invalid_type" ? { message: d.defaultError } : { message: (f = T ?? n) !== null && f !== void 0 ? f : d.defaultError };
  }, description: s };
}
class P {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return Le(e.data);
  }
  _getOrReturnCtx(e, n) {
    return n || {
      common: e.parent.common,
      data: e.data,
      parsedType: Le(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new ue(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: Le(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const n = this._parse(e);
    if (gt(n))
      throw new Error("Synchronous parse encountered promise.");
    return n;
  }
  _parseAsync(e) {
    const n = this._parse(e);
    return Promise.resolve(n);
  }
  parse(e, n) {
    const r = this.safeParse(e, n);
    if (r.success)
      return r.data;
    throw r.error;
  }
  safeParse(e, n) {
    var r;
    const s = {
      common: {
        issues: [],
        async: (r = n == null ? void 0 : n.async) !== null && r !== void 0 ? r : !1,
        contextualErrorMap: n == null ? void 0 : n.errorMap
      },
      path: (n == null ? void 0 : n.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Le(e)
    }, a = this._parseSync({ data: e, path: s.path, parent: s });
    return an(s, a);
  }
  "~validate"(e) {
    var n, r;
    const s = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Le(e)
    };
    if (!this["~standard"].async)
      try {
        const a = this._parseSync({ data: e, path: [], parent: s });
        return Ke(a) ? {
          value: a.value
        } : {
          issues: s.common.issues
        };
      } catch (a) {
        !((r = (n = a == null ? void 0 : a.message) === null || n === void 0 ? void 0 : n.toLowerCase()) === null || r === void 0) && r.includes("encountered") && (this["~standard"].async = !0), s.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: s }).then((a) => Ke(a) ? {
      value: a.value
    } : {
      issues: s.common.issues
    });
  }
  async parseAsync(e, n) {
    const r = await this.safeParseAsync(e, n);
    if (r.success)
      return r.data;
    throw r.error;
  }
  async safeParseAsync(e, n) {
    const r = {
      common: {
        issues: [],
        contextualErrorMap: n == null ? void 0 : n.errorMap,
        async: !0
      },
      path: (n == null ? void 0 : n.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Le(e)
    }, s = this._parse({ data: e, path: r.path, parent: r }), a = await (gt(s) ? s : Promise.resolve(s));
    return an(r, a);
  }
  refine(e, n) {
    const r = (s) => typeof n == "string" || typeof n > "u" ? { message: n } : typeof n == "function" ? n(s) : n;
    return this._refinement((s, a) => {
      const o = e(s), d = () => a.addIssue({
        code: y.custom,
        ...r(s)
      });
      return typeof Promise < "u" && o instanceof Promise ? o.then((k) => k ? !0 : (d(), !1)) : o ? !0 : (d(), !1);
    });
  }
  refinement(e, n) {
    return this._refinement((r, s) => e(r) ? !0 : (s.addIssue(typeof n == "function" ? n(r, s) : n), !1));
  }
  _refinement(e) {
    return new ke({
      schema: this,
      typeName: j.ZodEffects,
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
      validate: (n) => this["~validate"](n)
    };
  }
  optional() {
    return Ee.create(this, this._def);
  }
  nullable() {
    return Be.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return xe.create(this);
  }
  promise() {
    return ut.create(this, this._def);
  }
  or(e) {
    return bt.create([this, e], this._def);
  }
  and(e) {
    return xt.create(this, e, this._def);
  }
  transform(e) {
    return new ke({
      ...Z(this._def),
      schema: this,
      typeName: j.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const n = typeof e == "function" ? e : () => e;
    return new Ot({
      ...Z(this._def),
      innerType: this,
      defaultValue: n,
      typeName: j.ZodDefault
    });
  }
  brand() {
    return new Qt({
      typeName: j.ZodBranded,
      type: this,
      ...Z(this._def)
    });
  }
  catch(e) {
    const n = typeof e == "function" ? e : () => e;
    return new Et({
      ...Z(this._def),
      innerType: this,
      catchValue: n,
      typeName: j.ZodCatch
    });
  }
  describe(e) {
    const n = this.constructor;
    return new n({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return Rt.create(this, e);
  }
  readonly() {
    return At.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const dr = /^c[^\s-]{8,}$/i, lr = /^[0-9a-z]+$/, fr = /^[0-9A-HJKMNP-TV-Z]{26}$/i, hr = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, pr = /^[a-z0-9_-]{21}$/i, mr = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, gr = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, yr = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, _r = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Ht;
const vr = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, br = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, xr = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, kr = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, wr = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Sr = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, hn = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Tr = new RegExp(`^${hn}$`);
function pn(t) {
  let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`), e;
}
function Or(t) {
  return new RegExp(`^${pn(t)}$`);
}
function mn(t) {
  let e = `${hn}T${pn(t)}`;
  const n = [];
  return n.push(t.local ? "Z?" : "Z"), t.offset && n.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${n.join("|")})`, new RegExp(`^${e}$`);
}
function Er(t, e) {
  return !!((e === "v4" || !e) && vr.test(t) || (e === "v6" || !e) && xr.test(t));
}
function Ar(t, e) {
  if (!mr.test(t))
    return !1;
  try {
    const [n] = t.split("."), r = n.replace(/-/g, "+").replace(/_/g, "/").padEnd(n.length + (4 - n.length % 4) % 4, "="), s = JSON.parse(atob(r));
    return !(typeof s != "object" || s === null || !s.typ || !s.alg || e && s.alg !== e);
  } catch {
    return !1;
  }
}
function Cr(t, e) {
  return !!((e === "v4" || !e) && br.test(t) || (e === "v6" || !e) && kr.test(t));
}
class be extends P {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== O.string) {
      const a = this._getOrReturnCtx(e);
      return w(a, {
        code: y.invalid_type,
        expected: O.string,
        received: a.parsedType
      }), L;
    }
    const r = new ue();
    let s;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (s = this._getOrReturnCtx(e, s), w(s, {
          code: y.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), r.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (s = this._getOrReturnCtx(e, s), w(s, {
          code: y.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), r.dirty());
      else if (a.kind === "length") {
        const o = e.data.length > a.value, d = e.data.length < a.value;
        (o || d) && (s = this._getOrReturnCtx(e, s), o ? w(s, {
          code: y.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : d && w(s, {
          code: y.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), r.dirty());
      } else if (a.kind === "email")
        yr.test(e.data) || (s = this._getOrReturnCtx(e, s), w(s, {
          validation: "email",
          code: y.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "emoji")
        Ht || (Ht = new RegExp(_r, "u")), Ht.test(e.data) || (s = this._getOrReturnCtx(e, s), w(s, {
          validation: "emoji",
          code: y.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "uuid")
        hr.test(e.data) || (s = this._getOrReturnCtx(e, s), w(s, {
          validation: "uuid",
          code: y.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "nanoid")
        pr.test(e.data) || (s = this._getOrReturnCtx(e, s), w(s, {
          validation: "nanoid",
          code: y.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "cuid")
        dr.test(e.data) || (s = this._getOrReturnCtx(e, s), w(s, {
          validation: "cuid",
          code: y.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "cuid2")
        lr.test(e.data) || (s = this._getOrReturnCtx(e, s), w(s, {
          validation: "cuid2",
          code: y.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "ulid")
        fr.test(e.data) || (s = this._getOrReturnCtx(e, s), w(s, {
          validation: "ulid",
          code: y.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), w(s, {
            validation: "url",
            code: y.invalid_string,
            message: a.message
          }), r.dirty();
        }
      else a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), w(s, {
        validation: "regex",
        code: y.invalid_string,
        message: a.message
      }), r.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (s = this._getOrReturnCtx(e, s), w(s, {
        code: y.invalid_string,
        validation: { includes: a.value, position: a.position },
        message: a.message
      }), r.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (s = this._getOrReturnCtx(e, s), w(s, {
        code: y.invalid_string,
        validation: { startsWith: a.value },
        message: a.message
      }), r.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (s = this._getOrReturnCtx(e, s), w(s, {
        code: y.invalid_string,
        validation: { endsWith: a.value },
        message: a.message
      }), r.dirty()) : a.kind === "datetime" ? mn(a).test(e.data) || (s = this._getOrReturnCtx(e, s), w(s, {
        code: y.invalid_string,
        validation: "datetime",
        message: a.message
      }), r.dirty()) : a.kind === "date" ? Tr.test(e.data) || (s = this._getOrReturnCtx(e, s), w(s, {
        code: y.invalid_string,
        validation: "date",
        message: a.message
      }), r.dirty()) : a.kind === "time" ? Or(a).test(e.data) || (s = this._getOrReturnCtx(e, s), w(s, {
        code: y.invalid_string,
        validation: "time",
        message: a.message
      }), r.dirty()) : a.kind === "duration" ? gr.test(e.data) || (s = this._getOrReturnCtx(e, s), w(s, {
        validation: "duration",
        code: y.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "ip" ? Er(e.data, a.version) || (s = this._getOrReturnCtx(e, s), w(s, {
        validation: "ip",
        code: y.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "jwt" ? Ar(e.data, a.alg) || (s = this._getOrReturnCtx(e, s), w(s, {
        validation: "jwt",
        code: y.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "cidr" ? Cr(e.data, a.version) || (s = this._getOrReturnCtx(e, s), w(s, {
        validation: "cidr",
        code: y.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "base64" ? wr.test(e.data) || (s = this._getOrReturnCtx(e, s), w(s, {
        validation: "base64",
        code: y.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "base64url" ? Sr.test(e.data) || (s = this._getOrReturnCtx(e, s), w(s, {
        validation: "base64url",
        code: y.invalid_string,
        message: a.message
      }), r.dirty()) : V.assertNever(a);
    return { status: r.value, value: e.data };
  }
  _regex(e, n, r) {
    return this.refinement((s) => e.test(s), {
      validation: n,
      code: y.invalid_string,
      ...C.errToObj(r)
    });
  }
  _addCheck(e) {
    return new be({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...C.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...C.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...C.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...C.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...C.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...C.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...C.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...C.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...C.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...C.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...C.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...C.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...C.errToObj(e) });
  }
  datetime(e) {
    var n, r;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (n = e == null ? void 0 : e.offset) !== null && n !== void 0 ? n : !1,
      local: (r = e == null ? void 0 : e.local) !== null && r !== void 0 ? r : !1,
      ...C.errToObj(e == null ? void 0 : e.message)
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
      ...C.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...C.errToObj(e) });
  }
  regex(e, n) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...C.errToObj(n)
    });
  }
  includes(e, n) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: n == null ? void 0 : n.position,
      ...C.errToObj(n == null ? void 0 : n.message)
    });
  }
  startsWith(e, n) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...C.errToObj(n)
    });
  }
  endsWith(e, n) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...C.errToObj(n)
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...C.errToObj(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...C.errToObj(n)
    });
  }
  length(e, n) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...C.errToObj(n)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, C.errToObj(e));
  }
  trim() {
    return new be({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new be({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new be({
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
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
}
be.create = (t) => {
  var e;
  return new be({
    checks: [],
    typeName: j.ZodString,
    coerce: (e = t == null ? void 0 : t.coerce) !== null && e !== void 0 ? e : !1,
    ...Z(t)
  });
};
function Rr(t, e) {
  const n = (t.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, s = n > r ? n : r, a = parseInt(t.toFixed(s).replace(".", "")), o = parseInt(e.toFixed(s).replace(".", ""));
  return a % o / Math.pow(10, s);
}
class Ne extends P {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== O.number) {
      const a = this._getOrReturnCtx(e);
      return w(a, {
        code: y.invalid_type,
        expected: O.number,
        received: a.parsedType
      }), L;
    }
    let r;
    const s = new ue();
    for (const a of this._def.checks)
      a.kind === "int" ? V.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), w(r, {
        code: y.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), s.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (r = this._getOrReturnCtx(e, r), w(r, {
        code: y.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (r = this._getOrReturnCtx(e, r), w(r, {
        code: y.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? Rr(e.data, a.value) !== 0 && (r = this._getOrReturnCtx(e, r), w(r, {
        code: y.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), w(r, {
        code: y.not_finite,
        message: a.message
      }), s.dirty()) : V.assertNever(a);
    return { status: s.value, value: e.data };
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, C.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, C.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, C.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, C.toString(n));
  }
  setLimit(e, n, r, s) {
    return new Ne({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: C.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Ne({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: C.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: C.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: C.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: C.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: C.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: C.toString(n)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: C.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: C.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: C.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && V.isInteger(e.value));
  }
  get isFinite() {
    let e = null, n = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
        return !0;
      r.kind === "min" ? (n === null || r.value > n) && (n = r.value) : r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    }
    return Number.isFinite(n) && Number.isFinite(e);
  }
}
Ne.create = (t) => new Ne({
  checks: [],
  typeName: j.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...Z(t)
});
class Pe extends P {
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
    if (this._getType(e) !== O.bigint)
      return this._getInvalidInput(e);
    let r;
    const s = new ue();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (r = this._getOrReturnCtx(e, r), w(r, {
        code: y.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (r = this._getOrReturnCtx(e, r), w(r, {
        code: y.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), w(r, {
        code: y.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : V.assertNever(a);
    return { status: s.value, value: e.data };
  }
  _getInvalidInput(e) {
    const n = this._getOrReturnCtx(e);
    return w(n, {
      code: y.invalid_type,
      expected: O.bigint,
      received: n.parsedType
    }), L;
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, C.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, C.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, C.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, C.toString(n));
  }
  setLimit(e, n, r, s) {
    return new Pe({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: C.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Pe({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: C.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: C.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: C.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: C.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: C.toString(n)
    });
  }
  get minValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
}
Pe.create = (t) => {
  var e;
  return new Pe({
    checks: [],
    typeName: j.ZodBigInt,
    coerce: (e = t == null ? void 0 : t.coerce) !== null && e !== void 0 ? e : !1,
    ...Z(t)
  });
};
class yt extends P {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== O.boolean) {
      const r = this._getOrReturnCtx(e);
      return w(r, {
        code: y.invalid_type,
        expected: O.boolean,
        received: r.parsedType
      }), L;
    }
    return de(e.data);
  }
}
yt.create = (t) => new yt({
  typeName: j.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...Z(t)
});
class Ge extends P {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== O.date) {
      const a = this._getOrReturnCtx(e);
      return w(a, {
        code: y.invalid_type,
        expected: O.date,
        received: a.parsedType
      }), L;
    }
    if (isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return w(a, {
        code: y.invalid_date
      }), L;
    }
    const r = new ue();
    let s;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (s = this._getOrReturnCtx(e, s), w(s, {
        code: y.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), r.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (s = this._getOrReturnCtx(e, s), w(s, {
        code: y.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), r.dirty()) : V.assertNever(a);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new Ge({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: C.toString(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: C.toString(n)
    });
  }
  get minDate() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e != null ? new Date(e) : null;
  }
}
Ge.create = (t) => new Ge({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: j.ZodDate,
  ...Z(t)
});
class Zt extends P {
  _parse(e) {
    if (this._getType(e) !== O.symbol) {
      const r = this._getOrReturnCtx(e);
      return w(r, {
        code: y.invalid_type,
        expected: O.symbol,
        received: r.parsedType
      }), L;
    }
    return de(e.data);
  }
}
Zt.create = (t) => new Zt({
  typeName: j.ZodSymbol,
  ...Z(t)
});
class _t extends P {
  _parse(e) {
    if (this._getType(e) !== O.undefined) {
      const r = this._getOrReturnCtx(e);
      return w(r, {
        code: y.invalid_type,
        expected: O.undefined,
        received: r.parsedType
      }), L;
    }
    return de(e.data);
  }
}
_t.create = (t) => new _t({
  typeName: j.ZodUndefined,
  ...Z(t)
});
class vt extends P {
  _parse(e) {
    if (this._getType(e) !== O.null) {
      const r = this._getOrReturnCtx(e);
      return w(r, {
        code: y.invalid_type,
        expected: O.null,
        received: r.parsedType
      }), L;
    }
    return de(e.data);
  }
}
vt.create = (t) => new vt({
  typeName: j.ZodNull,
  ...Z(t)
});
class ot extends P {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return de(e.data);
  }
}
ot.create = (t) => new ot({
  typeName: j.ZodAny,
  ...Z(t)
});
class qe extends P {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return de(e.data);
  }
}
qe.create = (t) => new qe({
  typeName: j.ZodUnknown,
  ...Z(t)
});
class $e extends P {
  _parse(e) {
    const n = this._getOrReturnCtx(e);
    return w(n, {
      code: y.invalid_type,
      expected: O.never,
      received: n.parsedType
    }), L;
  }
}
$e.create = (t) => new $e({
  typeName: j.ZodNever,
  ...Z(t)
});
class Mt extends P {
  _parse(e) {
    if (this._getType(e) !== O.undefined) {
      const r = this._getOrReturnCtx(e);
      return w(r, {
        code: y.invalid_type,
        expected: O.void,
        received: r.parsedType
      }), L;
    }
    return de(e.data);
  }
}
Mt.create = (t) => new Mt({
  typeName: j.ZodVoid,
  ...Z(t)
});
class xe extends P {
  _parse(e) {
    const { ctx: n, status: r } = this._processInputParams(e), s = this._def;
    if (n.parsedType !== O.array)
      return w(n, {
        code: y.invalid_type,
        expected: O.array,
        received: n.parsedType
      }), L;
    if (s.exactLength !== null) {
      const o = n.data.length > s.exactLength.value, d = n.data.length < s.exactLength.value;
      (o || d) && (w(n, {
        code: o ? y.too_big : y.too_small,
        minimum: d ? s.exactLength.value : void 0,
        maximum: o ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), r.dirty());
    }
    if (s.minLength !== null && n.data.length < s.minLength.value && (w(n, {
      code: y.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), r.dirty()), s.maxLength !== null && n.data.length > s.maxLength.value && (w(n, {
      code: y.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), r.dirty()), n.common.async)
      return Promise.all([...n.data].map((o, d) => s.type._parseAsync(new Ae(n, o, n.path, d)))).then((o) => ue.mergeArray(r, o));
    const a = [...n.data].map((o, d) => s.type._parseSync(new Ae(n, o, n.path, d)));
    return ue.mergeArray(r, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, n) {
    return new xe({
      ...this._def,
      minLength: { value: e, message: C.toString(n) }
    });
  }
  max(e, n) {
    return new xe({
      ...this._def,
      maxLength: { value: e, message: C.toString(n) }
    });
  }
  length(e, n) {
    return new xe({
      ...this._def,
      exactLength: { value: e, message: C.toString(n) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
xe.create = (t, e) => new xe({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: j.ZodArray,
  ...Z(e)
});
function rt(t) {
  if (t instanceof re) {
    const e = {};
    for (const n in t.shape) {
      const r = t.shape[n];
      e[n] = Ee.create(rt(r));
    }
    return new re({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof xe ? new xe({
    ...t._def,
    type: rt(t.element)
  }) : t instanceof Ee ? Ee.create(rt(t.unwrap())) : t instanceof Be ? Be.create(rt(t.unwrap())) : t instanceof Ce ? Ce.create(t.items.map((e) => rt(e))) : t;
}
class re extends P {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), n = V.objectKeys(e);
    return this._cached = { shape: e, keys: n };
  }
  _parse(e) {
    if (this._getType(e) !== O.object) {
      const f = this._getOrReturnCtx(e);
      return w(f, {
        code: y.invalid_type,
        expected: O.object,
        received: f.parsedType
      }), L;
    }
    const { status: r, ctx: s } = this._processInputParams(e), { shape: a, keys: o } = this._getCached(), d = [];
    if (!(this._def.catchall instanceof $e && this._def.unknownKeys === "strip"))
      for (const f in s.data)
        o.includes(f) || d.push(f);
    const k = [];
    for (const f of o) {
      const T = a[f], H = s.data[f];
      k.push({
        key: { status: "valid", value: f },
        value: T._parse(new Ae(s, H, s.path, f)),
        alwaysSet: f in s.data
      });
    }
    if (this._def.catchall instanceof $e) {
      const f = this._def.unknownKeys;
      if (f === "passthrough")
        for (const T of d)
          k.push({
            key: { status: "valid", value: T },
            value: { status: "valid", value: s.data[T] }
          });
      else if (f === "strict")
        d.length > 0 && (w(s, {
          code: y.unrecognized_keys,
          keys: d
        }), r.dirty());
      else if (f !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const f = this._def.catchall;
      for (const T of d) {
        const H = s.data[T];
        k.push({
          key: { status: "valid", value: T },
          value: f._parse(
            new Ae(s, H, s.path, T)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: T in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const f = [];
      for (const T of k) {
        const H = await T.key, le = await T.value;
        f.push({
          key: H,
          value: le,
          alwaysSet: T.alwaysSet
        });
      }
      return f;
    }).then((f) => ue.mergeObjectSync(r, f)) : ue.mergeObjectSync(r, k);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return C.errToObj, new re({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (n, r) => {
          var s, a, o, d;
          const k = (o = (a = (s = this._def).errorMap) === null || a === void 0 ? void 0 : a.call(s, n, r).message) !== null && o !== void 0 ? o : r.defaultError;
          return n.code === "unrecognized_keys" ? {
            message: (d = C.errToObj(e).message) !== null && d !== void 0 ? d : k
          } : {
            message: k
          };
        }
      } : {}
    });
  }
  strip() {
    return new re({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new re({
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
    return new re({
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
    return new re({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: j.ZodObject
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
  setKey(e, n) {
    return this.augment({ [e]: n });
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
    return new re({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const n = {};
    return V.objectKeys(e).forEach((r) => {
      e[r] && this.shape[r] && (n[r] = this.shape[r]);
    }), new re({
      ...this._def,
      shape: () => n
    });
  }
  omit(e) {
    const n = {};
    return V.objectKeys(this.shape).forEach((r) => {
      e[r] || (n[r] = this.shape[r]);
    }), new re({
      ...this._def,
      shape: () => n
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return rt(this);
  }
  partial(e) {
    const n = {};
    return V.objectKeys(this.shape).forEach((r) => {
      const s = this.shape[r];
      e && !e[r] ? n[r] = s : n[r] = s.optional();
    }), new re({
      ...this._def,
      shape: () => n
    });
  }
  required(e) {
    const n = {};
    return V.objectKeys(this.shape).forEach((r) => {
      if (e && !e[r])
        n[r] = this.shape[r];
      else {
        let a = this.shape[r];
        for (; a instanceof Ee; )
          a = a._def.innerType;
        n[r] = a;
      }
    }), new re({
      ...this._def,
      shape: () => n
    });
  }
  keyof() {
    return gn(V.objectKeys(this.shape));
  }
}
re.create = (t, e) => new re({
  shape: () => t,
  unknownKeys: "strip",
  catchall: $e.create(),
  typeName: j.ZodObject,
  ...Z(e)
});
re.strictCreate = (t, e) => new re({
  shape: () => t,
  unknownKeys: "strict",
  catchall: $e.create(),
  typeName: j.ZodObject,
  ...Z(e)
});
re.lazycreate = (t, e) => new re({
  shape: t,
  unknownKeys: "strip",
  catchall: $e.create(),
  typeName: j.ZodObject,
  ...Z(e)
});
class bt extends P {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = this._def.options;
    function s(a) {
      for (const d of a)
        if (d.result.status === "valid")
          return d.result;
      for (const d of a)
        if (d.result.status === "dirty")
          return n.common.issues.push(...d.ctx.common.issues), d.result;
      const o = a.map((d) => new me(d.ctx.common.issues));
      return w(n, {
        code: y.invalid_union,
        unionErrors: o
      }), L;
    }
    if (n.common.async)
      return Promise.all(r.map(async (a) => {
        const o = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: n.data,
            path: n.path,
            parent: o
          }),
          ctx: o
        };
      })).then(s);
    {
      let a;
      const o = [];
      for (const k of r) {
        const f = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        }, T = k._parseSync({
          data: n.data,
          path: n.path,
          parent: f
        });
        if (T.status === "valid")
          return T;
        T.status === "dirty" && !a && (a = { result: T, ctx: f }), f.common.issues.length && o.push(f.common.issues);
      }
      if (a)
        return n.common.issues.push(...a.ctx.common.issues), a.result;
      const d = o.map((k) => new me(k));
      return w(n, {
        code: y.invalid_union,
        unionErrors: d
      }), L;
    }
  }
  get options() {
    return this._def.options;
  }
}
bt.create = (t, e) => new bt({
  options: t,
  typeName: j.ZodUnion,
  ...Z(e)
});
const De = (t) => t instanceof wt ? De(t.schema) : t instanceof ke ? De(t.innerType()) : t instanceof St ? [t.value] : t instanceof ze ? t.options : t instanceof Tt ? V.objectValues(t.enum) : t instanceof Ot ? De(t._def.innerType) : t instanceof _t ? [void 0] : t instanceof vt ? [null] : t instanceof Ee ? [void 0, ...De(t.unwrap())] : t instanceof Be ? [null, ...De(t.unwrap())] : t instanceof Qt || t instanceof At ? De(t.unwrap()) : t instanceof Et ? De(t._def.innerType) : [];
class Bt extends P {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== O.object)
      return w(n, {
        code: y.invalid_type,
        expected: O.object,
        received: n.parsedType
      }), L;
    const r = this.discriminator, s = n.data[r], a = this.optionsMap.get(s);
    return a ? n.common.async ? a._parseAsync({
      data: n.data,
      path: n.path,
      parent: n
    }) : a._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }) : (w(n, {
      code: y.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [r]
    }), L);
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
  static create(e, n, r) {
    const s = /* @__PURE__ */ new Map();
    for (const a of n) {
      const o = De(a.shape[e]);
      if (!o.length)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const d of o) {
        if (s.has(d))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(d)}`);
        s.set(d, a);
      }
    }
    return new Bt({
      typeName: j.ZodDiscriminatedUnion,
      discriminator: e,
      options: n,
      optionsMap: s,
      ...Z(r)
    });
  }
}
function Kt(t, e) {
  const n = Le(t), r = Le(e);
  if (t === e)
    return { valid: !0, data: t };
  if (n === O.object && r === O.object) {
    const s = V.objectKeys(e), a = V.objectKeys(t).filter((d) => s.indexOf(d) !== -1), o = { ...t, ...e };
    for (const d of a) {
      const k = Kt(t[d], e[d]);
      if (!k.valid)
        return { valid: !1 };
      o[d] = k.data;
    }
    return { valid: !0, data: o };
  } else if (n === O.array && r === O.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let a = 0; a < t.length; a++) {
      const o = t[a], d = e[a], k = Kt(o, d);
      if (!k.valid)
        return { valid: !1 };
      s.push(k.data);
    }
    return { valid: !0, data: s };
  } else return n === O.date && r === O.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class xt extends P {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), s = (a, o) => {
      if (Yt(a) || Yt(o))
        return L;
      const d = Kt(a.value, o.value);
      return d.valid ? ((qt(a) || qt(o)) && n.dirty(), { status: n.value, value: d.data }) : (w(r, {
        code: y.invalid_intersection_types
      }), L);
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
xt.create = (t, e, n) => new xt({
  left: t,
  right: e,
  typeName: j.ZodIntersection,
  ...Z(n)
});
class Ce extends P {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== O.array)
      return w(r, {
        code: y.invalid_type,
        expected: O.array,
        received: r.parsedType
      }), L;
    if (r.data.length < this._def.items.length)
      return w(r, {
        code: y.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), L;
    !this._def.rest && r.data.length > this._def.items.length && (w(r, {
      code: y.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), n.dirty());
    const a = [...r.data].map((o, d) => {
      const k = this._def.items[d] || this._def.rest;
      return k ? k._parse(new Ae(r, o, r.path, d)) : null;
    }).filter((o) => !!o);
    return r.common.async ? Promise.all(a).then((o) => ue.mergeArray(n, o)) : ue.mergeArray(n, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new Ce({
      ...this._def,
      rest: e
    });
  }
}
Ce.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Ce({
    items: t,
    typeName: j.ZodTuple,
    rest: null,
    ...Z(e)
  });
};
class kt extends P {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== O.object)
      return w(r, {
        code: y.invalid_type,
        expected: O.object,
        received: r.parsedType
      }), L;
    const s = [], a = this._def.keyType, o = this._def.valueType;
    for (const d in r.data)
      s.push({
        key: a._parse(new Ae(r, d, r.path, d)),
        value: o._parse(new Ae(r, r.data[d], r.path, d)),
        alwaysSet: d in r.data
      });
    return r.common.async ? ue.mergeObjectAsync(n, s) : ue.mergeObjectSync(n, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, n, r) {
    return n instanceof P ? new kt({
      keyType: e,
      valueType: n,
      typeName: j.ZodRecord,
      ...Z(r)
    }) : new kt({
      keyType: be.create(),
      valueType: e,
      typeName: j.ZodRecord,
      ...Z(n)
    });
  }
}
class Nt extends P {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== O.map)
      return w(r, {
        code: y.invalid_type,
        expected: O.map,
        received: r.parsedType
      }), L;
    const s = this._def.keyType, a = this._def.valueType, o = [...r.data.entries()].map(([d, k], f) => ({
      key: s._parse(new Ae(r, d, r.path, [f, "key"])),
      value: a._parse(new Ae(r, k, r.path, [f, "value"]))
    }));
    if (r.common.async) {
      const d = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const k of o) {
          const f = await k.key, T = await k.value;
          if (f.status === "aborted" || T.status === "aborted")
            return L;
          (f.status === "dirty" || T.status === "dirty") && n.dirty(), d.set(f.value, T.value);
        }
        return { status: n.value, value: d };
      });
    } else {
      const d = /* @__PURE__ */ new Map();
      for (const k of o) {
        const f = k.key, T = k.value;
        if (f.status === "aborted" || T.status === "aborted")
          return L;
        (f.status === "dirty" || T.status === "dirty") && n.dirty(), d.set(f.value, T.value);
      }
      return { status: n.value, value: d };
    }
  }
}
Nt.create = (t, e, n) => new Nt({
  valueType: e,
  keyType: t,
  typeName: j.ZodMap,
  ...Z(n)
});
class Je extends P {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== O.set)
      return w(r, {
        code: y.invalid_type,
        expected: O.set,
        received: r.parsedType
      }), L;
    const s = this._def;
    s.minSize !== null && r.data.size < s.minSize.value && (w(r, {
      code: y.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), n.dirty()), s.maxSize !== null && r.data.size > s.maxSize.value && (w(r, {
      code: y.too_big,
      maximum: s.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.maxSize.message
    }), n.dirty());
    const a = this._def.valueType;
    function o(k) {
      const f = /* @__PURE__ */ new Set();
      for (const T of k) {
        if (T.status === "aborted")
          return L;
        T.status === "dirty" && n.dirty(), f.add(T.value);
      }
      return { status: n.value, value: f };
    }
    const d = [...r.data.values()].map((k, f) => a._parse(new Ae(r, k, r.path, f)));
    return r.common.async ? Promise.all(d).then((k) => o(k)) : o(d);
  }
  min(e, n) {
    return new Je({
      ...this._def,
      minSize: { value: e, message: C.toString(n) }
    });
  }
  max(e, n) {
    return new Je({
      ...this._def,
      maxSize: { value: e, message: C.toString(n) }
    });
  }
  size(e, n) {
    return this.min(e, n).max(e, n);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Je.create = (t, e) => new Je({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: j.ZodSet,
  ...Z(e)
});
class at extends P {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== O.function)
      return w(n, {
        code: y.invalid_type,
        expected: O.function,
        received: n.parsedType
      }), L;
    function r(d, k) {
      return Lt({
        data: d,
        path: n.path,
        errorMaps: [
          n.common.contextualErrorMap,
          n.schemaErrorMap,
          jt(),
          it
        ].filter((f) => !!f),
        issueData: {
          code: y.invalid_arguments,
          argumentsError: k
        }
      });
    }
    function s(d, k) {
      return Lt({
        data: d,
        path: n.path,
        errorMaps: [
          n.common.contextualErrorMap,
          n.schemaErrorMap,
          jt(),
          it
        ].filter((f) => !!f),
        issueData: {
          code: y.invalid_return_type,
          returnTypeError: k
        }
      });
    }
    const a = { errorMap: n.common.contextualErrorMap }, o = n.data;
    if (this._def.returns instanceof ut) {
      const d = this;
      return de(async function(...k) {
        const f = new me([]), T = await d._def.args.parseAsync(k, a).catch((W) => {
          throw f.addIssue(r(k, W)), f;
        }), H = await Reflect.apply(o, this, T);
        return await d._def.returns._def.type.parseAsync(H, a).catch((W) => {
          throw f.addIssue(s(H, W)), f;
        });
      });
    } else {
      const d = this;
      return de(function(...k) {
        const f = d._def.args.safeParse(k, a);
        if (!f.success)
          throw new me([r(k, f.error)]);
        const T = Reflect.apply(o, this, f.data), H = d._def.returns.safeParse(T, a);
        if (!H.success)
          throw new me([s(T, H.error)]);
        return H.data;
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
    return new at({
      ...this._def,
      args: Ce.create(e).rest(qe.create())
    });
  }
  returns(e) {
    return new at({
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
  static create(e, n, r) {
    return new at({
      args: e || Ce.create([]).rest(qe.create()),
      returns: n || qe.create(),
      typeName: j.ZodFunction,
      ...Z(r)
    });
  }
}
class wt extends P {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
wt.create = (t, e) => new wt({
  getter: t,
  typeName: j.ZodLazy,
  ...Z(e)
});
class St extends P {
  _parse(e) {
    if (e.data !== this._def.value) {
      const n = this._getOrReturnCtx(e);
      return w(n, {
        received: n.data,
        code: y.invalid_literal,
        expected: this._def.value
      }), L;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
St.create = (t, e) => new St({
  value: t,
  typeName: j.ZodLiteral,
  ...Z(e)
});
function gn(t, e) {
  return new ze({
    values: t,
    typeName: j.ZodEnum,
    ...Z(e)
  });
}
class ze extends P {
  constructor() {
    super(...arguments), ht.set(this, void 0);
  }
  _parse(e) {
    if (typeof e.data != "string") {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return w(n, {
        expected: V.joinValues(r),
        received: n.parsedType,
        code: y.invalid_type
      }), L;
    }
    if ($t(this, ht) || fn(this, ht, new Set(this._def.values)), !$t(this, ht).has(e.data)) {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return w(n, {
        received: n.data,
        code: y.invalid_enum_value,
        options: r
      }), L;
    }
    return de(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  get Values() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  get Enum() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  extract(e, n = this._def) {
    return ze.create(e, {
      ...this._def,
      ...n
    });
  }
  exclude(e, n = this._def) {
    return ze.create(this.options.filter((r) => !e.includes(r)), {
      ...this._def,
      ...n
    });
  }
}
ht = /* @__PURE__ */ new WeakMap();
ze.create = gn;
class Tt extends P {
  constructor() {
    super(...arguments), pt.set(this, void 0);
  }
  _parse(e) {
    const n = V.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== O.string && r.parsedType !== O.number) {
      const s = V.objectValues(n);
      return w(r, {
        expected: V.joinValues(s),
        received: r.parsedType,
        code: y.invalid_type
      }), L;
    }
    if ($t(this, pt) || fn(this, pt, new Set(V.getValidEnumValues(this._def.values))), !$t(this, pt).has(e.data)) {
      const s = V.objectValues(n);
      return w(r, {
        received: r.data,
        code: y.invalid_enum_value,
        options: s
      }), L;
    }
    return de(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
pt = /* @__PURE__ */ new WeakMap();
Tt.create = (t, e) => new Tt({
  values: t,
  typeName: j.ZodNativeEnum,
  ...Z(e)
});
class ut extends P {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== O.promise && n.common.async === !1)
      return w(n, {
        code: y.invalid_type,
        expected: O.promise,
        received: n.parsedType
      }), L;
    const r = n.parsedType === O.promise ? n.data : Promise.resolve(n.data);
    return de(r.then((s) => this._def.type.parseAsync(s, {
      path: n.path,
      errorMap: n.common.contextualErrorMap
    })));
  }
}
ut.create = (t, e) => new ut({
  type: t,
  typeName: j.ZodPromise,
  ...Z(e)
});
class ke extends P {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === j.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), s = this._def.effect || null, a = {
      addIssue: (o) => {
        w(r, o), o.fatal ? n.abort() : n.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), s.type === "preprocess") {
      const o = s.transform(r.data, a);
      if (r.common.async)
        return Promise.resolve(o).then(async (d) => {
          if (n.value === "aborted")
            return L;
          const k = await this._def.schema._parseAsync({
            data: d,
            path: r.path,
            parent: r
          });
          return k.status === "aborted" ? L : k.status === "dirty" || n.value === "dirty" ? st(k.value) : k;
        });
      {
        if (n.value === "aborted")
          return L;
        const d = this._def.schema._parseSync({
          data: o,
          path: r.path,
          parent: r
        });
        return d.status === "aborted" ? L : d.status === "dirty" || n.value === "dirty" ? st(d.value) : d;
      }
    }
    if (s.type === "refinement") {
      const o = (d) => {
        const k = s.refinement(d, a);
        if (r.common.async)
          return Promise.resolve(k);
        if (k instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return d;
      };
      if (r.common.async === !1) {
        const d = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return d.status === "aborted" ? L : (d.status === "dirty" && n.dirty(), o(d.value), { status: n.value, value: d.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((d) => d.status === "aborted" ? L : (d.status === "dirty" && n.dirty(), o(d.value).then(() => ({ status: n.value, value: d.value }))));
    }
    if (s.type === "transform")
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!Ke(o))
          return o;
        const d = s.transform(o.value, a);
        if (d instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: n.value, value: d };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => Ke(o) ? Promise.resolve(s.transform(o.value, a)).then((d) => ({ status: n.value, value: d })) : o);
    V.assertNever(s);
  }
}
ke.create = (t, e, n) => new ke({
  schema: t,
  typeName: j.ZodEffects,
  effect: e,
  ...Z(n)
});
ke.createWithPreprocess = (t, e, n) => new ke({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: j.ZodEffects,
  ...Z(n)
});
class Ee extends P {
  _parse(e) {
    return this._getType(e) === O.undefined ? de(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Ee.create = (t, e) => new Ee({
  innerType: t,
  typeName: j.ZodOptional,
  ...Z(e)
});
class Be extends P {
  _parse(e) {
    return this._getType(e) === O.null ? de(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Be.create = (t, e) => new Be({
  innerType: t,
  typeName: j.ZodNullable,
  ...Z(e)
});
class Ot extends P {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    let r = n.data;
    return n.parsedType === O.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
      data: r,
      path: n.path,
      parent: n
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Ot.create = (t, e) => new Ot({
  innerType: t,
  typeName: j.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...Z(e)
});
class Et extends P {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = {
      ...n,
      common: {
        ...n.common,
        issues: []
      }
    }, s = this._def.innerType._parse({
      data: r.data,
      path: r.path,
      parent: {
        ...r
      }
    });
    return gt(s) ? s.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new me(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new me(r.common.issues);
        },
        input: r.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Et.create = (t, e) => new Et({
  innerType: t,
  typeName: j.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...Z(e)
});
class Pt extends P {
  _parse(e) {
    if (this._getType(e) !== O.nan) {
      const r = this._getOrReturnCtx(e);
      return w(r, {
        code: y.invalid_type,
        expected: O.nan,
        received: r.parsedType
      }), L;
    }
    return { status: "valid", value: e.data };
  }
}
Pt.create = (t) => new Pt({
  typeName: j.ZodNaN,
  ...Z(t)
});
const Ir = Symbol("zod_brand");
class Qt extends P {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = n.data;
    return this._def.type._parse({
      data: r,
      path: n.path,
      parent: n
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class Rt extends P {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? L : a.status === "dirty" ? (n.dirty(), st(a.value)) : this._def.out._parseAsync({
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
      return s.status === "aborted" ? L : s.status === "dirty" ? (n.dirty(), {
        status: "dirty",
        value: s.value
      }) : this._def.out._parseSync({
        data: s.value,
        path: r.path,
        parent: r
      });
    }
  }
  static create(e, n) {
    return new Rt({
      in: e,
      out: n,
      typeName: j.ZodPipeline
    });
  }
}
class At extends P {
  _parse(e) {
    const n = this._def.innerType._parse(e), r = (s) => (Ke(s) && (s.value = Object.freeze(s.value)), s);
    return gt(n) ? n.then((s) => r(s)) : r(n);
  }
  unwrap() {
    return this._def.innerType;
  }
}
At.create = (t, e) => new At({
  innerType: t,
  typeName: j.ZodReadonly,
  ...Z(e)
});
function yn(t, e = {}, n) {
  return t ? ot.create().superRefine((r, s) => {
    var a, o;
    if (!t(r)) {
      const d = typeof e == "function" ? e(r) : typeof e == "string" ? { message: e } : e, k = (o = (a = d.fatal) !== null && a !== void 0 ? a : n) !== null && o !== void 0 ? o : !0, f = typeof d == "string" ? { message: d } : d;
      s.addIssue({ code: "custom", ...f, fatal: k });
    }
  }) : ot.create();
}
const Dr = {
  object: re.lazycreate
};
var j;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(j || (j = {}));
const jr = (t, e = {
  message: `Input not instance of ${t.name}`
}) => yn((n) => n instanceof t, e), _n = be.create, vn = Ne.create, Lr = Pt.create, $r = Pe.create, bn = yt.create, Zr = Ge.create, Mr = Zt.create, Nr = _t.create, Pr = vt.create, zr = ot.create, Br = qe.create, Ur = $e.create, Fr = Mt.create, Vr = xe.create, Hr = re.create, Wr = re.strictCreate, Yr = bt.create, qr = Bt.create, Kr = xt.create, Gr = Ce.create, Jr = kt.create, Xr = Nt.create, Qr = Je.create, es = at.create, ts = wt.create, ns = St.create, rs = ze.create, ss = Tt.create, as = ut.create, on = ke.create, is = Ee.create, os = Be.create, us = ke.createWithPreprocess, cs = Rt.create, ds = () => _n().optional(), ls = () => vn().optional(), fs = () => bn().optional(), hs = {
  string: (t) => be.create({ ...t, coerce: !0 }),
  number: (t) => Ne.create({ ...t, coerce: !0 }),
  boolean: (t) => yt.create({
    ...t,
    coerce: !0
  }),
  bigint: (t) => Pe.create({ ...t, coerce: !0 }),
  date: (t) => Ge.create({ ...t, coerce: !0 })
}, ps = L;
var i = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: it,
  setErrorMap: ur,
  getErrorMap: jt,
  makeIssue: Lt,
  EMPTY_PATH: cr,
  addIssueToContext: w,
  ParseStatus: ue,
  INVALID: L,
  DIRTY: st,
  OK: de,
  isAborted: Yt,
  isDirty: qt,
  isValid: Ke,
  isAsync: gt,
  get util() {
    return V;
  },
  get objectUtil() {
    return Wt;
  },
  ZodParsedType: O,
  getParsedType: Le,
  ZodType: P,
  datetimeRegex: mn,
  ZodString: be,
  ZodNumber: Ne,
  ZodBigInt: Pe,
  ZodBoolean: yt,
  ZodDate: Ge,
  ZodSymbol: Zt,
  ZodUndefined: _t,
  ZodNull: vt,
  ZodAny: ot,
  ZodUnknown: qe,
  ZodNever: $e,
  ZodVoid: Mt,
  ZodArray: xe,
  ZodObject: re,
  ZodUnion: bt,
  ZodDiscriminatedUnion: Bt,
  ZodIntersection: xt,
  ZodTuple: Ce,
  ZodRecord: kt,
  ZodMap: Nt,
  ZodSet: Je,
  ZodFunction: at,
  ZodLazy: wt,
  ZodLiteral: St,
  ZodEnum: ze,
  ZodNativeEnum: Tt,
  ZodPromise: ut,
  ZodEffects: ke,
  ZodTransformer: ke,
  ZodOptional: Ee,
  ZodNullable: Be,
  ZodDefault: Ot,
  ZodCatch: Et,
  ZodNaN: Pt,
  BRAND: Ir,
  ZodBranded: Qt,
  ZodPipeline: Rt,
  ZodReadonly: At,
  custom: yn,
  Schema: P,
  ZodSchema: P,
  late: Dr,
  get ZodFirstPartyTypeKind() {
    return j;
  },
  coerce: hs,
  any: zr,
  array: Vr,
  bigint: $r,
  boolean: bn,
  date: Zr,
  discriminatedUnion: qr,
  effect: on,
  enum: rs,
  function: es,
  instanceof: jr,
  intersection: Kr,
  lazy: ts,
  literal: ns,
  map: Xr,
  nan: Lr,
  nativeEnum: ss,
  never: Ur,
  null: Pr,
  nullable: os,
  number: vn,
  object: Hr,
  oboolean: fs,
  onumber: ls,
  optional: is,
  ostring: ds,
  pipeline: cs,
  preprocess: us,
  promise: as,
  record: Jr,
  set: Qr,
  strictObject: Wr,
  string: _n,
  symbol: Mr,
  transformer: on,
  tuple: Gr,
  undefined: Nr,
  union: Yr,
  unknown: Br,
  void: Fr,
  NEVER: ps,
  ZodIssueCode: y,
  quotelessJson: or,
  ZodError: me
});
const ms = i.object({ email: i.string().email() });
class $a extends te(ms) {
}
var zt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function gs(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Fe = {}, X = {}, Ve = {};
Object.defineProperty(Ve, "__esModule", { value: !0 });
Ve.anumber = Gt;
Ve.abytes = xn;
Ve.ahash = _s;
Ve.aexists = vs;
Ve.aoutput = bs;
function Gt(t) {
  if (!Number.isSafeInteger(t) || t < 0)
    throw new Error("positive integer expected, got " + t);
}
function ys(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function xn(t, ...e) {
  if (!ys(t))
    throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(t.length))
    throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
}
function _s(t) {
  if (typeof t != "function" || typeof t.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Gt(t.outputLen), Gt(t.blockLen);
}
function vs(t, e = !0) {
  if (t.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (e && t.finished)
    throw new Error("Hash#digest() has already been called");
}
function bs(t, e) {
  xn(t);
  const n = e.outputLen;
  if (t.length < n)
    throw new Error("digestInto() expects output buffer of length at least " + n);
}
var $ = {};
Object.defineProperty($, "__esModule", { value: !0 });
$.add5L = $.add5H = $.add4H = $.add4L = $.add3H = $.add3L = $.rotlBL = $.rotlBH = $.rotlSL = $.rotlSH = $.rotr32L = $.rotr32H = $.rotrBL = $.rotrBH = $.rotrSL = $.rotrSH = $.shrSL = $.shrSH = $.toBig = void 0;
$.fromBig = en;
$.split = kn;
$.add = Zn;
const Dt = /* @__PURE__ */ BigInt(2 ** 32 - 1), Jt = /* @__PURE__ */ BigInt(32);
function en(t, e = !1) {
  return e ? { h: Number(t & Dt), l: Number(t >> Jt & Dt) } : { h: Number(t >> Jt & Dt) | 0, l: Number(t & Dt) | 0 };
}
function kn(t, e = !1) {
  let n = new Uint32Array(t.length), r = new Uint32Array(t.length);
  for (let s = 0; s < t.length; s++) {
    const { h: a, l: o } = en(t[s], e);
    [n[s], r[s]] = [a, o];
  }
  return [n, r];
}
const wn = (t, e) => BigInt(t >>> 0) << Jt | BigInt(e >>> 0);
$.toBig = wn;
const Sn = (t, e, n) => t >>> n;
$.shrSH = Sn;
const Tn = (t, e, n) => t << 32 - n | e >>> n;
$.shrSL = Tn;
const On = (t, e, n) => t >>> n | e << 32 - n;
$.rotrSH = On;
const En = (t, e, n) => t << 32 - n | e >>> n;
$.rotrSL = En;
const An = (t, e, n) => t << 64 - n | e >>> n - 32;
$.rotrBH = An;
const Cn = (t, e, n) => t >>> n - 32 | e << 64 - n;
$.rotrBL = Cn;
const Rn = (t, e) => e;
$.rotr32H = Rn;
const In = (t, e) => t;
$.rotr32L = In;
const Dn = (t, e, n) => t << n | e >>> 32 - n;
$.rotlSH = Dn;
const jn = (t, e, n) => e << n | t >>> 32 - n;
$.rotlSL = jn;
const Ln = (t, e, n) => e << n - 32 | t >>> 64 - n;
$.rotlBH = Ln;
const $n = (t, e, n) => t << n - 32 | e >>> 64 - n;
$.rotlBL = $n;
function Zn(t, e, n, r) {
  const s = (e >>> 0) + (r >>> 0);
  return { h: t + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const Mn = (t, e, n) => (t >>> 0) + (e >>> 0) + (n >>> 0);
$.add3L = Mn;
const Nn = (t, e, n, r) => e + n + r + (t / 2 ** 32 | 0) | 0;
$.add3H = Nn;
const Pn = (t, e, n, r) => (t >>> 0) + (e >>> 0) + (n >>> 0) + (r >>> 0);
$.add4L = Pn;
const zn = (t, e, n, r, s) => e + n + r + s + (t / 2 ** 32 | 0) | 0;
$.add4H = zn;
const Bn = (t, e, n, r, s) => (t >>> 0) + (e >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0);
$.add5L = Bn;
const Un = (t, e, n, r, s, a) => e + n + r + s + a + (t / 2 ** 32 | 0) | 0;
$.add5H = Un;
const xs = {
  fromBig: en,
  split: kn,
  toBig: wn,
  shrSH: Sn,
  shrSL: Tn,
  rotrSH: On,
  rotrSL: En,
  rotrBH: An,
  rotrBL: Cn,
  rotr32H: Rn,
  rotr32L: In,
  rotlSH: Dn,
  rotlSL: jn,
  rotlBH: Ln,
  rotlBL: $n,
  add: Zn,
  add3L: Mn,
  add3H: Nn,
  add4L: Pn,
  add4H: zn,
  add5H: Un,
  add5L: Bn
};
$.default = xs;
var Fn = {}, Ut = {};
Object.defineProperty(Ut, "__esModule", { value: !0 });
Ut.crypto = void 0;
Ut.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
(function(t) {
  /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  Object.defineProperty(t, "__esModule", { value: !0 }), t.Hash = t.nextTick = t.byteSwapIfBE = t.isLE = void 0, t.isBytes = r, t.u8 = s, t.u32 = a, t.createView = o, t.rotr = d, t.rotl = k, t.byteSwap = f, t.byteSwap32 = T, t.bytesToHex = le, t.hexToBytes = We, t.asyncLoop = Ye, t.utf8ToBytes = Xe, t.toBytes = ye, t.concatBytes = Qe, t.checkOpts = ae, t.wrapConstructor = q, t.wrapConstructorWithOpts = c, t.wrapXOFConstructorWithOpts = l, t.randomBytes = h;
  const e = Ut, n = Ve;
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
  function d(u, p) {
    return u << 32 - p | u >>> p;
  }
  function k(u, p) {
    return u << p | u >>> 32 - p >>> 0;
  }
  t.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
  function f(u) {
    return u << 24 & 4278190080 | u << 8 & 16711680 | u >>> 8 & 65280 | u >>> 24 & 255;
  }
  t.byteSwapIfBE = t.isLE ? (u) => u : (u) => f(u);
  function T(u) {
    for (let p = 0; p < u.length; p++)
      u[p] = f(u[p]);
  }
  const H = /* @__PURE__ */ Array.from({ length: 256 }, (u, p) => p.toString(16).padStart(2, "0"));
  function le(u) {
    (0, n.abytes)(u);
    let p = "";
    for (let A = 0; A < u.length; A++)
      p += H[u[A]];
    return p;
  }
  const W = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
  function fe(u) {
    if (u >= W._0 && u <= W._9)
      return u - W._0;
    if (u >= W.A && u <= W.F)
      return u - (W.A - 10);
    if (u >= W.a && u <= W.f)
      return u - (W.a - 10);
  }
  function We(u) {
    if (typeof u != "string")
      throw new Error("hex string expected, got " + typeof u);
    const p = u.length, A = p / 2;
    if (p % 2)
      throw new Error("hex string expected, got unpadded hex of length " + p);
    const b = new Uint8Array(A);
    for (let g = 0, m = 0; g < A; g++, m += 2) {
      const _ = fe(u.charCodeAt(m)), v = fe(u.charCodeAt(m + 1));
      if (_ === void 0 || v === void 0) {
        const x = u[m] + u[m + 1];
        throw new Error('hex string expected, got non-hex character "' + x + '" at index ' + m);
      }
      b[g] = _ * 16 + v;
    }
    return b;
  }
  const Re = async () => {
  };
  t.nextTick = Re;
  async function Ye(u, p, A) {
    let b = Date.now();
    for (let g = 0; g < u; g++) {
      A(g);
      const m = Date.now() - b;
      m >= 0 && m < p || (await (0, t.nextTick)(), b += m);
    }
  }
  function Xe(u) {
    if (typeof u != "string")
      throw new Error("utf8ToBytes expected string, got " + typeof u);
    return new Uint8Array(new TextEncoder().encode(u));
  }
  function ye(u) {
    return typeof u == "string" && (u = Xe(u)), (0, n.abytes)(u), u;
  }
  function Qe(...u) {
    let p = 0;
    for (let b = 0; b < u.length; b++) {
      const g = u[b];
      (0, n.abytes)(g), p += g.length;
    }
    const A = new Uint8Array(p);
    for (let b = 0, g = 0; b < u.length; b++) {
      const m = u[b];
      A.set(m, g), g += m.length;
    }
    return A;
  }
  class _e {
    // Safe version that clones internal state
    clone() {
      return this._cloneInto();
    }
  }
  t.Hash = _e;
  function ae(u, p) {
    if (p !== void 0 && {}.toString.call(p) !== "[object Object]")
      throw new Error("Options should be object or undefined");
    return Object.assign(u, p);
  }
  function q(u) {
    const p = (b) => u().update(ye(b)).digest(), A = u();
    return p.outputLen = A.outputLen, p.blockLen = A.blockLen, p.create = () => u(), p;
  }
  function c(u) {
    const p = (b, g) => u(g).update(ye(b)).digest(), A = u({});
    return p.outputLen = A.outputLen, p.blockLen = A.blockLen, p.create = (b) => u(b), p;
  }
  function l(u) {
    const p = (b, g) => u(g).update(ye(b)).digest(), A = u({});
    return p.outputLen = A.outputLen, p.blockLen = A.blockLen, p.create = (b) => u(b), p;
  }
  function h(u = 32) {
    if (e.crypto && typeof e.crypto.getRandomValues == "function")
      return e.crypto.getRandomValues(new Uint8Array(u));
    if (e.crypto && typeof e.crypto.randomBytes == "function")
      return e.crypto.randomBytes(u);
    throw new Error("crypto.getRandomValues must be defined");
  }
})(Fn);
Object.defineProperty(X, "__esModule", { value: !0 });
X.shake256 = X.shake128 = X.keccak_512 = X.keccak_384 = X.keccak_256 = X.keccak_224 = X.sha3_512 = X.sha3_384 = X.sha3_256 = X.sha3_224 = X.Keccak = void 0;
X.keccakP = Yn;
const nt = Ve, Ct = $, je = Fn, Vn = [], Hn = [], Wn = [], ks = /* @__PURE__ */ BigInt(0), ft = /* @__PURE__ */ BigInt(1), ws = /* @__PURE__ */ BigInt(2), Ss = /* @__PURE__ */ BigInt(7), Ts = /* @__PURE__ */ BigInt(256), Os = /* @__PURE__ */ BigInt(113);
for (let t = 0, e = ft, n = 1, r = 0; t < 24; t++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], Vn.push(2 * (5 * r + n)), Hn.push((t + 1) * (t + 2) / 2 % 64);
  let s = ks;
  for (let a = 0; a < 7; a++)
    e = (e << ft ^ (e >> Ss) * Os) % Ts, e & ws && (s ^= ft << (ft << /* @__PURE__ */ BigInt(a)) - ft);
  Wn.push(s);
}
const [Es, As] = /* @__PURE__ */ (0, Ct.split)(Wn, !0), un = (t, e, n) => n > 32 ? (0, Ct.rotlBH)(t, e, n) : (0, Ct.rotlSH)(t, e, n), cn = (t, e, n) => n > 32 ? (0, Ct.rotlBL)(t, e, n) : (0, Ct.rotlSL)(t, e, n);
function Yn(t, e = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - e; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = t[o] ^ t[o + 10] ^ t[o + 20] ^ t[o + 30] ^ t[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const d = (o + 8) % 10, k = (o + 2) % 10, f = n[k], T = n[k + 1], H = un(f, T, 1) ^ n[d], le = cn(f, T, 1) ^ n[d + 1];
      for (let W = 0; W < 50; W += 10)
        t[o + W] ^= H, t[o + W + 1] ^= le;
    }
    let s = t[2], a = t[3];
    for (let o = 0; o < 24; o++) {
      const d = Hn[o], k = un(s, a, d), f = cn(s, a, d), T = Vn[o];
      s = t[T], a = t[T + 1], t[T] = k, t[T + 1] = f;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let d = 0; d < 10; d++)
        n[d] = t[o + d];
      for (let d = 0; d < 10; d++)
        t[o + d] ^= ~n[(d + 2) % 10] & n[(d + 4) % 10];
    }
    t[0] ^= Es[r], t[1] ^= As[r];
  }
  n.fill(0);
}
class It extends je.Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(e, n, r, s = !1, a = 24) {
    if (super(), this.blockLen = e, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = a, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, (0, nt.anumber)(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = (0, je.u32)(this.state);
  }
  keccak() {
    je.isLE || (0, je.byteSwap32)(this.state32), Yn(this.state32, this.rounds), je.isLE || (0, je.byteSwap32)(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(e) {
    (0, nt.aexists)(this);
    const { blockLen: n, state: r } = this;
    e = (0, je.toBytes)(e);
    const s = e.length;
    for (let a = 0; a < s; ) {
      const o = Math.min(n - this.pos, s - a);
      for (let d = 0; d < o; d++)
        r[this.pos++] ^= e[a++];
      this.pos === n && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: e, suffix: n, pos: r, blockLen: s } = this;
    e[r] ^= n, n & 128 && r === s - 1 && this.keccak(), e[s - 1] ^= 128, this.keccak();
  }
  writeInto(e) {
    (0, nt.aexists)(this, !1), (0, nt.abytes)(e), this.finish();
    const n = this.state, { blockLen: r } = this;
    for (let s = 0, a = e.length; s < a; ) {
      this.posOut >= r && this.keccak();
      const o = Math.min(r - this.posOut, a - s);
      e.set(n.subarray(this.posOut, this.posOut + o), s), this.posOut += o, s += o;
    }
    return e;
  }
  xofInto(e) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(e);
  }
  xof(e) {
    return (0, nt.anumber)(e), this.xofInto(new Uint8Array(e));
  }
  digestInto(e) {
    if ((0, nt.aoutput)(e, this), this.finished)
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
    const { blockLen: n, suffix: r, outputLen: s, rounds: a, enableXOF: o } = this;
    return e || (e = new It(n, r, s, o, a)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = a, e.suffix = r, e.outputLen = s, e.enableXOF = o, e.destroyed = this.destroyed, e;
  }
}
X.Keccak = It;
const He = (t, e, n) => (0, je.wrapConstructor)(() => new It(e, t, n));
X.sha3_224 = He(6, 144, 224 / 8);
X.sha3_256 = He(6, 136, 256 / 8);
X.sha3_384 = He(6, 104, 384 / 8);
X.sha3_512 = He(6, 72, 512 / 8);
X.keccak_224 = He(1, 144, 224 / 8);
X.keccak_256 = He(1, 136, 256 / 8);
X.keccak_384 = He(1, 104, 384 / 8);
X.keccak_512 = He(1, 72, 512 / 8);
const qn = (t, e, n) => (0, je.wrapXOFConstructorWithOpts)((r = {}) => new It(e, t, r.dkLen === void 0 ? n : r.dkLen, !0));
X.shake128 = qn(31, 168, 128 / 8);
X.shake256 = qn(31, 136, 256 / 8);
const { sha3_512: Cs } = X, Kn = 24, mt = 32, Xt = (t = 4, e = Math.random) => {
  let n = "";
  for (; n.length < t; )
    n = n + Math.floor(e() * 36).toString(36);
  return n;
};
function Gn(t) {
  let e = 8n, n = 0n;
  for (const r of t.values()) {
    const s = BigInt(r);
    n = (n << e) + s;
  }
  return n;
}
const Jn = (t = "") => Gn(Cs(t)).toString(36).slice(1), dn = Array.from(
  { length: 26 },
  (t, e) => String.fromCharCode(e + 97)
), Rs = (t) => dn[Math.floor(t() * dn.length)], Xn = ({
  globalObj: t = typeof zt < "u" ? zt : typeof window < "u" ? window : {},
  random: e = Math.random
} = {}) => {
  const n = Object.keys(t).toString(), r = n.length ? n + Xt(mt, e) : Xt(mt, e);
  return Jn(r).substring(0, mt);
}, Qn = (t) => () => t++, Is = 476782367, er = ({
  // Fallback if the user does not pass in a CSPRNG. This should be OK
  // because we don't rely solely on the random number generator for entropy.
  // We also use the host fingerprint, current time, and a session counter.
  random: t = Math.random,
  counter: e = Qn(Math.floor(t() * Is)),
  length: n = Kn,
  fingerprint: r = Xn({ random: t })
} = {}) => function() {
  const a = Rs(t), o = Date.now().toString(36), d = e().toString(36), k = Xt(n, t), f = `${o + k + d + r}`;
  return `${a + Jn(f).substring(1, n)}`;
}, Ds = er(), js = (t, { minLength: e = 2, maxLength: n = mt } = {}) => {
  const r = t.length, s = /^[0-9a-z]+$/;
  try {
    if (typeof t == "string" && r >= e && r <= n && s.test(t))
      return !0;
  } finally {
  }
  return !1;
};
Fe.getConstants = () => ({ defaultLength: Kn, bigLength: mt });
Fe.init = er;
Fe.createId = Ds;
Fe.bufToBigInt = Gn;
Fe.createCounter = Qn;
Fe.createFingerprint = Xn;
Fe.isCuid = js;
const { createId: Ls, init: Za, getConstants: Ma, isCuid: Na } = Fe;
var Ft = Ls;
const Ue = i.string().cuid2().default(Ft()).describe("Unique identifier for the item in Cuid2 format"), ge = i.object({
  id: Ue,
  visible: i.boolean()
}), we = i.object({
  label: i.string(),
  href: i.literal("").or(i.string().url())
}), $s = {
  label: "",
  href: ""
}, Zs = i.object({
  id: i.string().cuid2(),
  icon: i.string(),
  name: i.string(),
  value: i.string()
}), Ms = i.object({
  name: i.string(),
  profession: i.string(),
  headline: i.string(),
  email: i.literal("").or(i.string().email()),
  phone: i.string(),
  location: i.string(),
  url: we,
  customFields: i.array(Zs),
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
}), Ns = {
  name: "",
  profession: "",
  headline: "",
  email: "",
  phone: "",
  location: "",
  url: $s,
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
}, tr = [
  [
    ["profiles", "summary", "experience", "education", "projects", "volunteer", "references"],
    ["skills", "interests", "certifications", "awards", "publications", "languages"]
  ]
], Ps = i.object({
  template: i.object({
    name: i.string().default("cv_template_2"),
    id: i.number().default(2),
    withPhoto: i.boolean().default(!1),
    withoutPhoto: i.boolean().default(!0),
    oneColumn: i.boolean().default(!0),
    twoColumn: i.boolean().default(!1),
    progress: i.number().default(0)
  }),
  layout: i.array(i.array(i.array(i.string()))).default(tr),
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
}), zs = {
  template: {
    name: "cv_template_2",
    id: 2,
    withPhoto: !1,
    withoutPhoto: !0,
    oneColumn: !0,
    twoColumn: !1,
    progress: 0
  },
  layout: tr,
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
}, Bs = ge.extend({
  title: i.string().min(1),
  awarder: i.string(),
  date: i.string(),
  summary: i.string(),
  url: we
}), Us = ge.extend({
  name: i.string().min(1),
  issuer: i.string(),
  date: i.string(),
  summary: i.string(),
  url: we
}), nr = ge.extend({
  name: i.string(),
  description: i.string(),
  date: i.string(),
  location: i.string(),
  summary: i.string(),
  keywords: i.array(i.string()).default([]),
  url: we
}), Fs = ge.extend({
  institution: i.string().min(1),
  studyType: i.string(),
  area: i.string(),
  score: i.string(),
  date: i.string(),
  summary: i.string(),
  url: we,
  startDate: i.string(),
  endDate: i.string()
}), Vs = ge.extend({
  company: i.string().min(1),
  position: i.string(),
  location: i.string(),
  date: i.string(),
  startDate: i.string(),
  endDate: i.string().optional(),
  summary: i.string(),
  url: we
}), Hs = ge.extend({
  name: i.string().min(1),
  keywords: i.array(i.string()).default([])
}), Ws = ge.extend({
  name: i.string().min(1),
  description: i.string(),
  level: i.coerce.number().min(0).max(5).default(1)
}), Ys = ge.extend({
  network: i.string().min(1),
  username: i.string().min(1),
  icon: i.string().describe(
    'Slug for the icon from https://simpleicons.org. For example, "github", "linkedin", etc.'
  ),
  url: we
}), qs = ge.extend({
  name: i.string().min(1),
  description: i.string(),
  date: i.string(),
  summary: i.string(),
  keywords: i.array(i.string()).default([]),
  url: we
}), Ks = ge.extend({
  name: i.string().min(1),
  publisher: i.string(),
  date: i.string(),
  summary: i.string(),
  url: we
}), Gs = ge.extend({
  name: i.string().min(1),
  description: i.string(),
  summary: i.string(),
  url: we
}), Js = ge.extend({
  name: i.string(),
  description: i.string(),
  level: i.coerce.number().min(0).max(5).default(1),
  keywords: i.array(i.string()).default([])
}), Xs = ge.extend({
  organization: i.string().min(1),
  position: i.string(),
  location: i.string(),
  date: i.string(),
  summary: i.string(),
  url: we
}), ce = i.object({
  name: i.string(),
  columns: i.number().min(1).max(5).default(1),
  separateLinks: i.boolean().default(!0),
  visible: i.boolean().default(!0)
}), Qs = ce.extend({
  id: Ue,
  items: i.array(nr)
}), ea = i.object({
  collapse: ce.extend({
    id: i.literal("collapse"),
    items: i.array(nr),
    extraDescription: i.string().default("")
  }),
  summary: ce.extend({
    id: i.literal("summary"),
    content: i.string().default(""),
    extraDescription: i.string().default("")
  }),
  awards: ce.extend({
    id: i.literal("awards"),
    items: i.array(Bs),
    extraDescription: i.string().default("")
  }),
  certifications: ce.extend({
    id: i.literal("certifications"),
    items: i.array(Us),
    extraDescription: i.string().default("")
  }),
  education: ce.extend({
    id: i.literal("education"),
    items: i.array(Fs),
    extraDescription: i.string().default("")
  }),
  experience: ce.extend({
    id: i.literal("experience"),
    items: i.array(Vs),
    extraDescription: i.string().default("")
  }),
  volunteer: ce.extend({
    id: i.literal("volunteer"),
    items: i.array(Xs),
    extraDescription: i.string().default("")
  }),
  interests: ce.extend({
    id: i.literal("interests"),
    items: i.array(Hs),
    extraDescription: i.string().default("")
  }),
  languages: ce.extend({
    id: i.literal("languages"),
    items: i.array(Ws),
    extraDescription: i.string().default("")
  }),
  profiles: ce.extend({
    id: i.literal("profiles"),
    items: i.array(Ys),
    extraDescription: i.string().default("")
  }),
  projects: ce.extend({
    id: i.literal("projects"),
    items: i.array(qs),
    extraDescription: i.string().default("")
  }),
  publications: ce.extend({
    id: i.literal("publications"),
    items: i.array(Ks),
    extraDescription: i.string().default("")
  }),
  references: ce.extend({
    id: i.literal("references"),
    items: i.array(Gs),
    extraDescription: i.string().default("")
  }),
  skills: ce.extend({
    id: i.literal("skills"),
    items: i.array(Js),
    extraDescription: i.string().default("")
  }),
  custom: i.record(i.string(), Qs)
}), pe = {
  name: "",
  columns: 1,
  separateLinks: !0,
  visible: !0
}, ta = {
  collapse: {
    ...pe,
    id: "collapse",
    name: "Collapse",
    items: [],
    extraDescription: ""
  },
  summary: { ...pe, id: "summary", name: "Summary", content: "", extraDescription: "" },
  awards: { ...pe, id: "awards", name: "Awards", items: [], extraDescription: "" },
  certifications: { ...pe, id: "certifications", name: "Certifications", items: [], extraDescription: "" },
  education: { ...pe, id: "education", name: "Education", items: [], extraDescription: "" },
  experience: { ...pe, id: "experience", name: "Experience", items: [], extraDescription: "" },
  volunteer: { ...pe, id: "volunteer", name: "Volunteering", items: [], extraDescription: "" },
  interests: { ...pe, id: "interests", name: "Interests", items: [], extraDescription: "" },
  languages: { ...pe, id: "languages", name: "Languages", items: [], extraDescription: "" },
  profiles: { ...pe, id: "profiles", name: "Profiles", items: [], extraDescription: "" },
  projects: { ...pe, id: "projects", name: "Projects", items: [], extraDescription: "" },
  publications: { ...pe, id: "publications", name: "Publications", items: [], extraDescription: "" },
  references: { ...pe, id: "references", name: "References", items: [], extraDescription: "" },
  skills: { ...pe, id: "skills", name: "Skills", items: [], extraDescription: "" },
  custom: {}
}, rr = i.object({
  basics: Ms,
  sections: ea,
  metadata: Ps,
  id: i.number().optional() || i.number()
}), na = {
  basics: Ns,
  sections: ta,
  metadata: zs,
  id: void 0
};
var ra = { exports: {} };
/* @license
Papa Parse
v5.5.2
https://github.com/mholt/PapaParse
License: MIT
*/
(function(t, e) {
  ((n, r) => {
    t.exports = r();
  })(zt, function n() {
    var r = typeof self < "u" ? self : typeof window < "u" ? window : r !== void 0 ? r : {}, s, a = !r.document && !!r.postMessage, o = r.IS_PAPA_WORKER || !1, d = {}, k = 0, f = {};
    function T(c) {
      this._handle = null, this._finished = !1, this._completed = !1, this._halted = !1, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = !0, this._completeResults = { data: [], errors: [], meta: {} }, (function(l) {
        var h = _e(l);
        h.chunkSize = parseInt(h.chunkSize), l.step || l.chunk || (h.chunkSize = null), this._handle = new We(h), (this._handle.streamer = this)._config = h;
      }).call(this, c), this.parseChunk = function(l, h) {
        var u = parseInt(this._config.skipFirstNLines) || 0;
        if (this.isFirstChunk && 0 < u) {
          let A = this._config.newline;
          A || (p = this._config.quoteChar || '"', A = this._handle.guessLineEndings(l, p)), l = [...l.split(A).slice(u)].join(A);
        }
        this.isFirstChunk && q(this._config.beforeFirstChunk) && (p = this._config.beforeFirstChunk(l)) !== void 0 && (l = p), this.isFirstChunk = !1, this._halted = !1;
        var u = this._partialLine + l, p = (this._partialLine = "", this._handle.parse(u, this._baseIndex, !this._finished));
        if (!this._handle.paused() && !this._handle.aborted()) {
          if (l = p.meta.cursor, u = (this._finished || (this._partialLine = u.substring(l - this._baseIndex), this._baseIndex = l), p && p.data && (this._rowCount += p.data.length), this._finished || this._config.preview && this._rowCount >= this._config.preview), o) r.postMessage({ results: p, workerId: f.WORKER_ID, finished: u });
          else if (q(this._config.chunk) && !h) {
            if (this._config.chunk(p, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = !0);
            this._completeResults = p = void 0;
          }
          return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(p.data), this._completeResults.errors = this._completeResults.errors.concat(p.errors), this._completeResults.meta = p.meta), this._completed || !u || !q(this._config.complete) || p && p.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = !0), u || p && p.meta.paused || this._nextChunk(), p;
        }
        this._halted = !0;
      }, this._sendError = function(l) {
        q(this._config.error) ? this._config.error(l) : o && this._config.error && r.postMessage({ workerId: f.WORKER_ID, error: l, finished: !1 });
      };
    }
    function H(c) {
      var l;
      (c = c || {}).chunkSize || (c.chunkSize = f.RemoteChunkSize), T.call(this, c), this._nextChunk = a ? function() {
        this._readChunk(), this._chunkLoaded();
      } : function() {
        this._readChunk();
      }, this.stream = function(h) {
        this._input = h, this._nextChunk();
      }, this._readChunk = function() {
        if (this._finished) this._chunkLoaded();
        else {
          if (l = new XMLHttpRequest(), this._config.withCredentials && (l.withCredentials = this._config.withCredentials), a || (l.onload = ae(this._chunkLoaded, this), l.onerror = ae(this._chunkError, this)), l.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !a), this._config.downloadRequestHeaders) {
            var h, u = this._config.downloadRequestHeaders;
            for (h in u) l.setRequestHeader(h, u[h]);
          }
          var p;
          this._config.chunkSize && (p = this._start + this._config.chunkSize - 1, l.setRequestHeader("Range", "bytes=" + this._start + "-" + p));
          try {
            l.send(this._config.downloadRequestBody);
          } catch (A) {
            this._chunkError(A.message);
          }
          a && l.status === 0 && this._chunkError();
        }
      }, this._chunkLoaded = function() {
        l.readyState === 4 && (l.status < 200 || 400 <= l.status ? this._chunkError() : (this._start += this._config.chunkSize || l.responseText.length, this._finished = !this._config.chunkSize || this._start >= ((h) => (h = h.getResponseHeader("Content-Range")) !== null ? parseInt(h.substring(h.lastIndexOf("/") + 1)) : -1)(l), this.parseChunk(l.responseText)));
      }, this._chunkError = function(h) {
        h = l.statusText || h, this._sendError(new Error(h));
      };
    }
    function le(c) {
      (c = c || {}).chunkSize || (c.chunkSize = f.LocalChunkSize), T.call(this, c);
      var l, h, u = typeof FileReader < "u";
      this.stream = function(p) {
        this._input = p, h = p.slice || p.webkitSlice || p.mozSlice, u ? ((l = new FileReader()).onload = ae(this._chunkLoaded, this), l.onerror = ae(this._chunkError, this)) : l = new FileReaderSync(), this._nextChunk();
      }, this._nextChunk = function() {
        this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
      }, this._readChunk = function() {
        var p = this._input, A = (this._config.chunkSize && (A = Math.min(this._start + this._config.chunkSize, this._input.size), p = h.call(p, this._start, A)), l.readAsText(p, this._config.encoding));
        u || this._chunkLoaded({ target: { result: A } });
      }, this._chunkLoaded = function(p) {
        this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(p.target.result);
      }, this._chunkError = function() {
        this._sendError(l.error);
      };
    }
    function W(c) {
      var l;
      T.call(this, c = c || {}), this.stream = function(h) {
        return l = h, this._nextChunk();
      }, this._nextChunk = function() {
        var h, u;
        if (!this._finished) return h = this._config.chunkSize, l = h ? (u = l.substring(0, h), l.substring(h)) : (u = l, ""), this._finished = !l, this.parseChunk(u);
      };
    }
    function fe(c) {
      T.call(this, c = c || {});
      var l = [], h = !0, u = !1;
      this.pause = function() {
        T.prototype.pause.apply(this, arguments), this._input.pause();
      }, this.resume = function() {
        T.prototype.resume.apply(this, arguments), this._input.resume();
      }, this.stream = function(p) {
        this._input = p, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
      }, this._checkIsFinished = function() {
        u && l.length === 1 && (this._finished = !0);
      }, this._nextChunk = function() {
        this._checkIsFinished(), l.length ? this.parseChunk(l.shift()) : h = !0;
      }, this._streamData = ae(function(p) {
        try {
          l.push(typeof p == "string" ? p : p.toString(this._config.encoding)), h && (h = !1, this._checkIsFinished(), this.parseChunk(l.shift()));
        } catch (A) {
          this._streamError(A);
        }
      }, this), this._streamError = ae(function(p) {
        this._streamCleanUp(), this._sendError(p);
      }, this), this._streamEnd = ae(function() {
        this._streamCleanUp(), u = !0, this._streamData("");
      }, this), this._streamCleanUp = ae(function() {
        this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
      }, this);
    }
    function We(c) {
      var l, h, u, p, A = Math.pow(2, 53), b = -A, g = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, m = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/, _ = this, v = 0, x = 0, R = !1, E = !1, I = [], S = { data: [], errors: [], meta: {} };
      function U(M) {
        return c.skipEmptyLines === "greedy" ? M.join("").trim() === "" : M.length === 1 && M[0].length === 0;
      }
      function Y() {
        if (S && u && (se("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + f.DefaultDelimiter + "'"), u = !1), c.skipEmptyLines && (S.data = S.data.filter(function(D) {
          return !U(D);
        })), Q()) {
          let D = function(K, ee) {
            q(c.transformHeader) && (K = c.transformHeader(K, ee)), I.push(K);
          };
          if (S) if (Array.isArray(S.data[0])) {
            for (var M = 0; Q() && M < S.data.length; M++) S.data[M].forEach(D);
            S.data.splice(0, 1);
          } else S.data.forEach(D);
        }
        function z(D, K) {
          for (var ee = c.header ? {} : [], G = 0; G < D.length; G++) {
            var J = G, F = D[G], F = ((ve, N) => ((ne) => (c.dynamicTypingFunction && c.dynamicTyping[ne] === void 0 && (c.dynamicTyping[ne] = c.dynamicTypingFunction(ne)), (c.dynamicTyping[ne] || c.dynamicTyping) === !0))(ve) ? N === "true" || N === "TRUE" || N !== "false" && N !== "FALSE" && (((ne) => {
              if (g.test(ne) && (ne = parseFloat(ne), b < ne && ne < A))
                return 1;
            })(N) ? parseFloat(N) : m.test(N) ? new Date(N) : N === "" ? null : N) : N)(J = c.header ? G >= I.length ? "__parsed_extra" : I[G] : J, F = c.transform ? c.transform(F, J) : F);
            J === "__parsed_extra" ? (ee[J] = ee[J] || [], ee[J].push(F)) : ee[J] = F;
          }
          return c.header && (G > I.length ? se("FieldMismatch", "TooManyFields", "Too many fields: expected " + I.length + " fields but parsed " + G, x + K) : G < I.length && se("FieldMismatch", "TooFewFields", "Too few fields: expected " + I.length + " fields but parsed " + G, x + K)), ee;
        }
        var B;
        S && (c.header || c.dynamicTyping || c.transform) && (B = 1, !S.data.length || Array.isArray(S.data[0]) ? (S.data = S.data.map(z), B = S.data.length) : S.data = z(S.data, 0), c.header && S.meta && (S.meta.fields = I), x += B);
      }
      function Q() {
        return c.header && I.length === 0;
      }
      function se(M, z, B, D) {
        M = { type: M, code: z, message: B }, D !== void 0 && (M.row = D), S.errors.push(M);
      }
      q(c.step) && (p = c.step, c.step = function(M) {
        S = M, Q() ? Y() : (Y(), S.data.length !== 0 && (v += M.data.length, c.preview && v > c.preview ? h.abort() : (S.data = S.data[0], p(S, _))));
      }), this.parse = function(M, z, B) {
        var D = c.quoteChar || '"', D = (c.newline || (c.newline = this.guessLineEndings(M, D)), u = !1, c.delimiter ? q(c.delimiter) && (c.delimiter = c.delimiter(M), S.meta.delimiter = c.delimiter) : ((D = ((K, ee, G, J, F) => {
          var ve, N, ne, Ze;
          F = F || [",", "	", "|", ";", f.RECORD_SEP, f.UNIT_SEP];
          for (var et = 0; et < F.length; et++) {
            for (var Se, dt = F[et], oe = 0, Te = 0, ie = 0, he = (ne = void 0, new Ye({ comments: J, delimiter: dt, newline: ee, preview: 10 }).parse(K)), Ie = 0; Ie < he.data.length; Ie++) G && U(he.data[Ie]) ? ie++ : (Se = he.data[Ie].length, Te += Se, ne === void 0 ? ne = Se : 0 < Se && (oe += Math.abs(Se - ne), ne = Se));
            0 < he.data.length && (Te /= he.data.length - ie), (N === void 0 || oe <= N) && (Ze === void 0 || Ze < Te) && 1.99 < Te && (N = oe, ve = dt, Ze = Te);
          }
          return { successful: !!(c.delimiter = ve), bestDelimiter: ve };
        })(M, c.newline, c.skipEmptyLines, c.comments, c.delimitersToGuess)).successful ? c.delimiter = D.bestDelimiter : (u = !0, c.delimiter = f.DefaultDelimiter), S.meta.delimiter = c.delimiter), _e(c));
        return c.preview && c.header && D.preview++, l = M, h = new Ye(D), S = h.parse(l, z, B), Y(), R ? { meta: { paused: !0 } } : S || { meta: { paused: !1 } };
      }, this.paused = function() {
        return R;
      }, this.pause = function() {
        R = !0, h.abort(), l = q(c.chunk) ? "" : l.substring(h.getCharIndex());
      }, this.resume = function() {
        _.streamer._halted ? (R = !1, _.streamer.parseChunk(l, !0)) : setTimeout(_.resume, 3);
      }, this.aborted = function() {
        return E;
      }, this.abort = function() {
        E = !0, h.abort(), S.meta.aborted = !0, q(c.complete) && c.complete(S), l = "";
      }, this.guessLineEndings = function(K, D) {
        K = K.substring(0, 1048576);
        var D = new RegExp(Re(D) + "([^]*?)" + Re(D), "gm"), B = (K = K.replace(D, "")).split("\r"), D = K.split(`
`), K = 1 < D.length && D[0].length < B[0].length;
        if (B.length === 1 || K) return `
`;
        for (var ee = 0, G = 0; G < B.length; G++) B[G][0] === `
` && ee++;
        return ee >= B.length / 2 ? `\r
` : "\r";
      };
    }
    function Re(c) {
      return c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function Ye(c) {
      var l = (c = c || {}).delimiter, h = c.newline, u = c.comments, p = c.step, A = c.preview, b = c.fastMode, g = null, m = !1, _ = c.quoteChar == null ? '"' : c.quoteChar, v = _;
      if (c.escapeChar !== void 0 && (v = c.escapeChar), (typeof l != "string" || -1 < f.BAD_DELIMITERS.indexOf(l)) && (l = ","), u === l) throw new Error("Comment character same as delimiter");
      u === !0 ? u = "#" : (typeof u != "string" || -1 < f.BAD_DELIMITERS.indexOf(u)) && (u = !1), h !== `
` && h !== "\r" && h !== `\r
` && (h = `
`);
      var x = 0, R = !1;
      this.parse = function(E, I, S) {
        if (typeof E != "string") throw new Error("Input must be a string");
        var U = E.length, Y = l.length, Q = h.length, se = u.length, M = q(p), z = [], B = [], D = [], K = x = 0;
        if (!E) return oe();
        if (b || b !== !1 && E.indexOf(_) === -1) {
          for (var ee = E.split(h), G = 0; G < ee.length; G++) {
            if (D = ee[G], x += D.length, G !== ee.length - 1) x += h.length;
            else if (S) return oe();
            if (!u || D.substring(0, se) !== u) {
              if (M) {
                if (z = [], Ze(D.split(l)), Te(), R) return oe();
              } else Ze(D.split(l));
              if (A && A <= G) return z = z.slice(0, A), oe(!0);
            }
          }
          return oe();
        }
        for (var J = E.indexOf(l, x), F = E.indexOf(h, x), ve = new RegExp(Re(v) + Re(_), "g"), N = E.indexOf(_, x); ; ) if (E[x] === _) for (N = x, x++; ; ) {
          if ((N = E.indexOf(_, N + 1)) === -1) return S || B.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: z.length, index: x }), Se();
          if (N === U - 1) return Se(E.substring(x, N).replace(ve, _));
          if (_ === v && E[N + 1] === v) N++;
          else if (_ === v || N === 0 || E[N - 1] !== v) {
            J !== -1 && J < N + 1 && (J = E.indexOf(l, N + 1));
            var ne = et((F = F !== -1 && F < N + 1 ? E.indexOf(h, N + 1) : F) === -1 ? J : Math.min(J, F));
            if (E.substr(N + 1 + ne, Y) === l) {
              D.push(E.substring(x, N).replace(ve, _)), E[x = N + 1 + ne + Y] !== _ && (N = E.indexOf(_, x)), J = E.indexOf(l, x), F = E.indexOf(h, x);
              break;
            }
            if (ne = et(F), E.substring(N + 1 + ne, N + 1 + ne + Q) === h) {
              if (D.push(E.substring(x, N).replace(ve, _)), dt(N + 1 + ne + Q), J = E.indexOf(l, x), N = E.indexOf(_, x), M && (Te(), R)) return oe();
              if (A && z.length >= A) return oe(!0);
              break;
            }
            B.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: z.length, index: x }), N++;
          }
        }
        else if (u && D.length === 0 && E.substring(x, x + se) === u) {
          if (F === -1) return oe();
          x = F + Q, F = E.indexOf(h, x), J = E.indexOf(l, x);
        } else if (J !== -1 && (J < F || F === -1)) D.push(E.substring(x, J)), x = J + Y, J = E.indexOf(l, x);
        else {
          if (F === -1) break;
          if (D.push(E.substring(x, F)), dt(F + Q), M && (Te(), R)) return oe();
          if (A && z.length >= A) return oe(!0);
        }
        return Se();
        function Ze(ie) {
          z.push(ie), K = x;
        }
        function et(ie) {
          var he = 0;
          return he = ie !== -1 && (ie = E.substring(N + 1, ie)) && ie.trim() === "" ? ie.length : he;
        }
        function Se(ie) {
          return S || (ie === void 0 && (ie = E.substring(x)), D.push(ie), x = U, Ze(D), M && Te()), oe();
        }
        function dt(ie) {
          x = ie, Ze(D), D = [], F = E.indexOf(h, x);
        }
        function oe(ie) {
          if (c.header && !I && z.length && !m) {
            var he = z[0], Ie = {}, Vt = new Set(he);
            let rn = !1;
            for (let tt = 0; tt < he.length; tt++) {
              let Oe = he[tt];
              if (Ie[Oe = q(c.transformHeader) ? c.transformHeader(Oe, tt) : Oe]) {
                let lt, sn = Ie[Oe];
                for (; lt = Oe + "_" + sn, sn++, Vt.has(lt); ) ;
                Vt.add(lt), he[tt] = lt, Ie[Oe]++, rn = !0, (g = g === null ? {} : g)[lt] = Oe;
              } else Ie[Oe] = 1, he[tt] = Oe;
              Vt.add(Oe);
            }
            rn && console.warn("Duplicate headers found and renamed."), m = !0;
          }
          return { data: z, errors: B, meta: { delimiter: l, linebreak: h, aborted: R, truncated: !!ie, cursor: K + (I || 0), renamedHeaders: g } };
        }
        function Te() {
          p(oe()), z = [], B = [];
        }
      }, this.abort = function() {
        R = !0;
      }, this.getCharIndex = function() {
        return x;
      };
    }
    function Xe(c) {
      var l = c.data, h = d[l.workerId], u = !1;
      if (l.error) h.userError(l.error, l.file);
      else if (l.results && l.results.data) {
        var p = { abort: function() {
          u = !0, ye(l.workerId, { data: [], errors: [], meta: { aborted: !0 } });
        }, pause: Qe, resume: Qe };
        if (q(h.userStep)) {
          for (var A = 0; A < l.results.data.length && (h.userStep({ data: l.results.data[A], errors: l.results.errors, meta: l.results.meta }, p), !u); A++) ;
          delete l.results;
        } else q(h.userChunk) && (h.userChunk(l.results, p, l.file), delete l.results);
      }
      l.finished && !u && ye(l.workerId, l.results);
    }
    function ye(c, l) {
      var h = d[c];
      q(h.userComplete) && h.userComplete(l), h.terminate(), delete d[c];
    }
    function Qe() {
      throw new Error("Not implemented.");
    }
    function _e(c) {
      if (typeof c != "object" || c === null) return c;
      var l, h = Array.isArray(c) ? [] : {};
      for (l in c) h[l] = _e(c[l]);
      return h;
    }
    function ae(c, l) {
      return function() {
        c.apply(l, arguments);
      };
    }
    function q(c) {
      return typeof c == "function";
    }
    return f.parse = function(c, l) {
      var h = (l = l || {}).dynamicTyping || !1;
      if (q(h) && (l.dynamicTypingFunction = h, h = {}), l.dynamicTyping = h, l.transform = !!q(l.transform) && l.transform, !l.worker || !f.WORKERS_SUPPORTED) return h = null, f.NODE_STREAM_INPUT, typeof c == "string" ? (c = ((u) => u.charCodeAt(0) !== 65279 ? u : u.slice(1))(c), h = new (l.download ? H : W)(l)) : c.readable === !0 && q(c.read) && q(c.on) ? h = new fe(l) : (r.File && c instanceof File || c instanceof Object) && (h = new le(l)), h.stream(c);
      (h = (() => {
        var u;
        return !!f.WORKERS_SUPPORTED && (u = (() => {
          var p = r.URL || r.webkitURL || null, A = n.toString();
          return f.BLOB_URL || (f.BLOB_URL = p.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ", "(", A, ")();"], { type: "text/javascript" })));
        })(), (u = new r.Worker(u)).onmessage = Xe, u.id = k++, d[u.id] = u);
      })()).userStep = l.step, h.userChunk = l.chunk, h.userComplete = l.complete, h.userError = l.error, l.step = q(l.step), l.chunk = q(l.chunk), l.complete = q(l.complete), l.error = q(l.error), delete l.worker, h.postMessage({ input: c, config: l, workerId: h.id });
    }, f.unparse = function(c, l) {
      var h = !1, u = !0, p = ",", A = `\r
`, b = '"', g = b + b, m = !1, _ = null, v = !1, x = ((() => {
        if (typeof l == "object") {
          if (typeof l.delimiter != "string" || f.BAD_DELIMITERS.filter(function(I) {
            return l.delimiter.indexOf(I) !== -1;
          }).length || (p = l.delimiter), typeof l.quotes != "boolean" && typeof l.quotes != "function" && !Array.isArray(l.quotes) || (h = l.quotes), typeof l.skipEmptyLines != "boolean" && typeof l.skipEmptyLines != "string" || (m = l.skipEmptyLines), typeof l.newline == "string" && (A = l.newline), typeof l.quoteChar == "string" && (b = l.quoteChar), typeof l.header == "boolean" && (u = l.header), Array.isArray(l.columns)) {
            if (l.columns.length === 0) throw new Error("Option columns is empty");
            _ = l.columns;
          }
          l.escapeChar !== void 0 && (g = l.escapeChar + b), l.escapeFormulae instanceof RegExp ? v = l.escapeFormulae : typeof l.escapeFormulae == "boolean" && l.escapeFormulae && (v = /^[=+\-@\t\r].*$/);
        }
      })(), new RegExp(Re(b), "g"));
      if (typeof c == "string" && (c = JSON.parse(c)), Array.isArray(c)) {
        if (!c.length || Array.isArray(c[0])) return R(null, c, m);
        if (typeof c[0] == "object") return R(_ || Object.keys(c[0]), c, m);
      } else if (typeof c == "object") return typeof c.data == "string" && (c.data = JSON.parse(c.data)), Array.isArray(c.data) && (c.fields || (c.fields = c.meta && c.meta.fields || _), c.fields || (c.fields = Array.isArray(c.data[0]) ? c.fields : typeof c.data[0] == "object" ? Object.keys(c.data[0]) : []), Array.isArray(c.data[0]) || typeof c.data[0] == "object" || (c.data = [c.data])), R(c.fields || [], c.data || [], m);
      throw new Error("Unable to serialize unrecognized input");
      function R(I, S, U) {
        var Y = "", Q = (typeof I == "string" && (I = JSON.parse(I)), typeof S == "string" && (S = JSON.parse(S)), Array.isArray(I) && 0 < I.length), se = !Array.isArray(S[0]);
        if (Q && u) {
          for (var M = 0; M < I.length; M++) 0 < M && (Y += p), Y += E(I[M], M);
          0 < S.length && (Y += A);
        }
        for (var z = 0; z < S.length; z++) {
          var B = (Q ? I : S[z]).length, D = !1, K = Q ? Object.keys(S[z]).length === 0 : S[z].length === 0;
          if (U && !Q && (D = U === "greedy" ? S[z].join("").trim() === "" : S[z].length === 1 && S[z][0].length === 0), U === "greedy" && Q) {
            for (var ee = [], G = 0; G < B; G++) {
              var J = se ? I[G] : G;
              ee.push(S[z][J]);
            }
            D = ee.join("").trim() === "";
          }
          if (!D) {
            for (var F = 0; F < B; F++) {
              0 < F && !K && (Y += p);
              var ve = Q && se ? I[F] : F;
              Y += E(S[z][ve], F);
            }
            z < S.length - 1 && (!U || 0 < B && !K) && (Y += A);
          }
        }
        return Y;
      }
      function E(I, S) {
        var U, Y;
        return I == null ? "" : I.constructor === Date ? JSON.stringify(I).slice(1, 25) : (Y = !1, v && typeof I == "string" && v.test(I) && (I = "'" + I, Y = !0), U = I.toString().replace(x, g), (Y = Y || h === !0 || typeof h == "function" && h(I, S) || Array.isArray(h) && h[S] || ((Q, se) => {
          for (var M = 0; M < se.length; M++) if (-1 < Q.indexOf(se[M])) return !0;
          return !1;
        })(U, f.BAD_DELIMITERS) || -1 < U.indexOf(p) || U.charAt(0) === " " || U.charAt(U.length - 1) === " ") ? b + U + b : U);
      }
    }, f.RECORD_SEP = "", f.UNIT_SEP = "", f.BYTE_ORDER_MARK = "\uFEFF", f.BAD_DELIMITERS = ["\r", `
`, '"', f.BYTE_ORDER_MARK], f.WORKERS_SUPPORTED = !a && !!r.Worker, f.NODE_STREAM_INPUT = 1, f.LocalChunkSize = 10485760, f.RemoteChunkSize = 5242880, f.DefaultDelimiter = ",", f.Parser = Ye, f.ParserHandle = We, f.NetworkStreamer = H, f.FileStreamer = le, f.StringStreamer = W, f.ReadableStreamStreamer = fe, r.jQuery && ((s = r.jQuery).fn.parse = function(c) {
      var l = c.config || {}, h = [];
      return this.each(function(A) {
        if (!(s(this).prop("tagName").toUpperCase() === "INPUT" && s(this).attr("type").toLowerCase() === "file" && r.FileReader) || !this.files || this.files.length === 0) return !0;
        for (var b = 0; b < this.files.length; b++) h.push({ file: this.files[b], inputElem: this, instanceConfig: s.extend({}, l) });
      }), u(), this;
      function u() {
        if (h.length === 0) q(c.complete) && c.complete();
        else {
          var A, b, g, m, _ = h[0];
          if (q(c.before)) {
            var v = c.before(_.file, _.inputElem);
            if (typeof v == "object") {
              if (v.action === "abort") return A = "AbortError", b = _.file, g = _.inputElem, m = v.reason, void (q(c.error) && c.error({ name: A }, b, g, m));
              if (v.action === "skip") return void p();
              typeof v.config == "object" && (_.instanceConfig = s.extend(_.instanceConfig, v.config));
            } else if (v === "skip") return void p();
          }
          var x = _.instanceConfig.complete;
          _.instanceConfig.complete = function(R) {
            q(x) && x(R, _.file, _.inputElem), p();
          }, f.parse(_.file, _.instanceConfig);
        }
      }
      function p() {
        h.splice(0, 1), u();
      }
    }), o && (r.onmessage = function(c) {
      c = c.data, f.WORKER_ID === void 0 && c && (f.WORKER_ID = c.workerId), typeof c.input == "string" ? r.postMessage({ workerId: f.WORKER_ID, results: f.parse(c.input, c.config), finished: !0 }) : (r.File && c.input instanceof File || c.input instanceof Object) && (c = f.parse(c.input, c.config)) && r.postMessage({ workerId: f.WORKER_ID, results: c, finished: !0 });
    }), (H.prototype = Object.create(T.prototype)).constructor = H, (le.prototype = Object.create(T.prototype)).constructor = le, (W.prototype = Object.create(W.prototype)).constructor = W, (fe.prototype = Object.create(T.prototype)).constructor = fe, f;
  });
})(ra);
var sr = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(zt, function() {
    var n = 1e3, r = 6e4, s = 36e5, a = "millisecond", o = "second", d = "minute", k = "hour", f = "day", T = "week", H = "month", le = "quarter", W = "year", fe = "date", We = "Invalid Date", Re = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Ye = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, Xe = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(b) {
      var g = ["th", "st", "nd", "rd"], m = b % 100;
      return "[" + b + (g[(m - 20) % 10] || g[m] || g[0]) + "]";
    } }, ye = function(b, g, m) {
      var _ = String(b);
      return !_ || _.length >= g ? b : "" + Array(g + 1 - _.length).join(m) + b;
    }, Qe = { s: ye, z: function(b) {
      var g = -b.utcOffset(), m = Math.abs(g), _ = Math.floor(m / 60), v = m % 60;
      return (g <= 0 ? "+" : "-") + ye(_, 2, "0") + ":" + ye(v, 2, "0");
    }, m: function b(g, m) {
      if (g.date() < m.date()) return -b(m, g);
      var _ = 12 * (m.year() - g.year()) + (m.month() - g.month()), v = g.clone().add(_, H), x = m - v < 0, R = g.clone().add(_ + (x ? -1 : 1), H);
      return +(-(_ + (m - v) / (x ? v - R : R - v)) || 0);
    }, a: function(b) {
      return b < 0 ? Math.ceil(b) || 0 : Math.floor(b);
    }, p: function(b) {
      return { M: H, y: W, w: T, d: f, D: fe, h: k, m: d, s: o, ms: a, Q: le }[b] || String(b || "").toLowerCase().replace(/s$/, "");
    }, u: function(b) {
      return b === void 0;
    } }, _e = "en", ae = {};
    ae[_e] = Xe;
    var q = "$isDayjsObject", c = function(b) {
      return b instanceof p || !(!b || !b[q]);
    }, l = function b(g, m, _) {
      var v;
      if (!g) return _e;
      if (typeof g == "string") {
        var x = g.toLowerCase();
        ae[x] && (v = x), m && (ae[x] = m, v = x);
        var R = g.split("-");
        if (!v && R.length > 1) return b(R[0]);
      } else {
        var E = g.name;
        ae[E] = g, v = E;
      }
      return !_ && v && (_e = v), v || !_ && _e;
    }, h = function(b, g) {
      if (c(b)) return b.clone();
      var m = typeof g == "object" ? g : {};
      return m.date = b, m.args = arguments, new p(m);
    }, u = Qe;
    u.l = l, u.i = c, u.w = function(b, g) {
      return h(b, { locale: g.$L, utc: g.$u, x: g.$x, $offset: g.$offset });
    };
    var p = function() {
      function b(m) {
        this.$L = l(m.locale, null, !0), this.parse(m), this.$x = this.$x || m.x || {}, this[q] = !0;
      }
      var g = b.prototype;
      return g.parse = function(m) {
        this.$d = function(_) {
          var v = _.date, x = _.utc;
          if (v === null) return /* @__PURE__ */ new Date(NaN);
          if (u.u(v)) return /* @__PURE__ */ new Date();
          if (v instanceof Date) return new Date(v);
          if (typeof v == "string" && !/Z$/i.test(v)) {
            var R = v.match(Re);
            if (R) {
              var E = R[2] - 1 || 0, I = (R[7] || "0").substring(0, 3);
              return x ? new Date(Date.UTC(R[1], E, R[3] || 1, R[4] || 0, R[5] || 0, R[6] || 0, I)) : new Date(R[1], E, R[3] || 1, R[4] || 0, R[5] || 0, R[6] || 0, I);
            }
          }
          return new Date(v);
        }(m), this.init();
      }, g.init = function() {
        var m = this.$d;
        this.$y = m.getFullYear(), this.$M = m.getMonth(), this.$D = m.getDate(), this.$W = m.getDay(), this.$H = m.getHours(), this.$m = m.getMinutes(), this.$s = m.getSeconds(), this.$ms = m.getMilliseconds();
      }, g.$utils = function() {
        return u;
      }, g.isValid = function() {
        return this.$d.toString() !== We;
      }, g.isSame = function(m, _) {
        var v = h(m);
        return this.startOf(_) <= v && v <= this.endOf(_);
      }, g.isAfter = function(m, _) {
        return h(m) < this.startOf(_);
      }, g.isBefore = function(m, _) {
        return this.endOf(_) < h(m);
      }, g.$g = function(m, _, v) {
        return u.u(m) ? this[_] : this.set(v, m);
      }, g.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, g.valueOf = function() {
        return this.$d.getTime();
      }, g.startOf = function(m, _) {
        var v = this, x = !!u.u(_) || _, R = u.p(m), E = function(z, B) {
          var D = u.w(v.$u ? Date.UTC(v.$y, B, z) : new Date(v.$y, B, z), v);
          return x ? D : D.endOf(f);
        }, I = function(z, B) {
          return u.w(v.toDate()[z].apply(v.toDate("s"), (x ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(B)), v);
        }, S = this.$W, U = this.$M, Y = this.$D, Q = "set" + (this.$u ? "UTC" : "");
        switch (R) {
          case W:
            return x ? E(1, 0) : E(31, 11);
          case H:
            return x ? E(1, U) : E(0, U + 1);
          case T:
            var se = this.$locale().weekStart || 0, M = (S < se ? S + 7 : S) - se;
            return E(x ? Y - M : Y + (6 - M), U);
          case f:
          case fe:
            return I(Q + "Hours", 0);
          case k:
            return I(Q + "Minutes", 1);
          case d:
            return I(Q + "Seconds", 2);
          case o:
            return I(Q + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, g.endOf = function(m) {
        return this.startOf(m, !1);
      }, g.$set = function(m, _) {
        var v, x = u.p(m), R = "set" + (this.$u ? "UTC" : ""), E = (v = {}, v[f] = R + "Date", v[fe] = R + "Date", v[H] = R + "Month", v[W] = R + "FullYear", v[k] = R + "Hours", v[d] = R + "Minutes", v[o] = R + "Seconds", v[a] = R + "Milliseconds", v)[x], I = x === f ? this.$D + (_ - this.$W) : _;
        if (x === H || x === W) {
          var S = this.clone().set(fe, 1);
          S.$d[E](I), S.init(), this.$d = S.set(fe, Math.min(this.$D, S.daysInMonth())).$d;
        } else E && this.$d[E](I);
        return this.init(), this;
      }, g.set = function(m, _) {
        return this.clone().$set(m, _);
      }, g.get = function(m) {
        return this[u.p(m)]();
      }, g.add = function(m, _) {
        var v, x = this;
        m = Number(m);
        var R = u.p(_), E = function(U) {
          var Y = h(x);
          return u.w(Y.date(Y.date() + Math.round(U * m)), x);
        };
        if (R === H) return this.set(H, this.$M + m);
        if (R === W) return this.set(W, this.$y + m);
        if (R === f) return E(1);
        if (R === T) return E(7);
        var I = (v = {}, v[d] = r, v[k] = s, v[o] = n, v)[R] || 1, S = this.$d.getTime() + m * I;
        return u.w(S, this);
      }, g.subtract = function(m, _) {
        return this.add(-1 * m, _);
      }, g.format = function(m) {
        var _ = this, v = this.$locale();
        if (!this.isValid()) return v.invalidDate || We;
        var x = m || "YYYY-MM-DDTHH:mm:ssZ", R = u.z(this), E = this.$H, I = this.$m, S = this.$M, U = v.weekdays, Y = v.months, Q = v.meridiem, se = function(B, D, K, ee) {
          return B && (B[D] || B(_, x)) || K[D].slice(0, ee);
        }, M = function(B) {
          return u.s(E % 12 || 12, B, "0");
        }, z = Q || function(B, D, K) {
          var ee = B < 12 ? "AM" : "PM";
          return K ? ee.toLowerCase() : ee;
        };
        return x.replace(Ye, function(B, D) {
          return D || function(K) {
            switch (K) {
              case "YY":
                return String(_.$y).slice(-2);
              case "YYYY":
                return u.s(_.$y, 4, "0");
              case "M":
                return S + 1;
              case "MM":
                return u.s(S + 1, 2, "0");
              case "MMM":
                return se(v.monthsShort, S, Y, 3);
              case "MMMM":
                return se(Y, S);
              case "D":
                return _.$D;
              case "DD":
                return u.s(_.$D, 2, "0");
              case "d":
                return String(_.$W);
              case "dd":
                return se(v.weekdaysMin, _.$W, U, 2);
              case "ddd":
                return se(v.weekdaysShort, _.$W, U, 3);
              case "dddd":
                return U[_.$W];
              case "H":
                return String(E);
              case "HH":
                return u.s(E, 2, "0");
              case "h":
                return M(1);
              case "hh":
                return M(2);
              case "a":
                return z(E, I, !0);
              case "A":
                return z(E, I, !1);
              case "m":
                return String(I);
              case "mm":
                return u.s(I, 2, "0");
              case "s":
                return String(_.$s);
              case "ss":
                return u.s(_.$s, 2, "0");
              case "SSS":
                return u.s(_.$ms, 3, "0");
              case "Z":
                return R;
            }
            return null;
          }(B) || R.replace(":", "");
        });
      }, g.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, g.diff = function(m, _, v) {
        var x, R = this, E = u.p(_), I = h(m), S = (I.utcOffset() - this.utcOffset()) * r, U = this - I, Y = function() {
          return u.m(R, I);
        };
        switch (E) {
          case W:
            x = Y() / 12;
            break;
          case H:
            x = Y();
            break;
          case le:
            x = Y() / 3;
            break;
          case T:
            x = (U - S) / 6048e5;
            break;
          case f:
            x = (U - S) / 864e5;
            break;
          case k:
            x = U / s;
            break;
          case d:
            x = U / r;
            break;
          case o:
            x = U / n;
            break;
          default:
            x = U;
        }
        return v ? x : u.a(x);
      }, g.daysInMonth = function() {
        return this.endOf(H).$D;
      }, g.$locale = function() {
        return ae[this.$L];
      }, g.locale = function(m, _) {
        if (!m) return this.$L;
        var v = this.clone(), x = l(m, _, !0);
        return x && (v.$L = x), v;
      }, g.clone = function() {
        return u.w(this.$d, this);
      }, g.toDate = function() {
        return new Date(this.valueOf());
      }, g.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, g.toISOString = function() {
        return this.$d.toISOString();
      }, g.toString = function() {
        return this.$d.toUTCString();
      }, b;
    }(), A = p.prototype;
    return h.prototype = A, [["$ms", a], ["$s", o], ["$m", d], ["$H", k], ["$W", f], ["$M", H], ["$y", W], ["$D", fe]].forEach(function(b) {
      A[b[1]] = function(g) {
        return this.$g(g, b[0], b[1]);
      };
    }), h.extend = function(b, g) {
      return b.$i || (b(g, p, h), b.$i = !0), h;
    }, h.locale = l, h.isDayjs = c, h.unix = function(b) {
      return h(1e3 * b);
    }, h.en = ae[_e], h.Ls = ae, h.p = {}, h;
  });
})(sr);
var sa = sr.exports;
const aa = /* @__PURE__ */ gs(sa), Me = i.union([i.date(), i.string().datetime()]).transform((t) => typeof t == "string" ? aa(t).toDate() : t), ia = i.object({
  id: Ue,
  password: i.string().nullable(),
  lastSignedIn: i.date().nullable(),
  verificationToken: i.string().nullable(),
  twoFactorSecret: i.string().nullable(),
  twoFactorBackupCodes: i.array(i.string()).default([]),
  refreshToken: i.string().nullable(),
  resetToken: i.string().nullable(),
  userId: Ue
}), ar = i.string().min(3).max(255).regex(/^[\w.-]+$/, {
  message: "Usernames can only contain letters, numbers, periods, hyphens, and underscores."
}).transform((t) => t.toLowerCase()), ct = i.object({
  id: Ue,
  first_name: i.string().min(1).max(255),
  last_name: i.string().min(1).max(255),
  picture: i.literal("").or(i.null()).or(i.string().url()),
  phone_number: i.string().min(1).max(255),
  username: ar,
  email: i.string().email().transform((t) => t.toLowerCase()),
  locale: i.string().default("en-US"),
  emailVerified: i.boolean().default(!1),
  twoFactorEnabled: i.boolean().default(!1),
  provider: i.enum(["email", "github", "google", "openid"]).default("email"),
  createdAt: Me,
  updatedAt: Me,
  created_at: Me,
  updated_at: Me
});
class Pa extends te(ct) {
}
const oa = ct.merge(
  i.object({ secrets: ia.nullable().default(null) })
);
class za extends te(oa) {
}
const ua = ct.partial().pick({
  locale: !0,
  username: !0,
  email: !0,
  picture: !0
});
class Ba extends te(ua) {
}
const ca = i.object({
  email: i.string().transform((t) => t.toLowerCase()),
  password: i.string()
}).refine(
  (t) => t.email.includes("@") ? i.string().email().parse(t.email) : ar.parse(t.email),
  { message: "InvalidCredentials" }
);
class Ua extends te(ca) {
}
const da = i.object({ message: i.string() });
class Fa extends te(da) {
}
const la = i.array(i.enum(["email", "github", "google", "openid"]));
class Va extends te(la) {
}
const fa = ct.pick({ first_name: !0, last_name: !0, email: !0, phone_number: !0, locale: !0 }).extend({ password: i.string().min(6), confirm_password: i.string().min(6) });
class Ha extends te(fa) {
}
const ha = i.object({
  password: i.string().min(6),
  confirm_password: i.string().min(6),
  email: i.string()
});
class Wa extends te(ha) {
}
const pa = i.object({
  status: i.enum(["authenticated", "2fa_required"]),
  data: i.object({
    access: i.string(),
    refresh: i.string(),
    user: ct
  })
});
class Ya extends te(pa) {
}
const ma = i.object({
  otp: i.string().length(6, { message: "Code must be a 6 digit number" }).regex(/^\d+$/, { message: "Code must be a 6 digit number" })
});
class qa extends te(ma) {
}
const ga = i.object({
  backupCodes: i.array(i.string().length(10))
});
class Ka extends te(ga) {
}
const ya = i.object({
  code: i.string().length(10)
});
class Ga extends te(ya) {
}
const _a = i.object({
  currentPassword: i.string().min(6),
  newPassword: i.string().min(6)
});
class Ja extends te(_a) {
}
const va = i.object({
  id: i.number(),
  name: i.string(),
  url: i.string(),
  avatar: i.string()
});
class Xa extends te(va) {
}
const ba = i.object({
  isSignupsDisabled: i.boolean().default(!1),
  isEmailAuthDisabled: i.boolean().default(!1)
});
class Qa extends te(ba) {
}
function tn(t) {
  if (typeof t != "string")
    throw new TypeError("Expected a string");
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
const xa = [
  // German umlauts
  ["ß", "ss"],
  ["ẞ", "Ss"],
  ["ä", "ae"],
  ["Ä", "Ae"],
  ["ö", "oe"],
  ["Ö", "Oe"],
  ["ü", "ue"],
  ["Ü", "Ue"],
  // Latin
  ["À", "A"],
  ["Á", "A"],
  ["Â", "A"],
  ["Ã", "A"],
  ["Ä", "Ae"],
  ["Å", "A"],
  ["Æ", "AE"],
  ["Ç", "C"],
  ["È", "E"],
  ["É", "E"],
  ["Ê", "E"],
  ["Ë", "E"],
  ["Ì", "I"],
  ["Í", "I"],
  ["Î", "I"],
  ["Ï", "I"],
  ["Ð", "D"],
  ["Ñ", "N"],
  ["Ò", "O"],
  ["Ó", "O"],
  ["Ô", "O"],
  ["Õ", "O"],
  ["Ö", "Oe"],
  ["Ő", "O"],
  ["Ø", "O"],
  ["Ù", "U"],
  ["Ú", "U"],
  ["Û", "U"],
  ["Ü", "Ue"],
  ["Ű", "U"],
  ["Ý", "Y"],
  ["Þ", "TH"],
  ["ß", "ss"],
  ["à", "a"],
  ["á", "a"],
  ["â", "a"],
  ["ã", "a"],
  ["ä", "ae"],
  ["å", "a"],
  ["æ", "ae"],
  ["ç", "c"],
  ["è", "e"],
  ["é", "e"],
  ["ê", "e"],
  ["ë", "e"],
  ["ì", "i"],
  ["í", "i"],
  ["î", "i"],
  ["ï", "i"],
  ["ð", "d"],
  ["ñ", "n"],
  ["ò", "o"],
  ["ó", "o"],
  ["ô", "o"],
  ["õ", "o"],
  ["ö", "oe"],
  ["ő", "o"],
  ["ø", "o"],
  ["ù", "u"],
  ["ú", "u"],
  ["û", "u"],
  ["ü", "ue"],
  ["ű", "u"],
  ["ý", "y"],
  ["þ", "th"],
  ["ÿ", "y"],
  ["ẞ", "SS"],
  // Vietnamese
  ["à", "a"],
  ["À", "A"],
  ["á", "a"],
  ["Á", "A"],
  ["â", "a"],
  ["Â", "A"],
  ["ã", "a"],
  ["Ã", "A"],
  ["è", "e"],
  ["È", "E"],
  ["é", "e"],
  ["É", "E"],
  ["ê", "e"],
  ["Ê", "E"],
  ["ì", "i"],
  ["Ì", "I"],
  ["í", "i"],
  ["Í", "I"],
  ["ò", "o"],
  ["Ò", "O"],
  ["ó", "o"],
  ["Ó", "O"],
  ["ô", "o"],
  ["Ô", "O"],
  ["õ", "o"],
  ["Õ", "O"],
  ["ù", "u"],
  ["Ù", "U"],
  ["ú", "u"],
  ["Ú", "U"],
  ["ý", "y"],
  ["Ý", "Y"],
  ["ă", "a"],
  ["Ă", "A"],
  ["Đ", "D"],
  ["đ", "d"],
  ["ĩ", "i"],
  ["Ĩ", "I"],
  ["ũ", "u"],
  ["Ũ", "U"],
  ["ơ", "o"],
  ["Ơ", "O"],
  ["ư", "u"],
  ["Ư", "U"],
  ["ạ", "a"],
  ["Ạ", "A"],
  ["ả", "a"],
  ["Ả", "A"],
  ["ấ", "a"],
  ["Ấ", "A"],
  ["ầ", "a"],
  ["Ầ", "A"],
  ["ẩ", "a"],
  ["Ẩ", "A"],
  ["ẫ", "a"],
  ["Ẫ", "A"],
  ["ậ", "a"],
  ["Ậ", "A"],
  ["ắ", "a"],
  ["Ắ", "A"],
  ["ằ", "a"],
  ["Ằ", "A"],
  ["ẳ", "a"],
  ["Ẳ", "A"],
  ["ẵ", "a"],
  ["Ẵ", "A"],
  ["ặ", "a"],
  ["Ặ", "A"],
  ["ẹ", "e"],
  ["Ẹ", "E"],
  ["ẻ", "e"],
  ["Ẻ", "E"],
  ["ẽ", "e"],
  ["Ẽ", "E"],
  ["ế", "e"],
  ["Ế", "E"],
  ["ề", "e"],
  ["Ề", "E"],
  ["ể", "e"],
  ["Ể", "E"],
  ["ễ", "e"],
  ["Ễ", "E"],
  ["ệ", "e"],
  ["Ệ", "E"],
  ["ỉ", "i"],
  ["Ỉ", "I"],
  ["ị", "i"],
  ["Ị", "I"],
  ["ọ", "o"],
  ["Ọ", "O"],
  ["ỏ", "o"],
  ["Ỏ", "O"],
  ["ố", "o"],
  ["Ố", "O"],
  ["ồ", "o"],
  ["Ồ", "O"],
  ["ổ", "o"],
  ["Ổ", "O"],
  ["ỗ", "o"],
  ["Ỗ", "O"],
  ["ộ", "o"],
  ["Ộ", "O"],
  ["ớ", "o"],
  ["Ớ", "O"],
  ["ờ", "o"],
  ["Ờ", "O"],
  ["ở", "o"],
  ["Ở", "O"],
  ["ỡ", "o"],
  ["Ỡ", "O"],
  ["ợ", "o"],
  ["Ợ", "O"],
  ["ụ", "u"],
  ["Ụ", "U"],
  ["ủ", "u"],
  ["Ủ", "U"],
  ["ứ", "u"],
  ["Ứ", "U"],
  ["ừ", "u"],
  ["Ừ", "U"],
  ["ử", "u"],
  ["Ử", "U"],
  ["ữ", "u"],
  ["Ữ", "U"],
  ["ự", "u"],
  ["Ự", "U"],
  ["ỳ", "y"],
  ["Ỳ", "Y"],
  ["ỵ", "y"],
  ["Ỵ", "Y"],
  ["ỷ", "y"],
  ["Ỷ", "Y"],
  ["ỹ", "y"],
  ["Ỹ", "Y"],
  // Arabic
  ["ء", "e"],
  ["آ", "a"],
  ["أ", "a"],
  ["ؤ", "w"],
  ["إ", "i"],
  ["ئ", "y"],
  ["ا", "a"],
  ["ب", "b"],
  ["ة", "t"],
  ["ت", "t"],
  ["ث", "th"],
  ["ج", "j"],
  ["ح", "h"],
  ["خ", "kh"],
  ["د", "d"],
  ["ذ", "dh"],
  ["ر", "r"],
  ["ز", "z"],
  ["س", "s"],
  ["ش", "sh"],
  ["ص", "s"],
  ["ض", "d"],
  ["ط", "t"],
  ["ظ", "z"],
  ["ع", "e"],
  ["غ", "gh"],
  ["ـ", "_"],
  ["ف", "f"],
  ["ق", "q"],
  ["ك", "k"],
  ["ل", "l"],
  ["م", "m"],
  ["ن", "n"],
  ["ه", "h"],
  ["و", "w"],
  ["ى", "a"],
  ["ي", "y"],
  ["َ‎", "a"],
  ["ُ", "u"],
  ["ِ‎", "i"],
  ["٠", "0"],
  ["١", "1"],
  ["٢", "2"],
  ["٣", "3"],
  ["٤", "4"],
  ["٥", "5"],
  ["٦", "6"],
  ["٧", "7"],
  ["٨", "8"],
  ["٩", "9"],
  // Persian / Farsi
  ["چ", "ch"],
  ["ک", "k"],
  ["گ", "g"],
  ["پ", "p"],
  ["ژ", "zh"],
  ["ی", "y"],
  ["۰", "0"],
  ["۱", "1"],
  ["۲", "2"],
  ["۳", "3"],
  ["۴", "4"],
  ["۵", "5"],
  ["۶", "6"],
  ["۷", "7"],
  ["۸", "8"],
  ["۹", "9"],
  // Pashto
  ["ټ", "p"],
  ["ځ", "z"],
  ["څ", "c"],
  ["ډ", "d"],
  ["ﺫ", "d"],
  ["ﺭ", "r"],
  ["ړ", "r"],
  ["ﺯ", "z"],
  ["ږ", "g"],
  ["ښ", "x"],
  ["ګ", "g"],
  ["ڼ", "n"],
  ["ۀ", "e"],
  ["ې", "e"],
  ["ۍ", "ai"],
  // Urdu
  ["ٹ", "t"],
  ["ڈ", "d"],
  ["ڑ", "r"],
  ["ں", "n"],
  ["ہ", "h"],
  ["ھ", "h"],
  ["ے", "e"],
  // Russian
  ["А", "A"],
  ["а", "a"],
  ["Б", "B"],
  ["б", "b"],
  ["В", "V"],
  ["в", "v"],
  ["Г", "G"],
  ["г", "g"],
  ["Д", "D"],
  ["д", "d"],
  ["ъе", "ye"],
  ["Ъе", "Ye"],
  ["ъЕ", "yE"],
  ["ЪЕ", "YE"],
  ["Е", "E"],
  ["е", "e"],
  ["Ё", "Yo"],
  ["ё", "yo"],
  ["Ж", "Zh"],
  ["ж", "zh"],
  ["З", "Z"],
  ["з", "z"],
  ["И", "I"],
  ["и", "i"],
  ["ый", "iy"],
  ["Ый", "Iy"],
  ["ЫЙ", "IY"],
  ["ыЙ", "iY"],
  ["Й", "Y"],
  ["й", "y"],
  ["К", "K"],
  ["к", "k"],
  ["Л", "L"],
  ["л", "l"],
  ["М", "M"],
  ["м", "m"],
  ["Н", "N"],
  ["н", "n"],
  ["О", "O"],
  ["о", "o"],
  ["П", "P"],
  ["п", "p"],
  ["Р", "R"],
  ["р", "r"],
  ["С", "S"],
  ["с", "s"],
  ["Т", "T"],
  ["т", "t"],
  ["У", "U"],
  ["у", "u"],
  ["Ф", "F"],
  ["ф", "f"],
  ["Х", "Kh"],
  ["х", "kh"],
  ["Ц", "Ts"],
  ["ц", "ts"],
  ["Ч", "Ch"],
  ["ч", "ch"],
  ["Ш", "Sh"],
  ["ш", "sh"],
  ["Щ", "Sch"],
  ["щ", "sch"],
  ["Ъ", ""],
  ["ъ", ""],
  ["Ы", "Y"],
  ["ы", "y"],
  ["Ь", ""],
  ["ь", ""],
  ["Э", "E"],
  ["э", "e"],
  ["Ю", "Yu"],
  ["ю", "yu"],
  ["Я", "Ya"],
  ["я", "ya"],
  // Romanian
  ["ă", "a"],
  ["Ă", "A"],
  ["ș", "s"],
  ["Ș", "S"],
  ["ț", "t"],
  ["Ț", "T"],
  ["ţ", "t"],
  ["Ţ", "T"],
  // Turkish
  ["ş", "s"],
  ["Ş", "S"],
  ["ç", "c"],
  ["Ç", "C"],
  ["ğ", "g"],
  ["Ğ", "G"],
  ["ı", "i"],
  ["İ", "I"],
  // Armenian
  ["ա", "a"],
  ["Ա", "A"],
  ["բ", "b"],
  ["Բ", "B"],
  ["գ", "g"],
  ["Գ", "G"],
  ["դ", "d"],
  ["Դ", "D"],
  ["ե", "ye"],
  ["Ե", "Ye"],
  ["զ", "z"],
  ["Զ", "Z"],
  ["է", "e"],
  ["Է", "E"],
  ["ը", "y"],
  ["Ը", "Y"],
  ["թ", "t"],
  ["Թ", "T"],
  ["ժ", "zh"],
  ["Ժ", "Zh"],
  ["ի", "i"],
  ["Ի", "I"],
  ["լ", "l"],
  ["Լ", "L"],
  ["խ", "kh"],
  ["Խ", "Kh"],
  ["ծ", "ts"],
  ["Ծ", "Ts"],
  ["կ", "k"],
  ["Կ", "K"],
  ["հ", "h"],
  ["Հ", "H"],
  ["ձ", "dz"],
  ["Ձ", "Dz"],
  ["ղ", "gh"],
  ["Ղ", "Gh"],
  ["ճ", "tch"],
  ["Ճ", "Tch"],
  ["մ", "m"],
  ["Մ", "M"],
  ["յ", "y"],
  ["Յ", "Y"],
  ["ն", "n"],
  ["Ն", "N"],
  ["շ", "sh"],
  ["Շ", "Sh"],
  ["ո", "vo"],
  ["Ո", "Vo"],
  ["չ", "ch"],
  ["Չ", "Ch"],
  ["պ", "p"],
  ["Պ", "P"],
  ["ջ", "j"],
  ["Ջ", "J"],
  ["ռ", "r"],
  ["Ռ", "R"],
  ["ս", "s"],
  ["Ս", "S"],
  ["վ", "v"],
  ["Վ", "V"],
  ["տ", "t"],
  ["Տ", "T"],
  ["ր", "r"],
  ["Ր", "R"],
  ["ց", "c"],
  ["Ց", "C"],
  ["ու", "u"],
  ["ՈՒ", "U"],
  ["Ու", "U"],
  ["փ", "p"],
  ["Փ", "P"],
  ["ք", "q"],
  ["Ք", "Q"],
  ["օ", "o"],
  ["Օ", "O"],
  ["ֆ", "f"],
  ["Ֆ", "F"],
  ["և", "yev"],
  // Georgian
  ["ა", "a"],
  ["ბ", "b"],
  ["გ", "g"],
  ["დ", "d"],
  ["ე", "e"],
  ["ვ", "v"],
  ["ზ", "z"],
  ["თ", "t"],
  ["ი", "i"],
  ["კ", "k"],
  ["ლ", "l"],
  ["მ", "m"],
  ["ნ", "n"],
  ["ო", "o"],
  ["პ", "p"],
  ["ჟ", "zh"],
  ["რ", "r"],
  ["ს", "s"],
  ["ტ", "t"],
  ["უ", "u"],
  ["ფ", "ph"],
  ["ქ", "q"],
  ["ღ", "gh"],
  ["ყ", "k"],
  ["შ", "sh"],
  ["ჩ", "ch"],
  ["ც", "ts"],
  ["ძ", "dz"],
  ["წ", "ts"],
  ["ჭ", "tch"],
  ["ხ", "kh"],
  ["ჯ", "j"],
  ["ჰ", "h"],
  // Czech
  ["č", "c"],
  ["ď", "d"],
  ["ě", "e"],
  ["ň", "n"],
  ["ř", "r"],
  ["š", "s"],
  ["ť", "t"],
  ["ů", "u"],
  ["ž", "z"],
  ["Č", "C"],
  ["Ď", "D"],
  ["Ě", "E"],
  ["Ň", "N"],
  ["Ř", "R"],
  ["Š", "S"],
  ["Ť", "T"],
  ["Ů", "U"],
  ["Ž", "Z"],
  // Dhivehi
  ["ހ", "h"],
  ["ށ", "sh"],
  ["ނ", "n"],
  ["ރ", "r"],
  ["ބ", "b"],
  ["ޅ", "lh"],
  ["ކ", "k"],
  ["އ", "a"],
  ["ވ", "v"],
  ["މ", "m"],
  ["ފ", "f"],
  ["ދ", "dh"],
  ["ތ", "th"],
  ["ލ", "l"],
  ["ގ", "g"],
  ["ޏ", "gn"],
  ["ސ", "s"],
  ["ޑ", "d"],
  ["ޒ", "z"],
  ["ޓ", "t"],
  ["ޔ", "y"],
  ["ޕ", "p"],
  ["ޖ", "j"],
  ["ޗ", "ch"],
  ["ޘ", "tt"],
  ["ޙ", "hh"],
  ["ޚ", "kh"],
  ["ޛ", "th"],
  ["ޜ", "z"],
  ["ޝ", "sh"],
  ["ޞ", "s"],
  ["ޟ", "d"],
  ["ޠ", "t"],
  ["ޡ", "z"],
  ["ޢ", "a"],
  ["ޣ", "gh"],
  ["ޤ", "q"],
  ["ޥ", "w"],
  ["ަ", "a"],
  ["ާ", "aa"],
  ["ި", "i"],
  ["ީ", "ee"],
  ["ު", "u"],
  ["ޫ", "oo"],
  ["ެ", "e"],
  ["ޭ", "ey"],
  ["ޮ", "o"],
  ["ޯ", "oa"],
  ["ް", ""],
  // Greek
  ["α", "a"],
  ["β", "v"],
  ["γ", "g"],
  ["δ", "d"],
  ["ε", "e"],
  ["ζ", "z"],
  ["η", "i"],
  ["θ", "th"],
  ["ι", "i"],
  ["κ", "k"],
  ["λ", "l"],
  ["μ", "m"],
  ["ν", "n"],
  ["ξ", "ks"],
  ["ο", "o"],
  ["π", "p"],
  ["ρ", "r"],
  ["σ", "s"],
  ["τ", "t"],
  ["υ", "y"],
  ["φ", "f"],
  ["χ", "x"],
  ["ψ", "ps"],
  ["ω", "o"],
  ["ά", "a"],
  ["έ", "e"],
  ["ί", "i"],
  ["ό", "o"],
  ["ύ", "y"],
  ["ή", "i"],
  ["ώ", "o"],
  ["ς", "s"],
  ["ϊ", "i"],
  ["ΰ", "y"],
  ["ϋ", "y"],
  ["ΐ", "i"],
  ["Α", "A"],
  ["Β", "B"],
  ["Γ", "G"],
  ["Δ", "D"],
  ["Ε", "E"],
  ["Ζ", "Z"],
  ["Η", "I"],
  ["Θ", "TH"],
  ["Ι", "I"],
  ["Κ", "K"],
  ["Λ", "L"],
  ["Μ", "M"],
  ["Ν", "N"],
  ["Ξ", "KS"],
  ["Ο", "O"],
  ["Π", "P"],
  ["Ρ", "R"],
  ["Σ", "S"],
  ["Τ", "T"],
  ["Υ", "Y"],
  ["Φ", "F"],
  ["Χ", "X"],
  ["Ψ", "PS"],
  ["Ω", "O"],
  ["Ά", "A"],
  ["Έ", "E"],
  ["Ί", "I"],
  ["Ό", "O"],
  ["Ύ", "Y"],
  ["Ή", "I"],
  ["Ώ", "O"],
  ["Ϊ", "I"],
  ["Ϋ", "Y"],
  // Disabled as it conflicts with German and Latin.
  // Hungarian
  // ['ä', 'a'],
  // ['Ä', 'A'],
  // ['ö', 'o'],
  // ['Ö', 'O'],
  // ['ü', 'u'],
  // ['Ü', 'U'],
  // ['ű', 'u'],
  // ['Ű', 'U'],
  // Latvian
  ["ā", "a"],
  ["ē", "e"],
  ["ģ", "g"],
  ["ī", "i"],
  ["ķ", "k"],
  ["ļ", "l"],
  ["ņ", "n"],
  ["ū", "u"],
  ["Ā", "A"],
  ["Ē", "E"],
  ["Ģ", "G"],
  ["Ī", "I"],
  ["Ķ", "K"],
  ["Ļ", "L"],
  ["Ņ", "N"],
  ["Ū", "U"],
  ["č", "c"],
  ["š", "s"],
  ["ž", "z"],
  ["Č", "C"],
  ["Š", "S"],
  ["Ž", "Z"],
  // Lithuanian
  ["ą", "a"],
  ["č", "c"],
  ["ę", "e"],
  ["ė", "e"],
  ["į", "i"],
  ["š", "s"],
  ["ų", "u"],
  ["ū", "u"],
  ["ž", "z"],
  ["Ą", "A"],
  ["Č", "C"],
  ["Ę", "E"],
  ["Ė", "E"],
  ["Į", "I"],
  ["Š", "S"],
  ["Ų", "U"],
  ["Ū", "U"],
  // Macedonian
  ["Ќ", "Kj"],
  ["ќ", "kj"],
  ["Љ", "Lj"],
  ["љ", "lj"],
  ["Њ", "Nj"],
  ["њ", "nj"],
  ["Тс", "Ts"],
  ["тс", "ts"],
  // Polish
  ["ą", "a"],
  ["ć", "c"],
  ["ę", "e"],
  ["ł", "l"],
  ["ń", "n"],
  ["ś", "s"],
  ["ź", "z"],
  ["ż", "z"],
  ["Ą", "A"],
  ["Ć", "C"],
  ["Ę", "E"],
  ["Ł", "L"],
  ["Ń", "N"],
  ["Ś", "S"],
  ["Ź", "Z"],
  ["Ż", "Z"],
  // Disabled as it conflicts with Vietnamese.
  // Serbian
  // ['љ', 'lj'],
  // ['њ', 'nj'],
  // ['Љ', 'Lj'],
  // ['Њ', 'Nj'],
  // ['đ', 'dj'],
  // ['Đ', 'Dj'],
  // ['ђ', 'dj'],
  // ['ј', 'j'],
  // ['ћ', 'c'],
  // ['џ', 'dz'],
  // ['Ђ', 'Dj'],
  // ['Ј', 'j'],
  // ['Ћ', 'C'],
  // ['Џ', 'Dz'],
  // Disabled as it conflicts with German and Latin.
  // Slovak
  // ['ä', 'a'],
  // ['Ä', 'A'],
  // ['ľ', 'l'],
  // ['ĺ', 'l'],
  // ['ŕ', 'r'],
  // ['Ľ', 'L'],
  // ['Ĺ', 'L'],
  // ['Ŕ', 'R'],
  // Disabled as it conflicts with German and Latin.
  // Swedish
  // ['å', 'o'],
  // ['Å', 'o'],
  // ['ä', 'a'],
  // ['Ä', 'A'],
  // ['ë', 'e'],
  // ['Ë', 'E'],
  // ['ö', 'o'],
  // ['Ö', 'O'],
  // Ukrainian
  ["Є", "Ye"],
  ["І", "I"],
  ["Ї", "Yi"],
  ["Ґ", "G"],
  ["є", "ye"],
  ["і", "i"],
  ["ї", "yi"],
  ["ґ", "g"],
  // Dutch
  ["Ĳ", "IJ"],
  ["ĳ", "ij"],
  // Danish
  // ['Æ', 'Ae'],
  // ['Ø', 'Oe'],
  // ['Å', 'Aa'],
  // ['æ', 'ae'],
  // ['ø', 'oe'],
  // ['å', 'aa']
  // Currencies
  ["¢", "c"],
  ["¥", "Y"],
  ["߿", "b"],
  ["৳", "t"],
  ["૱", "Bo"],
  ["฿", "B"],
  ["₠", "CE"],
  ["₡", "C"],
  ["₢", "Cr"],
  ["₣", "F"],
  ["₥", "m"],
  ["₦", "N"],
  ["₧", "Pt"],
  ["₨", "Rs"],
  ["₩", "W"],
  ["₫", "s"],
  ["€", "E"],
  ["₭", "K"],
  ["₮", "T"],
  ["₯", "Dp"],
  ["₰", "S"],
  ["₱", "P"],
  ["₲", "G"],
  ["₳", "A"],
  ["₴", "S"],
  ["₵", "C"],
  ["₶", "tt"],
  ["₷", "S"],
  ["₸", "T"],
  ["₹", "R"],
  ["₺", "L"],
  ["₽", "P"],
  ["₿", "B"],
  ["﹩", "$"],
  ["￠", "c"],
  ["￥", "Y"],
  ["￦", "W"],
  // Latin
  ["𝐀", "A"],
  ["𝐁", "B"],
  ["𝐂", "C"],
  ["𝐃", "D"],
  ["𝐄", "E"],
  ["𝐅", "F"],
  ["𝐆", "G"],
  ["𝐇", "H"],
  ["𝐈", "I"],
  ["𝐉", "J"],
  ["𝐊", "K"],
  ["𝐋", "L"],
  ["𝐌", "M"],
  ["𝐍", "N"],
  ["𝐎", "O"],
  ["𝐏", "P"],
  ["𝐐", "Q"],
  ["𝐑", "R"],
  ["𝐒", "S"],
  ["𝐓", "T"],
  ["𝐔", "U"],
  ["𝐕", "V"],
  ["𝐖", "W"],
  ["𝐗", "X"],
  ["𝐘", "Y"],
  ["𝐙", "Z"],
  ["𝐚", "a"],
  ["𝐛", "b"],
  ["𝐜", "c"],
  ["𝐝", "d"],
  ["𝐞", "e"],
  ["𝐟", "f"],
  ["𝐠", "g"],
  ["𝐡", "h"],
  ["𝐢", "i"],
  ["𝐣", "j"],
  ["𝐤", "k"],
  ["𝐥", "l"],
  ["𝐦", "m"],
  ["𝐧", "n"],
  ["𝐨", "o"],
  ["𝐩", "p"],
  ["𝐪", "q"],
  ["𝐫", "r"],
  ["𝐬", "s"],
  ["𝐭", "t"],
  ["𝐮", "u"],
  ["𝐯", "v"],
  ["𝐰", "w"],
  ["𝐱", "x"],
  ["𝐲", "y"],
  ["𝐳", "z"],
  ["𝐴", "A"],
  ["𝐵", "B"],
  ["𝐶", "C"],
  ["𝐷", "D"],
  ["𝐸", "E"],
  ["𝐹", "F"],
  ["𝐺", "G"],
  ["𝐻", "H"],
  ["𝐼", "I"],
  ["𝐽", "J"],
  ["𝐾", "K"],
  ["𝐿", "L"],
  ["𝑀", "M"],
  ["𝑁", "N"],
  ["𝑂", "O"],
  ["𝑃", "P"],
  ["𝑄", "Q"],
  ["𝑅", "R"],
  ["𝑆", "S"],
  ["𝑇", "T"],
  ["𝑈", "U"],
  ["𝑉", "V"],
  ["𝑊", "W"],
  ["𝑋", "X"],
  ["𝑌", "Y"],
  ["𝑍", "Z"],
  ["𝑎", "a"],
  ["𝑏", "b"],
  ["𝑐", "c"],
  ["𝑑", "d"],
  ["𝑒", "e"],
  ["𝑓", "f"],
  ["𝑔", "g"],
  ["𝑖", "i"],
  ["𝑗", "j"],
  ["𝑘", "k"],
  ["𝑙", "l"],
  ["𝑚", "m"],
  ["𝑛", "n"],
  ["𝑜", "o"],
  ["𝑝", "p"],
  ["𝑞", "q"],
  ["𝑟", "r"],
  ["𝑠", "s"],
  ["𝑡", "t"],
  ["𝑢", "u"],
  ["𝑣", "v"],
  ["𝑤", "w"],
  ["𝑥", "x"],
  ["𝑦", "y"],
  ["𝑧", "z"],
  ["𝑨", "A"],
  ["𝑩", "B"],
  ["𝑪", "C"],
  ["𝑫", "D"],
  ["𝑬", "E"],
  ["𝑭", "F"],
  ["𝑮", "G"],
  ["𝑯", "H"],
  ["𝑰", "I"],
  ["𝑱", "J"],
  ["𝑲", "K"],
  ["𝑳", "L"],
  ["𝑴", "M"],
  ["𝑵", "N"],
  ["𝑶", "O"],
  ["𝑷", "P"],
  ["𝑸", "Q"],
  ["𝑹", "R"],
  ["𝑺", "S"],
  ["𝑻", "T"],
  ["𝑼", "U"],
  ["𝑽", "V"],
  ["𝑾", "W"],
  ["𝑿", "X"],
  ["𝒀", "Y"],
  ["𝒁", "Z"],
  ["𝒂", "a"],
  ["𝒃", "b"],
  ["𝒄", "c"],
  ["𝒅", "d"],
  ["𝒆", "e"],
  ["𝒇", "f"],
  ["𝒈", "g"],
  ["𝒉", "h"],
  ["𝒊", "i"],
  ["𝒋", "j"],
  ["𝒌", "k"],
  ["𝒍", "l"],
  ["𝒎", "m"],
  ["𝒏", "n"],
  ["𝒐", "o"],
  ["𝒑", "p"],
  ["𝒒", "q"],
  ["𝒓", "r"],
  ["𝒔", "s"],
  ["𝒕", "t"],
  ["𝒖", "u"],
  ["𝒗", "v"],
  ["𝒘", "w"],
  ["𝒙", "x"],
  ["𝒚", "y"],
  ["𝒛", "z"],
  ["𝒜", "A"],
  ["𝒞", "C"],
  ["𝒟", "D"],
  ["𝒢", "g"],
  ["𝒥", "J"],
  ["𝒦", "K"],
  ["𝒩", "N"],
  ["𝒪", "O"],
  ["𝒫", "P"],
  ["𝒬", "Q"],
  ["𝒮", "S"],
  ["𝒯", "T"],
  ["𝒰", "U"],
  ["𝒱", "V"],
  ["𝒲", "W"],
  ["𝒳", "X"],
  ["𝒴", "Y"],
  ["𝒵", "Z"],
  ["𝒶", "a"],
  ["𝒷", "b"],
  ["𝒸", "c"],
  ["𝒹", "d"],
  ["𝒻", "f"],
  ["𝒽", "h"],
  ["𝒾", "i"],
  ["𝒿", "j"],
  ["𝓀", "h"],
  ["𝓁", "l"],
  ["𝓂", "m"],
  ["𝓃", "n"],
  ["𝓅", "p"],
  ["𝓆", "q"],
  ["𝓇", "r"],
  ["𝓈", "s"],
  ["𝓉", "t"],
  ["𝓊", "u"],
  ["𝓋", "v"],
  ["𝓌", "w"],
  ["𝓍", "x"],
  ["𝓎", "y"],
  ["𝓏", "z"],
  ["𝓐", "A"],
  ["𝓑", "B"],
  ["𝓒", "C"],
  ["𝓓", "D"],
  ["𝓔", "E"],
  ["𝓕", "F"],
  ["𝓖", "G"],
  ["𝓗", "H"],
  ["𝓘", "I"],
  ["𝓙", "J"],
  ["𝓚", "K"],
  ["𝓛", "L"],
  ["𝓜", "M"],
  ["𝓝", "N"],
  ["𝓞", "O"],
  ["𝓟", "P"],
  ["𝓠", "Q"],
  ["𝓡", "R"],
  ["𝓢", "S"],
  ["𝓣", "T"],
  ["𝓤", "U"],
  ["𝓥", "V"],
  ["𝓦", "W"],
  ["𝓧", "X"],
  ["𝓨", "Y"],
  ["𝓩", "Z"],
  ["𝓪", "a"],
  ["𝓫", "b"],
  ["𝓬", "c"],
  ["𝓭", "d"],
  ["𝓮", "e"],
  ["𝓯", "f"],
  ["𝓰", "g"],
  ["𝓱", "h"],
  ["𝓲", "i"],
  ["𝓳", "j"],
  ["𝓴", "k"],
  ["𝓵", "l"],
  ["𝓶", "m"],
  ["𝓷", "n"],
  ["𝓸", "o"],
  ["𝓹", "p"],
  ["𝓺", "q"],
  ["𝓻", "r"],
  ["𝓼", "s"],
  ["𝓽", "t"],
  ["𝓾", "u"],
  ["𝓿", "v"],
  ["𝔀", "w"],
  ["𝔁", "x"],
  ["𝔂", "y"],
  ["𝔃", "z"],
  ["𝔄", "A"],
  ["𝔅", "B"],
  ["𝔇", "D"],
  ["𝔈", "E"],
  ["𝔉", "F"],
  ["𝔊", "G"],
  ["𝔍", "J"],
  ["𝔎", "K"],
  ["𝔏", "L"],
  ["𝔐", "M"],
  ["𝔑", "N"],
  ["𝔒", "O"],
  ["𝔓", "P"],
  ["𝔔", "Q"],
  ["𝔖", "S"],
  ["𝔗", "T"],
  ["𝔘", "U"],
  ["𝔙", "V"],
  ["𝔚", "W"],
  ["𝔛", "X"],
  ["𝔜", "Y"],
  ["𝔞", "a"],
  ["𝔟", "b"],
  ["𝔠", "c"],
  ["𝔡", "d"],
  ["𝔢", "e"],
  ["𝔣", "f"],
  ["𝔤", "g"],
  ["𝔥", "h"],
  ["𝔦", "i"],
  ["𝔧", "j"],
  ["𝔨", "k"],
  ["𝔩", "l"],
  ["𝔪", "m"],
  ["𝔫", "n"],
  ["𝔬", "o"],
  ["𝔭", "p"],
  ["𝔮", "q"],
  ["𝔯", "r"],
  ["𝔰", "s"],
  ["𝔱", "t"],
  ["𝔲", "u"],
  ["𝔳", "v"],
  ["𝔴", "w"],
  ["𝔵", "x"],
  ["𝔶", "y"],
  ["𝔷", "z"],
  ["𝔸", "A"],
  ["𝔹", "B"],
  ["𝔻", "D"],
  ["𝔼", "E"],
  ["𝔽", "F"],
  ["𝔾", "G"],
  ["𝕀", "I"],
  ["𝕁", "J"],
  ["𝕂", "K"],
  ["𝕃", "L"],
  ["𝕄", "M"],
  ["𝕆", "N"],
  ["𝕊", "S"],
  ["𝕋", "T"],
  ["𝕌", "U"],
  ["𝕍", "V"],
  ["𝕎", "W"],
  ["𝕏", "X"],
  ["𝕐", "Y"],
  ["𝕒", "a"],
  ["𝕓", "b"],
  ["𝕔", "c"],
  ["𝕕", "d"],
  ["𝕖", "e"],
  ["𝕗", "f"],
  ["𝕘", "g"],
  ["𝕙", "h"],
  ["𝕚", "i"],
  ["𝕛", "j"],
  ["𝕜", "k"],
  ["𝕝", "l"],
  ["𝕞", "m"],
  ["𝕟", "n"],
  ["𝕠", "o"],
  ["𝕡", "p"],
  ["𝕢", "q"],
  ["𝕣", "r"],
  ["𝕤", "s"],
  ["𝕥", "t"],
  ["𝕦", "u"],
  ["𝕧", "v"],
  ["𝕨", "w"],
  ["𝕩", "x"],
  ["𝕪", "y"],
  ["𝕫", "z"],
  ["𝕬", "A"],
  ["𝕭", "B"],
  ["𝕮", "C"],
  ["𝕯", "D"],
  ["𝕰", "E"],
  ["𝕱", "F"],
  ["𝕲", "G"],
  ["𝕳", "H"],
  ["𝕴", "I"],
  ["𝕵", "J"],
  ["𝕶", "K"],
  ["𝕷", "L"],
  ["𝕸", "M"],
  ["𝕹", "N"],
  ["𝕺", "O"],
  ["𝕻", "P"],
  ["𝕼", "Q"],
  ["𝕽", "R"],
  ["𝕾", "S"],
  ["𝕿", "T"],
  ["𝖀", "U"],
  ["𝖁", "V"],
  ["𝖂", "W"],
  ["𝖃", "X"],
  ["𝖄", "Y"],
  ["𝖅", "Z"],
  ["𝖆", "a"],
  ["𝖇", "b"],
  ["𝖈", "c"],
  ["𝖉", "d"],
  ["𝖊", "e"],
  ["𝖋", "f"],
  ["𝖌", "g"],
  ["𝖍", "h"],
  ["𝖎", "i"],
  ["𝖏", "j"],
  ["𝖐", "k"],
  ["𝖑", "l"],
  ["𝖒", "m"],
  ["𝖓", "n"],
  ["𝖔", "o"],
  ["𝖕", "p"],
  ["𝖖", "q"],
  ["𝖗", "r"],
  ["𝖘", "s"],
  ["𝖙", "t"],
  ["𝖚", "u"],
  ["𝖛", "v"],
  ["𝖜", "w"],
  ["𝖝", "x"],
  ["𝖞", "y"],
  ["𝖟", "z"],
  ["𝖠", "A"],
  ["𝖡", "B"],
  ["𝖢", "C"],
  ["𝖣", "D"],
  ["𝖤", "E"],
  ["𝖥", "F"],
  ["𝖦", "G"],
  ["𝖧", "H"],
  ["𝖨", "I"],
  ["𝖩", "J"],
  ["𝖪", "K"],
  ["𝖫", "L"],
  ["𝖬", "M"],
  ["𝖭", "N"],
  ["𝖮", "O"],
  ["𝖯", "P"],
  ["𝖰", "Q"],
  ["𝖱", "R"],
  ["𝖲", "S"],
  ["𝖳", "T"],
  ["𝖴", "U"],
  ["𝖵", "V"],
  ["𝖶", "W"],
  ["𝖷", "X"],
  ["𝖸", "Y"],
  ["𝖹", "Z"],
  ["𝖺", "a"],
  ["𝖻", "b"],
  ["𝖼", "c"],
  ["𝖽", "d"],
  ["𝖾", "e"],
  ["𝖿", "f"],
  ["𝗀", "g"],
  ["𝗁", "h"],
  ["𝗂", "i"],
  ["𝗃", "j"],
  ["𝗄", "k"],
  ["𝗅", "l"],
  ["𝗆", "m"],
  ["𝗇", "n"],
  ["𝗈", "o"],
  ["𝗉", "p"],
  ["𝗊", "q"],
  ["𝗋", "r"],
  ["𝗌", "s"],
  ["𝗍", "t"],
  ["𝗎", "u"],
  ["𝗏", "v"],
  ["𝗐", "w"],
  ["𝗑", "x"],
  ["𝗒", "y"],
  ["𝗓", "z"],
  ["𝗔", "A"],
  ["𝗕", "B"],
  ["𝗖", "C"],
  ["𝗗", "D"],
  ["𝗘", "E"],
  ["𝗙", "F"],
  ["𝗚", "G"],
  ["𝗛", "H"],
  ["𝗜", "I"],
  ["𝗝", "J"],
  ["𝗞", "K"],
  ["𝗟", "L"],
  ["𝗠", "M"],
  ["𝗡", "N"],
  ["𝗢", "O"],
  ["𝗣", "P"],
  ["𝗤", "Q"],
  ["𝗥", "R"],
  ["𝗦", "S"],
  ["𝗧", "T"],
  ["𝗨", "U"],
  ["𝗩", "V"],
  ["𝗪", "W"],
  ["𝗫", "X"],
  ["𝗬", "Y"],
  ["𝗭", "Z"],
  ["𝗮", "a"],
  ["𝗯", "b"],
  ["𝗰", "c"],
  ["𝗱", "d"],
  ["𝗲", "e"],
  ["𝗳", "f"],
  ["𝗴", "g"],
  ["𝗵", "h"],
  ["𝗶", "i"],
  ["𝗷", "j"],
  ["𝗸", "k"],
  ["𝗹", "l"],
  ["𝗺", "m"],
  ["𝗻", "n"],
  ["𝗼", "o"],
  ["𝗽", "p"],
  ["𝗾", "q"],
  ["𝗿", "r"],
  ["𝘀", "s"],
  ["𝘁", "t"],
  ["𝘂", "u"],
  ["𝘃", "v"],
  ["𝘄", "w"],
  ["𝘅", "x"],
  ["𝘆", "y"],
  ["𝘇", "z"],
  ["𝘈", "A"],
  ["𝘉", "B"],
  ["𝘊", "C"],
  ["𝘋", "D"],
  ["𝘌", "E"],
  ["𝘍", "F"],
  ["𝘎", "G"],
  ["𝘏", "H"],
  ["𝘐", "I"],
  ["𝘑", "J"],
  ["𝘒", "K"],
  ["𝘓", "L"],
  ["𝘔", "M"],
  ["𝘕", "N"],
  ["𝘖", "O"],
  ["𝘗", "P"],
  ["𝘘", "Q"],
  ["𝘙", "R"],
  ["𝘚", "S"],
  ["𝘛", "T"],
  ["𝘜", "U"],
  ["𝘝", "V"],
  ["𝘞", "W"],
  ["𝘟", "X"],
  ["𝘠", "Y"],
  ["𝘡", "Z"],
  ["𝘢", "a"],
  ["𝘣", "b"],
  ["𝘤", "c"],
  ["𝘥", "d"],
  ["𝘦", "e"],
  ["𝘧", "f"],
  ["𝘨", "g"],
  ["𝘩", "h"],
  ["𝘪", "i"],
  ["𝘫", "j"],
  ["𝘬", "k"],
  ["𝘭", "l"],
  ["𝘮", "m"],
  ["𝘯", "n"],
  ["𝘰", "o"],
  ["𝘱", "p"],
  ["𝘲", "q"],
  ["𝘳", "r"],
  ["𝘴", "s"],
  ["𝘵", "t"],
  ["𝘶", "u"],
  ["𝘷", "v"],
  ["𝘸", "w"],
  ["𝘹", "x"],
  ["𝘺", "y"],
  ["𝘻", "z"],
  ["𝘼", "A"],
  ["𝘽", "B"],
  ["𝘾", "C"],
  ["𝘿", "D"],
  ["𝙀", "E"],
  ["𝙁", "F"],
  ["𝙂", "G"],
  ["𝙃", "H"],
  ["𝙄", "I"],
  ["𝙅", "J"],
  ["𝙆", "K"],
  ["𝙇", "L"],
  ["𝙈", "M"],
  ["𝙉", "N"],
  ["𝙊", "O"],
  ["𝙋", "P"],
  ["𝙌", "Q"],
  ["𝙍", "R"],
  ["𝙎", "S"],
  ["𝙏", "T"],
  ["𝙐", "U"],
  ["𝙑", "V"],
  ["𝙒", "W"],
  ["𝙓", "X"],
  ["𝙔", "Y"],
  ["𝙕", "Z"],
  ["𝙖", "a"],
  ["𝙗", "b"],
  ["𝙘", "c"],
  ["𝙙", "d"],
  ["𝙚", "e"],
  ["𝙛", "f"],
  ["𝙜", "g"],
  ["𝙝", "h"],
  ["𝙞", "i"],
  ["𝙟", "j"],
  ["𝙠", "k"],
  ["𝙡", "l"],
  ["𝙢", "m"],
  ["𝙣", "n"],
  ["𝙤", "o"],
  ["𝙥", "p"],
  ["𝙦", "q"],
  ["𝙧", "r"],
  ["𝙨", "s"],
  ["𝙩", "t"],
  ["𝙪", "u"],
  ["𝙫", "v"],
  ["𝙬", "w"],
  ["𝙭", "x"],
  ["𝙮", "y"],
  ["𝙯", "z"],
  ["𝙰", "A"],
  ["𝙱", "B"],
  ["𝙲", "C"],
  ["𝙳", "D"],
  ["𝙴", "E"],
  ["𝙵", "F"],
  ["𝙶", "G"],
  ["𝙷", "H"],
  ["𝙸", "I"],
  ["𝙹", "J"],
  ["𝙺", "K"],
  ["𝙻", "L"],
  ["𝙼", "M"],
  ["𝙽", "N"],
  ["𝙾", "O"],
  ["𝙿", "P"],
  ["𝚀", "Q"],
  ["𝚁", "R"],
  ["𝚂", "S"],
  ["𝚃", "T"],
  ["𝚄", "U"],
  ["𝚅", "V"],
  ["𝚆", "W"],
  ["𝚇", "X"],
  ["𝚈", "Y"],
  ["𝚉", "Z"],
  ["𝚊", "a"],
  ["𝚋", "b"],
  ["𝚌", "c"],
  ["𝚍", "d"],
  ["𝚎", "e"],
  ["𝚏", "f"],
  ["𝚐", "g"],
  ["𝚑", "h"],
  ["𝚒", "i"],
  ["𝚓", "j"],
  ["𝚔", "k"],
  ["𝚕", "l"],
  ["𝚖", "m"],
  ["𝚗", "n"],
  ["𝚘", "o"],
  ["𝚙", "p"],
  ["𝚚", "q"],
  ["𝚛", "r"],
  ["𝚜", "s"],
  ["𝚝", "t"],
  ["𝚞", "u"],
  ["𝚟", "v"],
  ["𝚠", "w"],
  ["𝚡", "x"],
  ["𝚢", "y"],
  ["𝚣", "z"],
  // Dotless letters
  ["𝚤", "l"],
  ["𝚥", "j"],
  // Greek
  ["𝛢", "A"],
  ["𝛣", "B"],
  ["𝛤", "G"],
  ["𝛥", "D"],
  ["𝛦", "E"],
  ["𝛧", "Z"],
  ["𝛨", "I"],
  ["𝛩", "TH"],
  ["𝛪", "I"],
  ["𝛫", "K"],
  ["𝛬", "L"],
  ["𝛭", "M"],
  ["𝛮", "N"],
  ["𝛯", "KS"],
  ["𝛰", "O"],
  ["𝛱", "P"],
  ["𝛲", "R"],
  ["𝛳", "TH"],
  ["𝛴", "S"],
  ["𝛵", "T"],
  ["𝛶", "Y"],
  ["𝛷", "F"],
  ["𝛸", "x"],
  ["𝛹", "PS"],
  ["𝛺", "O"],
  ["𝛻", "D"],
  ["𝛼", "a"],
  ["𝛽", "b"],
  ["𝛾", "g"],
  ["𝛿", "d"],
  ["𝜀", "e"],
  ["𝜁", "z"],
  ["𝜂", "i"],
  ["𝜃", "th"],
  ["𝜄", "i"],
  ["𝜅", "k"],
  ["𝜆", "l"],
  ["𝜇", "m"],
  ["𝜈", "n"],
  ["𝜉", "ks"],
  ["𝜊", "o"],
  ["𝜋", "p"],
  ["𝜌", "r"],
  ["𝜍", "s"],
  ["𝜎", "s"],
  ["𝜏", "t"],
  ["𝜐", "y"],
  ["𝜑", "f"],
  ["𝜒", "x"],
  ["𝜓", "ps"],
  ["𝜔", "o"],
  ["𝜕", "d"],
  ["𝜖", "E"],
  ["𝜗", "TH"],
  ["𝜘", "K"],
  ["𝜙", "f"],
  ["𝜚", "r"],
  ["𝜛", "p"],
  ["𝜜", "A"],
  ["𝜝", "V"],
  ["𝜞", "G"],
  ["𝜟", "D"],
  ["𝜠", "E"],
  ["𝜡", "Z"],
  ["𝜢", "I"],
  ["𝜣", "TH"],
  ["𝜤", "I"],
  ["𝜥", "K"],
  ["𝜦", "L"],
  ["𝜧", "M"],
  ["𝜨", "N"],
  ["𝜩", "KS"],
  ["𝜪", "O"],
  ["𝜫", "P"],
  ["𝜬", "S"],
  ["𝜭", "TH"],
  ["𝜮", "S"],
  ["𝜯", "T"],
  ["𝜰", "Y"],
  ["𝜱", "F"],
  ["𝜲", "X"],
  ["𝜳", "PS"],
  ["𝜴", "O"],
  ["𝜵", "D"],
  ["𝜶", "a"],
  ["𝜷", "v"],
  ["𝜸", "g"],
  ["𝜹", "d"],
  ["𝜺", "e"],
  ["𝜻", "z"],
  ["𝜼", "i"],
  ["𝜽", "th"],
  ["𝜾", "i"],
  ["𝜿", "k"],
  ["𝝀", "l"],
  ["𝝁", "m"],
  ["𝝂", "n"],
  ["𝝃", "ks"],
  ["𝝄", "o"],
  ["𝝅", "p"],
  ["𝝆", "r"],
  ["𝝇", "s"],
  ["𝝈", "s"],
  ["𝝉", "t"],
  ["𝝊", "y"],
  ["𝝋", "f"],
  ["𝝌", "x"],
  ["𝝍", "ps"],
  ["𝝎", "o"],
  ["𝝏", "a"],
  ["𝝐", "e"],
  ["𝝑", "i"],
  ["𝝒", "k"],
  ["𝝓", "f"],
  ["𝝔", "r"],
  ["𝝕", "p"],
  ["𝝖", "A"],
  ["𝝗", "B"],
  ["𝝘", "G"],
  ["𝝙", "D"],
  ["𝝚", "E"],
  ["𝝛", "Z"],
  ["𝝜", "I"],
  ["𝝝", "TH"],
  ["𝝞", "I"],
  ["𝝟", "K"],
  ["𝝠", "L"],
  ["𝝡", "M"],
  ["𝝢", "N"],
  ["𝝣", "KS"],
  ["𝝤", "O"],
  ["𝝥", "P"],
  ["𝝦", "R"],
  ["𝝧", "TH"],
  ["𝝨", "S"],
  ["𝝩", "T"],
  ["𝝪", "Y"],
  ["𝝫", "F"],
  ["𝝬", "X"],
  ["𝝭", "PS"],
  ["𝝮", "O"],
  ["𝝯", "D"],
  ["𝝰", "a"],
  ["𝝱", "v"],
  ["𝝲", "g"],
  ["𝝳", "d"],
  ["𝝴", "e"],
  ["𝝵", "z"],
  ["𝝶", "i"],
  ["𝝷", "th"],
  ["𝝸", "i"],
  ["𝝹", "k"],
  ["𝝺", "l"],
  ["𝝻", "m"],
  ["𝝼", "n"],
  ["𝝽", "ks"],
  ["𝝾", "o"],
  ["𝝿", "p"],
  ["𝞀", "r"],
  ["𝞁", "s"],
  ["𝞂", "s"],
  ["𝞃", "t"],
  ["𝞄", "y"],
  ["𝞅", "f"],
  ["𝞆", "x"],
  ["𝞇", "ps"],
  ["𝞈", "o"],
  ["𝞉", "a"],
  ["𝞊", "e"],
  ["𝞋", "i"],
  ["𝞌", "k"],
  ["𝞍", "f"],
  ["𝞎", "r"],
  ["𝞏", "p"],
  ["𝞐", "A"],
  ["𝞑", "V"],
  ["𝞒", "G"],
  ["𝞓", "D"],
  ["𝞔", "E"],
  ["𝞕", "Z"],
  ["𝞖", "I"],
  ["𝞗", "TH"],
  ["𝞘", "I"],
  ["𝞙", "K"],
  ["𝞚", "L"],
  ["𝞛", "M"],
  ["𝞜", "N"],
  ["𝞝", "KS"],
  ["𝞞", "O"],
  ["𝞟", "P"],
  ["𝞠", "S"],
  ["𝞡", "TH"],
  ["𝞢", "S"],
  ["𝞣", "T"],
  ["𝞤", "Y"],
  ["𝞥", "F"],
  ["𝞦", "X"],
  ["𝞧", "PS"],
  ["𝞨", "O"],
  ["𝞩", "D"],
  ["𝞪", "av"],
  ["𝞫", "g"],
  ["𝞬", "d"],
  ["𝞭", "e"],
  ["𝞮", "z"],
  ["𝞯", "i"],
  ["𝞰", "i"],
  ["𝞱", "th"],
  ["𝞲", "i"],
  ["𝞳", "k"],
  ["𝞴", "l"],
  ["𝞵", "m"],
  ["𝞶", "n"],
  ["𝞷", "ks"],
  ["𝞸", "o"],
  ["𝞹", "p"],
  ["𝞺", "r"],
  ["𝞻", "s"],
  ["𝞼", "s"],
  ["𝞽", "t"],
  ["𝞾", "y"],
  ["𝞿", "f"],
  ["𝟀", "x"],
  ["𝟁", "ps"],
  ["𝟂", "o"],
  ["𝟃", "a"],
  ["𝟄", "e"],
  ["𝟅", "i"],
  ["𝟆", "k"],
  ["𝟇", "f"],
  ["𝟈", "r"],
  ["𝟉", "p"],
  ["𝟊", "F"],
  ["𝟋", "f"],
  ["⒜", "(a)"],
  ["⒝", "(b)"],
  ["⒞", "(c)"],
  ["⒟", "(d)"],
  ["⒠", "(e)"],
  ["⒡", "(f)"],
  ["⒢", "(g)"],
  ["⒣", "(h)"],
  ["⒤", "(i)"],
  ["⒥", "(j)"],
  ["⒦", "(k)"],
  ["⒧", "(l)"],
  ["⒨", "(m)"],
  ["⒩", "(n)"],
  ["⒪", "(o)"],
  ["⒫", "(p)"],
  ["⒬", "(q)"],
  ["⒭", "(r)"],
  ["⒮", "(s)"],
  ["⒯", "(t)"],
  ["⒰", "(u)"],
  ["⒱", "(v)"],
  ["⒲", "(w)"],
  ["⒳", "(x)"],
  ["⒴", "(y)"],
  ["⒵", "(z)"],
  ["Ⓐ", "(A)"],
  ["Ⓑ", "(B)"],
  ["Ⓒ", "(C)"],
  ["Ⓓ", "(D)"],
  ["Ⓔ", "(E)"],
  ["Ⓕ", "(F)"],
  ["Ⓖ", "(G)"],
  ["Ⓗ", "(H)"],
  ["Ⓘ", "(I)"],
  ["Ⓙ", "(J)"],
  ["Ⓚ", "(K)"],
  ["Ⓛ", "(L)"],
  ["Ⓝ", "(N)"],
  ["Ⓞ", "(O)"],
  ["Ⓟ", "(P)"],
  ["Ⓠ", "(Q)"],
  ["Ⓡ", "(R)"],
  ["Ⓢ", "(S)"],
  ["Ⓣ", "(T)"],
  ["Ⓤ", "(U)"],
  ["Ⓥ", "(V)"],
  ["Ⓦ", "(W)"],
  ["Ⓧ", "(X)"],
  ["Ⓨ", "(Y)"],
  ["Ⓩ", "(Z)"],
  ["ⓐ", "(a)"],
  ["ⓑ", "(b)"],
  ["ⓒ", "(b)"],
  ["ⓓ", "(c)"],
  ["ⓔ", "(e)"],
  ["ⓕ", "(f)"],
  ["ⓖ", "(g)"],
  ["ⓗ", "(h)"],
  ["ⓘ", "(i)"],
  ["ⓙ", "(j)"],
  ["ⓚ", "(k)"],
  ["ⓛ", "(l)"],
  ["ⓜ", "(m)"],
  ["ⓝ", "(n)"],
  ["ⓞ", "(o)"],
  ["ⓟ", "(p)"],
  ["ⓠ", "(q)"],
  ["ⓡ", "(r)"],
  ["ⓢ", "(s)"],
  ["ⓣ", "(t)"],
  ["ⓤ", "(u)"],
  ["ⓥ", "(v)"],
  ["ⓦ", "(w)"],
  ["ⓧ", "(x)"],
  ["ⓨ", "(y)"],
  ["ⓩ", "(z)"],
  // Maltese
  ["Ċ", "C"],
  ["ċ", "c"],
  ["Ġ", "G"],
  ["ġ", "g"],
  ["Ħ", "H"],
  ["ħ", "h"],
  ["Ż", "Z"],
  ["ż", "z"],
  // Numbers
  ["𝟎", "0"],
  ["𝟏", "1"],
  ["𝟐", "2"],
  ["𝟑", "3"],
  ["𝟒", "4"],
  ["𝟓", "5"],
  ["𝟔", "6"],
  ["𝟕", "7"],
  ["𝟖", "8"],
  ["𝟗", "9"],
  ["𝟘", "0"],
  ["𝟙", "1"],
  ["𝟚", "2"],
  ["𝟛", "3"],
  ["𝟜", "4"],
  ["𝟝", "5"],
  ["𝟞", "6"],
  ["𝟟", "7"],
  ["𝟠", "8"],
  ["𝟡", "9"],
  ["𝟢", "0"],
  ["𝟣", "1"],
  ["𝟤", "2"],
  ["𝟥", "3"],
  ["𝟦", "4"],
  ["𝟧", "5"],
  ["𝟨", "6"],
  ["𝟩", "7"],
  ["𝟪", "8"],
  ["𝟫", "9"],
  ["𝟬", "0"],
  ["𝟭", "1"],
  ["𝟮", "2"],
  ["𝟯", "3"],
  ["𝟰", "4"],
  ["𝟱", "5"],
  ["𝟲", "6"],
  ["𝟳", "7"],
  ["𝟴", "8"],
  ["𝟵", "9"],
  ["𝟶", "0"],
  ["𝟷", "1"],
  ["𝟸", "2"],
  ["𝟹", "3"],
  ["𝟺", "4"],
  ["𝟻", "5"],
  ["𝟼", "6"],
  ["𝟽", "7"],
  ["𝟾", "8"],
  ["𝟿", "9"],
  ["①", "1"],
  ["②", "2"],
  ["③", "3"],
  ["④", "4"],
  ["⑤", "5"],
  ["⑥", "6"],
  ["⑦", "7"],
  ["⑧", "8"],
  ["⑨", "9"],
  ["⑩", "10"],
  ["⑪", "11"],
  ["⑫", "12"],
  ["⑬", "13"],
  ["⑭", "14"],
  ["⑮", "15"],
  ["⑯", "16"],
  ["⑰", "17"],
  ["⑱", "18"],
  ["⑲", "19"],
  ["⑳", "20"],
  ["⑴", "1"],
  ["⑵", "2"],
  ["⑶", "3"],
  ["⑷", "4"],
  ["⑸", "5"],
  ["⑹", "6"],
  ["⑺", "7"],
  ["⑻", "8"],
  ["⑼", "9"],
  ["⑽", "10"],
  ["⑾", "11"],
  ["⑿", "12"],
  ["⒀", "13"],
  ["⒁", "14"],
  ["⒂", "15"],
  ["⒃", "16"],
  ["⒄", "17"],
  ["⒅", "18"],
  ["⒆", "19"],
  ["⒇", "20"],
  ["⒈", "1."],
  ["⒉", "2."],
  ["⒊", "3."],
  ["⒋", "4."],
  ["⒌", "5."],
  ["⒍", "6."],
  ["⒎", "7."],
  ["⒏", "8."],
  ["⒐", "9."],
  ["⒑", "10."],
  ["⒒", "11."],
  ["⒓", "12."],
  ["⒔", "13."],
  ["⒕", "14."],
  ["⒖", "15."],
  ["⒗", "16."],
  ["⒘", "17."],
  ["⒙", "18."],
  ["⒚", "19."],
  ["⒛", "20."],
  ["⓪", "0"],
  ["⓫", "11"],
  ["⓬", "12"],
  ["⓭", "13"],
  ["⓮", "14"],
  ["⓯", "15"],
  ["⓰", "16"],
  ["⓱", "17"],
  ["⓲", "18"],
  ["⓳", "19"],
  ["⓴", "20"],
  ["⓵", "1"],
  ["⓶", "2"],
  ["⓷", "3"],
  ["⓸", "4"],
  ["⓹", "5"],
  ["⓺", "6"],
  ["⓻", "7"],
  ["⓼", "8"],
  ["⓽", "9"],
  ["⓾", "10"],
  ["⓿", "0"],
  // Punctuation
  ["🙰", "&"],
  ["🙱", "&"],
  ["🙲", "&"],
  ["🙳", "&"],
  ["🙴", "&"],
  ["🙵", "&"],
  ["🙶", '"'],
  ["🙷", '"'],
  ["🙸", '"'],
  ["‽", "?!"],
  ["🙹", "?!"],
  ["🙺", "?!"],
  ["🙻", "?!"],
  ["🙼", "/"],
  ["🙽", "\\"],
  // Alchemy
  ["🜇", "AR"],
  ["🜈", "V"],
  ["🜉", "V"],
  ["🜆", "VR"],
  ["🜅", "VF"],
  ["🜩", "2"],
  ["🜪", "5"],
  ["🝡", "f"],
  ["🝢", "W"],
  ["🝣", "U"],
  ["🝧", "V"],
  ["🝨", "T"],
  ["🝪", "V"],
  ["🝫", "MB"],
  ["🝬", "VB"],
  ["🝲", "3B"],
  ["🝳", "3B"],
  // Emojis
  ["💯", "100"],
  ["🔙", "BACK"],
  ["🔚", "END"],
  ["🔛", "ON!"],
  ["🔜", "SOON"],
  ["🔝", "TOP"],
  ["🔞", "18"],
  ["🔤", "abc"],
  ["🔠", "ABCD"],
  ["🔡", "abcd"],
  ["🔢", "1234"],
  ["🔣", "T&@%"],
  ["#️⃣", "#"],
  ["*️⃣", "*"],
  ["0️⃣", "0"],
  ["1️⃣", "1"],
  ["2️⃣", "2"],
  ["3️⃣", "3"],
  ["4️⃣", "4"],
  ["5️⃣", "5"],
  ["6️⃣", "6"],
  ["7️⃣", "7"],
  ["8️⃣", "8"],
  ["9️⃣", "9"],
  ["🔟", "10"],
  ["🅰️", "A"],
  ["🅱️", "B"],
  ["🆎", "AB"],
  ["🆑", "CL"],
  ["🅾️", "O"],
  ["🅿", "P"],
  ["🆘", "SOS"],
  ["🅲", "C"],
  ["🅳", "D"],
  ["🅴", "E"],
  ["🅵", "F"],
  ["🅶", "G"],
  ["🅷", "H"],
  ["🅸", "I"],
  ["🅹", "J"],
  ["🅺", "K"],
  ["🅻", "L"],
  ["🅼", "M"],
  ["🅽", "N"],
  ["🆀", "Q"],
  ["🆁", "R"],
  ["🆂", "S"],
  ["🆃", "T"],
  ["🆄", "U"],
  ["🆅", "V"],
  ["🆆", "W"],
  ["🆇", "X"],
  ["🆈", "Y"],
  ["🆉", "Z"]
], ka = (t, e) => {
  for (const [n, r] of e)
    t = t.replace(new RegExp(tn(n), "g"), r);
  return t;
};
function wa(t, e) {
  if (typeof t != "string")
    throw new TypeError(`Expected a string, got \`${typeof t}\``);
  e = {
    customReplacements: [],
    ...e
  };
  const n = new Map([
    ...xa,
    ...e.customReplacements
  ]);
  return t = t.normalize(), t = ka(t, n), t = t.normalize("NFD").replace(new RegExp("\\p{Diacritic}", "gu"), "").normalize(), t;
}
const Sa = [
  ["&", " and "],
  ["🦄", " unicorn "],
  ["♥", " love "]
], Ta = (t) => t.replace(/([A-Z]{2,})(\d+)/g, "$1 $2").replace(/([a-z\d]+)([A-Z]{2,})/g, "$1 $2").replace(/([a-z\d])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-rt-z\d]+)/g, "$1 $2"), Oa = (t, e) => {
  const n = tn(e);
  return t.replace(new RegExp(`${n}{2,}`, "g"), e).replace(new RegExp(`^${n}|${n}$`, "g"), "");
}, Ea = (t) => {
  let e = "a-z\\d";
  if (e += t.lowercase ? "" : "A-Z", t.preserveCharacters.length > 0)
    for (const n of t.preserveCharacters) {
      if (n === t.separator)
        throw new Error(`The separator character \`${t.separator}\` cannot be included in preserved characters: ${t.preserveCharacters}`);
      e += tn(n);
    }
  return new RegExp(`[^${e}]+`, "g");
};
function nn(t, e) {
  if (typeof t != "string")
    throw new TypeError(`Expected a string, got \`${typeof t}\``);
  e = {
    separator: "-",
    lowercase: !0,
    decamelize: !0,
    customReplacements: [],
    preserveLeadingUnderscore: !1,
    preserveTrailingDash: !1,
    preserveCharacters: [],
    ...e
  };
  const n = e.preserveLeadingUnderscore && t.startsWith("_"), r = e.preserveTrailingDash && t.endsWith("-"), s = new Map([
    ...Sa,
    ...e.customReplacements
  ]);
  t = wa(t, { customReplacements: s }), e.decamelize && (t = Ta(t));
  const a = Ea(e);
  return e.lowercase && (t = t.toLowerCase()), t = t.replace(/([a-zA-Z\d]+)'([ts])(\s|$)/g, "$1$2$3"), t = t.replace(a, e.separator), t = t.replace(/\\/g, ""), e.separator && (t = Oa(t, e.separator)), n && (t = `_${t}`), r && (t = `${t}-`), t;
}
const Aa = i.object({
  title: i.string().min(1),
  cv_template: i.number().default(1),
  cv_data: i.any(),
  slug: i.string().min(1).transform((t) => {
    const e = nn(t);
    return e || Ft();
  }).optional(),
  visibility: i.enum(["public", "private"]).default("private")
});
class ei extends te(Aa) {
}
const Ca = i.object({
  id: Ue
});
class ti extends te(Ca) {
}
const Ra = i.object({
  title: i.string().optional(),
  slug: i.string().min(1).transform((t) => {
    const e = nn(t);
    return e === "" ? Ft() : e;
  }).optional(),
  visibility: i.enum(["public", "private"]).default("private").optional(),
  data: rr
});
class ni extends te(Ra) {
}
const ir = i.object({
  id: Ue,
  title: i.string(),
  slug: i.string(),
  cv_data: i.any(),
  cv_template: i.any(),
  data: rr.default(na),
  visibility: i.enum(["private", "public"]).default("private"),
  locked: i.boolean().default(!1),
  userId: Ue,
  user: ct.optional(),
  createdAt: Me,
  updatedAt: Me,
  created_at: Me,
  updated_at: Me
});
class ri extends te(ir) {
}
const Ia = ir.partial();
class si extends te(Ia) {
}
const Da = i.object({ url: i.string().url() });
class ai extends te(Da) {
}
const ja = i.object({
  views: i.number().int().default(0),
  downloads: i.number().int().default(0)
});
class ii extends te(ja) {
}
const La = i.object({
  title: i.string().min(1),
  slug: i.string().min(1).transform((t) => {
    const e = nn(t);
    return e || Ft();
  }).optional(),
  visibility: i.enum(["public", "private"]).default("private")
});
class oi extends te(La) {
}
export {
  Va as AuthProvidersDto,
  Ya as AuthResponseDto,
  Ka as BackupCodesDto,
  Xa as ContributorDto,
  ei as CreateResumeDto,
  ti as DeleteResumeDto,
  Qa as FeatureDto,
  $a as ForgotPasswordDto,
  oi as GetTemplateListDto,
  ni as ImportResumeDto,
  Ua as LoginDto,
  Fa as MessageDto,
  Ha as RegisterDto,
  Wa as ResetPasswordDto,
  ri as ResumeDto,
  ii as StatisticsDto,
  Ga as TwoFactorBackupDto,
  qa as TwoFactorDto,
  Ja as UpdatePasswordDto,
  si as UpdateResumeDto,
  Ba as UpdateUserDto,
  ai as UrlDto,
  Pa as UserDto,
  za as UserWithSecrets,
  pa as authResponseSchema,
  ga as backupCodesSchema,
  va as contributorSchema,
  Aa as createResumeSchema,
  Ca as deleteResumeSchema,
  ba as featureSchema,
  ms as forgotPasswordSchema,
  La as getTemplateListSchema,
  Ra as importResumeSchema,
  ca as loginSchema,
  da as messageSchema,
  fa as registerSchema,
  ha as resetPasswordSchema,
  ir as resumeSchema,
  ia as secretsSchema,
  ja as statisticsSchema,
  ya as twoFactorBackupSchema,
  ma as twoFactorSchema,
  _a as updatePasswordSchema,
  Ia as updateResumeSchema,
  ua as updateUserSchema,
  Da as urlSchema,
  ct as userSchema,
  oa as userWithSecretsSchema,
  ar as usernameSchema
};
