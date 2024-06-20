import { addNewPosts } from "./addNewPosts.js"
import { loadMedia } from "./loadMedia.js"

let data = {
    link: "t.me/birchpunkofficial",
    limit: "2"
}

export function saveValue(val) {
    return function () {
        data[val] = $(this).val()
    }
}

export async function sendDataAndPastePosts() {
    $('.btn').addClass('--sending')
    const [res, err] = await getChannelData(data)
    $('.btn').removeClass('--sending')
    $('.post').remove()
    await addNewPosts(res, data.link)
    await loadMedia()
}

async function getChannelData(data) {
    return await new Promise(async resolve => {
        try {
            const result = await axios.post(`https://parser.wpdataforum.ru/channel`, data)
            resolve([result.data, null])
        } catch (err) {
            resolve([null, err.response])
        }
    })
}

// module.exports = {saveValue, sendData}