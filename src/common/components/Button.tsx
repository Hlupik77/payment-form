interface SubmitButtonProps {
  loading: boolean;
  children: React.ReactNode;
}

export const Button = ({ loading, children }: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={loading}
    className="text-button bg-primary text-white py-3 px-6 rounded-md hover:opacity-90 disabled:bg-grey-400 transition-colors mt-auto"
  >
    {children}
  </button>
);
