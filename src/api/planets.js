export async function search({ request } = {}) {
  async function getResponse(url, prevResponse = { results: [] }) {
    if (!url) {
      return prevResponse;
    }
    const rawResponse = await fetch(url);
    if (!rawResponse.ok) {
      let { status, statusText } = rawResponse;
      statusText = statusText && `: (${statusText})`;
      throw new Error(`${status}${statusText}`);
    }
    const response = await rawResponse.json();
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
  response.results = response.results.map(item => ({
    ...item,
    id: item.name,
  }));
  return response;
};
