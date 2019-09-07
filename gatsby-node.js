/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');
const slash = require('slash');

exports.createPage = async ({ graphql, actions }) => {
	const { createPage } = actions;
	
	const result = await graphql(`
		{
			allWordpressPost {
				edges {
					node {
						id
						slug
						status
						template
						format
					}
				}
			}
		}
	`);

	if ( result.errors ) {
		throw new Error( result.error );
	}

	const { allWordpressPost } = result.data;

	const postTemplate = path.resolve('./src/template/post.js');

	allWordpressPost.edges.forEach(edge => {
		createPage({
			path: `/${edge.node.slug}/`,
			component: slash(postTemplate),
			context: {
				id: edge.node.id
			}
		})
	})
}
