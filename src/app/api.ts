const ROOT_ENDPOINT = 'https://api.punkapi.com/v2/';

export const fetchRequest = async <T>(
  endpoint: string,
  payload: any
): Promise<T> => {
  let result: T;
  try {
    const response = await fetch(ROOT_ENDPOINT + endpoint);
    if (response.ok) {
      const json = await response.json();
      result = json;
    } else {
      throw new Error('Response not ok');
    }
  } catch (e) {
    throw new Error(e);
  }
  return result;
};
