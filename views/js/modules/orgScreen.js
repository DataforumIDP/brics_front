import { getAuthorizeSettings } from "./authorizeSetting.js"
import { downloadFileFromRes } from "./downloadFileFromRes.js"
import { downloadListBtnText } from "./downloadListBtn.js"
import { openEditUser } from "./editOrg.js"
import { getToken } from "./token.js"


export function orgscreenInit() {
    $('.delete-btn').click(deleteList)
    $('.file').change(regNewUsers)
    getAndFillUsers()
}

async function regNewUsers() {
    const userListFile = $(this)[0].files[0]
    const [result, err] = await uploadUserFile(userListFile)
    if (err !== null) return displayError(err)

    getAndFillUsers()
}

function displayError(err) {
    openModal('.error-modal')
    console.log(err);
    $('.modal__error').text(`Строка ${err.errors.table.row} / ${err.errors.table.text}`)
    console.log(`Строка ${err.errors.table.row} / ${err.errors.table.text}`);
}

async function uploadUserFile(file) {
    return new Promise(async resolve => {
        try {
            let formData = new FormData()
            formData.append("file", file)

            const params = {
                url: 'https://brics.wpdataforum.ru/api/admin/attendees/mass',
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${getToken()}`
                }
            }
            const result = await axios(params)
            resolve([result.data, null])

        } catch ({ response }) {
            resolve([null, response.data])
        }
    })
}

let getParams = {
    search: '',
    order: true,
    sort: 'surname',
    types: []
}

export function toggleType(e) {
    const type = $(this).parent().attr('d-type')
    if (getParams.types.includes(type)) getParams.types = getParams.types.filter(item => item != type)
    else getParams.types.push(type)
    getAndFillUsers()
}

export function getSearchParams(key) {
    return getParams[key]
}

export function updateParams(key, val) {
    getParams[key] = val
    getAndFillUsers()
}


let selectedRows = []

export function toggleSelect(val) {
    val = parseInt(val)
    if (selectedRows.includes(val)) selectedRows = selectedRows.filter(item => item != val)
    else selectedRows.push(val)

    $(".--check-all").attr('val', new Set(selectedRows).size == userList.length ? 'true' : 'false'  )
    downloadListBtnText(selectedRows)
}

export function toggleAll() {
    const val = $(this).attr('val') == 'true'

    if (val) {
        selectedRows = userList.map(item => item.id)
        $(".--user-check").attr('val', 'true')
    } else {
        selectedRows = []
        $(".--user-check").attr('val', 'false')
    }

    downloadListBtnText(selectedRows)
}


let userList = []

export async function getAndFillUsers() {
    const [res, err] = await getUserList()
    userList = res.users
    fillUserList(userList)
    fillMobileList(userList)
    selectedRows = []
}

export function getUser(id = null) {
    if (!id) return userList
    return userList.find(user => user.id == id)
}

async function getUserList() {
    return new Promise(async resolve => {
        try {
            const result = await axios.get(`https://brics.wpdataforum.ru/api/admin/attendees?sort=${getParams.sort}&order=${getParams.order}&search=${getParams.search}&types=${JSON.stringify(getParams.types)}`, getAuthorizeSettings())
            resolve([result.data, null])

        } catch ({ response }) {
            resolve([null, response])
        }
    })
}

function fillUserList(struct) {
    $('.table__row').remove()
    struct.forEach(pasteUserInTable)
}

function fillMobileList(struct) {
    $('.mt-item').remove()
    struct.forEach(pasteUserInMobTable)
}

function pasteUserInTable(user) {
    $('.table__body .os-content').append(`
        <div d-id="${user.id}" class="table__row">
            <div class="table__item --0">
                <div class="checkbox --user-check"></div>
            </div>
            <div class="table__item --3 --type">
                <div class="type__container">
                    <span>${convertType(user.type)}</span>
                    ${['smi', 'speacker'].includes(user.type) ? `<div class="accr --${user.accreditation}">${user.accreditation ? 'Аккредитован' : 'Не аккредитован'}</div>` : ''}
                </div>
                ${user.created ? '<div title="Эта запись добавлена организатором" class="created"></div>' : ''}
                
            </div>
            <div class="table__item --5">${user.surname} ${user.name} ${user.lastname ?? ''}</div>
            <div class="table__item --5">${user.grade ?? ''}</div>
            <div class="table__item --4">${user.organization ?? ''}</div>
            <div class="table__item --2">
                <div class="action">
                    <div class="action__ico"></div>
                    <div class="action__body">
                    <div class="action__item --edit-u">Редактировать</div>
                        ${(['smi', 'speacker'].includes(user.type) && !user.accreditation) ? '<div class="action__item --accr-u">Аккредитовать</div>' : ''}
                        <div class="action__item --delete-u">Удалить</div>
                    </div>
                </div>
            </div>
        </div>
    `)
}

function pasteUserInMobTable(user) {
    $('.mt').append(`
        <div class="mt__item mt-item" d-id="${user.id}">
            <div class="mt-item__holder">
                <div class="open-btn"></div>
                <div class="input__line">
                    <h2 class="input__title --row">ФИО ${user.created ? '<div title="Эта запись добавлена организатором" class="created"></div>' : ''}</h2>
                    <p class="input__value">${user.surname} ${user.name} ${user.lastname ?? ''}</p>
                </div>
                <div class="checkbox --user-check"></div>
            </div>
            <div class="mt-item__body">
                <div class="input__line">
                    <h2 class="input__title">Тип</h2>
                    <p class="input__value --row">${convertType(user.type)} ${['smi', 'speacker'].includes(user.type) ? `<span class="accr --${user.accreditation}">${user.accreditation ? 'Аккредитован' : 'Не аккредитован'}</span>` : ''}</p>
                </div>
                <div class="input__line">
                    <h2 class="input__title">ДОЛЖНОСТЬ</h2>
                    <p class="input__value">${user.grade ?? ''}</p>
                </div>
                <div class="input__line">
                    <h2 class="input__title">ОРГАНИЗАЦИЯ</h2>
                    <p class="input__value">${user.organization ?? ''}</p>
                </div>
                <div class="input__line">
                    <h2 class="input__title">Действие</h2>
                    <div class="btns">
                        <div class="del-u-mobile --delete-u"></div>
                        <div class="edit-u-mobile --edit-u"></div>
                        ${(['smi', 'speacker'].includes(user.type) && !user.accreditation) ? `<div class="accr-u-mobile --accr-u"></div>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `)
}

const typeList = {
    attendees: 'Участник',
    partner: 'Партнер',
    smi: 'СМИ',
    speacker: 'Спикер',
    org: 'Организатор',
    vip: 'VIP',
    stuff: 'Тех. персонал',
    green: 'Зеленый БРИКС',
}

export function convertType(type) {
    return typeList[type]
}

export async function deleteUser(id) {
    return new Promise(async resolve => {
        try {

            const result = await axios.delete(`https://brics.wpdataforum.ru/api/admin/attendees/${id}`, getAuthorizeSettings())
            resolve([result.data, null])

        } catch ({ response }) {
            resolve([null, response])
        }
    })
}

async function deleteList() {
    const deletePromises = selectedRows.map(deleteUser)
    await Promise.all(deletePromises)
    selectedRows = []
    getAndFillUsers()
}

export async function deleteInAction() {
    const userId = $(this).parent().parent().parent().parent().attr('d-id')
    $('.action.--active').removeClass('--active')
    await deleteUser(userId)
    getAndFillUsers()
}

export function editInAction() {
    const userId = $(this).parent().parent().parent().parent().attr('d-id')
    $('.action.--active').removeClass('--active')
    openEditUser(userId)
}

export async function accreditationInAction() {
    const userId = $(this).parent().parent().parent().parent().attr('d-id')
    const [res, err] = await accreditationSend(userId)
    getAndFillUsers()
    $('.action.--active').removeClass('--active')
}


async function accreditationSend(id) {
    return new Promise(async resolve => {
        try {
            const result = await axios.patch(
                `https://brics.wpdataforum.ru/api/admin/attendees/${id}`,
                { accreditation: true },
                getAuthorizeSettings()
            )
            resolve([result.data, null])
        } catch ({ response }) {
            resolve([null, response])
        }
    })
}

export async function downloadPartnerList() {
    const [res, err] = await getPartnerFile()
   downloadFileFromRes(res)
}

export async function downloadAttendeesList() {
    const [res, err] = await getAttendeesFile()
   downloadFileFromRes(res, 'attendees')
}

async function getAttendeesFile(){
    try {
        const result = await axios({
            url: 'https://brics.wpdataforum.ru/api/admin/attendees/download',
            method: 'POST',
            data: {
                ids: selectedRows
            },
            responseType: 'blob', // important
            ...getAuthorizeSettings()
        })
        return [result.data, null]
    } catch ({ response }) {
        return [null, response]
    }
}

async function getPartnerFile() {
    try {
        const result = await axios({
            url: 'https://brics.wpdataforum.ru/api/admin/partners/download',
            method: 'GET',
            responseType: 'blob', // important
            ...getAuthorizeSettings()
        })

        console.log(result);

        return [result.data, null]
    } catch ({ response }) {
        return [null, response]
    }
}