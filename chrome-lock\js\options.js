document.addEventListener('DOMContentLoaded', async () => {
    const data = await chrome.storage.sync.get(['mode']);
    
    const modeSelect = document.getElementById('passwordMode');
    modeSelect.value = data.mode || 'static';
    
    modeSelect.addEventListener('change', async (e) => {
        await chrome.storage.sync.set({ mode: e.target.value });
        showStatus('Mode updated!');
    });
    
    document.getElementById('updatePassword').addEventListener('click', async () => {
        const newPass = document.getElementById('newPassword').value;
        
        if (!newPass || newPass.length < 4) {
            showStatus('Password must be at least 4 characters!', true);
            return;
        }
        
        await chrome.storage.sync.set({ password: newPass });
        document.getElementById('newPassword').value = '';
        showStatus('Password updated successfully!');
    });
});

function showStatus(message, isError = false) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = isError ? 'error' : 'success';
    setTimeout(() => {
        status.textContent = '';
        status.className = '';
    }, 3000);
}