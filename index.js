const { request } = require('express');
const service = require('./service');
const validator = require("email-validator");
const validatorExpress = require('express-validator');

const errorFormatter = ({location, msg, param, value, nestedErrors}) => {
    return `${location}[${param}]: ${msg}`   
}

  async function  register(req, res ) {
    
    const user = req.body;

    await validatorExpress.check('Email').isEmail().run(req);
    await validatorExpress.check('Password').isLength({min: 6}).run(req);
    await validatorExpress.check('Surname').isString({min: 3}).run(req);
    await validatorExpress.check('Name').isString({min: 3}).run(req);
    await validatorExpress.check('Phone').isString({min: 3}).run(req);
    await validatorExpress.check('Login').exists()
    await validatorExpress.check('Login').isString({min: 3}).run(req);
    const validationResults =  validatorExpress.validationResult(req).formatWith(errorFormatter);

    if(validationResults.isEmpty()){
        service.create(user);
        res.status(200).send("succsessfuly created!!!");
    }else{
              res.status(400).send(validationResults); 
    }
    };

  function  login(req, res) {

        const user = req.body;
        
        service.getUserId(user, res);
         
        };

  function updatePassword(req, res) {

      const user = req.body;  
      
      service.modifyPassword(user);

      res.status(200).send("password changed!");  
  }



  function updatePhone(req, res) {

    const user = req.body;  
    
    service.modifyPhone(user);

    res.status(200).send("Phone has changed !!!");  
}



function updateName(req, res) {

    const user = req.body;  
    
    service.modifyName(user);

    res.status(200).send("Name has changed !!!");  
}



function updateSurname(req, res) {

    const user = req.body;  
    
    service.modifySurname(user);

    res.status(200).send("Surname has changed !!!");  
}

function deleteUser (req,res) {
    const user = req.body;
     //console.log(user);
    service.deleteUser(user);

    res.status(200).send("Your Account has been deleted !!!");
}


module.exports = {
    register: register,
    login: login,
    updatePassword: updatePassword,
    updateName: updateName,
    updateSurname: updateSurname,
    updatePhone: updatePhone,
    deleteUser: deleteUser
}