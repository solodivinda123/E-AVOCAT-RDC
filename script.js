// Global variables
let currentModal = null;
let appointments = [];
let currentUser = null;
let userType = null; // 'lawyer' or 'client'
let registeredLawyers = [];
let registeredClients = [];

// Sample registered lawyers for demonstration
const sampleLawyers = [
    {
        id: 1,
        email: "jean.mukendi@cabinet.rdc",
        password: "password123",
        firstName: "Jean",
        lastName: "Mukendi",
        fullName: "Maître Jean-Pierre Mukendi",
        specialization: "Droit de la Famille",
        experience: "15 ans",
        rating: 4.8,
        location: "Kinshasa, RDC",
        hourlyRate: "50$",
        phone: "+243 123 456 789",
        barNumber: "BAR-2024-001",
        isVerified: true
    },
    {
        id: 2,
        email: "marie.tshibanda@cabinet.rdc",
        password: "password123",
        firstName: "Marie-Louise",
        lastName: "Tshibanda",
        fullName: "Maître Marie-Louise Tshibanda",
        specialization: "Droit des Affaires",
        experience: "12 ans",
        rating: 4.9,
        location: "Lubumbashi, RDC",
        hourlyRate: "75$",
        phone: "+243 234 567 890",
        barNumber: "BAR-2024-002",
        isVerified: true
    }
];

// Sample registered clients for demonstration
const sampleClients = [
    {
        id: 1,
        email: "pierre.lumumba@email.com",
        password: "client123",
        firstName: "Pierre",
        lastName: "Lumumba",
        fullName: "Pierre Lumumba",
        city: "Kinshasa",
        legalNeed: "Droit de la Famille",
        phone: "+243 123 456 789",
        isVerified: false
    },
    {
        id: 2,
        email: "marie.kasongo@email.com",
        password: "client123",
        firstName: "Marie",
        lastName: "Kasongo",
        fullName: "Marie Kasongo",
        city: "Lubumbashi",
        legalNeed: "Droit des Affaires",
        phone: "+243 234 567 890",
        isVerified: false
    }
];

// Initialize with sample data
registeredLawyers = [...sampleLawyers];
registeredClients = [...sampleClients];

let lawyers = [
    {
        id: 1,
        name: "Maître Jean-Pierre Mukendi",
        specialization: "Droit de la Famille",
        experience: "15 ans",
        rating: 4.8,
        location: "Kinshasa, RDC",
        hourlyRate: "50$"
    },
    {
        id: 2,
        name: "Maître Marie-Louise Tshibanda",
        specialization: "Droit des Affaires",
        experience: "12 ans",
        rating: 4.9,
        location: "Lubumbashi, RDC",
        hourlyRate: "75$"
    },
    {
        id: 3,
        name: "Maître Paul Mwamba",
        specialization: "Droit Pénal",
        experience: "10 ans",
        rating: 4.7,
        location: "Kinshasa, RDC",
        hourlyRate: "60$"
    },
    {
        id: 4,
        name: "Maître Thérèse Nzuzi",
        specialization: "Droit Minier",
        experience: "18 ans",
        rating: 4.6,
        location: "Lubumbashi, RDC",
        hourlyRate: "100$"
    },
    {
        id: 5,
        name: "Maître André Kalala",
        specialization: "Droit Foncier",
        experience: "14 ans",
        rating: 4.5,
        location: "Kinshasa, RDC",
        hourlyRate: "65$"
    },
    {
        id: 6,
        name: "Maître Christine Mbuyi",
        specialization: "Droit du Travail",
        experience: "11 ans",
        rating: 4.4,
        location: "Goma, RDC",
        hourlyRate: "55$"
    }
];

// Modal functions
function showModal(content) {
    const modal = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = content;
    modal.classList.add('show');
    currentModal = modal;
}

function closeModal() {
    const modal = document.getElementById('modal-overlay');
    modal.classList.remove('show');
    currentModal = null;
}

// Close modal when clicking outside
document.getElementById('modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Navigation functions
function goBack() {
    if (currentModal) {
        closeModal();
    } else {
        window.history.back();
    }
}

function goHome() {
    if (currentModal) {
        closeModal();
    }
    window.location.href = 'index.html';
}

function showRecent() {
    showModal(`
        <h2>Activité Récente</h2>
        <div style="max-height: 300px; overflow-y: auto;">
            <p><strong>Dernière Connexion:</strong> Aujourd'hui à 14h30</p>
            <p><strong>Rendez-vous Récents:</strong></p>
            <ul>
                <li>Consultation avec Maître Jean-Pierre Mukendi - Droit de la Famille (Demain)</li>
                <li>Suivi avec Maître Marie-Louise Tshibanda - Affaire Commerciale (Semaine Prochaine)</li>
            </ul>
            <p><strong>Questions Récentes:</strong></p>
            <ul>
                <li>Procédure de divorce en RDC</li>
                <li>Révision de contrat minier</li>
                <li>Litige foncier à Kinshasa</li>
            </ul>
        </div>
    `);
}

// Service functions
function showAskLawyer() {
    const content = `
        <h2>Demander un Avocat</h2>
        <p>Obtenez des conseils juridiques d'experts de nos avocats qualifiés. Remplissez le formulaire ci-dessous et nous vous connecterons avec le bon avocat pour votre affaire.</p>
        
        <form id="askLawyerForm">
            <div class="form-group">
                <label for="name">Nom Complet</label>
                <input type="text" id="name" name="name" required>
            </div>
            
            <div class="form-group">
                <label for="email">Adresse Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div class="form-group">
                <label for="phone">Numéro de Téléphone</label>
                <input type="tel" id="phone" name="phone" required>
            </div>
            
            <div class="form-group">
                <label for="legalArea">Domaine Juridique</label>
                <select id="legalArea" name="legalArea" required>
                    <option value="">Sélectionnez un domaine juridique</option>
                    <option value="family">Droit de la Famille</option>
                    <option value="business">Droit des Affaires</option>
                    <option value="criminal">Droit Pénal</option>
                    <option value="mining">Droit Minier</option>
                    <option value="land">Droit Foncier</option>
                    <option value="labor">Droit du Travail</option>
                    <option value="civil">Droit Civil</option>
                    <option value="commercial">Droit Commercial</option>
                    <option value="other">Autre</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="question">Décrivez Votre Problème Juridique</label>
                <textarea id="question" name="question" rows="5" placeholder="Veuillez fournir des détails sur votre situation juridique..." required></textarea>
            </div>
            
            <div class="form-group">
                <label for="urgency">Niveau d'Urgence</label>
                <select id="urgency" name="urgency" required>
                    <option value="">Sélectionnez le niveau d'urgence</option>
                    <option value="low">Faible - Consultation générale</option>
                    <option value="medium">Moyen - Besoin de conseils bientôt</option>
                    <option value="high">Élevé - Affaire urgente</option>
                </select>
            </div>
            
            <button type="submit" class="btn">Soumettre la Question</button>
        </form>
    `;
    
    showModal(content);
    
    // Handle form submission
    document.getElementById('askLawyerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showModal(`
            <h2>Question Soumise !</h2>
            <p>Merci pour votre question. Nous avons reçu votre demande et vous connecterons avec un avocat approprié dans les 24 heures.</p>
            <p>Vous recevrez un email de confirmation avec les prochaines étapes.</p>
            <button class="btn" onclick="closeModal()">Fermer</button>
        `);
    });
}

function showFindLawyer() {
    let lawyerCards = '';
    lawyers.forEach(lawyer => {
        lawyerCards += `
            <div class="lawyer-card" onclick="selectLawyer(${lawyer.id})">
                <h3>${lawyer.name}</h3>
                <p><strong>Spécialisation:</strong> ${lawyer.specialization}</p>
                <p><strong>Expérience:</strong> ${lawyer.experience}</p>
                <p><strong>Évaluation:</strong> ⭐ ${lawyer.rating}/5.0</p>
                <p><strong>Localisation:</strong> ${lawyer.location}</p>
                <p><strong>Tarif Horaire:</strong> ${lawyer.hourlyRate}</p>
                <button class="btn">Réserver Consultation</button>
            </div>
        `;
    });
    
    const content = `
        <h2>Trouver un Avocat</h2>
        <p>Parcourez notre réseau d'avocats qualifiés. Cliquez sur un avocat pour réserver une consultation.</p>
        
        <div class="form-group">
            <label for="searchSpecialization">Filtrer par Spécialisation</label>
            <select id="searchSpecialization" onchange="filterLawyers()">
                <option value="">Toutes les Spécialisations</option>
                <option value="Droit de la Famille">Droit de la Famille</option>
                <option value="Droit des Affaires">Droit des Affaires</option>
                <option value="Droit Pénal">Droit Pénal</option>
                <option value="Droit Minier">Droit Minier</option>
                <option value="Droit Foncier">Droit Foncier</option>
                <option value="Droit du Travail">Droit du Travail</option>
            </select>
        </div>
        
        <div id="lawyersList">
            ${lawyerCards}
        </div>
    `;
    
    showModal(content);
}

function filterLawyers() {
    const specialization = document.getElementById('searchSpecialization').value;
    const filteredLawyers = specialization ? 
        lawyers.filter(lawyer => lawyer.specialization === specialization) : 
        lawyers;
    
    let lawyerCards = '';
    filteredLawyers.forEach(lawyer => {
        lawyerCards += `
            <div class="lawyer-card" onclick="selectLawyer(${lawyer.id})">
                <h3>${lawyer.name}</h3>
                <p><strong>Spécialisation:</strong> ${lawyer.specialization}</p>
                <p><strong>Expérience:</strong> ${lawyer.experience}</p>
                <p><strong>Évaluation:</strong> ⭐ ${lawyer.rating}/5.0</p>
                <p><strong>Localisation:</strong> ${lawyer.location}</p>
                <p><strong>Tarif Horaire:</strong> ${lawyer.hourlyRate}</p>
                <button class="btn">Réserver Consultation</button>
            </div>
        `;
    });
    
    document.getElementById('lawyersList').innerHTML = lawyerCards;
}

function selectLawyer(lawyerId) {
    const lawyer = lawyers.find(l => l.id === lawyerId);
    const content = `
        <h2>Réserver Consultation avec ${lawyer.name}</h2>
        <p><strong>Spécialisation:</strong> ${lawyer.specialization}</p>
        <p><strong>Expérience:</strong> ${lawyer.experience}</p>
        <p><strong>Tarif Horaire:</strong> ${lawyer.hourlyRate}</p>
        
        <form id="bookingForm">
            <div class="form-group">
                <label for="bookingName">Votre Nom</label>
                <input type="text" id="bookingName" required>
            </div>
            
            <div class="form-group">
                <label for="bookingEmail">Email</label>
                <input type="email" id="bookingEmail" required>
            </div>
            
            <div class="form-group">
                <label for="bookingDate">Date Préférée</label>
                <input type="date" id="bookingDate" required>
            </div>
            
            <div class="form-group">
                <label for="bookingTime">Heure Préférée</label>
                <select id="bookingTime" required>
                    <option value="">Sélectionner l'heure</option>
                    <option value="09:00">9h00</option>
                    <option value="10:00">10h00</option>
                    <option value="11:00">11h00</option>
                    <option value="14:00">14h00</option>
                    <option value="15:00">15h00</option>
                    <option value="16:00">16h00</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="consultationType">Type de Consultation</label>
                <select id="consultationType" required>
                    <option value="">Sélectionner le type</option>
                    <option value="phone">Consultation Téléphonique</option>
                    <option value="video">Appel Vidéo</option>
                    <option value="in-person">Rendez-vous en Personne</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="consultationNotes">Brève Description de Votre Affaire</label>
                <textarea id="consultationNotes" rows="3" placeholder="Décrivez brièvement votre affaire juridique..."></textarea>
            </div>
            
            <button type="submit" class="btn">Réserver Rendez-vous</button>
        </form>
    `;
    
    showModal(content);
    
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const appointment = {
            id: Date.now(),
            lawyerName: lawyer.name,
            date: document.getElementById('bookingDate').value,
            time: document.getElementById('bookingTime').value,
            type: document.getElementById('consultationType').value,
            notes: document.getElementById('consultationNotes').value
        };
        appointments.push(appointment);
        
        showModal(`
            <h2>Rendez-vous Réservé !</h2>
            <p>Votre consultation avec ${lawyer.name} a été programmée.</p>
            <p><strong>Date:</strong> ${appointment.date}</p>
            <p><strong>Heure:</strong> ${appointment.time}</p>
            <p><strong>Type:</strong> ${appointment.type}</p>
            <p>Vous recevrez un email de confirmation avec les détails de la réunion.</p>
            <button class="btn" onclick="closeModal()">Fermer</button>
        `);
    });
}

function showAppointments() {
    if (appointments.length === 0) {
        showModal(`
            <h2>Mes Rendez-vous</h2>
            <p>Vous n'avez pas encore de rendez-vous programmés.</p>
            <p>Réservez une consultation avec l'un de nos avocats pour commencer.</p>
            <button class="btn" onclick="closeModal()">Fermer</button>
        `);
        return;
    }
    
    let appointmentsList = '';
    appointments.forEach(appointment => {
        appointmentsList += `
            <div class="lawyer-card">
                <h3>${appointment.lawyerName}</h3>
                <p><strong>Date:</strong> ${appointment.date}</p>
                <p><strong>Heure:</strong> ${appointment.time}</p>
                <p><strong>Type:</strong> ${appointment.type}</p>
                ${appointment.notes ? `<p><strong>Notes:</strong> ${appointment.notes}</p>` : ''}
                <button class="btn btn-secondary" onclick="cancelAppointment(${appointment.id})">Annuler</button>
            </div>
        `;
    });
    
    showModal(`
        <h2>Mes Rendez-vous</h2>
        <p>Vos consultations programmées:</p>
        ${appointmentsList}
    `);
}

function cancelAppointment(appointmentId) {
    appointments = appointments.filter(app => app.id !== appointmentId);
    showAppointments();
}

function showQA() {
    const faqs = [
        {
            question: "Combien coûte une consultation ?",
            answer: "Les consultations initiales coûtent généralement entre 25$ et 100$ selon l'avocat et la complexité de votre affaire. Certains avocats offrent des consultations initiales gratuites."
        },
        {
            question: "À quelle vitesse puis-je obtenir un rendez-vous ?",
            answer: "La plupart des avocats peuvent programmer des rendez-vous dans les 1-3 jours ouvrables. Pour les affaires urgentes, nous pouvons souvent organiser des consultations le même jour ou le lendemain."
        },
        {
            question: "Que dois-je apporter à ma première consultation ?",
            answer: "Apportez tous les documents pertinents, contrats, documents judiciaires ou preuves liés à votre affaire. Il est également utile de noter vos questions à l'avance."
        },
        {
            question: "Les consultations sont-elles confidentielles ?",
            answer: "Oui, toutes les consultations sont protégées par le secret professionnel de l'avocat. Vos informations restent confidentielles."
        },
        {
            question: "Puis-je obtenir un deuxième avis ?",
            answer: "Absolument. Il est courant et souvent recommandé de consulter plusieurs avocats avant de prendre des décisions juridiques importantes."
        },
        {
            question: "Comment fonctionne le système judiciaire en RDC ?",
            answer: "Le système judiciaire en RDC comprend les tribunaux de paix, les tribunaux de grande instance, les cours d'appel et la Cour de cassation. Les procédures suivent le Code de procédure civile et pénale congolais."
        },
        {
            question: "Quels sont les droits des travailleurs en RDC ?",
            answer: "Les droits des travailleurs en RDC sont régis par le Code du travail. Cela inclut les conditions de travail, les salaires minimums, les congés payés et la protection contre les licenciements abusifs."
        }
    ];
    
    let faqContent = '';
    faqs.forEach((faq, index) => {
        faqContent += `
            <div class="lawyer-card">
                <h3>Q: ${faq.question}</h3>
                <p><strong>R:</strong> ${faq.answer}</p>
            </div>
        `;
    });
    
    showModal(`
        <h2>Questions Fréquemment Posées</h2>
        <p>Trouvez des réponses aux questions juridiques courantes:</p>
        ${faqContent}
        <p>Vous ne voyez pas votre question ? <button class="btn" onclick="showAskLawyer()">Demander un Avocat</button></p>
    `);
}

function showTerms() {
    showModal(`
        <h2>Conditions d'Utilisation</h2>
        <p><strong>Dernière Mise à Jour:</strong> Janvier 2024</p>
        
        <h3>1. Acceptation des Conditions</h3>
        <p>En accédant et en utilisant cette plateforme de services juridiques, vous acceptez et acceptez d'être lié par les termes et dispositions de cet accord.</p>
        
        <h3>2. Description du Service</h3>
        <p>Nous fournissons une plateforme qui connecte les clients avec des avocats qualifiés pour des consultations et services juridiques. Nous ne fournissons pas de conseils juridiques directement.</p>
        
        <h3>3. Responsabilités de l'Utilisateur</h3>
        <ul>
            <li>Fournir des informations précises et complètes</li>
            <li>Maintenir la confidentialité de votre compte</li>
            <li>Utiliser le service uniquement à des fins légales</li>
            <li>Respecter les droits des autres utilisateurs</li>
        </ul>
        
        <h3>4. Relation Avocat-Client</h3>
        <p>L'utilisation de notre plateforme ne crée pas une relation avocat-client avec nous. Ces relations sont formées directement avec des avocats individuels.</p>
        
        <h3>5. Conditions de Paiement</h3>
        <p>Les honoraires sont facturés par les avocats individuels selon leurs tarifs. Le paiement est traité en toute sécurité via notre plateforme.</p>
        
        <h3>6. Limitation de Responsabilité</h3>
        <p>Nous ne sommes pas responsables des dommages résultant de l'utilisation de notre plateforme ou des services juridiques obtenus par son intermédiaire.</p>
        
        <h3>7. Confidentialité</h3>
        <p>Votre confidentialité est importante pour nous. Veuillez consulter notre Politique de Confidentialité pour plus de détails sur la façon dont nous traitons vos informations.</p>
        
        <h3>8. Modifications des Conditions</h3>
        <p>Nous nous réservons le droit de modifier ces conditions à tout moment. L'utilisation continue du service constitue l'acceptation des conditions mises à jour.</p>
        
        <h3>9. Conformité avec la Loi Congolaise</h3>
        <p>Ce service est conforme aux lois de la République Démocratique du Congo et respecte les réglementations locales en matière de services juridiques.</p>
    `);
}

function showPrivacy() {
    showModal(`
        <h2>Privacy Policy</h2>
        <p><strong>Last Updated:</strong> January 2024</p>
        
        <h3>Information We Collect</h3>
        <ul>
            <li>Personal information (name, email, phone)</li>
            <li>Legal case information you provide</li>
            <li>Appointment and consultation details</li>
            <li>Usage data and analytics</li>
        </ul>
        
        <h3>How We Use Your Information</h3>
        <ul>
            <li>Connect you with appropriate attorneys</li>
            <li>Schedule and manage appointments</li>
            <li>Provide customer support</li>
            <li>Improve our services</li>
            <li>Send important updates and notifications</li>
        </ul>
        
        <h3>Information Sharing</h3>
        <p>We share your information only with:</p>
        <ul>
            <li>Attorneys you choose to work with</li>
            <li>Service providers who assist our operations</li>
            <li>Legal authorities when required by law</li>
        </ul>
        
        <h3>Data Security</h3>
        <p>We implement industry-standard security measures to protect your personal information, including encryption and secure servers.</p>
        
        <h3>Your Rights</h3>
        <ul>
            <li>Access your personal information</li>
            <li>Request corrections to your data</li>
            <li>Request deletion of your account</li>
            <li>Opt out of marketing communications</li>
        </ul>
        
        <h3>Cookies and Tracking</h3>
        <p>We use cookies to improve your experience and analyze site usage. You can control cookie settings in your browser.</p>
        
        <h3>Contact Us</h3>
        <p>For privacy questions, contact us at privacy@legalservices.com</p>
    `);
}

function showAbout() {
    showModal(`
        <h2>À Propos de Nous</h2>
        <p>Nous sommes une plateforme de services juridiques de premier plan dédiée à rendre l'assistance juridique de qualité accessible à tous en République Démocratique du Congo.</p>
        
        <h3>Notre Mission</h3>
        <p>Combler le fossé entre les particuliers et les entreprises cherchant une aide juridique et les avocats qualifiés qui peuvent fournir des conseils et une représentation d'experts.</p>
        
        <h3>Ce Que Nous Faisons</h3>
        <ul>
            <li>Connecter les clients avec des avocats vérifiés et expérimentés</li>
            <li>Fournir une planification de rendez-vous facile à utiliser</li>
            <li>Offrir des prix transparents et une communication claire</li>
            <li>Soutenir plusieurs domaines de pratique et spécialisations</li>
        </ul>
        
        <h3>Notre Réseau</h3>
        <p>Nous travaillons avec des centaines d'avocats qualifiés à travers la RDC, couvrant tous les domaines de pratique majeurs, y compris:</p>
        <ul>
            <li>Droit de la Famille</li>
            <li>Droit des Affaires</li>
            <li>Droit Pénal</li>
            <li>Droit Minier</li>
            <li>Droit Foncier</li>
            <li>Droit du Travail</li>
            <li>Et bien plus encore...</li>
        </ul>
        
        <h3>Pourquoi Nous Choisir</h3>
        <ul>
            <li><strong>Avocats Vérifiés:</strong> Tous les avocats de notre réseau sont agréés et vérifiés</li>
            <li><strong>Planification Facile:</strong> Réservez des consultations en quelques clics</li>
            <li><strong>Prix Transparents:</strong> Tarifs clairs et pas de frais cachés</li>
            <li><strong>Support 24/7:</strong> Obtenez de l'aide quand vous en avez besoin</li>
        </ul>
        
        <h3>Informations de Contact</h3>
        <p><strong>Email:</strong> info@servicesjuridiques-rdc.com</p>
        <p><strong>Téléphone:</strong> +243 123 456 789</p>
        <p><strong>Adresse:</strong> 123 Avenue du Commerce, Gombe, Kinshasa, RDC</p>
    `);
}

function showAccount() {
    if (!currentUser) {
        showModal(`
            <h2>Erreur</h2>
            <p>Vous devez être connecté pour accéder à votre compte.</p>
            <button class="btn" onclick="closeModal()">Fermer</button>
        `);
        return;
    }
    
    if (userType === 'lawyer') {
        showModal(`
            <h2>Mon Compte Avocat</h2>
            
            <div class="lawyer-card">
                <h3>Informations du Profil</h3>
                <p><strong>Nom:</strong> ${currentUser.fullName}</p>
                <p><strong>Email:</strong> ${currentUser.email}</p>
                <p><strong>Téléphone:</strong> ${currentUser.phone}</p>
                <p><strong>Numéro du Barreau:</strong> ${currentUser.barNumber}</p>
                <p><strong>Spécialisation:</strong> ${currentUser.specialization}</p>
                <p><strong>Ville:</strong> ${currentUser.location}</p>
                <p><strong>Expérience:</strong> ${currentUser.experience}</p>
                <p><strong>Tarif Horaire:</strong> ${currentUser.hourlyRate}</p>
                <p><strong>Statut:</strong> ${currentUser.isVerified ? '✅ Vérifié' : '⏳ En attente de vérification'}</p>
            </div>
            
            <div class="lawyer-card">
                <h3>Statistiques du Compte</h3>
                <p><strong>Total Consultations:</strong> 3</p>
                <p><strong>Rendez-vous Actifs:</strong> ${appointments.length}</p>
                <p><strong>Questions Posées:</strong> 2</p>
                <p><strong>Évaluation Moyenne:</strong> ⭐ ${currentUser.rating}/5.0</p>
            </div>
            
            <div class="lawyer-card">
                <h3>Actions Rapides</h3>
                <button class="btn" onclick="showAppointments()">Voir Rendez-vous</button>
                <button class="btn" onclick="showAskLawyer()">Poser Nouvelle Question</button>
                <button class="btn btn-secondary" onclick="editProfile()">Modifier Profil</button>
                <button class="btn btn-secondary" onclick="changePassword()">Changer Mot de Passe</button>
            </div>
            
            <div class="lawyer-card">
                <h3>Préférences</h3>
                <p><strong>Paramètres de Notification:</strong> Email & SMS</p>
                <p><strong>Méthode de Contact Préférée:</strong> Email</p>
                <p><strong>Langue:</strong> Français</p>
            </div>
            
            <div class="lawyer-card">
                <h3>Actions du Compte</h3>
                <button class="btn btn-secondary" onclick="logout()">Se Déconnecter</button>
            </div>
        `);
    } else {
        // Client account
        showModal(`
            <h2>Mon Compte Client</h2>
            
            <div class="lawyer-card">
                <h3>Informations du Profil</h3>
                <p><strong>Nom:</strong> ${currentUser.fullName}</p>
                <p><strong>Email:</strong> ${currentUser.email}</p>
                <p><strong>Téléphone:</strong> ${currentUser.phone}</p>
                <p><strong>Ville:</strong> ${currentUser.city}</p>
                <p><strong>Commune:</strong> ${currentUser.commune}</p>
                <p><strong>Besoin Juridique:</strong> ${currentUser.legalNeed}</p>
                <p><strong>Statut:</strong> ${currentUser.isVerified ? '✅ Vérifié' : '⏳ En attente de vérification'}</p>
            </div>
            
            <div class="lawyer-card">
                <h3>Mes Services</h3>
                <p><strong>Consultations Demandées:</strong> 2</p>
                <p><strong>Rendez-vous Actifs:</strong> ${appointments.length}</p>
                <p><strong>Questions Posées:</strong> 1</p>
                <p><strong>Avocats Consultés:</strong> 3</p>
            </div>
            
            <div class="lawyer-card">
                <h3>Actions Rapides</h3>
                <button class="btn" onclick="showFindLawyer()">Trouver un Avocat</button>
                <button class="btn" onclick="showAskLawyer()">Poser une Question</button>
                <button class="btn" onclick="showAppointments()">Mes Rendez-vous</button>
                <button class="btn btn-secondary" onclick="editProfile()">Modifier Profil</button>
            </div>
            
            <div class="lawyer-card">
                <h3>Préférences</h3>
                <p><strong>Paramètres de Notification:</strong> Email & SMS</p>
                <p><strong>Méthode de Contact Préférée:</strong> Email</p>
                <p><strong>Langue:</strong> Français</p>
            </div>
            
            <div class="lawyer-card">
                <h3>Actions du Compte</h3>
                <button class="btn btn-secondary" onclick="logout()">Se Déconnecter</button>
            </div>
        `);
    }
}

function editProfile() {
    showModal(`
        <h2>Modifier le Profil</h2>
        <p>Fonctionnalité en cours de développement.</p>
        <button class="btn" onclick="closeModal()">Fermer</button>
    `);
}

function changePassword() {
    showModal(`
        <h2>Changer le Mot de Passe</h2>
        <p>Fonctionnalité en cours de développement.</p>
        <button class="btn" onclick="closeModal()">Fermer</button>
    `);
}

// Authentication Functions
function switchToLawyerLogin() {
    // Update button states
    document.querySelectorAll('.user-type-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.user-type-btn[onclick="switchToLawyerLogin()"]').classList.add('active');
    
    // Update form labels and placeholders
    document.querySelector('#login-form h2').innerHTML = '<i class="fas fa-user-circle"></i> Connexion Avocat';
    document.querySelector('#loginEmail').placeholder = 'votre.email@cabinet.rdc';
    document.querySelector('#loginEmail').label = 'Email Professionnel';
    
    // Update form action
    document.getElementById('lawyerLoginForm').onsubmit = function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (login(email, password)) {
            showModal(`
                <h2>Connexion Réussie !</h2>
                <p>Bienvenue dans votre espace avocat.</p>
                <button class="btn" onclick="closeModal()">Continuer</button>
            `);
        } else {
            showModal(`
                <h2>Erreur de Connexion</h2>
                <p>Email ou mot de passe incorrect.</p>
                <p><strong>Emails de test:</strong></p>
                <p><strong>Avocat:</strong> jean.mukendi@cabinet.rdc / password123</p>
                <p><strong>Client:</strong> pierre.lumumba@email.com / client123</p>
                <button class="btn" onclick="closeModal()">Fermer</button>
            `);
        }
    };
}

function switchToClientLogin() {
    // Update button states
    document.querySelectorAll('.user-type-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.user-type-btn[onclick="switchToClientLogin()"]').classList.add('active');
    
    // Update form labels and placeholders
    document.querySelector('#login-form h2').innerHTML = '<i class="fas fa-user-circle"></i> Connexion Client';
    document.querySelector('#loginEmail').placeholder = 'votre.email@client.com';
    document.querySelector('#loginEmail').label = 'Email Client';
    
    // Update form action
    document.getElementById('lawyerLoginForm').onsubmit = function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (login(email, password)) {
            showModal(`
                <h2>Connexion Réussie !</h2>
                <p>Bienvenue dans votre espace client.</p>
                <button class="btn" onclick="closeModal()">Continuer</button>
            `);
        } else {
            showModal(`
                <h2>Erreur de Connexion</h2>
                <p>Email ou mot de passe incorrect.</p>
                <p><strong>Emails de test:</strong></p>
                <p><strong>Avocat:</strong> jean.mukendi@cabinet.rdc / password123</p>
                <p><strong>Client:</strong> pierre.lumumba@email.com / client123</p>
                <button class="btn" onclick="closeModal()">Fermer</button>
            `);
        }
    };
}

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('client-signup-form').style.display = 'none';
    
    // Initialize with lawyer login by default
    switchToLawyerLogin();
}

function showSignupForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('client-signup-form').style.display = 'none';
}

function showClientSignupForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('client-signup-form').style.display = 'block';
}

function showLawyerSignupForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('client-signup-form').style.display = 'none';
}

function showForgotPassword() {
    showModal(`
        <h2>Mot de Passe Oublié</h2>
        <p>Entrez votre email professionnel pour recevoir un lien de réinitialisation.</p>
        
        <form id="forgotPasswordForm">
            <div class="form-group">
                <label for="forgotEmail">Email Professionnel</label>
                <input type="email" id="forgotEmail" required placeholder="votre.email@cabinet.rdc">
            </div>
            <button type="submit" class="btn">Envoyer le Lien</button>
        </form>
    `);
    
    document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showModal(`
            <h2>Email Envoyé !</h2>
            <p>Un lien de réinitialisation a été envoyé à votre email professionnel.</p>
            <p>Vérifiez votre boîte de réception et suivez les instructions.</p>
            <button class="btn" onclick="closeModal()">Fermer</button>
        `);
    });
}

function login(email, password) {
    // Try to find a lawyer first
    const lawyer = registeredLawyers.find(l => l.email === email && l.password === password);
    if (lawyer) {
        currentUser = lawyer;
        userType = 'lawyer';
        localStorage.setItem('currentUser', JSON.stringify(lawyer));
        localStorage.setItem('userType', 'lawyer');
        showMainApp();
        return true;
    }
    
    // Try to find a client
    const client = registeredClients.find(c => c.email === email && c.password === password);
    if (client) {
        currentUser = client;
        userType = 'client';
        localStorage.setItem('currentUser', JSON.stringify(client));
        localStorage.setItem('userType', 'client');
        showMainApp();
        return true;
    }
    
    return false;
}

function clientSignup(formData) {
    const newClient = {
        id: Date.now(),
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        city: formData.city,
        commune: formData.commune,
        legalNeed: formData.legalNeed,
        phone: formData.phone,
        isVerified: false
    };
    
    registeredClients.push(newClient);
    currentUser = newClient;
    userType = 'client';
    localStorage.setItem('currentUser', JSON.stringify(newClient));
    localStorage.setItem('userType', 'client');
    showMainApp();
    return true;
}

function signup(formData) {
    const newLawyer = {
        id: Date.now(),
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `Maître ${formData.firstName} ${formData.lastName}`,
        specialization: formData.specialization,
        experience: formData.experience,
        location: `${formData.location}, RDC`,
        hourlyRate: formData.hourlyRate,
        phone: formData.phone,
        barNumber: formData.barNumber,
        rating: 4.0, // Default rating for new lawyers
        isVerified: false
    };
    
    registeredLawyers.push(newLawyer);
    currentUser = newLawyer;
    userType = 'lawyer';
    localStorage.setItem('currentUser', JSON.stringify(newLawyer));
    localStorage.setItem('userType', 'lawyer');
    showMainApp();
    return true;
}

function showMainApp() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('main-content').style.display = 'flex';
    document.getElementById('nav-bar').style.display = 'flex';
    
    // Update header to show welcome message based on user type
    const header = document.querySelector('.header h1');
    if (currentUser) {
        if (userType === 'lawyer') {
            header.textContent = `Bienvenue, Maître ${currentUser.firstName}`;
        } else {
            header.textContent = `Bienvenue, ${currentUser.firstName}`;
        }
    }
}

function logout() {
    console.log('Logout function called');
    
    // Clear user data
    currentUser = null;
    userType = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userType');
    
    // Hide main app and show auth section
    document.getElementById('auth-section').style.display = 'flex';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('nav-bar').style.display = 'none';
    
    // Reset header
    const header = document.querySelector('.header h1');
    if (header) {
        header.textContent = 'Rendez-vous Avocat RDC';
    }
    
    // Reset forms
    const lawyerLoginForm = document.getElementById('lawyerLoginForm');
    const lawyerSignupForm = document.getElementById('lawyerSignupForm');
    const clientSignupForm = document.getElementById('clientSignupForm');
    
    if (lawyerLoginForm) lawyerLoginForm.reset();
    if (lawyerSignupForm) lawyerSignupForm.reset();
    if (clientSignupForm) clientSignupForm.reset();
    
    // Show login form
    showLoginForm();
    
    // Show success message
    showModal(`
        <h2>Déconnexion Réussie</h2>
        <p>Vous avez été déconnecté avec succès.</p>
        <button class="btn" onclick="closeModal()">Continuer</button>
    `);
    
    console.log('Logout completed successfully');
}

// Form event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('Legal Services App loaded successfully');
    
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    const savedUserType = localStorage.getItem('userType');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        userType = savedUserType;
        showMainApp();
    }
    
    // Initialize login form with lawyer login by default
    switchToLawyerLogin();
    
    // Signup form handler
    document.getElementById('lawyerSignupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            firstName: document.getElementById('signupFirstName').value,
            lastName: document.getElementById('signupLastName').value,
            email: document.getElementById('signupEmail').value,
            phone: document.getElementById('signupPhone').value,
            specialization: document.getElementById('signupSpecialization').value,
            location: document.getElementById('signupLocation').value,
            experience: document.getElementById('signupExperience').value,
            hourlyRate: document.getElementById('signupHourlyRate').value,
            barNumber: document.getElementById('signupBarNumber').value,
            password: document.getElementById('signupPassword').value,
            confirmPassword: document.getElementById('signupConfirmPassword').value
        };
        
        // Validation
        if (formData.password !== formData.confirmPassword) {
            showModal(`
                <h2>Erreur de Validation</h2>
                <p>Les mots de passe ne correspondent pas.</p>
                <button class="btn" onclick="closeModal()">Fermer</button>
            `);
            return;
        }
        
        if (registeredLawyers.find(l => l.email === formData.email)) {
            showModal(`
                <h2>Email Déjà Utilisé</h2>
                <p>Un compte existe déjà avec cet email.</p>
                <button class="btn" onclick="closeModal()">Fermer</button>
            `);
            return;
        }
        
        if (signup(formData)) {
            showModal(`
                <h2>Compte Créé avec Succès !</h2>
                <p>Votre compte avocat a été créé et vous êtes maintenant connecté.</p>
                <p><strong>Note:</strong> Votre compte sera vérifié par notre équipe dans les 24h.</p>
                <button class="btn" onclick="closeModal()">Continuer</button>
            `);
        }
    });
    
    // Client signup form handler
    document.getElementById('clientSignupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            firstName: document.getElementById('clientSignupFirstName').value,
            lastName: document.getElementById('clientSignupLastName').value,
            email: document.getElementById('clientSignupEmail').value,
            phone: document.getElementById('clientSignupPhone').value,
            city: document.getElementById('clientSignupCity').value,
            commune: document.getElementById('clientSignupCommune').value,
            legalNeed: document.getElementById('clientSignupLegalNeed').value,
            password: document.getElementById('clientSignupPassword').value,
            confirmPassword: document.getElementById('clientSignupConfirmPassword').value
        };
        
        // Validation
        if (formData.password !== formData.confirmPassword) {
            showModal(`
                <h2>Erreur de Validation</h2>
                <p>Les mots de passe ne correspondent pas.</p>
                <button class="btn" onclick="closeModal()">Fermer</button>
            `);
            return;
        }
        
        if (registeredClients.find(c => c.email === formData.email)) {
            showModal(`
                <h2>Email Déjà Utilisé</h2>
                <p>Un compte client existe déjà avec cet email.</p>
                <button class="btn" onclick="closeModal()">Fermer</button>
            `);
            return;
        }
        
        if (clientSignup(formData)) {
            showModal(`
                <h2>Compte Client Créé avec Succès !</h2>
                <p>Votre compte client a été créé et vous êtes maintenant connecté.</p>
                <p><strong>Email de test:</strong> pierre.lumumba@email.com</p>
                <p><strong>Mot de passe:</strong> client123</p>
                <button class="btn" onclick="closeModal()">Continuer</button>
            `);
        }
    });
}); 