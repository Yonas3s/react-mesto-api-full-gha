import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [isValid, setValid] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isInputValid, setIsInputValid] = useState({});

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    const validationMessage = evt.target.validationMessage;
    const valid = evt.target.validity.valid;
    const form = evt.target.form;

    setValid(form.checkValidity());

    setValues((oldValues) => {
      return { ...oldValues, [name]: value };
    });

    setErrors((oldErrors) => {
      return { ...oldErrors, [name]: validationMessage };
    });

    setIsInputValid((oldIsInputValid) => {
      return { ...oldIsInputValid, [name]: valid };
    });
  }

  const setValue = useCallback((name, value) => {
    setValues((oldValues) => {
      return { ...oldValues, [name]: value };
    });
  }, []);

  function reset(data = {}) {
    setValid(false);
    setValues(data);
    setErrors({});
    setIsInputValid({});
  }

  return {
    isValid,
    values,
    errors,
    isInputValid,
    handleChange,
    reset,
    setValue,
  };
}
