// var Audio = Audio || function() { 
//   var self  = this;
//   self.play = self.stop = new Function();
// };


var Lottery = (function () {

  var timer = null,
    itemWidth = 142,
    itemCount = 0,
    curPos = 0;

  // var stopAudio       = new Audio("res/ping.mp3")
  //   , backAudio       = new Audio("res/ping.mp3")
  //   ;

  var $container = $("#lottery-container"),
    $content = $("#lottery-container ul"),
    $item = $("#lottery-container ul li"),
    $hero = $("#lottery-hero img");

  var init = function () {

    //Pre-caculate the count of items
    itemCount = $item.size();
    //Clone the contents
    $content.append($content.html());
  };

  var start = function () {
    clearInterval(timer);

    // backAudio.play();
    // stopAudio.pause();



    timer = setInterval(function () {

      curPos = parseInt($content.css("left")) | 0;
      curPos -= itemWidth / 2;

      (curPos < 0 - itemWidth * itemCount) && (curPos = 0);

      $content.css("left", curPos);

    }, 25);

    $hero.hide();
  };

  var stop = function () {
    clearInterval(timer);
    timer = null;



    // backAudio.pause();
    // stopAudio.play();

    //Roll at the half width?
    (curPos % itemWidth == 0 - itemWidth / 2) && (curPos = curPos - itemWidth / 2);

    var selected = getCurIdx();

    setCurIdx(selected);

  };



  var running = function () {
    return timer != null;
  };

  //Index: first item on the left
  var setCurIdx = function (idx) {
    curPos = (0 - idx) * itemWidth;

    var $items = $("#lottery li img"),
      imgUrl = $items.eq(idx + 3).attr("src");

    $content.css("left", curPos);
    $hero.attr("src", imgUrl).show("slow");

    console.log(curPos, idx);

    if (parseInt(idx) == 1) {
      choose = ran5
    }
    if (parseInt(idx) == 2) {
      choose = ran6
    }
    if (parseInt(idx) == 3) {
      choose = ran7
    }
    if (parseInt(idx) == 4) {
      choose = ran1
    }

    if (parseInt(idx) == 5) {
      choose = ran2
    }
    if (parseInt(idx) == 6) {
      choose = ran3
    }
    if (parseInt(idx) == 7) {
      choose = ran4
    }
    // alert(choose)

    // show_1 = choose + "/1.png"
    // alert(show_1)
    // // document.getElementById('id1').style.background-image = "url(show_1)"; 
    // document.getElementById("id1").style.background ="green";
    // document.getElementById("id2").style.background ="red";
    show_1 = choose + "/1.png"
    show_2 = choose + "/2.png"
    show_3 = choose + "/3.png"
    show_4 = choose + "/4.png"
    show_5 = choose + "/5.png"
    show_6 = choose + "/6.png"
    show_7 = choose + "/7.png"
    show_8 = choose + "/8.png"
    show_9 = choose + "/9.png"
    show_10 = choose + "/10.png"
    // alert(show_1)
    $("#id1").find("img").eq(0).attr('src', show_1);
    $("#id2").find("img").eq(0).attr('src', show_2);
    $("#id3").find("img").eq(0).attr('src', show_3);
    $("#id4").find("img").eq(0).attr('src', show_4);
    $("#id5").find("img").eq(0).attr('src', show_5);
    $("#id6").find("img").eq(0).attr('src', show_6);
    $("#id7").find("img").eq(0).attr('src', show_7);
    $("#id8").find("img").eq(0).attr('src', show_8);
    $("#id9").find("img").eq(0).attr('src', show_9);
    $("#id10").find("img").eq(0).attr('src', show_10);

    var note = "note/" + choose + ".txt"
    // alert(note)

    $("#b01").click(function () {
      htmlobj = $.ajax({
        url: note,
        async: false
      });
      $("#myDiv").html(htmlobj.responseText);
    });

  };

  var getCurIdx = function () {
    return (0 - curPos) / itemWidth;
  };

  return {
    init: init,
    start: start,
    stop: stop,
    running: running,
    setCurIdx: setCurIdx,
    getCurIdx: getCurIdx
  };

})();



$(document).ready(function () {
  Lottery.init();


});

$(document).keydown(function (e) {
  var key = e.keyCode;
  if (key != 32 && key != 13) return;

  Lottery.running() ?
    Lottery.stop() :
    Lottery.start();
});