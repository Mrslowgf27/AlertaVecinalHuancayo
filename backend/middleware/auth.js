// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
module.exports = {
  verifyToken: (req,res,next)=>{
    const h = req.headers.authorization;
    if(!h) return res.status(401).json({error:'No token'});
    const token = h.split(' ')[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
      next();
    } catch(e) { return res.status(401).json({error:'Token inválido'}); }
  },
  requireRole: (role)=> (req,res,next)=>{
    if(!req.user) return res.status(401).json({error:'No autenticado'});
    if(req.user.role !== role) return res.status(403).json({error:'Acceso denegado'});
    next();
  }
};
