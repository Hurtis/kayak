class River {
  constructor() {
    this.wather = {
      w: 280,
      color1: "#9dddf2",
      color2: "#079ccd",
    };
    this.shore = {
      w: 10,
      color1: "#d3ebcd",
      color2: "#faefdd",
    };
  }

  draw(width, height) {
    //Wather
    var grd = ctx.createLinearGradient(0, 0, height, this.wather.w);
    grd.addColorStop(0, this.wather.color1);
    grd.addColorStop(1, this.wather.color2);
    ctx.fillStyle = grd;
    ctx.fillRect(width / 2 - this.wather.w / 2, 0, this.wather.w, height);

    //Shore left
    ctx.fillStyle = this.shore.color1;
    ctx.fillRect(0, 0, width / 2 - this.wather.w / 2 - this.shore.w, height);
    ctx.fillStyle = this.shore.color2;
    ctx.fillRect(
      width / 2 - this.wather.w / 2 - this.shore.w,
      0,
      this.shore.w,
      height
    );
    //Shore right
    ctx.fillStyle = this.shore.color1;
    ctx.fillRect(
      width / 2 + this.wather.w / 2,
      0,
      width / 2 - this.wather.w / 2,
      height
    );
    ctx.fillStyle = this.shore.color2;
    ctx.fillRect(width / 2 + this.wather.w / 2, 0, this.shore.w, height);
  }
}

const river = new River();
