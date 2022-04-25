import React, { useEffect } from 'react';
import { tempalteType } from '@/pages/Drag/baseCompents/template'
import { useDrag } from 'react-dnd';
import SvgIcon from '@/components/svgIcon'
import './index.less'

interface IProps {
  itemValue: tempalteType
}

const DragTarget: React.FC<IProps>=(props: IProps) => {
  const {itemValue} = props
  useEffect (() => {
    console.log (props)
  }, []);
  const [, drager] = useDrag({
    type: "Box",
    item: itemValue
  });

  return (
    <div ref={drager} className='drapTarget'>
      <SvgIcon iconClass={itemValue.type} className='svg-style' />
      <p>{itemValue.title}</p>
    </div>
  );
};
export default DragTarget;
