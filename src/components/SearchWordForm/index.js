import { render } from '@testing-library/react';
import React, { useContext, useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

import { withAuthorization } from '../Session';
// import { withFirebase } from '../Firebase';


const SearchWordForm = ({firebase}) => {
    const [userWordsArr, setUserWordsArr] = useState([])
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
    // Object.keys({ 'Tesla': true, 'Volvo': true }) --> 
    return (
        <SearchWordList handleClick={handleClick} userWordsArr={userWordsArr} />

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


export default (withFirebase(SearchWordForm));