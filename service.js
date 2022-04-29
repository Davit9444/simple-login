const mysql = require("mysql");

const connect = mysql.createConnection({
   host: 'localhost',
   user: 'Client',
   password: 'Password123!#',
   database: 'User'

});



connect.connect(function(err) {
   if (err) {
       throw err;
   };
   console.log("Connected To DataBAse !!!");
 });

 function getUserId (user,res)
{        
      connect.query(`SELECT Id FROM Registr WHERE Email='${user.Email}' AND Password='${user.Password}' `,(err, rows, field) => {

      
       if (err) throw err;
     
       if(rows.length > 0 ){
          
         res.status(200).send(rows[0]);}
              
       else {
         res.status(401).send("Invalid Email/Password !!!");}
                    
     })
}  


function modifyPhone(user){
   
   connect.query(`UPDATE Registr SET Phone='${user.Phone}' WHERE Email = '${user.Email}';`,(err,rows,fields)=> {
       if(err) throw err;
      
       console.log('Phone has Changed');
        console.log(rows);
   })
}




function modifyName(user){
   
   connect.query(`UPDATE Registr SET Name='${user.Name}' WHERE Email = '${user.Email}';`,(err,rows,fields)=> {
       if(err) throw err;
      
       console.log('Name has Changed');
        console.log(rows);
   })
}



function modifySurname(user){
   
   connect.query(`UPDATE Registr SET Surname='${user.Surname}' WHERE Email = '${user.Email}';`,(err,rows,fields)=> {
       if(err) throw err;
      
       console.log('Surname has Changed');
        console.log(rows);
   })
}





function modifyPassword(user){
   
   connect.query(`UPDATE Registr SET Password='${user.Password}' WHERE Email = '${user.Email}';`,(err,rows,fields)=> {
       if(err) throw err;
      
       console.log('Password has Changed');
   })
}

function deleteUser(user){
   connect.query(`DELETE FROM Registr WHERE Email='${user.Email}' AND Password='${user.Password}';`,(err,row,field) =>{
       if(err) throw err;
       console.log("User Has Been Deleted");
   });
}






function create (user){
   connect.query(`INSERT INTO Registr (Login,Password,Email,Phone,Name,Surname) VALUES('${user.Login}','${user.Password}','${user.Email}','${user.Phone}','${user.Name}','${user.Surname}')`,(err,row,field) =>{
       if(err) throw err;
       console.log("Record Inserted");
      // console.log(row);
   })
}


module.exports = {
   create : create,
   deleteUser : deleteUser,
   modifyName : modifyName,
   modifySurname : modifySurname,
   modifyPhone : modifyPhone,
   modifyPassword : modifyPassword,
   getUserId : getUserId
}
