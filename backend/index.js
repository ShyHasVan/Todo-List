const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://shivr2705:ofelCmoCFbavXbho@todo.3bigooe.mongodb.net/todo_list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

const todosRouter = require('./api/todo.js');
app.use('/todos', todosRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
