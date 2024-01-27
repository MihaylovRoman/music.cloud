import React, { useState } from 'react'
import './style.css'
import { SubmitHandler, useForm } from 'react-hook-form'


interface IGeneralForm {
    active: boolean,
    setActive: (active: boolean) => void,
}
interface IRegistrationForm {
    login: string,
    email: string,
    password: string
}


const FormRegister: React.FC<IGeneralForm> = ({ active, setActive }) => {

    const { register, handleSubmit } = useForm<IRegistrationForm>()
    const [isSuccess, setIsSuccess] = useState(false)

    const onSubmit: SubmitHandler<IRegistrationForm> = data => {
        fetch('http://localhost:5000/api', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                if (!data) return

                setIsSuccess(true)
                setActive(false)
            })
    }


    return (
        <div className='formRegister'>
            <div className={active ? 'wrapperFormReg active' : 'wrapperFormReg'}>
                <form className='regForm sign-up' onSubmit={handleSubmit(onSubmit)}>
                    <div className='form'>
                        <h2>Создать аккаунт</h2>
                        <div className='formWriting'>
                            <p>Придумайте логин:</p>
                            <input type='text' {...register('login',
                                { required: 'true' })
                            } />
                        </div>
                        <div className='formWriting'>
                            <p>Ваш Email:</p>
                            <input type='email' {...register('email', { required: 'true' })

                            } />
                        </div>
                        <div className='formWriting'>
                            <p>Придумайте пароль:</p>
                            <input type='password' {...register('password', { required: 'true' })

                            } />
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
                            {
                                isSuccess ? (<>
                                    <h2>Добро пожаловать!</h2>
                                    <p>Зарегистрируйтесь, если у вас все еще нет аккаунта</p>
                                </>) : (<>
                                    <h2>Регистрация прошла успешно!</h2>
                                    <p>Теперь вы можете насладиться музыкой</p>
                                </>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FormRegister