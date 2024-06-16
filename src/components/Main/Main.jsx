import React, { useState } from 'react';
import { FaLayerGroup, FaChevronDown, FaArrowRight, FaEye, FaShare, FaExclamationCircle, FaLocationArrow, FaThumbsUp, FaEdit } from 'react-icons/fa';
import { useUser } from '../../providers/authContext';
import { data, groups as initialGroups } from '../../data/data';
import './Main.css';
import { toast } from 'react-toastify';

const Main = () => {
    const [currentTab, setCurrentTab] = useState('All Posts');
    const [groups, setGroups] = useState(initialGroups);
    const [dropdownVisible, setDropdownVisible] = useState(null);
    const { user } = useUser();

    const tabs = ['All Posts', 'Article', 'Event', 'Education', 'Job'];

    const handleTabClick = (tab) => {
        setCurrentTab(tab);
    };

    const handleDropdownChange = (event) => {
        setCurrentTab(event.target.value);
    };

    const handleFollowToggle = (id) => {
        setGroups(groups.map(group =>
            group.id === id ? { ...group, followed: !group.followed } : group
        ));
    };

    const handleEditClick = (index) => {
        if (!user) {
            toast.error('Require Sign In')
            return
        }
        setDropdownVisible(dropdownVisible === index ? null : index);
    };

    const handleEdit = (item) => {
        console.log('Edit', item);
        setDropdownVisible(null)
    };

    const handleReport = (item) => {
        console.log('Report', item);
        setDropdownVisible(null)
    };

    const filteredData = currentTab === 'All Posts' ? data : data.filter(item => item.tab === currentTab);

    return (
        <div className='container mt-5 p-0'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <div className='d-none d-lg-flex'>
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            className={`me-3 ${currentTab === tab ? 'border-bottom border-primary' : ''}`}
                            style={{ cursor: 'pointer' }}
                        >
                            {tab === 'All Posts' ? <>{tab}({filteredData.length})</> : <>{tab}</>}
                        </div>
                    ))}
                </div>

                {/* Dropdown for smaller screens */}
                <div className='d-flex d-lg-none align-items-center justify-content-between w-100'>
                    <span>Posts({filteredData.length})</span>
                    <div>
                        <select className='form-select' value={currentTab} onChange={handleDropdownChange}>
                            {tabs.map((tab) => (
                                <option key={tab} value={tab}>
                                    {tab}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='d-none d-lg-flex'>
                    <button className='btn btn-outline-secondary me-1'>
                        Write a Post <FaChevronDown className='ms-1' />
                    </button>
                    {user ? (
                        <button className='ms-1 btn btn-primary'>
                            <FaArrowRight className='me-1' /> Leave Group
                        </button>
                    ) : (
                        <button className='ms-1 btn btn-primary'>
                            <FaLayerGroup className='me-1' /> Join Group
                        </button>
                    )}
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-8 col-12'>
                    {filteredData.map((item, index) => (
                        <div key={index} className='mb-3'>
                            <div className='card'>
                                <img src={item.img} className='card-img-top' alt='...' />
                                <div className='card-body'>
                                    <h4 className='card-title my-2'>{item.tab}</h4>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <h5 className='card-subtitle my-2'>{item.title}</h5>
                                        <div className='position-relative'>
                                            <FaEdit onClick={() => handleEditClick(index)} style={{ cursor: 'pointer' }} />
                                            {dropdownVisible === index && (
                                                <div className='position-absolute bg-white border shadow-sm p-2' style={{ right: 0, top: '100%' }}>
                                                    {item.authorName === user.fname && (
                                                        <>
                                                            <div onClick={() => handleEdit(item)} className='dropdown-item p-2' style={{ cursor: 'pointer' }}>Edit</div>
                                                            <hr className='m-0 p-0' />
                                                        </>
                                                    )}

                                                    <div onClick={() => handleReport(item)} className='dropdown-item p-2' style={{ cursor: 'pointer' }}>Report</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p className='card-text text-muted my-2'>{item.desc}</p>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div className='d-flex align-items-center'>
                                            <img
                                                src={item.authorImg}
                                                className='rounded-circle me-2'
                                                style={{ width: '40px', height: '40px', border: '1px solid grey' }}
                                                alt='...'
                                            />
                                            <p className='m-0'>{item.authorName}</p>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <span className='card-text me-2'><FaEye /> {item.views && `${item.views / 1000}k Views`}</span>
                                            <FaShare className='ms-3' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='col-lg-4 d-none d-lg-block d-flex flex-column px-4'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <FaLocationArrow className='mt-1 me-1' />
                        <input type='text' className='w-100 custom-input' placeholder='Enter your location' />
                    </div>
                    <div className='d-flex mt-3'>
                        <FaExclamationCircle className='mt-1 me-1' />
                        <span className='text-muted'>Your location will help us serve you better and extend a personalised experience.</span>
                    </div>

                    {user && <div className='mt-4'>
                        <div className='d-flex align-items-center'>
                            <FaThumbsUp className='me-2' />
                            <span>Recommended Groups</span>
                        </div>
                        {groups.map((group) => (
                            <div key={group.id} className='d-flex align-items-center my-3 justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <img
                                        src={group.img}
                                        className='rounded-circle me-2'
                                        style={{ width: '40px', height: '40px', border: '1px solid grey' }}
                                        alt='...'
                                    />
                                    <p className='m-0'>{group.title}</p>
                                </div>
                                <div>
                                    <button
                                        className={`btn btn-sm ${group.followed ? 'btn-dark' : 'btn-outline-dark'}`}
                                        onClick={() => handleFollowToggle(group.id)}
                                        style={{ borderRadius: '20px' }}
                                    >
                                        {group.followed ? 'Followed' : 'Follow'}
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className='d-flex justify-content-between'>
                            <p></p>
                            <span style={{ fontSize: '14px', color: 'blue', cursor: 'pointer' }}>See more...</span>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Main;
