export default function FeatureCard(props) {
    return <div className={`py-4 px-6 bg-${props.color}-200 rounded-md max-w-sm m-2`}>
        <h4 className={`font-bold text-${props.color}-900 text-xl mb-2`}>{props.title}</h4>
        <p className={`text-${props.color}-900`}>{props.content}</p>
    </div>
}