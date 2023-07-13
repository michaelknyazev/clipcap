export const setLocalStorageProperty = (param:string, value:any) => {
  const { localStorage } = window;

  return localStorage.setItem(param, value);
}

export const getLocalStorageProperty = (param:string) => {
  const { localStorage } = window;

  return localStorage.getItem(param);
}

export const removeLocalStorageProperty = (param:string) => {
  const { localStorage } = window;

  return localStorage.removeItem(param);
}