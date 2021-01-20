import Container from "../components/Container";
import Link from "next/link";
import FeatureCard from "../components/FeatureCard";
export default function Home() {
  return (
    <Container>
        <div className="flex flex-col justify-center items-start max-w-4xl mx-auto mb-16">
            <div className="text-center mb-24">
                <h3 className="text-blueGray-500 dark:text-white uppercase tracking-widest">Safe2Ski</h3>
                <h1 className="font-extrabold text-7xl tracking-tight mb-8 text-blueGray-900 dark:text-white">
                    The days of unsafe journeys and blindsiding conditions have finally <span className="text-blue-500">come to an end.</span>⛷️
                </h1>
                <Link href="/destination/summit-at-snoqualmie"><button className="focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 rounded-md px-4 py-2 bg-blue-100 hover:bg-blue-50 text-blueGray-700 hover:text-blueGray-600 font-bold text-lg transition duration-150">View Today's Conditions</button></Link>
            </div>
            <div className="mb-24 flex justify-center flex-wrap">
                <FeatureCard title="Accurate Predictions Based on Decades of Data  📅" content="Historical data on weather and collisions is analyzed real-time to bring fast and accurate results." color="pink"/>
                <FeatureCard title="Accurate Predictions Based on Decades of Data  📅" content="Historical data on weather and collisions is analyzed real-time to bring fast and accurate results." color="green"/>
                <FeatureCard title="Accurate Predictions Based on Decades of Data  📅" content="Historical data on weather and collisions is analyzed real-time to bring fast and accurate results." color="cyan"/>
                <FeatureCard title="Accurate Predictions Based on Decades of Data  📅" content="Historical data on weather and collisions is analyzed real-time to bring fast and accurate results." color="purple"/>
            </div>
            <div className="mb-24">
                <h3 className="font-bold text-blueGray-700 text-3xl mb-4">The Passes We're Currently<br/> Watching</h3>
                <div className="flex shadow-lg rounded-md flex-wrap">
                    <div className="w-full lg:w-1/2 py-6 px-8">
                        <h1 className="text-lg font-bold text-blueGray-900">Snoqualmie Pass</h1>
                        <h1 className="text-lg text-blueGray-700">Snoqualmie Pass is a mountain pass that carries Interstate 90 through the Cascade Range in the U.S. state of Washington. The pass summit is at an elevation of 3,015 feet, on the county line between Kittitas County and King County. <Link href="/destination/summit-at-snoqualmie"><a className="text-blue-600"><small>View Today's Conditions</small></a></Link></h1>
                    </div>
                    <div className="w-full lg:w-1/2" >
                        <img className="rounded-md" alt="snoqualmie pass" src="https://beautifulwashington.com/images/summit-ski-area/summit-ski-area-2.jpg"/>
                    </div>
                </div>
            </div>
        </div>
    </Container>
  )
}
