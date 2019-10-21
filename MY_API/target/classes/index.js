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
            $(data.img).each(function(index,value){
                createImages(index,value);
            });
        }
    });
}

function getEpisodes(season) {
    $.ajax({
        url: 'http://localhost:8080/'+season,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(data){
            $(data.img).each(function(index,value){
                createEpisodes(season,index,value);
            });
        }
    });
}

function createEpisodes(season,index,arrayElem) {
    var div = document.createElement("DIV");
    div.innerHTML = "<a class='w3-button' href='http://localhost:8080/"+season+"/episode"+index+"'> <b>"+arrayElem+"</b></a>";
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