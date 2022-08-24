import { useState } from "react";
import { useFormDataHandler } from "../hooks/useFormDataHandler";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import TextInput from "./forms/TextInput";

const WorkoutForm = () => { 
  const { dispatch } = useWorkoutsContext();
  const { formData, setFormDataProperty, resetFormData } = useFormDataHandler();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/workouts', {
      method:'POST',
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
      resetFormData();
      dispatch({type: 'CREATE_WORKOUT', payload: json});
      console.log('new workout added', json);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

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

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;