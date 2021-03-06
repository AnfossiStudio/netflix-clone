import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import { Movie } from '../typing'
import requests from '../utils/requests'


interface Props { 
    netflixOriginals : Movie[]
    trendingNow : Movie[]
    topRated : Movie[]
    actionMovies : Movie[]
    comedyMovies : Movie[]
    horrorMovies : Movie[]
    romanceMovies : Movie[]
    documentaries : Movie[]
}

const Home  = ({
  netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,} : Props) => {
  const {loading} = useAuth()
  if(loading) return null;
  return (
    <div className='relative h-screen lg:h-[140vh]'>
      <Head>
        <title>Netflix - Home Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      <main className='relative'>
        {/* Banner */}
        <Banner netflixOriginals={netflixOriginals} />
        <section>
          
          <Row title="Trending Now" movies={trendingNow}/>
          <Row title="Top Rated" movies={topRated}/>
          <Row title="Action Thrillers" movies={actionMovies}/>
          {/* My List */}
          <Row title="Comedies" movies={comedyMovies}/>
          <Row title="Scary Movies" movies={horrorMovies}/>
          <Row title="Romance Movies" movies={romanceMovies}/>
          <Row title="Documentaris" movies={documentaries}/>
          
        </section>
      </main>
      {/* Modal */}
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props : {
        netflixOriginals : netflixOriginals.results,
        trendingNow : trendingNow.results,
        topRated : topRated.results,
        actionMovies : actionMovies.results,
        comedyMovies : comedyMovies.results,
        horrorMovies : horrorMovies.results,
        romanceMovies : romanceMovies.results,
        documentaries : documentaries.results,
    }
  }
}