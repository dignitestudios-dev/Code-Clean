import React from "react";
import Navbar from "../../layout/Navbar";
import { FaArrowLeft } from "react-icons/fa";
import Input from "../../global/Input";
import { useFormik } from "formik";
import { editStripeValues } from "../../../init/authentication/AuthValues";
import { Button } from "../../global/GlobalButton";
import { HeroBg } from "../../../assets/export";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { EditStripeCard } from "../../../redux/slices/provider.slice";
import { ErrorToast } from "../../global/Toaster";

export default function EditCard() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate("");
  const loc = useLocation();
  const dispatch = useDispatch();
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      const mm = v.substring(0, 2);
      const yyyy = v.substring(2, 6);
      return yyyy ? `${mm}/${yyyy}` : mm;
    }
    return v;
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
    initialValues: editStripeValues,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        if (!values.expiry) {
          setLoading(false);
          return ErrorToast("Expiry Required");
        }
        // Format: MM/YYYY check
        const regex = /^(0[1-9]|1[0-2])\/\d{4}$/;
        if (!regex.test(values.expiry)) {
          setLoading(false);
          return ErrorToast("Expiry must be in MM/YYYY format");
        }

        // Split into month/year
        let [mm, yyyy] = values.expiry
          .split("/")
          .map((val) => parseInt(val, 10));
        mm = String(mm).padStart(2, "0"); // ✅ always 2-digit month

        console.log(mm, yyyy, "testing");

        // Future date check
        const today = new Date();
        const currentMonth = today.getMonth() + 1;
        const currentYear = today.getFullYear();

        if (
          yyyy < currentYear ||
          (yyyy === currentYear && parseInt(mm) < currentMonth)
        ) {
          setLoading(false);
          return ErrorToast("Expiry must be in the future");
        }

        // ✅ Passed all checks → prepare payload
        const data = {
          url: `/provider/payment-methods/${loc?.state?.id}`,
          expiry_month: mm, // "01", "02", ..., "12"
          expiry_year: yyyy, // 2028
        };

        await dispatch(EditStripeCard(data));
        navigate("/app/payment-method");
      } catch (error) {
        console.error("Error adding Stripe account:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    setFieldValue("expiry", formatted, true); // true => trigger validation
  };

  return (
    <div>
      <Navbar />
      <div
        className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] border "
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
        }}
      ></div>
      <div className="h-full px-10 lg:px-40 -mt-80 bottom-0 items-center gap-3 ">
        <div className="flex items-center gap-2 mb-6">
          <button type="button" onClick={() => navigate(-1)}>
            <FaArrowLeft color="white" size={16} />
          </button>
          <h1 className="text-[32px] font-semibold text-white">
            Payment Method
          </h1>
        </div>
        <div className="bg-[#F9FAFA] shadow-lg flex flex-col gap-3 mb-48 rounded-[8px] p-8 mt-3">
          <h3 className="text-2xl font-semibold text-[#181818]">
            Edit Stripe credit/debit card
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="w-full mx-auto  mt-8 flex flex-col justify-start items-start gap-6"
          >
            <div className="w-full flex gap-4">
              <div className="flex-1">
                <Input
                  text={"Expiry"}
                  name={"expiry"}
                  type={"text"}
                  holder={"MM/YYYY"}
                  value={values.expiry}
                  handleBlur={handleBlur}
                  handleChange={handleExpiryChange}
                  error={errors.expiry}
                  touched={touched?.expiry}
                />
              </div>
            </div>
            <div>
              <Button text={"Save"} type={"submit"} loading={loading} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
