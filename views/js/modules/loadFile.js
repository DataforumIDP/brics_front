import { getLang } from "./langModel.js"


export function loadFile(url){


    return async function(){
        
        $('.filename').text(this.files[0].name)
        $('.errors').removeClass('--open')
        $('.x').addClass('--none')
        const [response, err] = await sendFile(url, this.files[0])
    
        $('.loader').addClass('--none')
        $('.label__text').removeClass('--load').text(getLang()=='ru' ? 'Успешно' : 'Success')
        
        if (!response?.table || err) {
            $('.x').removeClass('--none')
            $('.label__text').addClass('--err').text(getLang()=='ru' ? 'Ошибка' : 'Error')
            $('.error').remove()
            console.log(err);
            Object.values(err.responseJSON.errors).forEach(item => {
                $('.errors').append(`<div class="error">${getLang()=='ru' ? 'Ошибка:' : 'Error:'} ${item[getLang()]}`)
            })
            $('.errors').addClass('--open')
            return
        }
    
        $('.arrow').removeClass('--none')
    }
}


async function sendFile(resourse, file) {
    let formData = new FormData();
    formData.append('file', file);

    const res = await new Promise((resolve) => {
        $.ajax({
            url: resourse,
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: data => {
                resolve([data, null]);
            },
            error: err => {
                resolve([null, err]);
            },
            xhr: function() {
                var xhr = new XMLHttpRequest();
                xhr.upload.addEventListener('progress', function(e) {
                    if (e.lengthComputable) {
                        var percentComplete = Math.round((e.loaded / e.total) * 100);
                        $('.label__text').text(`${getLang() == 'ru' ? 'Загрузка' : 'Loading'} ${percentComplete}%`).addClass('--load')
                        $('.loader').removeClass('--none')
                    }
                }, false);
                return xhr;
            }
        });
    });
    return res;
}
