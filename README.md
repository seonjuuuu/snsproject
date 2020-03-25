# SNSPROJECT
## 페이지 구현
### 1. index (로그인) 페이지 구현

* 이메일 주소, 비밀번호 입력
* 서버에 저장된 session을 통해서 로그인 유지

### 2. /join (회원가입) 페이지 구현
    
* 닉네임
    * 빈칸일 경우 alert("닉네임을 입력해 주세요")
        

* 이메일 입력 
    * 이메일 정규식 사용
    * 이메일 형식이 아니면 alert("이메일이 형식에 맞지 않습니다")
    * 이메일 중복 alert("이메일 중복")
    * 빈칸일 경우 alert("이메일을 입력해 주세요") 
    
* 비밀번호
    * 최대 8글자 이상입력
    * 비밀번호 확인창과 일치 하지 않을 경우 alert("비밀번호 불일치")
    * 빈칸일 경우 alert("비밀번호를 입력해 주세요") 

* NEXT 버튼을 이용해 프로필사진/ 한줄자기소개 show
    
* 프로필 사진
    * 필수 입력사항 아님
    * jpg/png 선택 유도
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

* header 부분 프로필 클릭시 /profile 페이지 이동
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
* 좋아요 버튼/ 좋아요 갯수 ( 구현 예정 )
* 입력받은 댓글 (구현 예정)

### 6. /editinfo (회원정보수정) 페이지 구현

* 페이지 접속시 회원정보입력을 통해 받았던 닉네임, introduce, 사진값을 미리 보여준다
* 내용을 수정을 하면 수정된 값을 EDIT button을 통해 서버로 보내준다
* 수정시 비밀번호는 필수로 값을 입력 받는다
    * 비밀번호 미입력시 alert("비밀번호를 입력해주세요")
    * 비밀번호를 수정시 받지 않으면 , null값으로 서버로 보내져 오류 발생 - 필수입력값으로 해결
* 카메라 버튼 클릭시, 사진 입력 가능
* 탈퇴 button 클릭시 - 회원의 모든 정보 삭제

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
2. (/editinfo)회원정보수정페이지 삭제기능 추가
> 사진 선택 후 삭제버튼을 누르면 이전의 사진이 PATH값으로 저장되는 문제 발생
>   > ```    if(!src ){
       src=proimg;
    }else if( $("#proImg").attr('src')=='/img/not.png'){
        src='';
    }else {
        imgSrc=src.split("?");
        src=imgSrc[0];
    } ```
>   > else if구문 추가 src을 변환시켜서 ajax 호출하여 문제 해결










    

