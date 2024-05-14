import { DPI_HEIGHT, DPI_WIDTH, ROWS_COUNT } from '../constants/constants.js';

export async function buildBarChart(users, posts) {
  const userInputBar = document.getElementById('bar-chart-name');
  const postInputBar = document.getElementById('bar-chart-content');
  const updateBtn = document.getElementById('upd-bar-chart-btn');
  const resetBtn = document.getElementById('res-bar-chart-btn');
  let userInput = '';
  let postInput = '';

  if (users && posts) {
    canvasBarChart.classList.add('loaded');
    loader.classList.add('disabled');
    createBarChart(users, posts, userInput, postInput);
  }

  updateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    canvasBarChart.classList.remove('loaded');
    canvasBarChart.classList.remove('canvas__update');
    createBarChart(users, posts, userInputBar.value, postInputBar.value);
    canvasBarChart.classList.add('canvas__update');
  });

  resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    canvasBarChart.classList.remove('canvas__update');
    userInputBar.value = '';
    postInputBar.value = '';
    createBarChart(users, posts, userInputBar.value, postInputBar.value);
    canvasBarChart.classList.add('canvas__update');
  });
}

function createBarChart(users, posts, userInput, postInput) {
  const canvas = document.getElementById('canvasBarChart');
  const ctx = canvas.getContext('2d');
  canvas.width = DPI_WIDTH;
  canvas.height = DPI_HEIGHT;

  let usersFiltered = users.map((user) => ({
    ...user,
    numberOfPosts: 0,
  }));

  usersFiltered = usersFiltered.filter((user) => user.name.toLowerCase().includes(userInput.toLowerCase()));
  let filteredPosts = posts.filter((post) => post.body?.toLowerCase().includes(postInput.toLowerCase()));
  let arrFiltered = usersFiltered.filter((user) => filteredPosts.some((post) => user.id === post.userId));

  for (let i = 0; i < usersFiltered.length; i++) {
    filteredPosts.forEach((post) => {
      if (post.userId === usersFiltered[i].id) {
        usersFiltered[i].numberOfPosts++;
      }
    });
  }
  // console.log('us', usersFiltered, filteredPosts);

  let maxValue =
    usersFiltered?.reduce((acc, cur) => (acc.numberOfPosts > cur.numberOfPosts ? acc : cur), 0).numberOfPosts + 2;
  const koef = canvas.height / maxValue;
  const step = canvas.height / ROWS_COUNT;

  ctx.beginPath(); // lines
  ctx.strokeStyle = '#bbb';
  ctx.font = '14px Arial';
  ctx.fillStyle = 'black';
  for (let i = 1; i <= ROWS_COUNT; i++) {
    const y = step * i;
    ctx.fillText(((canvas.height - y) / koef).toFixed(1), 4, y - 5);
    ctx.moveTo(0, y);
    ctx.lineTo(DPI_WIDTH, y);
  }
  ctx.stroke();
  ctx.closePath();
  ctx.font = '14px Arial';
  ctx.fillStyle = 'rgb(59, 47, 102)';
  ctx.fillText('Posts', 5, 10);
  ctx.fillText('User', canvas.width - 55, canvas.height - 10);

  const barWidth = 30;
  let x = 0;

  usersFiltered.forEach((user) => {
    const barHeight = user.numberOfPosts * koef;
    ctx.font = '400 14px Arial';
    if (user.numberOfPosts > 0) {
      x += 70;
      ctx.save();
      ctx.translate(x, canvas.height);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'left';
      ctx.fillStyle = 'black';
      ctx.fillText(user.name, 5, -3);
      ctx.restore();
    }
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    ctx.fillText(user.numberOfPosts, x + 4, canvas.height - barHeight - 10);
  });

  if (arrFiltered.length === 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '36px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(`No data. Try another filter, please`, canvas.width / 2, canvas.height / 2 - 20);
  }
}
