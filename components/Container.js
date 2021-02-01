// import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import Head from "next/head";
import {useRouter} from "next/router";
import Footer from './Footer';

export default function Container(props) {
    const { children, ...customMeta } = props;
    const router = useRouter();
    const meta = {
        title: 'Safe2Ski - An Easy Decision',
        description: `Never stress about driving to the ski pass again, we'll help you make the decision with ease.`,
        image: 'https://safe2ski.lilj.dev/banner.png',
        type: 'website',
        ...customMeta
    };
    console.log(router.asPath)
    return (
            <div className="bg-white dark:bg-black">
                <Head>
                    <title>{meta.title}</title>
                    <meta name="robots" content="follow, index" />
                    <meta content={meta.description} name="description" />
                    <meta property="og:url" content={`https://safe2ski.lilj.dev/${router.asPath}`} />
                    <meta property="og:type" content={meta.type} />
                    <meta property="og:site_name" content="Safe2Ski" />
                    <meta property="og:description" content={meta.description} />
                    <meta property="og:title" content={meta.title} />
                    <meta property="og:image" content={meta.image} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@notlilj" />
                    <meta name="twitter:title" content={meta.title} />
                    <meta name="twitter:description" content={meta.description} />
                    <meta name="twitter:image" content={meta.image} />
                    {meta.date && (
                        <meta property="article:published_time" content={meta.date} />
                    )}
                </Head>
                <nav className="sticky-nav flex justify-between items-center max-w-7xl w-full p-8 my-0 md:my-8 mx-auto bg-white dark:bg-black bg-opacity-60">
                    <div>
                        <NextLink href="/">
                            <a className={`p-1 sm:p-4 text-blueGray-900 dark:text-gray-100 ${router.asPath == "/" && "font-bold"}`}>
                                S2S
                            </a>
                        </NextLink>
                        <NextLink href="/destination/summit-at-snoqualmie">
                            <a className={`p-1 sm:p-4 text-blueGray-900 dark:text-gray-100 ${router.asPath == "/destination/summit-at-snoqualmie" && "font-bold"}`}>
                                Today's Conditions
                            </a>
                        </NextLink>
                        <NextLink href="/about">
                            <a className={`p-1 sm:p-4 text-blueGray-900 dark:text-gray-100 ${router.asPath == "/about" && "font-bold"}`}>
                                About
                            </a>
                        </NextLink>
                    </div>
                </nav>
                <main className="flex flex-col justify-center bg-white dark:bg-black px-8">
                    {children}
                    <Footer />
                </main>
            </div>
    );
}