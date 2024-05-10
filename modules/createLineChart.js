import { fetchNewData } from '../constants/service.js';
import { PAD, DPI_HEIGHT, DPI_WIDTH, ROWS_COUNT } from '../constants/constants.js';
import { BASE_URL } from '../constants/constants.js';

const emailInputLine = document.getElementById('line-chart-email');
const commentInputLine = document.getElementById('line-chart-content');
const updateBtn = document.getElementById('upd-line-chart-btn');
const resetBtn = document.getElementById('res-line-chart-btn');
let emailInput = '';
let commentInput = '';

export async function loadComments() {
  let comments = await fetchNewData(`${BASE_URL}/comments`);
  createLineChart(comments, emailInput, commentInput);

  updateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    canvasLineChart.classList.remove('canvas__update');
    createLineChart(comments, emailInputLine.value, commentInputLine.value);
    canvasLineChart.classList.add('canvas__update');
  });

  resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    canvasLineChart.classList.remove('canvas__update');
    emailInputLine.value = '';
    commentInputLine.value = '';
    createLineChart(comments, emailInputLine.value, emailInputLine.value);
    canvasLineChart.classList.add('canvas__update');
  });
}

function createLineChart(comments, emailInput, commentInput) {
  const canvas = document.getElementById('canvasLineChart');
  const ctx = canvas.getContext('2d');
  canvas.width = DPI_WIDTH;
  canvas.height = DPI_HEIGHT;
  // comments = JSON.parse(localStorage.getItem('comments'));
  let commentsWithDate = [];

  comments = comments.map((commentObj) => {
    if (!commentObj.date) {
      return {
        ...commentObj,
        date: new Date(2023, Math.floor(Math.random() * 12) + 1).toISOString().slice(0, 7),
      };
    } else return commentObj;
  });
  console.log('date', comments);
  // comments = commentsWithDate;
  // if (!localStorage.getItem('comments')) {
  //   localStorage.setItem('comments', JSON.stringify(commentsWithDate));
  // }

  if (commentInput || emailInput) {
    comments = comments.filter(
      (comment) =>
        comment.body.toLowerCase().includes(commentInput.toLowerCase()) &&
        comment.email.toLowerCase().includes(emailInput.toLowerCase()),
    );
  }

  const commentPerMonth = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  };

  comments.forEach((commentObj) => {
    if (Object.keys(commentPerMonth).includes(commentObj.date.slice(5, 7)) && commentObj.date.slice(5, 6) !== '0') {
      commentPerMonth[commentObj.date.slice(5, 7)] += 1;
    } else {
      commentPerMonth[commentObj.date.slice(6, 7)] += 1;
    }
  });
  // console.log(commentPerMonth);

  // X-axis
  ctx.beginPath();
  ctx.moveTo(PAD, DPI_HEIGHT - PAD); // point
  ctx.lineTo(DPI_WIDTH - PAD, DPI_HEIGHT - PAD); //where to go
  ctx.stroke();
  ctx.closePath();

  // Y-axis
  ctx.beginPath();
  ctx.moveTo(PAD, 0);
  ctx.lineTo(PAD, DPI_HEIGHT - PAD);
  ctx.stroke();
  ctx.closePath();

  ctx.font = '16px Arial';
  ctx.fillStyle = '#0c457d';
  ctx.fillText('Comments', 0, 15);
  ctx.fillText('Month', DPI_WIDTH - 60, DPI_HEIGHT - 50);

  const monthsLineChart = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthLength = (DPI_WIDTH - PAD - PAD) / 12;

  for (let i = 0; i < monthsLineChart.length; i++) {
    ctx.font = '14px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`${monthsLineChart[i]}`, PAD - 15 + monthLength * i, DPI_HEIGHT - 50);

    // monthes-axis
    ctx.beginPath();
    ctx.strokeStyle = '#bbb';
    ctx.moveTo(PAD + i * monthLength, DPI_HEIGHT - PAD);
    ctx.lineTo(PAD + i * monthLength, 20);
    ctx.stroke();
    ctx.closePath();
  }

  let maxNumCommPerMonth = Math.max(...Object.values(commentPerMonth)) + 10;
  const koef = (DPI_HEIGHT - PAD) / maxNumCommPerMonth; // px in one comment
  const step = Math.round((DPI_HEIGHT - PAD) / ROWS_COUNT);
  // console.log('step - textstep - koef', step, textStep, koef);

  ctx.beginPath(); // линии
  ctx.strokeStyle = '#bbb';
  ctx.font = '14px Arial';
  ctx.fillStyle = 'black';
  for (let i = 1; i <= ROWS_COUNT; i++) {
    const y = step * i;
    let numY = (DPI_HEIGHT - PAD - y).toFixed(0);
    ctx.fillText((numY / koef).toFixed(1), 40, y + 5);
    ctx.moveTo(PAD, y);
    ctx.lineTo(DPI_WIDTH - PAD, y);
  }
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'red';
  for (let i = 0; i < 12; i++) {
    ctx.moveTo(PAD + i * monthLength, DPI_HEIGHT - PAD - koef * commentPerMonth[i + 1]);
    ctx.lineTo(PAD + monthLength * (i + 1), DPI_HEIGHT - PAD - koef * commentPerMonth[i + 2]);
  }
  ctx.stroke();
  ctx.closePath();

  if (comments.length === 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '36px Arial';
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillText(`No data. Try another filter, please`, canvas.width / 2, canvas.height / 2);
  }
}
