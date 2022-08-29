import Head from 'next/head'
import Link from 'next/link'
 import styles from '../styles/Home.module.css'

export async function getServerSideProps() {
	const response = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json')
	
	return {
		props: {
			pokemons: await response.json()
		}
	}
}

function Home({pokemons}) {
  return (
		<div className={styles.container}>
		  <Head>
		    <title>Pokemons List</title>
		  </Head>

		  <div className={styles.grid}>
		    {pokemons.map(({id, image, name}) => (
		      <div className={styles.card} key={id}>
						<span className={styles.badge}>{id}</span>
						<Link href={`/pokemons/${id}`}>
							<a>
								<img src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${image}`} alt={name} />
								<h3>{name}</h3>
							</a>
						</Link>
					</div>
		    ))}
		  </div>
		</div>
  )
}

export default Home