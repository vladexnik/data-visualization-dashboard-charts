import { fetchNewData } from '../constants/service.js';
import {
  // WIDTH,
  // HEIGHT,
  PAD,
  DPI_HEIGHT,
  DPI_WIDTH,
  ROWS_COUNT,
} from '../constants/constants.js';
import { BASE_URL } from '../constants/constants.js';
import { dbposts } from '../constants/db.js';

export async function loadPieData() {
  let posts = dbposts;
  let users = await fetchNewData(`${BASE_URL}/users`);

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
  createPieChart(posts, users, postsPerUserId);
}

function createPieChart(posts, users, postsPerUserId) {
  const canvas = document.getElementById('canvasPieChart');
  const ctx = canvas.getContext('2d');
  canvas.width = DPI_WIDTH;
  canvas.height = DPI_HEIGHT;

  console.log(posts, users);
  console.log(postsPerUserId);

  users = users.map((user) => ({
    ...user,
    numberOfPosts: 0,
  }));

  for (let i = 0; i < users.length; i++) {
    posts.forEach((post) => {
      if (post.userId === users[i].id) {
        users[i].numberOfPosts++;
      }
    });
  }
  console.log(users);

  //   ctx.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT);
}
