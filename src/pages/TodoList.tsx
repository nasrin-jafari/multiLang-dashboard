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
import InputBtnGroup from "../components/InputBtnGroup.tsx";
import { useTranslation } from "react-i18next";

export default function TodoApp() {
  const { t } = useTranslation();

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
      editInputRef.current.value = todoToEdit.text;
    }
  };

  const saveEditedTodo = () => {
    const editedText = editInputRef.current?.value.trim();
    if (editedText) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editMode ? { ...todo, text: editedText } : todo,
      );

      setTodos(updatedTodos);
      setEditMode(null);
    }
  };

  const toggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(updatedTodos);
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 8 }}>
      <Typography variant="h4" gutterBottom>
        {t("todoApp")}
      </Typography>
      <InputBtnGroup
        type="text"
        placeholder={t("addTodoPlaceholder")}
        textBtn={t("addTodoButton")}
        ref={inputRef}
        onClick={addTodo}
      />
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            dense
            style={{
              border: todo.completed ? "1px solid green" : "1px solid red",
              borderRadius: "4px",
              marginBottom: "8px",
            }}
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {editMode === todo.id ? (
              <InputBtnGroup
                type="text"
                placeholder={t("editTodoPlaceholder")}
                textBtn={t("editTodoButton")}
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
