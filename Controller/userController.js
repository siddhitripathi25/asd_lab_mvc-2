const userService = require("../service/userService");

const getAllUsers = async(req, res) => {
  try {
    const minAge = req.query.minAge ? Number(req.query.minAge) : null;
    const users = await userService.getAllUsers(minAge);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = await userService.addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updatedUser = await userService.updateUser(id, req.body);
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const isDeleted = await userService.deleteUser(id);
    
    if (!isDeleted) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {getAllUsers,getUserById,addUser,updateUser,deleteUser};




