

export function exit () {
    document.cookie = 'token=0;'
    localStorage.setItem('token', null)
    location.reload()
}