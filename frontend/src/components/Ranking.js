import React from 'react'
// import MaterialCard from "./MaterialCard"
import { MemeList } from './MemeList'

export const Ranking = () => {
  return (
    <div className='d-flex flex-column'>
      <div className='d-flex justify-content-center'>
        <MemeList requestType='ranking' count='' />
      </div>
    </div>
  )
}
