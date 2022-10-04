// ================
// WORK IN PROGRESS
// ================

// const bookmarksContainer = document.querySelector(".bookmarks-container");
// const bookmarksList = document.querySelector(".bookmarks-list");

// let bookmarksArray = [];
// let localStorageBookmarks = JSON.parse(localStorage.getItem("myBookmarks"));

// if (localStorageBookmarks) {
//     bookmarksArray = localStorageBookmarks;
//     renderBookmarks(bookmarksArray, bookmarksList);
// }

// Basic boilerplate taken from the initial version of the app

// -- STARTS HERE --

// Modals

// const addNewBookmarkModal = document.querySelector(".new-bookmark-modal");
// const manageBookmarksModal = document.querySelector(".manage-bookmarks-modal");
// const settingsModal = document.querySelector(".settings-modal");
// const editBookmarkModal = document.querySelector(".edit-bookmark-modal");
// const wipeAllBookmarksModal = document.querySelector(".wipe-bookmarks-modal");

// const addNewBookmarkModalBtn = document.querySelector(".new-bookmark-btn");
// const manageBookmarksModalBtn = document.querySelector(".manage-bookmarks-btn");
// const settingsModalBtn = document.querySelector(".settings-btn");
// const addNewBookmarkModalLinkBtn = document.querySelector(".manage-bookmarks-modal .modal-footer .modal-btn");
// const wipeAllBookmarksModalBtn = document.querySelector(".wipe-bookmarks-btn");

// const closeNewBookmarkModalBtn = document.querySelector(".new-bookmark-modal-close");
// const closeManageBookmarksBtn = document.querySelector(".manage-bookmarks-modal-close");
// const closeSettingsModalBtn = document.querySelector(".settings-modal-close");
// const closeEditBookmarkModalBtn = document.querySelector(".edit-bookmark-modal-close");
// const closeWipeAllBookmarksModalBtn = document.querySelector('.wipe-bookmarks-modal-close');

// function openModal(modal) {
//     modal.showModal();
// }

// function closeModal(modal) {
//     modal.close();
// }

// addNewBookmarkModalBtn.addEventListener("click", () => {
//     openModal(addNewBookmarkModal);
// })
// addNewBookmarkModalLinkBtn.addEventListener("click", () => {
//     closeModal(manageBookmarksModal);
//     openModal(addNewBookmarkModal);
// })
// closeNewBookmarkModalBtn.addEventListener("click", () => {
//     closeModal(addNewBookmarkModal);
// })

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