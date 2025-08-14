interface PaymentResultProps {
  status: 'success' | 'error' | string;
  onClose: () => void;
}

export const PaymentResult = ({ status, onClose }: PaymentResultProps) => {
  if (!status) return null;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {status === 'success' ? (
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
