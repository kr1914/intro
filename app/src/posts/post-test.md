# POST 테스트

React Hooks는 React 16.8에서 도입된 기능으로, 함수형 컴포넌트에서 상태와 생명주기 기능을 사용할 수 있게 해줍니다.

## useState

가장 기본적인 Hook으로, 상태를 관리합니다.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

## useEffect

부수 효과(side effects)를 처리하는 Hook입니다.

```jsx
import { useEffect, useState } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // 빈 배열: 마운트 시 한 번만 실행
  
  return <div>{data ? data.title : 'Loading...'}</div>;
}
```

## useContext

Context API를 더 쉽게 사용할 수 있게 해줍니다.

```jsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Button</button>;
}
```

## useRef

DOM 요소에 직접 접근하거나, 값을 유지하는데 사용됩니다.

```jsx
import { useRef } from 'react';

function TextInput() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}
```

## useMemo & useCallback

성능 최적화를 위한 Hook들입니다.

```jsx
import { useMemo, useCallback } from 'react';

function ExpensiveComponent({ data }) {
  // 값을 메모이제이션
  const expensiveValue = useMemo(() => {
    return data.reduce((acc, item) => acc + item.value, 0);
  }, [data]);
  
  // 함수를 메모이제이션
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []);
  
  return <div>{expensiveValue}</div>;
}
```

## 커스텀 Hook 만들기

자신만의 Hook을 만들어 로직을 재사용할 수 있습니다.

```jsx
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}

// 사용
function Component() {
  const { width, height } = useWindowSize();
  return <div>Width: {width}, Height: {height}</div>;
}
```

## 주의사항

1. **Hook은 최상위에서만 호출**: 반복문, 조건문, 중첩 함수 내부에서 호출하면 안 됩니다
2. **React 함수에서만 호출**: 일반 JavaScript 함수에서는 사용할 수 없습니다
3. **의존성 배열 관리**: useEffect, useMemo, useCallback의 의존성 배열을 정확히 설정해야 합니다

Happy Hacking! 🚀
