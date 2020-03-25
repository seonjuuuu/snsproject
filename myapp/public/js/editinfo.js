    
    $(document).ready(function(){


        var SRC=new Array;
 
        //비밀번호 확인
 
        $("#repassword").on("blur",function(e){
            let password = $("#password").val();
            let repassword = $("#repassword").val();
 
            if (password !== repassword){
                alert("비밀번호가 불일치")
                $(this).val('');
                $("#password").val('');
                $("#password").focus();
                return;
            }
        })
 
        //비정규식 확인 , 형식확인
        $("#password").on("blur",function(e){
            var regex = /^[A-Za-z0-9]{8,20}$/;//숫자,영문자 8~20자리
            var password  =$("#password").val();
 

                
            if(password && password.length<8) {
                alert("비밀번호 숫자,영문자 최소 8자리 이상")
                $(this).val('');
                $("#password").val('');
                $("#password").focus();
 
 
            }
 
        })
 
 
 

 
 
    //프로필 사진 삭제버튼
     $("#delete").on("click",function(e){
        $("#proImg").attr('src','')
    })
    
  //프로필 사진 미리보기
     function readURL(input) {
         if (input.files && input.files[0]) { //파일이 있으면
             var reader = new FileReader(); //파일을 읽는 객체를 생성
             reader.onload = function(e) { //파일 읽는것에 성공을 하면 e벤트 함수 실행
                 $('#proImg').attr('src', e.target.result);
             } //id가 preImg인 div의 src에 타겟이벤트 결과값을 반환해 src에 넣어줘라
             reader.readAsDataURL(input.files[0]);//file내용을 읽어 dataURL형식의 문자열로 저장해라
         }
     }

 
     $("#joinprofile").change(function() { //input파일을 바꾸기를 실행할때 함수 실행
         readURL(this); //funtion실행

         if(document.getElementById("joinprofile").files.length >= 1){
            selectedFile = document.getElementById("joinprofile").files[0];
            // const extensionUrl = "http://127.0.0.1:4000/api/common/getExtension?type="+selectedFile.type
            const extensionUrl = "http://13.125.149.206/api/common/getExtension?type="+selectedFile.type
            // console.log(extensionUrl)
            
           
    
            axios.get(extensionUrl)
              .then(res => {      
                  var data = res.data
                  console.log("1 ", res);
                  // const getUploadUrl = "http://127.0.0.1:4000/api/common/fileUploadUrl?mimetype="+selectedFile.type+"&extension="+data.extension+"&fileName=test2"
                  const getUploadUrl = "http://13.125.149.206/api/common/fileUploadUrl?mimetype="+selectedFile.type+"&extension="+data.extension
                  axios.get(getUploadUrl)
                    .then(s3Res => {      
                        let signatureUrl = s3Res.data.url
                        console.log("2 ", signatureUrl);                  
                        axios.put(signatureUrl, selectedFile, {                    
                        })            
                        .then(function (s3res,data)  {
                            console.log("3 " ,s3res);
                            // var imgsrc =s3res.request.responseURL;
                            console.log("4", s3res.request.responseURL)
                            var URL =s3res.request.responseURL
                            // var imgsrc = URL.split(",");
                          
                            SRC.push(URL)
                        });
                       
                    });                        
              });
            
            } 
            console.log(SRC)
       
         // $(".preImg").css("width","100%");
         // $(".preImg").css("object-fit","cover");
        //  $("#proImg").css("display", "block"); //img를 보여줘라
         
        //  $(".humenicon").css("display","none"); //이전에 있던 아이콘은 dispaly none해줘라
       
     })
 
     
 
 //     let reader = new FileReader();
 
 // reader.onload = (readerEvent) => {
 //     document.querySelector("#preImg").setAttribute('src', readerEvent.target.result);
 // };
 
 // document.querySelector("#joinprofile").addEventListener("change", (changeEvent) => {
 
 //     let imgFile = changeEvent.target.files[0];
 //     reader.readAsDataURL(imgFile);
 // });     // 공부해 보기 
 


 //수정 ajax

$("#editbtn").on("click",function(e){
    let name = $("#name").val();
    let password=$("#password").val();
    let introduce = $("#introDuce").val();
    let proimg=$("#proImg").attr("src");
    var src = SRC.slice(-1)[0];
    var imgSrc;

    e.preventDefault();
    
    if (!name) {
        alert("닉네임을 확인해 주세요")
        $("#name").focus();
        return; }
    else if(!password) {
        alert("패스워드를 입력해 주세요")
        $("#password").focus();
        return;
    } 

// img클릭시 반환값이 없을때

    if(!src ){
       src=proimg;
    }else if( $("#proImg").attr('src')=='/img/not.png'){
        src='';
    }else {
        imgSrc=src.split("?");
        src=imgSrc[0];
    } 

    if(confirm("수정하시겠습니까?")){ 
        $.ajax({
            type:"PUT",
            url:"/edit",
            data: {
                NAME: name,
                PASSWORD:password,
                INTRODUCE:introduce,
                PATH:src,
            },
            success:function(res){
                if(res==="true"){
                    alert("수정완료")
                
                window.location.assign("/mainpage")
            
                }else if( res === "false"){
                    alert("수정실패")
               
                }
                else{}
            }
        })
       
    }

})


//탈퇴 ajax

$("#deletebtn").on("click",function(e){
 

    if(confirm("정말로 탈퇴하시겠습니까?")){ 
        $.ajax({
            type:"DELETE",
            url:"/deleteEdit",
    
            success:function(res){
                if(res==="true"){
                    alert("탈퇴되셨습니다")
                
                window.location.assign("/")
            
                }else if( res === "false"){
                    alert("에러발생")
               
                }
                else{}
            }
        })
       
    }

})


 
 //키버튼 제어 
 $(document).keydown(function(e){
         if(event.keyCode == '116'){
             if(confirm("입력한 정보는 초기화 됩니다")){
                 return;
             }
             else{
                 return false;
             }
         }
     })
 
    })
 
   
 