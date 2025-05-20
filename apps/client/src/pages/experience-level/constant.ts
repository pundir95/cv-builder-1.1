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
        "main": "Popular Templates for Jobseekers with Limited Experience",
        "para": "Explore templates designed to highlight your skills and potential, even with minimal experience."
    },
    "upload_resume": {
        "main": "Are you uploading an existing resume?",
        "para": "Just review, edit, and update it with new information"
    },
    "choose_file": {
        "main": "How do you want to upload your resume?",
        "para": ""
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
