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


    




  
})
//쿼리값 파싱

function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
    return params;
}

function goBack() {
    window.history.back();
}

$(document).ready(function () {
    
    // if($("#feedphoto").attr('src') === null){
    //     $("#feedphoto").attr('src','/img/feedup.png')
    // }


    openparam=getUrlParams();
    // console.log(openparam)
    user_Idx=openparam.userIdx;
    // console.log(user_Idx)

    $.ajax({
        type:"GET",
        url:"http://13.125.149.206/api/user/"+user_Idx,
        async: false,
        success:function(res){
            // console.log(res)
            // console.log(res.result[0].USER_IDX)
            var result = res.result[0];
            var feedUserEmail = result.EMAIL;
            var feedUserName = result.NAME;
            var feedUserIntroduce = result.INTRODUCE;
            var feedUserPhoto=result.PATH;
            var feedUserIdx= result.IDX;


            // console.log(feedUserPhoto)

            $('dt').html(feedUserName);
            $("#feeduserImg").attr('src',feedUserPhoto);
            $(".feedintroduce").html(feedUserIntroduce);
            $(".feedemail").html(feedUserEmail);
            $("#preImg").attr('src',feedUserPhoto);
            $(".feedidx").html(feedUserIdx);

      
             if(!feedUserPhoto){
                 $("#feeduserImg").attr("src","/img/not.png")
                 $("#preImg").attr("src","/img/not.png")
             }
        }
    })

    //피드모아서 화면에 보여주기  - 각각의 유저의 피드 모아보기 
    $.ajax({
        type:"GET",
        url:"http://13.125.149.206/api/feed?userIdx="+user_Idx,
        success:function(res){

            // console.log(res)

            for(i=res.result.length-1; i>-1; --i){
                var html ="<div class = 'feedbox'><a href='/mainpage/feed?IDX="+res.result[i].IDX+"'><img id=myfeed src ="+res.result[i].PATH+"></a></div>"
                $(".feed_box").append(html)

                if(res.result[i].PATH==null) {

                    var html="<div class='feedbox'><img id=myfeed src='/img/nothing.png'></div>"
                    // return;
                    
                  }
            }


            
        }
    })


        //프로필편집, 글쓰기버튼 보이기 - 사용자와 , 유저피드의 idx값이 일치하면 버튼생성



        var loginUser_Idx= $(".feedidx").html();
        var feedUser_Idx= $("h6").html();
        
    
        // console.log(loginUser_Idx);
        // console.log(feedUser_Idx);
    
        if(loginUser_Idx !== feedUser_Idx){
    
            $(".feedPlusbox").css("display","none");
            $(".useredit").css("display","none");
    
        }

      
    



})