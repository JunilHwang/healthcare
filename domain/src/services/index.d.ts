export interface Condition {
  conditionConceptID: number;
  conditionConceptName: string;
  conditionEndDate: string;
  conditionStartDate: string;
  visitID: number;
}

export interface Drug {
  drugConceptID: number;
  drugConceptName: string;
  drugEndDate: string;
  drugStartDate: string;
  visitID: number;
}

export interface Patient {
  age: number;
  birthDatetime: string;
  ethnicity: string;
  gender: string;
  isDeath: boolean;
  personID: number;
  race: string;
}

export interface Visit {
  visitConceptID: number;
  visitConceptName: string;
  visitEndDate: string;
  visitID: number;
  visitStartDate: string;
}

export interface Patients {
  list: Patient[];
  page: number;
  totalLength: number;
}

export interface PatientStat {
  count?: number;
  ethnicity?: string;
  gender?: string;
  race?: string;
}

export interface EthnicityResponse {
  ethnicityList: string[];
}

export interface GendersResponse {
  genderList: string[];
}

export interface PatientBriefResponse {
  conditionList: string[];
  visitCount: number;
}

export interface PatientDetailConditionResponse {
  conditionList: Condition[];
}

export interface PatientDetailDrugResponse {
  drugList: Drug[];
}

export interface PatientDetailVisitResponse {
  visitList: Visit[];
}

export interface PatientResponse {
  patient: Patients;
}

export interface PatientStatsResponse {
  stats: PatientStat[];
}

export interface RaceResponse {
  raceList: string[];
}
