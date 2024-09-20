import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// styled components

const GlobalStyle = createGlobalStyle`
  html {
  font-size: 16px;
  height: 100%;
  }

  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: #040404;
    font-family: Roboto, sans-serif;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #E7E7E7;
  }

  #root {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  form > *:not(:last-child) {
    margin-right: 16px;
  }
`;

const Title = styled.h1`
  font-family: Lacquer, sans-serif;
  font-size: 2.5rem;
  text-shadow: #ff9900 0px -4px 6px;
  margin: 0;
  position: absolute;
  top: 16px;
  color: #ff9900;
  text-align: center;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
`;

const Form = styled.form`
  width: 100%;
  min-width: 360px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  @media (min-width: 1300px) {
    justify-content: flex-start;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 8px;
  width: 30%;
  max-width: 200px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Input = styled.input`
  box-sizing: border-box;
  font-size: 1rem;
  height: 32px;
  width: 100%;
  padding: 4px 4px;
  margin-top: 10px;
  border: 1px solid #ff9900;
  border-radius: 6px;

  color: #e7e7e7;
  background-color: #040404;
  outline: none;

  &:focus {
    border-color: #fff;
  }
`;

const DownloadButton = styled.button`
  padding: 16px 64px;
  border-radius: 6px;
  margin-top: 32px;
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
  min-width: 360px;
  height: auto;
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
  const [template, setTemplate] = useState('buzz');

  const [imageLink, setImageLink] = useState({
    domain: 'https://api.memegen.link/images',
    template: 'buzz',
    topText: '_',
    bottomText: '_',
    format: 'webp',
  });

  return (
    <>
      <GlobalStyle />
      <Title>Meme Generator 🤡</Title>
      <Main>
        <Form
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
        >
          <InputWrapper>
            <Label htmlFor="template">Meme template</Label>
            <Input
              id="template"
              onChange={(e) => {
                const value = e.currentTarget.value;
                const newValue = value ? value : 'buzz';
                setTemplate(newValue);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setImageLink({
                    ...imageLink,
                    template: template,
                  });
                }
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="text-top">Top text</Label>
            <Input
              id="text-top"
              onChange={(e) => {
                const value = e.currentTarget.value;
                console.log(value);
                const newValue = value ? value : '_';
                setImageLink({
                  ...imageLink,
                  topText: newValue,
                });
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="text-bottom">Bottom text</Label>
            <Input
              id="text-bottom"
              onChange={(e) => {
                const value = e.currentTarget.value;
                const newValue = value ? value : '_';
                setImageLink({
                  ...imageLink,
                  bottomText: newValue,
                });
              }}
            />
          </InputWrapper>
        </Form>

        <Image
          src={`${imageLink.domain}/${imageLink.template}/${imageLink.topText}/${imageLink.bottomText}.${imageLink.format}`}
          data-test-id="meme-image"
        />
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
      </Main>
    </>
  );
}
