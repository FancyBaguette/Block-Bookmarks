const bookmarksContainer = document.querySelector(".bookmarks-container");
const bookmarksList = document.querySelector(".bookmarks-list");

let bookmarksArray = [];
let localStorageBookmarks = JSON.parse(localStorage.getItem("myBookmarks"));

if (localStorageBookmarks) {
    bookmarksArray = localStorageBookmarks;
    renderBookmarks(bookmarksArray, bookmarksList);
}

// Modals

const addNewBookmarkModal = document.querySelector(".new-bookmark-modal");
const manageBookmarksModal = document.querySelector(".manage-bookmarks-modal");
const editBookmarkModal = document.querySelector(".edit-bookmark-modal");
const wipeAllBookmarksModal = document.querySelector(".wipe-bookmarks-modal");

const addNewBookmarkModalBtn = document.querySelector(".new-bookmark-btn");
const manageBookmarksModalBtn = document.querySelector(".manage-bookmarks-btn");
const addNewBookmarkModalLinkBtn = document.querySelector(".manage-bookmarks-modal .modal-footer .modal-btn");
const wipeAllBookmarksModalBtn = document.querySelector(".wipe-bookmarks-btn");

const closeNewBookmarkModalBtn = document.querySelector(".new-bookmark-modal-close");
const closeManageBookmarksBtn = document.querySelector(".manage-bookmarks-modal-close");
const closeEditBookmarkModalBtn = document.querySelector(".edit-bookmark-modal-close");
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
addNewBookmarkModalLinkBtn.addEventListener("click", () => {
    closeModal(manageBookmarksModal);
    openModal(addNewBookmarkModal);
})
closeNewBookmarkModalBtn.addEventListener("click", () => {
    closeModal(addNewBookmarkModal);
})

manageBookmarksModalBtn.addEventListener("click", () => {
    // if (bookmarksArray.length > 0) {
    //     openModal(manageBookmarksModal);
    // } else {
    //     alert("Add some bookmarks first!");
    // }
    openModal(manageBookmarksModal);
})
closeManageBookmarksBtn.addEventListener("click", () => {
    closeModal(manageBookmarksModal);
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
            url: urlInput.value.split("https://").pop()
        };
    
        urlInput.value = "";
        titleInput.value = "";
        closeModal(addNewBookmarkModal);
    
        bookmarksArray.push(newBookmark);
        localStorage.setItem("myBookmarks", JSON.stringify(bookmarksArray));

        renderBookmarks(bookmarksContainer, bookmarksList);
    } else {
        let newBookmark =
        {
            title: titleInput.value,
            url: urlInput.value.split("https://").pop()
        };
    
        urlInput.value = "";
        titleInput.value = "";
        closeModal(addNewBookmarkModal);

        bookmarksArray.push(newBookmark);
        localStorage.setItem("myBookmarks", JSON.stringify(bookmarksArray));

        renderBookmarks(bookmarksContainer, bookmarksList);
    }
}

addNewBookmarkBtn.addEventListener("click", () => {
    addNewBookmark(newBookmarkUrlInput, newBookmarkTitleInput);
})
   
// Managing the bookmarks

    // Removing a bookmark

function removeBookmark(index) {
    bookmarksArray.splice(index, 1);
    localStorage.setItem("myBookmarks", JSON.stringify(bookmarksArray));
    renderBookmarks(bookmarksContainer, bookmarksList);
}

    // Editing a bookmark

const bookmarkIndexDisplay = document.querySelector(".edit-bookmark-modal-index");
const bookmarkTitleInput = document.querySelector(".bookmark-info-container-title-input");
const bookmarkUrlInput = document.querySelector(".bookmark-info-container-url-input");
const applyBtn = document.querySelector(".bookmark-info-container-apply");

function editBookmark(index) {
    closeModal(manageBookmarksModal);
    openModal(editBookmarkModal);

    bookmarkIndexDisplay.textContent = `#${index+1}`;
    bookmarkTitleInput.value = "";
    bookmarkUrlInput.value = "";
    bookmarkTitleInput.value = bookmarksArray[index].title;
    bookmarkUrlInput.value = bookmarksArray[index].url;

    applyBtn.addEventListener("click", () => {
        bookmarksArray[index].title = bookmarkTitleInput.value;
        bookmarksArray[index].url = bookmarkUrlInput.value;
        bookmarkTitleInput.value = "";
        bookmarkUrlInput.value = "";
        renderBookmarks(bookmarksContainer, bookmarksList);
        closeModal(editBookmarkModal);
        openModal(manageBookmarksModal);
    })
}

// Removing all bookmarks

const wipeAllBookmarksBtn = document.querySelector(".wipe-all-bookmarks-btn");
const wipeAllBookmarksConfirmationInput = document.querySelector(".wipe-all-bookmarks-confirmation");

function wipeAllBookmarks(confirmationInput) {
    if (confirmationInput.value === "I Understand") {
        confirmationInput.value = "";
        bookmarksArray = [];
        localStorage.clear();
        renderBookmarks(bookmarksContainer, bookmarksList);
        location.reload();
    } else {
        alert("Please make sure you typed in the confirmation text properly");
    }
}

wipeAllBookmarksBtn.addEventListener("click", () => {
    wipeAllBookmarks(wipeAllBookmarksConfirmationInput);
})

// Rendering the bookmarks

function renderBookmarks(container, list) {
    container.innerHTML = "";
    list.innerHTML = "";

    if (bookmarksArray.length > 0) {
        for (let i = 0; i < bookmarksArray.length; i++) {
            // Bookmarks container
            container.innerHTML +=
            `
                <a href="https://${bookmarksArray[i].url}" class="bookmark-block" title="https://${bookmarksArray[i].url}">
                    <h2>${bookmarksArray[i].title}</h2>
                    <img class="bookmark-block-icon" src="https://${getFavicon(bookmarksArray[i].url)}" onerror="loadWhiteAltIcon(this)">
            `;
            
            // Bookmark managing panel
            list.innerHTML +=
            `
                <div class="list-item">
                    <div style="display:flex;"> 
                        <div class="list-item-index">${i+1}.</div> 
                        <div class="list-item-body">
                            <div style="display:flex;">
                                <img class="list-item-icon" src="https://${getFavicon(bookmarksArray[i].url)}" onerror="loadBlackAltIcon(this)">
                                <h3>${bookmarksArray[i].title}</h3>
                            </div> 
                            <a href="https://${bookmarksArray[i].url}">${bookmarksArray[i].url}</a>
                        </div> 
                    </div> 
                    <div style="display: flex; gap: 1rem">
                        <button class="edit-bookmark-btn">Edit</button>
                        <button class="remove-bookmark-btn">Remove</button>
                    </div>
                </div>
            `;
        }

        const removeBtns = document.querySelectorAll(".remove-bookmark-btn");

        for (let i = 0; i < bookmarksArray.length; i++) {
            removeBtns[i].addEventListener("click", () => {
                removeBookmark(i);
                renderBookmarks(bookmarksContainer, bookmarksList);
            })
        }

        const editBtns = document.querySelectorAll(".edit-bookmark-btn");

        for (let i = 0; i < editBtns.length; i++) {
            editBtns[i].addEventListener("click", () => {
                editBookmark(i);
            })
        }
    } else {
        container.innerHTML +=
        `
            <a href="#" class="bookmark-block">
                <h2>No bookmarks yet!</h2>
                Add a new one!
        `;

        list.innerHTML += 
        `
            <p>You currently have no bookmarks. Click the button below to add a new one.</p>
        `
    }
}

renderBookmarks(bookmarksContainer, bookmarksList);

// Getting the icon for bookmark blocks

function getFavicon(url) {
    return url.split("/")[0] + "/favicon.ico";
}

// Rendering an .SVG icon when bookmark block icon fails to load

function loadWhiteAltIcon(e) {
    e.src = "./svg/desktop-icon-white.svg";
}

function loadBlackAltIcon(e) {
    e.src = "./svg/desktop-icon-black.svg";
}