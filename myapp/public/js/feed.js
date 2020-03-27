
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

    var idx = $("p").html();

    
    // if($("#feedphoto").attr('src') === null){
    //     $("#feedphoto").attr('src','/img/feedup.png')
    // }


    openparam=getUrlParams();
    // console.log(openparam)
    user_Idx=openparam.IDX;
    // // console.log(user_Idx)
  
    $.ajax({
        type:"GET",
        url:"http://13.125.149.206/api/feed?idx="+user_Idx,
        success:function(res){
            // console.log(res)
            // console.log(res.result[0].USER_IDX)
            var result = res.result[0];
            var feedUserContent = result.CONTENT;
            var feedlike = result.FEED_LIKE;
            var feedPhoto = result.PATH;
            var feedUserIdx=result.USER_IDX;
            var feedIdx=result.IDX;

            $.ajax({
                type:"GET",
                url:"http://13.125.149.206/api/user/"+feedUserIdx,
                success:function(res){
                    // console.log(res)
                    var feedUserName =res.result[0].NAME;
                    var feedUserPhoto= res.result[0].PATH;
                    var feedUserIdx = res.result[0].IDX;
               
                    if(feedUserPhoto){

                        $("#loginImg").attr('src',feedUserPhoto);

                    }

             
                    $('a').attr('href','/feedprofile?userIdx='+feedUserIdx)

                    $("h5").text(feedUserName);
                    $(".feedLikeCount").text(feedlike);
                    $('#feed_edit').attr("href", "/feededit?feedIdx="+feedIdx);
                }
            })

            //피드내용 뿌리기//

            $('#content').html(feedUserContent.replace(/\n/g, '<br/>'));
            $("#feedphoto").attr('src',feedPhoto);
     
            // console.log(idx)

            if(feedUserIdx==idx){
                $("#feededitbtn").css("display","inline");
            }

           






        }
    })

    

  //좋아요버튼
    $("#dislike").on("click",function(){
        $.ajax({
            type:"GET",
            url:"http://13.125.149.206/api/feed?idx="+user_Idx,
            success:function(res){
                // console.log(res)
                // console.log(res.result[0].USER_IDX)
                var result = res.result[0];
                var feedlike=result.FEED_LIKE
                
    
                $.ajax({
                    type:"POST",
                    url:"http://13.125.149.206/api/feedLike/"+result.IDX+"/"+idx,
                    success:function(res){
                        // console.log(res)

                        // console.log(feedlike)
                        $(".feedLikeCount").text(feedlike+1);

                        $("#dislike").css("display","none");
                        $("#like").css("display","block");

    
                    }
                })
    
    
            }
        })


    })

    //싫어요버튼

    $("#like").on("click",function(){
        $.ajax({
            type:"GET",
            url:"http://13.125.149.206/api/feed?idx="+user_Idx,
            success:function(res){
                // console.log(res)
                // console.log(res.result[0].USER_IDX)
                var result = res.result[0];
                var feedlike=result.FEED_LIKE
                
    
                $.ajax({
                    type:"DELETE",
                    url:"http://13.125.149.206/api/feedLike/"+result.IDX+"/"+idx,
                    success:function(res){
                        // console.log(res)

                        // console.log(feedlike)
                        $(".feedLikeCount").text(feedlike-1);

                        $("#like").css("display","none");
                        $("#dislike").css("display","block");

    
                    }
                })
    
    
            }
        })


    })



    if($("h5").html(null)){
        $("h5").html("(알수없는 사용자)")
        
    }









})