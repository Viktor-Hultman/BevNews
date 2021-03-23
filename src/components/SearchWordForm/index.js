import { render } from '@testing-library/react';
import React, { useContext, useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

import { withAuthorization } from '../Session';
// import { withFirebase } from '../Firebase';


const SearchWordForm = ({firebase}) => {
    const [userWordsArr, setUserWordsArr] = useState([])
    const [inputValue, setInputValue] = useState("")

    let { settings, uid, username} = useContext(AuthUserContext);

    const userSearchWords = () => {

            firebase.user(uid).child('settings').child('searchWords')
            .once('value')
            .then(snapshot => {
                const searchWordsObject = snapshot.val();
                
    
                let searchWordArray = Object.keys(searchWordsObject)
                setUserWordsArr(searchWordArray);
                
                
                
            });
       
    }
    
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

    const buttonClick = () => {
        addSearchWord(inputValue)

    }

    const handleClick = (item) =>{
        let value = item 
        removeSearchWord(item)
        let filteredUserWordsArr = userWordsArr.filter (item=>item !== value)
        setUserWordsArr(filteredUserWordsArr)
    }

    console.log(userWordsArr);

    useEffect (() => {
        userSearchWords();
    }, []);

    
    return (
        <div>
            <SearchWordList handleClick={handleClick} userWordsArr={userWordsArr} />
            
                <h2>
                    add search words here
                </h2>
                <AddWordForm buttonClick={buttonClick} inputChange={inputChange}/>
               
        </div>
    

    );
}


const SearchWordList = ({userWordsArr, handleClick}) => (
    <ul>
        {userWordsArr.map((item,index) => (<SearchWordItem handleClick={handleClick} key={index} item={item} />))}
        
    </ul>
);

const SearchWordItem = ({item, handleClick}) => (
    <li>
        {item}
        <button onClick={(event) => handleClick(item)}>Remove</button>
    </li>
);

const AddWordForm = ({inputChange, buttonClick}) => (
    <form>


        <input type="text" placeholder="add keyword" onChange={inputChange}></input>
            <button onClick={buttonClick}> Add </button>
    </form> 
)



export default (withFirebase(SearchWordForm));