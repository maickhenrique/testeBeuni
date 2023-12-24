import React, { useState } from 'react';

const SearchProduct = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    //função de pesquisa passando a consulta como argumento
    onSearch(searchQuery);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Digite sua pesquisa"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">Pesquisar</button>
      </form>
    </div>
  );
};

export default SearchProduct;
