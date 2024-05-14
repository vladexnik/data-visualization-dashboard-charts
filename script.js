import { buildBarChart } from './modules/barChart.js';
import { buildLineChart } from './modules/lineChart.js';
import { buildPieChart } from './modules/pieChart.js';
import { fetchNewData } from './constants/service.js';
import { BASE_URL } from './constants/constants.js';

const app = async () => {
  const users = await fetchNewData(`${BASE_URL}/users`);
  const posts = await fetchNewData(`${BASE_URL}/posts`);
  const comments = await fetchNewData(`${BASE_URL}/comments`);
  buildBarChart(users, posts);
  buildLineChart(comments);
  buildPieChart(users, posts);
};

document.addEventListener('DOMContentLoaded', function () {
  app();
});
