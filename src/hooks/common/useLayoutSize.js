const {useState, useCallback} = require('react');

const useLayoutSize = () => {
  const [layout, setLayout] = useState(null);

  const onLayout = useCallback(event => {
    setLayout(event.nativeEvent.layout);
  }, []);

  return [layout, onLayout];
};

export default useLayoutSize;
