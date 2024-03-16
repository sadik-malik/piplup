'use client';

import * as React from 'react';
import { FILENAME } from './constants';

export type CacheBusterProps = {
  enabled?: boolean;
  loading?: React.ReactNode;
  verbose?: boolean;
  children: React.ReactNode;
  storageKey?: string
};

function CacheBuster(props: CacheBusterProps): React.ReactNode {
  const { enabled = true, loading = null, verbose, children, storageKey = FILENAME } = props;

  const [isInitialized, setIsInitialized] = React.useState<boolean>(false);

  const resourceURL = React.useMemo(() => {
    const date = new Date();
    return `/${FILENAME}?v=${date.getTime().toString()}`;
  }, []);

  const logger = React.useCallback(
    (variant: 'error' | 'log', ...args: unknown[]) => {
      if (verbose) {
        console[variant](...args);
      }
    },
    [verbose]
  );

  const handleNewRelease = React.useCallback(() => {
    if (enabled && typeof window !== 'undefined') {
      fetch(resourceURL)
        .then((res) => res.text())
        .then((releaseId) => {
          const releaseIdFromStorage = localStorage.getItem(storageKey);
          if (releaseId !== releaseIdFromStorage) {
            localStorage.setItem(storageKey, releaseId)
            if(releaseId){
              logger('log', 'New release detected. Reloading page');
              window.location.reload(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                true // https://developer.mozilla.org/en-US/docs/Web/API/Location/reload#forceget
              );
            }
          } else {
            logger('log', 'No new release detected.');
          }
          setIsInitialized(true);
        })
        .catch(() => {
          logger('error', 'An error occurred while verifying release id');
          setIsInitialized(true);
        })
    }
  }, [resourceURL, enabled, logger, storageKey]);

  React.useEffect(() => {
    handleNewRelease();
  }, [handleNewRelease]);

  if (!isInitialized) {
    return loading;
  }

  return children;
}

export default CacheBuster;
