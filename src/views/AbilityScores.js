import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import '../abilityscores.css';

function AbilityScores() {

    const [abilityScoresList, setAbilityScoresList] = useState([]);
    const fetchList = async() => {
      if (abilityScoresList.length === 0) {
        try {
          const response = await fetch("https://www.dnd5eapi.co/api/ability-scores");
          const result = await response.json();
          setAbilityScoresList(result.results);
          console.log(result.results);
        } catch (error) {
          console.log("error", error)
        }
      }
    }

    useEffect(() => {
        fetchList();
      }, []);

    function checkChecked() {

    }

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Ability Scores</h1>
        <div>
            {abilityScoresList.map((item, i) => {
                return (
                    <div key={i}>
                        <input type={"radio"} name={"ability-score"} value={item.index} id={item.index}/>
                        <label htmlFor={item.index}>{item.name}</label>
                    </div>
                )
            })}
        </div>
        
        <div className='display'>
            Testing testing

        </div>
    </div>
  )
}

export default AbilityScores