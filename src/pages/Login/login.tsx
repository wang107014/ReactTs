import React, {useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {setProjectInfo} from "@/store/actions/project";

interface IProps {
  name?: string
}

const Demo: React.FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const data = {
       name: '张三'
    }
    dispatch(setProjectInfo({
      projectId: '123',
      projectName: '项目名称',
      projectAbbreviation: 'BOE',
    }));
  }, []);
  const project = useSelector((store: any) => {
    return store.storeData.project;
  });
  return (
    <div>
      {project?.projectName}
    </div>
  );
};
export default Demo;
