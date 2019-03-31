const uuidv4 = require('uuid/v4');
const db = require('../modules/db');

class User {
  static welcome(req, res) {
    res.status(200).json({
      success: true,
      message: 'Welcome to simple CRUD'
    })
  };

  static async createUser(req, res) {
    const text = `INSERT INTO
    users(id, name, email, gender, createdAt, updatedAt)
    VALUES($1, $2, $3, $4, $5, $6)
    returning *`;

    const values = [
      uuidv4(),
      req.body.name,
      req.body.email,
      req.body.gender,
      new Date(),
      new Date()
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).json({
        success: true,
        message: 'User created',
        user: rows
      })
    }catch(error){
      return res.status(400).send(error);
    }
  }

  static async getUsers(req, res) {
    const findAllQuery = 'SELECT * FROM users';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).json({
        success: true,
        message: 'All users in the database',
        rows,
        rowCount
      })
    }catch(error) {
      return res.status(400).json({
        success: false,
        message: 'An error occurred',
        error
      })
    }
  }

  static async getOneUser(req, res) {
    const text = 'SELECT * FROM users WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);

      if(rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User was not found',
          user: rows
        })
      }
    return res.status(200).json({
      success: true,
      message: 'user found',
      user: rows
    })
    }catch(error){
      return res.status(400).json({
        success: false,
        message: 'An error occurred',
        error
      })
    }
  };

  static async updateUser(req, res) {
    const findOneQuery = 'SELECT * FROM users WHERE id=$1';
    const updateOneQuery =`UPDATE users
      SET name=$1,email=$2,gender=$3,updatedAt=$4
      WHERE id=$5 returning *`;
      try {
        const { rows } = await db.query(findOneQuery, [req.params.id]);
        if(rows.length === 0) {
          return res.status(404).json({
            success: false,
            'message': 'User not found'
          });
        }
        const values = [
          req.body.name || rows[0].success,
          req.body.email || rows[0].email,
          req.body.gender || rows[0].gender,
          new Date(),
          req.params.id
        ];
        const response = await db.query(updateOneQuery, values);
        return res.status(200).json({
          success: true,
          message: 'User updated',
          user: response.rows
        });
      } catch(error) {
        return res.status(400).json({
          success: false,
          message: 'An error occurred',
          error
        });
      }
    }

  static async deleteUser(req, res){
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if(rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
          rows
        })
      }
      return res.status(200).json({
        success: true,
        message: 'User deleted',
        user: rows
      })
    }catch(error) {
      return res.status(400).json({
        success: false,
        message: 'Am error occurred',
        error
      })
    }
  }
};

module.exports = User;

