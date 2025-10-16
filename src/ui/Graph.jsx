import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

function Graph({coords}) {
	const data = {
		datasets: [
			{
				data: coords,
				borderColor: '#E2B714',
				backgroundColor: '#646669',
				fill: false,
				tension: 0.3,
			}
		],
	};

	const options = {
		scales: {
			x: { type: 'linear', position: 'bottom', title: { display: true, text: 'Time (seconds)' } },
			y: { beginAtZero: true, title: { display: true, text: 'Words Per Minute (WPM)'} },
		},
		plugins: {
			legend: {display: false},
			tooltip: {
				callbacks: {
					title: ()=>'',
					label: (context) => {
						const x = context.parsed.x;
						const y = context.parsed.y;
						return `Time: ${x}s | WPM: ${y}`;
					},
				},
			},
		},
		responsive: true,
	};

	return <Line data={data} options={options} />;
}

export default Graph;