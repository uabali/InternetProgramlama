-- Veritabanı oluşturma
CREATE DATABASE IF NOT EXISTS imu_db CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci;

USE imu_db;

-- Kullanıcılar tablosu
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kulad VARCHAR(50) NOT NULL UNIQUE,
    sifre VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'uye') NOT NULL DEFAULT 'uye',
    ad_soyad VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    kayit_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- Örnek kullanıcılar ekleme
-- Şifreler: admin123 ve uye123 (MD5 hash'li)
INSERT INTO users (kulad, sifre, rol, ad_soyad, email) VALUES
('admin', MD5('admin123'), 'admin', 'Yönetici Admin', 'admin@imu.edu.tr'),
('umut', MD5('uye123'), 'uye', 'Umut Abalı', 'umut@imu.edu.tr'),
('mehmet', MD5('uye123'), 'uye', 'Mehmet Yılmaz', 'mehmet@imu.edu.tr');
