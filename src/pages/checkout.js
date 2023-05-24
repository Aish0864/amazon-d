import React from 'react'
import Image from 'next/image'
import Header from '../components/Header'
import Head from "next/head";
import CheckoutProduct from '../components/CheckoutProduct'
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../slices/basketSlice'
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.stripe_public_key)
function Checkout() {

  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const {data:session } = useSession();

  const createCheckoutSession = async() => {
    console.log('checkout')
    const stripe = await stripePromise;

    const checkoutSession = await axios.post('/api/create-checkout-session',
    {
      items:items,
      email:session.user.email,
    });
    const result = await stripe.redirectToCheckout({
        sessionId : checkoutSession.data.id,
    });
    // if(result.error.response.data){
    //   alert(result.error.response.data.message);
    // };
    if(result.error.response.data){
      alert(result.error.error.response.data.message);
    };

  };

  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Checkout</title>
      </Head>
        <Header />
        <main className='lg:flex max-w-screen-2xl mx-auto' >
        {/* <h1>dfshjhkhn</h1> */}
        {/* left */}
        <div className='flex-grow m-5 shadow-sm'>
            <Image src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit='contain'
            />
            <div className='flex flex-col p-5  space-y-10 bg-white'>
              <h1 className='text-3xl border-b pb-4'>
                {items.length === 0 ? 'Your Cart is empty':'Your Cart'}
              </h1>

              {items.map(( item ,i ) =>(
                  <CheckoutProduct 
                    key={i}
                    id={item.id}
                    title={item.title}
                    rating={item.rating}
                    price={item.price}
                    description={item.description}
                    category={item.category}
                    image={item.image}
                    hasPrime={item.hasPrime}
                  />
                  
              ))}
            </div>
        </div>

        <div className='flex flex-col bg-white p-10 shadow-md'>
          {items.length > 0 && (
            <>
              <h2 className='whitespace-nowrap'> Subtotal (<b>{items.length}</b> Items): {" "}
              <span className='font-bold text-sm'>
                <Currency quantity={total * 70} currency='INR'/>
              </span>
              
              </h2>
              <button 
              role='link'
<<<<<<< HEAD
=======
              onClick={ createCheckoutSession }
>>>>>>> bc44667c325bf6b3c0adfeedae9aaec9c4a5726e
              disabled={!session}
              className={`button mt-2 ${
                !session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
              }`}>
                
                {!session ?"Signin to checkout":'Proceed to checkout'}
              
              </button>
            </>
          )}
        </div>
        </main>


    </div>
  )
}

export default Checkout