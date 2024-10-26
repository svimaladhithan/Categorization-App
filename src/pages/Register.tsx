import { Button, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikTextInput from "../components/FormikTextInput";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // Define initial form values
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(7, "Username must be at least 7 characters")
      .max(16, "Username must be at most 16 characters")
      .matches(/^\S*$/, "Username must not contain spaces")
      .matches(/^[a-z0-9_]+$/, "Username must be lowercase and contain only alphanumeric characters and underscores"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("https://671c3de12c842d92c38272b2.mockapi.io/api/users", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      if (response.status === 201) {
        auth?.login(values.username); // Login the user after successful registration
        navigate("/login");
      } else {
        throw new Error(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <div className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white">
              Inventory
            </span>
            Stop
          </div>
          <p className="text-sm mt-6">
            You can sign up with your Email and password or you can use Google.
          </p>
        </div>
        <div className="flex-1">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <FormikTextInput
                  label="Username"
                  type="text"
                  placeholder="Enter your User Name"
                  id="username"
                  name="username"
                />
                <FormikTextInput
                  label="Email"
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  name="email"
                />
                <FormikTextInput
                  label="Password"
                  type="password"
                  placeholder="Enter Your Password"
                  id="password"
                  name="password"
                />
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-blue-500"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner
                        color="info"
                        aria-label="Info spinner example"
                        size="sm"
                      />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
          <div className="flex gap-2 text-sm mt-6">
            <span>Already Have An Account?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;