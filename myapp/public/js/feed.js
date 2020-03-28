
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

    var idx = $("#sessionIdx").html();

    
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

    $.ajax({
        type:"GET",
        url:"http://13.125.149.206/api/feedReply?feedIdx="+user_Idx,
        success:function(res){

            console.log(res)
            for( let i=0; i< res.result.length; i++){

                var html ="<div class='Usercomment'><span class='reply'><p>"+res.result[i].CONTENT+"</p></span><i class='far fa-edit'></i><i class='far fa-trash-alt'></i></div>"

                $(".feedreply").append(html);
            }
            
      
            console.log(html)
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

    //댓글입력창
    
    $("#replySubmit").on("click",function(){

        var reply = $("textarea").val();
        var idx = $("#sessionIdx").html();

        $.ajax({
            type:"POST",
            url:"http://13.125.149.206/api/feedReply/"+user_Idx,
            data:{
                USER_IDX:idx,
                CONTENT: reply
            },
            success:function(res){

                alert("댓글등록완료")
                window.location.href=window.location.href


            },
    
            

        })



    })









})