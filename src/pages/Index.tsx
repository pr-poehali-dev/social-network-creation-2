import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Мок данные для демонстрации
  const posts = [
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
  ];

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
                    { key: 'search', label: 'Поиск', icon: 'Search' }
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
                        <Button variant="ghost" size="sm" className="hover:text-pink-500">
                          <Icon name="Heart" size={16} className="mr-2" />
                          {post.likes}
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
              <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Группы
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {groups.map((group) => (
                      <div key={group.id} className="flex items-center space-x-3 p-4 border border-purple-100 rounded-lg hover:bg-purple-50">
                        <Avatar className="bg-gradient-to-r from-orange-400 to-red-400">
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