//import express
const express=require('express')//import express syntax:- const expressName=require('key from package.json')

//import logic
const logic=require("./service/logic")//import logic su=ythax:const fileName=require("paths")

//import jwt
const jwt=require('jsonwebtoken')//tstep7
//import cors
const cors=require('cors')

const server=express()//create server syntax:- const serverName=express()as method

server.use(cors({origin:'http://localhost:4200'}))


server.listen(3000,()=>
        {console.log("-----------------server started at port 3000---------------------");}
    )//set a port (no front port) syntax:- serverName.listen(port no.,)

//tstep8 tokenmiddelware is used cotnol
const tokenMiddleware=(req,res,next)=>{
    try{//try will work
        const token=req.headers['access_token']
        jwt.verify(token,"BankKey")
        next()
    }
    catch{//if try is not working then catch will work
        res.status(402).json({
            message:"Token not Verified",
            status:false,
            statuscode:402
        })
    }

}
// incoming json type data convert to js
server.use(express.json())//convert into json to js 

//server api resolve
server.post("/getexc",(req,res)=>{  //req is request from server and res is resver from rserver
    res.send("post request")
})

server.get("/getexc1",(req,res)=>{  //req is request from server and res is resver from rserver
    res.send("post request")
})

//register - port
server.post("/register",(req,res)=>{
    logic.register(req.body.acno,req.body.psw,req.body.uname).then(result=>{  //same order1 (if asyn file/ varible in fns ,then fns will be asyn)
        //convert js to json and send as response
        res.status(result.statuscode). json(result)//status display in logic.js
    }) 
})
//login -post
server.post("/login",(req,res)=>{
    logic.login(req.body.acno,req.body.psw).then(result=>{
        res.status(result.statuscode). json(result)//status display in logic.js
    })
})
//get user data (view profile)- get
server.get("/getuser/:acno",tokenMiddleware,(req,res)=>{//path+:means to idenfity in params+variable
    logic.getUser(req.params.acno).then(result=>{
        res.status(result.statuscode).json(result)
    })
})
//balance -get
server.get("/getbalance/:acno",tokenMiddleware,(req,res)=>{
    logic.getBal(req.params.acno).then(result=>{
        res.status(result.statuscode).json(result)
    })
})
//transfer -post
server.post("/transfer",tokenMiddleware,(req,res)=>{
    logic.transfer(
        req.body.fromAcno,
        req.body.toAcno,
        req.body.amount,
        req.body.psw,
        req.body.date,
        ).then(result=>{
            res.status(result.statuscode).json(result)
        })
})
//tranaction history -get
server.get("/history/:acno",tokenMiddleware,(req,res)=>{//step 2
    logic.gettransaction(req.params.acno).then(result=>{
        res.status(result.statuscode).json(result)
    })//step 5
})
//ac delete =delete
server.delete("/deleteac/:acno",tokenMiddleware,(req,res)=>{//DY Step3
    logic.deleteac(req.params.acno).then(result=>{//DY Step5
        res.status(result.statuscode).json(result)
    })
})

