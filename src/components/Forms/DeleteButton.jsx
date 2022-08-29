import './DeleteButton.css';

export default function DeleteButton({
  onClick,
  className: customClassName,
}) {
  return (
    <button className="DeleteButton" onClick={onClick}>
      ❌
    </button>
  );
}
