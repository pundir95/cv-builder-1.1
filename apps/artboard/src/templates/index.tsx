import type { Template } from "@reactive-resume/utils";

import { cv_template_1 } from "./cv_template_1";
import { cv_template_2 } from "./cv_template_2";
import { cv_template_3 } from "./cv_template_3";
import { cv_template_4 } from "./cv_template_4";
import { cv_template_5 } from "./cv_template_5";


export const getTemplate = (template: Template) => {
  console.log(template, "templatename");
  switch (template.name) {
    case "cv_template_1": {
      return cv_template_1;
    }
    case "cv_template_2": {
      return cv_template_2;
    }
    case "cv_template_3": {
      return cv_template_3;
    }
    case "cv_template_4": {
      return cv_template_4;
    }
    case "cv_template_5": {
      return cv_template_5;
    }
    default: {
      return cv_template_2;
    }
  }
};
