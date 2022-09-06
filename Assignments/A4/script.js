//Tayla Orsmond u21467456
$(() => {
    const url = /((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?/g //regex for youtube url
    $(".submit").on("click", () => {
        let message = $("#message").val();
        const msg = $(`<div></div>`, {
            html: message,
            class: "col-4 offset-4 rounded mb-2"
        });
        if(message.match(url)){
            let videos = message.matchAll(url);
            for (const video of videos) {
                let videoId = video[5];
                let videoFrame = $(`<iframe></iframe>`, {
                    src: `https://www.youtube.com/embed/${videoId}`,
                    width: "100%",
                    height: 315,
                    frameborder: 0,
                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                    allowfullscreen: true
                });
                msg.append(videoFrame);
            }
        }
        $(".messages").prepend(msg);
    }); //on click of submit button, get the value of the message and prepend it to the messages div
});