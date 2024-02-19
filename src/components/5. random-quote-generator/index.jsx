//https://api.quotable.io/quotes/random

import { useEffect, useState } from "react";
import './quote.css'

function RandomQuoteGenerator() {
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(null);

  async function fetchQuote() {
    try {
      setLoading(true);
      const apiResponse = await fetch("https://api.quotable.io/quotes/random", {
        method: "GET",
      });
      const result = await apiResponse.json();

      console.log(result);

      if (result && result.length > 0) {
        setLoading(false);
        setQuote(result[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  function handleRefresh(){
    fetchQuote()
  }
  if(loading) {
    return <h3>Loading Quote ! Please wait</h3>
  }

  return (
    <div className="random-quote-generator">
      <h1>Random Quote Generator</h1>
      <div className="quote-wrapper">
        <p>{quote?.author}</p>
        <p>{quote?.content}</p>
      </div>
      <button className="refresh-btn" onClick={handleRefresh}>Refresh</button>
    </div>
  );
}

export default RandomQuoteGenerator;
