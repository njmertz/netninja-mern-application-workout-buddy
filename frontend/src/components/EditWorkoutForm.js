import { useEffect, useState } from "react";
import { useFormDataHandler } from "../hooks/useFormDataHandler";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useModalContext } from "../hooks/useModalContext";
import TextInput from "./forms/TextInput";

const EditWorkoutForm = ({workout}) => { 
  const { dispatch } = useWorkoutsContext();
  const { dispatch:modalDispatch } = useModalContext();
  const { formData, setFormData, setFormDataProperty } = useFormDataHandler();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/workouts/${workout._id}`, {
      method:'PATCH',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const json = await response.json();

    if(!response.ok){
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if(response.ok){
      setError(null);
      setEmptyFields([]);
      setFormData({});
      console.log('workout updated', json);
      dispatch({type: 'UPDATE_WORKOUT', payload: json});
      // dispatch({type: 'RELOAD_WORKOUTS'});
      modalDispatch({type: 'CLOSE_MODAL'});
    }
  };

  useEffect(() => {
    setFormData(formData => ({...workout}));
  }, [setFormData, workout]);

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Edit Workout</h3>

      <TextInput
        fieldType="text"
        fieldName="title"
        fieldLabel="Exercise Title:"
        fieldValue={formData.title ?? ''}
        eventHandler={setFormDataProperty}
        fieldClasses={emptyFields.includes('title') ? "error" : ""}
      />

      <TextInput
        fieldType="text"
        fieldName="load"
        fieldLabel="Load (in kg):"
        fieldValue={formData.load ?? 0}
        eventHandler={setFormDataProperty}
        fieldClasses={emptyFields.includes('load') ? "error" : ""}
      />

      <TextInput
        fieldType="text"
        fieldName="reps"
        fieldLabel="Reps:"
        fieldValue={formData.reps ?? 0}
        eventHandler={setFormDataProperty}
        fieldClasses={emptyFields.includes('reps') ? "error" : ""}
      />

      <button>Edit Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default EditWorkoutForm;