import * as React from 'react';
import { FILENAME } from './constant';
import { createLogger } from './logger';

export type ReleaseStatus = 'error' | 'new-release' | 'no-release' | null;

export type ReleaseStatusOptions = {
  enabled?: boolean;
  storageKey: string;
  verbose?: boolean;
};

let lastStatus: ReleaseStatus = null;

async function getReleaseStatus(options: ReleaseStatusOptions): Promise<ReleaseStatus> {
  const { enabled = true, storageKey, verbose = false } = options;

  if (typeof window === 'undefined' || !enabled) {
    lastStatus = null;
    return lastStatus;
  }

  const date = new Date();
  const resourceURL = `/${FILENAME}?v=${date.getTime().toString()}`;

  const logger = createLogger(verbose);

  try {
    const response = await fetch(resourceURL);
    const releaseId = await response.text();
    const releaseIdFromStorage = localStorage.getItem(storageKey);
    if (releaseId !== releaseIdFromStorage) {
      localStorage.setItem(storageKey, releaseId);
      if (releaseId) {
        logger('log', 'New release detected. Reloading page');
        lastStatus = 'new-release';
        return lastStatus;
      }
    }
    logger('log', 'No new release detected.');
    lastStatus = 'no-release';
    return lastStatus;
  } catch {
    logger('error', 'An error occurred while verifying release id');
    lastStatus = 'error';
    return lastStatus;
  }
}

export function useReleaseStatus(options: ReleaseStatusOptions) {
  const { enabled, storageKey, verbose } = options;

  const [isNewRelease, setIsNewRelease] = React.useState<ReleaseStatus>(lastStatus);

  React.useEffect(() => {
    getReleaseStatus({ enabled, storageKey, verbose }).then((newReleaseStatus) => {
      setIsNewRelease(newReleaseStatus);
    });
  }, [storageKey, verbose, enabled]);

  return isNewRelease;
}
