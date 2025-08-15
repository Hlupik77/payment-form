import type React from 'react';
import { type UseFormRegister, type FieldPath } from 'react-hook-form';
import type {IFormData} from "../../paymentForm.types.ts";


interface PaymentFieldProps<Name extends FieldPath<IFormData>> {
  name: Name;
  label: string;
  register: UseFormRegister<IFormData>;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  type?: React.HTMLInputTypeAttribute;
  maxLength?: number;
  id?: string;
  wrapperClassName?: string;
  format?: (value: string) => string;
}

export const PaymentField = <Name extends FieldPath<IFormData>>({
  name,
  label,
  register,
  disabled,
  error,
  placeholder,
  autoComplete,
  inputMode,
  type,
  maxLength,
  id,
  wrapperClassName,
  format,
}: PaymentFieldProps<Name>) => {
  const baseInputClass = `h-10 border rounded-[10px] p-3 text-base tracking-widest w-full ${
    error ? 'border-error' : 'border-grey-200'
  }`;

  return (
    <div className={wrapperClassName ?? 'h-[84px]'}>
      <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 gap-y-1">
        <label htmlFor={id ?? name} className="text-sm font-medium text-grey-800 whitespace-nowrap relative left-px">
          {label}
        </label>
        <input
          id={id ?? name}
          {...register(name, {
            onChange: (e) => {
              if (format) {
                e.target.value = format(e.target.value);
              }
            },
          })}
          inputMode={inputMode}
          autoComplete={autoComplete}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          aria-invalid={!!error}
          className={baseInputClass}
          type={type}
        />
      </div>
      <label htmlFor={id ?? name} className="text-sm font-medium text-error whitespace-nowrap relative left-px">
        {error ?? ''}
      </label>
    </div>
  );
};
