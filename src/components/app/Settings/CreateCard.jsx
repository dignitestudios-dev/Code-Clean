import React from 'react'
import Navbar from '../../layout/Navbar'
import { FaArrowLeft } from 'react-icons/fa'
import Input from '../../global/Input';
import { useFormik } from 'formik';
import { stripeAccountValues } from '../../../init/authentication/AuthValues';
import { stripeAccountSchema } from '../../../schema/authentication/AuthSchema';
import { Button } from '../../global/GlobalButton';
import { HeroBg } from '../../../assets/export';
import { useNavigate } from 'react-router';

export default function CreateCard() {
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate("");
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

    // Format expiry date
    const formatExpiry = (value) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        if (v.length >= 2) {
            return v.substring(0, 2) + "/" + v.substring(2, 4);
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
        initialValues: stripeAccountValues,
        validationSchema: stripeAccountSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, action) => {
            setLoading(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, 2000));
                console.log("Stripe Account Data:", values);
                navigate("/app/payment-method")
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
        const value = e.target.value.replace(/[^0-9]/g, "").substring(0, 4);
        setFieldValue("cvc", value);
    };

    return (
        <div>
            <Navbar />
            <div
                className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] border "
                style={{
                    backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
                }}
            >
            </div>
            <div className='h-full px-40   -mt-80 bottom-0 items-center gap-3 '>
                <div className='flex items-center gap-2 mb-6'>
                    <button type="button" onClick={() => navigate("/app/dashboard")} >
                        <FaArrowLeft color='white' size={16} />
                    </button>
                    <h1 className="text-2xl font-semibold text-white">Payment Method</h1>
                </div>
                <div className='bg-[#F9FAFA] shadow-lg flex flex-col gap-3 mb-48 rounded-[8px] p-8 mt-3' >
                    <h3 className="text-2xl font-semibold text-[#181818]">Add Stripe credit/debit card</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(e);
                        }}
                        className="w-full mx-auto  mt-8 flex flex-col justify-start items-start gap-6"
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
                                    holder={"mm/dd/yy"}
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
                        <div>
                            <Button text={"Save"} loading={loading} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
