export async function search({ request } = {}) {
  async function getResponse(url, prevResponse = { results: [] }) {
    if (!url) {
      return prevResponse;
    }
    const response = await fetch(url).then(response => response.json());
    const nextResponse = {
      ...response,
      results: [
        ...prevResponse.results,
        ...response.results,
      ],
    };
    return await getResponse(response.next, nextResponse);
  }

  const encodedRequest = encodeURIComponent(request);
  const url = `https://swapi.co/api/planets/?search=${encodedRequest}`;
  const response = await getResponse(url);
  return response;
};
