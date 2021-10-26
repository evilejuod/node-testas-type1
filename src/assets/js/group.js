const URL = 'http://localhost:3000'

const groupContainer = document.querySelector('.groupContainer')
const groupId = document.querySelector('#groupId')
const add = document.querySelector('#btn')

const { email, token } = getUser();

checkIfUserLoggedIn();

function getUser() {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (email && token) {
        return {
            email,
            token,
        };
    }
    return false;
}

async function fetchData(urlPath = '', reqMethod = 'GET') {
    const resp = await fetch(`${URL}${urlPath}`, {
        method: reqMethod,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const dataFromResp = await resp.json();
    return dataFromResp;
}

function checkIfUserLoggedIn() {
    if (!email) {
        window.location.href = 'login.html';
    }
}

async function getPost() {
    const data = await fetchData();
    // console.log('data', data);
    if (data.msg === 'success') {
        return data.data;
    }
    throw new Error('no posts found');
}

function generatePosts(dataArr, groupContainer) {
    groupContainer.innerHTML = dataArr.map((post) => `
            <div class="cards-group">
                <div class="card">
                <a href="/bills/${post.id}">
                    <h3 class="idText">${post.id_group}</h3>
                    <h6 class="text">${post.name}</h6>
                </a>
                </div>
            </div>
        `,
    )
        .join('');
}

async function postData(urlPath = '', reqMethod = 'POST') {
    const resp = await fetch(`${URL}${urlPath}`, {
        method: reqMethod,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}



add.onclick = async (event) => {
    event.preventDefault();
    const groupIdInput = document.querySelector('.groupId');

    const requestBody = JSON.stringify({
        id_group: groupIdInput.value
    })

    await fetch(`${URL}/bills`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: requestBody
    });

    groupIdInput.value = ''

    fetchData('/bills/groups').then(data => {
        generatePosts(data, groupContainer);
    });
}

fetchData('/bills/groups').then(data => {
    generatePosts(data, groupContainer);
});