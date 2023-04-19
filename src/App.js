import './index.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tweet from './components/Tweet';


function App() {
  return (
    <div className="App bg-[#06141D]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/tweet" element={<Tweet/>} />
      </Routes>
    </div>
  );
}

export default App;
