import { useState, useEffect } from 'react';
// import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import Twemoji from 'react-twemoji';
// import Footer from '@/components/Footer';

export default function Container({ children }) {
    const [mounted, setMounted] = useState(false);
    // const { theme, setTheme } = useTheme();

    // After mounting, we have access to the theme
    useEffect(() => setMounted(true), []);

    return (
            <div className="bg-white dark:bg-black">
                <nav className="sticky-nav flex justify-between items-center max-w-7xl w-full p-8 my-0 md:my-8 mx-auto bg-white dark:bg-black bg-opacity-60">
                    <div>
                        <NextLink href="/">
                            <a className="p-1 sm:p-4 text-blueGray-900 dark:text-gray-100">
                                S2S
                            </a>
                        </NextLink>
                        <NextLink href="/">
                            <a className="p-1 sm:p-4 text-blueGray-900 dark:text-gray-100">
                                Today's Conditions
                            </a>
                        </NextLink>
                    </div>
                </nav>
                <main className="flex flex-col justify-center bg-white dark:bg-black px-8">
                    {children}
                    {/*<Footer />*/}
                </main>
            </div>
    );
}