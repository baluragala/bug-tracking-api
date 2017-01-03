let mongoose = require( 'mongoose' );
let User = mongoose.model( 'User' );

exports.logout=function(req,res){
    res.send(200)
}

exports.create =function(req,res){
   let username=req.body.username;
   let email=req.body.email;
   let password=req.body.password;``
   let type = req.body.type;

   let newuser=new User();
   newuser.username=username;
   newuser.email=email;
   newuser.password=password;
   newuser.type=type;

   newuser.save(function(err,savedUser){
     console.log(err)
       if(err){
         console.log("User already exists with that username or email");
         let message="A user already exists with that username or email";
         res.status(400).json({errorMessage:err});
       }else{
         res.json(savedUser);
       }
   });
}

exports.login=function(req,res){
    let email=req.body.email;
    let password=req.body.password;
    console.log(req.body)
    User.findOne({email:email}, function(err,user){
      if(user==null){
        console.log("User is null redirecting to login");
        let message="Invalid email or password";
        console.log("Message :"+message);
        res.status(403).json({errorMessage:message});
      }

     user.comparePassword(password,function(err,isMatch){
       if(isMatch && isMatch==true){
         console.log("Authentication Sucessfull");
         res.send(200);
       }else{
         console.log("Authentication UnSucessfull");
         let message="Invalid email or password";
         console.log("Message :"+message);
         res.status(403).json({errorMessage:message});
       }
     });
    });
  }
