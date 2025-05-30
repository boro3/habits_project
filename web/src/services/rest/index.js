const API_HOST = "http://localhost:8000/api";

const methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
};

const request = async (route, method, payload, privat) => {
	let config = {
		method: method,
		headers: {}
	};

	if ([methods.POST, methods.PUT, method.PATCH].includes(method)) {
		config = {
			...config,
			body: JSON.stringify(payload),
			headers: {
				'content-type': 'application/json',
			}
		};
	} else {
        config = {
			...config,
			headers: {
				'content-type': 'application/json',
			}
		};
	}

	if (privat) {
		let token = await getToken();
		config.headers = {
			...config.headers,
			Authorization: `Bearer ${token}`,
		};
	}

	let url = `${API_HOST}${route}`;
	return fetch(url, config).then((res) => {
		return handleResponse(res);
	});
};

const handleResponse = (res) => {
	let responseBody = null;
	const responseType = res.headers.get('Content-Type');

	if (responseType && responseType.includes('application/json')) {
		responseBody = res.json();
	} else {
		responseBody = res.text();
	}

	return responseBody.then((data) => {
		if (res.ok) {
			return Promise.resolve(data);
		} else {
			return Promise.reject(data);
		}
	});
};

const getToken = async () => {
	try {
		const token = await window.localStorage.getItem('token');
		if (token !== null) {
			return token;
		}
	} catch (e) {
		throw new Error('Token not found');
	}
};

const getAll = () => {
	return request(`/habits`, methods.GET, null, true);
};

const createHabit = (payload) => {
	return request(`/habits`, methods.POST, payload, true);
};

const editHabit = (payload, query) => {
	return request(`/habits/${query}`, methods.PUT, payload, true);
};

const toggleHabit = (id) => {
    return request(`/habits/${id}/toggle`, methods.PATCH, null, true);
};

const removeHabit = (id) => {
    return request(`/habits/${id}`, methods.DELETE, null, true);
};

const login = (payload) => {
    return request(`/auth/login`, methods.POST, payload);
};

const validateToken = () => {
    return request(`/auth/validate`, methods.GET, null, true);
};


module.exports = {
    getAll,
    createHabit,
    toggleHabit,
    removeHabit,
	editHabit,
	login,
	validateToken
};




