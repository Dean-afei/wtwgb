"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";

import { Icon } from '@chakra-ui/react'
import { FaPlay,FaPause } from 'react-icons/fa'


const ANWSER = '这个问题没有一个确定的答案，因为世界的未来是由人类行为和全球事件的复杂交织所塑造的。虽然我们不能预测未来，但我们可以采取积极的行动来争取一个更好的未来。\n历史上，人类面临过各种各样的挑战，但我们也取得了很多进步。科学技术的发展使我们能够解决许多问题，改善生活质量，并保护环境。同时，人们在社会、政治和文化领域也在努力寻求进步和变革。\n然而，全球性问题如气候变化、资源短缺、社会不平等、政治紧张局势等依然存在，需要全球协作来解决。每个人都可以为创造一个更好的世界做出贡献，从个体行动，如减少资源浪费，到支持社会公平正义和参与社区服务等。\n最终，世界是否会变得更好，取决于全球社会的共同努力和决心。我们可以为创造一个更好的未来而努力工作，但也需要认识到在这个过程中可能会遇到挑战和障碍。希望随着时间的推移，人类能够共同合作，使这个世界更加美好。'

export default function Home() {
  const [text, setText] = useState(''); // 逐字添加的文本
  const [fullText, setFullText] = useState(ANWSER); // 完整文本
  const [currentIndex, setCurrentIndex] = useState(0); // 当前字符的索引
  const [palying,setPlaying] = useState(false)
  const audioRef = useRef<any>();

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(prevText => prevText + fullText.charAt(currentIndex));
        setCurrentIndex(prevIndex => prevIndex + 1);
      } else {
        clearInterval(timer); 
      }
    }, 100); 
    return () => clearInterval(timer); 
  }, [currentIndex, fullText]);

  useEffect(()=> {
    const audioElement = audioRef.current;
    audioElement.addEventListener('ended',()=>{
      setPlaying(false);
    });

    return ()=> {
      audioElement.removeEventListener('ended',()=>{
        setPlaying(false);
      });
    }
  })

  const handlePlay = () => {
    if(palying) {
      setPlaying(false);
      audioRef.current.pause();
    } else {
      setPlaying(true);
      audioRef.current.play();
    }
  }


  return (
    <main className="">
      <audio ref={audioRef} src="/audio/backgroundMusic.mp3"></audio>
      <div>
        这个世界会好吗——李志
         <Icon as={palying ? FaPause : FaPlay} onClick={handlePlay} cursor='pointer'/>
      </div>
     
      <p>
        {text.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
    </main>
  );
}
