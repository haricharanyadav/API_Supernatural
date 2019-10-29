function createImages(index,arrayElem) {
    var article = document.createElement("A");
    article.setAttribute("class", "w3-third w3-button");
    article.setAttribute("href", "http://localhost:8080/seasons?supernatural=season"+(index+1));
    article.innerHTML = "<img src='"+arrayElem+"' id='image"+(index+1)+"' alt='Season "+(index+1)+"' ><p>Season "+(index+1)+"</p>";
    document.getElementById("test1").appendChild(article);
}

function getImages() {
    $.ajax({
        url: 'http://localhost:8080/images',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(data){
            window.localStorage.setItem("images", JSON.stringify(data.img));
            $(data.img).each(function(index,value){
                createImages(index,value);
            });
        }
    });
}

function getEpisodes(season) {
    $.ajax({
        url: 'http://localhost:8080/season/'+season,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(data){
            window.localStorage.setItem("episodes", JSON.stringify(data.episodes));
            $(data.episodes).each(function(index,value){
                createEpisodes(season,index,value);
           });
        }
    });
}

function createEpisodes(season,index,arrayElem) {
    var images = window.localStorage.getItem('images').split(",");
	document.getElementById("seasonImage").setAttribute("src", images[(season.substring(6,)-1)].replace(/\"/g,"").replace("[","").replace("]",""));
	document.getElementById("seasonName").innerHTML = "Season "+(season.substring(6,))+" - Episode List:";
    var div = document.createElement("DIV");
    div.innerHTML = "<a class='w3-button' href='http://localhost:8080/episodes?supernatural="+season+"&episode="+(index+1)+"'> <b>"+arrayElem+"</b></a>";
    document.getElementById("episodes").appendChild(div);
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function getEpisode(season, episode){
	$.ajax({
        url: 'http://localhost:8080/'+season+'/'+episode,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(data){
            window.localStorage.setItem("episodes", JSON.stringify(data.episodes));
            $(data.episodes).each(function(index,value){
                createEpisodes(season,index,value);
           });
        }
    });
}

function setThings(season,episode){
	var episodes = window.localStorage.getItem('episodes').split(",");
	document.getElementById("episodeName").innerHTML = episodes[(season.substring(6,)-1)].replace(/\"/g,"").replace("[","").replace("]","");
	document.getElementById("video").setAttribute("src", "http://localhost:8080/"+season+"/episode"+episode);
	if(episode == 1)
	document.getElementById("previous").disabled = true;
    else
    document.getElementById("previous").setAttribute("href", "http://localhost:8080/episodes?supernatural="+season+"&episode="+(episode-1));
    if(episode == episodes.length)
    document.getElementById("next").disabled = true;
    else
    document.getElementById("next").setAttribute("href", "http://localhost:8080/episodes?supernatural="+season+"&episode="+(Number(episode)+1));
}