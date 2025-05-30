import Switch from '../Switch';

import Rest from '../../../services/rest';

import './style.css'

function Habit(props) {

  const toggleHabitHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    // Prevent toggling habits that are not for today
    const today = new Date().toISOString().split('T')[0];
    if(today !== props.date) {
      return;
    }
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

  const clickHandler = async (e) => {
    e.stopPropagation();
    let id = e.target.closest('li').dataset.id;
    props.clickHandler(id);
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
    if (habit.completedDates.includes(props.date)) {
      return true;
    }
    return false
  };

  return (
    <li data-id={props.habit.id} onClick={clickHandler} className={`habit-item ${checkIfDone(props.habit) ? 'done' : ''} border-2 border-teal-500`}>
      <span>{props.habit.name}</span>
      <div className='flex'>
        <div className='flex items-center justify-center'>
          <Switch checked={checkIfDone(props.habit)} onClick={toggleHabitHandler}/>
        </div>
        <button onClick={removeHabitHandler}
          className='bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white px-2 rounded'
        >
          &times;
        </button>
      </div>
    </li>
  );
};

export default Habit;
