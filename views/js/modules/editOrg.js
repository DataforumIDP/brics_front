import { awaiting } from "./awaiting.js";
import { openModal } from "./modal.js";
import { convertType, getUser } from "./orgScreen.js";



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
}

export async function openEditUser(id) {

    [editedUser, editedUserProccesed] = [getUser(id), getUser(id)]
    console.log(editedUser);
    clearEditModal()
    openModal('.edit-modal')
    fillUserData(editedUserProccesed)
}

export function clearEditModal() {
    $('.edit-input').removeClass('--readonly')
    $('.edit-input__inp').val('').removeAttr('readonly')
    $('.accreditation').removeClass('--true').find('.accreditation__holder').text('Не аккредитован').addClass('--none')
}

function fillUserData(user) {

    if (user.partner_id) {
        $('.--e-mail').attr('readonly', true).parent().addClass('--readonly')
        $('.--e-phone').attr('readonly', true).parent().addClass('--readonly')
        $('.--e-city').attr('readonly', true).parent().addClass('--readonly')
        $('.--e-country').attr('readonly', true).parent().addClass('--readonly')
        $('.--e-organization').attr('readonly', true).parent().addClass('--readonly')
        $('.--e-type').val('Партнер').parent().addClass('--readonly')
    } else if (!user.created) {
        $('.--e-type').attr('readonly', true).parent().addClass('--readonly')
        $('.--e-passport').attr('readonly', true).parent().addClass('--readonly')
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