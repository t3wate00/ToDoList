import { useReducer } from "react";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type Action =
  | { type: "ADD_TASK"; payload: string }
  | { type: "TOGGLE_TASK"; payload: string }
  | { type: "REMOVE_TASK"; payload: string };

function reducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case "ADD_TASK":
      if (!action.payload.trim()) return state;
      return [
        { id: Date.now().toString(), title: action.payload, completed: false },
        ...state,
      ];

    case "TOGGLE_TASK":
      return state.map(t =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t
      );

    case "REMOVE_TASK":
      return state.filter(t => t.id !== action.payload);

    default:
      return state;
  }
}

export function useTodos() {
  const [tasks, dispatch] = useReducer(reducer, []);

  const addTask = (title: string) =>
    dispatch({ type: "ADD_TASK", payload: title });

  const toggleTask = (id: string) =>
    dispatch({ type: "TOGGLE_TASK", payload: id });

  const removeTask = (id: string) =>
    dispatch({ type: "REMOVE_TASK", payload: id });

  return { tasks, addTask, toggleTask, removeTask };
}
