import { DoctorCriteria } from "./doctor.criteria";
import { Doctor } from "./doctor.interface";

export interface DoctorRepository {
  findAll(criteria?: DoctorCriteria): Promise<Doctor[]>;
}
