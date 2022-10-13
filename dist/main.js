!function(){"use strict";!function(){function t(t,s,e){return s in t?Object.defineProperty(t,s,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[s]=e,t}class s{constructor(s){t(this,"drawObject",(function(t){let s=new Image;s.src=this.image,t.drawImage(s,this.pos[0]-this.radius-this.game.cameraX,this.pos[1]-this.radius-this.game.cameraY,2*this.radius,2*this.radius)})),t(this,"spinDraw",(function(t){let s=new Image;s.src=this.image,this.drawX=this.pos[0]-this.game.cameraX,this.drawY=this.pos[1]-this.game.cameraY,this.drawX+2*this.radius>this.game.MAP_WIDTH?this.drawX=this.drawX-this.game.MAP_WIDTH:this.drawX+2*this.radius<0&&(this.drawX=this.drawX+this.game.MAP_WIDTH),this.drawY+2*this.radius>this.game.MAP_HEIGHT?this.drawY=this.drawY-this.game.MAP_HEIGHT:this.drawY+2*this.radius<0&&(this.drawY=this.drawY+this.game.MAP_HEIGHT),t.save(),t.translate(this.drawX,this.drawY),t.rotate(this.rotation),t.translate(-this.drawX,-this.drawY),t.drawImage(s,this.drawX-this.radius,this.drawY-this.radius,2*this.radius,2*this.radius),t.restore()})),t(this,"drawPoint",(function(t){t.fillStyle=this.color,t.beginPath(),t.arc(this.pos[0]-this.game.cameraX,this.pos[1]-this.game.cameraY,1,0,2*Math.PI,!1),t.fill()})),t(this,"move",(function(){this.throttleVelocity(),this.pos[0]+=this.vel[0],this.pos[1]+=this.vel[1],this.pos=this.game.wrap(this.pos)})),t(this,"isCollidedWith",(function(t){return.9*(this.radius+t.radius)>=Math.sqrt((t.pos[0]-this.pos[0])**2+(t.pos[1]-this.pos[1])**2)})),t(this,"canBeGrabbed",(function(t){return this.radius+t.radius+10>=Math.sqrt((this.pos[0]-t.pos[0])**2+(this.pos[1]-t.pos[1])**2)})),this.pos=s.pos,this.vel=s.vel,this.radius=s.radius,this.color=s.color,this.game=s.game,this.maxVelocity=6}drawShrunk(t){t.fillStyle=this.color,t.beginPath(),t.arc(this.pos[0]/this.game.MAP_WIDTH*200,this.pos[1]/this.game.MAP_WIDTH*200,3,0,2*Math.PI,!1),t.fill()}throttleVelocity(){for(let t=0;t<2;t++)this.vel[t]>this.maxVelocity?this.vel[t]=this.maxVelocity:this.vel[t]<-this.maxVelocity&&(this.vel[t]=-this.maxVelocity)}randomVec(t){const s=2*Math.PI*Math.random();return this.scale([Math.sin(s),Math.cos(s)],t)}randomRotation(){return 2*Math.random()*Math.PI/180}scale(t,s){return[t[0]*s,t[1]*s]}stepRotation(){this.rotation+=this.rotationSpeed}bounce(){this.vel[0]=-this.vel[0],this.vel[1]=-this.vel[1],this.pos[0]+=5*this.vel[0],this.pos[1]+=5*this.vel[1]}resetVelocity(t){this.vel[0]=t[0],this.vel[1]=t[1]}combinePositions(t){this.pos[0]+=t[0],this.pos[1]+=t[1]}opposingAngle(t){return Math.atan2(t.pos[1]-this.pos[1],t.pos[0]-this.pos[0])+2.2}makeVector(t,s){return this.scale([Math.sin(s),Math.cos(s)],t)}toDegrees(t){return 180*t/Math.PI}toRads(t){return t*Math.PI/180}makeAngleFromVector(t){return Math.atan2(-t[1],t[0])}}class e extends s{constructor(t,s){super({color:"red",radius:70,vel:[0,0],pos:t,game:s}),this.vel=this.randomVec(3),this.rotationSpeed=.03,this.rotation=0,this.image="assets/imagery/debris.png",this.notOnMap=!0}}function i(t,s,e){return s in t?Object.defineProperty(t,s,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[s]=e,t}class a extends s{constructor(t){super({color:"blue",radius:30,vel:[0,0],pos:[600,0],game:t}),i(this,"astronautCollision",(function(t){return.5*(this.radius+t.radius)>=Math.sqrt((t.pos[0]-this.pos[0])**2+(t.pos[1]-this.pos[1])**2)})),i(this,"astronautComponentCollision",(function(t){return this.radius+t.radius>=Math.sqrt((t.pos[0]-this.pos[0])**2+(t.pos[1]-this.pos[1])**2)})),this.rotation=0,this.maxRotationSpeed=1,this.inventory=[],this.oxygen=100,this.dead=!1,this.image="assets/imagery/astronaut.png",this.pushoffSpeed=1,this.oxygenRate=1,this.loseOxygen(),this.jetpack=!1}loseOxygen(){setInterval((()=>{this.game.paused||(this.oxygen-=this.oxygenRate)}),2e3)}stick(t){t&&(this.surface=t,this.rotation=this.opposingAngle(this.surface),this.rotationSpeed=this.surface.rotationSpeed,this.vel=[...this.surface.vel])}pushOff(t){let s=this.makeVector(6,-this.rotation);this.rotation=-this.rotation,this.surface=null,this.rotationSpeed=0,this.resetVelocity(s)}putOnCircumference(t){let s=this.makeVector(t.radius,-this.rotation),e=[t.pos[0]+s[0],t.pos[1]+s[1]];this.pos=e}increasePower(){setInterval((()=>{this.pushoffSpeed<10&&(this.pushoffSpeed+=1)}),300)}resetPower(){this.pushoffSpeed=1}throttleRotation(){this.rotationSpeed>this.maxRotationSpeed&&(this.rotationSpeed=this.maxRotationSpeed),this.rotationSpeed<-this.maxRotationSpeed&&(this.rotationSpeed=-this.maxRotationSpeed)}}class o{constructor(t){this.sound=document.createElement("audio"),this.sound.src=t,this.sound.setAttribute("preload","auto"),this.sound.setAttribute("controls","none"),this.sound.setAttribute("muted","muted"),this.sound.style.display="none",document.body.appendChild(this.sound),this.play=function(){this.sound.play()},this.stop=function(){this.sound.pause(),this.sound.currentTime=0},this.restart=function(){this.sound.currentTime=0,this.play()},this.loop=function(){this.sound.addEventListener("ended",(t=>{this.restart()}))},this.muteToggle=()=>{this.sound.muted?this.sound.muted=!1:this.sound.muted=!0}}}class n extends s{constructor(t,s){super({color:"purple",radius:40,vel:[0,0],pos:t,game:s}),this.image="assets/imagery/gear.png",this.caught=!1,this.rotation=1,this.rotationSpeed=.03}}class h extends s{constructor(t,s){super({color:"orange",radius:60,vel:[0,0],pos:t,game:s}),this.image="assets/imagery/flame_ball.gif",this.rotation=0,this.rotationSpeed=this.toRads(Math.random()*Math.PI),this.notOnMap=!0}}class r extends s{constructor(t,s){super({color:"red",radius:40,vel:[0,0],pos:t,game:s}),this.image="assets/imagery/jetpack.png",this.caught=!1,this.rotation=0,this.rotationSpeed=.03}}class u{constructor(t){this.game=t,this.makeGrid()}makeGrid(t){"easy"===this.game.difficulty?this.grid=[[1,0,0,0,1,0,0,1,0,0],[0,0,0,1,0,0,0,2,0,1],[0,0,1,0,1,0,0,1,0,0],[1,0,0,0,0,0,1,0,2,0],[0,1,0,2,0,2,0,0,0,1],[0,0,0,0,0,0,0,1,0,0],[0,0,0,1,0,1,0,0,2,0],[1,0,1,0,0,0,0,1,0,1],[0,2,0,0,0,2,0,0,0,0],[0,0,0,2,0,0,1,0,0,1]]:"medium"===this.game.difficulty?this.grid=[[1,0,2,0,0,2,0,2,0,1],[0,0,0,2,0,0,0,0,0,0],[1,0,0,2,0,2,0,0,1,0],[0,2,0,2,0,0,1,0,0,0],[0,0,0,2,0,0,1,2,0,2],[2,0,1,2,2,0,1,0,0,0],[0,1,0,2,0,2,1,0,0,2],[0,0,0,2,0,0,2,0,0,0],[0,2,0,2,0,0,0,0,1,0],[1,0,0,2,2,0,1,0,0,1]]:"hard"===this.game.difficulty&&(this.grid=[[1,0,2,0,0,2,0,2,0,1],[0,1,0,2,0,0,0,0,2,0],[1,0,0,2,0,2,0,2,0,2],[0,2,0,2,1,0,1,0,0,0],[0,0,0,2,0,2,1,2,0,2],[2,0,2,2,2,0,1,0,1,0],[0,1,0,2,0,2,1,0,0,2],[0,0,0,2,0,0,2,0,0,0],[0,2,0,2,2,0,0,0,1,2],[1,0,1,2,2,0,1,0,0,1]])}populateMap(){const t=this.game.MAP_WIDTH/10;for(let s=0;s<this.grid.length;s++)for(let e=0;e<this.grid.length;e++){let i=[t/2+e*t,t/2+s*t];switch(this.grid[s][e]){case 1:this.game.addDebris(i);break;case 2:this.game.addFlame(i)}}}}function c(t,s,e){return s in t?Object.defineProperty(t,s,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[s]=e,t}class d{constructor(t,s,i){c(this,"addDebris",(function(t){let s=new e(t,this);this.debris.push(s)})),c(this,"addComponents",(function(){let t=[];for(let s=0;s<this.NUM_COMPONENTS;s++)t.push(new n(this.randomPosition(),this));return t})),c(this,"addFlame",(function(t){let s=new h(t,this);this.flames.push(s)})),c(this,"randomPosition",(function(){let t,s;return t=Math.floor(Math.random()*this.MAP_WIDTH),s=Math.floor(Math.random()*this.MAP_HEIGHT),[t,s]})),c(this,"draw",(function(){this.ctx.clearRect(0,0,this.CANVAS_WIDTH,this.CANVAS_HEIGHT);for(let t=0;t<this.objects.length;t++)!0!==this.objects[t].caught&&this.objects[t].spinDraw(this.ctx);this.displayOxygen(),this.drawMinimap(),this.steamMaker()})),c(this,"drawSteam",(function(t){let s=new Image;switch(t){case"left":s.src=this.steamImageLeft,this.ctx.drawImage(s,this.astronaut.pos[0]-this.cameraX+this.astronaut.radius,this.astronaut.pos[1]-this.cameraY-this.astronaut.radius/2,this.astronaut.radius,this.astronaut.radius);break;case"right":s.src=this.steamImageRight,this.ctx.drawImage(s,this.astronaut.pos[0]-this.cameraX-2*this.astronaut.radius,this.astronaut.pos[1]-this.cameraY-this.astronaut.radius/2,this.astronaut.radius,this.astronaut.radius);break;case"up":s.src=this.steamImageUp,this.ctx.drawImage(s,this.astronaut.pos[0]-this.cameraX-this.astronaut.radius/2,this.astronaut.pos[1]-this.cameraY+this.astronaut.radius,this.astronaut.radius,this.astronaut.radius);break;case"down":s.src=this.steamImageDown,this.ctx.drawImage(s,this.astronaut.pos[0]-this.cameraX-this.astronaut.radius/2,this.astronaut.pos[1]-this.cameraY-2*this.astronaut.radius,this.astronaut.radius,this.astronaut.radius)}})),c(this,"moveObjects",(function(){this.astronaut.surface?this.astronaut.putOnCircumference(this.astronaut.surface):this.gameOver||(this.astronaut.rotation=2.1-this.astronaut.makeAngleFromVector(this.astronaut.vel));for(let t=0;t<this.objects.length;t++)this.objects[t].move(),this.objects[t].stepRotation()})),c(this,"wrap",(function(t){for(let s=0;s<t.length;s++)t[s]<0&&(t[s]+=this.MAP_WIDTH),t[s]>this.MAP_WIDTH&&(t[s]-=this.MAP_WIDTH);return t})),c(this,"checkCollisions",(function(){for(let t=0;t<this.debris.length;t++)for(let s=t+1;s<this.debris.length;s++)this.debris[t].isCollidedWith(this.debris[s])&&(this.debris[t].bounce(),this.debris[s].bounce())})),c(this,"checkAstronautCollision",(function(){if(!this.astronaut.surface)for(let t=0;t<this.debris.length;t++)this.astronaut.astronautCollision(this.debris[t])&&(this.debris[t].bounce(),this.astronaut.bounce())})),c(this,"checkFlameCollision",(function(){for(let t=0;t<this.flames.length;t++)this.astronaut.astronautCollision(this.flames[t])&&(this.astronaut.oxygen=0)})),c(this,"componentPickup",(function(){for(let t=0;t<this.components.length;t++)this.astronaut.astronautComponentCollision(this.components[t])&&(this.components[t].caught=!0,this.components[t].pos=[NaN,NaN],this.collectSound.play(),this.components[t]instanceof r?this.astronaut.jetpack=!0:this.astronaut.inventory.push(this.components[t]))})),c(this,"removeCaught",(function(){for(let t=0;t<this.components.length;t++)this.components[t].caught&&this.components.splice(t,1)})),c(this,"grabbableObject",(function(){let t=[];for(let s=0;s<this.debris.length;s++)this.debris[s].canBeGrabbed(this.astronaut)&&t.push(this.debris[s]);return t[0]})),c(this,"step",(()=>{this.gameView.checkKeyState(),this.moveObjects(),this.removeCaught(),this.setCamera(),this.componentPickup(),!1===this.gameOver&&(this.checkGameOver(),this.checkCollisions(),this.checkAstronautCollision(),this.checkFlameCollision(),this.astronaut.throttleRotation())})),c(this,"runGame",(()=>{!1===this.paused&&!1===this.gameOff&&(this.step(),this.draw(),this.gameOver&&this.displayEndMessage()),window.requestAnimationFrame(this.runGame)})),c(this,"launchSequence",(()=>{this.launchSound.play(),this.escapePod.image="assets/imagery/escape_pod_launched.gif",this.escapePod.vel=[-15,-15],this.escapePod.rotation=2*Math.PI*.85,this.escapePod.rotationSpeed=0,this.astronaut.rotationSpeed=0,this.astronaut.caught=!0,this.astronaut.oxygen=100,this.astronaut.oxygenRate=0})),this.difficulty=i,this.gameView=s,this.CANVAS_WIDTH=t.canvas.width,this.CANVAS_HEIGHT=t.canvas.height,this.ctx=t,this.gameOver=!1,this.MAP_WIDTH=2e3,this.MAP_HEIGHT=2e3,this.setNumberComponents(),this.debris=[],this.flames=[],this.level=new u(this),this.level.populateMap(),this.astronaut=new a(this),this.setStartingDebris(),this.setDestinationDebris(),this.components=this.addComponents(),this.addJetpack(),this.objects=this.allObjects(),this.paused=!1,this.deathSound=new o("assets/sounds/death_rattle.wav"),this.collectSound=new o("assets/sounds/collect.wav"),this.repairSound=new o("assets/sounds/repair.wav"),this.launchSound=new o("assets/sounds/launch.wav"),this.steamImageLeft="assets/imagery/steam.png",this.steamImageRight="assets/imagery/steam_right.png",this.steamImageUp="assets/imagery/steam_up.png",this.steamImageDown="assets/imagery/steam_down.png"}setCamera(){this.astronaut.surface?(this.cameraX=-(this.CANVAS_WIDTH/2-this.astronaut.surface.pos[0]),this.cameraY=-(this.CANVAS_HEIGHT/2-this.astronaut.surface.pos[1])):(this.cameraX=-(this.CANVAS_WIDTH/2-this.astronaut.pos[0]),this.cameraY=-(this.CANVAS_HEIGHT/2-this.astronaut.pos[1]))}allObjects(){let t=[];return t=t.concat(this.debris).concat(this.flames).concat(this.components).concat(this.astronaut),t}setNumberComponents(){switch(this.difficulty){case"easy":this.NUM_COMPONENTS=3;break;case"medium":this.NUM_COMPONENTS=5;break;case"hard":this.NUM_COMPONENTS=7}}addJetpack(){this.jetpack=new r(this.randomPosition(),this),this.components.push(this.jetpack)}randomObjectSelector(t){return Math.floor(Math.random()*t.length)}setStartingDebris(){let t=this.randomObjectSelector(this.debris);this.debris[t].vel=[0,0],this.debris[t].color="yellow",this.debris[t].rotationSpeed=.02,this.astronaut.stick(this.debris[t])}setDestinationDebris(){let t=this.randomObjectSelector(this.debris);this.escapePod=this.debris[t],this.escapePod.vel=[0,0],this.escapePod.color="yellowgreen",this.escapePod.image="assets/imagery/escape_pod.gif",this.escapePod.rotationSpeed=.01,this.escapePod.notOnMap=!1}steamMaker(){this.steamLeft&&this.drawSteam("left"),this.steamRight&&this.drawSteam("right"),this.steamUp&&this.drawSteam("up"),this.steamDown&&this.drawSteam("down")}displayOxygen(){this.ctx.font="40px space_age",this.ctx.fillStyle=this.astronaut.oxygen<10?"red":"green",this.ctx.fillText(`Oxygen: ${this.astronaut.oxygen<=0?"0":this.astronaut.oxygen.toFixed()}%`,50,50)}drawMinimap(){const t=document.getElementById("minimap").getContext("2d");t.clearRect(0,0,200,200);for(let s=0;s<this.objects.length;s++)this.objects[s].notOnMap||this.objects[s].drawShrunk(t)}checkGameOver(){this.astronaut.oxygen<=0?this.gameLost():this.astronaut.surface===this.escapePod&&this.astronaut.inventory.length>=this.NUM_COMPONENTS&&this.gameWon()}gameLost(){this.gameOver=!0,this.deathSound.play(),this.astronaut.image="assets/imagery/dead_transparent.png",this.astronaut.radius=60,this.astronaut.surface=null,this.astronaut.vel=[1,1],this.astronaut.rotationSpeed=.03}gameWon(){this.winner=!0,this.gameOver=!0,this.repairSound.play(),setTimeout(this.launchSequence,6e3)}displayEndMessage(){this.gameOver&&(this.ctx.font="40px space_age",this.ctx.fillStyle=this.winner?"green":"red",this.ctx.fillText(this.winner?"You win!":"Game Over",this.CANVAS_WIDTH/2+100,this.CANVAS_HEIGHT/2+10))}}function l(t,s,e){return s in t?Object.defineProperty(t,s,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[s]=e,t}class m{constructor(t,s){l(this,"startGame",(()=>{this.loadsounds(),this.startSound.play(),setTimeout((()=>this.startup()),2e3)})),l(this,"restart",(()=>{this.music.stop(),this.startSound.play(),this.game.gameOff=!0,setTimeout((()=>{this.toggleScreen("start-menu",!0),this.toggleScreen("game-canvas",!1),this.toggleScreen("minimap",!1)}),1e3)})),l(this,"startup",(()=>{this.game=new d(this.ctx,this,this.difficulty),this.astronaut=this.game.astronaut,this.game.gameOff=!1,this.game.paused=!1,this.lobbyMusic.stop(),this.music.play(),this.music.loop(),this.toggleScreen("start-menu",!1),this.toggleScreen("game-canvas",!0),this.toggleScreen("minimap",!0),this.keyState={" ":!1,ArrowLeft:!1,ArrowRight:!1,ArrowUp:!1,ArrowDown:!1},window.addEventListener("keydown",(t=>{this.game.gameOver||Object.keys(this.keyState).includes(t.key)&&(this.keyState[t.key]=!0)})),window.addEventListener("keyup",(t=>{Object.keys(this.keyState).includes(t.key)&&(this.keyState[t.key]=!1),this.game.gameOver||" "===t.key&&(this.astronaut.surface&&(this.astronaut.pushOff(this.astronaut.surface),this.chargingUp.stop(),this.jumping.play()),this.astronaut.resetPower()),"ArrowLeft"===t.code&&(this.game.steamLeft=!1),"ArrowRight"===t.code&&(this.game.steamRight=!1),"ArrowUp"===t.code&&(this.game.steamUp=!1),"ArrowDown"===t.code&&(this.game.steamDown=!1)})),document.getElementById("mute").addEventListener("click",this.music.muteToggle),document.getElementById("pause").addEventListener("click",this.togglePause),document.getElementById("restart").addEventListener("click",this.restart),document.getElementById("start-menu").addEventListener("click",this.lobbySound),window.requestAnimationFrame(this.game.runGame)})),l(this,"lobbySound",(function(){this.game.gameOff&&this.lobbyMusic.play()})),l(this,"togglePause",(()=>{!0===this.game.paused?this.game.paused=!1:this.game.paused=!0})),l(this,"checkKeyState",(()=>{Object.keys(this.keyState).forEach((t=>{this.keyState[t]&&!this.game.gameOver&&this.runKeyAction(t)}))})),l(this,"runKeyAction",(t=>{switch(t){case" ":this.astronaut.surface?(this.astronaut.resetPower(),this.astronaut.increasePower()):this.game.grabbableObject!==[]&&(this.astronaut.stick(this.game.grabbableObject()),this.grunt.play());break;case"ArrowLeft":!this.astronaut.surface&&this.astronaut.jetpack&&(this.astronaut.vel[0]-=.08,this.jetpack.play(),this.astronaut.oxygen-=.1,this.game.steamLeft=!0);break;case"ArrowRight":!this.astronaut.surface&&this.astronaut.jetpack&&(this.astronaut.vel[0]+=.08,this.jetpack.play(),this.astronaut.oxygen-=.1,this.game.steamRight=!0);break;case"ArrowUp":!this.astronaut.surface&&this.astronaut.jetpack&&(this.astronaut.vel[1]-=.08,this.jetpack.play(),this.astronaut.oxygen-=.1,this.game.steamUp=!0);break;case"ArrowDown":!this.astronaut.surface&&this.astronaut.jetpack&&(this.astronaut.vel[1]+=.08,this.jetpack.play(),this.astronaut.oxygen-=.1,this.game.steamDown=!0)}})),this.music=new o("assets/sounds/80s_theme.mp3"),this.lobbyMusic=new o("assets/sounds/september_song.mp3"),this.button=new o("assets/sounds/button.ogg"),this.ctx=t,this.difficulty=s}loadsounds(){this.instructions=new o("assets/sounds/instructions.wav"),this.chargingUp=new o("assets/sounds/charging_up.wav"),this.jumping=new o("assets/sounds/jumping.wav"),this.grunt=new o("assets/sounds/grunt.mp3"),this.startSound=new o("assets/sounds/door_open.wav"),this.jetpack=new o("assets/sounds/jetpack.wav")}toggleScreen(t,s){let e=s?"flex":"none";document.getElementById(t).style.display=e}}document.addEventListener("DOMContentLoaded",(function(){const t=new o("assets/sounds/button.ogg"),s=new o("assets/sounds/selected.wav"),e=new o("assets/sounds/september_song.mp3"),i=document.getElementById("game-canvas");i.height=window.innerHeight,i.width=window.innerWidth;const a=i.getContext("2d");let n="easy";const h=document.getElementById("tutorial");let r=["assets/imagery/meteor.jpeg","assets/imagery/space_junk_2.jpg","assets/imagery/game_screenshot_escape_pod.png","assets/imagery/game_screenshot_component.png","assets/imagery/game_screenshot_escape_pod.png","assets/imagery/game_screenshot_oxygen.png","assets/imagery/game_screenshot_hold.png","assets/imagery/game_screenshot_fireball.png","assets/imagery/game_screenshot_jet.png","assets/imagery/game_screenshot_steam.png","assets/imagery/game_screenshot_radar.png","assets/imagery/floating.jpg"];const u=document.getElementById("tutorial-text");let c=["The burning space junk headed straight for our station. It laid waste to the installation. Luckily I was able to grab on to the storage pod.","Theaftermath of the explosion is a field of wreckage.","Luckily my HUD is showing me that the escape pod is still intact, although damaged. If I can get to it after finding the right components to repair it, maybe I can fly back to Earth.","The components seem to be scattered throughout the debris field. I need to collect them.","Once I collect all the components, I will head straight to the escape pod and get the hell out of here.","Damn, my suit is ripped from the explosion. I need to hurry up before I run out of oxygen.","I can navigate by grabbing and holding onto the spinning debris pieces by holding <span>SPACEBAR</span>. If I <span>release SPACEBAR</span>, I can push off away from the debris towards my next target.","I need to avoid the fiery balls of wreckage as I move through the debris.","Ah, my EVA jetpack is out there, too! I should collect that right away...","...because it will allow me to use the <span>ARROW KEYS</span> to adjust my flight trajectory. I should use it sparingly, though, becuase it consumes a lot of my oxygen.","On my radar, my position is shown in blue, the components in purple, the jetpack in red, and the escape pod in green.","Okay, mental review: Hold onto the debris with <span>SPACEBAR</span>, let go to fly off. Get the <span>jetpack</span> and fly around with the <span>ARROW KEYS</span>. Collect all <span>components</span>, then head to the escape pod. I can do this!"];const d=function(t,s){let e=s?"flex":"none";document.getElementById(t).style.display=e},l=function(){t.play()},g=function(t){t.target.control.checked=!0,n=t.target.control.value,s.play()};document.getElementById("easy-button").addEventListener("click",g),document.getElementById("medium-button").addEventListener("click",g),document.getElementById("hard-button").addEventListener("click",g);const p=document.getElementById("start-button");p.addEventListener("mouseover",l),p.addEventListener("click",(function(){e.stop();const t=new m(a,n);document.body.requestFullscreen(),t.startGame()}));const f=document.getElementById("tutorial-button");f.addEventListener("mouseover",l),f.addEventListener("click",(function(){e.play(),d("start-menu",!1),d("tutorial",!0)})),document.getElementById("tutorial-next").addEventListener("click",(function(){l(),c.length>0?(u.innerHTML=`${c.shift()}`,h.style.backgroundImage=`url(${r.shift()})`):(d("start-menu",!0),d("tutorial",!1))})),window.addEventListener("click",(()=>{e.play()}))}))}()}();
//# sourceMappingURL=main.js.map