import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useModalContext } from '../hooks/useModalContext';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import EditWorkoutForm from './EditWorkoutForm';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { dispatch:modalDispatch } = useModalContext();

  const handleDelete = async () => {
    const response = await fetch('/api/workouts/'+workout._id, {
      method: 'DELETE'
    });
    const json = await response.json();

    if(response.ok){
      dispatch({type: 'DELETE_WORKOUT', payload: json});
    }
  }

  const triggerModal = () => {
    modalDispatch({
      type: 'OPEN_MODAL',
      payload: {
        modalContent:<EditWorkoutForm workout={workout} />,
      }
    });
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p><strong>Created: </strong>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <p><strong>Last Updated: </strong>{formatDistanceToNow(new Date(workout.updatedAt), { addSuffix: true })}</p>
      <span onClick={triggerModal} className="material-symbols-outlined">edit</span>
      <span onClick={handleDelete} className="material-symbols-outlined">delete</span>
    </div>
  );
};

export default WorkoutDetails;