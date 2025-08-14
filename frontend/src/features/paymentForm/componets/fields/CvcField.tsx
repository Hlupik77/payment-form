import { type UseFormRegister } from 'react-hook-form';
import type { IFormData } from '../../paymentForm.types.ts';

interface Props {
  register: UseFormRegister<IFormData>;
  disabled?: boolean;
  error?: string;
}

export const CvcField = ({ register, disabled, error }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 gap-y-1">
        <label
          htmlFor="cvc"
          className="text-sm font-medium text-grey-800 whitespace-nowrap"
        >
          Код
        </label>
        <input
          id="cvc"
          {...register('cvc', {
            onChange: (e) => {
              e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
            },
          })}
          inputMode="numeric"
          autoComplete="cc-csc"
          type="password"
          placeholder="***"
          maxLength={3}
          disabled={disabled}
          aria-invalid={!!error}
          className={`h-10 border rounded-[10px] p-3 text-base tracking-widest w-full ${
              error ? 'border-error' : 'border-grey-200'
          }`}
        />
      </div>
      <label
        htmlFor="cvc"
        className="text-[14px] leading-[18px] font-normal text-error whitespace-nowrap"
      >
        {error ?? ''}
      </label>
    </div>
  );
};
