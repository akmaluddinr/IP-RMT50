export default function Button(props) {
  const { className, type, label } = props;
  return (
    <button className={className} type={type}>
      {label}
    </button>
  );
}
