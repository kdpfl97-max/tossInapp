const files = import.meta.glob('./src/**/*.{js,jsx,ts,tsx}');

export const context = Object.assign(files, {
  keys: () => Object.keys(files),
  resolve: (key: string) => key,
  id: './src',
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;