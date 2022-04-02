import { Patient, PatientStat } from "../services";

export interface PatientAndBrief extends Patient {
  conditionList: string[];
  visitCount: number;
}

export interface Filters {
  gender: string[]; // 성별
  race: string[]; // 인종
  ethnicity: string[]; // 민족
}

export interface CommonDataResponse {
  filters: Filters;
  patients: PatientAndBrief[];
  stats: PatientStat[];
}

export interface PatientDetailAllResponse {
  conditionList: string[];
  visitCount: number;
}
