import React, {useState, useEffect} from 'react';
import Rest from '../../../services/rest';
import Habit from '../Habit'
import './style.css'

function HabitsList() {
    const [input, setInput] = useState('');
    const [habits, setHabits] = useState([]);

    useEffect(() => {
	    getData();
	}, []);

    const getData = async () => {
        try {
            let response = await Rest.getAll();
            setHabits(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error.message);
        }
    }

    const addHabit = async () => {
        if (input === '' || input.trim() === '') {
            return;
        }
        await addHabitHandler(input);
        setInput('');
    };

    const addHabitHandler = async (description) => {
        try {
            await Rest.createHabit({ description });
            await getData();
        } catch (error) {
            console.error("Error adding habit:", error);
        }
        
    };
    return (
        <>
            <div className="input-section">
                <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Enter a habit"
                />
                <button onClick={addHabit}>Add</button>
            </div>
            <ul className="habit-list">
                {habits?.map(habit => (
                <Habit
                    key={habit.id}
                    habit={habit}
                    refreshData={getData}
                />
                ))}
            </ul>
        </>
    );
}

export default HabitsList;