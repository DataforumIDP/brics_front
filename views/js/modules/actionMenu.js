import { openEditUser } from "./editPartner.js"
import { deleteUser, getAndFillUsers } from "./partnerScreen.js"


export function actionInit ({del, edit, accr}) {
    $(document).on('click', '.action:not(.--active)', openAction)
    $(window).click(()=>{
        $('.action.--active').removeClass('--active')
    })
    $(document).on('click', '.action__body', function(e){
        e.stopImmediatePropagation()
    })
    $(document).on('click', '.--delete-u', del)
    $(document).on('click', '.--edit-u', edit)
    if (accr !== undefined) $(document).on('click', '.--accr-u', accr)
}


function openAction(e) {
    e.stopImmediatePropagation()
    $('.action.--active').removeClass('--active')
    $(this).addClass('--active')
}

