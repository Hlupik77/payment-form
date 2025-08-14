import { type UseFormRegister } from "react-hook-form";
import type { IFormData } from "../../paymentForm.types.ts";

interface Props {
  register: UseFormRegister<IFormData>;
  disabled?: boolean;
}

export const ExpiryField = ({ register, disabled }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 gap-y-1">
        <label htmlFor="expiry" className="text-sm font-medium text-grey-800 whitespace-nowrap">
          Месяц/Год
        </label>
        <input
          id="expiry"
          {...register("expiry", {
            onChange: (e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
              let formatted = digits;
              if (digits.length >= 3) {
                formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
              }
              e.target.value = formatted;
            },
          })}
          inputMode="numeric"
          autoComplete="cc-exp"
          placeholder="MM/YY"
          maxLength={5}
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
