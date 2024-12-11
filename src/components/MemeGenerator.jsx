import { useEffect, useState } from "react";

export default function MemeGenerator() {
  const [topText, setTopText] = useState("")
  const [bottomText, setBottomText] = useState("")
  const [randomImage, setRandomImage] = useState("http://i.imgflip.com/1bij.jpg")
  const [isLoading, setIsLoading] = useState(false)
  const [allMemesImg, setAllMemesImg] = useState([])

  useEffect(() => {
    setIsLoading(true)
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const {memes} = response.data
        setAllMemesImg(memes)
      })
      .then(() => setIsLoading(false))
  }, [])

  const handleChange = (event) => {
    const {name, value} = event.target;
    if(name === "topText") {
      setTopText(value)
    } else if(name === "bottomText") {
      setBottomText(value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const randomNumber = Math.floor(Math.random() * allMemesImg.length)
    const randomMeme = allMemesImg[randomNumber].url
    setRandomImage(randomMeme)

  }

  return(
    <div className="meme-generator-container">
      <form className="meme-form" onSubmit={handleSubmit}>
        <input
          className="flex-wrap"        
          name="topText"
          type="text"
          placeholder="Top Text"
          value={topText}
          onChange={handleChange}
        />

        <input
          className="flex-wrap"
          name="bottomText"
          type="text"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={handleChange}
        />

        <button className="flex-wrap">Generate</button>
      </form>

      <div className="meme-container">
        <img src={randomImage} alt="meme-image" />
        <h1 className="top-text">{topText.toUpperCase()}</h1>
        <h1 className="bottom-text">{bottomText.toUpperCase()}</h1>
      </div>
    </div>
  )
}