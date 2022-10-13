import MovingObject from './moving_object.js';
import Astronaut from './astronaut.js';
import Game from './game.js';
import GameView from './game_view.js';
import Debris from "./debris.js";
import Sound from "./sound.js";

document.addEventListener('DOMContentLoaded', function() {
    const button = new Sound('assets/sounds/button.ogg');
    const selected = new Sound('assets/sounds/selected.wav');
    const lobbyMusic = new Sound('assets/sounds/september_song.mp3');
    const canvas = document.getElementById('game-canvas');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const ctx = canvas.getContext('2d');
    let difficulty = 'easy';
    const tutorialBox = document.getElementById('tutorial');
    let tutorialBackgrounds = [
        'assets/imagery/meteor.jpeg',
        'assets/imagery/space_junk_2.jpg',
        'assets/imagery/game_screenshot_escape_pod.png',
        'assets/imagery/game_screenshot_component.png',
        'assets/imagery/game_screenshot_escape_pod.png',
        'assets/imagery/game_screenshot_oxygen.png',
        'assets/imagery/game_screenshot_hold.png',
        'assets/imagery/game_screenshot_fireball.png',
        'assets/imagery/game_screenshot_jet.png',
        'assets/imagery/game_screenshot_steam.png',
        'assets/imagery/game_screenshot_radar.png',
        'assets/imagery/floating.jpg'




    ];
    const tutorialText = document.getElementById('tutorial-text');
    let tutorialSentences = [
        'The burning space junk headed straight for our station. It laid waste to the installation. Luckily I was able to grab on to the storage pod.',

        'Theaftermath of the explosion is a field of wreckage.',

        'Luckily my HUD is showing me that the escape pod is still intact, although damaged. If I can get to it after finding the right components to repair it, maybe I can fly back to Earth.',

        'The components seem to be scattered throughout the debris field. I need to collect them.',

        'Once I collect all the components, I will head straight to the escape pod and get the hell out of here.',

        'Damn, my suit is ripped from the explosion. I need to hurry up before I run out of oxygen.',

        'I can navigate by grabbing and holding onto the spinning debris pieces by holding <span>SPACEBAR</span>. If I <span>release SPACEBAR</span>, I can push off away from the debris towards my next target.',

        'I need to avoid the fiery balls of wreckage as I move through the debris.',
        'Ah, my EVA jetpack is out there, too! I should collect that right away...',

        '...because it will allow me to use the <span>ARROW KEYS</span> to adjust my flight trajectory. I should use it sparingly, though, becuase it consumes a lot of my oxygen.',

        'On my radar, my position is shown in blue, the components in purple, the jetpack in red, and the escape pod in green.',

        'Okay, mental review: Hold onto the debris with <span>SPACEBAR</span>, let go to fly off. Get the <span>jetpack</span> and fly around with the <span>ARROW KEYS</span>. Collect all <span>components</span>, then head to the escape pod. I can do this!'
    ]
    
    
    const toggleScreenLobby = function(id, toggle) {
        let element = document.getElementById(id);
        let display = (toggle) ? 'flex' : 'none';
        element.style.display = display;
    }
    
    const startGame = function() {
        lobbyMusic.stop();
        const gameView = new GameView(ctx, difficulty);
        document.body.requestFullscreen();
        gameView.startGame();
    }

    const clickSound = function() {
        button.play();
    }

    const changeDifficulty = function(e) {
        // let buttonDifficulty = e.target.control.value;
        console.log(e.target.control.value)
        e.target.control.checked = true;
        difficulty = e.target.control.value;
        selected.play();

    }

    const launchTutorial = function() {
        lobbyMusic.play();
        toggleScreenLobby('start-menu', false)
        toggleScreenLobby('tutorial', true)
    }

    const stepTutorial = function() {
        clickSound();
        if (tutorialSentences.length > 0) {
            tutorialText.innerHTML = `${tutorialSentences.shift()}`
            tutorialBox.style.backgroundImage = `url(${tutorialBackgrounds.shift()})`;
        } else {
            toggleScreenLobby('start-menu', true)
            toggleScreenLobby('tutorial', false)
        }
    }


    
    
    const easySelect = document.getElementById('easy-button');
    easySelect.addEventListener('click', changeDifficulty);

    const mediumSelect = document.getElementById('medium-button');
    mediumSelect.addEventListener('click', changeDifficulty);

    const hardSelect = document.getElementById('hard-button');
    hardSelect.addEventListener('click', changeDifficulty);

    const startButton = document.getElementById('start-button');
    startButton.addEventListener('mouseover', clickSound);
    startButton.addEventListener('click', startGame);

    const tutorialButton = document.getElementById('tutorial-button');
    tutorialButton.addEventListener('mouseover', clickSound);
    tutorialButton.addEventListener('click', launchTutorial);

    const tutorialNext = document.getElementById('tutorial-next');
    tutorialNext.addEventListener('click', stepTutorial);
    
    window.addEventListener('click', () => {
        lobbyMusic.play();
    })


    



    



})