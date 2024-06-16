import React, { useState } from 'react';
import { useUser } from '../../providers/authContext';
import AuthModal from '../Auth/AuthModal';
import { FaChevronDown } from 'react-icons/fa';
import dp from '../../assests/dp.webp';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, setuser } = useUser();

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        setuser(null);
        setDropdownOpen(false);
        toast.success('Logged out successfully.');
    };

    return (
        <div style={{ backgroundColor: 'red' }}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 m-0">
                <div className='container-fluid '>
                    <a className="navbar-brand" href="/">ATG.WORLD</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                        <form className="d-flex justify-content-center navbar-nav me-auto mb-2 mb-lg-0" style={{ position: 'relative', width: '500px' }}>
                            {searchValue === '' && (
                                <span className="input-group-text" style={{ position: 'absolute', left: '45px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', zIndex: 1 }}>
                                    <i className="fas fa-search"></i>
                                </span>
                            )}
                            <input
                                className="form-control me-2 p-2 text-center"
                                style={{ borderRadius: '30px', width: '80%', paddingLeft: searchValue === '' ? '40px' : '20px', textAlign: 'center' }}
                                type="search"
                                placeholder="Search groups in ATG"
                                aria-label="Search"
                                value={searchValue}
                                onChange={handleInputChange}
                            />
                        </form>
                        {user ? (
                            <div className='dropdown'>
                                <div className='d-flex align-items-center' style={{ cursor: 'pointer' }} onClick={handleDropdownToggle}>
                                    <img src={dp} width='40px' height='40px' style={{ borderRadius: '50%' }} alt="User" />
                                    <span className='mx-2'>{user.fname}</span>
                                    <FaChevronDown />
                                </div>
                                <ul className={`dropdown-menu${dropdownOpen ? ' show' : ''}`} style={{ minWidth: '140px'}}>
                                    <li className="dropdown-item" style={{cursor : 'pointer'}}>Profile</li>
                                    <hr className='p-0 m-0'/>
                                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </div>
                        ) : (
                            <AuthModal>
                                <div className='d-flex align-items-center' style={{ cursor: 'pointer' }}>
                                    <span>Create Account.</span>
                                    <span style={{ color: 'blue' }}>It's Free <i className="fa-solid fa-chevron-down"></i></span>
                                </div>
                            </AuthModal>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
