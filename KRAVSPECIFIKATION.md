# Kravspecifikation – Limboda Samfällighet (App)

- **Version:** 1.3
- **Datum:** 2026-01-08

## 1. Syfte och mål

Appen ska användas av Limboda samfällighet för att:

- hantera vattenavläsningar,
- visa statistik,
- skapa fakturaunderlag,
- tillhandahålla viktiga kontaktuppgifter,
- kommunicera nyheter till medlemmar via PWA-pushnotiser.

## 2. Roller och behörigheter

### Standardanvändare

- Kan se vattenavläsningar för sitt hus.
- Kan se nyheter.
- Kan se sidan **Bra att ha**.

### Firmatecknare

- Har tillgång till statistik.
- Har tillgång till PDF-underlag.
- Har tillgång till fakturor.

### Styrelsen

- Kan skapa nyheter.
- Kan se lässtatus.
- Kan administrera innehåll på **Bra att ha**.

## 3. Vattenavläsning – användarsida

- Knapp: **Skicka in vattenavläsning** (öppnar formulär).
- Tabell: **Vattenförbrukning för Limboda XX** (XX = husnummer från användarprofilen).
- Tabellkolumner:
  - Datum
  - Periodisk förbrukning
  - Fakturabelopp
- Text under tabell: **Senaste mätarställning** (från senaste inskickade post för huset).

## 4. Formulär – Skicka in vattenavläsning

- **Adress:** Förifylld (Limbodavägen XX), ej redigerbar.
- **Datum:** Default = dagens datum, kan ändras.
- **Mätarställning:** Numeriskt, obligatoriskt.
- **Foto på mätare:** Valfri bilduppladdning.
- **Periodisk förbrukning** = Mätarställning – föregående mätarställning.
- **Förväntat fakturabelopp** = WaterCostPerM3 × Periodisk förbrukning + WaterPeriodCost.
- Första avläsningen per hus tillåts och ger periodisk förbrukning = 0.

## 5. Regler och validering

- Endast en avläsning per husnummer får registreras inom 20 dagar (baserat på inskickningsdatum).
- Negativ periodisk förbrukning är inte tillåten.

## 6. Statistik – firmatecknare

- Visar senaste avläsningen per husnummer, sorterat i nummerordning.
- Datum markeras om senaste avläsning är äldre än 20 dagar.
- Summering:
  - Total förbrukning
  - Totalt fakturabelopp

## 7. PDF-underlag och fakturor

- Knapp: **Spara underlag** (PDF: `Vattenavläsning_YYYY-MM-DD.pdf`).
- Knapp: **Ladda upp faktura från kommunen**.
- Filbibliotek visas med senaste filer överst.

## 8. Nyheter och pushnotiser (PWA)

- Styrelsen kan skapa nyheter.
- Nyheter med kategori **viktigt** skickas som pushnotis till alla användare med push aktiverat.

## 9. Lässtatus för viktiga nyheter (styrelsen)

- Badge **X/Y** visas på nyhetslistan för styrelsen.
- Detaljvy visar **Läst av X/Y** med popup som listar läst/inte läst.
- En nyhet räknas som läst först när den varit öppen i minst 2 sekunder.

## 10. Bra att ha – informationssida

Appen ska innehålla en sida med namnet **Bra att ha** som listar viktiga kontaktuppgifter och referensinformation för samfälligheten.

### Exempel på innehåll

- Försäkringsbolag (namn, telefonnummer, kundnummer)
- Bank (namn, telefonnummer, ev. kontaktperson)
- Andra viktiga leverantörer eller samhällskontakter

### Behörighet

- Alla användare kan se sidan.
- Endast styrelsen kan lägga till, redigera och ta bort poster.

### Formulärfält för en post

1. Företag
2. Telefonnummer
3. Kontaktperson (valfritt)
4. Kundnummer (valfritt)
5. Anteckningar (valfritt)

Poster ska visas i en lättöverskådlig lista och kunna uppdateras vid behov.

## 11. Icke-funktionella krav

- Behörighetskontroller ska göras server-side.
- Alla ändringar ska loggas med användare och tidpunkt.
- Lösningen ska fungera som PWA på mobil och desktop.
