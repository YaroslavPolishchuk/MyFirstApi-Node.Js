'use strict';

//import {Employee} from './employee';
// class Employee {
//   constructor(FirstName, LastName, DateBirthday, Inn, Email, Telephone) {
//     this.FirstName = FirstName;
//     this.LastName = LastName;
//     this.DateBirthday = DateBirthday;
//     this.Inn = Inn;
//     this.Email = Email;
//     this.Telephone = Telephone;
//   }
// }

const model = require('./employee.js');


exports.getAll = async (req, res) => await model.getAll().
  then(array => res.status(200).
    send(array));

exports.update = async (req, res) => {
  return await model.update(req.params['id']).
    then(array => res.status(200).send(array));
};
exports.add = async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  let tmp = new model.Employee();
  tmp.FirstName = req.body.FirstName;
  tmp.LastName = req.body.LastName;
  tmp.DateBirthday = req.body.DateBirthday;
  tmp.Inn = req.body.Inn;
  return await model.add(tmp).
    then(instance => res.status(200).
      send(instance));
};
exports.delete = async (req, res) => {
  return await model.delete(req.params['id']).
    then(instance => res.status(200).
      send(instance));
};
