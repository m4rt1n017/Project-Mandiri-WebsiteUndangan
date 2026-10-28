// Nama tamu bisa diisi lewat URL: index.html?to=Nama%20Tamu
    const params = new URLSearchParams(window.location.search);
    const guest = params.get('to');
    if (guest) {
      document.getElementById('guestName').textContent = guest.replace(/[<>]/g, '');
      document.getElementById('name').value = guest.replace(/[<>]/g, '');
    }

    // Tombol membuka sampul undangan
    document.getElementById('openInvitation').addEventListener('click', () => {
      document.getElementById('cover').classList.add('closed');
      document.body.style.overflow = 'auto';
      document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    });
    document.body.style.overflow = 'hidden';

    // Hitung mundur: 20 Desember 2026 pukul 08.00 WIB
    const weddingDate = new Date('2026-12-20T08:00:00+07:00').getTime();
    function updateCountdown() {
      const distance = weddingDate - Date.now();
      const safeDistance = Math.max(distance, 0);
      document.getElementById('days').textContent = String(Math.floor(safeDistance / 86400000)).padStart(2, '0');
      document.getElementById('hours').textContent = String(Math.floor((safeDistance % 86400000) / 3600000)).padStart(2, '0');
      document.getElementById('minutes').textContent = String(Math.floor((safeDistance % 3600000) / 60000)).padStart(2, '0');
      document.getElementById('seconds').textContent = String(Math.floor((safeDistance % 60000) / 1000)).padStart(2, '0');
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // RSVP membuka WhatsApp dengan pesan yang sudah disusun.
    const whatsappNumber = '6281234567890';
    document.getElementById('rsvpForm').addEventListener('submit', function (event) {
      event.preventDefault();
      const name = document.getElementById('name').value.trim();
      const attendance = document.getElementById('attendance').value;
      const guests = document.getElementById('guests').value;
      const message = document.getElementById('message').value.trim();
      const text = `Assalamu'alaikum, saya ${name}.%0A${attendance}.%0AJumlah tamu: ${guests}.%0AUcapan/doa: ${message || '-'}`
        .replace(/%0A/g, '\n');
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener');
    });
