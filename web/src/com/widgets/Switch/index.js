function Switch(props) {
  return (
    <label className='inline-flex items-center me-5 cursor-pointer' onClick={props.onClick}>
        <input type='checkbox' className='sr-only peer' checked={props.checked} readOnly={true}/>
        <div className={`relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-500 dark:peer-checked:bg-teal-500`}></div>
    </label>
  );
};

export default Switch;


