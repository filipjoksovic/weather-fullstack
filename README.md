# Weather (Almost fullstack) Application

## Project structure
The monorepo consists of two projects:
  - web : Angular 17 application used for displaying weather data
  - backend: SpringBoot application used for passing through requests between Angular client and OpenMeteo servers. This project is currently deprecated, irrelevant and unused in this project.
Why monorepo? Monorepo allows for easier change tracking and potential deploy flows.

## Web application
Web application is written in the newest Angular 17 version. It's aim is to be as extensible, adaptable and reactive to model and data changes as much as possible.
The application utilizes OpenMeteo and Nominatim APIs, which are used for fetching weather data, location search, as well as reverse geocoding.

### Structure
The web application is split in folders by features they represent. Each folder represents one unit of functionality (current weather, forecast, user settings, etc...) and holds funcionality for only that piece of application.
Since Angular 17 moved to module-less architecture, components are designed to be standalone and importable into other components.

Each folder is divided into subfolders, `components`, `containers`, `services`, etc... which contain certain split functionality.

#### Approach to API usage
While modeling the API consumation, due to the nature of OpenMeteo's API, it was important that application stays open to expansion and model changes. Therefore, models related to OpenMeteo have been typed with that in mind, 
with extra checks in place, ensuring robustness of data throughout the application. Is the way that the responses/requests are typed overkill? Yes. Has it been a breeze adding new parameters to API while the application screams
at you because you typed one thing but forgot to type the other one? Also yes.

On the other hand, Nominatim API serves mostly static response body, which is why the response is typed in a more "standard" fashion.

### W.I.P Headless / Served mode
The application was initially supposed to serve while consuming either the SpringBoot backend or feeding directly from defined APIs. However, due to the time constraints, only the remnants of that functionality can be 
found throughout the abb.

### Unit testing
The application uses `jest` + `ngspectator` for writing and running unit tests. However, due to time limitation and constant changes in models, test-driven approach of development wasn't applied.

### Running the application
The web application can be run either directly or with Docker.
#### Running directly
To run the application directly, make sure that you have `node` installed, and in your terminal, run
```
  npm install
  npm run start
```
#### Running with Docker
To run application using Docker, make sure you're in the `web` folder.
While in `web` folder, run 
```
  docker build -t weather-web .
  docker run -p 4201:4200 weather-web
```
