import {useState} from 'react';

export const useFormDataHandler = () => {
  const [formData, setFormData] = useState({});
  
  const setFormDataProperty = (e) => {
    setFormData(formData => (
       {
        ...formData,
        [e.target.name]: e.target.value
      }
    ));
  };

  const resetFormData = () => {
    setFormData({});
  };

  return {
    formData,
    setFormData,
    setFormDataProperty,
    resetFormData
  }
};