import { useRouter } from 'next/router';

export const getBaseUrl = (): string => {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const baseUrl = `${protocol}//${host}${router.asPath}`;
    return baseUrl;
  }

  return ''; 
}