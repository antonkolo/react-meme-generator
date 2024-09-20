# TO-DOs

Create a web app with React that allows for users to generate and download memes using the https://memegen.link/ website.

- [ ] Import UseState and Styled Components
- [ ] Create the necessary components
  - [ ] Style Background
  - [ ] H1 (Title)
  - [ ] Input with label
    - [ ] Add different versions to app js (template, top, bottom)
  - [ ] Button to Download
  - [ ] Image

## Issues

### Solutions

- Try replacing empty string with '%20':
- Remove download icon from button: removed the icon, sadly `<i className="fa fa-download" />`
- Changed on changed to onkeydown in order to get the image ONLY when enter is pressed

### What should happen to the link, depending on different parts missing

https://api.memegen.link/images/doge/1/2/

1. Template missing: https://api.memegen.link/images/buzz/toptext/bottomtext.format
2. Top text missing: https://api.memegen.link/images/template/bottomtext.format
3. Bottom text missing: https://api.memegen.link/images/buzz/toptext.for
