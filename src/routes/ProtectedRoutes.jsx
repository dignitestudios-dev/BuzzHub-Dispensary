import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ token }) => {
  // If there's no token, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists, render the child routes
  return <Outlet />;
};

export const PublicRoute = ({ token, userData }) => {
  if (token) {
    if (!userData?.isSessionComplete) {
      return <Navigate to="/profile-completion" replace />;
    }

    if (userData?.status === "Approved") {
      if (!userData?.isSubscribed) {
        return <Navigate to="/packages" replace />;
      }
      if (userData?.stripeAccountId === null) {
        return <Navigate to="/req-success" replace />;
      }
      return <Navigate to="/dashboard" replace />;
    } else if (
      userData?.status === "Rejected" ||
      userData?.status === "Pending"
    ) {
      const { status, rejectionReason } = userData;
      return (
        <Navigate
          to="/req-success"
          replace
          state={{
            status,
            rejectionReason: rejectionReason || null,
          }}
        />
      );
    }
  }
  return <Outlet />;
};
