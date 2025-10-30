document.addEventListener('DOMContentLoaded', () => {

    // --- DATA STORE ---
    let currentUser = {
        name: 'Morgan Riley',
        username: 'morgan_r',
        location: 'San Francisco, CA',
        bio: 'High school student passionate about coding, music, and community projects. Let\'s link up!'
    };

    let posts = [
      { name: 'Alex Weber', username: 'alex_w', title: 'Math Tutoring for Middle Schoolers', description: 'Friendly tutoring for algebra and geometry.', category: 'Microjob', tag: 'Tutoring', location: 'Sunset District', zip: '94122' },
      { name: 'Jasmine Lee', username: 'jasmine_l', title: 'Band Guitarist Needed', description: 'Looking for a guitarist for our indie rock band.', category: 'Collab', tag: 'Music', location: 'Downtown', zip: '94102' },
      { name: 'Ben Carter', username: 'ben_c', title: 'Photography for Events', description: 'Affordable photography for local events.', category: 'Microjob', tag: 'Photography', location: 'Mission District', zip: '94110' },
    ];

    let categories = [
      { name: 'Tutoring', icon: 'school' }, { name: 'Music', icon: 'music_note' }, { name: 'Art', icon: 'palette' },
      { name: 'Tech Help', icon: 'computer' }, { name: 'Fitness', icon: 'fitness_center' }, { name: 'Photography', icon: 'photo_camera' },
    ];

    let chats = {
        'jasmine_l': { name: 'Jasmine Lee', messages: [{ text: 'Hey, saw your post!', type: 'received' }] },
        'ben_c': { name: 'Ben Carter', messages: [{ text: 'Your photos look great!', type: 'received' }, { text: 'Thanks! Let me know if you need a photographer.', type: 'sent' }] },
    };
    
    let groups = [
        { name: 'App Dev Crew', members: ['morgan_r', 'olivia_m'] },
        { name: 'Weekend Rockers', members: ['morgan_r', 'jasmine_l'] }
    ];

    // --- DOM ELEMENT REFERENCES ---
    const pages = document.querySelectorAll('.page');
    const navButtons = document.querySelectorAll('.nav-button');
    const fab = document.getElementById('fab');
    const modalOverlay = document.getElementById('modal-overlay');
    const allModals = document.querySelectorAll('.modal');
    // Header
    const header = document.getElementById('app-header');
    const headerMainContent = document.getElementById('header-main-content');
    const profileNavBtn = document.getElementById('profile-nav-btn');
    // Screens
    const homeScreen = document.getElementById('home-screen');
    const postFeed = document.getElementById('post-feed');
    const exploreScreen = document.getElementById('explore-screen');
    const chatScreen = document.getElementById('chat-screen');
    const chatDetailScreen = document.getElementById('chat-detail-screen');
    const groupsScreen = document.getElementById('groups-list');
    const profileScreen = document.getElementById('profile-screen');
    // Filters
    const filterBar = document.getElementById('filter-bar');
    const filterText = document.getElementById('filter-text');
    const clearFilterBtn = document.getElementById('clear-filter-btn');

    // --- EVENT LISTENERS ---
    
    // Bottom Navigation
    navButtons.forEach(button => button.addEventListener('click', () => handleNavigation(button.dataset.page)));

    // Header Profile Button
    profileNavBtn.addEventListener('click', () => handleNavigation('profile-screen'));
    
    // FAB and Modals
    fab.addEventListener('click', () => openModal('new-post-modal'));
    modalOverlay.addEventListener('click', closeAllModals);
    document.querySelectorAll('.cancel-btn').forEach(btn => btn.addEventListener('click', closeAllModals));

    // Form Submissions
    document.getElementById('post-form').addEventListener('submit', handleNewPost);
    document.getElementById('edit-profile-form').addEventListener('submit', handleEditProfile);
    document.getElementById('create-group-form').addEventListener('submit', handleCreateGroup);

    // Dynamic Event Listeners (for elements created by JS)
    postFeed.addEventListener('click', handlePostFeedClick);
    exploreScreen.addEventListener('click', handleExploreClick);
    chatScreen.addEventListener('click', handleChatListClick);
    profileScreen.addEventListener('click', handleProfileClick);
    document.getElementById('create-group-btn').addEventListener('click', () => openModal('create-group-modal'));
    clearFilterBtn.addEventListener('click', () => renderPosts(posts));
    
    // --- NAVIGATION & UI ---

    function handleNavigation(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        
        navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.page === pageId));
        
        updateHeader(pageId);
    }
    
    function updateHeader(pageId) {
        // Reset header to default state
        headerMainContent.innerHTML = `<h2 id="header-title"></h2>`;
        const titleEl = document.getElementById('header-title');

        switch (pageId) {
            case 'home-screen': titleEl.textContent = 'Feed'; break;
            case 'explore-screen': titleEl.textContent = 'Explore'; break;
            case 'chat-screen': titleEl.textContent = 'Chats'; break;
            case 'groups-screen': titleEl.textContent = 'Groups'; break;
            case 'profile-screen': titleEl.textContent = 'Profile'; break;
            case 'chat-detail-screen': // Special case handled by openChatDetail
                break; 
        }
    }

    function openModal(modalId) {
        modalOverlay.classList.remove('hidden');
        document.getElementById(modalId).classList.remove('hidden');
    }

    function closeAllModals() {
        modalOverlay.classList.add('hidden');
        allModals.forEach(modal => modal.classList.add('hidden'));
    }
    
    // --- FEATURE LOGIC ---

    // Home Screen & Posts
    function renderPosts(postArray) {
        filterBar.classList.toggle('hidden', postArray === posts);
        if (postArray !== posts) {
            filterText.textContent = `Showing filtered posts...`;
        }

        if (postArray.length === 0) {
            postFeed.innerHTML = `<p style="text-align:center; color:#888;">No posts found.</p>`;
            return;
        }
        
        postFeed.innerHTML = postArray.map(post => `
            <div class="post-card">
                <div class="card-header">
                    <div class="user-info"><i class="material-icons">account_circle</i><span class="user-name">${post.name}</span></div>
                    <span class="category-tag ${post.category.toLowerCase()}">${post.category}</span>
                </div>
                <h3 class="card-title">${post.title}</h3>
                <p class="card-description">${post.description}</p>
                <div class="card-footer">
                    <span class="post-location"><i class="material-icons">location_on</i>${post.location}, ${post.zip}</span>
                    ${post.username !== currentUser.username ? `<button class="contact-btn" data-username="${post.username}" data-name="${post.name}">Contact</button>` : ''}
                </div>
            </div>
        `).join('');
    }

    function handlePostFeedClick(e) {
        if (e.target.classList.contains('contact-btn')) {
            const { username, name } = e.target.dataset;
            if (!chats[username]) {
                chats[username] = { name: name, messages: [] };
                renderChatList();
            }
            openChatDetail(username);
        }
    }

    function handleNewPost(e) {
        e.preventDefault();
        const newPost = {
            name: currentUser.name,
            username: currentUser.username,
            title: document.getElementById('post-title').value,
            description: document.getElementById('post-description').value,
            category: document.getElementById('post-category').value,
            location: document.getElementById('post-location').value,
            zip: document.getElementById('post-zip').value,
            tag: 'General'
        };
        posts.unshift(newPost);
        renderPosts(posts);
        closeAllModals();
        e.target.reset();
        handleNavigation('home-screen');
    }

    // Explore
    function renderCategories() {
        exploreScreen.innerHTML = `<div class="grid-container">${categories.map(cat => `
            <div class="category-card" data-category="${cat.name}">
                <i class="material-icons">${cat.icon}</i><span>${cat.name}</span>
            </div>`).join('')}</div>`;
    }

    function handleExploreClick(e) {
        const categoryCard = e.target.closest('.category-card');
        if (categoryCard) {
            const category = categoryCard.dataset.category;
            const filtered = posts.filter(post => post.tag === category);
            renderPosts(filtered);
            filterText.textContent = `Showing posts in "${category}"`;
            handleNavigation('home-screen');
        }
    }

    // Chat
    function renderChatList() {
        const chatKeys = Object.keys(chats);
        if (chatKeys.length === 0) {
            chatScreen.innerHTML = `<p style="text-align:center; color:#888;">No conversations yet.</p>`;
            return;
        }
        chatScreen.innerHTML = chatKeys.map(username => {
            const chat = chats[username];
            const lastMsg = chat.messages[chat.messages.length - 1]?.text || 'No messages yet...';
            return `
            <div class="chat-item" data-username="${username}">
                <div class="chat-avatar"><i class="material-icons">account_circle</i></div>
                <div class="chat-details">
                    <div class="chat-name">${chat.name}</div>
                    <div class="chat-message">${lastMsg}</div>
                </div>
            </div>`;
        }).join('');
    }
    
    function handleChatListClick(e) {
        const chatItem = e.target.closest('.chat-item');
        if (chatItem) {
            openChatDetail(chatItem.dataset.username);
        }
    }

    function openChatDetail(username) {
        const chat = chats[username];
        headerMainContent.innerHTML = `
            <button id="back-btn" class="icon-button"><i class="material-icons">arrow_back_ios</i></button>
            <h2 id="header-title">${chat.name}</h2>`;
        document.getElementById('back-btn').addEventListener('click', () => handleNavigation('chat-screen'));

        chatDetailScreen.innerHTML = `
            <div class="messages-container">
                <div> <!-- Reversed flex container -->
                ${chat.messages.map(msg => `<div class="message-bubble ${msg.type}">${msg.text}</div>`).join('')}
                </div>
            </div>
            <div class="message-input-area">
                <input type="text" id="message-input" placeholder="Type a message...">
                <button id="send-msg-btn"><i class="material-icons">send</i></button>
            </div>
        `;
        document.getElementById('send-msg-btn').addEventListener('click', () => {
            const input = document.getElementById('message-input');
            if (input.value.trim()) {
                chat.messages.push({ text: input.value, type: 'sent' });
                input.value = '';
                openChatDetail(username); // Re-render chat
            }
        });

        handleNavigation('chat-detail-screen');
    }

    // Profile
    function renderProfile() {
        profileScreen.innerHTML = `
            <div class="profile-header">
                <img src="https://i.pravatar.cc/150?u=${currentUser.username}" alt="User Photo" class="profile-photo">
                <h2 class="profile-name">${currentUser.name}</h2>
                <p class="profile-location"><i class="material-icons">location_on</i>${currentUser.location}</p>
                <p class="profile-bio">${currentUser.bio}</p>
            </div>
            <div class="profile-options">
                <button class="profile-button" data-action="edit-profile"><i class="material-icons">edit</i>Edit Profile</button>
            </div>`;
    }

    function handleProfileClick(e) {
        if (e.target.closest('[data-action="edit-profile"]')) {
            document.getElementById('edit-name').value = currentUser.name;
            document.getElementById('edit-location').value = currentUser.location;
            document.getElementById('edit-bio').value = currentUser.bio;
            openModal('edit-profile-modal');
        }
    }
    
    function handleEditProfile(e) {
        e.preventDefault();
        currentUser.name = document.getElementById('edit-name').value;
        currentUser.location = document.getElementById('edit-location').value;
        currentUser.bio = document.getElementById('edit-bio').value;
        renderProfile();
        closeAllModals();
    }

    // Groups
    function renderGroups() {
        groupsScreen.innerHTML = groups.map(group => `
            <div class="group-item">
                <h3>${group.name}</h3>
                <p>Members: ${group.members.join(', ')}</p>
            </div>
        `).join('');
    }

    function handleCreateGroup(e) {
        e.preventDefault();
        const name = document.getElementById('group-name').value;
        const members = document.getElementById('group-members').value.split(',').map(u => u.trim());
        if (!members.includes(currentUser.username)) {
            members.unshift(currentUser.username);
        }
        groups.push({ name, members });
        renderGroups();
        closeAllModals();
        e.target.reset();
    }

    // --- INITIALIZE APP ---
    function initializeApp() {
        renderPosts(posts);
        renderCategories();
        renderChatList();
        renderProfile();
        renderGroups();
        handleNavigation('home-screen');
    }

    initializeApp();
});