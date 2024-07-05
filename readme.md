### instalacja

1. sklonuj repo
2. zabij na wszelki wypadek wszystkie dockery
3. w terminalu w katalogu wpisz : npx wp-env start

- jak chcesz wyłączyć npx wp-env destroy

#### Strona jest na : http://localhost:8888/wp-admin

- admin = admin
- password = password

4. w terminalu w katalogu wpisz : npm i
5. w terminalu w katalogu wpisz : npm build
6. Zaloguj się
7. włącz theme
8. Wejdź na stronę settings>>permalink , przełącz na post-name i zapisz zmiany.

Napisałem też taki skrypt w golangu (main.go) który zrobi post requesty i wgra przykładowe dane.
Skompilowałem do pliku wykonawczego na windows : main.exe .

### EndPointy

- change http://localhost:8888 to page url

#### Academies

- http://localhost:8888/wp-json/studiowac/v1/academy
- http://localhost:8888/wp-json/studiowac/v1/academy_faculty
- http://localhost:8888/wp-json/studiowac/v1/academy_course
- http://localhost:8888/wp-json/studiowac/v1/academy_contact
- http://localhost:8888/wp-json/studiowac/v1/academy_tab
- http://localhost:8888/wp-json/studiowac/v1/academy_promo
- http://localhost:8888/wp-json/studiowac/v1/advert
- http://localhost:8888/wp-json/studiowac/v1/academy_extended

#### Carousel

http://localhost:8888/wp-json/studiowac/v1/carousel

#### Logos

http://localhost:8888/wp-json/studiowac/v1/logo_platinum
http://localhost:8888/wp-json/studiowac/v1/logo_gold
http://localhost:8888/wp-json/studiowac/v1/logo_silver
http://localhost:8888/wp-json/studiowac/v1/logo_bronze

#### Randomowe posty :

##### Z paramaterm orderby

- http://localhost:8888/wp-json/studiowac/v1/random-posts?exclude=1&categories=8,6

##### lub bez orderby

- http://localhost:8888/wp-json/studiowac/v1/random-posts?exclude=1&categories=8,6&orderby=rand

##### Ostatnie posty

- http://localhost:8888/wp-json/studiowac/v1/random-posts?exclude=1&categories=8,6&orderby=latest

## todo

zmień metadata catagorii na icon

data starsza niż rok display : none

endpoint do linków

    desktop mobile

xl: large screen max 32px, small screen min 24px.  
l : large screen max 24px, small screen min 18px.  
m : large screen max 20px, small screen min 16px.  
s : large screen max 16px, small screen min 14px.
xs: large screen max 14px, small screen min 12px.

--min-screen: 25rem;
--max-screen: 78rem;
--font-xl: clamp(1.5rem, calc(1.5rem + (2rem - 1.5rem) _ ((100vw - 25rem) / (78rem - 25rem))), 2rem);
--font-l: clamp(1.125rem, calc(1.125rem + (1.5rem - 1.125rem) _ ((100vw - 25rem) / (78rem - 25rem))), 1.5rem);
--font-m: clamp(1rem, calc(1rem + (1.25rem - 1rem) _ ((100vw - 25rem) / (78rem - 25rem))), 1.25rem);
--font-s: clamp(0.875rem, calc(0.875rem + (1rem - 0.875rem) _ ((100vw - 25rem) / (78rem - 25rem))), 1rem);
--font-xs: clamp(0.75rem, calc(0.75rem + (0.875rem - 0.75rem) \* ((100vw - 25rem) / (78rem - 25rem))), 0.875rem);
