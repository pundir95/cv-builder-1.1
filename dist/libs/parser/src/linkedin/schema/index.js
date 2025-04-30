"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "linkedInSchema", {
    enumerable: true,
    get: function() {
        return linkedInSchema;
    }
});
const _zod = require("zod");
const _certification = require("./certification");
const _education = require("./education");
const _email = require("./email");
const _language = require("./language");
const _position = require("./position");
const _profile = require("./profile");
const _project = require("./project");
const _skill = require("./skill");
const linkedInSchema = _zod.z.object({
    Profile: _zod.z.array(_profile.profileSchema).optional(),
    "Email Addresses": _zod.z.array(_email.emailSchema).optional(),
    Certifications: _zod.z.array(_certification.certificationSchema).optional(),
    Education: _zod.z.array(_education.educationSchema).optional(),
    Languages: _zod.z.array(_language.languageSchema).optional(),
    Positions: _zod.z.array(_position.positionSchema).optional(),
    Projects: _zod.z.array(_project.projectSchema).optional(),
    Skills: _zod.z.array(_skill.skillSchema).optional()
});

//# sourceMappingURL=index.js.map