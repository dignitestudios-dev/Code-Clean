import React, { useState } from "react";
import Input from "../global/Input";
import { useFormik } from "formik";
import { personalDetailsValues } from "../../init/authentication/AuthValues";
import { personalDetailsSchema } from "../../schema/authentication/AuthSchema";

export default function AddCertificationModal({ onClose, onAdd }) {
    const [form, setForm] = useState({ title: "", price: "", description: "" });

    const formik = useFormik({
        initialValues: personalDetailsValues,
        validationSchema: personalDetailsSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            handleNext();
            const formData = new FormData();

            // postData("/your-api-endpoint", false, null, formData, callbackFn);
        },
    });

    const {
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        errors,
        touched,
    } = formik;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-[16px] p-6 w-full max-w-md shadow-lg relative">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-xl font-bold">
                    &times;
                </button>

                <h2 className="text-[20px] font-bold mb-6">Add New Certification</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                    className="w-full mx-auto flex flex-col gap-2  mt-5 gap-4"
                >
                    <Input
                        text="Certification Name"
                        name="radius"
                        type="text"
                        holder="Enter Certification Name"
                        value={values.name}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        error={errors.name}
                        touched={touched.name}
                    />

                    <Input
                        text="Institution"
                        name="radius"
                        type="text"
                        holder="Enter Institution"
                        value={values.name}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        error={errors.name}
                        touched={touched.name}
                    />
                    <Input
                        text="Date of Completion"
                        name="radius"
                        type="text"
                        holder="Enter Date"
                        value={values.name}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        error={errors.name}
                        touched={touched.name}
                    />

                    <div className="flex flex-col gap-1 mt-3 mb-3" >
                        <label htmlFor="">Description</label>
                        <textarea name="" id="" rows={5} className="border border-[#BEBEBE] p-2 rounded-[8px]  text-[#727272]" >Briefly explain the certification</textarea>
                    </div>

                </form>



                {/* Add Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full py-2 rounded-lg text-white font-semibold"
                    style={{
                        background: "linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
                    }}
                >
                    Add
                </button>
            </div>
        </div>
    );
}
