

export class TimeOut {
    func = null
    time = 0
    timeOut = ''
    constructor(func, time) {
        this.func = func
        this.time = time
    }

    bind() {
        return async (e)=> {
            clearTimeout(this.timeOut)
            this.timeOut = setTimeout(() => {
                this.func(e)
            }, this.time);
        }
    }
}

