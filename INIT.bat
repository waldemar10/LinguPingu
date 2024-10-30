
REM Dieses Batch-Skript ändert das aktuelle Verzeichnis in "client" und startet eine neue Eingabeaufforderung, um npm-Pakete im Hintergrund zu installieren. Der Befehl "exit" wird verwendet, um die neue Eingabeaufforderung zu schließen, sobald die Installation abgeschlossen ist.
REM FILEPATH: /c:/dev/AWD-website/INIT.bat
cd client
start /B cmd /C npm install && exit
