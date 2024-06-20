
const md = window.markdownit('commonmark', {
    breaks: true,
    linkify: true,
    html: true
});

export async function addNewPosts(posts, title) {
    
    posts.forEach(post => {
        $('.posts__conteiner').append(`
            <div class="posts__post post --media" id="${post.id}">
                <div class="post__title">${title}</div>
                <div class="post__media media">
                    ${generateMedia(post.id, post.media)}
                </div>
                <div class="posts__text">${ md.render(post.text)}</div>
            </div>
        `)
    })
}

let mediaStatic = {}

function generateMedia(id, media) {

    mediaStatic[id] = media

    if (media.length == 1) {
        return `<div class="media__item --load --one" d-val="0"></div>`
    } else if (media.length == 2) {
        return `
            <div class="media__item --load --two" d-val="0"></div>
            <div class="media__item --load --two" d-val="1"></div>
        `
    } else if (media.length == 3) {
        return `
            <div class="media__item --load --first" d-val="0" ></div>
            <div class="media__item --load --two" d-val="1" ></div>
            <div class="media__item --load --two" d-val="2" ></div>
        `
    } else if (media.length == 4) {
        return `
            <div class="media__item --load --first" d-val="0"></div>
            <div class="media__item --load --three" d-val="1"></div>
            <div class="media__item --load --three" d-val="2"></div>
            <div class="media__item --load --three" d-val="3"></div>
        `
    } else if (media.length == 5) {
        return `
            <div d-val="0" class="media__item --load --first"></div>
            <div d-val="1" class="media__item --load --two"></div>
            <div d-val="2" class="media__item --load --two"></div>
            <div d-val="3" class="media__item --load --two"></div>
            <div d-val="4" class="media__item --load --two"></div>
        `
    } else if (media.length == 6) {
        return `
            <div d-val="0" class="media__item --load --first"></div>
            <div d-val="1" class="media__item --load --two"></div>
            <div d-val="2" class="media__item --load --two"></div>
            <div d-val="3" class="media__item --load --three"></div>
            <div d-val="4" class="media__item --load --three"></div>
            <div d-val="5" class="media__item --load --three"></div>
        `
    } else if (media.length == 7) {
        return `
            <div d-val="0" class="media__item --load --first"></div>
            <div d-val="1" class="media__item --load --two"></div>
            <div d-val="2" class="media__item --load --two"></div>
            <div d-val="3" class="media__item --load --one"></div>
            <div d-val="4" class="media__item --load --three"></div>
            <div d-val="5" class="media__item --load --three"></div>
            <div d-val="6" class="media__item --load --three"></div>
        `
    } else if (media.length == 8) {
        return `
            <div d-val="0" class="media__item --load --first"></div>
            <div d-val="1" class="media__item --load --two"></div>
            <div d-val="2" class="media__item --load --two"></div>
            <div d-val="3" class="media__item --load --one"></div>
            <div d-val="4" class="media__item --load --three"></div>
            <div d-val="5" class="media__item --load --three"></div>
            <div d-val="6" class="media__item --load --three"></div>
            <div d-val="7" class="media__item --load --first"></div>
        `
    } else if (media.length == 9) {
        return `
            <div d-val="0" class="media__item --load --three"></div>
            <div d-val="1" class="media__item --load --three"></div>
            <div d-val="2" class="media__item --load --three"></div>
            <div d-val="3" class="media__item --load --three"></div>
            <div d-val="4" class="media__item --load --three"></div>
            <div d-val="5" class="media__item --load --three"></div>
            <div d-val="6" class="media__item --load --three"></div>
            <div d-val="7" class="media__item --load --three"></div>
            <div d-val="8" class="media__item --load --three"></div>
        `
    } else if (media.length == 10) {
        return `
            <div d-val="0" class="media__item --load --first"></div>
            <div d-val="1" class="media__item --load --three"></div>
            <div d-val="2" class="media__item --load --three"></div>
            <div d-val="3" class="media__item --load --three"></div>
            <div d-val="4" class="media__item --load --three"></div>
            <div d-val="5" class="media__item --load --three"></div>
            <div d-val="6" class="media__item --load --three"></div>
            <div d-val="7" class="media__item --load --three"></div>
            <div d-val="8" class="media__item --load --three"></div>
            <div d-val="9" class="media__item --load --three"></div>
        `
    }
}

export function getMedia(id) {
    return mediaStatic[id]??mediaStatic
}