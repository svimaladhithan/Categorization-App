import { useField } from "formik";
import { TextInput } from "flowbite-react";

const FormikTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props); // useField hook from Formik to connect input with Formik state
  return (
    <div>
      {label && <label>{label}</label>}
      <TextInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-red-600 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikTextInput;
