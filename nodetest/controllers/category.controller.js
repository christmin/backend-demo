const db = require("../db");

exports.getAll = async function (req, res) {
  try {
    let result = await db.query(`SELECT * from categories`);
    let data = result.rows;
    res.json({
      data,
    });
  } catch (e) {
    res.status(413).json({
      message: "Error Occurred",
      error: e.toString(),
    });
  }
};

exports.getSingle = async function (req, res) {
  try {
    let id = req.params.id;
    let result = await db.query(`SELECT * FROM categories WHERE id = $1`, [id]);
    let data = result.rows;
    if (data.length > 0) {
      res.json(data[0]);
    } else {
      res.status(404).json({
        message: "No such category found",
      });
    }
  } catch (e) {
    res.status(413).json({
      message: "Error Occurred",
      error: e.toString(),
    });
  }
};

exports.create = async function (req, res) {
    try {
      // Extract title and description from request body
      let { title, description } = req.body;
  
      // Check if a category with the same title already exists
      let existingCategory = await db.query(
        `SELECT * FROM categories WHERE title = $1`,
        [title]
      );
  
      if (existingCategory.rows.length > 0) {
        return res.status(409).json({
          message: 'Category with the same title already exists',
        });
      }
  
      // Insert the new category
      let result = await db.query(
        `INSERT INTO categories (title, description) VALUES ($1, $2)`,
        [title, description]
      );
  
      // Respond with a success message
      res.status(201).json({
        message: "Category Inserted",
      });
    } catch (e) {
      // Handle errors
      res.status(500).json({
        message: "Error Occurred",
        error: e.toString(),
      });
    }
  };
  
  


exports.deleteSingle = async function (req, res) {
  try {
    let id = req.params.id;

    // Check if the category exists
    let checkResult = await db.query(`SELECT * FROM categories WHERE id = $1`, [
      id,
    ]);

    // 404 error if no such category
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // Delete the category
    let result = await db.query(`DELETE FROM categories WHERE id = $1`, [id]);

    // Return success response
    res.json({
      message: "Category Deleted",
    });
  } catch (e) {
    // Handle any errors that occur
    res.status(413).json({
      message: "Error Occurred",
      error: e.toString(),
    });
  }
};
