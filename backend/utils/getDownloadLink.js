const puppeteer = require("puppeteer");
const { MoviesCollection } = require("../Models/Movies");

async function getEpisodes(url) {
  // console.log("Getting episodes", url);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the specified URL
  await page.goto(url, { waitUntil: "networkidle2" });

  // Evaluate the page content
  const buttons = await page.evaluate(() => {
    const sections = document.querySelectorAll("section");
    const result = {};

    sections.forEach((section, index) => {
      if (section.querySelector(".elementor-col-33")) {
        const episodeTitle = section
          .querySelector(".elementor-heading-title")
          ?.textContent?.trim();
        // console.log(episodeTitle);
        const episodeNumberMatch = episodeTitle?.match(/Episode\s([\d\s&]+)/i);
        const episodeKey = episodeNumberMatch
          ? `episode${episodeNumberMatch[1].replace(/\s+/g, "")}`
          : `episode${index + 1}`;

        if (episodeTitle) {
          const buttons = section.querySelectorAll("a.elementor-button");
          buttons.forEach((button) => {
            if (!result[episodeKey]) {
              result[episodeKey] = [];
            }
            result[episodeKey].push({
              dest: button.getAttribute("href"),
            });
          });
        }
      }
    });

    return result;
  });

  const finalData = [];
  for (const key of Object.keys(buttons)) {
    for (const { dest } of buttons[key]) {
      finalData.push({
        key,
        dest,
      });
    }
  }

  const formattedData = finalData.reduce((acc, { key, dest }) => {
    acc[key] = { key, dest };
    return acc;
  }, {});

  // Close the browser
  await browser.close();
  return formattedData;
}

async function generateLink(link) {
  // console.log("Opening link:", link);

  let videourl;
  const urlPattern =
    /^https:\/\/dweds[0-9]+\.downloadwella\.com\/d\/[a-z0-9]+\/[A-Za-z0-9\.\(\)]+\.mkv$/;

  // Launch the browser in headless mode, disabling unnecessary resources
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  // Disable loading of images, stylesheets, and other unnecessary resources
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    if (
      ["image", "stylesheet", "font", "script", "media"].includes(
        request.resourceType()
      )
    ) {
      request.abort(); // Prevent loading of unwanted resources
    } else {
      request.continue();
    }
  });

  // Set a custom user agent to simulate a real browser
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
  );

  try {
    await page.goto(link, { waitUntil: "domcontentloaded", timeout: 60000 });
    // console.log("Page loaded!");

    // Function to handle requests and look for video URLs
    const requestListener = (request) => {
      if (request.method() === "GET" && urlPattern.test(request.url())) {
        videourl = request.url();
        // console.log("Video URL detected:", videourl);
      }
    };

    // Set up request interception for video URL detection
    page.on("request", requestListener);

    // Function to immediately click the download button once it is found
    const clickDownloadButton = async () => {
      // console.log("Waiting for the download button...");

      // Wait for the download button to appear and click it as soon as it's found
      await page.waitForSelector(".downloadbtn", {
        visible: true,
        timeout: 10000,
      });
      // console.log("Download button found, clicking...");

      await page.click(".downloadbtn");

      // Wait to ensure all requests have been processed
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Short wait after click
    };

    // Execute the click handler
    await clickDownloadButton();

    await browser.close(); // Close the browser
    if (!videourl) {
      throw new Error("No video URL found after clicking the download button");
      // console.log("No video URL found after clicking the download button.");
    }
    return { videourl };

    // console.log({ videourl });
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    // await browser.close(); // Close the browser
    // return { videourl }; // Return the video URL and other details
  }
}

async function scrapeButtons(url, size, synopsis) {
  // Launch the browser in headless mode, disabling unnecessary resources
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Disable loading of images, stylesheets, and other unnecessary resources
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    if (
      ["image", "stylesheet", "font", "media", "script"].includes(
        request.resourceType()
      )
    ) {
      request.abort(); // Prevent loading of unnecessary resources
    } else {
      request.continue(); // Allow the necessary requests
    }
  });

  // Navigate to the specified URL
  await page.goto(url, { waitUntil: "domcontentloaded" });

  // Evaluate the page content to get episode details and buttons
  const buttons = await page.evaluate(() => {
    const sections = document.querySelectorAll("section");
    const result = {};

    sections.forEach((section, index) => {
      if (section.querySelector(".elementor-col-33")) {
        const episodeTitle = section
          .querySelector(".elementor-heading-title")
          ?.textContent?.trim();
        const episodeNumberMatch = episodeTitle?.match(/Episode\s([\d\s&]+)/i);
        const episodeKey = episodeNumberMatch
          ? `episode${episodeNumberMatch[1].replace(/\s+/g, "")}`
          : `episode${index + 1}`;

        if (episodeTitle) {
          const buttons = section.querySelectorAll("a.elementor-button");
          buttons.forEach((button) => {
            if (!result[episodeKey]) {
              result[episodeKey] = [];
            }
            result[episodeKey].push({
              dest: button.getAttribute("href"),
            });
          });
        }
      }
    });

    return result;
  });

  const finalData = [];
  for (const key of Object.keys(buttons)) {
    for (const { dest } of buttons[key]) {
      // Only fetch necessary details using the optimized `generateLink` function
      const { videourl, synopsis: generatedSynopsis } = await generateLink(
        dest,
        size,
        synopsis
      );
      finalData.push({
        key,
        dest,
        videourl,
        synopsis: generatedSynopsis,
      });
    }
  }

  // Format the final data
  const formattedData = finalData.reduce(
    (acc, { key, dest, videourl, synopsis }) => {
      acc[key] = { key, dest, videourl, synopsis };
      return acc;
    },
    {}
  );

  // Close the browser after scraping
  await browser.close();

  return formattedData;
}
// async function scrapeButtons(url, size, synopsis) {
//   // Launch a new browser instance
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   // Navigate to the specified URL
//   await page.goto(url, { waitUntil: "networkidle2" });

//   // Evaluate the page content
//   const buttons = await page.evaluate(() => {
//     const sections = document.querySelectorAll("section");
//     const result = {};

//     sections.forEach((section, index) => {
//       if (section.querySelector(".elementor-col-33")) {
//         const episodeTitle = section
//           .querySelector(".elementor-heading-title")
//           ?.textContent?.trim();
//         // console.log(episodeTitle);
//         const episodeNumberMatch = episodeTitle?.match(/Episode\s([\d\s&]+)/i);
//         const episodeKey = episodeNumberMatch
//           ? `episode${episodeNumberMatch[1].replace(/\s+/g, "")}`
//           : `episode${index + 1}`;

//         if (episodeTitle) {
//           const buttons = section.querySelectorAll("a.elementor-button");
//           buttons.forEach((button) => {
//             if (!result[episodeKey]) {
//               result[episodeKey] = [];
//             }
//             result[episodeKey].push({
//               dest: button.getAttribute("href"),
//             });
//           });
//         }
//       }
//     });

//     return result;
//   });

//   const finalData = [];
//   for (const key of Object.keys(buttons)) {
//     for (const { dest } of buttons[key]) {
//       const { videourl, synopsis: generatedSynopsis } = await generateLink(
//         dest,
//         size,
//         synopsis
//       );
//       finalData.push({
//         key,
//         dest,
//         videourl,
//         synopsis: generatedSynopsis,
//       });
//     }
//   }

//   const formattedData = finalData.reduce(
//     (acc, { key, dest, videourl, synopsis }) => {
//       acc[key] = { key, dest, videourl, synopsis };
//       return acc;
//     },
//     {}
//   );

//   // Close the browser
//   await browser.close();
//   return formattedData;
// }

//For updating Series
async function addNewEpisodes(data) {
  console.log("addNewEpisodes");
  let browser;

  try {
    // Launch puppeteer with request interception to block unnecessary resources
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Intercept requests to block loading images, styles, fonts, etc.
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (
        ["image", "stylesheet", "font", "media"].includes(
          request.resourceType()
        )
      ) {
        request.abort(); // Block unwanted resources
      } else {
        request.continue();
      }
    });

    // Navigate to the page, only waiting for essential content to load
    await page.goto(data.link, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Extract buttons and episode details efficiently
    const buttons = await page.evaluate(() => {
      const sections = document.querySelectorAll("section");
      const result = {};

      sections.forEach((section, index) => {
        if (section.querySelector(".elementor-col-33")) {
          const episodeTitle = section
            .querySelector(".elementor-heading-title")
            ?.textContent?.trim();
          const episodeNumberMatch =
            episodeTitle?.match(/Episode\s([\d\s&]+)/i);
          const episodeKey = episodeNumberMatch
            ? `episode${episodeNumberMatch[1].replace(/\s+/g, "")}`
            : `episode${index + 1}`;

          if (episodeTitle) {
            const buttons = section.querySelectorAll("a.elementor-button");
            buttons.forEach((button) => {
              if (!result[episodeKey]) {
                result[episodeKey] = [];
              }
              result[episodeKey].push({
                dest: button.getAttribute("href"),
              });
            });
          }
        }
      });

      return result;
    });

    // Filter and format new episodes' data
    const finalData = [];
    for (const key of Object.keys(buttons)) {
      // Fetch new episode details if they don't exist in current data
      if (!data.details[key]) {
        for (const { dest } of buttons[key]) {
          finalData.push({ key, dest });
        }
      } else {
        finalData.push({ key, dest: data.details[key].dest });
      }
    }

    // Reduce the final data to the required format
    const formattedData = finalData.reduce((acc, { key, dest }) => {
      acc[key] = { dest, key };
      return acc;
    }, {});

    return formattedData;
  } catch (error) {
    console.error("Error in addNewEpisodes:", error);
    throw error; // Re-throw the error to handle it in the calling function
  } finally {
    if (browser) {
      await browser.close(); // Ensure browser is closed in the end
    }
  }
}
// async function addNewEpisodes(data) {
//   console.log("addNewEpisodes");
//   let browser;

//   try {
//     browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.goto(data.link, { waitUntil: "networkidle2" });

//     const buttons = await page.evaluate(() => {
//       const sections = document.querySelectorAll("section");
//       const result = {};

//       sections.forEach((section, index) => {
//         if (section.querySelector(".elementor-col-33")) {
//           const episodeTitle = section
//             .querySelector(".elementor-heading-title")
//             ?.textContent?.trim();
//           const episodeNumberMatch =
//             episodeTitle?.match(/Episode\s([\d\s&]+)/i);
//           const episodeKey = episodeNumberMatch
//             ? `episode${episodeNumberMatch[1].replace(/\s+/g, "")}`
//             : `episode${index + 1}`;

//           if (episodeTitle) {
//             const buttons = section.querySelectorAll("a.elementor-button");
//             buttons.forEach((button) => {
//               if (!result[episodeKey]) {
//                 result[episodeKey] = [];
//               }
//               result[episodeKey].push({
//                 dest: button.getAttribute("href"),
//               });
//             });
//           }
//         }
//       });

//       return result;
//     });

//     const finalData = [];

//     for (const key of Object.keys(buttons)) {
//       // Fetch new details only if the episode does not exist in the current data
//       if (!data.details[key]) {
//         for (const { dest } of buttons[key]) {
//           finalData.push({
//             key,
//             dest,
//           });
//         }
//       } else {
//         finalData.push({
//           key,
//           dest: data.details[key].dest,
//         });
//       }
//     }

//     const formattedData = finalData.reduce((acc, { key, dest }) => {
//       acc[key] = { dest, key };
//       return acc;
//     }, {});

//     return formattedData;
//   } catch (error) {
//     console.error("Error in addNewEpisodes:", error);
//     throw error; // Re-throw the error to handle it in the calling function
//   } finally {
//     if (browser) {
//       await browser.close();
//     }
//   }
// }

async function checkForNewEpisodes(obj) {
  const newData = await addNewEpisodes(obj);
  console.log("checking for new episodes");

  const existingEpisodes = obj.details;
  let isUpdated = false;

  for (const [key, newEpisode] of Object.entries(newData)) {
    // Check if episode exists and if its synopsis needs to be updated
    if (existingEpisodes[key] && existingEpisodes[key].synopsis) {
      newEpisode.synopsis = existingEpisodes[key].synopsis;
    }

    // Convert both the existing episode and the new episode to strings for comparison
    const existingEpisodeStr = JSON.stringify(existingEpisodes[key]);
    const newEpisodeStr = JSON.stringify(newEpisode);

    // Check if there's a difference between the existing and new episodes
    if (!existingEpisodes[key] || existingEpisodeStr !== newEpisodeStr) {
      existingEpisodes[key] = newEpisode;
      isUpdated = true; // Mark as updated if there are any changes
    }
  }

  if (isUpdated) {
    // Update the database only if there are changes
    await MoviesCollection.updateOne(
      { _id: obj._id },
      { $set: { details: existingEpisodes } }
    );
    console.log("Database updated with new episodes.");
  } else {
    console.log("No changes detected; database update not necessary.");
  }
}
// for getting movies download liks
// async function getMoviesDownloadLink(url) {
//   const seriesPattern = /^https:\/\/nkiri\.com\/.+-tv-series\/$/;

//   let browser;
//   try {
//     browser = await puppeteer.launch({
//       headless: true,
//       args: ["--no-sandbox", "--disable-setuid-sandbox"],
//       timeout: 60000, // Increase launch timeout
//     });
//     const page = await browser.newPage();

//     await page.setDefaultNavigationTimeout(60000); // 60 seconds
//     await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

//     const data = await page.evaluate(() => {
//       const buttonLinks = document.querySelector(
//         ".elementor-button-link"
//       )?.href;
//       const alertDescriptions = document.querySelector(
//         ".elementor-alert-description"
//       )?.innerText;

//       let paragraphText = "";
//       const containers = document.querySelectorAll(
//         ".elementor-widget-container"
//       );

//       containers.forEach((container) => {
//         const nkiriContent14 = container.querySelector(".nkiri-content_14");
//         const nkiriContent13 = container.querySelector(".nkiri-content_13");
//         const pTag = container.querySelector("p");

//         if (nkiriContent14 && nkiriContent13 && pTag) {
//           paragraphText = pTag.textContent.trim();
//         }
//       });

//       return { buttonLinks, alertDescriptions, paragraphText };
//     });

//     if ((data && data.buttonLinks, data.buttonLinks)) {
//       if (seriesPattern.test(url))
//         return await scrapeButtons(url, "", data.paragraphText);
//       const size = data.alertDescriptions.split("is")[2];
//       const downloadLink = await generateLink(
//         data.buttonLinks,
//         size,
//         data.paragraphText
//       );
//       return { ...downloadLink, paragraphText: data.paragraphText };
//     } else {
//       console.error("No download link found on the page");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error retrieving download link:", error);
//     return null;
//   } finally {
//     if (browser) {
//       await browser.close();
//     }
//   }
// }
async function getMoviesDownloadLink(url) {
  const seriesPattern = /^https:\/\/nkiri\.com\/.+-tv-series\/$/;
  let browser;

  try {
    // Launch browser with disabled resource loading for images, stylesheets, etc.
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Intercept requests to block unnecessary resources (images, stylesheets, etc.)
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (
        ["image", "stylesheet", "font", "media"].includes(
          request.resourceType()
        )
      ) {
        request.abort(); // Block unwanted resources
      } else {
        request.continue();
      }
    });

    // Set a custom user agent to mimic a regular browser
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
    );

    // Navigate to the page and wait until the network is mostly idle
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    // Extract the necessary data (button link and alert descriptions)
    const data = await page.evaluate(() => {
      const buttonLinks = document.querySelector(
        ".elementor-button-link"
      )?.href;
      const alertDescriptions = document.querySelector(
        ".elementor-alert-description"
      )?.innerText;
      const paragraphText = Array.from(
        document.querySelectorAll(".elementor-widget-container p")
      )
        .map((p) => p.textContent.trim())
        .join(" ");

      return { buttonLinks, alertDescriptions, paragraphText };
    });

    // Check if button links are found, and proceed accordingly
    if (data && data.buttonLinks) {
      if (seriesPattern.test(url)) {
        return await scrapeButtons(url, "", data.paragraphText);
      }

      // Extract size from alert descriptions if available
      const size = data.alertDescriptions?.split("is")[2] || "Unknown size";
      const downloadLink = await generateLink(
        data.buttonLinks,
        size,
        data.paragraphText
      );
      return { ...downloadLink, paragraphText: data.paragraphText };
    } else {
      console.error("No download link found on the page");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving download link:", error);
    return null;
  } finally {
    if (browser) {
      await browser.close(); // Close the browser after extraction
    }
  }
}

module.exports = {
  getMoviesDownloadLink,
  checkForNewEpisodes,
  getEpisodes,
  generateLink,
};
