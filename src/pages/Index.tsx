import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [friendCode, setFriendCode] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [addFriendCode, setAddFriendCode] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [animatingLikes, setAnimatingLikes] = useState(new Set());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [myGroups, setMyGroups] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  // Генерация уникального кода друга
  useEffect(() => {
    const generateFriendCode = () => {
      return 'SC' + Math.random().toString(36).substr(2, 8).toUpperCase();
    };
    setFriendCode(generateFriendCode());
  }, []);

  // Функция лайков с анимацией
  const toggleLike = (postId) => {
    setAnimatingLikes(prev => new Set([...prev, postId]));
    
    setTimeout(() => {
      setLikedPosts(prev => {
        const newLiked = new Set(prev);
        if (newLiked.has(postId)) {
          newLiked.delete(postId);
        } else {
          newLiked.add(postId);
        }
        return newLiked;
      });
      
      setAnimatingLikes(prev => {
        const newAnimating = new Set(prev);
        newAnimating.delete(postId);
        return newAnimating;
      });
    }, 150);
  };

  // Создание группы
  const createGroup = () => {
    if (!newGroupName.trim()) return;
    
    const newGroup = {
      id: Date.now(),
      name: newGroupName,
      description: newGroupDescription,
      members: 1,
      owner: true,
      avatar: '🚀'
    };
    
    setMyGroups(prev => [...prev, newGroup]);
    setNewGroupName('');
    setNewGroupDescription('');
    setIsCreateGroupOpen(false);
  };

  // Добавление друга по коду
  const addFriendByCode = () => {
    if (!addFriendCode.trim()) return;
    
    const newRequest = {
      id: Date.now(),
      code: addFriendCode,
      name: 'Новый космонавт',
      status: 'pending'
    };
    
    setPendingRequests(prev => [...prev, newRequest]);
    setAddFriendCode('');
    setIsAddFriendOpen(false);
  };

  // Мок данные для демонстрации
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Анна Космос',
      avatar: '👩‍🚀',
      time: '2 ч назад',
      content: 'Только что вернулась с орбитальной станции! Невероятные виды на нашу планету 🌍✨',
      likes: 42,
      comments: 8,
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&h=300&fit=crop'
    },
    {
      id: 2,
      author: 'Макс Галактика',
      avatar: '👨‍🚀',
      time: '4 ч назад',
      content: 'Новый проект по исследованию Марса стартует завтра! Кто готов к приключениям? 🚀',
      likes: 73,
      comments: 15
    },
    {
      id: 3,
      author: 'Лиза Звёздная',
      avatar: '👩‍💼',
      time: '6 ч назад',
      content: 'Делюсь результатами эксперимента в невесомости. Наука не стоит на месте! 🧪⚗️',
      likes: 28,
      comments: 5
    }
  ]);

  const chats = [
    { id: 1, name: 'Команда Альфа', lastMessage: 'Готовы к запуску!', time: '12:34', unread: 3, online: true },
    { id: 2, name: 'Исследователи', lastMessage: 'Отчет готов', time: '11:22', unread: 0, online: true },
    { id: 3, name: 'База Марс', lastMessage: 'Связь стабильна', time: '10:15', unread: 1, online: false }
  ];

  const friends = [
    { id: 1, name: 'Анна Космос', status: 'На орбите', online: true },
    { id: 2, name: 'Макс Галактика', status: 'Готовлюсь к полету', online: true },
    { id: 3, name: 'Лиза Звёздная', status: 'В лаборатории', online: false }
  ];

  const groups = [
    { id: 1, name: 'Космические Исследователи', members: 1234 },
    { id: 2, name: 'Марс 2030', members: 856 },
    { id: 3, name: 'Звездные Путешественники', members: 2341 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🚀 SocialSpace
              </div>
            </div>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Поиск людей, групп, постов..."
                  className="pl-10 bg-white/70"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="Bell" size={20} />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-gradient-to-r from-pink-500 to-purple-500">
                  3
                </Badge>
              </Button>
              
              <Dialog open={isAddFriendOpen} onOpenChange={setIsAddFriendOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="UserPlus" size={20} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Добавить друга
                    </DialogTitle>
                    <DialogDescription>
                      Введите код друга для отправки заявки
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="friend-code">Код друга</Label>
                      <Input
                        id="friend-code"
                        placeholder="Например: SC12AB34CD"
                        value={addFriendCode}
                        onChange={(e) => setAddFriendCode(e.target.value.toUpperCase())}
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={addFriendByCode} className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                      Отправить заявку
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Icon name="Settings" size={20} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Настройки
                    </DialogTitle>
                    <DialogDescription>
                      Ваш уникальный код для добавления в друзья
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                      <Label className="text-sm font-medium text-gray-700">Ваш код друга:</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <code className="flex-1 p-2 bg-white rounded border text-lg font-mono font-bold text-purple-600">
                          {friendCode}
                        </code>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => navigator.clipboard.writeText(friendCode)}
                        >
                          <Icon name="Copy" size={16} />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Поделитесь этим кодом с друзьями для добавления в контакты
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Avatar className="ring-2 ring-gradient-to-r from-purple-400 to-pink-400">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                <AvatarFallback>Я</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
              <CardContent className="p-6">
                <nav className="space-y-2">
                  {[
                    { key: 'feed', label: 'Лента', icon: 'Home' },
                    { key: 'messages', label: 'Сообщения', icon: 'MessageCircle' },
                    { key: 'profile', label: 'Профиль', icon: 'User' },
                    { key: 'friends', label: 'Друзья', icon: 'Users' },
                    { key: 'groups', label: 'Группы', icon: 'Users2' },
                    { key: 'search', label: 'Поиск', icon: 'Search' },
                    { key: 'requests', label: 'Заявки', icon: 'UserCheck' }
                  ].map(({ key, label, icon }) => (
                    <Button
                      key={key}
                      variant={activeTab === key ? 'default' : 'ghost'}
                      className={`w-full justify-start ${
                        activeTab === key 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                          : 'hover:bg-purple-50'
                      }`}
                      onClick={() => setActiveTab(key)}
                    >
                      <Icon name={icon} size={18} className="mr-2" />
                      {label}
                      {key === 'requests' && pendingRequests.length > 0 && (
                        <Badge className="ml-auto h-4 w-4 p-0 text-xs bg-gradient-to-r from-pink-500 to-purple-500">
                          {pendingRequests.length}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'feed' && (
              <div className="space-y-6">
                {/* Create Post */}
                <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <Avatar>
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                        <AvatarFallback>Я</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Input
                          placeholder="Что нового в космосе?"
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          className="mb-4 bg-white/70"
                        />
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Icon name="Image" size={16} className="mr-2" />
                              Фото
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Video" size={16} className="mr-2" />
                              Видео
                            </Button>
                          </div>
                          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                            Опубликовать
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts */}
                {posts.map((post) => (
                  <Card key={post.id} className="bg-white/70 backdrop-blur-sm border-purple-100 hover:shadow-lg transition-shadow animate-fade-in">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">
                            {post.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{post.author}</h3>
                          <p className="text-sm text-gray-500">{post.time}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      
                      {post.image && (
                        <img 
                          src={post.image} 
                          alt="Post image" 
                          className="w-full rounded-lg mb-4"
                        />
                      )}
                      
                      <div className="flex items-center space-x-6 text-gray-500">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`hover:text-pink-500 transition-all duration-200 ${likedPosts.has(post.id) ? 'text-pink-500' : ''}`}
                          onClick={() => toggleLike(post.id)}
                        >
                          <Icon 
                            name="Heart" 
                            size={16} 
                            className={`mr-2 transition-all duration-200 ${animatingLikes.has(post.id) ? 'animate-scale-in' : ''} ${likedPosts.has(post.id) ? 'fill-current' : ''}`}
                          />
                          {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:text-blue-500">
                          <Icon name="MessageCircle" size={16} className="mr-2" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:text-green-500">
                          <Icon name="Share2" size={16} className="mr-2" />
                          Поделиться
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'messages' && (
              <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Сообщения
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {chats.map((chat) => (
                      <div key={chat.id} className="flex items-center space-x-3 p-3 hover:bg-purple-50 rounded-lg cursor-pointer">
                        <div className="relative">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-400 text-white">
                              {chat.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {chat.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{chat.name}</h3>
                            <span className="text-xs text-gray-500">{chat.time}</span>
                          </div>
                          <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && (
                          <Badge className="bg-gradient-to-r from-pink-500 to-purple-500">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'profile' && (
              <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-gradient-to-r from-purple-400 to-pink-400">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                      <AvatarFallback className="text-2xl">🚀</AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-bold mb-2">Космический Путешественник</h1>
                    <p className="text-gray-600 mb-4">Исследователь галактик и новых миров</p>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-purple-600">127</div>
                        <div className="text-sm text-gray-500">Постов</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-pink-600">1.2k</div>
                        <div className="text-sm text-gray-500">Друзей</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">15</div>
                        <div className="text-sm text-gray-500">Групп</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'friends' && (
              <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Друзья
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {friends.map((friend) => (
                      <div key={friend.id} className="flex items-center space-x-3 p-3 hover:bg-purple-50 rounded-lg">
                        <div className="relative">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-400 text-white">
                              {friend.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {friend.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{friend.name}</h3>
                          <p className="text-sm text-gray-500">{friend.status}</p>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                          <Icon name="MessageCircle" size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'groups' && (
              <div className="space-y-6">
                <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Мои группы
                    </h2>
                    <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                          <Icon name="Plus" size={16} className="mr-2" />
                          Создать
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Создать группу
                          </DialogTitle>
                          <DialogDescription>
                            Создайте свою группу для общения с единомышленниками
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="group-name">Название группы</Label>
                            <Input
                              id="group-name"
                              placeholder="Космические исследователи"
                              value={newGroupName}
                              onChange={(e) => setNewGroupName(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="group-description">Описание</Label>
                            <Textarea
                              id="group-description"
                              placeholder="Расскажите о группе..."
                              value={newGroupDescription}
                              onChange={(e) => setNewGroupDescription(e.target.value)}
                              className="mt-1"
                              rows={3}
                            />
                          </div>
                          <Button onClick={createGroup} className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                            Создать группу
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myGroups.map((group) => (
                        <div key={group.id} className="flex items-center space-x-3 p-4 border border-purple-100 rounded-lg hover:bg-purple-50">
                          <Avatar className="bg-gradient-to-r from-orange-400 to-red-400">
                            <AvatarFallback className="text-white">
                              {group.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium">{group.name}</h3>
                              {group.owner && <Badge variant="secondary" className="text-xs">Владелец</Badge>}
                            </div>
                            <p className="text-sm text-gray-500">{group.members} участников</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Icon name="Settings" size={14} className="mr-1" />
                            Управление
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-900">Рекомендуемые группы</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {groups.map((group) => (
                        <div key={group.id} className="flex items-center space-x-3 p-4 border border-purple-100 rounded-lg hover:bg-purple-50">
                          <Avatar className="bg-gradient-to-r from-blue-400 to-green-400">
                            <AvatarFallback className="text-white">
                              {group.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-medium">{group.name}</h3>
                            <p className="text-sm text-gray-500">{group.members} участников</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Присоединиться
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === 'requests' && (
              <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Заявки в друзья
                  </h2>
                </CardHeader>
                <CardContent>
                  {pendingRequests.length === 0 ? (
                    <div className="text-center py-8">
                      <Icon name="UserCheck" size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">Пока нет заявок в друзья</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Поделитесь своим кодом с друзьями или добавьте кого-то по коду
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingRequests.map((request) => (
                        <div key={request.id} className="flex items-center space-x-3 p-4 border border-purple-100 rounded-lg">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white">
                              🚀
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-medium">{request.name}</h3>
                            <p className="text-sm text-gray-500">Код: {request.code}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-500">
                              <Icon name="Check" size={14} className="mr-1" />
                              Принять
                            </Button>
                            <Button size="sm" variant="outline">
                              <Icon name="X" size={14} className="mr-1" />
                              Отклонить
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Online Friends */}
              <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <h3 className="font-semibold text-gray-900">Онлайн сейчас</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {friends.filter(f => f.online).map((friend) => (
                      <div key={friend.id} className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-400 text-white text-xs">
                              {friend.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                        </div>
                        <span className="text-sm font-medium">{friend.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trending */}
              <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <h3 className="font-semibold text-gray-900">Актуальные темы</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['#КосмосМиссия', '#МарсЭкспедиция', '#НевесомостьЖизнь', '#ЗвездныйПуть'].map((tag) => (
                      <div key={tag} className="flex items-center justify-between">
                        <span className="text-sm text-purple-600 hover:text-purple-800 cursor-pointer font-medium">
                          {tag}
                        </span>
                        <Icon name="TrendingUp" size={14} className="text-green-500" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;