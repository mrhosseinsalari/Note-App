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
    this._setNotes(notes);

    // set Active Note :
    if (notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
  }

  _setNotes(notes) {
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);
  }

  _setActiveNote(note) {
    this.activeNote = note;
    this.view.updateActiveNote(note);
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
        NotesAPI.saveNote({
          id: this.activeNote.id,
          title: newTitle,
          body: newBody,
        });

        this._refreshNotes();
      },

      onNoteSelect: (noteId) => {
        const selectedNote = this.notes.find(
          (note) => note.id === Number(noteId)
        );

        this._setActiveNote(selectedNote);
      },

      onNoteDelete: (noteId) => {
        NotesAPI.deleteNote(Number(noteId));
        this._refreshNotes();
      },
    };
  }
}

export default App;
