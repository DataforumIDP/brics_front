


export function toggleHiddenContent() {
    const parent = $(this).parent().parent()
    parent.hasClass('--opened') ? parent.removeClass('--opened') : parent.addClass('--opened')
}