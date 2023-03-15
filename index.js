
let express = require('express');
let app = express();
let User = require('./model');
let connect = require('./dbConnection');
var cors = require('cors');
let PORT = process.env.PORT || 2000;

connect();
app.use(cors());
app.use(express.json());


app.post('/login',async(req , resp )=>{

    let {email , password } = req.body;
    let user = await User.findOne({email:email});
   
     try{
        if(user.password === password){
            console.log(password +" "+user.password)
             resp.status(200).send({
                name:user.name
             });
        resp.end();
       
    }
    else{
        resp.status(401);
        resp.send("failed")
        resp.end()
    }
    }catch(err){
        resp.status(401);
        resp.send( new Error("login failed"))
        
    }
    
   
   
    
})

app.post('/register',async (req,resp)=>{

    let {email , password } = req.body;
    let user = await User.findOne({email:email});
    if(user){
        resp.status(409).send("email  already exists");
        resp.end();
    }else{
       try{
        let {name , email , mobile , password } = req.body;
        let data = new User({
            name:`${name}`,
            email:`${email}`,
            mobile:`${mobile}`,
            password:`${password}`

        })
        let res = await data.save();
       console.log(res)
        resp.send("saved");
        
        //console.log(res);
       } 
       catch(err){
        resp.send(err);
       }
       finally{
        resp.end();
       }
    }
})
 
app.get('/',async (req,resp)=>{
   
    resp.send("working");
    resp.end();
})

app.post('/curUser',async (req,resp)=>{
    try{
        let {email} = req.body;
        let user = await User.findOne({email:email});
        resp.send(user);
        console.log("worked")
        resp.end();
    }
   catch(err){
    console.log(err);
   }

})


  
app.listen(PORT);