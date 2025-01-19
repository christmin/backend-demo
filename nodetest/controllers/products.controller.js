const db = require("../db");

//get all products
exports.getAll = async function (req, res) {
  try {
    let result = await db.query(`SELECT * from products`);
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

exports.getByTitle = async function (req, res) {
    try {
      let name = req.params.name;  // Get the title from the request parameters
      
      // Query the database for a category with the specified title
      let result = await db.query(`SELECT * FROM products WHERE name = $1`, [name]);
      
      let data = result.rows;
      

      if (data.length > 0) {
        res.json(data[0]);  
      } else {
        res.status(404).json({
          message: "No such item",
        });
      }
    } catch (e) {
      res.status(413).json({
        message: "Error Occurred when searching for items",
        error: e.toString(),
      });
    }
  };
  

exports.getOneByCategoryId = async function (req, res) {
  try {
    let { category_id } = req.params;

    // Check if category_id is provided
    if (!category_id) {
      return res.status(400).json({
        message: "Category ID is required",
      });
    }

    // Query the database for products with the specified category_id
    let result = await db.query(
      `SELECT * FROM products WHERE category_id = $1`,
      [category_id]
    );
    console.log("Query result:", result);

    // If no product is found for the given category_id, return a 404 error
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No products found for the given category ID",
      });
    }

    // Return the found product(s)
    let data = result.rows;
    res.json({
      data,
    });
  } catch (e) {
    // Handle any errors that occur
    res.status(500).json({
      message: "Error Occurred",
      error: e.toString(),
    });
  }
};

exports.create = async function (req, res) {
  try {
    let { name, description, category_id, year, price } = req.body;

    let created_at = new Date();
    let updated_at = new Date();

    // Perform the INSERT query
    let result = await db.query(
      `INSERT INTO products (name, description, category_id, year, price, created_at, updated_at) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [name, description, category_id, year, price, created_at, updated_at]
    );

    res.status(201).json({
      message: "Product Inserted",
    });
  } catch (e) {
    // Handle errors and return a proper response
    res.status(500).json({
      message: "Error Occurred",
      error: e.toString(),
    });
  }
};

exports.updateSingle = async function (req, res) {
  try {
    let id = req.params.id;
    let { title, description } = req.body;
    let result = await db.query(
      `UPDATE c SET title = $1, description = $2 WHERE id = $3`,
      [title, description, id]
    );
    res.json({
      message: "Record Updated",
    });
  } catch (e) {
    res.status.json({
      message: "Error Occurred",
      error: e.toString(),
    });
  }
};

exports.deleteSingle = async function (req, res) {
  try {
    let id = req.params.id;
    let result = await db.query(`DELETE FROM products WHERE id = $1`, [id]);
    res.json({
      message: "Product Deleted",
    });
  } catch (e) {
    res.status(413).json({
      message: "Error Occurred",
      error: e.toString(),
    });
  }
};
