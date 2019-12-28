export default class Slide {
  constructor(list) {
    this.list = list;
    this.cur = list[0];
  };
  prev() {
    let index = this.list.indexOf(this.cur),
      newitem = null;
    if (index === 0) {
      newitem = this.list[this.list.length - 1];
    } else {
      newitem = this.list[index - 1];
    }
    this.cur = newitem;
    return newitem;
  }

  next() {
    let index = this.list.indexOf(this.cur),
      newitem = null; // 4
    if (index >= this.list.length - 1) {
      newitem = this.list[0];
    } else {
      newitem = this.list[index + 1];
    }
    this.cur = newitem;
    return newitem;
  }
  to(index) {
    if (index >= 0 && index <= this.list.length - 1) {
      this.cur = this.list[index];
      return this.list[index];
    }
  }

  slide(type, ) {
    let direction = this.getItemDirection();
  }

  getItemDirection(type) {
    let index = this.list.indexOf(this.cur);
    if(index >= this.list.length-1){
      
    }
  }

  // loop() {
  //   this.timeout = setInterval(() => {
  //     let index = this.list.indexOf(this.cur);
  //     if (index >= this.list.length - 1) { // 4
  //       this.cur = this.list[0];
  //     }
  //     this.cur = this.list[index + 1];
  //   }, this.delayTime);
  // }
}