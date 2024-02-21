import { json } from "express"
import { db } from "../connect.js"
import jwt from "jsonwebtoken"
import moment from "moment"


export const getPosts =(req, res)=>{
const token=req.cookies.accessToken
const userId=req.query.userId
// console.log(token)
if(!token) return res.status(401).json("not logged in")

jwt.verify(token,"secretkey",(err,userData)=>{
    if (err) return res.status(403).json("token is not valid")
    
        const q=userId !== "undefined" ? `SELECT p.*, u.id AS userId,name,profilePic FROM post AS p  JOIN users as u ON (u.id=p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`:`SELECT p.*, u.id AS userId,name,profilePic FROM post AS p  JOIN users as u ON (u.id=p.userId)
      LEFT JOIN relationship AS r ON (p.userId=r.followedUserId) WHERE r.followerUserId = ? OR p.userId=?
      ORDER BY p.createdAt DESC`
    // console.log(userData)

    const values=userId !== "undefined" ? [userId]:[userData.id,userData.id]
        db.query(q,values,(err, data)=>{
            if(err) return res.status(500).json(err)
             return res.status(200).json(data)
        })
})

}




export const addPost =(req, res)=>{
    const token=req.cookies.accessToken
    // console.log(token)
    if(!token) return res.status(401).json("not logged in")
    
    jwt.verify(token,"secretkey",(err,userData)=>{
        if (err) return res.status(403).json("token is not valid")
        
            const q="INSERT INTO post (`desc`,`img`,`createdAt`,`userId`) VALUES (?)"
            const values=[
                req.body.desc,
                req.body.img,
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                userData.id

            ]
            db.query(q,[values],(err, data)=>{
                if(err) return res.status(500).json(err)
                 return res.status(200).json("Post has been created")
            })
    })
    
    }

export const deletePost=(req, res)=>{
    const token=req.cookies.accessToken
    // console.log(token)
    if(!token) return res.status(401).json("not logged in")
    
    jwt.verify(token,"secretkey",(err,userData)=>{
        if (err) return res.status(403).json("token is not valid")
        
            const q="DELETE FROM post WHERE `id`= ? AND `userId` = ?"
          const w= req.params.id
          const r = userData.id
          console.log(w,r)
            db.query(q,[w,r],(err, data)=>{
                if(err) return res.status(500).json(err)
                if(data.affectedRows>0) return res.status(200).json("Post has been deleted")
                return res.status(400).json("you can delete only Your Post")
            })
    })
}