import { useState } from 'react'
import './App.css'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import CoursePage from './pages/CoursesPage'
import Navbar from './components/navbar'
import DetailCourse from './pages/DetailCourse'
import KanjiPage from './pages/KanjiPage'


function IndexLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/landing" element={<LandingPage />} />

        <Route path='/' element={<IndexLayout />}>
          <Route path='/courses' element={<CoursePage />} />
          <Route path='/courses/:courseId' element={<DetailCourse />} />
          <Route path='/kanji/' element={<KanjiPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
