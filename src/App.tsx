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
import LandingPage from './pages/Home/LandingPage';
import { Toaster } from './components/ui/toaster';

// always import the react pages with React.lazy
const Admin = React.lazy(() => import('@/pages/Admin/Admin'));

function App() {

  return (
      <Router>
          <Toaster/>
          <Navbar/>
          <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/admin' element={<Admin/>} />
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

              <Route path='/*' element={<NotFoundPage/>} />
          </Routes>
      </Router>
        
  )
}

export default App
