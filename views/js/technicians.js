import { checkboxControl } from "./modules/checkbox.js";
import { loadLangStruct, toggleLang } from "./modules/langModel.js"
import { inputLogic } from "./modules/companySearch.js"
import { callBackTimeout } from "./modules/callbackTimeout.js";
import { getData, saveFio, setData } from "./modules/regData.js";
import { modal } from "./modules/modal.js";
import { userReg } from "./modules/attendeesReg.js";
import { loadFile } from "./modules/loadFile.js";
import { awaiting } from "./modules/awaiting.js";

const userLang = navigator.language || navigator.userLanguage;
const lang = userLang.startsWith('ru') ? 'ru' : 'en'

loadLangStruct(lang)
modal('.modal')

$(document).on('click', '.lang__item.--active', () => { $('.lang').toggleClass('--open') })
$(document).on('click', '.lang__item:not(.--active)', toggleLang)

checkboxControl('.checkbox', function () {
    setData('check', $(this).attr('val')==='true')
    console.log(getData('check'));
})

// $(file).change(loadFile('http://brics.wpdataforum.ru/api/reg/from-exel'))



$(organization).on('input', callBackTimeout(inputLogic, 1000))
// $(fio).on('input', saveFio)
// $(grade).on('input', function () { setData('grade', $(this).val()) })
// $(country).on('input', function () { setData('country', $(this).val()) })
// $(city).on('input', function () { setData('city', $(this).val()) })
// $(email).on('input', function () { setData('mail', $(this).val()) })
// $(phone).on('input', function () { setData('phone', $(this).val()) })
// $(passport).on('input', function () { setData('passport', $(this).val()) })

$(".org-list").overlayScrollbars({
    className: "os-theme-dark",
});

$('.form__btn').click(async function () {
    $(this).addClass('--sending')
    await userReg('technicians')
    $(this).removeClass('--sending')
})


