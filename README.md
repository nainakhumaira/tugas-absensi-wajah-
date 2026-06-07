# 📸 Sistem Absensi Wajah Modern

Website absensi wajah modern dengan teknologi pengenalan wajah yang terintegrasi dengan Google Spreadsheet.

## 🌟 Fitur Utama

- ✅ **Input Nama Mahasiswa** - Form input yang user-friendly
- 🎥 **Kontrol Kamera** - Tombol aktifkan/matikan kamera real-time
- 📷 **Preview Kamera** - Tampilkan feed kamera secara live
- 📸 **Ambil Foto** - Tombol untuk menangkap foto wajah
- ✨ **Preview Foto** - Lihat foto sebelum dikirim
- 💾 **Simpan ke Google Sheets** - Data otomatis tersimpan
- 📊 **Integrasi Google Apps Script** - Penyimpanan data yang handal
- 🔔 **Notifikasi Real-time** - Feedback untuk setiap aksi
- 🎨 **Desain Modern** - Theme hitam klasik dengan UI elegan
- 📱 **Responsive** - Optimal di HP, tablet, dan laptop

## 📋 Data yang Disimpan

| Field | Deskripsi |
|-------|-----------|
| **Nama** | Nama mahasiswa |
| **Tanggal** | Tanggal absensi (format DD/MM/YYYY) |
| **Jam** | Waktu absensi (format HH:MM:SS) |
| **Foto** | Foto wajah dalam format base64 |

## 🚀 Cara Setup

### 1️⃣ Siapkan Google Spreadsheet

1. Buka [Google Drive](https://drive.google.com)
2. Buat **Spreadsheet baru**
3. Beri nama: `Data Absensi Wajah`
4. Buat header kolom di baris pertama:
   ```
   Nama | Tanggal | Jam | Foto
   ```

### 2️⃣ Buat Google Apps Script

1. Di Spreadsheet yang sudah dibuat, klik **Extensions** > **Apps Script**
2. Hapus kode default yang ada
3. Copy-paste kode berikut:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheets()[0];
    
    // Append data ke sheet
    sheet.appendRow([
      data.nama,
      data.tanggal,
      data.jam,
      data.foto
    ]);
    
    // Simpan spreadsheet
    SpreadsheetApp.flush();
    
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 3️⃣ Deploy Google Apps Script

1. Klik tombol **Deploy** (warna biru di kanan atas)
2. Pilih **New Deployment**
3. Pilih type: **Web app**
4. Konfigurasi:
   - Execute as: Pilih email Google Anda
   - Who has access: **Anyone**
5. Klik **Deploy**
6. Copy **Deployment URL** yang muncul (format: `https://script.google.com/macros/d/...`)

### 4️⃣ Perbarui URL di Aplikasi

1. Buka file `app.js`
2. Cari baris:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Ganti dengan URL dari langkah sebelumnya:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercallable';
   ```

### 5️⃣ Jalankan Website

1. Buka file `index.html` di browser
2. Atau gunakan live server: `python -m http.server 8000`
3. Akses di `http://localhost:8000`

## 📖 Panduan Penggunaan

### Langkah-Langkah Absensi:

1. **Masukkan Nama**
   - Ketik nama lengkap di field "Nama Mahasiswa"
   - Pastikan nama yang dimasukkan benar

2. **Aktifkan Kamera**
   - Klik tombol "🎥 Aktifkan Kamera"
   - Berikan izin akses kamera saat diminta
   - Tunggu preview kamera muncul

3. **Posisikan Wajah**
   - Pastikan wajah berada di tengah frame
   - Cahaya harus cukup untuk hasil foto yang baik
   - Wajah harus terlihat jelas dan berhadapan ke kamera

4. **Ambil Foto**
   - Klik tombol "📸 Ambil Foto"
   - Foto akan tertangkap dan ditampilkan di bagian preview

5. **Verifikasi & Absen**
   - Jika foto baik, klik "✅ Absen Masuk"
   - Jika ingin ulang, klik "🔄 Ambil Ulang"

6. **Notifikasi Berhasil**
   - Sistem akan menampilkan "✅ Absensi Berhasil!"
   - Data secara otomatis tersimpan ke Google Spreadsheet
   - Kamera akan otomatis reset untuk absensi berikutnya

## 🎨 Fitur Desain

- **Tema Modern**: Warna hitam classic dengan aksen biru
- **Responsive Design**: Optimal di semua ukuran layar
- **Smooth Animations**: Transisi dan animasi yang halus
- **User-Friendly**: Interface intuitif dan mudah digunakan
- **Notifikasi Real-time**: Feedback visual untuk setiap aksi

## 🔧 Teknologi yang Digunakan

- **HTML5** - Struktur markup semantik
- **CSS3** - Styling modern dengan gradient dan flexbox
- **JavaScript Vanilla** - Tanpa library/framework eksternal
- **WebRTC API** - Akses kamera real-time
- **Canvas API** - Pengambilan dan konversi foto
- **Google Apps Script** - Backend untuk penyimpanan data
- **Google Sheets API** - Database penyimpanan

## 📱 Kompatibilitas Browser

| Browser | Dukungan |
|---------|----------|
| Chrome/Edge | ✅ Sempurna |
| Firefox | ✅ Sempurna |
| Safari | ✅ Sempurna |
| Opera | ✅ Sempurna |
| Mobile Browser | ✅ Responsive |

## ⚠️ Catatan Penting

1. **HTTPS**: Akses kamera hanya bekerja di HTTPS (atau localhost)
2. **Izin Kamera**: User harus memberikan izin akses kamera
3. **Koneksi Internet**: Diperlukan untuk mengirim data ke Google Sheets
4. **Ukuran Foto**: Foto disimpan dalam format base64, bisa besar
5. **Browser Kompatibel**: Gunakan browser modern yang support WebRTC

## 🐛 Troubleshooting

### Kamera Tidak Muncul
- Pastikan browser telah diberi izin akses kamera
- Coba refresh halaman
- Cek apakah HTTPS digunakan (atau localhost)

### Data Tidak Tersimpan
- Verifikasi URL Google Apps Script sudah benar
- Pastikan Google Apps Script sudah di-deploy
- Check koneksi internet Anda
- Buka browser console (F12) untuk melihat error detail

### Foto Blur atau Gelap
- Pastikan pencahayaan cukup
- Bersihkan lensa kamera
- Posisikan wajah lebih dekat ke kamera

## 📁 Struktur File

```
tugas-absensi-wajah-/
├── index.html      # Struktur HTML
├── style.css       # Styling CSS
├── app.js          # Logic JavaScript
└── README.md       # Dokumentasi
```

## 📞 Support

Jika ada masalah:
1. Check browser console (F12)
2. Verifikasi Google Apps Script URL
3. Pastikan Google Sheets bisa diakses
4. Reset izin kamera di browser settings

## 📄 Lisensi

Proyek ini dapat digunakan secara bebas untuk keperluan akademis dan non-komersial.

---

**Dibuat dengan ❤️ untuk kebutuhan absensi modern**
