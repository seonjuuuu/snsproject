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
  
  // $.ajax({
  //   type:"GET",
  //   url:"http://13.125.149.206/api/feed",

  //   success:function(res){
  //     console.log(res)
      
  //   }
    
     
  // })

  let pageNum=1;



  getUserFeed(pageNum);

  function getUserFeed(pageNum){
    $(".box").empty();
    var limit = 21 ;

    $.ajax({
      type:"GET",
      url:"http://13.125.149.206/api/feed",
      success:function(res){
        // console.log(res.result)
        var pageCnt = Math.ceil(res.result.length/limit);
       
        // for (let i = (pageNum * limit)-limit; i<(pageNum*limit); i++){
         
          
        //   var html = "<div class = 'feedbox'><a href='/mainpage/feed?IDX="+res.result[i].IDX+"'><img id=myfeed src ="+res.result[i].PATH+"></a></div>"
          
      
        //   if(res.result[i].PATH==null) {

        //     var html="<div class='feedbox'><img id=myfeed src='/img/nothing.png'></div>"
        //     // return;
            
        //   }
          
        //   $('.box').append(html)

        for (let i = (res.result.length-1)-(pageNum-1)*limit; i>(res.result.length-1)-(pageNum*limit); --i){
         
          var html = "<div class = 'feedbox'><a href='/mainpage/feed?IDX="+res.result[i].IDX+"'><img id=myfeed src ="+res.result[i].PATH+"></a></div>"
          
      
          if(res.result[i].PATH==null) {

            var html="<div class='feedbox'><img id=myfeed src='/img/nothing.png'></div>"
            // return;
            
          }
          
          $('.box').append(html)


          
  
        }

       

        getPagingBtn(pageCnt);

      }
    })
  }

//피드 페이징 버튼 생성

  function getPagingBtn (pageCnt) {
    $('.paging').empty();
    for (let i =0; i < pageCnt; i++) {
        let cnt = i + 1;
        let prev = '<div class="direction prev">이전</div>'
        let pBtn = '<div class="pBtn ">'+cnt+'</div>'
        let next = '<div class="direction next">다음</div>'

        if (i == 0) {
            $('.paging').append(prev);
            $('.paging').append(pBtn);
            $('.pBtn').addClass("strong");
        } else if (i == pageCnt - 1) {
            $('.paging').append(pBtn);
            $('.paging').append(next);
        } else {
            $('.paging').append(pBtn);
        }
    }


    $('.prev').on('click', function(e) {
        // alert(pageNum)
        if (pageNum == 1) {
            alert('이전 페이지가 없습니다')
        } else {
            pageNum = pageNum - 1;
        }
        
        getUserFeed(pageNum)
    })

    $('.pBtn').on('click', function(e) {
      var num = $(this).text()
      // console.log(num)
      pageNum = num;      
      $('.pBtn').removeClass('strong')         
      $(this).addClass('strong')
      getUserFeed(pageNum)
  })

    $('.next').on('click', function(e) {
        // alert(pageNum)
        if (pageNum == pageCnt) {
            alert('다음 페이지가 없습니다')
        } else {
            pageNum = pageNum*1 + 1;
            $('.pBtn').removeClass('strong') ;
            $('.pBtn').next('.pBtn').addClass('strong') 

            getUserFeed(pageNum)
        }
        // getUserFeed(pageNum)
    })
}

 

 





})

