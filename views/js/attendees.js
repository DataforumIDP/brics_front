import { checkboxControl } from "./modules/checkbox.js";
import { loadLangStruct, toggleLang } from "./modules/langModel.js"
import { inputLogic } from "./modules/companySearch.js"
import { callBackTimeout } from "./modules/callbackTimeout.js";
import { saveFio, setData } from "./modules/regData.js";
import { modal } from "./modules/modal.js";
import { userReg } from "./modules/attendeesReg.js";

const userLang = navigator.language || navigator.userLanguage;
const lang = userLang.startsWith('ru') ? 'ru' : 'en'

loadLangStruct(lang)
modal('.modal')

$(document).on('click', '.lang__item.--active', () => { $('.lang').toggleClass('--open') })
$(document).on('click', '.lang__item:not(.--active)', toggleLang)

checkboxControl('.checkbox', function () {
    setData('check', $(this).attr('val')==='true')
})

$(organization).on('input', callBackTimeout(inputLogic, 1000))
$(fio).on('input', saveFio)
$(grade).on('input', function () { setData('grade', $(this).val()) })
$(country).on('input', function () { setData('country', $(this).val()) })
$(city).on('input', function () { setData('city', $(this).val()) })
$(email).on('input', function () { setData('mail', $(this).val()) })
$(phone).on('input', function () { setData('phone', $(this).val()) })

$(type).on('focus', ()=>{$('.type-list').removeClass('--none')})
// $(type).on('blur', ()=>{$('.type-list').addClass('--none')})

$(".org-list, .type-list").overlayScrollbars({
    className: "os-theme-dark",
});

$(document).on('click', '.type-list .list__item', function(){
    const text = $(this).text()
    const val = $(this).attr('d-type')
    $(type).val(text)
    setData('type', val)
    $('.type-list').addClass('--none    ')
})

// $('.type-list .os-content').append(`cdkljl jvl kj`)

$('.form__btn').click(async function () {
    $(this).addClass('--sending')
    await userReg()
    $(this).removeClass('--sending')
})


