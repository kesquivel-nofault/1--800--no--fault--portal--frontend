import { LawyerCriteria } from "./lawyer.criteria";
import { Lawyer } from "./lawyer.interface";

export interface LawyerRepository {
  findAll(criteria?: LawyerCriteria): Promise<Lawyer[]>;
}
