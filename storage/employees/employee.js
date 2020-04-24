'use strict';

class Employee {
  constructor(FirstName, LastName, DateBirthday, INN, Email, Telephone) {
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.DateBirthday = DateBirthday;
    this.INN = INN;
    this.Email = Email;
    this.Telephone = Telephone;
  }
}

const get = async (id) => await dataAccessService.query(
  `SELECT * FROM dbo.Employee where EmployeeId=${id}`).then((data) => { return data });

const dataAccessService = require('../../common/service/mssql-service.js');

exports.getAll = async () => await dataAccessService.query(
  'SELECT * FROM dbo.Employee');

exports.get = get;
exports.update = async (id) => await dataAccessService.query(
  `UPDATE dbo.Employee  SET FirstName = 'Hello from Node.js' WHERE EmployeeId = ${id}`);
exports.add = async function (obj) {
  let response;
  await dataAccessService.query(
    `INSERT into dbo.Employee(FirstName,LastName,DateBirthday,Inn) values
     ('${obj.FirstName}','${obj.LastName}','${obj.DateBirthday}','${obj.Inn}')`
  )
    .then(() => {
      response = dataAccessService.query(
        `declare @last int	  
     select @last = Max(EmployeeId) from dbo.Employee
     select * from dbo.Employee where EmployeeId=@last`
      )
    })
  return response;
};



// `INSERT into dbo.Employee(FirstName,LastName,DateBirthday,Inn) values
//   ('Test','Test','1985-12-19','128234110')`
// `INSERT into dbo.Employee(FirstName,LastName,DateBirthday,Inn) values
// ('${obj.FirstName}','${obj.LastName}','${obj.DateBirthday}','${obj.Inn}')`
// ).then(dataAccessService.query(
//   `declare @last int	  
//   select @last = Max(EmployeeId) from dbo.Employee
//   select * from dbo.Employee where EmployeeId=@last`
// ));

exports.delete = async function (id) {
  let tmp = await get(id);
  let res = await dataAccessService.query(
    `delete from dbo.Employee where EmployeeId=${id}`
  )
  if (res != 'Error') {
    return tmp;
  }
};
exports.Employee = Employee;