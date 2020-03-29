
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

            console.log

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

    //댓글 호출

    
    $.ajax({
        type:"GET",
        url:"http://13.125.149.206/api/feedReply?useridx="+user_Idx,
        async:false,
        success:function(res){

            

            console.log(res)
            for( let i=0; i< res.result.length; i++){

                var resIdx = res.result[i].USER_IDX;
                var replyIdx = res.result[i].IDX;
                console.log(res)
                $.ajax({
                    type:"GET",
                    url:"http://13.125.149.206/api/user/"+resIdx,
                    async:false,
                    success:function(res){

                        // console.log("res___",resIdx)
                        console.log("res",)
    
                        // var html = "<div class ='feedUserId'><div class='feedloginimg small'><img id='feeduserImg' src='"+res.result[0].PATH+"'></div><span class='reply_user'><p>"+res.result[0].NAME+"</p></span><i class='far fa-edit' id='i_edit'></i><i class='far fa-trash-alt' id='i_delete'></i><p class='replyid'>"+res.result[0].IDX+"</p></div>"
                    
                        // if(resIdx == idx){
                            
                        //     var html = "<div class ='feedUserId'><div class='feedloginimg small'><img id='feeduserImg' src='"+res.result[0].PATH+"'></div><span class='reply_user'><p>"+res.result[0].NAME+"</p></span><span class='editreply'><i class='far fa-edit' id='iedit'></i></span><span class='delete'><i class='far fa-trash-alt' id='idelete'></span></i><p class='replyidx'>"+replyIdx+"</p></div>"

                        
                            var html = "<div class ='feedUserId'><div class='feedloginimg small'><a href='/feedprofile?userIdx="+res.result[0].IDX+"'><img id='feeduserImg' src='"+res.result[0].PATH+"'><a></div><span class='reply_user'><a href='/feedprofile?userIdx="+res.result[0].IDX+"'><p>"+res.result[0].NAME+"</p></a></span></div>"

                        

                        
                  
                        $(".feedreply").append(html);

                      

                        


        
                    }
                })
                
            

                var html ="<div class='Usercomment'><span class='reply'><p>"+res.result[i].CONTENT+"</p></span></div>"
               


                $(".feedreply").append(html);



        

            }



        }
    })

//수정, 삭제버튼

    // $(".editreply").on("click",function(){
    // var textarea = $(".reply").html()
    // $("#replySubmit").css("display","none")
    // $("#replyEdit").css("display","inline-block")
    // $('textarea').html(textarea)

    
    // })

    //     $("#idelete").on("click",function(){
    //         var idx = $(".replyidx").html();
    //         var content=$("textarea").val();
    //         console.log(user_Idx)
    //         $.ajax({
    //             type:"DELETE",
    //             url:"http://13.125.149.206/api/feed/"+idx,
    //             // data:{

    //             //     USER_IDX:user_Idx,
    //             //     CONTENT:content

    //             // },
    //             success:function(res){
    //                 alert("댓글수정")
    //                 window.location.href=window.location.href
    //             } ,
    //             error:function(res){
    //                 alert("오류")
    //             }
                

    //         })
    //     })


    $(".edit").on("click",function(){
        window.location.assign('/mainpage/reply?'+user_Idx)
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
        // var idx = $("#sessionIdx").html();

   

        $.ajax({
            type:"POST",
            url:"http://13.125.149.206/api/feedReply/"+user_Idx,
            data:{
                USER_IDX: idx,
                CONTENT: reply
            },
            success:function(res){

                alert("댓글등록완료")
                window.location.href=window.location.href


            },
    
            

        })




    })





  




})