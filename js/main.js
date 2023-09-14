import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

const app = document.getElementById("app");
const notes = NotesAPI.getAllNotes();

const view = new NotesView(app, {
  onNoteAdd() {
    console.log("note has been added");
  },

  onNoteEdit(newTitle, newBody) {
    console.log(newTitle, newBody);
  },

  onNoteSelect(noteId) {
    console.log(noteId);
  },
});

view.updateNoteList(notes);
