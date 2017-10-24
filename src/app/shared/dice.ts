export class Dice {
  number: number    = 0;
  selected: boolean = false;

  toggle() {
    this.selected = !this.selected;
  }

  roll() {
    this.number = Math.floor(Math.random() * 6) + 1;
  }

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }

  reset() {
    this.number   = 0;
    this.selected = false;
  }
}
