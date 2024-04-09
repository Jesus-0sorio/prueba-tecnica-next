export default function Input({
  label,
  type,
  placeholder,
  inputHandler,
  radius = 'rounded-md',
  isInvalid = false,
}: {
  label: string;
  type: string;
  placeholder: string;
  inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  radius?: string;
  isInvalid: boolean;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputHandler(e);
  };

  return (
    <div className="flex flex-col w-full">
      <label
        className="text-lg font-bold w-full mb-2"
        htmlFor={`${label}Input`}
      >
        {label}
      </label>
      <input
        id={`${label}Input`}
        type={type}
        className={
          !isInvalid
            ? `w-full p-3 border-2 border-gray-300 ${radius}`
            : `border-red-500 border-2 p-3 ${radius} text-red-500`
        }
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}
