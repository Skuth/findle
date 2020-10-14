import React, { useEffect, useState } from "react"
import { FiSearch } from "react-icons/fi"
import { useHistory } from "react-router-dom"
import axios from "axios"

import "../styles/pages/home.css"

import Logo from "../images/logo.png"

function Home() {
  let history = useHistory()

  let [search, setSearch] = useState("")
  let [suggestions, setSuggestions] = useState([]) as any
  let [champions, setChampions] = useState([]) as any

  useEffect(() => {
    axios.get("http://ddragon.leagueoflegends.com/cdn/10.21.1/data/en_US/champion.json")
    .then(res => res.data)
    .then(res => {
      res = res.data
      
      let championsName: string[] = []

      Object.keys(res).map(i => championsName.push(i))

      setChampions(championsName)
    })
  }, [setChampions])
  
  function linkTo(path: string) {
    history.push(path)
  }

  function searchChampion(e: React.FormEvent) {
    e.preventDefault()

    linkTo(`/champion/${suggestions[0]}`)
  }

  function handleSuggestionUpdate(value: string) {
    if (value.length === 0) {
      setSuggestions([])
    } else {
      setSuggestions(champions.sort().filter((v: string) => v.toLowerCase().includes(value.toLowerCase())))
    }
  }

  function handleInputChange(value: string) {
    setSearch(value)

    handleSuggestionUpdate(value)
  }

  return (
    <div id="page-home">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="search-box">
        <form onSubmit={searchChampion} autoComplete="off">
          <input
            onChange={event => handleInputChange(event.target.value)}
            value={search}
            name="champion"
            type="text"
            placeholder="Pesquise um campeão"
          />
          <button type="submit"><FiSearch size={20} color="#FFF" /></button>
        </form>
        <div className="champions-suggestions">
          <ul>
            {suggestions.map((champion: any, index: number) => {
              return (
                <li key={index} onClick={() => {linkTo(`/champion/${champion}`)}}><img src={`http://ddragon.leagueoflegends.com/cdn/10.21.1/img/champion/${champion}.png`} alt={champion} />  {champion}</li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home