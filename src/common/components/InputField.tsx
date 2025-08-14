import { type UseFormRegister } from "react-hook-form";

import type {IFormData} from "../../features/paymentForm/paymentForm.types.ts";

interface InputFieldProps {
  label: string;
  register: UseFormRegister<IFormData>;
  name: keyof IFormData;
  placeholder: string;
  type?: string;
}

export const InputField = ({
  label,
  register,
  name,
  placeholder,
  type = "text"
}: InputFieldProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-grey-800">{label}</label>
    <input
      {...register(name)}
      placeholder={placeholder}
      type={type}
      className="border border-grey-300 p-2 rounded-md"
    />
  </div>
);
