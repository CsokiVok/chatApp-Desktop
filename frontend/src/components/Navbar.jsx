import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Home, LogOut, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const { logout, authUser } = useAuthStore();
    const location = useLocation();

    return (
        <header className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40'>
            <div className='container mx-auto px-4 h-16'>
                <div className='flex items-center justify-end h-full'>
                    <div className='flex items-center gap-2'>
                        {/* Csak akkor jelenik meg, ha a profil nézetben vagyunk */}
                        {location.pathname === '/profile' && (
                            <Link to={"/home"} className='btn btn-sm gap-2 transition-colors'>
                                <Home className='size-4' />
                                <span className='hidden sm-inline'>Főoldal</span>
                            </Link>
                        )}

                        {authUser && (
                            <>
                                <Link to={"/profile"} className={'btn btn-sm gap-2'}>
                                    <User className='size-5' />
                                    <span className='hidden sm:inline'>Profil</span>
                                </Link>

                                <button className='btn btn-sm gap-2 flex gap-2 items-center' onClick={logout}>
                                    <LogOut className='size-5' />
                                    <span className='hidden sm:inline'>Kijelentkezés</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;