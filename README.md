# SNS PROJECT - "TOCTOC"
## 페이지 구현
### 1. index (로그인) 페이지 구현

<img src="https://user-images.githubusercontent.com/62421526/78464782-67acda80-7728-11ea-936b-895d03cc1bf5.PNG" width="500px">


* 이메일 주소, 비밀번호 입력
```javascript
      $(document).ready(function(){
        $("#loginbtn").on("click", function (e) {
        e.preventDefault();
        var email = $("#email").val();
        var password = $("#password").val()          
          if(confirm("로그인하시겠습니까?")){
            $.ajax ({
              type: "POST",
              url:"/login",
              data:{
                EMAIL: email,
                PASSWORD: password
              },              
              success:function(res){
                if(res ==="true"){
                  alert("로그인 성공");
                window.location.assign("/mainpage")
                } else if ( res === "false"){ alert("로그인 실패")}
                else {}
              }
            })         
          }
        })
      })
 ```

* 서버에 저장된 session을 통해서 로그인 유지

```javascript

  request.post(url, {
      json: data
  }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
       
        let loginUser= response.body.login
        
        req.session.IDX = loginUser.IDX;
        req.session.EMAIL = loginUser.EMAIL;
        req.session.NAME = loginUser.NAME;
        req.session.INTRODUCE = loginUser.INTRODUCE;
        req.session.PATH= loginUser.PATH;
        
        res.send("true")
      } else {
          res.send("false")
      }
    
  });
  ```
  * 세션을 통해서 로그인 유지 / 세션이 없다면 메인페이지 이동
  ```javascript
  if(!req.session.IDX){
  res.redirect('/');
  return;
}
```

### 2. /join (회원가입) 페이지 구현
<img src="https://user-images.githubusercontent.com/62421526/78465034-a55f3280-772b-11ea-985f-c57c4cb812e7.PNG" width="400px" height="300px"> <img src="https://user-images.githubusercontent.com/62421526/78465035-a6905f80-772b-11ea-88d8-8148c33bb163.PNG" width="400px" height="300px">
    
* 닉네임

    * 빈칸일 경우
    ```javascript
    if (!name) {
               alert("닉네임을 확인해 주세요")
               $("#name").focus();
               return; }
           
    ```
    * 이메일 입력 
    * 이메일 정규식 사용
    ```javascript
      var regExpEm = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    ```
    * 이메일 형식확인
    ```javascript
      if(email && !regExpEm.test(email)){
               alert("이메일이 형식에 맞지 않습니다")
               $(this).val('');
               $("#email").val('');
               $("#email").focus();
               return;

           }
    ```
    * 이메일 중복 
    ```javascript
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
    ```
    * 빈칸일 경우  
    ```javascript
    if (!email) {
               alert("이메일을 확인해 주세요")
               $("#email").focus();
               return;
           } 
    ```
    
* 비밀번호
    * 최대 8글자 이상입력
      ```javascript
      if(password && password.length<8) {
               alert("비밀번호 숫자,영문자 최소 8자리 이상")
               $(this).val('');
               $("#password").val('');
               $("#password").focus();


           }
       ```
   * 비밀번호 확인창과 일치 하지 않을 경우 
       ```javascript
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
      ```
  * 빈칸일 경우 
      ```javascript
       if (!password) {
               alert("패스워드를 확인해 주세요")
               $("#password").focus();
               return;
                 }               
       ```

* NEXT 버튼을 이용해 프로필사진/ 한줄자기소개 show
```
 $(".firstJoin").hide();
 $(".secondJoin").show();
                   
```
    
* 프로필 사진
    * 필수 입력사항 아님
    ```javascript
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
      //서버에 저장하는 방식이 아니라 input type =file 의 파일 업로드 형식을 미리보기로 보여준다
      
      //서버에 저장하는 방식은 s3에 저장함 axios 호출사용
          if(document.getElementById("joinprofile").files.length >= 1){
        selectedFile = document.getElementById("joinprofile").files[0];
        const extensionUrl = "http://13.125.149.206/api/common/getExtension?type="+selectedFile.type     
        axios.get(extensionUrl) //처음 데이터의 extension을 가져오는 호출을 실행
          .then(res => {      
              var data = res.data
              const getUploadUrl = "http://13.125.149.206/api/common/fileUploadUrl?mimetype="+selectedFile.type+"&extension="+data.extension
              axios.get(getUploadUrl)//서버로 올릴 주소를 받아옴
                .then(s3Res => {      
                    let signatureUrl = s3Res.data.url
               
                    axios.put(signatureUrl, selectedFile, {                    
                    })            //서버에 올릴 주소와 함께 data를 함께 put함
                    .then(function (s3res,data)  {
                        var URL =s3res.request.responseURL
                        SRC.push(URL)
                    });
                   
                });                        
          });
        
        }
    ```

* 한줄 자기소개
    * Introduce 
    * 필수 입력 사항 아님


### 3. /mainpage(첫화면) 구현

<img src="https://user-images.githubusercontent.com/62421526/78465577-5bc61600-7732-11ea-8ac3-60e5e8a03104.PNG" width="600px" height="500px"> 

* 사이트 저장된 모든 피드 21개씩 paging


<img src="https://user-images.githubusercontent.com/62421526/78465587-8f08a500-7732-11ea-91a0-5db889ea3695.PNG" width="400px" height="300px">

```javascript

  let pageNum=1;
  getUserFeed(pageNum);

  function getUserFeed(pageNum){
    $(".box").empty();
    var limit = 21 ;
    $.ajax({
      type:"GET",
      url:"http://13.125.149.206/api/feed",
      success:function(res){
      var pageCnt = Math.ceil(res.result.length/limit);
      for (let i = (res.result.length-1)-(pageNum-1)*limit; i>(res.result.length-1)-(pageNum*limit); --i){
         
      var html = "<div class = 'feedbox'><a href='/mainpage/feed?IDX="+res.result[i].IDX+"'><img id=myfeed src ="+res.result[i].PATH+"></a></div>"
      
          if(res.result[i].PATH==null) { //피드이미지가 없을경우 대체이미지를 보여준다

            var html="<div class='feedbox'><img id=myfeed src='/img/nothing.png'></div>"        
          }
          
          $('.box').append(html)

        }
        getPagingBtn(pageCnt);
      }
    })
  }

//피드 페이징 버튼 생성

  function getPagingBtn (pageCnt) {
    $('.paging').empty();
    for (let i =0; i < pageCnt; i++) {
        let cnt = i + 1;
        let prev = '<div class="direction prev">이전</div>'
        let pBtn = '<div class="pBtn ">'+cnt+'</div>'
        let next = '<div class="direction next">다음</div>'

        if (i == 0) {
            $('.paging').append(prev);
            $('.paging').append(pBtn);
            $('.pBtn').addClass("strong");
        } else if (i == pageCnt - 1) {
            $('.paging').append(pBtn);
            $('.paging').append(next);
        } else {
            $('.paging').append(pBtn);
        }
    }

    $('.prev').on('click', function(e) {
        // alert(pageNum)
        if (pageNum == 1) {
            alert('이전 페이지가 없습니다')
        } else {
            pageNum = pageNum - 1;
        }
        
        getUserFeed(pageNum)
    })

    $('.pBtn').on('click', function(e) {
      var num = $(this).text()
      // console.log(num)
      pageNum = num;      
      $('.pBtn').removeClass('strong')         
      $(this).addClass('strong')
      getUserFeed(pageNum)
  })

    $('.next').on('click', function(e) {
        if (pageNum == pageCnt) {
            alert('다음 페이지가 없습니다')
        } else {
            pageNum = pageNum*1 + 1;
            $('.pBtn').removeClass('strong') ;
            $('.pBtn').next('.pBtn').addClass('strong') 

            getUserFeed(pageNum)
        }
    })
}

```

* 텍스트 애니메이션 효과
* feed click 시 feed 상세 페이지로 이동

<img src="https://user-images.githubusercontent.com/62421526/78465598-be1f1680-7732-11ea-92b1-ae9aaabbf4b8.PNG" width="400px" height="300px">

* write button 클릭시 feedwrite modal 창을 보여준다

<img src="https://user-images.githubusercontent.com/62421526/78465609-f6bef000-7732-11ea-9e47-cff8184234d6.PNG" width="400px" height="300px">

      * 현재 로그인 된 사용자 사진과 닉네임을 보여준다 ("(사용자닉네임)님 당신의 이야기를 보여주세요")
      * 사진 입력 - 사진 미리보기 가능
      * textarea를 통해서 feedcontent 입력
      * submit으로 ajax를 이용해 서버에 POST후 /profile 이동. 
      * X 버튼을 누르면 feedwrite 창을 hidden 시킨다

* hambuger menu 버튼

<img src="https://user-images.githubusercontent.com/62421526/78465676-9a100500-7733-11ea-8db3-ad685d085aeb.PNG" width="400px" height="300px">


      * input type = button 과 label을 이용해서 버튼 생성 , 클릭시 nav메뉴 show 
      * 현재 로그인된 사용자 이름을 보여준다 
      * HOME button - /mainpage 이동
      * 회원정보 button - /editinfo  이동
      * 이용약관 button - /mainpage/service 이동
      * 개인정보 취급방침 button - /mainpage/sns 이동
      * 로그아웃 button - session 삭제, index로 이동

* 현재 로그인된 사용자 프로필 사진
<img src="https://user-images.githubusercontent.com/62421526/78465703-01c65000-7734-11ea-9f99-2f87e5e0b831.PNG" width="400px" height="300px">

    * click 시 /profile 이동
    * 내가 작성한 feed sort

* 로고 클릭시 /mainpge 이동

* session이 없을 경우 index페이지로 이동 
```javascript
   router.get('/logout', function(req, res, next) {
   req.session.destroy();
    res.redirect('/') 
   });
   ```

### 4. /feedprofile (User의 상세)  페이지 구현

<img src="https://user-images.githubusercontent.com/62421526/78466725-908c9a00-773f-11ea-9066-48436a64f308.PNG" width="400px" height="300px"> <img src="https://user-images.githubusercontent.com/62421526/78465703-01c65000-7734-11ea-9f99-2f87e5e0b831.PNG" width="400px" height="300px">

* header 부분 프로필 클릭시 /feedprofile 페이지 이동
* 클릭한 프로필 user가 작성한 feed를 모아서 볼수 있다.
* 프로필 편집 button 클릭시 /editinfo 페이지 이동 



   * IDX가 session.IDX와 일치시만 버튼생성
    
    ```javascript
        var loginUser_Idx= $(".feedidx").html(); //프로필클릭한 유저의 idx
        var feedUser_Idx= $(".loginidx").html(); //현재 로그인유저의 session.IDX
 
        if(loginUser_Idx !== feedUser_Idx){
    
            $(".feedPlusbox").css("display","none");
            $(".useredit").css("display","none");
    
        }
    ```
* 사용자의 프로필 ( 사진, 닉네임, e-maill, introduce ) 나타냄 
    * 회원정보 수정하면 반영되어 나타남

* 프로필 사진 클릭시 프로필 사진 확대

<img src="https://user-images.githubusercontent.com/62421526/78465814-325ab980-7735-11ea-9ad1-6b70b20dac9c.PNG" width="300px" height="300px">

* feed click 시 피드 상세페이지 이동 
* '+ button' click 시 feedwrite modal창 show

<img src="https://user-images.githubusercontent.com/62421526/78465837-7c439f80-7735-11ea-9d44-88e04598144b.PNG" width="300px" height="300px">

    * 프로필 클릭 IDX = session.IDX 가 일치할때만 버튼 생성


### 5. /feed (피드상세) 페이지 구현

<img src="https://user-images.githubusercontent.com/62421526/78465598-be1f1680-7732-11ea-92b1-ae9aaabbf4b8.PNG" width="600px" height="500px">

* 피드사진 , 피드작성자의 name, 피드작성자의 photo , feed content , 댓글
    * 쿼리스트링을 이용해 feed IDX값을 받아와 api를 호출, result를 화면에 보여준다
    ```javascript
      
      //feed?IDX=(idx) 피드idx값을 부여해 가져오는 
      
      function getUrlParams() {
      var params = {};
      window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
      params[key] = value;
      });
      return params;
      }
    ```
<img src="https://user-images.githubusercontent.com/62421526/78466275-4523bd00-773a-11ea-8a63-95332a65a1ec.PNG" width="400px">

```
* 댓글 입력창에 로그인된 user의 photo를 보여준다.
* 댓글 input창을 통해 value값을 입력받아 ajax POST를 보내 댓글을 서버로 보내준다.
```

```javascript
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
```
<img src="https://user-images.githubusercontent.com/62421526/78466216-a0a17b00-7739-11ea-8a18-5c75362e797f.PNG" width="600px">

```
* 좋아요 버튼/ 좋아요 갯수
* 피드가 현재 로그인한 유저와 같으면 피드를 수정할수 있는 아이콘 생성
```

* 댓글 수정 및 삭제
<img src="https://user-images.githubusercontent.com/62421526/78466292-73090180-773a-11ea-95e0-0c7a27c6e9b9.PNG" width="600px">

```
* 내가쓴 댓글은 수정.삭제 버튼 생성
* 수정버튼을 누르면 input창 생성
```

### 6. /editinfo (회원정보수정) 페이지 구현

<img src="https://user-images.githubusercontent.com/62421526/78466358-3093f480-773b-11ea-817a-626b7d3772ef.PNG" width="600px" heigth="400">


* 페이지 접속시 회원정보입력을 통해 받았던 닉네임, introduce, 사진값을 미리 보여준다
* 내용을 수정을 하면 수정된 값을 EDIT button을 통해 서버로 보내준다
* 수정시 비밀번호는 필수로 값을 입력 받는다
* 카메라 버튼 클릭시, 사진 입력 가능
* 휴지통 버튼 클릭시, 이미지 삭제 가능
```javascript
    //프로필 사진 삭제버튼
     $("#delete").on("click",function(e){
        $("#proImg").attr('src','')
    })
```
* 탈퇴 button 클릭시 - 회원의 모든 정보 삭제

```javascript
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
```

### 7. /feededit (피드 수정)페이지 구현

<img src="https://user-images.githubusercontent.com/62421526/78466423-ed865100-773b-11ea-8cf6-ffada499bf1c.PNG" width="600px" heigth="400">

* 내가쓴 피드는 피드수정버튼 
* 피드의 사진값, 유저의 프로필을 뿌려준다.
* textarea로 글씨 수정할수 있는 수정페이지를 바꿔준다.
* 수정버튼 / 삭제 버튼 활성화 시킨다

## 반응형페이지 작업

<img src="https://user-images.githubusercontent.com/62421526/78467544-da2db280-7748-11ea-9d3a-3319ec3ab27e.PNG" width="300px" height="432px"> <img src="https://user-images.githubusercontent.com/62421526/78467546-db5edf80-7748-11ea-8c5a-fefe1c363bfb.PNG" width="300px" height="432px">
<img src="https://user-images.githubusercontent.com/62421526/78467545-dac64900-7748-11ea-8253-2e9cc8ba1548.PNG" width="300px" height="432px" > <img src="https://user-images.githubusercontent.com/62421526/78467549-dbf77600-7748-11ea-8661-22d6b2468037.PNG" width="300px" height="432px">
<img src="https://user-images.githubusercontent.com/62421526/78467550-dc900c80-7748-11ea-813f-9b869db7114e.PNG" width="300px" height="432px"> <img src="https://user-images.githubusercontent.com/62421526/78467542-d9951c00-7748-11ea-9849-f9b2af05040b.PNG" width="300px" height="432px">
<img src="https://user-images.githubusercontent.com/62421526/78467547-db5edf80-7748-11ea-89f2-2b64feaadeeb.PNG" width="300px" height="432px"> <img src="https://user-images.githubusercontent.com/62421526/78467551-dc900c80-7748-11ea-9f65-e5bd8777da37.PNG" width="300px" height="432px">


## 문제 해결

### 피드 상세페이지 (/feed)에서 textarea로 입력받은 값을 호출해서 data를 보여줬을때 엔터는 먹지 않음
 * ajax값을 먼저 호출한후 값을 div에 넣어 보여준뒤 그 val값을 replace한다 . val값이 자체가 존재하지 않기 때문에 바뀌지 않음 
 
 > 받아온 데이터 값에 \n값을 replace해 </br>로 바꿔 문제해결
 
 
 ```
 $("content).html(feedUserContent.replace(/\n\g,'</br>'))
 ```

### (/editinfo)회원정보수정페이지 삭제기능 추가

* 사진 선택 후 삭제버튼을 누르면 이전의 사진이 PATH값으로 저장되는 문제 발생

> 
```    
    if(!src ){
       src=proimg;
    }else if( $("#proImg").attr('src')=='/img/not.png'){
        src='';
    }else {
        imgSrc=src.split("?");
        src=imgSrc[0];
    } 
```
else if구문 추가 src을 변환시켜서 이미지값을 not.png로 넣고 이미지값이 있다면 호출한값의 주소를 넣어 문제 해결

### 좋아요/ 좋아요 취소 버튼 추가 및 기능 생성

* 좋아요 클릭시 api post 호출 , feedlike 값 증가 시킴

> 문제점 : 피드 좋아요를 클릭 후에 피드를 다시 새로고침 하면 좋아요 기능 다시 활성화 - 서버에서 데이터 저장이 안되기 때문에 나타낼수 없음


### 피드 수정/삭제 페이지 작업

> 피드 수정은 본인 게시물만 수정할 수 있도록 로그인 유저와 피드 작성 유저를 비교하여 같을 경우에만 수정버튼이 보이도록 설정

```

            if(feedUserIdx==idx){
                $("#feededitbtn").css("display","inline");
            }
```



### 댓글의 idx값과 user의 idx값을 가져오기

> 댓글의 idx값을 불러오기 위해서 제이쿼리로 클릭했을때 그 클릭한 값의 val값을 가져옴. id값을 처음에 부여해 한가지 값만 계속 반환되었음
name으로 처리해 , 클릭한 값 데이터를 가져옴




















    

