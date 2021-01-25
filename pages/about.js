import Container from "../components/Container";
import Image from "next/image";

function About() {
    return <Container title="About | Safe2Ski">
        <div className="flex flex-col justify-center items-start max-w-4xl mx-auto mb-16">
            <div className="mb-24">
                <h1 className="text-5xl lg:text-7xl font-extrabold text-blue-900 mb-2">About</h1>
                <Image src="/banner.png" fill="responsive" alt="banner" width={6538} height={3610}/>
            </div>
            <div className="mb-6">
                <h3 className="font-bold text-2xl text-blueGray-800">Built on Decades of Closure Data</h3>
                <p className="text-blueGray-700">Through an analysis of the last 1000s of pass closures, a list of 'Perfect Conditions' have been created consisting of
                    4 primary categories: Weather, road conditions, upcoming forecasts, and road restrictions. Each item has a different weight set based on its conviction in threatening safety and travel risk.
                    Every 30 seconds of web traffic, this SafetyScore is revalidated using the most up-to-date information available.</p>
            </div>
            <div className="mb-6">
                <h3 className="font-bold text-2xl text-blueGray-800">Let's Talk About The Score</h3>
                <p className="text-blueGray-700">While the score is out of 100, there are three primary ranges you should look out for split into the colors green, yellow, and red.
                    The red range, or any score below 70, is recognized as the 'high risk' region. Scores this low can be a result of a multitude high risk events. The yellow range represents any score between 70 and 90.
                    Also known as 'medium risk', it is typically a result of only one or two low-risk events such as light snow or rain. Lastly, the green range, or any score above 90, represents a low risk commute.
                    These are the safest days to go because they are often a result of high-quality roads, clear weather, and clear forecasts.
                </p>
            </div>
            <div className="mb-6">
                <h3 className="font-bold text-2xl text-blueGray-800">Disclaimer</h3>
                <p className="text-blueGray-700">While the SafetyScore strives to be as accurate as possible, there is always a chance it will overshoot or undershoot a specific event.
                    Nothing is guaranteed nor is Safe2Ski responsible for any events resulting from a miscalculation.</p>
            </div>
            <div className="mb-6">
                <h3 className="font-bold text-2xl text-blueGray-800">Have More Questions?</h3>
                <p className="text-blueGray-700">Feel free to <a className="text-blue-500 font-bold" href="mailto:jke.hrpr@gmail.com">email me</a>!</p>
            </div>
        </div>
    </Container>
}

export default About;