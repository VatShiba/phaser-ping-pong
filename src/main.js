import Phaser from "phaser";
import TitleScreen from "./Scenes/TitleScreen";
import Game from "./Scenes/Game";
import GameBackground from "./Scenes/GameBackground";

const config = {
  width: 800,
  height: 500,
  type: Phaser.AUTO,
  backgroundColor: "#000000",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);

game.scene.add("TitleScreen", new TitleScreen());
game.scene.add("Game", Game);
game.scene.add("game-background", GameBackground);

game.scene.start("Game");
