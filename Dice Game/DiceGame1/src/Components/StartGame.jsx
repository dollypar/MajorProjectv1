import styled from "styled-components";

const StartGame = ({toggle}) => {
  return (
    <Container>
      <img
      src="/Images/dices1.png"
      />
      <div className="content">
        <h1>DICE GAME</h1>
        <Button
        onClick={toggle}>PLAY NOW</Button>
      </div>

    </Container>
    
  )
}

export default StartGame;

const Container= styled.div`
max-width:1180px;
display:flex;
margin:0 auto;
height:100vh;
align-items:center;

.content h1 {
  font-size: 100px;
}`;




const Button= styled.button`

width: Fixed (220px)px;
height: Hug (44px)px;
padding: 10px 18px 10px 18px;
gap: 10px;
border-radius: 5px 0px 0px 0px;
opacity: 0px;
background-color:Black;
color:white;
font-size:16px;
border:1px solid transparent;
transition: 0.5s background ease-in;
cursor:pointer;

&:hover{
background-color: white;
border:1px solid black;
color:black;
transition: 0.3s background ease-in;
}


`
