import { openEditUser } from "./editPartner.js"
import { deleteUser, getAndFillUsers } from "./partnerScreen.js"


export function actionInit () {
    $(document).on('click', '.action:not(.--active)', openAction)
    $(window).click(()=>{
        $('.action.--active').removeClass('--active')
    })
    $(document).on('click', '.action__body', function(e){
        e.stopImmediatePropagation()
    })
    $(document).on('click', '.--delete-u', deleteInAction)
    $(document).on('click', '.--edit-u', editInAction)
}


function openAction(e) {
    e.stopImmediatePropagation()
    $('.action.--active').removeClass('--active')
    $(this).addClass('--active')
}

async function deleteInAction () {
    const userId = $(this).parent().parent().parent().parent().attr('d-id')
    $('.action.--active').removeClass('--active')
    await deleteUser(userId)
    getAndFillUsers()
}

function editInAction () {
    const userId = $(this).parent().parent().parent().parent().attr('d-id')
    $('.action.--active').removeClass('--active')
    openEditUser(userId)
}