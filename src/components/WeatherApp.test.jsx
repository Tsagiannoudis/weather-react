import { describe, it, expect } from 'vitest';
import WeatherApp from './WeatherApp';

describe('WeatherApp', () => {
	it('renders correctly', () => {
		const component = shallow(<WeatherApp />);
		expect(component).toMatchSnapshot();
	});

	it('displays the correct temperature', () => {
		const component = shallow(<WeatherApp temperature={25} />);
		expect(component.find('.temperature').text()).toBe('25°C');
	});
});