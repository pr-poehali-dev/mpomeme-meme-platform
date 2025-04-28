// Импортируем необходимые типы
interface User {
  id: string;
  username: string;
  password: string;
  bio: string;
  avatar: string;
  telegram?: string;
  vk?: string;
  youtube?: string;
  cardNumber?: string;
}

export interface Meme {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  category: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  likes: number;
}

// Локальное хранилище данных
class Store {
  private users: User[] = [];
  private memes: Meme[] = [];
  private currentUser: User | null = null;

  constructor() {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('memes', JSON.stringify(this.memes));
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('currentUser', this.currentUser ? JSON.stringify(this.currentUser) : '');
  }

  private loadFromLocalStorage() {
    const memesStr = localStorage.getItem('memes');
    const usersStr = localStorage.getItem('users');
    const currentUserStr = localStorage.getItem('currentUser');

    if (memesStr) {
      try {
        const parsedMemes = JSON.parse(memesStr);
        this.memes = parsedMemes.map((meme: any) => ({
          ...meme,
          createdAt: new Date(meme.createdAt)
        }));
      } catch (e) {
        console.error('Failed to parse memes from localStorage', e);
        this.memes = [];
      }
    }

    if (usersStr) {
      try {
        this.users = JSON.parse(usersStr);
      } catch (e) {
        console.error('Failed to parse users from localStorage', e);
        this.users = [];
      }
    }

    if (currentUserStr) {
      try {
        this.currentUser = JSON.parse(currentUserStr);
      } catch (e) {
        console.error('Failed to parse current user from localStorage', e);
        this.currentUser = null;
      }
    }
  }

  // Методы для работы с пользователями
  registerUser(username: string, password: string, bio: string, avatar: string): User | null {
    // Проверяем, что пользователя с таким именем еще нет
    if (this.users.some(user => user.username === username)) {
      return null;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      username,
      password, // В реальном приложении нужно хешировать пароль
      bio,
      avatar,
    };

    this.users.push(newUser);
    this.currentUser = newUser;
    this.saveToLocalStorage();
    return newUser;
  }

  loginUser(username: string, password: string): User | null {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      this.saveToLocalStorage();
      return user;
    }
    return null;
  }

  logoutUser(): void {
    this.currentUser = null;
    this.saveToLocalStorage();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  updateUserProfile(updatedUser: Partial<User>): User | null {
    if (!this.currentUser) return null;
    
    const userIndex = this.users.findIndex(u => u.id === this.currentUser!.id);
    if (userIndex === -1) return null;
    
    // Обновляем поля пользователя
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updatedUser,
    };
    
    this.currentUser = this.users[userIndex];
    this.saveToLocalStorage();
    return this.currentUser;
  }

  // Методы для работы с мемами
  addMeme(title: string, imageUrl: string, description: string, category: string): Meme | null {
    if (!this.currentUser) return null;
    
    const newMeme: Meme = {
      id: crypto.randomUUID(),
      title,
      imageUrl,
      description,
      category,
      authorId: this.currentUser.id,
      authorName: this.currentUser.username,
      createdAt: new Date(),
      likes: 0,
    };
    
    this.memes.push(newMeme);
    this.saveToLocalStorage();
    return newMeme;
  }

  getAllMemes(): Meme[] {
    return [...this.memes];
  }

  getMemesSortedByNew(): Meme[] {
    return [...this.memes].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  getMemesSortedByPopular(): Meme[] {
    return [...this.memes].sort((a, b) => b.likes - a.likes);
  }

  likeMeme(memeId: string): Meme | null {
    const memeIndex = this.memes.findIndex(m => m.id === memeId);
    if (memeIndex === -1) return null;
    
    this.memes[memeIndex].likes += 1;
    this.saveToLocalStorage();
    return this.memes[memeIndex];
  }

  getUserMemes(userId: string): Meme[] {
    return this.memes.filter(meme => meme.authorId === userId);
  }

  // Для демо-целей: добавить тестовые данные
  addSampleData() {
    if (this.users.length === 0 && this.memes.length === 0) {
      // Добавляем тестового пользователя
      const demoUser = this.registerUser(
        "мемный_воин2025",
        "password123",
        "Я генерирую мемы как жизненный поток!",
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&auto=format&fit=crop"
      );
      
      if (demoUser) {
        // Добавляем тестовые мемы
        this.addMeme(
          "Когда сдал ЕГЭ на 43 балла",
          "https://images.unsplash.com/photo-1527956041642-a7a644706b14?w=600&auto=format&fit=crop",
          "Я старался как мог, *честно* XD",
          "Образование, ЕГЭ"
        );
        
        this.addMeme(
          "Когда учитель спрашивает, почему не сделал домашку",
          "https://images.unsplash.com/photo-1517383670275-b941a0b4989e?w=600&auto=format&fit=crop",
          "Ну... эээ... у меня кошка заболела...",
          "Школа, Отмазки"
        );
        
        // Выходим, чтобы пользователь мог заново войти
        this.logoutUser();
      }
    }
  }
}

// Создаем и экспортируем экземпляр хранилища
export const store = new Store();

// Для демо-целей добавим тестовые данные
store.addSampleData();
