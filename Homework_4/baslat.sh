#!/bin/bash

# Kütüphane Yönetim Sistemi - Başlatma Scripti

clear

echo "===================================================================="
echo "   📚 KÜTÜPHANE YÖNETİM SİSTEMİ - SERVER BAŞLATICI"
echo "===================================================================="
echo ""
echo "Lütfen çalıştırma yöntemini seçin:"
echo ""
echo "1) Python HTTP Server (Önerilen)"
echo "2) Python server.py scripti"
echo "3) PHP Built-in Server"
echo "4) Dosyayı tarayıcıda aç"
echo "5) Çıkış"
echo ""
read -p "Seçiminiz (1-5): " choice

case $choice in
    1)
        echo ""
        echo "Python HTTP Server başlatılıyor..."
        echo "URL: http://localhost:8000"
        echo ""
        echo "Durdurmak için Ctrl+C"
        echo ""
        python3 -m http.server 8000
        ;;
    2)
        echo ""
        echo "Python server.py çalıştırılıyor..."
        echo ""
        python3 server.py
        ;;
    3)
        if command -v php &> /dev/null; then
            echo ""
            echo "PHP Built-in Server başlatılıyor..."
            echo "URL: http://localhost:8000"
            echo ""
            echo "Durdurmak için Ctrl+C"
            echo ""
            php -S localhost:8000
        else
            echo ""
            echo "❌ PHP kurulu değil!"
            echo "Python seçeneğini kullanın veya PHP kurun."
            echo ""
        fi
        ;;
    4)
        echo ""
        echo "index.html dosyası tarayıcıda açılıyor..."
        echo ""
        if command -v xdg-open &> /dev/null; then
            xdg-open index.html
        elif command -v open &> /dev/null; then
            open index.html
        else
            echo "⚠️  Otomatik açılamadı. Lütfen index.html dosyasını manuel olarak açın."
        fi
        echo "✅ İşlem tamamlandı."
        echo ""
        ;;
    5)
        echo ""
        echo "Çıkılıyor..."
        echo ""
        exit 0
        ;;
    *)
        echo ""
        echo "❌ Geçersiz seçim!"
        echo ""
        ;;
esac

