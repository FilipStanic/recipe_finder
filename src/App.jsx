import React from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import RecipePage from "./RecipePage"

function App() {


  return (
    <>
      <Router>
            <Link to="/">
            <div className="inline-block absolute">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-back-up" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#881337" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 14l-4 -4l4 -4" />
                <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
              </svg>
            </div>

            </Link>



        <Routes>
          <Route
            path="/"
            element=
            {
              <div className="flex items-center justify-center h-screen">
                <Link to="/recipe-page">
                  <div className="h-">
                    <button className="bg-rose-900 p-4 px-20 text-xl italic text-white rounded-xl">Look at recepies</button>
                  </div>
                </Link>
              </div>
            }
          />

          <Route path="/recipe-page" element={<RecipePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
