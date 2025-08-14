import { useForm } from "react-hook-form";
import { InputField } from "../../../common/components/InputField.tsx";
import { Button } from "../../../common/components/Button.tsx";
import type {IFormData} from "../paymentForm.types.ts";

interface PaymentFormProps {
  onSubmit: (data: IFormData) => void;
  loading: boolean;
}

export const PaymentForm = ({ onSubmit, loading }: PaymentFormProps) => {
  const { register, handleSubmit } = useForm<IFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
      <h1 className="text-title text-grey-900 mb-4">Оплата банковской картой</h1>

      <InputField
        label="Номер карты"
        name="cardNumber"
        placeholder="0000 0000 0000 0000"
        register={register}
      />
      <InputField
        label="Месяц/Год"
        name="expiry"
        placeholder="MM/YY"
        register={register}
      />
      <InputField
        label="Код"
        name="cvc"
        placeholder="***"
        register={register}
      />
      <InputField
        label="Владелец карты"
        name="cardholder"
        placeholder="IVAN IVANOV"
        register={register}
      />

      <Button loading={loading}>
        {loading ? "Обработка..." : "Оплатить"}
      </Button>
    </form>
  );
};
