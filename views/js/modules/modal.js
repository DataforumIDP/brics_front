import { awaiting } from "./awaiting.js"


export function modal(sel) {
    $(sel).find('.modal__back, .modal__btn, .cancel-btn').click(() => closeModal(sel))
    closeModal(sel)
}

export async function openModal(sel) {
    $('body').css({ overflow: 'hidden', posotion: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw' })
    await applyStyles(sel);
    $(sel).css({
        zIndex: 22,
        opacity: 1
    })
}

export async function closeModal(sel) {
    $(sel).css({ opacity: 0 })
    $('body').css({ overflow: 'auto', posotion: 'relative', height: 'initial', width: 'initial' })
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