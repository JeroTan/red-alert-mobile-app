export class UserEmail {
  constructor(public value: string) {}

  exceedMaxLength() {
    return this.value.length > 100;
  }
  stripOverflowLength() {
    if (this.exceedMaxLength()) {
      this.value = this.value.slice(0, 100);
    }
    return this;
  }
}
