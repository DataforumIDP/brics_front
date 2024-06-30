import { actionInit } from "./modules/actionMenu.js";
import { checkboxControl } from "./modules/checkbox.js";
import { filtrationInit } from "./modules/filtration.js";
import { modal } from "./modules/modal.js";
import { accreditationInAction, deleteInAction, editInAction, orgscreenInit, toggleSelect, toggleType, updateParams } from "./modules/orgScreen.js";
import { searchInputInit, serchFunctionForOrg } from "./modules/searchInput.js";

filtrationInit()
checkboxControl('.type-check', toggleType, false)
searchInputInit(serchFunctionForOrg, ()=>{updateParams('search', '')})
orgscreenInit()
actionInit({
    del: deleteInAction,
    edit: editInAction,
    accr: accreditationInAction
})


$('.table__body').overlayScrollbars({ className: "os-theme-dark" });

modal('.modal')

checkboxControl('.--user-check', function(){
    const userId = $(this).parent().parent().attr('d-id')
    toggleSelect(userId)
})