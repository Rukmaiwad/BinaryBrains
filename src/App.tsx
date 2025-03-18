import './App.css'
import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
 } from 'react-router-dom';
import { KEY_TO_PAGE_MAP, USER_ALLOWED_ROUTES } from './utils/routes';
import { isInvalid } from './utils/utils';
import Spinner from './components/Loader/Spinner';
import NotFoundPage from './pages/Error/NotFound';
import Navbar from './components/Navbar/Navbar';

function App() {

  return (
      <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={<h1>Loading</h1>}/>
              { 
                Object.keys(USER_ALLOWED_ROUTES).map((page, index: number) => {
                  if(isInvalid(KEY_TO_PAGE_MAP[page])) return (
                      <Route 
                        key={index} 
                        element={
                          <Suspense fallback={<Spinner/>}>
                            <NotFoundPage/>
                          </Suspense>
                        } 
                        path={`/not-found`} 
                      />
                    )
                    else return <Route key={index} element={
                      <Suspense fallback={<Spinner/>}>
                        { React.createElement(KEY_TO_PAGE_MAP[page]) }
                      </Suspense>
                    } 
                    path={`${USER_ALLOWED_ROUTES[page].route}`} />
                })
              }
          </Routes>
      </Router>
        
  )
}

export default App
