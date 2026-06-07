// ========================================
// DOM Elements
// ========================================
const studentNameInput = document.getElementById('studentName');
const toggleCameraBtn = document.getElementById('toggleCameraBtn');
const captureBtn = document.getElementById('captureBtn');
const retakeBtn = document.getElementById('retakeBtn');
const submitBtn = document.getElementById('submitBtn');
const cameraFeed = document.getElementById('cameraFeed');
const photoCanvas = document.getElementById('photoCanvas');
const photoPreview = document.getElementById('photoPreview');
const placeholderImage = document.getElementById('placeholderImage');
const photoPreviewSection = document.getElementById('photoPreviewSection');
const statusSection = document.getElementById('statusSection');
const statusContent = document.getElementById('statusContent');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');
const loadingSpinner = document.getElementById('loadingSpinner');

// ========================================
// State Management
// ========================================
let stream = null;
let isCameraActive = false;
let capturedPhotoData = null;

// ===== GANTI DENGAN URL GOOGLE APPS SCRIPT ANDA =====
// Dokumentasi setup ada di akhir file
const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

// ========================================
// Camera Functions
// ========================================
async function toggleCamera() {
    if (isCameraActive) {
        stopCamera();
    } else {
        startCamera();
    }
}

async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'user',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            },
            audio: false
        });

        cameraFeed.srcObject = stream;
        cameraFeed.classList.add('active');
        placeholderImage.classList.add('hidden');

        toggleCameraBtn.textContent = '🛑 Matikan Kamera';
        captureBtn.disabled = false;
        isCameraActive = true;

        showNotification('Kamera berhasil diaktifkan', 'success');
    } catch (error) {
        console.error('Error accessing camera:', error);
        showNotification('Gagal mengakses kamera. Pastikan Anda telah memberikan izin.', 'error');
    }
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }

    cameraFeed.classList.remove('active');
    placeholderImage.classList.remove('hidden');

    toggleCameraBtn.textContent = '🎥 Aktifkan Kamera';
    captureBtn.disabled = true;
    isCameraActive = false;

    showNotification('Kamera dimatikan', 'success');
}

// ========================================
// Photo Capture Function
// ========================================
function capturePhoto() {
    if (!isCameraActive) {
        showNotification('Aktivkan kamera terlebih dahulu', 'error');
        return;
    }

    // Set canvas dimensions
    photoCanvas.width = cameraFeed.videoWidth;
    photoCanvas.height = cameraFeed.videoHeight;

    // Get canvas context and flip horizontally (mirror effect)
    const context = photoCanvas.getContext('2d');
    context.translate(photoCanvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(cameraFeed, 0, 0);

    // Get image data as base64
    capturedPhotoData = photoCanvas.toDataURL('image/jpeg', 0.8);

    // Display preview
    photoPreview.src = capturedPhotoData;
    photoPreviewSection.classList.remove('hidden');

    // Hide camera and show preview
    cameraFeed.classList.remove('active');
    placeholderImage.classList.add('hidden');

    showNotification('Foto berhasil diambil', 'success');
}

function retakePhoto() {
    photoPreviewSection.classList.add('hidden');
    capturedPhotoData = null;

    cameraFeed.classList.add('active');

    showNotification('Siap untuk mengambil foto ulang', 'success');
}

// ========================================
// Data Submission Function
// ========================================
async function submitAttendance() {
    const studentName = studentNameInput.value.trim();

    if (!studentName) {
        showNotification('Silakan masukkan nama terlebih dahulu', 'error');
        return;
    }

    if (!capturedPhotoData) {
        showNotification('Silakan ambil foto terlebih dahulu', 'error');
        return;
    }

    // Show loading spinner
    loadingSpinner.classList.remove('hidden');

    try {
        // Prepare data
        const now = new Date();
        const date = now.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        const time = now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const payload = {
            nama: studentName,
            tanggal: date,
            jam: time,
            foto: capturedPhotoData
        };

        // Send data to Google Apps Script
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        // Hide loading spinner
        loadingSpinner.classList.add('hidden');

        // Show success status
        showSuccessStatus(studentName, date, time);

        // Reset form
        resetForm();

    } catch (error) {
        console.error('Error submitting attendance:', error);
        loadingSpinner.classList.add('hidden');
        showNotification('Gagal mengirim data. Periksa koneksi internet Anda.', 'error');
    }
}

// ========================================
// UI Helper Functions
// ========================================
function showSuccessStatus(name, date, time) {
    statusContent.innerHTML = `
        <div class="status-success">
            <div class="check-icon">✅</div>
            <h3>Absensi Berhasil!</h3>
            <p><strong>Nama:</strong> ${name}</p>
            <p><strong>Tanggal:</strong> ${date}</p>
            <p><strong>Jam:</strong> ${time}</p>
            <p style="margin-top: 15px; color: #10b981;">Data telah disimpan ke Google Spreadsheet</p>
        </div>
    `;
    statusSection.classList.remove('hidden');

    showNotification('✅ Absensi berhasil disimpan!', 'success');
}

function showNotification(message, type = 'info') {
    notificationMessage.textContent = message;
    notification.classList.remove('hidden');
    notification.classList.remove('removing');

    const notificationContentEl = notification.querySelector('.notification-content');
    notificationContentEl.className = `notification-content ${type}`;

    // Auto remove notification after 4 seconds
    setTimeout(() => {
        notification.classList.add('removing');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 300);
    }, 4000);
}

function resetForm() {
    // Reset after 3 seconds
    setTimeout(() => {
        studentNameInput.value = '';
        photoPreviewSection.classList.add('hidden');
        statusSection.classList.add('hidden');
        capturedPhotoData = null;

        // Restart camera
        if (isCameraActive) {
            cameraFeed.classList.add('active');
        }
    }, 3000);
}

// ========================================
// Event Listeners
// ========================================
toggleCameraBtn.addEventListener('click', toggleCamera);
captureBtn.addEventListener('click', capturePhoto);
retakeBtn.addEventListener('click', retakePhoto);
submitBtn.addEventListener('click', submitAttendance);

// Enter key to submit
studentNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !isCameraActive) {
        toggleCamera();
    }
});

// ========================================
// Initialization
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Aplikasi Absensi Wajah siap digunakan');
    showNotification('Selamat datang! Silakan mulai dengan memasukkan nama Anda.', 'info');
});

// ========================================
// SETUP GOOGLE APPS SCRIPT
// ========================================
/*
LANGKAH-LANGKAH SETUP:

1. Buka Google Drive dan buat Google Spreadsheet baru
2. Beri nama spreadsheet: "Data Absensi Wajah"
3. Buat kolom di Sheet dengan nama: Nama | Tanggal | Jam | Foto

4. Buka Apps Script (Extensions > Apps Script)
5. Hapus kode default dan ganti dengan kode berikut:

------- COPY KODE INI KE GOOGLE APPS SCRIPT -------

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

------- SELESAI COPY -------

6. Deploy sebagai Web App:
   - Klik "Deploy" > "New Deployment"
   - Pilih type "Web app"
   - Execute as: Akun Anda
   - Who has access: "Anyone"
   - Klik Deploy dan copy URL

7. Ganti 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' di atas dengan URL yang di-copy

SELESAI! Aplikasi siap digunakan.
*/
