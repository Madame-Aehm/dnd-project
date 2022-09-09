import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useMainFetch from '../hooks/useMainFetch';

function Languages() {

    const {
        object,
        array: languagesList,
        pageLoader,
        error,
      } = useMainFetch("https://www.dnd5eapi.co/api/languages");

    async function scoreFetch(restURL) {
        try {
            const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
            const result = await response.json();
            setLanguage(result);
            setLoader(false);
        } catch (error) {
            console.log("error", error)
            setSubError(error);
            setLoader(false);
        }
    }

    const [subError, setSubError] = useState(null);
    const [language, setLanguage] = useState({})
    const [loader, setLoader] = useState(true);

    function setFirstCheck() {
        const allChecks = document.querySelectorAll("input[type='radio']");
        const firstCheck = document.querySelector("input[type='radio']");
        let isChecked = false;
        for (let i = 0; i < allChecks.length; i++) {
          if (allChecks[i].checked) {
            isChecked = true;
            break;
          }
        }
        if (!isChecked && firstCheck) {
          firstCheck.checked = true;
          scoreFetch(firstCheck.value);
        }
    }

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Languages</h1>
        {error && <p>Something went wrong.. Please reload.</p>}
        {pageLoader && <Loader/>}
        {!pageLoader && 
            <>
                <div className='checkbox-container-3'>
                    {languagesList.map((item) => {
                    return (
                        <div key={item.index}>
                            <input type={"radio"} 
                                name={"conditions"} 
                                value={item.url} id={item.index} 
                                onChange={
                                (e) => {
                                    setLoader(true);
                                    scoreFetch(item.url)
                                }
                                }/>
                            <label htmlFor={item.index}><div>{item.name}</div></label>
                        </div>
                    )
                    })}
                </div>
                {subError && <p>Something went wrong.. Please reload</p>}
                {loader && <p>loading...</p>}
                {!loader &&
                    <>
                        <div className='display'>
                            <h3>{language.name}</h3>
                            <p>Script: <b>{language.script}</b> | Type: <b>{language.type}</b></p>
                        <hr/>
                            <h5>Typical Speakers</h5>
                            <div className='mini-h-list'>
                                {language.typical_speakers.map((item, i) => {
                                    return <h6 key={i}>{item}</h6>
                                })}
                            </div>
                        </div>
                    </>
                }
            </>
        }
        {setFirstCheck()}
    </div>
  )
}

export default Languages