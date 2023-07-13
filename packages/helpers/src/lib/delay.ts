const delay = (ms: number) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(null)
  }, ms)
});

export { delay };