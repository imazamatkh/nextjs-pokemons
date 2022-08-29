import Head from 'next/head'
import Link from 'next/link'

import styles from '../../styles/Pokemon.module.css'

export async function getStaticPaths() {
	const response = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json')
	const pokemon = await response.json()
	return {
		paths: pokemon.map((pokemon) => ({
			params: { id: pokemon.id.toString() }
		})),
		fallback: false
	}
}

export async function getStaticProps({params}) {
	const response = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`)
	
	return {
		props: {
			pokemon: await response.json()
		}
	}
}

function Pokemon({pokemon}) {
  return (
		<div>
      <Head>
		    <title>{pokemon.name}</title>
		  </Head>
      
      {/* <div>{id}</div> */}
      {/* <div>{JSON.stringify(pokemon)}</div> */}

      <div>
        <Link href={'/'}>
          <a>Back to Home</a>
        </Link>
      </div>

      <div className={styles.layout}>
        <div>
          <img className={styles.picture} src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} alt={pokemon.name} />
        </div>
				<div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(', ')}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Pokemon