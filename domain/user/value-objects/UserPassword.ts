export class UserPassword {
  constructor(public value: string) {}
  exceedMaxLength() {
    return this.value.length > 255;
  }
  stripOverflowLength() {
    if (this.exceedMaxLength()) {
      this.value = this.value.slice(0, 255);
    }
    return this;
  }
}
