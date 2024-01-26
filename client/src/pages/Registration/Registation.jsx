import React, { useState } from 'react'
import './style.css'
import FormRegister from '../../component/FormRegister/FormRegister'
const Registation = () => {

  const [register, setRegister] = useState(false)


  return (
    <div>
      <div className='navigation'>
        <div className='navigation_items'>
            <img className={register ? 'regImage activeImg' : 'regImage'} onClick={() => setRegister(true)} src='../../img/plus.png' alt='plus' />
            <img className={!register ? 'regImage activeImg' : 'regImage'} onClick={() => setRegister(false)} src='../../img/user.png' alt='plus' />
        </div>
        <FormRegister active={register} setActive={setRegister}/>
      </div>

      



    </div>
  )
}

export default Registation