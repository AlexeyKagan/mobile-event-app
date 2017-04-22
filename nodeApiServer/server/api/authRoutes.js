import passport from 'passport';
import { findUserWithJwtPayloadId } from '../config/passport.js';
import { noteSchema } from '../models/Note.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.json';

findUserWithJwtPayloadId(passport);

export function login(req, res) {

  noteSchema.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.send({ success: false, msg: 'Authentication failed. User not found.' });
      return;
    }

    // TODO encode password here.
    if (user.password !== req.body.password) {
      res.send({success: false, msg: 'Authentication failed. Wrong password.'});
      return;
    }

    // If user is found and password is right create a token.
    const token = jwt.sign({ username: user.username }, config.secret);

    res.json({success: true, token: `${token}`});

  });
}

export function signup(req, res) {

  console.log('post signup', req.body.username, req.body.password);

  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: 'Please pass name and password.'});
    return;
  }

  // TODO don't foget logic for body.email
  console.log('post signup', req.body.username, req.body.password, req.body.email, req.body.date, req.body.picture);
  const newUser = new noteSchema({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    date: req.body.date,
    picture: req.body.picture,
    synchronization: [],
    tasks: []
  });

  newUser.save((err, user) => {
    if (err) {
      console.log('err:', err);
      return res.json({success: false, msg: 'Username already exists.'});
    }

    const token = jwt.sign({ username: user.username }, config.secret);

    res.json({success: true, msg: 'Successful created new user.', token});
  });
}

export function memberInfo(req, res) {

  const token = req.body.token || req.headers.authorization || req.headers['x-access-token'];

  if (token) {

    const decoded = jwt.verify(token, config.secret);

    noteSchema.findOne({
      username: decoded.username
    }, (err, user) => {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      }

      res.json({success: true, msg: 'Welcome in the member area ' + user.username + '!'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
}

export function checkTokenMiddleware (req, res, next) {

  console.log('Somebody just came to our app');

  const token = req.body.token || req.headers.authorization || req.headers['x-access-token'];

  if (token) {

    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'
        });
      }
      else {
        req.decoded = decoded;
        next();
      }
    })
  } else {
    res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
}

