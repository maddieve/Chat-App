import { useState } from 'react'
import './Card.css'

const Card = (props) => {
    const [semn, ] = useState(props.semn)
    const [clicked, isClicked] = useState(props.isClicked)

    const handleClick = (e) => {
        e.preventDefault()
        isClicked(!clicked)
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <>
            { clicked ? (
                <div 
                    id='clicked-card'
                    className="sign-card d-flex stretched-link flex-column justify-content-center align-items-center 
                                text-dark  m-2" 
                    onClick={(e) => handleClick(e)}>
                    <div className="card-body" >
                        {/* <h5 className="card-title">{semn.poza}</h5> */}
                        <img className="semn-img" src={semn.poza}></img>
                    </div>

                </div>
                
            ) : (
                <div
                    id='unclicked-card' 
                    className="sign-card d-flex stretched-link flex-column justify-content-center align-items-center 
                                text-dark bg-warning m-2" 
                    onClick={(e) => handleClick(e)}>
                    <div className="card-body" >
                        <h5 className="card-title">{semn.litera}</h5>
                    </div>
                </div>
            )}
           
        </>
       </div>
    )
}

export default Card