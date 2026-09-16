const bookService = require("../service/bookService");

const getAllBooks = async (req, res) => {
  try {
    const minPrice = req.query.minPrice ? Number(req.query.minPrice) : null;
    const books = await bookService.getAllBooks(minPrice);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBookById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const book = await bookService.getBookById(id);
    
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addBook = async (req, res) => {
  try {
    const newBook = await bookService.addBook(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateBook = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updatedBook = await bookService.updateBook(id, req.body);
    
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const isDeleted = await bookService.deleteBook(id);
    
    if (!isDeleted) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {getAllBooks,getBookById,addBook,updateBook,deleteBook};