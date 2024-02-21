import { db } from "../connect.js"
import jwt from "jsonwebtoken"
export const getLikes=(req,res)=>{

 
        
            const q="SELECT userId from likes WHERE postId=?"
        
            db.query(q,[req.query.postId],(err, data)=>{
                if(err) return res.status(500).json(err)
                 return res.status(200).json(data.map(like=>like.userId))
            })
 

}

export const addLike=(req, res)=>{
    const token=req.cookies.accessToken
    // console.log(token)
    if(!token) return res.status(401).json("not logged in")
    
    jwt.verify(token,"secretkey",(err,userData)=>{
        if (err) return res.status(403).json("token is not valid")
        
            const q="INSERT INTO likes (`userId`,`postId`) VALUES (?)"
            const values=[
                userData.id,
                req.body.postId
            ]
            db.query(q,[values],(err, data)=>{
                if(err) return res.status(500).json(err)
                 return res.status(200).json("post has been liked")
            })
    })

}
export const deleteLike=(req, res)=>{
    const token=req.cookies.accessToken
    // console.log(token)
    if(!token) return res.status(401).json("not logged in")
    
    jwt.verify(token,"secretkey",(err,userData)=>{
        if (err) return res.status(403).json("token is not valid")
        
            const q="DELETE FROM likes WHERE `userId`=? AND `postId`= ?"
         
            db.query(q,[userData.id,req.query.postId],(err, data)=>{
                if(err) return res.status(500).json(err)
                 return res.status(200).json("post has been disliked")
            })
    })
    
}