# SNSPROJECT
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

* 한줄 자기소개
    * Introduce 
    * 필수 입력 사항 아님


### 3. /mainpage(첫화면) 구현

* 사이트 저장된 모든 피드 6개씩 paging

* feed click 시 feed 상세 페이지로 이동

* write button 클릭시 feedwrite modal 창을 보여준다
    * 현재 로그인 된 사용자 사진과 닉네임을 보여준다 ("(사용자닉네임)님 당신의 이야기를 보여주세요")
    * 사진 입력 - 사진 미리보기 가능
    * textarea를 통해서 feedcontent 입력
    * submit으로 ajax를 이용해 서버에 POST후 /profile 이동. 
    * X 버튼을 누르면 feedwrite 창을 hidden 시킨다

* hambuger menu 버튼

    * input type = button 과 label을 이용해서 버튼 생성 , 클릭시 nav메뉴 show 
    * 현재 로그인된 사용자 이름을 보여준다 
    * HOME button - /mainpage 이동
    * 회원정보 button - /editinfo  이동
    * 이용약관 button - /mainpage/service 이동
    * 개인정보 취급방침 button - /mainpage/sns 이동
    * 로그아웃 button - session 삭제, index로 이동

* 현재 로그인된 사용자 프로필 사진
    * click 시 /profile 이동
    * 내가 작성한 feed sort

* 로고 클릭시 /mainpge 이동

* session이 없을 경우 index페이지로 이동 

### 4. /feedprofile (User의 상세)  페이지 구현

* header 부분 프로필 클릭시 /feedprofile 페이지 이동
* 클릭한 프로필 user가 작성한 feed를 모아서 볼수 있다.
* 프로필 편집 button 클릭시 /editinfo 페이지 이동 
    * IDX가 session.IDX와 일치시만 버튼생성
* 사용자의 프로필 ( 사진, 닉네임, e-maill, introduce ) 나타냄 
    * 회원정보 수정하면 반영되어 나타남
* 프로필 사진 클릭시 프로필 사진 확대
* feed click 시 피드 상세페이지 이동 
* '+ button' click 시 feedwrite modal창 show
    * 프로필 클릭 IDX = session.IDX 가 일치할때만 버튼 생성
    * 현재 로그인 된 사용자 사진과 닉네임을 보여준다 ("(사용자닉네임)님 당신의 이야기를 보여주세요")
    * 사진 입력 - 사진 미리보기 가능
    * textarea를 통해서 feedcontent 입력
    * submit으로 ajax를 이용해 서버에 POST후 /profile 이동. 
    * X 버튼을 누르면 feedwrite 창을 hidden 시킨다

### 5. /feed (피드상세) 페이지 구현

* 사진 , 피드작성자의 name, 피드작성자의 photo , feed content , 댓글 확인 가능 
    * 쿼리스트링을 이용해 feed IDX값을 받아와 api를 호출해 result값을 받아와 화면에 보여준다 
* 댓글 입력창에 로그인된 user의 photo를 보여준다.
* 댓글 input창을 통해 value값을 입력받아 ajax POST를 보내 댓글을 서버로 보내준다.
* 좋아요 버튼/ 좋아요 갯수 
* 입력받은 댓글

### 6. /editinfo (회원정보수정) 페이지 구현

* 페이지 접속시 회원정보입력을 통해 받았던 닉네임, introduce, 사진값을 미리 보여준다
* 내용을 수정을 하면 수정된 값을 EDIT button을 통해 서버로 보내준다
* 수정시 비밀번호는 필수로 값을 입력 받는다
    * 비밀번호 미입력시 alert("비밀번호를 입력해주세요")
    * 비밀번호를 수정시 받지 않으면 , null값으로 서버로 보내져 오류 발생 - 필수입력값으로 해결
* 카메라 버튼 클릭시, 사진 입력 가능
* 탈퇴 button 클릭시 - 회원의 모든 정보 삭제

### 7. /feededit (피드 수정)페이지 구현

* 피드의 사진값, 유저의 프로필을 뿌려준다.
* textarea로 글씨 수정할수 있는 수정페이지를 바꿔준다.
* 수정버튼 / 삭제 버튼 활성화 시킨다

### 8. 댓글창 구현

* 댓글을 입력했을때 현재 로그인한 유저와 댓글 입력한 유저의 값이 같으면 수정, 삭제 버튼을 보여준다
* 수정버튼을 눌렀을때 input창을 보여준다
* input창을 없애기 위해서 댓글수정취소버튼을 누르면 현재페이지가 리로드 된다

## 문제 해결
### 2020-03-25
  1. profile 페이지 업그레이드
   > 프로필 클릭시 로그인했던 가입자만 볼수있던 상세페이지를 모든 user의 프로필 클릭시 확인할 수 있도록 업그레이드

   > 로그인한 사용자가 본인의 프로필 사진을 클릭했을 시 프로필편집 button + feedwrite modal창까지 함께 볼수 있음

   > header에 IDX값을 hidden으로 넣어 , 주소값의 쿼리스트링값과 비교하여 같다면 button구현
 2. 피드 상세페이지 (/feed)에서 textarea로 입력받은 값을 호출해서 data를 보여줬을때 엔터는 먹지 않음
 > ajax값을 먼저 호출한후 값을 div에 넣어 보여준뒤 그 val값을 replace한다
 >  > val값이 자체가 존재하지 않기 때문에 바뀌지 않는다 
 > 받아온 데이터 값에 \n값을 replace해 </br>로 바꾼다
    > $("content).html(feedUserContent.replace(/\n\g,'</br>'))

### 2020-03-26
1. (/mainpage)메인페이지 피드 페이징 수정
> 데이터값을 역순으로 보일수 있게 자바스크립트 처리
```
 for (let i = (res.result.length-1)-(pageNum-1)*limit; i>(res.result.length-1)-(pageNum*limit); --i){
         
          var html = "<div class = 'feedbox'><a href='/mainpage/feed?IDX="+res.result[i].IDX+"'><img id=myfeed src ="+res.result[i].PATH+"></a></div>"
        
```
> 피드 30개가 넘어가면 페이징 버튼 생성
2. (/editinfo)회원정보수정페이지 삭제기능 추가
> 사진 선택 후 삭제버튼을 누르면 이전의 사진이 PATH값으로 저장되는 문제 발생
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
>   > else if구문 추가 src을 변환시켜서 ajax 호출하여 문제 해결

### 2020-03-27
1. 좋아요/ 좋아요 취소 버튼 추가 및 기능 생성
> 좋아요 클릭시 api post 호출 , feedlike 값 증가 시킴
> feed의 IDX값은 피드리스트 호출 주소를 통해 불러옴 , 현재 로그인한 유저IDX값은 피드에  ejs값을 가져와 hidden시킨후 그값을 이용함
> 문제점 : 피드 좋아요를 클릭 후에 피드를 다시 새로고침 하면 좋아요 기능 다시 활성화

2. 메인페이지 애니메이션 효과 추가

3. 반응형페이지 작업 완료
> 모든 페이지를 반응형으로 나오도록 작업

4. 피드 수정/삭제 페이지 작업
> 피드 수정은 본인 게시물만 수정할 수 있도록 로그인 유저와 피드 작성 유저를 비교하여 같을 경우에만 수정버튼이 보이도록 설정
```

            if(feedUserIdx==idx){
                $("#feededitbtn").css("display","inline");
            }
```
### 2020-03-28

1. 댓글 데이터 api 호출 
> 현재 서버상에 댓글을 작성한 USER_IDX가 저장이 되지않아 사진과 닉네임을 불러오는데 문제가 발생



### 2020-04-02

1. 댓글의 idx값과 user의 idx값을 가져오는데 성공
> 댓글의 idx값을 불러오기 위해서 제이쿼리로 클릭했을때 그 클릭한 값의 val값을 가져옴. id값을 처음에 부여해 한가지 값만 계속 반환되었음
name으로 처리해 , 클릭한 값 데이터를 가져옴

2. 


















    

