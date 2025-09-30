export enum LawyerStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
}

export interface LawyerCriteria {
  caseId: number;
  name: string;
  txLocation: string;
  status: LawyerStatus;
}
