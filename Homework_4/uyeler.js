// Üye Yönetimi JavaScript

let members = JSON.parse(localStorage.getItem('members')) || [];
let editingMemberId = null;
let deletingMemberId = null;
let changingStatusMemberId = null;

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    displayMembers();
    
    // Form submit
    document.getElementById('memberForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveMember();
    });
    
    // İptal butonu
    document.getElementById('cancelBtn').addEventListener('click', function() {
        resetForm();
    });
});

// Üyeleri listele
function displayMembers(filteredMembers = null) {
    const tbody = document.getElementById('memberTableBody');
    const emptyState = document.getElementById('emptyState');
    const table = document.getElementById('memberTable');
    
    const membersToDisplay = filteredMembers || members;
    
    if (membersToDisplay.length === 0) {
        table.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    table.style.display = 'table';
    emptyState.style.display = 'none';
    
    tbody.innerHTML = '';
    
    membersToDisplay.forEach(member => {
        const tr = document.createElement('tr');
        
        // Durum badge'i
        let statusBadge = '';
        if (member.durum === 'Aktif') {
            statusBadge = '<span class="badge badge-success">Aktif</span>';
        } else if (member.durum === 'Pasif') {
            statusBadge = '<span class="badge badge-warning">Pasif</span>';
        } else if (member.durum === 'Engellenmiş') {
            statusBadge = '<span class="badge badge-danger">Engellenmiş</span>';
        }
        
        // Kayıt tarihini formatla
        const createdDate = member.createdAt ? new Date(member.createdAt).toLocaleDateString('tr-TR') : '-';
        
        tr.innerHTML = `
            <td><strong>${escapeHtml(member.name)} ${escapeHtml(member.surname)}</strong></td>
            <td>${escapeHtml(member.email)}</td>
            <td>${escapeHtml(member.phone || '-')}</td>
            <td>${escapeHtml(member.type)}</td>
            <td>${statusBadge}</td>
            <td>${createdDate}</td>
            <td class="actions">
                <button class="btn btn-warning btn-sm" onclick="editMember('${member.id}')" title="Düzenle">
                    ✏️
                </button>
                <button class="btn btn-primary btn-sm" onclick="changeStatus('${member.id}')" title="Durum Değiştir">
                    🔄
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteMember('${member.id}')" title="Sil">
                    🗑️
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Üyeleri filtrele
function filterMembers() {
    const statusFilter = document.getElementById('filterStatus').value;
    const typeFilter = document.getElementById('filterType').value;
    const searchText = document.getElementById('searchMember').value.toLowerCase();
    
    let filtered = members;
    
    // Duruma göre filtrele
    if (statusFilter) {
        filtered = filtered.filter(m => m.durum === statusFilter);
    }
    
    // Üyelik tipine göre filtrele
    if (typeFilter) {
        filtered = filtered.filter(m => m.type === typeFilter);
    }
    
    // Arama
    if (searchText) {
        filtered = filtered.filter(m => 
            m.name.toLowerCase().includes(searchText) ||
            m.surname.toLowerCase().includes(searchText) ||
            m.email.toLowerCase().includes(searchText)
        );
    }
    
    displayMembers(filtered);
}

// Üye kaydet (Ekle veya Güncelle)
function saveMember() {
    const name = document.getElementById('memberName').value.trim();
    const surname = document.getElementById('memberSurname').value.trim();
    const email = document.getElementById('memberEmail').value.trim();
    const phone = document.getElementById('memberPhone').value.trim();
    const address = document.getElementById('memberAddress').value.trim();
    const birthDate = document.getElementById('memberBirthDate').value;
    const gender = document.getElementById('memberGender').value;
    const type = document.getElementById('memberType').value;
    const durum = document.getElementById('memberStatus').value;
    const notes = document.getElementById('memberNotes').value.trim();
    
    if (!name || !surname || !email || !durum) {
        showAlert('Lütfen zorunlu alanları doldurun!', 'danger');
        return;
    }
    
    // Email formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Geçerli bir e-posta adresi girin!', 'danger');
        return;
    }
    
    if (editingMemberId) {
        // Güncelleme
        const memberIndex = members.findIndex(m => m.id === editingMemberId);
        if (memberIndex !== -1) {
            members[memberIndex] = {
                ...members[memberIndex],
                name,
                surname,
                email,
                phone,
                address,
                birthDate,
                gender,
                type,
                durum,
                notes,
                updatedAt: new Date().toISOString()
            };
            showAlert('Üye başarıyla güncellendi!', 'success');
        }
    } else {
        // Email kontrolü (yeni üye eklerken)
        const emailExists = members.some(m => m.email.toLowerCase() === email.toLowerCase());
        if (emailExists) {
            showAlert('Bu e-posta adresi zaten kayıtlı!', 'danger');
            return;
        }
        
        // Yeni ekleme
        const newMember = {
            id: generateId(),
            name,
            surname,
            email,
            phone,
            address,
            birthDate,
            gender,
            type,
            durum,
            notes,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        members.push(newMember);
        showAlert('Üye başarıyla eklendi!', 'success');
    }
    
    localStorage.setItem('members', JSON.stringify(members));
    displayMembers();
    resetForm();
    
    // Filtreleri sıfırla
    document.getElementById('filterStatus').value = '';
    document.getElementById('filterType').value = '';
    document.getElementById('searchMember').value = '';
}

// Üye düzenle
function editMember(id) {
    const member = members.find(m => m.id === id);
    if (!member) return;
    
    editingMemberId = id;
    
    document.getElementById('memberId').value = member.id;
    document.getElementById('memberName').value = member.name;
    document.getElementById('memberSurname').value = member.surname;
    document.getElementById('memberEmail').value = member.email;
    document.getElementById('memberPhone').value = member.phone || '';
    document.getElementById('memberAddress').value = member.address || '';
    document.getElementById('memberBirthDate').value = member.birthDate || '';
    document.getElementById('memberGender').value = member.gender || '';
    document.getElementById('memberType').value = member.type || 'Standart';
    document.getElementById('memberStatus').value = member.durum;
    document.getElementById('memberNotes').value = member.notes || '';
    
    document.getElementById('formTitle').textContent = '✏️ Üye Düzenle';
    document.getElementById('submitBtn').textContent = '✓ Güncelle';
    document.getElementById('cancelBtn').style.display = 'inline-block';
    
    // Formu görünür yap
    document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
}

// Üye durumunu değiştir
function changeStatus(id) {
    const member = members.find(m => m.id === id);
    if (!member) return;
    
    changingStatusMemberId = id;
    document.getElementById('statusMemberName').textContent = `${member.name} ${member.surname}`;
    document.getElementById('newStatus').value = member.durum;
    document.getElementById('statusModal').classList.add('active');
}

// Durum değişikliğini onayla
function confirmStatusChange() {
    if (!changingStatusMemberId) return;
    
    const newStatus = document.getElementById('newStatus').value;
    const memberIndex = members.findIndex(m => m.id === changingStatusMemberId);
    
    if (memberIndex !== -1) {
        members[memberIndex].durum = newStatus;
        members[memberIndex].updatedAt = new Date().toISOString();
        localStorage.setItem('members', JSON.stringify(members));
        
        showAlert('Üye durumu başarıyla güncellendi!', 'success');
        displayMembers();
        closeStatusModal();
    }
}

// Durum modal kapat
function closeStatusModal() {
    document.getElementById('statusModal').classList.remove('active');
    changingStatusMemberId = null;
}

// Üye sil
function deleteMember(id) {
    const member = members.find(m => m.id === id);
    if (!member) return;
    
    deletingMemberId = id;
    document.getElementById('deleteMemberName').textContent = `${member.name} ${member.surname}`;
    document.getElementById('deleteModal').classList.add('active');
}

// Silme onayı
function confirmDelete() {
    if (!deletingMemberId) return;
    
    members = members.filter(m => m.id !== deletingMemberId);
    localStorage.setItem('members', JSON.stringify(members));
    
    showAlert('Üye başarıyla silindi!', 'success');
    displayMembers();
    closeDeleteModal();
}

// Modal kapat
function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
    deletingMemberId = null;
}

// Formu sıfırla
function resetForm() {
    document.getElementById('memberForm').reset();
    document.getElementById('memberId').value = '';
    document.getElementById('memberType').value = 'Standart';
    document.getElementById('memberStatus').value = 'Aktif';
    editingMemberId = null;
    
    document.getElementById('formTitle').textContent = '👤 Yeni Üye Ekle';
    document.getElementById('submitBtn').textContent = '✓ Kaydet';
    document.getElementById('cancelBtn').style.display = 'none';
}

// Uyarı göster
function showAlert(message, type) {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type} show`;
    
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000);
}

// HTML escape
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ID oluştur
function generateId() {
    return 'member_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

