import { useState } from 'react';

import { validators } from '@utils/validators';

import type { ChangeEvent } from 'react';

type TValues = Record<string, string>;
type TErrors = Record<string, boolean>;

type TUseFormReturn = {
  values: TValues;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
  errors: TErrors;
  isValid: boolean;
};

export function useFormWithValidation(initialValues: TValues = {}): TUseFormReturn {
  const [values, setValues] = useState<TValues>(initialValues);
  const [errors, setErrors] = useState<TErrors>(initErrors(initialValues));
  const [isValid, setIsValid] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const input = event.target;
    const value = input.value;
    const name = input.name;

    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);

    const newErrors = {
      ...errors,
      [name]: validators[name]?.validator(value) ?? true,
    };

    setErrors(newErrors);

    const formIsNotValid = Object.values(newErrors).some((x) => !x);

    setIsValid(!formIsNotValid);
  }

  function resetForm(): void {
    setValues(initialValues);
    setErrors(initErrors(initialValues));
    setIsValid(false);
  }

  return { values, handleChange, resetForm, errors, isValid };
}

function initErrors(formValues: TValues): TErrors {
  return Object.keys(formValues).reduce<TErrors>((errors, fieldName) => {
    errors[fieldName] = false;
    return errors;
  }, {});
}
