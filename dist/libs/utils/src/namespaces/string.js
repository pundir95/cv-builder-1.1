"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    extractUrl: function() {
        return extractUrl;
    },
    generateRandomName: function() {
        return generateRandomName;
    },
    getInitials: function() {
        return getInitials;
    },
    isEmptyString: function() {
        return isEmptyString;
    },
    isUrl: function() {
        return isUrl;
    },
    parseLayoutLocator: function() {
        return parseLayoutLocator;
    },
    processUsername: function() {
        return processUsername;
    },
    sanitize: function() {
        return sanitize;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _sanitizehtml = /*#__PURE__*/ _interop_require_default._(require("sanitize-html"));
const _uniquenamesgenerator = require("unique-names-generator");
const getInitials = (name)=>{
    var _initials_shift, _initials_pop;
    // eslint-disable-next-line unicorn/better-regex
    const regex = new RegExp(RegExp("(\\p{L}{1})\\p{L}+", "gu"));
    const initials = [
        ...name.matchAll(regex)
    ];
    var _initials_shift_, _initials_pop_;
    return (((_initials_shift_ = (_initials_shift = initials.shift()) == null ? void 0 : _initials_shift[1]) != null ? _initials_shift_ : "") + ((_initials_pop_ = (_initials_pop = initials.pop()) == null ? void 0 : _initials_pop[1]) != null ? _initials_pop_ : "")).toUpperCase();
};
const isUrl = (string)=>{
    if (!string) return false;
    const urlRegex = /https?:\/\/[^\n ]+/i;
    return urlRegex.test(string);
};
const isEmptyString = (string)=>{
    if (string === "<p></p>") return true;
    return string.trim().length === 0;
};
const extractUrl = (string)=>{
    const urlRegex = /https?:\/\/[^\n ]+/i;
    const result = urlRegex.exec(string);
    return result ? result[0] : null;
};
const generateRandomName = (options)=>{
    return (0, _uniquenamesgenerator.uniqueNamesGenerator)(_extends._({
        dictionaries: [
            _uniquenamesgenerator.adjectives,
            _uniquenamesgenerator.adjectives,
            _uniquenamesgenerator.animals
        ],
        style: "capital",
        separator: " ",
        length: 3
    }, options));
};
const processUsername = (string)=>{
    if (!string) return "";
    return string.replace(/[^\d.A-Za-z-]/g, "").toLowerCase();
};
const parseLayoutLocator = (payload)=>{
    if (!payload) return {
        page: 0,
        column: 0,
        section: 0
    };
    const section = payload.index;
    const [page, column] = payload.containerId.split(".").map(Number);
    return {
        page,
        column,
        section
    };
};
const sanitize = (html, options)=>{
    var _options_allowedTags;
    const allowedTags = (_options_allowedTags = options == null ? void 0 : options.allowedTags) != null ? _options_allowedTags : [];
    return (0, _sanitizehtml.default)(html, _extends._({}, options, {
        allowedTags: [
            ...allowedTags,
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
        allowedAttributes: _extends._({}, options == null ? void 0 : options.allowedAttributes, {
            "*": [
                "class",
                "style"
            ],
            a: [
                "href",
                "target"
            ],
            img: [
                "src",
                "alt"
            ]
        }),
        allowedStyles: _extends._({}, options == null ? void 0 : options.allowedStyles, {
            "*": {
                "text-align": [
                    /^left$/,
                    /^right$/,
                    /^center$/,
                    /^justify$/
                ]
            }
        })
    }));
};

//# sourceMappingURL=string.js.map