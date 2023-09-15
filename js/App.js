import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());
    this._refreshNotes();
  }

  _refreshNotes() {
    const notes = NotesAPI.getAllNotes();

    // set Notes :
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);

    // set Active Note :
    this.activeNote = notes[0];
    this.view.updateActiveNote(notes[0]);
  }

  _handlers() {
    return {
      onNoteAdd: () => {
        const newNote = {
          title: "New Note",
          body: "Take Some Note",
        };

        NotesAPI.saveNote(newNote);
        this._refreshNotes();
      },

      onNoteEdit: (newTitle, newBody) => {
        console.log(newTitle, newBody);
      },

      onNoteSelect: (noteId) => {
        const selectedNote = this.notes.find(
          (note) => note.id === Number(noteId)
        );

        this.activeNote = selectedNote;
        this.view.updateActiveNote(selectedNote);
      },

      onNoteDelete: (noteId) => {
        console.log(noteId);
      },
    };
  }
}

export default App;
