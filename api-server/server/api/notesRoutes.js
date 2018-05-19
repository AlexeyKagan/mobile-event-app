import { noteSchema } from '../models/Note';
import { sendEmail } from '../utils/SendEmail.js';
import schedule from 'node-schedule';
// @todo rewrite it
export function getAllNotes(req, res) {
  const decoded = req.decoded;

  if (!decoded) { res.json({success: false, msg: 'No token provided'}) }

  noteSchema.findOne({
    username: decoded.username
  }, (err, user) => {
    if (err) throw err;

    res.json({ success: true, tasks: user.tasks});
  });

}

export function saveNote(req, res) {
  const decoded = req.decoded;

  const task = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    timeAt: req.body.timeAt,
    dateAt: req.body.dateAt,
    notifyOf: req.body.notifyOf
  };

  let day;
  const [ notifyOfMinutes ] = (req.body.notifyOf || '').split(' ');

  if (req.body.dateAtServer) {
    const [hour, minutes] = req.body.timeAt.split(':');
    const [day0, month, year] = req.body.dateAtServer.split('/');

    day = new Date(year, month, day0, hour - 3, notifyOfMinutes ? (minutes - notifyOfMinutes) :  minutes, 0);
  }
  if (day > new Date()) {

    const sched = schedule.scheduleJob(day, function() {
      if (req.body.emails) {
        sendEmail({ emailsTo: req.body.emails, subject: req.body.title, html: '', text: req.body.description })
      }
    });
  }

  noteSchema.update({ username: decoded.username }, { $push: { tasks: task }}, { upsert:true }, function(err){
    if(err) throw err;

    res.json({success: true, msg: 'Task success added'});
  });
}

export function deleteNote(req, res) {
  const decoded = req.decoded;

  noteSchema.findOne({
    username: decoded.username
  }).exec((err, user) => {

    if (err) throw err;

    const tasks = user.tasks.filter(t => t.id !== req.params.id);

    user.tasks = tasks;
    user.save();

    res.json({ success: true, msg: 'Task success deleted.', tasks: tasks });
  });
}

export function updateNote(req, res) {
  res.send('update note')
}

export function getUserInf(req, res) {

}
