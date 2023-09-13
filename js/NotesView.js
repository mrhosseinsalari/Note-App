class NotesView {
  constructor(root, handlers) {
    const { onNoteAdd, onNoteEdit } = handlers;

    this.root = root;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;

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
}

export default NotesView;
