export interface Lawyer {
  id: number;
  caseId: number;
  txLocation: string;
  name: string;
  phone: string;
  attorney: string;
  idot: string;
  ldot: string;
  visits: number;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  bi_um: string;
}
