import Link from '@docusaurus/Link';
import { ROUTES } from '@site/src/constants';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './styles.module.css';

type OpenSourceItem = {
  title: string;
  color: string;
  description: JSX.Element;
  href?: string;
};

const FeatureList: OpenSourceItem[] = [
  {
    title: 'RHF Adapters',
    color: '#06b6d4',
    description: (
      <>
        Designed to streamline the integration of{' '}
        <Link href="https://react-hook-form.com/" target="_blank" rel="noreferrer noopener">
          react-hook-form
        </Link>{' '}
        with UI frameworks by managing boilerplate code.
      </>
    ),
  },
  {
    title: 'Cache Buster',
    color: '#ef4444',
    href: ROUTES.CACHE_BUSTER,
    description: (
      <>
        Automatic browser cache clearance on every release, ensuring your website stays up-to-date
        and responsive.
      </>
    ),
  },
  {
    title: 'React Hooks',
    color: '#3b82f6',
    href: ROUTES.UTILITY_HOOKS,
    description: (
      <>
        Simplify your code with our common React hooks, designed to effectively manage boilerplate
        code and enhance productivity.
      </>
    ),
  },
];

function OpenSourceLibrary({ title, color, description, href }: OpenSourceItem) {
  return (
    <div className={'col col--4 margin-bottom--md'}>
      <Link href={href} className={clsx('card text--no-decoration', styles.card)}>
        <div className="card__body">
          <div className="text--center padding-horiz--md">
            <Heading
              as="h3"
              style={{
                color,
              }}
              className={styles.cardTitle}
            >
              {title}
            </Heading>
            <p className={styles.cardDescription}>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function OpenSourceLibraries(): JSX.Element {
  return (
    <section className={styles.libraries}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <OpenSourceLibrary key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
