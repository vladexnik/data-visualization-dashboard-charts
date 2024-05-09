import { fetchNewData } from '../constants/service.js';
import { DPI_HEIGHT, DPI_WIDTH } from '../constants/constants.js';
import { BASE_URL } from '../constants/constants.js';
import { randomColor } from '../constants/constants.js';

const userInputPie = document.getElementById('pie-chart-name');
const postInputPie = document.getElementById('pie-chart-content');
const updateBtn = document.getElementById('upd-pie-chart-btn');
const resetBtn = document.getElementById('res-pie-chart-btn');
let userInput = '';
let postInput = '';

export async function loadPieData() {
  let posts = await fetchNewData(`${BASE_URL}/posts`);
  let users = await fetchNewData(`${BASE_URL}/users`);

  createPieChart(posts, users, userInput, postInput);

  updateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    canvasPieChart.classList.remove('canvas__update');
    userInput = userInputPie.value;
    postInput = postInputPie.value;
    createPieChart(posts, users, userInput, postInput);
    canvasPieChart.classList.add('canvas__update');
  });

  resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    canvasPieChart.classList.remove('canvas__update');
    userInputPie.value = '';
    postInputPie.value = '';
    createPieChart(posts, users, userInputPie.value, postInputPie.value);
    canvasPieChart.classList.add('canvas__update');
  });
}

function createPieChart(posts, users, userInput, postInput) {
  const canvas = document.getElementById('canvasPieChart');
  const ctx = canvas.getContext('2d');
  canvas.width = DPI_WIDTH;
  canvas.height = DPI_HEIGHT;

  users = users.map((user) => ({
    ...user,
    numberOfPosts: 0,
  }));

  let usersFiltered = users.filter((user) => user.name.toLowerCase().includes(userInput.toLowerCase()));
  console.log(usersFiltered);

  let filteredPosts = posts.filter((post) => post.body.toLowerCase().includes(postInput.toLowerCase()));
  console.log(filteredPosts);

  for (let i = 0; i < usersFiltered.length; i++) {
    filteredPosts.forEach((post) => {
      if (post.userId === usersFiltered[i].id) {
        usersFiltered[i].numberOfPosts++;
      }
    });
  }

  let countPosts = 0;
  for (let i = 0; i < usersFiltered.length; i++) {
    countPosts += usersFiltered[i].numberOfPosts;
  }
  console.log('count', countPosts);

  let arrFiltered = usersFiltered.filter((user) => filteredPosts.some((post) => user.id === post.userId));

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 3;
  const centerY = canvas.height / 2;
  const radius = 150;
  let startAngle = 0;

  if (arrFiltered < 1) {
    ctx.font = '36px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(`No data. Try another filter, please`, canvas.width / 2, canvas.height / 2);
  }

  let heightIterator = 0;

  usersFiltered.forEach((user) => {
    console.log(user.numberOfPosts);

    // pie
    let colorPie = randomColor();
    ctx.fillStyle = colorPie;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';

    ctx.beginPath();
    let endAngle = (user.numberOfPosts / countPosts) * 2 * Math.PI + startAngle;
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // users
    ctx.beginPath();
    let percentageOfPostsPerUser = (user.numberOfPosts * 100) / countPosts;
    percentageOfPostsPerUser = percentageOfPostsPerUser.toString().includes('.')
      ? percentageOfPostsPerUser.toFixed(1)
      : percentageOfPostsPerUser;

    if (percentageOfPostsPerUser > 0) {
      ctx.font = '18px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.rect(canvas.width / 1.5, 50 + heightIterator, 15, 15);
      ctx.fillText(`${user.name} - ${percentageOfPostsPerUser} %`, canvas.width / 1.5 + 25, 50 + heightIterator);
      ctx.fillStyle = colorPie;
      ctx.fill();
      heightIterator = heightIterator + 30;
      ctx.closePath();
      startAngle = endAngle;
    }
  });
}
