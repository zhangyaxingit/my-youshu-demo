import React, { memo } from 'react';
import { DragSource } from 'react-dnd';
const style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
    userSelect:'none',
    // cursor: 'default'
};

export const Box = memo(function Box({ name, isDropped, isDragging, connectDragSource, }) {
    const opacity = isDragging ? 0.4 : 1;
    return connectDragSource(<div role="Box" style={{ ...style, opacity, cursor: !isDropped ? 'move': 'default'}} draggable={!isDropped}>
			{isDropped ? <s>{name}</s> : name}
		</div>);
});

// DragSource 三要素
// type：类型， 与目标target的accepts对应
// spec: beginDrag必写。返回一个拖动元素唯一标志的对象
// connect: 返回注入到BOX中的属性 connectDragSource 与 isDragging

export default DragSource(
    (props) => props.type,  // 这里source的type和 target的accepts是对应的，只有匹配到，才可以拖入
    {
        beginDrag: (props) => ({ name: props.name }),
    }, 
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    })
)(Box);
