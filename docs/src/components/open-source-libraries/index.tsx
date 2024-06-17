import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './styles.module.css';

type OpenSourceItem = {
  title: string;
  titleClassName?: string;
  description: JSX.Element;
};

const FeatureList: OpenSourceItem[] = [
  {
    title: 'RHF Adapters',
    titleClassName: styles.rhfAdaptersTitle,
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
    titleClassName: styles.cacheBusterTitle,
    description: (
      <>
        Automatic browser cache clearance on every release, ensuring your website stays up-to-date
        and responsive.
      </>
    ),
  },
  {
    title: 'Utility Hooks',
    titleClassName: styles.utilityReactHooks,
    description: (
      <>
        Simplify your code with our common utility hooks, designed to effectively manage boilerplate
        code and enhance productivity.
      </>
    ),
  },
];

function OpenSourceLibrary({ title, titleClassName, description }: OpenSourceItem) {
  return (
    <div className={clsx('col col--4 margin-bottom--md')}>
      <div className="card">
        <div className="card__body">
          <div className="text--center padding-horiz--md">
            <Heading as="h3" className={titleClassName}>
              {title}
            </Heading>
            <p>{description}</p>
          </div>
        </div>
        <div className="card__footer">
          <button className="button button--outline button--secondary button--block">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OpenSourceLibraries(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className={styles.openSourceLibrariesHeading}>Open Source Libraries</h1>
          </div>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <OpenSourceLibrary key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
