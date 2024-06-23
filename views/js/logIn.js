import { authorize } from "./modules/authorize.js";
import { loadLangStruct } from "./modules/langModel.js";
import { modal } from "./modules/modal.js";
import { setData } from "./modules/regData.js";


loadLangStruct('ru')
$('.form__btn span').text('Войти')
modal('.modal')


$(password).on('input', function () { setData('password', $(this).val()) })
$(login).on('input', function () { setData('login', $(this).val()) })

$('.form__btn').click(authorize)