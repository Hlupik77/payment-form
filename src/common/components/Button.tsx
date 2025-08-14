interface SubmitButtonProps {
  loading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button = ({ loading, disabled, children }: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={loading || disabled}
    className="text-button bg-primary text-white inline-flex items-center justify-center gap-2 h-12 w-[123px] py-[14px] px-6 rounded-[10px] disabled:bg-grey-100 disabled:text-grey-400 transition-colors mt-auto"
  >
    {children}
  </button>
);
