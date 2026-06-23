fetch('status.txt')
    .then(response => response.text())
    .then(data => {

        const lignes = data.split('\n');

        const alertes = document.getElementById('alertes');
        const serveurs = document.getElementById('serveurs');

        alertes.innerHTML = '';
        serveurs.innerHTML = '';

        lignes.forEach(ligne => {

            if (!ligne.trim()) return;

            const parts = ligne.split(':');

            if (parts.length < 2) return;

            const nom = parts[0].trim();
            const etat = parts[1].trim();

            const div = document.createElement('div');
            div.className = 'server';

            div.innerHTML = `
                <span class="server-name">${nom}</span>
                <span class="status ${etat === '1' ? 'online' : 'offline'}">
                    ${etat === '1' ? 'Fonctionnel' : 'Hors Service'}
                </span>
            `;

            // Les erreurs apparaissent en haut
            if (etat !== '1') {
                div.classList.add('error-server');
                alertes.appendChild(div);
            } else {
                serveurs.appendChild(div);
            }
        });

        // Message si aucune erreur
        if (alertes.children.length === 0) {
            alertes.innerHTML = `
                <div class="all-ok">
                    ✅ Aucun incident détecté
                </div>
            `;
        }

    })
    .catch(error => {
        console.error('Erreur lors du chargement du fichier status.txt :', error);

        document.getElementById('alertes').innerHTML = `
            <div class="critical-error">
                ❌ Impossible de charger status.txt
            </div>
        `;
    });
