const notes = [
  {
    id: 1,
    title: "first note",
    body: "some dummy text first",
    updated: "2023-09-12T10:10:24.385Z",
  },
  {
    id: 2,
    title: "second note",
    body: "some dummy text second",
    updated: "2023-09-13T10:10:24.385Z",
  },
];

class NotesAPI {
  static getAllNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    return savedNotes.sort(
      (noteA, noteB) => new Date(noteB.updated) - new Date(noteA.updated)
    );
  }

  static saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  static saveNote(noteToSave) {
    const notes = this.getAllNotes();

    const existedNote = notes.find((note) => note.id === noteToSave.id);

    if (existedNote) {
      existedNote.title = noteToSave.title;
      existedNote.body = noteToSave.body;
      existedNote.updated = new Date().toISOString();
    } else {
      noteToSave.id = new Date().getTime();
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }

    this.saveNotes(notes);
  }

  static deleteNote(id) {
    const notes = this.getAllNotes();
    const filteredNotes = notes.filter((note) => note.id !== id);

    this.saveNotes(filteredNotes);
  }
}
