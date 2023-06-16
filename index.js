const form = document.querySelector("#new-note-form");
const notesList = document.querySelector(".notes-list");

getNotesFromLocalStorage();

function getNotesFromLocalStorage() {
  if (localStorage.getItem("notes")) {
    JSON.parse(localStorage.getItem("notes")).forEach((note) => {
      let html = `<li>
        <div class="new-note">
          <h3>${note.name}</h3>
          <p>${note.content}</p>
          <p>Created: ${note.dataCreated}</p>
          <button class="note__delete-btn" title="delete note" id='${note.id}'>
            <svg role="img" width="30px" height="30px" class="note__delete-icon">
              <use href="./icons.svg#icon-x-circle"></use>
            </svg>
          </button>
        </div>
      </li>`;
      notesList.insertAdjacentHTML("beforeend", html);
    });
  }
}

const deleteNoteBtns = document.querySelectorAll(".note__delete-btn");
console.log(deleteNoteBtns);

function addNode() {
  const nowDate = new Date(Date.now());
  const notesArr = [
    {
      id: Math.floor(Math.random() * 1000),
      name: form.elements[0].value,
      content: form.elements[1].value,
      dataCreated: `${
        (nowDate.getHours() < 10 ? "0" : "") + nowDate.getHours()
      }:${(nowDate.getMinutes() < 10 ? "0" : "") + nowDate.getMinutes()} ${
        (nowDate.getDate() < 10 ? "0" : "") + nowDate.getDate()
      }.${
        (nowDate.getMonth() < 10 ? "0" : "") + nowDate.getMonth()
      }.${nowDate.getFullYear()}`,
    },
  ];
  const localStorageNotes = localStorage.getItem("notes");
  if (localStorageNotes) {
    localStorage.setItem(
      "notes",
      JSON.stringify(JSON.parse(localStorageNotes).concat(notesArr))
    );
  } else {
    localStorage.setItem("notes", JSON.stringify(notesArr));
  }

  // form.reset();
}

function deleteNote(event) {
  const localStorageNotes = localStorage.getItem("notes");
  console.log(localStorageNotes);

  localStorage.setItem(
    "notes",
    JSON.stringify(
      JSON.parse(localStorageNotes).filter(
        (note) => event.currentTarget.id === note.id
      )
    )
  );
  location.reload();
}

form.addEventListener("submit", addNode);
deleteNoteBtns.forEach((btn) => btn.addEventListener("click", deleteNote));
