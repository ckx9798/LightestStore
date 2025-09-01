<!-- @format -->

# ⚡️ LightestStore

LightestStore는 최소한의 API로 React 애플리케이션의 전역 상태를 쉽고 직관적으로 관리할 수 있도록 설계되었습니다.
복잡한 보일러플레이트 없이, 가볍고 빠르게 상태 관리를 할 수 있습니다.

## ✨ Features

- **Zero Boilerplate**: 스토어를 만드는 데 단 한 줄의 코드면 충분합니다.
- **Minimal API**: 배우기 쉬운 극소수의 API로 모든 것을 제어할 수 있습니다.
- **Lightweight**: 번들 크기에 거의 영향을 주지 않는 초경량 라이브러리입니다.
- **Performance Optimized**: Selector 기반의 구독 모델로 불필요한 리렌더링을 방지합니다.

## 🏗️ 설계 철학 및 기술

LightestStore는 안정적이고 예측 가능한 상태 관리를 위해 다음과 같은 기술과 패턴을 활용했습니다.

- **클로저(Closure) 및 캡슐화(Encapsulation)**

  > LightestStore는 클로저(Closure)를 활용하여 스토어의 내부 상태(`state`, `listeners`)를 외부로부터 격리하는 캡슐화(Encapsulation)를 구현했습니다. 그 이유는 스토어의 핵심 데이터가 외부에서 직접 수정되는 것을 원천적으로 차단하고, 오직 `setState`와 같은 정해진 API를 통해서만 상태가 변경되도록 강제하여 데이터의 무결성을 보장하기 위함입니다.

- **옵저버 패턴(Observer Pattern) 및 구독(Subscription)**

  > 옵저버 패턴(Observer Pattern)을 채택하여 상태와 UI의 반응성을 구현했습니다. 그 이유는 상태를 관리하는 로직(`store`)과 상태를 보여주는 로직(`Component`) 사이의 의존성을 최소화하는 '느슨한 결합'을 유지하기 위함입니다. **구독(Subscription)** 매커니즘을 통해, `store`는 어떤 컴포넌트가 자신을 바라보는지 알 필요 없이 변경 사실만 전파하면 되고, 컴포넌트는 `store`의 내부 구현을 몰라도 상태 변화에 따라 자동으로 리렌더링될 수 있습니다.

## 💿 설치 (Installation)

npm 또는 yarn을 통해 LightStore를 설치할 수 있습니다.

#### npm

```bash
npm install lighteststore
```

#### yarn

```bash
yarn add lighteststore
```

---

## 🚀 Getting Started: 사용 예제

LightestStore는 사용하여 `count`와 `name` 상태를 각각 다른 컴포넌트에서 독립적으로 관리하는 예제입니다. 이 예제는 셀렉터(Selector)가 어떻게 불필요한 리렌더링을 방지하는지 명확하게 보여줍니다.

### 1\. 스토어 생성하기 (`appStore.js`)

먼저, `count`와 `name`을 포함하는 스토어 파일을 만듭니다.

```javascript
// src/stores/appStore.js
import { createStore } from "LightestStore";

export const appStore = createStore((set) => ({
  count: 0,
  name: "Guest",
}));
```

### 2\. 컴포넌트에서 스토어 사용하기

이제 `count`와 `name`을 각각 사용하는 두 개의 분리된 컴포넌트를 만듭니다.

#### `Counter.jsx` (카운터 컴포넌트)

이 컴포넌트는 `count` 상태만 구독하고 변경합니다.

```jsx
// src/components/Counter.jsx
import React, { useCallback } from "react";
import { useStore } from "LightestStore";
import { appStore } from "../stores/appStore";

export default function Counter() {
  const selectCount = useCallback((state) => state.count, []);
  const [count, setStoreState] = useStore(appStore, selectCount);

  const handleIncrease = () => {
    setStoreState((prevState) => ({
      ...prevState,
      count: prevState.count + 1,
    }));
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={handleIncrease}>+1</button>
    </div>
  );
}
```

#### `Profile.jsx` (프로필 컴포넌트)

이 컴포넌트는 `name` 상태만 구독하고 변경합니다.

```jsx
// src/components/Profile.jsx
import React, { useCallback } from "react";
import { useStore } from "LightestStore";
import { appStore } from "../stores/appStore";

export default function Profile() {
  const selectName = useCallback((state) => state.name, []);
  const [name, setStoreState] = useStore(appStore, selectName);

  const handleChangeName = () => {
    const newName = prompt("Enter new name:", name);
    if (newName) {
      setStoreState((prevState) => ({ ...prevState, name: newName }));
    }
  };

  return (
    <div>
      <h2>Hello, {name}</h2>
      <button onClick={handleChangeName}>Change Name</button>
    </div>
  );
}
```

### 3\. 애플리케이션에 렌더링하기 (`App.jsx`)

두 컴포넌트를 함께 렌더링합니다.

```jsx
// src/App.jsx
import Counter from "./components/Counter";
import Profile from "./components/Profile";

export default function App() {
  return (
    <div>
      <h1>⚡️ LightestStore 예제</h1>
      <Counter />
      <Profile />
    </div>
  );
}
```

### 실행 결과 확인

애플리케이션을 실행하고 각 버튼을 클릭하면, 콘솔 로그를 통해 셀렉터의 최적화 동작을 확인할 수 있습니다.

- **`+1` 버튼 클릭 시:**

  > 콘솔에 `✅ Counter 컴포넌트가 리렌더링되었습니다.` 로그**만** 출력됩니다. `Profile` 컴포넌트는 `count`의 변경에 영향을 받지 않습니다.

- **`Change Name` 버튼 클릭 시:**

  > 콘솔에 `👤 Profile 컴포넌트가 리렌더링되었습니다.` 로그**만** 출력됩니다. `Counter` 컴포넌트는 `name`의 변경에 영향을 받지 않습니다.
