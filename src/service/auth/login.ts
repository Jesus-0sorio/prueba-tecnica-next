const RESPONSE_MESSAGES = {
  success: 'success',
  invalidCredentials: 'invalidCredentials',
  serverError: 'Server error',
};

export const loginService = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL_AUTH}/users`;
  const response = await fetch(url, {
    method: 'GET',
  });
  const data = await response.json();

  if (response.status >= 500) {
    return RESPONSE_MESSAGES.serverError;
  }

  const res = data.find(
    (user: any) => user.username === username && user.password === password
  );

  if (res) {
    window.localStorage.setItem('auth', 'true');
    return RESPONSE_MESSAGES.success;
  } else {
    return RESPONSE_MESSAGES.invalidCredentials;
  }
};
