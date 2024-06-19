const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is started at http://localhost:${port}`);
});