const MAX_JPG_SIZE = 143360;
const OPPO_JPG_SIZE = 204800;
const OPPO_THUMB_SIZE = 51200;
const DEFAULT_ZOOM = 0.62;
const UPLOAD_IMAGE_MAX_EDGE = 3000;
const UPLOAD_IMAGE_TARGET_SIZE = 1572864;
const UPLOAD_IMAGE_QUALITIES = [0.86, 0.78, 0.7, 0.62, 0.54, 0.46, 0.38, 0.3];

const state = {
  fontFamily: "system-ui",
  fontLoaded: false,
  fontName: "MBLatant",
  image: null,
  baseImages: {},
  referenceImages: {},
  imageEditMode: false,
  activeTemplateId: "pic_font_default",
  activeLayerKey: null,
  activePlatformId: "honor",
  textGroupSelections: {},
  pendingGroupName: "",
  zoom: DEFAULT_ZOOM,
  imagePlacements: {},
  imageOverflowVisible: true,
  mask: { color: "#ffffff", opacity: 0 },
  reference: { visible: false, opacity: 0.45 },
  guides: [],
  drag: null
};

const honorTemplates = [
  {
    id: "pic_font_default",
    file: "pic_font_default.jpg",
    width: 640,
    height: 458,
    maxSize: MAX_JPG_SIZE,
    imageBox: [-31, -242, 702, 1053],
    supportsMask: true,
    layers: [
      { text: "{fontName}", box: [175, 196, 461, 252], size: 100, color: "#fff", align: "center", tracking: 7.5 }
    ]
  },
  {
    id: "pic_font_square",
    file: "pic_font_square.jpg",
    width: 640,
    height: 640,
    maxSize: MAX_JPG_SIZE,
    imageBox: [-67, -186, 774, 1160],
    supportsMask: true,
    layers: [
      { text: "{fontName}", box: [175, 286, 461, 342], size: 100, color: "#fff", align: "center", tracking: 7.5 }
    ]
  },
  {
    id: "preview_fonts_0",
    file: "preview_fonts_0.jpg",
    width: 1080,
    height: 2160,
    maxSize: MAX_JPG_SIZE,
    imageBox: [-828, -16, 2086, 3128],
    supportsMask: true,
    layers: [
      { text: "{fontName}", box: [380, 488, 696, 549], size: 110, color: "#fff", align: "center", tracking: 8.3 },
      { text: "ABCDEFGHIJKLMN\nOPQRSTUVWXYZ", box: [255, 767, 826, 992], size: 110, lineHeight: 160, color: "#fff", align: "center", tracking: 8.3 },
      { text: "abcdefghijklmn\nopqrstuvwxyz", box: [293, 1171, 789, 1411], size: 110, lineHeight: 160, color: "#fff", align: "center", tracking: 8.3 },
      { text: "1234567890", box: [354, 1615, 727, 1674], size: 110, color: "#fff", align: "center", tracking: 8.3 }
    ]
  },
  {
    id: "preview_fonts_4",
    file: "preview_fonts_4.jpg",
    width: 1080,
    height: 2160,
    maxSize: MAX_JPG_SIZE,
    base: "assets/preview_fonts_4-base.jpg",
    layers: [
      { text: "26℃", box: [834, 340, 893, 374], size: 58, color: "#fff", align: "center" },
      { text: "28/21", box: [829, 401, 887, 422], size: 33, color: "#fff", align: "center", tracking: 1 },
      { text: "Tuesday, June 14", box: [454, 477, 626, 504], size: 38, color: "#fff", align: "center" },
      { text: "My HONOR", box: [111, 1511, 206, 1536], size: 33, color: "#fff", align: "center" },
      { text: "Themes", box: [384, 1512, 444, 1530], size: 33, color: "#fff", align: "center" },
      { text: "Settings", box: [635, 1512, 697, 1537], size: 33, color: "#fff", align: "center" },
      { text: "Gallery", box: [891, 1512, 948, 1536], size: 33, color: "#fff", align: "center" },
      { text: "Tuesday", box: [637, 1632, 696, 1653], size: 29, color: "#000", align: "center" },
      { text: "Tool", box: [143, 1801, 175, 1819], size: 33, color: "#fff", align: "center" },
      { text: "Tips", box: [399, 1802, 429, 1826], size: 33, color: "#fff", align: "center" },
      { text: "Calendar", box: [628, 1801, 704, 1819], size: 33, color: "#fff", align: "center" },
      { text: "System\nManager", box: [882, 1802, 956, 1867], size: 33, lineHeight: 38, color: "#fff", align: "center" }
    ]
  },
  {
    id: "preview_fonts_5",
    file: "preview_fonts_5.jpg",
    width: 1080,
    height: 2160,
    maxSize: MAX_JPG_SIZE,
    base: "assets/preview_fonts_5-base.jpg",
    layers: [
      { text: "Contacts", box: [74, 275, 264, 323], size: 90, color: "#000", align: "left" },
      { text: "416 contacts", box: [73, 376, 200, 399], size: 42, color: "#666", align: "left" },
      { text: "Search", box: [192, 532, 271, 558], size: 48, color: "#666", align: "left" },
      { text: "Groups", box: [241, 724, 316, 759], size: 48, color: "#000", align: "left" },
      { text: "Business cards", box: [241, 941, 409, 967], size: 48, color: "#000", align: "left" },
      { text: "Alex", box: [240, 1122, 292, 1148], size: 48, color: "#000", align: "left" },
      { text: "My card", box: [240, 1196, 327, 1226], size: 42, color: "#666", align: "left" },
      { text: "J", box: [73, 1347, 89, 1377], size: 54, color: "#000", align: "left" },
      { text: "Jackson", box: [241, 1481, 334, 1507], size: 48, color: "#000", align: "left" },
      { text: "J", box: [126, 1515, 140, 1542], size: 48, color: "#fff", align: "center" },
      { text: "Friend", box: [240, 1557, 301, 1579], size: 42, color: "#666", align: "left" },
      { text: "Jary", box: [241, 1696, 296, 1730], size: 48, color: "#000", align: "left" },
      { text: "J", box: [129, 1738, 143, 1764], size: 48, color: "#fff", align: "center" },
      { text: "HONOR ", box: [240, 1772, 320, 1795], size: 42, color: "#666", align: "left" },
      { text: "J", box: [123, 1945, 137, 1971], size: 48, color: "#fff", align: "center" },
      { text: "Jolin", box: [241, 1945, 291, 1971], size: 48, color: "#000", align: "left" },
      { text: "#\nA\nB\nC\nD\nE\nF\nG\nH\nI\nJ\nK\nL\nM\nN\nO\nP\nQ\nR\nS\nT\nU\nV\nW\nX\nY\nZ", box: [1035, 690, 1054, 1879], size: 36, lineHeight: 43, color: "#666", align: "center", charColors: { "J": "#256fff" } },
      { text: "Phone", box: [158, 2109, 200, 2125], size: 30, color: "#666", align: "center" },
      { text: "Contacts", box: [508, 2109, 572, 2125], size: 30, color: "#256fff", align: "center" },
      { text: "Favorites", box: [869, 2109, 931, 2125], size: 30, color: "#666", align: "center" }
    ]
  },
  {
    id: "preview_fonts_6",
    file: "preview_fonts_6.jpg",
    width: 1080,
    height: 2160,
    maxSize: MAX_JPG_SIZE,
    base: "assets/preview_fonts_6-base.jpg",
    layers: [
      { text: "Tuesday, March 21", box: [103, 283, 296, 313], size: 42, color: "#000", align: "left" },
      { text: "Wi-Fi", box: [150, 566, 185, 583], size: 30, color: "#000", align: "center" },
      { text: "Bluetooth", box: [393, 567, 457, 583], size: 30, color: "#000", align: "center" },
      { text: "Flashlight", box: [634, 567, 697, 589], size: 30, color: "#000", align: "center" },
      { text: "Sound", box: [890, 567, 935, 583], size: 30, color: "#000", align: "center" },
      { text: "Auto-rotate", box: [132, 852, 219, 868], size: 30, color: "#000", align: "center" },
      { text: "HONOR share", box: [367, 853, 470, 869], size: 30, color: "#000", align: "center" },
      { text: "Airplane mode", box: [612, 853, 717, 874], size: 30, color: "#000", align: "center" },
      { text: "Mobile data", box: [861, 851, 949, 868], size: 30, color: "#000", align: "center" },
      { text: "Location", box: [145, 1139, 206, 1155], size: 30, color: "#000", align: "center" },
      { text: "Screenshot", box: [380, 1139, 457, 1155], size: 30, color: "#000", align: "center" },
      { text: "Eye Comfort", box: [616, 1139, 706, 1160], size: 30, color: "#000", align: "center" },
      { text: "Personal hostpot", box: [847, 1139, 964, 1160], size: 30, color: "#000", align: "center" },
      { text: "Screen Recorder", box: [116, 1429, 234, 1445], size: 30, color: "#000", align: "center" },
      { text: "Wireless\nProjection", box: [384, 1428, 452, 1487], size: 24, lineHeight: 28, color: "#000", align: "center" },
      { text: "Do Not Disturb", box: [608, 1429, 715, 1445], size: 30, color: "#000", align: "center" },
      { text: "5G", box: [893, 1429, 913, 1446], size: 30, color: "#000", align: "center" },
      { text: "Dark Mode", box: [134, 1715, 216, 1733], size: 30, color: "#000", align: "center" },
      { text: "eBook mode", box: [374, 1716, 463, 1733], size: 30, color: "#000", align: "center" },
      { text: "Power Saving\nmode", box: [613, 1716, 709, 1768], size: 24, lineHeight: 28, color: "#000", align: "center" },
      { text: "Navigation\nDock", box: [866, 1716, 945, 1769], size: 24, lineHeight: 28, color: "#000", align: "center" }
    ]
  }
];

const oppoTemplates = [
  {
    id: "oppo_detail",
    platform: "oppo",
    file: "详情页预览图.jpg",
    width: 1080,
    height: 1920,
    maxSize: OPPO_JPG_SIZE,
    imageBox: [-591, -20, 1958, 2938],
    layers: [
      { text: "Shattered Edge", box: [168, 443, 915, 538], size: 120, color: "#fff", align: "left", tracking: 9 },
      { text: "Continent meets abyss.\nViridian swells rise.\nCliffs violently shatter.\nWhite foam explodes.\nTide hisses back.\nBrine chokes air.\nEarth breathes heavy.", box: [171, 704, 910, 1483], size: 80, lineHeight: 120, color: "#fff", align: "left", tracking: 6 }
    ]
  },
  {
    id: "oppo_desktop",
    platform: "oppo",
    file: "桌面预览图.jpg",
    width: 1080,
    height: 1920,
    maxSize: OPPO_JPG_SIZE,
    base: "assets/oppo_desktop-base.jpg",
    layers: [
      { text: "Calculator", box: [115, 1376, 228, 1396], size: 33, color: "#fff", align: "left" },
      { text: "Theme Store", box: [591, 1375, 735, 1395], size: 33, color: "#fff", align: "left" },
      { text: "Weather", box: [368, 1377, 464, 1397], size: 33, color: "#fff", align: "left" },
      { text: "Setting", box: [869, 1378, 949, 1403], size: 33, color: "#fff", align: "left" },
      { text: "Calender", box: [120, 1086, 220, 1106], size: 33, color: "#fff", align: "left" },
      { text: "Clock", box: [387, 1088, 447, 1108], size: 33, color: "#fff", align: "left" },
      { text: "Music", box: [631, 1088, 694, 1108], size: 33, color: "#fff", align: "left" },
      { text: "Photos", box: [871, 1088, 947, 1108], size: 33, color: "#fff", align: "left" },
      { text: "Sunny 19° New York", box: [333, 496, 571, 524], size: 36, color: "#fff", align: "left" }
    ]
  },
  {
    id: "oppo_sms",
    platform: "oppo",
    file: "短信预览图.jpg",
    width: 1080,
    height: 1920,
    maxSize: OPPO_JPG_SIZE,
    base: "assets/oppo_sms-base.jpg",
    shapeLayers: [
      { name: "左侧气泡 1", box: [71, 398, 399, 528], radius: { topLeft: 48, topRight: 48, bottomRight: 48, bottomLeft: 6 }, color: "#f5f5f7", eraseBox: [51, 378, 419, 548] },
      { name: "右侧气泡 1", box: [611, 574, 1007, 825], radius: { topLeft: 48, topRight: 48, bottomRight: 4, bottomLeft: 48 }, color: "#66cd88", eraseBox: [591, 554, 1027, 845] },
      { name: "右侧气泡 2", box: [399, 869, 1008, 1000], radius: { topLeft: 48, topRight: 48, bottomRight: 6, bottomLeft: 48 }, color: "#66cd88", eraseBox: [379, 849, 1028, 1020] },
      { name: "左侧气泡 2", box: [71, 1044, 690, 1281], radius: { topLeft: 48, topRight: 48, bottomRight: 48, bottomLeft: 6 }, color: "#f5f5f7", eraseBox: [51, 1024, 710, 1301] }
    ],
    layers: [
      { text: "1234567890", box: [186, 161, 383, 189], size: 35.3292, color: "#000", align: "left" },
      { text: "NEW YORK, USA", box: [187, 227, 405, 252], size: 26.4969, color: "#000", align: "left", tracking: 0.529938 },
      { text: "TODAY 10:12", box: [487, 345, 623, 362], size: 22.08075, color: "#000", align: "left", tracking: 0.441615 },
      { text: "No pain, no gain.", box: [109, 454, 364, 488], size: 45, lineHeight: 60, color: "#000", align: "left", tracking: 0.9 },
      { text: "When you hoist the sails to cross the \nsea, you'll ride the wind and cleave \nthe waves.", box: [109, 1095, 659, 1243], size: 45, lineHeight: 60, color: "#000", align: "left" },
      { text: "Journey of thousand \nmiles begins with \na single step.", box: [649, 625, 978, 781], size: 45, lineHeight: 60, color: "#fff", align: "left", tracking: 0.9 },
      { text: "Where there's a will, there's a way.", box: [437, 920, 977, 958], size: 45, lineHeight: 60, color: "#fff", align: "left", tracking: 0.9 },
      { text: "Text Message", box: [205, 1795, 418, 1829], size: 45, lineHeight: 60, color: "#000", align: "left" }
    ]
  },
  {
    id: "oppo_contacts",
    platform: "oppo",
    file: "联系人界面预览图.jpg",
    width: 1080,
    height: 1920,
    maxSize: OPPO_JPG_SIZE,
    base: "assets/oppo_contacts-base.jpg",
    layers: [
      { text: "ALL CALLS", box: [70, 191, 256, 219], size: 35.3292, color: "#66cd88", align: "left" },
      { text: "PHONE", box: [148, 304, 265, 332], size: 48, color: "#000", align: "left" },
      { text: "CONTACTS", box: [417, 304, 602, 332], size: 48, color: "#000", align: "left" },
      { text: "FAVORITES", box: [740, 304, 933, 332], size: 48, color: "#000", align: "left" },
      { text: "CONTACTS", box: [188, 481, 350, 506], size: 42, color: "#000", align: "left" },
      { text: "Brother", box: [71, 686, 165, 708], size: 36, color: "#000", align: "left" },
      { text: "B", box: [70, 621, 92, 649], size: 48, color: "#000", align: "left" },
      { text: "Dad", box: [71, 902, 120, 924], size: 36, color: "#000", align: "left" },
      { text: "D", box: [70, 837, 93, 865], size: 48, color: "#000", align: "left" },
      { text: "Grandma", box: [70, 1119, 180, 1141], size: 36, color: "#000", align: "left" },
      { text: "G", box: [69, 1054, 93, 1082], size: 48, color: "#000", align: "left" },
      { text: "MOM", box: [70, 1336, 136, 1357], size: 36, color: "#000", align: "left" },
      { text: "M", box: [69, 1270, 97, 1298], size: 48, color: "#000", align: "left" },
      { text: "Sister", box: [70, 1553, 142, 1574], size: 36, color: "#000", align: "left" },
      { text: "S", box: [69, 1487, 89, 1515], size: 48, color: "#000", align: "left" }
    ]
  },
  {
    id: "oppo_settings",
    platform: "oppo",
    file: "系统设置界面.jpg",
    width: 1080,
    height: 1920,
    maxSize: OPPO_JPG_SIZE,
    base: "assets/oppo_settings-base.jpg",
    layers: [
      { text: "On", box: [835, 1063, 869, 1084], size: 36, color: "#000", align: "left" },
      { text: "On", box: [835, 1219, 874, 1240], size: 36, color: "#000", align: "left" },
      { text: "Settings", box: [70, 190, 205, 227], size: 35.3292, color: "#000", align: "left" },
      { text: "Sign in to Your ID", box: [223, 504, 466, 537], size: 42, color: "#000", align: "left" },
      { text: "Sign in to your ID to explore more", box: [222, 557, 627, 585], size: 36, color: "#000", align: "left" },
      { text: "Aeroplane Mode", box: [186, 767, 386, 795], size: 36, color: "#000", align: "left" },
      { text: "Dual SIM & Cellular Network", box: [186, 923, 528, 945], size: 36, color: "#000", align: "left" },
      { text: "Wi-Fi", box: [186, 1062, 248, 1084], size: 36, color: "#000", align: "left" },
      { text: "Bluetooth", box: [186, 1218, 304, 1240], size: 36, color: "#000", align: "left" },
      { text: "Other Wireless Connections", box: [186, 1374, 518, 1396], size: 35.3292, color: "#000", align: "left" },
      { text: "Notification & Status Bar", box: [186, 1621, 493, 1643], size: 36, color: "#000", align: "left" },
      { text: "Display & Brightness", box: [186, 1777, 433, 1805], size: 36, color: "#000", align: "left" },
      { text: "Contacts", box: [187, 325, 316, 350], size: 42, color: "#000", align: "left" }
    ]
  },
  {
    id: "oppo_thumb",
    platform: "oppo",
    file: "新缩略图.jpg",
    width: 480,
    height: 320,
    maxSize: OPPO_THUMB_SIZE,
    base: "assets/oppo_thumb-base.jpg",
    layers: [
      { text: "{fontName}", box: [155, 43, 323, 72], size: 50, color: "#000", align: "left" },
      { text: "Hello", box: [201, 86, 279, 116], size: 50, color: "#000", align: "left" }
    ]
  }
];

const vivoTemplates = [
  {
    id: "vivo_preview_fonts_0",
    platform: "vivo",
    file: "preview_fonts_0.jpg",
    width: 1440,
    height: 2560,
    maxSize: 409600,
    imageBox: [-419, -131, 2677, 4014],
    layers: [
      { text: "{fontName}", box: [413.586, 676.929, 955.586, 770.929], size: 120, lineHeight: 60, color: "#ffffff", align: "center", tracking: 9 },
      { text: "abcdefghijklmn\nopqrstuvwxyz", box: [244, 1337.923, 1196, 1621.923], size: 120, lineHeight: 160, color: "#ffffff", align: "center", tracking: 9 },
      { text: "ABCDEFGHIJKLMN\nOPQRSTUVWXYZ", box: [126.5, 944.765, 1313.5, 1205.765], size: 120, lineHeight: 160, color: "#ffffff", align: "center", tracking: 9 },
      { text: "1234567890", box: [335, 1802.939, 1105, 1898.939], size: 120, lineHeight: 385, color: "#ffffff", align: "center", tracking: 9 }
    ]
  },
  {
    id: "vivo_preview_fonts_small_0",
    platform: "vivo",
    file: "preview_fonts_small_0.png",
    width: 652,
    height: 84,
    maxSize: Infinity,
    format: "png",
    transparent: true,
    layers: [
      { text: "{fontName}", box: [139.5, 2.5, 512.5, 81.5], size: 65, lineHeight: 53.26, color: "#333333", align: "center", tracking: 7 }
    ]
  }
];

honorTemplates.forEach(template => {
  template.platform = "honor";
});

const templates = [...honorTemplates, ...oppoTemplates, ...vivoTemplates];

const referenceSources = {
  pic_font_default: "assets/reference/honor-pic_font_default.png",
  pic_font_square: "assets/reference/honor-pic_font_square.png",
  preview_fonts_0: "assets/reference/honor-preview_fonts_0.png",
  preview_fonts_4: "assets/reference/honor-preview_fonts_4.png",
  preview_fonts_5: "assets/reference/honor-preview_fonts_5.png",
  preview_fonts_6: "assets/reference/honor-preview_fonts_6.png",
  oppo_detail: "assets/reference/oppo-detail.png",
  oppo_desktop: "assets/reference/oppo-desktop.png",
  oppo_sms: "assets/reference/oppo-sms.png",
  oppo_contacts: "assets/reference/oppo-contacts.png",
  oppo_settings: "assets/reference/oppo-settings.png",
  oppo_thumb: "assets/reference/oppo-thumb.png",
  vivo_preview_fonts_0: "assets/reference/vivo-preview_fonts_0.png",
  vivo_preview_fonts_small_0: "assets/reference/vivo-preview_fonts_small_0.png"
};

templates.forEach(template => {
  template.reference = referenceSources[template.id] || null;
});

const defaultPsdLayerOverrides = {
  pic_font_default: [
    { text: "{fontName}", box: [94, 190.5, 546, 267.5], size: 100, lineHeight: 60, color: "#ffffff", align: "center", tracking: 7.5 }
  ],
  pic_font_square: [
    { text: "{fontName}", box: [94, 281.5, 546, 358.5], size: 100, lineHeight: 60, color: "#ffffff", align: "center", tracking: 7.5 }
  ],
  preview_fonts_0: [
    { text: "{fontName}", box: [262.838, 474.195, 759.838, 559.195], size: 110, lineHeight: 60, color: "#ffffff", align: "center", tracking: 8.25 },
    { text: "ABCDEFGHIJKLMN\nOPQRSTUVWXYZ", box: [61, 743, 1014, 994], size: 110, lineHeight: 160, color: "#ffffff", align: "center" },
    { text: "abcdefghijklmn\nopqrstuvwxyz", box: [162, 1143, 916, 1414], size: 110, lineHeight: 160, color: "#ffffff", align: "center" },
    { text: "1234567890", box: [231.5, 1590, 857.5, 1675], size: 110, lineHeight: 385, color: "#ffffff", align: "center" }
  ],
  preview_fonts_4: [
    { text: "28/21", box: [805, 400, 898, 426], size: 38, color: "#ffffff", align: "center", tracking: 0.667 },
    { text: "Tuesday, June 14", box: [384.88, 467.608, 684.88, 505.608], size: 40, color: "#ffffff", align: "center" },
    { text: "26℃", box: [804.5, 333, 932.5, 382], size: 58, color: "#ffffff", align: "center" },
    { text: "Settings", box: [602, 1505, 725, 1538], size: 34, color: "#ffffff", align: "center", editGroup: "icon" },
    { text: "Gallery", box: [867, 1505, 969, 1539], size: 34, color: "#ffffff", align: "center", editGroup: "icon" },
    { text: "My HONOR", box: [73.431, 1502.8, 244.431, 1536.8], size: 34, color: "#ffffff", align: "center", editGroup: "icon" },
    { text: "Themes", box: [353.751, 1508.762, 474.751, 1534.762], size: 34, color: "#ffffff", align: "center", editGroup: "icon" },
    { text: "Calendar", box: [596.015, 1795.759, 731.015, 1821.759], size: 34, color: "#ffffff", align: "center", editGroup: "icon" },
    { text: "System\nManager", box: [857.551, 1791.759, 988.551, 1864.759], size: 34, color: "#ffffff", align: "center", editGroup: "icon" },
    { text: "Tool", box: [124, 1796, 186, 1822], size: 34, color: "#ffffff", align: "center", editGroup: "icon" },
    { text: "Tips", box: [382.11, 1792.638, 443.11, 1824.638], size: 34, color: "#ffffff", align: "center", editGroup: "icon" },
    { text: "Tuesday", box: [613, 1625, 721, 1655], size: 29.167, color: "#000000", align: "left" }
  ],
  preview_fonts_5: [
    { text: "J", box: [123, 1936, 142, 1972], size: 49, lineHeight: 81, color: "#ffffff", align: "left" },
    { text: "A", box: [116, 1152, 149, 1188], size: 49, lineHeight: 81, color: "#ffffff", align: "left" },
    { text: "Jolin", box: [241.559, 1936, 338.559, 1974], size: 49, lineHeight: 27, color: "#000000", align: "left" },
    { text: "HONOR ", box: [240.43, 1764, 397.43, 1796], size: 43, color: "#666666", align: "left" },
    { text: "Jary", box: [240, 1686, 330, 1733], size: 49, lineHeight: 27, color: "#000000", align: "left" },
    { text: "Friend", box: [240, 1551, 356, 1584], size: 43, lineHeight: 27, color: "#666666", align: "left" },
    { text: "Jackson", box: [240, 1476, 412, 1514], size: 49, lineHeight: 27, color: "#000000", align: "left" },
    { text: "Groups", box: [244.054, 712.633, 395.054, 759.633], size: 48, lineHeight: 27, color: "#000000", align: "left" },
    { text: "Business cards", box: [244.054, 932.733, 556.054, 970.733], size: 49, lineHeight: 27, color: "#000000", align: "left" },
    { text: "Alex", box: [240, 1115, 335, 1153], size: 49, lineHeight: 27, color: "#000000", align: "left" },
    { text: "My card", box: [242, 1187, 386, 1229], size: 43, lineHeight: 27, color: "#666666", align: "left" },
    { text: "Contacts", box: [76, 263, 437, 333], size: 95, lineHeight: 27, color: "#000000", align: "left" },
    { text: "416 contacts", box: [73, 369.782, 316, 401.782], size: 44, color: "#666666", align: "left" },
    { text: "#\nA\nB\nC\nD\nE\nF\nG\nH\nI\nJ\nK\nL\nM\nN\nO\nP\nQ\nR\nS\nT\nU\nV\nW\nX\nY\nZ", box: [1027, 686, 1061, 1882], size: 37, lineHeight: 45, color: "#666666", align: "center", charColors: { "J": "#256fff" } },
    { text: "Search", box: [190.811, 526.732, 332.811, 564.732], size: 48, color: "#666666", align: "left" },
    { text: "Favorites", box: [840, 2105, 959, 2128], size: 32, color: "#666666", align: "center" },
    { text: "Contacts", box: [479, 2105, 599, 2128], size: 32, color: "#256fff", align: "center" },
    { text: "Phone", box: [137.953, 2103.425, 221.953, 2127.425], size: 32, color: "#666666", align: "center" },
    { text: "J", box: [123, 1506, 142, 1543], size: 49, color: "#ffffff", align: "left" },
    { text: "J", box: [73, 1336, 95, 1377], size: 54, lineHeight: 50.4, color: "#000000", align: "left" },
    { text: "J", box: [125, 1729, 144, 1765], size: 49, color: "#ffffff", align: "left" }
  ],
  preview_fonts_6: [
    { text: "Wi-Fi", box: [129.674, 561.682, 202.674, 584.682], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "Bluetooth", box: [361, 561, 490, 585], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "Flashlight", box: [603, 557.5, 730, 588.5], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "Sound", box: [870, 561, 954, 585], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "Auto-rotate", box: [93.846, 848.289, 253.846, 871.289], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "HONOR share", box: [324.5, 846, 511.5, 870], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "Airplane mode", box: [564.68, 842.269, 762.68, 873.269], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "Mobile data", box: [826, 846, 983, 870], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "Location", box: [118, 1134.787, 231, 1157.787], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "Screenshot", box: [342.863, 1134.468, 493.863, 1158.468], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "Eye Comfort", box: [577, 1129, 745, 1160], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "Personal hostpot", box: [793, 1129, 1018, 1160], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "Screen Recorder", box: [64, 1424, 285, 1448], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "Wireless\nProjection", box: [351.863, 1422.701, 484.863, 1489.701], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "Do Not Disturb", box: [562, 1424, 760, 1448], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "Dark Mode", box: [100.483, 1709.32, 246.483, 1733.32], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "eBook mode", box: [330, 1710, 501, 1734], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "Power Saving\nmode", box: [573, 1710, 750, 1769], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "Navigation\nDock", box: [834, 1712, 977, 1771], size: 31, color: "#000000", align: "center", editGroup: "iconfont" },
    { text: "Tuesday, March 21", box: [102, 271, 443, 313], size: 43, color: "#000000", align: "left" },
    { text: "5G", box: [885, 1423, 922, 1446], size: 31, color: "#000000", align: "center", editGroup: "iconfont" }
  ],
  oppo_detail: [
    { text: "Shattered Edge", box: [107, 430, 976, 544], size: 120, color: "#ffffff", align: "center", tracking: 6 },
    { text: "Continent meets abyss.\nViridian swells rise.\nCliffs violently shatter.\nWhite foam explodes.\nTide hisses back.\nBrine chokes air.\nEarth breathes heavy.", box: [112, 702, 965, 1482], size: 80, lineHeight: 120, color: "#ffffff", align: "center", tracking: 6 }
  ],
  oppo_desktop: [
    { text: "Calculator", box: [98, 1374.711, 242, 1399.711], size: 33, lineHeight: 63, color: "#ffffff", align: "center", editGroup: "icon" },
    { text: "Theme Store", box: [571, 1373, 754, 1398], size: 33, lineHeight: 63, color: "#ffffff", align: "center", editGroup: "icon" },
    { text: "Weather", box: [356, 1374.904, 478, 1399.904], size: 33, lineHeight: 63, color: "#ffffff", align: "center", editGroup: "icon" },
    { text: "Setting", box: [859, 1371, 958, 1403], size: 33, lineHeight: 63, color: "#ffffff", align: "center", editGroup: "icon" },
    { text: "Calender", box: [106, 1084, 234, 1109], size: 33, lineHeight: 63, color: "#ffffff", align: "center", editGroup: "icon" },
    { text: "Clock", box: [377, 1084, 457, 1109], size: 33, lineHeight: 63, color: "#ffffff", align: "center", editGroup: "icon" },
    { text: "Music", box: [622, 1085, 706, 1110], size: 33, lineHeight: 63, color: "#ffffff", align: "center", editGroup: "icon" },
    { text: "Photos", box: [860.142, 1085, 959.142, 1110], size: 33, lineHeight: 63, color: "#ffffff", align: "center", editGroup: "icon" },
    { text: "Sunny 19° New York", box: [330.5, 490, 645.5, 525], size: 36, color: "#ffffff", align: "center" }
  ],
  oppo_sms: [
    { text: "1234567890", box: [186, 161, 454, 198], size: 47, lineHeight: 78.46, color: "#000000", align: "left" },
    { text: "NEW YORK, USA", box: [187, 222.349, 463, 254.349], size: 36, lineHeight: 78.46, color: "#000000", align: "left", tracking: 0.72 },
    { text: "TODAY 10:12", box: [484, 342, 664, 365], size: 30, lineHeight: 78.46, color: "#000000", align: "center", tracking: 0.6 },
    { text: "No pain, no gain.", box: [110, 448, 440, 490], size: 45, lineHeight: 60, color: "#000000", align: "left", tracking: 0.9 },
    { text: "When you hoist the sails to cross the \nsea, you'll ride the wind and cleave \nthe waves.", box: [110, 1093, 813, 1248], size: 45, lineHeight: 60, color: "#000000", align: "left" },
    { text: "Journey of thousand \nmiles begins with \na single step.", box: [552, 620, 976, 783], size: 45, lineHeight: 60, color: "#ffffff", align: "left", tracking: 0.9 },
    { text: "Where there's a will, there's a way.", box: [297.835, 918.1, 977.835, 963.1], size: 45, lineHeight: 60, color: "#ffffff", align: "left", tracking: 0.9 },
    { text: "Text Message", box: [204, 1789, 473, 1831], size: 45, lineHeight: 60, color: "#000000", align: "left" }
  ],
  oppo_contacts: [
    { text: "ALL CALLS", box: [69, 185, 309, 222], size: 48, lineHeight: 78.46, color: "#66cd88", align: "center" },
    { text: "PHONE", box: [149, 300, 303, 337], size: 48, lineHeight: 60, color: "#000000", align: "center" },
    { text: "CONTACTS", box: [377.5, 302, 626.5, 339], size: 48, lineHeight: 60, color: "#000000", align: "center" },
    { text: "FAVORITES", box: [693, 301, 935, 338], size: 48, lineHeight: 60, color: "#000000", align: "center" },
    { text: "CONTACTS", box: [185.5, 480, 403.5, 512], size: 42, lineHeight: 60, color: "#000000", align: "center" },
    { text: "Brother", box: [73, 686, 187, 713], size: 36, lineHeight: 60, color: "#000000", align: "left" },
    { text: "B", box: [70, 618, 96, 654], size: 48, lineHeight: 60, color: "#000000", align: "left" },
    { text: "Dad", box: [73, 901, 134, 928], size: 36, lineHeight: 60, color: "#000000", align: "left" },
    { text: "D", box: [70.349, 834, 100.349, 870], size: 48, lineHeight: 60, color: "#000000", align: "left" },
    { text: "Grandma", box: [73, 1117, 215, 1144], size: 36, lineHeight: 60, color: "#000000", align: "left" },
    { text: "G", box: [70, 1048, 102, 1085], size: 48, lineHeight: 60, color: "#000000", align: "left" },
    { text: "MOM", box: [73, 1333, 160, 1360], size: 36, lineHeight: 60, color: "#000000", align: "left" },
    { text: "M", box: [70, 1265, 108, 1301], size: 48, lineHeight: 60, color: "#000000", align: "left" },
    { text: "Sister", box: [73, 1551, 160, 1578], size: 36, lineHeight: 60, color: "#000000", align: "left" },
    { text: "S", box: [70, 1480, 96, 1517], size: 48, lineHeight: 60, color: "#000000", align: "left" }
  ],
  oppo_settings: [
    { text: "On", box: [836, 1060, 880, 1087], size: 36, lineHeight: 61.826, color: "#000000", align: "right" },
    { text: "On", box: [836, 1216, 885, 1243], size: 36, lineHeight: 61.826, color: "#000000", align: "right" },
    { text: "Settings", box: [70, 183, 238, 229], size: 48, lineHeight: 78.46, color: "#000000", align: "left" },
    { text: "Sign in to Your ID", box: [223, 498, 525, 539], size: 42, lineHeight: 61.826, color: "#000000", align: "left" },
    { text: "Sign in to your ID to explore more", box: [223, 553, 729, 587], size: 36, lineHeight: 61.826, color: "#000000", align: "left" },
    { text: "Aeroplane Mode", box: [186, 763, 443, 797], size: 36, lineHeight: 61.826, color: "#000000", align: "left" },
    { text: "Dual SIM & Cellular Network", box: [186, 919, 621, 946], size: 36, lineHeight: 61.826, color: "#000000", align: "left" },
    { text: "Wi-Fi", box: [186, 1060, 268, 1087], size: 36, lineHeight: 61.826, color: "#000000", align: "left" },
    { text: "Bluetooth", box: [186, 1215.789, 332, 1242.789], size: 36, lineHeight: 61.826, color: "#000000", align: "left" },
    { text: "Other Wireless Connections", box: [186, 1370, 611, 1397], size: 36, lineHeight: 61.826, color: "#000000", align: "left" },
    { text: "Notification & Status Bar", box: [186, 1617, 561, 1644], size: 36, lineHeight: 61.826, color: "#000000", align: "left" },
    { text: "Display & Brightness", box: [186, 1773, 503, 1807], size: 36, lineHeight: 61.826, color: "#000000", align: "left" },
    { text: "Contacts", box: [187, 322, 350, 354], size: 42, lineHeight: 60, color: "#000000", align: "left" }
  ],
  oppo_thumb: [
    { text: "{fontName}", box: [139.978, 33.271, 341.978, 72.271], size: 50, color: "#000000", align: "center" },
    { text: "Hello", box: [188.978, 90.381, 292.978, 128.381], size: 50, color: "#000000", align: "center" }
  ]
};

const defaultPsdShapeOverrides = {
  oppo_sms: [
    { name: "左侧气泡 1", box: [71, 398, 466, 528], radius: { topLeft: 48, topRight: 48, bottomRight: 48, bottomLeft: 6 }, color: "#f5f5f7", eraseBox: [51, 378, 486, 548] },
    { name: "左侧气泡 2", box: [71, 1044, 844, 1281], radius: { topLeft: 48, topRight: 48, bottomRight: 48, bottomLeft: 6 }, color: "#f5f5f7", eraseBox: [51, 1024, 864, 1301] },
    { name: "右侧气泡 1", box: [522, 574, 1007, 825], radius: { topLeft: 48, topRight: 48, bottomRight: 4, bottomLeft: 48 }, color: "#66cd88", eraseBox: [502, 554, 1027, 845] },
    { name: "右侧气泡 2", box: [257, 869, 1008, 1000], radius: { topLeft: 48, topRight: 48, bottomRight: 6, bottomLeft: 48 }, color: "#66cd88", eraseBox: [237, 849, 1028, 1020] }
  ]
};

templates.forEach(template => {
  if (defaultPsdLayerOverrides[template.id]) {
    template.layers = defaultPsdLayerOverrides[template.id];
  }
  if (defaultPsdShapeOverrides[template.id]) {
    template.shapeLayers = defaultPsdShapeOverrides[template.id];
  }
});

templates.forEach(template => {
  template.layers.forEach(layer => {
    layer.autoFit = false;
    layer.verticalAlign = layer.verticalAlign || "center";
  });
});

const leftAnchoredTemplateIds = new Set([
  "oppo_detail",
  "oppo_sms",
  "oppo_contacts",
  "oppo_settings",
  "preview_fonts_5"
]);

templates.forEach(template => {
  template.layers.forEach(layer => {
    layer.anchor = leftAnchoredTemplateIds.has(template.id) ? "left" : "center";
  });
});

const honorContactIndexLayer = templates
  .find(template => template.id === "preview_fonts_5")
  ?.layers.find(layer => layer.text.startsWith("#\nA\nB\nC"));

if (honorContactIndexLayer) {
  honorContactIndexLayer.anchor = "center";
  honorContactIndexLayer.align = "center";
}

function shouldCenterByDefault(template, layer) {
  if (template.id === "oppo_detail") return true;
  return template.id === "preview_fonts_5"
    && ["Phone", "Contacts", "Favorites"].includes(layer.text)
    && layer.box[1] > 2000;
}

function centerDefaultTextAlignments() {
  templates.forEach(template => {
    template.layers.forEach(layer => {
      if (!shouldCenterByDefault(template, layer)) return;
      layer.align = "center";
      layer.anchor = "center";
      layer.anchorX = (layer.box[0] + layer.box[2]) / 2;
    });
  });
}

centerDefaultTextAlignments();

function isLayerTextContentEditable(template, layer) {
  return template.id === "oppo_detail" && layer.text !== "{fontName}";
}

function clearLegacyEditableState() {
  try {
    localStorage.removeItem("honor-preview-editable-state:20260702-vivo-defaults");
  } catch (error) {
    console.warn("Failed to clear legacy editable state", error);
  }
}

const dom = {
  fontFile: document.getElementById("fontFile"),
  imageFile: document.getElementById("imageFile"),
  fontFileName: document.getElementById("fontFileName"),
  imageFileName: document.getElementById("imageFileName"),
  fontName: document.getElementById("fontName"),
  exportZip: document.getElementById("exportZip"),
  platformTabs: [...document.querySelectorAll("[data-platform-tab]")],
  honorTemplateList: document.getElementById("honorTemplateList"),
  honorTemplateCount: document.getElementById("honorTemplateCount"),
  oppoTemplateList: document.getElementById("oppoTemplateList"),
  oppoTemplateCount: document.getElementById("oppoTemplateCount"),
  vivoTemplateList: document.getElementById("vivoTemplateList"),
  vivoTemplateCount: document.getElementById("vivoTemplateCount"),
  activeFileName: document.getElementById("activeFileName"),
  activeMeta: document.getElementById("activeMeta"),
  resetImagePosition: document.getElementById("resetImagePosition"),
  imageOverflowVisible: document.getElementById("imageOverflowVisible"),
  decreaseAllTextSize: document.getElementById("decreaseAllTextSize"),
  increaseAllTextSize: document.getElementById("increaseAllTextSize"),
  zoomRange: document.getElementById("zoomRange"),
  zoomValue: document.getElementById("zoomValue"),
  maskControl: document.getElementById("maskControl"),
  maskOpacity: document.getElementById("maskOpacity"),
  maskOpacityValue: document.getElementById("maskOpacityValue"),
  referenceControl: document.getElementById("referenceControl"),
  referenceVisible: document.getElementById("referenceVisible"),
  referenceOpacity: document.getElementById("referenceOpacity"),
  referenceOpacityValue: document.getElementById("referenceOpacityValue"),
  editImageMode: document.getElementById("editImageMode"),
  downloadCurrent: document.getElementById("downloadCurrent"),
  canvasStage: document.getElementById("canvasStage"),
  canvasFrame: document.getElementById("canvasFrame"),
  editorCanvas: document.getElementById("editorCanvas"),
  imageOverflowPreview: document.getElementById("imageOverflowPreview"),
  imageOverlay: document.getElementById("imageOverlay"),
  activeLayerKind: document.getElementById("activeLayerKind"),
  activeLayerName: document.getElementById("activeLayerName"),
  layerXLabel: document.getElementById("layerXLabel"),
  layerX: document.getElementById("layerX"),
  layerYLabel: document.getElementById("layerYLabel"),
  layerY: document.getElementById("layerY"),
  layerSizeLabel: document.getElementById("layerSizeLabel"),
  layerSize: document.getElementById("layerSize"),
  layerLineHeightLabel: document.getElementById("layerLineHeightLabel"),
  layerLineHeight: document.getElementById("layerLineHeight"),
  layerVerticalCenter: document.getElementById("layerVerticalCenter"),
  layerTextAlign: document.getElementById("layerTextAlign"),
  layerTextAlignButtons: [...document.querySelectorAll("[data-text-align]")],
  layerColor: document.getElementById("layerColor"),
  activeGroupName: document.getElementById("activeGroupName"),
  textGroupName: document.getElementById("textGroupName"),
  textGroupLayerList: document.getElementById("textGroupLayerList"),
  layerTextContentField: document.getElementById("layerTextContentField"),
  layerTextContent: document.getElementById("layerTextContent"),
  applyTextGroup: document.getElementById("applyTextGroup"),
  ungroupTextSelection: document.getElementById("ungroupTextSelection"),
  ungroupTemplateTextGroups: document.getElementById("ungroupTemplateTextGroups"),
  ungroupAllTextGroups: document.getElementById("ungroupAllTextGroups"),
  exportHonorConfig: document.getElementById("exportHonorConfig"),
  exportOppoConfig: document.getElementById("exportOppoConfig"),
  exportVivoConfig: document.getElementById("exportVivoConfig")
};

function getActiveTemplate() {
  return templates.find(template => template.id === state.activeTemplateId) || templates[0];
}

function makeLayerKey(templateId, index) {
  return `${templateId}:text:${index}`;
}

function makeShapeKey(templateId, index) {
  return `${templateId}:shape:${index}`;
}

function parseLayerKey(key) {
  if (!key) return null;
  const parts = key.split(":");
  if (parts.length === 2) {
    return { templateId: parts[0], type: "text", index: Number(parts[1]) };
  }
  return { templateId: parts[0], type: parts[1], index: Number(parts[2]) };
}

function getLayerRef(key = state.activeLayerKey) {
  const parsed = parseLayerKey(key);
  if (!parsed) return null;
  const { templateId, type, index } = parsed;
  const template = templates.find(item => item.id === templateId);
  const layer = type === "shape" ? template?.shapeLayers?.[index] : template?.layers[index];
  if (!template || !layer) return null;
  return { template, layer, index, key, type };
}

function ensureActiveLayerForTemplate(template) {
  const ref = getLayerRef();
  if (!ref || ref.template.id !== template.id) {
    state.activeLayerKey = null;
  }
}

function makeCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function fileBaseName(filename) {
  return filename.replace(/\.(ttf|otf|woff2?|png|jpe?g|webp)$/i, "");
}

function formatUploadFileName(filename, maxLength = 24) {
  if (!filename || filename.length <= maxLength) return filename;
  const extensionMatch = filename.match(/(\.[^.]+)$/);
  const extension = extensionMatch ? extensionMatch[1] : "";
  const stem = extension ? filename.slice(0, -extension.length) : filename;
  const available = Math.max(8, maxLength - extension.length - 1);
  const headLength = Math.ceil(available * 0.58);
  const tailLength = Math.max(3, available - headLength);
  return `${stem.slice(0, headLength)}…${stem.slice(-tailLength)}${extension}`;
}

function setUploadFileName(element, filename) {
  element.textContent = formatUploadFileName(filename);
  element.title = filename;
}

function normalizeHexColor(color) {
  if (!color) return "#000000";
  if (/^#[0-9a-f]{6}$/i.test(color)) return color.toLowerCase();
  if (/^#[0-9a-f]{3}$/i.test(color)) {
    return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`.toLowerCase();
  }
  return "#000000";
}

function roundParam(value) {
  return Math.round(value * 1000) / 1000;
}

function roundBox(box) {
  return box.map(roundParam);
}

function roundBounds(bounds) {
  return {
    left: roundParam(bounds.left),
    top: roundParam(bounds.top),
    right: roundParam(bounds.right),
    bottom: roundParam(bounds.bottom)
  };
}

function normalizeTextAlign(value) {
  return ["left", "center", "right"].includes(value) ? value : "left";
}

function getTextLayerHorizontalAlign(layer) {
  return normalizeTextAlign(layer.align || layer.anchor || "left");
}

function getLayerContentWidth(ctx, layer, size = layer.size) {
  const measurements = measureLayerText(ctx, layer, size);
  return Math.max(...measurements.measuredLines.map(line => line.inkWidth));
}

function ensureTextLayerBoxFitsContent(ctx, layer, align) {
  if (!ctx) return;
  const [left, top, right, bottom] = layer.box;
  const boxWidth = right - left;
  const contentWidth = Math.ceil(getLayerContentWidth(ctx, layer));
  if (contentWidth <= boxWidth) return;

  if (align === "left") {
    layer.box = [right - contentWidth, top, right, bottom];
    return;
  }

  if (align === "right") {
    layer.box = [left, top, left + contentWidth, bottom];
    return;
  }

  const center = (left + right) / 2;
  layer.box = [center - contentWidth / 2, top, center + contentWidth / 2, bottom];
}

function setTextLayerHorizontalAlign(layer, align, ctx = null) {
  const normalized = normalizeTextAlign(align);
  ensureTextLayerBoxFitsContent(ctx, layer, normalized);
  layer.align = normalized;
  layer.anchor = normalized;
  layer.anchorX = getTextLayerAnchorX(layer);
}

function getTextLayerAnchorX(layer) {
  const [left, , right] = layer.box;
  const align = getTextLayerHorizontalAlign(layer);
  if (align === "left") return left;
  if (align === "right") return right;
  return (left + right) / 2;
}

function getTextLayerVerticalAlign(layer) {
  return layer.verticalAlign || "center";
}

function getTextLayerBaselineY(layer, ctx = null, size = layer.size) {
  if (ctx && getTextLayerVerticalAlign(layer) === "center") {
    const measurements = measureLayerText(ctx, layer, size);
    return getCenteredBaselineY(layer, measurements);
  }
  if (Number.isFinite(layer.baselineY)) return layer.baselineY;
  const measurements = ctx ? measureLayerText(ctx, layer, size) : null;
  return measurements ? layer.box[1] + measurements.maxAscent : layer.box[1];
}

function setTextLayerAnchorPosition(layer, x, y, ctx = null) {
  const dx = x - getTextLayerAnchorX(layer);
  const dy = y - getTextLayerBaselineY(layer, ctx);
  moveTextLayer(layer, dx, dy);
}

function setLayerPosition(layer, x, y) {
  const [left, top, right, bottom] = layer.box;
  const width = right - left;
  const height = bottom - top;
  const eraseOffset = layer.eraseBox ? [
    layer.eraseBox[0] - left,
    layer.eraseBox[1] - top,
    layer.eraseBox[2] - right,
    layer.eraseBox[3] - bottom
  ] : null;
  layer.box = [x, y, x + width, y + height];
  if (eraseOffset) {
    layer.eraseBox = [
      x + eraseOffset[0],
      y + eraseOffset[1],
      x + width + eraseOffset[2],
      y + height + eraseOffset[3]
    ];
  }
}

function moveTextLayer(layer, dx, dy) {
  if (Number.isFinite(layer.anchorX)) layer.anchorX += dx;
  if (Number.isFinite(layer.baselineY)) layer.baselineY += dy;
  layer.box = [
    layer.box[0] + dx,
    layer.box[1] + dy,
    layer.box[2] + dx,
    layer.box[3] + dy
  ];
  if (layer.eraseBox) {
    layer.eraseBox = [
      layer.eraseBox[0] + dx,
      layer.eraseBox[1] + dy,
      layer.eraseBox[2] + dx,
      layer.eraseBox[3] + dy
    ];
  }
}

function setLayerSize(layer, width, height) {
  const [left, top, right, bottom] = layer.box;
  const eraseOffset = layer.eraseBox ? [
    layer.eraseBox[0] - left,
    layer.eraseBox[1] - top,
    layer.eraseBox[2] - right,
    layer.eraseBox[3] - bottom
  ] : null;
  const nextRight = left + Math.max(1, width);
  const nextBottom = top + Math.max(1, height);
  layer.box = [
    left,
    top,
    nextRight,
    nextBottom
  ];
  if (eraseOffset) {
    layer.eraseBox = [
      left + eraseOffset[0],
      top + eraseOffset[1],
      nextRight + eraseOffset[2],
      nextBottom + eraseOffset[3]
    ];
  }
}

function getBubbleResizeAnchor(shape) {
  if (shape.name?.startsWith("右侧")) return "bottom-right";
  if (shape.name?.startsWith("左侧")) return "bottom-left";
  return "top-left";
}

function setShapeSizeWithAnchor(shape, width, height) {
  const [left, top, right, bottom] = shape.box;
  const nextWidth = Math.max(1, width);
  const nextHeight = Math.max(1, height);
  const anchor = getBubbleResizeAnchor(shape);

  if (anchor === "bottom-left") {
    setLayerBox(shape, [left, bottom - nextHeight, left + nextWidth, bottom]);
    return;
  }

  if (anchor === "bottom-right") {
    setLayerBox(shape, [right - nextWidth, bottom - nextHeight, right, bottom]);
    return;
  }

  setLayerSize(shape, nextWidth, nextHeight);
}

function setLayerBox(layer, box) {
  const [left, top, right, bottom] = layer.box;
  const eraseOffset = layer.eraseBox ? [
    layer.eraseBox[0] - left,
    layer.eraseBox[1] - top,
    layer.eraseBox[2] - right,
    layer.eraseBox[3] - bottom
  ] : null;
  layer.box = box;
  if (eraseOffset) {
    layer.eraseBox = [
      box[0] + eraseOffset[0],
      box[1] + eraseOffset[1],
      box[2] + eraseOffset[2],
      box[3] + eraseOffset[3]
    ];
  }
}

function isSameEditGroup(firstRef, secondRef) {
  return firstRef?.type === "text"
    && secondRef?.type === "text"
    && firstRef.template.id === secondRef.template.id
    && firstRef.layer.editGroup
    && firstRef.layer.editGroup === secondRef.layer.editGroup;
}

function getTextEditGroupRefs(ref) {
  if (ref?.type !== "text" || !ref.layer.editGroup) return [ref].filter(Boolean);
  return ref.template.layers
    .map((layer, index) => ({
      template: ref.template,
      layer,
      index,
      key: makeLayerKey(ref.template.id, index),
      type: "text"
    }))
    .filter(groupRef => groupRef.layer.editGroup === ref.layer.editGroup);
}

function moveTextEditGroup(ref, dx, dy) {
  getTextEditGroupRefs(ref).forEach(groupRef => {
    moveTextLayer(groupRef.layer, dx, dy);
  });
}

function moveTextEditGroupCompanions(ref, dx, dy) {
  getTextEditGroupRefs(ref).forEach(groupRef => {
    if (groupRef.key === ref.key) return;
    moveTextLayer(groupRef.layer, dx, dy);
  });
}

function setTextEditGroupPosition(ref, x, y) {
  const dx = x - getTextLayerAnchorX(ref.layer);
  const dy = y - getTextLayerBaselineY(ref.layer, dom.editorCanvas.getContext("2d"));
  moveTextEditGroup(ref, dx, dy);
}

function setTextEditGroupSize(ref, size) {
  const nextSize = Math.max(1, size);
  getTextEditGroupRefs(ref).forEach(groupRef => {
    groupRef.layer.size = nextSize;
  });
}

function adjustActiveTemplateTextSizes(delta) {
  const template = getActiveTemplate();
  template.layers.forEach(layer => {
    layer.size = Math.max(1, Math.round((layer.size + delta) * 1000) / 1000);
  });
  renderAll();
}

function shouldIgnoreKeyboardMove(event) {
  const target = event.target;
  if (!target) return false;
  const tagName = target.tagName?.toLowerCase();
  return tagName === "input"
    || tagName === "textarea"
    || tagName === "select"
    || target.isContentEditable;
}

function moveActiveTextLayerByKeyboard(event) {
  const arrows = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0]
  };
  const direction = arrows[event.key];
  if (!direction || shouldIgnoreKeyboardMove(event)) return;

  const ref = getLayerRef();
  if (!ref || ref.type !== "text") return;

  const step = event.shiftKey ? 10 : 1;
  event.preventDefault();
  state.guides = [];
  moveTextEditGroup(ref, direction[0] * step, direction[1] * step);
  renderAll();
}

function rebuildTemplateTextAutoFitGroups(template) {
  const groups = new Map();
  template.layers.forEach(layer => {
    delete layer.autoFitGroup;
    delete layer.autoFitGroupLayers;
    if (!layer.editGroup) return;
    if (!groups.has(layer.editGroup)) groups.set(layer.editGroup, []);
    groups.get(layer.editGroup).push(layer);
  });

  groups.forEach((layers, groupId) => {
    if (layers.length < 2) return;
    layers.forEach(layer => {
      layer.autoFitGroup = `${template.id}:${groupId}`;
      layer.autoFitGroupLayers = layers;
    });
  });
}

function rebuildAllTextAutoFitGroups() {
  templates.forEach(rebuildTemplateTextAutoFitGroups);
}

function getTextLayerRefs(template) {
  return template.layers.map((layer, index) => ({
    template,
    layer,
    index,
    key: makeLayerKey(template.id, index),
    type: "text"
  }));
}

function getTemplateTextSelection(template) {
  if (!state.textGroupSelections[template.id]) {
    state.textGroupSelections[template.id] = new Set();
  }

  const selection = state.textGroupSelections[template.id];
  const validKeys = new Set(getTextLayerRefs(template).map(ref => ref.key));
  [...selection].forEach(key => {
    if (!validKeys.has(key)) selection.delete(key);
  });

  return selection;
}

function formatGroupName(groupId) {
  return groupId || "未编组";
}

function makeTextGroupId(name) {
  const safeName = name.trim().replace(/\s+/g, "_").replace(/[^\w\u4e00-\u9fa5-]/g, "");
  return safeName || `group_${new Date().getTime().toString(36)}`;
}

function getActiveGroupName(ref = getLayerRef()) {
  if (!ref || ref.type !== "text") return "不可编组";
  return formatGroupName(ref.layer.editGroup);
}

function applyTextGroupToSelection() {
  const template = getActiveTemplate();
  const selection = getTemplateTextSelection(template);
  if (selection.size < 2) return;
  const groupId = makeTextGroupId(state.pendingGroupName);

  getTextLayerRefs(template).forEach(ref => {
    if (!selection.has(ref.key)) return;
    ref.layer.editGroup = groupId;
  });

  state.pendingGroupName = groupId;
  rebuildTemplateTextAutoFitGroups(template);
  renderAll();
}

function ungroupSelectedTextLayers() {
  const template = getActiveTemplate();
  const selection = getTemplateTextSelection(template);
  getTextLayerRefs(template).forEach(ref => {
    if (!selection.has(ref.key)) return;
    delete ref.layer.editGroup;
  });
  rebuildTemplateTextAutoFitGroups(template);
  renderAll();
}

function ungroupTemplateTextLayers(template = getActiveTemplate()) {
  template.layers.forEach(layer => {
    delete layer.editGroup;
  });
  rebuildTemplateTextAutoFitGroups(template);
}

function ungroupAllTextLayers() {
  templates.forEach(ungroupTemplateTextLayers);
  renderAll();
}

function getShapeBounds(shape) {
  const [left, top, right, bottom] = shape.box;
  return { left, top, right, bottom };
}

function findShapeAt(template, x, y) {
  for (let index = (template.shapeLayers || []).length - 1; index >= 0; index -= 1) {
    const { left, top, right, bottom } = getShapeBounds(template.shapeLayers[index]);
    if (x >= left && x <= right && y >= top && y <= bottom) {
      return makeShapeKey(template.id, index);
    }
  }
  return null;
}

function findTextLayerAt(template, x, y) {
  const ctx = dom.editorCanvas.getContext("2d");
  for (let index = template.layers.length - 1; index >= 0; index -= 1) {
    const { left, top, right, bottom } = getLayerRenderMetrics(ctx, template.layers[index]).bounds;
    if (x >= left && x <= right && y >= top && y <= bottom) {
      return makeLayerKey(template.id, index);
    }
  }
  return null;
}

function getEditableLayerRefs(template) {
  return [
    ...template.layers.map((layer, index) => ({
      template,
      layer,
      index,
      key: makeLayerKey(template.id, index),
      type: "text"
    })),
    ...(template.shapeLayers || []).map((layer, index) => ({
      template,
      layer,
      index,
      key: makeShapeKey(template.id, index),
      type: "shape"
    }))
  ];
}

function getEditableLayerBounds(ctx, ref) {
  return ref.type === "shape" ? getShapeBounds(ref.layer) : getLayerRenderMetrics(ctx, ref.layer).bounds;
}

function getBoxAnchors(bounds) {
  const { left, top, right, bottom } = bounds;
  return {
    x: [
      { kind: "left", value: left },
      { kind: "center", value: (left + right) / 2 },
      { kind: "right", value: right }
    ],
    y: [
      { kind: "top", value: top },
      { kind: "middle", value: (top + bottom) / 2 },
      { kind: "bottom", value: bottom }
    ]
  };
}

function getTrackedTextMetrics(ctx, text, tracking, size) {
  if (!text) {
    const fallback = ctx.measureText("M");
    const ascent = fallback.actualBoundingBoxAscent || size * 0.82;
    const descent = fallback.actualBoundingBoxDescent || size * 0.22;
    return {
      advance: 0,
      inkLeftOffset: 0,
      inkRightOffset: 0,
      inkWidth: 0,
      ascent,
      descent
    };
  }

  let cursor = 0;
  let inkLeft = Infinity;
  let inkRight = -Infinity;
  let ascent = 0;
  let descent = 0;
  const chars = Array.from(text);

  chars.forEach((char, index) => {
    const metrics = ctx.measureText(char);
    const charWidth = metrics.width;
    const charLeft = cursor - (metrics.actualBoundingBoxLeft || 0);
    const charRight = cursor + (metrics.actualBoundingBoxRight || charWidth);
    inkLeft = Math.min(inkLeft, charLeft);
    inkRight = Math.max(inkRight, charRight);
    ascent = Math.max(ascent, metrics.actualBoundingBoxAscent || size * 0.82);
    descent = Math.max(descent, metrics.actualBoundingBoxDescent || size * 0.22);
    cursor += charWidth + (index === chars.length - 1 ? 0 : tracking);
  });

  return {
    advance: cursor,
    inkLeftOffset: inkLeft,
    inkRightOffset: inkRight,
    inkWidth: Math.max(0, inkRight - inkLeft),
    ascent,
    descent
  };
}

function measureLayerText(ctx, layer, size) {
  const lines = getLayerText(layer).split("\n");
  const scale = size / layer.size;
  const tracking = (layer.tracking || 0) * scale;
  const lineHeight = (layer.lineHeight || layer.size * 1.18) * scale;

  setFont(ctx, size);

  const measuredLines = lines.map(line => {
    const textMetrics = getTrackedTextMetrics(ctx, line, tracking, size);
    return {
      line,
      width: textMetrics.advance,
      inkLeftOffset: textMetrics.inkLeftOffset,
      inkRightOffset: textMetrics.inkRightOffset,
      inkWidth: textMetrics.inkWidth,
      ascent: textMetrics.ascent,
      descent: textMetrics.descent
    };
  });

  const maxAscent = Math.max(...measuredLines.map(line => line.ascent));
  const maxDescent = Math.max(...measuredLines.map(line => line.descent));
  const textHeight = maxAscent + maxDescent;
  const totalHeight = lineHeight * (lines.length - 1) + textHeight;

  return {
    lines,
    measuredLines,
    tracking,
    lineHeight,
    maxAscent,
    maxDescent,
    textHeight,
    totalHeight
  };
}

function getCenteredBaselineY(layer, measurements) {
  const [, top, , bottom] = layer.box;
  const boxHeight = bottom - top;
  return top + (boxHeight - measurements.totalHeight) / 2 + measurements.maxAscent;
}

function getLegacyLayerMetricsAtSize(ctx, layer, size) {
  const [left, top, right, bottom] = layer.box;
  const boxWidth = right - left;
  const boxHeight = bottom - top;
  const measurements = measureLayerText(ctx, layer, size);
  const { measuredLines, tracking, lineHeight, maxAscent, maxDescent, totalHeight } = measurements;
  const startY = top + (boxHeight - totalHeight) / 2 + maxAscent;

  const rows = measuredLines.map((measured, index) => {
    const { line, width, inkLeftOffset, inkRightOffset, inkWidth, ascent, descent } = measured;
    const align = getTextLayerHorizontalAlign(layer);
    let x = left + boxWidth / 2 - (inkLeftOffset + inkRightOffset) / 2;
    if (align === "left") x = left - inkLeftOffset;
    if (align === "right") x = right - inkRightOffset;
    const baseline = startY + index * lineHeight;
    return { line, x, baseline, width, inkLeftOffset, inkRightOffset, inkWidth, ascent, descent };
  });

  const actualLeft = Math.min(...rows.map(row => row.x + row.inkLeftOffset));
  const actualRight = Math.max(...rows.map(row => row.x + row.inkRightOffset));
  const actualTop = Math.min(...rows.map(row => row.baseline - row.ascent));
  const actualBottom = Math.max(...rows.map(row => row.baseline + row.descent));

  return {
    rows,
    size,
    tracking,
    lineHeight,
    box: { left, top, right, bottom, width: boxWidth, height: boxHeight },
    contentWidth: Math.max(...rows.map(row => row.inkWidth)),
    contentHeight: totalHeight,
    maxAscent,
    maxDescent,
    bounds: {
      left: actualLeft,
      top: actualTop,
      right: actualRight,
      bottom: actualBottom
    }
  };
}

function getLayerMetricsAtSize(ctx, layer, size) {
  const [left, top, right, bottom] = layer.box;
  const boxWidth = right - left;
  const boxHeight = bottom - top;
  const measurements = measureLayerText(ctx, layer, size);
  const { measuredLines, tracking, lineHeight, maxAscent, maxDescent, totalHeight } = measurements;
  const anchorX = getTextLayerAnchorX(layer);
  const baselineY = getTextLayerVerticalAlign(layer) === "center"
    ? getCenteredBaselineY(layer, measurements)
    : getTextLayerBaselineY(layer, ctx, size);

  const rows = measuredLines.map((measured, index) => {
    const { line, width, inkLeftOffset, inkRightOffset, inkWidth, ascent, descent } = measured;
    const align = getTextLayerHorizontalAlign(layer);
    let x = left + boxWidth / 2 - (inkLeftOffset + inkRightOffset) / 2;
    if (align === "left") x = left - inkLeftOffset;
    if (align === "right") x = right - inkRightOffset;
    const baseline = baselineY + index * lineHeight;
    return { line, x, baseline, width, inkLeftOffset, inkRightOffset, inkWidth, ascent, descent };
  });

  const actualLeft = Math.min(...rows.map(row => row.x + row.inkLeftOffset));
  const actualRight = Math.max(...rows.map(row => row.x + row.inkRightOffset));
  const actualTop = Math.min(...rows.map(row => row.baseline - row.ascent));
  const actualBottom = Math.max(...rows.map(row => row.baseline + row.descent));

  return {
    rows,
    size,
    tracking,
    lineHeight,
    box: { left, top, right, bottom, width: boxWidth, height: boxHeight },
    anchorX,
    baselineY,
    contentWidth: Math.max(...rows.map(row => row.inkWidth)),
    contentHeight: totalHeight,
    maxAscent,
    maxDescent,
    bounds: {
      left: actualLeft,
      top: actualTop,
      right: actualRight,
      bottom: actualBottom
    }
  };
}

function getAutoFitRatio(ctx, layer) {
  const baseMetrics = getLayerMetricsAtSize(ctx, layer, layer.size);
  const widthRatio = baseMetrics.contentWidth > 0 ? baseMetrics.box.width / baseMetrics.contentWidth : 1;
  const heightRatio = baseMetrics.contentHeight > 0 ? baseMetrics.box.height / baseMetrics.contentHeight : 1;
  return Math.min(1, widthRatio, heightRatio);
}

function getAutoFitSize(ctx, layer) {
  if (!layer.autoFit) return layer.size;
  const fitLayers = layer.autoFitGroupLayers || [layer];
  const fitRatio = Math.min(...fitLayers.map(groupLayer => getAutoFitRatio(ctx, groupLayer)));
  return Math.max(1, Math.floor(layer.size * fitRatio * 1000) / 1000);
}

function getLayerRenderMetrics(ctx, layer) {
  return getLayerMetricsAtSize(ctx, layer, getAutoFitSize(ctx, layer));
}

function initializeTextLayerBaselineAnchors() {
  const canvas = dom.editorCanvas || makeCanvas(1, 1);
  const ctx = canvas.getContext("2d");
  templates.forEach(template => {
    template.layers.forEach(layer => {
      if (Number.isFinite(layer.anchorX) && Number.isFinite(layer.baselineY)) return;
      const legacy = getLegacyLayerMetricsAtSize(ctx, layer, layer.size);
      const [left, , right] = layer.box;
      const align = getTextLayerHorizontalAlign(layer);
      layer.anchorX = align === "left" ? left : align === "right" ? right : (left + right) / 2;
      layer.baselineY = legacy.rows[0]?.baseline ?? layer.box[1];
    });
  });
}

function getGuideCandidates(template, activeKey, ctx) {
  const activeRef = getLayerRef(activeKey);
  const x = [
    { value: 0, source: "canvas" },
    { value: template.width / 2, source: "canvas" },
    { value: template.width, source: "canvas" }
  ];
  const y = [
    { value: 0, source: "canvas" },
    { value: template.height / 2, source: "canvas" },
    { value: template.height, source: "canvas" }
  ];

  getEditableLayerRefs(template).forEach(ref => {
    if (ref.key === activeKey) return;
    if (isSameEditGroup(activeRef, ref)) return;
    const anchors = getBoxAnchors(getEditableLayerBounds(ctx, ref));
    anchors.x.forEach(anchor => x.push({ value: anchor.value, source: "layer" }));
    anchors.y.forEach(anchor => y.push({ value: anchor.value, source: "layer" }));
  });

  return { x, y };
}

function getBestGuide(activeAnchors, candidates, tolerance) {
  let best = null;
  activeAnchors.forEach(anchor => {
    candidates.forEach(candidate => {
      const delta = candidate.value - anchor.value;
      const distance = Math.abs(delta);
      if (distance <= tolerance && (!best || distance < best.distance)) {
        best = { value: candidate.value, delta, distance };
      }
    });
  });
  return best;
}

function getSnapTolerance() {
  return Math.max(2, 3 / state.zoom);
}

function isMovingIntoGuide(delta, movement) {
  if (!delta || !movement) return true;
  return Math.sign(delta) !== Math.sign(movement);
}

function moveLayerWithGuides(ref, dx, dy, ctx) {
  const originalAnchorX = getTextLayerAnchorX(ref.layer);
  const originalBaselineY = getTextLayerBaselineY(ref.layer, ctx);
  moveTextLayer(ref.layer, dx, dy);

  const tolerance = getSnapTolerance();
  const candidates = getGuideCandidates(ref.template, ref.key, ctx);
  const anchors = getBoxAnchors(getEditableLayerBounds(ctx, ref));
  const xGuide = getBestGuide(anchors.x, candidates.x, tolerance);
  const yGuide = getBestGuide(anchors.y, candidates.y, tolerance);
  const guides = [];

  if (xGuide && isMovingIntoGuide(xGuide.delta, dx)) {
    moveTextLayer(ref.layer, xGuide.delta, 0);
    guides.push({ axis: "x", value: xGuide.value });
  }

  if (yGuide && isMovingIntoGuide(yGuide.delta, dy)) {
    moveTextLayer(ref.layer, 0, yGuide.delta);
    guides.push({ axis: "y", value: yGuide.value });
  }

  moveTextEditGroupCompanions(
    ref,
    getTextLayerAnchorX(ref.layer) - originalAnchorX,
    getTextLayerBaselineY(ref.layer, ctx) - originalBaselineY
  );
  return guides;
}

function loadImageElement(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function releaseLoadedImage(image) {
  const url = image?.dataset?.compressedUrl;
  if (url) URL.revokeObjectURL(url);
}

async function loadImageFromFile(file) {
  const sourceUrl = URL.createObjectURL(file);
  try {
    const sourceImage = await loadImageElement(sourceUrl);
    const compressedBlob = await compressUploadedImage(sourceImage);
    const compressedUrl = URL.createObjectURL(compressedBlob);
    try {
      const image = await loadImageElement(compressedUrl);
      image.dataset.sourceFileSize = String(file.size || 0);
      image.dataset.compressedFileSize = String(compressedBlob.size || 0);
      image.dataset.displayWidth = String(sourceImage.naturalWidth || sourceImage.width);
      image.dataset.displayHeight = String(sourceImage.naturalHeight || sourceImage.height);
      image.dataset.compressedUrl = compressedUrl;
      return image;
    } catch (error) {
      URL.revokeObjectURL(compressedUrl);
      throw error;
    }
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
}

function loadImageUrl(url) {
  return loadImageElement(url);
}

function getUploadImageScale(width, height) {
  const maxEdge = Math.max(width, height);
  return maxEdge > UPLOAD_IMAGE_MAX_EDGE ? UPLOAD_IMAGE_MAX_EDGE / maxEdge : 1;
}

function canvasToUploadJpeg(canvas, quality) {
  return new Promise(resolve => {
    canvas.toBlob(blob => resolve(blob), "image/jpeg", quality);
  });
}

async function compressUploadedImage(image) {
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;
  const scale = getUploadImageScale(sourceWidth, sourceHeight);
  const canvas = makeCanvas(
    Math.max(1, Math.round(sourceWidth * scale)),
    Math.max(1, Math.round(sourceHeight * scale))
  );
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  let bestBlob = null;
  for (const quality of UPLOAD_IMAGE_QUALITIES) {
    const blob = await canvasToUploadJpeg(canvas, quality);
    bestBlob = !bestBlob || blob.size < bestBlob.size ? blob : bestBlob;
    if (blob.size <= UPLOAD_IMAGE_TARGET_SIZE) return blob;
  }
  return bestBlob;
}

async function loadFont(file) {
  const family = `HonorFont_${Date.now()}`;
  const fontFace = new FontFace(family, await file.arrayBuffer());
  await fontFace.load();
  document.fonts.add(fontFace);
  return family;
}

function getDefaultImagePlacement(template) {
  const [boxX, boxY, boxW, boxH] = template.imageBox;
  const visibleLeft = Math.max(0, boxX);
  const visibleTop = Math.max(0, boxY);
  const visibleRight = Math.min(template.width, boxX + boxW);
  const visibleBottom = Math.min(template.height, boxY + boxH);
  const fitX = visibleRight > visibleLeft ? visibleLeft : 0;
  const fitY = visibleBottom > visibleTop ? visibleTop : 0;
  const fitW = visibleRight > visibleLeft ? visibleRight - visibleLeft : template.width;
  const fitH = visibleBottom > visibleTop ? visibleBottom - visibleTop : template.height;
  const width = Number(state.image.dataset?.displayWidth) || state.image.naturalWidth || state.image.width;
  const height = Number(state.image.dataset?.displayHeight) || state.image.naturalHeight || state.image.height;
  return {
    x: fitX + (fitW - width) / 2,
    y: fitY + (fitH - height) / 2,
    width,
    height
  };
}

function getImagePlacement(template) {
  if (!state.image || !template.imageBox) return null;
  if (!state.imagePlacements[template.id]) {
    state.imagePlacements[template.id] = getDefaultImagePlacement(template);
  }
  return state.imagePlacements[template.id];
}

function setImagePlacement(template, placement) {
  state.imagePlacements[template.id] = {
    x: placement.x,
    y: placement.y,
    width: Math.max(1, placement.width),
    height: Math.max(1, placement.height)
  };
}

function moveImagePlacement(template, dx, dy) {
  const placement = getImagePlacement(template);
  if (!placement) return;
  setImagePlacement(template, {
    ...placement,
    x: placement.x + dx,
    y: placement.y + dy
  });
}

function getMask() {
  return state.mask;
}

function canUseMask(template) {
  return Boolean(template.supportsMask && template.imageBox && state.image);
}

function drawMask(ctx, template) {
  if (!canUseMask(template)) return;
  const mask = getMask(template);
  if (mask.opacity <= 0) return;
  const placement = getImagePlacement(template);
  if (!placement) return;
  ctx.save();
  ctx.globalAlpha = mask.opacity;
  ctx.fillStyle = mask.color;
  ctx.fillRect(placement.x, placement.y, placement.width, placement.height);
  ctx.restore();
}

function drawReferenceOverlay(ctx, template) {
  const image = state.referenceImages[template.id];
  if (!image || !state.reference.visible || state.reference.opacity <= 0) return;
  ctx.save();
  ctx.globalAlpha = state.reference.opacity;
  ctx.drawImage(image, 0, 0, template.width, template.height);
  ctx.restore();
}

function drawCoverImage(ctx, template) {
  const placement = getImagePlacement(template);
  if (!placement) return;
  ctx.drawImage(state.image, placement.x, placement.y, placement.width, placement.height);
}

function setFont(ctx, size) {
  ctx.font = `${size}px "${state.fontFamily}", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif`;
}

function measureTrackedText(ctx, text, tracking) {
  if (!text) return 0;
  let width = 0;
  for (const char of text) {
    width += ctx.measureText(char).width;
  }
  return width + Math.max(0, Array.from(text).length - 1) * tracking;
}

function drawTrackedText(ctx, text, x, y, tracking, layer) {
  let cursor = x;
  for (const char of text) {
    ctx.fillStyle = layer?.charColors?.[char] || layer?.color || ctx.fillStyle;
    ctx.fillText(char, cursor, y);
    cursor += ctx.measureText(char).width + tracking;
  }
}

function getLayerText(layer) {
  return layer.text === "{fontName}" ? state.fontName.trim() || "MBLatant" : layer.text;
}

function drawTextLayer(ctx, layer) {
  const metrics = getLayerRenderMetrics(ctx, layer);

  setFont(ctx, metrics.size);
  ctx.fillStyle = layer.color;
  ctx.textBaseline = "alphabetic";

  metrics.rows.forEach(row => {
    drawTrackedText(ctx, row.line, row.x, row.baseline, metrics.tracking, layer);
  });
}

function getCornerRadii(radius, width, height) {
  const fallback = typeof radius === "number" ? radius : 0;
  const radii = {
    topLeft: typeof radius === "object" ? radius.topLeft ?? fallback : fallback,
    topRight: typeof radius === "object" ? radius.topRight ?? fallback : fallback,
    bottomRight: typeof radius === "object" ? radius.bottomRight ?? fallback : fallback,
    bottomLeft: typeof radius === "object" ? radius.bottomLeft ?? fallback : fallback
  };
  const maxRadius = Math.min(width / 2, height / 2);
  return Object.fromEntries(Object.entries(radii).map(([key, value]) => [
    key,
    Math.max(0, Math.min(value, maxRadius))
  ]));
}

function drawRoundRect(ctx, left, top, width, height, radius) {
  const radii = getCornerRadii(radius, width, height);
  ctx.beginPath();
  ctx.moveTo(left + radii.topLeft, top);
  ctx.lineTo(left + width - radii.topRight, top);
  ctx.quadraticCurveTo(left + width, top, left + width, top + radii.topRight);
  ctx.lineTo(left + width, top + height - radii.bottomRight);
  ctx.quadraticCurveTo(left + width, top + height, left + width - radii.bottomRight, top + height);
  ctx.lineTo(left + radii.bottomLeft, top + height);
  ctx.quadraticCurveTo(left, top + height, left, top + height - radii.bottomLeft);
  ctx.lineTo(left, top + radii.topLeft);
  ctx.quadraticCurveTo(left, top, left + radii.topLeft, top);
}

function eraseShapeFootprints(ctx, template) {
  if (!template.shapeLayers?.length) return;
  ctx.save();
  template.shapeLayers.forEach(shape => {
    const [left, top, right, bottom] = shape.eraseBox || shape.box;
    ctx.fillStyle = shape.eraseColor || "#ffffff";
    ctx.fillRect(left, top, right - left, bottom - top);
  });
  ctx.restore();
}

function drawShapeLayer(ctx, shape) {
  const [left, top, right, bottom] = shape.box;
  ctx.save();
  ctx.fillStyle = shape.color;
  drawRoundRect(ctx, left, top, right - left, bottom - top, shape.radius || 0);
  ctx.fill();
  ctx.restore();
}

function drawShapeLayers(ctx, template) {
  if (!template.shapeLayers?.length) return;
  template.shapeLayers.forEach(shape => drawShapeLayer(ctx, shape));
}

function drawSelectedLayerOutline(ctx, template) {
  const ref = getLayerRef();
  if (!ref || ref.template.id !== template.id) return;
  const bounds = getEditableLayerBounds(ctx, ref);
  const padding = ref.type === "shape" ? Math.max(4, template.width / 360) : Math.max(3, ref.layer.size * 0.08);
  ctx.save();
  ctx.strokeStyle = "#176bff";
  ctx.lineWidth = Math.max(2, template.width / 540);
  ctx.setLineDash([8, 5]);
  ctx.strokeRect(
    bounds.left - padding,
    bounds.top - padding,
    bounds.right - bounds.left + padding * 2,
    bounds.bottom - bounds.top + padding * 2
  );
  ctx.restore();
}

function drawReferenceGuides(ctx, template) {
  if (!state.guides.length) return;
  ctx.save();
  ctx.strokeStyle = "#00a3ff";
  ctx.lineWidth = Math.max(1.5, template.width / 720);
  ctx.setLineDash([12, 8]);
  state.guides.forEach(guide => {
    ctx.beginPath();
    if (guide.axis === "x") {
      ctx.moveTo(guide.value, 0);
      ctx.lineTo(guide.value, template.height);
    } else {
      ctx.moveTo(0, guide.value);
      ctx.lineTo(template.width, guide.value);
    }
    ctx.stroke();
  });
  ctx.restore();
}

function getImageHandleSize() {
  return Math.max(18, 14 / state.zoom);
}

function getImageHandles(template) {
  const placement = getImagePlacement(template);
  if (!placement) return [];
  const { x, y, width, height } = placement;
  return [
    { corner: "nw", x, y },
    { corner: "ne", x: x + width, y },
    { corner: "se", x: x + width, y: y + height },
    { corner: "sw", x, y: y + height }
  ];
}

function findImageHandleAt(template, x, y) {
  if (!state.image || !template.imageBox) return null;
  const size = getImageHandleSize();
  return getImageHandles(template).find(handle => (
    Math.abs(x - handle.x) <= size / 2 && Math.abs(y - handle.y) <= size / 2
  ))?.corner || null;
}

function isPointInImagePlacement(template, x, y) {
  const placement = getImagePlacement(template);
  if (!placement) return false;
  return (
    x >= placement.x &&
    x <= placement.x + placement.width &&
    y >= placement.y &&
    y <= placement.y + placement.height
  );
}

function getImageResizeAnchor(placement, corner) {
  const { x, y, width, height } = placement;
  const anchors = {
    nw: { x: x + width, y: y + height },
    ne: { x, y: y + height },
    se: { x, y },
    sw: { x: x + width, y }
  };
  return anchors[corner];
}

function resizeImagePlacementFromCorner(template, drag, x, y) {
  const { startPlacement, corner } = drag;
  const anchor = getImageResizeAnchor(startPlacement, corner);
  const startDistance = Math.hypot(startPlacement.width, startPlacement.height);
  const currentDistance = Math.max(1, Math.hypot(x - anchor.x, y - anchor.y));
  const scale = Math.max(0.05, currentDistance / startDistance);
  const width = Math.max(1, startPlacement.width * scale);
  const height = Math.max(1, startPlacement.height * scale);
  const placements = {
    nw: { x: anchor.x - width, y: anchor.y - height, width, height },
    ne: { x: anchor.x, y: anchor.y - height, width, height },
    se: { x: anchor.x, y: anchor.y, width, height },
    sw: { x: anchor.x - width, y: anchor.y, width, height }
  };
  setImagePlacement(template, placements[corner]);
}

function cssUrl(value) {
  return `url("${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}")`;
}

function getImageEditOverflowMargins(template, placement) {
  const handleBuffer = getImageHandleSize() * state.zoom + 96;
  const imageDisplayWidth = placement.width * state.zoom;
  const imageDisplayHeight = placement.height * state.zoom;
  const canvasDisplayWidth = template.width * state.zoom;
  const canvasDisplayHeight = template.height * state.zoom;
  const horizontalOverflow = Math.max(0, (imageDisplayWidth - canvasDisplayWidth) / 2);
  const verticalOverflow = Math.max(0, (imageDisplayHeight - canvasDisplayHeight) / 2);
  return {
    left: Math.ceil(horizontalOverflow + handleBuffer),
    top: Math.ceil(verticalOverflow + handleBuffer),
    right: Math.ceil(horizontalOverflow + handleBuffer),
    bottom: Math.ceil(verticalOverflow + handleBuffer)
  };
}

function renderImageOverlay(template) {
  const overlay = dom.imageOverlay;
  const preview = dom.imageOverflowPreview;
  if (!overlay) return;
  const active = state.imageEditMode && state.image && template.imageBox;
  overlay.classList.toggle("is-active", Boolean(active));
  preview?.classList.toggle("is-active", Boolean(active && state.imageOverflowVisible));
  if (!active) {
    dom.canvasFrame.style.margin = "";
    const inactivePreviewBox = preview?.querySelector(".image-overflow-box");
    if (inactivePreviewBox) inactivePreviewBox.style.backgroundImage = "";
    return;
  }

  const placement = getImagePlacement(template);
  if (!placement) return;
  const canvasDisplayWidth = template.width * state.zoom;
  const canvasDisplayHeight = template.height * state.zoom;
  overlay.style.width = `${canvasDisplayWidth}px`;
  overlay.style.height = `${canvasDisplayHeight}px`;
  if (preview) {
    preview.style.width = `${canvasDisplayWidth}px`;
    preview.style.height = `${canvasDisplayHeight}px`;
  }
  const margins = getImageEditOverflowMargins(template, placement);
  dom.canvasFrame.style.margin = `${margins.top}px ${margins.right}px ${margins.bottom}px ${margins.left}px`;

  const previewBox = preview?.querySelector(".image-overflow-box");
  if (previewBox) {
    previewBox.style.left = `${placement.x * state.zoom}px`;
    previewBox.style.top = `${placement.y * state.zoom}px`;
    previewBox.style.width = `${placement.width * state.zoom}px`;
    previewBox.style.height = `${placement.height * state.zoom}px`;
    previewBox.style.backgroundImage = cssUrl(state.image.currentSrc || state.image.src);
  }

  const box = overlay.querySelector(".image-box");
  box.style.left = `${placement.x * state.zoom}px`;
  box.style.top = `${placement.y * state.zoom}px`;
  box.style.width = `${placement.width * state.zoom}px`;
  box.style.height = `${placement.height * state.zoom}px`;

  getImageHandles(template).forEach(handle => {
    const button = overlay.querySelector(`[data-image-handle="${handle.corner}"]`);
    if (!button) return;
    button.style.left = `${handle.x * state.zoom}px`;
    button.style.top = `${handle.y * state.zoom}px`;
  });
}

function findLayerAt(template, x, y) {
  return findTextLayerAt(template, x, y) || findShapeAt(template, x, y);
}

function paintTemplate(template, canvas, options = {}) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!template.transparent) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  if (template.imageBox) {
    if (state.image) {
      drawCoverImage(ctx, template);
      drawMask(ctx, template);
    } else if (!template.transparent) {
      ctx.fillStyle = "#d8dde4";
      ctx.fillRect(0, 0, template.width, template.height);
    }
  }

  if (template.base && state.baseImages[template.id]) {
    ctx.drawImage(state.baseImages[template.id], 0, 0, template.width, template.height);
  }

  eraseShapeFootprints(ctx, template);
  drawShapeLayers(ctx, template);
  if (options.showReference) {
    drawReferenceOverlay(ctx, template);
  }

  if (!options.backgroundOnly) {
    template.layers.forEach(layer => drawTextLayer(ctx, layer));
  }
}

function formatLayerText(layer) {
  return getLayerText(layer).replace(/\n/g, " / ");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getPlatformTemplates(platform) {
  return templates.filter(template => template.platform === platform);
}

function renderPlatformTemplateList(platform, listElement, countElement) {
  const platformTemplates = getPlatformTemplates(platform);
  const isActivePlatform = state.activePlatformId === platform;
  const section = document.querySelector(`[data-platform-section="${platform}"]`);
  const tab = dom.platformTabs.find(button => button.dataset.platformTab === platform);
  countElement.textContent = platformTemplates.length;
  section?.classList.toggle("is-active", isActivePlatform);
  tab?.classList.toggle("is-active", isActivePlatform);
  tab?.setAttribute("aria-selected", isActivePlatform ? "true" : "false");

  if (!isActivePlatform) {
    listElement.innerHTML = "";
    return;
  }

  listElement.innerHTML = platformTemplates.map(template => {
    const isActive = template.id === state.activeTemplateId;
    const layerCount = `${template.layers.length} 个文字层${template.shapeLayers?.length ? ` · ${template.shapeLayers.length} 个气泡` : ""}`;
    const shapeLayers = template.shapeLayers || [];
    const templateMeta = `
      <span class="template-meta">
        <span>${template.width}×${template.height}</span>
        <span>${layerCount}</span>
      </span>
    `;
    const layerMarkup = shapeLayers.length ? `
      <span class="layer-list">
        ${shapeLayers.map((layer, index) => {
          const key = makeShapeKey(template.id, index);
          return `<button class="shape-layer ${key === state.activeLayerKey ? "is-active" : ""}" data-layer-key="${key}">气泡 · ${escapeHtml(layer.name)}</button>`;
        }).join("")}
      </span>
    ` : "";

    return `
    <article class="template-item ${isActive ? "is-active" : ""}">
      <button class="template-select" data-template-id="${template.id}">
        <span class="template-item-head">
          <span class="template-name">${template.file}</span>
        </span>
        ${templateMeta}
      </button>
      ${layerMarkup}
    </article>
  `;
  }).join("");

  listElement.querySelectorAll("[data-template-id]").forEach(button => {
    button.addEventListener("click", () => {
      const templateId = button.dataset.templateId;
      state.activeTemplateId = templateId;
      state.activePlatformId = platform;
      state.activeLayerKey = null;
      state.guides = [];
      renderAll();
    });
  });

  listElement.querySelectorAll("[data-layer-key]").forEach(button => {
    button.addEventListener("click", () => {
      const { templateId } = parseLayerKey(button.dataset.layerKey);
      state.activeTemplateId = templateId;
      state.activePlatformId = platform;
      state.activeLayerKey = button.dataset.layerKey;
      state.guides = [];
      renderAll();
    });
  });
}

function renderTemplateList() {
  renderPlatformTemplateList("honor", dom.honorTemplateList, dom.honorTemplateCount);
  renderPlatformTemplateList("oppo", dom.oppoTemplateList, dom.oppoTemplateCount);
  renderPlatformTemplateList("vivo", dom.vivoTemplateList, dom.vivoTemplateCount);
}

function buildConfig(platform) {
  const platformTemplates = getPlatformTemplates(platform);
  const metricCtx = dom.editorCanvas?.getContext?.("2d") || null;
  return {
    version: 1,
    platform,
    updatedAt: new Date().toISOString(),
    templates: platformTemplates.map(template => ({
      id: template.id,
      file: template.file,
      width: template.width,
      height: template.height,
      ...(template.shapeLayers?.length ? {
        bubbleLayers: template.shapeLayers.map((layer, index) => ({
          index,
          key: makeShapeKey(template.id, index),
          name: layer.name,
          box: roundBox(layer.box),
          x: roundParam(layer.box[0]),
          y: roundParam(layer.box[1]),
          width: roundParam(layer.box[2] - layer.box[0]),
          height: roundParam(layer.box[3] - layer.box[1]),
          radius: layer.radius || 0,
          color: normalizeHexColor(layer.color),
          eraseBox: roundBox(layer.eraseBox || layer.box)
        }))
      } : {}),
      textLayers: template.layers.map((layer, index) => {
        const metrics = metricCtx ? getLayerRenderMetrics(metricCtx, layer) : null;
        const baselineY = metrics ? metrics.baselineY : getTextLayerBaselineY(layer);
        const textBounds = metrics ? roundBounds(metrics.bounds) : null;
        return {
          index,
          key: makeLayerKey(template.id, index),
          text: getLayerText(layer),
          positionMode: "baseline",
          verticalAlign: getTextLayerVerticalAlign(layer),
          box: roundBox(layer.box),
          textBounds,
          x: roundParam(getTextLayerAnchorX(layer)),
          y: roundParam(baselineY),
          anchorX: roundParam(getTextLayerAnchorX(layer)),
          baselineY: roundParam(baselineY),
          renderX: textBounds ? textBounds.left : null,
          renderY: textBounds ? textBounds.top : null,
          renderWidth: metrics ? roundParam(metrics.bounds.right - metrics.bounds.left) : null,
          renderHeight: metrics ? roundParam(metrics.bounds.bottom - metrics.bounds.top) : null,
          size: layer.size,
          baseSize: layer.size,
          renderSize: metrics ? roundParam(metrics.size) : layer.size,
          autoFit: Boolean(layer.autoFit),
          autoFitGroup: layer.autoFitGroup || null,
          lineHeight: layer.lineHeight || null,
          renderLineHeight: metrics ? roundParam(metrics.lineHeight) : layer.lineHeight || null,
          ascent: metrics ? roundParam(metrics.maxAscent) : null,
          descent: metrics ? roundParam(metrics.maxDescent) : null,
          tracking: layer.tracking || 0,
          renderTracking: metrics ? roundParam(metrics.tracking) : layer.tracking || 0,
          color: normalizeHexColor(layer.color),
          editGroup: layer.editGroup || null,
          charColors: layer.charColors || null,
          anchor: getTextLayerHorizontalAlign(layer),
          align: getTextLayerHorizontalAlign(layer),
          horizontalAlign: getTextLayerHorizontalAlign(layer)
        };
      })
    }))
  };
}

function renderConfigJson(platform) {
  return JSON.stringify(buildConfig(platform), null, 2);
}

function renderTextContentEditor(activeRef) {
  const editable = Boolean(activeRef && activeRef.type === "text" && isLayerTextContentEditable(activeRef.template, activeRef.layer));
  dom.layerTextContentField.classList.toggle("is-hidden", !editable);
  dom.layerTextContent.disabled = !editable;
  if (!editable) {
    dom.layerTextContent.value = "";
    return;
  }
  if (document.activeElement !== dom.layerTextContent) {
    dom.layerTextContent.value = activeRef.layer.text;
  }
}

function renderTextGroupControls() {
  const template = getActiveTemplate();
  const selection = getTemplateTextSelection(template);
  const activeRef = getLayerRef();
  const textRefs = getTextLayerRefs(template);

  dom.activeGroupName.textContent = getActiveGroupName(activeRef);
  if (document.activeElement !== dom.textGroupName) {
    dom.textGroupName.value = state.pendingGroupName;
  }

  dom.textGroupLayerList.innerHTML = textRefs.map(ref => {
    const isChecked = selection.has(ref.key);
    const isActive = ref.key === state.activeLayerKey;
    const groupName = formatGroupName(ref.layer.editGroup);
    return `
      <div class="group-layer-row ${isActive ? "is-active" : ""}">
        <input type="checkbox" data-text-group-key="${ref.key}" ${isChecked ? "checked" : ""}>
        <button type="button" data-text-layer-key="${ref.key}">
          <span>${escapeHtml(formatLayerText(ref.layer))}</span>
          <em>${escapeHtml(groupName)}</em>
        </button>
      </div>
    `;
  }).join("");

  dom.textGroupLayerList.querySelectorAll("[data-text-group-key]").forEach(input => {
    input.addEventListener("change", event => {
      const key = event.target.dataset.textGroupKey;
      if (event.target.checked) {
        selection.add(key);
        state.activeLayerKey = key;
        state.guides = [];
        renderAll();
      } else {
        selection.delete(key);
        renderTextGroupControls();
      }
    });
  });

  dom.textGroupLayerList.querySelectorAll("[data-text-layer-key]").forEach(button => {
    button.addEventListener("click", () => {
      state.activeLayerKey = button.dataset.textLayerKey;
      state.guides = [];
      renderAll();
    });
  });

  dom.applyTextGroup.disabled = selection.size < 2;
  dom.ungroupTextSelection.disabled = selection.size < 1;
  renderTextContentEditor(activeRef);
}

function renderTextAlignControl(layer = null) {
  const activeAlign = layer ? getTextLayerHorizontalAlign(layer) : null;
  dom.layerTextAlignButtons.forEach(button => {
    const isActive = button.dataset.textAlign === activeAlign;
    button.classList.toggle("is-active", isActive);
    button.disabled = !layer;
  });
}

function setLayerInspectorDisabled(disabled) {
  [
    dom.layerX,
    dom.layerY,
    dom.layerSize,
    dom.layerLineHeight,
    dom.layerColor
  ].forEach(input => {
    input.disabled = disabled;
  });
  dom.layerVerticalCenter.disabled = disabled;
}

function renderEmptyLayerControls() {
  dom.activeLayerKind.textContent = "未选择图层";
  dom.activeLayerName.textContent = "从右侧文本编组或画布中选择";
  dom.layerXLabel.textContent = "X";
  dom.layerYLabel.textContent = "Y";
  dom.layerSizeLabel.textContent = "字号";
  dom.layerLineHeightLabel.textContent = "行距";
  dom.layerX.value = "";
  dom.layerY.value = "";
  dom.layerSize.value = "";
  dom.layerLineHeight.value = "";
  dom.layerColor.value = "#000000";
  dom.layerVerticalCenter.checked = false;
  setLayerInspectorDisabled(true);
  renderTextAlignControl();
  renderTextGroupControls();
}

function renderLayerControls() {
  const ref = getLayerRef();
  if (!ref) {
    renderEmptyLayerControls();
    return;
  }
  setLayerInspectorDisabled(false);
  const { layer } = ref;
  if (ref.type === "shape") {
    dom.activeLayerKind.textContent = "当前气泡层";
    dom.activeLayerName.textContent = layer.name;
    dom.layerXLabel.textContent = "X";
    dom.layerYLabel.textContent = "Y";
    dom.layerX.value = Math.round(layer.box[0]);
    dom.layerY.value = Math.round(layer.box[1]);
    dom.layerSizeLabel.textContent = "宽";
    dom.layerLineHeightLabel.textContent = "高";
    dom.layerSize.value = Math.round(layer.box[2] - layer.box[0]);
    dom.layerLineHeight.value = Math.round(layer.box[3] - layer.box[1]);
    dom.layerVerticalCenter.checked = false;
    dom.layerVerticalCenter.disabled = true;
    renderTextAlignControl();
    dom.layerColor.value = normalizeHexColor(layer.color);
    renderTextGroupControls();
    return;
  }
  const metrics = getLayerRenderMetrics(dom.editorCanvas.getContext("2d"), layer);
  dom.activeLayerKind.textContent = "当前文字层";
  dom.activeLayerName.textContent = getLayerText(layer).replace(/\n/g, " / ");
  dom.layerXLabel.textContent = "锚点X";
  dom.layerYLabel.textContent = "基线Y";
  dom.layerX.value = Math.round(getTextLayerAnchorX(layer));
  dom.layerY.value = Math.round(metrics.baselineY);
  dom.layerSizeLabel.textContent = "字号";
  dom.layerLineHeightLabel.textContent = "行距";
  dom.layerSize.value = Math.round(layer.size);
  dom.layerLineHeight.value = layer.lineHeight ? Math.round(layer.lineHeight) : "";
  dom.layerVerticalCenter.checked = getTextLayerVerticalAlign(layer) === "center";
  dom.layerVerticalCenter.disabled = false;
  renderTextAlignControl(layer);
  dom.layerColor.value = normalizeHexColor(layer.color);
  renderTextGroupControls();
}

function renderActiveCanvas() {
  const template = getActiveTemplate();
  const canvas = dom.editorCanvas;
  const mask = getMask(template);
  const maskEnabled = canUseMask(template);
  ensureActiveLayerForTemplate(template);

  if (canvas.width !== template.width) canvas.width = template.width;
  if (canvas.height !== template.height) canvas.height = template.height;

  paintTemplate(template, canvas, { showReference: true });
  const ctx = canvas.getContext("2d");
  drawSelectedLayerOutline(ctx, template);
  drawReferenceGuides(ctx, template);
  canvas.style.width = `${Math.round(template.width * state.zoom)}px`;
  canvas.style.height = "auto";
  renderImageOverlay(template);

  dom.activeFileName.textContent = template.file;
  dom.activeMeta.textContent = `${template.width}×${template.height}`;
  dom.zoomRange.value = Math.round(state.zoom * 100);
  dom.zoomValue.textContent = `${Math.round(state.zoom * 100)}%`;
  dom.maskControl.classList.toggle("is-disabled", !maskEnabled);
  dom.maskOpacity.disabled = !maskEnabled;
  dom.maskOpacity.value = Math.round(mask.opacity * 100);
  dom.maskOpacityValue.textContent = maskEnabled ? `${Math.round(mask.opacity * 100)}%` : "不适用";
  dom.maskControl.querySelectorAll("[data-mask-color]").forEach(button => {
    button.disabled = !maskEnabled;
    button.classList.toggle("is-active", button.dataset.maskColor === mask.color);
  });
  dom.referenceOpacity.disabled = !state.referenceImages[template.id];
  dom.referenceVisible.disabled = !state.referenceImages[template.id];
  dom.referenceVisible.checked = state.reference.visible;
  dom.referenceOpacity.value = Math.round(state.reference.opacity * 100);
  dom.referenceOpacityValue.textContent = `${Math.round(state.reference.opacity * 100)}%`;
  dom.referenceControl.classList.toggle("is-disabled", !state.referenceImages[template.id]);
  dom.editImageMode.disabled = !state.image || !template.imageBox;
  dom.imageOverflowVisible.disabled = !state.image || !template.imageBox;
  dom.imageOverflowVisible.checked = state.imageOverflowVisible;
  dom.editImageMode.classList.toggle("is-active", state.imageEditMode && Boolean(state.image && template.imageBox));
  dom.editImageMode.textContent = state.imageEditMode && state.image && template.imageBox ? "编辑中" : "编辑";
  canvas.classList.toggle("can-drag", Boolean(template.layers.length || template.shapeLayers?.length || (template.imageBox && state.image)));
  canvas.classList.toggle("is-image-editing", state.imageEditMode && Boolean(state.image && template.imageBox));
  renderLayerControls();
}

function renderAll() {
  renderTemplateList();
  renderActiveCanvas();
  const ready = state.fontLoaded && Boolean(state.image);
  dom.exportZip.disabled = !ready;
  dom.downloadCurrent.disabled = !ready;
  dom.resetImagePosition.disabled = !state.image || !getActiveTemplate().imageBox;
  dom.editImageMode.disabled = !state.image || !getActiveTemplate().imageBox;
  dom.imageOverflowVisible.disabled = !state.image || !getActiveTemplate().imageBox;
}

function canvasToJpeg(canvas, quality) {
  return new Promise(resolve => {
    canvas.toBlob(blob => resolve(blob), "image/jpeg", quality);
  });
}

function canvasToPng(canvas) {
  return new Promise(resolve => {
    canvas.toBlob(blob => resolve(blob), "image/png");
  });
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return "无限制";
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(2)} MB`;
  return `${Math.ceil(bytes / 1024)} KB`;
}

function makeDetailReducedCanvas(sourceCanvas, scale) {
  const scratch = makeCanvas(
    Math.max(1, Math.round(sourceCanvas.width * scale)),
    Math.max(1, Math.round(sourceCanvas.height * scale))
  );
  const scratchCtx = scratch.getContext("2d");
  scratchCtx.imageSmoothingEnabled = true;
  scratchCtx.imageSmoothingQuality = "high";
  scratchCtx.drawImage(sourceCanvas, 0, 0, scratch.width, scratch.height);

  const output = makeCanvas(sourceCanvas.width, sourceCanvas.height);
  const outputCtx = output.getContext("2d");
  outputCtx.imageSmoothingEnabled = true;
  outputCtx.imageSmoothingQuality = "high";
  outputCtx.drawImage(scratch, 0, 0, output.width, output.height);
  return output;
}

async function canvasToCompressedJpeg(canvas, maxSize) {
  const qualities = [0.92, 0.86, 0.8, 0.74, 0.68, 0.62, 0.56, 0.5, 0.44, 0.38, 0.32, 0.26, 0.22, 0.18, 0.14, 0.1, 0.07, 0.05];
  let bestBlob = null;

  for (const quality of qualities) {
    const blob = await canvasToJpeg(canvas, quality);
    bestBlob = !bestBlob || blob.size < bestBlob.size ? blob : bestBlob;
    if (blob.size <= maxSize) return blob;
  }

  const detailScales = [0.88, 0.76, 0.64, 0.54, 0.46, 0.38, 0.32, 0.26];
  const fallbackQualities = [0.72, 0.6, 0.48, 0.36, 0.26, 0.18, 0.12, 0.08, 0.05];
  for (const scale of detailScales) {
    const reducedCanvas = makeDetailReducedCanvas(canvas, scale);
    for (const quality of fallbackQualities) {
      const blob = await canvasToJpeg(reducedCanvas, quality);
      bestBlob = !bestBlob || blob.size < bestBlob.size ? blob : bestBlob;
      if (blob.size <= maxSize) return blob;
    }
  }

  return bestBlob;
}

function makeExportSizeError(template, blob) {
  const error = new Error(`${template.file} 超过大小限制`);
  error.template = template;
  error.actualSize = blob?.size || 0;
  error.maxSize = template.maxSize;
  return error;
}

async function exportTemplateBlob(template) {
  const canvas = makeCanvas(template.width, template.height);
  paintTemplate(template, canvas);
  if (template.format === "png") {
    const blob = await canvasToPng(canvas);
    if (Number.isFinite(template.maxSize) && blob.size > template.maxSize) {
      throw makeExportSizeError(template, blob);
    }
    return blob;
  }
  const blob = await canvasToCompressedJpeg(canvas, template.maxSize);
  if (blob.size > template.maxSize) {
    throw makeExportSizeError(template, blob);
  }
  return blob;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function downloadSingle(id) {
  const template = templates.find(item => item.id === id);
  if (!template) return;
  try {
    const blob = await exportTemplateBlob(template);
    downloadBlob(blob, template.file);
  } catch (error) {
    alert(`无法导出 ${template.file}\n当前最小体积：${formatBytes(error.actualSize)}\n平台限制：${formatBytes(error.maxSize)}`);
  }
}

async function exportZip() {
  if (!window.JSZip) {
    alert("JSZip 未加载，无法打包导出。");
    return;
  }
  dom.exportZip.disabled = true;
  dom.exportZip.textContent = "导出中";
  try {
    const zip = new JSZip();
    const platformFolderNames = { honor: "荣耀", oppo: "OPPO", vivo: "vivo" };
    const failures = [];

    for (const platform of ["honor", "oppo", "vivo"]) {
      const folder = zip.folder(platformFolderNames[platform] || platform);
      for (const template of getPlatformTemplates(platform)) {
        try {
          const blob = await exportTemplateBlob(template);
          folder.file(template.file, blob);
        } catch (error) {
          failures.push({
            folder: platformFolderNames[platform] || platform,
            file: template.file,
            actualSize: error.actualSize,
            maxSize: error.maxSize
          });
        }
      }
    }

    if (failures.length) {
      const details = failures
        .map(item => `${item.folder}/${item.file}: ${formatBytes(item.actualSize)} > ${formatBytes(item.maxSize)}`)
        .join("\n");
      alert(`以下图片压缩后仍超过平台限制，已停止导出：\n${details}`);
      return;
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const name = fileBaseName(state.fontName || "latin");
    downloadBlob(zipBlob, `${name}.zip`);
  } finally {
    dom.exportZip.textContent = "导出三平台 ZIP";
    dom.exportZip.disabled = !(state.fontLoaded && Boolean(state.image));
  }
}

async function loadBaseImages() {
  await Promise.all(templates.filter(template => template.base).map(async template => {
    state.baseImages[template.id] = await loadImageUrl(template.base);
  }));
}

async function loadReferenceImages() {
  await Promise.all(templates.filter(template => template.reference).map(async template => {
    state.referenceImages[template.id] = await loadImageUrl(template.reference);
  }));
}

async function handleFontFile(file) {
  if (!file) return;
  try {
    state.fontFamily = await loadFont(file);
    state.fontLoaded = true;
    state.fontName = fileBaseName(file.name);
    if (dom.fontName) dom.fontName.value = state.fontName;
    setUploadFileName(dom.fontFileName, file.name);
    renderAll();
  } catch (error) {
    console.error(error);
    dom.fontFileName.innerHTML = '<span class="error">字体加载失败</span>';
    state.fontLoaded = false;
    renderAll();
  }
}

async function handleImageFile(file) {
  if (!file) return;
  try {
    const nextImage = await loadImageFromFile(file);
    releaseLoadedImage(state.image);
    state.image = nextImage;
    state.imagePlacements = {};
    state.imageEditMode = true;
    setUploadFileName(dom.imageFileName, file.name);
    renderAll();
  } catch (error) {
    console.error(error);
    dom.imageFileName.innerHTML = '<span class="error">图片加载失败</span>';
    releaseLoadedImage(state.image);
    state.image = null;
    renderAll();
  }
}

function bindUploadDrop(input, handler) {
  const tile = input.closest(".upload-tile");
  if (!tile) return;
  ["dragenter", "dragover"].forEach(eventName => {
    tile.addEventListener(eventName, event => {
      event.preventDefault();
      tile.classList.add("is-drag-over");
    });
  });
  ["dragleave", "drop"].forEach(eventName => {
    tile.addEventListener(eventName, event => {
      event.preventDefault();
      tile.classList.remove("is-drag-over");
    });
  });
  tile.addEventListener("drop", event => {
    const file = event.dataTransfer?.files?.[0];
    if (file) handler(file);
  });
}

function bindEvents() {
  dom.platformTabs.forEach(button => {
    button.addEventListener("click", () => {
      const platform = button.dataset.platformTab;
      const firstTemplate = getPlatformTemplates(platform)[0];
      state.activePlatformId = platform;
      if (firstTemplate) {
        state.activeTemplateId = firstTemplate.id;
      }
      state.activeLayerKey = null;
      state.guides = [];
      renderAll();
    });
  });

  dom.fontFile.addEventListener("change", event => handleFontFile(event.target.files[0]));
  dom.imageFile.addEventListener("change", event => handleImageFile(event.target.files[0]));
  bindUploadDrop(dom.fontFile, handleFontFile);
  bindUploadDrop(dom.imageFile, handleImageFile);

  dom.fontName?.addEventListener("input", event => {
    state.fontName = event.target.value;
    renderAll();
  });

  dom.zoomRange.addEventListener("input", event => {
    state.zoom = Number(event.target.value) / 100;
    renderActiveCanvas();
  });

  dom.layerX.addEventListener("input", () => {
    const ref = getLayerRef();
    if (!ref) return;
    if (ref.type === "shape") {
      setLayerPosition(ref.layer, Number(dom.layerX.value) || 0, ref.layer.box[1]);
    } else {
      setTextEditGroupPosition(ref, Number(dom.layerX.value) || 0, getTextLayerBaselineY(ref.layer, dom.editorCanvas.getContext("2d")));
    }
    renderAll();
  });

  dom.layerY.addEventListener("input", () => {
    const ref = getLayerRef();
    if (!ref) return;
    if (ref.type === "shape") {
      setLayerPosition(ref.layer, ref.layer.box[0], Number(dom.layerY.value) || 0);
    } else {
      setTextEditGroupPosition(ref, getTextLayerAnchorX(ref.layer), Number(dom.layerY.value) || 0);
    }
    renderAll();
  });

  dom.layerSize.addEventListener("input", () => {
    const ref = getLayerRef();
    if (!ref) return;
    if (ref.type === "shape") {
      setShapeSizeWithAnchor(ref.layer, Number(dom.layerSize.value) || 1, ref.layer.box[3] - ref.layer.box[1]);
    } else {
      setTextEditGroupSize(ref, Number(dom.layerSize.value) || 1);
    }
    renderAll();
  });

  dom.layerLineHeight.addEventListener("input", () => {
    const ref = getLayerRef();
    if (!ref) return;
    if (ref.type === "shape") {
      setShapeSizeWithAnchor(ref.layer, ref.layer.box[2] - ref.layer.box[0], Number(dom.layerLineHeight.value) || 1);
      renderAll();
      return;
    }
    const value = Number(dom.layerLineHeight.value);
    if (Number.isFinite(value) && value > 0) {
      ref.layer.lineHeight = value;
    } else {
      delete ref.layer.lineHeight;
    }
    renderAll();
  });

  dom.layerVerticalCenter.addEventListener("change", () => {
    const ref = getLayerRef();
    if (!ref || ref.type !== "text") return;
    if (dom.layerVerticalCenter.checked) {
      ref.layer.verticalAlign = "center";
    } else {
      ref.layer.baselineY = getTextLayerBaselineY(ref.layer, dom.editorCanvas.getContext("2d"));
      ref.layer.verticalAlign = "baseline";
    }
    renderAll();
  });

  dom.layerTextAlignButtons.forEach(button => {
    button.addEventListener("click", () => {
      const ref = getLayerRef();
      if (!ref || ref.type !== "text") return;
      setTextLayerHorizontalAlign(ref.layer, button.dataset.textAlign, dom.editorCanvas.getContext("2d"));
      renderAll();
    });
  });

  dom.layerColor.addEventListener("input", () => {
    const ref = getLayerRef();
    if (!ref) return;
    ref.layer.color = normalizeHexColor(dom.layerColor.value);
    renderAll();
  });

  dom.textGroupName.addEventListener("input", event => {
    state.pendingGroupName = event.target.value;
  });

  dom.layerTextContent.addEventListener("input", event => {
    const ref = getLayerRef();
    if (!ref || ref.type !== "text" || !isLayerTextContentEditable(ref.template, ref.layer)) return;
    ref.layer.text = event.target.value;
    renderAll();
  });

  dom.applyTextGroup.addEventListener("click", applyTextGroupToSelection);
  dom.ungroupTextSelection.addEventListener("click", ungroupSelectedTextLayers);
  dom.ungroupTemplateTextGroups.addEventListener("click", () => {
    ungroupTemplateTextLayers();
    renderAll();
  });
  dom.ungroupAllTextGroups.addEventListener("click", ungroupAllTextLayers);

  dom.exportHonorConfig.addEventListener("click", () => {
    const blob = new Blob([renderConfigJson("honor")], { type: "text/plain;charset=utf-8" });
    downloadBlob(blob, `${fileBaseName(state.fontName || "honor-latin")}_honor_text_params.txt`);
  });

  dom.exportOppoConfig.addEventListener("click", () => {
    const blob = new Blob([renderConfigJson("oppo")], { type: "text/plain;charset=utf-8" });
    downloadBlob(blob, `${fileBaseName(state.fontName || "oppo-latin")}_oppo_text_params.txt`);
  });

  dom.exportVivoConfig.addEventListener("click", () => {
    const blob = new Blob([renderConfigJson("vivo")], { type: "text/plain;charset=utf-8" });
    downloadBlob(blob, `${fileBaseName(state.fontName || "vivo-latin")}_vivo_text_params.txt`);
  });

  dom.resetImagePosition.addEventListener("click", () => {
    const template = getActiveTemplate();
    delete state.imagePlacements[template.id];
    renderActiveCanvas();
  });

  dom.imageOverflowVisible.addEventListener("change", event => {
    state.imageOverflowVisible = event.target.checked;
    renderActiveCanvas();
  });

  dom.editImageMode.addEventListener("click", () => {
    const template = getActiveTemplate();
    if (!state.image || !template.imageBox) return;
    state.imageEditMode = !state.imageEditMode;
    renderActiveCanvas();
  });

  dom.maskControl.querySelectorAll("[data-mask-color]").forEach(button => {
    button.addEventListener("click", () => {
      const template = getActiveTemplate();
      if (!canUseMask(template)) return;
      getMask(template).color = button.dataset.maskColor;
      renderActiveCanvas();
    });
  });

  dom.maskOpacity.addEventListener("input", event => {
    const template = getActiveTemplate();
    if (!canUseMask(template)) return;
    getMask(template).opacity = Number(event.target.value) / 100;
    renderActiveCanvas();
  });

  dom.referenceOpacity.addEventListener("input", event => {
    state.reference.opacity = Number(event.target.value) / 100;
    renderActiveCanvas();
  });

  dom.referenceVisible.addEventListener("change", event => {
    state.reference.visible = event.target.checked;
    renderActiveCanvas();
  });

  dom.decreaseAllTextSize.addEventListener("click", () => adjustActiveTemplateTextSizes(-1));
  dom.increaseAllTextSize.addEventListener("click", () => adjustActiveTemplateTextSizes(1));

  dom.downloadCurrent.addEventListener("click", () => downloadSingle(state.activeTemplateId));
  dom.exportZip.addEventListener("click", exportZip);
  document.addEventListener("keydown", moveActiveTextLayerByKeyboard);
  bindCanvasDrag();
}

function bindCanvasDrag() {
  const dragSurface = dom.canvasFrame || dom.editorCanvas;

  dragSurface.addEventListener("pointerdown", event => {
    const template = getActiveTemplate();
    const rect = dom.editorCanvas.getBoundingClientRect();
    const canvasX = (event.clientX - rect.left) * (dom.editorCanvas.width / rect.width);
    const canvasY = (event.clientY - rect.top) * (dom.editorCanvas.height / rect.height);
    const imageEditActive = state.imageEditMode && state.image && template.imageBox;
    const imageHandle = event.target?.dataset?.imageHandle || findImageHandleAt(template, canvasX, canvasY);
    const hitLayerKey = imageHandle || imageEditActive ? null : findLayerAt(template, canvasX, canvasY);
    let dragType = "image";

    if (imageHandle) {
      dragType = "image-resize";
      state.guides = [];
      renderActiveCanvas();
    } else if (imageEditActive) {
      if (!isPointInImagePlacement(template, canvasX, canvasY)) return;
      dragType = "image";
      state.guides = [];
      renderActiveCanvas();
    } else if (hitLayerKey) {
      state.activeLayerKey = hitLayerKey;
      state.guides = [];
      dragType = parseLayerKey(hitLayerKey).type === "shape" ? "shape-resize" : "layer";
      renderAll();
    } else if (!state.image || !template.imageBox) {
      return;
    }

    dragSurface.setPointerCapture(event.pointerId);
    dom.editorCanvas.classList.add("is-dragging");
    state.drag = {
      type: dragType,
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      startPlacement: imageHandle ? { ...getImagePlacement(template) } : null,
      corner: imageHandle
    };
  });

  dragSurface.addEventListener("pointermove", event => {
    if (!state.drag || state.drag.pointerId !== event.pointerId) return;
    const template = getActiveTemplate();
    const rect = dom.editorCanvas.getBoundingClientRect();
    const dx = (event.clientX - state.drag.x) * (dom.editorCanvas.width / rect.width);
    const dy = (event.clientY - state.drag.y) * (dom.editorCanvas.height / rect.height);
    const canvasX = (event.clientX - rect.left) * (dom.editorCanvas.width / rect.width);
    const canvasY = (event.clientY - rect.top) * (dom.editorCanvas.height / rect.height);
    state.drag.x = event.clientX;
    state.drag.y = event.clientY;
    if (state.drag.type === "layer") {
      const ref = getLayerRef();
      if (ref) {
        state.guides = moveLayerWithGuides(ref, dx, dy, dom.editorCanvas.getContext("2d"));
      }
      renderActiveCanvas();
    } else if (state.drag.type === "shape-resize") {
      const ref = getLayerRef();
      if (ref?.type === "shape") {
        const width = ref.layer.box[2] - ref.layer.box[0];
        const height = ref.layer.box[3] - ref.layer.box[1];
        const anchor = getBubbleResizeAnchor(ref.layer);
        const widthDelta = anchor === "bottom-right" ? -dx : dx;
        const heightDelta = anchor === "top-left" ? dy : -dy;
        setShapeSizeWithAnchor(ref.layer, width + widthDelta, height + heightDelta);
      }
      state.guides = [];
      renderActiveCanvas();
    } else if (state.drag.type === "image-resize") {
      resizeImagePlacementFromCorner(template, state.drag, canvasX, canvasY);
      state.guides = [];
      renderActiveCanvas();
    } else {
      state.guides = [];
      moveImagePlacement(template, dx, dy);
      renderActiveCanvas();
    }
  });

  ["pointerup", "pointercancel", "lostpointercapture"].forEach(eventName => {
    dragSurface.addEventListener(eventName, () => {
      state.drag = null;
      state.guides = [];
      dom.editorCanvas.classList.remove("is-dragging");
      renderActiveCanvas();
    });
  });
}

async function boot() {
  bindEvents();
  clearLegacyEditableState();
  initializeTextLayerBaselineAnchors();
  await loadBaseImages();
  await loadReferenceImages();
  rebuildAllTextAutoFitGroups();
  renderAll();
}

document.addEventListener("DOMContentLoaded", boot);
