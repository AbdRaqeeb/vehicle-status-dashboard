import React from 'react'
import spinner from './spinner.gif'

const Spinner = () => (
  <>
    <img src={spinner} alt="" style={style} />
  </>
)

const style = {
  width: '200px',
  margin: 'auto',
  display: 'block',
  marginTop: '70px',
}

export default Spinner
