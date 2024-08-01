const mongoose = require('mongoose');
mongoose
    .connect('mongodb+srv://cpts9850:Cpts1234@cluster0.fvblynd.mongodb.net/?retryWrites=true&w=majority', {})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));