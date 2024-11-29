In diesem Projekt wurde eine Website entwickelt, die das Sprachenlernen unterstützt. Derzeit können Anwender zwischen den Sprachen Deutsch und Englisch wählen, wobei die Struktur der Plattform eine einfache Skalierung auf weitere Sprachen ermöglicht.

Die Website bietet eine interaktive Lernumgebung mit folgenden Funktionen:

- **Grammatiklektionen:** Spielerisches und strukturiertes Lernen grammatikalischer Regeln.
- **Vokabeltraining:** Effektives Üben von Vokabeln mit wiederholbarem Feedback.
- **Spiele:** Abwechslungsreiche Übungen, die den Lernprozess unterhaltsam und motivierend gestalten.

Die Website wurde als Progressive Web App (PWA) entwickelt. Sie ist vollständig responsiv, passt sich also an verschiedene Bildschirmgrößen (z. B. Smartphone, Tablet, Desktop) an, und nutzt einen Service Worker, um Offline-Funktionen und eine verbesserte Leistung zu ermöglichen. Dank dieser Eigenschaften kann die Website wie eine native App genutzt werden.

---

### Tech-Stack
#### Frontend:
- React
- Bootstrap
#### Backend:
- Node.js mit Express.js
#### Datenbank:
- MongoDB

---

### Projektstruktur
#### Client
- src
  - components/ # Wiederverwendbare UI-Komponenten
  - config/ # Konfigurationsdateien
  - context/ # React Context für globale Zustände
  - hooks/ # Eigene React Hooks
  - images/ # Bilder und Assets
  - pages/ # Seiten
  - sevices/ # Service-Funktionen für API-Kommunikation
  - styles/ # CSS Styles
  - translations/ # Übersetzungsdateien für Mehrsprachigkeit
  - utils/  # Hilfsfunktionen
  - App.js # Hauptkomponente
  - index.js # Einstiegspunkt
  - Routes.js # Definiert die Routen und Navigation der App.
  - setupProxy.js # Konfiguration für Proxy-Einstellungen
  - swDev.js # Registriert und konfiguriert den Service Worker

#### Server
- server/
  - common/        # Gemeinsame Funktionen und Konstanten
  - controllers/  # Logik für die Verarbeitung von API-Anfragen
  - model/        # MongoDB-Modelle und Schema-Definitionen
  - connectdb.js # Verbindungslogik zur MongoDB-Datenbank
  - server.js     # Einstiegspunkt für den Server

---

### Beschreibung des Funktionsumfanges
- Profil des Benutzers: Das Benutzerprofil enthält den Benutzernamen, eine Kurzbiografie, ein Profilbild, die Muttersprache, die Lernsprache und die eigenen Karteikarten. Der Benutzer kann selbst entscheiden, ob er seine Muttersprache, seine Lernsprache, eine Kurzbio oder seine Karteikarten öffentlich teilen möchte.
- Das Login ermöglicht es dem Benutzer, sich in die Website einzuloggen.
- Der Benutzer kann ein Konto erstellen, mit dem er die Website besuchen kann. Seine Fortschritte werden dort gespeichert.
- Grammatik: Der Benutzer soll aus vorgegebenen Wörtern einen grammatikalisch richtigen Satz bilden.
- Karteikarten: Der Benutzer kann selbst Karteikarten erstellen und diese optional öffentlich zugänglich machen. Er kann die Karteikarten durcharbeiten und wenn er die Karte richtig beantworten konnte, klickt er die Karte als “verstanden” an. Wenn er sie nicht beantworten konnte, klickt er sie als “schwierig” an. Die als “schwierig” markierten Karten werden dem Benutzer am Ende des Stapels noch einmal angezeigt, bis er alle Karten als “verstanden” markiert hat. Das Spiel kann auch vorher beendet werden.
- Wortschatz: Der Wortschatz der zu lernenden Sprache soll in Deutsch/Englisch übersetzt werden. Aus einer Vielzahl von Vokabeln sind die richtigen Übersetzungen auszuwählen (single choice / multiple choice). Alle Funktionen können auch umgekehrt durchgeführt werden, z.B. Vokabeln aus dem Deutschen/Englischen in die zu lernende Sprache übersetzen.
- Spiele: Es gibt verschiedene Spiele, um Vokabeln zu lernen.
    - Spiel 1: Übersetzung innerhalb der vorgegebenen Zeit. Ziel ist es, so viele Vokabeln wie möglich in der vorgegebenen Zeit zu vervollständigen. Vor dem Start kann eingestellt werden, welche Karten enthalten sind. Am Ende erhält man eine Übersicht, wie viel man geschafft hat und welche falsch waren.
    - Spiel 2: Die Karten liegen offen aus. Einmal auf Deutsch und einmal auf Englisch. Ziel ist es nun, die richtigen Karten einander zuzuordnen. Auch hier kann wieder entschieden werden, welche Karten verwendet werden.

---

### Zukünftige Anpassungen
- Rangliste (Leaderboard): Der Benutzer kann mit anderen Benutzern in einer Rangliste um die beste Platzierung wetteifern. Gewertet wird, wie viele Vokabeln, Karteikarten und Grammatikübungen der Benutzer gemacht hat. Je höher die Zahl, desto besser die Platzierung.
- Errungenschaften: Nach Abschluss einer Lektion erhält der Nutzer eine Auszeichnung für die Lektion. Diese kann in seinem Profil angezeigt werden.
- Chat: Die Nutzer können sich untereinander austauschen.
- Mehrere Fremdsprachen: Der Benutzer hat die Möglichkeit, zwischen mehreren Sprachen zu wählen.

---

### HOW TO RUN
1. Laden Sie Node-JS für Ihr System herunter und installieren Sie es: https://nodejs.org/en/download/current
2. Führen Sie die Datei [INIT.bat](./INIT.bat) aus, um den Client zu installieren.
3. Führen Sie nun [START.bat](./START.bat) aus, um den Server und den Client zu starten.


