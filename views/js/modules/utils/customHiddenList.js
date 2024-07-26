


export class CustomHiddenList {
    sel = ''
    constructor(sel, callback = () => { }) {
        this.sel = sel
        this.callback = callback

        $(document).click(() => {
            this.close()
        })

        $(sel).click((e) => {
            e.stopImmediatePropagation()
            $(sel).addClass('--open')
        })

        $(sel).find('.custom-select__item').click(function(){
            callback.bind()($(this))
        })
    }

    close() {
        $(this.sel).removeClass('--open')
    }

}