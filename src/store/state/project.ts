export interface IProjectState {
  projectId: string; //  保存当前项目id
  projectName: string; //  保存当前项目名称
  projectAbbreviation: string; //  保存当前项目简写
}

const projectState: IProjectState = {
  projectId: "",
  projectName: "请先选择项目",
  projectAbbreviation: "",
};

export default projectState;
