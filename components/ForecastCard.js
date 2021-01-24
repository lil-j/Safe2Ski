function ForecastCard(props) {
    const { forecast } = props;
    if (!forecast.name.includes("Night")){
        return <div className="p-2 w-full lg:w-1/2">
                <div className="h-full border border-blueGray-200 border-2 rounded-md py-4 px-2">
                <h4 className="text-blueGray-900">{forecast.name}</h4>
                <h5 className="text-blueGray-800 font-bold text-5xl">{forecast.temperature}° <small>F</small></h5>
                <p className="text-blueGray-600">{forecast.detailedForecast}</p>
            </div>
        </div>
    }
    return null
}

export default ForecastCard;