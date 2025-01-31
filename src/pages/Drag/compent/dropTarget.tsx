import React, { memo, useState, useCallback, } from "react";
import { useDrop } from "react-dnd";
import './index.less'
import GridLayout from "react-grid-layout";
import { toast } from "@/utils/function";
import RenderTemplate from "./renderTemplate";
import { Menu, Item, useContextMenu } from "react-contexify";
import { getRandomStr, isJsonVal, requestCode } from "@/utils/varbile";
import { Empty } from "antd";
import { spacing, clintWidth } from "@/pages/Drag/config";
import PopModel from "./popModel";
import { useSetState } from "@/hooks";
import "react-contexify/dist/ReactContexify.css";
import "react-grid-layout/css/styles.css";

export type spaceType = {
  x:number,
  y: number,
  id: string,
  w: number,
  h: number,
  [other:string] : any
}

export  interface popModelType<T extends object> {
  visible:boolean;
  dropTarget:T
}

export type partialSpaceType = Partial<spaceType>;

const DropTarget = memo(function DropTarget(props) {

  const [reviceData, setReviceData] = useState<spaceType[]>([]);

  const [currentMoveData, setCurrentMoveData] = useState<partialSpaceType>({});

  const [popModelVal, setPopModelVal] = useSetState<popModelType<partialSpaceType>>({ visible: false, dropTarget: {} });

  const [collectProps, droper] = useDrop({
    accept: "Box",
    collect: (minoter) => ({
      isOver: minoter.isOver(),
      canDrop: minoter.canDrop(),
      item: minoter.getItem(),
    }),
    drop: (item, monitor) => {
      const parentDiv = document.getElementById("dropers");
      const pointRect = parentDiv!.getBoundingClientRect();
      const dropX = ((monitor.getSourceClientOffset())!.x - pointRect.x) / spacing;
      const dropY = ((monitor.getSourceClientOffset())!.y - pointRect.y) / spacing;
      setReviceData((pre) => [
        ...pre,
        Object.assign({}, item, {
          x: dropX,
          y: dropY,
          id: getRandomStr(),
          w: (item as spaceType).w / spacing,
          h: (item as spaceType).h / spacing,
        }),
      ]);
    },
  });

  const { show } = useContextMenu({ id: "dropFloor" });

  const showMenu = (e:any) => {
    show(e);
  };

  const menuOption = (status:number) => {
    if (!isJsonVal(currentMoveData)) {
      toast(requestCode.failedCode, "请先点击或者选择画布中要拖拽的组件");
      return false;
    }
    if (status === 1) {
      const copyVal = reviceData.filter((item) => item.id === currentMoveData.i);
      setReviceData((pre) => [...pre, Object.assign({}, copyVal[0], { id: getRandomStr() })]);
    } else if (status === 2) {
      setReviceData((pre) => pre.filter((item) => item.id !== currentMoveData.i));
    } else {
      setReviceData([]);
      setCurrentMoveData({});
    }
  };

  const MyAwesomeMenu = useCallback(
    () => (
      <Menu id="dropFloor">
        <Item onClick={() => menuOption(1)}>复制</Item>
        <Item onClick={() => menuOption(2)}>删除</Item>
        <Item onClick={() => menuOption(3)}>清屏画布</Item>
      </Menu>
    ),
    [menuOption]
  );

  const handleDrag = useCallback((layout, oldItem, newItem) => {
    const currentVal = reviceData.filter((item) => item.id === newItem.i);
    setCurrentMoveData(newItem);
    setPopModelVal({ visible: true, dropTarget: Object.assign({}, currentVal[0] || {}, newItem) });
  },[]);

  return (
    <div style={{ width: "100%", height: "100%" }} onContextMenu={showMenu}>
      <div ref={droper} className='dropTarget' id="dropers">
        {reviceData.length ? (
          <>
            <GridLayout
              onDragStop={handleDrag}
              onDragStart={handleDrag}
              onResizeStop={handleDrag}
              rowHeight={spacing}
              cols={24}
              width={clintWidth}
              margin={[0, 0]}
            >
              {reviceData.map((item, index) => (
                <div
                  key={item.id}
                  data-grid={{
                    i: item.id,
                    x: item.x,
                    y: item.y,
                    w: item.w,
                    h: item.h,
                    resizeHandles: ["se", "s", "e"],
                  }}
                  style={{ background: "#fff" }}
                  className='dropGridItem'
                >
                  <RenderTemplate type={item.type} />
                </div>
              ))}
            </GridLayout>
            <MyAwesomeMenu />
          </>
        ) : (
          <Empty
            style={{ height: "100%", paddingTop: "200px" }}
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description="暂无数据，请添加组件到画布来吧"
          ></Empty>
        )}
      </div>
      <PopModel {...popModelVal} onClose={setPopModelVal} />
    </div>
  );
});

export default DropTarget;
