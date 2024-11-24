chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    const password = prompt("Set your initial password (minimum 4 characters):", "");
    if (!password || password.length < 4) {
      alert("Invalid password! Extension will be disabled.");
      return;
    }
    
    try {
      await chrome.storage.sync.set({
        password: password,
        mode: 'static',
        dynamicSalt: Math.floor(Math.random() * 100),
        isLocked: true
      });
      alert("Password set successfully! Restart browser to activate protection.");
    } catch (error) {
      console.error('Error setting password:', error);
      alert("Failed to save password. Please try reinstalling the extension.");
    }
  }
});

chrome.runtime.onStartup.addListener(async () => {
  try {
    const data = await chrome.storage.sync.get(['password', 'mode', 'dynamicSalt', 'isLocked']);
    
    if (!data.password) {
      return;
    }

    const tab = await chrome.tabs.create({ url: 'about:blank' });
    
    let correctPassword = data.password;
    
    if (data.mode === 'dynamic') {
      const date = new Date();
      const minutes = date.getMinutes();
      const hour = date.getHours();
      correctPassword = generateDynamicPassword(minutes, hour, data.dynamicSalt);
    }

    const input = prompt("Enter password to unlock browser:", "");
    
    if (input !== correctPassword) {
      await closeAllWindows();
      return;
    }

    await chrome.tabs.remove(tab.id);
  } catch (error) {
    console.error('Error in startup:', error);
    alert("An error occurred. Please restart your browser.");
  }
});

function generateDynamicPassword(minutes, hour, salt) {
  const base = ((minutes + hour) * salt) % 1000;
  return base.toString().padStart(3, '0');
}

async function closeAllWindows() {
  const windows = await chrome.windows.getAll();
  for (const window of windows) {
    await chrome.windows.remove(window.id);
  }
}