import Container from "../../components/Container";
import moment from "moment";
import FeatureCard from "../../components/FeatureCard";

import {supabase} from "../../lib/api";

function SummitAtSnoqualmie({ lastUpdated, currentConditions, SafetyScore }) {
    return <Container>
        <div className="flex flex-col justify-center items-start max-w-4xl mx-auto mb-16">
            <div className="mb-24">
                <p className="text-blueGray-500 dark:text-white uppercase tracking-widest">{moment().format('MMMM Do YYYY')}</p>
                <h1 className="text-7xl font-extrabold text-blue-900">Snoqualmie Pass Road & Weather Conditions</h1>
            </div>
            <div className="mb-24">
                <h2 className="font-bold text-5xl text-blueGray-800">{SafetyScore}</h2>
            </div>
            <div className="mb-24">
                <h2 className="text-xl font-bold text-blue-700">Current Conditions</h2>
                <div className="flex flex-wrap">
                    <FeatureCard title="Road Quality 🛣️" content={currentConditions.RoadCondition} color="yellow"/>
                    <FeatureCard title="Restrictions 🚫" content={currentConditions.RestrictionTwo.RestrictionText == "No restrictions" ? currentConditions.RestrictionOne.RestrictionText : `${currentConditions.RestrictionOne.RestrictionText} and ${currentConditions.RestrictionTwo.RestrictionText}`} color="cyan"/>
                    <FeatureCard title="Temperature 🌡️" content={currentConditions.TemperatureInFahrenheit} color="purple"/>
                    <FeatureCard title="Weather ☁" content={currentConditions.WeatherCondition} color="pink"/>
                </div>
            </div>
            <small className="text-blueGray-500 dark:text-white italic">Last Updated: {lastUpdated}</small>
        </div>
    </Container>
}

export async function getStaticProps() {
    let SafetyScore = 100;

    const currentConditionsRes = await fetch('https://www.wsdot.com/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionAsJon?AccessCode=de941f67-18e0-4909-83cb-a5d68904821e&PassConditionID=11')
    const currentConditions = await currentConditionsRes.json()
    const adjustedTemp = (currentConditions.TemperatureInFahrenheit-3)
    const weeklyForecastRes = await fetch('https://api.weather.gov/gridpoints/PDT/61,195/forecast', {
        headers: {
            "user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
        }
    })
    const weeklyForecast = await weeklyForecastRes.json();
    console.log(currentConditions)
    console.log(weeklyForecast.properties.periods[0])
    let { data: SnoqualmiePass, error } = await supabase
        .from('SnoqualmiePass')
        .select('*')
        .gt('TAVG', adjustedTemp-2)
        .lt('TAVG', adjustedTemp+2)
        // .in('WEATHER', ["snow", "SNOW", "snowy","SNOWY", "snowing", "SNOWING"])

    let snowIncrement = 0;
    let heavySnowIncrement = 0;
    let avalancheIncrement = 0;
    let losingTractionIncrement = 0;
    let collisionIncrement = 0;
    SnoqualmiePass.forEach(closure => {
        // console.log(closure.WEATHER.toLowerCase().includes("snow"))
        if (closure.WEATHER.toLowerCase().includes("snow")) snowIncrement++;
        if (closure.WEATHER.toLowerCase().includes("heavy")) heavySnowIncrement++;
        if (closure.REMARKS.toLowerCase().includes("avalanche")) avalancheIncrement++;
        if (closure.REMARKS.toLowerCase().includes("traction")) losingTractionIncrement++;
        if (closure.REMARKS.toLowerCase().includes("collision") || closure.REMARKS.toLowerCase().includes("collide")) collisionIncrement++;

    })
    // console.log("Full Length: " + SnoqualmiePass.length)
    // console.log(snowIncrement)
    // console.log(heavySnowIncrement)
    // console.log(avalancheIncrement)
    // console.log(losingTractionIncrement)
    // console.log(collisionIncrement)

    if(currentConditions.WeatherCondition.toLowerCase().includes("snow")) {
        SafetyScore-=10;
        if (currentConditions.WeatherCondition.toLowerCase().includes("heavy")) {
            SafetyScore-=10;
        }
    }

    if(!currentConditions.RoadCondition.toLowerCase().includes("bare and wet")) {
        SafetyScore-=15;
    }

    if(currentConditions.RestrictionOne.RestrictionText !== "No restrictions" || currentConditions.RestrictionTwo.RestrictionText !== "No restrictions") {
        SafetyScore-=20;
    }

    if(weeklyForecast.properties.periods[0].shortForecast.toLowerCase().includes("snow")) {
        SafetyScore-=15;
        if(weeklyForecast.properties.periods[0].shortForecast.toLowerCase().includes("light")) {
            SafetyScore+=10;
        }
    }
    // console.log(parseInt(weeklyForecast.properties.periods[0].windSpeed.split(' ')[0]))
    if(parseInt(weeklyForecast.properties.periods[0].windSpeed.split(' ')[0]) >= 25) {
        SafetyScore-=15
    }

    console.log(SafetyScore)
    const lastUpdated = moment().format();
    return {
        props: {
            currentConditions,lastUpdated, SafetyScore
        },
        revalidate:30
    }
}

export default SummitAtSnoqualmie;