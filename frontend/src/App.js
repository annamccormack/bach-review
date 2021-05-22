import React, { useState } from "react"
import { Switch, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/addReview"
import Bach from "./components/bach"
import BachList from "./components/bachList"
import Login from "./components/login"

function App () {
  const [user, setUser] = useState(null)

  async function login(user = null) {
    setUser(user)
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div>
     <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/bach" className="navbar-brand">
          Bach Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/bach"} className="nav-link">
              Baches
            </Link>
          </li>
          <li className="nav-item" >
            { user ? (
              <button onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </button>
            ) : (            
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            )}

          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/bach"]} component={BachList} />
          <Route 
            path="/bach/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/bach/:id"
            render={(props) => (
              <Bach {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch>
      </div>
    </div>
  )
}

export default App