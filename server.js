const express = require('express'); //* import express
const mongoose = require('mongoose'); //* impoirt mongoose

const app = express(); //* instanciate express server
const PORT = process.env.PORT || 3001; //* define server port

//* express server middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes')); //* app routes default directory

//* connect Mongoose  when we start the app server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
   //* useFindAndModify: false, use only for mongoose version < 6+
   useNewUrlParser: true,
   useUnifiedTopology: true,
})
   .catch(err => console.error(err));

mongoose.set('debug', false); //* log mongo queries being executed

//* start express server
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
