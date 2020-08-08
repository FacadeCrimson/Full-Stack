export default function Message(props){
    return <div className="message">{props.info}
        <style jsx>{`
            .message{
                text-align:center;
                margin:100px auto;
            }
        `}</style>
    </div>
}