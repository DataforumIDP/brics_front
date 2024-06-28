import { awaiting } from "./awaiting.js"


export function modal(sel) {
    $(sel).find('.modal__back, .modal__btn, .cancel-btn').click(()=> closeModal(sel))
}

export function openModal(sel) {
    $(sel).css({
        zIndex: 22,
        opacity: 1
    })
}

export async function closeModal(sel) {
    $(sel).css({ opacity: 0 })
    await awaiting(0.5)
    $(sel).css({ zIndex: 0 })
}