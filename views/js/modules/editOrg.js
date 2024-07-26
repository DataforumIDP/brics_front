import { getAuthorizeSettings } from "./authorizeSetting.js";
import { awaiting } from "./awaiting.js";
import { different } from "./editPartner.js";
import { CustomForm } from "./formController.js";
import { closeModal, openModal } from "./modal.js";
import { getUser } from "./orgScreen.js";
import { getAndFillUsers } from "./orgScreen.js";
import { convertType, CustomList } from "./typeList.js";
import { isEmptyObject } from "./utils/isEmptyObject.js";



let editedUser = {}
let editForm = new CustomForm('.edit-modal', saveEdit)

export async function orgModalInit() {

    new CustomList('.edit-type-list', (type) => {
        editForm.setValue('type', type)
    })

    $('.accreditation__btn').click((e) => {
        console.log(1234);
        e.stopPropagation();
        editForm.setValue('accreditation', true)
        $('.accreditation').addClass('--true')
        $('.accreditation__holder').text('Аккредитован')
        $('.accreditation__btn').addClass('--none')
    })
    
    $('.accreditation__holder').click(e => {
        e.stopPropagation();
        $('.accreditation__btn').removeClass('--none')
    })
}

export async function openEditUser(id) {
    editedUser = getUser(id)
    clearEditModal()

    editForm.clear().fill(
        { 
            ...editedUser, 
            fio: `${editedUser.surname} ${editedUser.name} ${editedUser.lastname ?? ''}`,
            type: convertType(editedUser.type) 
        }
    ).setValue('type', editedUser.type)
    
    settingUpUserData(editedUser)
    openModal('.edit-modal')
}

export function clearEditModal() {
    $('.edit-input').removeClass('--readonly').removeClass('--none')
    $('.edit-input__inp').val('')
    $('.accreditation').removeClass('--true').find('.accreditation__holder').text('Не аккредитован').addClass('--none')
}

function settingUpUserData(user) {

    if (user.partner_id) {
        $('.--e-mail').attr('readonly', true).parent().addClass('--none')
        $('.--e-phone').attr('readonly', true).parent().addClass('--none')
        $('.--e-city').attr('readonly', true).parent().addClass('--none')
        $('.--e-country').attr('readonly', true).parent().addClass('--none')
        $('.--e-organization').attr('readonly', true).parent().addClass('--readonly')
        $('.--e-type').val('Партнер').parent().addClass('--readonly')
    } else if (!user.created) {
        $('.--e-type').attr('readonly', true).parent().addClass('--readonly')
        $('.--e-passport').attr('readonly', true).parent().addClass('--none')
    }

    const timestamp = user.timestamp ?? new Date().getTime()

    const date = new Date(parseInt(timestamp))

    $('.--id span').text(user.id)
    $('.--date span').text(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)

    if (['smi', 'speacker'].includes(user.type)) {
        $('.accreditation__holder').removeClass('--none')
        if (user.accreditation) {
            $('.accreditation__holder').text('Аккредитован').parent().addClass('--true')
        }
    }
}


async function saveEdit(data) {

    data.name = data.fio.trim().split(' ')[1] ?? null
    data.surname = data.fio.trim().split(' ')[0] ?? null
    data.lastname = data.fio.trim().split(' ')[2] ?? null

    const processedData = different({...data, fio: undefined}, editedUser)

    if (isEmptyObject(processedData)) return closeModal('.edit-modal')
        
    const [res, err] = await sendUpdate(editedUser.id, processedData)

    // Сделать обработку ошибок
    // if (err !== null) return false

    closeModal('.edit-modal')
    getAndFillUsers()
}

async function sendUpdate(id, data) {
    try {

        const result = await axios.patch(`https://brics.wpdataforum.ru/api/admin/attendees/${id}`, data, getAuthorizeSettings())
        return [result.data, null]

    } catch (e) {
        console.log(e);
        return [null, response]
    }
}