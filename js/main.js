let nComics = 0;

$(document).ready(function(){
    
    let selectedComics = []
    showComic();
    selectedComics.push(nComics);
    
    $("#nextregion").click(function(){
        console.log(selectedComics);
        let nextComicNum = 0;
        while(true){
            nextComicNum = getRandomIntInclusive(1, nComics);
            if (selectedComics.indexOf(nextComicNum) == -1){
                break;
            }
        }
        showComic(nextComicNum);
        selectedComics.push(nextComicNum)
    });
    
});

function showComic(number = 0){
    url = "http://dynamic.xkcd.com/api-0/jsonp/comic";
    if(number != 0){
        url = "http://dynamic.xkcd.com/api-0/jsonp/comic/" + String(number);
    }
    getComic(url, displayComic);
}

function getComic(url, callback){
    $.ajax({
            url : url,
            type : "GET",
            dataType : "jsonp",
            jsonpCallback: 'callback',
            success : callback 
    });
}

function displayComic(comic){
    $("#comic_title").text(comic.title);
    
    $("#comic_img").attr("src", comic.img);

    $("#full_comic").attr("src", comic.img);
    
    $("#comic_number").text(comic.num);
    if (nComics == 0){
        nComics = comic.num;
    }
    
    $("#date").text(String(comic.day) + "/" + String(comic.month) + "/" + String(comic.year));
    
    $("#comic_alt_text").text(comic.alt);
    
    let explainurl="http://www.explainxkcd.com/wiki/index.php/" + String(comic.num) + ":_" + comic.title.split().join("-");
    
    $("#explanation").attr("href", explainurl)
    

}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

