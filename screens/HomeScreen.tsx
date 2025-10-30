import React from 'react';
import type { Post, User } from '../types';

interface PostCardProps {
    post: Post;
    isOwnPost: boolean;
    onContact: (username: string, name: string) => void;
}

// Formats "MM DD YYYY" to "MM / DD / YYYY"
const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    const parts = dateString.split(' ');
    if (parts.length !== 3) return dateString;
    return `${parts[0]} / ${parts[1]} / ${parts[2]}`;
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

const PostCard: React.FC<PostCardProps> = ({ post, isOwnPost, onContact }) => {
    const categoryColor = post.category === 'Microjob' ? 'bg-orange-500' : 'bg-blue-500';

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <img src={`https://picsum.photos/seed/${post.username}/40/40`} alt={post.name} className="w-10 h-10 rounded-full" />
                    <span className="font-bold text-gray-800 dark:text-gray-200">{post.name}</span>
                </div>
                <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${categoryColor}`}>{post.category}</span>
                    {post.category === 'Microjob' && post.price && (
                        <p className="font-bold text-lg text-green-500 mt-1">${post.price}</p>
                    )}
                </div>
            </div>
            <h3 className="text-lg font-bold text-black dark:text-white mb-1">{post.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{post.description}</p>
            
            {(post.linkupDate || post.durationMinutes) && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                    {post.linkupDate && (
                        <div className="flex items-center gap-1.5">
                            <i className="material-icons text-base">event</i>
                            <span>{formatDate(post.linkupDate)}</span>
                        </div>
                    )}
                    {post.durationMinutes && (
                         <div className="flex items-center gap-1.5">
                            <i className="material-icons text-base">hourglass_top</i>
                            <span>{formatDuration(post.durationMinutes)}</span>
                        </div>
                    )}
                </div>
            )}

            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                    <i className="material-icons text-base">location_on</i>{post.location}, {post.zip}
                </span>
                {!isOwnPost && (
                    <button onClick={() => onContact(post.username, post.name)} className="bg-blue-500 text-white rounded-lg py-2 px-4 font-semibold text-sm hover:bg-blue-600 transition-colors">
                        Contact
                    </button>
                )}
            </div>
        </div>
    );
};

// ... a bunch of other code
interface HomeScreenProps {
    posts: Post[];
    currentUser: User;
    activeFilters: { category: string | null; location: string | null };
    onClearFilters: () => void;
    onOpenFilters: () => void;
    onContact: (username: string, name: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ posts, currentUser, activeFilters, onClearFilters, onOpenFilters, onContact }) => {
    const filteredPosts = posts.filter(post => {
        const categoryMatch = !activeFilters.category || post.tag === activeFilters.category;
        const locationText = activeFilters.location?.toLowerCase() ?? '';
        const locationMatch = !locationText || post.location.toLowerCase().includes(locationText) || post.zip.toLowerCase().includes(locationText);
        return categoryMatch && locationMatch;
    });

    const hasFilters = activeFilters.category || activeFilters.location;

    const getFilterText = () => {
        let parts = [];
        if (activeFilters.category) parts.push(`Category: "${activeFilters.category}"`);
        if (activeFilters.location) parts.push(`Location: "${activeFilters.location}"`);
        return `Filtering by ${parts.join(' & ')}`;
    }

    return (
        <div className="h-full">
            <div className="p-4 pb-0">
                <button onClick={onOpenFilters} className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i className="material-icons text-blue-500">filter_list</i>
                    <span>Filters</span>
                </button>
            </div>
            {hasFilters && (
                <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/50 p-3 mx-4 mt-4 rounded-lg">
                    <p className="font-medium text-blue-700 dark:text-blue-200 text-sm">{getFilterText()}</p>
                    <button onClick={onClearFilters} className="border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500 rounded-full px-3 py-1 text-xs font-semibold">Clear</button>
                </div>
            )}
            <div className="p-4">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                        <PostCard 
                            key={post.id} 
                            post={post}
                            isOwnPost={post.username === currentUser.username}
                            onContact={onContact}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No posts found.</p>
                )}
            </div>
        </div>
    );
};

export default HomeScreen;