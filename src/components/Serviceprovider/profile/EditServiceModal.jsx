import { useFormik } from "formik";
import React from "react";
import { Button } from "../../global/GlobalButton";
import { ErrorToast } from "../../global/Toaster";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../../components/global/Input";
import { serviceAddSchema } from "../../../schema/authentication/AuthSchema";
import { getServices } from "../../../redux/slices/provider.slice";
import { UpdateService } from "../../../redux/slices/auth.slice";

export default function EditServiceModal({ onClose, selectedItem }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        title: selectedItem?.title || "",
        price: selectedItem?.amount || "",
        description: selectedItem?.description || "",
      },
      validationSchema: serviceAddSchema,
      validateOnChange: true,
      validateOnBlur: true,
      enableReinitialize: true, // Important so form updates if selectedItem changes
      onSubmit: async (values) => {
        try {
          const servicePayload = {
            id: selectedItem?.id,
            data: {
              title: values.title,
              amount: values.price,
              description: values.description,
            },
          };
          await dispatch(UpdateService(servicePayload)).unwrap();
          dispatch(getServices());
          onClose();
        } catch (error) {
          ErrorToast("Failed to update service");
        }
      },
    });
  console.log(errors, "errors");
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

        <h2 className="text-[20px] font-bold mb-6 text-center">Edit Service</h2>

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
              placeholder="Briefly explain the service"
              className="w-full border border-[#BEBEBE] rounded-md px-3 py-2 text-sm outline-none min-h-[80px] resize-none"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.description && touched.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Save Button */}
          <Button text="Save Changes" type="submit" loading={isLoading} />
        </form>
      </div>
    </div>
  );
}
