import { getAuthorizeSettings } from "./authorizeSetting.js";
import { closeModal } from "./modal.js";
import { getAndFillUsers } from "./orgScreen.js";
import { clearEmptyProp } from "./utils/clearEmptyProp.js";


export async function regOneUser(data) {
    data.name = data.fio.trim().split(' ')[1] ?? null
    data.surname = data.fio.trim().split(' ')[0] ?? null
    data.lastname = data.fio.trim().split(' ')[2] ?? null
    data.lastname = data.fio.trim().split(' ')[2] ?? null

    if (data.type == 'Участник') delete data.type

    data = clearEmptyProp(data)

    const [res, err] = await sendData(data)
    if (err) console.log(err);
    closeModal('.reg-modal')
    getAndFillUsers()
}


async function sendData(data) {
    try {
        const result = await axios.post(
            'https://brics.wpdataforum.ru/api/admin/attendees/',
            data,
            getAuthorizeSettings()
        )
        return [result.data, null]
    } catch ({response}) {
        return [null, response.data]
    }
}