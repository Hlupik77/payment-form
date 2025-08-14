import { type UseFormRegister } from 'react-hook-form';
import type { IFormData } from '../../paymentForm.types.ts';

interface Props {
  register: UseFormRegister<IFormData>;
  disabled?: boolean;
  error?: string;
}

export const CardNumberField = ({ register, disabled, error }: Props) => {
  return (
    <div className="col-span-1 md:col-span-2 h-[84px] w-[417px] mx-auto">
      <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 gap-y-1">
        <label
          htmlFor="cardNumber"
          className="text-[14px] leading-[18px] font-normal text-grey-800 whitespace-nowrap"
        >
          Номер карты
        </label>
        <input
          id="cardNumber"
          {...register('cardNumber', {
            onChange: (e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 19);
              const groups = value.match(/.{1,4}/g) || [];
              e.target.value = groups.join(' ');
            },
          })}
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="0000 0000 0000 0000"
          maxLength={23}
          disabled={disabled}
          aria-invalid={!!error}
          className={`h-10 border rounded-[10px] p-3 text-base tracking-widest w-full ${
            error ? 'border-error' : 'border-grey-200'
          }`}
        />
      </div>
      <label
        htmlFor="cardNumber"
        className="text-[14px] leading-[18px] font-normal text-error whitespace-nowrap"
      >
        {error ?? ''}
      </label>
    </div>
  );
};
