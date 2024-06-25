import { fillPartnerData, getP_Data, setP_Data } from "./getPartnersData.js"
import { noEmpty } from "./noEmpty.js"
import { getToken } from "./token.js"

let editMode = false

export function toggleEditMode() {
    editMode = !editMode
    editMode ? loadEditMode() : saveEdit()
}

function loadEditMode() {
    $('.edit__btn').addClass('--blue').find('span').text('Сохранить')
    $('.list__btn').addClass('--grey')
    $('.--views').addClass('--none')
    $('.--edit').removeClass('--none')
}

async function saveEdit() {
    let data = {}

    data.organization = $('.--e-organization').val()
    data.description = $('.--e-description').val()
    data.site = $('.--e-site').val()
    data.contacts = $('.--e-contacts').val()
    let processedData = different(data)
    
    processedData = noEmpty(processedData)
    const [result, err] = await updatePartnerData(processedData)
    
    if (err !== null) {
        console.log(err);
        return
    }

    fillPartnerData(result.partner)

    setP_Data(data)

    $('.edit__btn').removeClass('--blue').find('span').text('Редактровать профиль')
    $('.list__btn').removeClass('--grey')
    $('.--views').removeClass('--none')
    $('.--edit').addClass('--none')
}


async function updatePartnerData(data) {
    return new Promise(async resolve => {
        try {
            const result = await axios.patch('https://brics.wpdataforum.ru/api/partner', data, { headers: { Authorization: `Bearer ${getToken()}` } })
            resolve([result.data, null])
        } catch ({ response }) {
            resolve([null, response])
        }
    })
}
function different(obj) {
    const now = getP_Data()

    let etalon = {} 
    Object.keys(obj).forEach(item => {
        if (obj[item] != now[item]) etalon[item] = obj[item]
    })
    return etalon
}