const db = require('../db');


exports.login = async function (req, res) {
  try {
    const { admin, password } = req.body;

    
    let result = await db.query(
      `SELECT * FROM users WHERE admin = $1 AND password = $2`,
      [admin, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: 'Login failed',
      });
    }

    res.status(200).json({
      message: 'Login successfully',
    });
  } catch (e) {
    res.status(500).json({
      message: 'Error occurred during login',
      error: e.toString(),
    });
  }
};

