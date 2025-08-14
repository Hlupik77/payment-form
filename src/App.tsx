import { PaymentForm } from "./features/paymentForm/componets/PaymentForm.tsx";
import { PaymentResult } from "./features/paymentForm/componets/PaymentResult.tsx";
import { useForm } from "./features/paymentForm/paymentForm.hooks.ts";

function App() {
  const { loading, result, processPayment, resetResult } = useForm();
  return (
    <div className="border rounded-lg shadow-md bg-white w-[457px] h-[464px] p-[25px_30px] opacity-100 mx-auto">
      {!result && (
        <PaymentForm onSubmit={processPayment} loading={loading} />
      )}
      {result && (
        <PaymentResult status={result} onClose={resetResult} />
      )}
    </div>
  );
}

export default App
