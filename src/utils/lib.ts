import { API } from "./config";

const MAX_FILE_SIZE_MB = 2;

const ERROR_CODES = Object.freeze({
  INVALID_FILE_FORMAT: 1,
  FILE_TOO_LARGE: 2,
  TOO_MANY_FILES: 3,
  REQUEST_FAILED: 4,
});

type Error = {
  message: string;
  code: number;
};

type Maybe<T> = T | null;

export function isNotNull(sth: any): boolean {
  return sth !== null;
}

export function isNull(sth: any): boolean {
  return sth === null;
}

export function fileValidator(files: Array<File>): [null | Error, File?] {
  let error = null;
  if (files.length > 1) {
    return [
      {
        message: "Only one file is allowed.",
        code: ERROR_CODES.TOO_MANY_FILES,
      },
    ];
  }
  if (!/\.midi$/.test(files[0].name)) {
    return [
      {
        message: "File format is not supported.",
        code: ERROR_CODES.INVALID_FILE_FORMAT,
      },
    ];
  }
  const fileSizeMB = files[0].size / (1024 * 1024);
  if (fileSizeMB > MAX_FILE_SIZE_MB) {
    return [
      {
        message: "Uploaded file cannot exceed 5MB.",
        code: ERROR_CODES.FILE_TOO_LARGE,
      },
    ];
  }
  return [error, files[0]];
}

type UploadResponse = {
  file_name?: Maybe<string>;
  error?: object;
};

export async function upload(
  file: File,
): Promise<UploadResponse> {
  try {
    const formData = new FormData();
    formData.append(file.name, file);
    return await fetch(`${API}/upload`, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
  } catch (e) {
    console.error("Error:", e);
    return {
      error: {
        code: ERROR_CODES.REQUEST_FAILED,
        message: "Could not upload a file!",
      },
    };
  }
}

export const hasError = (resp: UploadResponse): boolean => {
  return "error" in resp;
};

export const formatDuration = (seconds: number): string => {
  const minutes: number = Math.floor(seconds / 60);
  const secondsLeft: number = seconds - minutes * 60;
  const displaySeconds = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
  return `${minutes}:${displaySeconds}`;
};

export const formatTime = (milliseconds: number): string => {
  const date = new Date(milliseconds);
  return `${pad(`${date.getMonth() + 1}`, 2)}.${
    pad(
      `${date.getDate()}`,
      2,
    )
  }.${date.getFullYear()}`;
};

export const getFileName = (url: string): string => {
  if (url == null) return "";
  return decodeURIComponent(url.substring(url.lastIndexOf("/") + 1));
};

const pad = (numberString: string, size: number): string => {
  let padded = numberString;
  while (padded.length < size) padded = `0${padded}`;
  return padded;
};
