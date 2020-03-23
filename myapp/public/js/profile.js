$(document).ready(function(){

    var SRC=new Array;
    // 프로필 미리보기 모달창 띄우기

    $(".user_img").click(function(){
        $(".imgmodal").fadeIn();
    });
   
     $(".feedclose").click(function(){
        $(".imgmodal").fadeOut();
        $('#feedUpImg').attr('src','/img/feedup.png' );
    });


    // 글쓰기창 띄우는 모달
    $("#plus").click(function(){
        $(".modal").fadeIn();
    });
   
     $(".feedclose").click(function(){
        $(".modal").fadeOut();
    });


  //내가 모은 피드 뿌리기

  $.ajax({
      type:"GET",
      url:"/"

  })

  for( var i=0 ; i<feed; i++){
    console.log(feedpath)

    // var newDIV = document.createElement("div");​
    
    // newDIV.innerHTML=feedpath[i].PATH;
    // newDIV.setAttribute("class","feedbox");
    // var feedclass = document.getElementsByClassName("feed_box");
    // feedclass.appendChild(newDIV);

  }
})