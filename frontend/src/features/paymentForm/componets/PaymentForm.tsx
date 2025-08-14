import { useForm } from 'react-hook-form';
import { Button } from '../../../common/components/Button.tsx';
import type { IFormData } from '../paymentForm.types.ts';
import { CardNumberField } from './fields/CardNumberField.tsx';
import { ExpiryField } from './fields/ExpiryField.tsx';
import { CvcField } from './fields/CvcField.tsx';
import { CardholderField } from './fields/CardholderField.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../paymentForm.schema.ts';

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
      <h1 className="text-title leading-[32px] font-normal text-grey-1000  h-[32px]">
        Оплата банковской картой
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <CardNumberField
          register={register}
          disabled={loading}
          error={errors.cardNumber?.message as string | undefined}
        />
        <ExpiryField
          register={register}
          disabled={loading}
          error={errors.expiry?.message as string | undefined}
        />
        <CvcField
          register={register}
          disabled={loading}
          error={errors.cvc?.message as string | undefined}
        />
        <CardholderField
          register={register}
          disabled={loading}
          error={errors.cardholder?.message as string | undefined}
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
