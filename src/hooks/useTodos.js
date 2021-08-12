import { useEffect, useRef, useState } from 'react';

export const useTodos = todos => {
  const [newTodo, setNewTodo] = useState('');
  const [search, setSearch] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [showResetSearch, setShowResetSearch] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    setFilteredTodos(todos);
    setSearch('');
    setShowResetSearch(false);
  }, [todos]);

  return {
    newTodo,
    setNewTodo,
    search,
    setSearch,
    filteredTodos,
    setFilteredTodos,
    showResetSearch,
    setShowResetSearch,
    isEditMode,
    setIsEditMode,
    todoToEdit,
    setTodoToEdit,
    inputRef,
  };
};
