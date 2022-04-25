/*
 * @Description: 代码编辑器
 * @Author: 王明龙
 * @Date: 2022-4-25 15:40
 */
import React, { useEffect,useState,useRef } from 'react';
import JSONEditor,{ JSONEditorOptions } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

interface IProps {
  name?: string
}

const Codemirror: React.FC<IProps>=(props: IProps) => {
  const jsonEditor = useRef<JSONEditor>(null);
  const container = useRef<HTMLDivElement>(null);
  const json = {
    'array': [1, 2, 3],
    'boolean': true,
    'null': null,
    'number': 123,
    'object': {'a': 'b', 'c': 'd'},
    'string': 'Hello World'
  }
  useEffect (() => {
    const options:JSONEditorOptions = {
      mode: 'tree',
      onChangeJSON
    };
    (jsonEditor.current as JSONEditor) = new JSONEditor(container.current!, options);
    jsonEditor.current!.set(json);
    return () => {
      jsonEditor && jsonEditor.current!.destroy();
    }
  }, []);
  const onChangeJSON = (val:any) =>{
    console.log(`val`, val)
  }
  return (
    <div>
      <div style={{height:'100%',width:'100%'}} ref={container} />
    </div>
  );
};
export default Codemirror;
