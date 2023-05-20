const express = require('express');
const router = express.Router();
const ProjectModel = require('../models/Project');

router.get('/', function(req, res) {
  res.render('project.ejs', {
    title: 'Project Form'
  });
});

router.post('/', async function(req, res) {
  try {
    await ProjectModel.uploadedProjectPath(req, res, async function(err) {
      if (err) {
        console.error('*** MULTER Error:', err);
        throw err; // Rethrow the error to be caught by the outer try-catch block
      }
      
      if (req.file) {
        console.log('File:', req.file.filename);
      }
      
      console.log('Hello');
      console.log('req:', req.body);

      let sampleProject = await ProjectModel.create({
        name: req.body.project_name,
        link: req.body.project_link,
        description: req.body.project_description,
        image: req.file ? ProjectModel.projectPath + '/' + req.file.filename : req.body.project_link1,
        category: req.body.project_category,
        repo: req.body.project_repo
      });

      console.log(sampleProject);
    });

    return res.redirect('/');
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
