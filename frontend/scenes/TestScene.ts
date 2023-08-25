import { Scene } from "phaser";

type CursorKeys = {
  W: Phaser.Input.Keyboard.Key | undefined,
  S: Phaser.Input.Keyboard.Key | undefined,
  A: Phaser.Input.Keyboard.Key | undefined,
  D: Phaser.Input.Keyboard.Key | undefined,
}

export default class TestScene extends Scene {
  private cursors: CursorKeys = {
    W: undefined,
    S: undefined,
    A: undefined,
    D: undefined
  };

  private pacman!: Phaser.GameObjects.Sprite;
  private testtile!: Phaser.GameObjects.Image;

  preload () {
    this.load.image('testtile', '/wfc-pacman-traveler/resources/tiles/testtile.png')
    this.load.image('pacman', '/wfc-pacman-traveler/resources/tiles/pacman.png')
  }

  constructor() {
    super('testscene');
  }

  create() {
    this.testtile = this.add.image(0, 0, 'testtile');

    this.pacman = this.add.sprite(0, 0, 'pacman');

    this.cameras.main.startFollow(this.pacman, true);

    if (this.input.keyboard != null) {
      this.cursors.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.cursors.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.cursors.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.cursors.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);  
    }
  }

  update() {
    if (this.cursors.W?.isDown) {
      this.pacman.y -= 4;
      console.log(this.pacman.x+", "+this.pacman.y)
    }
    if (this.cursors.S?.isDown) {
      this.pacman.y += 4;
      console.log(this.pacman.x+", "+this.pacman.y)
    }
    if (this.cursors.A?.isDown) {
      this.pacman.x -= 4;
      console.log(this.pacman.x+", "+this.pacman.y)
    }
    if (this.cursors.D?.isDown) {
      this.pacman.x += 4;
      console.log(this.pacman.x+", "+this.pacman.y)
    }
  }
}