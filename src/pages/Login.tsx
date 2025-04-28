import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { store } from "@/lib/store";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Если пользователь уже вошел, перенаправляем на главную
    if (store.getCurrentUser()) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Пытаемся авторизовать пользователя
    const user = store.loginUser(username, password);
    
    if (user) {
      // Если успешно, перенаправляем на главную
      navigate("/");
    } else {
      // Если нет, показываем ошибку
      setError("Неверное имя пользователя или пароль");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow pb-8 px-4">
        <div className="max-w-md mx-auto border border-black p-4 wonky-border bg-white">
          <h2 className="text-3xl font-impact mb-6 text-center">
            Вход мемолога
          </h2>
          
          {error && (
            <div className="bg-black text-white p-2 mb-4 wonky-border-white text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-bold">Имя пользователя:</label>
              <Input 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border-black wonky-border"
                placeholder="мемный_воин2025"
              />
            </div>
            
            <div>
              <label className="block mb-1 font-bold">Пароль:</label>
              <Input 
                type="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-black wonky-border"
                placeholder="суперсекретный1!"
              />
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit"
                className="w-full bg-black text-white font-bold hover:bg-gray-800 wonky-border-white"
              >
                Войти
              </Button>
            </div>
            
            <div className="text-center pt-2">
              <p>Еще нет аккаунта? <Link to="/register" className="underline">Зарегистрироваться</Link></p>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
