// Genel JavaScript fonksiyonları

// LocalStorage için yardımcı fonksiyonlar
const Storage = {
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Storage get error:', e);
            return null;
        }
    },
    
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage set error:', e);
            return false;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage remove error:', e);
            return false;
        }
    },
    
    clear: function() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Storage clear error:', e);
            return false;
        }
    }
};

// Tarih formatlama
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Zaman damgası ile tarih formatlama
function formatDateTime(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Demo veri oluştur
function createDemoData() {
    // Kitap demo verisi
    const demoBooks = [
        {
            id: 'book_demo_1',
            title: 'Suç ve Ceza',
            author: 'Fyodor Dostoyevski',
            isbn: '978-975-07-0001-1',
            publisher: 'İş Bankası Kültür Yayınları',
            year: 1866,
            pages: 671,
            category: 'Roman',
            description: 'Dostoyevski\'nin en önemli eserlerinden biri.',
            createdAt: new Date('2024-01-15').toISOString(),
            updatedAt: new Date('2024-01-15').toISOString()
        },
        {
            id: 'book_demo_2',
            title: 'Tutunamayanlar',
            author: 'Oğuz Atay',
            isbn: '978-975-342-267-4',
            publisher: 'İletişim Yayınları',
            year: 1972,
            pages: 724,
            category: 'Roman',
            description: 'Türk edebiyatının önemli eserlerinden.',
            createdAt: new Date('2024-01-20').toISOString(),
            updatedAt: new Date('2024-01-20').toISOString()
        },
        {
            id: 'book_demo_3',
            title: 'Saatleri Ayarlama Enstitüsü',
            author: 'Ahmet Hamdi Tanpınar',
            isbn: '978-975-470-155-7',
            publisher: 'Dergah Yayınları',
            year: 1961,
            pages: 416,
            category: 'Roman',
            description: 'Modernleşme ve gelenek çatışmasını anlatan satirik roman.',
            createdAt: new Date('2024-02-01').toISOString(),
            updatedAt: new Date('2024-02-01').toISOString()
        }
    ];
    
    // Üye demo verisi
    const demoMembers = [
        {
            id: 'member_demo_1',
            name: 'Ahmet',
            surname: 'Yılmaz',
            email: 'ahmet.yilmaz@example.com',
            phone: '0532 111 22 33',
            address: 'İstanbul, Türkiye',
            birthDate: '1990-05-15',
            gender: 'Erkek',
            type: 'Standart',
            durum: 'Aktif',
            notes: 'Düzenli okuyucu',
            createdAt: new Date('2024-01-10').toISOString(),
            updatedAt: new Date('2024-01-10').toISOString()
        },
        {
            id: 'member_demo_2',
            name: 'Ayşe',
            surname: 'Demir',
            email: 'ayse.demir@example.com',
            phone: '0533 222 33 44',
            address: 'Ankara, Türkiye',
            birthDate: '1995-08-22',
            gender: 'Kadın',
            type: 'Öğrenci',
            durum: 'Aktif',
            notes: 'Üniversite öğrencisi',
            createdAt: new Date('2024-01-12').toISOString(),
            updatedAt: new Date('2024-01-12').toISOString()
        },
        {
            id: 'member_demo_3',
            name: 'Mehmet',
            surname: 'Kaya',
            email: 'mehmet.kaya@example.com',
            phone: '0534 333 44 55',
            address: 'İzmir, Türkiye',
            birthDate: '1985-03-10',
            gender: 'Erkek',
            type: 'Premium',
            durum: 'Aktif',
            notes: 'Premium üye',
            createdAt: new Date('2024-01-14').toISOString(),
            updatedAt: new Date('2024-01-14').toISOString()
        },
        {
            id: 'member_demo_4',
            name: 'Zeynep',
            surname: 'Çelik',
            email: 'zeynep.celik@example.com',
            phone: '0535 444 55 66',
            address: 'Bursa, Türkiye',
            birthDate: '1992-11-28',
            gender: 'Kadın',
            type: 'Standart',
            durum: 'Pasif',
            notes: 'Geçici olarak pasif',
            createdAt: new Date('2024-01-16').toISOString(),
            updatedAt: new Date('2024-01-16').toISOString()
        }
    ];
    
    // Mevcut veri yoksa demo verileri ekle
    const existingBooks = Storage.get('books');
    if (!existingBooks || existingBooks.length === 0) {
        Storage.set('books', demoBooks);
        console.log('Demo kitap verileri eklendi.');
    }
    
    const existingMembers = Storage.get('members');
    if (!existingMembers || existingMembers.length === 0) {
        Storage.set('members', demoMembers);
        console.log('Demo üye verileri eklendi.');
    }
}

// Sayfa yüklendiğinde demo verileri oluştur
document.addEventListener('DOMContentLoaded', function() {
    // Demo verileri sadece ilk yüklemede oluştur
    createDemoData();
});

// Tüm verileri temizle (geliştirme için)
function clearAllData() {
    if (confirm('Tüm veriler silinecek. Emin misiniz?')) {
        Storage.clear();
        alert('Tüm veriler silindi. Sayfa yenilenecek.');
        location.reload();
    }
}

// Konsol için yardımcı komutlar
console.log('%c📚 Kütüphane Yönetim Sistemi', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cYardımcı Komutlar:', 'color: #48bb78; font-size: 14px; font-weight: bold;');
console.log('clearAllData() - Tüm verileri temizle');
console.log('createDemoData() - Demo verileri yeniden oluştur');

