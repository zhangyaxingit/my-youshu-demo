import React, { memo, useState, useCallback } from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import Dustbin from './Dustbin';
import Rubish from './Rubish';
import { ItemTypes } from './ItemTypes';
import update from 'immutability-helper';

console.log('NativeTypes', NativeTypes)

const Container = memo(function Container() {
    const [dustbins, setDustbins] = useState([
        { accepts: [ItemTypes.FRUIT], lastDroppedItem: null },
        { accepts: [ItemTypes.MEAT], lastDroppedItem: null },
        { accepts: [ItemTypes.DRINK, NativeTypes.FILE], lastDroppedItem: null },
    ]);

    const [food] = useState([
        { name: 'FRUIT', type: ItemTypes.FRUIT },
        { name: 'MEAT', type: ItemTypes.MEAT },
        { name: 'DRINK', type: ItemTypes.DRINK },
    ]);

    const [droppedBoxNames, setDroppedBoxNames] = useState([]);

    function isDropped(boxName) {
        return droppedBoxNames.indexOf(boxName) > -1;
    }

    const handleDrop = useCallback((index, item) => {
        const { name } = item;
        setDroppedBoxNames(update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }));
        setDustbins(update(dustbins, {
            [index]: {
                lastDroppedItem: {
                    $set: item,
                },
            },
        }));
    }, [droppedBoxNames, dustbins]);
    
    return (<div>
			<div style={{ overflow: 'hidden', clear: 'both' }}>
				{dustbins.map(({ accepts, lastDroppedItem }, index) => (<Dustbin accepts={accepts} lastDroppedItem={lastDroppedItem} onDrop={(item) => handleDrop(index, item)} key={index}/>))}
			</div>

			<div style={{ overflow: 'hidden', clear: 'both' }}>
				{food.map(({ name, type }, index) => (<Rubish name={name} type={type} isDropped={isDropped(name)} key={index}/>))}
			</div>
		</div>);
});


export default Container;

