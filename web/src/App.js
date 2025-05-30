import React, { useState, useEffect } from 'react';
import AppTemplate from './com/AppTemplate';
import Rest from '../src/services/rest';
import LoginForm from './com/widgets/LoginForm';

function App() {

  const [show, setShow] = useState(false);

  const validateUser = async () => {
		const token = localStorage.getItem('token');
		if (token) {
			try {
				let res = await Rest.validateToken();			
				if (res === token) {
					setShow(true);
				}
			} catch (err) {
				console.log(err);
				setShow(false);
			}
		} else {
			setShow(false);
		}
	};

  useEffect(() => {
		(async () => {
			await validateUser();
		})();
	}, []);

  return (
    show ? 
      <AppTemplate />
      : 
      <LoginForm/>
  );
}

export default App;
