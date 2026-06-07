# 📁 Struktur Project - Absensi Wajah

```
tugas-absensi-wajah-/
│
├── 📄 index.html                 (4.3 KB)
│   └─ Struktur HTML utama aplikasi
│      • Header dengan judul
│      • Form input nama mahasiswa
│      • Camera section dengan video preview
│      • Photo preview section
│      • Status & notification elements
│      • Loading spinner
│      • Panduan penggunaan
│
├── 🎨 style.css                  (11 KB)
│   └─ Styling CSS modern hitam klasik
│      • Global styles & reset
│      • Layout responsive dengan flexbox
│      • Tema warna: hitam (#1a1a1a) + biru (#0084ff)
│      • Smooth animations & transitions
│      • Media queries untuk mobile/tablet/desktop
│      • Beautiful buttons & forms
│      • Notification styling
│
├── ⚙️ app.js                     (9.7 KB)
│   └─ Logic JavaScript utama
│      • Camera control (access, start, stop)
│      • Photo capture menggunakan Canvas API
│      • Base64 image conversion
│      • Data submission ke Google Apps Script
│      • Notification system
│      • State management
│      • Event listeners & DOM manipulation
│
├── 📜 google-apps-script.gs      (4.1 KB)
│   └─ Google Apps Script backend
│      • doPost() - menerima data POST
│      • Parse JSON data
│      • Append data ke Google Sheets
│      • Error handling
│      • Test & utility functions
│      • Setup & logging functions
│
├── 📖 README.md                  (6.2 KB)
│   └─ Dokumentasi lengkap
│      • Fitur-fitur aplikasi
│      • Setup steps detail
│      • Panduan penggunaan
│      • Troubleshooting guide
│      • Browser compatibility
│      • Technology stack
│
├── 🚀 SETUP_GUIDE.md
│   └─ Quick setup dalam 5 langkah
│      • Google Spreadsheet setup
│      • Google Apps Script deploy
│      • File configuration
│      • Testing & troubleshooting
│
└── 📋 PROJECT_STRUCTURE.md       (File ini)
    └─ Overview struktur project

```

## 📊 File Breakdown

### index.html
**Tujuan**: Struktur HTML aplikasi
**Ukuran**: 4.3 KB
**Konten Utama**:
- Header dengan title & subtitle
- Form untuk input nama mahasiswa
- Video element untuk camera feed
- Canvas untuk capturing foto
- Photo preview section
- Status section untuk menampilkan hasil
- Notification & loading spinner
- Info/panduan penggunaan

### style.css
**Tujuan**: Styling & desain visual
**Ukuran**: 11 KB
**Fitur**:
- Dark theme (hitam classic)
- Gradient backgrounds
- Responsive design (mobile-first)
- Smooth transitions & animations
- Button hover effects
- Modern form styling
- Notification animations
- Media queries untuk berbagai ukuran layar

### app.js
**Tujuan**: Logic & interaktivitas aplikasi
**Ukuran**: 9.7 KB
**Fungsi Utama**:
```javascript
toggleCamera()       // Aktifkan/matikan kamera
startCamera()        // Akses kamera device
stopCamera()         // Matikan kamera
capturePhoto()       // Ambil foto dari video
retakePhoto()        // Ulangi pengambilan foto
submitAttendance()   // Kirim data ke Google Apps Script
showNotification()   // Tampilkan notifikasi
resetForm()          // Reset form untuk user baru
```

### google-apps-script.gs
**Tujuan**: Backend untuk penyimpanan data
**Ukuran**: 4.1 KB
**Fungsi Utama**:
```javascript
doPost(e)          // Menerima & simpan data POST
setupSheet()       // Setup header di spreadsheet
testPostRequest()  // Test posting data
getSpreadsheetInfo() // Get spreadsheet information
```

## 🔄 Data Flow

```
User Input (HTML)
    ↓
Event Listener (JavaScript)
    ↓
Capture Photo (Canvas API)
    ↓
Convert to Base64 (JavaScript)
    ↓
Create Payload (JSON)
    ↓
POST to Google Apps Script
    ↓
Parse & Validate (GAS)
    ↓
Append to Google Sheets
    ↓
Return Response
    ↓
Show Notification (JavaScript)
    ↓
Display Success Message (HTML/CSS)
```

## 🎯 Teknologi Stack

| Layer | Teknologi | Fungsi |
|-------|-----------|--------|
| **Frontend** | HTML5, CSS3, JavaScript | UI & Interaksi |
| **Camera** | WebRTC API | Akses kamera device |
| **Image** | Canvas API | Capture & konversi foto |
| **Backend** | Google Apps Script | Server-side logic |
| **Database** | Google Sheets | Penyimpanan data |
| **API** | HTTP POST | Komunikasi frontend-backend |

## 📱 Responsive Breakpoints

```css
Desktop:  > 768px
  - Full layout, optimal spacing
  - Landscape camera preview

Tablet:   481px - 768px
  - Adjusted layout
  - Flexible button sizing

Mobile:   < 480px
  - Single column layout
  - Square camera preview
  - Touch-friendly buttons
```

## 🔐 Security Notes

- ✅ Input validation (nama tidak kosong)
- ✅ Base64 encoding untuk foto
- ✅ CORS-friendly POST request
- ✅ Error handling & try-catch
- ⚠️ Foto disimpan sebagai base64 (besar)
- ⚠️ Pastikan Google Apps Script di-deploy dengan "Anyone" access

## 📈 Performance

- **HTML**: Minimal, semantic markup (4.3 KB)
- **CSS**: Optimized with no external dependencies (11 KB)
- **JavaScript**: Vanilla JS, no frameworks (9.7 KB)
- **Total Size**: ~25 KB (tanpa foto)
- **Load Time**: < 1 detik (cached)
- **Runtime**: Lightweight, smooth animations

## 🛠️ Customization Tips

1. **Ubah Warna Tema**:
   - Edit color values di `style.css`
   - Primary: `#0084ff` (biru)
   - Background: `#1a1a1a` (hitam)

2. **Ubah Header Text**:
   - Edit `<h1>` dan subtitle di `index.html`

3. **Tambah Field Data**:
   - Tambah input di HTML
   - Update app.js payload
   - Update Google Apps Script sheet.appendRow()

4. **Ubah Notifikasi Text**:
   - Edit string di `app.js` showNotification()

## 📋 Checklist Deploy

- [ ] Google Spreadsheet dibuat
- [ ] Google Apps Script di-setup
- [ ] Google Apps Script di-deploy
- [ ] URL Google Apps Script di-copy ke app.js
- [ ] index.html bisa diakses
- [ ] Kamera testing works
- [ ] Data tersimpan ke Spreadsheet
- [ ] Notifikasi muncul dengan benar

---

**Siap untuk production? Cek README.md untuk info lebih lanjut!** 🚀
