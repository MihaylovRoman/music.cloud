import React from 'react'
import './style.css'
const FormRegister = ({active, setActive}) => {


    return (
        <div className='formRegister'>
            <div className={active ? 'wrapperFormReg active' : 'wrapperFormReg'}>
                <form className='regForm sign-up'>
                    <div className='form'>
                        <h2>Создать аккаунт</h2>
                        <div className='formWriting'>
                            <p>Придумайте логин:</p>
                            <input type='text' />
                        </div>
                        <div className='formWriting'>
                            <p>Ваш Email:</p>
                            <input type='email' />
                        </div>
                        <div className='formWriting'>
                            <p>Придумайте пароль:</p>
                            <input type='password' />
                        </div>
                        <button className='formBtn'>Продолжить</button>
                    </div>
                </form>
                <form className='regForm sign-in'>
                    <div className='form'>
                        <h2>Авторизация</h2>
                        <div className='formWriting'>
                            <p>Введите логин:</p>
                            <input type='text' />
                        </div>
                        <div className='formWriting'>
                            <p>Введите пароль:</p>
                            <input type='password' />
                        </div>
                        <button className='formBtn'>Продолжить</button>
                    </div>

                </form>
                <div className='toggle-container'>
                    <div className='toggle'>
                        <div className='toggle-panel toggle-left'>
                            <h2>Привет, Друг</h2>
                            <p>Авторизуйтесь, чтобы использовать все возможности сайта</p>

                        </div>
                        <div className='toggle-panel toggle-right'>
                            <h2>Добро пожаловать!</h2>
                            <p>Зарегистрируйтесь, если у вас все еще нет аккаунта</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FormRegister