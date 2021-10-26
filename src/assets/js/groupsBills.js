
const URL = 'http://localhost:3000'

const amount = document.querySelector('.amount')
const description = document.querySelector('.description')
const add = document.querySelector('#btn')

const idColumn = document.querySelector('.idColumn')
const descriptionColumn = document.querySelector('.descriptionColumn')
const amountColumn = document.querySelector('.amountColumn')



async function fetchData(urlPath = '', reqMethod = 'GET') {
    const resp = await fetch(`${URL}${urlPath}`, {
        method: reqMethod,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return await resp.json();
}


async function getPost() {
    const data = await fetchData();
    // console.log('data', data);
    if (data.msg === 'success') {
        return data.data;
    }
    throw new Error('no posts found');
}

function generatePosts(dataArr, idColumn, descriptionColumn, amountColumn) {
    idColumn.innerHTML = dataArr.map((post) => `
        <td>${post.id}</td>
        `,
    ) .join('');
    descriptionColumn.innerHTML = dataArr.map((post) => `
        <td>${post.id}</td>
        `,
    ) .join('');
    amountColumn.innerHTML = dataArr.map((post) => `
       <td>$ ${post.id}</td>
        `,
    ) .join('');
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
    const amountInput = document.querySelector('.amount');
    const descriptionInput = document.querySelector('.description');

    const requestBody = JSON.stringify({
        amount: amountInput.value,
        description: descriptionInput.value
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

    amountInput.value = ''
    descriptionInput.value = ''

    fetchData('/bills/').then(data => {
        generatePosts(data, idColumn, descriptionColumn, amountColumn);
    });
}

fetchData('/bills/groups').then(data => {
    generatePosts(data, idColumn, descriptionColumn, amountColumn);
});