

export function typeListInit() {
    $(type).on('focus', (e)=>{
        if ($(type).parent().hasClass('--readonly')) return false
        e.preventDefault()
        $('.type-list').removeClass('--none')
    })
    
    $(type).on('click', function(e){
        e.stopPropagation();    
    })
    
    $(window).click(function(event) {
        if (!$(event.target).closest('.type-list, .list__item').length) {
            $('.type-list').addClass('--none')
        }
        $('.accreditation__btn').addClass('--none')
    });


    $(document).on('click', '.accreditation:not(.--true), .accreditation__btn', (e)=>{
        e.stopPropagation();  
        $('.accreditation__btn').removeClass('--none')
    })
}