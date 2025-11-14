import express from 'express';
import db from '../app/models/index.js';
import { Op } from 'sequelize';
import dayjs from 'dayjs';

const  { sequelize, Employee, TitleEmp, Title } = db;

const eduRouter = express.Router();

eduRouter.get('/api/edu', async (request, response, next) => {
  try {
    // const fireDate = request.query.date;
    let result = null;

// // ---------------------------------------
//     // 평문(모델 이용 안 함)으로 실행하고 싶을 경우
//     const sql = `SELECT * FROM employees WHERE fire_at >= ?`; // ? = 나중에 설정한단 뜻
//     result = await sequelize.query(
//       sql,
//       { // ?에 들어갈 값
//         replacements: [fireDate],
//         type: sequelize.QueryTypes.SELECT
//       }
//     );
    
    // ---------------------------
    // Model 메소드(쿼리 실행 메소드)
      // findAll(options) : 전체 조회 
        // SELECT * FROM employees;
        // result = await Employee.findAll({
        //   attributes: ['empId', 'name', 'birth'], // attribute : 조회할 컬럼 지정(SELECT)절. []안에 출력하고 싶은 컬럼명을 쓰면 되는데 모델에서 설정해둔 이름으로 쓰면 됨.
        //   where: {
        //     empId: {
        //       [Op.lte]: 100 // = emp_id <= 100
        //       // [Op.between]: [50, 100] = emp_id BETWEEN 50 AND 100
        //     }
        //   }
        // });

      // findOne(options) : 조건에 맞는 첫번째 레코드 조회
        //   result = await Employee.findOne({
        //   attributes: ['empId', 'name', 'birth'],
        //   where: {
        //     empId: {
        //       [Op.lte]: 100
        //     }
        //   }
        // });

      // findByPk(id, options) : PK 기준으로 단일 레코드를 조회
        // result = await Employee.findByPk(50000, {
        //   attributes: ['empId', 'name']
        // });

        // count(options), sum(field=column명, options), max(field, options), min(field, options), avg(field, options)
        // result = await Employee.count(); // 값을 안 넣으면 전체 레코드 수 가져옴
        // = SELECT COUNT(*) FROM employees WHERE deleted_at IS NULL;
        // └─ paranoid를 true 했기 때문에 deletedAt가 null인 걸 다 빼고 가져옴.
        // └─ deletedAt는 없는 데이터라고 인식하고 가져오기 때문.
        // result = await Employee.count({paranoid: false}) 로 하면 deletedAt이 null 아닌 것도 포함됨.
        // result = await Employee.max('empId');

      // create(values, options) : 새 레코드 생성
        // result = await Employee.create({ // values를 객체로 전달
        //   name: '테스트',
        //   birth: '2000-01-01',
        //   hireAt: dayjs().format('YYYY-MM-DD') ,
        //   gender: 'F',
        // });

      // update(values, option) : 기존 레코드 수정
      // └─ 영향 받은 레코드 수를 반환함
      // UPDATE employees SET name = "미어캣" WHERE emp_id >= 100008;
        // result = await Employee.update(
        //   {
        //     name: '미어캣'
        //   },
        //   {
        //     where: {
        //       // empId: 100011
        //       empId: {
        //         [Op.gte]: 100000
        //       }
        //     }
        //   }
        // );

      // save() : 모델 인스턴스를 기반으로 레코드 생성 및 수정
      // 로그 저장을 하고 싶다면 `트랜잭션 시작`을 해야 함
        // const employee = await Employee.findByPk(100011); // employee는 모델 객체(100011 정보를 담은)이므로 프로퍼티 접근 가능
        // employee.name = '둘리';
        // employee.birth = '1983-04-22';

        // // DB에서 로그를 남기고자 할 때 업데이트 전 `로그 저장 처리`를 함

        // result = await employee.save(); // 여기서 업데이트가 완전히 이루어짐

        // save()로 새로 데이터 생성
          // const employee = Employee.build() // 비어있는 모델 객체 인스턴스 생성
          // employee.name = '또치';
          // employee.birth = '1980-01-01';
          // employee.gender = 'F';
          // employee.hireAt = dayjs().format('YYYY-MM-DD');
          // result = await employee.save();

        // destroy(option) : 조건에 맞는 레코드 삭제
          // result = await Employee.destroy({
          //   where: {
          //     empId: 100011
          //   }
          //   // ,force: true // 모델에 `paranoid: true`일 경우에도 하드 삭제를 하고 싶을 때 사용
          // });

        // restore(options) : Soft Delete가 된 레코드를 복원함
          // result = await Employee.restore({
          //   where: {
          //     empId: 100011
          //   }
          // });

        // 이름이 '강가람'이고, 성별이 여자인 사원 정보 조회
          // result = await Employee.findAll({
          //   attributes: ['empId', 'name', 'gender'],
          //   where: {
          //     name: '강가람',
          //     gender: 'F'
          //   } // 기본적으로 `AND`로 연결됨.
          // });

        // 이름이 '강가람' 또는 '신서연'인 사원 조회
          //   result = await Employee.findAll({
          //   attributes: ['empId', 'name', 'gender'],
          //   where: {
          //     [Op.or]: [
          //       {name: '강가람'},
          //       {name: '신서연'},
          //     ]
          //   }
          // });

        // 성별이 여자이고 이름이 '강가람' 또는 '신서연'인 사원 조회
          // result = await Employee.findAll({
          //   attributes: ['empId', 'name', 'gender'],
          //   where: {
          //     [Op.or]: [
          //       { name: '강가람' },
          //       { name: '신서연' },
          //     ],
          //     gender: 'F'
          //   }
          // });
        // 이름이 '강가람'이고 성별이 남자인 사원 또는 이름이 '신서연'이고 성별이 여자인 사원 조회
          // result = await Employee.findAll({
          //   attributes: ['empId', 'name', 'gender'],
          //   where: {
          //     [Op.or]: [
          //       {
          //         [Op.and]: [
          //           { name: '강가람' },
          //           { gender: 'M' }
          //         ],
          //       },
          //       {
          //         [Op.and]: [
          //           { name: '신서연' },
          //           { gender: 'F' }
          //         ]
          //       }
          //     ]
          //   }
          // });

        // 연산자 사용
          // result = await Employee.findAll({
          //   where: {
          //     // empId: {
          //     //   // [Op.between]: [1, 100]
          //     //   // [Op.notBetween]: [1, 100] <= 이 범위 외의 데이터를 다 가져옴
          //     //   [Op.in]: [1, 2, 3]
          //     //   // [Op.notIn]: [1, 2, 3] <= 1, 2, 3번 빼고 다 가져옴
          //     // },
          //     name: {
          //       [Op.like]: '%가람'
          //       // [Op.iLike]: '%가람' <= 대소문자 구분 무시, DB 문자 형식과도 연관이 있어서 꼭 똑같이 동작하지는 않는다.
          //     },
          //     fireAt: {
          //     // null 조건 주기
          //       [Op.is]: null
          //       // [Op.not]: null = IS NOT NULL
          //     }
          //   }
          // });

          // ORDER BY, LIMIT, OFFSET
            // result = await Employee.findAll({
            //     where: {
            //       empId: {
            //         [Op.gte]: 10000
            //       }
            //     },
            //     order: [
            //       ['name', 'ASC'],
            //       ['birth', 'DESC']
            //     ],
            //     limit: 10,
            //     offset: 10
            //   }
            // );

        // GROUP BY, HAVING
          // result = await Employee.findAll({
          //   attributes: [
          //     'gender',
          //     [sequelize.fn('COUNT', sequelize.col('*')), 'cnt_gender']
          //   ],
          //   group: ['gender'],
          //   having: sequelize.literal('cnt_gender >= 40000')
          // });

        // JOIN
        result = await Employee.findOne({
          attributes: ['empId', 'name'], // Employee에 있는 컬럼명
          where: {
            empId: 1
          },
          include: [
            {
              model: TitleEmp, // 내가 연결할 모델
              as: 'titleEmps', // 내가 사용할 관계. 이 모델에 호출할 associate의 alias를 가져오면 됨
              required: true, // <= 'true'일 때 Inner Join을 함 / 'false'일 때 Left Outer Join
              attributes: ['titleCode'], // JOIN한 테이블에서 출력할 컬럼
              where: { // JOIN했을 때 조건
                endAt: {
                  [Op.is]: null
                }
              },
              include: [
                {
                  model: Title,
                  as: 'title',
                  // association: 'title' <= model과 as를 쓰지 않고 association만 쓸 수 있다.
                  required: true,
                  attributes: ['title'],
                }
              ]
            }
          ]
        });

    // ---------------------------

    return response.status(200).send({
      msg: '정상 처리',
      data: result
    });
  } catch(error) {
    next(error);
  }
});
// ---------------------------------------

export default eduRouter;