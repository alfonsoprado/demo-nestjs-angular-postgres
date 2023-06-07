import * as ms from 'ms';
import * as dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export function msValidator(value) {
	const [input, unit] = value.split(/(\d+)/).filter(Boolean);
	const values: string[] = ['ms', 's', 'm', 'h', 'd', 'w', 'y'];
	if (!values.includes(unit) || input === '' || isNaN(input)) {
		throw new Error(
			`Environment variable must be one of the following values: ${values.join(
				',',
			)}`,
		);
	}
	return ms(value);
}

export function dayjsValidator(value): duration.Duration {
	const [input, unit] = value.split(/(\d+)/).filter(Boolean);
	const values: string[] = [
		'days',
		'weeks',
		'months',
		'years',
		'hours',
		'minutes',
		'seconds',
		'milliseconds',
	];
	if (!values.includes(unit)) {
		throw new Error(
			`Environment variable must be one of the following values: ${values.join(
				',',
			)}`,
		);
	}

	return dayjs.duration(input, unit);
}
