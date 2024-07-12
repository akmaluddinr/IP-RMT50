export default function Button(props) {
  const { className, type, label, fn, name, img, clubId } = props;
  return (
    <button
      className={className}
      type={type}
      onClick={() => fn(name, img, clubId)}
    >
      {label}
    </button>
  );
}
