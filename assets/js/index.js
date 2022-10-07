// ===============================
//
// DIALOGS SECTION
//
// ===============================



// - Dialog elements
const newBookmarkModal = document.querySelector(".new-bookmark-modal");
// const manageBookmarksModal = document.querySelector(".manage-bookmarks-modal");
// const settingsModal = document.querySelector(".settings-modal");
// const editBookmarkModal = document.querySelector(".edit-bookmark-modal");
// const wipeAllBookmarksModal = document.querySelector(".wipe-bookmarks-modal");

// - Opening buttons
const newBookmarkModalBtn = document.querySelector(".new-bookmark-modal-btn");
// const manageBookmarksModalBtn = document.querySelector(".manage-bookmarks-modal-btn");
// const settingsModalBtn = document.querySelector(".settings-modal-btn");
//    addNewBookmarkModalLinkBtn -- "link" that opens the new bookmark modal from the managing one
// const addNewBookmarkModalLinkBtn = document.querySelector(".manage-bookmarks-modal .modal-footer .modal-btn");
// const wipeAllBookmarksModalBtn = document.querySelector(".wipe-bookmarks-btn");

// - Closing buttons
const closeNewBookmarkModalBtn = document.querySelector(".new-bookmark-modal-close");
// const closeManageBookmarksBtn = document.querySelector(".manage-bookmarks-modal-close");
// const closeSettingsModalBtn = document.querySelector(".settings-modal-close");
// const closeEditBookmarkModalBtn = document.querySelector(".edit-bookmark-modal-close");
// const closeWipeAllBookmarksModalBtn = document.querySelector('.wipe-bookmarks-modal-close');

// === Open/close modal functions ===

function openModal(modal) {
    modal.showModal();
}

function closeModal(modal) {
    modal.close();
}

// === Event listeners ===

newBookmarkModalBtn.addEventListener("click", () => {
    openModal(newBookmarkModal);
})
// addNewBookmarkModalLinkBtn.addEventListener("click", () => {
//     closeModal(manageBookmarksModal);
//     openModal(newBookmarkModal);
// })
closeNewBookmarkModalBtn.addEventListener("click", () => {
    closeModal(newBookmarkModal);
})

// manageBookmarksModalBtn.addEventListener("click", () => {
//     openModal(manageBookmarksModal);
// })
// closeManageBookmarksBtn.addEventListener("click", () => {
//     closeModal(manageBookmarksModal);
// })

// settingsModalBtn.addEventListener("click", () => {
//     openModal(settingsModal);
// })
// closeSettingsModalBtn.addEventListener("click", () => {
//     closeModal(settingsModal);
// })

// closeEditBookmarkModalBtn.addEventListener("click", () => {
//     closeModal(editBookmarkModal);
//     openModal(manageBookmarksModal);
// })

// wipeAllBookmarksModalBtn.addEventListener("click", () => {
//     if (bookmarksArray.length > 0) {
//         openModal(wipeAllBookmarksModal);
//     } else {
//         alert("Add some bookmarks first!");
//     }
// })
// closeWipeAllBookmarksModalBtn.addEventListener("click", () => {
//     closeModal(wipeAllBookmarksModal);
// })

// === TODO: Dialog close on clicking outside of it ===



// ===============================
//
// MAIN SECTION
//
// ===============================



// === DOM references ===

const bookmarksContainer = document.querySelector(".bookmarks-container");
// const bookmarksList = document.querySelector(".bookmarks-list");

let bookmarksArray = [];
let localStorageBookmarks = JSON.parse(localStorage.getItem("blockBookmarks"));

// Getting bookmarks from local storage
if (localStorageBookmarks) {
    bookmarksArray = localStorageBookmarks;
    // renderBookmarks(bookmarksArray, bookmarksList);
}

// === Adding a new bookmark === 

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

        bookmarksArray.push(newBookmark);
        localStorage.setItem("blockBookmarks", JSON.stringify(bookmarksArray));
        renderBookmarks(bookmarksContainer, bookmarksArray);

        closeModal(newBookmarkModal);
    } else {
        const newBookmark = new URL(newBookmarkFormData.get('bookmark-url'));
        newBookmark.title = newBookmarkFormData.get('bookmark-title');

        bookmarksArray.push(newBookmark);
        localStorage.setItem("blockBookmarks", JSON.stringify(bookmarksArray));
        renderBookmarks(bookmarksContainer, bookmarksArray);

        closeModal(newBookmarkModal);
    }
});

// === Rendering the bookmarks ===

function loadBlackAltIcon(e) {
    e.src = "./assets/img/desktop-icon-black.svg";
}

function loadWhiteAltIcon(e) {
    e.src = "./assets/img/desktop-icon-white.svg";
}

// TODO: Container in which the bookmarks will appear, list element in the managing modal and source array (only container and array for now)
function renderBookmarks(container, array) {

    container.innerHTML = "";

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

    array.forEach(bookmark => {
        container.innerHTML += 
        `
            <a class="bookmark-block" href="${bookmark.href}">
                <h1>${getBookmarksTitle(bookmark)}</h1>
                <img class="bookmark-block-icon" src="${getBookmarksFavicon(bookmark)}" onerror="loadWhiteAltIcon(this)">
            </a>
        `
    });

}

renderBookmarks(bookmarksContainer, bookmarksArray);