import {
  Box,
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FiTrash } from "react-icons/fi";
import InputBtnGroup from "./InputBtnGroup";

export default function TodoApp() {
  const [todos, setTodos] = useState<
    { id: number; text: string; completed: boolean }[]
  >(() => {
    if (typeof window !== "undefined") {
      const storedTodos = localStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : [];
    }
    return [];
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const editInputRef = useRef<HTMLInputElement | null>(null);
  const [editMode, setEditMode] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    const inputText = inputRef.current?.value.trim();
    if (inputText) {
      const isExistingTodo = todos.some((todo) => todo.text === inputText);

      if (isExistingTodo) {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        return;
      }

      const newTodo = {
        id:
          todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1,
        text: inputText,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id: number) => {
    setEditMode(id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit && editInputRef.current) {
      editInputRef.current.value = todoToEdit.text; // اطمینان از وجود current
    }
  };

  const saveEditedTodo = () => {
    const editedText = editInputRef.current?.value.trim();
    if (editedText) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editMode ? { ...todo, text: editedText } : todo
      );

      setTodos(updatedTodos);
      setEditMode(null);
    }
  };

  const toggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Todo App
      </Typography>

      <InputBtnGroup
        type="text"
        placeholder="add todo"
        textBtn="add todo"
        ref={inputRef}
        onClick={addTodo}
      />
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            dense
            style={{
              border: todo.completed ? "1px solid green" : "1px solid red", // رنگ سبز ملایم برای انجام شده و زرد ملایم برای انجام نشده
              borderRadius: "4px", // برای گرد کردن گوشه‌ها
              marginBottom: "8px", // برای فاصله بین تسک‌ها
            }}
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {editMode === todo.id ? (
              <InputBtnGroup
                type="text"
                placeholder="edit todo"
                textBtn="edit todo"
                ref={editInputRef}
                onClick={saveEditedTodo}
              />
            ) : (
              <>
                <ListItemText
                  primary={todo.text}
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                />
                <Box
                  sx={{
                    gap: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => editTodo(todo.id)}
                  >
                    <CiEdit size={22} />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <FiTrash size={22} />
                  </IconButton>
                </Box>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
