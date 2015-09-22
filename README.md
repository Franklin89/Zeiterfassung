# Zeiterfassung

URL: https://interfaces.azurewebsites.net/api/...

### Features
- Benutzer CRUD 
  - Sollarbeitszeit - done
- Projekt CRUD - delete pending
- Tätigkeiten CRUD - done
- Zeiterfassen mit Tätigkeit und Projekt (Eintrag Editieren / Löschen)
  - Pro Tag (navigierbar) 
  - Anwesenheit von/bis (soll den Benutzer unterstützen) - wird nicht umgesetzt
  - Erfassung nach Projekt und Tätigkeit ODER nur nach Tätigkeit - done aber immer mit projekt
- Anmelden mit Benutzername und Passwort - done
  - Ein Benutzeraccount für *Admin* - done
- Auswertung der Arbeitsstunden
  - Für *normale* Benutzer: nur eigene Zeit
  - Für *Admin*: Alle
  - Monatsansicht Benutzer/Projekt
  - Darstellung Zeitsaldo

### Mögliche Erweiterung
- Offline Modus
- Grafik für die Auswertung
- Berechtigungen
- Ausdrucken der Statistik
- Weitere Auswertungen (Jahresansicht)
- Konfiguration/Varianten Zeiterfassung (Templates, Vordefinierte Taetigkeiten, ...)

### Technologie
- Angular
- Bootstrap
- Backend: .NET WebAPI

### Allgemein
- Nur für Desktop
