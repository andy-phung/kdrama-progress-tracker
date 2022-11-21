const interval = setInterval(function() {
    send_data();
}, 1000);

function send_data(){
    var title_loc = document.getElementById("player-content");
    var raw_title = title_loc.textContent.replace(/\t/g, '').split(/\r?\n/)[2].split(" "); // Start-Up (2020) Episode 1
    var episode_num = raw_title[raw_title.length - 1];
    var title = ""; 
    for (i = 0; i < raw_title.length - 2; i++) {
        title += raw_title[i];
        title += " "; 
    } 


    var link_loc = document.getElementsByClassName("meta-cat");
    // url of title page
    var title_page_url = "https://www.dramacool9.co" + link_loc[0].innerHTML.toString().replace(/\t/g, '').split(/\r?\n/)[2].match(/"([^']+)"/)[1];
    var img_url = http_get(title_page_url).toString().match("data-original=\"([^']+)\"")[1].split("\"")[0];
    var watch_w_me_url = document.location.href; // watch with me url

    var payload = {
        title: title,
        episode: "Episode " + episode_num,
        image: img_url,
        watch: watch_w_me_url
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:5000/");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    xhr.send(JSON.stringify(payload));

}

function http_get(theUrl)
{
    let xmlhttp;
    
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            return xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", theUrl, false);
    xmlhttp.send();
    
    return xmlhttp.response;
}