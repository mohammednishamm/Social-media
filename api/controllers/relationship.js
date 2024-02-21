import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const getRelationship=(req,res)=>{

 
        
            const q="SELECT followerUserId  FROM relationship WHERE followedUserId=?"
        
            db.query(q,[req.query.followedUserId],(err, data)=>{
                if(err) return res.status(500).json(err)
                 return res.status(200).json(data.map(relationship=>relationship.followerUserId))
            })
 

}

export const addRelationship=(req, res)=>{
    const token=req.cookies.accessToken
    // console.log(token)
    if(!token) return res.status(401).json("not logged in")
    
    jwt.verify(token,"secretkey",(err,userData)=>{
        if (err) return res.status(403).json("token is not valid")
        
            const q="INSERT INTO relationship (`followerUserId`,`followedUserId`) VALUES (?)"
            const values=[
                userData.id,
                req.body.userId
            ]
            db.query(q,[values],(err, data)=>{
                if(err) return res.status(500).json(err)
                 return res.status(200).json("Following")
            })
    })

}
export const deleteRelationship=(req, res)=>{
    const token=req.cookies.accessToken
    // console.log(token)
    if(!token) return res.status(401).json("not logged in")
    
    jwt.verify(token,"secretkey",(err,userData)=>{
        if (err) return res.status(403).json("token is not valid")
        
            const q="DELETE FROM relationship WHERE `followerUserId`=? AND `followedUserId`= ?"
         
            db.query(q,[userData.id,req.query.userId],(err, data)=>{
                if(err) return res.status(500).json(err)
                 return res.status(200).json("Unfollow")
            })
    })
    
}