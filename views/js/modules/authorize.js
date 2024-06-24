import { openModal } from "./modal.js";
import { getData } from "./regData.js";


export async function authorize() {
    const [res, err] = await sendRequest(getData())
    if (res === null) return displayError(Object.values(err))
    document.cookie = `token=${res.token}`
    localStorage.setItem('token', res.token)
    location.reload()
}

async function sendRequest(data) {
    return new Promise( async resolve => {
        try {
            const res = await axios.post('https://brics.wpdataforum.ru/api/authorize', data)
            resolve([res.data, null])
        } catch ({response}) {
            resolve([null, response.data.errors.errors])
        }
    })
}

function displayError(errors) {
    openModal('.modal')
    $('.modal__error').remove()
    errors.forEach(item => {
        $('.modal__title').after(`<h3 class="modal__error">${item}</h3>`)
    })
}