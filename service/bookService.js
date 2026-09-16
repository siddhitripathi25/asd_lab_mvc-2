const fs = require("fs").promises;
const path = require("path");

const pathToFile2 = path.join(__dirname, "../database/books.json");

const getAllBooks = async (minPrice) => {
  const data = await fs.readFile(pathToFile2, "utf-8");
  const books = JSON.parse(data);
  if (minPrice) {
    return books.filter((book) => book.price >= minPrice);
  }
  return books;
};

const getBookById = async (id) => {
  const data = await fs.readFile(pathToFile2, "utf-8");
  const books = JSON.parse(data);
  return books.find((book) => book.id === id);
};

const addBook = async (bookData) => {
  const data = await fs.readFile(pathToFile2, "utf-8");
  const books = JSON.parse(data);
  
  const newBook = {
    id: books.length + 1,
    title: bookData.title,
    author: bookData.author,
    price: bookData.price,
    category: bookData.category,
    available: bookData.available,
  };
  
  books.push(newBook);
  await fs.writeFile(pathToFile2, JSON.stringify(books, null, 2));
  return newBook;
};

const updateBook = async (id, updateData) => {
  const data = await fs.readFile(pathToFile2, "utf-8");
  const books = JSON.parse(data);
  
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    return null;
  }
  
  const updatedBook = {
    ...books[index],
    ...updateData,
  };
  
  books[index] = updatedBook;
  await fs.writeFile(pathToFile2, JSON.stringify(books, null, 2));
  return updatedBook;
};

const deleteBook = async (id) => {
  const data = await fs.readFile(pathToFile2, "utf-8");
  const books = JSON.parse(data);
  
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    return false;
  }
  
  books.splice(index, 1);
  await fs.writeFile(pathToFile2, JSON.stringify(books, null, 2));
  return true;
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};