const API_HOST = "http://localhost:8000/api";

const methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
};

const request = async (route, method, payload) => {
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
	let url = `${API_HOST}${route}`;
	return fetch(url, config).then((res) => {
		return res.json();
	});
};

const getAll = () => {
	return request(`/habits`, methods.GET);
};

const createHabit = (payload) => {
	return request(`/habits`, methods.POST, payload);
};

const toggleHabit = (id) => {
    return request(`/habits/${id}/toggle`, methods.PATCH);
};

const removeHabit = (id) => {
    return request(`/habits/${id}`, methods.DELETE);
};

module.exports = {
    getAll,
    createHabit,
    toggleHabit,
    removeHabit
};




