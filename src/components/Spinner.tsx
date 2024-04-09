export default function Spinner({
  variant,
  size = 'md',
}: {
  variant?: string;
  size?: string;
}) {
  return (
    <div className="flex justify-center items-center h-full">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 ${
          variant === 'black' ? 'border-black' : 'border-white'
        } ${
          size === 'sm' ? 'h-5 w-5' : size === 'md' ? 'h-12 w-12' : 'h-20 w-20'
        }`}
      ></div>
    </div>
  );
}
