const db = require('../db');

exports.authenticateAdmin = async (req, res, next) => {
  const { username, password } = req.body;

  let result = await db.query(
    `SELECT * FROM users WHERE username = $1 AND password = $2 AND admin = true`,
    [username, password]
  );

  if (result.rows.length === 0) {
    return res.status(403).json({
      message: 'Access denied, not an admin or invalid credentials',
    });
  }

  next();
};
