// import { render } from '@testing-library/react';
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { withFirebase } from '../Firebase';
import { FaTimes } from 'react-icons/fa';

import { AuthUserContext } from '../Session';

// import { withAuthorization } from '../Session';
// import { withFirebase } from '../Firebase';

const WarningMessage = styled.span`
    background-color: red;
    color: white;
`
const UserWordList = styled.ul`
    list-style:none;
`
const UserWords = styled.li`
    display: flex;
    justify-content: center;
    

`
const DelIcon = styled(FaTimes)`
    padding-top: 5px;
`
// ${props => props.theme.bg}; use this syntax to link background color of the element to the theme
const ChoosenWordsCard = styled.div`
    background-color:${props => props.theme.bg};
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
`
export const StyledInput = styled.input`
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 5px;
    resize: vertical;
`

const RemoveBtn = styled.button`
    border:none;
    background:#C4C4C4;
    cursor: pointer;
`

export const StyledButton = styled.button`
    cursor: pointer;
    background-color: ${props => props.theme.btnbg};
    border: none;
    color: black;
    padding: 5px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;

    &:disabled {
        background-color: red;
      }
`

const SearchWordForm = ({ firebase }) => {
    const [userWordsArr, setUserWordsArr] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [warningMsg, setWarningMsg] = useState("")

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

    const addWordInvalid = 
        inputValue === '';

    const buttonClick = (evt) => {
        //Checking if the input field has any value
        if (inputValue !== "") {
            //Checking if the user has 3 or more searchwords
            if (userWordsArr.length > 2) {
                //If the user has 3 or more searchwords, the add function will not run
                setWarningMsg("You can have a maximum of three search words")
                return
            }
            addSearchWord(inputValue);
            setInputValue("");
        }

        // evt.preventDefault();
    }

    const handleClick = (item) => {
        removeSearchWord(item)

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

    }, []);


    return (
        <div>
            <ChoosenWordsCard>
                <h2>Here are your searchwords you follow</h2>
                <SearchWordList handleClick={handleClick} userWordsArr={userWordsArr} />
                <h3>Add search words here</h3>
                <AddWordForm addWordInvalid = {addWordInvalid} inputValue={inputValue} buttonClick={buttonClick} inputChange={inputChange} warningMsg={warningMsg}/>
            </ChoosenWordsCard>
        </div>


    );
}


const SearchWordList = ({ userWordsArr, handleClick }) => (
    <UserWordList>
        {userWordsArr.map((item, index) => (<SearchWordItem handleClick={handleClick} key={index} item={item} />))}

    </UserWordList>
);

const SearchWordItem = ({ item, handleClick }) => (
    <UserWords>
        {item}
        <RemoveBtn onClick={() => handleClick(item) }><DelIcon/></RemoveBtn>
    </UserWords>
);

const AddWordForm = ({ inputChange, buttonClick, inputValue, warningMsg, addWordInvalid}) => (
    <>
        <StyledInput name="serchWordInputField" type="text" value={inputValue} placeholder="add keyword" onChange={inputChange}></StyledInput>
        <StyledButton disabled={addWordInvalid} type="submit" onClick={buttonClick} > Add </StyledButton>
        <WarningMessage>{warningMsg}</WarningMessage>
    </>
)



export default (withFirebase(SearchWordForm));