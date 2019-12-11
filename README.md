
# Boids workshop

Test den her:
https://matsemann.github.io/boids-workshop/

Vi skal lage BOIDS, som betyr bird-oid object, eller et bird-like object.

Se PDFene for en intro.

## Begynne

Klon prosjektet.

```shell script
npm install
npm run dev
```

Gå til http://localhost:1234 

## Oppgaver

Om du står fast, sjekk git-historikken fra før jeg slettet løsningen, hehe.


### Komme i gang
Det er i `src/boid.js` man i hovedsak skal fylle inn kode, i funksjonene der.

Det man skal gjøre i hver funksjon, er å returnere en vector, som er "kraften" boiden skal dyttes med i en eller annen retning.
Kreftene fra de forskjellige funksjonene vektes så (kan styres med sliderne) og legges sammen, og brukes så for å endre farts-vektoren til boiden.

For å gjøre dette, har man litt å jobbe med

**Boid**: Disse har 2 nyttige funksjoner man kan kalle: `neighbor.getPos()` og `neighbor.getVel()`
Evt. for boiden man jobber med, er det da `this.getPos()` og `this.getVel()`
Disse to funksjonene returnerer henholdsvis en vektor som er x,y posisjonen til boiden, og en vektor som beskriver retning/farten til boiden.

(Obs: Bruk get-funksjonene, de returnerer en kopi som er trygg å jobbe med. Å bruke `this.pos` direkte kan kødde til simuleringen)

**Vector2d**:
Sjekk ut `vector2d.js` for diverse mulige operasjoner man kan gjøre med vektorne.

**Parameters**:
Sjekk ut toppen av `ui.js`, der har man verdiene for de forskjellige sliderne, som man også kan bruke i sine beregninger.



### 1. Alignment

Dette er å beregne retningen nabo-boidene rundt har, og så tilpasse seg det. Endre `calculateAlignmentForce(...)` i `src/boid.js`

Det man gjør er å finne gjennomsnitts-retningen til boidene rundt seg:
 * Så for hver nabo-boid, legg til nabo-boidens fartsvektor (`.getVel()`) i averageAlignment-vektoren (`.add(...)`).
 * Når det er gjort for alle naboer, kan vektoren normaliseres slik at den får lengde 1 (`.norm()`) men beholder snittretningen.
Det blir da slideren i GUIet som styrer hvor kraftige retningsforandringer denne kraften skal gi.

Når denne er klar, skal du kunne se at boidene etter hvert begynner å fly i samme retning.

### 2. Separation

Separation er å unngå å kollidere med boidene i nærheten.
Så man itererer over hver nabo-boid, og legger til en force som dytter boiden litt i retning fra nabo-boiden.

For å beregne den forcen per nabo: (dette er den mest kompliserte, altså!)
 * ta denne boiden sin posisjonsvektor, og så trekke fra (`sub(...)`) nabo-boidens posisjonvektor.
   f. eks om din posisjon er (10, 10), og naboen er (30, 30), får man da en vektor som er (-20, -20), som altså peker i stikk motsatt retning
 * finne lengden av den nye vektoren `.len()`, som da er avstanden mellom deg og nabo-boiden
 * bruke lengden til å beregne med hvor stor kraft man skal dytte. Om man er langt unna, trenger man ikke dytte hardt, men er man nærme vil man ha en kraftigere retningsforandring for å unngå kollisjon.
   Dette kan f. eks gjøres ved `kraft = (naboRadius - avstand) / naboRadius`, der naboRadius er `parameters.neighborRadius` som styres av slideren.
   For så å lage en kraftsvektor som dytter med riktig kraft i riktig retning, kan man ta vektoren man fant lengden av, og normalisere den `.norm()`. Da får man en vektor som peker i samme retning, men med 1 som lengde.
   Så kan man gange den med kraften man kom frem til, `.mul(kraft)`.
 * Legge til den beregnede kraftsvektoren i `separationForce`

Når du har implementert denne, skal du helst kunne se at de prøver å unngå å kræsje (må kanskje skru av sliderene for de andre tingene).

### 3. Cohesion

Cohesion er at en boid prøver å bevege seg nærmere de andre boidene rundt seg.
Høres kanskje motstridende ut med den forrige, men skal det bli en flokk kan man ikke bare unngå de andre.
Dette gjøres ved å finne gjennomsnittsposisjonen til en boid sine naboer, og så returnere en vektor som er en force som dytter boiden litt mot det punktet.

For å gjøre dette:
 * Først, om vi ikke har noen naboer returnerer vi bare en kraftløs kraft, for å unngå å dele på 0 senere.
 * Vi beregner gjennomsnittsposisjonen til naboene tilsvarende som vi fant gjennomsnittsretningen til naboene: Ved å lage en tom vektor (`new Vector2d(0,0)`) og så adde posisjonen til alle naboene til denne.
  Deretter dele vektoren på antall naboer (`.div(...`))
 * Så beregne en retningsvektor for hvordan boiden må dyttes ved å trekke boidens posisjon i fra dette gjennomsnittspunktet, og så normalisere vektoren etterpå
 * Returnere den normaliserte retningen (slik at vi lar slideren styre hvor mye cohesion force som brukes).
 
Når denne er gjort, skal man kunne skru av de andre og se at boidene klumper seg sammen. Med alt påskrudd, skal man kunne se en flocking oppførsel ved å tweake på sliderne.


### 4. Predator avoidance

Det å stikke av fra de røde boidene som prøver å fange de blå. 

For hver predator:
 * Sjekk avstanden (`predator.getPos()` for å finne dens posisjon, vector klassen har metoder for avstand). Om den er stor (over 50, kanskje?), trenger vi ikke gjøre noe, men om ikke:
 * Vi ønsker å bevege oss bort fra predatoren, så beregn en vektor som er motsatt retning. Det kan enten gjøres ved å ta boidens posisjon og trekke fra predatorens posisjon, eller finne vektoren mellom boidens posisjon og predatorens posisjon og rotere den 180 grader.
 * Legg til den vektoren i fleeForce
 * Etter å ha sjekket hva vi skal gjøre for alle predators, kan vi returnere fleeForce. Om vektoren er normalisert eller lav, kan det være verdt å gange den med en faktor slik at fleeForce blir stor og overkjører alt annet, det
  å unngå å bli spist er tross alt veldig viktig!
  

Musepekeren er en predator, kan teste oppførselen ved å dra den mot en flokk boids, eller justere så det er flere predators som flyr rundt.

### 5. Obstacle avoidance

Litt i samme gate som det å unngå en predator, men bare fordi vi ser en hindring foran oss trenger man jo ikke kaotisk flykte.
I stedet kan man beregne om man er på vei til å krasje, og så justere kursen bittelitt.

Så for hver obstacle:
 * Er den nærme nok til at jeg bør ta hensyn?
 * Hva er min retning i forhold til obstaclet?
   Det kan regnes ut ved å finne retningen til obstaclet, typ ved å ta posisjonen til det og trekke fra boidens posisjon.
   Og så kan man bruke `angle(...)` funksjonen på vektoren for å sammenligne den retningen med boidens retning (`this.getVel()`)-
 * Er avstanden liten nok (<100?), og vinkelen tilsier vi er på vei i mot den (f. eks. -60 til 60), bør vi gjøre en unnamanøver
 * Det kan gjøres ved å se legge til en force, som er den samme som boidens retning på nåværende tidspunkt, men rotert litt (`.rotate(...)`)
 


### Bonus?

Nabo-finne-funksjonen i boid.js kjøres for hver boid. Og den scanner igjennom alle andre boids for å finne
ut om de er i nærheten av hverandre. Dette blir O(n^2), og begrenser hvor mange boids vi kan ha.
Det finnes derimot måter å gjøre det bedre. En måte er å lage "bøtter", dele opp verdenen
i mindre ruter, og så sjekke boidene som er i samme rute eller naborutene.

Man kan dele opp disse rutene igjen i mindre ruter, det kalles for et Quadtree: https://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374
Det er artig, men kanskje litt overkill da vi uansett har ganske stor radius.