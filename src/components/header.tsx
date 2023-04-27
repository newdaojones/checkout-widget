import React from "react";
import { useAuth } from "../context/auth";

export const Header = () => {
  const { user, onLogout } = useAuth();

  return <div className='header flex justify-end items-center pl-8 pr-8'>
    <input className='bg-transparent h-8 outline-none text-white mr-3' placeholder='Search' />
    <a className='text-white underline font-bold text-lg cursor-pointer' href='https://jxndao.com/storefront' target="_blank">Storefront</a>
    {user && <div className="text-white underline font-bold text-lg ml-5 cursor-pointer" onClick={() => onLogout()}>Logout</div>}
  </div>
}