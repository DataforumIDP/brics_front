


export function checkboxControl(sel, callback = ()=>{}, isUpdate = true) {
    if (isUpdate) {
        $(document).on('click', sel, function(e){
            e.stopImmediatePropagation()
            const value = $(this).attr('val') == 'true' ? 'false' : 'true'
            $(this).attr('val', value)
            
            if (callback) callback.bind(this)()
        })
    } else {
        $(sel).on('click', function(e){
            e.stopImmediatePropagation()
            const value = $(this).attr('val') == 'true' ? 'false' : 'true'
            $(this).attr('val', value)
            
            if (callback) callback.bind(this)()
        })
    }
}