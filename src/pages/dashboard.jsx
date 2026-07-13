import React from "react";
import { useGetDashboardQuery } from "../redux/slices/taskApiSlice";

const Dashboard = () => {
  const { data, isLoading, error } = useGetDashboardQuery();

  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>Error loading dashboard</h2>;

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="bg-white rounded-xl p-5 shadow">
        <h2 className="text-lg font-semibold">Total Tasks</h2>
        <h1 className="text-4xl font-bold">
          {data?.dashboard?.totalTasks}
        </h1>
      </div>

      <div className="bg-white rounded-xl p-5 shadow">
        <h2 className="text-lg font-semibold">Pending</h2>
        <h1 className="text-4xl font-bold">
          {data?.dashboard?.pendingTasks}
        </h1>
      </div>

      <div className="bg-white rounded-xl p-5 shadow">
        <h2 className="text-lg font-semibold">Completed</h2>
        <h1 className="text-4xl font-bold">
          {data?.dashboard?.completedTasks}
        </h1>
      </div>

      <div className="bg-white rounded-xl p-5 shadow">
        <h2 className="text-lg font-semibold">In Progress</h2>
        <h1 className="text-4xl font-bold">
          {data?.dashboard?.inProgressTasks}
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;