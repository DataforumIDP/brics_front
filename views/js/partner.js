import { actionInit } from "./modules/actionMenu.js";
import { getAuthorizeSettings } from "./modules/authorizeSetting.js";
import { checkboxControl } from "./modules/checkbox.js";
import { toggleEditMode } from "./modules/editPartner.js";
import { exit } from "./modules/exit.js";
import { fillPartnerData, getPartnerData } from "./modules/getPartnersData.js";
import { modal, openModal } from "./modules/modal.js";
import { closePartnerScreen, deleteInAction, downloadList, editInAction, openPartnerScreen, partnerScreenInit, toggleAll, toggleSelect, updateParams } from "./modules/partnerScreen.js";
import { scrollbarInit } from "./modules/scrollBarInit.js";
import { searchInputInit, serchFunctionForPartner } from "./modules/searchInput.js";

searchInputInit(serchFunctionForPartner, () => { updateParams('search', '') })
actionInit({
    del: deleteInAction,
    edit: editInAction
})

scrollbarInit()
partnerScreenInit()
modal('.edit-modal')
modal('.error-modal')


$('.exit__content').click(exit)

start()

async function start() {
    const [{ partner }] = await getPartnerData()
    fillPartnerData(partner)
}

$('.edit__btn').click(toggleEditMode)

$(document).on('click', '.list__btn:not(.--grey)', openPartnerScreen)
$('.back-to-profile').click(closePartnerScreen)


checkboxControl('.--user-check', function () {
    const userId = $(this).parent().parent().attr('d-id')
    toggleSelect(userId)
})

checkboxControl('.--check-all', toggleAll, false)

$('.download-list-btn').click(downloadList)

