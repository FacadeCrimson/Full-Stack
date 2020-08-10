export default function Article(props){
    return <div className="main">
        <h2>{props.title}</h2>
        {props.date?<small>props.date</small>:null}
        <div>{props.content.map(data=><p>{data}</p>)}</div>
        <style jsx>{`
        .main{
            width:1200px;
            margin:50px auto;
        }
        `}</style>
    </div>

}