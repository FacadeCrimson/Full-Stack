
 export default function starGenerator(ratings){
    const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length
    const rating = ratings?average(ratings):0

    var star=""
    const n=Math.trunc(rating)
    for(let i=0;i<n;i++){
      star=star+"★"
    }
    for(let i=n;i<5;i++){
      star=star+"☆"
    }
    return star
   }