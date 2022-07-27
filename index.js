const bookmarksContainer = document.querySelector(".bookmarks-container");

let bookmarksArray = [];
let localStorageBookmarks = JSON.parse(localStorage.getItem("myBookmarks"));

if (localStorageBookmarks) {
    console.log("localstoragebookmarks = truthy")
    console.log(localStorageBookmarks);
    bookmarksArray = localStorageBookmarks;
    renderBookmarks(bookmarksArray);
}

// Modals

const addNewBookmarkModalBtn = document.querySelector(".new-bookmark-btn");
const wipeAllBookmarksModalBtn = document.querySelector(".wipe-bookmarks-btn");

const addNewBookmarkModal = document.querySelector(".new-bookmark-modal");
const wipeAllBookmarksModal = document.querySelector(".wipe-bookmarks-modal");

const closeNewBookmarkModalBtn = document.querySelector(".new-bookmark-modal-close");
const closeWipeAllBookmarksModalBtn = document.querySelector('.wipe-bookmarks-modal-close');

function openModal(modal) {
    modal.showModal();
}

function closeModal(modal) {
    modal.close();
}

addNewBookmarkModalBtn.addEventListener("click", () => {
    openModal(addNewBookmarkModal);
})
wipeAllBookmarksModalBtn.addEventListener("click", () => {
    openModal(wipeAllBookmarksModal);
})

closeNewBookmarkModalBtn.addEventListener("click", () => {
    closeModal(addNewBookmarkModal);
})
closeWipeAllBookmarksModalBtn.addEventListener("click", () => {
    closeModal(wipeAllBookmarksModal);
})

// Adding a new bookmark

const newBookmarkUrlInput = document.querySelector(".new-bookmark-url-input");
const newBookmarkTitleInput = document.querySelector(".new-bookmark-title-input");
const addNewBookmarkBtn = document.querySelector(".new-bookmark-submit");

function addNewBookmark(urlInput, titleInput) {
    if (urlInput.value === "" || undefined) {
        alert("Please specify the desired URL");
    } else if (titleInput.value === "" || undefined) {
        titleInput.value = urlInput.value;
        let newBookmark =
        {
            title: titleInput.value,
            url: urlInput.value
        };
    
        urlInput.value = "";
        titleInput.value = "";
        closeModal(addNewBookmarkModal);
    
        bookmarksArray.push(newBookmark);
        localStorage.setItem("myBookmarks", JSON.stringify(bookmarksArray));

        renderBookmarks(bookmarksContainer);
    } else {
        let newBookmark =
        {
            title: titleInput.value,
            url: urlInput.value
        };
    
        urlInput.value = "";
        titleInput.value = "";
        closeModal(addNewBookmarkModal);

        bookmarksArray.push(newBookmark);
        localStorage.setItem("myBookmarks", JSON.stringify(bookmarksArray));

        renderBookmarks(bookmarksContainer);
    }
}

addNewBookmarkBtn.addEventListener("click", () => {
    addNewBookmark(newBookmarkUrlInput, newBookmarkTitleInput);
})

// Removing all bookmarks

const wipeAllBookmarksBtn = document.querySelector(".wipe-all-bookmarks-btn");
const wipeAllBookmarksConfirmationInput = document.querySelector(".wipe-all-bookmarks-confirmation");

function wipeAllBookmarks(confirmationInput) {
    if (confirmationInput.value === "I Understand") {
        confirmationInput.value = "";
        bookmarksArray = [];
        localStorage.clear();
        location.reload();
    } else {
        alert("Please make sure you typed in the confirmation text properly");
    }
}

wipeAllBookmarksBtn.addEventListener("click", () => {
    wipeAllBookmarks(wipeAllBookmarksConfirmationInput);
})

// Rendering the bookmarks

function renderBookmarks(container) {
    container.innerHTML = "";

    if (bookmarksArray.length > 0) {
        for (const bookmark of bookmarksArray) {
            container.innerHTML +=
            `
                <a href="https://${bookmark.url}" class="bookmark-block">
                    <h2>${bookmark.title}</h2>
                    <span class="bookmark-block-letter">${bookmark.title.charAt(0)}</span>
            `;
        }
    } else {
        container.innerHTML +=
        `
            <a href="#" class="bookmark-block">
                <h2>No bookmarks yet!</h2>
                Add a new one!
        `;
    }
}

renderBookmarks(bookmarksContainer);