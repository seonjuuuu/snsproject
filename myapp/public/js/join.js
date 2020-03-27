    
    $(document).ready(function(){
        var SRC=new Array;
       
       // 버튼 눌렀을때 감추고 보여주기

    //    $("#nextbtn").click(function(){
    
    //        $(".secondJoin").show() ;
    //        $(".firstJoin").hide();
           
    //    })


       $("#backbtn").click(function(){
    
           $(".secondJoin").hide() ;
           $(".firstJoin").show();
    
        })



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
       $("#email, #password").on("blur",function(e){
           var regex = /^[A-Za-z0-9]{8,20}$/;//숫자,영문자 8~20자리
           var regExpEm = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
           //d이메일 정규식
           var email = $("#email").val();
           var password  =$("#password").val();

           
           if(email && !regExpEm.test(email)){
               alert("이메일이 형식에 맞지 않습니다")
               $(this).val('');
               $("#email").val('');
               $("#email").focus();
               return;

           }
               
           if(password && password.length<8) {
               alert("비밀번호 숫자,영문자 최소 8자리 이상")
               $(this).val('');
               $("#password").val('');
               $("#password").focus();


           }


       })



       //등록창 오류확인
       $("#nextbtn").on("click", function (e) {
           var email = $("#email").val();
           var name = $("#name").val();
           var password = $("#password").val();
           

           if (!name) {
               alert("닉네임을 확인해 주세요")
               $("#name").focus();
               return; }
           
           else if (!email) {
               alert("이메일을 확인해 주세요")
               $("#email").focus();
               return;
           } 
           else if (!password) {
               alert("패스워드를 확인해 주세요")
               $("#password").focus();
               return;
           }                
             
           $.ajax({
            type:"GET",
            url:"http://13.125.149.206/api/user/duplicate/"+email,
        
            success:function(res){
                if( res.duplicateUser ){
                    alert("이메일 중복")
                    $("#email").focus();
                } else {
                    $(".secondJoin").show();
                    $(".firstJoin").hide();
                }
            },
      
        })
           
        


       })

       //API 호출 
       $("#joinbtn").on("click",function(e){
           var email = $("#email").val();
           var name = $("#name").val();
           var introduce=$("#introduce").val();
           var password= $("#password").val();
           var src = SRC.slice(-1)[0];
           var imgSrc;

         e.preventDefault();

         if(!src){
            src = null;
         }else{
             imgSrc=src.split("?");
             src=imgSrc[0];
         }

       if(confirm("정말 등록하시겠습니까?")){
                   $.ajax({
                       type:"POST",
                       url:"http://13.125.149.206/api/user",
                       data: {
                           EMAIL: email,
                           NAME: name,
                           INTRODUCE: introduce,
                           PASSWORD: password,
                           PATH:src,
                       },
                       success:function(res){
                        //    console.log(res)
                           alert("가입을 축하합니다")
                           window.location.assign('/')
                       },
                       error: function(err){
                           if(err.status === 409){
                               alert("이메일 중복")
                           }
                           else{
                            //    alert("등록 오류")
                            // console.log(err)
                           }
                       }
                   })
               }
        else {
            return false;
        }

       })

     



    //프로필 사진 미리보기


    function readURL(input) {
        if (input.files && input.files[0]) { //파일이 있으면
            var reader = new FileReader(); //파일을 읽는 객체를 생성
            reader.onload = function(e) { //파일 읽는것에 성공을 하면 e벤트 함수 실행
                $('#preImg').attr('src', e.target.result);
            } //id가 preImg인 div의 src에 타겟이벤트 결과값을 반환해 src에 넣어줘라
            reader.readAsDataURL(input.files[0]);//file내용을 읽어 dataURL형식의 문자열로 저장해라
        }
    }


  
    $("#joinprofile").change(function() { //input파일을 바꾸기를 실행할때 함수 실행
        readURL(this); //funtion실행
    
        // var selectedFile = null;
        // let extensionUrl=" ";

        
   
    //ajax방식

    // if(document.getElementById("joinprofile").files.length >= 1){
    //     selectedFile = document.getElementById("joinprofile").files[0];
    //     extensionUrl = "https://tutorial.team-everywhere.com/api/common/getExtension?type="+selectedFile.type
    //     $.ajax ({
    //         type: "GET",
    //         url:extensionUrl,
        
    //         success:function(s3res){
               
    //             console.log("1",s3res)
    //             // var data = res.data
    //             // console.log("33",data)
    //             const getUploadUrl = "https://tutorial.team-everywhere.com/api/common/fileUploadUrl?mimetype="+selectedFile.type+"&extension="+s3res.extension+"&fileName=test3"
    //             $.ajax({
    //                 type:"GET",
    //                 url:getUploadUrl,

    //                 success:function(res){
    //                     console.log("2",res.url)
    //                     $.ajax({
    //                         type:"PUT",
    //                         url: res.url,
    //                         data:selectedFile,
    //                         contentType: false,
    //                         processData: false,

    //                         success:function(res){
    //                             console.log("3",res)
    //                         }
    //                     })
    //                 }

    //             })
    //         }   
    //       })

          
    // }


    // //axios 방식
  
    if(document.getElementById("joinprofile").files.length >= 1){
        selectedFile = document.getElementById("joinprofile").files[0];
        // const extensionUrl = "http://127.0.0.1:4000/api/common/getExtension?type="+selectedFile.type
        const extensionUrl = "http://13.125.149.206/api/common/getExtension?type="+selectedFile.type
        // console.log(extensionUrl)
        
       

        axios.get(extensionUrl)
          .then(res => {      
              var data = res.data
            //   console.log("1 ", res);
              // const getUploadUrl = "http://127.0.0.1:4000/api/common/fileUploadUrl?mimetype="+selectedFile.type+"&extension="+data.extension+"&fileName=test2"
              const getUploadUrl = "http://13.125.149.206/api/common/fileUploadUrl?mimetype="+selectedFile.type+"&extension="+data.extension
              axios.get(getUploadUrl)
                .then(s3Res => {      
                    let signatureUrl = s3Res.data.url
                    // console.log("2 ", signatureUrl);                  
                    axios.put(signatureUrl, selectedFile, {                    
                    })            
                    .then(function (s3res,data)  {
                        // console.log("3 " ,s3res);
                        // var imgsrc =s3res.request.responseURL;
                        // console.log("4", s3res.request.responseURL)
                        var URL =s3res.request.responseURL
                        // var imgsrc = URL.split(",");
                      
                        SRC.push(URL)
                    });
                   
                });                        
          });
        
        } 
        // console.log(SRC)
        
    
        // $(".preImg").css("width","100%");
        // $(".preImg").css("object-fit","cover");
        // $("#preImg").css("display", "block"); //img를 보여줘라
        
        // $(".humenicon").css("display","none"); //이전에 있던 아이콘은 dispaly none해줘라
      
    })

    

//     let reader = new FileReader();

// reader.onload = (readerEvent) => {
//     document.querySelector("#preImg").setAttribute('src', readerEvent.target.result);
// };

// document.querySelector("#joinprofile").addEventListener("change", (changeEvent) => {

//     let imgFile = changeEvent.target.files[0];
//     reader.readAsDataURL(imgFile);
// });     // 공부해 보기 


//키버튼 제어 
$(document).keydown(function(e){
        if(event.keyCode == '116'){
            if(confirm("F5을 누르면 초기화됩니다")){
                return;
            }
            else{
                return false;
            }
        }
    })

   })

  
