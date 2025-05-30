import {useState} from 'react';
import Rest from '../../../services/rest';

function LoginForm() {
    const errorInit = {
        userName: '',
        password: '',
        message: ''
    };

    const [errors, setErrors] = useState(errorInit);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userName = formData.get('userName');
        const password = formData.get('password');
        if (!userName || !password) {
            setErrors({
                userName: !userName ? 'User Name is required' : '',
                password: !password ? 'Password is required' : '',
                message: 'Please fill in all required fields.'
            });
            return;
        }

        try {
            const response = await Rest.login({userName, password});
            if (response) {
                localStorage.setItem('token', response);
                window.location.reload();
                setErrors(errorInit);
            }
        } catch (error) {
            if (error.message === 'Wrong username or password') {
                setErrors({
                    ...errorInit,
                    message: 'Please check your credentials and try again.'
                });
            }
            console.error(error);
        }
    };
    
  return (
    <section className='bg-gray-50'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
                <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
                        Sign in to your account
                    </h1>
                    <p className='text-red-700'>
                        {errors.message}
                    </p>
                    <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                        <div>
                            <label className='block mb-2 text-sm font-medium text-gray-900'>User Name</label>
                            <input type='text' name='userName' className='g-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' placeholder='User Name' required=''/>
                            <span className='inline-block pl-1 text-sm font-medium text-red-700'>{errors.userName}</span>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type='password' name='password' placeholder='••••••••' className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' required=''/>
                            <span className='inline-block pl-1 text-sm font-medium text-red-700'>{errors.password}</span>
                        </div>
                        <button type='submit' className='w-full text-white bg-teal-500 hover:bg-teal-700 font-medium rounded px-5 py-2.5 text-center'>Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  );
};

export default LoginForm;