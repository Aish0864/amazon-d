import React from 'react'
import Image from "next/image";
import {MenuIcon ,SearchIcon ,ShoppingCartIcon ,} from "@heroicons/react/outline";

import { signIn , signOut,useSession} from "next-auth/react";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';

function Header() {

  const {data:session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header className='sticky top-0 z-50'>
      
        {/*Top */}
        <div className=' flex items-center bg-amazon_blue p-1 flex-grow py-2' > 
            <div className='mt-3 flex item-center flex-grow sm:flex-grow-0'>
            <Image src="https://links.papareact.com/f90" 
            onClick={() => router.push('/')}
            width={150}
            height={40}
            objectFit="contain"
            className='cursor-pointer'/>
            </div>

            {/*Search Bar*/}
            <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500 ">
              <input type="text" className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-lg focus:outline-none'/>
                <SearchIcon className="h-12 p-4 "/>

            </div>
            {/*Right*/}
            <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
              <div onClick={!session ? signIn : signOut} className='cursor-pointer link'>
                <p className='hover:underline' >
                  {session ? `Hello, ${session.user.name}` :'Sign in'}
                </p>
                <p className='font-extrabold md:text-sm'>Account & Lists</p>
              </div>
              <div className='cursor-pointer link'>
                <p>Returns</p>
                <p className='font-extrabold md:text-sm'>& Orders</p>
              </div>
              <div onClick={()=> router.push('/checkout')} className='relative link flex items-center'>
                <span className='absolute top-0 right-0 md:right-7 h-4 w-4 text-center rounded-full text-black bg-yellow-400'>
                  {items.length}
                </span>
                <ShoppingCartIcon className='h-10'/>
                <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Cart</p>
              </div> 
            </div>
        </div>

        {/*Bottom*/}
        <div className='flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-sm text-white font-semibold' >
          <p className='link flex items-center' onClick={() => router.push('/')}>
            <MenuIcon className='h-6 mr-1' />
            All
          </p>
          <p className='link'>Beauty & Personal Care</p>
          <p className='link'>Amazon miniTV</p>
          <p className='link'>Gift Cards</p>
          <p className='link hidden lg:inline-flex' >Buy Again</p>
          <p className='link hidden lg:inline-flex'>Baby</p>
          <p className='link hidden lg:inline-flex'>Browsing History</p>
          <p className='link hidden lg:inline-flex'>Subscribe & Save</p>
          <p className='link hidden lg:inline-flex'>Gift Ideas</p>
        </div>

    </header>
  )
}

export default Header
