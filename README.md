# Hexrealm Mapper - Interactive Hex Map

An interactive, client‑side hex‑map tool for tabletop RPGs.  
Currently built for one specific map, but should be adaptable to any hex‑based world map.

This tool lets you:

- Click any hex to open a sidebar with notes  
- Add/remove emojis as visual markers (danger, treasure, monsters, etc.)  
- See icons directly on the map  
- Highlight hexes with stored data  
- Save automatically in your browser  
- Export/import your entire map state as a JSON file  

Everything runs **locally** in the browser — no backend required.

---

## 🚀 Features

### ✔ Interactive Hex Grid
- Automatically aligns to the underlying map image  
- True flat‑top hex geometry  
- Hover, selected, and “has data” visual states  
- Emoji icons displayed directly on the map  

### ✔ Notes & Emojis
Each hex can store:
- Free‑form notes  
- Up to 4 emoji markers  
- Visual indicators on the map  

### ✔ Custom Emoji Picker
A curated emoji picker organized by:
- Creatures  
- People  
- Weapons  
- Objects  
- Symbols  
- Magic  
- Places  

Includes search functionality.

### ✔ Persistent Storage
- All data is saved automatically using `localStorage`
- Optional **Export Save** and **Import Save** buttons allow long‑term storage via `save.json`

### ✔ No Server Required
Just open `index.html` in a browser and start using it.

---

## 📦 Project Structure
- index.html - Main UI layout
- styles.css - Styling for map, sidebar, emoji picker
- script.js - Hex grid logic, emoji system, save/load

---

## 🖥️ How to Run

Just double‑click `index.html` and it will run locally.

--

## 💾 Saving & Loading

### Autosave
All changes (notes, emojis, flags) are automatically saved to `localStorage`.

### Export/Import Save
- TODO

---

## 🧩 Customization

You can customize:

- Hex size, spacing, and offsets (`settings` object in `script.js`)
- Emoji categories and contents (`emojiSet` in `script.js`)
- Map image (`#map-image` in `index.html`)
- Sidebar layout (`index.html` + `styles.css`)

The system is modular and easy to extend.

---

## 📜 License

GNU GPLv3 — Free to use, modify, and adapt for your own campaigns, but stay open source.

---