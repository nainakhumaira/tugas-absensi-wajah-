# 🚀 Quick Setup Guide - Absensi Wajah

Setup website absensi wajah Anda dalam 5 menit!

## Step 1: Buat Google Spreadsheet
- Buka [Google Drive](https://drive.google.com)
- Klik **+ Create** > **Google Sheets**
- Beri nama: **Data Absensi Wajah**
- Buat kolom header: `Nama | Tanggal | Jam | Foto`

## Step 2: Buat Google Apps Script
1. Di Spreadsheet, klik **Extensions** > **Apps Script**
2. Hapus semua kode default
3. Copy kode dari file `google-apps-script.gs` (folder ini)
4. Paste di editor Google Apps Script
5. Klik **Save**

## Step 3: Deploy Google Apps Script
1. Klik tombol **Deploy** (kanan atas)
2. Pilih **New Deployment**
3. Type: **Web app**
4. Execute as: **[Email Anda]**
5. Who has access: **Anyone**
6. Klik **Deploy**
7. **COPY URL** yang muncul (penting!)

## Step 4: Update File app.js
1. Buka file `app.js` di folder ini
2. Cari baris 24: `const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
3. Ganti dengan URL dari Step 3
4. **Save** file

## Step 5: Jalankan Website
**Pilih salah satu:**

### Option A: Direct File
1. Buka file `index.html` dengan double-click
2. Browser akan membuka website

### Option B: Local Server
```bash
# Jika punya Python
cd /path/to/tugas-absensi-wajah-
python -m http.server 8000

# Akses di: http://localhost:8000
```

### Option C: VS Code Live Server
1. Install extension "Live Server"
2. Klik kanan `index.html`
3. Pilih "Open with Live Server"

## Testing
1. Masukkan nama di form
2. Klik "Aktifkan Kamera"
3. Izinkan akses kamera
4. Ambil foto
5. Klik "Absen Masuk"
6. Cek Google Spreadsheet - data harus tersimpan!

## 🔧 Jika Ada Error

### "Kamera tidak muncul"
- Gunakan HTTPS atau localhost
- Refresh halaman (F5)
- Check izin kamera di browser settings

### "Data tidak tersimpan"
- Verifikasi URL Google Apps Script di app.js
- Cek Google Apps Script sudah di-Deploy
- Buka browser console (F12) lihat error

### "403 Error" atau "Access Denied"
- Di Google Apps Script, cek "Who has access" = "Anyone"
- Undeploy dan deploy ulang dengan setting benar

## 📞 Butuh Help?
Check file `README.md` untuk dokumentasi lengkap.

---

**Selamat! Sistem absensi wajah Anda sudah siap digunakan! 🎉**
