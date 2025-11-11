import express from 'express';

const usersRouter = express.Router();

usersRouter.get('/', (request, response, next) => {
  response.status(200).send('전체 유저 정보 조회 완료');
}); // 특정 처리 앞에 미들웨어를 넣고 싶다면 그 처리 앞에 파라미터로 미들웨어를 넣으면 됨.

usersRouter.get('/users/:id', (request, response, next) => {
  response.status(200).send('유저 정보 조회 완료');
});

usersRouter.put('/users/:id', (request, response, next) => {
  response.status(200).send('유저 정보 수정 완료');
}); 

usersRouter.delete('/users/:id', (request, response, next) => {
  response.status(200).send('유저 정보 삭제 완료');
});

export default usersRouter;