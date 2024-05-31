import React, { useState } from 'react';

function App() {
  const [trends, setTrends] = useState([]);
  const [timestamp, setTimestamp] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [jsonData, setJsonData] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [ButtonLoading, setButtonLoading] = useState(false);

  const handleClick = () => {
    setShowResults(false);
    setButtonLoading(false);
    fetch('http://127.0.0.1:5000/api/trending_topics')
      .then(response => response.json())
      .then(data => {
        setTrends(data.Topics.map(topic => topic.Topic));
        setTimestamp(data.Time);
        setIpAddress(data.IP);
        setJsonData(data);
        setShowResults(true);
        setButtonLoading(true);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <div>
      {
        showResults ?
          <header className="App-header">
            <button onClick={handleClick}>Get Trending Topics</button>
            {showResults && (
              <div>
                <p>These are the most happening topics as on {timestamp}</p>
                <ul>
                  {trends.map((trend, index) => (
                    <li key={index}>{trend}</li>
                  ))}
                </ul>
                <p>The IP address used for this query was {ipAddress}</p>
                <p>Here’s a JSON extract of this record from the MongoDB:</p>
                <pre>{JSON.stringify(jsonData, null, 2)}</pre>
                <p>
                  <button onClick={() => handleClick()}>Click here to run the query again</button>
                </p>
              </div>
            )}
          </header>
          :
          <>
            {
              ButtonLoading ?
                <>LOADING....</>
                :
                <button onClick={handleClick}>Get Trending Topics</button>
            }
          </>
      }
    </div>
  );
}

export default App;
