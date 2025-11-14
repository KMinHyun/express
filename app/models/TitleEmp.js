import { DataTypes } from "sequelize";

// 모델명
const modelName = 'TitleEmp';

// 컬럼 정의
const attributes = {
  titleEmpId: {
    field: 'title_emp_id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '사원 직급 ID'
  },
  empId: {
    field: 'emp_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '사원 ID'
  },
  titleCode: {
    field: 'title_code',
    type: DataTypes.CHAR(4),
    allowNull: false,
    comment: '직급 코드'
  },
  startAt: {
    field: 'start_at',
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: '시작일',
    get() {
      const value = this.getDataValue('startAt'); // this : 생성되는 모델 객체 자신. init가 모델을 생성하는 객체를 말함.
      if(!value) {
        return null;
      }
      return dayjs(value).format('YYYY-MM-DD');
    }
  },
  endAt: {
    field: 'end_at',
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: null,
    comment: '종료일',
    get() {
      const value = this.getDataValue('endAt');
      if(!value) {
        return null;
      }
      return dayjs(value).format('YYYY-MM-DD');
    }
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.NOW,
    allowNull: false,
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

// Options 설정
const options = {
  tableName: 'title_emps',
  timestamps: true,
  paranoid: true
}

// 모델 객체 생성
const TitleEmp = {
  init: (sequelize) => {
    const defineTitleEmp = sequelize.define(modelName, attributes, options);

    return defineTitleEmp;
  },
  associate: (db) => {
    // 1:n 관계에서 '자식 모델'에 설정하는 방법 (1명의 사원은 복수의 직급 정보를 가진다)
    db.TitleEmp.belongsTo(db.Employee, { targetKey: 'empId', foreignKey: 'empId', as: 'employee' }); // targetKey : 참조할 부모의 컬럼명
    // TitleEmp와 Title 관계 설정
    db.TitleEmp.belongsTo(db.Title, { targetKey: 'titleCode', foreignKey: 'titleCode', as: 'title' });
 }}

export default TitleEmp;