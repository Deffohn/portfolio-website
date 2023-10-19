"use client";
import { useRouter } from 'next/navigation';

export const getBaseUrl = (): string => {

  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol;
    const host = window.location.host;

    return `${protocol}//${host}`;
  }

  return ''; 
}