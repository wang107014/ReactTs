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
  const goHome = () => {
    history.push('/home')
  }
  return (
    <div>
      <div onClick={goHome}>
        点击跳转home
      </div>
      {project?.projectName}
    </div>
  );
};
export default Demo;
