# AWD-website

## HOW TO RUN
1. Laden Sie Node-JS für Ihr System herunter und installieren Sie es: https://nodejs.org/en/download/current
2. Führen Sie die Datei [INIT.bat](./INIT.bat) aus, um den Client zu installieren.
3. Führen Sie nun [START.bat](./START.bat) aus, um den Server und den Client zu starten.

## Projektbeschreibung
Unser Projekt soll eine Lernplattform für Sprachen (vorerst nur Englisch) werden. Auf der Website muss sich der Benutzer einloggen bzw. registrieren. Der Lernfortschritt wird in seinem Account gespeichert.

Die Plattform bietet die Möglichkeit, mit vorgefertigten Karteikarten zu lernen, kleine Grammatikübungen zu machen oder spielerisch Vokabeln zu lernen. Darüber hinaus haben die Nutzer die Möglichkeit, selbst Karteikarten zu erstellen und diese mit anderen Nutzern zu teilen.

Ein weiterer Aspekt ist das Profil. Jeder Nutzer hat ein eigenes Profil. Dort werden sein Benutzername und sein Profilbild öffentlich angezeigt. Weitere Informationen wie z.B. die Muttersprache, die Lernsprache und die selbst erstellten Karteikarten können auf Wunsch im Profil angezeigt werden. 

Das Ziel der Website ist es, dem Benutzer zu helfen, erfolgreich und mit Spaß eine neue Sprache zu lernen.

## Technologien
- Frontend:
    - React
    - Bootstrap

- Backend:
    - Node.js mit Express.js
    - MySQL 

## Beschreibung des Funktionsumfanges (detailliert)
- Profil des Benutzers: Das Benutzerprofil enthält den Benutzernamen, eine Kurzbiografie, ein Profilbild, die Muttersprache, die Lernsprache und die eigenen Karteikarten. Der Benutzer kann selbst entscheiden, ob er seine Muttersprache, seine Lernsprache, eine Kurzbio oder seine Karteikarten öffentlich teilen möchte.
- Das Login ermöglicht es dem Benutzer, sich in die Website einzuloggen.
- Der Benutzer kann ein Konto erstellen, mit dem er die Website besuchen kann. Seine Fortschritte werden dort gespeichert.
- Grammatik: Der Benutzer soll aus vorgegebenen Wörtern einen grammatikalisch richtigen Satz bilden.
- Karteikarten: Der Benutzer kann selbst Karteikarten erstellen und diese optional öffentlich zugänglich machen. Er kann die Karteikarten durcharbeiten und wenn er die Karte richtig beantworten konnte, klickt er die Karte als “verstanden” an. Wenn er sie nicht beantworten konnte, klickt er sie als “schwierig” an. Die als “schwierig” markierten Karten werden dem Benutzer am Ende des Stapels noch einmal angezeigt, bis er alle Karten als “verstanden” markiert hat. Das Spiel kann auch vorher beendet werden.
- Wortschatz: Der Wortschatz der zu lernenden Sprache soll in Deutsch/Englisch übersetzt werden. Aus einer Vielzahl von Vokabeln sind die richtigen Übersetzungen auszuwählen (single choice / multiple choice). Alle Funktionen können auch umgekehrt durchgeführt werden, z.B. Vokabeln aus dem Deutschen/Englischen in die zu lernende Sprache übersetzen.
- Spiele: Es gibt verschiedene Spiele, um Vokabeln zu lernen.
    - Spiel 1: Übersetzung innerhalb der vorgegebenen Zeit. Ziel ist es, so viele Vokabeln wie möglich in der vorgegebenen Zeit zu vervollständigen. Vor dem Start kann eingestellt werden, welche Karten enthalten sind. Am Ende erhält man eine Übersicht, wie viel man geschafft hat und welche falsch waren.
    - Spiel 2: Die Karten liegen offen aus. Einmal auf Deutsch und einmal auf Englisch. Ziel ist es nun, die richtigen Karten einander zuzuordnen. Auch hier kann wieder entschieden werden, welche Karten verwendet werden.
***
*Optional*
- Rangliste (Leaderboard): Der Benutzer kann mit anderen Benutzern in einer Rangliste um die beste Platzierung wetteifern. Gewertet wird, wie viele Vokabeln, Karteikarten und Grammatikübungen der Benutzer gemacht hat. Je höher die Zahl, desto besser die Platzierung.
- Errungenschaften: Nach Abschluss einer Lektion erhält der Nutzer eine Auszeichnung für die Lektion. Diese kann in seinem Profil angezeigt werden.
- Chat: Die Nutzer können sich untereinander austauschen.
- Mehrere Fremdsprachen: Der Benutzer hat die Möglichkeit, zwischen mehreren Sprachen zu wählen.

