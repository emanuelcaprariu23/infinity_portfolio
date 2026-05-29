import { DaytimeType } from '@/Shared/interfaces';

export const convertToPathURI = (path: string | string[]): string => {
  let result = '';

  if (Array.isArray(path)) {
    result = path.join('/');
  } else {
    result = path;
  }

  return `/${result}`;
};
export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const sanitizeSectionToURL = (title: string) =>
  title.charAt(0).toLowerCase() +
  title
    .substring(1)
    .replaceAll(/[A-Z]/g, '-$&')
    .replaceAll(' ', '-')
    .replaceAll('--', '-')
    .toLocaleLowerCase();

export const getTimeOfDay = (date: Date = new Date()): DaytimeType => {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 17) return 'Afternoon';
  return 'Evening';
};
