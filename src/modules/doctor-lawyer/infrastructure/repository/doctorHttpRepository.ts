import { DoctorCriteria } from "../../domain/interfaces/doctors/doctor.criteria";
import { Doctor } from "../../domain/interfaces/doctors/doctor.interface";
import { DoctorRepository } from "../../domain/interfaces/doctors/doctor.repository";
import { mockDoctorCases } from "../../infrastructure/mocks/mock-doctors";

export class MockDoctorRepository implements DoctorRepository {
  async findAll(criteria?: DoctorCriteria): Promise<Doctor[]> {
    let results = [...mockDoctorCases];

    if (criteria) {
      results = results.filter((doctor) => {
        return (
          (criteria.caseId ? doctor.caseId === criteria.caseId : true) &&
          (criteria.caseType
            ? doctor.caseType.toLowerCase() === criteria.caseType.toLowerCase()
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
