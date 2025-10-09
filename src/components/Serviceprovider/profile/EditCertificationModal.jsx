import { useFormik } from "formik";
import Input from "../../global/Input";
import { certificationSchema } from "../../../schema/authentication/AuthSchema";
import { Button } from "../../global/GlobalButton";
import { ErrorToast } from "../../global/Toaster";
import { useDispatch, useSelector } from "react-redux";
import {
  getProviderProfile,
  UpdateCertificate,
} from "../../../redux/slices/auth.slice";

export default function EditCertificateModal({ onClose, selectedItem }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        certificationName: selectedItem?.name || "",
        institution: selectedItem?.institution || "",
        completionDate: selectedItem?.date_of_completion || "",
        description: selectedItem?.description || "",
      },
      validationSchema: certificationSchema,
      validateOnChange: true,
      validateOnBlur: true,
      enableReinitialize: true,
      onSubmit: async (values) => {
        try {
          const Certificatedata = {
            id: selectedItem?.id,
            data: {
              name: values?.certificationName,
              institution: values?.institution,
              date_of_completion: values?.completionDate,
              description: values?.description,
            },
          };
          await dispatch(UpdateCertificate(Certificatedata)).unwrap();
          dispatch(getProviderProfile());
          onClose();
        } catch (error) {
          ErrorToast("Failed to update certification");
        }
      },
    });

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
          Edit Certification
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="flex flex-col gap-4"
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

          {/* Date Picker for Date of Completion */}
          <div>
            <label className="block text-sm font-semibold mb-1">Date of Completion</label>
            <input
              type="date"
              name="completionDate"
              value={values.completionDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border border-[#BEBEBE] rounded-md px-3 py-2 text-sm outline-none"
            />
            {errors.completionDate && touched.completionDate && (
              <p className="text-red-500 text-sm mt-1">{errors.completionDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Briefly explain the certification"
              className="w-full border border-[#BEBEBE] rounded-md px-3 py-2 text-sm outline-none min-h-[80px] resize-none"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.description && touched.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <Button text="Save" type="submit" loading={isLoading} />
        </form>
      </div>
    </div>
  );
}
