// server.js
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { json } from 'body-parser';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // Or Express if you prefer
	.use(
		compression({ threshold: 0 }),
		json(),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, (err) => {
		if (err) console.log('error', err);
	});
