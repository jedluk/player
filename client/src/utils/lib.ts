import { ERROR_CODES } from './errorCodes';
import { API, Maybe } from '../types';

export function isNotNull(sth: any): boolean {
  return sth !== null;
}

export function isNull(sth: any): boolean {
  return sth === null;
}

export function fileValidator(
  files: File[]
): {
  isValid: boolean;
  error: Maybe<API.Error>;
} {
  if (!/\.mp3$/.test(files[0].name)) {
    return {
      isValid: false,
      error: {
        message: 'File format is not supported.',
        code: ERROR_CODES.INVALID_FILE_FORMAT,
      },
    };
  }
  const fileSizeMB = files[0].size / (1024 * 1024);
  if (fileSizeMB > 10) {
    return {
      isValid: false,
      error: {
        message: 'Uploaded file cannot exceed 5MB.',
        code: ERROR_CODES.FILE_TOO_LARGE,
      },
    };
  }
  return {
    isValid: true,
    error: null,
  };
}

export const formatDuration = (seconds: number): string => {
  const minutes: number = Math.floor(seconds / 60);
  const secondsLeft: number = seconds - minutes * 60;
  const displaySeconds = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
  return `${minutes}:${displaySeconds}`;
};

export const formatTime = (fromDate: Date): string => {
  const date = new Date(fromDate);
  return `${pad(`${date.getMonth() + 1}`, 2)}.${pad(`${date.getDate()}`, 2)}.${date.getFullYear()}`;
};

const pad = (numberString: string, size: number): string => {
  let padded = numberString;
  while (padded.length < size) padded = `0${padded}`;
  return padded;
};
