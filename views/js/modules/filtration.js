

export function filtrationInit () {
    $(document).click(()=>{
        $('.custom-select').removeClass('--open')
    })

    $('.custom-select').click((e)=>{
        e.stopImmediatePropagation()
        $('.custom-select').addClass('--open')
    })
}