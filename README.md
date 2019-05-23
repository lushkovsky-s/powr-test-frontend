# Frontend task

## Getting started

Using yarn
```
cd PROJECT_DIR
yarn install
yarn start
```

Using npm
```
cd PROJECT_DIR
npm install
npm run start
```

The project will be started on http://localhost:3000

## JSON loading

To load your JSON schema, copy-paste it inside the textarea below the "Build from your JSON" header and click on the button "Build"

Sample JSON to test:
```
{
  "type": "container",  
  "items": [
    {
      "type": "box",
      "color": "red"
    },
    {
      "type": "container",
      "items": [
          {
              "type": "box", 
              "color": "green"
          },
          {
              "type": "container",
              "items": []
          }
      ]
    }
  ]
}
```

## JSON dump

You can copy the JSON version of the demo state, using the output inside the texarea below the "Dump as JSON" header.
This JSON is automaticly refreshed on any demo state change.