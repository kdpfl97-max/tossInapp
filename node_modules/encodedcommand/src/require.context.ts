// @ts-ignore
const files = require.context('./', true, /\.(js|jsx|ts|tsx)$/);

export const context = files;
