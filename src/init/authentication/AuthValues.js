export const loginValues = {
  email: "",
  password: "",
};
export const SignUpValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

// Initial Values
export const stripeAccountValues = {
  cardHolderName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};
export const editStripeValues = {
  expiry: "",
};

export const forgetPasswordValues = {
  email: "",
};

export const resetPasswordValues = {
  password: "",
  confirmPassword: "",
};
export const changedPasswordValues = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};

export const personalDetailsValues = {
  fullName: "",
  phone: "",
  location: "",
  city: "",
  state: "",
  country: "",
  profilePic: null,
};
export const providerDetailsValues = {
  fullName: "",
  // radius: "",
  avaliabilty: "",
  phone: "",
  location: "",
  city: "",
  state: "",
  country: "",
  profilePic: null,
  biography: "",
  experience: "",
};

export const ServiceValues = {
  title: "",
  price: "",
  description: "",
};
export const certificationValues = {
  certificationName: "",
  institution: "",
  completionDate: "",
  description: "",
};

export const emailVerificationValues = {
  otp: ["", "", "", "", ""], // 6-digit OTP
};
