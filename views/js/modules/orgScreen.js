import { getAuthorizeSettings } from "./authorizeSetting.js"
import { downloadListBtnText } from "./downloadListBtn.js"
import { openEditUser } from "./editOrg.js"
import { getToken } from "./token.js"


export function orgscreenInit() {
    $('.delete-btn').click(deleteList)
    $('#file').change(regNewUsers)
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
    console.log(getParams.types);
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
    if (selectedRows.includes(val)) selectedRows = selectedRows.filter(item => item != val)
    else selectedRows.push(val)
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
    console.log(selectedRows);

    downloadListBtnText(selectedRows)
}


let userList = []

export async function getAndFillUsers() {
    const [res, err] = await getUserList()
    userList = res.users
    fillUserList(userList)
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


const typeList = {
    attendees: 'Участник',
    partner: 'Партнер',
    smi: 'СМИ',
    speacker: 'Спикер',
    org: 'Организатор',
    vip: 'VIP',
    stuff: 'Тех. персонал',
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
    const [res, err] = await getpartnerFile()

    const href = URL.createObjectURL(res);
    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'file.xlsx'); //or any other extension
    document.body.appendChild(link);
    link.click();
    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
}


async function getpartnerFile() {
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