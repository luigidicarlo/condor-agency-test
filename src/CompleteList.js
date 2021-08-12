import { useTodos } from './hooks/useTodos';

export const CompleteList = ({ todos, setTodos }) => {
  const {
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
  } = useTodos(todos);

  const onChange = e => {
    setNewTodo(e.target.value);
  };

  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  const onAddTodo = e => {
    e.preventDefault();

    if (!newTodo) {
      return;
    }

    if (todos.find(todo => todo.title === newTodo)) {
      return;
    }

    let newTodos;

    if (isEditMode) {
      newTodos = todos.map(todo =>
        todo.id === todoToEdit ? { ...todo, title: newTodo } : todo
      );
      setIsEditMode(false);
      setTodoToEdit('');
    } else {
      newTodos = [
        {
          id: `${Math.random()}-${Date.now()}`,
          title: newTodo,
          completed: true,
        },
        ...todos,
      ];
    }

    setTodos(newTodos);
    setNewTodo('');
  };

  const onSearch = e => {
    e.preventDefault();

    const newFilteredTodos = todos.filter(todo =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredTodos(newFilteredTodos);
    setShowResetSearch(true);
  };

  const resetSearch = () => {
    setFilteredTodos(todos);
    setSearch('');
    setShowResetSearch(false);
  };

  const markIncomplete = todoId => {
    setTodos(
      todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: false } : todo
      )
    );
  };

  const editTodo = todoId => {
    const todoToEdit = todos.find(todo => todo.id === todoId);

    inputRef.current && inputRef.current.focus();

    setNewTodo(todoToEdit.title);
    setIsEditMode(true);
    setTodoToEdit(todoId);
  };

  const cancelEdit = () => {
    setNewTodo('');
    setIsEditMode(false);
  };

  const deleteTodo = todoId => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2>Complete</h2>
        <form className="mb-3" onSubmit={onSearch}>
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              value={search}
              onChange={onSearchChange}
              placeholder="Search"
            />
            <button
              className="btn btn-info text-white"
              type="submit"
              title="Search"
            >
              <i className="fas fa-search"></i>
            </button>
            {showResetSearch && (
              <button
                className="btn btn-danger"
                type="button"
                title="Reset search"
                onClick={resetSearch}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </form>
        <form onSubmit={onAddTodo}>
          <div className="input-group">
            <input
              ref={inputRef}
              className="form-control"
              type="text"
              required
              value={newTodo}
              onChange={onChange}
              placeholder={isEditMode ? 'Edit Todo' : 'Add Todo'}
            />
            <button className="btn btn-primary" type="submit" title="Add todo">
              {isEditMode ? (
                <i className="fas fa-check" />
              ) : (
                <i className="fas fa-plus" />
              )}
            </button>
            {isEditMode && (
              <button
                className="btn btn-danger"
                type="button"
                title="Cancel edit"
                onClick={cancelEdit}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </form>
        <hr />
        {filteredTodos.map(
          todo =>
            todo.completed && (
              <div
                key={todo.title}
                className="d-flex align-items-center justify-content-between"
              >
                <p>{todo.title}</p>
                <div className="d-flex">
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => markIncomplete(todo.id)}
                  >
                    <i className="fas fa-check" />
                  </button>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    type="button"
                    onClick={() => editTodo(todo.id)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    type="button"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};
