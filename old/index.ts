import { render } from "./render";
import { component, article, button, div, form, h1, input } from "./vdom";
import { styled, global } from "./css";
import { useContext, useEffect, useState } from "./render/hooks";
import { prescence, transition } from "./motion/motion";
import { context } from "./render/context";
import { move } from "./motion/move";

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
        scale: 2,
      },
    },
  },
});

const list = styled(div, {
  flex: "1 1",
  overflowY: "scroll",
});

const card = styled(article, {
  borderRadius: 24,
  padding: [24, 36],
  display: "flex",
  alignItems: "center",
});

const addTodoForm = styled(form, {
  display: "flex",
});

const todoCheckbox = styled(input, {
  width: 24,
  height: 24,
  marginRight: 24,
});

const todoInput = styled(input, {
  all: "unset",
  appearance: "none",
  borderRadius: 24,
  fontSize: 24,
  margin: 0,
  height: 24,
  padding: 24,
  lineHeight: "24px",
  display: "flex",
  outline: "none",
  border: "none",
  marginRight: 24,
  flexGrow: 1,
  boxShadow: "inset 20px 20px 60px #d9d636, inset -20px -20px 60px #ffff4a",
});

const todoTitle = styled(h1, {
  fontSize: 24,
  fontWeight: 500,
  color: "#444",
  flexGrow: 1,
});

const addTodoButton = styled(button, {
  all: "unset",
  fontSize: 48,
  lineHeight: "48px",
  width: 48,
  height: 48,
  textAlign: "center",
  fontWeight: 500,
  display: "block",
  margin: 0,
  padding: 12,
  color: "#000",
  borderRadius: 24,
  background: "#fffc40",
  position: "relative",
  overflow: "hidden",
  boxShadow: "20px 20px 60px #d9d636, -20px -20px 60px #ffff4a",
  ":before": {
    transition: ["opacity", 120, "ease-in-out"],
    position: "absolute",
    display: "block",
    content: '"+"',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    width: 48,
    height: 48,
    padding: 12,
    borderRadius: 24,
    zIndex: 1,
    background: "linear-gradient(145deg, #e6e33a, #ffff44)",
  },
  ":after": {
    transition: ["opacity", 120, "ease-in-out"],
    position: "absolute",
    display: "block",
    content: '"+"',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    width: 48,
    height: 48,
    padding: 12,
    borderRadius: 24,
    zIndex: 0,
    background: "linear-gradient(145deg, #ffff44, #e6e33a)",
  },
  ":hover:after": {
    opacity: 1,
  },
  ":active": {
    ":before": {
      opacity: 1,
    },
    ":after": {
      opacity: 0,
    },
  },
  ":disabled": {
    color: "#999",
  },
});

const removeTodoButton = styled(button, {
  all: "unset",
  fontSize: 24,
  display: "block",
});

const todoContext = context<string[]>([]);

const scale = move(div, {
  enter: { height: "0px" },
  exit: { height: "0px" },
});

const clock = component(() => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    console.log("mounted clock");
    const interval = setInterval(() => setDate(() => new Date()), 1000);

    return () => {
      clearInterval(interval);
      console.log("unmounted clock");
    };
  }, []);

  return [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((num) => num.toString().padStart(2, "0"))
    .join(":");
});

const todoForm = component((props: { onSubmit: (value: string) => void }) => {
  const todos = useContext(todoContext);
  const [value, setValue] = useState("");

  const handleSubmit = (event: Event) => {
    if (value && !todos.includes(value)) {
      setValue(() => "");
      event.preventDefault();
      props.onSubmit(value);
    }
  };

  const handleInput = (event: Event) => {
    setValue(() => (event.target as HTMLInputElement).value);
  };

  const disabled = value === "" || todos.includes(value);

  return addTodoForm({ onSubmit: handleSubmit }, [
    todoInput({ value, onInput: handleInput }),
    addTodoButton({ type: "submit", disabled }, ["+"]),
  ]);
});

const todosListItem = component(
  (props: { todo: string; onRemove: () => void }) => {
    const [checked, setChecked] = useState(false);

    const handleInput = (event: Event) =>
      setChecked((event.target as HTMLInputElement).checked);

    return card([
      todoCheckbox({ type: "checkbox", onInput: handleInput, checked }),
      todoTitle([props.todo]),
      removeTodoButton({ onClick: props.onRemove }, ["🗑️"]),
    ]);
  }
);

const todosList = component((props: { onRemove: (index: number) => void }) => {
  const todos = useContext(todoContext);

  return list([
    prescence(
      todos.map((todo: string, index: number) =>
        scale({ key: todo }, [
          todosListItem({
            todo,
            onRemove: () => props.onRemove(index),
          }),
        ])
      )
    ),
  ]);
});

const app = component(() => {
  const [todos, setTodos] = useState<string[]>([]);

  const handleSubmit = (value: string) => setTodos((prev) => [...prev, value]);

  const handleRemove = (index: number) =>
    setTodos((state) => {
      const next = state.slice();
      next.splice(index, 1);
      return next;
    });

  return todoContext(
    todos,
    wrapper([
      title(["todos"]),
      todosList({ onRemove: handleRemove }),
      todoForm({ onSubmit: handleSubmit }),
    ])
  );
});

render(app(), () => document.getElementById("root")!);
