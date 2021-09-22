import React, { useState, useContext } from 'react';
import { SearchContext } from '../../contexts/SearchContext';
import styled from 'styled-components';
import { BiSearchAlt } from 'react-icons/bi';
import { styledTheme } from '../../styles/Mixins';
import useFetch from '../../hooks/useFetch';
import { request, FETCH_QUERY, baseURL } from '../../utils/request';
import { useHistory } from 'react-router-dom';

export const Form = styled.form`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  border-radius: 4px;
`;

export const Input = styled.input`
  height: 100%;
  font-size: 1rem;
  padding: 0.75rem;
  outline: none;
  border: none;
  color: ${styledTheme.textSecondary};
  &::placeholder {
    font-size: 1rem;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ababab;
  }
`;

export const Search = styled(BiSearchAlt)`
  height: 70%;
  width: 70%;
  color: #050505;
  opacity: 0.8;
`;

function SearchForm() {
  const history = useHistory();
  const [query, setQuery] = useState('');

  const { searchData, setSearchData } = useContext(SearchContext);

  const { data, loading, error, results } = useFetch(
    baseURL + FETCH_QUERY(1, query)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchData(data);
    setQuery('');

    history.push('/search');

    return;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        required
      />
      <Button>
        <Search />
      </Button>
    </Form>
  );
}

export default SearchForm;
