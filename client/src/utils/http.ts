import { API } from '../types';
import { ERROR_CODES } from './errorCodes';

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8083/api' : '/api';

export const STATICS = process.env.NODE_ENV === 'development' ? `http://localhost:8083/` : '/';

export function getTracks(): Promise<API.Tracks[]> {
  return new Promise((resolve, reject) =>
    fetch(`${API_URL}/track`)
      .then((res) => res.json())
      .then((json) => resolve(json.tracks))
      .catch(() =>
        reject({
          code: ERROR_CODES.REQUEST_FAILED,
          message: 'Could not get available trakcs!',
        })
      )
  );
}

export function uploadTracks(files: File[]): Promise<string> {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));
  return new Promise((resolve, reject) =>
    fetch(`${API_URL}/track`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(resolve)
      .catch(() =>
        reject({
          code: ERROR_CODES.REQUEST_FAILED,
          message: 'Could not upload a file!',
        })
      )
  );
}
