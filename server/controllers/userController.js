const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const createTable = async(req,res)=>{
    try {
        await User.createTable();
        res.send('Table created successfully');
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
};

const register = async(req,res)=>{
    try { 
        const { username, email, password } = req.body;
        const newUser = await User.addUser(username, email, password);
        res.status(201).json(newUser);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
};

const login = async(req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.findUser(email);
        if (!user) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.json({ message: 'Logged in successfully' });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
      
};

module.exports = {createTable, register, login};

