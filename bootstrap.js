const { exec } = require('child_process');
const fs = require('fs');

// Supprimer node_modules et package-lock.json si corrompus
if (fs.existsSync('node_modules')) fs.rmSync('node_modules', { recursive: true, force: true });
if (fs.existsSync('package-lock.json')) fs.rmSync('package-lock.json', { force: true });

// Installer les dépendances
console.log('Installing Dependencies...');
exec('npm install', (err, stdout, stderr) => {
    if (err) {
        console.error(`Npm Install Error : ${err}`);
        return;
    }
    console.log(stdout);
    console.log('Dependencies Installed, Starting Bot...');

    // Lancer le bot
    require('./index.js');
});
