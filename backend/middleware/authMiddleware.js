const jwt = require("jsonwebtoken")

module.exports = function(req,res,next){

 const token = req.headers.authorization

 if(!token) return res.status(401).send("Access denied")

 try{

 const decoded = jwt.verify(token,"secret123")

 req.userId = decoded.id
 req.role = decoded.role

 next()

 }catch{

 res.status(401).send("Invalid token")

 }

}