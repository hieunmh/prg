'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaLock, FaUser } from 'react-icons/fa';
import { LuLoader } from 'react-icons/lu';
import axios from '@/lib/axios';
import { SIGNIN_URL } from '@/lib/apiEndPoints';

type Inputs = {
  email: string;
  password: string;
}

export default function SignIn() {

  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit } = useForm<Inputs>();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleShowPass = () => {
    if (showPass) setShowPass(false);
    else setShowPass(true);
  }

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    if (formData.email.length === 0) {
      setEmailError('メールアドレスを入力してください');
      return;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      setEmailError('無効なメールアドレス');
      return;
    } else {
      setEmailError('');
    }

    if (formData.password.length === 0) {
      setPasswordError('パスワードを入力してください');
      return;
    } else if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    } else {
      setPasswordError('');
    }

    setLoading(true);

    await axios.post(SIGNIN_URL, formData);
  }


  return (
    <div className='h-screen w-screen bg-[#fafafc] flex items-center justify-center'>
      <div className='w-full fixed top-0 h-20 bg-white md:px-32 px-2 flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Image src='/logo.png' width={1000} height={1000} className='w-[30px]' alt='logo' />
          <Link href={'/'} className='font-semibold text-3xl text-[#4a3aff]'>prg</Link>
        </div>
      </div>

      <div className='w-[450px] rounded-xl md:shadow-2xl bg-white p-10 flex flex-col justify-center'>
        <p className='font-bold text-3xl text-center mb-5'>ログイン</p>
        
        <form className='space-y-1'>
          <div className='relative text-[#4a3aff]'>
            <p className='font-semibold text-black'>メールアドレス</p>
            <FaUser size={20} className='absolute top-[37.5px] left-3' />
            <input type="email" placeholder='example@prg.co.jp' {...register('email')}
              className={`py-3 px-10 w-full text-black border-[1.5px] rounded focus:outline-none 
                ${emailError ? 'border-rose-500' : 'focus:border-[#4a3aff]'}`}
            />
            <p className='text-rose-500 text-sm h-5'>{emailError}</p>
          </div>

          <div className='relative text-[#4a3aff]'>
            <p className='font-semibold text-black'>パスワード</p>
            <FaLock size={20} className='absolute top-[37.5px] left-3' />
            <input type={showPass ? 'text' : 'password'} placeholder='パスワード' {...register('password')}
              className={`py-3 px-10 w-full text-black border-[1.5px] rounded focus:outline-none 
              ${passwordError ? 'border-rose-500' : 'focus:border-[#4a3aff]'}`}
            />
            {showPass ? <IoMdEye size={25} className='absolute top-[37.5px] right-3 cursor-pointer' onClick={() => toggleShowPass()} /> :
             <IoMdEyeOff size={25} className='absolute top-[38px] right-3 cursor-pointer' onClick={() => toggleShowPass()} /> 
            }
            <p className='text-rose-500 text-sm h-5'>{passwordError}</p>
          </div>


          <button onClick={handleSubmit(onSubmit)} className='w-full bg-[#4a3aff] text-white flex items-center justify-center rounded py-3'>
            {loading ? (
              <LuLoader size={24} className=' animate-spin' />
            ) : (
              <p className='font-semibold'>ログイン</p>
            )}
          </button>
        </form>

        <p className='text-end text-sm font-semibold mt-1'>パスワードをお忘れの方</p>

        <div className='w-full h-[1px] bg-gray-300 my-5'></div>

        <div className='flex items-center justify-center cursor-pointer border rounded p-2 space-x-1 hover:bg-gray-50'>
          <Image src='/google.png' alt='googlelogo' width={2000} height={2000} className='w-[16px]' />
          <p className='font-semibold'>グーグルでログイン</p>
        </div>

        <Link href={'/sign-up'} className='text-center font-bold hover:underline mt-5'>新しいアカウントを作成</Link>
      </div>
    </div>
  )
}
