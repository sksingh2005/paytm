// backend/routes/user.js
const express = require('express');
const zod=require("zod")
const { User, Account } = require('../db');
const { JWWT_SECRET } = require('../config');
const jwt=require("jsonwebtoken");
const { authMiddleware } = require('../authMiddleware');
const router = express.Router();
const userschema=zod.object({
    username:zod.string().email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string().min(8)
})
router.post('/signup',async function(req,res){
    const input=req.body;
    const valid=userschema.safeParse(input);
    if(!valid.success){
        res.status(411).json({
            msg:"Invalid entry",
        })
        return ;
    }
    const dbcheck=await User.findOne({
        username:input.username,
        firstname:input.firstname,
        lastname:input.lastname,
        password:input.password
    })

    

    if(dbcheck){
        res.status(411).json({
            msg:"User already exists please signin",
        })
        return ;
    }

    const entry=await User.create({
        username:input.username,
        firstname:input.firstname,
        lastname:input.lastname,
        password:input.password
    })

    const userid=entry._id;
    const val=1+Math.random()*10000;
    await Account.create({
        userId:userid,
        balance:val
    })
    const token=jwt.sign({userid},JWWT_SECRET)
    if(entry){
        res.status(200).json({
            msg:"User created successfully",
            "token":token
        })
    }


})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})
router.post('/signin',async function(req,res){
    const input=req.body;
    const valid=signinBody.safeParse(input);
    if(!valid.success){
        res.status(411).json({
            msg:"Invalid entry",
        })
        return ;
    }
    const dbcheck=await User.findOne({
        username:input.username,
        password:input.password
    })
    let userId;
    if (dbcheck) {
        userId = dbcheck._id;
    } else {
        console.log("User not found with provided credentials");
    }
    const token=jwt.sign({userId},JWWT_SECRET)

    if(dbcheck){
        res.status(200).json({
            "token":token,
        })
        return ;
    }
    res.status(411).json({
        msg:"Error while logging in",
    })
    

})
const updatebody=zod.object({
    password:zod.string().min(6).optional(),
    firstname:zod.string().optional(),
    lastname:zod.string().optional(),
})
router.put('/user',authMiddleware, async function(req,res){
    const updating=req.body;
    const valid=updatebody.safeParse(updating);

    if(!valid.success){
        return res.status(411).json({
            msg:"Error while updating information"
        })
    }
    
    await User.updateOne({_id:req.userId},
        updating
    )
    res.status(200).json({
        msg:"Updated successfully"
    })


})

router.get('/bulk', async function(req, res) {
    try {
        const filter = req.query.filter || ""; // Default empty string if filter is not provided
        const users = await User.find({
            $or: [
                { firstname: { "$regex": filter, "$options": "i" } }, // Case insensitive regex
                { lastname: { "$regex": filter, "$options": "i" } }   // Case insensitive regex
            ]
        });

        res.json({
            "users": users.map(user => ({
                username: user.username,
                firstname: user.firstname,
                lastName: user.lastname,
                _id: user._id
            }))
        });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});



module.exports = router;