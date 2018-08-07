/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { getPhrasingContentSchema, createBlock, getBlockAttributes } from '@wordpress/blocks';
import { InspectorControls, InnerBlocks } from '@wordpress/editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';
import './theme.scss';
import { name as rowName } from './row';
import { name as cellName, settings as cellSettings } from './cell';

const tableContentSchema = {
	tr: {
		children: {
			th: {
				children: getPhrasingContentSchema(),
			},
			td: {
				children: getPhrasingContentSchema(),
			},
		},
	},
};

const tableSchema = {
	table: {
		children: {
			thead: {
				children: tableContentSchema,
			},
			tfoot: {
				children: tableContentSchema,
			},
			tbody: {
				children: tableContentSchema,
			},
		},
	},
};

export const name = 'core/table';

export const settings = {
	title: __( 'Table' ),
	description: __( 'Insert a table -- perfect for sharing charts and data.' ),
	icon: 'editor-table',
	category: 'formatting',

	attributes: {
		hasFixedLayout: {
			type: 'boolean',
			default: false,
		},
	},

	supports: {
		align: true,
	},

	transforms: {
		from: [
			{
				type: 'raw',
				selector: 'table',
				schema: tableSchema,
				transform( node ) {
					const rows = Array.from( node.querySelectorAll( 'tr' ) );

					const block = createBlock( name, {}, rows.map( ( row ) => {
						const cells = Array.from( row.querySelectorAll( 'td,th' ) );

						return createBlock( rowName, {}, cells.map( ( cell ) => {
							const blockAttributes = getBlockAttributes( cellSettings, cell.outerHTML );

							return createBlock( cellName, blockAttributes );
						} ) );
					} ) );

					return block;
				},
			},
		],
	},

	edit( { attributes, setAttributes, className } ) {
		const { hasFixedLayout } = attributes;

		const toggleFixedLayout = () => {
			setAttributes( { hasFixedLayout: ! hasFixedLayout } );
		};

		const classes = classnames( className, {
			'has-fixed-layout': hasFixedLayout,
		} );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Table Settings' ) } className="blocks-table-settings">
						<ToggleControl
							label={ __( 'Fixed width table cells' ) }
							checked={ !! hasFixedLayout }
							onChange={ toggleFixedLayout }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ classes }>
					<InnerBlocks
						template={ [ [ rowName ], [ rowName ] ] }
						templateLock="all"
						allowedBlocks={ [ rowName ] }
					/>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const classes = classnames( {
			'has-fixed-layout': attributes.hasFixedLayout,
		} );

		return (
			<table className={ classes }>
				<tbody>
					<InnerBlocks.Content />
				</tbody>
			</table>
		);
	},
};
