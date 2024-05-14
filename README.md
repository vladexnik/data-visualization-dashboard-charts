# Custom data visualization dashboard

## 1. About project:

It is a web application that fetches data from a provided API and displays it in a user-friendly dashboard using only vanilla JavaScript. The dashboard should include at least three types of data visualization components (e.g., bar chart, line chart, and pie chart). The goal is to demonstrate proficiency in data handling, DOM manipulation, and creative presentation of information. Must create the visualization components from scratch using vanilla JavaScript. No use of libraries like D3.js or Chart.js for the charts.

## 2. Requirements:

- Use the JSONPlaceholder (https://jsonplaceholder.typicode.com/) for mock data. Specifically, fetch data from the /users, /posts, and /comments endpoints to display user-related analytics

- Bar Chart: display the number of posts per user

- Line Chart: show the monthly comment trend based on the timestamp of the posts (you can simulate timestamps or create a mock setup since JSONPlaceholder doesn't provide dates)

- Pie Chart: illustrate the percentage distribution of posts among users

- Implement interactive filtering options to view data for specific users

- A `README.md` file in the repository detailing instructions on how to set up and run the project, along with a brief explanation of the project structure.

- A live demo link (optional but recommended, can be hosted on free platforms like GitHub Pages or Netlify)

## 3. Technologies

- JS
- CSS
- HTML, canvas

## 4. How to run the application

clone the repository:

```sh
$ git clone https://github.com/vladexnik/data-visualization-dashboard-charts
```

Run the app with any server you use, for example, "Live Server"

Click in the bar:

```sh
$ Go Live
```

## 5. Structure of the project:

In the root folder are main files of the app:
index.html, styles.css, script.js.

Modules folder includes files for logic of every chart: `barChart.js`, `lineChart.js`, `pieChart.js`, which are called in `script.js`.

Constants folder includes:

- `constants.js` - constants for size of canvas, randomizer of color, base URL for fetching.

- `service.js` - async function for fetching data from URL

## 6. Possibilities

Fetching data from API, creating and building 3 different types of charts, filtering data by input data.

## 7. Deploy

https://charts-dashboard22.netlify.app/

## 8. Creators

- [Nikityuk Vlad]: https://t.me/Slev22 — Front-End Developer
