import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import OpenSourceLibraries from '@site/src/components/open-source-libraries';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import { ASSETS } from '../constants';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.piplupTitle}>
          <img src={ASSETS.LOGO_SVG} alt="Piplup Logo" width={36} height={36} />
          <p>Piplup</p>
        </div>
        <Heading as="h1" className={styles.heroTitle}>
          Ready to use React libraries <span className="text--primary">free forever</span>
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <OpenSourceLibraries />
      </main>
    </Layout>
  );
}
