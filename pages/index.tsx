import type { NextPage } from 'next';
import Head from 'next/head';
import WallboardDashboard from '../components/complete-wallboard';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Crimson Wallboard - Call Center Dashboard</title>
        <meta name="description" content="Real-time call center monitoring dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <WallboardDashboard />
      </main>
    </>
  );
};

export default Home;