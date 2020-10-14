import React, { useState, useEffect } from "react"
import axios from "axios"
import { FiArrowLeft } from "react-icons/fi"
import { GiBroadsword, GiMagicShield, GiMagicPortal, GiFlame } from "react-icons/gi"

import "../styles/pages/champion.css"
import { useHistory, useParams } from "react-router-dom"

interface ChampionList {
  id: string
  title: string
  tags: string[]
  skins: [
    {
      id: string
      name: string
      num: number
    }
  ]
  info: {
    attack: number
    defense: number
    magic: number
    difficulty: number
  }
}

interface ChampionParams {
  champion: string
}

function Champion() {
  const { goBack } = useHistory()

  const params = useParams<ChampionParams>()

  let [championData, setChampionData] = useState<ChampionList>()


  useEffect(() => {
    axios(`http://ddragon.leagueoflegends.com/cdn/10.21.1/data/en_US/champion/${params.champion}.json`)
    .then(res => res.data)
    .then(res => {
      let data = res.data[params.champion]
      
      setChampionData(data)
    })

  }, [params.champion])
  
  if (!championData) {
    return (
      <div id="page-champion"></div>
    )
  }
  
  document.title = `${process.env.REACT_APP_TITLE} - ${championData.id}`

  return (
    <div id="page-champion">
      <div className="champion-container">
        <div className="back" onClick={goBack}>
          <FiArrowLeft size={26} color="#222" />
        </div>
        <div className="champion-info">
          <div className="info-picture">
            <img src={`http://ddragon.leagueoflegends.com/cdn/10.21.1/img/champion/${championData.id}.png`} alt={`Icone ${championData.id}`} />
          </div>
          <div className="info-header">
            <div className="info-title">
              <h1>{championData.id}</h1>
              <p>{championData.title}</p>
            </div>
            <div className="info-tags">
              {championData && championData.tags.map((tag, index) => {
                return (
                  <span key={index}>{tag}</span>
                )
              })}
            </div>
          </div>
        </div>

        <div className="champion-skins">
          {championData.skins.map(skin => {
            return (
              <div className="skin-box" key={skin.num}>
                <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championData?.id}_${skin.num}.jpg`} alt={`Skin ${skin.num} ${championData?.id}`} />
                <span>{skin.name}</span>
              </div>
            )
          })}
        </div>

        <div className="champion-attrs">
          <div className="info">
            <p><GiBroadsword size={24} color="#222" /> Attack
              <span>{championData.info.attack}</span>
            </p>
            <p><GiMagicShield size={24} color="#222" /> Defense
              <span>{championData.info.defense}</span>
            </p>
            <p><GiMagicPortal size={24} color="#222" /> Magic
              <span>{championData.info.magic}</span>
            </p>
            <p><GiFlame size={24} color="#222" /> Difficulty
              <span>{championData.info.difficulty}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Champion