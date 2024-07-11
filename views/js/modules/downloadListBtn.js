


export function downloadListBtnText(list) {
    $('.download-list-btn:not(.download-mob-btn)').text(!list.length ? 'Скачать всё' : 'Скачать выделенное')
}