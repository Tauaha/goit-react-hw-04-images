import React, {  useState,  useEffect} from "react";

import Styles from 'components/Container/Container.module.css'
import Searchbar from "./Searchbar/Searchbar";
import pixabayApi from 'services/pixabay-api';
import ImageGallery from "./ImageGallery/ImageGallery";
import ButtonLoadMore from "./Button/ButtonLoadMore";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";


export default function App () {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [images, setimages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [ , setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('')

  useEffect(()=> {
    if (!query) return;
    setIsLoading(true)
    pixabayApi.fetchImages( query, page ).then((data) => 
      setimages((prev)=>([...prev, ...data.hits])))
.catch(error => {setError(error)}).finally(() => {
  setIsLoading(false)
  				})}, [query, page])
  

  const incrementPage = () => {
    setPage((prev) => prev + 1);
  };

  const handleFormSubmit = query => {
    setQuery(query);
    setimages([])
    setPage(1)
 }

   const toggleModal = ({ largeImageURL = '' } = {}) => {
    setShowModal(( showModal ) => (
       !showModal))
    setLargeImageURL(largeImageURL)};


    return (
      <div className={Styles.container} >
        <Searchbar onSubmitForm={handleFormSubmit}/> 
        {images.length > 0 ?<ImageGallery imageList ={images} openModal={toggleModal}/>: null}
        {isLoading && <Loader/>}
        {showModal && (
        <Modal closeModal={toggleModal} largeImageURL={largeImageURL} />)}
        {images.length > 11? <ButtonLoadMore incrementPage={incrementPage} /> : null}
      </div>
    )}
    