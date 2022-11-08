import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className='w-[200px] h-[200px] bg-red-500' />
      <div style={{width: 300, height: 300, background:'red'}} />
    </div>
  )
}
