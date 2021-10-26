console.log('groups')

const URL = 'http://localhost:3000/accounts'

const groupContainer = document.querySelector('.groupContainer')
const groupId = document.querySelector('#groupId')
const add = document.querySelector('#btn')

const { email, token } = getUser();

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
    groupContainer.innerHTML = dataArr
        .map((post) => `
            <div class="cards-group">
                <div class="card">
                    <h3 class="idText">ID: 2</h3>
                    <h6 class="text">Our Trip to SF</h6>
                </div>
            </div>
        `,
        )
        .join('');
}



add.onclick = () => {


}

