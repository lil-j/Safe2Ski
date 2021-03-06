import Container from "../../components/Container";
import moment from "moment";
import FeatureCard from "../../components/FeatureCard";
import Score from "../../components/Score";
import Note from "../../components/Note";
import ForecastCard from "../../components/ForecastCard";
import {supabase} from "../../lib/api";

function SummitAtSnoqualmie({ lastUpdated, currentConditions, SafetyScore, notes, weeklyForecast }) {
    return <Container title="Snoqualmie | Safe2Ski">
        <div className="flex flex-col justify-center items-start max-w-4xl mx-auto mb-16">
            <div className="mb-24">
                <p className="text-blueGray-500 dark:text-white uppercase tracking-widest">{moment().format('MMMM Do YYYY')}</p>
                <h1 className="text-5xl lg:text-7xl font-extrabold text-blue-900">Snoqualmie Pass Road & Weather Conditions</h1>
            </div>
            <div className="mb-24 flex flex-wrap items-center -m-2">
                <div className="text-center w-full lg:w-1/4 px-2">
                    <p className="text-blueGray-900 dark:text-white font-bold text-lg">Current Safety Score</p>
                    <br/>
                    <Score SafetyScore={SafetyScore}/>
                </div>
                <div className="px-2 w-full lg:w-3/4">
                    <div className="flex flex-wrap -mx-2">
                        {
                            notes.map(note => (
                                <Note positive={note.positive} note={note.note}/>
                            ))
                        }
                    </div>
                </div>
                <div className="text-blueGray-700 mt-3 text-lg">{SafetyScore <= 70 ? "Conditions are not optimal, proceed at your own risk." : SafetyScore  >= 90 ? "Conditions are relatively safe! Enjoy the day." : "Conditions are moderately unsafe, consider going a different day."}</div>
            </div>
            <div className="mb-24">
                <h2 className="text-xl font-bold text-blue-700">All Current Conditions</h2>
                <div className="flex flex-wrap">
                    <FeatureCard title="Road Quality 🛣️" content={currentConditions.RoadCondition} color="yellow"/>
                    <FeatureCard title="Restrictions 🚫" content={currentConditions.RestrictionTwo.RestrictionText == "No restrictions" ? currentConditions.RestrictionOne.RestrictionText : <><strong>EASTBOUND:</strong> {currentConditions.RestrictionOne.RestrictionText}  <br/><strong>WESTBOUND:</strong> {currentConditions.RestrictionTwo.RestrictionText}</>} color="cyan"/>
                    <FeatureCard title="Temperature 🌡️" content={currentConditions.TemperatureInFahrenheit + "° Fahrenheit"} color="purple"/>
                    <FeatureCard title="Weather ☁" content={currentConditions.WeatherCondition ? currentConditions.WeatherCondition : weeklyForecast[0].shortForecast} color="pink"/>
                </div>
            </div>
            <div className="mb-24">
                <h2 className="text-xl font-bold text-blue-700 mb-2">Forecasted Weather</h2>
                <div className="flex flex-wrap -m-2">
                    {
                        weeklyForecast.map((forecast) => (
                            <ForecastCard forecast={forecast}/>
                        ))
                    }
                </div>
            </div>
            <small className="text-blueGray-500 dark:text-white italic">Last Updated: {lastUpdated}</small>
        </div>
    </Container>
}

export async function getStaticProps() {
    let SafetyScore = 100
    const currentConditionsRes = await fetch('https://www.wsdot.com/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionAsJon?AccessCode=de941f67-18e0-4909-83cb-a5d68904821e&PassConditionID=11')
    const currentConditions = await currentConditionsRes.json()
    const adjustedTemp = (currentConditions.TemperatureInFahrenheit-2)
    const weeklyForecastRes = await fetch('https://api.weather.gov/gridpoints/PDT/61,195/forecast', {
        headers: {
            "user-agent":"Mozilla/5.000000 (Macinttosh; Intel Mac OS X 11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
        }
    })
    const weeklyForecast = await weeklyForecastRes.json();
    // console.log(currentConditions)
    // console.log(weeklyForecast.properties.periods[0])
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
    let notes = []
    if (currentConditions.RestrictionOne.RestrictionText.includes("Pass Closed")) {
        SafetyScore=1;
        notes.push({
            positive:false,
            note:"Pass is closed"
        })
    } else {
        if(currentConditions.WeatherCondition.toLowerCase().includes("snow")) {
            SafetyScore-=10;
            notes.push({
                positive:false,
                note:"It is currently snowing"
            })
            if (currentConditions.WeatherCondition.toLowerCase().includes("heavy")) {
                SafetyScore-=10;
                notes[0].note = "It is currently snowing heavily"
            }
        } else if (currentConditions.WeatherCondition.toLowerCase().includes("rain")) {
            SafetyScore-=5;
            notes.push({
                positive:false,
                note:"It is currently raining"
            })
            if (currentConditions.WeatherCondition.toLowerCase().includes("heavy")) {
                SafetyScore-=5;
                notes[0].note = "It is currently snowing heavily"
            }
        } else {
            notes.push({
                positive:true,
                note:`The weather is safe for driving. (${currentConditions.WeatherCondition})`
            })
        }

        if(!currentConditions.RoadCondition.toLowerCase().includes("bare and dry") || currentConditions.RoadCondition.toLowerCase().includes("bare and wet")) {
            SafetyScore-=15;
            if(currentConditions.RoadCondition.toLowerCase().includes("bare and wet")) {
                SafetyScore+=10;
                notes.push({
                    positive:false,
                    note:"Road conditions are bare and wet"
                })
            }  else {
                notes.push({
                    positive:false,
                    note:"Road conditions are not optimal"
                })
            }
            if(currentConditions.RoadCondition.toLowerCase().includes("required")) {
                SafetyScore-=10;
                if(currentConditions.RoadCondition.toLowerCase().includes("chains")){
                    notes.push({
                        positive:false,
                        note:"Road conditions require chains"
                    })
                } else {
                    notes.push({
                        positive:false,
                        note:"Road conditions require equipment (see below)"
                    })
                }
            }
        } else {
            notes.push({
                positive:true,
                note:"Road conditions are good!"
            })
        }

        if(currentConditions.RestrictionOne.RestrictionText !== "No restrictions" || currentConditions.RestrictionTwo.RestrictionText !== "No restrictions") {
            SafetyScore-=20;
            if(weeklyForecast.properties.periods[0].shortForecast.toLowerCase().includes("required")) {
                notes.push({
                    positive:false,
                    note:"Driving restrictions are currently imposed on the pass"
                })
            } else {
                SafetyScore+=10;
                notes.push({
                    positive:false,
                    note:"Driving restrictions are currently imposed on the pass"
                })
            }

        } else {
            notes.push({
                positive:true,
                note:"There are no driving restrictions imposed!"
            })
        }

        if(weeklyForecast.properties.periods[0].shortForecast.toLowerCase().includes("snow")) {
            SafetyScore-=15;
            if(weeklyForecast.properties.periods[0].shortForecast.toLowerCase().includes("light")) {
                SafetyScore+=10;
            }
            notes.push({
                positive:false,
                note:`Snow is forecasted for later ${weeklyForecast.properties.periods[0].name.toLowerCase()}`
            })
        } else {
            notes.push({
                positive:true,
                note:"The weather forecast doesn't call for snow in the near future"
            })
        }
        // console.log(parseInt(weeklyForecast.properties.periods[0].windSpeed.split(' ')[0]))
        if(parseInt(weeklyForecast.properties.periods[0].windSpeed.split(' ')[0]) >= 25) {
            SafetyScore-=15
            notes.push({
                postive:false,
                note:`The wind is currently moving at faster than 25mph`
            })
        }
    }
    // console.log(adjustedTemp)
    // console.log(SafetyScore)
    const lastUpdated = moment().format();
    return {
        props: {
            currentConditions,lastUpdated, weeklyForecast:weeklyForecast.properties.periods, SafetyScore, notes
        },
        revalidate:30
    }
}

export default SummitAtSnoqualmie;
