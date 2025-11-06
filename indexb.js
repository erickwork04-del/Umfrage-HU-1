// Variante B: OHNE Würfel
// Liste der Fragen
const fragen = [
    "Wählen Sie eine Antwort",
    "Nutzen Sie regelmäßig KI-Tools?",
    "Haben Sie Vertrauen in KI?",
    "Ist KI in Ihrem Alltag wichtig?",
    "Würden Sie KI beruflich einsetzen?",
    "Sehen Sie KI positiv?"
];

let currentFrageIndex = 0;
let answers = [];
let sessionId = generateSessionId();
let variant = sessionStorage.getItem('surveyVariant') || 'B';

const button1 = document.getElementById("1");
const button2 = document.getElementById("2");
const antwortenDiv = document.getElementById("antwortenListe");
const frageDiv = document.getElementById("Frage");
const progressBar = document.getElementById("progressBar");
const errorMessage = document.getElementById("errorMessage");
const backButton = document.querySelector(".back-button");

// Generiere eindeutige Session ID
function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Konvertiere Antwort-Code zu Text
function formatAnswer(code) {
    return code === 1 ? "Ja" : "Nein";
}

// Initialisierung
frageDiv.textContent = fragen[currentFrageIndex];
updateProgressBar();
updateQuestionCounter();

// Eventlistener für Buttons
button1.addEventListener("click", () => saveAntwort(1));
button2.addEventListener("click", () => saveAntwort(2));
backButton.addEventListener("click", zurueckButton);

// Zurück Button Funktion
function zurueckButton() {
    if (currentFrageIndex > 0) {
        answers.pop();
        
        currentFrageIndex--;
        frageDiv.textContent = fragen[currentFrageIndex];
        
        button1.disabled = false;
        button2.disabled = false;
        
        updateProgressBar();
        updateAntwortenAnzeige();
        updateQuestionCounter();
        hideError();
    }
}

// Antwort speichern
function saveAntwort(antwort) {
    answers.push(antwort);
    updateAntwortenAnzeige();
    updateProgressBar();
    naechsteFrage();
}

function updateAntwortenAnzeige() {
    const formattedAnswers = answers.map(formatAnswer);
    antwortenDiv.textContent = formattedAnswers.join(", ");
}

function naechsteFrage() {
    currentFrageIndex++;
    if (currentFrageIndex < fragen.length) {
        frageDiv.textContent = fragen[currentFrageIndex];
        updateQuestionCounter();
    } else {
        frageDiv.textContent = "Vielen Dank für Ihre Teilnahme!";
        button1.disabled = true;
        button2.disabled = true;
        
        // Speichere Ergebnisse lokal
        saveResultsLocally();
    }
}

function updateProgressBar() {
    const progress = (answers.length / fragen.length) * 100;
    progressBar.style.width = progress + "%";
}

function updateQuestionCounter() {
    const counterElement = document.querySelector(".card.upper p");
    if (counterElement) {
        counterElement.textContent = `Frage ${currentFrageIndex + 1} / ${fragen.length}`;
    }
}

// Speichere Ergebnisse im LocalStorage
function saveResultsLocally() {
    const formattedAnswers = answers.map(formatAnswer);
    
    const result = {
        sessionId: sessionId,
        variant: variant,
        timestamp: new Date().toISOString(),
        startTime: sessionStorage.getItem('surveyStartTime'),
        answers: formattedAnswers,
        diceRolls: [], // Keine Würfel in Variante B
        rawAnswers: answers
    };
    
    // Hole existierende Ergebnisse
    let allResults = JSON.parse(localStorage.getItem('surveyResults') || '[]');
    allResults.push(result);
    localStorage.setItem('surveyResults', JSON.stringify(allResults));
    
    console.log('Ergebnisse gespeichert:', result);
    console.log('Alle Ergebnisse:', allResults);
    
    showSuccess("Umfrage erfolgreich abgeschlossen!");
    
    // Optional: Nach 3 Sekunden zur Startseite
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
}

function showError(message) {
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = "block";
        errorMessage.style.color = "#FF3B30";
        errorMessage.style.background = "rgba(255, 59, 48, 0.1)";
        errorMessage.style.borderColor = "rgba(255, 59, 48, 0.2)";
        setTimeout(hideError, 3000);
    }
}

function hideError() {
    if (errorMessage) {
        errorMessage.style.display = "none";
    }
}

function showSuccess(message) {
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = "block";
        errorMessage.style.color = "#28a745";
        errorMessage.style.background = "rgba(40, 167, 69, 0.1)";
        errorMessage.style.borderColor = "rgba(40, 167, 69, 0.2)";
    }
}