import {Game as Gametype} from "phaser";

const Game = () => {

    var game: Gametype;

    async function initPhaser() {
        const Phaser = await import('phaser');

        const { default : TestScene } = await import('../../scenes/TestScene');


        var screenWidth = window.innerWidth;
        var screenHeight = window.innerHeight;


        const phaserGame = new Phaser.Game({
            type: Phaser.AUTO,
            title: 'WFC Pacman Traveler',
            parent: 'game-content',

            width: screenWidth,
            height: screenHeight,
            pixelArt: true,
            scale: {
                zoom: 1
            },
            scene: [
                TestScene
            ],
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                    gravity: {y: 0}
                }
            },
            backgroundColor: '#000000'
        });

        game = phaserGame;

    }
    
    initPhaser();

    return(<div id="phaser-container" />);

}

const WFCPacmanTravelerHome : React.FC = () => {
    return (
        <div id="game-content" key="game-content">
            <Game/>
        </div>
    );
};

export default WFCPacmanTravelerHome;