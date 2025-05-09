import type { Template } from "@reactive-resume/utils";

import { cv_template_1 } from "./cv_template_1";
import { cv_template_2 } from "./cv_template_2";
import { cv_template_3 } from "./cv_template_3";
import { cv_template_4 } from "./cv_template_4";
import { cv_template_5 } from "./cv_template_5";
import { cv_template_6 } from "./cv_template_6";
import { cv_template_7 } from "./cv_template_7";
import { cv_template_8 } from "./cv_template_8";
import { cv_template_9 } from "./cv_template_9";
import { cv_template_10 } from "./cv_template_10";
import { cv_template_11 } from "./cv_template_11";
import { cv_template_12 } from "./cv_template_12";
import { cv_template_13 } from "./cv_template_13";


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
    case "cv_template_6": {
      return cv_template_6;
    }
    case "cv_template_7": {
      return cv_template_7;
    }
    case "cv_template_8": {
      return cv_template_8;
    }
    case "cv_template_9": {
      return cv_template_9;
    }
    case "cv_template_10": {
      return cv_template_10;
    }
    case "cv_template_11": {
      return cv_template_11;
    }
    case "cv_template_12": {
      return cv_template_12;
    }
    case "cv_template_13": {
      return cv_template_13;
    }

    default: {
      return cv_template_4;
    }
  }
};
