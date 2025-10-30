import React, { useRef } from 'react';
import type { User, Post } from '../types';
// The useTheme hook is no longer needed.

interface ProfileScreenProps {
    user: User;
    onEditProfile: () => void;
    posts: Post[];
    onToggleComplete: (postId: number) => void;
    onUpdateAvatar: (newAvatarUrl: string) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onEditProfile, posts, onToggleComplete, onUpdateAvatar }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const myPosts = posts.filter(p => p.username === user.username).sort((a, b) => (b.id - a.id));

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const newAvatarUrl = URL.createObjectURL(file);
            onUpdateAvatar(newAvatarUrl);
        }
    };
    
    const formatDuration = (minutes?: number): string => {
        if (!minutes) return '';
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        const parts = [];
        if (h > 0) parts.push(`${h}h`);
        if (m > 0) parts.push(`${m}m`);
        return parts.join(' ');
    };

    return (
        <div className="bg-gray-900 h-full">
            <div className="text-center p-8 bg-gray-800 border-b border-gray-700">
                <div className="relative w-24 h-24 mx-auto mb-4">
                    <img 
                        src={user.avatar} 
                        alt="User Photo" 
                        className="w-24 h-24 rounded-full border-4 border-gray-600 shadow-lg" 
                    />
                    <button
                        onClick={handleAvatarClick}
                        className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-gray-800 hover:bg-blue-600"
                        aria-label="Change profile picture"
                    >
                        <i className="material-icons text-lg">edit</i>
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
                <h2 className="text-2xl font-bold text-gray-200">{user.name}</h2>
                <p className="text-md text-gray-400">@{user.username}</p>
                <p className="flex items-center justify-center gap-1 text-gray-400 mt-2">
                    <i className="material-icons text-base">location_on</i>
                    {user.location}
                </p>
                <p className="text-gray-300 mt-4 max-w-md mx-auto">{user.bio}</p>
            </div>
            <div className="p-4">
                <button 
                    onClick={onEditProfile}
                    className="flex items-center gap-4 w-full p-4 mb-4 bg-gray-800 rounded-lg text-left text-base font-medium shadow-sm hover:bg-gray-700 text-gray-200"
                >
                    <i className="material-icons text-blue-500">edit</i>
                    <span>Edit Profile</span>
                </button>

                {/* The theme toggle switch has been removed from here */}

                <div className="mt-4">
                    <h3 className="text-lg font-bold text-gray-200 mb-3">My Linkups</h3>
                    {myPosts.length === 0 ? (
                        <p className="text-gray-400">You haven't posted any linkups yet.</p>
                    ) : (
                        myPosts.map(post => (
                            <div key={post.id} className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold text-gray-200">{post.title}</div>
                                        <div className="text-sm text-gray-400 mt-1">{post.tag} • {post.category}</div>
                                    </div>
                                    <div className="text-right">
                                        {post.price ? <div className="font-bold text-green-500">${post.price}</div> : null}
                                        {post.completed ? <div className="text-xs text-gray-400 mt-1">Completed</div> : <div className="text-xs text-blue-300 mt-1">Active</div>}
                                    </div>
                                </div>
                                <p className="text-gray-300 mt-2">{post.description}</p>
                                <div className="flex items-center justify-between mt-3">
                                    <div className="text-sm text-gray-400">
                                        {post.linkupDate ? post.linkupDate.replace(/ /g, '/') : 'No scheduled time'}
                                        {post.durationMinutes ? ` • ${formatDuration(post.durationMinutes)}` : ''}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => onToggleComplete(post.id)} className={`py-1 px-3 text-sm font-semibold rounded ${post.completed ? 'bg-yellow-600 text-white' : 'bg-green-600 text-white'}`}>
                                            {post.completed ? 'Mark Active' : 'Mark Completed'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;