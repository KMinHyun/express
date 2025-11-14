import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'Employee'; // 모델명 (JS 내부에서 사용하는 이름)

// 컬럼 정의
const attributes = {
  empId: {
    field: 'emp_id', // DB에서 사용하는 컬럼명 지정
    type: DataTypes.BIGINT.UNSIGNED, // 컬럼의 데이터 타입 지정
    primaryKey: true, // PK 지정
    allowNull: false, // NULL 비허용
    autoIncrement: true, // AUTO_INCREMENT 지정
    comment: '사원 ID' // 코멘트 설정
  },
  name: {
    field: 'name',
    type: DataTypes.STRING(50), // <= STRING으로 하면 VARCHAR로 설정됨
    allowNull: false,
    comment: '사원명'
  },
  birth: {
    field: 'birth',
    type: DataTypes.DATE, // <= DATE가 DATETIME으로 연결됨
    allowNull: false,
    comment: '사원 생년월일',
    get() {
      const val = this.getDataValue('birth');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD');
    } // getter: 원하는 형태로 가공시킬 때 사용
  },
  gender: {
    field: 'gender',
    type: DataTypes.CHAR(1),
    allowNull: false,
    comment: '사원 성별'
  },
  hireAt: {
    field: 'hire_at',
    type: DataTypes.DATE,
    allowNull: false,
    comment: '입사일',
    get() {
      const val = this.getDataValue('hireAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD');
    }
  },
  fireAt: {
    field: 'fire_at',
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    comment: '퇴직일',
    get() {
      const val = this.getDataValue('fireAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD');
    }
  },
  supId: {
    field: 'sup_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    defaultValue: null,
    comment: '사수 번호'
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.NOW, // <= defaultValue로 currentTimestamp를 가져옴
    allowNull: false,
    // defaultValue: new Date() <= 데이터타입에서 DATE를 쓰고 디폴트 값을 설정해도 됨
    comment: '작성일',
    get() {
      const val = this.getDataValue('createdAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.NOW,
    allowNull: false,
    comment: '수정일',
    get() {
      const val = this.getDataValue('updatedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    comment: '삭제일',
    get() {
      const val = this.getDataValue('deletedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  }
}

// Options 설정 () <= 테이블 관련 설정
const options = {
  tableName: 'employees', // 실제 테이블명
  timestamps: true, // createdAt, updatedAt 자동 관리
  // createdAt: 'empCreatedAt' <= 별도로 설정하고 싶을 때
  // updatedAt: false <= 자동 관리 안 하겠단 뜻
  paranoid: true, // Soft Delete 설정 (deletedAt을 자동으로 관리해줌)
}

// 모델 객체 작성
const Employee = {
  init: (sequelize) => {
    const defineEmployee = sequelize.define(modelName, attributes, options);

    return defineEmployee;
  },
  // associate = 모델 관계를 정의하기 위한 함수
  associate: (db) => { // 모델 객체 등록해둔 db를 파라미터로 받음
    // 1:n 관계에서 '부모 모델'에 설정하는 방법 (1명의 사원은 복수의 직급 정보를 가진다)
    db.Employee.hasMany(db.TitleEmp, { sourceKey: 'empId', foreignKey: 'empId', as: 'titleEmps' }); // 부모 모델에 hasMany 메소드로 자식 모델을 연결. sourceKey는 참조될 키.
  }
}

export default Employee;