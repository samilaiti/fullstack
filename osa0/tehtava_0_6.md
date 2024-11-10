sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: Convert form data to JSON data and send to server
    deactivate server

    Note right of browser: With JavaScript add form note to notes list and render page
