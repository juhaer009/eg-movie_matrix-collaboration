
import UserDashboard from "@/components/Dashboard/UserDashboard";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import useRole from "@/hook/useRole";
import React from "react";

const UserDashboardPage = () => {
    // const { role, loading } = useRole();    
  return (
    <div>
      <PrivateRoute>
        <UserDashboard></UserDashboard>
      </PrivateRoute>
    </div>
  );
};

export default UserDashboardPage;
