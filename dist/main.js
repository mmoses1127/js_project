!function(){"use strict";!function(){class t{constructor(t){this.sound=document.createElement("audio"),this.sound.src=t,this.sound.setAttribute("preload","auto"),this.sound.setAttribute("controls","none"),this.sound.setAttribute("muted","muted"),this.sound.style.display="none",document.body.appendChild(this.sound),this.play=function(){this.sound.play()},this.stop=function(){this.sound.pause(),this.sound.currentTime=0},this.restart=function(){this.sound.currentTime=0,this.play()},this.loop=function(){this.sound.addEventListener("ended",(t=>{this.restart()}))},this.muteToggle=()=>{this.sound.muted?this.sound.muted=!1:this.sound.muted=!0}}}function s(t,s,e){return s in t?Object.defineProperty(t,s,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[s]=e,t}class e{constructor(e){s(this,"drawObject",(function(t){let s=new Image;s.src=this.image,t.drawImage(s,this.pos[0]-this.radius-this.game.cameraX,this.pos[1]-this.radius-this.game.cameraY,2*this.radius,2*this.radius)})),s(this,"spinDraw",(function(t){let s=new Image;s.src=this.image,t.save(),t.translate(this.pos[0]-this.game.cameraX,this.pos[1]-this.game.cameraY),t.rotate(this.rotation),t.translate(-(this.pos[0]-this.game.cameraX),-(this.pos[1]-this.game.cameraY)),t.drawImage(s,this.pos[0]-this.radius-this.game.cameraX,this.pos[1]-this.radius-this.game.cameraY,2*this.radius,2*this.radius),t.restore()})),s(this,"drawPoint",(function(t){t.fillStyle=this.color,t.beginPath(),t.arc(this.pos[0]-this.game.cameraX,this.pos[1]-this.game.cameraY,1,0,2*Math.PI,!1),t.fill()})),s(this,"move",(function(){this.throttleVelocity(),this.pos[0]+=this.vel[0],this.pos[1]+=this.vel[1],this.pos=this.game.wrap(this.pos)})),s(this,"isCollidedWith",(function(t){return.9*(this.radius+t.radius)>=Math.sqrt((t.pos[0]-this.pos[0])**2+(t.pos[1]-this.pos[1])**2)})),s(this,"canBeGrabbed",(function(t){return this.radius+t.radius+30>=Math.sqrt((this.pos[0]-t.pos[0])**2+(this.pos[1]-t.pos[1])**2)})),this.pos=e.pos,this.vel=e.vel,this.radius=e.radius,this.color=e.color,this.game=e.game,this.collideSound=new t("../assets/sounds/collision.wav"),this.maxVelocity=6}drawShrunk(t){t.fillStyle=this.color,t.beginPath(),t.arc(this.pos[0]/4e3*200,this.pos[1]/4e3*200,3,0,2*Math.PI,!1),t.fill()}throttleVelocity(){for(let t=0;t<2;t++)this.vel[t]>this.maxVelocity?this.vel[t]=this.maxVelocity:this.vel[t]<-this.maxVelocity&&(this.vel[t]=-this.maxVelocity)}randomVec(t){const s=2*Math.PI*Math.random();return this.scale([Math.sin(s),Math.cos(s)],t)}randomRotation(){return 2*Math.random()*Math.PI/180}scale(t,s){return[t[0]*s,t[1]*s]}stepRotation(){this.rotation+=this.rotationSpeed}bounce(){this.vel[0]=-this.vel[0],this.vel[1]=-this.vel[1],this.pos[0]+=5*this.vel[0],this.pos[1]+=5*this.vel[1]}resetVelocity(t){this.vel[0]=t[0],this.vel[1]=t[1]}combinePositions(t){this.pos[0]+=t[0],this.pos[1]+=t[1]}opposingAngle(t){return Math.atan2(-(this.pos[1]+t.pos[1]),-(this.pos[0]-t.pos[0]))}makeVector(t,s){return this.scale([Math.sin(s),Math.cos(s)],t)}toDegrees(t){return 180*t/Math.PI}toRads(t){return t*Math.PI/180}}class i extends e{constructor(t,s){super({color:"red",radius:100,vel:[0,0],pos:t,game:s}),this.vel=this.randomVec(3),this.rotationSpeed=this.toRads(2*Math.random()*Math.PI),this.rotation=0,this.image="../assets/imagery/large_debris_burning.png"}}class a extends e{constructor(t){super({color:"blue",radius:100,vel:[0,0],pos:[0,0],game:t}),this.pos=t.astronaut.pos,this.vel=this.randomVec(3),this.rotationSpeed=0,this.rotation=0,this.image="../assets/imagery/long_satellite.jpg"}}class o extends e{constructor(s){var e,i;super({color:"green",radius:40,vel:[0,0],pos:[600,0],game:s}),i=function(t){return.5*(this.radius+t.radius)>=Math.sqrt((t.pos[0]-this.pos[0])**2+(t.pos[1]-this.pos[1])**2)},(e="astronautCollision")in this?Object.defineProperty(this,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):this[e]=i,this.rotation=0,this.maxRotationSpeed=1,this.stick(this.game.debris[0]),this.inventory=[],this.oxygen=100,this.dead=!1,this.image="assets/imagery/astronaut.png",this.pushoffSpeed=1,this.oxygenRate=1,this.loseOxygen(),this.chokingSound=new t("../assets/sounds/choking.wav")}loseOxygen(){setInterval((()=>{this.oxygen-=this.oxygenRate}),2e3)}stick(t){this.surface=t,this.rotation=this.opposingAngle(this.surface),this.rotationSpeed=this.surface.rotationSpeed,this.vel=[...this.surface.vel]}pushOff(t){let s=this.makeVector(6,-this.rotation);this.surface=null,this.rotationSpeed=0,this.resetVelocity(s)}putOnCircumference(t){let s=this.makeVector(t.radius,-this.rotation),e=[t.pos[0]+s[0],t.pos[1]+s[1]];this.pos=e}increasePower(){setInterval((()=>{this.pushoffSpeed<10&&(this.pushoffSpeed+=1)}),300)}resetPower(){this.pushoffSpeed=1}choking(){}throttleRotation(){this.rotationSpeed>this.maxRotationSpeed&&(this.rotationSpeed=this.maxRotationSpeed),this.rotationSpeed<-this.maxRotationSpeed&&(this.rotationSpeed=-this.maxRotationSpeed)}}class n extends e{constructor(t,s){super({color:"white",radius:50,vel:[0,0],pos:t,game:s}),this.image="../assets/imagery/gear.png",this.caught=!1}}class h extends e{constructor(t,s){super({color:"orange",radius:130,vel:[0,0],pos:t,game:s}),this.image="../assets/imagery/flame_ball.gif"}}function r(t,s,e){return s in t?Object.defineProperty(t,s,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[s]=e,t}class u{constructor(s){r(this,"addDebris",(function(){let t=[];for(let s=0;s<this.NUM_DEBRIS;s++)t.push(new i(this.randomPosition(),this));return t})),r(this,"addSatellites",(function(){let t=[];for(let s=0;s<this.NUM_SATELLITES;s++)t.push(new a(this));return t})),r(this,"addComponents",(function(){let t=[];for(let s=0;s<this.NUM_COMPONENTS;s++)t.push(new n(this.randomPosition(),this));return t})),r(this,"addFlames",(function(){let t=[];for(let s=0;s<this.NUM_FLAMES;s++)t.push(new h(this.randomPosition(),this));return t})),r(this,"randomPosition",(function(){let t,s;return t=Math.floor(4e3*Math.random()),s=Math.floor(4e3*Math.random()),[t,s]})),r(this,"draw",(function(){this.ctx.clearRect(0,0,this.CANVAS_WIDTH,this.CANVAS_HEIGHT);for(let t=0;t<this.objects.length;t++)!0!==this.objects[t].caught&&this.objects[t].spinDraw(this.ctx);this.displayOxygen(),this.drawMinimap()})),r(this,"drawSteam",(function(){let t=new Image;t.src=this.steamImage,this.ctx.drawImage(t,this.astronaut.pos[0]+100-this.cameraX,this.astronaut.pos[1]-this.cameraY,2*this.radius,2*this.radius),console.log("drew steam")})),r(this,"moveObjects",(function(){this.astronaut.surface&&this.astronaut.putOnCircumference(this.astronaut.surface);for(let t=0;t<this.objects.length;t++)this.objects[t].move(),this.objects[t].stepRotation()})),r(this,"wrap",(function(t){let s=[this.MAP_WIDTH,this.MAP_HEIGHT];for(let e=0;e<t.length;e++)(t[e]<0||t[e]>s[e])&&(t[e]=s[e]-t[e]);return t})),r(this,"checkCollisions",(function(){for(let t=0;t<this.debris.length;t++)for(let s=t+1;s<this.debris.length;s++)this.debris[t].isCollidedWith(this.debris[s])&&(this.debris[t].bounce(),this.debris[s].bounce())})),r(this,"checkAstronautCollision",(function(){if(!this.astronaut.surface)for(let t=0;t<this.debris.length;t++)this.astronaut.astronautCollision(this.debris[t])&&(console.log("astronaut hit!"),this.debris[t].bounce(),this.astronaut.bounce())})),r(this,"checkFlameCollision",(function(){for(let t=0;t<this.flames.length;t++)this.astronaut.astronautCollision(this.flames[t])&&(console.log("astronaut hit!"),this.astronaut.oxygen=0)})),r(this,"componentPickup",(function(){if(!this.astronaut.surface)for(let t=0;t<this.components.length;t++)console.log(`checking these components: ${this.components}`),this.astronaut.astronautCollision(this.components[t])&&(this.astronaut.inventory.push(this.components[t]),this.components[t].caught=!0,this.components[t].pos=[NaN,NaN],this.collectSound.play())})),r(this,"removeCaught",(function(){for(let t=0;t<this.components.length;t++)this.components[t].caught&&(console.log(`removed ${this.components[t]}`),this.components.splice(t,1),console.log(this.astronaut.inventory))})),r(this,"grabbableObject",(function(){let t=[];for(let s=0;s<this.debris.length;s++)this.debris[s].canBeGrabbed(this.astronaut)&&t.push(this.debris[s]);return t[0]})),r(this,"step",(function(){this.moveObjects(),this.checkCollisions(),this.removeCaught(),this.setCamera(),this.checkAstronautCollision(),this.checkFlameCollision(),this.componentPickup(),!1===this.gameOver&&this.checkGameOver(),this.astronaut.throttleRotation()})),r(this,"runGame",(function(){!1===this.paused&&!1===this.gameOff&&(this.step(),this.draw(),this.gameOver&&this.displayEndMessage())})),r(this,"launchSequence",(()=>{this.launchSound.play(),this.objects=[this.debris[1],this.astronaut],this.debris[1].image="../assets/imagery/escape_pod_launched.gif",this.debris[1].vel=[-15,-15],this.debris[1].rotation=2*Math.PI*.85,this.debris[1].rotationSpeed=0,this.astronaut.rotationSpeed=0,this.astronaut.caught=!0,this.astronaut.oxygen=100,this.astronaut.oxygenRate=0})),this.CANVAS_WIDTH=s.canvas.width,this.CANVAS_HEIGHT=s.canvas.height,this.ctx=s,this.NUM_DEBRIS=10,this.NUM_SATELLITES=0,this.NUM_COMPONENTS=1,this.NUM_FLAMES=20,this.gameOver=!1,this.debris=this.addDebris(),this.setStartingDebris(),this.setDestinationDebris(),this.astronaut=new o(this),this.satellites=this.addSatellites(),this.components=this.addComponents(),this.flames=this.addFlames(),console.log(`debris1 pos and radius is ${this.debris[0].pos} and ${this.debris[0].radius}`),console.log(`components1 pos and radius is ${this.components[0].pos} and ${this.components[0].radius}`),this.objects=this.allObjects(),this.MAP_WIDTH=4e3,this.MAP_HEIGHT=4e3,this.paused=!1,this.successSound=new t("../assets/sounds/success.wav"),this.deathSound=new t("../assets/sounds/death_rattle.wav"),this.collectSound=new t("../assets/sounds/collect.wav"),this.repairSound=new t("../assets/sounds/repair.wav"),this.launchSound=new t("../assets/sounds/launch.wav"),this.steamImage="../assets/imagery/steam.jpg"}setCamera(){this.astronaut.surface?(this.cameraX=-(this.CANVAS_WIDTH/2-this.astronaut.surface.pos[0]),this.cameraY=-(this.CANVAS_HEIGHT/2-this.astronaut.surface.pos[1])):(this.cameraX=-(this.CANVAS_WIDTH/2-this.astronaut.pos[0]),this.cameraY=-(this.CANVAS_HEIGHT/2-this.astronaut.pos[1]))}allObjects(){let t=[];return t=t.concat(this.debris).concat(this.satellites).concat(this.components).concat(this.astronaut).concat(this.flames),t}setStartingDebris(){this.debris[0].pos=[2e3,2e3],this.debris[0].vel=[0,0],this.debris[0].color="yellow",this.rotationSpeed=.1}setDestinationDebris(){this.debris[1].pos=[500,500],this.debris[1].vel=[0,0],this.debris[1].color="purple",this.debris[1].image="../assets/imagery/escape_pod.gif",this.rotationSpeed=.1}displayOxygen(){this.ctx.font="40px space_age",this.ctx.fillStyle="green",this.ctx.fillText(`Oxygen: ${this.astronaut.oxygen<=0?"0":this.astronaut.oxygen.toFixed()}%`,50,50),this.ctx.textAlign="left"}drawMinimap(){const t=document.getElementById("minimap").getContext("2d");t.clearRect(0,0,200,200);for(let s=0;s<this.objects.length;s++)this.objects[s].drawShrunk(t)}checkGameOver(){this.astronaut.oxygen<=0?this.gameLost():this.astronaut.surface===this.debris[1]&&this.astronaut.inventory.length>=this.NUM_COMPONENTS&&(this.Winner=!0,this.gameWon())}gameLost(){this.gameOver=!0,this.deathSound.play(),this.astronaut.image="../assets/imagery/dead_transparent.png",this.astronaut.radius=100,this.astronaut.surface=null,this.astronaut.vel=[1,1]}gameWon(){this.gameOver=!0,this.repairSound.play(),setTimeout(this.launchSequence,6e3)}displayEndMessage(){this.gameOver&&(this.ctx.font="40px space_age",this.ctx.fillStyle="green",this.ctx.fillText(this.Winner?"You win!":"Game Over",this.CANVAS_WIDTH/2+100,this.CANVAS_HEIGHT/2),this.ctx.textAlign="center",this.ctx.textBaseline="middle")}}function c(t,s,e){return s in t?Object.defineProperty(t,s,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[s]=e,t}class l{constructor(s){c(this,"startGame",(()=>{this.loadsounds(),this.start.play(),setTimeout((()=>this.startup()),2e3)})),c(this,"restart",(()=>{this.music.stop(),this.start.play(),this.game.gameOff=!0,setTimeout((()=>{this.toggleScreen("start-menu",!0),this.toggleScreen("game-canvas",!1),this.toggleScreen("minimap",!1),this.game=new u(this.ctx),this.astronaut=this.game.astronaut,this.music=new t("../assets/sounds/80s_theme.mp3"),this.lobbyMusic=new t("../assets/sounds/september_song.mp3"),this.button=new t("../assets/sounds/button.ogg")}),1e3)})),c(this,"lobbySound",(function(){this.game.gameOff&&this.lobbyMusic.play()})),c(this,"togglePause",(()=>{!0===this.game.paused?this.game.paused=!1:this.game.paused=!0,console.log(this.paused)})),this.game=new u(s),this.astronaut=this.game.astronaut,this.music=new t("../assets/sounds/80s_theme.mp3"),this.lobbyMusic=new t("../assets/sounds/september_song.mp3"),this.button=new t("../assets/sounds/button.ogg"),this.ctx=s}loadsounds(){this.instructions=new t("../assets/sounds/instructions.wav"),this.chargingUp=new t("../assets/sounds/charging_up.wav"),this.jumping=new t("../assets/sounds/jumping.wav"),this.grunt=new t("../assets/sounds/grunt.mp3"),this.howTheHell=new t("../assets/sounds/how_the_hell.wav"),this.success=new t("../assets/sounds/success.wav"),this.start=new t("../assets/sounds/door_open.wav"),this.jetpack=new t("../assets/sounds/jetpack.wav")}startup(){this.game.gameOff=!1,this.game.paused=!1,this.lobbyMusic.stop(),this.music.play(),this.music.loop(),this.toggleScreen("start-menu",!1),this.toggleScreen("game-canvas",!0),this.toggleScreen("minimap",!0),window.addEventListener("keydown",(t=>{this.game.gameOver||(" "===t.key&&(this.astronaut.surface?(this.chargingUp.play(),this.astronaut.resetPower(),this.astronaut.increasePower()):this.game.grabbableObject!==[]&&(console.log("you grabbed"),this.astronaut.stick(this.game.grabbableObject()),this.grunt.play())),"ArrowLeft"===t.code&&(this.astronaut.surface||(this.astronaut.vel[0]-=.4,this.jetpack.play(),this.astronaut.oxygen-=.1,this.astronaut.rotationSpeed-=.001,this.game.drawSteam())),"ArrowRight"===t.code&&(this.astronaut.surface||(this.astronaut.vel[0]+=.4,this.jetpack.play(),this.astronaut.oxygen-=.1,this.astronaut.rotationSpeed+=.001)),"ArrowUp"===t.code&&(this.astronaut.surface||(this.astronaut.vel[1]-=.4,this.jetpack.play(),this.astronaut.oxygen-=.1,this.astronaut.rotationSpeed+=.001)),"ArrowDown"===t.code&&(this.astronaut.surface||(this.astronaut.vel[1]+=.4,this.jetpack.play(),this.astronaut.oxygen-=.1,this.astronaut.rotationSpeed-=.001)))})),window.addEventListener("keyup",(t=>{this.game.gameOver||" "===t.key&&(this.astronaut.surface&&(this.astronaut.pushOff(this.astronaut.surface),this.chargingUp.stop(),this.jumping.play()),this.astronaut.resetPower())})),document.getElementById("mute").addEventListener("click",this.music.muteToggle),document.getElementById("pause").addEventListener("click",this.togglePause),document.getElementById("restart").addEventListener("click",this.restart),document.getElementById("start-menu").addEventListener("click",this.lobbySound),setInterval((()=>{this.game.runGame()}),20)}toggleScreen(t,s){let e=s?"block":"none";document.getElementById(t).style.display=e}}document.addEventListener("DOMContentLoaded",(function(){const t=document.getElementById("game-canvas");t.height=window.innerHeight,t.width=window.innerWidth;const s=t.getContext("2d"),e=new l(s),i=document.getElementById("start-button");i.addEventListener("mouseover",(function(){e.button.play()})),i.addEventListener("click",(function(){e.startGame()}))}))}()}();
//# sourceMappingURL=main.js.map