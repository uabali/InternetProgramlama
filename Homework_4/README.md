# Kütüphane Yönetim Sistemi

Internet Programlama Dersi - Homework 4

## 📋 Proje Açıklaması

Bu proje, kütüphane yönetimi için geliştirilmiş bir web uygulamasıdır. Kitap ve üye yönetimi için CRUD (Create, Read, Update, Delete) işlemlerini destekler.

## ✨ Özellikler

### 📚 Kitap Yönetimi
- ✅ Yeni kitap ekleme
- ✅ Kitap bilgilerini güncelleme
- ✅ Kitap silme
- ✅ Kitap listeleme
- Kitap özellikleri:
  - Kitap adı
  - Yazar
  - ISBN
  - Yayınevi
  - Yayın yılı
  - Sayfa sayısı
  - Kategori
  - Açıklama

### 👥 Üye Yönetimi
- ✅ Yeni üye ekleme
- ✅ Üye bilgilerini güncelleme
- ✅ Üye silme
- ✅ Üye listeleme
- ✅ Üye durumu yönetimi (Aktif/Pasif/Engellenmiş)
- ✅ Üyelik tipi (Standart/Öğrenci/Akademisyen/Premium)
- ✅ Filtreleme ve arama özellikleri
- Üye özellikleri:
  - Ad ve soyad
  - E-posta
  - Telefon
  - Adres
  - Doğum tarihi
  - Cinsiyet
  - Üyelik tipi
  - Durum (Aktif/Pasif/Engellenmiş)
  - Notlar

## 🛠️ Teknolojiler

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Veri Saklama**: LocalStorage (Browser-based)
- **Stil**: Modern, responsive CSS
- **Dil Bağımsız**: Sunucu tarafı kurulum gerektirmez

## 🚀 Kurulum ve Çalıştırma

### Yöntem 1: Python HTTP Server (Önerilen)

```bash
# Proje dizinine gidin
cd Homework_4

# Python 3 ile HTTP server başlatın
python3 -m http.server 8000

# Tarayıcınızda açın
# http://localhost:8000
```

### Yöntem 2: PHP Built-in Server

```bash
# Proje dizinine gidin
cd Homework_4

# PHP built-in server başlatın
php -S localhost:8000

# Tarayıcınızda açın
# http://localhost:8000
```

### Yöntem 3: Node.js HTTP Server

```bash
# http-server kurulumu (global)
npm install -g http-server

# Proje dizinine gidin
cd Homework_4

# Server başlatın
http-server -p 8000

# Tarayıcınızda açın
# http://localhost:8000
```

### Yöntem 4: Direkt HTML Dosyası

Tarayıcınızda `index.html` dosyasını doğrudan açabilirsiniz (ancak bazı tarayıcılarda LocalStorage kısıtlamaları olabilir).

## 📁 Proje Yapısı

```
Homework_4/
│
├── index.html          # Ana sayfa
├── kitaplar.html       # Kitap yönetimi sayfası
├── uyeler.html         # Üye yönetimi sayfası
│
├── styles.css          # Genel stil dosyası
│
├── app.js              # Genel JavaScript fonksiyonları
├── kitaplar.js         # Kitap yönetimi JavaScript
├── uyeler.js           # Üye yönetimi JavaScript
│
├── server.py           # Python HTTP server scripti
└── README.md           # Proje dokümantasyonu
```

## 💡 Kullanım

### Ana Sayfa
- Sistem istatistiklerini gösterir
- Kitap ve üye yönetim sayfalarına hızlı erişim

### Kitap Yönetimi
1. **Kitap Ekle**: Formu doldurup "Kaydet" butonuna tıklayın
2. **Kitap Düzenle**: Listeden "Düzenle" butonuna tıklayın, bilgileri güncelleyin
3. **Kitap Sil**: Listeden "Sil" butonuna tıklayın, onaylayın

### Üye Yönetimi
1. **Üye Ekle**: Formu doldurup "Kaydet" butonuna tıklayın
2. **Üye Düzenle**: Listeden "✏️" butonuna tıklayın, bilgileri güncelleyin
3. **Durum Değiştir**: Listeden "🔄" butonuna tıklayın, yeni durumu seçin
4. **Üye Sil**: Listeden "🗑️" butonuna tıklayın, onaylayın
5. **Filtrele**: Durum, üyelik tipi veya arama kutusunu kullanarak filtreleyin

## 🎨 Özellikler

- ✅ Modern ve kullanıcı dostu arayüz
- ✅ Responsive tasarım (mobil uyumlu)
- ✅ Form validasyonu
- ✅ Anlık geri bildirim (alert mesajları)
- ✅ Onay modalları
- ✅ Durum badge'leri
- ✅ Filtreleme ve arama
- ✅ Demo veriler (ilk yüklemede otomatik)

## 🔧 Geliştirme

### Veri Yapısı

**Kitap Modeli:**
```javascript
{
    id: string,
    title: string,
    author: string,
    isbn: string,
    publisher: string,
    year: number,
    pages: number,
    category: string,
    description: string,
    createdAt: ISO string,
    updatedAt: ISO string
}
```

**Üye Modeli:**
```javascript
{
    id: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    address: string,
    birthDate: string,
    gender: string,
    type: string,
    durum: string,
    notes: string,
    createdAt: ISO string,
    updatedAt: ISO string
}
```

### Console Komutları

Tarayıcı konsolunda kullanabileceğiniz yardımcı komutlar:

```javascript
clearAllData()    // Tüm verileri temizle
createDemoData()  // Demo verileri yeniden oluştur
```

## 📝 Notlar

- Veriler tarayıcının LocalStorage'ında saklanır
- Tarayıcı önbelleğini temizlerseniz veriler silinir
- Her tarayıcı için ayrı veri saklanır
- Gerçek bir veritabanı kullanılmamaktadır

## 🎓 Eğitim Amaçlı

Bu proje, Internet Programlama dersi kapsamında hazırlanmış eğitim amaçlı bir uygulamadır.

**Gereksinimler:**
- ✅ En az bir tabloda CRUD işlemleri
- ✅ Dil bağımsız çalışabilir
- ✅ Kitap ekle/sil/güncelle
- ✅ Üye ekle/sil/güncelle
- ✅ Üye durumu yönetimi (Aktif/Pasif/Engellenmiş)

## 👨‍💻 Geliştirici

Homework 4 - Internet Programlama Dersi

---

**Lisans**: Eğitim Amaçlı

