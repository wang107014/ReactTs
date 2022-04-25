/*
 * @Description: 拖拽
 * @Author: 王明龙
 * @Date: 2022-4-25 15:40
 */
import React, { useEffect } from 'react';
import { DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from './compent/container'

interface IProps {
  name?: string
}

const Demo: React.FC<IProps>=(props: IProps) => {
  useEffect (() => {
    console.log (props)
  }, []);
  return (
    <div>
      <p style={{textAlign:"center",padding:'10px 0'}}>实现一个简单的可视化页面生成器<code>(简易版本，大致的架子，要想开发完整的，请自行在这基础上继续延伸)</code></p>
      <DndProvider backend={ HTML5Backend }>
        <Container/>
      </DndProvider>
    </div>
  );
};
export default Demo;
