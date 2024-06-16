import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Crousal from "./components/Crousal/Crousal";
import Main from "./components/Main/Main";

function App() { 
    return (
        <div className="container-fluid p-0">
            <Navbar />
            <Crousal />
            <Main />

            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;
