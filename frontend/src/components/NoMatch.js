import React from 'react'
import { Fetcher } from './Fetcher'
export const NoMatch = () => (
  <div>
    <h2>No Match</h2>
    <button onClick={() => console.log(Fetcher('market', 10))}>Test</button>
  </div>
)
