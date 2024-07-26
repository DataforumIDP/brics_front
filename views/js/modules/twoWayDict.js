
export class TwoWayDictionary {
    forwardDict = {};
    reverseDict = {};

    constructor (initialDict) {
        this.forwardDict = { ...initialDict }

        Object.entries(initialDict).forEach(([key, val])=> {
            this.reverseDict[val] = key
        })
    }

    getItem(key) {
        if (this.forwardDict.hasOwnProperty(key)) {
            return this.forwardDict[key];
        } else if (this.reverseDict.hasOwnProperty(key)) {
            return this.reverseDict[key];
        } else {
            return null;
        }
    }
}