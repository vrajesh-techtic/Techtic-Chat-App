const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,res,cb){
        return cb(null,'../uploads/profile-images')
    },

    filename: function(req,res,cb){
        
    }
})