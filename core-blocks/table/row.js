/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { name as tableName } from '.';
import { name as cellName } from './cell';

export const name = 'core/table-row';

export const settings = {
	title: __( 'Table Row' ),

	parent: [ tableName ],

	icon: 'editor-table',

	description: __( 'A single column within a columns block.' ),

	category: 'common',

	supports: {
		className: false,
	},

	edit() {
		return (
			<InnerBlocks
				template={ [ [ cellName ], [ cellName ] ] }
				templateLock="all"
				allowedBlocks={ [ cellName ] }
			/>
		);
	},

	save() {
		return <tr><InnerBlocks.Content /></tr>;
	},
};
