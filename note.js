export class Note {
  #title;
  #text;
  #uid;
  #isFavorite;
  #isEdited;
  #date;
  #backgroundColor;

  get uid() {
    return this.#uid;
  }

  get date() {
    return this.#date;
  }
  get title() {
    return this.#title;
  }
  get text() {
    return this.#text;
  }

  get isEdited() {
    return this.#isEdited;
  }

  get isFavorite() {
    return this.#isFavorite;
  }

  get backgroundColor() {
    return this.#backgroundColor;
  }

  constructor({
    title,
    text,
    uid,
    isFavorite,
    isEdited,
    date,
    backgroundColor,
  }) {
    this.#title = title;
    this.#text = text;
    this.#uid = uid ? uid : this.generateId();
    this.#isFavorite = isFavorite ? isFavorite : false;
    this.#date = date ? new Date(date) : new Date();
    this.#isEdited = isEdited ? isEdited : false;
    this.#backgroundColor = backgroundColor;
  }

  generateId() {
    return `${Math.floor(Math.random() * 1000)}-${Math.floor(
      Math.random() * 1000
    )}-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 1000)}`;
  }

  edit(title, text) {
    this.#title = title;
    this.#text = text;
    this.#date = new Date();
    this.#isEdited = true;
  }

  toObject() {
    return {
      title: this.#title,
      text: this.#text,
      uid: this.#uid,
      isFavorite: this.#isFavorite,
      isEdited: this.#isEdited,
      date: this.#date.getTime(),
      backgroundColor: this.#backgroundColor,
    };
  }

  toggleFav() {
    this.#isFavorite = !this.#isFavorite;
  }
}
