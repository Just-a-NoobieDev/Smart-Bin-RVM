export const findInputError = (errors, name) => {
  const filtered = Object.keys(errors).filter((key) => {
    return key.includes(name);
  });

  return errors[filtered];
};
