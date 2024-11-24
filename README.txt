# BrowserGuard Pro

## Description
BrowserGuard Pro is a Chrome extension that provides an additional layer of security by requiring password authentication before allowing browser access. It supports both static passwords and dynamic time-based passwords for enhanced security.

## Purpose
Created to address the need for browser-level security in shared environments or situations where users need to protect their browsing sessions from unauthorized access.

## Features
- Static password protection
- Dynamic time-based password generation
- Customizable settings
- Dark mode interface
- Automatic browser locking on startup

## Requirements
- Google Chrome Browser (Version 88 or higher)
- Chrome Developer Mode enabled

## Installation
1. Download the extension files
2. Open Chrome and navigate to chrome://extensions/
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory
5. Set initial password when prompted
6. Restart browser to activate protection

## Use Case Example
Sarah works in a shared office space and often steps away from her computer for meetings. She uses BrowserGuard Pro to ensure that even if she forgets to lock her computer, her browsing data remains secure. When using dynamic password mode, the password changes hourly based on a mathematical formula, providing an extra layer of security.

## Technical Requirements
- Chrome Storage API
- Chrome Tabs API
- Chrome Windows API