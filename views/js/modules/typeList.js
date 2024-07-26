import { TwoWayDictionary } from "./twoWayDict.js"


export function typeListInit() {
    // $(type).on('focus', (e)=>{
    //     if ($(type).parent().hasClass('--readonly')) return false
    //     e.preventDefault()
    //     $('.type-list').removeClass('--none')
    // })

    // $(type).on('click', function(e){
    //     e.stopPropagation();    
    // })

    // $(window).click(function(event) {
    //     if (!$(event.target).closest('.type-list, .list__item').length) {
    //         $('.type-list').addClass('--none')
    //     }
    //     $('.accreditation__btn').addClass('--none')
    // });


    // $(document).on('click', '.accreditation:not(.--true), .accreditation__btn', (e)=>{
    //     e.stopPropagation();  
    //     $('.accreditation__btn').removeClass('--none')
    // })
}

const typeDict = new TwoWayDictionary({
    attendees: 'Участник',
    partner: 'Партнер',
    smi: 'СМИ',
    speacker: 'Спикер',
    org: 'Организатор',
    vip: 'VIP',
    stuff: 'Тех. персонал',
    green: 'Зеленый БРИКС',
})

export function convertType(type) {
    return typeDict.getItem(type)
}

export class CustomList {
    sel = ''
    callback = () => { }

    constructor(sel, callback) {
        this.sel = sel
        this.callback = callback
        this.input = $(sel).find('.list-input')
        this.list = $(sel).find('.list')
        $(sel).click((e) => e.stopPropagation())

        $(this.input).on('focus', (e) => {
            if ($(sel).hasClass('--readonly')) return false
            e.preventDefault()
            $(sel).find('.list').removeClass('--none')
        })

        $(this.input).on('click', function (e) {
            e.stopPropagation();
        })

        $(window).click((event)=> {
            if (!$(event.target).closest('.type-list, .list__item').length) {
                $(this.list).addClass('--none')
            }
        });

        $(sel).find('.list-item').click((e) => {
            e.stopPropagation()
            const type = $(e.target).attr('d-type')
            $(this.input).val(convertType(type))
            $(this.list).addClass('--none')
            if (['smi', 'speacker'].includes(type)) {
                $(sel).find('.accreditation__holder').removeClass('--none')
            } else {
                $(sel).find('.accreditation__holder').addClass('--none')
            }
            callback.bind(e.target)(type)
        })
    }
}