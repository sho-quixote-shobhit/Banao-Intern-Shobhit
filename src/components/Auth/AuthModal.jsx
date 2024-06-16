import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from 'react-icons/fa';
import mobile from '../../assests/mobile.png'
import { useUser } from '../../providers/authContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AuthModal = ({ children }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signin, setsignin] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('');
    const [cpass, setcpass] = useState('')

    const { setuser } = useUser();

    const handleAccount = () => {
        if (!fname || !email || !password || (signin && !cpass)) {
            toast.error('Please complete all fields.');
            return;
        }
        if (signin) {
            toast.success('Signed in successfully.');
        } else {
            if (password !== cpass) {
                toast.error('Passwords do not match.');
                return;
            }
            setuser({
                fname,
                lname,
                email,
                password
            });
            toast.success('Signed up successfully.');
        }
    };

    return (
        <div>
            <span type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">{children}</span>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content position-relative" style={{ borderRadius: '15px' }}>
                        <button
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '20px',
                                position: 'absolute',
                                top: '-25px',
                                right: '-0px'
                            }}
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                        <p className='d-none d-lg-block py-3 m-0' style={{ textAlign: 'center', backgroundColor: '#e5ffe5', color: '#098b09', borderRadius: '15px' }}>
                            Let's Learn, share & inspire each other with our passion for computer engineering. Sign up now 🤟
                        </p>
                        <div className="modal-body">
                            <div className='row'>
                                {/* box1 */}
                                <div className="col-12 col-lg-6 px-4">
                                    {signin ? <div className='row'><h4 className='p-0 '>Sign In</h4></div> : <div className='row'><h4 className='p-0 '>Create Account</h4></div>}
                                    {!signin && <div className="row mb-3">
                                        <div className="col-6 p-0">
                                            <input onChange={(e) => { setfname(e.target.value) }} type='text' className='form-control' placeholder='First name' />
                                        </div>
                                        <div className="col-6 p-0">
                                            <input onChange={(e) => { setlname(e.target.value) }} type='text' className='form-control' placeholder='Last name' />
                                        </div>
                                    </div>}
                                    <div className="row mb-3">
                                        <div className="col p-0">
                                            <input onChange={(e) => { setemail(e.target.value) }} type='email' className='form-control' placeholder='Email' />
                                        </div>
                                    </div>
                                    <div className="row mb-3 position-relative">
                                        <div className="col p-0">
                                            <input onChange={(e) => { setpassword(e.target.value) }} type={showPassword ? 'text' : 'password'} className='form-control' placeholder='Password' />
                                            <span onClick={togglePasswordVisibility} className="position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}>
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                        </div>
                                    </div>
                                    {!signin && <div className="row mb-3 position-relative">
                                        <div className="col p-0">
                                            <input onChange={(e) => { setcpass(e.target.value) }} type={showConfirmPassword ? 'text' : 'password'} className='form-control' placeholder='Confirm Password' />
                                            <span onClick={toggleConfirmPasswordVisibility} className="position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}>
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                        </div>
                                    </div>}
                                    {signin ? <div className="row mb-3 d-none d-lg-block">
                                        <button className='btn btn-primary' style={{ borderRadius: '30px' }}>Sign In</button>
                                    </div> : <div className="row mb-3 d-none d-lg-block">
                                        <button className='btn btn-primary' style={{ borderRadius: '30px' }} data-bs-dismiss="modal"
                                            aria-label="Close" onClick={handleAccount}>Create Account</button>
                                    </div>}

                                    {signin ? <div className='d-flex justify-content-between align-items-center d-lg-none
                                    mb-3'>
                                        <button className='btn btn-primary px-3' style={{ borderRadius: '30px' }} >Sign In</button>
                                        <p style={{ cursor: 'pointer', color: 'blue' }} onClick={() => { setsignin(false) }}  >or,Create Account</p>
                                    </div> : <div className='d-flex justify-content-between align-items-center d-lg-none
                                    mb-3'> 
                                        <button className='btn btn-primary' style={{ borderRadius: '30px' }} data-bs-dismiss="modal"
                                            aria-label="Close" onClick={handleAccount}>Create Account</button>
                                        <p style={{ cursor: 'pointer', color: 'blue' }} onClick={() => { setsignin(true) }} >or, Sign In</p>
                                    </div>}

                                    {signin ? <div className="row mb-3">
                                        <div className="d-flex align-items-center justify-content-center mb-1" style={{ border: '1px solid #d4d4d4', backgroundColor: '#efefef', borderRadius: '10px', cursor: 'pointer', padding: '10px' }}>
                                            <FaFacebook size={20} className="me-2" />
                                            <span>Sign in with Facebook</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center mt-1" style={{ border: '1px solid #d4d4d4', backgroundColor: '#efefef', borderRadius: '10px', cursor: 'pointer', padding: '10px' }}>
                                            <FaGoogle size={20} className="me-2" />
                                            <span>Sign in with Google</span>
                                        </div>
                                    </div> : <div className="row mb-3">
                                        <div className="d-flex align-items-center justify-content-center mb-1" style={{ border: '1px solid #d4d4d4', backgroundColor: '#efefef', borderRadius: '10px', cursor: 'pointer', padding: '10px' }}>
                                            <FaFacebook size={20} className="me-2" />
                                            <span>Sign up with Facebook</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center mt-1" style={{ border: '1px solid #d4d4d4', backgroundColor: '#efefef', borderRadius: '10px', cursor: 'pointer', padding: '10px' }}>
                                            <FaGoogle size={20} className="me-2" />
                                            <span>Sign up with Google</span>
                                        </div>
                                    </div>}

                                    <div className='d-lg-none'>
                                        <p className='fw-lighter' style={{ textAlign: 'center', fontSize: '16px' }}>By Signing up you agree to our terms & conditions, Privacy policy</p>
                                    </div>
                                </div>


                                {/* box2 */}


                                <div className="col-6 d-none d-lg-block d-flex flex-column">
                                    <div className='d-flex justify-content-between' >
                                        <p></p>
                                        <div>
                                            {signin ? <span>Don't have an account yet?<span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => { setsignin(false) }}>Create new for free!</span> </span> : <div>Already have an account?
                                                <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => { setsignin(true) }}>Sign In</span>
                                            </div>}
                                        </div>

                                    </div>
                                    <div>
                                        <img src={mobile} style={{ maxHeight: '360px' }} alt='' />
                                    </div>
                                    <div>
                                        <p className='fw-lighter' style={{ textAlign: 'center', fontSize: '13px' }}>By Signing up you agree to our terms & conditions, Privacy policy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
