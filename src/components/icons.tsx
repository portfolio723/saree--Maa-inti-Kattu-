import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M24 4C12.95 4 4 12.95 4 24C4 35.05 12.95 44 24 44C35.05 44 44 35.05 44 24C44 12.95 35.05 4 24 4Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M24 16C19.58 16 16 19.58 16 24C16 28.42 19.58 32 24 32C28.42 32 32 28.42 32 24C32 19.58 28.42 16 24 16Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M32.49 15.51L35.32 12.68" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M15.51 32.49L12.68 35.32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M15.51 15.51L12.68 12.68" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32.49 32.49L35.32 35.32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
