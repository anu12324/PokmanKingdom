
import './App.css';
import { useEffect, useState } from "react";
import Card from './component/Card'

function App() {
  const [isLoading, setLoading] = useState(false)
  const [pokemonList, setPokemonList] = useState([])
  const [url, setUrl] = useState('https://content.newtonschool.co/v1/pr/64ccef982071a9ad01d36ff6/pokemonspages1');

  useEffect(() => {
    getPokemonList();
    // return ()=>setPokemonList([])
  }, [])

  async function getPokemonList() {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setUrl(data[0]?.next);
    const allPokemons = pokemonList
    // await data.results.map(async (data)=>{
    //     const {url}=data;
    //     const pokemon =await getPokemonData(url)
    //     console.log("pokemon")
    //     await allPokemons.push(pokemon);
    // })

    // WHY MAP FUNCTION IS NOR WORKING 

    for (const da of data[0].results) {
      const { url } = da;
      const pokemon = await getPokemonData(url)
      allPokemons.push(pokemon[0])
    }
    console.log("all", allPokemons)
    setPokemonList(allPokemons)
    setLoading(false);
  }

  async function getPokemonData(url) {
    const response = await fetch(url)
    const jsonData = await response.json();
    // console.log(jsonData)
    return jsonData;
  }

  async function getMorePoke() {
    await getPokemonList();
  }

  return (
    <>
      {isLoading ? <div> Pokemon kinggdom is loading </div> :
        <div>
          <header>
            <h2>Pokemon Kingdom</h2>
          </header>
          <div className="main-container">
            {pokemonList.length !== 0 && pokemonList.map((data, index) =>
              <Card pokeInfo={data} key={index} />
            )}
          </div>
          {url && <button className='getMoreBtn' onClick={getMorePoke}>Get More Pokemon</button>}
        </div>
      }
    </>
  )
}

export default App;

