
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import FileArea from "./components/fileArea";
import FileArea from "./COMPONENT/fileArea"
// import store from "./store";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/*" element={<FileArea />} />
        </Routes>
      </Router>
  );
}

export default App;
