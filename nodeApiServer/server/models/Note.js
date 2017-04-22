import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    date: { type: Date },
    createdAt: {type: Date, default: Date.now},
    picture: { type: Schema.Types.Mixed },
    synchronization: Schema.Types.Mixed,
    tasks: Schema.Types.Mixed
});

export const noteSchema = mongoose.model('Note', NoteSchema);

export class Note {

  getAllNotes() {

  }

  createNote(data) {

  }

  updateNote(id, data) {

  }

  deleteNote(id) {

  }
}

export class Authorization {

  login() {

  }

  signup() {

  }
}
