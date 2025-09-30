import { LawyerCriteria } from "../../domain/interfaces/lawyers/lawyer.criteria";
import { Lawyer } from "../../domain/interfaces/lawyers/lawyer.interface";
import { LawyerRepository } from "../../domain/interfaces/lawyers/lawyer.repository";
import { mockTreatmentCases } from "../mocks/mock-lawyers";

export class MockLawyerRepository implements LawyerRepository {
  async findAll(criteria?: LawyerCriteria): Promise<Lawyer[]> {
    let results = [...mockTreatmentCases];

    if (criteria) {
      results = results.filter((doctor) => {
        return (
          (criteria.caseId ? doctor.caseId === criteria.caseId : true) &&
          (criteria.txLocation
            ? doctor.txLocation.toLowerCase() ===
              criteria.txLocation.toLowerCase()
            : true) &&
          (criteria.name
            ? doctor.name.toLowerCase().includes(criteria.name.toLowerCase())
            : true) &&
          (criteria.status
            ? doctor.status.toLowerCase() === criteria.status.toLowerCase()
            : true)
        );
      });
    }

    return Promise.resolve(results);
  }
}
