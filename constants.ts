import type { User, Post, Category, Chat, Group } from './types';

export const CURRENT_USER: User = {
    name: 'Laukik Kolte',
    username: 'laukik_k',
    location: 'Novi, MI',
    bio: 'High school student passionate about coding, music, and community projects. Let\'s link up!',
    avatar: 'https://picsum.photos/seed/morgan_r/150/150'
};

// Change: allow optional linkupDate (MM DD YYYY) and durationMinutes on posts
export const INITIAL_POSTS: (Post & { linkupDate?: string; durationMinutes?: number })[] = [
 { id: 1, name: 'Emily R.', username: 'emily_r', title: 'Piano Tutoring', description: 'Looking for a piano tutor for 1 hour/week, beginner level.', category: 'Microjob', tag: 'Tutoring', location: 'Novi, MI', zip: '48374', price: 30 },
 { id: 2, name: 'Jason M.', username: 'jason_m', title: 'Dog Walker Needed', description: 'Need someone to walk my golden retriever after school.', category: 'Microjob', tag: 'Pet Care', location: 'Farmington Hills, MI', zip: '48336', price: 15 },
 // linkup: add date (MM DD YYYY) and duration in minutes
 { id: 3, name: 'Aisha K.', username: 'aisha_k', title: 'Logo Design for School Club', description: 'Looking for a creative designer for a logo.', category: 'Collab', tag: 'Art', location: 'Novi, MI', zip: '48374', linkupDate: '09 15 2025', durationMinutes: 90 },
 { id: 4, name: 'Liam S.', username: 'liam_s', title: 'Badminton Practice Partner', description: 'Looking for someone to practice badminton with on weekends.', category: 'Collab', tag: 'Fitness', location: 'Northville, MI', zip: '48167', linkupDate: '08 05 2024', durationMinutes: 120 },
 { id: 5, name: 'Sophia P.', username: 'sophia_p', title: 'Algebra II Help', description: 'Need help with Algebra II homework 2–3 hours/week.', category: 'Microjob', tag: 'Tutoring', location: 'Novi, MI', zip: '48374', price: 25 },
 { id: 6, name: 'Ethan L.', username: 'ethan_l', title: 'Guitarist for Band', description: 'Looking for a guitarist for small jam sessions.', category: 'Collab', tag: 'Music', location: 'Wixom, MI', zip: '48393', linkupDate: '07 20 2024', durationMinutes: 180 },
 { id: 7, name: 'Mia T.', username: 'mia_t', title: 'Baking Buddy', description: 'Looking for someone to bake and experiment with desserts.', category: 'Collab', tag: 'Cooking', location: 'Novi, MI', zip: '48374', linkupDate: '06 02 2024', durationMinutes: 150 },
 { id: 8, name: 'Noah C.', username: 'noah_c', title: 'Video Editing Help', description: 'Need a short video edited for school project.', category: 'Microjob', tag: 'Tech Help', location: 'Canton, MI', zip: '48187', price: 50 },
 { id: 9, name: 'Olivia W.', username: 'olivia_w', title: 'Sketching Lessons', description: 'Want someone to teach me basic sketching techniques.', category: 'Collab', tag: 'Art', location: 'Novi, MI', zip: '48374', linkupDate: '10 11 2024', durationMinutes: 60 },
 { id: 10, name: 'Daniel H.', username: 'daniel_h', title: 'Basketball Partner', description: 'Looking for someone to practice basketball after school.', category: 'Collab', tag: 'Fitness', location: 'Livonia, MI', zip: '48150', linkupDate: '09 01 2024', durationMinutes: 90 },
 { id: 11, name: 'Ava G.', username: 'ava_g', title: 'Spanish Homework Help', description: 'Need help with beginner-level Spanish homework.', category: 'Microjob', tag: 'Tutoring', location: 'Novi, MI', zip: '48374', price: 20 },
 { id: 12, name: 'Ryan J.', username: 'ryan_j', title: 'Website Help', description: 'Need help coding a website for a local event.', category: 'Collab', tag: 'Tech Help', location: 'Farmington Hills, MI', zip: '48336' },
 { id: 13, name: 'Chloe B.', username: 'chloe_b', title: 'Photography for Birthday', description: 'Looking for someone to take photos at birthday party.', category: 'Microjob', tag: 'Photography', location: 'Novi, MI', zip: '48374', price: 100 },
 { id: 14, name: 'Jackson K.', username: 'jackson_k', title: 'Skateboard Tricks Partner', description: 'Looking for a buddy to practice skateboarding tricks.', category: 'Collab', tag: 'Sports', location: 'Northville, MI', zip: '48167', linkupDate: '08 18 2024', durationMinutes: 75 },
 { id: 15, name: 'Lily F.', username: 'lily_f', title: 'Piano Duet Partner', description: 'Want someone to play piano duets with on weekends.', category: 'Collab', tag: 'Music', location: 'Novi, MI', zip: '48374', linkupDate: '11 09 2024', durationMinutes: 120 },
 { id: 16, name: 'Owen P.', username: 'owen_p', title: 'Tutoring Physics', description: 'Looking for a high school student to tutor physics.', category: 'Microjob', tag: 'Tutoring', location: 'Canton, MI', zip: '48187', price: 30 },
 { id: 17, name: 'Grace L.', username: 'grace_l', title: 'Art Project Partner', description: 'Looking for someone to collaborate on a school art project.', category: 'Collab', tag: 'Art', location: 'Novi, MI', zip: '48374', linkupDate: '12 03 2024', durationMinutes: 200 },
 { id: 18, name: 'Eli M.', username: 'eli_m', title: 'Basketball Coaching Help', description: 'Need tips to improve basketball skills.', category: 'Microjob', tag: 'Fitness', location: 'Livonia, MI', zip: '48150', price: 20 },
 { id: 19, name: 'Hannah S.', username: 'hannah_s', title: 'Music Recording Partner', description: 'Looking for someone to record music tracks together.', category: 'Collab', tag: 'Music', location: 'Wixom, MI', zip: '48393', linkupDate: '07 28 2024', durationMinutes: 240 },
 { id: 20, name: 'Lucas D.', username: 'lucas_d', title: 'Photography Editing Help', description: 'Need someone to edit photos for school event.', category: 'Microjob', tag: 'Photography', location: 'Novi, MI', zip: '48374', price: 40 }
];


export const CATEGORIES: Category[] = [
 { name: 'Tutoring', icon: 'school' },
 { name: 'Music', icon: 'music_note' },
 { name: 'Art', icon: 'palette' },
 { name: 'Tech Help', icon: 'computer' },
 { name: 'Fitness', icon: 'fitness_center' },
 { name: 'Pet Care', icon: 'pets' },
 { name: 'Photography', icon: 'photo_camera' },
 { name: 'Cooking', icon: 'restaurant' },
 { name: 'Community', icon: 'volunteer_activism' },
 { name: 'Sports', icon: 'sports_soccer' }
];


const now = Date.now();


export const INITIAL_CHATS: Record<string, Chat> = {
 'jason_m': { name: 'Jason M.', messages: [{ text: 'Hey, are you available to walk my dog tomorrow?', sender: { name: 'Jason M.', username: 'jason_m' }, timestamp: now - 1000 * 60 * 60 * 2 }] },
 'aisha_k': { name: 'Aisha K.', messages: [{ text: 'Can you help with the logo design?', sender: { name: 'Aisha K.', username: 'aisha_k' }, timestamp: now - 1000 * 60 * 30 }, { text: 'Sure! I can send a draft today.', sender: { name: 'Morgan Riley', username: 'morgan_r' }, timestamp: now - 1000 * 60 * 28 }] },
 'sophia_p': { name: 'Sophia P.', messages: [{ text: 'Can you help me with Algebra II?', sender: { name: 'Sophia P.', username: 'sophia_p' }, timestamp: now - 1000 * 60 * 45 }] },
 'ethan_l': { name: 'Ethan L.', messages: [{ text: 'When is the next jam session?', sender: { name: 'Ethan L.', username: 'ethan_l' }, timestamp: now - 1000 * 60 * 60 }] },
 'mia_t': { name: 'Mia T.', messages: [{ text: 'Want to bake this weekend?', sender: { name: 'Mia T.', username: 'mia_t' }, timestamp: now - 1000 * 60 * 90 }] },
 'noah_c': { name: 'Noah C.', messages: [{ text: 'Can you edit my video by Friday?', sender: { name: 'Noah C.', username: 'noah_c' }, timestamp: now - 1000 * 60 * 120 }] },
 'olivia_w': { name: 'Olivia W.', messages: [{ text: 'I would like to start sketching lessons.', sender: { name: 'Olivia W.', username: 'olivia_w' }, timestamp: now - 1000 * 60 * 180 }] },
 'daniel_h': { name: 'Daniel H.', messages: [{ text: 'Let’s meet for basketball practice tomorrow.', sender: { name: 'Daniel H.', username: 'daniel_h' }, timestamp: now - 1000 * 60 * 80 }] },
 'ava_g': { name: 'Ava G.', messages: [{ text: 'Can you help me with Spanish homework?', sender: { name: 'Ava G.', username: 'ava_g' }, timestamp: now - 1000 * 60 * 90 }] },
 'ryan_j': { name: 'Ryan J.', messages: [{ text: 'Do you know HTML/CSS?', sender: { name: 'Ryan J.', username: 'ryan_j' }, timestamp: now - 1000 * 60 * 40 }] },
 'chloe_b': { name: 'Chloe B.', messages: [{ text: 'Available to shoot photos this weekend?', sender: { name: 'Chloe B.', username: 'chloe_b' }, timestamp: now - 1000 * 60 * 50 }] },
 'jackson_k': { name: 'Jackson K.', messages: [{ text: 'Skateboarding practice at 5 PM?', sender: { name: 'Jackson K.', username: 'jackson_k' }, timestamp: now - 1000 * 60 * 60 }] }
};


export const INITIAL_GROUPS: Group[] = [
 { id: 1, name: 'Novi Study Buddies', members: ['morgan_r', 'sophia_p'], messages: [{ text: 'Welcome to the study group!', sender: { name: 'Sophia P.', username: 'sophia_p' }, timestamp: now - 1000 * 60 * 60 * 24 }] },
 { id: 2, name: 'Weekend Badminton Club', members: ['liam_s', 'emily_r'], messages: [] },
 { id: 3, name: 'Music Jam Session', members: ['ethan_l', 'mia_t'], messages: [{ text: 'Next practice on Saturday!', sender: { name: 'Ethan L.', username: 'ethan_l' }, timestamp: now - 1000 * 60 * 120 }] },
 { id: 4, name: 'Art Collaborators', members: ['aisha_k', 'grace_l'], messages: [] },
 { id: 5, name: 'Photography Crew', members: ['chloe_b', 'lucas_d', 'noah_c'], messages: [] },
 { 
 id: 6, 
 name: 'Sports Enthusiasts', 
 members: ['daniel_h', 'jackson_k', 'eli_m'], 
 messages: [
 { text: 'Let’s organize a basketball game this weekend!', sender: { name: 'Daniel H.', username: 'daniel_h' }, timestamp: now - 1000 * 60 * 200 },
 { text: 'I’m in!', sender: { name: 'Jackson K.', username: 'jackson_k' }, timestamp: now - 1000 * 60 * 180 },
 { text: 'Count me in as well.', sender: { name: 'Eli M.', username: 'eli_m' }, timestamp: now - 1000 * 60 * 160 }
 ] 
 }
];

// Utility: format a Date / timestamp into "MM DD YYYY"
export function formatDateMMDDYYYY(input: string | number | Date): string {
  const d = input instanceof Date ? input : (typeof input === 'number' ? new Date(input) : new Date(input));
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = String(d.getFullYear());
  return `${mm} ${dd} ${yyyy}`;
}