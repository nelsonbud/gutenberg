/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { name as rowName } from './row';

export const name = 'core/table-cell';

export const settings = {
	title: __( 'Table Cell' ),

	description: __( 'Add some basic text.' ),

	parent: [ rowName ],

	icon: 'editor-table',

	category: 'common',

	keywords: [ __( 'text' ) ],

	supports: {
		className: false,
	},

	attributes: {
		content: {
			type: 'object',
			source: 'rich-text',
			selector: 'td,th',
		},
	},

	edit( { attributes, setAttributes } ) {
		return (
			<RichText
				value={ attributes.content }
				onChange={ ( content ) => {
					setAttributes( { content } );
				} }
				placeholder={ __( 'Add cell content' ) }
			/>
		);
	},

	save( { attributes } ) {
		return (
			<RichText.Content tagName="td" value={ attributes.content } />
		);
	},
};
