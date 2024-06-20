import { getMedia } from "./addNewPosts.js"


export async function loadMedia() {
    const posts = $('.post')

    posts.each(loadPostMedia)
} 

async function loadPostMedia() {
    const id = $(this).attr('id')
    const postMedias = getMedia(id)

    const postMediasPromises = postMedias.map(async (item, ind)=> {
        const [buffer, err] = await getMediaData(item)
        
        $(this).find(`.media__item[d-val="${ind}"]`).removeClass('--load').css({backgroundImage: `url(${URL.createObjectURL(buffer)})`})
        console.log(URL.createObjectURL(buffer));
        // console.log($(this).find(`.media__item[d-val="${ind}"]`));
    })

    const postMediasResult = await Promise.all(postMediasPromises)

}

async function getMediaData(data) {
    return await new Promise(async resolve => {
        try {
            const result = await axios.post(`https://parser.wpdataforum.ru/getMedia`, {media: data}, {
                responseType: 'blob' // Устанавливаем тип ответа как blob
            })
            resolve([result.data, null])
        } catch (err) {
            resolve([null, err.response])
        }
    })
}

function getImageFromString(string) {
    const base64 = arrayBufferToBase64(string)
    console.log('Base64:', base64); // Отладочная информация
    return `data:image/jpeg;base64,${base64}`;
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}