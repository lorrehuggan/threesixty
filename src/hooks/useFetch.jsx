import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    // abort controller A controller object that allows you to abort one or more DOM requests as and when desired.
    const abort = new AbortController();

    fetch(url, { signal: abort.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch resource');
        }
        return res.json();
      })
      .then((data) => {
        setData(data.results);
        setResults(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          setLoading(false);
          setError(err.message);
        }
      });

    return () => {
      //abort fetch cleanup
      abort.abort();
    };
  }, [url]);

  return { data, loading, error, results, setLoading };
};

export default useFetch;
