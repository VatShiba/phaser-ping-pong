import Phaser from "phaser";

class Game extends Phaser.Scene {
  preload() {}

  create() {
    const ball = this.add.circle(400, 250, 10, 0xffffff, 1);
    this.physics.add.existing(ball);
    ball.body.setBounce(1, 1);
    this.paddleLeft = this.add.rectangle(50, 250, 30, 100, 0xffffff);
    this.physics.add.existing(this.paddleLeft, true);
    this.physics.add.collider(this.paddleLeft, ball);

    ball.body.setCollideWorldBounds(true);
    ball.body.setVelocity(-200, 0);

    // * Keys
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.up.isDown) {
      this.paddleLeft.y -= 5
      this.paddleLeft.body.updateFromGameObject()
    } else if (this.cursors.down.isDown) {
      this.paddleLeft.y += 5
      this.paddleLeft.body.updateFromGameObject()
    }
  }
}

export default Game;
