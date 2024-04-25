import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddBlog = ({props,update}) => {
  var location = useLocation();
  console.log("location:",location.state)

  const [post,setPost] = useState({title:'',post:'',image:''});
  const navigate = useNavigate()


  useEffect(()=>{
    if(location.state!=null){
      setPost({...post,title:location.state.val.title,
        post:location.state.val.post,
        image:location.state.val.image})
    }else{
      setPost({...post,title:'',post:'',image:''})
    }
  },[])
    const inputHandler = (e)=>{
        setPost({...post,[e.target.name]:e.target.value});
        console.log(post)
    }
    const addPost = ()=>{
        if (location.state != null) {
          var upId = location.state.val._id
          console.log("up cli",upId)
          axios.put("http://localhost:3008/api/update/"+upId,post)
         .then((res)=>{
          if(res.data.message = "Blog Updated successfully"){
            alert(res.data.message);
            navigate('/view')
          }else{
            alert("user not found")
          }
         })
        } else {
          console.log("btn",post)
        axios.post("http://localhost:3008/api//addblog",post)
        .then ((res)=>{
          alert(res.data.message)
          navigate('/view')
        })
        .catch((err)=>{
          console.log(err)
        })
        }
    }
  return (
    <div style={{margin: '4%'}}>
      <Typography>Add Blog</Typography>
      <br /><br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <TextField variant='outlined' label='post title' fullWidth name='title'onChange={inputHandler} value={post.title}></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField variant='outlined' label='Type a post' multiline fullWidth rows={10} name='post' onChange={inputHandler} value={post.post}></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField variant='outlined' label='Image URL' fullWidth name='image'onChange={inputHandler} value={post.image}></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button variant='contained' color='secondary' onClick={addPost}> Submit </Button>
        </Grid>
      </Grid>
      
    </div>
  )
}

export default AddBlog
