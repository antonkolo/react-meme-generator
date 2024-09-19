import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// styled components

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #040404;
    font-family: Roboto, sans-serif;
    font-size: 18px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #E7E7E7;
  }
`;

const Title = styled.h1`
  font-family: Lacquer, sans-serif;
  font-size: 40px;
  text-shadow: #ff9900 0px -4px 6px;
  margin-top: 24px;
  color: #ff9900;
  text-align: center;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 760px;
  min-width: 200px;
  max-width: 760px;
  margin-top: 100px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Label = styled.label`
  font-size: 16px;
`;

const Input = styled.input`
  box-sizing: border-box;
  font-size: 18px;
  height: 32px;
  width: 160px;
  padding: 4px 4px;
  margin-top: 10px;
  border-radius: 6px;
  border: none;
  background-color: #e5e5e5;
`;

const DownloadButton = styled.button`
  padding: 13px 20px;
  border-radius: 6px;
  color: #ff9900;
  background-color: #040404;
  border: 1px solid #ff9900;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #fff;
    border-color: #fff;
  }

  &:active {
    color: #fff;
    border-color: #fff;
    box-shadow: inset 0px 0px 0px 5px #fff;
    outline: none;
  }
`;

const Image = styled.img`
  width: 100%;
  max-height: 500px;
  margin-top: 56px;
  border-radius: 8px;
  box-shadow: #ff9900 0 0 40px 10px;
`;

// functions

async function downloadImage(imageSrc) {
  const image = await fetch(imageSrc);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement('a');
  link.href = imageURL;
  link.download = 'meme';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// track state of the whole link
// link consists of all inputs
// track state of each of the inputs
// try to store the link as an object and update just the separate parts???

export default function App() {
  const [imageLink, setImageLink] = useState({
    domain: 'https://api.memegen.link/images',
    template: 'buzz',
    topText: '',
    bottomText: '',
    format: 'webp',
  });

  return (
    <>
      <GlobalStyle />
      <Title>Meme Generator 🤡</Title>
      <Main>
        <Form>
          <InputWrapper>
            <Label htmlFor="template">Meme template</Label>
            <Input
              id="template"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  const currentValue = event.currentTarget.value.replaceAll(
                    ' ',
                    '_',
                  );
                  setImageLink({
                    ...imageLink,
                    template: currentValue,
                  });
                  event.preventDefault();
                }
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="text-top">Top text</Label>
            <Input
              id="text-top"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  const currentValue = event.currentTarget.value.replaceAll(
                    ' ',
                    '_',
                  );
                  setImageLink({
                    ...imageLink,
                    topText: currentValue,
                  });
                  event.preventDefault();
                }
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="text-bottom">Bottom text</Label>
            <Input
              id="text-bottom"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  const currentValue = event.currentTarget.value.replaceAll(
                    ' ',
                    '_',
                  );
                  setImageLink({
                    ...imageLink,
                    bottomText: currentValue,
                  });
                  event.preventDefault();
                }
              }}
            />
          </InputWrapper>

          <DownloadButton
            onClick={(event) => {
              event.preventDefault();
              downloadImage(
                `${imageLink.domain}/${imageLink.template}/${imageLink.topText}/${imageLink.bottomText}.${imageLink.format}`,
              ).catch((error) => console.log(error));
            }}
          >
            Download
          </DownloadButton>
        </Form>

        <Image
          src={`${imageLink.domain}/${imageLink.template}/${imageLink.topText ? imageLink.topText + '/' : '_/'}${imageLink.bottomText ? imageLink.bottomText + '/' : ''}`}
          data-test-id="meme-image"
        />
      </Main>
    </>
  );
}
