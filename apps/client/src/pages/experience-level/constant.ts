export const BUILDER_HEADING = {
    "experience_time": {
        "main": "How long have you been working?",
        "para": "We'll find the best templates for your experience level"
    },
    

    "is_student": {
        "main": "Are you a student?"

    },
    "experience_level": {
        "main": "Select the option that best describes your education level.",
        "para": "Your education background can help us guide you through relevant sections for your resume"
    },
    "choose_template": {
        "main": "Choose a Template",
        "para": "Select a template that best suits your needs"
    }
}   



export const EXPERIENCE_TIME = [
    {
        label: "No Experience",
        value: "no_experience",
        isOpenNext: true,
        type: "isStudent"
    },
    {
        label: "Less than 3 years",
        value: "less_than_3_years",
        isOpenNext: true,
        type: "isStudent"
    },
    {
        label: "3-5 Years",
        value: "3-5",
        isOpenNext: false,
        type: "isStudent"
    },
    {
        label: "5-10 Years",
        value: "5-10",
        isOpenNext: false,
        type: "isStudent"
    },
    {
        label: "10+ Years",
        value: "10+",
        isOpenNext: false,
        type: "isStudent"
    }

]

export const IS_STUDENT = [
    {
        name: "Yes",
        isStudent: true,
        order: 1,
        type: "isTime"
    },
    {
        name: "No",
        isStudent: false,
        type: "isTime",
        order: 2
    }
]


export const EDUCATION_LEVEL = [
    {
        label: "High School or GED",
        value: "high_school_or_ged"
    },
    {
        label: "Associates",
        value: "associates"
    }, {
        label: "Bachelors",
        value: "bachelors"
    },
    {
        label: "Masters or Higher",
        value: "masters_or_higher"
    }, {
        label: "Some College",
        value: "some_college"
    },
    {
        label: "Vocational",
        value: "vocational"
    }
]
