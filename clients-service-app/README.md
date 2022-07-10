## Clients-Service-App

Clients-Service-App is app, which manage users info.

### Table of Contents
* [Prerequisites](#Prerequisites)
* [Tech Stack](#Tech-Stack)
* [Getting Started](#Getting-Started)
* [Project Structure](#Project-Structure)

#
### Prerequisites

*  *Node JS @16.X and up*
*  *npm @8 and up*
*  *typescript @4 and up*

#
### Tech Stack

* *Angular @ 13.0.0 - front-end framework*

#
### Getting Started
1. First of all you need to clone app repository from github:
```
git clone https://github.com/nikanoza/Client-Service-app.git
```
2. Next step requires install all the dependencies.

```
npm install
```
3. Open app locally

```
ng serve
```

#
### Project Structure

```
|--- app
|   |--- clients # clients list component
|   |---|---client # client component
|   |---|---new-client # new client component
|   |--- error # error component
|   |--- guards # guards service functions
|   |--- menu # menu component
|   |--- models # model types
|   |--- services # request functions
- package.json     # dependency manager configurations
```
