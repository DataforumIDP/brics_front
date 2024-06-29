import { getAuthorizeSettings } from "./authorizeSetting.js"


export function orgscreenInit () {
    $('#file').change(regNewUsers)
    getAndFillUsers()
}

async function regNewUsers() {
    const userListFile = $(this)[0].files[0]
    const [result, err] = await uploadUserFile(userListFile)
    if (err !== null) return displayError(err)

    getAndFillUsers()
}

function displayError (err) {
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

export function getSearchParams(key) {
    return getParams[key]
}

export function updateParams(key, val) {
    getParams[key] = val
    getAndFillUsers()
}

let userList = []

export async function getAndFillUsers() {
    const [res, err] = await getUserList()
    userList = res.users
    fillUserList(userList)
}

export function getUser(id = null) {
    if (!id) return userList
    return userList.find(user => user.id == id)
}

async function getUserList() {
    return new Promise(async resolve => {
        try {
            const result = await axios.get(`https://brics.wpdataforum.ru/api/admin/attendees?sort=${getParams.sort}&order=${getParams.order}&search=${getParams.search}&types=[${JSON.stringify(getParams.types)}]`, getAuthorizeSettings())
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
                <div class="checkbox"></div>
            </div>
            <div class="table__item --3 --type">
                <div class="type__container">
                    <span>${convertType(user.type)}</span>
                    ${['smi', 'speacker'].includes(user.type)? `<div class="accr --${user.type}">${user.accreditation ? 'Аккредитован': 'Не аккредитован'}</div>` : ''}
                </div>
                ${user.created ? '<div title="Эта запись добавлена организатором" class="created"></div>' : ''}
                
            </div>
            <div class="table__item --5">${user.surname} ${user.name} ${user.lastname??''}</div>
            <div class="table__item --5">${user.grade ?? ''}</div>
            <div class="table__item --4">${user.organization ?? ''}</div>
            <div class="table__item --2">
                <div class="action">
                    <div class="action__ico"></div>
                    <div class="action__body">
                        <div class="action__item --edit-u">Редактировать</div>
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
}

function convertType(type) {
    return typeList[type]
}