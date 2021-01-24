function Note(props) {
    console.log(props.positive)
    return <div className="p-2 w-full lg:w-1/2">
        <div className={`"px-3 py-3 rounded-md bg-${props.positive ? "green" : "red"}-300 text-${props.positive ? "green" : "red"}-800"`}>
            {props.note}
        </div>
    </div>
}

export default Note;