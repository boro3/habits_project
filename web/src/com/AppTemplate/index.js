import HabitsList from '../widgets/HabitsList';

function AppTemplate() {
    return (
    <div className='max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16 border-2 border-teal-500'>
        <div className='px-4 py-2 bg-teal-500'>
            <h1 className='text-white font-bold text-2xl uppercase'>Habit Tracker</h1>
        </div>
        <div className='relative min-h-[200px]'>
            <HabitsList/>
        </div>
    </div>
    );
}

export default AppTemplate;