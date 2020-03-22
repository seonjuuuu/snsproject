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
  
  $.ajax({
    type:"GET",
    url:"http://13.125.149.206/api/feed",

    success:function(res){
      console.log(res)
      
    }
    
     
  })


})

