const CustomTelegramIcon = ({ className = "", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    {...props}
  >
    <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.789L21.54 5.226c.312-1.248-.537-1.81-1.875-1.509z"/>
  </svg>
);

export default CustomTelegramIcon;