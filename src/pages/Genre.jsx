import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseURL, FETCH_CATEGORIES } from '../utils/request';
import useFetch from '../hooks/useFetch';

function Genre() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetch(
    baseURL + FETCH_CATEGORIES(id, page)
  );
  console.log(data);

  return (
    <div>
      {data.map((d) => (
        <p>{d?.original_title || d?.title || ''}</p>
      ))}
    </div>
  );
}

export default Genre;
