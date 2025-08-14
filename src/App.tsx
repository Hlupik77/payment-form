import './App.css'
import { useState } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";

const mockPaymentRequest = (_data: FormData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({ status: "success" });
      } else {
        reject(new Error("Payment failed"));
      }
    }, 1500);
  });
};

interface FormData {
  cardNumber: string;
  expiry: string;
  cvc: string;
  cardholder: string;
}

const InputField = ({
  label,
  register,
  name,
  placeholder,
  type = "text"
}: {
  label: string;
  register: UseFormRegister<FormData>;
  name: keyof FormData;
  placeholder: string;
  type?: string;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-grey-800">{label}</label>
    <input
      {...register(name)}
      placeholder={placeholder}
      type={type}
      className="border border-grey-300 p-2 rounded-md"
    />
  </div>
);

const PaymentResult = ({
  status,
  onClose
}: {
  status: string;
  onClose: () => void;
}) => {
  if (!status) return null;
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {status === "success" ? (
        <>
          <span className="text-success text-3xl">✔</span>
          <p className="mt-2 text-lg">Оплата прошла успешно</p>
        </>
      ) : (
        <>
          <span className="text-error text-3xl">✖</span>
          <p className="mt-2 text-lg">Произошла ошибка</p>
        </>
      )}
      <button
        className="mt-4 px-4 py-2 bg-grey-200 rounded hover:bg-grey-300"
        onClick={onClose}
      >
        Закрыть
      </button>
    </div>
  );
};

function App() {
  const { register, handleSubmit } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setResult(null);

    try {
      await mockPaymentRequest(data);
      setResult("success");
    } catch {
      setResult("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="border rounded-lg shadow-md bg-white"
      style={{
        width: '457px',
        height: '464px',
        borderWidth: '1px',
        padding: '25px 30px',
        opacity: 1
      }}
    >
      {!result && (
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
          <button
            type="submit"
            disabled={loading}
            className="text-button bg-primary text-white py-3 px-6 rounded-md hover:opacity-90 disabled:bg-grey-400 transition-colors mt-auto"
          >
            {loading ? "Обработка..." : "Оплатить"}
          </button>
        </form>
      )}

      {result && <PaymentResult status={result} onClose={() => setResult(null)} />}
    </div>
  );
}

export default App
