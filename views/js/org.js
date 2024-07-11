import { actionInit } from "./modules/actionMenu.js";
import { burgerMenuInit } from "./modules/burgerMenu.js";
import { checkboxControl } from "./modules/checkbox.js";
import { clearEditModal, orgModalInit } from "./modules/editOrg.js";
import { exit } from "./modules/exit.js";
import { filtrationInit } from "./modules/filtration.js";
import { toggleHiddenContent } from "./modules/hidenItem.js";
import { modal, openModal } from "./modules/modal.js";
import {
    accreditationInAction,
    deleteInAction,
    downloadAttendeesList,
    downloadPartnerList,
    editInAction,
    orgscreenInit,
    toggleAll,
    toggleSelect,
    toggleType,
    updateParams
} from "./modules/orgScreen.js";
import { searchInputInit, serchFunctionForOrg } from "./modules/searchInput.js";
import { typeListInit } from "./modules/typeList.js";

filtrationInit()
checkboxControl('.type-check', toggleType, false)
checkboxControl('.--check-all', toggleAll, false)
searchInputInit(serchFunctionForOrg, () => { updateParams('search', '') })
orgscreenInit()
actionInit({
    del: deleteInAction,
    edit: editInAction,
    accr: accreditationInAction
})
burgerMenuInit()
typeListInit()

orgModalInit()

$('.table__body').overlayScrollbars({ className: "os-theme-dark" });

modal('.modal')

$('.--partner-btn').click(downloadPartnerList)
$('.download-list-btn').click(downloadAttendeesList)
$('.exit__content, .--exit').click(exit)

checkboxControl('.--user-check', function (e) {
    const userId = $(this).parent().parent().attr('d-id')
    toggleSelect(userId)
})

$('.filtration__holder').click(toggleHiddenContent)

$(document).on('click', '.mt-item__holder', toggleHiddenContent)