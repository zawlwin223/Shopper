const fs = require('fs');

let saveSingleFile = async (req, res, next) => {
   console.log(req.body)
   if(req.files){
      if(req.files.image){
         let filename = req.files.image.name;
         filename = new Date().valueOf() + "_" + filename;
         req.files.image.mv(`./uploads/${filename}`);
         req.body["image"] = filename;
         next();
      }else{
         new Error(next("Request needs files"))
      }
      
   }else{
      new Error(next("Request needs files"))
   }
   
}

let saveMultipleFile = async (req, res, next) => {
   let filenames = [];
   req.files.files.forEach(file => {
      filename = new Date().valueOf() + "_" + file.name;
      filenames.push(filename);
      file.mv(`./uploads/${filename}`);
   });
   req.body["images"] = filenames;
  
   next();
}


let deleteFile = async (filename) => {
   let filepath = `./uploads/${filename}`;
   await fs.unlinkSync(filepath);
}

let deleteMultipleFile = async (filenames) => {
   filenames.forEach(async filename => {
      await deleteFile(filename);
   });
}

module.exports = {
   saveSingleFile,
   saveMultipleFile,
   deleteFile,
   deleteMultipleFile
}