import Link from 'next/link'
import starGenerator from '../lib/starGenerator'

export default function Itemcard (props){
    let server=process.env.NEXT_PUBLIC_SERVER
    const src=server+props.img
    return <div className='card'>
        <Link href="/item/[name]" as={`/item/${props.name}`}><img src={src}></img></Link>
        <div className="text">
            <div>{props.name}</div>
            <div>{"$ " + props.price}</div>
            <div>{starGenerator(props.ratings)}</div>
        </div>
        <style jsx>{`
        .card{
            display:flex;
            height:100%;
            width:350px;
            margin-right:15px;
            border:1px solid #606060;
        }
        .card img{
            display:inline;
            height:100%;
        }
        .text{
            height:100%;
            float:right;
            text-align:right;
            padding:30px;
            padding-top:6%;
            line-height:40px;
        }
      `}</style>
    </div>

}