import { useFormik } from "formik";
import Modal from "react-modal";
import { changedPasswordValues } from "../../../init/authentication/AuthValues";
import { changedPasswordSchema } from "../../../schema/authentication/AuthSchema";
import Input from "../../global/Input";
import { Button } from "../../global/GlobalButton";
import { HiOutlineXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../redux/slices/users.slice";

export default function ChangedPassword({
  isOpen,
  setIsOpen,
  successFullUpdate,
  SetSuccessfulUpdate,
}) {
  const dispatch = useDispatch();
  const { updateLoading } = useSelector((s) => s.user); // slice key "user" per aapka reducer mounted hai

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, resetForm } =
    useFormik({
      initialValues: changedPasswordValues,
      validationSchema: changedPasswordSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (vals) => {
        // map Formik -> API fields
        const payload = {
          old_password: vals.password,
          password: vals.newPassword,
          password_confirmation: vals.confirmPassword,
        };

        try {
          await dispatch(changePassword(payload)).unwrap();
          // success handled by thunk toast; now close + toggle
          setIsOpen(false);
          SetSuccessfulUpdate(!successFullUpdate);
          resetForm();
        } catch (e) {
          // error toast already shown in thunk; keep modal open for correction
        }
      },
    });

  return (
    <div>
      <Modal
        isOpen={isOpen}
        contentLabel="Change Password"
        shouldCloseOnOverlayClick={!updateLoading}
        shouldCloseOnEsc={!updateLoading}
        className="flex items-center justify-center border-none outline-none z-[1000]"
        overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000] flex justify-center items-center"
      >
        <div className="bg-white rounded-[16px] p-6 pt-3 shadow-lg w-[450px] flex flex-col text-center justify-center gap-3">
          <div className="flex justify-end w-full">
            <button
              onClick={() => !updateLoading && setIsOpen(false)}
              disabled={updateLoading}
              className={updateLoading ? "opacity-50 cursor-not-allowed" : ""}
              aria-label="Close"
            >
              <HiOutlineXMark size={23} />
            </button>
          </div>

          <h3 className="font-bold text-[36px] text-[#181818]">Change Password</h3>
          <p className="font-[400] text-[16px] text-[#565656]">
            You must enter current password in order to update password.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="w-full mt-5 flex flex-col justify-start items-start gap-4"
          >
            <Input
              text={"Password"}
              name={"password"}
              type={"password"}
              holder={"Enter password here"}
              value={values.password}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.password}
              touched={touched?.password}
              disabled={updateLoading}
            />

            <Input
              text={"New Password"}
              name={"newPassword"}
              type={"password"}
              holder={"Enter new password here"}
              value={values.newPassword}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.newPassword}
              touched={touched?.newPassword}
              disabled={updateLoading}
            />

            <Input
              text={"Confirm Password"}
              name={"confirmPassword"}
              type={"password"}
              holder={"Re-enter password here"}
              value={values.confirmPassword}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.confirmPassword}
              touched={touched?.confirmPassword}
              disabled={updateLoading}
            />

            <Button text={"Update"} type={"submit"} loading={updateLoading} />
          </form>
        </div>
      </Modal>
    </div>
  );
}
