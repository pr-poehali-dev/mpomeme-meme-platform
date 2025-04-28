import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { store } from "@/lib/store";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("/placeholder.svg");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Если пользователь уже вошел, перенаправляем на главную
    if (store.getCurrentUser()) {
      navigate("/");
    }
  }, [navigate]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatar(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверяем, что пароли совпадают
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    
    // Пытаемся зарегистрировать пользователя
    const newUser = store.registerUser(username, password, bio, avatar);
    
    if (newUser) {
      // Если успешно, перенаправляем на главную
      navigate("/");
    } else {
      // Если ошибка, показываем сообщение
      setError("Пользователь с таким именем уже существует");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow pb-8 px-4">
        <div className="max-w-md mx-auto border border-black p-4 wonky-border bg-white">
          <h2 className="text-3xl font-impact mb-6 text-center">
            Регистрация нового мемолога
          </h2>
          
          {error && (
            <div className="bg-black text-white p-2 mb-4 wonky-border-white text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center mb-4">
              <div className="w-32 h-32 border-2 border-black relative overflow-hidden wonky-border mb-2">
                <img 
                  src={avatar} 
                  alt="Аватарка" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <label className="cursor-pointer">
                <span className="inline-block py-1 px-3 bg-black text-white font-bold hover:bg-gray-800 transition-colors wonky-border-white">
                  Выбрать аватарку
                </span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            
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
            
            <div>
              <label className="block mb-1 font-bold">Подтвердите пароль:</label>
              <Input 
                type="password"
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border-black wonky-border"
                placeholder="суперсекретный1!"
              />
            </div>
            
            <div>
              <label className="block mb-1 font-bold">О себе:</label>
              <Textarea 
                value={bio} 
                onChange={(e) => setBio(e.target.value)}
                className="resize-none border-black wonky-border h-24"
                placeholder="Я генерирую мемы как жизненный поток!"
              />
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit"
                className="w-full bg-black text-white font-bold hover:bg-gray-800 wonky-border-white"
              >
                Создать профиль
              </Button>
            </div>
            
            <div className="text-center pt-2">
              <p>Уже есть аккаунт? <Link to="/login" className="underline">Войти</Link></p>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
