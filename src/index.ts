
import { tokenize } from "./css/tokenize";

for (const token of tokenize(`<test foo="bar" />`)) {
    console.log(token)
}

/*
import { SetState } from "../old/render/hooks";
import { createFactory, render, useState } from "./2.0";
import { createContext } from "./2.0/hooks";
import { PropsWithChildren } from "./2.0/types";
import { styled, global } from "./css";

const h1 = createFactory("h1");
const div = createFactory("div");
const button = createFactory("button");

global({
  html: {
    height: "100%",
  },
  body: {
    fontFamily: "'Poppins', sans-serif",
    padding: 0,
    height: "100%",
    margin: 0,
    background: "#fffc40",
    "@media (max-height: 9999px)": {
      ".foobar": {
        background: "red",
      },
    },
    ".test": {
      fontSize: 14,
      "#test2": {
        color: "blue",
      },
    },
  },
  "#root": {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const wrapper = styled(div, {
  marginBottom: 24,
  padding: 24,
  maxWidth: 640,
  borderRadius: 48,
  height: "70%",
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(145deg, #ffff44, #e6e33a)",
  boxShadow: "20px 20px 60px #d9d636, -20px -20px 60px #ffff4a",
});

const title = styled(h1, {
  fontSize: 36,
  fontWeight: 700,
  fontStyle: "italic",
  color: "#444",
  textAlign: "center",
  "@media (min-height: 200px)": {
    fontSize: 64,
    ".child": {
      "@media (min-height: 400px)": {
        fontSize: 2,
      },
    },
  },
});

const todosContext = createContext<{
    todos: string[];
    setTodos: SetState<string[]>
}>({
  todos: ["hej"],
  setTodos: () => {}
});

const todosApp = createFactory(({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<string[]>([]);

  return todosContext({todos, setTodos}, children)
});

const component = createFactory((props: { children: string }) => {
  return div(props.children);
});

const counter = createFactory(() => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  return [
    button({ key: 1, onClick: increment }, "increment"),
    ...Array.from(Array(count))
      .map((_, i) => div(i))
      .reverse(),
    button({ onClick: decrement }, "decrement"),
  ];
});

const app = createFactory(() => {
  return wrapper([title("todos"), div([counter()])]);
});

render(() => document.getElementById("root")!, app());
*/