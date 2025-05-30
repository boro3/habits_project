import Modal from '../../Modal';

function EditModal(props) {

    const footerActionsHabit = [
        {
            label: 'Close',
            handler: props.closeHandler,
            customClassName: 'cancel-button'
        },
        {
            label: 'Edit Habit',
            handler: props.confirmHandler,
            customClassName: 'confirm-button'
        }   
    ];

    const lastFinishDate = (dates) => {
        if (!dates || dates.length === 0) {
            return 'Not finished yet.';
        }
        let lastDate = dates.reduce((a, b) => {
            return new Date(a.MeasureDate) > new Date(b.MeasureDate) ? a : b;
        });
        lastDate = new Date(lastDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        return lastDate;
    };
    
  return (
    <Modal
        footerActions={footerActionsHabit}
        closeHandler={props.closeHandler}
        title='Edit Habit'
    >
        <div className='p-4'>
            <div className='flex flex-col mt-2'>
                <div>
                    <span>Habit Name</span>
                </div>
                <input type='text'
                    placeholder='Enter habit name'
                    className={`border border-gray-300 rounded p-2 w-full mb-1 mt-1 ${props.errors.name ? 'border-red-500' : ''}`}
                    value={props.data.name}
                    name='name'
                    onChange={props.changeHandler}
                />
                <span className='min-h-5 inline-block pl-1 text-sm font-medium text-red-700'>{props.errors.name}</span>
            </div>
            <div className='flex flex-col mt-2'>
                <div>
                    <span>Habit Description</span>
                </div>
                <textarea
                    placeholder='Enter habit description'
                    onChange={props.changeHandler}
                    name='description'
                    value={props.data.description}
                    className={`border border-gray-300 rounded p-2 w-full mb-1 mt-1 ${props.errors.description ? 'border-red-500' : ''}`}
                />
                <span className='min-h-5 inline-block pl-1 text-sm font-medium text-red-700'>{props.errors.description}</span>
            </div>
            <div>Streak : {props.data.streak}</div>
            <div>Last finish date : {lastFinishDate(props.data.completedDates)}</div>
        </div>
    </Modal>
  );
};

export default EditModal;
