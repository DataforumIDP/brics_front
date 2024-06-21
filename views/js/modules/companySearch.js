import { setData } from "./regData.js";

export async function inputLogic() {
    let val = $(this).val()
    const result = (await axios(`https://inn.wpdataforum.ru/?q=${val}`)).data.suggestions

    $('.org-list  .list__item').remove()
    if (result.length) {
        result.forEach(element => {
            $('.org-list .os-content').append(` <div class="list__item" d-val='${element.value}' d-inn="${element.data.inn}" >${element.value}</div> `)
        });
        $('.org-list').removeClass('--none')
    } else {

        $('.org-list').addClass('--none')
    }
}

$(document).on('click', '.org-list .list__item', function () {
    $(organization).val($(this).attr('d-val'))
    $('.org-list .list__item').remove()
    $('.org-list').addClass('--none')
    setData('organization', $(this).attr('d-inn'))
})