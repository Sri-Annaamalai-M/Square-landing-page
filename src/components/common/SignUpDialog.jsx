import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import Button from "./Button";
import { createUser } from "../../api/Service/create";

const disposableDomains = [
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "yopmail.com",
  "mailinator.com",
];

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .test("not-temp-mail", "Disposable emails are not allowed", (value) => {
      if (!value) return false;
      const domain = value.split("@")[1]?.toLowerCase();
      return !disposableDomains.includes(domain);
    })
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignUpModal = ({ isOpen, onClose }) => {
  const formik = useFormik({
    initialValues: { name: "", email: "", phone: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setStatus, setFieldError }) => {
      setStatus({ success: false, message: "Saving..." });

      try {
        const res = await createUser(values); // This part only runs for successful (2xx) responses
        console.log({ res });

        // This logic now only handles success cases
        setStatus({ success: true, message: "Sign Up Successful!" });
        setTimeout(() => {
          setStatus({});
          onClose();
          resetForm();
        }, 2000);

      } catch (err) {
        console.error(err);

        // Check if the error has a 'response' object - this is characteristic of an API error (like 400, 404, 500)
        if (err.response) {
          // The server responded with an error, so we can access its data
          const res = err.response; // The actual response is inside err.response
          const msg = res.data.message?.toLowerCase() || "";
          console.log({ msg });

          if (msg.includes("email") && !msg.includes("phone")) {
            // Use the message from the server's response
            setFieldError("email", res.data.message);
          } else if (msg.includes("phone") && !msg.includes("email")) {
            setFieldError("phone", res.data.message);
          } else {
            // General API error (covers "Email or phone already exists", etc.)
            setStatus({ success: false, message: res.data.message || "Something went wrong" });
          }
        } else {
          // This is a network error or some other unexpected error, not from the API
          setStatus({ success: false, message: "Failed to Sign Up. Please check your connection." });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Sign Up
        </h2>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {/* Name */}
          <Input
            label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-600 text-sm">{formik.errors.name}</p>
          )}

          {/* Email */}
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-600 text-sm">{formik.errors.email}</p>
          )}

          {/* Phone */}
          <Input
            label="Phone"
            name="phone"
            type="text"
            placeholder="Enter your phone number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-600 text-sm">{formik.errors.phone}</p>
          )}

          {/* Password */}
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-600 text-sm">{formik.errors.password}</p>
          )}

          {/* Submit Button */}
          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Submitting..." : "Sign Up"}
          </Button>
        </form>

        {/* Status Messages */}
        {formik.status && formik.status.message && (
          <div className="text-center mt-4 text-sm">
            {formik.status.success ? (
              <p className="text-green-600 font-medium flex items-center justify-center gap-2">
                {formik.status.message}
              </p>
            ) : (
              <p className="text-red-600">{formik.status.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpModal;
