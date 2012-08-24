function getQueryUrl (query) {
  var url = "http://202.116.13.244/search*chx/?searchtype=X&SORT=D&searcharg={{query}}&searchscope=1&submit.x=0&submit.y=0&submit=%E6%8F%90%E4%BA%A4";
  url = url.replace("{{query}}", query);
  return url;
}

function getButton (url,found) {
  var btn;
  if(found){
    btn = '<a href="' + url + '" title="点击去暨大图书馆借阅" style="display:inline-block;background:#33A057;border: 1px solid #2f7b4b;color: white;padding: 1px 10px;border-radius: 3px;margin-right:8px;" target="_blank">暨大借阅</a>';
  }
  else {
    btn = '<a href="' + url + '" title="暨大图书馆找不到相关的书籍" style="display:inline-block;background:#cc2b2f;border: 1px solid #cc0007;color: white;padding: 1px 10px;border-radius: 3px;margin-right:8px;" >暂无馆藏</a>';
  }
  return btn;
}

function queryAndGenerateButton (query,callback) {
  $.ajax({
    url: getQueryUrl(query),
    type: "get",
    success: function(response){
      var response = response.toString();
      if( response.indexOf('未找到') != -1){
        var url = getQueryUrl(query);
        var btn = getButton(url,false);
        callback(btn);
      }
      else {
        var url = getQueryUrl(query);
        var btn = getButton(url,true);
        callback(btn);
      }
    }
  });
}

$(document).ready(function() {
  var url = window.location.toString();

  // Book Page
  if(url.indexOf("subject") != -1 ){
    query = $("#mainpic img").attr("alt");
    queryAndGenerateButton(query, function(btn){
      btn = $(btn).css("float", "left");
      $("div.a_stars").before(btn);
    });

  }

  // System's Book List Page: tag
  else if (url.indexOf("tag") != -1){
    $(".article table").each(function() {
      var self = this;
      query = $("div.pl2 a",self).text();
      queryAndGenerateButton(query, function(btn){
        btn = $(btn).css("float", "right");
        $("div.star",self).next().prepend(btn);
      });
    });
  }

  // System's Book List Page: doulist
  else if (url.indexOf("doulist") != -1 ){
    $(".article table").each(function() {
      var self = this;
      query = $("div.pl2 a", self).html();
      queryAndGenerateButton(query, function(btn){
        btn = $(btn).css("float", "left");
        $("td > span.rr", self).prepend(btn);
      });
    });
  }

  // People's Book List Page
  else if ( (url.indexOf("mine") != -1) || (url.indexOf("people") != -1)){
    $('div.grid-view .item').each(function() {
      var self = this;
      query = $('img',self).attr("alt");
      queryAndGenerateButton(query, function(btn){
        btn = $(btn).css("float", "right");
        $(".info", self).append(btn);
      });
    });
  }
});
