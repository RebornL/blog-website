type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Container = ({ className = '', children }: Props) => {
  return (
    <div className={`container mx-auto px-5 ${className}`}>
      {children}
    </div>
  );
};
