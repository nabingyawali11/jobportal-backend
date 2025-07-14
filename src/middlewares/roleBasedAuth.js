function rolesBasedAuth (roles){
  return (req, res, next) => {
    const userRole = req.user.roles;
    if (!userRole.includes(roles)) {
      return res.status(403).send("Access Denied XXXXX..");
    }
console.log("Roles",userRole);
    next();
  };
};

export default rolesBasedAuth;
