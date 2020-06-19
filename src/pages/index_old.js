import React, {lazy, useState, useEffect, Suspense} from 'react';

const importBuilder = subreddit =>
  lazy(() =>
    import(`../components/Builder`)
  );

export default () => {

  const [builder, setBuilder] = useState();

  useEffect(() => {
    async function getBuilder() {
      const Builder = await importBuilder();
      setBuilder(<Builder />);
    }
    getBuilder();
  }, []);

  return (
  <div>
    <Suspense fallback={<div>Loading That Stuff!!!</div>}>
      <div>{builder}</div>
    </Suspense>
  </div>
)}
