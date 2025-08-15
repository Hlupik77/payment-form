interface SubmitButtonProps {
  loading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button = ({ loading, disabled, children }: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={loading || disabled}
    aria-busy={loading}
    className={
      `text-button inline-flex items-center justify-center gap-2 h-12 w-[123px] py-[14px] px-6 rounded-[10px] transition-colors mt-auto ` +
      (loading ? 'bg-[#EEF1F3] ' : 'bg-primary text-white ') +
      (loading ? 'cursor-not-allowed ' : 'disabled:bg-grey-100 disabled:text-grey-400 disabled:cursor-not-allowed ')
    }
  >
    {loading ? (
      <span className="inline-flex items-center" aria-hidden>
        <span className="h-[25px] w-[25px] rounded-full border-2 border-[#FFF] border-t-[#304AC1] border-l-[#304AC1] animate-spin" />
      </span>
    ) : (
      children
    )}
  </button>
);
