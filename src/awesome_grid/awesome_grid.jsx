import React, { useEffect, useState } from 'react';
import classes from './awesome_grid.module.css';

const SIZE = 50;

export const AwesomeGrid = ({}) => {
	const [columns, setColumns] = useState(
		Math.floor(document.body.clientWidth / SIZE)
	);
	const [rows, setRows] = useState(
		Math.floor(document.body.clientHeight / SIZE)
	);

	useEffect(() => {
		// TODO Debounce
		const onResize = () => {
			setColumns(Math.floor(document.body.clientWidth / SIZE));
			setRows(Math.floor(document.body.clientHeight / SIZE));
		};
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	return (
		<div className={classes.backgroundContainer}>
			<div
				className={classes.background}
				style={{
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
