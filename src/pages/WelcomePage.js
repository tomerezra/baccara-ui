import React from 'react'
import SplitText from 'react-pose-text'
const charPoses = {
  exit: { opacity: 0, y: 20 },
  enter: {
    y:0,
    opacity: 1,
    transition: ({ charInWordIndex }) => ({
      type: 'spring',
      delay: charInWordIndex * 30,      
      stiffness: 500 + charInWordIndex * 150,      
      damping: 10 - charInWordIndex * 1    })
  }
};

function WelcomePage(props) {
  
  setTimeout(()=>{
    props.history.push('/login')
},3000)
  return (
    <div className='welcome' >
     <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
        Welcome
      </SplitText>
    </div>
  )
}

export default WelcomePage
