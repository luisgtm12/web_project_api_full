//const base_url = 'http://localhost:8001';
const base_url ="http://api.web-around.mooo.com";
export const register = (email, password) => {
  console.log('register auth:', { email, password });
  return fetch(`${base_url}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }else {
      return Promise.reject(res.status);}
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
};

export const authorize = (email, password) => {
  return fetch(`${base_url}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        console.log('token autorize', data.token)
        return data;
      } else {
        return;
      }
    })

    .catch((err) => {
      return console.log(`Error: ${err}`);
    });
};

export const getToken = (token) => {
  return fetch(`${base_url}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("auth Token", data)
      return data;
    })
    .catch((err) => {
      return console.log(`Error: ${err}`);
    });
};