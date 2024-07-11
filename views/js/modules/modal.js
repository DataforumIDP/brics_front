import { awaiting } from "./awaiting.js"


export function modal(sel) {
    $(sel).find('.modal__back, .modal__btn, .cancel-btn').click(() => closeModal(sel))
    closeModal(sel)
}

export async function openModal(sel) {
    await applyStyles(sel);
    $(sel).css({
        zIndex: 22,
        opacity: 1
    })
}

export async function closeModal(sel) {
    $(sel).css({ opacity: 0 })
    await awaiting(0.5)
    $(sel).css({ zIndex: 0 })
    $(sel).css({ display: 'none' })
}
function applyStyles(sel) {
    return new Promise((resolve) => {
        $(sel).css({ display: 'flex' });

        // Используем requestAnimationFrame для гарантии, что браузер закончит рендеринг изменения display
        requestAnimationFrame(() => {
            resolve();
        });
    });
}