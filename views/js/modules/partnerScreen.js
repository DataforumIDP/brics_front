


export function openPartnerScreen() {
    $('.--users').removeClass('--none')
    $('.--profile').addClass('--none')
}

export function closePartnerScreen() {
    $('.--users').addClass('--none')
    $('.--profile').removeClass('--none')
}