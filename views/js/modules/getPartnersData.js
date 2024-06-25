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

let partnerData = {}

export function fillPartnerData(struct) {
    partnerData = struct
    $('.--organization').html(struct.organization??'<span class="empty"></span>')
    $('.--site').html(struct.site??'<span class="empty"></span>')
    $('.--description').html(struct.description??'<span class="empty"></span>')
    $('.--contact').remove()
    struct.contacts.forEach(item=> $('.--contacts').append(`<p class="input__value --contact">${item}</p>`))
    
    $('.--e-organization').val(struct.organization)
    $('.--e-site').val(struct.site)
    $('.--e-description').val(struct.description)
    $('.--e-contacts').val(struct.contacts.join('\n'))
}

export function getP_Data() {
    return partnerData
}

export function setP_Data(newData) {
    partnerData=newData
}