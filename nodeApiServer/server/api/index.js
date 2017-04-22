import passport from 'passport';
import * as notesRoutes from './notesRoutes.js';
import * as authRoutes from './authRoutes.js';
import nodemailer from 'nodemailer';
import sendmailTransport from 'nodemailer-sendmail-transport';

export default express => {

  const router = express.Router();

  router.get('/', (req,res) => res.send('Main api `/` '));

  /**
   * Authorization api
   */
  router.post('/login', authRoutes.login);
  router.post('/signup', authRoutes.signup);

  router.get('/memberinfo', passport.authenticate('jwt', { session: false}), authRoutes.memberInfo);
  router.get('/test', (req, res) => res.send('test'));

  /**
   * middleware
   */
  router.use(authRoutes.checkTokenMiddleware);

  /**
   * Notes api
   */
  router.get('/notes', notesRoutes.getAllNotes);
  router.post('/notes', notesRoutes.saveNote);
  router.delete('/notes/:id', notesRoutes.deleteNote);
  router.put('/notes/:id', notesRoutes.updateNote);

  /**
   * Send mail test
   */
  return router;
}
