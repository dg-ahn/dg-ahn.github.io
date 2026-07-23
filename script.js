(() => {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-nav');
  if (toggle && navigation) {
    toggle.addEventListener('click', () => { const open = navigation.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', String(open)); });
    navigation.addEventListener('click', event => { if (event.target.matches('a')) { navigation.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); } });
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
