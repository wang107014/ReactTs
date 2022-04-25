import React, { useEffect } from 'react';
import DragTarget from './dragTarget';
import DropTarget from './dropTarget';
import BasicTemplate from '@/pages/Drag/baseCompents/template'
import './index.less'

interface IProps {
  name?: string
}

const Container: React.FC<IProps>=(props: IProps) => {
  useEffect (() => {
    console.log (props)
  }, []);
  return (
    <div className='container'>
      <div className='sidebar'>
        {
          BasicTemplate.map((item,index)=>(
            <DragTarget itemValue={{...item}} key={index}/>
          ))
        }
      </div>
      <DropTarget/>
    </div>
  );
};
export default Container;
