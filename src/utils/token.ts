import { BURGER_API_URL } from '@utils/constants';

export const refreshTokens = async (): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const storedRefreshToken = localStorage.getItem('refreshToken');
  if (!storedRefreshToken) {
    throw new Error('Нет refreshToken');
  }
  const response = await fetch(`${BURGER_API_URL}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: storedRefreshToken }),
  });
  const data = (await response.json()) as { accessToken: string; refreshToken: string };

  if (response.ok) {
    const newData = data as { accessToken: string; refreshToken: string };

    localStorage.setItem('accessToken', newData.accessToken);
    localStorage.setItem('refreshToken', newData.refreshToken);

    return newData;
  } else {
    throw new Error('Ошибка соединения');
  }
};
