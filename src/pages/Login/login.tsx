import React, {useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {setProjectInfo} from "@/store/actions/project";
import { useHistory } from 'react-router-dom';

interface IProps {
  name?: string
}

const Demo: React.FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    sessionStorage.setItem('ut','NS9QrUJSgJZkDH4TdNYP0y2qMIc78KRyEnytYwqNurJ7RMJoyCNG4q4eKzk1QRS9')
    dispatch(setProjectInfo({
      projectId: '123',
      projectName: '项目名称',
      projectAbbreviation: 'BOE',
    }));
  }, []);
  const project = useSelector((store: any) => {
    return store.storeData.project;
  });
  const goHome = (path:string) => {
    history.push(path)
  }
  return (
    <div>
      <div onClick={() => {goHome('/home')}}>
        点击跳转home
      </div>
      <div onClick={() => {goHome('/drag')}}>
        点击跳转drag
      </div>
      <div onClick={() => {goHome('/codemirror')}}>
        点击跳转codemirror
      </div>
      {project?.projectName}
    </div>
  );
};
export default Demo;
