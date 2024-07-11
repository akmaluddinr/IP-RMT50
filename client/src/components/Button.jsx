export default function Button(props) {
  const { className, type, label, fn } = props;
  return (
    <button className={className} type={type} onClick={fn}>
      {label}
    </button>
  );
}
