export const APIConst={
    GET_PATIENTS : 'management/patient-users',
    PATIENT_DETAILS:'management/demographic',
    ALLERGY_DETAILS_BY_ID:'management/allergyById',
    ALLERGY_DETAILS:'management/allergy',
    GET_USER_DATA:'management/userById',
    GET_PATIENT_DATA:'management/demographicById',
    GET_ALLERGY_LIST : 'management/allergyList',

    GET_ALLERGY_DETAILS:'management/allergy/allergycode',
   

    MEDICATION_DOMAIN:'medication/',
    PROCEDURE_DOMAIN:'procedure/',
    DIAGNOSIS_DOMAIN:'diagnosis/',
    VITAL_SIGN_DOMAIN:'vital-sign/',
    PATIENT_DETAIL_DOMAIN:'patient-detail/',
    VISIT_DOMAIN:'visit/',


    // vital apis
    PATIENT:{
        DIAGNOSIS_DETAILS:'patient-diagnosis',
        PROCEDURE_DETAILS:'patient-procedure',
        MEDICATION_DETAILS:'patient-medication',
        VISIT_HISTORY:'patient-visit-history',
    },

    NON_DEPRICATED: 'getNonDepricated',

    // dashboard apis
    BLOOD_PRESSURE_LIST:'get-blood-pressure',
    RESPIRATION_LIST:'get-respiration-rate',
    DASHBOARD_VITAL_SIGN:'get-latest-vital-signs',
}