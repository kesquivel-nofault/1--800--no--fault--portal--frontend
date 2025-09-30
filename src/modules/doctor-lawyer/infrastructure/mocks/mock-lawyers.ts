import { faker } from "@faker-js/faker";
import { LawyerStatus } from "../../domain/interfaces/lawyers/lawyer.criteria";

const attorneys = [
  "Doctor Will",
  "Smith Legal",
  "Torres & Co.",
  "Lopez Law",
  "Miller Group",
];
const txLocations = [
  "Injury Care Centers - Jacksonville Beach",
  "Path Medical - Orlando",
  "Urgent Care Miami",
  "Health First Clinics",
  "Wellness & Rehab Center",
];

export const mockTreatmentCases = Array.from({ length: 100 }, (_, i) => {
  const startDate = faker.date.past({ years: 2 });
  const endDate = faker.date.between({ from: startDate, to: new Date() });

  return {
    id: i + 1,
    caseId: faker.number.int({ min: 400000, max: 500000 }),
    txLocation: faker.helpers.arrayElement(txLocations),
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    attorney: faker.helpers.arrayElement(attorneys),
    idot: startDate.toLocaleDateString("en-US"),
    ldot: endDate.toLocaleDateString("en-US"),
    visits: faker.number.int({ min: 1, max: 20 }),
    status: faker.helpers.arrayElement(Object.values(LawyerStatus)),
    bi_um: faker.helpers.arrayElement(["BI", "UM", "BI/UM", "N/A"]),
  };
});
