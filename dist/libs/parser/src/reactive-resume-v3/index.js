/* eslint-disable @typescript-eslint/no-non-null-assertion */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReactiveResumeV3Parser", {
    enumerable: true,
    get: function() {
        return ReactiveResumeV3Parser;
    }
});
const _export_star = require("@swc/helpers/_/_export_star");
const _extends = require("@swc/helpers/_/_extends");
const _cuid2 = require("@paralleldrive/cuid2");
const _schema = require("@reactive-resume/schema");
const _utils = require("@reactive-resume/utils");
const _schema1 = _export_star._(require("./schema"), exports);
let ReactiveResumeV3Parser = class ReactiveResumeV3Parser {
    readFile(file) {
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            // eslint-disable-next-line unicorn/prefer-add-event-listener
            reader.onload = ()=>{
                try {
                    const result = JSON.parse(reader.result);
                    resolve(result);
                } catch (e) {
                    reject(new Error("Failed to parse JSON"));
                }
            };
            // eslint-disable-next-line unicorn/prefer-add-event-listener
            reader.onerror = ()=>{
                reject(new Error("Failed to read the file"));
            };
            // eslint-disable-next-line unicorn/prefer-blob-reading-methods
            reader.readAsText(file);
        });
    }
    validate(data) {
        return this.schema.parse(data);
    }
    convert(data) {
        var _data_basics_summary, _data_sections_work, _data_sections_awards, _data_sections_skills, _data_sections_projects, _data_sections_education, _data_sections_interests, _data_sections_languages, _data_sections_volunteer, _data_sections_references, _data_sections_publications, _data_sections_certifications;
        const result = JSON.parse(JSON.stringify(_schema.defaultResumeData));
        var _data_basics_name;
        // Basics
        result.basics.name = (_data_basics_name = data.basics.name) != null ? _data_basics_name : "";
        result.basics.email = data.basics.email;
        var _data_basics_phone;
        result.basics.phone = (_data_basics_phone = data.basics.phone) != null ? _data_basics_phone : "";
        var _data_basics_headline;
        result.basics.headline = (_data_basics_headline = data.basics.headline) != null ? _data_basics_headline : "";
        var _data_basics_location_address;
        result.basics.location = (_data_basics_location_address = data.basics.location.address) != null ? _data_basics_location_address : "";
        var _ref;
        result.sections.summary.content = (_ref = typeof data.basics.summary === "string" ? data.basics.summary : (_data_basics_summary = data.basics.summary) == null ? void 0 : _data_basics_summary.body) != null ? _ref : "";
        result.basics.picture.url = (0, _utils.isUrl)(data.basics.photo.url) ? data.basics.photo.url : "";
        // Profiles
        if (data.basics.profiles && data.basics.profiles.length > 0) {
            for (const profile of data.basics.profiles){
                var _profile_network, _profile_username, _profile_network1;
                result.sections.profiles.items.push(_extends._({}, _schema.defaultProfile, {
                    id: (0, _cuid2.createId)(),
                    network: (_profile_network = profile.network) != null ? _profile_network : "",
                    username: (_profile_username = profile.username) != null ? _profile_username : "",
                    icon: ((_profile_network1 = profile.network) != null ? _profile_network1 : "").toLocaleLowerCase(),
                    url: _extends._({}, _schema.defaultProfile.url, {
                        href: (0, _utils.isUrl)(profile.url) ? profile.url : ""
                    })
                }));
            }
        }
        // Work
        if (((_data_sections_work = data.sections.work) == null ? void 0 : _data_sections_work.items) && data.sections.work.items.length > 0) {
            for (const work of data.sections.work.items){
                var _work_date, _work_date1;
                if (!work) continue;
                var _work_name, _work_position, _work_summary;
                result.sections.experience.items.push(_extends._({}, _schema.defaultExperience, {
                    id: (0, _cuid2.createId)(),
                    company: (_work_name = work.name) != null ? _work_name : "",
                    position: (_work_position = work.position) != null ? _work_position : "",
                    summary: (_work_summary = work.summary) != null ? _work_summary : "",
                    date: `${(_work_date = work.date) == null ? void 0 : _work_date.start} - ${(_work_date1 = work.date) == null ? void 0 : _work_date1.end}`,
                    url: _extends._({}, _schema.defaultExperience.url, {
                        href: (0, _utils.isUrl)(work.url) ? work.url : ""
                    })
                }));
            }
        }
        // Awards
        if (((_data_sections_awards = data.sections.awards) == null ? void 0 : _data_sections_awards.items) && data.sections.awards.items.length > 0) {
            for (const award of data.sections.awards.items){
                if (!award) continue;
                var _award_title, _award_awarder, _award_date, _award_summary;
                result.sections.awards.items.push(_extends._({}, _schema.defaultAward, {
                    id: (0, _cuid2.createId)(),
                    title: (_award_title = award.title) != null ? _award_title : "",
                    awarder: (_award_awarder = award.awarder) != null ? _award_awarder : "",
                    date: (_award_date = award.date) != null ? _award_date : "",
                    summary: (_award_summary = award.summary) != null ? _award_summary : "",
                    url: _extends._({}, _schema.defaultAward.url, {
                        href: (0, _utils.isUrl)(award.url) ? award.url : ""
                    })
                }));
            }
        }
        // Skills
        if (((_data_sections_skills = data.sections.skills) == null ? void 0 : _data_sections_skills.items) && data.sections.skills.items.length > 0) {
            for (const skill of data.sections.skills.items){
                if (!skill) continue;
                var _skill_name, _skill_level;
                result.sections.skills.items.push(_extends._({}, _schema.defaultSkill, {
                    id: (0, _cuid2.createId)(),
                    name: (_skill_name = skill.name) != null ? _skill_name : "",
                    level: Math.floor(skill.levelNum / 2),
                    description: (_skill_level = skill.level) != null ? _skill_level : "",
                    keywords: Array.isArray(skill.keywords) ? skill.keywords.filter(Boolean) : []
                }));
            }
        }
        // Projects
        if (((_data_sections_projects = data.sections.projects) == null ? void 0 : _data_sections_projects.items) && data.sections.projects.items.length > 0) {
            for (const project of data.sections.projects.items){
                var _project_date, _project_date1;
                if (!project) continue;
                var _project_name, _project_summary, _project_description;
                result.sections.projects.items.push(_extends._({}, _schema.defaultProject, {
                    id: (0, _cuid2.createId)(),
                    name: (_project_name = project.name) != null ? _project_name : "",
                    summary: (_project_summary = project.summary) != null ? _project_summary : "",
                    description: (_project_description = project.description) != null ? _project_description : "",
                    date: `${(_project_date = project.date) == null ? void 0 : _project_date.start} - ${(_project_date1 = project.date) == null ? void 0 : _project_date1.end}`,
                    keywords: Array.isArray(project.keywords) ? project.keywords.filter(Boolean) : [],
                    url: _extends._({}, _schema.defaultProject.url, {
                        href: (0, _utils.isUrl)(project.url) ? project.url : ""
                    })
                }));
            }
        }
        // Education
        if (((_data_sections_education = data.sections.education) == null ? void 0 : _data_sections_education.items) && data.sections.education.items.length > 0) {
            for (const education of data.sections.education.items){
                var _education_date, _education_date1;
                if (!education) continue;
                var _education_institution, _education_degree, _education_area, _education_score, _education_summary;
                result.sections.education.items.push(_extends._({}, _schema.defaultEducation, {
                    id: (0, _cuid2.createId)(),
                    institution: (_education_institution = education.institution) != null ? _education_institution : "",
                    studyType: (_education_degree = education.degree) != null ? _education_degree : "",
                    area: (_education_area = education.area) != null ? _education_area : "",
                    score: (_education_score = education.score) != null ? _education_score : "",
                    summary: (_education_summary = education.summary) != null ? _education_summary : "",
                    date: `${(_education_date = education.date) == null ? void 0 : _education_date.start} - ${(_education_date1 = education.date) == null ? void 0 : _education_date1.end}`,
                    url: _extends._({}, _schema.defaultEducation.url, {
                        href: (0, _utils.isUrl)(education.url) ? education.url : ""
                    })
                }));
            }
        }
        // Interests
        if (((_data_sections_interests = data.sections.interests) == null ? void 0 : _data_sections_interests.items) && data.sections.interests.items.length > 0) {
            for (const interest of data.sections.interests.items){
                if (!interest) continue;
                var _interest_name;
                result.sections.interests.items.push(_extends._({}, _schema.defaultInterest, {
                    id: (0, _cuid2.createId)(),
                    name: (_interest_name = interest.name) != null ? _interest_name : "",
                    keywords: Array.isArray(interest.keywords) ? interest.keywords.filter(Boolean) : []
                }));
            }
        }
        // Languages
        if (((_data_sections_languages = data.sections.languages) == null ? void 0 : _data_sections_languages.items) && data.sections.languages.items.length > 0) {
            for (const language of data.sections.languages.items){
                if (!language) continue;
                var _language_name, _language_level;
                result.sections.languages.items.push(_extends._({}, _schema.defaultLanguage, {
                    id: (0, _cuid2.createId)(),
                    name: (_language_name = language.name) != null ? _language_name : "",
                    description: (_language_level = language.level) != null ? _language_level : "",
                    level: Math.floor(language.levelNum / 2)
                }));
            }
        }
        // Volunteer
        if (((_data_sections_volunteer = data.sections.volunteer) == null ? void 0 : _data_sections_volunteer.items) && data.sections.volunteer.items.length > 0) {
            for (const volunteer of data.sections.volunteer.items){
                var _volunteer_date, _volunteer_date1;
                if (!volunteer) continue;
                var _volunteer_organization, _volunteer_position, _volunteer_summary;
                result.sections.volunteer.items.push(_extends._({}, _schema.defaultVolunteer, {
                    id: (0, _cuid2.createId)(),
                    organization: (_volunteer_organization = volunteer.organization) != null ? _volunteer_organization : "",
                    position: (_volunteer_position = volunteer.position) != null ? _volunteer_position : "",
                    summary: (_volunteer_summary = volunteer.summary) != null ? _volunteer_summary : "",
                    date: `${(_volunteer_date = volunteer.date) == null ? void 0 : _volunteer_date.start} - ${(_volunteer_date1 = volunteer.date) == null ? void 0 : _volunteer_date1.end}`,
                    url: _extends._({}, _schema.defaultVolunteer.url, {
                        href: (0, _utils.isUrl)(volunteer.url) ? volunteer.url : ""
                    })
                }));
            }
        }
        // References
        if (((_data_sections_references = data.sections.references) == null ? void 0 : _data_sections_references.items) && data.sections.references.items.length > 0) {
            for (const reference of data.sections.references.items){
                if (!reference) continue;
                var _reference_name, _reference_summary, _reference_relationship;
                result.sections.references.items.push(_extends._({}, _schema.defaultReference, {
                    id: (0, _cuid2.createId)(),
                    name: (_reference_name = reference.name) != null ? _reference_name : "",
                    summary: (_reference_summary = reference.summary) != null ? _reference_summary : "",
                    description: (_reference_relationship = reference.relationship) != null ? _reference_relationship : ""
                }));
            }
        }
        // Publications
        if (((_data_sections_publications = data.sections.publications) == null ? void 0 : _data_sections_publications.items) && data.sections.publications.items.length > 0) {
            for (const publication of data.sections.publications.items){
                if (!publication) continue;
                var _publication_name, _publication_summary, _publication_date;
                result.sections.publications.items.push(_extends._({}, _schema.defaultPublication, {
                    id: (0, _cuid2.createId)(),
                    name: (_publication_name = publication.name) != null ? _publication_name : "",
                    summary: (_publication_summary = publication.summary) != null ? _publication_summary : "",
                    date: (_publication_date = publication.date) != null ? _publication_date : "",
                    url: _extends._({}, _schema.defaultPublication.url, {
                        href: (0, _utils.isUrl)(publication.url) ? publication.url : ""
                    })
                }));
            }
        }
        // Certifications
        if (((_data_sections_certifications = data.sections.certifications) == null ? void 0 : _data_sections_certifications.items) && data.sections.certifications.items.length > 0) {
            for (const certification of data.sections.certifications.items){
                if (!certification) continue;
                var _certification_name, _certification_issuer, _certification_summary, _certification_date;
                result.sections.certifications.items.push(_extends._({}, _schema.defaultCertification, {
                    id: (0, _cuid2.createId)(),
                    name: (_certification_name = certification.name) != null ? _certification_name : "",
                    issuer: (_certification_issuer = certification.issuer) != null ? _certification_issuer : "",
                    summary: (_certification_summary = certification.summary) != null ? _certification_summary : "",
                    date: (_certification_date = certification.date) != null ? _certification_date : "",
                    url: _extends._({}, _schema.defaultCertification.url, {
                        href: (0, _utils.isUrl)(certification.url) ? certification.url : ""
                    })
                }));
            }
        }
        return result;
    }
    constructor(){
        this.schema = _schema1.reactiveResumeV3Schema;
    }
};

//# sourceMappingURL=index.js.map