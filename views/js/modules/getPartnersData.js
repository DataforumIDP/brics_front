import { getToken } from "./token.js"


export async function getPartnerData () {
    return new Promise (async resolve => {
        try {
            const result = await axios.get('https://brics.wpdataforum.ru/api/partner', {
                headers: { Authorization: `Bearer ${getToken()}` }
            })

            resolve([result.data, null])

        } catch ({response}) {
            console.log(response);
            resolve([null, response])
        }
    })
} 

export function fillPartnerData(struct) {
    console.log(struct);
    $('.--organization').html(struct.organization)
    $('.--site').html(struct.site??'<span class="empty"></span>')
    $('.--description').html(struct.description)
    $('.--contact').remove()
    struct.contacts.forEach(item=> $('.--contacts').append(`<p class="input__value --contact">${item}</p>`))
}