export const delay = (timeout: any) => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, timeout);
  });
};
