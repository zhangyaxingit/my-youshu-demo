
import React, { memo } from 'react';
import { DropTarget } from 'react-dnd';
const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    border: '1px solid red',
    color: '#222',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
    userSelect:'none'
};
export const Dustbin = memo(function Dustbin({ accepts, lastDroppedItem, isOver, canDrop, connectDropTarget, }) {
    const isActive = isOver && canDrop;
    let backgroundColor = '#fff';
    if (isActive) {
        backgroundColor = 'darkgreen';
    }
    else if (canDrop) {
        backgroundColor = 'darkkhaki';
    }

    return connectDropTarget(<div ref={connectDropTarget} style={{ ...style, backgroundColor }} role="Dustbin">
			{isActive
                ? '释放'
                : ` ${accepts.join(', ')}垃圾箱`}

			{lastDroppedItem && (<p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>)}
		</div>);
});

// DropTarget 三要素
// type：类型， 与source中的的type对应
// spec: 可选，用来描述
// connect: 返回注入到BOX中的属性 connectDragSource 与 isDragging
export default DropTarget(
    (props) => props.accepts, 
    {
        drop(props, monitor) {
            props.onDrop(monitor.getItem());
        },
    }, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    })
)(Dustbin);
