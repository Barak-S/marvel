import axios from 'axios'

export const getSuperHerosByName = async (name: string) => {
  const result = await axios.get(`https://www.superheroapi.com/api.php/10219162639496628/search/${name}`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
  return result
}