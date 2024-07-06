const express=require("express");
const zod=require("zod")
const { User, Account } = require("../db");
const { authMiddleware } = require("../authMiddleware");
const router=express.Router();
const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})
router.get('/balance',authMiddleware,async function(req,res){
    
    // const uservalid=signinBody.safeParse(user);
    // if(!uservalid.success){
    //     res.json({
    //         msg:"Invalid user name or password"
    //     })
    //     return;
    // }

    // const valid=await User.findOne({
    //     username:user.username,
    //     password:user.password
    // })
    // const id=valid._id;

    const balancecheck=await Account.findOne({
        userId:req.userId
    })

    const balance=balancecheck.balance;
    res.json({
        "balance":balance,
    })
})
const usercheck=zod.string();
router.post('/transfer',authMiddleware,async function(req,res){
    const balancecheck=await Account.findOne({
        userId:req.userId
    })

    const transfer=req.body;
    const acccheck=usercheck.safeParse(transfer.account);

    const transferacc=await Account.findOne({
        userId:transfer.account
    });
    if(!acccheck.success||!transferacc){
        res.json({
            msg:"Invalid account"
        })
        return ;
    }

    if((balancecheck.balance)<(transfer.amount)){
        res.json({
            msg:"Insufficient balance"
        })
        return ;
    }
    
    const transferaccid=transfer.account;
    const balances=await Account.findOne({
        userId:transferaccid
    })
    const accountid=balances._id;
    const updatingbalance=balances.balance+transfer.amount;
    const updating=await Account.updateOne(
        {_id:accountid},
        { $inc: { balance: +transfer.amount } })

    await Account.updateOne({
            userId: req.userId
        }, {
            $inc: {
                balance: -transfer.amount
            }
        })    

    if(updating){
        res.json({
            msg:"Transaction complete"
        })
    }
})

module.exports=router