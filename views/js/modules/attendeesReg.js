
import { getLang } from "./langModel.js"
import { openModal } from "./modal.js"
import { getData } from "./regData.js"

const titles = {
    success_a: {
        ru: 'Успешная регистрация',
        en: 'Successful registration'
    },
    success_t: {
        ru: 'Ваша заявка принята. Ожидайте, пожалуйста, мы с вами свяжемся',
        en: 'Your application has been accepted. Please wait, we will contact you'
    },
    error: {
        ru: 'Ошибка регистрации',
        en: 'Registration error'
    }
}

export async function userReg() {
    const data = getData()
    console.log(data);

    if (!data.check) {
        console.log('no check');
        $('.modal__error').remove()
        $('.modal__title').text(titles.error[getLang()])
        $('.modal__btn').before(`<h3 class="modal__error">${getLang() == 'ru' ? 'Согласие на обработку данных является обязательным!' : 'Consent to the processing of personal data is mandatory!'}</h3>`)
        openModal('.modal')
        return
    }

    const [res, err] = await sendRegData(data)

    if (err) {
        $('.modal__error').remove()
        $('.modal__title').text(titles.error[getLang()])

        Object.values(err.data.errors).map(item => { $('.modal__btn').before(`<h3 class="modal__error">${item[getLang()]}</h3>`) })

        openModal('.modal')
        return
    }


    $('.modal__error').remove()
    $('.modal__title').text(getData('type') == 'attendees' ? titles.success_a[getLang()] : titles.success_t[getLang()])
    openModal('.modal')

}


async function sendRegData(data) {
    const result = await new Promise(async (resolve) => {
        try {
            const result = await axios.post(`https://brics.wpdataforum.ru/api/attendees`, data)
            resolve([result.data, null])
        } catch (err) {
            resolve([null, err.response])
        }
    })

    return result
}