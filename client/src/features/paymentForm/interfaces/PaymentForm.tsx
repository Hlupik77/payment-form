import { useForm } from 'react-hook-form';
import type { IFormData } from '../paymentForm.types.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../paymentForm.schema.ts';
import { formatCardNumber, formatExpiry, formatCvc, formatCardholder } from '../utils/formatters.ts';
import {PaymentField} from "../componets/inputField/PaymentField.tsx";
import {Button} from "../componets/button/Button.tsx";

interface PaymentFormProps {
    onSubmit: (data: IFormData) => void;
    loading: boolean;
}

export const PaymentForm = ({ onSubmit, loading }: PaymentFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<IFormData>({
        mode: 'onChange',
        resolver: zodResolver(formSchema),
    });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-[417px] gap-6 h-full mx-auto"
        >
            <h1 className="text-title text-grey-1000">
                Оплата банковской картой
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <PaymentField
                    name="cardNumber"
                    label="Номер карты"
                    register={register}
                    disabled={loading}
                    error={errors.cardNumber?.message as string | undefined}
                    placeholder="0000 0000 0000 0000"
                    autoComplete="cc-number"
                    inputMode="numeric"
                    maxLength={23}
                    wrapperClassName="col-span-1 h-[84px] md:col-span-2"
                    format={formatCardNumber}
                    id="cardNumber"
                />
                <PaymentField
                    name="expiry"
                    label="Месяц/Год"
                    register={register}
                    disabled={loading}
                    error={errors.expiry?.message as string | undefined}
                    placeholder="MM/YY"
                    autoComplete="cc-exp"
                    inputMode="numeric"
                    maxLength={5}
                    wrapperClassName="h-[84px] w-[170px] mr-auto"
                    format={formatExpiry}
                    id="expiry"
                />
                <PaymentField
                    name="cvc"
                    label="Код"
                    register={register}
                    disabled={loading}
                    error={errors.cvc?.message as string | undefined}
                    placeholder="***"
                    autoComplete="cc-csc"
                    inputMode="numeric"
                    type="password"
                    maxLength={3}
                    wrapperClassName="h-[84px] w-[170px] ml-auto"
                    format={formatCvc}
                    id="cvc"
                />
                <PaymentField
                    name="cardholder"
                    label="Владелец карты"
                    register={register}
                    disabled={loading}
                    error={errors.cardholder?.message as string | undefined}
                    placeholder="IVAN IVANOV"
                    autoComplete="cc-name"
                    wrapperClassName="col-span-1 h-[84px] md:col-span-2"
                    format={formatCardholder}
                    id="cardholder"
                />
            </div>

            <div className="flex justify-end">
                <Button loading={loading} disabled={!isValid}>
                    Оплатить
                </Button>
            </div>
        </form>
    );
};
