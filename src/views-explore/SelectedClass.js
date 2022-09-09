import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DisplayClass from '../components/DisplayClass';
import DisplaySubclass from '../components/DisplaySubclass';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'

function SelectedClass() {

  const location = useLocation();
  const restURL = location.state.url;
  const cycleArray = location.state.array;
  const [selectedClass, setSelectedClass] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [error, setError] = useState(null);

  const cycleFetch = async(URL) => {
    try {
      const response = await fetch(`https://www.dnd5eapi.co${URL}`);
      const result = await response.json();
      setSelectedClass(result);
      console.log(result);
      setPageLoader(false);
    } catch (error) {
      console.log("error", error)
      setError(error);
      setPageLoader(false);
    }
  }

  useEffect(() => {
    cycleFetch(restURL);
  }, []);

  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");

  function findArrayPosition() {
    for (let i = 0; i < cycleArray.length; i++) {
      if (cycleArray[i].index === selectedClass.index) {
        cycleArray[i + 1] ? setNext(cycleArray[i + 1].url) : setNext("end");
        cycleArray[i - 1] ? setPrev(cycleArray[i - 1].url) : setPrev("end");
      }
    }
  }

  useEffect(() => {
    findArrayPosition();
  }, [selectedClass])

  function nextButton() {
    if (next === "end") {
      return (
        <button className='cycle' disabled>↠</button>
      )
    } else {
      return (
        <button className='cycle' onClick={() => {
          setPageLoader(true);
          cycleFetch(next)
        }}>↠</button>
      )
    }
  }

  function prevButton() {
    if (prev === "end") {
      return (
        <button className='cycle' disabled>↞</button>
      )
    } else {
      return (
        <button className='cycle' onClick={() => {
          setPageLoader(true);
          cycleFetch(prev)
        }}>↞</button>
      )
    }
  }

  return (
    <>
      <NavBar/>
      {error && <div className='content-container'><p>Something went wrong.. Please reload.</p></div>}
      {pageLoader && <div className='content-container'><Loader/></div>}
      {!pageLoader && 
        <>
          <div className='cycle-buttons-div'>
            {prevButton()}
            <h1>{selectedClass.name}</h1>
            {nextButton()}
          </div>
          {selectedClass.proficiencies && <DisplayClass props={selectedClass} />}
          {selectedClass.class && <DisplaySubclass props={selectedClass} />}
        </>
      }
    </>
  )
}

export default SelectedClass