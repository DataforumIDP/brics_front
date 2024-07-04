


export function downloadListBtnText(list) {
    $('.download-list-btn').text(!list.length ? 'Скачать всё' : 'Скачать выделенное')
}