import { getAuthorizeSettings } from "./authorizeSetting.js"
import { updateUserData } from "./editPartner.js"
import { openModal } from "./modal.js"
import { getToken } from "./token.js"
import { openEditUser } from "./editPartner.js"

export function partnerScreenInit() {
    $('.delete-btn').click(deleteList)
    $('#file').change(regNewUsers)
    $('.--name').click(changeOrder)
    getAndFillUsers()
    $('.save-btn').click(updateUserData)
}

export function openPartnerScreen() {
    $('.--users').css({ height: $('.--profile')[0].clientHeight, maxHeight: $('.--profile')[0].clientHeight })
    $('.--users').removeClass('--none')
    $('.--profile').addClass('--none')
}

export function closePartnerScreen() {
    $('.--users').addClass('--none')
    $('.--profile').removeClass('--none')
}

let getParams = {
    search: '',
    order: true,
    sort: 'surname'
}

export function updateParams(key, val) {
    getParams[key] = val
    getAndFillUsers()
}

function changeOrder() {
    getParams.order = !getParams.order
    $('.order').removeClass(getParams.order ? '--asc' : '--desc').addClass(!getParams.order ? '--asc' : '--desc') 
    getAndFillUsers()
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
            const result = await axios.get(`https://brics.wpdataforum.ru/api/partner/list?sort=${getParams.sort}&order=${getParams.order}&search=${getParams.search}`, getAuthorizeSettings())
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
            <div class="table__item --5">${user.surname} ${user.name} ${user.lastname ?? ''}</div>
            <div class="table__item --3">${user.passport ?? ''}</div>
            <div class="table__item --5">${user.grade ?? ''}</div>
            <div class="table__item --4 --none">${user.activity ?? ''}</div>
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

let selectedRows = []

export function toggleSelect(val) {
    if (selectedRows.includes(val)) selectedRows = selectedRows.filter(item => item != val)
    else selectedRows.push(val)
}

export async function deleteUser(id) {
    return new Promise(async resolve => {
        try {
            
            const result = await axios.delete(`https://brics.wpdataforum.ru/api/partner/${id}`, getAuthorizeSettings())
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
                url: 'https://brics.wpdataforum.ru/api/partner/mass',
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

export async function deleteInAction () {
    const userId = $(this).parent().parent().parent().parent().attr('d-id')
    $('.action.--active').removeClass('--active')
    await deleteUser(userId)
    getAndFillUsers()
}

export function editInAction () {
    const userId = $(this).parent().parent().parent().parent().attr('d-id')
    $('.action.--active').removeClass('--active')
    openEditUser(userId)
}