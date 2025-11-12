import express from 'express';
// import pool from '../db/my-db.js'; // 이름이 꼭 pool일 필욘 없음
import db from '../app/models/index.js';
const { sequelize, Employee } = db;

const usersRouter = express.Router();

usersRouter.get('/', (request, response, next) => {
  response.status(200).send('전체 유저 정보 조회 완료');
}); // 특정 처리 앞에 미들웨어를 넣고 싶다면 그 처리 앞에 파라미터로 미들웨어를 넣으면 됨.

usersRouter.get('/users/:id', async (request, response, next) => {
  try {
    const id = parseInt(request.params.id); // segment 파라미터는 문자열로 받아서 파싱해야함. 원랜 validation 처리에서 파싱해서 보내줌.
    
    // ------------------------------------
    // Sequelize로 DB 연동

      const result = await Employee.findByPk(id);
      return response.status(200).send(result);
    } catch(error) {
      next(error);
    }
    // ------------------------------------
    // mysql2로 DB 연동하는 방법

    // // 쿼리 작성(을 해서 DB한테 보내줘야 함)
    // const sql = `
    //   SELECT *
    //   FROM employees
    //   WHERE
    //     emp_id = ?
    // `;
    
    // const [result] = await pool.query(sql); // query메소드 : 작성한 쿼리 실행
    // // const [result] = await pool.execute(sql, [id]); <= prepared statement
    
    // return response.status(200).send(result);
    // ------------------------------------
  // } catch(error) {
  //   next(error);
  // }
});

usersRouter.put('/users/:id', (request, response, next) => {
  response.status(200).send('유저 정보 수정 완료');
}); 

usersRouter.delete('/users/:id', (request, response, next) => {
  response.status(200).send('유저 정보 삭제 완료');
});

export default usersRouter;