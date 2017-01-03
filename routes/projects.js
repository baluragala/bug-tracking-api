const mongoose = require( 'mongoose' );
const Project = mongoose.model( 'Project' );
const ObjectID = mongoose.mongo.ObjectId;

exports.getAllProjects = function(req,res){
  Project.find({},function(err,projects){
    if(err)
      throw new Error(err);
    else
      res.json(projects)
  })
}

exports.getProjectById = function(req,res){
  Project.findOne({_id:ObjectID(req.params.projectId)},function(err,projects){
    if(err)
      throw new Error(err.message);
    else if (projects == null)
      res.send(403)
    else {
      res.json(projects)
    }
  })
}

  exports.create = function(req,res){
    let title=req.body.title;
    let description=req.body.description;
    let manager=req.body.manager;

    let project=new Project();
    project.title=title;
    project.description=description;
    project.manager=manager;

    project.save(function(err,savedProject){
      if(err)
        throw new Error(err.message)
      else {
        res.json(savedProject);
      }
    })
  }

    exports.update = function(req,res){
      let title=req.body.title;
      let description=req.body.description;
      let manager=req.body.manager
      Project.findById(req.params.projectId,function(err,project){
        project.title=title;
        project.description=description;
        project.manager=manager;

        project.save(function(err,savedProject){
          if(err)
            throw new Error(err.message)
          else {
            res.json(savedProject);
          }
        })
      })
      }
exports.delete = function(req,res){
      let title=req.body.title;
      let description=req.body.description;
      let manager=req.body.manager
      Project.findByIdAndRemove(req.params.projectId,function(err,project){
        var response = {
        message: "Project successfully deleted",
        id: project._id
      }
      res.json(response)
    })
}
