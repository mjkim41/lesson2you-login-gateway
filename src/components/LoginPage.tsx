
import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, User, Lock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Form animation effect
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    
    // Check if username is stored in localStorage
    const savedUsername = localStorage.getItem("rememberedUsername");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
    
    // Focus the first empty field
    if (usernameRef.current && !savedUsername) {
      usernameRef.current.focus();
    } else if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("사용자 이름과 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes only - replace with actual login logic
      if (username === "demo" && password === "password") {
        // Success - show toast and navigate
        if (rememberMe) {
          localStorage.setItem("rememberedUsername", username);
        } else {
          localStorage.removeItem("rememberedUsername");
        }
        
        toast.success("로그인 성공!");
        // navigate("/dashboard");
      } else {
        throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const goToSignup = () => {
    // navigate("/signup");
    toast.info("회원가입 페이지로 이동합니다.");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div 
        className={`w-full max-w-md glass-panel rounded-2xl p-8 transition-all duration-500 
                    ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div 
            className={`text-3xl font-bold text-primary mb-2 transition-all duration-700 delay-100
                       ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            Lesson2You
          </div>
          <h1 
            className={`text-2xl font-medium text-gray-800 transition-all duration-700 delay-200
                      ${mounted ? 'opacity-100' : 'opacity-0'}`}
          >
            로그인
          </h1>
        </div>

        {/* Form */}
        <form 
          className="space-y-4" 
          onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
        >
          {/* Username input */}
          <div 
            className={`relative transition-all duration-500 delay-300
                      ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>
            <input
              ref={usernameRef}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="사용자 이름 또는 이메일"
              className="input-animated pl-10"
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Password input */}
          <div 
            className={`relative transition-all duration-500 delay-400
                      ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="input-animated pl-10 pr-10"
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} className="text-gray-400 hover:text-gray-600 transition-colors" />
              ) : (
                <Eye size={18} className="text-gray-400 hover:text-gray-600 transition-colors" />
              )}
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div 
              className="flex items-center space-x-2 text-destructive text-sm px-3 py-2 rounded-md bg-destructive/10 animate-fade-in"
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Login button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`button-primary group mt-6 transition-all duration-500 delay-500
                      ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>로그인 중...</span>
              </div>
            ) : (
              <>
                <span className="relative z-10 font-medium">로그인</span>
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <div 
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              transition-transform duration-1000">
                  </div>
                </div>
              </>
            )}
          </button>

          {/* Remember username */}
          <div 
            className={`flex items-center transition-all duration-500 delay-600
                      ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="remember-username"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox-custom"
              />
              <div 
                className={`absolute w-3 h-3 left-1 top-1 pointer-events-none
                          transition-opacity duration-200 ease-in-out ${rememberMe ? 'opacity-100' : 'opacity-0'}`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <label htmlFor="remember-username" className="ml-2 text-sm text-gray-600">
              아이디 기억하기
            </label>
          </div>
        </form>
      </div>

      {/* Signup link */}
      <div 
        className={`mt-6 text-center transition-all duration-500 delay-700
                  ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <p className="text-gray-600">
          계정이 없으신가요?{" "}
          <button 
            onClick={goToSignup}
            className="text-primary font-medium hover:text-primary/80 relative group"
          >
            가입하기
            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
