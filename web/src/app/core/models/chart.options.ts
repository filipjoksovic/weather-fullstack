import { ChartOptions } from 'chart.js';

export const getDefaultChartOptions = (
  displayTicks: boolean = false
): ChartOptions => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue(
    '--text-color-secondary'
  );

  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  const primaryColor = documentStyle.getPropertyValue('--primary-color');
  const gray = documentStyle.getPropertyValue('--gray-100');

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    datasets: {
      line: {
        fill: true,
        borderColor: primaryColor,
        tension: 0.6,
        pointStyle: displayTicks ? 'circle' : false,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          autoSkip: true,
          maxRotation: 0,
          maxTicksLimit: 5,
        },
        grid: {
          color: surfaceBorder,
          display: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          display: false,
        },
      },
    },
  };
};

export function getGradient(ctx: any, chartArea: any) {
  const documentStyle = getComputedStyle(document.documentElement);
  const primaryColor = documentStyle.getPropertyValue('--primary-500');
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  let width, height, gradient;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(1, primaryColor + 'ff');
    gradient.addColorStop(0.5, primaryColor + '80');
    gradient.addColorStop(0, primaryColor + '00');
  }

  return gradient;
}
