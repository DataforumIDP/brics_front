

export function noEmpty(obj) {
    let etalon = {}
    Object.keys(obj).forEach(item => {
        if (obj[item] !== '') {
            etalon[item] = obj[item]
        } else {
            etalon[item] = 'Незаполнено'
        }
    })
    return etalon
}