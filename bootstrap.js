const { exec } = require('child_process');
const fs = require('fs');

// Supprimer node_modules et package-lock.json si corrompus
if (fs.existsSync('node_modules')) fs.rmSync('node_modules', { recursive: true, force: true });
if (fs.existsSync('package-lock.json')) fs.rmSync('package-lock.json', { force: true });

// Installer les dépendances
console.log('Installation des dépendances...');
exec('npm install', (err, stdout, stderr) => {
    if (err) {
        console.error(`Erreur npm install : ${err}`);
        return;
    }
    console.log(stdout);
    console.log('Dépendances installées, démarrage du bot...');

    // Lancer le bot
    require('./index.js');
});
