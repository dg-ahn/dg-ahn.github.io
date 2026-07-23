(() => {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-nav');
  if (toggle && navigation) {
    const closeNavigation = () => { navigation.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => { const open = navigation.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', String(open)); });
    navigation.addEventListener('click', event => { if (event.target.matches('a')) closeNavigation(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeNavigation(); });
    document.addEventListener('click', event => { if (navigation.classList.contains('is-open') && !navigation.contains(event.target) && event.target !== toggle) closeNavigation(); });
  }

  const board = document.querySelector('#game-board');
  if (!board) return;
  const size = 20, cells = [];
  for (let i = 0; i < size * size; i += 1) { const cell = document.createElement('span'); cell.className = 'cell'; board.append(cell); cells.push(cell); }
  const scoreEl = document.querySelector('#score'), highScoreEl = document.querySelector('#high-score'), speedEl = document.querySelector('#speed-level'), statusEl = document.querySelector('#game-status');
  const startButton = document.querySelector('#start-button'), pauseButton = document.querySelector('#pause-button'), restartButton = document.querySelector('#restart-button');
  const directions = { up: {x:0,y:-1}, down:{x:0,y:1}, left:{x:-1,y:0}, right:{x:1,y:0} };
  let snake, direction, queuedDirection, food, enemy, score, highScore = Number(localStorage.getItem('snake-high-score') || 0), timer = null, paused = false, running = false;
  highScoreEl.textContent = highScore;
  const index = point => point.y * size + point.x;
  const same = (a,b) => a.x === b.x && a.y === b.y;
  function randomFood() { const free = []; for (let y=0;y<size;y+=1) for (let x=0;x<size;x+=1) if (!snake.some(part => part.x===x && part.y===y) && (!enemy || !same(enemy,{x,y}))) free.push({x,y}); return free[Math.floor(Math.random()*free.length)]; }
  function draw() { cells.forEach(cell => { cell.className = 'cell'; }); snake.forEach((part, i) => { cells[index(part)].classList.add('snake'); if (i===0) cells[index(part)].classList.add('head'); }); if (food) cells[index(food)].classList.add('food'); if (enemy) cells[index(enemy)].classList.add('enemy'); scoreEl.textContent=score; highScoreEl.textContent=highScore; speedEl.textContent=Math.min(5,1+Math.floor(score/5)); }
  function stopTimer() { if (timer !== null) { clearInterval(timer); timer = null; } }
  function moveEnemy() { const options = Object.values(directions).filter(move => { const next={x:enemy.x+move.x,y:enemy.y+move.y}; return next.x>=0&&next.x<size&&next.y>=0&&next.y<size&&!same(next,snake[0]); }); if (options.length) { const move=options[Math.floor(Math.random()*options.length)]; enemy={x:enemy.x+move.x,y:enemy.y+move.y}; } }
  function tick() { if (!running || paused) return; direction = queuedDirection; const head = {x:snake[0].x+direction.x,y:snake[0].y+direction.y}; const hitWall=head.x<0||head.x>=size||head.y<0||head.y>=size; const hitSelf=snake.some((part,i)=>i>0&&same(part,head)); if (hitWall||hitSelf||same(head,enemy)) return gameOver(); snake.unshift(head); if (same(head,food)) { score += 10; if (score > highScore) { highScore=score; localStorage.setItem('snake-high-score',String(highScore)); } food=randomFood(); } else snake.pop(); moveEnemy(); if (same(enemy,snake[0])) return gameOver(); draw(); }
  function setTimer() { stopTimer(); timer = setInterval(tick, Math.max(80,180-score/5*12)); }
  function setup() { stopTimer(); snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}]; enemy={x:3,y:3}; direction=directions.right; queuedDirection=direction; food=randomFood(); score=0; paused=false; running=false; draw(); statusEl.textContent='Press Start to play.'; startButton.textContent='Start game'; pauseButton.textContent='Pause'; }
  function start() { if (!running) { running=true; paused=false; statusEl.textContent='Playing'; startButton.textContent='Restart game'; setTimer(); } else if (paused) { paused=false; statusEl.textContent='Playing'; pauseButton.textContent='Pause'; } }
  function gameOver() { running=false; paused=false; stopTimer(); statusEl.textContent=`Game over — ${score} points. Press Restart or R.`; pauseButton.textContent='Pause'; }
  function restart() { setup(); start(); board.focus(); }
  function pause() { if (!running) return; paused=!paused; statusEl.textContent=paused?'Paused':'Playing'; pauseButton.textContent=paused?'Resume':'Pause'; }
  function changeDirection(next) { const candidate=directions[next]; if (!candidate || (candidate.x===-direction.x && candidate.y===-direction.y)) return; queuedDirection=candidate; if (!running) start(); }
  document.addEventListener('keydown', event => { const keys={ArrowUp:'up',w:'up',ArrowDown:'down',s:'down',ArrowLeft:'left',a:'left',ArrowRight:'right',d:'right'}; if (keys[event.key]) { event.preventDefault(); changeDirection(keys[event.key]); } else if (event.code==='Space') { event.preventDefault(); pause(); } else if (event.key==='Enter'||event.key.toLowerCase()==='r') { event.preventDefault(); restart(); } });
  document.querySelectorAll('[data-direction]').forEach(button => button.addEventListener('click', () => changeDirection(button.dataset.direction)));
  startButton.addEventListener('click', restart); restartButton.addEventListener('click', restart); pauseButton.addEventListener('click', pause); setup();
})();

(() => {
  const board = document.querySelector('#tetris-board');
  if (!board) return;
  const width = 10, height = 20, types = ['I','O','T','S','Z','J','L'];
  const shapes = {
    I:[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], O:[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],
    T:[[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]], S:[[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],
    Z:[[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]], J:[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]], L:[[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]]
  };
  const cells = [], nextCells = [], scoreEl = document.querySelector('#tetris-score'), linesEl = document.querySelector('#tetris-lines'), levelEl = document.querySelector('#tetris-level'), highEl = document.querySelector('#tetris-high-score'), statusEl = document.querySelector('#tetris-status'), shell = document.querySelector('.tetris-shell');
  const startButton = document.querySelector('#tetris-start'), pauseButton = document.querySelector('#tetris-pause'), restartButton = document.querySelector('#tetris-restart'), contrastButton = document.querySelector('#tetris-contrast'), soundButton = document.querySelector('#tetris-sound');
  for (let i=0;i<width*height;i+=1) { const cell=document.createElement('span'); cell.className='tetris-cell'; board.append(cell); cells.push(cell); }
  for (let i=0;i<16;i+=1) { const cell=document.createElement('span'); cell.className='tetris-cell'; document.querySelector('#tetris-next').append(cell); nextCells.push(cell); }
  let grid, current, next, score=0, lines=0, high=Number(localStorage.getItem('tetris-high-score')||0), running=false, paused=false, gameOver=false, dropTimer=null, countdownTimer=null, soundOff=localStorage.getItem('tetris-sound-off')==='true';
  highEl.textContent=high; soundButton.setAttribute('aria-pressed',String(soundOff));
  const rotate = matrix => matrix[0].map((_,i) => matrix.map(row => row[i]).reverse());
  const matrix = piece => { let result=shapes[piece.type]; for(let i=0;i<piece.rotation;i+=1) result=rotate(result); return result; };
  const eachBlock = (piece, fn) => matrix(piece).forEach((row,y)=>row.forEach((filled,x)=>{if(filled)fn(piece.x+x,piece.y+y);}));
  const collides = piece => { let hit=false; eachBlock(piece,(x,y)=>{if(x<0||x>=width||y>=height||(y>=0&&grid[y][x]))hit=true;}); return hit; };
  const drawNext = () => { nextCells.forEach(cell=>{cell.className='tetris-cell';cell.textContent='';}); const preview={type:next,rotation:0,x:0,y:0}; eachBlock(preview,(x,y)=>{if(x<4&&y<4){nextCells[y*4+x].classList.add('piece-'+next);}}); };
  const draw = () => { cells.forEach(cell=>{cell.className='tetris-cell';cell.textContent='';}); grid.forEach((row,y)=>row.forEach((piece,x)=>{if(piece){cells[y*width+x].classList.add('piece-'+piece);}})); if(current){const ghost={...current};while(!collides({...ghost,y:ghost.y+1}))ghost.y+=1;eachBlock(ghost,(x,y)=>{if(y>=0&&!grid[y][x]&&!cells[y*width+x].classList.contains('ghost'))cells[y*width+x].classList.add('ghost');});eachBlock(current,(x,y)=>{if(y>=0){cells[y*width+x].className='tetris-cell piece-'+current.type;}});} scoreEl.textContent=score;linesEl.textContent=lines;levelEl.textContent=Math.floor(lines/10)+1;drawNext(); };
  const stopDrop = () => { if(dropTimer!==null){clearInterval(dropTimer);dropTimer=null;} };
  const startDrop = () => { stopDrop(); if(running&&!paused)dropTimer=setInterval(()=>step(),Math.max(100,800-(Math.floor(lines/10)*70))); };
  const setStatus = text => { statusEl.textContent=text; };
  const end = () => { running=false;gameOver=true;stopDrop();setStatus(`Game over — ${score} points. Best: ${high}. Press R or Restart.`); };
  const spawn = () => { current={type:next||types[Math.floor(Math.random()*types.length)],rotation:0,x:3,y:0};next=types[Math.floor(Math.random()*types.length)];if(collides(current))end();draw(); };
  const clearLines = () => { const remaining=grid.filter(row=>row.some(cell=>!cell)); const count=height-remaining.length; while(remaining.length<height)remaining.unshift(Array(width).fill(null));grid=remaining;if(count){score += [0,100,300,500,800][count]||800;lines+=count;if(score>high){high=score;localStorage.setItem('tetris-high-score',String(high));} } };
  const step = () => { if(!running||paused||gameOver)return; const down={...current,y:current.y+1};if(!collides(down)){current=down;draw();return;}eachBlock(current,(x,y)=>{if(y>=0)grid[y][x]=current.type;});clearLines();spawn();startDrop(); };
  const move = dx => { if(!running||paused)return;const moved={...current,x:current.x+dx};if(!collides(moved)){current=moved;draw();} };
  const turn = direction => { if(!running||paused)return;let rotated={...current,rotation:(current.rotation+direction+4)%4};for(const kick of [0,-1,1,-2,2]){rotated={...rotated,x:current.x+kick};if(!collides(rotated)){current=rotated;draw();return;}} };
  const hardDrop = () => { if(!running||paused)return;while(!collides({...current,y:current.y+1}))current={...current,y:current.y+1};step(); };
  const resume = () => { if(!running||!paused)return;paused=false;let left=3;setStatus(`Resuming in ${left}…`);if(countdownTimer!==null)clearInterval(countdownTimer);countdownTimer=setInterval(()=>{left-=1;if(left<=0){clearInterval(countdownTimer);countdownTimer=null;setStatus('Playing');startDrop();draw();}else setStatus(`Resuming in ${left}…`);},300); };
  const togglePause = () => { if(!running||gameOver)return;if(paused)resume();else{paused=true;stopDrop();setStatus('Paused');} };
  const reset = () => {stopDrop();if(countdownTimer!==null)clearInterval(countdownTimer);countdownTimer=null;grid=Array.from({length:height},()=>Array(width).fill(null));score=0;lines=0;high=Number(localStorage.getItem('tetris-high-score')||0);next=types[Math.floor(Math.random()*types.length)];current=null;running=true;paused=false;gameOver=false;setStatus('Playing');spawn();startDrop();board.focus();};
  document.addEventListener('keydown',event=>{const key=event.key;if(['ArrowLeft','ArrowRight','ArrowDown','ArrowUp','z','Z',' ','p','P','Escape','r','R'].includes(key)){event.preventDefault();}if(key==='ArrowLeft')move(-1);else if(key==='ArrowRight')move(1);else if(key==='ArrowDown')step();else if(key==='ArrowUp')turn(1);else if(key==='z'||key==='Z')turn(-1);else if(key===' ')hardDrop();else if(key==='p'||key==='P'||key==='Escape')togglePause();else if(key==='r'||key==='R')reset();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&running&&!paused)togglePause();});
  startButton.addEventListener('click',reset);restartButton.addEventListener('click',reset);pauseButton.addEventListener('click',togglePause);contrastButton.addEventListener('click',()=>{const on=shell.classList.toggle('high-contrast');contrastButton.setAttribute('aria-pressed',String(on));});soundButton.addEventListener('click',()=>{soundOff=!soundOff;localStorage.setItem('tetris-sound-off',String(soundOff));soundButton.setAttribute('aria-pressed',String(soundOff));soundButton.textContent=soundOff?'Sound on':'Sound off';});
  grid=Array.from({length:height},()=>Array(width).fill(null));next=types[Math.floor(Math.random()*types.length)];draw();
})();
