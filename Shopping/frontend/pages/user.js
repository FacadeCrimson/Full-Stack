import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import useSWR from 'swr'
import { useAuth0 } from '../components/react-auth0-spa'
import Link from 'next/link'

// export default function User() {
//     const { getTokenSilently } = useAuth0()
    
//     const token = getTokenSilently()
    

//     const fetchData=async () => {
//         const server=process.env.NEXT_PUBLIC_SERVER
//         const url=server+'/test'
//         const token = await getTokenSilently()
//         let response = await fetch(url,{headers: { Authorization: `Bearer ${token}` },})
//         let data = response.json()
//         return data
//     }


//   return (
//     <Layout>
//       <Head>
//         <title>{siteTitle}</title>

//       </Head>
//       <div><div>{fetchData()}</div></div>
//       <style jsx>{`
//     `}</style>
//     </Layout>
//   )
// }


export default function User() {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState();
  const { getTokenSilently } = useAuth0();

  var data=""

  const fetchData = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER
    const token = await getTokenSilently()

    const res = await fetch(`${baseUrl}/test`, {method: 'GET',credentials: 'include',mode: 'cors',
      headers: { Authorization: `Bearer ${token}` },
    })
    res
      .json()
      .then((json) => {
        // setPeople(json.people);
        // setIsLoading(false);
        data=json
      })
      .catch((err) => console.log(err));
  };

  useEffect( () => { fetchData(); }, [] );
  
  return (
      <div>{data}</div>
    )
}
// class Profile extends Component {
//   render() {
//     const { user } = this.props.auth0;
//     return <div>Hello {user.name}</div>;
//   }
// }

// export default withAuth0(Profile);