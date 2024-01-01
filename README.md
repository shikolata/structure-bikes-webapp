# StructureBikesWebapp

Application url: https://structure-bikes-webapp-9906e812ecb1.herokuapp.com/

## Running Structure Bikes locally

Run `npm run start:dev` will start the dev server.

Navigate to `http://localhost:4200/`; the application will automatically reload if you change any of the source files.

## Features

- Tabular presentation with added features: search filter, pagination, sorting
- Navigation Bar
- View Bike
- Add Bike
- Edit Bike
- Delete Bike
- Internationalization, with language selector for English & Spanish
- Gallery
- Form Validation
- Weather widget (External API)

## In Progress / Nice to haves

- Advanced/specific search filters
- Design improvements
  - Better Carousel: Bootstrap ✔
- Upgrade to Angular 17 ✔
  - Components are now Standalone
  - Edit Bike Component is now Lazy Loaded
  - Self closing tags
  - Route Parameter Catching using @input: id
  - Converted to use AppConfig
  - DI using Inject (instead of constructors)
  - @if/@for statements in HTML (instead of directives)
  - Signal Store 
- Login & Registration

The git repo for the BE server: https://github.com/shikolata/structure-bikes-services
