import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import realestate from './data/realestate.js'
import EstateView from './views/EstateView.jsx'
import NavBar from './components/Navbar.jsx'

const routes =[
  {
    path:"/",
    element: <App/>    
  }
];

realestate.forEach((estate) => {
  routes.push({
    path: estate.name,
    element: <EstateView estate={estate}/>
  });

});

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar/>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);