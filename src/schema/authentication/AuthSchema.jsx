import * as Yup from "yup";

export const signInSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Please enter your email"),
  password: Yup.string()
    .matches(/^(?!\s)(?!.*\s$)/, "Password must not begin or end with spaces")
    .min(6, "Password must contain atleast 6 alphanumeric characters.")
    .required("Please enter your password"),
});
export const signUpSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Please enter your email"),
  password: Yup.string()
    .matches(/^(?!\s)(?!.*\s$)/, "Password must not begin or end with spaces")
    .min(6, "Password must contain atleast 6 alphanumeric characters.")
    .required("Please enter your password"),
  confirmPassword: Yup.string()
    .matches(/^(?!\s)(?!.*\s$)/, "Password must not begin or end with spaces")
    .min(6, "Password must contain atleast 6 alphanumeric characters.")
    .required("Please enter your password"),
});

export const stripeAccountSchema = Yup.object({
  cardHolderName: Yup.string()
    .min(2, "Card holder name must be at least 2 characters")
    .required("Card holder name is required"),
  cardNumber: Yup.string()
    .matches(/^[0-9\s]{13,19}$/, "Please enter a valid card number")
    .required("Card number is required"),
  expiry: Yup.string()
    .required("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format")
    .test("is-future-date", "Expiry must be in the future", (value) => {
      if (!value) return false;

      const [mm, yy] = value.split("/").map((val) => parseInt(val, 10));
      if (!mm || !yy) return false;

      // Current date
      const today = new Date();
      const currentMonth = today.getMonth() + 1; // 1–12
      const currentYear = today.getFullYear() % 100; // two digits

      if (yy > currentYear) {
        return true;
      } else if (yy === currentYear && mm >= currentMonth) {
        return true;
      }

      return false;
    }),
  cvc: Yup.string()
    .matches(/^[0-9]{3,4}$/, "Please enter a valid CVC")
    .required("CVC is required"),
});

export const forgetPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});
export const changedPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  newPassword: Yup.string()
    .min(8, "New Password must be at least 8 characters")
    .required("New Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export const personalDetailsSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  location: Yup.string().required("Location is required"),
  profilePic: Yup.mixed()
    .required("Profile picture is required")
    .test("fileType", "Only image files are allowed", (value) => {
      return (
        value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      );
    }),
});
export const updateProviderDetailsSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  radius: Yup.string().required("Radius is required"),
  experience: Yup.string().required("Experience is required"),
  biography: Yup.string().required("Biography is required"),
  location: Yup.string().required("Location is required"),
  profilePic: Yup.mixed().test(
    "fileType",
    "Only image files are allowed",
    (value) => {
      if (!value) return true; // ✅ allow empty (means no update)
      if (typeof value === "string") return true; // ✅ existing image (avatar url from DB)
      return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
    }
  ),
});
export const providerDetailsSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  radius: Yup.string().required("Radius is required"),
  experience: Yup.string().required("experience is required"),
  // Availability: Yup.string().required("Availability is required"),
  biography: Yup.string().required("biography is required"),
  location: Yup.string().required("Location is required"),
  profilePic: Yup.mixed()
    .required("Profile picture is required")
    .test("fileType", "Only image files are allowed", (value) => {
      return (
        value &&
        ["image/jpeg", "image/png", "image/jpg", "string"].includes(value.type)
      );
    }),
});

export const otpSchema = Yup.object({
  otp: Yup.array()
    .of(Yup.string().matches(/^\d$/, "Must be a digit"))
    .min(6, "OTP must be 6 digits")
    .required("OTP is required"),
});

export const serviceAddSchema = Yup.object({
  title: Yup.string()
    .required("Service name is required")
    .max(100, "Max 100 characters"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be greater than 0"),
  description: Yup.string().max(500, "Max 500 characters").required(),
});

export const certificationSchema = Yup.object().shape({
  certificationName: Yup.string()
    .required("Certification name is required")
    .min(3, "Name must be at least 3 characters"),
  institution: Yup.string()
    .required("Institution name is required")
    .min(2, "Institution name must be at least 2 characters"),
  completionDate: Yup.date()
    .required("Completion date is required")
    .max(new Date(), "Completion date cannot be in the future"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
});
