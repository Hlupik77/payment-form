import { type UseFormRegister } from "react-hook-form";
import type { IFormData } from "../../paymentForm.types.ts";

interface Props {
  register: UseFormRegister<IFormData>;
  disabled?: boolean;
}

export const CardholderField = ({ register, disabled }: Props) => {
  return (
    <div className="col-span-1 md:col-span-2">
      <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 gap-y-1">
        <label htmlFor="cardholder" className="text-sm font-medium text-grey-800 whitespace-nowrap">
          Владелец карты
        </label>
        <input
          id="cardholder"
          {...register("cardholder")}
          autoComplete="cc-name"
          placeholder="IVAN IVANOV"
          disabled={disabled}
          className="h-10 border border-grey-200 rounded-[10px] p-3 text-base tracking-widest w-full"
        />
      </div>
        <label htmlFor="cardNumber" className="text-[14px] leading-[18px] font-normal text-error whitespace-nowrap">
            Тут будет валидация
        </label>
    </div>
  );
};
