import { useEffect } from 'react'
import PropTypes from 'prop-types';
import Styles from 'components/Modal/Modal.module.css'



function Modal ({ closeModal, largeImageURL}) {

useEffect(()=>{
	const handleESC = (e) => {
		if (e.code === 'Escape') {
			closeModal()
		}}
	document.addEventListener('keydown', handleESC)
	return ()=>{
		document.removeEventListener('keydown', handleESC);
	}})
	
   const handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            closeModal();
          }}

		return (
			<div className={Styles.Overlay} onClick={handleBackdropClick}>
				<div className={Styles.Modal}>
                <img src={largeImageURL} alt="" />			
				</div>
			</div>
		)
	}


Modal.propTypes ={
    closeModal: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired
 
 }    
export default Modal
