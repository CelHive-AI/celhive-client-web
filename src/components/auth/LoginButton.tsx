import React from "react";
import { EmailLoginForm } from "./EmailLoginForm";

interface LoginButtonProps {
  onLoginSuccess?: () => void;
  className?: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ 
  onLoginSuccess, 
  className 
}) => {
  return (
    <EmailLoginForm
      className={className}
      onLoginSuccess={onLoginSuccess}
    />
  );
};
