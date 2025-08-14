import { useForm } from "react-hook-form";
import { Button } from "../../../common/components/Button.tsx";
import type { IFormData } from "../paymentForm.types.ts";
import { CardNumberField } from "./fields/CardNumberField.tsx";
import { ExpiryField } from "./fields/ExpiryField.tsx";
import { CvcField } from "./fields/CvcField.tsx";
import { CardholderField } from "./fields/CardholderField.tsx";

interface PaymentFormProps {
  onSubmit: (data: IFormData) => void;
  loading: boolean;
}

export const PaymentForm = ({ onSubmit, loading }: PaymentFormProps) => {
  const { register, handleSubmit } = useForm<IFormData>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-[417px] gap-6 h-full mx-auto"
    >
      <h1 className="text-title leading-[32px] font-normal text-grey-1000  h-[32px]">
        Оплата банковской картой
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <CardNumberField register={register} disabled={loading} />
        <ExpiryField register={register} disabled={loading} />
        <CvcField register={register} disabled={loading} />
        <CardholderField register={register} disabled={loading} />
      </div>

      <div className="flex justify-end">
        <Button loading={loading}>
          {loading ? "Обработка..." : "Оплатить"}
        </Button>
      </div>
    </form>
  );
};
