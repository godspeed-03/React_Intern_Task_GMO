import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserForm from './components/Formpage/UserForm';
import SecondPage from './components/Secondpage/SecondPage';

const App = () => {
  // const [userDetailsEntered, setUserDetailsEntered] = useState(false)
  
  return (


    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserForm/>} />
          <Route  path="/second-page" element={<SecondPage />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;
