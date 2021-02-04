import Phaser from "phaser";

export default class GameBackground extends Phaser.Scene {
  preload() {}

  create() {
    const { width, height } = this.sys.game.canvas;
    this.add
      .line(width / 2, height / 2, 0, 0, 0, height, 0xffffff)
      .setLineWidth(2.5, 2.5);

    this.add.circle(width / 2, height / 2, 50).setStrokeStyle(5, 0xffffff, 1);
  }
}
