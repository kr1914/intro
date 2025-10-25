 TypeScript 실전 팁 모음

TypeScript를 더 효과적으로 사용하기 위한 실전 팁들을 정리했습니다.

## 1. Type vs Interface

언제 무엇을 사용해야 할까요?

```typescript
// Interface - 확장 가능, 선언 병합 지원
interface User {
  id: number;
  name: string;
}

interface User {
  email: string; // 자동으로 병합됨
}

// Type - 유니온, 교차 타입 등 더 유연
type Status = 'pending' | 'success' | 'error';
type Response<T> = { data: T } | { error: string };
```

**권장사항**: 객체 형태는 interface, 나머지는 type을 사용하세요.

## 2. Utility Types 활용

```typescript
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Partial - 모든 속성을 선택적으로
type PartialTodo = Partial<Todo>;

// Pick - 특정 속성만 선택
type TodoPreview = Pick<Todo, 'id' | 'title'>;

// Omit - 특정 속성 제외
type TodoWithoutId = Omit<Todo, 'id'>;

// Required - 모든 속성을 필수로
type RequiredTodo = Required<Partial<Todo>>;

// Record - 키-값 타입 정의
type PageInfo = Record<'home' | 'about' | 'contact', { title: string }>;
```

## 3. Generic 활용하기

```typescript
// 기본 제네릭
function identity<T>(arg: T): T {
  return arg;
}

// 제약 조건 추가
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// 여러 제네릭 파라미터
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}
```

## 4. Type Guard 패턴

```typescript
// typeof 가드
function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + value;
  }
  return padding + value;
}

// instanceof 가드
class Dog {
  bark() { console.log('Woof!'); }
}

class Cat {
  meow() { console.log('Meow!'); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// 커스텀 타입 가드
interface Fish {
  swim: () => void;
}

interface Bird {
  fly: () => void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

## 5. 조건부 타입

```typescript
// 기본 조건부 타입
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// infer 키워드
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Func = () => string;
type FuncReturn = ReturnType<Func>; // string
```

## 6. Mapped Types

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};

// 조건부 속성
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number; }
```

## 7. 템플릿 리터럴 타입

```typescript
type World = 'world';
type Greeting = `hello ${World}`; // "hello world"

type EmailLocaleIDs = 'welcome_email' | 'email_heading';
type FooterLocaleIDs = 'footer_title' | 'footer_sendoff';

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
```

## 8. as const 활용

```typescript
// 일반 객체
const config = {
  endpoint: 'https://api.example.com',
  timeout: 3000
};
// typeof config.endpoint는 string

// as const 사용
const config2 = {
  endpoint: 'https://api.example.com',
  timeout: 3000
} as const;
// typeof config2.endpoint는 "https://api.example.com"

// 배열에도 사용 가능
const colors = ['red', 'green', 'blue'] as const;
type Color = typeof colors[number]; // "red" | "green" | "blue"
```

## 마무리

TypeScript는 강력한 타입 시스템을 제공합니다. 이러한 기능들을 잘 활용하면 더 안전하고 유지보수하기 쉬운 코드를 작성할 수 있습니다.

타입 안정성과 개발자 경험, 두 마리 토끼를 모두 잡으세요! 🎯
