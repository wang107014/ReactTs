import React, { useEffect, useState } from 'react';
import ComApi from '@/api/index'
import './index.less'

interface IProps {
  name?: string
}

const Home: React.FC<IProps>=(props: IProps) => {
  const [processList,setProcessList] = useState([])
  useEffect (() => {
    getProcessList().then()
  }, []);
  const getProcessList = async () => {
    const par = {}
    const res = await ComApi.processSearch(par)
    if (res) {
      setProcessList(res.data)
    }
  }
  return (
    <div className='home-body'>
      home
      {processList.map((item:any,index)=> (
        <div key={index}>
          <span>名称：{item.name}</span>
        </div>
      ))}
    </div>
  );
};
export default Home;
