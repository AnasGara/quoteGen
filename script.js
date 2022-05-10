const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("button-twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQuotes = [];
// https://type.fit/api/quotes
// get quote from an api

async function getQuote() {
  showLoader();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const res = await fetch(apiUrl);
    //turn the string into a json object
    apiQuotes = await res.json();
    getOneQuote();
  } catch (err) {
    console.log(err);
  }
}

//show loader when loading quote
function showLoader(){
  loader.hidden = false;
  quoteContainer.hidden = true;

}
function hideLoader(){
  loader.hidden = true;
  quoteContainer.hidden = false;
} //hide loader when loading quote


function getOneQuote() {
  showLoader(); 
  //pick random quote from the API Array
  let quote =
    apiQuotes[Math.floor(Math.random() * Math.floor(apiQuotes.length))];

  //check if there's an author
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //Style according to quote length
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //set the quote

  quoteText.textContent = quote.text;
  hideLoader();
}

//Tweet a quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');

}

//Event Listener
newQuoteBtn.addEventListener('click',getOneQuote);
twitterBtn.addEventListener('mouseover',tweetQuote);

getQuote();
