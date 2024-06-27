import { updateParams } from "./partnerScreen.js"
import { TimeOut } from "./timeOut.js"


export function searchInputInit() {
    const timeout = new TimeOut(serchFunction, 500)
    $('.search__inp').on('input', timeout.bind())
    $('.search__clear').click(()=>{
        $('.search__inp').val('')
        $('.search__clear').addClass('--none')
        updateParams('search', '')
    })
}

function serchFunction({target}){
    const value = $(target).val()
    updateParams('search', value)
    
    if (value.length) $('.search__clear').removeClass('--none')
        else $('.search__clear').addClass('--none')
}
