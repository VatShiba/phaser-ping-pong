import Phaser from "phaser";

class Game extends Phaser.Scene {
  init() {
    this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0);
  }

  create() {
    this.ball = this.add.circle(400, 250, 10, 0xffffff, 1);
    this.physics.add.existing(this.ball);
    this.ball.body.setBounce(1, 1);
    this.paddleLeft = this.add.rectangle(50, 250, 30, 100, 0xffffff);
    this.physics.add.existing(this.paddleLeft, true);
    this.physics.add.collider(this.paddleLeft, this.ball);

    this.paddleRight = this.add.rectangle(750, 250, 30, 100, 0xffffff);
    this.physics.add.existing(this.paddleRight, true);
    this.physics.add.collider(this.paddleRight, this.ball);

    this.ball.body.setCollideWorldBounds(true);
    this.ball.body.setVelocity(
      Phaser.Math.Between(-200, 200),
      Phaser.Math.Between(-200, 200)
    );

    // * Keys
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.up.isDown) {
      this.paddleLeft.y -= 5;
      this.paddleLeft.body.updateFromGameObject();
    } else if (this.cursors.down.isDown) {
      this.paddleLeft.y += 5;
      this.paddleLeft.body.updateFromGameObject();
    }

    const diff = this.ball.y - this.paddleRight.y;
    if (Math.abs(diff) < 10) {
      return;
    }

    const aiSpeed = 0.5;
    const aiMaxSpeed = 10;
    if (diff < 0) {
      // ball above padddleRight
      this.paddleRightVelocity.y -= aiSpeed;
      if (this.paddleRightVelocity.y < -aiMaxSpeed) {
        this.paddleRightVelocity.y = -10;
      }
    } else if (diff > 0) {
      // ball is below paddleRight
      this.paddleRightVelocity.y += aiSpeed;
      if (this.paddleRightVelocity.y > aiMaxSpeed) {
        this.paddleRightVelocity.y = 10;
      }
    }
    console.log(this.paddleRightVelocity.y);
    this.paddleRight.y += this.paddleRightVelocity.y;
    this.paddleRight.body.updateFromGameObject();
  }
}

export default Game;
