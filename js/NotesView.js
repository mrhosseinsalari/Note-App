class NotesView {
  constructor(root, handlers) {
    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handlers;

    this.root = root;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;

    this.root.innerHTML = `
     <div class="notes__sidebar">
      <div class="notes__logo">NOTE APP</div>
      <div class="notes__list"></div>
      <button class="notes__add">ADD NOTE</button>
     </div>
     <div class="notes__preview">
      <input type="text" class="note__title" placeholder="note title" />
      <textarea class="note__body" placeholder="Take some note"></textarea>
     </div>
    `;

    const addNoteBtn = this.root.querySelector(".notes__add");
    const inputTitle = this.root.querySelector(".note__title");
    const inputBody = this.root.querySelector(".note__body");

    addNoteBtn.addEventListener("click", () => {
      // run add note method
      this.onNoteAdd();
    });

    [inputTitle, inputBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const newTitle = inputTitle.value.trim();
        const newBody = inputBody.value.trim();

        this.onNoteEdit(newTitle, newBody);
      });
    });
  }

  #createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 50;

    return `
     <div class="notes__list-item" data-note-id="${id}">
      <div class="notes__item-header">
        <div class="note__small-title">${title}</div>
        <span class="notes__list-trash" data-note-id="${id}">
          <i class="far fa-trash-alt"></i>
        </span>
      </div>
      <div class="note__small-body">
        ${body.substring(0, MAX_BODY_LENGTH)}
        ${body.length > MAX_BODY_LENGTH ? "..." : ""}
      </div>
      <div class="note__small-updated">
        ${new Date(updated).toLocaleString("en", {
          dateStyle: "full",
          timeStyle: "short",
        })}
      </div>
     </div>
    `;
  }

  updateNoteList(notes) {
    const notesContainer = this.root.querySelector(".notes__list");

    // empty noteList
    notesContainer.innerHTML = "";

    let notesList = "";

    for (const note of notes) {
      const { id, title, body, updated } = note;
      const noteListItem = this.#createListItemHTML(id, title, body, updated);
      notesList += noteListItem;
    }

    notesContainer.innerHTML = notesList;

    notesContainer.querySelectorAll(".notes__list-item").forEach((noteItem) => {
      noteItem.addEventListener("click", () => {
        this.onNoteSelect(noteItem.dataset.noteId);
      });
    });

    notesContainer.querySelectorAll(".notes__list-trash").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        this.onNoteDelete(item.dataset.noteId);
      });
    });
  }
}

export default NotesView;
