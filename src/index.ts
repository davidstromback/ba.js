import { Literal } from "./css";
import { process } from "./css/lib/ast/process";
import { dashify } from "./css/lib/ast/visitors/dashify";
import { hoist } from "./css/lib/ast/visitors/hoist";
import { selectors } from "./css/lib/ast/visitors/selectors";
import { split } from "./css/lib/ast/visitors/split";
import { units } from "./css/lib/ast/visitors/units";

export default (root: Literal) => process(root, [split, dashify, units, selectors, hoist])

/*

import { render } from "./render";
import { component, article, button, div, form, h1, input } from "./vdom";
import { styled, global } from "./css";
import { useEffect, useState } from "./render/hooks";
import { prescence, transition } from "./motion/motion";

global({
  body: {
    fontFamily: "'Poppins', sans-serif",
    padding: 0,
    margin: 0,
    background: "yellow",
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
});

const wrapper = styled(div, {
  borderRadius: 24,
  backgroundColor: "#fff",
  marginBottom: 24,
  padding: 24,
  maxWidth: 640,
  margin: [0, "auto"],
});

const getMyValue = () => 0

const title = styled(h1, {
    fontSize: 36, // Defaults units appended to number values, customizeable by property name or value type
    margin: [0, getMyValue()], // Supports arrays, automatically joins values and appends default units to numbers
    fontWeight: 700, // Numeric css value types have no defaults and are left as is
    fontStyle: "italic", // Camelcased property names are converted to dash-case
    color: "#444",
    textAlign: "center",
    "@media (min-height: 200px)": { // Hoists @rules to top
      fontSize: 64, // Splits direct child properties of atrules into new copy of parent
      '.child': {   // While preserving declaration blocks and correctly qualifying their selectors
          "@media (min-height: 400px)": { // Preserves nested at rules, flattens other blocks
              scale: 2
          }
      }
    },
    [`${wrapper} &`]: { // Can refer to other components
        color: 'red'
    }
  });
  
const card = styled(article, {
  borderRadius: 24,
  backgroundColor: "#fafafa",
  marginBottom: 24,
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
  appearence: "none",
  borderRadius: 8,
  fontSize: 24,
  backgroundColor: "#f0f0f0",
  margin: 0,
  padding: 24,
  display: "flex",
  outline: "none",
  border: "none",
  marginRight: 24,
  flexGrow: 1,
});

const todoTitle = styled(h1, {
  fontSize: 24,
  fontWeight: 500,
  color: "#444",
  flexGrow: 1,
});

const addTodoButton = styled(button, {
  all: "unset",
  fontSize: 24,
  fontWeight: 500,
  display: "block",
  margin: 0,
  padding: 24,
  backgroundColor: "#3FC380",
  border: [2, "solid", "#3FC380"],
  color: "#ffffff",
  transition: ["background-color", 120, "ease-in-out"],
  borderRadius: 8,
  "&:disabled": {
    backgroundColor: "#999",
    border: [2, "solid", "#999"],
  },
});

const removeTodoButton = styled(button, {
  all: "unset",
  fontSize: 24,
  display: "block",
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

const todoForm = component(
  (props: { todos: string[]; onSubmit: (value: string) => void }) => {
    const [value, setValue] = useState("");

    const handleSubmit = (event: Event) => {
      setValue(() => "");
      event.preventDefault();
      props.onSubmit(value);
    };

    const handleInput = (event: Event) => {
      setValue(() => (event.target as HTMLInputElement).value);
    };

    const disabled = value === "" || props.todos.includes(value);

    return addTodoForm({ onSubmit: handleSubmit }, [
      todoInput({ value, onInput: handleInput }),
      addTodoButton({ type: "submit", disabled }, ["add todo"]),
    ]);
  }
);

const todosListItem = component(
  (props: { todo: string; onRemove: () => void }) => {
    const [checked, setChecked] = useState(false);

    const handleInput = (event: Event) =>
      setChecked(() => (event.target as HTMLInputElement).checked);

    return card([
      clock(),
      todoCheckbox({ type: "checkbox", onInput: handleInput, checked }),
      todoTitle([props.todo]),
      removeTodoButton({ onClick: props.onRemove }, ["🗑️"]),
    ]);
  }
);

const todosList = component(
  (props: { todos: string[]; onRemove: (index: number) => void }) =>
    div([
      prescence(
        props.todos.map((todo: string, index: number) =>
          transition({
            key: todo,
            enterDuration: 1000,
            exitDuration: 1000,
            render: (phase) => {
              console.log(phase);
              return todosListItem({
                todo,
                onRemove: () => props.onRemove(index),
              });
            },
          })
        )
      ),
    ])
);

const app = component(() => {
  const [todos, setTodos] = useState<string[]>([]);

  const handleSubmit = (value: string) => setTodos((prev) => [...prev, value]);

  const handleRemove = (index: number) =>
    setTodos((state) => {
      const next = state.slice();
      next.splice(index, 1);
      return next;
    });

  return wrapper([
    title(["todos"]),
    todosList({ todos, onRemove: handleRemove }),
    todoForm({ todos, onSubmit: handleSubmit }),
  ]);
});

render(app(), () => document.getElementById("root")!);
*/