import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchFilterBar from './components/SearchFilterBar';
import Product from './components/Product';
import ProductsView from './components/ProductsView';
import Login from './components/Login';
import './App.css';

function App() {
  const [devices, setDevices] = useState([]);
  const [viewToggle, setViewToggle] = useState('list'); 
  const [isQueryActive, setIsQueryActive] = useState(false);
  const [queryResult, setQueryResult] = useState([]);

  useEffect(() => {
    fetch('https://static.ui.com/fingerprint/ui/public.json')
      .then((res) => res.json())
      .then((data) => setDevices(data.devices));
  }, []);

  return (
    <Routes>
      <Route path='/' element={
        <main>
          <Login />
        </main>
      }/>
      <Route path='/devices' element={
        <main>
          <Header />
          <SearchFilterBar viewToggle={viewToggle} setViewToggle={setViewToggle} devices={devices} setIsQueryActive={setIsQueryActive} queryResult={queryResult} setQueryResult={setQueryResult}/>
          <ProductsView viewToggle={viewToggle} devices={isQueryActive ? queryResult : devices}/>
        </main>
      }/>
      <Route path='/devices/:id' element={
        <main>
          <Header />
          <Product />
        </main>
      }/>
    </Routes>
  );
}

export default App;
