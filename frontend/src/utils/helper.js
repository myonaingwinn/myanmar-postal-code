export const getMailTo = () => {
  return `mailto:${import.meta.env.VITE_EMAIL}`;
};

export const getEmail = () => {
  return import.meta.env.VITE_EMAIL;
};
