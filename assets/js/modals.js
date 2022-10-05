// Boilerplate taken from the initial version of the app

// DOM references
// - Dialog elements
const newBookmarkModal = document.querySelector(".new-bookmark-modal");
const manageBookmarksModal = document.querySelector(".manage-bookmarks-modal");
const settingsModal = document.querySelector(".settings-modal");
const editBookmarkModal = document.querySelector(".edit-bookmark-modal");
const wipeAllBookmarksModal = document.querySelector(".wipe-bookmarks-modal");

// - Opening buttons
const newBookmarkModalBtn = document.querySelector(".new-bookmark-modal-btn");
const manageBookmarksModalBtn = document.querySelector(".manage-bookmarks-modal-btn");
const settingsModalBtn = document.querySelector(".settings-modal-btn");
//    addNewBookmarkModalLinkBtn -- "link" that opens the new bookmark modal from the managing one
// const addNewBookmarkModalLinkBtn = document.querySelector(".manage-bookmarks-modal .modal-footer .modal-btn");
const wipeAllBookmarksModalBtn = document.querySelector(".wipe-bookmarks-btn");

// - Closing buttons
const closeNewBookmarkModalBtn = document.querySelector(".new-bookmark-modal-close");
const closeManageBookmarksBtn = document.querySelector(".manage-bookmarks-modal-close");
const closeSettingsModalBtn = document.querySelector(".settings-modal-close");
const closeEditBookmarkModalBtn = document.querySelector(".edit-bookmark-modal-close");
const closeWipeAllBookmarksModalBtn = document.querySelector('.wipe-bookmarks-modal-close');

// Open/close modal functions

function openModal(modal) {
    modal.showModal();
}

function closeModal(modal) {
    modal.close();
}

// Event listeners

newBookmarkModalBtn.addEventListener("click", () => {
    openModal(newBookmarkModal);
})
addNewBookmarkModalLinkBtn.addEventListener("click", () => {
    closeModal(manageBookmarksModal);
    openModal(newBookmarkModal);
})
closeNewBookmarkModalBtn.addEventListener("click", () => {
    closeModal(newBookmarkModal);
})

manageBookmarksModalBtn.addEventListener("click", () => {
    openModal(manageBookmarksModal);
})
closeManageBookmarksBtn.addEventListener("click", () => {
    closeModal(manageBookmarksModal);
})

settingsModalBtn.addEventListener("click", () => {
    openModal(settingsModal);
})
closeSettingsModalBtn.addEventListener("click", () => {
    closeModal(settingsModal);
})

closeEditBookmarkModalBtn.addEventListener("click", () => {
    closeModal(editBookmarkModal);
    openModal(manageBookmarksModal);
})

wipeAllBookmarksModalBtn.addEventListener("click", () => {
    if (bookmarksArray.length > 0) {
        openModal(wipeAllBookmarksModal);
    } else {
        alert("Add some bookmarks first!");
    }
})
closeWipeAllBookmarksModalBtn.addEventListener("click", () => {
    closeModal(wipeAllBookmarksModal);
})