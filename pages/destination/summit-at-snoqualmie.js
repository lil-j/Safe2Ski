import Container from "../../components/Container";
import moment from "moment";
import FeatureCard from "../../components/FeatureCard";
function SummitAtSnoqualmie({ currentConditions }) {
    return <Container>
        <div className="flex flex-col justify-center items-start max-w-4xl mx-auto mb-16">
            <div className="mb-24">
                <p className="text-blueGray-500 dark:text-white uppercase tracking-widest">{moment().format('MMMM Do YYYY')}</p>
                <h1 className="text-7xl font-extrabold text-blue-900">Snoqualmie Pass Road & Weather Conditions</h1>
            </div>
            <h2 className="text-xl font-bold text-blue-700">Current Conditions</h2>
            <div className="flex flex-wrap">
                <FeatureCard title="Road Quality 🛣️" content={currentConditions.RoadCondition} color="yellow"/>
                <FeatureCard title="Restrictions 🚫" content={currentConditions.RestrictionTwo.RestrictionText == "No restrictions" ? currentConditions.RestrictionOne.RestrictionText : `${currentConditions.RestrictionOne.RestrictionText} and ${currentConditions.RestrictionTwo.RestrictionText}`} color="cyan"/>
                <FeatureCard title="Temperature 🌡️" content={currentConditions.TemperatureInFahrenheit} color="purple"/>
                <FeatureCard title="Weather ☁" content={currentConditions.WeatherCondition} color="pink"/>
            </div>

        </div>
    </Container>
}

export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://www.wsdot.com/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionAsJon?AccessCode=de941f67-18e0-4909-83cb-a5d68904821e&PassConditionID=11')
    const currentConditions = await res.json()
    console.log(currentConditions)
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            currentConditions,
        },
        revalidate:30
    }
}

export default SummitAtSnoqualmie;