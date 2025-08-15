import { type UseFormRegister } from 'react-hook-form';
import type { IFormData } from '../../paymentForm.types.ts';

interface Props {
    register: UseFormRegister<IFormData>;
    disabled?: boolean;
    error?: string;
}

export const ExpiryField = ({ register, disabled, error }: Props) => {
    return (
        <div className="h-[84px] w-[170px] mr-auto">
            <div className="grid grid-cols-[auto,1fr] items-center gap-y-1">
                <label
                    htmlFor="expiry"
                    className="text-sm font-medium text-grey-800 whitespace-nowrap relative left-px"
                >
                    Месяц/Год
                </label>
                <input
                    id="expiry"
                    {...register('expiry', {
                        onChange: (e) => {
                            const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
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
                    aria-invalid={!!error}
                    className={`h-10 border rounded-[10px] p-3 text-base tracking-widest w-full ${
                        error ? 'border-error' : 'border-grey-200'
                    }`}
                />
            </div>
            <label
                htmlFor="expiry"
                className="text-sm font-medium text-error whitespace-nowrap relative left-px"
            >
                {error ?? ''}
            </label>
        </div>
    );
};
