// @ts-check

const isCi = process.env.CI !== undefined;

if (!isCi) {
  const husky = await import('husky');
  husky.install();
}
