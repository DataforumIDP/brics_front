


export function openPartnerScreen() {
    $('.--users').removeClass('--none')
    $('.--profile').addClass('--none')
    $('.--profile').css({height: $('.--users')})
}

export function closePartnerScreen() {
    $('.--users').addClass('--none')
    $('.--profile').removeClass('--none')
}