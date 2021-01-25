import ShowMoreText from 'react-show-more-text';

function ForecastCard(props) {
    const { forecast } = props;
    if (!forecast.name.includes("Night")){
        return <div className="p-2 w-full lg:w-1/2">
                <div className="h-full border border-blueGray-200 border-2 rounded-md py-4 px-6">
                <h4 className="text-blueGray-900">{forecast.name}</h4>
                <h5 className="text-blueGray-800 font-bold text-5xl">{forecast.temperature}° <small>F</small></h5>
                <ShowMoreText className="text-blueGray-600" anchorClass='text-blue-700'>{forecast.detailedForecast}</ShowMoreText>
            </div>
        </div>
    }
    return null
}

export default ForecastCard;