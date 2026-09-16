const fs = require("fs").promises;
const path = require("path");

const pathToFile = path.join(__dirname, "../database/users.json");

const getAllUsers = async (minAge) => {
  const data = await fs.readFile(pathToFile, "utf-8");
  const users = JSON.parse(data);
  if (minAge) {
    return users.filter((user) => user.age >= minAge);
  }
  return users;
};

const getUserById = async (id) => {
  const data = await fs.readFile(pathToFile, "utf-8");
  const users = JSON.parse(data);
  return users.find((user) => user.id === id);
};

const addUser = async (userData) => {
  const data = await fs.readFile(pathToFile, "utf-8");
  const users = JSON.parse(data);
  
  const newUser = {
    id: users.length + 1,
    name: userData.name,
    email: userData.email,
    age: userData.age,
    city: userData.city,
  };
  
  users.push(newUser);
  await fs.writeFile(pathToFile, JSON.stringify(users, null, 2));
  return newUser;
};

const updateUser = async (id, updateData) => {
  const data = await fs.readFile(pathToFile, "utf-8");
  const users = JSON.parse(data);
  
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null; // Not found
  }
  
  const updatedUser = {
    ...users[index],
    ...updateData,
  };
  
  users[index] = updatedUser;
  await fs.writeFile(pathToFile, JSON.stringify(users, null, 2));
  return updatedUser;
};

const deleteUser = async (id) => {
  const data = await fs.readFile(pathToFile, "utf-8");
  const users = JSON.parse(data);
  
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return false; // Not found
  }
  
  users.splice(index, 1);
  await fs.writeFile(pathToFile, JSON.stringify(users, null, 2));
  return true; // Deleted
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};