//Register

console.log('register')
const URL = 'http://localhost:3000/accounts'

const formEL = document.getElementById('register-form');

formEL.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('sending');
    const formData = new FormData(formEL);
    console.log('formData', Object.fromEntries(formData));
    // send fetch
    const resp = await fetch(`${URL}/register`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    });
    const dataBack = await resp.json();
    console.log('dataBack', dataBack);
    if (dataBack.msg === 'register success') {
        //negaunam siu duomenu
        // const { email, token } = dataBack;
        // localStorage.setItem('name', full_name);
        // localStorage.setItem('email', email);
        // localStorage.setItem('token', token);
        // redirect to home page

        window.location = '/accounts/login';
    }

});

