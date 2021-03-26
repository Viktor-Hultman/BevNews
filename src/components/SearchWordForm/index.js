// import { render } from '@testing-library/react';
import React, { useContext, useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

// import { withAuthorization } from '../Session';
// import { withFirebase } from '../Firebase';


const SearchWordForm = ({ firebase }) => {
    const [userWordsArr, setUserWordsArr] = useState([])
    const [inputValue, setInputValue] = useState("")

    let { uid } = useContext(AuthUserContext);

    /*const userSearchWords = () => {
    // https://stackoverflow.com/a/55370253/12683933
            firebase.user(uid).child('settings').child('searchWords')
            .once('value')
            .then(snapshot => {
                const searchWordsObject = snapshot.val();
                if (searchWordsObject) {
                    let searchWordArray = Object.keys(searchWordsObject)
                    setUserWordsArr(searchWordArray);
                } else {
                    setUserWordsArr([]);
                }
                
            });
       
    }*/

    const removeSearchWord = (name) => {
        firebase.user(uid).child('settings').child('searchWords')
            .update({ [name]: null })
    }

    const addSearchWord = (name) => {
        firebase.user(uid).child('settings').child('searchWords')
            .update({ [name]: true })
    }

    const inputChange = (evt) => {
        setInputValue(evt.target.value)
        console.log(inputValue)
    }

    const buttonClick = (evt) => {
        if(!inputValue === "") {
            addSearchWord(inputValue);
            setInputValue("");
        }

        evt.preventDefault();
    }

    const handleClick = (item) => {
        removeSearchWord(item)
        // let value = item 
        //let filteredUserWordsArr = userWordsArr.filter (item=>item !== value)
        //setUserWordsArr(filteredUserWordsArr)
    }

    console.log(userWordsArr);

    useEffect(() => {
        const unsubscribe = firebase.user(uid).child('settings').child('searchWords')
            .on('value', snapshot => {
                if (snapshot) {
                    const searchWordsObject = snapshot.val();
                    if (searchWordsObject) {
                        let searchWordArray = Object.keys(searchWordsObject)
                        setUserWordsArr(searchWordArray);
                    } else {
                        setUserWordsArr([]);
                    }
                }
            });
        return () => {
            unsubscribe();
        }
        //userSearchWords();
    }, []);


    return (
        <div>
            <h2>Here are your searchwords you follow</h2>
            <SearchWordList handleClick={handleClick} userWordsArr={userWordsArr} />
            <h3>Add search words here</h3>
            <AddWordForm inputValue={inputValue} buttonClick={buttonClick} inputChange={inputChange} />

        </div>


    );
}


const SearchWordList = ({ userWordsArr, handleClick }) => (
    <ul>
        {userWordsArr.map((item, index) => (<SearchWordItem handleClick={handleClick} key={index} item={item} />))}

    </ul>
);

const SearchWordItem = ({ item, handleClick }) => (
    <li>
        {item}
        <button onClick={(event) => handleClick(item)}>Remove</button>
    </li>
);

const AddWordForm = ({ inputChange, buttonClick, inputValue }) => (
    <form onSubmit={buttonClick}>
        <input name="serchWordInputField" type="text" value={inputValue} placeholder="add keyword" onChange={inputChange}></input>
        <button type="submit"> Add </button>
    </form>
)



export default (withFirebase(SearchWordForm));