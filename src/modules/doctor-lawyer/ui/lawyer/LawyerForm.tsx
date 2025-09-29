import Label from "../../../../shared/ui/components/form/Label";
import Select from "../../../../shared/ui/components/form/Select";
import Input from "../../../../shared/ui/components/form/input/InputField";
import TextArea from "../../../../shared/ui/components/form/input/TextArea";
import Button from "../../../../shared/ui/components/ui/button/Button";
import { LawyerStatus } from "../../domain/interfaces/lawyers/lawyer.criteria";
import { Lawyer } from "../../domain/interfaces/lawyers/lawyer.interface";

interface LwayerFormProps {
  lawyer: Lawyer | null;
  options: { value: string; label: string }[];
  onSave: (doctor: Lawyer) => void;
  onCancel: () => void;
  setLawyer: React.Dispatch<React.SetStateAction<Lawyer | null>>;
}

const LawyerForm = ({
  lawyer,
  options,
  onSave,
  onCancel,
  setLawyer,
}: LwayerFormProps) => {
  if (!lawyer) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(lawyer);
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
                <Input type="text" value={lawyer.name} disabled />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Case Id</Label>
                <Input type="text" value={lawyer.caseId} disabled />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Case Type</Label>
                <Input type="text" value={lawyer.txLocation} disabled />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Phone</Label>
                <Input type="text" value={lawyer.phone} disabled />
              </div>

              <div className="col-span-2">
                <Label>Status</Label>
                <Select
                  options={options}
                  defaultValue={lawyer.status as LawyerStatus}
                  placeholder="Select an option"
                  onChange={(value) =>
                    setLawyer((prev) =>
                      prev ? { ...prev, status: value as LawyerStatus } : prev,
                    )
                  }
                  className="dark:bg-dark-900"
                />
              </div>

              <div className="col-span-2">
                <Label>Notes</Label>
                <TextArea value={lawyer.bi_um} rows={2} />
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

export default LawyerForm;
