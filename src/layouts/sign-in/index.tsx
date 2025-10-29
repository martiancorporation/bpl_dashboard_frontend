"use client";
import React from "react";
import Body from "./body";
import API from "@/api";
import { toast } from "react-toastify";
import useSessionStore from "@/store/session";
import { getEncodedUserAgent } from "@/utility";
import { useNavigate } from "react-router-dom";

/**********************************
 * Interfaces and Types
 **********************************/
interface LoginFormData {
  email: string;
  password: string;
}

/**********************************
 * Component
 **********************************/
const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const login = useSessionStore((state) => state.login);
  const isLoading = useSessionStore((state) => state.isLoading);
  const loadingStart = useSessionStore((state) => state.loadingStart);
  const loadingStop = useSessionStore((state) => state.loadingStop);

  const loginSubmit = (data: LoginFormData) => {
    const formData = {
      ...data,
      device: getEncodedUserAgent(),
    };
    loadingStart();
    API.auth
      .SignIn(formData)
      .then((response) => {
        if (response) {
          login(response);
          toast.success("Logged in successfully!");
          navigate("/dashboard");
        }
      })
      .finally(() => {
        loadingStop();
      });
  };

  const _this = {
    isLoading,
    loginSubmit,
  };
  return <Body {..._this} />;
};

export default SignIn;
