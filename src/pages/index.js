import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Collections from '../../components/Collections'
import MyCarousel from '../../components/Carousel'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Falconsaa - A books platform that fulfill your books needs.</title>
        <meta name="description" content="Falconsaa - An ecommerce platform that fulfills the need of books to all the needfull aspirants." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/faviconPng.png" sizes='any'/>
      </Head>
      
      <div>
        <div>
          <MyCarousel />
        </div>

        <Collections />
      </div>
    </>
  )
}
