import './App.css'
import Header from './ui/Header'
import TestPage from './pages/TestPage'
import ResultPage from './pages/ResultPage'
import { useState, useEffect } from 'react'


function App() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth < 490 ? true : false);

  const [currentPage, setCurrentPage] = useState('test');

  const [testPageKey, setTestPageKey] = useState(0);

  const [mode, setMode] = useState('time');
  const [totalTimer, setTotalTimer] = useState(30);
  const [totalWords, setTotalWords] = useState(25);

  const [resultData, setResultData] = useState({ rawWpm: 0, wpm: 0, accuracy: 0, characters: [0, 0], time: 0 });

  const fullResultData = { ...resultData, mode: `${mode}${mode === 'time' ? totalTimer : totalWords}` };


  const [isModalOpened, setIsModalOpened] = useState(false);


  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {

    const handleMouseMove = () => {
      setIsTyping(false);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  useEffect(() => {
    if (windowWidth) {
      if (windowWidth < 490) {
        setIsMobileScreen(true);
      }
      else {
        setIsMobileScreen(false);
      }
    }
  }, [windowWidth])

  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, [])



  function handleTestPageReRender() {
    setTestPageKey(testPageKey + 1);
  }

  return (
    <>
      {
        isModalOpened && (
          <div className='absolute min-h-screen w-full bg-dark-unfocused z-10'>

          </div>
        )
      }
      <div className={`flex flex-col min-h-screen bg-light-primary dark:bg-dark-primary text-white px-14 py-8 ${isTyping ? 'cursor-none' : 'cursor-default'} transition-all duration-100`}>
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} reRenderTestPage={handleTestPageReRender} isMobileScreen={isMobileScreen} isTyping={isTyping} />

        {
          currentPage === 'test' ? <TestPage key={testPageKey} setCurrentPage={setCurrentPage} mode={mode} setMode={setMode} totalTimer={totalTimer} setTotalTimer={setTotalTimer} totalWords={totalWords} setTotalWords={setTotalWords} setResultData={setResultData} windowWidth={windowWidth} isMobileScreen={isMobileScreen} setIsModalOpened={setIsModalOpened} isTyping={isTyping} setIsTyping={setIsTyping} />
            : <ResultPage setCurrentPage={setCurrentPage} resultData={fullResultData} />
        }

      </div>
    </>
  )
}

export default App;
