# Weather (Almost fullstack) Application

## Project structure

The monorepo consists of two projects:

- web : Angular 17 application used for displaying weather data
- backend: SpringBoot application used for passing through requests between Angular client and OpenMeteo servers. This project is currently deprecated, irrelevant and unused in this project.

### Why monorepo?

Monorepo allows for easier change tracking and potential deploy flows.

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

### Headless / Hosted mode

The application offers functionalities in two different modes of operations: Headless and Hosted.
While in headless mode, the application consumes mentioned APIs directly, without needing to create an account. All user data is persisted in local storage, and is valid until that storage gets deleted

While in hosted mode, the application connects to SpringBoot service, which resembles a proxy between Angular web client and mentioned API the client consumes. User's data is persisted in a MongoDb database and available on all other devices.

While the consumer APIs were built to mirror the implementations of the providers to make data mapping on the client-side more consistent, the layered approach allows for additional flows, such as caching, polling or sharing data between users with similar requests.

None of those funcionalities are implemented at the given moment, but they could be in the future.

### Unit testing

The application uses `jest` + `ngspectator` for writing and running unit tests. However, due to time limitation and constant changes in models, test-driven approach of development wasn't applied.

### Running the application

The repository contains a `docker-compose.yml` file in itself. By running `docker-compose up`, SpringBoot service, Angular application and MongoDb stack get booted up, and the application is available to be used.
