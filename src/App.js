import React, {useState} from 'react'
import qs from 'query-string';
import { Root, Routes, addPrefetchExcludes } from 'react-static'
//
import { Router } from 'components/Router'
import Dynamic from 'containers/Dynamic'
import JBNavBar from './layout/JBNavBar'

import './app.css'

import './app.scss'
import JBFooter from './layout/JBFooter'
import Run from './containers/Run';
import Debug from './containers/Debug';
import CreatorIndex from './containers/Creator';
import Creator from './containers/Creator/Creator';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

function App() {

  // Check Query for Anything
  let queryParams = {};
  if (typeof window !== 'undefined') queryParams = qs.parse(window.location.search);

  return (
    <Root className="d-flex">
      <JBNavBar hide={queryParams.hideUI} />
      <div className="content flex-fill">
        <React.Suspense fallback={<em>Loading...</em>}>
          <Router>
            <Dynamic path="dynamic" />
            <Run path="run" />
            <Debug path="debug" />
            <CreatorIndex path="creator/*" queryParams={queryParams} />
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </div>
      <JBFooter hide={queryParams.hideUI}  />
    </Root>
  )
}

export default App
