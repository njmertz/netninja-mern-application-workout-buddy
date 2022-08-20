import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useFormHandler } from "../hooks/useFormHandler";

const WorkoutForm = () => {
  const formDefinition = {
    title: '',
    load: 0,
    reps: 0
  };  
  const { dispatch } = useWorkoutsContext();
  const {formObject:formData, setFormField, resetFormObject} = useFormHandler(formDefinition);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = formData;

    const response = await fetch('/api/workouts', {
      method:'POST',
      body: JSON.stringify(workout),
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
      resetFormObject();
      dispatch({type: 'CREATE_WORKOUT', payload: json});
      console.log('new workout added', json);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label htmlFor="title">Exercise Title:</label>
      <input
        type="text"
        name="title"
        id="title"
        onChange={setFormField}
        value={formData.title}
        className={emptyFields.includes('title') ? "error" : ""}
      />

      <label htmlFor="load">Load (in kg):</label>
      <input
        type="number"
        name="load"
        id="load"
        onChange={setFormField}
        value={formData.load}
        className={emptyFields.includes('load') ? "error" : ""}
      />

      <label htmlFor="reps">Reps:</label>
      <input
        type="number"
        name="reps"
        id="reps"
        onChange={setFormField}
        value={formData.reps}
        className={emptyFields.includes('reps') ? "error" : ""}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;