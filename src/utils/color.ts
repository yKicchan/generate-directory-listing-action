type Colored = (v: string) => string;

export default {
	black: (v) => `\x1b[30m${v}\x1b[0m`,
	red: (v) => `\x1b[31m${v}\x1b[0m`,
	green: (v) => `\x1b[32m${v}\x1b[0m`,
	yellow: (v) => `\x1b[33m${v}\x1b[0m`,
	blue: (v) => `\x1b[34m${v}\x1b[0m`,
	magenta: (v) => `\x1b[35m${v}\x1b[0m`,
	cyan: (v) => `\x1b[36m${v}\x1b[0m`,
	white: (v) => `\x1b[37m${v}\x1b[0m`,
} satisfies {
	[x: string]: Colored;
};
