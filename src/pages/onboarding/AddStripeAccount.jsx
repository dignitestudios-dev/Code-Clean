import { useFormik } from "formik";
import { Button } from "../../components/global/GlobalButton";
import Input from "../../components/global/Input";
import { stripeAccountValues } from "../../init/authentication/AuthValues";
import { stripeAccountSchema } from "../../schema/authentication/AuthSchema";
import React from "react";

export default function AddStripeAccount({ handleNext }) {
  const [loading, setLoading] = React.useState(false);

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, ""); // remove non-digits
    let formatted = "";

    if (v.length >= 2) {
      formatted = v.substring(0, 2) + "/";
    } else {
      formatted = v;
    }

    if (v.length > 2) {
      formatted += v.substring(2, 4); // only take 2 digits for year
    }

    return formatted.substring(0, 5); // max length = 5 chars (MM/YY)
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: stripeAccountValues,
    validationSchema: stripeAccountSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Stripe Account Data:", values);
      } catch (error) {
        console.error("Error adding Stripe account:", error);
      } finally {
        handleNext();
        setLoading(false);
      }
    },
  });

  // Custom change handlers for formatting
  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFieldValue("cardNumber", formatted);
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    setFieldValue("expiry", formatted);
  };

  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "").substring(0, 3);
    setFieldValue("cvc", value);
  };

  return (
    <div className="w-auto h-[90%] flex flex-col justify-center max-w-2xl mx-auto p-6">
      <h3 className="font-[600] text-center text-[32px] text-[#181818]">
        Add Stripe Account
      </h3>
      <p className="text-[#565656] mt-2 text-center font-[400] text-[16px]">
        Enter your payment details to securely process the payment.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className="w-full md:w-[393px] mx-auto mt-8 flex flex-col justify-start items-start gap-6"
      >
        <Input
          text={"Card Holder Name"}
          name={"cardHolderName"}
          type={"text"}
          holder={"Enter card holder name here"}
          value={values.cardHolderName}
          handleBlur={handleBlur}
          handleChange={handleChange}
          error={errors.cardHolderName}
          touched={touched?.cardHolderName}
        />

        <Input
          text={"Card Number"}
          name={"cardNumber"}
          type={"text"}
          holder={"Enter card number here"}
          value={values.cardNumber}
          handleBlur={handleBlur}
          handleChange={handleCardNumberChange}
          error={errors.cardNumber}
          touched={touched?.cardNumber}
        />

        <div className="w-full flex gap-4">
          <div className="flex-1">
            <Input
              text={"Expiry"}
              name={"expiry"}
              type={"text"}
              maxLength={5}
              holder={"mm/yy"}
              value={values.expiry}
              handleBlur={handleBlur}
              handleChange={handleExpiryChange}
              error={errors.expiry}
              touched={touched?.expiry}
            />
          </div>
          <div className="flex-1">
            <Input
              text={"CVC"}
              name={"cvc"}
              type={"text"}
              holder={"000"}
              value={values.cvc}
              handleBlur={handleBlur}
              handleChange={handleCvcChange}
              error={errors.cvc}
              touched={touched?.cvc}
            />
          </div>
        </div>

        <Button text={"Add"} loading={loading} />
      </form>
    </div>
  );
}
