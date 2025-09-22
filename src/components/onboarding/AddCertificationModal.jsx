import React, { useState } from "react";
import Input from "../global/Input";
import { useFormik } from "formik";
import {
  certificationValues,
  personalDetailsValues,
} from "../../init/authentication/AuthValues";
import {
  certificationSchema,
  personalDetailsSchema,
} from "../../schema/authentication/AuthSchema";
import {
  CreateCertificate,
  getProviderProfile,
} from "../../redux/slices/auth.slice";
import { useDispatch } from "react-redux";

export default function AddCertificationModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: "", price: "", description: "" });
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: certificationValues,
    validationSchema: certificationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      const data = {
        name: values.certificationName,
        institution: values.institution,
        date_of_completion: values.completionDate,
        description: values.description,
      };
      await dispatch(CreateCertificate(data)).unwrap();
      // Optionally reset form
      await dispatch(getProviderProfile());
      action.resetForm();
      onClose();
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold"
        >
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
            name="certificationName"
            type="text"
            holder="Enter Certification Name"
            value={values.certificationName}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.certificationName}
            touched={touched.certificationName}
          />

          <Input
            text="Institution"
            name="institution"
            type="text"
            holder="Enter Institution"
            value={values.institution}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.institution}
            touched={touched.institution}
          />
          <Input
            text="Date of Completion"
            name="completionDate"
            type="date"
            holder="Enter Date"
            value={values.completionDate}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.completionDate}
            touched={touched.completionDate}
          />

          <div className="flex flex-col gap-1 mt-3 mb-3">
            <label htmlFor="">Description</label>
            <textarea
              name="description"
              placeholder="Briefly explain the service required"
              className="w-full border border-[#BEBEBE] rounded-md px-3 py-2 text-sm outline-none min-h-[80px] resize-none"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.description && touched.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          {/* Add Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg text-white font-semibold"
            style={{
              background:
                "linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
            }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
