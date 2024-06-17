export default function logger(type: 'warn' | 'log' | 'info' | 'error', verbose = true) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function print(...args: any[]) {
    if (verbose) {
      console[type]('[@piplup/rhf-adapters]:', ...args);
    }
  };
}
