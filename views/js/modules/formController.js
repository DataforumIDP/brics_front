
export class CustomForm {

    form = ''
    data = {}
    callback = ()=>{}

    constructor (sel, callback, submit = '.form-submit-btn') {

        this.form = $(sel)
        this.callback = callback
        this.sel = sel

        this.#everyInp((item)=>{
            $(item).on('change', (e)=> {
                this.valueListener(e.target)
            })
        })

        this.update()

        $(this.sel).find(submit).click(this.submit.bind(this))
    }

    #everyInp(func) {
        $(this.sel).find('.form-input').each((ind, item) => { func.bind(this)(item) })
    }

    update(){
        this.#everyInp(this.valueListener)
    }

    valueListener(item) {
        const key = $(item).attr('d-key')
        const value = $(item).val()
        this.setValue(key, (value.length)? value : null)
    }

    setValue(key, val) {
        this.data[key] = val
    }

    submit(){
        this.callback(this.data)
    }

    clear() {
        $(this.sel).find('.form-input').each((ind, item) => {
            $(item).val($(item).attr('d-initial')??'')
        })
        this.update()
        return this
    }

    fill(obj){
        Object.entries(obj).forEach(([key, value])=> {
            $(this.sel).find(`[d-key="${key}"]`).val(value)
        })
        this.update()
        return this
    }

}
