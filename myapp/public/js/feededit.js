function goBack() {
    window.history.back();
}


//쿼리값 파싱

function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
    return params;
}


$(document).ready(function(){
    

    
    
    openparam=getUrlParams();
    // console.log(openparam)
    user_Idx=openparam.feedIdx;
    // // console.log(user_Idx)
   
    
    
    //피드정보호출
    $.ajax({
        type:"GET",
        url:"http://13.125.149.206/api/feed?idx="+user_Idx,
        success:function(res){
            // console.log(res)
            var result = res.result[0];
            var feedUserContent = result.CONTENT;
            var feedPhoto = result.PATH;


     
            $('#feedphoto').attr('src',feedPhoto)

            $("textarea").html(feedUserContent);
     
 
        }
    })


    //수정버튼 api호출
    $("#feedEdit").on("click",function(){
        
        var content = $("textarea").val();

        if(confirm("수정하시겠습니까?")){
            $.ajax({
                type:"PUT",
                url:"http://13.125.149.206/api/feed/"+user_Idx,
                data : {
                    CONTENT:content
                },
                success:function(res){
                    alert("수정완료")
                    window.location.assign("/mainpage")
                    // console.log(res)
                },
                error:function(err){
                    alert("오류발생")
                }
                
        
            })
        


        }
    })


    //삭제버튼 api 호출

    $("#feedDelete").on("click",function(){
        if(confirm("삭제하시겠습니까?")){
            $.ajax({
                type:"DELETE",
                url:"http://13.125.149.206/api/feed/"+user_Idx,
       
                success:function(res){
                    alert("삭제완료")
                    window.location.assign("/mainpage")
                    // console.log(res)
                },
                error:function(err){
                    alert("오류발생")
                }
                
        
            })
        


        }
    })

})