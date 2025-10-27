import { useState } from 'react';

export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = (validationRules) => {
    const newErrors = {};

    Object.keys(validationRules).forEach(field => {
      const rule = validationRules[field];
      const value = values[field];

      if (rule.required && (!value || value.trim() === '')) {
        newErrors[field] = `${rule.label || field} é obrigatório`;
      } else if (rule.minLength && value.length < rule.minLength) {
        newErrors[field] = `${rule.label || field} deve ter no mínimo ${rule.minLength} caracteres`;
      } else if (rule.custom && !rule.custom(value)) {
        newErrors[field] = rule.message || 'Valor inválido';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const setFieldValue = (field, value) => {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const setFieldError = (field, error) => {
    setErrors(prev => ({
      ...prev,
      [field]: error,
    }));
  };

  return {
    values,
    errors,
    handleChange,
    validate,
    reset,
    setFieldValue,
    setFieldError,
    setValues,
  };
};