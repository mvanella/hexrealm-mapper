// =========================
// CONFIGURATION
// =========================
let settings = {
    hexWidth: 56,
    hexHeight: 49,
    topOffset: 3,
    bottomOffset: 2,
    leftOffset: 4,
    rightOffset: 5,
    cols: 26,
    rows: 17,
    scale: 1.5
};

// Load settings from settings.json and rebuild grid when loaded
let settingsLoaded = true; // Start as true since we have defaults embedded

function attemptBuildGrid() {
    if (mapImage.complete && mapImage.naturalWidth !== 0) {
        console.log('Attempting to build hex grid with settings:', settings);
        window.requestAnimationFrame(buildHexGrid);
    }
}

// // Try to load settings.json to override defaults (useful if running via http server)
// fetch('settings.json')
//     .then(r => {
//         if (!r.ok) throw new Error('settings.json not found (HTTP ' + r.status + ')');
//         return r.json();
//     })
//     .then(data => {
//         settings = { ...settings, ...data };
//         console.log('✓ Settings loaded and merged from settings.json:', settings);
//         attemptBuildGrid();
//     })
//     .catch(e => {
//         console.warn('ℹ Using embedded settings (failed to load settings.json:', e.message + ')');
//     });

// DOM references
const mapImage = document.getElementById("map-image");
const mapWrapper = document.getElementById("map-container");
const sidebarHexId = document.getElementById("hex-id");
const notesBox = document.getElementById("hex-notes");
const saveBtn = document.getElementById("save-btn");
const clearBtn = document.getElementById("clear-btn");
const emojiPickerContainer = document.getElementById("emoji-picker");
const emojiPickerWrapper = document.getElementById("emoji-picker-wrapper");
const emojiPickerBtn = document.getElementById("emoji-picker-btn");
const selectedEmojisContainer = document.getElementById("selected-emojis");

console.log('DOM Elements loaded:', {
    mapImage: !!mapImage,
    mapWrapper: !!mapWrapper,
    sidebarHexId: !!sidebarHexId,
    notesBox: !!notesBox,
    saveBtn: !!saveBtn,
    clearBtn: !!clearBtn,
    emojiPickerContainer: !!emojiPickerContainer,
    emojiPickerBtn: !!emojiPickerBtn,
    selectedEmojisContainer: !!selectedEmojisContainer
});

// Common emoji set - organized by category
const emojiSet = {
    'Creatures': [
        { emoji: '🐉', name: 'dragon' },
        { emoji: '🐲', name: 'dragon face' },
        { emoji: '🦖', name: 't-rex' },
        { emoji: '🦕', name: 'dinosaur' },
        { emoji: '🦗', name: 'cricket' },
        { emoji: '🦟', name: 'mosquito' },
        { emoji: '🐢', name: 'turtle' },
        { emoji: '🐛', name: 'bug worm' },
        { emoji: '🦂', name: 'scorpion' },
        { emoji: '🐝', name: 'bee' },
        { emoji: '🦁', name: 'lion' },
        { emoji: '🐯', name: 'tiger' },
        { emoji: '🐻', name: 'bear' },
        { emoji: '🐨', name: 'koala' },
        { emoji: '🐼', name: 'panda' },
        { emoji: '🦝', name: 'raccoon' },
        { emoji: '🦊', name: 'fox' },
        { emoji: '🦌', name: 'deer' },
        { emoji: '🦙', name: 'llama' },
        { emoji: '🐑', name: 'sheep' },
        { emoji: '🐐', name: 'goat' },
        { emoji: '🦒', name: 'giraffe' },
        { emoji: '🦓', name: 'zebra' },
        { emoji: '🦬', name: 'bison' },
        { emoji: '🐄', name: 'cow' },
        { emoji: '🐂', name: 'ox' },
        { emoji: '🐃', name: 'water buffalo' },
        { emoji: '🐮', name: 'cow face' },
        { emoji: '🐗', name: 'pig' },
        { emoji: '🦘', name: 'kangaroo' },
        { emoji: '🐪', name: 'camel' },
        { emoji: '🦏', name: 'rhino' },
        { emoji: '🦛', name: 'hippo' },
        { emoji: '🦣', name: 'mammoth' },
        { emoji: '🐘', name: 'elephant' }
    ],
    'People': [
        { emoji: '👨', name: 'man' },
        { emoji: '👩', name: 'woman' },
        { emoji: '👦', name: 'boy' },
        { emoji: '👧', name: 'girl' },
        { emoji: '👶', name: 'baby' },
        { emoji: '👴', name: 'old man' },
        { emoji: '👵', name: 'old woman' },
        { emoji: '🧙', name: 'mage wizard' },
        { emoji: '🧗', name: 'climber' },
        { emoji: '🤼', name: 'wrestler' },
        { emoji: '🏋️', name: 'weight lifter' },
        { emoji: '🥷', name: 'ninja' },
        { emoji: '🧟', name: 'zombie' },
        { emoji: '🧛', name: 'vampire' },
        { emoji: '👹', name: 'ogre' },
        { emoji: '👺', name: 'demon goblin' },
        { emoji: '👿', name: 'angry face' },
        { emoji: '👾', name: 'alien' },
        { emoji: '🤖', name: 'robot' },
        { emoji: '👽', name: 'extraterrestrial' },
        { emoji: '🧌', name: 'troll' }
    ],
    'Weapons': [
        { emoji: '⚔️', name: 'crossed swords' },
        { emoji: '🗡️', name: 'sword' },
        { emoji: '🏹', name: 'bow arrow' },
        { emoji: '🛡️', name: 'shield' },
        { emoji: '⚒️', name: 'pickaxe' },
        { emoji: '🔨', name: 'hammer' },
        { emoji: '🪓', name: 'axe' },
        { emoji: '🔱', name: 'trident' },
        { emoji: '⛏️', name: 'ice axe' },
        { emoji: '🪄', name: 'magic wand' },
        { emoji: '💣', name: 'bomb' },
        { emoji: '🔬', name: 'microscope' }
    ],
    'Objects': [
        { emoji: '💎', name: 'gem diamond' },
        { emoji: '💰', name: 'money bag' },
        { emoji: '🏆', name: 'trophy' },
        { emoji: '🎁', name: 'gift' },
        { emoji: '📦', name: 'package' },
        { emoji: '📫', name: 'mailbox' },
        { emoji: '🗝️', name: 'key' },
        { emoji: '📿', name: 'beads' },
        { emoji: '🧿', name: 'nazar amulet' },
        { emoji: '📜', name: 'scroll' },
        { emoji: '🗺️', name: 'map' },
        { emoji: '🧭', name: 'compass' },
        { emoji: '🎒', name: 'backpack' }
    ],
    'Symbols': [
        { emoji: '❤️', name: 'red heart' },
        { emoji: '💔', name: 'broken heart' },
        { emoji: '⭐', name: 'star' },
        { emoji: '✨', name: 'sparkles magic' },
        { emoji: '🌟', name: 'glowing star' },
        { emoji: '💫', name: 'dizzy' },
        { emoji: '⚜️', name: 'fleur de lis' },
        { emoji: '🔱', name: 'trident' },
        { emoji: '❌', name: 'cross mark' },
        { emoji: '✅', name: 'check mark' },
        { emoji: '⚠️', name: 'warning' },
        { emoji: '🚫', name: 'prohibited' },
        { emoji: '🔒', name: 'locked' },
        { emoji: '🔓', name: 'unlocked' },
        { emoji: '🔑', name: 'key' },
        { emoji: '☠️', name: 'skull danger' },
        { emoji: '👁️', name: 'eye' },
        { emoji: '🎯', name: 'target bullseye' }
    ],
    'Magic': [
        { emoji: '✨', name: 'sparkles' },
        { emoji: '💫', name: 'magic dizzy' },
        { emoji: '⚡', name: 'lightning bolt' },
        { emoji: '🔥', name: 'fire' },
        { emoji: '❄️', name: 'snowflake ice' },
        { emoji: '🌪️', name: 'tornado wind' },
        { emoji: '💥', name: 'explosion boom' },
        { emoji: '🌊', name: 'water wave' },
        { emoji: '💀', name: 'skull' },
        { emoji: '👻', name: 'ghost spirit' },
        { emoji: '🔮', name: 'crystal ball' }
    ],
    'Places': [
        { emoji: '🏰', name: 'castle' },
        { emoji: '🏯', name: 'japanese castle' },
        { emoji: '🗼', name: 'tower' },
        { emoji: '⛪', name: 'church' },
        { emoji: '🕌', name: 'mosque' },
        { emoji: '🗽', name: 'statue liberty' },
        { emoji: '🕍', name: 'synagogue' },
        { emoji: '🛕', name: 'hindu temple' },
        { emoji: '🏛️', name: 'classical building' },
        { emoji: '🏟️', name: 'colosseum' },
        { emoji: '⛩️', name: 'shinto shrine' },
        { emoji: '🏞️', name: 'landscape' },
        { emoji: '🌋', name: 'volcano' },
        { emoji: '⛰️', name: 'mountain' },
        { emoji: '🏔️', name: 'mountain snow' },
        { emoji: '🗻', name: 'mount fuji' },
        { emoji: '🌲', name: 'evergreen tree' },
        { emoji: '🌳', name: 'deciduous tree' }
    ]
};

// Create emoji picker grid
function createEmojiPicker() {
    if (!emojiPickerContainer) {
        console.warn('Emoji picker container not found');
        return;
    }

    // Create wrapper with search
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: white;
    `;

    // Search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search emoji names or categories...';
    searchInput.style.cssText = `
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        margin: 8px 12px 0 12px;
        box-sizing: border-box;
    `;
    wrapper.appendChild(searchInput);

    // Grid container with scrolling
    const gridWrapper = document.createElement('div');
    gridWrapper.className = 'emoji-grid-scroll';
    gridWrapper.style.cssText = `
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 8px;
        padding: 12px;
        background: white;
        overflow-y: auto;
        overflow-x: auto;
        max-height: 350px;
    `;

    // Create all emoji buttons
    const emojiButtons = [];

    for (const category in emojiSet) {
        emojiSet[category].forEach(emojiObj => {
            const btn = document.createElement('button');
            btn.textContent = emojiObj.emoji;
            btn.dataset.emoji = emojiObj.emoji;
            btn.dataset.name = emojiObj.name;
            btn.dataset.category = category;
            btn.title = `${emojiObj.name} (${category})`;
            btn.style.cssText = `
                padding: 8px;
                font-size: 24px;
                border: 1px solid #ddd;
                border-radius: 4px;
                background: white;
                cursor: pointer;
                transition: all 0.2s;
                min-height: 40px;
            `;
            btn.onmouseover = () => btn.style.background = '#f0f0f0';
            btn.onmouseout = () => btn.style.background = 'white';
            btn.onclick = (e) => {
                e.preventDefault();
                console.log('Emoji selected:', emojiObj.emoji, emojiObj.name);
                addEmoji(emojiObj.emoji);
                emojiPickerWrapper.style.display = 'none';
            };
            gridWrapper.appendChild(btn);
            emojiButtons.push({ btn, emoji: emojiObj.emoji, name: emojiObj.name, category });
        });
    }

    wrapper.appendChild(gridWrapper);

    // Search functionality - searches both names and categories
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        emojiButtons.forEach(({ btn, name, category }) => {
            const matches = query === '' ||
                name.includes(query) ||
                category.toLowerCase().includes(query);
            btn.style.display = matches ? 'block' : 'none';
        });
    });

    emojiPickerContainer.appendChild(wrapper);
    console.log('Custom emoji picker created with', emojiButtons.length, 'emojis');
}

// Initialize emoji picker - try immediately and also on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createEmojiPicker);
} else {
    // DOM already loaded
    createEmojiPicker();
}

let currentHex = null;

// Load saved notes from localStorage
const hexData = JSON.parse(localStorage.getItem("hexData") || "{}");

function updateHexVisuals(id) {
    const el = mapWrapper.querySelector(`.hex[data-id="${id}"]`);
    if (!el) return;

    if (hexData[id]?.hasData) {
        el.classList.add('hasData');
    } else {
        el.classList.remove('hasData');
    }

    // Update emojis on hex
    updateHexEmojis(id);
}

function saveData() {
    localStorage.setItem("hexData", JSON.stringify(hexData));
    // Update visuals for all hexes with data
    Object.keys(hexData).forEach(id => updateHexVisuals(id));
}

function openHex(id) {
    // Remove selected class from previous hex
    const prev = mapWrapper.querySelector('.hex.selected');
    if (prev) prev.classList.remove('selected');

    currentHex = id;
    // Add selected class to new hex element
    const el = mapWrapper.querySelector(`.hex[data-id="${id}"]`);
    if (el) el.classList.add('selected');

    sidebarHexId.textContent = id;
    notesBox.value = hexData[id]?.notes || "";

    // Update emoji display
    updateEmojiDisplay();
}

// =========================
// BUILD HEX GRID AFTER IMAGE LOADS
// =========================
function buildHexGrid() {
    const imgRect = mapImage.getBoundingClientRect();
    const containerRect = mapWrapper.getBoundingClientRect();

    const displayedWidth = imgRect.width;
    const displayedHeight = imgRect.height;

    // Get settings values and apply scale
    const rows = settings.rows;
    const cols = settings.cols;
    const scale = settings.scale || 1;
    const topOffset = settings.topOffset * scale;
    const bottomOffset = settings.bottomOffset * scale;
    const leftOffset = settings.leftOffset * scale;
    const rightOffset = settings.rightOffset * scale;

    // Apply scale to the image display
    if (scale !== 1) {
        mapImage.style.transform = `scale(${scale})`;
        mapImage.style.transformOrigin = '0 0';
    } else {
        mapImage.style.transform = '';
    }
    let hexWidth, hexHeight;
    if (settings.hexWidth && settings.hexHeight) {
        hexWidth = settings.hexWidth * scale;
        hexHeight = settings.hexHeight * scale;
    } else {
        // For flat-top hexagons: height = (sqrt(3)/2) * width
        // Compute hex width two ways and pick the smaller to avoid cumulative drift
        const availableWidth = displayedWidth - leftOffset - rightOffset;
        const availableHeight = displayedHeight - topOffset - bottomOffset;
        const hexWidthByWidth = availableWidth / (1 + 0.75 * (cols - 1));
        const hexWidthByHeight = (availableHeight * (2 / Math.sqrt(3))) / (rows + 0.5);
        hexWidth = Math.min(hexWidthByHeight, hexWidthByWidth);
        hexHeight = hexWidth * (Math.sqrt(3) / 2);
    }

    // Horizontal spacing between adjacent columns for flat-top hex grid (center-to-center)
    const hexHSpacing = (cols > 1) ? (displayedWidth - leftOffset - rightOffset - hexWidth) / (cols - 1) : hexWidth;

    // Vertical spacing between rows accounting for all offsets
    const rowSpacing = (rows > 1) ? (displayedHeight - hexHeight - topOffset - bottomOffset) / (rows - 0.5) : hexHeight;

    // Clear any existing hexes
    mapWrapper.querySelectorAll('.hex').forEach(el => el.remove());

    // Start position: image offset + left offset
    let leftStart = (imgRect.left - containerRect.left) + leftOffset;
    let topStart = (imgRect.top - containerRect.top) + topOffset;

    // Compute correction factor: ensure last column ends exactly at right boundary
    // Last hex right edge should be at: displayedWidth - rightOffset
    // So: leftStart + (cols-1)*hexHSpacing + hexWidth = displayedWidth - rightOffset
    // But due to rounding, we may have drift; distribute correction evenly
    const targetRightEdge = displayedWidth - rightOffset;
    const computedRightEdge = leftStart + (cols - 1) * hexHSpacing + hexWidth;
    const spacingDrift = (targetRightEdge - computedRightEdge) / (cols - 1);
    const adjustedHexHSpacing = hexHSpacing + spacingDrift;

    // Debug overlay: enable via ?debug=1 or setting window.DEBUG_HEX_ALIGNMENT = true in console
    const debug = window.DEBUG_HEX_ALIGNMENT || new URLSearchParams(window.location.search).has('debug');
    if (debug) {
        console.log({ displayedWidth, displayedHeight, hexWidth, hexHeight, hexHSpacing, adjustedHexHSpacing, spacingDrift, rowSpacing, leftStart, topStart });
        let dbg = document.getElementById('hex-debug-overlay');
        if (!dbg) {
            dbg = document.createElement('div');
            dbg.id = 'hex-debug-overlay';
            dbg.style.position = 'absolute';
            dbg.style.left = '0';
            dbg.style.top = '0';
            dbg.style.width = '100%';
            dbg.style.height = '100%';
            dbg.style.pointerEvents = 'none';
            dbg.style.zIndex = 9999;
            mapWrapper.appendChild(dbg);
        }
        dbg.innerHTML = '';
        const imgLeft = Math.round(imgRect.left - containerRect.left);
        const imgRight = Math.round(imgLeft + displayedWidth);
        const gridLeft = Math.round(leftStart);
        const totalGridWidth = hexWidth + adjustedHexHSpacing * (cols - 1);
        const gridRightRounded = Math.round(leftStart + totalGridWidth);
        function drawV(x, color, label) {
            const el = document.createElement('div');
            el.style.position = 'absolute';
            el.style.left = x + 'px';
            el.style.top = '0';
            el.style.width = '1px';
            el.style.height = '100%';
            el.style.background = color;
            dbg.appendChild(el);
            if (label) {
                const t = document.createElement('div');
                t.style.position = 'absolute';
                t.style.left = (x + 3) + 'px';
                t.style.top = '2px';
                t.style.color = color;
                t.style.fontSize = '10px';
                t.style.background = 'rgba(255,255,255,0.8)';
                t.textContent = label + ' (' + x + ')';
                dbg.appendChild(t);
            }
        }
        drawV(imgLeft, 'blue', 'imgLeft');
        drawV(imgRight, 'blue', 'imgRight');
        drawV(gridLeft, 'green', 'gridLeft');
        drawV(gridRightRounded, 'green', 'gridRight');
        // draw centers for each column
        for (let i = 0; i < cols; i++) {
            const cx = Math.round(leftStart + i * adjustedHexHSpacing + hexWidth / 2);
            drawV(cx, 'red');
        }
    }

    for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= cols; c++) {
            const hex = document.createElement("div");
            hex.className = "hex";

            // Use column-first ID (CCRR) so leftmost column is 0101..0117, next is 0201..0217, etc.
            const id = String(c).padStart(2, "0") + String(r).padStart(2, "0");
            hex.dataset.id = id;

            // Size the hex (px)
            hex.style.width = hexWidth + "px";
            hex.style.height = hexHeight + "px";

            // Position the hex relative to the container with all offsets applied
            const colOffsetX = (c - 1) * adjustedHexHSpacing;
            const colOffsetY = ((c - 1) % 2) ? (rowSpacing / 2) : 0;

            const left = Math.round(leftStart + colOffsetX);
            const top = Math.round(topStart + (r - 1) * rowSpacing + colOffsetY);

            hex.style.left = left + "px";
            hex.style.top = top + "px";

            // Click handler
            hex.addEventListener("click", () => openHex(id));

            // Apply hasData class if this hex has the flag set
            if (hexData[id]?.hasData) {
                hex.classList.add('hasData');
            }

            // Create emoji display container
            const emojiDisplay = document.createElement('div');
            emojiDisplay.className = 'hex-emoji-display';
            emojiDisplay.style.position = 'absolute';
            emojiDisplay.style.inset = '0';
            emojiDisplay.style.display = 'flex';
            emojiDisplay.style.alignItems = 'center';
            emojiDisplay.style.justifyContent = 'center';
            emojiDisplay.style.flexWrap = 'wrap';
            emojiDisplay.style.gap = '2px';
            emojiDisplay.style.padding = '4px';
            //emojiDisplay.style.fontSize = '12px';
            emojiDisplay.style.pointerEvents = 'none';
            emojiDisplay.dataset.id = id;
            hex.appendChild(emojiDisplay);

            mapWrapper.appendChild(hex);
        }
    }

    Object.keys(hexData).forEach(id => {
        updateHexVisuals(id);
        updateHexEmojis(id);
    });
}

// If image already loaded (from cache), build immediately; otherwise wait for load
if (mapImage.complete && mapImage.naturalWidth !== 0) {
    // Delay to allow layout to stabilize
    window.requestAnimationFrame(() => {
        if (settingsLoaded) buildHexGrid();
    });
} else {
    mapImage.addEventListener('load', () => {
        window.requestAnimationFrame(() => {
            if (settingsLoaded) buildHexGrid();
        });
    });
}

// Safeguard: attempt to build grid after a short delay if settings loaded (handles race conditions)
setTimeout(() => {
    if (settingsLoaded && mapImage.complete && mapImage.naturalWidth !== 0) {
        window.requestAnimationFrame(buildHexGrid);
    }
}, 100);

// =========================
// EMOJI FUNCTIONALITY
// =========================
function updateEmojiDisplay() {
    if (!currentHex) {
        selectedEmojisContainer.innerHTML = '';
        return;
    }

    const emojis = hexData[currentHex]?.emojis || [];
    selectedEmojisContainer.innerHTML = '';

    emojis.forEach((emoji, idx) => {
        const emojiItem = document.createElement('div');
        emojiItem.className = 'emoji-item';
        emojiItem.innerHTML = `
            <span>${emoji}</span>
            <button type="button" data-index="${idx}" class="remove-emoji">×</button>
        `;
        selectedEmojisContainer.appendChild(emojiItem);

        emojiItem.querySelector('.remove-emoji').addEventListener('click', (e) => {
            e.stopPropagation();
            removeEmoji(idx);
        });
    });
}

function addEmoji(emoji) {
    if (!currentHex) return;

    if (!hexData[currentHex]) {
        hexData[currentHex] = {};
    }

    if (!hexData[currentHex].emojis) {
        hexData[currentHex].emojis = [];
    }

    // Limit to 4 emojis
    if (hexData[currentHex].emojis.length < 4) {
        hexData[currentHex].emojis.push(emoji);
        saveData();
        updateEmojiDisplay();
    }
}

function removeEmoji(index) {
    if (!currentHex || !hexData[currentHex]?.emojis) return;

    hexData[currentHex].emojis.splice(index, 1);
    saveData();
    updateEmojiDisplay();
}

function updateHexEmojis(id) {
    const hexEl = mapWrapper.querySelector(`.hex[data-id="${id}"]`);
    if (!hexEl) return;

    const emojiDisplay = hexEl.querySelector('.hex-emoji-display');
    if (!emojiDisplay) return;

    const emojis = hexData[id]?.emojis || [];
    //emojiDisplay.innerHTML = emojis.map(e => `<span>${e}</span>`).join('');
    emojiDisplay.innerHTML = '';
    emojis.forEach(e => {
        const span = document.createElement('span');
        span.textContent = e;
        emojiDisplay.appendChild(span);
    });

}

// Emoji picker button toggle
emojiPickerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (emojiPickerWrapper) {
        const isHidden = emojiPickerWrapper.style.display === 'none' || !emojiPickerWrapper.style.display;
        emojiPickerWrapper.style.display = isHidden ? 'block' : 'none';
        console.log('Emoji picker toggled, now:', isHidden ? 'visible' : 'hidden');
    }
});
function showSaveFeedback() {
    saveBtn.textContent = "Saved!";
    saveBtn.style.backgroundColor = "#4CAF50";
    setTimeout(() => {
        saveBtn.textContent = "Save";
        saveBtn.style.backgroundColor = "";
    }, 1500);
}

function performSave() {
    if (!currentHex) return;

    // Initialize hex data object if it doesn't exist
    if (!hexData[currentHex]) {
        hexData[currentHex] = {};
    }

    hexData[currentHex].notes = notesBox.value;

    // Set hasData flag based on whether notes are empty
    hexData[currentHex].hasData = notesBox.value.trim().length > 0;

    saveData();
    showSaveFeedback();
}

function performClear() {
    if (!currentHex) return;
    notesBox.value = "";
    hexData[currentHex] = { notes: "", emojis: [], hasData: false };
    saveData();
    updateEmojiDisplay();
    showClearFeedback();
}

function showClearFeedback() {
    clearBtn.textContent = "Cleared!";
    clearBtn.style.backgroundColor = "#6c757d";
    setTimeout(() => {
        clearBtn.textContent = "Clear";
        clearBtn.style.backgroundColor = "";
    }, 1000);
}

// Save on button click
saveBtn.addEventListener("click", performSave);

// Clear on button click
clearBtn.addEventListener("click", performClear);

// Auto-save when notes change (debounced)
let autoSaveTimeout;
notesBox.addEventListener("change", () => {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(performSave, 1000);
});

// Keyboard shortcut: Ctrl+S to save
document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        performSave();
    }
});