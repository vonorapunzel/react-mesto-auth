import success from '../images/Success.png';
import error from '../images/Error.png';


function InfoToolTip({isRegistration, isOpen, onClose}) {
  return(
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__exit" type="button" onClick={onClose}></button>
        <img className="popup__image-status" src={isRegistration ? success : error} alt="Success"/>
        <h2 className="popup__text-status">
            {isRegistration ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так... Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  )
}

export default InfoToolTip;