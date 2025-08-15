interface PaymentResultMessageProps {
    imageSrc: string;
    alt: string;
    title: string;
}

export const PaymentResultMessage = ({ imageSrc, alt, title }: PaymentResultMessageProps) => {
    return (
        <div className="h-[92px] flex flex-col items-center justify-end gap-5">
            <img src={imageSrc} alt={alt} />
            <h1 className="text-title text-grey-1000 text-center">{title}</h1>
        </div>
    );
};
