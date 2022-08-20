import {useState} from 'react';

export const useFormHandler = (formDefinition) => {
  const [formObject, setFormObject] = useState(formDefinition);
  
  const setFormField = (e) => {
    setFormObject(formObject => (
       {
        ...formObject,
        [e.target.name]: e.target.value
      }
    ));
  };

  const resetFormObject = () => {
    setFormObject(formDefinition);
  };

  return {
    formObject,
    setFormObject,
    setFormField,
    resetFormObject
  }
};