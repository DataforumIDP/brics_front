import { checkboxControl } from "./modules/checkbox.js";
import { filtrationInit } from "./modules/filtration.js";
import { modal } from "./modules/modal.js";
import { orgscreenInit } from "./modules/orgScreen.js";
import { searchInputInit, serchFunctionForOrg } from "./modules/searchInput.js";

filtrationInit()
checkboxControl('.type-check', ()=>{}, false)
searchInputInit(serchFunctionForOrg)
orgscreenInit()


$('.table__body').overlayScrollbars({ className: "os-theme-dark" });

modal('.modal')
