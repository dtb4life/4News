import React, {useEffect, useRef} from 'react';
import * as Animatable from 'react-native-animatable';

export default function AnimatedText({activeSlide, title}) {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.pulse();
    }
  }, []);

  return (
    <Animatable.Text
      ref={textRef}
      style={{
        fontFamily: 'Inter-ExtraBold',
        padding: 8,
        textAlign: 'center',
        fontSize: 18,
        textShadowColor: 'rgba(0, 0, 255, 0.65)',
        textShadowOffset: {width: 4, height: 4},
        textShadowRadius: 4,
      }}>
      {title}
    </Animatable.Text>
  );
}
