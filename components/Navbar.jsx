 'use client';
 import Link from 'next/link';
 import { useContext } from 'react';
 import { AuthContext } from '../context/AuthContext';

 export default function Navbar() {
   const { user, logout } = useContext(AuthContext);

   return (
     <nav className="bg-white shadow">
       <div className="container mx-auto px-6 py-4 flex justify-between items-center">
         <Link href="/">
           <span className="text-xl font-semibold cursor-pointer">PowerBank</span>
         </Link>
         <div className="space-x-4">
           {user ? (
             <>
               <Link href="/dashboard">
                 <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
               </Link>
               <Link href="/rental">
                 <span className="hover:text-blue-600 cursor-pointer">Rent</span>
               </Link>
               <button
                 onClick={() => logout()}
                 className="text-red-600 hover:text-red-800"
               >
                 Logout
               </button>
             </>
           ) : (
             <>
               <Link href="/login">
                 <span className="hover:text-blue-600 cursor-pointer">Login</span>
               </Link>
               <Link href="/register">
                 <span className="hover:text-blue-600 cursor-pointer">Register</span>
               </Link>
             </>
           )}
         </div>
       </div>
     </nav>
   );
 }
