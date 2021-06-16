
import React, { memo } from 'react';
import { DropTarget } from 'react-dnd';
import './style.css'

const style = {
    height: '3rem',
    lineHeight: '3rem',
    width: '100%',
    color: '#222',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    userSelect:'none'
};

export const Dustbin = memo(function Dustbin({ accepts, lastDroppedItem, isOver, canDrop, connectDropTarget, tip}) {
    const isActive = isOver && canDrop;
    let backgroundColor = '#fff';
    if (isActive) {
        backgroundColor = '#7dbcea';
    }
    else if (canDrop) {
        backgroundColor = 'rgba(16, 142, 233, 1)';
    }

    return connectDropTarget(<div ref={connectDropTarget} style={{ ...style, backgroundColor }} role="Dustbin">
        {isActive
            ? '释放'
            : tip }
        {lastDroppedItem && (<div><h1 class='bar-title'>{lastDroppedItem.str}</h1></div>)}
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
