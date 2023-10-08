import {
  // MemoryRouter as Router, //
  // HashRouter as Router,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import PageRouter from '@/router/PageRouter'

function App() {
  return (
    <PageRouter />

    //
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Page_index />}></Route>
    //     <Route path="/detail" element={<Page_detail />}></Route>
    //   </Routes>
    // </Router>
  )
}

export default App
