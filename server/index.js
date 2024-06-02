const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const PrismaSessionStore = require('@quixo3/prisma-session-store').PrismaSessionStore;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4550;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(
    prisma,
    {
      checkPeriod: 2 * 60 * 1000,  // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }
  )
}));

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');

app.use('/auth', authRoutes);
app.use('/', indexRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
