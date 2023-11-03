export const validation = {};
validation.validateBuffet = (value) => {
  return value !== "";
};

validation.validateEmail = (value) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(value);
};

validation.validPlateCount = (value) => {
  return value !== "" && value >0;
};

validation.validDate = (value) => {
  let formdate = new Date(value);
  let todayDate = new Date();
  return formdate > todayDate;
};
