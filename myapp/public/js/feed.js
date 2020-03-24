
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
    user_Idx=openparam.IDX;
    // console.log(user_Idx)

    $.ajax({
        type:"GET",
        url:"http://13.125.149.206/api/feed?idx="+user_Idx,
        success:function(res){
            console.log(res)
            // console.log(res.result[0].USER_IDX)
            var result = res.result[0];
            var feedUserContent = result.CONTENT;
            var feedlike = result.FEED_LIKE;
            var feedPhoto = result.PATH;

            $.ajax({
                type:"GET",
                url:"http://13.125.149.206/api/user/"+res.result[0].USER_IDX,
                success:function(res){
                    // console.log(res)
                    var feedUserName =res.result[0].NAME;
                    var feedUserPhoto= res.result[0].PATH;

                    if(feedUserPhoto){

                        $("#loginImg").attr('src',feedUserPhoto);

                    }

                    $("h5").text(feedUserName);

                }
            })

            //피드내용 뿌리기//

            $('#content').html(feedUserContent);
            $("#feedphoto").attr('src',feedPhoto);








        }
    })
})