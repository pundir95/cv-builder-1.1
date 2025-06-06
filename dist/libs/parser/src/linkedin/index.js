"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LinkedInParser", {
    enumerable: true,
    get: function() {
        return LinkedInParser;
    }
});
const _export_star = require("@swc/helpers/_/_export_star");
const _extends = require("@swc/helpers/_/_extends");
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _cuid2 = require("@paralleldrive/cuid2");
const _schema = require("@reactive-resume/schema");
const _utils = require("@reactive-resume/utils");
const _jszip = /*#__PURE__*/ _interop_require_wildcard._(require("jszip"));
const _schema1 = _export_star._(require("./schema"), exports);
const avoidTooShort = (name, len)=>{
    if (!name || name.length < len) return "Unknown";
    return name;
};
let LinkedInParser = class LinkedInParser {
    async readFile(file) {
        const data = await _jszip.loadAsync(file);
        if (Object.keys(data.files).length === 0) {
            throw new Error("ParserError: There were no files found inside the zip archive.");
        }
        return data;
    }
    async validate(data) {
        const result = {};
        for (const [name, file] of Object.entries(data.files)){
            for (const key of Object.keys(_schema1.linkedInSchema.shape)){
                if (name.includes(key)) {
                    const content = await file.async("text");
                    result[key] = await (0, _utils.parseCSV)(content);
                }
            }
        }
        return _schema1.linkedInSchema.parse(result);
    }
    convert(data) {
        const result = JSON.parse(JSON.stringify(_schema.defaultResumeData));
        // Profile
        if (data.Profile && data.Profile.length > 0) {
            const profile = data.Profile[0];
            const twitterHandle = profile["Twitter Handles"];
            result.basics.name = `${profile["First Name"]} ${profile["Last Name"]}`;
            result.basics.location = profile["Geo Location"];
            result.basics.headline = profile.Headline;
            // profile.Websites is represented as an array-like structure f.e. [COMPANY:https://some.link,PORTFOLIO:...]
            const extractFirstWebsiteLink = (entry)=>{
                var _parseArrayLikeCSVEntry_;
                return ((_parseArrayLikeCSVEntry_ = (0, _utils.parseArrayLikeCSVEntry)(entry)[0]) != null ? _parseArrayLikeCSVEntry_ : "").replace(/.*?:/, "");
            };
            var _extractUrl;
            result.basics.url.href = (_extractUrl = (0, _utils.extractUrl)(extractFirstWebsiteLink(profile.Websites))) != null ? _extractUrl : "";
            result.sections.summary.content = profile.Summary;
            if (twitterHandle) {
                result.sections.profiles.items.push(_extends._({}, _schema.defaultProfile, {
                    id: (0, _cuid2.createId)(),
                    icon: "twitter",
                    network: "Twitter",
                    username: twitterHandle,
                    url: _extends._({}, _schema.defaultProfile.url, {
                        href: `https://twitter.com/${twitterHandle}`
                    })
                }));
            }
        }
        // Email Addresses
        if (data["Email Addresses"] && data["Email Addresses"].length > 0) {
            const email = data["Email Addresses"][0];
            result.basics.email = email["Email Address"];
        }
        // Positions
        if (data.Positions && data.Positions.length > 0) {
            for (const position of data.Positions){
                var _position_Description, _position_FinishedOn;
                result.sections.experience.items.push(_extends._({}, _schema.defaultExperience, {
                    id: (0, _cuid2.createId)(),
                    company: position["Company Name"],
                    position: position.Title,
                    location: position.Location,
                    summary: (_position_Description = position.Description) != null ? _position_Description : "",
                    date: `${position["Started On"]} - ${(_position_FinishedOn = position["Finished On"]) != null ? _position_FinishedOn : "Present"}`
                }));
            }
        }
        // Education
        if (data.Education && data.Education.length > 0) {
            for (const education of data.Education){
                var _education_Notes, _education_EndDate;
                result.sections.education.items.push(_extends._({}, _schema.defaultEducation, {
                    id: (0, _cuid2.createId)(),
                    institution: avoidTooShort(education["School Name"], 2),
                    studyType: avoidTooShort(education["Degree Name"], 2),
                    summary: avoidTooShort((_education_Notes = education.Notes) != null ? _education_Notes : "", 2),
                    date: `${education["Start Date"]} - ${(_education_EndDate = education["End Date"]) != null ? _education_EndDate : "Present"}`
                }));
            }
        }
        // Skills
        if (data.Skills && data.Skills.length > 0) {
            for (const skill of data.Skills){
                result.sections.skills.items.push(_extends._({}, _schema.defaultSkill, {
                    id: (0, _cuid2.createId)(),
                    name: skill.Name
                }));
            }
        }
        // Languages
        if (data.Languages && data.Languages.length > 0) {
            for (const language of data.Languages){
                var _language_Proficiency;
                result.sections.languages.items.push(_extends._({}, _schema.defaultLanguage, {
                    id: (0, _cuid2.createId)(),
                    name: language.Name,
                    description: (_language_Proficiency = language.Proficiency) != null ? _language_Proficiency : ""
                }));
            }
        }
        // Certifications
        if (data.Certifications && data.Certifications.length > 0) {
            for (const certification of data.Certifications){
                var _certification_FinishedOn;
                result.sections.certifications.items.push(_extends._({}, _schema.defaultCertification, {
                    id: (0, _cuid2.createId)(),
                    name: certification.Name,
                    issuer: certification.Authority,
                    url: _extends._({}, _schema.defaultCertification.url, {
                        href: certification.Url
                    }),
                    date: `${certification["Started On"]} - ${(_certification_FinishedOn = certification["Finished On"]) != null ? _certification_FinishedOn : "Present"}`
                }));
            }
        }
        // Projects
        if (data.Projects && data.Projects.length > 0) {
            for (const project of data.Projects){
                var _project_Url, _project_FinishedOn;
                result.sections.projects.items.push(_extends._({}, _schema.defaultProject, {
                    id: (0, _cuid2.createId)(),
                    name: project.Title,
                    description: project.Description,
                    url: _extends._({}, _schema.defaultProject.url, {
                        href: (_project_Url = project.Url) != null ? _project_Url : ""
                    }),
                    date: `${project["Started On"]} - ${(_project_FinishedOn = project["Finished On"]) != null ? _project_FinishedOn : "Present"}`
                }));
            }
        }
        return _schema.resumeDataSchema.parse(result);
    }
    constructor(){
        this.schema = _schema1.linkedInSchema;
    }
};

//# sourceMappingURL=index.js.map