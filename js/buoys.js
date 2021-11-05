class Buoy {
  constructor() {
    this.left = {
      x: 115,
      y: 60,
      w: 4,
      color: "green",
      swing_speed: -0.2,
    };
    this.right = {
      x: 235,
      y: 70,
      w: 4,
      color: "#DA3838",
      swing_speed: 0.2,
    };
  }
  drawBuoys() {
    // left buoy
    ctx.beginPath();
    ctx.arc(this.left.x, this.left.y, this.left.w, 0, 2 * Math.PI);
    ctx.strokeStyle = "#666";
    ctx.stroke();
    ctx.fillStyle = this.left.color;
    ctx.fill();
    //right buoy
    ctx.beginPath();
    ctx.arc(this.right.x, this.right.y, this.right.w, 0, 2 * Math.PI);
    ctx.strokeStyle = "#666";
    ctx.stroke();
    ctx.fillStyle = this.right.color;
    ctx.fill();
  }
  buoyRandomDelay() {
    return Math.floor(Math.random() * 5) * 100;
  }
  moveBuoy(height, stream) {
    // left buoy
    this.left.y += stream;
    if (this.left.y + this.left.w > height) {
      this.left.y = (this.left.w + this.buoyRandomDelay()) * -1;
    }
    this.left.x = this.left.x + this.left.swing_speed;
    if (this.left.x <= 110 || this.left.x > 115) {
      this.left.swing_speed = this.left.swing_speed * -1;
    }
    // right buoy
    this.right.y += stream;
    if (this.right.y + this.right.w > height) {
      this.right.y = (this.right.w + this.buoyRandomDelay()) * -1;
    }
    this.right.x = this.right.x + this.right.swing_speed;
    if (this.right.x > 240 || this.right.x < 235) {
      this.right.swing_speed = this.right.swing_speed * -1;
    }
  }
}

const buoy = new Buoy();
