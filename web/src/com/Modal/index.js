import './style.css';

export const Modal = (props) => {
	return (
		<div className='modal-window'>
            <div className='modal-window-container'>
                <div className='modal-window-header'>
                    <h2>{props.title}</h2>
                    <span onClick={props.closeHandler} className='modal-window-close'>&times;</span>
                </div>
                <div className='modal-window-content'>
                    {props.children}
                    <div className='modal-window-footer'>
                        {props.footerActions?.map((action, index) => (
                            <button 
                                key={index} 
                                onClick={action.handler} 
                                className={`modal-window-action-button ${action.customClassName || ''}`}
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;