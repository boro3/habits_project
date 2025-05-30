import {useState, useEffect} from 'react';

import Habit from '../Habit'
import Loader from '../Loader';
import EditModal from '../EditModal';
import AddModal from '../AddModal';

import Rest from '../../../services/rest';

function HabitsList() {
    const dataInit = {
        name: '',
        description: ''
    };

    const errorInit = {
        name: '',
        description: ''
    };

    const [habits, setHabits] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [data, setData] = useState(dataInit);
    const [editData, setEditData] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [errors, setErrors] = useState(errorInit);

    useEffect(() => {
	    getData();
	}, []);

    const getData = async () => {
        setShowLoader(true);
        try {
            let response = await Rest.getAll();
            setHabits(response.data);
            setShowLoader(false);
        } catch (error) {
            console.error(error.message);
            setShowLoader(false);
        }
    };

    const addHabit = async () => {
        if (!data.name || !data.description) {
            setErrors({
                name: !data.name ? 'Name is required' : '',
                description: !data.description ? 'Description is required' : ''
            });
            return;
        }
        setErrors(errorInit);
        await addHabitHandler(data);
        setData(dataInit);
        closeAddModal();
        getData();
    };

    const editHabit = async () => {
        if (!editData.name || !editData.description) {
             setErrors({
                name: !editData.name ? 'Name is required' : '',
                description: !editData.description ? 'Description is required' : ''
            });
            return;
        }
        setErrors(errorInit);
        await editHabitHandler(editData);
        closeEditModal();
        getData();
    };

    const openAddModal = () => {
        setShowAddModal(true);
    };

    const closeAddModal = () => {
        setData(dataInit);
        setErrors(errorInit);
        setShowAddModal(false);
    };

    const openEditModal = (id) => {
        let habit = habits.find(habit => habit.id === id);
        setEditData(habit);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setEditData({});
        setErrors(errorInit);
        setShowEditModal(false);
    };

    const addHabitHandler = async (habit) => {
        try {
            await Rest.createHabit(habit);
        } catch (error) {
            console.error("Error adding habit:", error);
        }
        
    };

    const editHabitHandler = async (habit) => {
        try {
            await Rest.editHabit(habit, habit.id);
        } catch (error) {
            console.error("Error adding habit:", error);
        }
        
    };

    const inputHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    };

    const editHandler = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        })
    };

    const dateChangeHandler = (e) => {
        if (!e.target.value) {
            setDate(new Date().toISOString().split('T')[0]);
            return;
        }
        setDate(e.target.value);
    };
    
    return (
        <>
            <Loader show={showLoader} />
            <div className='w-full max-w-sm mx-auto px-4 py-2'>
                <div className='flex items-center border-b-2 border-teal-500 py-2'>
                    <input
                        className='border border-gray-300 rounded p-2 w-full mr-2'
                        type='date'
                        onChange={dateChangeHandler}
                        value={date}/>
                    <button 
                        onClick={openAddModal}
                        
                        className='bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'>
                            Add
                    </button>
                </div>
            </div>
            <div>
                <ul className='px-4'>
                    {habits?.map(habit => (
                        <Habit
                            key={habit.id}
                            habit={habit}
                            refreshData={getData}
                            clickHandler={openEditModal}
                            date={date}
                        />
                     ))}
                </ul>
            </div>
            
            { showAddModal ? 
                <AddModal
                    closeHandler={closeAddModal}
                    changeHandler={inputHandler}
                    confirmHandler={addHabit}
                    data={data}
                    errors={errors}
                />
            : null}

            { showEditModal ? 
                <EditModal
                    closeHandler={closeEditModal}
                    changeHandler={editHandler}
                    confirmHandler={editHabit}
                    data={editData}
                    errors={errors}
                />            
            : null} 
        </>
    );
}

export default HabitsList;