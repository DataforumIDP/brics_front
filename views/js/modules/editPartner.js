import { getAuthorizeSettings } from "./authorizeSetting.js"
import { burgerMenuClose } from "./burgerMenu.js"
import { fillPartnerData, getP_Data, setP_Data } from "./getPartnersData.js"
import { closeModal, openModal } from "./modal.js"
import { noEmpty } from "./noEmpty.js"
import { getAndFillUsers, getUser } from "./partnerScreen.js"

let editMode = false

export function isEdit() {
    return editMode
}

export function toggleEditMode() {
    editMode = !editMode
    editMode ? loadEditMode() : saveEdit('.main', () => {
        $('.edit__btn').removeClass('--blue').find('span').text('Редактировать профиль')
        $('.list__btn').removeClass('--grey')
        $('.--views').removeClass('--none')
        $('.--edit').addClass('--none')
    })
}

export function toggleEditModeMob() {
    editMode = !editMode
    
    editMode ? loadEditModeMob() : saveEdit('.mobile', ()=>{
        $('.--mob-edit-btn').removeClass('--edited').html('Редактировать профиль  <div class="edit-ico"></div>')
        $('.mob-inputs.--views').removeClass('--none')
        $('.mob-inputs.--edit').addClass('--none')
    })
}

function loadEditModeMob() {
    // $('.edit__btn').addClass('--blue').find('span').text('Сохранить')
    $('.--mob-edit-btn').addClass('--edited').html('Сохранить')
    // $('.list__btn').addClass('--grey')
    $('.mob-inputs.--views').addClass('--none')
    $('.mob-inputs.--edit').removeClass('--none')
    burgerMenuClose()
}

function loadEditMode() {
    $('.edit__btn').addClass('--blue').find('span').text('Сохранить')
    $('.list__btn').addClass('--grey')
    $('.--views').addClass('--none')
    $('.--edit').removeClass('--none')
}

async function saveEdit(sel, func) {
    let data = {}

    data.organization = $(sel + ' .--e-organization').val()
    data.description = $(sel + ' .--e-description').val().trim()
    data.site = $(sel + ' .--e-site').val()
    data.contacts = $(sel + ' .--e-contacts').val().trim()
    let processedData = different(data, getP_Data())

    processedData = noEmpty(processedData)

    console.log(processedData);

    if (Object.values(processedData).includes(null)) return false

    if (JSON.stringify(processedData) != '{}') {
        const [result, err] = await updatePartnerData(processedData)

        if (err !== null) {
            console.log(err);
            return
        }

        fillPartnerData(result.partner)

        setP_Data(result.partner)
    }

    func()
}


async function updatePartnerData(data) {
    return new Promise(async resolve => {
        try {
            const result = await axios.patch('https://brics.wpdataforum.ru/api/partner', data, getAuthorizeSettings())
            resolve([result.data, null])
        } catch ({ response }) {
            resolve([null, response])
        }
    })
}

// function different(obj) {
//     const now = getP_Data()

//     let etalon = {} 
//     Object.keys(obj).forEach(item => {
//         if (obj[item] != now[item]) etalon[item] = obj[item]
//     })
//     return etalon
// }

export function different(obj, now) {

    let etalon = {}
    Object.keys(obj).forEach(item => {
        if (obj[item] != now[item]) etalon[item] = obj[item]
    })
    return etalon
}

let editedUser = {}

export function openEditUser(id) {
    const user = getUser(id)
    editedUser = user

    const timestamp = user.timestamp ?? new Date().getTime()

    const date = new Date(parseInt(timestamp))

    $('.--id span').text(user.id)
    $('.--date span').text(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)
    $('.--e-fio').val(`${user.surname} ${user.name} ${user.lastname ?? ''}`)
    $('.--e-passport').val(user.passport)
    $('.--e-grade').val(user.grade)
    $('.--e-activity').val(user.activity)
    openModal('.edit-modal')
}

export async function updateUserData() {
    const data = {
        name: ($('.--e-fio').val()).trim().split(' ')[1],
        surname: ($('.--e-fio').val()).trim().split(' ')[0],
        lastname: ($('.--e-fio').val()).trim().split(' ')[2] ?? null,
        passport: $('.--e-passport').val(),
        grade: $('.--e-grade').val(),
        activity: $('.--e-activity').val(),
    }

    const processedData = different(data, editedUser)
    const [result, err] = await updateUserSend(processedData, editedUser.id)
    closeModal('.edit-modal')
    getAndFillUsers()
}

async function updateUserSend(data, id) {
    return new Promise(async resolve => {
        try {

            const result = await axios.patch(`https://brics.wpdataforum.ru/api/partner/${id}`, data, getAuthorizeSettings())
            resolve([result.data, null])

        } catch ({ response }) {
            resolve([null, response])
        }
    })
}