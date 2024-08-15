// db.js
import Realm from 'realm';

// Define the Note schema
const NoteSchema = {
  name: 'Note',
  properties: {
    _id: 'int',
    note: 'string',
    date: 'string',
  },
  primaryKey: '_id',
};

// Initialize Realm
const realm = new Realm({ schema: [NoteSchema] });

export const createNote = (noteText, date) => {
  realm.write(() => {
    realm.create('Note', {
      _id: realm.objects('Note').length + 1,
      note: noteText,
      date: date,
    });
  });
};

export const getNotes = () => {
  return realm.objects('Note');
};

export const deleteNote = (id) => {
  realm.write(() => {
    const note = realm.objectForPrimaryKey('Note', id);
    realm.delete(note);
  });
};

export const updateNote = (id, noteText, date) => {
  realm.write(() => {
    const note = realm.objectForPrimaryKey('Note', id);
    note.note = noteText;
    note.date = date;
  });
};
