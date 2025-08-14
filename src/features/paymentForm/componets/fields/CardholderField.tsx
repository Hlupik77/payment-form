import { type UseFormRegister } from 'react-hook-form';
import type { IFormData } from '../../paymentForm.types.ts';

interface Props {
  register: UseFormRegister<IFormData>;
  disabled?: boolean;
  error?: string;
}

export const CardholderField = ({ register, disabled, error }: Props) => {
  return (
    <div className="col-span-1 md:col-span-2">
      <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 gap-y-1">
        <label
          htmlFor="cardholder"
          className="text-sm font-medium text-grey-800 whitespace-nowrap"
        >
          Владелец карты
        </label>
        <input
          id="cardholder"
          {...register('cardholder', {
            onChange: (e) => {
              e.target.value = e.target.value
                .replace(/[^A-Za-zА-Яа-яЁё\s]/g, '')
                .replace(/\s+/g, ' ')
                .trimStart();
            },
          })}
          autoComplete="cc-name"
          placeholder="IVAN IVANOV"
          disabled={disabled}
          aria-invalid={!!error}
          className="h-10 border border-grey-200 rounded-[10px] p-3 text-base tracking-widest w-full"
          style={
            error ? { border: '1px solid var(--Error, #EF4F39)' } : undefined
          }
        />
      </div>
      <label
        htmlFor="cardholder"
        className="text-[14px] leading-[18px] font-normal text-error whitespace-nowrap"
      >
        {error ?? ''}
      </label>
    </div>
  );
};
