"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "JsonResumeParser", {
    enumerable: true,
    get: function() {
        return JsonResumeParser;
    }
});
const _export_star = require("@swc/helpers/_/_export_star");
const _extends = require("@swc/helpers/_/_extends");
const _cuid2 = require("@paralleldrive/cuid2");
const _schema = require("@reactive-resume/schema");
const _schema1 = _export_star._(require("./schema"), exports);
let JsonResumeParser = class JsonResumeParser {
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
        var _data_basics, _data_basics1, _data_basics2, _data_basics3, _data_basics4, _data_basics_location, _data_basics5, _data_basics6, _data_basics7, _data_basics8;
        const result = JSON.parse(JSON.stringify(_schema.defaultResumeData));
        var _data_basics_name;
        // Basics
        result.basics.name = (_data_basics_name = (_data_basics = data.basics) == null ? void 0 : _data_basics.name) != null ? _data_basics_name : "";
        var _data_basics_label;
        result.basics.headline = (_data_basics_label = (_data_basics1 = data.basics) == null ? void 0 : _data_basics1.label) != null ? _data_basics_label : "";
        var _data_basics_image;
        result.basics.picture.url = (_data_basics_image = (_data_basics2 = data.basics) == null ? void 0 : _data_basics2.image) != null ? _data_basics_image : "";
        var _data_basics_email;
        result.basics.email = (_data_basics_email = (_data_basics3 = data.basics) == null ? void 0 : _data_basics3.email) != null ? _data_basics_email : "";
        var _data_basics_phone;
        result.basics.phone = (_data_basics_phone = (_data_basics4 = data.basics) == null ? void 0 : _data_basics4.phone) != null ? _data_basics_phone : "";
        var _data_basics_location_address;
        result.basics.location = (_data_basics_location_address = (_data_basics5 = data.basics) == null ? void 0 : (_data_basics_location = _data_basics5.location) == null ? void 0 : _data_basics_location.address) != null ? _data_basics_location_address : "";
        var _data_basics_url;
        result.basics.url.href = (_data_basics_url = (_data_basics6 = data.basics) == null ? void 0 : _data_basics6.url) != null ? _data_basics_url : "";
        var _data_basics_summary;
        result.sections.summary.content = (_data_basics_summary = (_data_basics7 = data.basics) == null ? void 0 : _data_basics7.summary) != null ? _data_basics_summary : "";
        // Profiles
        if ((_data_basics8 = data.basics) == null ? void 0 : _data_basics8.profiles) {
            for (const profile of data.basics.profiles){
                var _profile_network;
                var _profile_network_toLocaleLowerCase, _profile_network1, _profile_username, _profile_url;
                result.sections.profiles.items.push(_extends._({}, _schema.defaultProfile, {
                    id: (0, _cuid2.createId)(),
                    icon: (_profile_network_toLocaleLowerCase = (_profile_network = profile.network) == null ? void 0 : _profile_network.toLocaleLowerCase()) != null ? _profile_network_toLocaleLowerCase : "",
                    network: (_profile_network1 = profile.network) != null ? _profile_network1 : "",
                    username: (_profile_username = profile.username) != null ? _profile_username : "",
                    url: _extends._({}, _schema.defaultProfile.url, {
                        href: (_profile_url = profile.url) != null ? _profile_url : ""
                    })
                }));
            }
        }
        // Work
        if (data.work) {
            for (const work of data.work){
                var _work_name, _work_position, _work_summary, _work_url;
                result.sections.experience.items.push(_extends._({}, _schema.defaultExperience, {
                    id: (0, _cuid2.createId)(),
                    company: (_work_name = work.name) != null ? _work_name : "",
                    position: (_work_position = work.position) != null ? _work_position : "",
                    summary: (_work_summary = work.summary) != null ? _work_summary : "",
                    date: `${work.startDate} - ${work.endDate}`,
                    url: _extends._({}, _schema.defaultExperience.url, {
                        href: (_work_url = work.url) != null ? _work_url : ""
                    })
                }));
            }
        }
        // Volunteer
        if (data.volunteer) {
            for (const volunteer of data.volunteer){
                var _volunteer_organization, _volunteer_position, _volunteer_summary, _volunteer_url;
                result.sections.volunteer.items.push(_extends._({}, _schema.defaultVolunteer, {
                    id: (0, _cuid2.createId)(),
                    organization: (_volunteer_organization = volunteer.organization) != null ? _volunteer_organization : "",
                    date: `${volunteer.startDate} - ${volunteer.endDate}`,
                    position: (_volunteer_position = volunteer.position) != null ? _volunteer_position : "",
                    summary: (_volunteer_summary = volunteer.summary) != null ? _volunteer_summary : "",
                    url: _extends._({}, _schema.defaultVolunteer.url, {
                        href: (_volunteer_url = volunteer.url) != null ? _volunteer_url : ""
                    })
                }));
            }
        }
        // Education
        if (data.education) {
            for (const education of data.education){
                var _education_institution, _education_studyType, _education_area, _education_score, _education_url;
                result.sections.education.items.push(_extends._({}, _schema.defaultEducation, {
                    id: (0, _cuid2.createId)(),
                    institution: (_education_institution = education.institution) != null ? _education_institution : "",
                    studyType: (_education_studyType = education.studyType) != null ? _education_studyType : "",
                    area: (_education_area = education.area) != null ? _education_area : "",
                    score: (_education_score = education.score) != null ? _education_score : "",
                    date: `${education.startDate} - ${education.endDate}`,
                    url: _extends._({}, _schema.defaultEducation.url, {
                        href: (_education_url = education.url) != null ? _education_url : ""
                    })
                }));
            }
        }
        // Awards
        if (data.awards) {
            for (const award of data.awards){
                var _award_title, _award_date, _award_awarder, _award_summary;
                result.sections.awards.items.push(_extends._({}, _schema.defaultAward, {
                    id: (0, _cuid2.createId)(),
                    title: (_award_title = award.title) != null ? _award_title : "",
                    date: (_award_date = award.date) != null ? _award_date : "",
                    awarder: (_award_awarder = award.awarder) != null ? _award_awarder : "",
                    summary: (_award_summary = award.summary) != null ? _award_summary : ""
                }));
            }
        }
        // Certificates
        if (data.certificates) {
            for (const certificate of data.certificates){
                var _certificate_name, _certificate_date, _certificate_issuer, _certificate_summary;
                result.sections.certifications.items.push(_extends._({}, _schema.defaultCertification, {
                    id: (0, _cuid2.createId)(),
                    name: (_certificate_name = certificate.name) != null ? _certificate_name : "",
                    date: (_certificate_date = certificate.date) != null ? _certificate_date : "",
                    issuer: (_certificate_issuer = certificate.issuer) != null ? _certificate_issuer : "",
                    summary: (_certificate_summary = certificate.summary) != null ? _certificate_summary : ""
                }));
            }
        }
        // Publications
        if (data.publications) {
            for (const publication of data.publications){
                var _publication_name, _publication_publisher, _publication_summary, _publication_releaseDate, _publication_url;
                result.sections.publications.items.push(_extends._({}, _schema.defaultPublication, {
                    id: (0, _cuid2.createId)(),
                    name: (_publication_name = publication.name) != null ? _publication_name : "",
                    publisher: (_publication_publisher = publication.publisher) != null ? _publication_publisher : "",
                    summary: (_publication_summary = publication.summary) != null ? _publication_summary : "",
                    date: (_publication_releaseDate = publication.releaseDate) != null ? _publication_releaseDate : "",
                    url: _extends._({}, _schema.defaultPublication.url, {
                        href: (_publication_url = publication.url) != null ? _publication_url : ""
                    })
                }));
            }
        }
        // Skills
        if (data.skills) {
            for (const skill of data.skills){
                var _skill_name, _skill_level, _skill_keywords;
                result.sections.skills.items.push(_extends._({}, _schema.defaultSkill, {
                    id: (0, _cuid2.createId)(),
                    name: (_skill_name = skill.name) != null ? _skill_name : "",
                    description: (_skill_level = skill.level) != null ? _skill_level : "",
                    keywords: (_skill_keywords = skill.keywords) != null ? _skill_keywords : []
                }));
            }
        }
        // Languages
        if (data.languages) {
            for (const language of data.languages){
                var _language_language, _language_fluency;
                result.sections.languages.items.push(_extends._({}, _schema.defaultLanguage, {
                    id: (0, _cuid2.createId)(),
                    name: (_language_language = language.language) != null ? _language_language : "",
                    description: (_language_fluency = language.fluency) != null ? _language_fluency : ""
                }));
            }
        }
        // Interests
        if (data.interests) {
            for (const interest of data.interests){
                var _interest_name, _interest_keywords;
                result.sections.interests.items.push(_extends._({}, _schema.defaultInterest, {
                    id: (0, _cuid2.createId)(),
                    name: (_interest_name = interest.name) != null ? _interest_name : "",
                    keywords: (_interest_keywords = interest.keywords) != null ? _interest_keywords : []
                }));
            }
        }
        // References
        if (data.references) {
            for (const reference of data.references){
                var _reference_name, _reference_reference;
                result.sections.references.items.push(_extends._({}, _schema.defaultReference, {
                    id: (0, _cuid2.createId)(),
                    name: (_reference_name = reference.name) != null ? _reference_name : "",
                    summary: (_reference_reference = reference.reference) != null ? _reference_reference : ""
                }));
            }
        }
        return result;
    }
    constructor(){
        this.schema = _schema1.jsonResumeSchema;
    }
};

//# sourceMappingURL=index.js.map