import React from 'react';
import bg2 from '../../assests/bg2.jpg'
import './Crousal.css'
import { useUser } from '../../providers/authContext';
import { FaArrowRight, FaLayerGroup } from 'react-icons/fa';

const Crousal = () => {
    const {user} = useUser()

    return (
        <div className='custom-carousel position-relative'>
            <img src={bg2} className="d-block w-100" alt="Laptop" />
            <div className="carousel-caption w-100 m-0 p-0">
                {user ? <button className='d-lg-none btn btn-primary'>Leave Group <FaArrowRight /></button> : <button className='d-lg-none btn btn-primary'><FaLayerGroup className='me-1' />Join Group</button>}
                <h5>Computer Engineering</h5>
                <p>142,765 Computer Engineers follow this</p>
            </div>
        </div>
    );
}

export default Crousal;
