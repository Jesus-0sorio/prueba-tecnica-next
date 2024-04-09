'use client';
import Input from '@/components/form/Input';
import Spinner from '@/components/Spinner';
import { useState } from 'react';
import { loginService } from '@/service/auth/login';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await loginService(credentials);

    if (response === 'invalidCredentials') {
      setIsInvalid(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      router.push('/meals');
    }
  };

  return (
    <main className="flex justify-center items-center h-screen mx-3">
      <div className="h-[32.5rem] w-full py-3 px-8  mx-auto md:w-[31.3rem] shadow-md flex flex-col rounded-xl">
        <div className="mt-4 mb-8 w-full">
          <h2 className="text-3xl font-bold">Log In</h2>
        </div>
        <div className="flex items-center justify-center w-full h-80">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-6 w-full"
          >
            <Input
              type="text"
              placeholder="Username"
              label="Username"
              radius="rounded-lg"
              isInvalid={isInvalid}
              inputHandler={(e) => {
                setCredentials({ ...credentials, username: e.target.value });
              }}
            />
            <Input
              radius="rounded-lg"
              label="Password"
              placeholder="Password"
              type="password"
              isInvalid={isInvalid}
              inputHandler={(e) => {
                setCredentials({ ...credentials, password: e.target.value });
              }}
            />
            <button
              type={isLoading ? 'button' : 'submit'}
              className="mt-10 w-full bg-[#212121] text-white text-2xl font-semibold rounded-lg p-3"
            >
              {isLoading ? <Spinner /> : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
