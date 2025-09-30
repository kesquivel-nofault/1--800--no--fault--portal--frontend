import { useState } from "react";
import { useModal } from "../../../../hooks/useModal";
import PageBreadcrumb from "../../../../shared/ui/components/common/PageBreadCrumb";
import PageMeta from "../../../../shared/ui/components/common/PageMeta";
import { GenericTable } from "../../../../shared/ui/components/tables/BasicTables/BasicTableOne";
import Badge from "../../../../shared/ui/components/ui/badge/Badge";
import { Modal } from "../../../../shared/ui/components/ui/modal";
import { LawyerStatus } from "../../domain/interfaces/lawyers/lawyer.criteria";
import { Lawyer as Lw } from "../../domain/interfaces/lawyers/lawyer.interface";
import { mockTreatmentCases } from "../../infrastructure/mocks/mock-lawyers";
import LawyerForm from "./LawyerForm";

const Lawyer = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedRow, setSelectedRow] = useState<Lw | null>(null);

  const handleSave = (lawyer: Lw) => {
    console.log(lawyer);
    closeModal();
  };

  const options = [
    { value: LawyerStatus.ACTIVE, label: LawyerStatus.ACTIVE },
    { value: LawyerStatus.ACTIVE, label: LawyerStatus.ACTIVE },
    { value: LawyerStatus.PENDING, label: LawyerStatus.PENDING },
  ];
  return (
    <div>
      <PageMeta title="Lawyer" description="This is Lawyer page" />
      <PageBreadcrumb pageTitle="Lawyer" />
      <GenericTable
        data={mockTreatmentCases}
        pageSize={10}
        title="Doctor Cases"
        columns={[
          { key: "caseId", header: "Case ID", filter: { type: "text" } },
          {
            key: "txLocation",
            header: "Tx Location",
            filter: {
              type: "text",
            },
          },
          { key: "name", header: "Name", filter: { type: "text" } },
          {
            key: "status",
            header: "Status",
            filter: {
              type: "select",
              options: ["SIGNED", "PENDING", "CLOSED"],
              multi: true,
            },
            render: (row) => (
              <Badge
                size="sm"
                color={
                  row.status === "ACTIVE"
                    ? "success"
                    : row.status === "PENDING"
                      ? "warning"
                      : "error"
                }
              >
                {row.status}
              </Badge>
            ),
          },
        ]}
        onRowClick={(row) => {
          setSelectedRow(row);
          openModal();
        }}
      />

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <LawyerForm
          lawyer={selectedRow}
          options={options}
          onSave={handleSave}
          onCancel={closeModal}
          setLawyer={setSelectedRow}
        />
      </Modal>
    </div>
  );
};

export default Lawyer;
