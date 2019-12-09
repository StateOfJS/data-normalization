/**
 * This file normalize the various fields we use
 * for our surveys.
 */

// tools
export const FIELD_TYPE_TOOL = 'tool'
export const FIELD_TYPE_HAPPINESS = 'overall_happiness'
export const FIELD_TYPE_SECTION_OTHER_TOOLS = 'section_other_tools'
export const FIELD_TYPE_TOOL_LIKE_REASONS = 'like'
export const FIELD_TYPE_TOOL_DISLIKE_REASONS = 'dislike'
export const FIELD_TYPE_GLOBAL_OPINION = 'opinion_questions'
export const FIELD_TYPE_OTHER_TOOLS = 'other_tools'

// user info
export const FIELD_TYPE_YEARS_OF_EXPERIENCE = 'years_of_experience'
export const FIELD_TYPE_SALARY = 'yearly_salary'
export const FIELD_TYPE_COMPANY_SIZE = 'company_size'
export const FIELD_TYPE_EMAIL = 'email'
export const FIELD_TYPE_SOURCE = 'source'
export const FIELD_TYPE_GENDER = 'gender'
export const FIELD_TYPE_COUNTRY = 'country'

export const userInfoFields = [
    FIELD_TYPE_YEARS_OF_EXPERIENCE,
    FIELD_TYPE_SALARY,
    FIELD_TYPE_COMPANY_SIZE,
    FIELD_TYPE_EMAIL,
    FIELD_TYPE_SOURCE,
    FIELD_TYPE_GENDER,
    FIELD_TYPE_COUNTRY,
]