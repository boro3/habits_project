import Rest from '../../../services/rest';
import './style.css'

function Habit(props) {
  const toggleHabitHandler = async (e) => {
    let id = e.target.closest('li').dataset.id;
    await toggleHabit(id);
    props.refreshData();
  };

  const toggleHabit = async (id) => {
    try {
      await Rest.toggleHabit(id);
    } catch (error) {
      console.error("Error completing habit:", error);
    }
  };

  const removeHabitHandler = async (e) => {
    let id = e.target.closest('li').dataset.id;
    e.stopPropagation();
    await removeHabit(id);
    props.refreshData();
  };

  const removeHabit = async (id) => {
    try {
      await Rest.removeHabit(id);
    } catch (error) {
      console.error("Error removing habit:", error);
    }
  };

  const checkIfDone = (habit) => {
    const today = new Date().toISOString().split('T')[0];
    if (habit.completedDates.includes(today)) {
      return true;
    }
    return false
  };

  return (
    <li onClick={toggleHabitHandler} className={`habit-item ${checkIfDone(props.habit) ? 'done' : ''}`} data-id={props.habit.id}>
      <span>{props.habit.description}</span>
      <button onClick={removeHabitHandler}>✖</button>
    </li>
  );
}

export default Habit;
