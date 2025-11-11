import express from 'express';
import loginValidator from '../app/middlewares/validations/validators/login.validator.js';
import validatorHandler from '../app/middlewares/validations/validations-handler.js';
import registrationValidtor from '../app/middlewares/validations/validators/registration.validtor.js';

const authRouter = express.Router(); // 라우터 객체 인스턴스를 반환(인스턴스 = 라우터 객체를 메모리에 올려둔 상태)

authRouter.post('/api/login', loginValidator, validatorHandler, (request, response, next) => {
  response.status(200).send('로그인 성공');
});

authRouter.post('/api/registration', registrationValidtor, validatorHandler, (request, response, next) => {
  response.status(200).send('회원가입 성공');
});

// 라우터 정의 .....

export default authRouter;