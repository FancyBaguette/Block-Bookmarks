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
const wipeAllBookmarksModal = document.querySelector(".wipe-bookmarks-modal");

const addNewBookmarkModalBtn = document.querySelector(".new-bookmark-btn");
const manageBookmarksModalBtn = document.querySelector(".manage-bookmarks-btn");
const wipeAllBookmarksModalBtn = document.querySelector(".wipe-bookmarks-btn");

const closeNewBookmarkModalBtn = document.querySelector(".new-bookmark-modal-close");
const closeManageBookmarksBtn = document.querySelector(".manage-bookmarks-modal-close");
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

manageBookmarksModalBtn.addEventListener("click", () => {
    if (bookmarksArray.length > 0) {
        openModal(manageBookmarksModal);
    } else {
        alert("Add some bookmarks first!");
    }
})
closeManageBookmarksBtn.addEventListener("click", () => {
    closeModal(manageBookmarksModal);
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

        renderBookmarks(bookmarksContainer, bookmarksList);
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

        renderBookmarks(bookmarksContainer, bookmarksList);
    }
}

addNewBookmarkBtn.addEventListener("click", () => {
    addNewBookmark(newBookmarkUrlInput, newBookmarkTitleInput);
})
   
// Managing the bookmarks

function removeBookmark(index) {
    closeModal(manageBookmarksModal);
    bookmarksArray.splice(index, 1);
    localStorage.setItem("myBookmarks", JSON.stringify(bookmarksArray));
    renderBookmarks(bookmarksContainer, bookmarksList);
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
                <a href="https://${bookmarksArray[i].url}" class="bookmark-block" data-index="${i}" title="https://${bookmarksArray[i].url}">
                    <h2>${bookmarksArray[i].title}</h2>
                    <img class="bookmark-block-icon" src="https://${bookmarksArray[i].url}/favicon.ico" onerror="loadWhiteAltIcon(this)">
            `;
            
            // Bookmark managing panel
            list.innerHTML +=
            `
                <div class="list-item">
                    <div style="display:flex;"> 
                        <div class="list-item-index">${i+1}.</div> 
                        <div class="list-item-body">
                            <div style="display:flex;">
                                <img class="list-item-icon" src="https://${bookmarksArray[i].url}/favicon.ico" onerror="loadBlackAltIcon(this)">
                                <h3>${bookmarksArray[i].title}</h3>
                            </div> 
                            <br> 
                            <a href="https://${bookmarksArray[i].url}">${bookmarksArray[i].url}</a>
                        </div> 
                    </div> 
                    <button class="remove-bookmark-btn">Remove</button>
                </div>
            `;
        }

        const removeBtns = document.querySelectorAll(".remove-bookmark-btn");

        for (let i = 0; i < bookmarksArray.length; i++) {
            console.log("dasdas")
            removeBtns[i].addEventListener("click", () => {
                removeBookmark(i);
                renderBookmarks(bookmarksContainer, bookmarksList);
            })
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

renderBookmarks(bookmarksContainer, bookmarksList);

// Rendering an icon when bookmark block icon fails to load

function loadWhiteAltIcon(e) {
    e.src = "desktop-icon-white.svg";
}

function loadBlackAltIcon(e) {
    e.src = "desktop-icon-black.svg";
}