import React, { useState } from 'react'
import "./update.scss"
import { makeRequest } from '../../axios'
import {useMutation, useQueryClient} from '@tanstack/react-query'


const Update = ({setOpenUpdate, user}) => {
    const [cover,setCover]=useState(null)
    const [profile,setProfile]=useState(null)
    const [text, setText]=useState({
        name:"",
        city:"",
        website:""
    })
    console.log("kia",text)

    const upload=async (file)=>{
        try {
          const formData=new FormData()
          formData.append("file",file)
          const res=await makeRequest.post("/upload",formData)
          return res.data;
        } catch (error) {
          console.log(error)
        }
      }

      const queryClient=useQueryClient();



      const mutation = useMutation((user)=>{
     return makeRequest.put("/users", user);
   },{
     onSuccess: () => {
       // Invalidate and refetch
       queryClient.invalidateQueries(['user'])
     },
   })

    const handleChange =(e)=>{
        setText((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    console.log(text)


    const handleClick =async e=>{
        e.preventDefault();
        let coverUrl;
        let profileUrl;

        coverUrl=cover ? await upload(cover) :user.coverPic;
        profileUrl=profile ? await upload(profile): user.profilePic

       
        mutation.mutate({...text,coverPic:coverUrl,profilePic:profileUrl})
        setOpenUpdate(false)
    }
  

   
  return (
    <div className='update'>

        <form >
            <input type="file" onChange={e=>setCover(e.target.files[0])}/>
            <input type="file" onChange={e=>setProfile(e.target.files[0])}/>
            <input type="text"   name='name' placeholder='name' onChange={handleChange}/>
            <input type="text"  name='city' placeholder='city' onChange={handleChange}/>
            <input type="text"  name='website' placeholder='website' onChange={handleChange} />
            <button onClick={handleClick}>updatee</button>
        </form>
        <button onClick={()=>setOpenUpdate(false)}>XX</button>
    </div>
  )
}

export default Update