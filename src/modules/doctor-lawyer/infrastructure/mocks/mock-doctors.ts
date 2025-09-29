import { faker } from "@faker-js/faker";
import { Doctor } from "../../domain/interfaces/doctors/doctor.interface";

const caseTypes = ["PI", "UNK", "AUTO", "WORK"];
const insurances = [
  "Geico",
  "State Farm",
  "Progressive",
  "Allstate",
  "Liberty Mutual",
];
const statuses = ["SIGNED", "PENDING", "CLOSED", "REVIEW"];
const attorneys = [
  "STONE & WA",
  "Miller & Assoc",
  "Smith Law",
  "Torres Legal",
  "Lopez & Partners",
];
const locTypes = ["CLINIC", "HOSPITAL", "UNK", "URGENT CARE"];

export const mockDoctorCases: Doctor[] = Array.from(
  { length: 100 },
  (_, i) => ({
    id: i + 1,
    caseId: faker.number.int({ min: 400000, max: 500000 }),
    caseType: faker.helpers.arrayElement(caseTypes),
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    insurance: faker.helpers.arrayElement(insurances),
    atFaultInsurance: faker.helpers.arrayElement(insurances),
    locType: faker.helpers.arrayElement(locTypes),
    location: faker.company.name(),
    idot: faker.date.future().toLocaleDateString("en-US"),
    attorney: faker.helpers.arrayElement(attorneys),
    status: faker.helpers.arrayElement(statuses),
    notes: faker.lorem.words(3),
  }),
);
