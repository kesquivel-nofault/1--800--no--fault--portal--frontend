import { InputOtp } from "primereact/inputotp";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import "./styles.scss";
interface OtpInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  length?: number;
  disabled?: boolean;
  className?: string;
}

export function OtpInput<T extends FieldValues>({
  name,
  control,
  length = 6,
  disabled = false,
  className,
}: OtpInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <InputOtp
            value={field.value}
            onChange={(e) => field.onChange(e.value)}
            length={length}
            integerOnly
            disabled={disabled}
            className={className}
          />
          {fieldState.error && (
            <span className="text-error-500 text-sm">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}
