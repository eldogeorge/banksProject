//import model
const db=require("./db")
const jwt=require("jsonwebtoken")//tstep1

//register logic
register=(acno,psw,uname)=>{//same order1
    return db.User.findOne({acno}).then(user=>{
        if(user){
            return{
                message:"User Already Present",
                status: false,
                statuscode:402,//client error

            }
        }
        else{
            newuser=new db.User({//create class using file name in new object
                acno:acno,//if same parameter acno:acno/acno
                uname:uname,
                psw:psw,
                balance:0,
                transaction:[]
            })
            newuser.save()//to reflect the changes done by server in database(to save)
            return{
                message:"Register Successfully",
                status: true,
                statuscode:202//success(to store)
            }   
        }

    })
}

//login logic
login=(acno,psw)=>{
    return db.User.findOne({acno,psw}).then(user=>{//key value are same (acno:ano)
        if(user){
            //token generation
            const token=jwt.sign({acno},"BankKey")//object,string//tstep2
            return{
                message:"Login Success",
                status: true,
                statuscode:202,//success(to store)  
                currentUser:user.uname,//to display in localStorage
                currentAcno:acno,//to display in localStorage
                token//to display token in localStorage(token:token if diff name)
            }
        }
        else{
            return{
                message:"Incurrent account number or password",
                status: false,
                statuscode:402//client error
            }
        }
    })

}

getUser=(acno)=>{
    return db.User.findOne({acno}).then(user=>{
        if(user){
            return{
                message:user,
                status:true,
                statuscode:202
            }
        }
        else{
            return{
                message:"User not Exit",
                status: false,
                statuscode:402//client error
            }
        }
    })
}

getBal=(acno)=>{
    return db.User.findOne({acno}).then(user=>{
        if(user){
            return{
                message:user.balance,
                status:true,
                statuscode:202
            }
        }
        else{
            return{
                message:"User not Exit",
                status: false,
                statuscode:402//client error
            }
        }
    })
}

transfer=(fromAcno,toAcno,amount,psw,date)=>{
    return db.User.findOne({acno:fromAcno,psw}).then(fromUser=>{
        if(fromUser){ //to get
            return db.User.findOne({acno:toAcno}).then(toUser=>{
                if(toUser){//to check
                    amount=parseInt(amount)//string to number
                    if(amount>fromUser.balance){
                        return{
                            message:"Insufficient Balance",
                            status: false,
                            statuscode:402//client error
                        }
                    }
                    else{
                        //debit from user
                        fromUser.balance=fromUser.balance-amount
                        fromUser.transaction.push({type:'DEBIT',amount,date})
                        fromUser.save()

                        //credit to user and updata the balance touser
                        toUser.balance=toUser.balance+amount
                        toUser.transaction.push({type:'CREDIT',amount,date})
                        toUser.save()
                        return{
                            message:"Transaction Successfully",
                            status:true,
                            statuscode:202
                        }
                    }
                }
                else{
                    //not to user  
                    return{
                        message:"Invalid credit crendentials",
                        status: false,
                        statuscode:402//client error
                    }
                }
            })
        }
        else{
            // not from user
            return{
                message:"Invalid debit crendentials",
                status: false,
                statuscode:402//client error
            }
        }
    })
}

gettransaction=(acno)=>{//step3
    return db.User.findOne({acno}).then(user=>{//retrun item 3.1
        if(user){
            return{
                message:user.transaction,
                status:true,
                statuscode:202
            }
        }
        else{
            return{
                message:"User not Exit",
                status: false,
                statuscode:402//client error
            }
        }
    })
}
deleteac=acno=>{//DY Step4
    return db.User.deleteOne({acno}).then(result=>{
        if(result){
            return{
                message:"Bank account is deleted",
                status:true,
                statuscode:202
            }
        }
        else{
            return{
                message:"Bank account not present ",
                status: false,
                statuscode:402//client error
            }
        }
    })
}
module.exports={//step 4
    register,login,getUser,getBal,transfer,gettransaction,deleteac
}