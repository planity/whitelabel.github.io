import React from 'react';
import classes from './awesome_grid.module.css';
import { useWindowHeight } from '../../hooks/use_window_height.js';
import { useWindowWidth } from '../../hooks/use_window_width.js';

const SIZE = 50;

export const AwesomeGrid = () => {
	const { height } = useWindowHeight();
	const { width } = useWindowWidth();
	const columns = Math.floor(width / SIZE);
	const rows = Math.floor(height / SIZE);

	return (
		<div className={classes.backgroundContainer}>
			<div
				className={classes.background}
				style={{
					height,
					gridTemplate: `repeat(${rows}, 1fr)/repeat(${columns}, 1fr)`
				}}
			>
				{Array.from(Array(columns * rows)).map((_, index) => (
					<Tile key={index} index={index} columns={columns} />
				))}
			</div>
		</div>
	);
};

const Tile = ({ index, columns }) => {
	const x = index % columns;
	const y = Math.floor(index / columns);
	const delay = (x + y) * 50 + Math.random() * 100 + 1000;
	return (
		<div className={classes.tile} style={{ animationDelay: `${delay}ms` }} />
	);
};
