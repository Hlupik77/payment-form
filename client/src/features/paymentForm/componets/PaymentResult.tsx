import {PaymentResultMessage} from "./PaymentResultMessage.tsx";


interface PaymentResultProps {
    status: 'success' | 'error' | string;
}

export const PaymentResult = ({ status }: PaymentResultProps) => {
    if (!status) return null;

    const isSuccess = status === 'success';

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <PaymentResultMessage
                imageSrc={isSuccess ? '/icons/success_pay.svg' : '/icons/error_pay.svg'}
                alt={isSuccess ? 'Оплата успешна' : 'Произошла ошибка'}
                title={isSuccess ? 'Оплата прошла успешно' : 'Произошла ошибка'}
            />
        </div>
    );
};
