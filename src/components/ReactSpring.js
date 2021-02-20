import { useSpring, animated } from 'react-spring';

function ReactSpring() {
  const innerWidth = window.innerWidth;
  const outerWidth = window.outerWidth;
  const innerHeight = window.innerHeight;
  const outerHeight = window.outerHeight;

  const xmin = -5;
  const xmax = 5;
  const pathFunction = (x) => {
    return 2 * Math.exp(-Math.pow(x, 2) / 0.5);
  };

  const eps = 0.3;
  const N = 300;
  const steps = [...Array(N).keys()];
  // t between 0 and 1
  const createPath = (t) => {
    let path = steps
      .map((i) => xmin + (xmax - xmin) * (t + eps * (i / N)))
      .filter((x) => x > xmin && x < xmax)
      .map((x) => {
        let y = pathFunction(x);
        let x_norm = ((x - xmin) / (xmax - xmin)) * innerWidth;
        let y_norm = -(y / (xmax - xmin)) * innerWidth + (1 / 2) * innerHeight;
        return `${x_norm} ${y_norm}`;
      })
      .join(' L');
    path = 'M' + path;
    return path;
  };

  const props = useSpring({ t: 1, from: { t: 0 }, config: { duration: 2000 } });

  return (
    <svg
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        background: 'green',
        width: '100vw',
        height: '100vh',
      }}
    >
      <animated.path
        d={props.t.interpolate(createPath)}
        stroke="red"
        fill="none"
        stroke-width="5"
      ></animated.path>
    </svg>
  );
}

export default ReactSpring;
