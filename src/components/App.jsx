
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
  				})
    
  }, [query, page])
  

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
       !showModal
    ))
    setLargeImageURL(largeImageURL)
  };


    return (
      <div className={Styles.container} >
          <Searchbar onSubmitForm={handleFormSubmit}/> 
        
          {images.length > 0 ?<ImageGallery imageList ={images} openModal={toggleModal}/>: null}
          {isLoading && <Loader/>}
          {showModal && (
          <Modal closeModal={toggleModal} largeImageURL={largeImageURL} />
        )}
{images.length > 11? <ButtonLoadMore incrementPage={incrementPage} /> : null}
     
      </div>
    );
  }
    










// export default class App extends Component {
//   state = {
//     query : '',
//     page: 1,
//      images: [],
//     isLoading: false,
//     error: null,
//     ShowModal: false,
//     largeImageURL: '',
//   };
  
//   componentDidUpdate(prevProps, prevState) {
//     const { query, page } = this.state;
//     if(page !== prevState.page || query !== prevState.query){
// this.setState({ isLoading: true,  })
// pixabayApi.fetchImages( query, page ).then(data => this.setState((prev) =>({ images: [...prev.images, ...data.hits], isloading:false, })))
// .catch(error => this.setState({ error })).finally(() => {
//   					this.setState({ isLoading: false })
//   				})
//     }
  
   
//   }
//   incrementPage = () => {
  
//     this.setState((prev) => ({ page: prev.page + 1 }));
   
//   };

//   handleFormSubmit = query => {
//     this.setState({ query,  images: [], page: 1});
//    }
//    toggleModal = ({ largeImageURL = '' } = {}) => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//       largeImageURL: largeImageURL,
      
//     }));
//   };


//   render() {
// const {images, largeImageURL,showModal, isLoading} = this.state;
//     return (
//       <div className={Styles.container} >
//           <Searchbar onSubmit={this.handleFormSubmit}/> 
        
//           {images.length > 0 ?<ImageGallery imageList ={images} openModal={this.toggleModal}/>: null}
//           {isLoading && <Loader/>}
//           {showModal && (
//           <Modal closeModal={this.toggleModal} largeImageURL={largeImageURL} />
//         )}
// {images.length > 11? <ButtonLoadMore incrementPage={this.incrementPage} LoadBtnHide={this.LoadBtnHide}/> : null}
     
//       </div>
//     );
//   }}
    