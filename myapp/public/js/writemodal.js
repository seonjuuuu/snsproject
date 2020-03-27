$(document).ready(function () {

            var SRC = new Array;

            function readURL(input) {
                if (input.files && input.files[0]) { //파일이 있으면
                    var reader = new FileReader(); //파일을 읽는 객체를 생성
                    reader.onload = function (e) { //파일 읽는것에 성공을 하면 e벤트 함수 실행
                        $('#feedUpImg').attr('src', e.target.result);
                    } //id가 preImg인 div의 src에 타겟이벤트 결과값을 반환해 src에 넣어줘라
                    reader.readAsDataURL(input.files[0]); //file내용을 읽어 dataURL형식의 문자열로 저장해라
                }
            }


            $("#feedupfile").change(function () { //input파일을 바꾸기를 실행할때 함수 실행
                readURL(this); //funtion실행

                if (document.getElementById("feedupfile").files.length >= 1) {
                    selectedFile = document.getElementById("feedupfile").files[0];
                    // const extensionUrl = "http://127.0.0.1:4000/api/common/getExtension?type="+selectedFile.type
                    const extensionUrl = "http://13.125.149.206/api/common/getExtension?type=" + selectedFile.type
                    // console.log(extensionUrl)



                    axios.get(extensionUrl)
                        .then(res => {
                            var data = res.data
                            // console.log("1 ", res);
                            // const getUploadUrl = "http://127.0.0.1:4000/api/common/fileUploadUrl?mimetype="+selectedFile.type+"&extension="+data.extension+"&fileName=test2"
                            const getUploadUrl = "http://13.125.149.206/api/common/fileUploadUrl?mimetype=" + selectedFile.type + "&extension=" + data.extension
                            axios.get(getUploadUrl)
                                .then(s3Res => {
                                    let signatureUrl = s3Res.data.url
                                    // console.log("2 ", signatureUrl);
                                    axios.put(signatureUrl, selectedFile, {})
                                        .then(function (s3res, data) {
                                            // console.log("3 ", s3res);
                                            // var imgsrc =s3res.request.responseURL;
                                            // console.log("4", s3res.request.responseURL)
                                            var URL = s3res.request.responseURL
                                            // var imgsrc = URL.split(",");

                                            SRC.push(URL)
                                        });

                                });
                        });

                }
                // console.log(SRC)



            })


            $('#feedupbtn').on("click", function (e) {

                let content = $("#feedcontent").val();
                let feedimg=$("#feedUpImg").attr("src");
                var src = SRC.slice(-1)[0];
               


                if (feedimg==="/img/feedup.png" ) {
                    alert("사진을 빼먹었어요!!")
                   $("#content").focus();
                   return;
                }
                // console.log()

                if (confirm("피드를 등록할까요?")) {

                    var imgSrc = src.split("?");
                    src = imgSrc[0]
                    e.preventDefault();
                    
                    $.ajax({
                        type: "POST",
                        url: "/mainpage/feedwrite",
                        data: {
                            CONTENT: content,
                            PATH: src
                        },
                        
                        success:function(res){
                            // console.log("data____",res)
                            if(res==="true"){
                                alert("피드등록 성공")
                                  
                                 window.location.assign("/mainpage")
                            } else if( res === "false"){
                                alert("피드등록 실패")
                            }
                            
                        }
                    })
                }





            })







})