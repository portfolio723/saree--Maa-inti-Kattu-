export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const getImagePath = (path: string): string => {
  if (path.startsWith('http')) return path; // External URLs
  return `${BASE_PATH}${path}`;
};
