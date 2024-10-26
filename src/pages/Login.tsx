import { Alert, Button, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikTextInput from "../components/FormikTextInput";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Signin = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Define initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await axios.post("https://671c3de12c842d92c38272b2.mockapi.io/api/users", values); // Same endpoint for login

      if (response.data.success) {
        // Assuming the successful response contains a token
        localStorage.setItem("Token", response.data.token);
        auth?.login(values.email); // Use email or another identifier
        navigate("/categories");
      } else {
        // Handle failed login response
        setErrorMessage(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data.message || "An error occurred during login.");
    } finally {
      setLoading(false);
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
            You can sign in with your Email and password or you can use Google.
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
                  label="Email"
                  type="email"
                  placeholder="Enter your email address"
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
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? (
                    <>
                      <Spinner
                        color="info"
                        aria-label="Info spinner example"
                        size="sm"
                      />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
          <div className="flex gap-2 text-sm mt-6">
            <span>Don't Have An Account?</span>
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert color="failure" icon={HiInformationCircle} className="mt-5">
              <span className="font-medium me-2">🥴 OOPS!</span>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;