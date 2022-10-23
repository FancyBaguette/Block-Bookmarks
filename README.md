# 📚 Block Bookmarks
Simple tool intended for easier site navigation in the Steam overlay web browser. I created it so that i don't have to google up the site i wanted to go to every time i launch the overlay and so that you don't have to do it too.

## 🏗 Work in progress
Quite a lot of features not implemented yet. Incoming features include:
- Wiping all bookmarks at once
- App settings with customization options
- Improved accessibility

## 🛠 Setup
1. Open up Steam settings
2. Head to the "Web browser" section
3. Change the web browser homepage URL to `https://fancybaguette.github.io/block-bookmarks/`

![Steam settings](https://cdn.discordapp.com/attachments/972799878956716122/1001920490450993352/Bez_tytuu.png)\
**❗ If you're in-game this requires restarting the game to see the change ❗**

## 📖 Usage
Every time you'll click "WEB BROWSER" in the Steam overlay or open a new tab in a already open overlay web browser, the app will show up. Here's a quick rundown on all of the **currently available** features:
### - Use the "Add a new bookmark" menu to add a new bookmark
Entering the bookmark's URL is required. You're also given the option to enter the bookmark's title although it's optional. If you don't provide the title, the previously entered URL becomes the title.
### - Use the "Manage bookmarks" menu to edit and remove bookmarks
In the *Manage bookmarks* menu you can edit the URL and the title of a specific bookmark or remove it

## 🐞 Bugs
The app is still in development, so if you encounter any bugs...
- Try to clear the local storage first (type `localStorage.clear()` in the console)

