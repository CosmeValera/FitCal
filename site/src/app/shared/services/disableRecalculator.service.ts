export class DisableRecalculator {
  disableButtonRecalculate: boolean = false;

  constructor() {}

  disableRecalculate() {
    this.disableButtonRecalculate = true;
  }

  enableRecalculate() {
    this.disableButtonRecalculate = false;
  }
}
