import express from 'express'; // express 모듈을 가져옴
import authRouter from './routes/auth.router.js';
import usersRouter from './routes/users.router.js';
import { eduTest, eduUsersTest } from './app/middlewares/edu/edu.middleware.js';

const app = express(); // express란 객체를 app에 담음
app.use(express.json()); // 라우트 정의하기 직전에 전체 라우트에서 사용될 미들웨어를 세팅함
// ⇈ JSON으로 요청이 올 때 파싱처리를 해주는 미들웨어
app.use(eduTest); // 커스텀 미들웨어 전역 등록

// 클라이언트가 '/' 경로로 GET 요청을 보낼 때 실행되는 Router
app.get('/api/hi', (request, response, next) => { // 유저가 보낸 요청 중 http메소드가 get인 거를 가져옴. 그리고 경로가 '/'. 두번째 파라미터에 어떤 처리를 할지.
  // request = 유저가 보낸 요청에 대한 모든 정보. Express가 자동으로 만들어줌.
  // response = 우리가 유저한테 줄 정보.
  // next = 미들웨어가 실행되고 나서 다음 처리로 이동할 때 사용되는 next함수.
  response.status(200).send('안녕 익스프레스!!');
});

// 클라이언트가 '/' 경로로 POST 요청을 보낼 때 실행되는 Router
app.post('/api/hi', (request, response, next) => {
  response.status(200).send('포스트 익스프레스!');
});

// 클라이언트가 '/' 경로로 PUT 요청을 보낼 때 실행되는 Router
app.put('/api/hi', (request, response, next) => {
  response.status(200).send('풋 익스프레스!');
});

// 클라이언트가 '/' 경로로 DELETE 요청을 보낼 때 실행되는 Router
app.delete('/api/hi', (request, response, next) => {
  response.status(200).send('딜리트 익스프레스!');
});

// ------------------
// Query Parameter 제어(유저가 쿼리 파라미터로 보냈을 때)
// Request객체의 query 파라미터를 통해 접근이 가능하다.
// 모든 값을 String으로 받기 때문에 주의해야 함.
app.get('/api/posts', (request, response, next) => {
  const params = request.query;
  const name = request.query.name;
  const age = parseInt(request.query.age);
  response.status(200).send(params);
});

// Segment Parameter( :id = 받는 입장에서 변수를 지정)
// request.params를 통해 접근 가능. params에 정보가 다 담김.
app.get('/api/posts/:id', (request, response, next) => {
  const postsId = request.params.id;
  response.status(200).send(postsId);
});

// JSON 요청 제어
// `request.body`를 통해서 접근 가능(** express.json() 미들웨어 추가 필요 **)
app.post('/api/posts', (request, response, next) => {
  const data = request.body;
  // const {account, password, name} = request.body; <= destructuring 방법
  // response.status(200).send({account, password, name});
  // const account = request.body.account; <= 하나하나 받기
  response.status(200).send(data);
});

// -------------------
// 라우트 그룹
// => 라우트를 모듈로 나누고 그룹핑하여 관리함
app.use(authRouter);
// app.use('/api', authRouter); <= 여기에 쓰인 경로는 authRouter에서 공통적으로 붙는 경로를 빼서 쓰는 것. 해당 라우터에는 여기서 적힌 부분을 빼면 됨.
app.use('/api', eduUsersTest, usersRouter);
// -------------------

// 대체 라우트(모든 라우터 중에 가장 마지막에 작성)
app.use((request, response, next) => { // use를 쓰면 모든 경로를 다 받음.
  response.status(404).send('찾을 수 없는 페이지입니다.');
  // response.status(404).send({
  //   code: 'E01',
  //   msg: '찾을 수 없는 페이지입니다.'
  // });
});

// listen메소드 : 서버를 주어진 포트에서 시작할 수 있게 만들어줌.
app.listen(3000, () => {
  // 서버가 켜질 때 처리되어야 하는 게 있다면 콜백함수를 적고 없으면 비우기.
  console.log('3000포트에서 리스닝');
});