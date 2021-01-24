import Link from 'next/link';

const ExternalLink = ({ href, children }) => (
    <a
        className="text-blueGray-500 hover:text-blueGray-600 transition"
        target="_blank"
        rel="noopener noreferrer"
        href={href}
    >
        {children}
    </a>
);

export default function Footer() {
    return (
        <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
            <hr className="w-full border-1 border-blueGray-200 dark:border-blueGray-800 mb-8"/>
            <div className="w-full max-w-2xl flex flex-row space-x-5 justify-center">
                    <Link href="/">
                        <a className="text-blueGray-500 hover:text-blueGray-600 transition">Home</a>
                    </Link>
                    <Link href="/destination/summit-at-snoqualmie">
                        <a className="text-blueGray-500 hover:text-blueGray-600 transition">
                            Snoqualmie Conditions
                        </a>
                    </Link>
                    <ExternalLink href="https://twitter.com/notlilj">
                        My Twitter
                    </ExternalLink>
                    <ExternalLink href="https://github.com/lil-j">GitHub</ExternalLink>
                    <ExternalLink href="https://lilj.dev">
                        Personal Site
                    </ExternalLink>
            </div>
        </footer>
    );
}