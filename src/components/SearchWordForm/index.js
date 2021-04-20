
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { withFirebase } from '../Firebase';
import { FaTimes } from 'react-icons/fa';

import { AuthUserContext } from '../Session';


const WarningMessage = styled.span`
    background-color: red;
    color: white;
`
const UserWordList = styled.ul`
    list-style:none;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`

const UserWords = styled.li`
    display: flex;
    justify-content: center; 
    margin: 5px;
    cursor: pointer;
    color: ${props => props.theme.txt};
    :hover{
        color: ${props => props.theme.btnbg};
    }

`
const DelIcon = styled(FaTimes)`
    padding-top: 4px;
`

// ${props => props.theme.bg}; use this syntax to link background color of the element to the theme

export const ChoosenWordsCard = styled.div`
    color: ${props => props.theme.txt};
    background-color:${props => props.theme.card};
    border-radius: 10px;
    padding: 10px;

`
export const StyledInput = styled.input`
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 5px;
    resize: vertical;
`


export const StyledButton = styled.button`
    background-color: ${props => props.theme.btnbg};
    border: 1px solid ${props => props.theme.btnbg};
    color: ${props => props.theme.txt};
    padding: 5px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;

    :hover {
        border-color: #fff;
    }

    :disabled {
        cursor:default;
        color: ${props => props.theme.txtInverted};
        background-color: ${props => props.theme.btndis};
        border: 1px solid ${props => props.theme.btndis};
      }
`

const SearchWordForm = ({ firebase }) => {
    const [userWordsArr, setUserWordsArr] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [warningMsg, setWarningMsg] = useState("")

    let { uid } = useContext(AuthUserContext);

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
        setWarningMsg("")
        
    }

    const addWordInvalid = 
        inputValue === '';

    const buttonClick = () => {
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
    }

    const handleClick = (item) => {
        removeSearchWord(item)
        
    }

    

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
    <UserWords onClick={() => handleClick(item) }>
        {item}
        <DelIcon/>
    </UserWords>
);

const AddWordForm = ({ inputChange, buttonClick, inputValue, warningMsg, addWordInvalid}) => (
    <>
        <StyledInput name="serchWordInputField" type="text" value={inputValue} placeholder="add keyword" onChange={inputChange}></StyledInput>
        <StyledButton disabled={addWordInvalid} type="submit" onClick={buttonClick} > Add </StyledButton>
        <br/>
        <WarningMessage>{warningMsg}</WarningMessage>
    </>
)



export default (withFirebase(SearchWordForm));