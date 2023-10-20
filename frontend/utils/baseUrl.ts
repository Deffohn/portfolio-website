"use client";

export const getBaseUrl = (): string => {

  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol;
    const host = window.location.host;

    return `${protocol}//${host}`;
  }

  return ''; 
}