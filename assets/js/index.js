// === DIALOGS ===

// DOM nodes
const newBookmarkModal = document.getElementById('new-bookmark-modal');
const manageBookmarksModal = document.getElementById('manage-bookmarks-modal');
// const settingsModal = document.querySelector(".settings-modal");
const editBookmarkModal = document.getElementById('edit-bookmark-modal');
// const wipeAllBookmarksModal = document.querySelector(".wipe-bookmarks-modal");

function openModal(modal) {
    modal.showModal();
}

function closeModal(modal) {
    modal.close();
}

// Event listeners

document.querySelectorAll('.site-header .header-btn').forEach(e => {
    e.addEventListener('click', () => {
        openModal(document.getElementById(e.dataset.modal))
    })
})

document.querySelectorAll('.modal-header .modal-close-btn').forEach(e => {
    e.addEventListener('click', () => {
        closeModal(document.getElementById(e.dataset.modal))
    })
})

// === MAIN SECTION ===

const bookmarksContainer = document.querySelector('.bookmarks-container');
const bookmarksList = document.getElementById('bookmarks-list');

let bookmarksArray = [];
let localStorageBookmarks = JSON.parse(localStorage.getItem("blockBookmarks"));

// Getting bookmarks from local storage
if (localStorageBookmarks) {
    const processedLocalStorageBookmarks = [];
    /* 
    URL objects do not save to localStorage as objects but rather as strings with the url addresses only, due to JSON.stringify
    Therefore, in the 'forEach' loop every string from the localStorage gets turned into an object that is
    then pushed to the 'processedLocalStorageBookmarks' array. At the end, 'bookmarksArray' value is
    assigned to 'processedLocalStorageBookmarks'.
    */
    localStorageBookmarks.forEach((e) => {
        processedLocalStorageBookmarks.push(new URL(e))
    })
    bookmarksArray = processedLocalStorageBookmarks;
    // renderBookmarks(bookmarksArray, bookmarksList); -- commented out until implementation of bookmarksList
}

// Adding a new bookmark

const newBookmarkForm = document.querySelector('.new-bookmark-form');

newBookmarkForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newBookmarkFormData = new FormData(newBookmarkForm);

    if (!newBookmarkFormData.get('bookmark-url').includes('https://')) {
        // If provided bookmark URL doesn't include the 'https://' prefix, it gets added.
        let newBookmarkURL = newBookmarkFormData.get('bookmark-url');
        newBookmarkURL = "https://" + newBookmarkURL;

        const newBookmark = new URL(newBookmarkURL);
        newBookmark.title = newBookmarkFormData.get('bookmark-title');
        // if (newBookmarkFormData.get('bookmark-title') === "" || newBookmarkFormData.get('bookmark-title') === undefined) {
        //     newBookmark.title = newBookmarkFormData.get('bookmark-url');
        // } else {
        //     newBookmark.title = newBookmarkFormData.get('bookmark-title');
        // }

        bookmarksArray.push(newBookmark);
        localStorage.setItem("blockBookmarks", JSON.stringify(bookmarksArray));
        renderBookmarks(bookmarksContainer, bookmarksList, bookmarksArray);

        closeModal(newBookmarkModal);
    } else {
        const newBookmark = new URL(newBookmarkFormData.get('bookmark-url'));
        newBookmark.title = newBookmarkFormData.get('bookmark-title');

        // if (newBookmarkFormData.get('bookmark-title') === "" || newBookmarkFormData.get('bookmark-title') === undefined) {
        //     newBookmark.title = newBookmarkFormData.get('bookmark-url');
        // } else {
        //     newBookmark.title = newBookmarkFormData.get('bookmark-title');
        // }

        bookmarksArray.push(newBookmark);
        localStorage.setItem("blockBookmarks", JSON.stringify(bookmarksArray));
        renderBookmarks(bookmarksContainer, bookmarksList, bookmarksArray);

        closeModal(newBookmarkModal);
    }
});

// Removing a bookmark

function removeBookmark(index) {
    bookmarksArray.splice(index, 1);
    renderBookmarks(bookmarksContainer, bookmarksList, bookmarksArray);
}

// Editing a bookmark

function editBookmark(index) {
    closeModal(manageBookmarksModal);
    openModal(editBookmarkModal);

    document.getElementById('edit-bookmark-modal-bookmark-id').textContent = `Editing bookmark #${index+1}`

    const editBookmarkForm = document.getElementById('edit-bookmark-form');

    document.getElementById('edit-bookmark-form-url-input').value = bookmarksArray[index].href;
    const editBookmarkTitleInput = document.getElementById('edit-bookmark-form-title-input');

    if (bookmarksArray[index].title === undefined) {
        editBookmarkTitleInput.value = bookmarksArray[index].href;
    }

    editBookmarkForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const editBookmarkFormData = new FormData(editBookmarkForm);

        console.log(editBookmarkFormData.get('bookmark-url'))

        if (!editBookmarkFormData.get('bookmark-url').includes('https://')) {
            console.log('foo')
            const bookmarkTitle = 'https://' + editBookmarkFormData.get('bookmark-url');
            bookmarksArray[index].href = bookmarkTitle;
            bookmarksArray[index].title = editBookmarkFormData.get('bookmark-title');
        } else {
            bookmarksArray[index].href = editBookmarkFormData.get('bookmark-url');
            bookmarksArray[index].title = editBookmarkFormData.get('bookmark-title');
        }


    localStorage.setItem("blockBookmarks", JSON.stringify(bookmarksArray));
        renderBookmarks(bookmarksContainer, bookmarksList, bookmarksArray);
        closeModal(editBookmarkModal);
        openModal(manageBookmarksModal);
    })

    
}

// Rendering the bookmarks

function loadBlackAltIcon(e) {
    e.src = "./assets/img/desktop-icon-black.svg";
}

function loadWhiteAltIcon(e) {
    e.src = "./assets/img/desktop-icon-white.svg";
}

function renderBookmarks(container, list, array) {

    container.innerHTML = '';
    list.innerHTML = '';

    if (array.length > 0) {
        function getBookmarksTitle(bookmarkObject) {
            if (bookmarkObject.title === "" || bookmarkObject.title === undefined) {
                return bookmarkObject.hostname;
            } else {
                return bookmarkObject.title;
            }
        }
    
        function getBookmarksFavicon(bookmarkObject) {
            return bookmarkObject.href + "favicon.ico";
        }
    
    
        array.forEach((bookmark, index) => {
    
            container.innerHTML += 
            `
                <a class="bookmark-block" href="${bookmark.href}">
                    <h1>${getBookmarksTitle(bookmark)}</h1>
                    <img class="bookmark-block-icon" src="${getBookmarksFavicon(bookmark)}" onerror="loadWhiteAltIcon(this)">
                </a>
            `;
    
            list.innerHTML +=
            `
                <li class="bookmarks-list-item">
                    <div class="bookmarks-list-item-meta">
                        <img class="bookmarks-list-item-icon" src="${getBookmarksFavicon(bookmark)}" onerror="loadBlackAltIcon(this)">
                        <p class="bookmarks-list-item-title">${getBookmarksTitle(bookmark)}</p>
                    </div>
                    <div class="bookmarks-list-item-actions">
                        <button class="bookmarks-list-item-remove-btn" onclick="removeBookmark(${index})"><i class="fa-solid fa-trash"></i>Remove</button>
                        <button class="bookmarks-list-item-edit-btn" onclick="editBookmark(${index})"><i class="fa-solid fa-pencil"></i>Edit</button>
                    </div>
                </li>
            `
        });
    } else {
        list.innerHTML = `<p>You don't have any bookmarks</p>`
    }

}

renderBookmarks(bookmarksContainer, bookmarksList, bookmarksArray);