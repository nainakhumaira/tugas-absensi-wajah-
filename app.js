// ========================================
// DOM Elements
// ========================================
const studentNameInput = document.getElementById('studentName');
const studentClassInput = document.getElementById('studentClass');
const lecturerInput = document.getElementById('lecturerName');
const subjectInput = document.getElementById('subjectName');
const attendanceStatusSelect = document.getElementById('attendanceStatus');
const toggleCameraBtn = document.getElementById('toggleCameraBtn');
const captureBtn = document.getElementById('captureBtn');
const retakeBtn = document.getElementById('retakeBtn');
const submitBtn = document.getElementById('submitBtn');
const printBtn = document.getElementById('printBtn');
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

let stream = null;
let isCameraActive = false;
let capturedPhotoData = null;

const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

async function toggleCamera() {
    if (isCameraActive) {
        stopCamera();
    } else {
        await startCamera();
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
        cameraFeed.play();
        cameraFeed.classList.add('active');
        placeholderImage.classList.add('hidden');

        toggleCameraBtn.textContent = '🛑 Matikan Kamera';
        captureBtn.disabled = false;
        isCameraActive = true;

        showNotification('Kamera berhasil diaktifkan. Silakan verifikasi wajah.', 'success');
    } catch (error) {
        console.error('Error accessing camera:', error);
        showNotification('Gagal mengakses kamera. Pastikan Anda memberikan izin dan gunakan browser yang mendukung.', 'error');
    }
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }

    cameraFeed.classList.remove('active');
    placeholderImage.classList.remove('hidden');

    toggleCameraBtn.textContent = '🎥 Aktifkan Kamera';
    captureBtn.disabled = true;
    isCameraActive = false;

    showNotification('Kamera dimatikan.', 'info');
}

function capturePhoto() {
    if (!isCameraActive || !stream) {
        showNotification('Aktifkan kamera terlebih dahulu untuk verifikasi wajah.', 'error');
        return;
    }

    photoCanvas.width = cameraFeed.videoWidth;
    photoCanvas.height = cameraFeed.videoHeight;

    const context = photoCanvas.getContext('2d');
    context.setTransform(-1, 0, 0, 1, photoCanvas.width, 0);
    context.drawImage(cameraFeed, 0, 0, photoCanvas.width, photoCanvas.height);

    capturedPhotoData = photoCanvas.toDataURL('image/jpeg', 0.85);
    photoPreview.src = capturedPhotoData;
    photoPreviewSection.classList.remove('hidden');
    statusSection.classList.add('hidden');

    cameraFeed.classList.remove('active');
    placeholderImage.classList.remove('hidden');

    showNotification('Foto berhasil diambil. Anda dapat melanjutkan ke absensi.', 'success');
}

function retakePhoto() {
    capturedPhotoData = null;
    photoPreviewSection.classList.add('hidden');
    statusSection.classList.add('hidden');
    printBtn.classList.add('hidden');

    if (isCameraActive && stream) {
        cameraFeed.classList.add('active');
        placeholderImage.classList.add('hidden');
    } else {
        toggleCameraBtn.textContent = '🎥 Aktifkan Kamera';
        captureBtn.disabled = true;
        placeholderImage.classList.remove('hidden');
    }

    showNotification('Siap untuk mengambil foto ulang.', 'info');
}

async function submitAttendance() {
    const studentName = studentNameInput.value.trim();
    const studentClass = studentClassInput.value.trim();
    const lecturerName = lecturerInput.value.trim();
    const subjectName = subjectInput.value.trim();
    const attendanceStatus = attendanceStatusSelect.value;

    if (!studentName || !studentClass || !lecturerName || !subjectName || !attendanceStatus) {
        showNotification('Lengkapi semua field kehadiran sebelum submit.', 'error');
        return;
    }

    if (!capturedPhotoData) {
        showNotification('Ambil foto verifikasi wajah terlebih dahulu.', 'error');
        return;
    }

    loadingSpinner.classList.remove('hidden');
    loadingSpinner.classList.add('visible');

    try {
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
            kelas: studentClass,
            dosen: lecturerName,
            mataKuliah: subjectName,
            status: attendanceStatus,
            tanggal: date,
            jam: time,
            foto: capturedPhotoData
        };

        await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        loadingSpinner.classList.remove('visible');
        loadingSpinner.classList.add('hidden');
        showSuccessStatus(payload);
        resetFormFields();
    } catch (error) {
        console.error('Error submitting attendance:', error);
        loadingSpinner.classList.remove('visible');
        loadingSpinner.classList.add('hidden');
        showNotification('Gagal menyimpan data. Periksa koneksi internet dan URL Apps Script.', 'error');
    }
}

function showSuccessStatus(data) {
    statusContent.innerHTML = `
        <div class="status-success">
            <span class="check-icon">✅</span>
            <h3>Absensi Berhasil</h3>
            <p><strong>Nama:</strong> ${data.nama}</p>
            <p><strong>Kelas:</strong> ${data.kelas}</p>
            <p><strong>Dosen Pengampu:</strong> ${data.dosen}</p>
            <p><strong>Mata Kuliah:</strong> ${data.mataKuliah}</p>
            <p><strong>Status Kehadiran:</strong> ${data.status}</p>
            <p><strong>Tanggal:</strong> ${data.tanggal}</p>
            <p><strong>Jam:</strong> ${data.jam}</p>
            <p style="margin-top: 16px; color: var(--text);">Data tersimpan di Google Spreadsheet dan siap dicetak.</p>
        </div>
    `;

    statusSection.classList.remove('hidden');
    statusSection.classList.add('visible');
    printBtn.classList.remove('hidden');
    showNotification('Absensi berhasil. Anda dapat mencetak bukti jika diperlukan.', 'success');
}

function showNotification(message, type = 'info') {
    notificationMessage.textContent = message;
    notification.classList.remove('hidden');

    const notificationContentEl = notification.querySelector('.notification-content');
    notificationContentEl.className = `notification-content ${type}`;

    clearTimeout(notification.hideTimeout);
    notification.hideTimeout = setTimeout(() => {
        notification.classList.add('hidden');
    }, 4200);
}

function resetFormFields() {
    setTimeout(() => {
        studentNameInput.value = '';
        studentClassInput.value = '';
        lecturerInput.value = '';
        subjectInput.value = '';
        attendanceStatusSelect.value = '';
        capturedPhotoData = null;
        photoPreviewSection.classList.add('hidden');
        printBtn.classList.add('hidden');
        statusSection.classList.remove('visible');
        statusSection.classList.add('hidden');
        if (isCameraActive && stream) {
            cameraFeed.classList.add('active');
            placeholderImage.classList.add('hidden');
        }
    }, 1400);
}

function printAttendance() {
    window.print();
}

toggleCameraBtn.addEventListener('click', toggleCamera);
captureBtn.addEventListener('click', capturePhoto);
retakeBtn.addEventListener('click', retakePhoto);
submitBtn.addEventListener('click', submitAttendance);
printBtn.addEventListener('click', printAttendance);

studentNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('Aplikasi Absensi Wajah siap digunakan');
    showNotification('Isi data lengkap dan aktifkan kamera untuk verifikasi.', 'info');
});

/*
Cara setup Google Apps Script tetap sama, tetapi tambahkan kolom tambahan berikut:
Nama | Kelas | Dosen Pengampu | Mata Kuliah | Status Kehadiran | Tanggal | Jam | Foto
*/
