import { getAuthorizeSettings } from "./authorizeSetting.js";
import { awaiting } from "./awaiting.js";
import { different } from "./editPartner.js";
import { closeModal, openModal } from "./modal.js";
import { convertType, getUser } from "./orgScreen.js";
import { getAndFillUsers } from "./orgScreen.js";



let editedUser = {}
let editedUserProccesed = {}

export async function orgModalInit() {

    $('.accreditation__btn').click((e) => {
        e.stopPropagation();
        editedUserProccesed.accreditation = true
        $('.accreditation').addClass('--true')
        $('.accreditation__holder').text('Аккредитован')
        $('.accreditation__btn').addClass('--none')
    })

    $('.list__item').click(updateType)

    $('.save-btn').click(saveEdit)
}

export async function openEditUser(id) {

    editedUser = getUser(id)
    editedUserProccesed = JSON.parse(JSON.stringify(getUser(id)))
    clearEditModal()
    openModal('.edit-modal')
    fillUserData(editedUserProccesed)
}

export function clearEditModal() {
    $('.edit-input').removeClass('--readonly').removeClass('--none')
    $('.edit-input__inp').val('').removeAttr('readonly')
    $('.accreditation').removeClass('--true').find('.accreditation__holder').text('Не аккредитован').addClass('--none')
}

function fillUserData(user) {

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
    $('.--e-fio').val(`${user.surname} ${user.name} ${user.lastname ?? ''}`)

    $('.--e-passport').val(user.passport)
    $('.--e-organization').val(user.organization)
    $('.--e-grade').val(user.grade)
    $('.--e-type').val(convertType(user.type))
    $('.--e-country').val(user.country)
    $('.--e-city').val(user.city)
    $('.--e-mail').val(user.mail)
    $('.--e-phone').val(user.phone)

    if (['smi', 'speacker'].includes(user.type)) {
        $('.accreditation__holder').removeClass('--none')
        if (user.accreditation) {
            $('.accreditation__holder').text('Аккредитован').parent().addClass('--true')
        }
    }
}

function updateType(e) {
    e.stopPropagation()
    const type = $(e.target).attr('d-type')
    editedUserProccesed.type = type
    if (['smi', 'speacker'].includes(type)) {
        $('.accreditation__holder').removeClass('--none')
    } else {
        $('.accreditation__holder').addClass('--none')
    }
    $('.--e-type').val(convertType(type))
    $('.type-list').addClass('--none')
}

async function saveEdit() {

    editedUserProccesed.name = ($('.--e-fio').val()).trim().split(' ')[1] ?? null
    editedUserProccesed.surname = ($('.--e-fio').val()).trim().split(' ')[0] ?? null
    editedUserProccesed.lastname = ($('.--e-fio').val()).trim().split(' ')[2] ?? null
    editedUserProccesed.passport = $('.--e-passport').val()
    editedUserProccesed.organization = $('.--e-organization').val()
    editedUserProccesed.grade = $('.--e-grade').val()
    editedUserProccesed.country = $('.--e-country').val()
    editedUserProccesed.city = $('.--e-city').val()
    editedUserProccesed.mail = $('.--e-mail').val()
    editedUserProccesed.phone = $('.--e-phone').val()

    const processedData = different(editedUserProccesed, editedUser)
    
    const [res, err] = await sendUpdate(editedUser.id, processedData)
    if (err !== null) return false
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