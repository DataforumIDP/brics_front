import { actionInit } from "./modules/actionMenu.js";
import { checkboxControl } from "./modules/checkbox.js";
import { clearEditModal, orgModalInit } from "./modules/editOrg.js";
import { exit } from "./modules/exit.js";
import { filtrationInit } from "./modules/filtration.js";
import { modal, openModal } from "./modules/modal.js";
import {
    accreditationInAction,
    deleteInAction,
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
typeListInit()

orgModalInit()

$('.table__body').overlayScrollbars({ className: "os-theme-dark" });

modal('.modal')

$('.--partner-btn').click(downloadPartnerList)
$('.exit__content').click(exit)

checkboxControl('.--user-check', function () {
    const userId = $(this).parent().parent().attr('d-id')
    toggleSelect(userId)
})
