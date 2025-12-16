// =====================================================
// 🎯 QUIZ ANGEL DUST - LOGIQUE COMPLÈTE
// =====================================================

// =====================================================
// 📊 ÉTAPE 0 : VARIABLES GLOBALES
// =====================================================

// Tableau qui contiendra TOUTES les questions de la langue choisie
let questions = [];

// Index de la question actuellement affichée (0 = première question)
let currentQuestionIndex = 0;

// Tableau des réponses de l'utilisateur (null = pas encore répondu)
let userAnswers = [];

// Ville saisie par l'utilisateur (affichée dans les résultats)
let userCountry = "";

// Langue choisie
let selectedLanguage = "";

// Liste des pays pour l'autocomplétion du champ country
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"
];

// =====================================================
// 🌐 ÉTAPE 1 : TEXTES TRADUITS (FR / EN / NL / SP)
// =====================================================

// Tous les textes dynamiques du quiz, regroupés par langue
const translations = {
  fr: {
    countryTitle: "Votre pays :",
    resultsTitle: "Résultats du quiz",
    finalScore: "Score final :",
    country: "Pays :",
    pleaseEnterCountry: "Veuillez entrer votre pays !",
    pleaseSelectAnswer: "Sélectionnez une réponse !",
    restartBtn: "Relancer",
    questionWord: "Question"
  },
  en: {
    countryTitle: "Your country:",
    resultsTitle: "Quiz Results",
    finalScore: "Final score:",
    country: "Country:",
    pleaseEnterCountry: "Please enter your country!",
    pleaseSelectAnswer: "Please select an answer!",
    restartBtn: "Reset",
    questionWord: "Question"
  },
  nl: {
    countryTitle: "Uw land:",
    resultsTitle: "Quizresultaten",
    finalScore: "Eindscore:",
    country: "Stad:",
    pleaseEnterCountry: "Voer je stad in!",
    pleaseSelectAnswer: "Selecteer een antwoord!",
    restartBtn: "Reset",
    questionWord: "Vraag"
  },
  sp: {
    countryTitle: "Su país:",
    resultsTitle: "Resultados del cuestionario",
    finalScore: "Puntuación final:",
    country: "País:",
    pleaseEnterCountry: "¡Introduce su país!",
    pleaseSelectAnswer: "¡Selecciona una respuesta!",
    restartBtn: "Reiniciar"
  }
};

// =====================================================
// 📥 ÉTAPE 2 : CHARGEMENT DES QUESTIONS DEPUIS JSON
// =====================================================

// Charge les questions depuis le fichier JSON selon la langue
async function loadQuestionsFromJSON(lang) {
  console.log("➡️ [ÉTAPE 2] Chargement questions pour", lang);

  try {
    // 1. Récupère le fichier JSON
    const response = await fetch("./assets/json/angelDust_quiz.json");

    // 2. Vérifie qu'il existe
    if (!response.ok) {
      throw new Error("❌ Fichier JSON introuvable");
    }

    // 3. Convertit en objet JS
    const data = await response.json();

    // 4. Cherche le bloc correspondant à la langue
    const entry = data.find(block => block.lang === lang);

    // 5. Vérifie qu'il y a bien un tableau de questions
    if (!entry || !Array.isArray(entry.questions)) {
      throw new Error(`❌ Pas de questions pour la langue ${lang}`);
    }

    // 6. Stocke les questions
    questions = entry.questions;

    // 7. Initialise userAnswers avec autant d'entrées que de questions
    userAnswers = new Array(questions.length).fill(null);

    console.log(`✅ ${questions.length} questions prêtes pour ${lang}`);
  } catch (error) {
    // 8. Gestion d'erreur
    console.error("💥 ERREUR JSON :", error);
    alert("Problème lors du chargement des questions.");
  }
}

// =====================================================
// 🏠 ÉTAPE 3 : AUTOCOMPLÉTION CHAMP pays
// =====================================================

// Ajoute une autocomplétion (avec souris + clavier) sur un input
function autocomplete(inp, arr) {
  // Index de l'élément actuellement "actif" dans la liste (pour ↑ / ↓)
  let currentFocus = -1;

  // Ferme toutes les listes de suggestions actuellement ouvertes
  function closeAllLists(elmnt) {
    const lists = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < lists.length; i++) {
      if (elmnt !== lists[i] && elmnt !== inp) {
        if (lists[i].parentNode) {
          lists[i].parentNode.removeChild(lists[i]);
        }
      }
    }
    // Quand on ferme la liste, on réinitialise le focus
    currentFocus = -1;
  }

  // Ajoute la classe .autocomplete-active à l'élément courant
  function addActive(x) {
    if (!x || !x.length) return;
    // D'abord, on retire l'état actif de tous les éléments
    removeActive(x);

    // Si on dépasse les bornes, on boucle
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;

    // On ajoute la classe qui met en évidence la ligne
    x[currentFocus].classList.add("autocomplete-active");
  }

  // Retire la classe .autocomplete-active de tous les éléments
  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  // Quand on tape dans le champ (saisie souris/clavier)
  inp.addEventListener("input", function () {
    // 1. Ferme les anciennes listes
    closeAllLists();
    const val = this.value;

    // 2. Si moins de 3 caractères, on ne propose rien
    if (val.length < 3) return;

    // 3. Crée le conteneur de suggestions
    const list = document.createElement("div");
    list.className = "autocomplete-items";
    this.parentNode.appendChild(list);

    // 4. Parcourt toutes les communes
    arr.forEach(item => {
      if (item.toUpperCase().startsWith(val.toUpperCase())) {
        const div = document.createElement("div");

        // 4.1 Partie saisie en gras, reste normal
        div.innerHTML = `<strong>${item.substr(0, val.length)}</strong>${item.substr(val.length)}`;

        // 4.2 Input caché pour garder la valeur complète
        div.innerHTML += `<input type="hidden" value="${item}">`;

        // 4.3 Clic souris sur une suggestion → remplit le champ
        div.addEventListener("click", () => {
          inp.value = div.querySelector("input").value;
          closeAllLists();
        });

        // 4.4 Ajoute la suggestion à la liste
        list.appendChild(div);
      }
    });
  });

  // Gestion des touches ↑ / ↓ / Enter pour naviguer dans les suggestions
  inp.addEventListener("keydown", function (e) {
    // Récupère toutes les suggestions visibles
    const x = document.querySelectorAll(".autocomplete-items div");
    if (!x.length) return;

    if (e.key === "ArrowDown") {
      // Flèche bas → on avance dans la liste
      currentFocus++;
      addActive(x);
      e.preventDefault(); // Empêche le déplacement du curseur dans l'input
    } else if (e.key === "ArrowUp") {
      // Flèche haut → on recule dans la liste
      currentFocus--;
      addActive(x);
      e.preventDefault();
    } else if (e.key === "Enter") {
      // Enter → on valide l'élément actif si présent
      e.preventDefault();
      if (currentFocus > -1 && x[currentFocus]) {
        x[currentFocus].click();
      }
    }
  });

  // Clic n'importe où ailleurs dans le document → ferme la liste
  document.addEventListener("click", e => closeAllLists(e.target));
}

// =====================================================
// 🚀 ÉTAPE 4 : INITIALISATION GLOBALE (DOM READY)
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ [ÉTAPE 4] DOM prêt - Initialisation");

  // -----------------------------------------------------
  // 🔧 4.1 : Récupération des éléments HTML
  // -----------------------------------------------------

  // Écran 1 : choix de langue
  const quizChoice = document.getElementById("quiz-choice");

  // Écran 2 : saisie ville
  const countryContainer = document.getElementById("country-container");
  const countryInput = document.getElementById("country-input");
  const startQuizBtn = document.getElementById("start-quiz-btn");

  // Écran 2.2 : quiz (zone principale)
  const quizMainContainer = document.getElementById("quiz-main-container");
  const quizStep = document.getElementById("quiz-step");

  // Barre de progression
  const progressBar = document.getElementById("progressBar");
  const percent = document.getElementById("percent");

  // Écran 3 : résultats
  const resultContainer = document.getElementById("result-container");
  const resultsQuestions = document.getElementById("results-questions");
  const restartBtn = document.getElementById("restart-btn");

  // Textes dynamiques
  const countryTitleEl = document.getElementById("country-title");
  const resultsTitleEl = document.getElementById("results-title");
  const finalScore = document.getElementById("final-score");
  const currentCountryEl = document.getElementById("current-country");

  // -----------------------------------------------------
  // 🏗️ 4.2 : État initial des écrans
  // -----------------------------------------------------

  quizChoice.style.display = "flex";       // Écran de choix de langue visible
  countryContainer.style.display = "none";    // Écran ville caché
  quizMainContainer.style.display = "none";// Quiz caché
  resultContainer.style.display = "none";  // Résultats cachés

  // -----------------------------------------------------
  // 🏘️ 4.3 : Fonctions de transition d'écrans
  // -----------------------------------------------------

  // Affiche l'écran ville après choix de langue
  function showCountryStep() {
    console.log("➡️ [ÉTAPE ville] Écran affiché");
    quizChoice.style.display = "none";
    countryContainer.style.display = "block";
    countryTitleEl.textContent = translations[selectedLanguage].countryTitle;
    // Change le placeholder
    const countryLabel = translations[selectedLanguage].country.replace(/:$/, "");
    countryInput.placeholder = countryLabel;
    autocomplete(countryInput, countries);
  }

  // =====================================================
  // 🎨 4.4 : Affichage d'une question + progression
  // =====================================================

  function loadQuestion(index) {
    // Sécurité : s'il n'y a pas de questions, on ne fait rien
    if (!questions || questions.length === 0) return;

    const q = questions[index];

    // -------------------------------
    // 📊 1) Barre de progression
    // -------------------------------

    // Texte de progression
    percent.textContent = `${translations[selectedLanguage].questionWord} ${index + 1} / ${questions.length}`;

    // Pourcentage de progression
    const progressPercent = ((index + 1) / questions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    // Gestion des classes de couleur sur le texte :
    // - par défaut : couleur thème (classe .percent-default)
    // - à 100 % : texte blanc (classe .percent-white)
    percent.classList.remove("percent-default", "percent-white");
    if (progressPercent >= 100) {
      percent.classList.add("percent-white");
    } else {
      percent.classList.add("percent-default");
    }

    // -------------------------------
    // 🎨 2) Construction du contenu de la question
    // -------------------------------

    quizStep.innerHTML = `
      <h2 id="question-text">${q.text}</h2>
      <div class="choices" id="answers"></div>
      <div class="arrow">
        <img src="./assets/img/arrow-left.png" alt="Précédent" id="prev-btn"
            style="display: ${index === 0 ? 'none' : 'inline-block'};">
        <img src="./assets/img/arrow-right.png" alt="Suivant" id="next-btn">
      </div>
    `;

    // -------------------------------
    // 🔌 3) Événements sur les flèches
    // -------------------------------

    document.getElementById("next-btn").addEventListener("click", nextBtnHandler);
    if (index > 0) {
      document.getElementById("prev-btn").addEventListener("click", prevBtnHandler);
    }

    // -------------------------------
    // 📝 4) Génération des réponses
    // -------------------------------

    const answersEl = document.getElementById("answers");

    q.options.forEach((option, i) => {
      const inputId = `q${index}-opt${i}`;

      // Input radio
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = i;
      input.id = inputId;

      // Restaure la réponse utilisateur si elle existe
      if (userAnswers[index] === i) {
        input.checked = true;
      }

      // Label cliquable
      const label = document.createElement("label");
      label.htmlFor = inputId;
      label.textContent = option;

      // Ordre important pour les styles CSS :checked + label
      answersEl.appendChild(input);
      answersEl.appendChild(label);
    });
  }

  // =====================================================
  // 🧮 4.5 : Affichage des résultats
  // =====================================================

  function showResults() {
    console.log("🏁 [ÉTAPE résultats] Calcul...");

    // 1. Calcul du score
    let score = 0;
    questions.forEach((q, i) => {
      if (userAnswers[i] === q.correct) score++;
    });

    // 2. Modale uikit permettant à l'utilisateur de savoir s'il a réussi ou raté
    // 2.1 Création de la modale
    const total = questions.length;
    const successThreshold = Math.ceil(total * 0.6); // réussite à 60%

    if (score >= successThreshold) {
      switch (selectedLanguage) {
        case "en":
          title = "🎉 Congratulations!";
          message = `Well done! You passed the quiz with ${score}/${total} correct answers.`;
          break;
        case "nl":
          title = "🎉 Proficiat!";
          message = `Goed gedaan! Je bent geslaagd met ${score}/${total} juiste antwoorden.`;
          break;
        case "sp":
          title = "🎉 ¡Felicidades!";
          message = `¡Muy bien! Has aprobado el cuestionario con ${score}/${total} respuestas correctas.`;
          break;
        default:
          title = "🎉 Félicitations !";
          message = `Bravo ! Vous avez réussi le quiz avec ${score}/${total} bonnes réponses.`;
      }
    } else {
      switch (selectedLanguage) {
        case "en":
          title = "😕 Too bad...";
          message = `You got ${score}/${total}. Try again to do better!`;
          break;
        case "nl":
          title = "😕 Jammer...";
          message = `Je behaalde ${score}/${total}. Probeer opnieuw om beter te doen!`;
          break;
        case "sp":
          title = "😕 Qué lástima...";
          message = `Has obtenido ${score}/${total}. ¡Inténtalo de nuevo para mejorar!`;
          break;
        default:
          title = "😕 Dommage...";
          message = `Vous avez obtenu ${score}/${total}. Retentez votre chance pour faire mieux !`;
      }
    }


    // 2.2 Contenu HTML de la modale
    const modalContent = `
    <div id="quiz-result-modal" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">${title}</h2>
        <p>${message}</p>
        <p class="uk-text-right">
          <button class="uk-button uk-button-primary uk-modal-close" type="button">OK</button>
        </p>
      </div>
    </div>
  `;

    // 2.3 Ajout dynamique de la modale dans le DOM
    const tmpDiv = document.createElement("div");
    tmpDiv.innerHTML = modalContent;
    document.body.appendChild(tmpDiv);

    // 2.4 Affichage de la modale
    UIkit.modal("#quiz-result-modal").show();


    // 3. Mise à jour des textes
    resultsTitleEl.textContent = translations[selectedLanguage].resultsTitle;
    finalScore.textContent = `${translations[selectedLanguage].finalScore} ${score}/${questions.length}`;
    currentCountryEl.textContent = `${translations[selectedLanguage].country} ${userCountry}`;
    restartBtn.textContent = translations[selectedLanguage].restartBtn;

    // 4. Liste détaillée des questions / réponses
    resultsQuestions.innerHTML = "";

    questions.forEach((q, i) => {
      const userAns = userAnswers[i];

      const block = document.createElement("div");
      block.className = "question-result";

      const heading = document.createElement("h3");
      heading.textContent = `Q${i + 1}: ${q.text}`;
      block.appendChild(heading);

      const optionsContainer = document.createElement("div");
      optionsContainer.className = "options-container";

      q.options.forEach((option, idx) => {
        const inputId = `r${i}-opt${idx}`;

        const input = document.createElement("input");
        input.type = "radio";
        input.disabled = true;
        input.id = inputId;
        input.checked = userAns === idx;

        const label = document.createElement("label");
        label.htmlFor = inputId;

        if (idx === q.correct) {
          label.classList.add("is-true");
        } else if (userAns === idx && idx !== q.correct) {
          label.classList.add("is-false");
        }

        label.textContent = option;

        optionsContainer.appendChild(input);
        optionsContainer.appendChild(label);
      });

      block.appendChild(optionsContainer);
      resultsQuestions.appendChild(block);
    });

    // 5. Affiche les résultats, cache le quiz
    quizMainContainer.style.display = "none";
    resultContainer.style.display = "block";
  }

  // =====================================================
  // ▶️ 4.6 : Gestionnaires de navigation du quiz
  // =====================================================

  // Démarre le quiz après saisie de la ville
  function startQuizHandler() {
    console.log("▶️ Démarrage quiz");

    const country = countryInput.value.trim();

    if (!country) {
      alert(translations[selectedLanguage].pleaseEnterCountry);
      return;
    }

    userCountry = country;
    countryContainer.style.display = "none";
    quizMainContainer.style.display = "block";

    currentQuestionIndex = 0;
    loadQuestion(0);
  }

  // Clic sur "Suivant"
  function nextBtnHandler() {
    console.log("➡️ Next (Q", currentQuestionIndex + 1, ")");

    const selected = document.querySelector('input[name="answer"]:checked');

    if (!selected) {
      alert(translations[selectedLanguage].pleaseSelectAnswer);
      return;
    }

    userAnswers[currentQuestionIndex] = parseInt(selected.value, 10);

    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      loadQuestion(currentQuestionIndex);
    } else {
      showResults();
    }
  }

  // Clic sur "Précédent"
  function prevBtnHandler() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      loadQuestion(currentQuestionIndex);
    }
  }

  // =====================================================
  // 🖱️ 4.7 : Écouteurs d'événements globaux
  // =====================================================

  // Clic sur "English"
  quizChoice
    .querySelector("#en")
    .addEventListener("click", async () => {
      selectedLanguage = "en";
      await loadQuestionsFromJSON("en");
      showCountryStep();
    });

  // Clic sur "Français"
  quizChoice
    .querySelector("#fr")
    .addEventListener("click", async () => {
      selectedLanguage = "fr";
      await loadQuestionsFromJSON("fr");
      showCountryStep();
    });

  // Clic sur "Nederlands"
  quizChoice
    .querySelector("#nl")
    .addEventListener("click", async () => {
      selectedLanguage = "nl";
      await loadQuestionsFromJSON("nl");
      showCountryStep();
    });

  // Clic sur "Español"
  quizChoice
    .querySelector("#sp")
    .addEventListener("click", async () => {
      selectedLanguage = "sp";
      await loadQuestionsFromJSON("sp");
      showCountryStep();
    });

  // Clic sur l'icône "check" (démarrer le quiz)
  startQuizBtn.addEventListener("click", startQuizHandler);

  // Clic sur "Relancer"
  restartBtn.addEventListener("click", () => {
    console.log("🔄 Reset complet");

    currentQuestionIndex = 0;
    userAnswers = [];
    userCountry = "";
    selectedLanguage = "";
    questions = [];
    countryInput.value = "";

    resultContainer.style.display = "none";
    countryContainer.style.display = "none";
    quizMainContainer.style.display = "none";
    quizChoice.style.display = "flex";
  });

  console.log("🚀 Quiz prêt (autocomplétion clavier + souris, progression, résultats)");
});
