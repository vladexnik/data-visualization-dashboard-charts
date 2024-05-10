import { dbposts } from './constants/db.js';
// import { dbusers } from './constants/dbusers.js';
import { fetchNewData } from './constants/service.js';
import { WIDTH, HEIGHT, DPI_HEIGHT, DPI_WIDTH, ROWS_COUNT } from './constants/constants.js';
import { BASE_URL } from './constants/constants.js';
import { loadComments } from './modules/createLineChart.js';
import { loadPieData } from './modules/pieChart.js';

async function loadData() {
  const users = await fetchNewData(`${BASE_URL}/users`);
  // const users = dbusers;
  const posts = dbposts;
  const postsPerUserId = {};

  posts.map((post) => {
    if (!postsPerUserId[post.userId]) {
      postsPerUserId[post.userId] = 1;
    } else {
      postsPerUserId[post.userId]++;
    }
  });

  const postsPerUserName = {};
  for (const user of users) {
    postsPerUserName[user.name] = postsPerUserId[user.id];
  }

  createBarChart(postsPerUserName);
}
loadData();
loadComments();
loadPieData();

function createBarChart(postsPerUser) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.style.width = WIDTH + 'px';
  canvas.style.height = HEIGHT + 'px';

  let maxValue = Math.max(...Object.values(postsPerUser)) + 1;
  const koef = DPI_HEIGHT / maxValue;

  canvas.width = DPI_WIDTH;
  canvas.height = DPI_HEIGHT;
  const step = DPI_HEIGHT / (ROWS_COUNT + 1);

  ctx.beginPath(); // линии
  ctx.strokeStyle = '#bbb';
  ctx.font = '14px Arial';
  ctx.fillStyle = 'black';

  for (let i = 1; i <= maxValue; i++) {
    const y = step * i;
    ctx.fillText(((DPI_HEIGHT - y) / koef).toFixed(1), 4, y - 5);
    ctx.moveTo(0, y);
    ctx.lineTo(DPI_WIDTH, y);
  }

  ctx.stroke();
  ctx.closePath();

  const barWidth = 30;
  let x = 70;

  for (const userId in postsPerUser) {
    const barHeight = postsPerUser[userId] * koef;

    ctx.fillStyle = `black`;
    ctx.font = '14px Arial';
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    ctx.fillText(postsPerUser[userId], x + 4, canvas.height - barHeight - 10); // adjust for label position

    // X-axis title
    ctx.save();
    ctx.translate(x, canvas.height);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'left';
    ctx.fillText(userId, 5, -3);
    ctx.restore();

    x += 70; // Adjust for spacing
  }
}
