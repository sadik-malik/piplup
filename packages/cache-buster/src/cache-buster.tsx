import * as React from 'react';
import { FILENAME } from './constant';
import { useReleaseStatus } from './release-status';

export type CacheBusterProps = {
  children?: React.ReactNode;
  enabled?: boolean;
  error?: React.ReactNode;
  loading?: React.ReactNode;
  storageKey?: string;
  verbose?: boolean;
};

function CacheBuster(props: CacheBusterProps): React.ReactElement {
  const {
    children = null,
    enabled = true,
    error,
    loading = null,
    storageKey = FILENAME,
    verbose,
  } = props;

  const [isInitialized, setIsInitialized] = React.useState<boolean>(false);
  const releaseStatus = useReleaseStatus({ enabled, storageKey, verbose });

  React.useEffect(() => {
    if (!enabled || releaseStatus) {
      setIsInitialized(true);
    }
  }, [releaseStatus, enabled]);

  if (!isInitialized) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{loading}</>;
  }

  if (releaseStatus === 'error') {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{error}</>;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

export default CacheBuster;
