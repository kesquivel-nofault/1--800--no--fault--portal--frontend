import Label from "../../../../shared/ui/components/form/Label";
import Select from "../../../../shared/ui/components/form/Select";
import Input from "../../../../shared/ui/components/form/input/InputField";
import TextArea from "../../../../shared/ui/components/form/input/TextArea";
import Button from "../../../../shared/ui/components/ui/button/Button";
import { Doctor } from "../../domain/interfaces/doctors/doctor.interface";

interface DoctorFormProps {
  doctor: Doctor | null;
  options: { value: string; label: string }[];
  onSave: (doctor: Doctor) => void;
  onCancel: () => void;
  setDoctor: React.Dispatch<React.SetStateAction<Doctor | null>>;
}

const DoctorForm = ({
  doctor,
  options,
  onSave,
  onCancel,
  setDoctor,
}: DoctorFormProps) => {
  if (!doctor) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(doctor);
  };

  return (
    <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit Personal Information
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          Update your details to keep your profile up-to-date.
        </p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col">
        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              Personal Information
            </h5>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div className="col-span-2 lg:col-span-1">
                <Label>Full Name</Label>
                <Input type="text" value={doctor.name} disabled />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Case Id</Label>
                <Input type="text" value={doctor.caseId} disabled />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Case Type</Label>
                <Input type="text" value={doctor.caseType} disabled />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Phone</Label>
                <Input type="text" value={doctor.phone} disabled />
              </div>

              <div className="col-span-2">
                <Label>Status</Label>
                <Select
                  options={options}
                  defaultValue={doctor.status}
                  placeholder="Select an option"
                  onChange={(value) =>
                    setDoctor((prev) =>
                      prev ? { ...prev, status: value } : prev,
                    )
                  }
                  className="dark:bg-dark-900"
                />
              </div>

              <div className="col-span-2">
                <Label>Notes</Label>
                <TextArea value={doctor.notes} rows={2} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={onCancel}>
            Close
          </Button>
          <Button size="sm">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

export default DoctorForm;
