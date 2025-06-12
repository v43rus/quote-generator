const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("movie");
const twitterBtn = document.getElementById("x");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let movieQuotes = [];

function loading() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}

function loadingCompleted() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new quote
function newQuote() {
  loading();
  const quote = movieQuotes[Math.floor(Math.random() * movieQuotes.length)];

  authorText.textContent = quote.movie ? quote.movie : "Unknown";
  authorText.textContent += quote.year ? ` (${quote.year})` : "";

  if (quote.quote.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.quote;
  loadingCompleted();
}

// Get Quotes from file
async function getQuotes() {
  loading();
  const list = "movie_quotes.json";

  try {
    const response = await fetch(list);
    movieQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// Page load
getQuotes();
loading();