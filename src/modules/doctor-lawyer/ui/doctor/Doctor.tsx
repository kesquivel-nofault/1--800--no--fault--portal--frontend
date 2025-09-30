import { useState } from "react";
import { useModal } from "../../../../hooks/useModal";
import PageBreadcrumb from "../../../../shared/ui/components/common/PageBreadCrumb";
import PageMeta from "../../../../shared/ui/components/common/PageMeta";
import { GenericTable } from "../../../../shared/ui/components/tables/BasicTables/BasicTableOne";
import Badge from "../../../../shared/ui/components/ui/badge/Badge";
import { Modal } from "../../../../shared/ui/components/ui/modal";
import { Doctor as Dc } from "../../domain/interfaces/doctors/doctor.interface";
import { mockDoctorCases } from "../../infrastructure/mocks/mock-doctors";
import DoctorForm from "./DoctorForm";

const Doctor = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedRow, setSelectedRow] = useState<Dc | null>(null);

  const handleSave = (doctor: Dc) => {
    console.log(doctor);
    closeModal();
  };

  const options = [
    { value: "SIGNED", label: "SIGNED" },
    { value: "PENDING", label: "PENDING" },
    { value: "CLOSED", label: "CLOSED" },
  ];

  return (
    <div>
      <PageMeta title="Dcotor" description="Doctor page" />
      <PageBreadcrumb pageTitle="Doctor" />

      <GenericTable
        data={mockDoctorCases}
        pageSize={10}
        title="Doctor Cases"
        columns={[
          { key: "caseId", header: "Case ID", filter: { type: "text" } },
          {
            key: "caseType",
            header: "Case Type",
            filter: {
              type: "select",
              options: ["PI", "WORK", "AUTO", "UNK"],
              multi: true,
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
                  row.status === "SIGNED"
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
        <DoctorForm
          doctor={selectedRow}
          options={options}
          onSave={handleSave}
          onCancel={closeModal}
          setDoctor={setSelectedRow}
        />
      </Modal>
    </div>
  );
};

export default Doctor;
