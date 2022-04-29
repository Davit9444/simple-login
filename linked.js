const express = require('express');
const index = require('./index');

const router = express.Router();
const app = express();

app.use(express.json());

router.post('/register', index.register);
router.post('/login', index.login);
router.put('/modifyPassword', index.updatePassword);
router.put('/modifyPhone', index.updatePhone);
router.put('/modifyName', index.updateName);
router.put('/modifySurname', index.updateSurname);
router.delete('/deleteUser',index.deleteUser);



app.use(router); 
app.listen(3000,function(err){
 
    if(err) throw err;
    console.log("Listening on Port 3000");
})