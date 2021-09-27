document.querySelector("#download-btn").addEventListener("click",async function(){
    let video = document.querySelector("#video-link").value

    if(video.length == 0){
        return
    }

    try{
        document.querySelector(".loader").classList.add("show")

        let res  = await fetch("/videoInfo?videoURL="+video)
        let data = await res.json()
        console.log(data)

        document.querySelector(".loader").classList.remove("show")

        let audios = data.formats.filter(function(obj){
            return obj.mimeType.includes("audio/webm")
        })

        let filename = data.videoDetails.title.replace(/\s{1,}/,"-")+".mp3"

        let itag = audios[0].itag

        notify(`"${filename}" sera baixado automaticamente.`)

        document.querySelector("#download-frame").src = `/download?videoURL=${video}&itag=${itag}&filename=${filename}`

    }catch(msg){
        document.querySelector(".loader").classList.remove("show")
        alert("Não foi possivel encontrar este video, por favor tente outro link")
    }
})


function notify(message){
    let notification = document.createElement("div")
    notification.classList.add("notification")
    notification.innerTex = message
    document.body.appendChild(notification)
    setTimeout(function(){
        notification.classList.add("show")
    },100)
    setTimeout(function(){
        notification.classList.remove("show")
        setTimeout(function(){
            document.body.removeChild(notification)
        },300)
    },4000)
}