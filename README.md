# Project
using JavScript
const express=require('express');
 const router=express.Router();
 const ProjectModel=require('../models/Project');

 router.get("/",function(req,res){
    res.render("project.ejs",{
        title:"Project Form"
    })
 })

 router.post("/",async function(req,res){
    ProjectModel.uploadedProjectPath(req,res,async function(err){
      if(err){
          return console.log('***MULTER Error',err);
      }
      if(req.file){
          console.log('File ',req.file.filename);
      }
      console.log("hello");
    console.log("req: ",req.body);

   let sampleProject= await ProjectModel.create({
      name:req.body.project_name,
      link:req.body.project_link,
      description:req.body.project_description,
      image:(req.file)?ProjectModel.projectPath+'/'+req.file.filename:req.body.project_link1,
      category:req.body.project_category,
      repo:req.body.project_repo
    })

    console.log(sampleProject);
  })

    return res.redirect('/')
 })

 module.exports=router;
