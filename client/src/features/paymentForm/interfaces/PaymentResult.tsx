import {PaymentResultMessage} from "../componets/resultMessage/PaymentResultMessage.tsx";
import successIcon from "../icons/success_pay.svg";
import errorIcon from "../icons/error_pay.svg";


interface PaymentResultProps {
    status: 'success' | 'error' | string;
}

export const PaymentResult = ({ status }: PaymentResultProps) => {
    if (!status) return null;

    const isSuccess = status === 'success';

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <PaymentResultMessage
                imageSrc={isSuccess ? successIcon : errorIcon}
                alt={isSuccess ? 'Оплата успешна' : 'Произошла ошибка'}
                title={isSuccess ? 'Оплата прошла успешно' : 'Произошла ошибка'}
            />
        </div>
    );
};
