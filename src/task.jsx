import React, { useState } from "react";
import {
  useGetTasksQuery,
  useDeleteTaskMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "./redux/slices/taskApiSlice";

import AddTaskModal from "./components/AddTaskModal";
import EditTaskModal from "./components/EditTaskModal";

const Tasks = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { data, isLoading, error } = useGetTasksQuery();

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleCreate = async (taskData) => {
    try {
      await createTask(taskData).unwrap();
      setOpen(false);
      alert("Task Created Successfully");
    } catch (err) {
      alert(err?.data?.message || "Task Creation Failed");
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  const handleUpdate = async (taskData) => {
    try {
      await updateTask(taskData).unwrap();
      alert("Task Updated Successfully");
      setEditOpen(false);
      setSelectedTask(null);
    } catch (err) {
      alert(err?.data?.message || "Update Failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this task?")) {
      try {
        await deleteTask(id).unwrap();
        alert("Task Deleted Successfully");
      } catch (err) {
        alert(err?.data?.message || "Delete Failed");
      }
    }
  };

  if (isLoading) {
    return (
      <h2 className="text-center mt-10 text-xl">
        Loading...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="text-center mt-10 text-red-600">
        Error loading tasks
      </h2>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          My Tasks
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Task
        </button>
      </div>

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Priority</th>
            <th className="text-left p-3">Due Date</th>
            <th className="text-left p-3">Action</th>
          </tr>
        </thead>

        <tbody>

          {data?.tasks?.length ? (
            data.tasks.map((task) => (
              <tr
                key={task._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3 font-medium">
                  {task.title}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      task.status === "completed"
                        ? "bg-green-600"
                        : task.status === "in-progress"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>

                <td className="p-3 capitalize">
                  {task.priority}
                </td>

                <td className="p-3">
                  {task.dueDate
                    ? new Date(
                        task.dueDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="p-3">
                  <div className="flex gap-2">
                  <button
                      onClick={() => handleEdit(task)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center py-8 text-gray-500"
              >
                No Tasks Found
              </td>
            </tr>
          )}

        </tbody>
      </table>

      {open && (
        <AddTaskModal
          onClose={() => setOpen(false)}
          onSubmit={handleCreate}
        />
      )}

      {editOpen && selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => {
            setEditOpen(false);
            setSelectedTask(null);
          }}
          onSubmit={handleUpdate}
        />
      )}

    </div>
  );
};

export default Tasks;