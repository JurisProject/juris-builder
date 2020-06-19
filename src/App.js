import React, {useState} from 'react'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
//
import { Router } from 'components/Router'
import Dynamic from 'containers/Dynamic'
import JBNavBar from './layout/JBNavBar'

import './app.css'

import './app.scss'

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

function App() {

  return (
    <Root>
      <JBNavBar />
      <div className="content">
        <React.Suspense fallback={<em>Loading...</em>}>
          <Router>
            <Dynamic path="dynamic" />
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </div>
    </Root>
  )
}

export default App
