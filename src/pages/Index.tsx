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
  const [isCreateChatOpen, setIsCreateChatOpen] = useState(false);
  const [myGroups, setMyGroups] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [myChats, setMyChats] = useState([]);
  const [newChatName, setNewChatName] = useState('');
  const [myFriends, setMyFriends] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  // Генерация уникального кода друга
  useEffect(() => {
    const generateFriendCode = () => {
      return 'MIN' + Math.random().toString(36).substr(2, 6).toUpperCase();
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
      
      setMyPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + (likedPosts.has(postId) ? -1 : 1) }
          : post
      ));
      
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
      avatar: '⚫'
    };
    
    setMyGroups(prev => [...prev, newGroup]);
    setNewGroupName('');
    setNewGroupDescription('');
    setIsCreateGroupOpen(false);
  };

  // Создание чата
  const createChat = () => {
    if (!newChatName.trim()) return;
    
    const newChat = {
      id: Date.now(),
      name: newChatName,
      lastMessage: 'Чат создан',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      unread: 0,
      online: true,
      isOwner: true
    };
    
    setMyChats(prev => [...prev, newChat]);
    setNewChatName('');
    setIsCreateChatOpen(false);
  };

  // Добавление друга по коду
  const addFriendByCode = () => {
    if (!addFriendCode.trim()) return;
    
    const newRequest = {
      id: Date.now(),
      code: addFriendCode,
      name: 'Новый пользователь',
      status: 'pending'
    };
    
    setPendingRequests(prev => [...prev, newRequest]);
    setAddFriendCode('');
    setIsAddFriendOpen(false);
  };

  // Принятие заявки в друзья
  const acceptFriendRequest = (requestId) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (request) {
      const newFriend = {
        id: Date.now(),
        name: request.name,
        status: 'Онлайн',
        online: true
      };
      
      setMyFriends(prev => [...prev, newFriend]);
      setPendingRequests(prev => prev.filter(r => r.id !== requestId));
    }
  };

  // Отклонение заявки в друзья
  const rejectFriendRequest = (requestId) => {
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
  };

  // Создание поста
  const createPost = () => {
    if (!newPost.trim()) return;
    
    const post = {
      id: Date.now(),
      author: 'Вы',
      avatar: '⚫',
      time: 'только что',
      content: newPost,
      likes: 0,
      comments: 0
    };
    
    setMyPosts(prev => [post, ...prev]);
    setNewPost('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-black">
                ⚫ Min
              </div>
            </div>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Поиск..."
                  className="pl-10 bg-white border-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="Bell" size={20} />
                {pendingRequests.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500 text-white">
                    {pendingRequests.length}
                  </Badge>
                )}
              </Button>
              
              <Dialog open={isAddFriendOpen} onOpenChange={setIsAddFriendOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Icon name="UserPlus" size={20} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-black">
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
                        placeholder="Например: MIN1A2B3C"
                        value={addFriendCode}
                        onChange={(e) => setAddFriendCode(e.target.value.toUpperCase())}
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={addFriendByCode} className="w-full bg-red-500 hover:bg-red-600 text-white">
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
                    <DialogTitle className="text-black">
                      Настройки
                    </DialogTitle>
                    <DialogDescription>
                      Ваш уникальный код для добавления в друзья
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Label className="text-sm font-medium text-gray-700">Ваш код друга:</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <code className="flex-1 p-2 bg-white rounded border text-lg font-mono font-bold text-red-600">
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
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <h4 className="font-medium text-red-800 mb-2">🚀 Хостинг и публикация</h4>
                      <p className="text-sm text-red-700">
                        Чтобы поделиться этим сайтом с друзьями, нажмите кнопку <strong>"Опубликовать"</strong> в редакторе poehali.dev. Ваш сайт будет автоматически размещен в интернете!
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Avatar className="ring-2 ring-black">
                <AvatarFallback className="bg-black text-white">⚫</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-gray-200">
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
                          ? 'bg-red-500 text-white hover:bg-red-600' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab(key)}
                    >
                      <Icon name={icon} size={18} className="mr-2" />
                      {label}
                      {key === 'requests' && pendingRequests.length > 0 && (
                        <Badge className="ml-auto h-4 w-4 p-0 text-xs bg-red-500 text-white">
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
                <Card className="bg-white border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <Avatar>
                        <AvatarFallback className="bg-black text-white">⚫</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="Что у вас нового?"
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          className="mb-4 bg-white border-gray-300 resize-none"
                          rows={3}
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
                          <Button onClick={createPost} className="bg-red-500 hover:bg-red-600 text-white">
                            Опубликовать
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts */}
                {myPosts.length === 0 ? (
                  <Card className="bg-white border-gray-200">
                    <CardContent className="p-8 text-center">
                      <Icon name="MessageSquare" size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">Пока нет постов</p>
                      <p className="text-sm text-gray-400 mt-2">Создайте свой первый пост выше</p>
                    </CardContent>
                  </Card>
                ) : (
                  myPosts.map((post) => (
                    <Card key={post.id} className="bg-white border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <Avatar>
                            <AvatarFallback className="bg-black text-white">
                              {post.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{post.author}</h3>
                            <p className="text-sm text-gray-500">{post.time}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{post.content}</p>
                        
                        <div className="flex items-center space-x-6 text-gray-500">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`hover:text-red-500 transition-all duration-200 ${likedPosts.has(post.id) ? 'text-red-500' : ''}`}
                            onClick={() => toggleLike(post.id)}
                          >
                            <Icon 
                              name="Heart" 
                              size={16} 
                              className={`mr-2 transition-all duration-200 ${animatingLikes.has(post.id) ? 'animate-scale-in' : ''} ${likedPosts.has(post.id) ? 'fill-current' : ''}`}
                            />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:text-gray-700">
                            <Icon name="MessageCircle" size={16} className="mr-2" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:text-gray-700">
                            <Icon name="Share2" size={16} className="mr-2" />
                            Поделиться
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}

            {activeTab === 'messages' && (
              <Card className="bg-white border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <h2 className="text-xl font-semibold text-black">
                    Сообщения
                  </h2>
                  <Dialog open={isCreateChatOpen} onOpenChange={setIsCreateChatOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Создать чат
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-black">
                          Создать чат
                        </DialogTitle>
                        <DialogDescription>
                          Создайте новый чат для общения
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="chat-name">Название чата</Label>
                          <Input
                            id="chat-name"
                            placeholder="Введите название чата"
                            value={newChatName}
                            onChange={(e) => setNewChatName(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <Button onClick={createChat} className="w-full bg-red-500 hover:bg-red-600 text-white">
                          Создать чат
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {myChats.length === 0 ? (
                    <div className="text-center py-8">
                      <Icon name="MessageCircle" size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">Нет чатов</p>
                      <p className="text-sm text-gray-400 mt-2">Создайте свой первый чат</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myChats.map((chat) => (
                        <div key={chat.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer border border-gray-100">
                          <div className="relative">
                            <Avatar>
                              <AvatarFallback className="bg-black text-white">
                                {chat.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            {chat.online && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-medium">{chat.name}</h3>
                                {chat.isOwner && <Badge variant="outline" className="text-xs">Владелец</Badge>}
                              </div>
                              <span className="text-xs text-gray-500">{chat.time}</span>
                            </div>
                            <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                          </div>
                          {chat.unread > 0 && (
                            <Badge className="bg-red-500 text-white">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'profile' && (
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-black">
                      <AvatarFallback className="text-2xl bg-black text-white">⚫</AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-bold mb-2 text-black">Пользователь Min</h1>
                    <p className="text-gray-600 mb-4">Новый участник сообщества</p>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-black">{myPosts.length}</div>
                        <div className="text-sm text-gray-500">Постов</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-500">{myFriends.length}</div>
                        <div className="text-sm text-gray-500">Друзей</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-black">{myGroups.length}</div>
                        <div className="text-sm text-gray-500">Групп</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'friends' && (
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-black">
                    Друзья
                  </h2>
                </CardHeader>
                <CardContent>
                  {myFriends.length === 0 ? (
                    <div className="text-center py-8">
                      <Icon name="Users" size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">Пока нет друзей</p>
                      <p className="text-sm text-gray-400 mt-2">Добавьте друзей по коду или через поиск</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myFriends.map((friend) => (
                        <div key={friend.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                          <div className="relative">
                            <Avatar>
                              <AvatarFallback className="bg-black text-white">
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
                          <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                            <Icon name="MessageCircle" size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'groups' && (
              <div className="space-y-6">
                <Card className="bg-white border-gray-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <h2 className="text-xl font-semibold text-black">
                      Мои группы
                    </h2>
                    <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                          <Icon name="Plus" size={16} className="mr-2" />
                          Создать
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-black">
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
                              placeholder="Введите название группы"
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
                          <Button onClick={createGroup} className="w-full bg-red-500 hover:bg-red-600 text-white">
                            Создать группу
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    {myGroups.length === 0 ? (
                      <div className="text-center py-8">
                        <Icon name="Users2" size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">Нет групп</p>
                        <p className="text-sm text-gray-400 mt-2">Создайте свою первую группу</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {myGroups.map((group) => (
                          <div key={group.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <Avatar className="bg-black">
                              <AvatarFallback className="text-white">
                                {group.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-medium">{group.name}</h3>
                                {group.owner && <Badge variant="outline" className="text-xs">Владелец</Badge>}
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
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === 'requests' && (
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-black">
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
                        <div key={request.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                          <Avatar>
                            <AvatarFallback className="bg-black text-white">
                              ⚫
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-medium">{request.name}</h3>
                            <p className="text-sm text-gray-500">Код: {request.code}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              className="bg-green-500 hover:bg-green-600 text-white"
                              onClick={() => acceptFriendRequest(request.id)}
                            >
                              <Icon name="Check" size={14} className="mr-1" />
                              Принять
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => rejectFriendRequest(request.id)}
                            >
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
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <h3 className="font-semibold text-gray-900">Онлайн</h3>
                </CardHeader>
                <CardContent>
                  {myFriends.filter(f => f.online).length === 0 ? (
                    <p className="text-sm text-gray-500 text-center">Нет друзей онлайн</p>
                  ) : (
                    <div className="space-y-3">
                      {myFriends.filter(f => f.online).map((friend) => (
                        <div key={friend.id} className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-black text-white text-xs">
                                {friend.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                          </div>
                          <span className="text-sm font-medium">{friend.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <h3 className="font-semibold text-gray-900">Статистика</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Постов</span>
                      <span className="text-sm font-medium text-black">{myPosts.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Друзей</span>
                      <span className="text-sm font-medium text-red-500">{myFriends.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Групп</span>
                      <span className="text-sm font-medium text-black">{myGroups.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Чатов</span>
                      <span className="text-sm font-medium text-black">{myChats.length}</span>
                    </div>
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