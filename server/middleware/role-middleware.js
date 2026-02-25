module.exports = (allowedRoles = []) => {
  if (typeof allowedRoles === 'string') {
    allowedRoles = [allowedRoles];
  }

  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: 'Authentication required',
        });
      }

      const userRole = req.user.roleName;

      // console.log('User role:', userRole);
      // console.log('Allowed roles:', allowedRoles);

      const hasAccess = allowedRoles.includes(userRole);

      if (!hasAccess) {
        return res.status(403).json({
          message: 'You do not have permission to access this resource',
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
