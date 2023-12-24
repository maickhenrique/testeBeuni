const base_url = "https://api.beuni.com.br/atlas/brands/v2/products";

// Essa fuunção é responsável por obter a lista de produtos da API
const getProducts = async (queryParams) => {
  try {
    // Verificar se queryParams não é null ou undefined
    if (!queryParams) {
      throw new Error("Parâmetros de consulta não fornecidos.");
    }

    // Montar a URL com os parâmetros da consulta
    const url = new URL(base_url);

    // Adiciona os parâmetros da consulta à URL
    Object.keys(queryParams).forEach((key) => {
      // Verifica se o valor do parâmetro não é null ou undefined antes de adicioná-lo à URL
      if (queryParams[key] !== null && queryParams[key] !== undefined) {
        url.searchParams.append(key, queryParams[key]);
      }
    });

    // Faz a requisição à API
    const response = await fetch(url.toString());

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    // Converte a resposta para JSON e a retorna
    return response.json();
  } catch (error) {
    console.error("Erro ao retornar os produtos", error.message);
    throw error; // Rejeita a promise para que o chamador possa lidar com o erro
  }
};

export default getProducts;
