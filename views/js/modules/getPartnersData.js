import { getAuthorizeSettings } from "./authorizeSetting.js";
import { getToken } from "./token.js"


export async function getPartnerData () {
    return new Promise (async resolve => {
        try {
            const result = await axios.get('https://brics.wpdataforum.ru/api/partner', getAuthorizeSettings())

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
    $('.--description').html(struct.description?.trim().replace(/\n/g, '<br>')??'<span class="empty"></span>')
    $('.--contacts').html(struct.contacts?.trim().replace(/\n/g, '<br>')??'<span class="empty"></span>')
    
    $('.--e-organization').val(struct.organization)
    $('.--e-site').val(struct.site)
    $('.--e-description').val(struct.description?.trim())
    $('.--e-contacts').val(struct.contacts?.trim())
}

export function getP_Data() {
    return partnerData
}

export function setP_Data(newData) {
    partnerData=newData
}
