const styles = {
  onTime: 'bg-onTime/10 text-onTime',
  delayed: 'bg-minorDelay/10 text-minorDelay',
  major: 'bg-majorDelay/10 text-majorDelay',
};

const labels = {
  onTime: 'On time',
  delayed: 'Delayed',
  major: 'Major delay',
};

export default function StatusBadge({ status, children }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status] || styles.onTime}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children || labels[status] || status}
    </span>
  );
}
