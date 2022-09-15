import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config";
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import DisplayMyCharacter from '../components/DisplayMyCharacter';

function Characters() {

  const { user } = useContext(AuthContext);
  const [charactersArray, setCharactersArray] = useState(null); 
  
  async function getCharacters () {
    const querySnapshot = await getDocs(collection(db, "Characters_user" + user.uid));
    const array = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      array.push(data);
    });
    setCharactersArray(array);
  }

  async function deleteCharacter (character) {
    if (window.confirm("Are you sure you want to delete " + character.name + "?")) {
      const newArray = charactersArray.filter((v) => v.id != character.id);
      setCharactersArray(newArray);
      await deleteDoc(doc(db, "Characters_user" + user.uid, character.id));
      alert(character.name + " has been deleted.");
    }
  }

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div className='content-container'>
      <NavBar/>
        <h3>My Characters:</h3>
        <div className='character-card-display'>
          {(charactersArray && charactersArray.length === 0) && <p>You haven't created any characters yet.</p>}
          {(charactersArray && charactersArray.length > 0) &&
            charactersArray.map((character) => {
              return (
                <label htmlFor='see-more' className='character-card add-pointer' key={character.id}>
                  <h4>{character.name}, the {character.class} {character.race}</h4>
                  <input type={"checkbox"} id={"see-more"}/>
                  <div className='character-display'>
                    <DisplayMyCharacter character={character}/>
                  </div>
                  <button onClick={() => deleteCharacter(character)}>Delete</button>
              </label>
              )
            })}
        </div>

        <Link className='explore-button' to={"/newcharacter"}>Create New Character</Link>
        <br/>

    </div>
  )
}

export default Characters