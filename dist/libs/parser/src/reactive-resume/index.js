"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReactiveResumeParser", {
    enumerable: true,
    get: function() {
        return ReactiveResumeParser;
    }
});
const _schema = require("@reactive-resume/schema");
let ReactiveResumeParser = class ReactiveResumeParser {
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
        return data;
    }
    constructor(){
        this.schema = _schema.resumeDataSchema;
    }
};

//# sourceMappingURL=index.js.map