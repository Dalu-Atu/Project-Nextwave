const puppeteer = require("puppeteer");
const { MoviesCollection } = require("../Models/Movies");
const { checkForNewEpisodes } = require("./getDownloadLink");

async function filterNewMovies(newMovies) {
  console.log("Filtering");
  // Extract titles and categories from the new movies
  const query = newMovies.map((movie) => ({
    title: movie.title,
    category: movie.category,
  }));

  // Find existing titles and categories in the database
  const existingMovies = await MoviesCollection.find({
    $or: query,
  })
    .select("title category link details")
    .lean();

  // Create a set of existing titles and categories
  const existingTitlesAndCategories = new Set(
    existingMovies.map((movie) => `${movie.title}-${movie.category}`)
  );

  // Loop through the existing TV Series and check for new episodes
  for (const movie of existingMovies) {
    if (movie.category === "TV Series") {
      console.log(`checking if all series exist in ${movie.title}`);
      await checkForNewEpisodes(movie);
    }
  }

  // Filter out movies that already exist based on both title and category
  const filteredMovies = newMovies.filter((movie) => {
    const movieKey = `${movie.title}-${movie.category}`;
    const existsInDatabase = existingTitlesAndCategories.has(movieKey);

    // Otherwise, add the movie if it doesn't exist in the database or is a new TV Series
    if (!existsInDatabase) {
      return true;
    }
    return false;
  });

  return filteredMovies;
}

async function getMovieArticles(link) {
  console.log("Fetching movies...");
  // Launch the browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the desired webpage
  await page.setDefaultNavigationTimeout(90000); // 90 seconds
  await page.goto(link);

  // Extract the data
  const articlesData = await page.evaluate(() => {
    const articles = document.querySelectorAll("article");
    const data = [];

    articles.forEach((article) => {
      const thumbnailDiv = article.querySelector(".thumbnail");
      const category = article
        .querySelector(".blog-entry-category")
        .querySelector("a").textContent;
      const link = thumbnailDiv.querySelector("a")?.href;
      const image = thumbnailDiv.querySelector("img")?.src;
      const titleAnchor = article.querySelector(
        ".blog-entry-title a"
      )?.innerText;

      if (titleAnchor) {
        const title = titleAnchor.split(" (")[0];
        const year = titleAnchor.split(" (")[1]?.slice(0, 4);
        data.push({
          link: link || "",
          image: image || "",
          title: title || "",
          year: year || "",
          category: category || "",
        });
      }
    });

    return data;
  });

  await browser.close(); // Close the browser after extracting the data

  const data = await filterNewMovies(articlesData);
  return data;
}

module.exports = getMovieArticles;
