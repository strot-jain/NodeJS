export function authMiddleware(roleRequired) {
  return (req, res, next) => {
    const userRole = req.headers['role'];
    console.log(req.headers);
    if (!userRole) {
      return res.status(401).json({ error: "Role not provided" });
    }
    if (roleRequired === "admin" && userRole !== "admin") {
      return res.status(403).json({ error: "Admin access only" });
    }
    if (Array.isArray(roleRequired) && !roleRequired.includes(userRole)) {
      return res.status(403).json({ error: "Not allowed for your role" });
    }
  };
}
