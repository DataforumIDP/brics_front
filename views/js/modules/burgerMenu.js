import { isEdit } from "./editPartner.js"






export function burgerMenuOpen() {
    if (isEdit()) return false
    $('.menu').css({ display: 'initial' })
    $('.menu__back').animate({ opacity: .35 }, 500)
    $('.menu__content').animate({ right: 0 }, 500)
}

export function burgerMenuClose() {
    $('.menu__back').animate({ opacity: 0 }, 500)
    $('.menu__content').animate({ right: '-100%' }, 500, () => { $('.menu').css({ display: 'none' }) })
}

export function burgerMenuInit() {
    $('.m-header__btn').click(burgerMenuOpen)
    $('.menu__back').click(burgerMenuClose)
    $('.menu__close').click(burgerMenuClose)

    $('.--to-profile').click(() => {
        if (!$('.--profile').hasClass('--none')) return false
        $('.--profile').removeClass('--none')
        $('.--user-list').addClass('--none')
        burgerMenuClose()
        $('.--mob-edit-btn').removeClass('--none')
        $('.--mob-add-btn').addClass('--none')
        })
        
        $('.--to-list').click(() => {
            if (!$('.--user-list').hasClass('--none')) return false
            $('.--user-list').removeClass('--none')
            $('.--profile').addClass('--none')
            burgerMenuClose()
            $('.--mob-add-btn').removeClass('--none')
            $('.--mob-edit-btn').addClass('--none')
    })
}