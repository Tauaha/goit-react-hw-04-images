import {  useState } from "react";
import React from "react";
import PropTypes from 'prop-types';
import Styles from 'components/Searchbar/Searchbar.module.css'


function Searchbar ({onSubmitForm}) {
  const [imageName, setImageName] = useState('')
   
  const  handleNameChange = event => {
        setImageName(event.currentTarget.value.toLowerCase())};
    
  const handleSubmit = event => {
        event.preventDefault();
        onSubmitForm(imageName);
        setImageName('');
      };

   
return(
    <header className={Styles.searchbar}>
    <form className={Styles.SearchForm} onSubmit={handleSubmit}>
    <button type="submit" className={Styles.SearchForm_button}>
       <span className={Styles.SearchForm_label}>Search</span></button>
        <input  type="text"
        className={Styles.input}
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        name="imageName"
        value={imageName}
        onChange={handleNameChange}/>
    </form>
    </header>
)}

Searchbar.propTypes ={
  onSubmitForm: PropTypes.func.isRequired
 }        


export default Searchbar

