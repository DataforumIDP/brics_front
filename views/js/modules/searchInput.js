
import {updateParams as updOrg} from "./orgScreen.js"
import { updateParams as updPartner } from "./partnerScreen.js"
import { TimeOut } from "./timeOut.js"


export function searchInputInit(searchFunction, clearFunction) {
    const timeout = new TimeOut(searchFunction, 500)
    $('.search__inp').on('input', timeout.bind())
    $('.search__clear').click(()=>{
        $('.search__inp').val('')
        $('.search__clear').addClass('--none')
        clearFunction()
    })
}

export function serchFunctionForPartner({target}){
    const value = $(target).val()
    updPartner('search', value)
    
    if (value.length) $('.search__clear').removeClass('--none')
        else $('.search__clear').addClass('--none')
}

export function serchFunctionForOrg({target}){
    const value = $(target).val()
    updOrg('search', value)
    
    if (value.length) $('.search__clear').removeClass('--none')
        else $('.search__clear').addClass('--none')
}
