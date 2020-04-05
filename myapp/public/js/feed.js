//쿼리값 파싱

function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
        params[key] = value;
    });
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
    openparam = getUrlParams();
    user_Idx = openparam.IDX;

    //피드 정보 호출

    $.ajax({
        type: "GET",
        url: "http://13.125.149.206/api/feed?idx=" + user_Idx,
        success: function (res) {
            // console.log(res)
            // console.log(res.result[0].USER_IDX)
            var result = res.result[0];
            var feedUserContent = result.CONTENT;
            var feedlike = result.FEED_LIKE;
            var feedPhoto = result.PATH;
            var feedUserIdx = result.USER_IDX;
            var feedIdx = result.IDX;

            //피드 유저정보 호출 
            $.ajax({
                type: "GET",
                url: "http://13.125.149.206/api/user/" + feedUserIdx,
                success: function (res) {
                    // console.log(res)
                    var feedUserName = res.result[0].NAME;
                    var feedUserPhoto = res.result[0].PATH;
                    var feedUserIdx = res.result[0].IDX;

                    if (feedUserPhoto) {
                        $("#loginImg").attr('src', feedUserPhoto);
                    }

                    $('[name=writer]').attr('href', '/feedprofile?userIdx=' + feedUserIdx)

                    $("h5").text(feedUserName);
                    $(".feedLikeCount").text(feedlike);
                    $('#feed_edit').attr("href", "/feededit?feedIdx=" + feedIdx);
                }
            });

            //피드내용 뿌리기//
            $('#content').html(feedUserContent.replace(/\n/g, '<br/>'));
            $("#feedphoto").attr('src', feedPhoto);

            if (feedUserIdx == idx) {
                $("#feededitbtn").css("display", "inline");
            }
        }
    });

    //댓글 호출


    $.ajax({
        type: "GET",
        url: "http://13.125.149.206/api/feedReply?feedIdx=" + user_Idx,
        async: false,
        success: function (res) {
            for (let i = 0; i < res.result.length; i++) {
                var resIdx = res.result[i].USER_IDX;
                var replyIdx = res.result[i].IDX;
                console.log('aaa', res);
                $.ajax({
                    type: "GET",
                    url: "http://13.125.149.206/api/user/" + resIdx,
                    async: false,
                    success: function (result) {
                        var move = result.result[0].IDX;
                        // var html = "<div class ='feedUserId'><div class='feedloginimg small'><img id='feeduserImg' src='"+res.result[0].PATH+"'></div><span class='reply_user'><p>"+res.result[0].NAME+"</p></span><i class='far fa-edit' id='i_edit'></i><i class='far fa-trash-alt' id='i_delete'></i><p class='replyid'>"+res.result[0].IDX+"</p></div>"
                        
                        if ( ! result.result[0].PATH ){
                            result.result[0].PATH = '/img/not.png'
                        }


                        if (resIdx == idx) {
                            var html = "<div class ='feedUserId' data-idx='" + replyIdx + "'>"
                                + "<div class='feedloginimg small'>"
                                + "<img id='feeduserImg' name='imguser'  src='" + result.result[0].PATH + "'></div>"
                                + "<span class='reply_user'>" + result.result[0].NAME + "</span>"
                                + "<span class='editreply'><i class='far fa-edit' name='iedit' data-idx='" + replyIdx + "'></i></span><span class='delete'><i class='far fa-trash-alt' name='idelete' data-idx='" + replyIdx + "'></span></i>"
                                // + "<input type ='button' id='replyidx' name ='rebtn' value='" + i + "'>" + replyIdx + "</p></div>";
                        } else {
                            var html = "<div class ='feedUserId'>"
                                + "<a href='/feedprofile?userIdx=" + move + "'><div class='feedloginimg small'><img id='feeduserImg' name='imguser' src='" + result.result[0].PATH + "'></a></div>"
                                + "<span class='reply_user'><a href='/feedprofile?userIdx=" + move + "'><p>" + result.result[0].NAME + "</p></a></span></div>"

                        }
                        $(".feedreply").append(html);
                    }
                });

                var html = "<div class='Usercomment'>" + res.result[i].CONTENT + "</div>"
                +"<div class='idxComment'><input type='text' name = 'idxEdit'  ><button type='button' name='idxEdit_btn'>수정</button></div>";
                $(".feedreply").append(html);

             
            }
        }
    });

    // if($('[name=imguser]').attr('scr') === null){
    //     $('[name=imguser]').attr('src','/img/not.png')

    // }
    

    //수정, 삭제버튼
    // $(document).on("click", "input[name='rebtn']", function () {
        // $("input[name='rebtn']").each(function (i) {
        //     //alert( i +  $("input[name='EMAIL']").eq(i).attr("value") );
        //     // var idx= $(".replyidx").eq(i).attr("value");
        //     // console.log(idx)
        //     var c = new Array;
        //     var p = $("input[name='rebtn']").eq(0).attr("value");
        //     console.log(p)
        //     console.log(p.length)

        //     console.log(c)
        // });

        //    var p = $(".replyidx").text();
        //    console.log(p)
    // });


    // $(".replyidx").each(function(idx){   

    //     // 해당 체크박스의 Value 가져오기
    //     var value = $(this).val();

    //     // var eqValue = $(".replyidx:"+ idx + ").val() ;

    //     console.log(value + ":") ;

    //   });

    
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


    // 수정버튼 눌렀을때 

    $('[name=iedit]').on('click', function () {
        // $('.editmod').show();
       
        
        // $('textarea').empty();
        $(this).parents('.feedUserId').next('.Usercomment').next('.idxComment').css("display",'block')
     
  
        console.log($(this).parents('.feedUserId').next('.Usercomment').next('.idxComment').children('input[name=idxEdit]').val());
        // $("#replySubmit").hide();
        // $("#replyEdit").show();
        // var user_reply = $(this).parents('.feedUserId').next('.Usercomment').html();
        // $('textarea').text(user_reply);

        // var content=$(this).parents('.feedUserId').next('.Usercomment').next('.idxComment').children('input').val();
   
        var this_idx =$(this).attr('data-idx');
        // console.log(idx)
        // var c = $(this).parents('.feedUserId')

        $("[name=idxEdit_btn]").on('click',function(){
            
            var useridx = $('#sessionIdx').text();
            const content = $(this).parent().find('[name=idxEdit]').val();
           
        
            console.log(content)
    
            $.ajax({
                type:"PUT",
                url:"http://13.125.149.206/api/feedReply/"+this_idx,
                data:{
                    USER_IDX:useridx,
                    CONTENT:content
                },
                
                success:function(res){
                    alert("수정완료") ;
                    window.location.href=window.location.href
                },
                error:function(res){
                    alert("오류발생")
                }
                
    
                
            })
            console.log(content)
        })
    
   
    });
     
    //삭제버튼 

    $("[name=idelete]").on("click", function () {
        // console.log($(this).attr('data-idx'));
        var idx = $(this).attr('data-idx');
        var useridx = $('#sessionIdx').html();

        console.log(useridx)
        console.log(idx)
        $.ajax({
            type:"DELETE",
            url:"http://13.125.149.206/api/feedReply/"+idx,
            data:{
        
                USER_IDX:useridx,
           
        
            },
            success:function(res){
                alert("댓글삭제")
                window.location.href=window.location.href
                console.log(res)
            } ,
            error:function(res){
                alert("오류")
                console.log(res)
            }
        })
    });

    //댓글 수정버튼 클릭시 리로드

    $(".edit").on("click", function () {
    //     $('textarea').empty();
    //   $('.replyEdit').css("display",'none');
    //   $('.replySubmit').css("display",'inline')
      window.location.href = window.location.href;
       
    });


    // $('#closeBtn').on('click',function(){
    //     $(".editmod").css('display','none')
    // })




    //좋아요버튼 눌렀을때 ajax호출
    $("#dislike").on("click", function () {
        $.ajax({
            type: "GET",
            url: "http://13.125.149.206/api/feed?idx=" + user_Idx,
            success: function (res) {
                var result = res.result[0];
                var feedlike = result.FEED_LIKE;

                $.ajax({
                    type: "POST",
                    url: "http://13.125.149.206/api/feedLike/" + result.IDX + "/" + idx,
                    success: function (res) {
                        $(".feedLikeCount").text(feedlike + 1);
                        $("#dislike").css("display", "none");
                        $("#like").css("display", "block");
                    }
                });
            }
        });
    });

    //싫어요버튼 눌렀을때 ajax 호출
    $("#like").on("click", function () {
        $.ajax({
            type: "GET",
            url: "http://13.125.149.206/api/feed?idx=" + user_Idx,
            success: function (res) {
                var result = res.result[0];
                var feedlike = result.FEED_LIKE;

                $.ajax({
                    type: "DELETE",
                    url: "http://13.125.149.206/api/feedLike/" + result.IDX + "/" + idx,
                    success: function (res) {
                        $(".feedLikeCount").text(feedlike - 1);
                        $("#like").css("display", "none");
                        $("#dislike").css("display", "block");
                    }
                });
            }
        });
    });

    //회원정보는 알수 없는 경우 

    if ($("h5").html(null)) {
        $("h5").html("(알수없는 사용자)")
    }

    //댓글입력창 ajax 호출
    // $("#replySubmit").on("click", function () {
    //     var reply = $("textarea").val();

    //     $.ajax({
    //         type: "POST",
    //         url: "http://13.125.149.206/api/feedReply/" + user_Idx,
    //         data: {
    //             USER_IDX: idx,
    //             CONTENT: reply
    //         },
    //         success: function (res) {
    //             window.location.href = window.location.href;
    //         },
    //     });
    // });
});