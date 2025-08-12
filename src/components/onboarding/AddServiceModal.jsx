import { useFormik } from "formik";
import React, { useEffect } from "react";
import { serviceAddSchema } from "../../schema/authentication/AuthSchema";
import { ServiceValues } from "../../init/authentication/AuthValues";
import Input from "../../components/global/Input";
import { Button } from "../global/GlobalButton";
import { ErrorToast } from "../global/Toaster";
import { useDispatch } from "react-redux";
import { CreateService } from "../../redux/slices/auth.slice";

export default function AddServiceModal({ onClose, onAdd }) {
  const dispatch = useDispatch();

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: ServiceValues,
    validationSchema: serviceAddSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      try {
        onAdd(values);
        const data={
          title:values.title,
          amount:values.price,
          description:values.description,
        }
        await dispatch(CreateService(data)).unwrap();
        // Optionally reset form
        action.resetForm();
        onClose();
      } catch (error) {
        ErrorToast("Failed to add service");
      }
    },
  });

  console.log(errors, "Tableet");

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

        <h2 className="text-[20px] font-bold mb-6 text-center">
          Add New Service
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="flex flex-col gap-4"
        >
          {/* Service Name */}
          <Input
            text="Service Name"
            name="title"
            type="text"
            holder="Enter Service Name"
            value={values.title}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.title}
            touched={touched.title}
          />

          {/* Service Price */}
          <Input
            text="Service Price"
            name="price"
            type="number"
            holder="Enter Service Price"
            value={values.price}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.price}
            touched={touched.price}
          />

          {/* Service Description */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Service Description
            </label>
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
          <Button text="Add Service" type="submit" />
        </form>
      </div>
    </div>
  );
}
