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

✅ After first page load: meme image element with attribute `data-test-id="meme-image"` found and visible
✅ After first page load: image loading on page load for meme image element with attribute `data-test-id="meme-image"` and `src="https://api.memegen.link/buzz/come_on/type_something.webp"`
✅ After first page load: top text label element containing text `Top text` found and visible
✅ After first page load: bottom text label element containing text `Bottom text` found and visible
✅ After first page load: top text input element found and visible
✅ After first page load: bottom text input element found and visible
✅ After first page load: template selector label element containing text `Meme template` found and visible
✅ After entering top text: image `src` changed
❗️ After entering top text: image `src` of `https://api.memegen.link/aag/such%20meme/type_something.webp` did not contain valid URL including `such meme`
✅ After entering bottom text: image `src` changed
❗️ After entering bottom text: image `src` of `https://api.memegen.link/aag/such%20meme/wow.webp` did not contain valid URL including `such meme` and `wow`
✅ After typing `doge` and pressing enter: image `src` changed
❗️ After selecting `doge` template: image `src` of `https://api.memegen.link/doge/such%20meme/wow.webp` did not contain valid URL including `such meme`, `wow` and `doge`
❗️ After checking image `src`: button element with text `Download` not found or not visible

### Solutions

- Try replacing empty string with '%20':
- Remove download icon from button: removed the icon, sadly `<i className="fa fa-download" />`
- Changed on changed to onkeydown in order to get the image ONLY when enter is pressed

It should allow the user to:

- [ ] Enter text for the top and bottom of the meme
  - [ ] The top text box needs to have a label element associated with it containing the text `Top text`
  - [ ] The bottom text box needs to have a label element associated with it with the text `Bottom text`
  - [ ] Both text boxes should be empty when the page first loads
- [ ] Preview the generated meme
  - [ ] The image element needs to have an html attribute set as follows: `data-test-id="meme-image"`
    - [ ] This image element should show a working image when the page first loads
- [ ] Change the meme template (the background image)
  - [ ] The meme template selector element needs to have a label element associated with it containing the text `Meme template`
  - [ ] If the user follows the steps below, the `doge` meme template needs to be selected:
    1. Click on the label of the meme template selector
    2. Clear any existing value (eg. with a text box)
    3. Type the text `doge`
    4. Hit enter
- [ ] Download the meme by clicking on a button
  - [ ] The button element needs to contain the text `Download`
