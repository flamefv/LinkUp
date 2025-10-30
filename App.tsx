import React, { useState, useCallback } from 'react';
import type { Page, ModalType, User, Post, Chat, Group, ChatMessage } from './types';
import { CURRENT_USER, INITIAL_POSTS, CATEGORIES, INITIAL_CHATS, INITIAL_GROUPS } from './constants';

// 'useTheme' import has been completely removed.

import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import CommunityScreen from './screens/CommunityScreen';
import ChatDetailScreen from './screens/ChatDetailScreen';
import GroupDetailScreen from './screens/GroupDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import CreatePostModal from './modals/CreatePostModal';
import EditProfileModal from './modals/EditProfileModal';
import CreateGroupModal from './modals/CreateGroupModal';
import FilterModal from './modals/FilterModal';

const App: React.FC = () => {
    // All theme-related state has been removed.
    const [currentUser, setCurrentUser] = useState<User>(CURRENT_USER);
    const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
    const [chats, setChats] = useState<Record<string, Chat>>(INITIAL_CHATS);
    const [groups, setGroups] = useState<Group[]>(INITIAL_GROUPS);
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [activeFilters, setActiveFilters] = useState<{ category: string | null; location: string | null }>({ category: null, location: null });
    const [activeChatUsername, setActiveChatUsername] = useState<string | null>(null);
    const [activeGroupId, setActiveGroupId] = useState<number | null>(null);

    const handleNavigate = useCallback((page: Page) => {
        if (page !== 'chat-detail') setActiveChatUsername(null);
        if (page !== 'group-detail') setActiveGroupId(null);
        setCurrentPage(page);
    }, []);

    const handleApplyFilters = useCallback((filters: { category: string | null; location: string | null }) => {
        setActiveFilters(filters);
        setActiveModal(null);
    }, []);

    const handleClearFilters = useCallback(() => {
        setActiveFilters({ category: null, location: null });
    }, []);

    const openChatDetail = useCallback((username: string) => {
        setActiveChatUsername(username);
        handleNavigate('chat-detail');
    }, [handleNavigate]);

    const openGroupDetail = useCallback((groupId: number) => {
        setActiveGroupId(groupId);
        handleNavigate('group-detail');
    }, [handleNavigate]);

    const handleContact = useCallback((username: string, name: string) => {
        if (!chats[username]) {
            setChats(prev => ({ ...prev, [username]: { name, messages: [] } }));
        }
        openChatDetail(username);
    }, [chats, openChatDetail]);
    
    const handleSendMessage = useCallback((username: string, text: string) => {
        const newMessage: ChatMessage = { text, sender: { name: currentUser.name, username: currentUser.username }, timestamp: Date.now() };
        setChats(prev => ({
            ...prev,
            [username]: { ...prev[username], messages: [...prev[username].messages, newMessage] }
        }));
    }, [currentUser]);
    
    const handleSendGroupMessage = useCallback((groupId: number, text: string) => {
        const newMessage: ChatMessage = { text, sender: { name: currentUser.name, username: currentUser.username }, timestamp: Date.now() };
        setGroups(prev => prev.map(group => 
            group.id === groupId ? { ...group, messages: [...group.messages, newMessage] } : group
        ));
    }, [currentUser]);

    const handleCreatePost = useCallback((postData: Omit<Post, 'id' | 'name' | 'username'>) => {
        const newPost: Post = { id: Date.now(), name: currentUser.name, username: currentUser.username, ...postData };
        setPosts(prev => [newPost, ...prev]);
        setActiveModal(null);
        handleNavigate('home');
    }, [currentUser, handleNavigate]);

    const handleTogglePostCompleted = useCallback((postId: number) => {
        setPosts(prev => prev.map(p => p.id === postId ? { ...p, completed: !p.completed } : p));
    }, []);

    const handleUpdateProfile = useCallback((newProfile: Omit<User, 'avatar'>) => {
        setCurrentUser(prev => ({...prev, ...newProfile}));
        setActiveModal(null);
    }, []);

    const handleUpdateAvatar = useCallback((newAvatarUrl: string) => {
        setCurrentUser(prev => ({...prev, avatar: newAvatarUrl}));
    }, []);

    const handleCreateGroup = useCallback((name: string, members: string[]) => {
        const newGroup: Group = { id: Date.now(), name, members: [currentUser.username, ...members.filter(m => m !== currentUser.username)], messages: [] };
        setGroups(prev => [...prev, newGroup]);
        setActiveModal(null);
    }, [currentUser.username]);

    const recentUsers = React.useMemo(() => {
        const seen = new Set<string>([currentUser.username]);
        const list: string[] = [];
        [...posts].sort((a,b) => b.id - a.id).forEach(p => { if (!seen.has(p.username)) { seen.add(p.username); list.push(p.username); }});
        Object.keys(chats).forEach(u => { if (!seen.has(u)) { seen.add(u); list.push(u); }});
        return list;
    }, [posts, chats, currentUser.username]);

    const renderPage = () => {
        switch (currentPage) {
            case 'home': return <HomeScreen posts={posts.filter(p => !p.completed)} currentUser={currentUser} activeFilters={activeFilters} onClearFilters={handleClearFilters} onOpenFilters={() => setActiveModal('filters')} onContact={handleContact} />;
            case 'chat': return <CommunityScreen chats={chats} groups={groups} onChatSelect={openChatDetail} onGroupSelect={openGroupDetail} onCreateGroup={() => setActiveModal('create-group')} />;
            case 'chat-detail': const chat = activeChatUsername ? chats[activeChatUsername] : null; return chat ? <ChatDetailScreen chat={chat} currentUser={currentUser} onSendMessage={(text) => handleSendMessage(activeChatUsername!, text)} /> : null;
            case 'group-detail': const group = activeGroupId ? groups.find(g => g.id === activeGroupId) : null; return group ? <GroupDetailScreen group={group} currentUser={currentUser} onSendMessage={(text) => handleSendGroupMessage(activeGroupId!, text)} /> : null;
            case 'profile': return <ProfileScreen user={currentUser} posts={posts} onEditProfile={() => setActiveModal('edit-profile')} onToggleComplete={handleTogglePostCompleted} onUpdateAvatar={handleUpdateAvatar} />;
            default: return <div>Page not found</div>;
        }
    };
    
    const chatPartnerName = activeChatUsername ? chats[activeChatUsername]?.name : undefined;
    const groupName = activeGroupId ? groups.find(g => g.id === activeGroupId)?.name : undefined;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md h-screen max-h-[900px] bg-gray-900 rounded-none sm:rounded-2xl shadow-lg flex flex-col overflow-hidden relative font-sans">
                <Header page={currentPage} chatPartnerName={chatPartnerName} groupName={groupName} onNavigate={handleNavigate} />
                <main className="flex-1 overflow-y-auto bg-gray-900 pb-20">
                    {renderPage()}
                </main>
                <BottomNav currentPage={currentPage} onNavigate={handleNavigate} onFabClick={() => setActiveModal('new-post')} />
                {activeModal === 'new-post' && <CreatePostModal onClose={() => setActiveModal(null)} onSubmit={handleCreatePost} />}
                {activeModal === 'edit-profile' && <EditProfileModal user={currentUser} onClose={() => setActiveModal(null)} onSubmit={handleUpdateProfile} />}
                {activeModal === 'create-group' && <CreateGroupModal onClose={() => setActiveModal(null)} onSubmit={handleCreateGroup} recentUsers={recentUsers} />}
                {activeModal === 'filters' && <FilterModal categories={CATEGORIES} onClose={() => setActiveModal(null)} onApply={handleApplyFilters} />}
            </div>
        </div>
    );
};

export default App;