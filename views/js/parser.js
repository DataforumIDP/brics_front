import { saveValue, sendDataAndPastePosts } from "./modules/sendData.js"


$('.groupe').on('input', saveValue('link'))
$('.count').on('change', saveValue('limit'))



$('.btn').click(sendDataAndPastePosts)



