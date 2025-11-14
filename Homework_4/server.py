#!/usr/bin/env python3
"""
Kütüphane Yönetim Sistemi - HTTP Server
Basit bir HTTP server başlatır
"""

import http.server
import socketserver
import os
import sys

# Port numarası
PORT = 8000

# Dizin değiştir
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # CORS için header ekle
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Konsol çıktısını renklendir
        sys.stdout.write("\033[92m[%s] %s\033[0m\n" % (self.log_date_time_string(), format % args))

try:
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print("\n" + "="*60)
        print("📚 Kütüphane Yönetim Sistemi - HTTP Server")
        print("="*60)
        print(f"\n✅ Server başlatıldı!")
        print(f"🌐 URL: http://localhost:{PORT}")
        print(f"📁 Dizin: {os.getcwd()}")
        print(f"\n💡 Durdurmak için: Ctrl+C\n")
        print("="*60 + "\n")
        
        httpd.serve_forever()
        
except KeyboardInterrupt:
    print("\n\n" + "="*60)
    print("🛑 Server durduruldu.")
    print("="*60 + "\n")
    sys.exit(0)
    
except OSError as e:
    if e.errno == 98:
        print(f"\n❌ HATA: Port {PORT} zaten kullanımda!")
        print(f"💡 Başka bir port deneyin veya mevcut işlemi durdurun.\n")
    else:
        print(f"\n❌ HATA: {e}\n")
    sys.exit(1)

