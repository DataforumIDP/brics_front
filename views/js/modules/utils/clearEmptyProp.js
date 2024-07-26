

export function clearEmptyProp(obj) {

    let result = {}
    Object.entries(obj).forEach(([key, val])=> {if (val !== null) result[key] = val})
    return result
}