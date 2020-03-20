$(document).ready(function(){
    var SRC=new Array;
    // 피드 작성 모달창 띄우기

    $("#feedwritebtn").click(function(){
        $(".modal").fadeIn();
    });
   
     $(".feedclose").click(function(){
        $(".modal").fadeOut();
        $('#feedUpImg').attr('src','/img/feedup.png' );

    });


  //피드글쓰기//
  
 

})