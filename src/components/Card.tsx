'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Card({
  title,
  imageUrl,
  id,
}: {
  title: string;
  imageUrl: string;
  id: string;
}) {
  const router = useRouter();

  const handleInfo = () => {
    router.push(`/meals/${id}`);
  };

  return (
    <div className="m-4 shadow-lg rounded-md p-4 hover:cursor-pointer lg:w-[28rem]">
      <Image
        width={0}
        height={0}
        src={imageUrl}
        alt="algo"
        sizes="100vw"
        className="w-full rounded-lg object-fill lg:w-[28rem]"
      />
      <div className="p-4 flex flex-col items-center gap-2">
        <h2 className="text-3xl font-semibold text-center">{title}</h2>
        <button
          onClick={handleInfo}
          className="bg-[#212121] text-white p-3 rounded-xl text-lg font-semibold shadow w-[7rem] active:bg-gray-900"
        >
          More Info
        </button>
      </div>
    </div>
  );
}
