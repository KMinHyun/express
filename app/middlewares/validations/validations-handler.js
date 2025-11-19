import { validationResult } from "express-validator";

export default function validatorHandler(request, response, next) {
  // validationResult(request) : request에 담긴 유효성 검사 결과중, 에러를 모아서 배열로 반환
  const errors = validationResult(request); // <= request의 validation에서 체크한 오류를 모아서 객체로 반환. 에러가 있으면 반환, 없으면 빈 객체.

  if(!errors.isEmpty()) {
    const customErrors = errors.formatWith(error => `${error.path}: ${error.msg}`);
    // 에러 시 표시할 항목 커스텀하기
    return response.status(400).send(customErrors.array());
  }
  
  next();
}