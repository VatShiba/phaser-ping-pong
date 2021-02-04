import Phaser from "phaser";

class Game extends Phaser.Scene {
  init() {
    this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0);
    this.canvas = this.sys.game.canvas;
    this.leftScore = 0;
    this.rightScore = 0;
  }

  create() {
    this.scene.run("game-background")

    this.physics.world.setBounds(-400, 0, 2000, 500);

    this.ball = this.add.circle(400, 250, 10, 0xffffff, 1);
    this.physics.add.existing(this.ball);
    this.ball.body.setBounce(1, 1);
    this.paddleLeft = this.add.rectangle(50, 250, 30, 100, 0xffffff);
    this.physics.add.existing(this.paddleLeft, true);
    this.physics.add.collider(this.paddleLeft, this.ball);

    this.paddleRight = this.add.rectangle(750, 250, 30, 100, 0xffffff);
    this.physics.add.existing(this.paddleRight, true);
    this.physics.add.collider(this.paddleRight, this.ball);
    this.ball.body.setCollideWorldBounds(true, 1, 1);
    // * Keys
    this.cursors = this.input.keyboard.createCursorKeys();
    this.leftScoreLabel = this.add.text(
      this.canvas.width / 2 - this.canvas.width / 4,
      50,
      this.leftScore,
      {
        fontSize: 50,
      }
    );
    this.rightScoreLabel = this.add.text(
      this.canvas.width / 2 + this.canvas.width / 4,
      50,
      this.rightScore,
      {
        fontSize: 50,
      }
    );
    this.leftScoreLabel.setOrigin(0.5, 0.5);
    this.rightScoreLabel.setOrigin(0.5, 0.5);

    // * Start
    this.resetBall();
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
    if (Math.abs(diff) < 50) {
      return;
    }

    const aiSpeed = 3;
    if (diff < 0) {
      // ball above padddleRight
      this.paddleRightVelocity.y -= aiSpeed;
      if (this.paddleRightVelocity.y < -5) {
        this.paddleRightVelocity.y = -5;
      }
    } else if (diff > 0) {
      // ball is below paddleRight
      this.paddleRightVelocity.y += aiSpeed;
      if (this.paddleRightVelocity.y > 5) {
        this.paddleRightVelocity.y = 5;
      }
    }
    this.paddleRight.y += this.paddleRightVelocity.y;
    this.paddleRight.body.updateFromGameObject();

    console.log("ball x", this.ball.x);
    if (this.ball.x < -30) {
      this.incrementScore("right", 1);
      this.resetBall();
    } else if (this.ball.x > 830) {
      this.incrementScore("left", 1);
      this.resetBall();
    }
  }

  /**
   *
   * @param {("left"|"right")} side - left or right
   * @param {integer} score
   */
  incrementScore(side, score) {
    switch (side) {
      case "left":
        this.leftScore += score;
        this.leftScoreLabel.setText(this.leftScore);
        break;
      case "right":
        this.rightScore += score;
        this.rightScoreLabel.setText(this.rightScore);
        break;
    }
  }

  resetBall() {
    this.ball.setPosition(400, 250);

    const randomSide = Phaser.Math.Between(0, 1);
    let angle;
    if (randomSide == 0) {
      angle = Phaser.Math.Between(-50, 50);
    } else {
      angle = Phaser.Math.Between(-230, 150);
    }

    const vector = this.physics.velocityFromAngle(angle, 400);

    this.ball.body.setVelocity(vector.x, vector.y);
  }
}

export default Game;
